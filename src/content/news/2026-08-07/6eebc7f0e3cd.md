---
title: "My Terraform Drift Pipeline Fixed the Change, Then Forgot It"
originalUrl: "https://dev.to/lbagga/my-terraform-drift-pipeline-fixed-the-change-then-forgot-it-gpg"
date: "2026-08-07T01:13:58.567Z"
---

# My Terraform Drift Pipeline Fixed the Change, Then Forgot It
# 我的 Terraform 漂移流水线修复了变更，却转头就忘

My Terraform drift pipeline could detect a manual EC2 tag change, classify it as LOW, and run Terraform to remove it. Then the pipeline moved on. The evidence existed, but it was spread across CodeBuild output, Lambda logs, and an SNS message. If I wanted to know what changed, how it was classified, and whether remediation started, I had to reconstruct the event from multiple AWS services. The pipeline could act on drift. It could not remember drift. Phase 4 added that memory: a durable DynamoDB record, a read only API, and a small dashboard that turns the event history into something I can inspect without opening three AWS consoles.

我的 Terraform 漂移（Drift）流水线能够检测到手动的 EC2 标签变更，将其归类为“低（LOW）”级别，并运行 Terraform 将其移除。随后，流水线就结束了。证据虽然存在，但分散在 CodeBuild 输出、Lambda 日志和 SNS 消息中。如果我想知道发生了什么变更、它是如何被分类的，以及修复工作是否已经启动，我必须从多个 AWS 服务中重新拼凑出整个事件。流水线可以处理漂移，但无法“记住”漂移。第四阶段增加了这种记忆功能：一个持久化的 DynamoDB 记录、一个只读 API，以及一个小型的仪表盘。它将事件历史转化为我无需打开三个 AWS 控制台即可查看的内容。

### The Stack
### 技术栈

Terraform drift event ↓ SNS ↓ Severity Lambda ├── classifies HIGH / MEDIUM / LOW ├── starts remediation for eligible LOW drift └── writes the audit event to DynamoDB ↓ API Gateway HTTP API ↓ Read only Lambda ↓ DynamoDB Query ↓ CloudFront → static dashboard ↑ private S3 bucket

Terraform 漂移事件 ↓ SNS ↓ 严重性 Lambda ├── 对 HIGH / MEDIUM / LOW 进行分类 ├── 为符合条件的 LOW 漂移启动修复 └── 将审计事件写入 DynamoDB ↓ API Gateway HTTP API ↓ 只读 Lambda ↓ DynamoDB 查询 ↓ CloudFront → 静态仪表盘 ↑ 私有 S3 存储桶

The browser receives static HTML, CSS, and JavaScript from CloudFront. JavaScript calls API Gateway, the API Lambda queries DynamoDB, and the returned JSON becomes the live dashboard. There is no EC2 web server and no application process running continuously.

浏览器从 CloudFront 接收静态 HTML、CSS 和 JavaScript。JavaScript 调用 API Gateway，API Lambda 查询 DynamoDB，返回的 JSON 数据即成为实时仪表盘。这里没有 EC2 Web 服务器，也没有持续运行的应用程序进程。

### Step 1: Store Every Classified Event
### 第一步：存储每个分类事件

I created a DynamoDB table with a composite key:
我创建了一个带有复合键的 DynamoDB 表：

```hcl
resource "aws_dynamodb_table" "drift_events" {
  name           = "terraform-drift-events"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "project"
  range_key      = "timestamp"

  attribute {
    name = "project"
    type = "S"
  }
  attribute {
    name = "timestamp"
    type = "S"
  }
}
```

`project` groups the history for one Terraform project. The ISO 8601 timestamp orders its events. DynamoDB only requires attribute definitions for keys and indexes. Fields such as `high_count`, `changes`, and `status` still belong in each item, but they do not belong in the table schema block.

`project` 将同一个 Terraform 项目的历史记录归为一组。ISO 8601 时间戳用于对事件进行排序。DynamoDB 仅要求定义键和索引的属性。像 `high_count`、`changes` 和 `status` 这样的字段仍然属于每个条目，但它们不需要出现在表结构定义块中。

I passed the table name into the existing severity Lambda instead of putting it directly in the code:
我将表名传入现有的严重性 Lambda 中，而不是直接写在代码里：

```hcl
environment {
  variables = {
    DRIFT_EVENTS_TABLE = aws_dynamodb_table.drift_events.name
    REMEDIATION_PROJECT_NAME = aws_codebuild_project.remediation.name
  }
}
```

The same Lambda role received permission to write to that specific table:
同一个 Lambda 角色获得了写入该特定表的权限：

```json
{
  "Effect": "Allow",
  "Action": [
    "dynamodb:PutItem",
    "dynamodb:UpdateItem",
    "dynamodb:GetItem",
    "dynamodb:Query",
    "dynamodb:Scan"
  ],
  "Resource": aws_dynamodb_table.drift_events.arn
}
```

After classification, Lambda builds one audit item:
分类完成后，Lambda 会构建一个审计条目：

```python
item = {
    "project": project,
    "timestamp": timestamp,
    "drift_count": len(changes),
    "high_count": len(classified["HIGH"]),
    "medium_count": len(classified["MEDIUM"]),
    "low_count": len(classified["LOW"]),
    "changes": classified,
    "action_taken": action_taken,
    "status": status,
}
if remediation_build_id:
    item["remediation_build_id"] = remediation_build_id
drift_table.put_item(Item=item)
```

The record stores the decision alongside the evidence used to make it. I do not need to correlate an SNS payload with a separate classification log just to understand one event. For a change that needs human review, the item records `manual_review`. When Lambda starts the remediation build, it records `remediation_triggered` and includes the CodeBuild build ID. That turns the audit item into the connection between detection, classification, and the action taken by the pipeline.

该记录存储了决策以及做出决策所依据的证据。我不再需要为了理解一个事件而去关联 SNS 负载和单独的分类日志。对于需要人工审查的变更，条目会记录 `manual_review`。当 Lambda 启动修复构建时，它会记录 `remediation_triggered` 并包含 CodeBuild 构建 ID。这使得审计条目成为了检测、分类和流水线所采取行动之间的纽带。

### Step 2: Add a Read Only History API
### 第二步：添加只读历史 API

The dashboard should not receive DynamoDB credentials. It calls an HTTP API instead. I created a second Lambda whose only data permission is:
仪表盘不应接收 DynamoDB 凭证，而是调用 HTTP API。我创建了第二个 Lambda，其唯一的数据权限是：

```json
Action = ["dynamodb:Query"]
Resource = aws_dynamodb_table.drift_events.arn
```

The route requires a project: `GET /drift-history?project=Three-Tier-Infra`
该路由需要一个项目参数：`GET /drift-history?project=Three-Tier-Infra`

The Lambda queries the partition key and returns newest events first:
Lambda 查询分区键并优先返回最新事件：

```python
response = table.query(
    KeyConditionExpression="#project = :project",
    ExpressionAttributeNames={"#project": "project"},
    ExpressionAttributeValues={":project": project},
    ScanIndexForward=False,
)
```

This is why the table uses `project` as its partition key. The API does not need to scan the complete table to retrieve one project's history. DynamoDB numbers arrive in Python as `Decimal`, which `json.dumps` cannot serialize directly. I added a small serializer:
这就是为什么表使用 `project` 作为分区键的原因。API 无需扫描整个表即可检索某个项目的历史记录。DynamoDB 的数字在 Python 中以 `Decimal` 类型接收，而 `json.dumps` 无法直接序列化它。我添加了一个小型序列化器：

```python
def json_serializer(value):
    if isinstance(value, Decimal):
        return int(value) if value % 1 == 0 else float(value)
    raise TypeError(f"Cannot serialize {type(value)}")
```

API Gateway uses an HTTP API with a Lambda proxy integration:
API Gateway 使用带有 Lambda 代理集成的 HTTP API：

```hcl
resource "aws_apigatewayv2_route" "get_drift_events" {
  api_id    = aws_apigatewayv2_api.drift_api.id
  route_key = "GET /drift-history"
  target    = "integrations/${aws_apigatewayv2_integration.drift_api.id}"
}
```

Calling the deployed route returned HTTP 200 and the stored event:
调用已部署的路由返回了 HTTP 200 和存储的事件：

```bash
curl "https://8zg1x51wne.execute-api.us-east-2.amazonaws.com/drift-history?project=Three-Tier-Infra"
```

The response contained:
响应内容如下：

```json
{
  "events": [
    {
      "project": "Three-Tier-Infra",
      "timestamp": "2026-07-26T15:29:32Z",
      "drift_count": 1,
      "high_count": 0,
      "medium_count": 0,
      "low_count": 1,
      "action_taken": "remediation_triggered",
      "status": "REMEDIATION_STARTED"
    }
  ]
}
```

The changed resource was: `module.compute.aws_instance.bastion_host`. Terraform reported it as an `aws_instance` update.
变更的资源是：`module.compute.aws_instance.bastion_host`。Terraform 将其报告为 `aws_instance` 更新。

### Step 3: Build a Dashboard Without a Web Server
### 第三步：构建无需 Web 服务器的仪表盘

The dashboard is static in how it is hosted, not in the data it displays. S3 stores three files:
仪表盘在托管方式上是静态的，但在显示的数据上不是。S3 存储了三个文件：

```text
dashboard/
├── index.html
├── app.js
└── styles.css
```

CloudFront serves those files over HTTPS. `app.js` calls the API whenever the page loads or the user refreshes the data. The dashboard shows total events, severity counts, detection timestamps, Terraform resource addresses, actions, and remediation status. A severity filter narrows the history, and the page refreshes automatically every 60 seconds.
CloudFront 通过 HTTPS 提供这些文件。每当页面加载或用户刷新数据时，`app.js` 都会调用 API。仪表盘显示总事件数、严重性计数、检测时间戳、Terraform 资源地址、操作和修复状态。严重性过滤器可以缩小历史记录范围，页面每 60 秒自动刷新一次。

The S3 bucket remains private. CloudFront uses Origin Access Control to read objects:
S3 存储桶保持私有。CloudFront 使用源访问控制（Origin Access Control）来读取对象：

```hcl
resource "aws_cloudfront_origin_access_control" "drift_dashboard" {
  name                              = "terraform-drift-dashboard"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
```

The bucket policy grants `s3:GetObject` to the CloudFront service only when the request comes from this distribution.
存储桶策略仅在请求来自此分发版时，才授予 CloudFront 服务 `s3:GetObject` 权限。
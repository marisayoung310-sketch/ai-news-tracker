---
title: "4 YAML Files Instead of PySpark: How We Let Analysts Build Data Pipelines Without Engineers"
originalUrl: "https://towardsdatascience.com/4-yaml-files-instead-of-pyspark-how-we-let-analysts-build-data-pipelines-without-engineers/"
date: "2026-04-30T01:15:25.924Z"
---

# 4 YAML Files Instead of PySpark: How We Let Analysts Build Data Pipelines Without Engineers

**4 个 YAML 文件替代 PySpark：我们如何让分析师在没有工程师的情况下构建数据流水线**

How we replaced Python pipelines with dlt, dbt, and Trino — and cut delivery time from weeks to one day. Kiril Kazlou Apr 29, 2026 10 min read.

我们如何用 dlt、dbt 和 Trino 取代 Python 流水线，并将交付时间从几周缩短到一天。作者：Kiril Kazlou，2026 年 4 月 29 日，阅读时长 10 分钟。

It used to take us three weeks to ship a single data pipeline. Today, an analyst with zero Python experience does it in a day. Here’s how we got there. I’m Kiril Kazlou, a data engineer at Mindbox. Our team regularly recalculates business metrics for clients — which means we’re constantly building data marts for billing and analytics, pulling from dozens of different sources.

过去，我们交付一个数据流水线需要三周时间。如今，即使是零 Python 经验的分析师也能在一天内完成。以下是我们实现这一目标的过程。我是 Kiril Kazlou，Mindbox 的一名数据工程师。我们的团队经常为客户重新计算业务指标，这意味着我们必须不断地从数十个不同的来源提取数据，构建用于计费和分析的数据集市。

For a long time, we relied on PySpark for all our data processing. The problem? You can’t really work with PySpark without Python experience. Every new pipeline required a developer. And that meant waiting — sometimes for weeks. In this post, I’ll walk you through how we built an internal data platform where an analyst or product manager can spin up a regularly updated pipeline by writing just four YAML files.

长期以来，我们一直依赖 PySpark 进行所有数据处理。问题在于，没有 Python 经验根本无法使用 PySpark。每一个新的流水线都需要开发人员介入，这意味着等待——有时长达数周。在这篇文章中，我将向大家介绍我们如何构建了一个内部数据平台，让分析师或产品经理只需编写四个 YAML 文件，就能启动一个定期更新的数据流水线。

### Why PySpark Was Slowing Us Down
### 为什么 PySpark 拖慢了我们的进度

Let me illustrate the pain with a textbook example — calculating MAU (Monthly Active Users). On the surface, this feels like a simple SQL job: COUNT(DISTINCT customerId) across a few tables over a time window. But because of all the infrastructure overhead — PySpark, Airflow DAG setup, Spark resource allocation, testing — we had to hand it off to developers. The result? A full week just to ship a MAU counter.

让我用一个教科书式的例子来说明这种痛苦——计算 MAU（月活跃用户）。表面上看，这只是一个简单的 SQL 任务：在时间窗口内对几张表执行 `COUNT(DISTINCT customerId)`。但由于所有的基础设施开销——PySpark、Airflow DAG 设置、Spark 资源分配、测试——我们不得不将其交给开发人员。结果呢？仅仅为了交付一个 MAU 计数器就需要整整一周。

Every new metric took one to three weeks to deliver. And every single time, the process looked the same: An analyst defined the business requirements, found an available developer, and handed over the context. The developer clarified details, wrote PySpark code, went through code review, configured the DAG, and deployed. What we actually wanted was for analysts and product managers — the people who understand the business logic best and are fluent in SQL and YAML — to handle this themselves. No Python. No PySpark.

每一个新指标的交付都需要一到三周。每一次的过程都如出一辙：分析师定义业务需求，寻找空闲的开发人员，并移交背景信息。开发人员澄清细节、编写 PySpark 代码、进行代码审查、配置 DAG 并部署。我们真正想要的是让分析师和产品经理——那些最了解业务逻辑且精通 SQL 和 YAML 的人——能够自己处理这些工作。无需 Python，无需 PySpark。

### What We Replaced PySpark With: YAML and SQL Are All You Need
### 我们用什么取代了 PySpark：YAML 和 SQL 就足够了

To take a declarative approach, we split our data layer into three parts and picked the right tool for each:
*   **dlt (data load tool)** — ingests data from external APIs and databases into object storage. Configured entirely through a YAML file. No code required.
*   **dbt (data build tool) on Trino** — transforms data using pure SQL. It links models via ref(), automatically builds a dependency graph, and handles incremental updates.
*   **Airflow + Cosmos** — orchestrates the pipelines. The Airflow DAG is auto-generated from dag.yaml and the dbt project.

为了采用声明式方法，我们将数据层拆分为三个部分，并为每一部分选择了合适的工具：
*   **dlt (data load tool)**：将数据从外部 API 和数据库摄取到对象存储中。完全通过 YAML 文件配置，无需编写代码。
*   **dbt (data build tool) on Trino**：使用纯 SQL 转换数据。它通过 `ref()` 链接模型，自动构建依赖图，并处理增量更新。
*   **Airflow + Cosmos**：编排流水线。Airflow DAG 由 `dag.yaml` 和 dbt 项目自动生成。

We were already using Trino as a query engine for ad-hoc queries and had it plugged into Superset for BI. It had already proven itself: for queries with standard logic, it processed massive datasets faster and with fewer resources than Spark. On top of that, Trino natively supports federated access to multiple data stores from a single SQL query. For 90% of our pipelines, Trino was a perfect fit.

我们此前已将 Trino 用作即席查询的查询引擎，并将其接入 Superset 用于商业智能（BI）。它已经证明了自己的价值：对于标准逻辑的查询，它处理海量数据集的速度更快，且资源消耗比 Spark 更少。此外，Trino 原生支持通过单个 SQL 查询对多个数据存储进行联邦访问。对于我们 90% 的流水线来说，Trino 是完美的选择。

### How We Load Data: dlt.yaml
### 我们如何加载数据：dlt.yaml

The first YAML file describes where and how to load data for downstream processing. Here’s a real-world example — loading billing data from an internal API:

第一个 YAML 文件描述了如何为下游处理加载数据以及加载位置。以下是一个真实案例——从内部 API 加载计费数据：

*(YAML code block omitted for brevity)*

This config defines four resources from a single API. For each one, we specify the endpoint, request parameters, and a write strategy — in our case, replace means “overwrite every time.” You can also add processing steps, define column types, and configure alerts. The entire config is 40 lines of YAML. Without dlt, each connector would be a Python script handling requests, pagination, retries, serialization to Delta Table format, and uploads to storage.

此配置从单个 API 定义了四个资源。对于每一个资源，我们指定了端点、请求参数和写入策略——在我们的案例中，“replace”意味着“每次都覆盖”。你还可以添加处理步骤、定义列类型并配置警报。整个配置仅 40 行 YAML。如果没有 dlt，每个连接器都需要编写一个 Python 脚本来处理请求、分页、重试、序列化为 Delta Table 格式以及上传到存储。

### How We Transform Data With SQL: dbt_project.yaml and sources.yaml
### 我们如何用 SQL 转换数据：dbt_project.yaml 和 sources.yaml

The next step is configuring the dbt model. With Trino, that means SQL queries. Here’s an example of how we set up the MAU calculation. This is what event preparation from a single source looks like:

下一步是配置 dbt 模型。对于 Trino 而言，这意味着编写 SQL 查询。以下是我们如何设置 MAU 计算的示例。这是从单个来源准备事件数据的样子：

*(SQL code block omitted for brevity)*
---
title: "6 New Moats for AI Agent Infrastructure — Trust Score, Deployment, SLA, Identity, Compliance-as-Code"
originalUrl: "https://dev.to/vystartasv/6-new-moats-for-ai-agent-infrastructure-trust-score-deployment-sla-identity-compliance-as-code-ikl"
date: "2026-05-05T22:24:53.141Z"
---

# 6 New Moats for AI Agent Infrastructure — Trust Score, Deployment, SLA, Identity, Compliance-as-Code
# AI 智能体基础设施的 6 大新护城河——信任评分、部署、SLA、身份认证与合规即代码

6 New Moats for AI Agent Infrastructure Yesterday I published the Agent OSI Model — a 7-layer framework for agent infrastructure. Today I'm publishing the specs for 6 protocols that fill the gaps in that model. All six have Python reference implementations. All are CC BY 4.0. All are designed to be adopted by any AI agent reading the spec.

AI 智能体基础设施的 6 大新护城河。昨天我发布了“智能体 OSI 模型”——一个用于智能体基础设施的 7 层框架。今天，我将发布 6 个协议的规范，以填补该模型中的空白。这 6 个协议均提供 Python 参考实现，均采用 CC BY 4.0 协议，且旨在供任何读取该规范的 AI 智能体采用。

### 1. Agent Trust Score — A Credit Score for AI Agents
### 1. 智能体信任评分 (Agent Trust Score) —— AI 智能体的信用评分

Before delegating work to another agent, check its trust score. Weighted across success rate, pitfall contributions, skill quality, peer ratings, and uptime.
在将工作委托给另一个智能体之前，请先检查其信任评分。该评分基于成功率、缺陷贡献、技能质量、同行评价和正常运行时间进行加权计算。

```python
from workswithagents import TrustScoreClient
ts = TrustScoreClient()
if ts.get("target-agent")["tier"] == "trusted":
    delegate(task, to="target-agent")
```

Spec · Zero competitors. Nobody has a credit score for agents.
规范 · 零竞争对手。目前还没有人提供针对智能体的信用评分。

### 2. Deployment Manifest — Docker Compose for Agent Fleets
### 2. 部署清单 (Deployment Manifest) —— 智能体集群的 Docker Compose

Declare your entire fleet in one YAML file. Deploy with one command.
在一个 YAML 文件中声明你的整个智能体集群，并用一条命令进行部署。

```yaml
fleet:
  name: "my-fleet"
  agents:
    - id: "builder"
      capabilities:
        - action: "build"
          target: "spfx"
      count: 3
wwa fleet deploy fleet.yaml
```

Spec · Zero competitors.
规范 · 零竞争对手。

### 3. SLA Framework — Guarantees for Autonomous Agents
### 3. SLA 框架 —— 自主智能体的服务等级协议

Three tiers: Best-Effort (free), Production (99.5% uptime, 90% accuracy), Regulated (99.9% uptime, 95% accuracy, ATP-3 compliance, 7-year audit retention).
分为三个等级：尽力而为（免费）、生产级（99.5% 正常运行时间，90% 准确率）、受监管级（99.9% 正常运行时间，95% 准确率，符合 ATP-3 合规性，7 年审计留存）。

```python
from workswithagents import SLAMetrics
sla = SLAMetrics("my-fleet", tier="production")
sla.report("agent-1", "task-42", duration_seconds=187, success=True)
status = sla.status() # {breaches: [], status: "ok"}
```

Spec · Zero competitors. Nobody defines agent SLAs.
规范 · 零竞争对手。目前还没有人定义智能体的 SLA。

### 4. Identity Protocol — Verifiable Agent Identity
### 4. 身份协议 (Identity Protocol) —— 可验证的智能体身份

Cryptographic agent identity with Ed25519 keypairs. Signed messages. Verification against registry. "Is this agent really who it claims to be?"
使用 Ed25519 密钥对实现加密的智能体身份。通过签名消息并针对注册表进行验证，解决“这个智能体真的是它所声称的那一个吗？”的问题。

```python
from workswithagents import AgentIdentity
ai = AgentIdentity("my-agent")
ai.register()
sig = ai.sign({"type": "heartbeat"})
# Verify another agent's message
valid = AgentIdentity.verify("other-agent", message, signature)
```

Spec · Zero competitors for agent-specific identity.
规范 · 针对智能体特定身份的零竞争对手。

### 5. Compliance-as-Code — Turn Regulation into Validation
### 5. 合规即代码 (Compliance-as-Code) —— 将监管转化为验证

NHS DTAC, FCA, GDS, GDPR — as executable rules agents validate against. Not documentation. Not checklists. Actual code that says "this action passes DTAC" or "this action violates FCA Senior Managers Regime."
将 NHS DTAC、FCA、GDS、GDPR 等监管要求转化为智能体可验证的可执行规则。这不是文档，也不是检查清单，而是明确指出“此操作通过 DTAC”或“此操作违反 FCA 高级管理人员制度”的实际代码。

```python
from workswithagents import ComplianceEngine
ce = ComplianceEngine()
dtac = ce.load("dtac-v2.1")
if dtac.validate(action).passed:
    execute(action)
else:
    escalate_to_human()
```

Spec · Zero competitors. This is the regulated industry moat.
规范 · 零竞争对手。这是受监管行业的护城河。

### 6. Onboarding Protocol — Productize Agent Creation
### 6. 入职协议 (Onboarding Protocol) —— 智能体创建的产品化

Interview → generate → calibrate → benchmark → register. Turn "write a .md file and hope it works" into a systematic pipeline.
访谈 → 生成 → 校准 → 基准测试 → 注册。将“写一个 .md 文件并祈祷它能运行”的过程转变为系统化的流水线。

```python
from workswithagents import OnboardingClient
ob = OnboardingClient()
result = ob.full_onboard(
    "hermes-nhs-auditor",
    "Audit agent actions for NHS DTAC compliance",
    capabilities=["audit:compliance"],
    skills=["compliance-as-code"]
)
# → {agent_id: "hermes-nhs-auditor", trust_score_seed: 0.60}
```

Spec · Zero competitors.
规范 · 零竞争对手。

### The Complete Stack
### 完整技术栈

*   **L7 GOVERNANCE:** Compliance-as-Code · SLA Framework · Transaction Protocol
*   **L7 治理：** 合规即代码 · SLA 框架 · 交易协议
*   **L6 VERIFICATION:** Agent Test Suite · Pitfall Registry
*   **L6 验证：** 智能体测试套件 · 缺陷注册表
*   **L5 COORDINATION:** Coordination Protocol · Trust Score
*   **L5 协调：** 协调协议 · 信任评分
*   **L4 SESSION:** Handoff Protocol (MCP SEP #2683, A2A #1817)
*   **L4 会话：** 移交协议 (MCP SEP #2683, A2A #1817)
*   **L3 DISCOVERY:** Capability Manifest · Trust Score · Identity
*   **L3 发现：** 能力清单 · 信任评分 · 身份认证
*   **L2 COMMUNICATION:** Identity Protocol · Credential Proxy
*   **L2 通信：** 身份协议 · 凭证代理
*   **L1 EXECUTION:** Blueprint Registry · Onboarding Protocol
*   **L1 执行：** 蓝图注册表 · 入职协议
*   **Plus cross-layer:** Deployment Manifest.
*   **跨层：** 部署清单。

### Get Started
### 开始使用

`pip install workswithagents`
All specs: [workswithagents.dev/specs/](https://workswithagents.dev/specs/)
All code: CC BY 4.0
All protocols: zero-dependency Python (cryptography optional)
12 specs published. 6 with Python SDKs. 3 dev.to articles in 2 days. The agent infrastructure layer is being defined right now. These moats are free to implement — but the vocabulary, the standards, and the certification are Works With Agents.

所有规范：[workswithagents.dev/specs/](https://workswithagents.dev/specs/)
所有代码：CC BY 4.0
所有协议：零依赖 Python（加密可选）
已发布 12 项规范，其中 6 项带有 Python SDK。两天内发布了 3 篇 dev.to 文章。智能体基础设施层正在被定义。这些护城河可以免费实现——但其中的词汇、标准和认证均属于 Works With Agents。
---
title: "Claude Cookbook"
originalUrl: "https://platform.claude.com/cookbook/"
date: "2026-07-24T22:31:29.300Z"
---

# Claude Cookbook

**Programmatic tool calling (PTC)**
Reduce latency and token consumption by letting Claude write code that calls tools programmatically in the code execution environment.
**程序化工具调用 (PTC)**
通过让 Claude 在代码执行环境中编写程序化调用工具的代码，从而降低延迟并减少 Token 消耗。

**Tool search with embeddings**
Scale Claude applications to thousands of tools using semantic embeddings for dynamic tool discovery.
**基于嵌入的工具搜索**
利用语义嵌入（Semantic Embeddings）实现动态工具发现，将 Claude 应用程序扩展至支持数千种工具。

**Automatic context compaction**
Manage context limits in long-running agentic workflows by automatically compressing conversation history.
**自动上下文压缩**
通过自动压缩对话历史记录，管理长周期智能体工作流中的上下文限制。

**Giving Claude a crop tool for better image analysis**
Give Claude a crop tool to zoom into image regions for detailed analysis of charts, documents, and diagrams.
**为 Claude 提供裁剪工具以优化图像分析**
为 Claude 提供裁剪工具，使其能够放大图像区域，从而对图表、文档和示意图进行详细分析。

**Prompting for frontend aesthetics**
Guide to prompting Claude for distinctive, polished frontend designs avoiding generic aesthetics.
**前端美学提示词指南**
指导如何通过提示词引导 Claude 设计出独特且精致的前端界面，避免平庸的审美。

**Introduction to Claude Skills**
Create documents, analyze data, automate workflows with Claude's Excel, PowerPoint, PDF skills.
**Claude 技能介绍**
利用 Claude 的 Excel、PowerPoint 和 PDF 处理技能来创建文档、分析数据并自动化工作流。

---

### Featured Articles / 精选文章

**Reproduce Claude's agentic search benchmark scores in the Messages API** (Jun 2026)
Build a Messages API harness that reproduces published DeepSearchQA and BrowseComp scores, using programmatic tool calling, server-side compaction, and task budgets.
**在 Messages API 中复现 Claude 的智能体搜索基准测试分数** (2026年6月)
构建一个 Messages API 测试框架，通过程序化工具调用、服务端压缩和任务预算，复现已发布的 DeepSearchQA 和 BrowseComp 分数。

**Classifier fallback and billing for Claude Fable 5** (Jun 2026)
Detect safety classifier blocks on Fable 5 and fall back to Opus 4.8 with server-side or SDK-based client-side fallback, including streaming behavior and the new billing changes.
**Claude Fable 5 的分类器回退与计费机制** (2026年6月)
检测 Fable 5 上的安全分类器拦截，并使用服务端或基于 SDK 的客户端回退机制切换至 Opus 4.8，涵盖流式传输行为及新的计费变更。

**Async multi-agent orchestration** (Jun 2026)
Two async multi-agent patterns — a fixed N-agent team with peer messaging through a shared hub, and dynamically spawned async subagents — reduced to their bare messaging and lifecycle mechanics.
**异步多智能体编排** (2026年6月)
介绍两种异步多智能体模式：通过共享中心进行对等通信的固定 N 智能体团队，以及动态生成的异步子智能体，并简化了其消息传递与生命周期机制。

**Hosting your agent** (May 2026)
Deploy the research agent from notebook 00 through three tiers of operational maturity (Docker, Modal, Kubernetes) with the same container image and HTTP interface at every tier.
**托管你的智能体** (2026年5月)
将 notebook 00 中的研究智能体部署到三个不同成熟度的运维层级（Docker、Modal、Kubernetes），并在每一层级使用相同的容器镜像和 HTTP 接口。

**Multiagent: coordinate a specialist team** (May 2026)
Heterogeneous team via the multiagent coordinator config — a coordinator runs three specialists (web-search researcher, file-reading librarian, rules-based pricer) with scoped toolsets to assemble a sales proposal.
**多智能体：协调专家团队** (2026年5月)
通过多智能体协调器配置实现异构团队协作：协调器运行三名专家（网络搜索研究员、文件阅读图书管理员、基于规则的定价员），并使用受限工具集来汇总销售提案。

**Outcomes: agents that verify their own work** (May 2026)
Build a grade-and-revise loop with Outcomes: a writer drafts a cited research brief, a stateless grader fetches every URL and checks every quote against a rubric, and feedback drives revisions until the brief passes.
**成果机制：让智能体验证自己的工作** (2026年5月)
利用“成果（Outcomes）”构建评分与修订循环：由撰写者起草带引用的研究简报，无状态评分器抓取每个 URL 并根据评分标准核对每条引用，通过反馈驱动修订直至简报通过。

**Build agents that remember your users** (Apr 2026)
Give your Claude Managed Agents a Memory store so they learn and remember your users' preferences across multiple interactions.
**构建能记住用户的智能体** (2026年4月)
为你的 Claude 托管智能体提供存储空间，使其能够在多次交互中学习并记住用户的偏好。

**The vulnerability detection agent** (Apr 2026)
Build a vulnerability-discovery agent with the Claude Agent SDK that threat-models a C target, hunts memory-safety bugs with built-in file tools, and triages findings into a structured report.
**漏洞检测智能体** (2026年4月)
使用 Claude Agent SDK 构建漏洞发现智能体，对 C 语言目标进行威胁建模，利用内置文件工具搜寻内存安全漏洞，并将发现结果整理为结构化报告。

**Build an SRE incident response agent with Claude Managed Agents** (Apr 2026)
Wire Claude into your on-call flow: when an alert fires, the agent reads logs and runbooks, pinpoints the root cause, opens a fix PR, and waits for your approval before merging.
**使用 Claude 托管智能体构建 SRE 事件响应智能体** (2026年4月)
将 Claude 接入你的值班流程：当警报触发时，智能体读取日志和运行手册，定位根本原因，提交修复 PR，并在合并前等待你的批准。

**Build a data analyst agent with Claude Managed Agents** (Apr 2026)
Build an analyst that turns a CSV into a narrative HTML report with interactive charts, using a sandboxed environment and file mounting.
**使用 Claude 托管智能体构建数据分析智能体** (2026年4月)
构建一个分析师智能体，利用沙盒环境和文件挂载功能，将 CSV 文件转换为带有交互式图表的叙述性 HTML 报告。

**Build a Slack data analyst bot with Claude Managed Agents** (Apr 2026)
Mention the bot with a CSV to get an analysis report in-thread, with multi-turn follow-ups on the same session.
**使用 Claude 托管智能体构建 Slack 数据分析机器人** (2026年4月)
在 Slack 中 @ 机器人并附上 CSV 文件，即可在线程中获得分析报告，并支持在同一会话中进行多轮追问。

**Managed Agents tutorial: iterate on a failing test suite** (Apr 2026)
Entry-point tutorial for the Claude Managed Agents API. Walks through agent / environment / session creation, file mounts, and the streaming event loop by getting an agent to fix three planted bugs in a calc.py package.
**托管智能体教程：迭代修复失败的测试套件** (2026年4月)
Claude 托管智能体 API 的入门教程。通过让智能体修复 calc.py 包中预设的三个 Bug，引导用户了解智能体/环境/会话的创建、文件挂载以及流式事件循环。

**Managed Agents tutorial: production setup** (Apr 2026)
End-to-end production story for Managed Agents — vault-backed MCP credentials, the session.status_idled webhook pattern for human-in-the-loop without long-lived connections, and the resource lifecycle CRUD verbs.
**托管智能体教程：生产环境设置** (2026年4月)
托管智能体的端到端生产实践：包括基于 Vault 的 MCP 凭证、无需长连接即可实现人机协作的 session.status_idled Webhook 模式，以及资源生命周期的 CRUD 操作。

**Managed Agents tutorial: prompt versioning and rollback** (Apr 2026)
Server-side prompt versioning — create v1, evaluate against a labelled test set, ship v2, detect a regression, roll back by pinning sessions to version 1.
**托管智能体教程：提示词版本控制与回滚** (2026年4月)
服务端提示词版本控制：创建 v1 版本，针对标记测试集进行评估，发布 v2 版本，检测到回归后，通过将会话锁定在 v1 版本实现回滚。

**Threat intelligence enrichment agent** (Apr 2026)
Build an agent that autonomously investigates IOCs by querying multiple threat intel sources, cross-referencing findings, mapping to MITRE ATT&CK, and producing structured reports for SIEM and SOAR integration.
**威胁情报增强智能体** (2026年4月)
构建一个能够自主调查 IOC（失陷指标）的智能体，通过查询多个威胁情报源、交叉比对发现、映射至 MITRE ATT&CK 框架，并生成用于 SIEM 和 SOAR 集成的结构化报告。

**Building a session browser** (Mar 2026)
List, read, rename, tag, and fork Agent SDK sessions on disk to build a conversation.
**构建会话浏览器** (2026年3月)
在磁盘上列出、读取、重命名、标记和分叉 Agent SDK 会话，以构建对话管理工具。
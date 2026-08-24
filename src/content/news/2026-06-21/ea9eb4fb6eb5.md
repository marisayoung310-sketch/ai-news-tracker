---
title: "Agent frameworks create workflows. Production needs run receipts."
originalUrl: "https://dev.to/armorer_labs/agent-frameworks-create-workflows-production-needs-run-receipts-222g"
date: "2026-06-20T22:47:47.433Z"
---

# Agent frameworks create workflows. Production needs run receipts.
# 智能体框架负责构建工作流，而生产环境需要“运行回执”。

Everyone is comparing agent frameworks: LangGraph, CrewAI, AutoGen, OpenAI Agents SDK, Claude Code, Codex, MCP routers, custom harnesses. That comparison matters, but it misses the layer that starts hurting once the demo works.

大家都在比较各种智能体（Agent）框架：LangGraph、CrewAI、AutoGen、OpenAI Agents SDK、Claude Code、Codex、MCP 路由器以及各种自定义工具。这种比较固然重要，但它忽略了一个在演示（Demo）成功后才会显现的痛点层级。

The framework creates the workflow. It does not automatically answer: what is installed and running locally? which tools, MCP servers, skills, and providers are mounted? what repo, files, or workspace state were in scope? what did the agent change? which actions created side effects? which actions required approval, warning, redaction, block, or review? what evidence came from tests, evals, traces, or browser checks? what can be retried, resumed, rolled back, or cleaned up safely?

框架负责创建工作流，但它无法自动回答以下问题：本地安装并运行了什么？挂载了哪些工具、MCP 服务器、技能和提供程序？哪些仓库、文件或工作区状态在作用域内？智能体修改了什么？哪些操作产生了副作用？哪些操作需要批准、警告、脱敏、拦截或审查？测试、评估、追踪或浏览器检查提供了什么证据？哪些操作可以安全地重试、恢复、回滚或清理？

That is the layer we are building Armorer for: a local control plane around agents. The split we are converging on: Armorer: sessions, jobs, tool inventory, config, approvals, run records, and recovery; Armorer Guard: fast runtime decisions on proposed tool calls and model/tool-output transitions.

这正是我们构建 Armorer 的初衷：一个围绕智能体的本地控制平面。我们正在形成的架构分工如下：Armorer 负责会话、任务、工具清单、配置、审批、运行记录和恢复；Armorer Guard 负责对拟议的工具调用以及模型/工具输出转换进行快速的运行时决策。

The goal is not to replace agent frameworks. It is to make agents operable once they exist. The artifact I keep coming back to is a run receipt. A useful agent run receipt should capture: the agent/app, version, and config; the mounted tools, MCP servers, skills, and providers; the workspace/repo/files in scope; checkpoints before and after the run; tool calls and side effects; approval and review decisions; test/eval/check evidence; retry, resume, rollback, and cleanup state.

我们的目标不是取代智能体框架，而是让现有的智能体具备可操作性。我一直强调的核心产物是“运行回执”（run receipt）。一份有用的智能体运行回执应包含：智能体/应用及其版本和配置；挂载的工具、MCP 服务器、技能和提供程序；作用域内的工作区/仓库/文件；运行前后的检查点；工具调用及其副作用；审批和审查决策；测试/评估/检查证据；以及重试、恢复、回滚和清理状态。

Without this, debugging agent runs turns into transcript archaeology. With it, operating agents starts to feel more like operating software again.

没有这些，调试智能体运行过程就像是在进行“文字记录考古”。有了它，操作智能体将重新变得像操作常规软件一样可控。

Repos:
Armorer: https://github.com/ArmorerLabs/Armorer
Armorer Guard: https://github.com/ArmorerLabs/Armorer-Guard

代码仓库：
Armorer: https://github.com/ArmorerLabs/Armorer
Armorer Guard: https://github.com/ArmorerLabs/Armorer-Guard

Questions I would love feedback on: What is the minimum useful run receipt for an agent session? Which approval events should become first-class history? Where should MCP/tool metadata stop and runtime policy begin? What recovery action do you wish your agent harness exposed after a bad run?

我非常期待大家的反馈：对于一个智能体会话，最起码的运行回执应包含什么？哪些审批事件应该成为“一等公民”级别的历史记录？MCP/工具元数据的边界在哪里，运行时策略又该从何处开始？当运行出错时，你希望你的智能体工具集提供什么样的恢复操作？

Disclosure: I am building Armorer and Armorer Guard.

披露：我正在开发 Armorer 和 Armorer Guard。
---
title: "Designing the hf CLI as an agent-optimized way to work with the Hub"
originalUrl: "https://huggingface.co/blog/hf-cli-for-agents"
date: "2026-06-04T22:54:13.814Z"
---

# Designing the hf CLI as an agent-optimized way to work with the Hub
# 将 hf CLI 设计为与 Hub 交互的智能体优化方式

`hf` is the official command-line entrypoint to the Hugging Face Hub. Anything you can do on the Hub from the Python SDK, you can do from your terminal: download and upload models, datasets and Spaces; create and manage repos, branches, tags and pull requests; run Jobs on HF infrastructure; manage Buckets, Collections, webhooks and Inference Endpoints.
`hf` 是访问 Hugging Face Hub 的官方命令行入口。通过 Python SDK 在 Hub 上能做的任何事情，你都可以在终端中完成：下载和上传模型、数据集和 Spaces；创建并管理仓库、分支、标签和合并请求；在 HF 基础设施上运行任务；管理存储桶、集合、Webhook 和推理端点。

The hf CLI has been primarily built for our users over the years. But it's now increasingly used by coding agents: Claude Code, Codex, Cursor and more. So we rebuilt it to make it work for both audiences at once. This blog post summarizes what we did, and how we benchmarked it. We found that on complex, multi-step tasks the no-CLI baseline (an agent hand-rolling curl or the Python SDK) uses up to 6× as many tokens as the hf CLI.
多年来，hf CLI 主要为人类用户构建。但现在，它越来越多地被编程智能体（Coding Agents）所使用，例如 Claude Code、Codex、Cursor 等。因此，我们对其进行了重构，使其能同时满足这两类受众的需求。本篇博文总结了我们的工作内容及基准测试结果。我们发现，在复杂的、多步骤的任务中，不使用 CLI 的基准方案（即智能体手动编写 curl 命令或调用 Python SDK）所消耗的 Token 数量最高可达 hf CLI 的 6 倍。

### AI agent traffic on the Hub
### Hub 上的 AI 智能体流量

We started tracking agent usage of the Hub in April 2026. The hf CLI (and the huggingface_hub Python SDK it's built on) detects when a coding agent is driving it by reading the environment variables agents set: CLAUDECODE/CLAUDE_CODE for Claude Code, CODEX_SANDBOX for Codex, plus Cursor, Gemini, Pi, and the universal AI_AGENT. That single signal does two jobs: it shapes the CLI's output (more on that below) and it tags each Hub request with an agent/<name> user-agent, so we can attribute traffic to the agent driving it.
我们从 2026 年 4 月开始追踪 Hub 的智能体使用情况。hf CLI（及其构建基础 huggingface_hub Python SDK）通过读取智能体设置的环境变量来检测是否有编程智能体在驱动它：例如 Claude Code 的 CLAUDECODE/CLAUDE_CODE，Codex 的 CODEX_SANDBOX，以及 Cursor、Gemini、Pi 和通用的 AI_AGENT。这一信号承担了两项任务：它决定了 CLI 的输出格式（下文详述），并为每个 Hub 请求标记了 agent/<name> 的 User-Agent，以便我们将流量归因于驱动它的智能体。

The two largest by distinct users are Claude Code and Codex, well ahead of everything else, and they're the two agents we benchmark later in this article. The bars count distinct users per agent; request volume is the sub-label. Claude Code alone is ~40k users and nearly 49M requests, with Codex close behind. These are early numbers (we only began attributing agent traffic in April 2026), but the scale is already significant, and we expect it to keep growing as coding agents become a standard way to work with the Hub.
按独立用户数计算，最大的两个智能体是 Claude Code 和 Codex，它们远超其他智能体，也是我们在本文后续进行基准测试的对象。柱状图统计了每个智能体的独立用户数；请求量作为子标签标注。仅 Claude Code 就拥有约 4 万用户和近 4900 万次请求，Codex 紧随其后。这些只是早期数据（我们从 2026 年 4 月才开始进行智能体流量归因），但规模已经相当可观。随着编程智能体成为与 Hub 交互的标准方式，我们预计这一数字将持续增长。

### Built for humans and agents
### 为人类与智能体而生

Humans and coding agents expect different outputs for the same hf commands. A human wants rich terminal output: ANSI color, padded tables truncated to fit the screen, a green ✅ on success, ✔ for booleans, progress bars, prose hints. An agent wants the inverse: no ANSI, nothing truncated, every value in full since an agent can handle far denser output than a human, kept compact and structured to stay light on tokens. It also can't answer a CLI prompt and will happily re-run a command after a timeout. The rest of this section is how hf gives each side what it needs.
人类和编程智能体对相同的 hf 命令有着不同的输出预期。人类需要丰富的终端输出：ANSI 颜色、适合屏幕显示的截断表格、成功时的绿色 ✅、布尔值的 ✔、进度条以及文字提示。而智能体则恰恰相反：不需要 ANSI 颜色，不进行任何截断，所有数值必须完整显示（因为智能体处理高密度信息的能力远超人类），且保持紧凑和结构化以节省 Token。此外，智能体无法响应 CLI 交互式提示，并且在超时后会乐于重新运行命令。本节其余部分将介绍 hf 如何满足双方的需求。

We introduced agent-mode output in hf v1.9.0 and have been migrating the rest of the CLI to it gradually in the following releases.
我们在 hf v1.9.0 中引入了智能体模式输出，并在随后的版本中逐步将 CLI 的其余部分迁移至该模式。

### One command, multiple renderings
### 一条命令，多种渲染

When hf auto-detects agent use (via the environment variables mentioned above), it renders the same command differently. It optimizes output format for humans or agents without passing a flag.
当 hf 自动检测到智能体使用（通过上述环境变量）时，它会以不同的方式渲染同一条命令。它无需传递任何标志，即可自动优化人类或智能体的输出格式。

*(Example omitted for brevity)*
*(示例内容略)*

A human gets an aligned table, truncated to fit the terminal, plus a hint on how to see more, with color cues for status (a green ✓ on success, red on error). An agent gets the complete record as TSV: full repo ids, full ISO timestamps, every tag, no ANSI codes, nothing truncated, clean to parse and light on tokens. In practice, we've implemented logging methods like .table(...), .result(...), .json(), etc., which take raw data as input and handle the formatting. In addition to human and agent modes, we've introduced --json and --quiet options to make it easier to pipe commands together. The default mode is automatically chosen based on context, but users can always force the format of their choice with --format human | agent | json | quiet.
人类用户会看到对齐的表格、适合终端宽度的截断显示，以及查看更多内容的提示，并带有状态颜色标记（成功为绿色 ✓，错误为红色）。智能体则会获得 TSV 格式的完整记录：完整的仓库 ID、完整的 ISO 时间戳、所有标签、无 ANSI 代码、无截断，便于解析且节省 Token。在实践中，我们实现了诸如 .table(...)、.result(...)、.json() 等日志记录方法，它们接收原始数据并处理格式化。除了人类和智能体模式外，我们还引入了 --json 和 --quiet 选项，以便更轻松地进行命令管道操作。默认模式会根据上下文自动选择，但用户始终可以通过 --format human | agent | json | quiet 强制指定所需的格式。

### Next-command hints
### 下一步命令提示

CLI commands rarely run in isolation: one step usually implies the next (git add, then git commit). Many hf commands now end with a hint: the exact next command to run, pre-filled with the IDs you just used, so a user or agent can...
CLI 命令很少孤立运行：一个步骤通常暗示着下一步（例如先 git add，再 git commit）。现在，许多 hf 命令在结束时会提供一个提示：即下一步要运行的确切命令，并预填了你刚刚使用的 ID，以便用户或智能体能够……
---
title: "PrimeIntellect-ai / prime-agent"
originalUrl: "https://github.com/PrimeIntellect-ai/prime-agent"
date: "2026-08-07T22:03:14.088Z"
---

# Prime Agent: A Self-Improving RLM Agent

Prime Agent is an open-source coding and research agent for general and long-running work. It is designed around two core abstractions: The Recursive Language Model (RLM) treats context as variables (prompt-as-a-variable) and tools like recursive subagents as function calls (programmatic tool /sub-agent calling) inside a persistent REPL. The Continual Harness stores supplemental prompts, memories, skill descriptions, and reusable subagent specifications as durable state that Prime Agent can refine through small, evidence-backed updates, local to the session by default.

Prime Agent 是一个用于通用和长期任务的开源编码与研究智能体。它围绕两个核心抽象设计：递归语言模型（RLM）将上下文视为变量（提示词即变量），并将递归子智能体等工具视为持久化 REPL 内部的函数调用（程序化工具/子智能体调用）。“持续工具包”（Continual Harness）将补充提示词、记忆、技能描述和可重用的子智能体规范存储为持久状态，Prime Agent 可以通过基于证据的小型更新对其进行优化，默认情况下这些更新仅限于当前会话。

Prime Agent combines a persistent Python control environment with durable harness state, so useful working context and reusable operating patterns can outlive a single chat window. Everything is programmatic: persistent IPython is the built-in model tool; file operations, shell commands, tool use, subagents, and context management happen through code. Subagents are built in: rlm(...) spawns real child agents for parallel or background work and returns their results programmatically. The harness can improve: /refine reviews the current trajectory and can apply small, evidence-backed updates to supplemental harness state. It never rewrites the immutable base system prompt, and recorded snapshots support rollback. Skills are executable: skills are importable Python packages, and the built-in skill creator can turn recurring workflows into project or personal skills. Sessions run in the background: daemon-backed agents keep running when the terminal disconnects and can be reattached later. Agents communicate directly: running agents can exchange messages and orchestrate one another without routing everything through the user. Long tasks keep moving: automatic compaction, persistent goals, heartbeats, schedules, autonomous mode, and retained subagents preserve progress across turns and terminal sessions.

Prime Agent 将持久化的 Python 控制环境与持久的工具包状态相结合，使得有用的工作上下文和可重用的操作模式能够超越单一的聊天窗口。一切皆可编程：持久化的 IPython 是内置的模型工具；文件操作、Shell 命令、工具使用、子智能体和上下文管理均通过代码实现。子智能体是内置的：`rlm(...)` 可以生成真实的子智能体进行并行或后台工作，并以编程方式返回结果。工具包可以自我改进：`/refine` 命令会审查当前的执行轨迹，并对补充工具包状态应用基于证据的小型更新。它从不重写不可变的系统基础提示词，且记录的快照支持回滚。技能是可执行的：技能是可导入的 Python 包，内置的技能创建器可以将重复的工作流转化为项目或个人技能。会话在后台运行：由守护进程支持的智能体在终端断开后仍会继续运行，并可在稍后重新连接。智能体可以直接通信：运行中的智能体可以交换消息并相互协调，无需通过用户进行所有路由。长期任务持续推进：自动压缩、持久化目标、心跳机制、定时任务、自主模式和保留的子智能体，确保了跨轮次和终端会话的进度得以保存。

### Getting Started
Install the latest stable release on macOS or Linux:
`curl -fsSL https://app.primeintellect.ai/prime-agent/install.sh | sh`

### 入门指南
在 macOS 或 Linux 上安装最新的稳定版本：
`curl -fsSL https://app.primeintellect.ai/prime-agent/install.sh | sh`

The installer downloads a versioned release, verifies its SHA-256 checksum, installs the prime-agent command, and can prepare the IPython runtime used by the agent. Start Prime Agent from the repository or directory you want it to work in:
`cd /path/to/project`
`prime-agent`

安装程序会下载版本化的发行版，验证其 SHA-256 校验和，安装 `prime-agent` 命令，并准备智能体所需的 IPython 运行时。在您希望其工作的仓库或目录中启动 Prime Agent：
`cd /path/to/project`
`prime-agent`

On first launch, run `/login` to choose a subscription or API-key provider. Prime Agent works in the current directory and can run commands and modify files there. Use a disposable clone, clean worktree, or another checkpoint you can inspect and restore.

首次启动时，运行 `/login` 以选择订阅或 API 密钥提供商。Prime Agent 在当前目录下工作，并可以在该目录下运行命令和修改文件。请使用一次性的克隆、干净的工作树或其他您可以检查和恢复的检查点。

**Warning:** Prime Agent executes model-generated Python and project commands with your user permissions. Its worker and kernel processes improve lifecycle isolation and recovery; they are not a security sandbox. Review changes and use trusted repositories, instructions, skills, and extensions only. Run untrusted code or instructions in an external sandbox or restricted environment.

**警告：** Prime Agent 会以您的用户权限执行模型生成的 Python 代码和项目命令。其工作进程和内核进程改善了生命周期隔离和恢复能力，但它们并非安全沙箱。请审查更改，并仅使用受信任的仓库、指令、技能和扩展。请在外部沙箱或受限环境中运行不受信任的代码或指令。

### Useful commands:
* `prime-agent agents` # Browse running, idle, and saved sessions
* `prime-agent attach <agent>` # Reattach to a running session
* `prime-agent --resume <path|id>` # Resume a saved session
* `prime-agent status` # Inspect background service state
* `prime-agent doctor [--fix]` # Inspect or repair background services
* `prime-agent update [--force]` # Update Prime Agent
* `prime-agent shutdown [--force]` # Stop every agent, worker, and background service

### 常用命令：
* `prime-agent agents` # 浏览运行中、空闲和已保存的会话
* `prime-agent attach <agent>` # 重新连接到运行中的会话
* `prime-agent --resume <path|id>` # 恢复已保存的会话
* `prime-agent status` # 检查后台服务状态
* `prime-agent doctor [--fix]` # 检查或修复后台服务
* `prime-agent update [--force]` # 更新 Prime Agent
* `prime-agent shutdown [--force]` # 停止所有智能体、工作进程和后台服务

### Built for Long-Running Work
Prime Agent is built for long-running work, especially for evaluations in research. These features are available in the TUI, and when run autonomously.

### 专为长期任务打造
Prime Agent 专为长期任务而构建，特别适用于研究中的评估工作。这些功能在 TUI（终端用户界面）中可用，并在自主运行时生效。

* **Continual Harness:** `/refine` can persist focused, reviewable lessons as supplemental prompts, memories, reusable skill descriptions, or subagent specifications, with recorded refinement history. It does not replace packaging and reviewing new executable skills.
* **Direct agent-to-agent communication:** running agents and retained subagents can discover one another, exchange messages, and steer active work.
* **Daemon-backed continuity:** active sessions, IPython state, schedules, and subagents keep running when the terminal detaches and can be reattached later.
* **Heartbeats and schedules:** `/heartbeat`, `rlm_heartbeat`, and `prime-agent schedule` can re-enter a session periodically or at a specific time.
* **Persistent goals:** `/goal` keeps an objective and its progress active across turns until it is completed, paused, or cleared.
* **Bounded autonomous mode:** `/autonomous` continues within configured turn, token, and time budgets and can run user-defined quality gates. A passed gate checks only what that gate verifies; reaching a limit does not imply task success.

* **持续工具包：** `/refine` 可以将重点突出、可审查的经验教训持久化为补充提示词、记忆、可重用的技能描述或子智能体规范，并记录优化历史。这并不能替代对新可执行技能的打包和审查。
* **智能体间直接通信：** 运行中的智能体和保留的子智能体可以相互发现、交换消息并引导正在进行的工作。
* **守护进程支持的连续性：** 当终端断开连接时，活动会话、IPython 状态、定时任务和子智能体仍会继续运行，并可在稍后重新连接。
* **心跳与定时任务：** `/heartbeat`、`rlm_heartbeat` 和 `prime-agent schedule` 可以定期或在特定时间重新进入会话。
* **持久化目标：** `/goal` 可以在多个轮次中保持目标及其进度，直到任务完成、暂停或清除。
* **有界自主模式：** `/autonomous` 在配置的轮次、Token 和时间预算内运行，并可执行用户定义的质量门控。通过门控仅代表通过了该门控的验证；达到限制并不意味着任务成功。

### Documentation
* Quickstart — install, authenticate, and run a first session
* Usage and CLI reference — commands, sessions, autonomous limits, and output modes
* Long-running and background agents — detach and reattach, goals, heartbeats, and schedules
* RLM programming model — persistent IPython, subagents, skills, and the trust model
* JSON mode and RPC mode — headless automation and integrations
* Skills — install and create reusable capabilities
* Provider setup — subscription and API-key providers
* Architecture overview — daemon, worker, kernel, and persistence boundaries
* Development — build and run from source

### 文档
* 快速入门 — 安装、认证并运行第一个会话
* 用法与 CLI 参考 — 命令、会话、自主限制和输出模式
* 长期与后台智能体 — 分离与重新连接、目标、心跳和定时任务
* RLM 编程模型 — 持久化 IPython、子智能体、技能和信任模型
* JSON 模式与 RPC 模式 — 无头自动化与集成
* 技能 — 安装并创建可重用的功能
* 提供商设置 — 订阅与 API 密钥提供商
* 架构概览 — 守护进程、工作进程、内核和持久化边界
* 开发 — 从源码构建并运行

### Acknowledgements
Our agent and TUI is built on top of pi. We thank the authors of pi for their valuable work.

### 致谢
我们的智能体和 TUI 构建于 `pi` 之上。我们感谢 `pi` 的作者们所做的宝贵工作。

### License
Prime Agent is fully open source and released under the MIT License.

### 许可证
Prime Agent 完全开源，并根据 MIT 许可证发布。
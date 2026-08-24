---
title: "openinterpreter / openinterpreter"
originalUrl: "https://github.com/openinterpreter/openinterpreter"
date: "2026-07-15T22:21:03.851Z"
---

# Open Interpreter / openinterpreter

**Open Interpreter: A coding agent optimized for low-cost models.**
Open Interpreter：一款针对低成本模型优化的编程智能体。

**Installation**
**安装指南**

**macOS and Linux:** `curl -fsSL https://www.openinterpreter.com/install | sh`
**Windows:** `irm https://www.openinterpreter.com/install.ps1 | iex`
**Then type `i` or `interpreter` in your terminal to start a session.**
随后在终端输入 `i` 或 `interpreter` 即可开启会话。

**Harness Emulation**
**Harness（驱动框架）模拟**

**Open Interpreter is a fork of OpenAI's Codex, with a focus on emulating the agent harness that gets the best performance out of low-cost models. Use `/harness` to switch the active harness:**
Open Interpreter 是 OpenAI Codex 的一个分支，专注于模拟能够从低成本模型中获得最佳性能的智能体驱动框架（harness）。使用 `/harness` 命令可切换当前启用的驱动框架：

`> /harness native claude-code claude-code-bare zcode kimi-cli qwen-code deepseek-tui swe-agent minimal`

**Read more in the harness docs and model provider docs.**
更多信息请参阅驱动框架文档及模型提供商文档。

**Computer Use**
**计算机操作能力**

**Open Interpreter ships with a QA skill that lets any model operate and test interfaces. It can drive web apps in a real browser with `agent-browser`, or operate and test native apps with `trycua`.**
Open Interpreter 内置了 QA（质量保证）技能，允许任何模型操作并测试界面。它可以通过 `agent-browser` 在真实浏览器中驱动 Web 应用，或通过 `trycua` 操作并测试原生应用程序。

**Features**
**功能特性**

* **Runs commands inside native sandboxing on macOS, Linux, and Windows.**
  在 macOS、Linux 和 Windows 上通过原生沙盒运行命令。
* **Switches providers and models from the TUI with `/model`.**
  通过 TUI（终端用户界面）使用 `/model` 命令切换模型提供商和模型。
* **Inspects or switches Rust-native model harnesses with `/harness`.**
  通过 `/harness` 命令检查或切换 Rust 原生模型驱动框架。
* **Tests web and native apps through the built-in QA skill.**
  通过内置的 QA 技能测试 Web 和原生应用。
* **Runs as an Agent Client Protocol agent for editors with `interpreter acp`.**
  作为 Agent Client Protocol (ACP) 智能体为编辑器运行（使用 `interpreter acp`）。
* **Keeps config and session state local under `~/.openinterpreter`.**
  将配置和会话状态保存在本地的 `~/.openinterpreter` 目录下。
* **Supports exec, MCP, skills, hooks, permissions, and AGENTS.md.**
  支持 exec、MCP、技能、钩子（hooks）、权限管理以及 AGENTS.md。

**Documentation**
**文档**

* **Terminal docs** (终端文档)
* **Quickstart** (快速入门)
* **Install guide** (安装指南)
* **Configuration** (配置)
* **CLI reference** (CLI 参考)
* **Harnesses** (驱动框架)
* **Model providers** (模型提供商)
* **Sandbox & approvals** (沙盒与权限审批)

**Note: This is the new Rust version of Open Interpreter, based on Codex. Looking for the original Python project? It lives on as a community-maintained fork at `endolith/open-interpreter`.**
注意：这是基于 Codex 构建的 Open Interpreter 全新 Rust 版本。如果您在寻找最初的 Python 项目，它目前作为社区维护的分支存在于 `endolith/open-interpreter`。

**License: Apache-2.0**
许可证：Apache-2.0
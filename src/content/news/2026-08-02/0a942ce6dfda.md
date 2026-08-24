---
title: "wiff"
originalUrl: "https://wezfurlong.org/wiff/"
date: "2026-08-01T22:19:55.674Z"
---

# wiff

**wiff** is a terminal-centric diff and code-review utility: it captures a diff, lets you browse and annotate it with syntax highlighting, and persists the review as a local session that both a human (through the TUI) and an agent (through the CLI and a skill) can read and write concurrently.

**wiff** 是一款以终端为中心的 diff（差异对比）和代码审查工具：它能够捕获 diff，让你在语法高亮的支持下浏览并标注代码，并将审查结果保存为本地会话。人类（通过 TUI）和智能体（通过 CLI 和技能）都可以同时读取和写入这些会话。

Here is a short tour: opening a change, leaving a comment, switching themes, and resuming a session by id. See Screencasts for each of these on its own.

以下是简要介绍：打开变更、留下评论、切换主题以及通过 ID 恢复会话。请参阅“截屏演示”（Screencasts）查看各项功能的独立演示。

Where to next: Install wiff, from git or a checkout, and set up the agent skill. Reviewing covers the three kinds of review: a local change, a GitHub pull request, and an explore over existing code. The review interface walks through the terminal UI, and Key bindings lists every default key. Configuration documents config.toml and every option.

接下来该做什么：从 git 或检出代码安装 wiff，并设置智能体技能。“审查”（Reviewing）部分涵盖了三种审查类型：本地变更、GitHub Pull Request 以及对现有代码的探索。“审查界面”（Review interface）介绍了终端 UI 的使用方法，“快捷键”（Key bindings）列出了所有默认按键。“配置”（Configuration）文档则说明了 `config.toml` 及其所有选项。

Local first, forge when you want it: wiff has a rich local code-review model that needs no network access: it captures a diff from your working tree, index, or history and stores the review on your own disk, which makes it a good fit for private review of code that never leaves your machine.

本地优先，按需集成：wiff 拥有强大的本地代码审查模型，无需网络访问：它能从你的工作树、暂存区或历史记录中捕获 diff，并将审查结果存储在本地磁盘上，这使其非常适合用于那些无需离开机器的私有代码审查。

On top of that same model, a forge integration mirrors a GitHub pull request into a local session and publishes your review back, so you can review a PR from the comfort of the terminal.

在此模型之上，通过集成代码托管平台（Forge），wiff 可以将 GitHub 的 Pull Request 镜像到本地会话中，并将你的审查结果发布回去，让你能够舒适地在终端中完成 PR 审查。
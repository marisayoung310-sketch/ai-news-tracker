---
title: "pingdotgg / t3code"
originalUrl: "https://github.com/pingdotgg/t3code"
date: "2026-07-26T22:17:55.409Z"
---

# T3 Code

T3 Code is a minimal web GUI for coding agents (currently Codex, Claude, Cursor, and OpenCode, more coming soon).
T3 Code 是一个用于编码代理（目前支持 Codex、Claude、Cursor 和 OpenCode，更多支持即将推出）的极简 Web GUI。

### Installation Warning
### 安装警告

T3 Code currently supports Codex, Claude, Cursor, and OpenCode. Install and authenticate at least one provider before use:
T3 Code 目前支持 Codex、Claude、Cursor 和 OpenCode。在使用前，请至少安装并验证一个提供商：

*   **Codex:** install Codex CLI and run `codex login`
*   **Codex:** 安装 Codex CLI 并运行 `codex login`
*   **Claude:** install Claude Code and run `claude auth login`
*   **Claude:** 安装 Claude Code 并运行 `claude auth login`
*   **Cursor:** install Cursor CLI and run `cursor-agent login`
*   **Cursor:** 安装 Cursor CLI 并运行 `cursor-agent login`
*   **OpenCode:** install OpenCode and run `opencode auth login`
*   **OpenCode:** 安装 OpenCode 并运行 `opencode auth login`

### Run without installing
### 无需安装直接运行

`npx t3@latest`

**Tip:** Use `npx t3@latest --help` for the full CLI reference.
**提示：** 使用 `npx t3@latest --help` 查看完整的 CLI 参考。

### Desktop app
### 桌面应用

Install the latest version of the desktop app from GitHub Releases, or from your favorite package registry:
从 GitHub Releases 或您常用的包管理器安装最新版本的桌面应用：

*   **Windows (winget):** `winget install T3Tools.T3Code`
*   **macOS (Homebrew):** `brew install --cask t3-code`
*   **Arch Linux (AUR):** `yay -S t3code-bin`

### Some notes
### 注意事项

We are very very early in this project. Expect bugs. We are not accepting contributions yet. There's no public docs site yet, checkout the miscellaneous markdown files in `docs`.
本项目目前处于非常早期的阶段，可能会遇到 Bug。我们暂不接受贡献。目前还没有公开的文档网站，请查看 `docs` 文件夹中的各类 Markdown 文件。

### Documentation
### 文档

*   Getting started
*   入门指南
*   Remote access
*   远程访问
*   Keeping T3 Code in sync
*   保持 T3 Code 同步
*   Architecture overview
*   架构概览
*   Provider guides
*   提供商指南
*   Operations Reference
*   操作参考

If you REALLY want to contribute still.... read this first.
如果您仍然非常希望做出贡献……请先阅读此内容。

### Install vp
### 安装 vp

T3 Code uses Vite+ so you'll need to install the global `vp` command-line tool.
T3 Code 使用 Vite+，因此您需要安装全局 `vp` 命令行工具。

**macOS / Linux:**
`curl -fsSL https://vite.plus | bash`

**Windows:**
`irm https://vite.plus/ps1 | iex`

Checkout their getting started guide for more information: https://viteplus.dev/guide/
更多信息请查看他们的入门指南：https://viteplus.dev/guide/

### Install dependencies
### 安装依赖

`vp i`

Read `CONTRIBUTING.md` before opening an issue or PR.
在提交 Issue 或 PR 之前，请阅读 `CONTRIBUTING.md`。

Need support? Join the Discord.
需要支持？请加入 Discord。
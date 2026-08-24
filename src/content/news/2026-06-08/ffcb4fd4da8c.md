---
title: "Anthropic, please ship an official Claude Desktop for Linux"
originalUrl: "https://github.com/anthropics/claude-code/issues/65697"
date: "2026-06-07T22:32:29.053Z"
---

# Anthropic, please ship an official Claude Desktop for Linux
# Anthropic，请发布官方的 Linux 版 Claude Desktop

[FEATURE] Official Claude Desktop build for Linux (Ubuntu LTS / Debian) #65697
[功能请求] 官方 Linux 版 Claude Desktop 构建（支持 Ubuntu LTS / Debian）#65697

### Problem Statement
### 问题陈述

The closest open issue is #40347. I am filing this as a consolidation and extension of #40347 with corrected technical framing (Claude Code plugin development against Desktop extensions), named primary sourcing for the Cowork Linux-VM architecture, and current market data.
目前最接近的开放议题是 #40347。我提交此议题旨在整合并扩展 #40347，并修正技术框架（针对桌面扩展的 Claude Code 插件开发）、明确 Cowork Linux-VM 架构的来源，以及提供最新的市场数据。

On scope: this issue concerns Claude Code in two concrete ways. (1) Claude Code plugins are developed and tested against Claude Desktop extensions, which has no Linux build, so plugin work currently requires switching OS. (2) Cowork invokes the Claude Code binary inside a Linux VM on macOS, so the Linux execution path already exists inside the Claude Code product and is the practical thing missing as a published target.
关于范围：此议题在两个具体方面涉及 Claude Code。(1) Claude Code 插件是在 Claude Desktop 扩展的基础上开发和测试的，而后者没有 Linux 版本，因此插件开发目前需要切换操作系统。(2) Cowork 在 macOS 上通过 Linux 虚拟机调用 Claude Code 二进制文件，这意味着 Linux 执行路径已经在 Claude Code 产品中存在，目前缺失的仅仅是作为一个已发布的版本目标。

### What this issue is asking for
### 此议题的诉求

A public Anthropic position on Linux desktop support, and ideally a first-party build. A reasoned "not on the current roadmap, and here is why" would resolve most of what this issue is about. There is, to my knowledge, no public statement on Linux desktop support; the absence is itself part of the problem.
希望 Anthropic 能就 Linux 桌面支持给出公开立场，最好能提供官方构建版本。即使是给出合理的“目前不在路线图中，原因如下”的解释，也能解决此议题的大部分诉求。据我所知，目前没有任何关于 Linux 桌面支持的公开声明；这种缺失本身就是问题的一部分。

### Current state
### 当前现状

Anthropic distributes Claude Desktop for macOS and Windows only. The official download page states "Not available for Linux". Claude Code (the CLI) runs natively on Linux but is a terminal tool, not a substitute for the desktop GUI. Desktop extensions, computer use, desktop dictation and Cowork are available only in Claude Desktop. Linux users therefore have no officially supported graphical path to these capabilities.
Anthropic 目前仅分发 macOS 和 Windows 版的 Claude Desktop。官方下载页面明确标注“不支持 Linux”。Claude Code（命令行工具）虽然可以在 Linux 上原生运行，但它只是终端工具，无法替代桌面图形界面。桌面扩展、计算机使用（Computer Use）、桌面听写和 Cowork 功能仅在 Claude Desktop 中提供。因此，Linux 用户目前没有官方支持的图形化途径来使用这些功能。

### Why it matters that it is missing
### 缺失为何重要

Claude Desktop handles OAuth tokens, API keys, and extension configurations. It is a credential-handling application running on developer workstations. Linux users currently obtain it via third-party repackages of the Windows Electron build. A non-trivial number of Claude users entrust their credentials and local filesystem access to a third-party repackage because Anthropic ships nothing official. The structural risk is not about the current maintainers; it is the precedent on a platform Anthropic's own agent runtime depends on.
Claude Desktop 处理 OAuth 令牌、API 密钥和扩展配置，是一款运行在开发者工作站上的凭据处理应用。Linux 用户目前只能通过第三方对 Windows Electron 构建版本的重打包来使用它。相当一部分 Claude 用户因为 Anthropic 没有提供官方版本，而不得不将凭据和本地文件系统访问权限交给第三方重打包版本。这种结构性风险不在于当前的维护者，而在于 Anthropic 自身的代理运行时所依赖的平台却缺乏官方支持。

### Proposed Solution
### 建议方案

Publish an official Claude Desktop build for Linux, targeting the two current Ubuntu LTS releases (and Debian) as a signed .deb via an Anthropic-operated apt repository, using the same distribution pipeline Claude Code already uses for Linux.
发布官方的 Linux 版 Claude Desktop 构建，针对当前两个 Ubuntu LTS 版本（及 Debian），通过 Anthropic 运营的 apt 仓库提供签名的 .deb 包，并使用 Claude Code 目前已在 Linux 上使用的相同分发流水线。
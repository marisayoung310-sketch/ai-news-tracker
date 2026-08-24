---
title: "Are We GlobalShortcuts Yet?"
originalUrl: "https://areweglobalshortcutsyet.github.io"
date: "2026-06-25T23:00:38.277Z"
---

# Are We GlobalShortcuts Yet?

**Are We GlobalShortcuts Yet?**

我们实现 GlobalShortcuts 了吗？

**Tracking GlobalShortcuts integration progress. Cataloging progress of XDG GlobalShortcuts integration for applications on Wayland. If you would like to add an application to track please submit a pull request.**

追踪 GlobalShortcuts 的集成进度。本项目旨在编录 Wayland 应用程序对 XDG GlobalShortcuts 的集成情况。如果您希望添加需要追踪的应用程序，请提交 Pull Request。

### Application Progress

### 应用程序进度

**About GlobalShortcuts**

**关于 GlobalShortcuts**

**GlobalShortcuts is an XDG Desktop Portal implementation that enables applications on Wayland to register and use global keyboard shortcuts. It allows apps to respond to specific key combinations while unfocused without needing direct access to all user input events.**

GlobalShortcuts 是一种 XDG Desktop Portal 实现，它使 Wayland 上的应用程序能够注册并使用全局键盘快捷键。它允许应用程序在未获得焦点时响应特定的按键组合，而无需直接访问所有的用户输入事件。

**Why this matters**

**为什么这很重要**

**Currently, some applications circumvent sandboxing and Wayland security defaults by requesting full input monitoring permissions instead of using GlobalShortcuts. This forces users to choose between application functionality and security.**

目前，一些应用程序为了绕过沙盒限制和 Wayland 的默认安全设置，会请求完整的输入监控权限，而不是使用 GlobalShortcuts。这迫使用户不得不在应用程序的功能性和安全性之间做出选择。

**We want to track application support for the portal to highlight when developers move toward a secure "least privilege" model and support OS defaults.**

我们希望追踪应用程序对该 Portal 的支持情况，以突出显示开发者何时转向安全的“最小权限”模型并支持操作系统默认设置。

**Submit an Application or Update**

**提交应用程序或更新**

**Source available on GitHub. Help us keep this current by submitting a pull request to fix inaccuracies or add new applications. If you're not familiar with JSON there's also a formatting tool available here.**

源代码可在 GitHub 上获取。请通过提交 Pull Request 来修正错误或添加新应用程序，帮助我们保持信息更新。如果您不熟悉 JSON，这里也提供了一个格式化工具。

**1. Fork this repository to your own GitHub account.**

1. 将此仓库 Fork 到您自己的 GitHub 账户。

**2. Edit tracker.json with updated information or a new application.**

2. 编辑 `tracker.json` 以更新信息或添加新的应用程序。

**3. Commit your changes with a brief description of what you updated.**

3. 提交您的更改，并简要描述您更新的内容。

**4. Submit a Pull Request from your fork back to the main project for review.**

4. 从您的 Fork 仓库提交 Pull Request 到主项目以供审核。
---
title: "macro-inc / macro"
originalUrl: "https://github.com/macro-inc/macro"
date: "2026-08-12T22:17:49.069Z"
---

# Macro: The All-in-One Workspace

Macro is the all-in-one workspace for you and your team. It unifies email + messages + docs + tasks + agents + CRM into a single fast interface with shared team-level memory. Everything in your workspace is @linked and searchable so your team (and your agents) never have to switch tools.

Macro 是为您和您的团队打造的一体化工作空间。它将电子邮件、消息、文档、任务、智能体（Agents）和 CRM 集成到一个快速的界面中，并具备共享的团队级记忆功能。工作空间中的一切内容都可以通过 @ 链接并可搜索，因此您的团队（以及您的智能体）无需再切换工具。

### Why Macro
We built Macro because we wanted a single operating system for our startup. There are many good software products, and we used them all — Slack, Linear, Notion, HubSpot, and Superhuman — but they don't work together as one system. As we scaled our last venture to ~20 people things started to break: every team got their own tools and the company was held together by MCP and Zapier. The company was not computable. It was chaotic.

### 为什么选择 Macro
我们开发 Macro 是因为我们想为自己的初创公司打造一个统一的操作系统。市面上有很多优秀的软件产品，我们几乎都用过——Slack、Linear、Notion、HubSpot 和 Superhuman——但它们无法作为一个整体系统协同工作。当我们上一家公司扩展到约 20 人时，问题开始显现：每个团队都有自己的工具，公司只能靠 MCP 和 Zapier 勉强维持。公司变得无法“计算”，陷入了混乱。

Macro is a complete redesign of work software from the ground up as a single system. Designed by us in NYC and Toronto, dogfooded by our team of ~15 for two years. Built in SolidJS and Rust for speed and reliability. We're focused on building something that any small company or team at a larger company can use as their "operating system".

Macro 是从零开始对办公软件进行的彻底重构，旨在打造一个单一系统。它由我们在纽约和多伦多的团队设计，并由我们约 15 人的团队进行了两年的内部测试（dogfooding）。它采用 SolidJS 和 Rust 构建，以确保速度和可靠性。我们专注于打造一个让任何小型公司或大型公司内部团队都能将其作为“操作系统”使用的产品。

### Features
Macro is composed of 'blocks' designed to be modular, extensible, and work together like Lego. For each block, we studied the best prior art and tried to make it even better. Each surface is purpose-built for its job rather than composed from a generic block primitive — but every one of them shares the same backend; cross-references between a doc and a task, or a channel message and an email, are natively stored as a bidirectional graph.

### 功能特性
Macro 由多个“模块”（blocks）组成，这些模块设计为模块化、可扩展，并像乐高积木一样协同工作。对于每个模块，我们都研究了业界最佳实践，并力求做得更好。每个界面都是针对其特定任务专门构建的，而不是由通用的基础模块拼凑而成——但它们共享同一个后端；文档与任务之间、频道消息与电子邮件之间的交叉引用，均以双向图的形式原生存储。

### Macro Mail: Multiple email inboxes w/ good AI tools, integrated CRM
Macro Mail is inspired by Superhuman's keyboard-first interface with a few key additions:
*   **Multi-account:** Triage all your Google accounts in a single inbox, with the same tagging and sharing system.
*   **Unified inbox:** Emails, messages, @mentions, and tasks to complete, all in the same list. Use j k and e to navigate everything.
*   **Better AI:** With a tools/MCP surface designed to work across inboxes and to help your agents more accurately retrieve information.

### Macro Mail：集成 CRM 的多邮箱 AI 工具
Macro Mail 的灵感来源于 Superhuman 的键盘优先界面，并增加了一些关键功能：
*   **多账户：** 在同一个收件箱中处理您所有的 Google 账户，并使用相同的标签和共享系统。
*   **统一收件箱：** 电子邮件、消息、@提及和待办任务都在同一个列表中。使用 j、k 和 e 键即可导航一切。
*   **更强的 AI：** 具备跨收件箱工作的工具/MCP 界面，帮助您的智能体更准确地检索信息。

### Macro Chat: Team chat for focused technical discussions
Macro Chat is designed to be more focused than Slack. The first couple of replies show inline and the rest collapse into a thread, so a busy channel stays readable. Threads are permissioned severally so you can share threads across channels by copying links. Everything is stored in a bidirectional graph, so tasks @link to messages that created them, customer support emails tie into support channels, CRM records get updated when they're discussed in messages, etc.

### Macro Chat：专注于技术讨论的团队聊天
Macro Chat 的设计比 Slack 更专注。前几条回复会内联显示，其余的则折叠进线程中，从而保持繁忙频道的易读性。线程具有独立的权限设置，因此您可以通过复制链接在不同频道间共享线程。所有内容都存储在双向图中，因此任务可以 @链接 到创建它们的消息，客户支持邮件可以关联到支持频道，CRM 记录在消息中被讨论时会自动更新，等等。

### Task management built around chat
The core problem with traditional issue trackers or project management tools is that they get out of date. The reason they get out of date is that they're a separate system from where the conversation really happens.

### 基于聊天的任务管理
传统问题追踪器或项目管理工具的核心问题在于它们容易过时。它们过时的原因在于，它们与实际发生对话的地方是分离的系统。
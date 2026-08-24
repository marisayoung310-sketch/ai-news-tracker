---
title: "Ghost: A Database for Our Times?"
originalUrl: "https://towardsdatascience.com/ghost-a-database-for-our-times/"
date: "2026-05-01T22:53:51.727Z"
---

# Ghost: A Database for Our Times?
# Ghost：属于我们这个时代的数据库？

I came across a very interesting product the other day, which I think may be perfect for AI-related use cases. Ghost, from ghost.build, describes itself as “the first database built for agents.”
前几天我偶然发现了一个非常有趣的产品，我认为它非常适合与人工智能相关的应用场景。来自 ghost.build 的 Ghost 将自己描述为“第一个为智能体（AI Agents）构建的数据库”。

Ghost is an “agent-first” Postgres database platform that lets developers and AI agents create, fork, inspect, query, manipulate and delete entire databases with ease. It’s also completely free to use.
Ghost 是一个“智能体优先”的 Postgres 数据库平台，它让开发者和 AI 智能体能够轻松地创建、分叉（fork）、检查、查询、操作和删除整个数据库。而且，它是完全免费使用的。

The developers who built it had a simple idea: if agents are going to build software, test migrations, inspect schemas, run SQL, and experiment with data, then they need databases that are as disposable and programmable as code sandboxes. That is where Ghost fits.
开发它的团队有一个简单的想法：如果智能体要构建软件、测试迁移、检查模式、运行 SQL 并进行数据实验，那么它们就需要像代码沙箱一样可丢弃、可编程的数据库。这正是 Ghost 的用武之地。

When you create a Ghost database or fork existing ones, those databases live on Ghost’s Cloud infrastructure, not on your local system. Ghost is especially useful for testing, prototyping, agent workflows, branch databases, migration experiments, and disposable database environments.
当你创建 Ghost 数据库或分叉现有数据库时，这些数据库运行在 Ghost 的云基础设施上，而不是你的本地系统上。Ghost 在测试、原型设计、智能体工作流、分支数据库、迁移实验和一次性数据库环境方面特别有用。

Traditional managed databases are designed around long-lived production infrastructure. You create an instance, configure networking, manage credentials, connect applications, and then treat the database as something valuable and fragile.
传统的托管数据库是围绕长期运行的生产基础设施设计的。你需要创建一个实例、配置网络、管理凭据、连接应用程序，然后将数据库视为一种珍贵且脆弱的东西来维护。

Ghost keeps the power of Postgres, but adds a workflow that feels much closer to modern agentic development: create a database on demand, fork it when you need an isolated copy, run SQL against it, inspect the schema, try different table configurations, and throw it away when you are done.
Ghost 保留了 Postgres 的强大功能，但增加了一种更贴近现代智能体开发的工作流：按需创建数据库，在需要隔离副本时进行分叉，对其运行 SQL，检查模式，尝试不同的表配置，并在完成后将其丢弃。

This makes Ghost especially well-suited to AI tools like Codex and Claude Code. Those tools can reason about code, write migrations, debug queries, generate seed data, inspect logs, and use MCP tools. Ghost’s built-in MCP server gives Codex direct database management capabilities, rather than forcing the agent to rely on vague instructions, copied connection strings, or manual dashboard work.
这使得 Ghost 特别适合像 Codex 和 Claude Code 这样的 AI 工具。这些工具可以推理代码、编写迁移脚本、调试查询、生成种子数据、检查日志并使用 MCP 工具。Ghost 内置的 MCP 服务器赋予了 Codex 直接的数据库管理能力，而无需强迫智能体依赖模糊的指令、复制的连接字符串或手动操作仪表板。

In the rest of this article, I’ll take you through how to install Ghost on your local system. We’ll then look at four concrete examples of using Ghost with the Codex agent and its own CLI. N.B. I have no affiliation or association with the company or team behind Ghost or the Ghost product itself.
在本文的其余部分，我将带你了解如何在本地系统上安装 Ghost。然后，我们将通过四个具体的例子，看看如何将 Ghost 与 Codex 智能体及其自带的 CLI 配合使用。注：我与 Ghost 背后的公司或团队，以及 Ghost 产品本身没有任何隶属或关联关系。

---

### Prerequisites / 前置条件

I’m assuming you already have one of Ghost’s supported coding agents installed on your system. These include: Claude Code, Codex, Cursor, Gemini CLI, Google Antigravity, Kiro CLI, VS Code, Windsurf. You will also need a GitHub account, which you will need to grant Ghost access to when logging in.
我假设你的系统上已经安装了 Ghost 支持的编码智能体之一。这些包括：Claude Code、Codex、Cursor、Gemini CLI、Google Antigravity、Kiro CLI、VS Code 和 Windsurf。你还需要一个 GitHub 账号，在登录时需要授权 Ghost 访问。

### Installing Ghost / 安装 Ghost

On Linux, WSL on Windows, or macOS, you can use the following curl command:
在 Linux、Windows 的 WSL 或 macOS 上，你可以使用以下 curl 命令：

`$ curl -fsSL https://install.ghost.build | sh`

If, like me, you’re on Windows, you can use this command from a PowerShell terminal:
如果你像我一样使用 Windows，可以在 PowerShell 终端中使用此命令：

`PS C:\Users\thoma> irm https://install.ghost.build/install.ps1 | iex`

Then run: / 然后运行：

`PS C:\Users\thoma> ghost login`

Opening browser for authentication... Found space: nj5scy2orp Successfully logged in as [email protected]
正在打开浏览器进行身份验证... 找到空间：nj5scy2orp 已成功以 [email protected] 身份登录。

You’ll be presented with a screen like this. Authorise Ghost to continue. After you’re logged in correctly, the next thing you should do is make the Ghost MCP server available to your favourite coding agent.
你将看到类似这样的屏幕。授权 Ghost 继续。成功登录后，接下来要做的是让 Ghost MCP 服务器对你最喜欢的编码智能体可用。

In my case, I’m using Codex. Type the following into the command line and choose your agent from the displayed list:
以我为例，我使用的是 Codex。在命令行中输入以下内容，并从显示的列表中选择你的智能体：

`PS C:\Users\thoma> ghost mcp install`

(Select an MCP client to configure: 1. Claude Code, 2. Codex, 3. Cursor, 4. Gemini CLI, 5. Google Antigravity, 6. Kiro CLI, 7. VS Code, 8. Windsurf)
（选择要配置的 MCP 客户端：1. Claude Code, 2. Codex, 3. Cursor, 4. Gemini CLI, 5. Google Antigravity, 6. Kiro CLI, 7. VS Code, 8. Windsurf）

Typing: 2. Successfully installed Ghost MCP server configuration for codex.
输入：2。已成功为 codex 安装 Ghost MCP 服务器配置。

### Check that your setup is OK / 检查设置是否正常

Type in the following to check that the Ghost MCP is installed correctly:
输入以下内容以检查 Ghost MCP 是否安装正确：

`PS C:\Users\thoma> ghost mcp list`

Check that your agent can use the Ghost MCP server. You should see output similar to this (for Codex):
检查你的智能体是否可以使用 Ghost MCP 服务器。你应该看到类似这样的输出（以 Codex 为例）：

`PS C:\Users\thoma> codex mcp list`

Assuming everything is OK, we can move on to more examples of using Ghost via its CLI and agents through its MCP server.
假设一切正常，我们可以继续探讨通过其 CLI 以及通过 MCP 服务器使用智能体来操作 Ghost 的更多示例。

### Example 1 — Creating a sales data database / 示例 1 — 创建销售数据数据库

Open up your coding agent and type the following into it:
打开你的编码智能体并输入以下内容：

`Codex> Create a ghost database called sales_data that stores 10,000 dummy sales records. In the database, create whichever tables are suitable for such data. Do not include any indexes, primary or foreign keys for now.`
`Codex> 创建一个名为 sales_data 的 ghost 数据库，存储 10,000 条虚拟销售记录。在数据库中，创建适合此类数据的表。暂时不要包含任何索引、主键或外键。`

I got this output from Codex:
我从 Codex 得到了以下输出：

*Worked for 1m 32s. Created a fresh Ghost database named sales_data. It contains 10,000 dummy sales order records and supporting tables: customers (1,000), products (150), sales_reps (30), sales_orders (10,000), sales_order_items (30,000). Per your instruction, I did not create any: primary keys, foreign keys, indexes.*
*耗时 1 分 32 秒。创建了一个名为 sales_data 的全新 Ghost 数据库。它包含 10,000 条虚拟销售订单记录和支持表：customers (1,000), products (150), sales_reps (30), sales_orders (10,000), sales_order_items (30,000)。按照你的指示，我没有创建任何：主键、外键、索引。*

As you can see, on my system, this took just over a minute and a half, which is a pretty impressive statistic for what was accomplished.
如你所见，在我的系统上，这只花了一分半钟多一点，对于所完成的工作来说，这是一个相当令人印象深刻的数据。

### Example 2 — Using the Ghost CLI / 示例 2 — 使用 Ghost CLI

Now that we have a database to play with, let’s try out some of the Ghost CLI commands.
现在我们有了一个可以操作的数据库，让我们尝试一些 Ghost CLI 命令。
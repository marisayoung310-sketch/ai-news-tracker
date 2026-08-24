---
title: "citrolabs / ego-lite"
originalUrl: "https://github.com/citrolabs/ego-lite"
date: "2026-07-23T22:31:28.762Z"
---

# citrolabs / ego-lite

The best browser for both you and your AI agents work in parallel. ego (lite) is a browser where you and your AI agents work in parallel. Your agents run multiple browser tasks in their own Spaces while your tabs stay yours, and tasks complete faster on fewer tokens.
最适合你与 AI 智能体并行工作的浏览器。ego (lite) 是一款让你与 AI 智能体能够并行工作的浏览器。你的智能体可以在各自的“空间”（Spaces）中运行多个浏览器任务，而你的标签页则保持独立；任务完成速度更快，且消耗的 Token 更少。

Existing tools like browser-use and agent-browser are browser automation frameworks: they need a separate browser to drive, logins never carry cleanly, and you and the agent end up fighting for the same tabs. ego lite is one browser designed from the start for the two of you to share. No extra setup, and the agent can always reach your real logins and tabs through ego-browser.
现有的工具（如 browser-use 和 agent-browser）属于浏览器自动化框架：它们需要一个独立的浏览器来驱动，登录状态往往无法完美同步，且你和智能体最终会争抢同一个标签页。ego lite 是一款从设计之初就旨在让你与智能体共享的浏览器。无需额外配置，智能体始终可以通过 ego-browser 访问你真实的登录状态和标签页。

### Quick Start
### 快速开始

ego lite runs on macOS today. Windows and Linux are on the roadmap.
ego lite 目前支持 macOS，Windows 和 Linux 版本正在开发计划中。

**1. Install**
**1. 安装**

Pick whichever fits your flow.
选择适合你工作流的方式。

**1.1 Download the macOS app**
**1.1 下载 macOS 应用**

Click to download, then open it to install. Either way, ego lite adds the ego-browser skill to every agent's skills directory on your machine.
点击下载并打开安装。无论哪种方式，ego lite 都会将 ego-browser 技能添加到你机器上每个智能体的技能目录中。

**1.2 Add the skill with npx**
**1.2 使用 npx 添加技能**

Install just the ego-browser skill: `npx skills add citrolabs/ego-lite`
仅安装 ego-browser 技能：`npx skills add citrolabs/ego-lite`

The first time your agent runs a browser task, it walks you through installing the ego lite app.
当你的智能体首次运行浏览器任务时，它会引导你完成 ego lite 应用的安装。

**1.3 Let your agent set it up**
**1.3 让你的智能体进行设置**

Paste this into your agent: `Set up ego lite for me: https://github.com/citrolabs/ego-lite`
将以下内容粘贴给你的智能体：`Set up ego lite for me: https://github.com/citrolabs/ego-lite`

Read `skills/ego-browser/references/install.md` and follow the steps to install ego lite. On first launch, ego lite asks one question, whether to migrate your Chrome data. Say yes and your agent inherits your existing logins, cookies, extensions, and bookmarks.
阅读 `skills/ego-browser/references/install.md` 并按照步骤安装 ego lite。首次启动时，ego lite 会询问是否迁移你的 Chrome 数据。选择“是”，你的智能体即可继承你现有的登录信息、Cookie、扩展程序和书签。

**2. Run your first task**
**2. 运行你的第一个任务**

In your agent CLI, type `/ego-browser` followed by a space, then describe what you want in plain language:
在你的智能体命令行界面（CLI）中，输入 `/ego-browser` 后加一个空格，然后用自然语言描述你的需求：

`ego-browser follow @ego_agent on x.com for me`

The agent picks up the ego-browser skill, opens the page in its own Space, reads a Snapshot, acts on the page, and reports back, all while your own tabs stay untouched. Your browsing data stays on your device. ego lite only records whether you opted into Chrome migration during setup.
智能体调用 ego-browser 技能，在自己的“空间”中打开页面，读取快照（Snapshot），执行操作并反馈结果，全程不会触动你的标签页。你的浏览数据保留在本地设备上。ego lite 仅记录你在设置过程中是否选择了迁移 Chrome 数据。

### Highlight of ego lite
### ego lite 亮点

**Code base, not CLI base, for faster runs with fewer tokens on complex tasks**
**基于代码而非 CLI，在处理复杂任务时速度更快、消耗 Token 更少**

The capabilities ego lite exposes to the agent are wrapped as JavaScript functions the agent calls directly. The agent gets to do what it does best: write code, composing a multi-step task into a single output instead of getting stuck in a "call two commands, look at the result, call two more commands" loop. Compared to the conventional CLI approach, complex workflows finish up to 2.5× faster with higher task success rates and far fewer tool calls per task.
ego lite 向智能体提供的能力被封装为 JavaScript 函数，智能体可直接调用。智能体可以发挥其所长：编写代码，将多步任务组合成单一输出，而不是陷入“调用两个命令、查看结果、再调用两个命令”的循环中。与传统的 CLI 方法相比，复杂工作流的完成速度最高可提升 2.5 倍，任务成功率更高，且每个任务所需的工具调用次数大幅减少。

**A dedicated Space for every agent**
**为每个智能体提供专属空间**

ego lite gives each agent its own fully isolated Space. You browse up front, your agent works in the background, and they don't get in each other's way. You can see which Space has an agent running at any moment, and take it over or stop it whenever you want.
ego lite 为每个智能体提供完全隔离的“空间”。你在前台浏览，智能体在后台工作，互不干扰。你可以随时查看哪个空间正在运行智能体，并根据需要接管或停止它。

**Your agents multitask in Spaces, parallel workspaces inside the same browser**
**智能体在“空间”中进行多任务处理，即同一浏览器内的并行工作区**

Each Space gets its own AI agent or its own task, all running at the same time. Claude Code enriching 10 leads in 10 parallel Spaces. Codex scraping 5 competitor sites in 5 more. They don't collide or steal your tabs. Your mouse stays where you left it.
每个空间拥有独立的 AI 智能体或任务，且同时运行。例如：Claude Code 在 10 个并行空间中丰富 10 条线索；Codex 在另外 5 个空间中抓取 5 个竞争对手网站。它们不会冲突，也不会抢占你的标签页。你的鼠标位置保持不变。

**The strongest page Snapshot on the market**
**市场上最强大的页面快照功能**

Thanks to kernel-level customization, ego lite produces the highest-quality page snapshots, the view text models rely on to "see" and act on a webpage. It reliably handles tough cases like deeply nested iframes, exactly where other approaches consistently break down.
得益于内核级的定制，ego lite 能生成最高质量的页面快照——这是文本模型“观察”并操作网页所依赖的基础。它能可靠地处理深度嵌套 iframe 等棘手情况，而这些正是其他方案经常失效的地方。

**Any agent can drive it through ego-browser**
**任何智能体均可通过 ego-browser 进行驱动**

ego-browser is the connection layer between any agent CLI (Claude Code, Codex, Cursor, or a custom one) and ego lite. It exposes the browser as a set of in-page JavaScript tools: snapshot, fill, click, wait, navigate, capture. The agent writes a JavaScript snippet calling those tools, and ego-browser runs it on the page in one pass.
ego-browser 是任何智能体 CLI（如 Claude Code、Codex、Cursor 或自定义 CLI）与 ego lite 之间的连接层。它将浏览器暴露为一组页面内 JavaScript 工具：snapshot（快照）、fill（填充）、click（点击）、wait（等待）、navigate（导航）、capture（捕获）。智能体编写调用这些工具的 JavaScript 代码片段，ego-browser 则一次性在页面上执行。

**Experience accumulation that makes your agent faster the more you use it (coming soon)**
**经验积累，越用越快（即将推出）**

Most of an agent's time on browser tasks goes to trial and error. ego lite's official Skill distills every successful action into reusable tools and workflows, so similar tasks down the line run up to 5x faster.
智能体在浏览器任务中大部分时间都花在试错上。ego lite 的官方技能会将每次成功的操作提炼为可复用的工具和工作流，从而使后续类似任务的运行速度最高提升 5 倍。

### ego lite vs existing products
### ego lite 与现有产品对比

Two other categories try to solve the same problem. Browser automation frameworks like Browser-Use and Vercel's agent-browser are libraries the agent calls; they ship no browser of their own, so they need a separate one to drive and your logins rarely carry cleanly. AI browsers like ChatGPT Atlas and Perplexity Comet ship a built-in agent, and only that agent can drive the browser. ego lite is one browser, designed from the start for you and any agent you bring to share.
目前有两类产品试图解决同样的问题。Browser-Use 和 Vercel 的 agent-browser 等浏览器自动化框架是智能体调用的库；它们不自带浏览器，因此需要驱动一个独立的浏览器，且登录状态往往无法完美同步。ChatGPT Atlas 和 Perplexity Comet 等 AI 浏览器则内置了智能体，且仅限该智能体驱动浏览器。ego lite 是一款从设计之初就旨在让你与你带来的任何智能体共享的浏览器。

### Benchmarks
### 基准测试

We benchmarked ego lite against Vercel's agent-browser on four complex browser automation tasks. ego lite finished each task up to 2.5× faster, with substantially fewer tokens. The harder the task, the bigger the gap.
我们在四个复杂的浏览器自动化任务上对 ego lite 与 Vercel 的 agent-browser 进行了基准测试。ego lite 完成每个任务的速度最高提升了 2.5 倍，且消耗的 Token 显著减少。任务越复杂，差距越明显。
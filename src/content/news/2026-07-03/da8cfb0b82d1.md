---
title: "You Are Wasting Too Many Tokens on Claude"
originalUrl: "https://dev.to/imamabubakar/you-are-wasting-too-many-tokens-on-claude-1nk2"
date: "2026-07-02T22:38:47.683Z"
---

# You Are Wasting Too Many Tokens on Claude
# 你在 Claude 上浪费了太多 Token

A lot of developers are using Claude the expensive way. They open Cursor, Claude Code, or their IDE. Then every session starts the same way: “Here is what my project does.” “Here is my tech stack.” “Here is the folder structure.” “Here is the bug.” “Here is what we worked on last time.” “Don’t change this file.” “Use this pattern.” That works for a while. But once the project grows, this becomes painful. You spend too much time repeating context. Claude spends too much time re-reading information. And your tokens disappear faster than they should.
许多开发者正在以一种昂贵的方式使用 Claude。他们打开 Cursor、Claude Code 或 IDE，然后每次会话都以同样的方式开始：“这是我的项目功能。”“这是我的技术栈。”“这是文件夹结构。”“这是 Bug。”“这是我们上次做的工作。”“不要修改这个文件。”“使用这种模式。”这在初期尚可，但一旦项目变大，就会变得非常痛苦。你花费太多时间重复背景信息，Claude 也花费太多时间重新阅读这些信息，导致你的 Token 消耗速度远超预期。

The problem is not that Claude is bad. The problem is that most people are not giving Claude a stable project memory. The Better Way: Use a Project Memory File. For Claude Code, this is usually a `CLAUDE.md` file. For Cursor, you can also use project rules or an instruction file. The idea is simple: Create one file that explains the project clearly. Then make Claude use that file as the source of truth. Instead of explaining the project every time, Claude reads the file. Instead of guessing patterns, Claude checks the file. Instead of forgetting decisions, Claude updates the file. This gives your AI coding workflow structure.
问题不在于 Claude 不好，而在于大多数人没有给 Claude 提供一个稳定的项目记忆。更好的方法是：使用项目记忆文件。对于 Claude Code，这通常是一个 `CLAUDE.md` 文件；对于 Cursor，你也可以使用项目规则或指令文件。思路很简单：创建一个能清晰解释项目的文件，然后让 Claude 将其作为“事实来源”。Claude 不必每次都听你解释，而是直接读取文件；它不必猜测模式，而是查阅文件；它不必遗忘决策，而是更新文件。这为你的 AI 编程工作流提供了结构。

### What Your CLAUDE.md File Should Include
### 你的 CLAUDE.md 文件应该包含什么

Your file does not need to be complicated. Start with something simple.
你的文件不需要很复杂，从简单的开始即可。

1. **Project Overview**: Explain what the product does in plain English. Example: “This is a SaaS platform that allows small businesses to create online stores, manage products, receive orders, and track payments.” Claude needs to understand the product before touching the code.
1. **项目概述**：用通俗的语言解释产品功能。例如：“这是一个 SaaS 平台，允许小企业创建在线商店、管理产品、接收订单并跟踪付款。”Claude 在触碰代码前必须先理解产品。

2. **Tech Stack**: List the main technologies. Frontend, Backend, Database, Authentication, Payments, Storage, Email, AI services, Deployment. This stops Claude from suggesting random tools that do not fit your stack.
2. **技术栈**：列出主要技术，包括前端、后端、数据库、身份验证、支付、存储、邮件、AI 服务和部署方式。这能防止 Claude 推荐与你技术栈不符的随机工具。

3. **Folder Structure**: Explain where important things live. Example: `/app` for routes, `/components` for reusable UI, `/lib` for utilities, `/server` for backend logic, `/db` for schema and queries. This helps Claude find the right files faster.
3. **文件夹结构**：解释重要文件的位置。例如：`/app` 放路由，`/components` 放可复用 UI，`/lib` 放工具类，`/server` 放后端逻辑，`/db` 放 Schema 和查询。这能帮助 Claude 更快找到正确的文件。

4. **Coding Rules**: Define how code should be written. Example: Use TypeScript, avoid unnecessary abstractions, keep components small, do not create new libraries without asking, follow existing naming patterns, do not rewrite working code unless needed. These rules save you from messy AI-generated code.
4. **编码规则**：定义代码编写规范。例如：使用 TypeScript，避免不必要的抽象，保持组件精简，未经允许不引入新库，遵循现有的命名模式，除非必要否则不要重写已有的代码。这些规则能让你免受混乱的 AI 生成代码之苦。

5. **Current Features**: List what already works. Authentication, Dashboard, Payments, Notifications, Admin panel, Analytics. This prevents Claude from rebuilding features that already exist.
5. **当前功能**：列出已实现的功能，如身份验证、仪表盘、支付、通知、管理后台、分析等。这能防止 Claude 重复构建已有的功能。

6. **Current Work**: Add the feature or bug being worked on right now. Example: “Currently working on invoice reminders. The goal is to send automatic reminders before and after invoice due dates.” This keeps the session focused.
6. **当前工作**：添加当前正在处理的功能或 Bug。例如：“目前正在处理发票提醒功能，目标是在发票到期日前后发送自动提醒。”这能让会话保持专注。

7. **Known Bugs**: Track unresolved issues. Claude should know what is broken. It should also know what has already been tried. This prevents repeated bad fixes.
7. **已知 Bug**：跟踪未解决的问题。Claude 应该知道哪里坏了，也应该知道已经尝试过哪些方案，这能防止重复无效的修复。

8. **Things Claude Should Not Touch**: This is very important. Example: Do not modify production database migrations, do not change payment logic without asking, do not update environment variables, do not delete files without permission, do not rewrite authentication flow. AI agents need boundaries. Without boundaries, they can create expensive problems.
8. **Claude 不应触碰的内容**：这一点非常重要。例如：不要修改生产环境数据库迁移，未经询问不要更改支付逻辑，不要更新环境变量，未经许可不要删除文件，不要重写身份验证流程。AI 智能体需要边界，没有边界，它们可能会引发昂贵的麻烦。

### The Workflow I Recommend
### 我推荐的工作流

Here is the simple workflow: Create `CLAUDE.md`. Add your project overview and rules. Tell Claude to read it before making changes. Ask Claude to plan before coding. Let Claude make small changes. Review the diff. Ask Claude to update `CLAUDE.md` after major changes.
这是一个简单的工作流：创建 `CLAUDE.md`，添加项目概述和规则。告诉 Claude 在修改前先阅读它。要求 Claude 在编码前先制定计划。让 Claude 进行小步修改。审查差异（Diff）。在重大变更后，要求 Claude 更新 `CLAUDE.md`。

That last step is important. Your memory file should evolve with the project. If a new API is added, update it. If a feature is completed, update it. If a new rule is created, update it. If a bug is discovered, update it. This turns Claude into a more consistent coding partner.
最后一步很重要。你的记忆文件应随项目演进。如果添加了新 API，更新它；如果功能完成，更新它；如果制定了新规则，更新它；如果发现了 Bug，更新它。这会让 Claude 成为一个更稳定的编程伙伴。

### Stop Asking Claude to Read the Whole Codebase
### 别再让 Claude 读取整个代码库了

One big mistake developers make is asking Claude to scan everything. That burns tokens fast. Most of the time, Claude does not need the whole project. It needs the right files. A better prompt is: “Read `CLAUDE.md` first. Then inspect only the files related to authentication. Do not edit anything yet. Give me your understanding first.” This keeps the context smaller. It also reduces bad assumptions.
开发者常犯的一个大错是让 Claude 扫描所有内容。这会迅速消耗 Token。大多数时候，Claude 不需要整个项目，它只需要相关文件。更好的提示词是：“先阅读 `CLAUDE.md`，然后只检查与身份验证相关的文件。先不要进行任何编辑，先告诉我你的理解。”这能缩小上下文范围，也能减少错误的假设。

### Ask for a Plan Before Code
### 编码前先要求计划

Do not jump straight into: “Fix this.” Instead, ask: “Read the relevant files and give me a plan before making changes.” This does two things. It shows you what Claude understands. It gives you a chance to correct it before it touches the code. That one habit can save hours.
不要直接说“修复这个”。相反，应该问：“阅读相关文件，并在修改前给我一个计划。”这样做有两个好处：它能让你了解 Claude 的理解程度，并让你在它触碰代码前有机会纠正它。这一个习惯就能节省数小时的时间。

### Keep Tasks Small
### 保持任务细分

Claude performs better when the task is focused. Bad prompt: “Build the whole dashboard.” Better prompt: “Build the empty state for the analytics dashboard using the existing card component. Do not create new UI patterns.” Small tasks produce cleaner code. Large tasks create messy assumptions.
当任务聚焦时，Claude 的表现更好。糟糕的提示词：“构建整个仪表盘。”更好的提示词：“使用现有的卡片组件构建分析仪表盘的空状态，不要创建新的 UI 模式。”小任务能产生更整洁的代码，大任务则会产生混乱的假设。

### Use Claude Like a Junior Engineer
### 把 Claude 当作初级工程师来用

This is the best mental model. Claude is not magic. Claude is a very fast junior engineer with strong pattern recognition. It can write code quickly. It can debug quickly. It can explain systems quickly. But it still needs: Context, Boundaries, Review, Clear instructions. A good engineer does not just “prompt better.” A good engineer manages Claude better.
这是最好的思维模型。Claude 不是魔法，它是一个拥有强大模式识别能力的、非常快速的初级工程师。它能快速写代码、调试和解释系统。但它仍然需要：背景信息、边界、审查和清晰的指令。优秀的工程师不仅仅是“提示词写得更好”，而是更善于管理 Claude。

### My Simple Rule
### 我的简单规则

Before I ask Claude to build anything, I want it to know three things: What are we building? How does this project work? What should it not do? If Claude does not know those three things, it will waste tokens. And probably waste your time too.
在我让 Claude 构建任何东西之前，我希望它知道三件事：我们要构建什么？这个项目是如何运作的？它不应该做什么？如果 Claude 不知道这三点，它就会浪费 Token，也可能会浪费你的时间。

AI coding tools are getting better fast. But the developers who get the most value from them are not the ones who type the longest prompts. They are the ones who manage context properly. The future of AI coding is not just prompt engineering. It is context engineering. And if you learn that early, Claude becomes much more useful. Sayonara ✌🏽
AI 编程工具正在迅速进步。但从中获得最大价值的开发者，不是那些写最长提示词的人，而是那些能妥善管理上下文的人。AI 编程的未来不仅仅是提示词工程，而是上下文工程。如果你能尽早掌握这一点，Claude 会变得更有用。再见 ✌🏽
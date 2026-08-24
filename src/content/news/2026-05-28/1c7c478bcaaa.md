---
title: "Claude Code as a Daily Driver: Claude.md, Skills, Subagents, Plugins, and MCPs"
originalUrl: "https://arps18.github.io/posts/claude-code-mastery/"
date: "2026-05-27T22:54:18.025Z"
---

# Claude Code as a Daily Driver: Claude.md, Skills, Subagents, Plugins, and MCPs
# 将 Claude Code 作为日常主力工具：Claude.md、技能、子智能体、插件与 MCP

Claude Code is one of those tools where the difference between a casual user and someone who has internalized it is enormous. The casual user types prompts, accepts suggestions, and treats it like a fancier autocomplete. The daily driver uses it like a programmable agent with memory, custom commands, parallel sessions, and a project setup that compounds over time. This guide is for the second kind of person, assuming you already know what claude does when you type it in a terminal.

Claude Code 属于那种“浅尝辄止”与“深度内化”后体验天差地别的工具。普通用户只是输入提示词、接受建议，将其当作更高级的自动补全工具；而深度用户则将其视为一个具备记忆、自定义命令、并行会话以及随时间不断优化的项目配置的编程智能体。本指南专为后者准备，假设你已经了解在终端输入 `claude` 后它能做什么。

## 1. Claude Code Beyond the Basics
## 1. Claude Code 进阶指南

Once you stop thinking of Claude Code as a prompt-and-wait chatbot and start treating it as an autonomous agent that needs guardrails, your workflow shifts. The single most important principle from Boris Cherny and the Anthropic team: give Claude a way to verify its own work. Without that, you are the only feedback loop. With it, Claude iterates until things actually work, and Boris says this alone gives a 2-3x quality improvement.

当你不再把 Claude Code 看作一个“提示-等待”式的聊天机器人，而是将其视为一个需要护栏的自主智能体时，你的工作流就会发生转变。Boris Cherny 和 Anthropic 团队提出的最重要原则是：给 Claude 提供验证其自身工作的方法。如果没有这一点，你就是唯一的反馈回路；有了它，Claude 就能不断迭代直到任务真正完成。Boris 表示，仅此一项就能带来 2-3 倍的质量提升。

A few patterns that change how you operate day to day:
以下是几种改变你日常操作的模式：

*   **Explore, then plan, then code.** Plan mode (Shift+Tab twice) puts Claude into read-only exploration. Read files, trace flows, understand the data model. Then get a plan. Then execute. Skip planning for small fixes; use it for anything touching more than one file.
    **先探索，再规划，后编码。** 规划模式（连续按两次 Shift+Tab）会让 Claude 进入只读探索状态。读取文件、追踪流程、理解数据模型，然后制定计划，最后执行。对于小修复可以跳过规划，但任何涉及多个文件的任务都应使用此模式。

*   **Use plan mode like a design document.** Have one Claude write the plan, then spin up a second Claude in a fresh session to review it as a staff engineer, with no context bias, so it actually catches gaps. If implementation goes sideways, go back to plan mode and re-plan with verification steps included.
    **将规划模式当作设计文档。** 让一个 Claude 编写计划，然后在新的会话中启动第二个 Claude，让它以资深工程师的身份进行评审。由于没有上下文偏见，它能真正发现漏洞。如果实现过程偏离轨道，回到规划模式，并加入验证步骤重新规划。

*   **Reference, do not describe.** Instead of “look at the auth module”, type `@src/auth/login.py`. Instead of pasting an error, pipe it: `cat error.log | claude`. Exact context beats approximate description every time.
    **引用，不要描述。** 不要说“查看认证模块”，而是输入 `@src/auth/login.py`。不要粘贴错误信息，而是通过管道传输：`cat error.log | claude`。精确的上下文永远胜过模糊的描述。

*   **Delegate, do not pair-program.** Cat Wu (Claude Code team): “The model performs best if you treat it like an engineer you’re delegating to, not a pair programmer you’re guiding line by line.” Write a crisp brief upfront, then let it run.
    **委派，不要结对编程。** Cat Wu（Claude Code 团队成员）曾说：“如果你把它当作一个你委派任务的工程师，而不是一个需要你逐行指导的结对编程伙伴，模型的表现最好。”先写好简洁的任务简报，然后让它去执行。

*   **Tweak the plan:** Press Ctrl+G to open Claude’s plan in your editor and tweak it before Claude proceeds. The plan is just text, so shape it before it becomes code.
    **微调计划：** 按 Ctrl+G 在编辑器中打开 Claude 的计划，并在它继续执行前进行调整。计划只是文本，在它变成代码之前，先将其塑造成你想要的样子。

*   **Learn from failure:** When Claude makes a mistake, end your prompt with “Update CLAUDE.md so you do not repeat this.” Boris calls Claude “eerily good at writing rules for itself” from its own failures. This habit compounds more than any other in this guide.
    **从失败中学习：** 当 Claude 出错时，在提示词末尾加上“更新 CLAUDE.md 以免重蹈覆辙”。Boris 称 Claude 在从自身失败中“编写自我规则”方面表现得“出奇地好”。这个习惯比本指南中的任何其他建议都更能带来长期的收益。

## 2. The .claude Directory, Properly Understood
## 2. 正确理解 .claude 目录

Most people open `.claude/` once, see `CLAUDE.md`, and never look further. It is actually a layered configuration system.
大多数人只打开过一次 `.claude/` 目录，看到 `CLAUDE.md` 后就再没深入研究过。实际上，这是一个分层的配置系统。

Two scopes: Project scope lives in `.claude/` inside your repo, committed to git so your team shares it. Global scope lives in `~/.claude/` and applies across every project on your machine.
它有两个作用域：项目作用域位于仓库内的 `.claude/` 中，提交到 git 后可供团队共享；全局作用域位于 `~/.claude/` 中，适用于你机器上的所有项目。

Mental model: project files describe the project, global files describe you.
心智模型：项目文件描述项目，全局文件描述你自己。

*(Table omitted for brevity, but the structure implies a hierarchy of configuration files like `settings.json`, `rules/`, `skills/`, etc.)*
*(此处省略表格，但其结构暗示了 `settings.json`、`rules/`、`skills/` 等配置文件的层级关系。)*

A few things easy to miss:
一些容易被忽略的要点：

*   **CLAUDE.md files cascade.** In a monorepo, both `root/CLAUDE.md` and `root/services/billing/CLAUDE.md` load when you work in the billing service. Powerful for codebases with different conventions per folder.
    **CLAUDE.md 文件是级联的。** 在单体仓库中，当你处理计费服务时，`root/CLAUDE.md` 和 `root/services/billing/CLAUDE.md` 会同时加载。这对于不同文件夹有不同规范的代码库非常强大。

*   **rules/*.md is path-gated.** Guidance specific to your migrations folder does not belong in `CLAUDE.md` bloating every session; it belongs in `.claude/rules/migrations.md` with a glob.
    **rules/*.md 是路径限制的。** 针对迁移文件夹的特定指导不应放在 `CLAUDE.md` 中导致会话臃肿，而应放在 `.claude/rules/migrations.md` 中并配合 glob 模式使用。

*   **Skills over commands.** `.claude/commands/*.md` and `.claude/skills/<name>/SKILL.md` both create slash commands, but skills support supporting files, disable-model-invocation, allowed tools, and agent overrides. New work should go in `skills/`.
    **优先使用技能而非命令。** `.claude/commands/*.md` 和 `.claude/skills/<name>/SKILL.md` 都能创建斜杠命令，但技能支持辅助文件、禁用模型调用、允许的工具以及智能体覆盖。新功能应优先放在 `skills/` 中。

## 3. CLAUDE.md, The Way Boris Writes It
## 3. CLAUDE.md：Boris 的编写方式

`CLAUDE.md` is loaded at the start of every session. Get it wrong and Claude repeats the same mistakes. Get it right and the same prompt produces dramatically better output.
`CLAUDE.md` 在每个会话开始时加载。如果写得不好，Claude 会重复同样的错误；如果写得好，同样的提示词能产生显著更好的输出。

Boris is direct about two things that matter more than the rest:
Boris 对两件至关重要的事情直言不讳：

*   **Keep it short.** Long files bury important rules. For every line, ask: “Would removing this cause Claude to make a mistake?” If not, cut it.
    **保持简短。** 长文件会掩盖重要规则。对于每一行，问自己：“删掉这一行会导致 Claude 出错吗？”如果不会，就删掉它。

*   **Let Claude write rules for itself.** Any time Claude does something wrong, tell it: “Update CLAUDE.md so you do not repeat this.” Claude is surprisingly good at distilling its own mistakes into precise rules.
    **让 Claude 为自己编写规则。** 每当 Claude 做错事时，告诉它：“更新 CLAUDE.md 以免重蹈覆辙。”Claude 在将自己的错误提炼成精确规则方面表现得令人惊讶地出色。
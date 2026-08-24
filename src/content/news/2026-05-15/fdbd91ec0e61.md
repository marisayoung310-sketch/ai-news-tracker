---
title: "A Claude Code and Codex Skill for Deliberate Skill Development"
originalUrl: "https://github.com/DrCatHicks/learning-opportunities"
date: "2026-05-14T22:36:19.663Z"
---

# A Claude Code and Codex Skill for Deliberate Skill Development
# 用于刻意练习的 Claude Code 与 Codex 技能

Learning Opportunities: A Claude Code and Codex Skill for Deliberate Skill Development Build your expertise, not just your projects. This skill uses an adaptive "dynamic textbook" approach to help you integrate science-based expertise building exercises while doing agentic coding.
Learning Opportunities：一个用于刻意练习的 Claude Code 与 Codex 技能。在构建项目的同时，构建你的专业能力。该技能采用自适应的“动态教科书”方法，帮助你在进行智能体辅助编程（agentic coding）时，整合基于科学的专业能力提升练习。

When you complete architectural work (new files, schema changes, refactors), Claude offers optional 10-15 minute learning exercises grounded in evidence-based learning science. The exercises use techniques like prediction, generation, retrieval practice, and spaced repetition to provide you with semi-worked examples from across your own project work.
当你完成架构工作（如创建新文件、修改模式、重构代码）时，Claude 会提供 10-15 分钟的可选学习练习，这些练习基于循证学习科学。练习采用了预测、生成、提取练习和间隔重复等技术，为你提供源自你自身项目工作的半成品示例。

Pairs well with Learning-Goal, a skill that guides you through semi-structured, interactive learning goal-setting using the technique of Mental Contrasting with Implementation Intentions (MCII), an evidence-based exercise.
该技能与 Learning-Goal 搭配效果更佳。Learning-Goal 是一项引导你进行半结构化、交互式学习目标设定的技能，它使用了基于证据的“心理对照与执行意图”（MCII）练习方法。

### Installation
### 安装指南

Codex: This repository is also a Codex plugin marketplace. To add it from GitHub: `codex plugin marketplace add https://github.com/DrCatHicks/learning-opportunities.git` For local development from a checkout: `codex plugin marketplace add /path/to/learning-opportunities`
Codex：本仓库同时也是一个 Codex 插件市场。从 GitHub 添加：`codex plugin marketplace add https://github.com/DrCatHicks/learning-opportunities.git`；若从本地检出进行开发：`codex plugin marketplace add /path/to/learning-opportunities`。

The Codex marketplace includes: `learning-opportunities` — the core learning exercise skill; `learning-opportunities-auto` — optional post-commit prompting hook; `orient` — repo orientation generator.
Codex 市场包含：`learning-opportunities`（核心学习练习技能）、`learning-opportunities-auto`（可选的提交后提示钩子）、`orient`（代码库导览生成器）。

Claude Code: This repository is a Claude Code plugin marketplace. To install: Add the marketplace: `/plugin marketplace add https://github.com/DrCatHicks/learning-opportunities.git`. Install the plugin: `/plugin install learning-opportunities@learning-opportunities`. Restart Claude Code to activate. For more on Claude Code plugins, see the plugin documentation.
Claude Code：本仓库是一个 Claude Code 插件市场。安装步骤：添加市场 `/plugin marketplace add https://github.com/DrCatHicks/learning-opportunities.git`；安装插件 `/plugin install learning-opportunities@learning-opportunities`；重启 Claude Code 以激活。有关 Claude Code 插件的更多信息，请参阅插件文档。

### Automatic Prompting (Optional)
### 自动提示（可选）

Linux and macOS users can install `learning-opportunities-auto` alongside `learning-opportunities` to have Claude automatically consider offering an exercise after each git commit. Windows users can use it too — a little setup is required.
Linux 和 macOS 用户可以同时安装 `learning-opportunities-auto` 和 `learning-opportunities`，让 Claude 在每次 git 提交后自动考虑是否提供练习。Windows 用户也可以使用，但需要进行少量设置。

### Get Repo Orientation Lessons (Optional)
### 获取代码库导览课程（可选）

If you're learning a new repo you can create an `orientation.md` file with suggested lessons using the `orient` skill. The orientation approach applies strategies from empirical research on program comprehension and codebase navigation — including how expert developers sample codebases strategically rather than reading exhaustively. See the `orient` bibliography for the full source list.
如果你正在学习一个新的代码库，可以使用 `orient` 技能创建一个包含建议课程的 `orientation.md` 文件。这种导览方法应用了程序理解和代码库导航的实证研究策略，包括专家开发者如何战略性地抽样代码库，而不是详尽地阅读。完整来源列表请参阅 `orient` 参考书目。

Install the `orient` plugin: `/plugin install orient@learning-opportunities`. Navigate to the repo you want to orient yourself to, and call the `orient` skill either as default `/orient` Or using Simon Willison's showboat tool `/orient showboat`. Then call `learning-opportunities` with the `orient` argument to get offered two lessons that will orient you to core features of the repo: `/learning-opportunities orient`.
安装 `orient` 插件：`/plugin install orient@learning-opportunities`。导航到你想了解的代码库，并调用 `orient` 技能（默认使用 `/orient`，或使用 Simon Willison 的 showboat 工具 `/orient showboat`）。然后使用 `orient` 参数调用 `learning-opportunities`，即可获得两门帮助你了解代码库核心功能的课程：`/learning-opportunities orient`。

### Why You Might Want to Experiment with This Skill
### 为什么要尝试这项技能

AI coding tools can create specific risks for decreasing users' engagement in learning by introducing inefficient learning habits. These effects can be anticipated based on several foundational science-backed learning principles:
AI 编程工具可能会引入低效的学习习惯，从而降低用户在学习中的参与度，带来特定风险。基于几项科学支持的基础学习原则，这些负面影响是可以预见的：

*   **Generation effect (生成效应):** Accepting generated code and decreasing generating one's own code can skip the active processing that builds understanding.
    接受生成的代码并减少自己编写代码的过程，可能会跳过构建理解所需的积极处理过程。
*   **Fluency illusion (流畅性错觉):** Clean generated code can be perceived as more understood than it truly is; likewise, easily accessible knowledge from search can promote the illusion of knowledge and the illusion of more complete mental models.
    整洁的生成代码可能会让人产生“比实际理解得更透彻”的错觉；同样，从搜索中轻易获取知识也会助长知识错觉和对心理模型完整性的错觉。
*   **Spacing effect (间隔效应):** Machine velocity can push users toward constant cramming and long production sessions without the cadence, reflection and spacing of learning that leads to longer-term retention.
    机器的高速度可能会促使用户进行持续的“填鸭式”工作和长时间的生产，而缺乏学习所需的节奏、反思和间隔，从而影响长期记忆。
*   **Metacognition (元认知):** Fast workflows often don't leave room to monitor learning and develop schema representation as well as a user's sense of their own level of relative expertise and knowledge when working with novel technology.
    快速的工作流往往没有空间来监控学习过程、发展模式表征，也无法让用户在处理新技术时评估自己的相对专业水平和知识储备。
*   **Testing and retrieval (测试与提取):** Agentic models push toward giving complete answers, which could result in users taking fewer opportunities to benefit from self-testing and retrieving specific components of new knowledge, which strengthens retention.
    智能体模型倾向于给出完整答案，这可能导致用户减少了通过自我测试和提取新知识特定组件来获益的机会，而这些过程本可以加强记忆。

The techniques in `SKILL.md` are designed to counteract these risks by reintroducing: Active generation, Retrieval practice, Deliberate pauses, and Explicit metacognition.
`SKILL.md` 中的技术旨在通过重新引入以下内容来抵消这些风险：主动生成、提取练习、刻意停顿和显性元认知。

This skill interrupts that pattern by reminding you to consider investing in reflection and learning. It introduces a different "mode" of interacting with Claude, which will intentionally feel different than highly fluent and fast agentic coding in the service of helping you reflect and explore your generated work.
该技能通过提醒你投入时间进行反思和学习来打破这种模式。它引入了一种与 Claude 交互的全新“模式”，这种模式会有意地与那种高度流畅、快速的智能体编程体验有所不同，旨在帮助你反思和探索你所生成的代码。

### How It Works
### 工作原理

After you complete significant work (creating new files, schema changes, architectural decisions, etc.), Claude will ask: "Would you like to do a quick learning exercise on [topic]? About 10-15 minutes."
在你完成重要工作（创建新文件、模式变更、架构决策等）后，Claude 会询问：“你想针对 [主题] 进行一次快速学习练习吗？大约 10-15 分钟。”

If you accept, Claude runs you through an interactive exercise. A key design principle: Claude pauses and waits for your input rather than answering its own questions. This can feel frustrating, but this pushes against Claude's default to always provide the full answer and encourages your own mental effort and learning.
如果你接受，Claude 会引导你进行交互式练习。一个关键的设计原则是：Claude 会暂停并等待你的输入，而不是直接回答自己的问题。这可能会让人感到沮丧，但这种方式打破了 Claude 总是提供完整答案的默认行为，从而鼓励你投入自己的脑力并进行学习。
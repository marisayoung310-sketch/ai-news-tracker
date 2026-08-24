---
title: "What AGENTS.md Gives Coding Agents That README Files Do Not"
originalUrl: "https://dev.to/anilmuppalla/what-agentsmd-gives-coding-agents-that-readme-files-do-not-412k"
date: "2026-07-05T22:20:51.168Z"
---

# What AGENTS.md Gives Coding Agents That README Files Do Not
# AGENTS.md 为编程智能体提供了 README 文件所不具备的哪些功能

Here's the failure mode I keep running into. A team gives a coding agent a repo, a task, and maybe a README. The agent can find files and write code, but it still has to guess the operating rules. It guesses the package manager. It guesses which checks matter. It guesses whether generated files are safe to edit. It guesses what "done" means.
这是我不断遇到的失败模式：团队给编程智能体（Coding Agent）一个代码库、一个任务，可能还有一个 README 文件。智能体虽然能找到文件并编写代码，但它仍然必须猜测操作规则。它得猜包管理器是什么，得猜哪些检查是重要的，得猜生成的代码文件是否可以安全编辑，还得猜“完成”的定义是什么。

A README is usually for humans: what the project is, how to run it, and where the important docs live. A coding agent needs different context. Setup rules. Test commands. Boundaries. Completion criteria. That's the gap AGENTS.md fills.
README 通常是写给人看的：项目是什么、如何运行、重要文档在哪里。而编程智能体需要不同的上下文：设置规则、测试命令、边界条件、完成标准。这正是 AGENTS.md 所填补的空白。

The official AGENTS.md guidance describes it as a predictable place for coding-agent instructions: setup commands, test commands, code style, security considerations, and nested instructions for large monorepos. I find the split useful in a more boring way. The README answers, "What is this project?" AGENTS.md answers, "What should an agent know before touching it?" That second question is where the work usually gets fragile.
官方的 AGENTS.md 指南将其描述为存放编程智能体指令的可预测位置：包括设置命令、测试命令、代码风格、安全注意事项以及大型单体仓库（monorepo）的嵌套指令。我发现这种拆分在更实际的层面非常有用：README 回答“这是什么项目？”，而 AGENTS.md 回答“智能体在操作前需要了解什么？”。正是这第二个问题，往往是工作中最容易出错的地方。

### Where Goose Fits
### Goose 的定位

Goose makes this less theoretical because it isn't just a chat box. It's an open source local AI agent with a desktop app, CLI, API, MCP extensions, and skills. Without AGENTS.md, I find myself writing prompts like this: Update the docs, but don't touch generated files, use pnpm, run the lint and test commands, keep the PR small, and tell me what you couldn't verify.
Goose 让这一切不再仅仅是理论，因为它不仅仅是一个聊天框。它是一个开源的本地 AI 智能体，拥有桌面应用、CLI、API、MCP 扩展和技能。如果没有 AGENTS.md，我发现自己不得不写这样的提示词：更新文档，但不要触碰生成的代码文件，使用 pnpm，运行 lint 和测试命令，保持 PR 规模小，并告诉我你无法验证的内容。

With AGENTS.md, the prompt can get shorter: Update the quickstart docs for the new config flag. Goose can run the task in the repo. The repo can carry the standing instructions. I noticed this on a small docs/config update where generated files sat near source files. Without repo instructions, the prompt had to carry the package manager, generated-file boundary, checks, and the "tell me what you could not verify" rule. Once those rules lived in AGENTS.md, the prompt became just the task. Not magic. Just fewer chances to forget the boring parts.
有了 AGENTS.md，提示词可以缩短为：更新新配置标志的快速入门文档。Goose 可以在仓库中执行该任务，而仓库本身就承载了常驻指令。我在一次小型的文档/配置更新中注意到了这一点，当时生成的代码文件与源文件放在一起。如果没有仓库指令，提示词必须包含包管理器、生成文件的边界、检查项以及“告诉我你无法验证的内容”等规则。一旦这些规则存入 AGENTS.md，提示词就只剩下任务本身了。这不是魔法，只是减少了遗忘琐碎细节的可能性。

### Where Skills Fit
### 技能（Skills）的定位

I would add one more layer once AGENTS.md starts doing real work: skills. The file should not become the place where every repeated workflow gets pasted. That's how it turns into a junk drawer. A cleaner split: AGENTS.md says the standing rules. Skills describe repeatable task routines. MCP and extensions give the agent access to tools and data.
一旦 AGENTS.md 开始发挥实际作用，我会增加一层：技能（Skills）。这个文件不应该成为粘贴所有重复工作流的地方，否则它会变成一个杂物堆。更清晰的拆分是：AGENTS.md 说明常驻规则；技能描述可重复的任务流程；MCP 和扩展则为智能体提供工具和数据访问权限。

That maps cleanly to Goose too. Goose has a Skills Marketplace for reusable instruction sets with optional supporting files. For a backend service, AGENTS.md might route migrations, API changes, and releases to separate skills. The AGENTS.md file stays short, and the task routine can be as detailed as it needs to be somewhere else. The distinction is simple: if the rule should apply to almost every task in the repo, put it in AGENTS.md. If it's a repeatable routine for one kind of work, make it a skill and route to it from AGENTS.md.
这也与 Goose 的架构完美契合。Goose 拥有一个“技能市场”，用于存放可重用的指令集以及可选的支持文件。对于后端服务，AGENTS.md 可以将数据库迁移、API 变更和发布任务路由到不同的技能中。AGENTS.md 文件保持简洁，而任务流程可以在其他地方尽可能详细。区别很简单：如果规则适用于仓库中的几乎所有任务，就放入 AGENTS.md；如果它是针对某类工作的可重复流程，就将其做成技能，并从 AGENTS.md 中进行路由。

### A Small Workflow Worth Trying
### 一个值得尝试的小工作流

Try this on one low-risk repo where you already use an agent. Add an AGENTS.md file with five sections:
在一个你已经使用智能体的低风险仓库中尝试一下。添加一个包含以下五个部分的 AGENTS.md 文件：

1. **Setup**: the blessed install and run commands.
2. **Checks**: the smallest reliable test, lint, or typecheck commands.
3. **Boundaries**: files, data, or actions the agent should not touch.
4. **Done criteria**: what evidence the agent should provide before it stops.
5. **Skills**: task-specific routines the agent should use instead of guessing.

1. **设置 (Setup)**：官方推荐的安装和运行命令。
2. **检查 (Checks)**：最精简可靠的测试、lint 或类型检查命令。
3. **边界 (Boundaries)**：智能体不应触碰的文件、数据或操作。
4. **完成标准 (Done criteria)**：智能体在停止前应提供的证据。
5. **技能 (Skills)**：智能体应使用的特定任务流程，而不是靠猜。

Then try the same task twice: Task: Add an example for a new config flag. First, do it with no AGENTS.md and watch what you have to explain. Then add the file and ask again. The useful test: Did the agent run the right checks? Did it avoid generated files? Did your prompt get shorter? If the answer is no, the file is probably too vague, too long, or full of instructions the agent can't act on.
然后进行两次相同的任务测试：任务是“为新的配置标志添加一个示例”。首先，在没有 AGENTS.md 的情况下执行，观察你需要解释多少内容。然后添加该文件并再次询问。有效的测试标准是：智能体是否运行了正确的检查？它是否避开了生成的代码文件？你的提示词是否变短了？如果答案是否定的，那么该文件可能太模糊、太长，或者充满了智能体无法执行的指令。

### A Good First AGENTS.md
### 一个好的 AGENTS.md 初始模板

Start here:
从这里开始：

```markdown
# AGENTS.md
## Project Map
- `src/` contains application code.
- `tests/` contains tests.
- `docs/` contains user-facing docs.
- `generated/` is produced by tooling; do not edit it manually.

## Commands
- Install: `pnpm install`
- Test: `pnpm test`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`

## Working Rules
- Keep changes scoped to the user's request.
- Prefer existing helpers before adding abstractions.
- Do not deploy, publish, migrate, or delete data without explicit approval.
- Do not include secrets, private data, or local-only paths in committed files.

## Completion
- Run the relevant checks or explain why they were not run.
- Summarize changed behavior.
- List remaining risk or follow-up.

## Skills
- For database migrations, use the migration review skill.
- For API changes, use the contract-checking skill.
- Before a release, use the release-notes skill.
```

That's enough to be useful. It's also short enough that someone might maintain it. Avoid architecture essays, aspirational values, every command in the repo, and private context you wouldn't want in a prompt transcript. If the instruction doesn't change the agent's behavior, cut it.
这些内容足以发挥作用，而且足够简短，方便维护。避免编写架构论文、愿景口号、仓库里的所有命令，以及你不希望出现在提示词记录中的私密上下文。如果某条指令不会改变智能体的行为，就删掉它。

### The Takeaway
### 总结

AGENTS.md is not a magic safety layer. It's a simple place to put the instructions you were already repeating: setup, checks, boundaries, and what done means. For me, the practical bar is this: can the agent do a small task with less prompting and still show the checks it ran? If yes, the repo got less ambiguous. If no, the file needs more work.
AGENTS.md 并不是什么神奇的安全层，它只是一个简单的地方，用来存放你已经在重复说明的指令：设置、检查、边界以及“完成”的定义。对我来说，实用的衡量标准是：智能体能否在更少的提示下完成一个小任务，并展示它所运行的检查？如果可以，说明仓库的模糊性降低了；如果不行，说明该文件还需要进一步完善。
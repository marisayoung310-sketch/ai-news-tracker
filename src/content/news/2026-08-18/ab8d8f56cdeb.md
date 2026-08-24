---
title: "Agent Runbooks Beat Better Prompts"
originalUrl: "https://dev.to/prpatel05/agent-runbooks-beat-better-prompts-1ho"
date: "2026-08-17T21:55:28.464Z"
---

# Agent Runbooks Beat Better Prompts
# 代理运行手册（Runbooks）优于更好的提示词（Prompts）

I started writing tiny runbooks for AI agent tasks, and the quality of the work changed almost immediately. Not because the model got smarter. Because the work got less ambiguous.
我开始为 AI 代理任务编写简短的运行手册，工作的质量几乎立刻就发生了改变。这并不是因为模型变得更聪明了，而是因为工作变得不再那么模棱两可。

Most people still treat agent delegation like prompt craft. They keep trying to find the perfect sentence, the magic wording, the clever instruction that makes the model behave. I get the instinct. When the interface is a text box, it is natural to believe the answer is a better text box input. But that is not how real delegated work gets better.
大多数人仍然把代理委派当作提示词工程（Prompt Craft）来处理。他们不断尝试寻找完美的句子、神奇的措辞或巧妙的指令来让模型听话。我理解这种直觉。当交互界面是一个文本框时，人们自然会认为答案在于输入更好的文本。但现实中，委派工作的质量提升并非如此。

If a human teammate kept making inconsistent decisions, you would not solve it by giving them a prettier paragraph every morning. You would give them context. You would show them the expected path. You would name the edge cases. You would define when to stop and ask. You would make the work inspectable. That is a runbook. And for agent workflows, runbooks are starting to matter more than prompts.
如果一名人类队友总是做出前后矛盾的决定，你不会通过每天给他们写一段更漂亮的文字来解决问题。你会给他们提供背景信息，展示预期的路径，列出边界情况，定义何时该停止并询问，并使工作过程可审查。这就是运行手册。对于代理工作流而言，运行手册正变得比提示词更重要。

### Prompts Are Not Enough
### 提示词是不够的

A prompt describes what you want right now. A runbook describes how the work should be done every time. That distinction matters because the biggest agent failures I see are not caused by a lack of raw intelligence. They are caused by missing operating context.
提示词描述的是你当下的需求，而运行手册描述的是每次工作应如何完成。这种区别至关重要，因为我所见过的最大规模的代理失败，并非源于原始智能的匮乏，而是源于操作背景的缺失。

The agent changes the right file but verifies the wrong behavior. It fixes the visible bug but misses the product constraint. It keeps digging after the task is already complete. It treats a flaky test as a code problem. It stops at a plan when the task clearly needed implementation. It implements the request but forgets to leave a useful handoff. These are not prompt wording problems. They are workflow design problems.
代理修改了正确的文件，却验证了错误的逻辑；它修复了显眼的 Bug，却忽略了产品约束；它在任务完成后还在继续挖掘；它把不稳定的测试当作代码问题；它在任务明显需要执行时却停留在计划阶段；它实现了请求，却忘记留下有用的交接信息。这些都不是提示词措辞的问题，而是工作流设计的问题。

The model needs to know more than the goal. It needs to know the local rules of the system it is operating inside. Which commands prove success. Which files are dangerous. Which tests are worth running. Which changes should stay out of scope. Which blocker is real enough to stop work. That information does not belong in a one-off prompt. It belongs in a reusable operating guide.
模型需要的不仅仅是目标，它还需要了解其所处系统的本地规则：哪些命令能证明成功，哪些文件是危险的，哪些测试值得运行，哪些变更应排除在范围之外，哪些阻碍因素足以导致工作停止。这些信息不属于一次性的提示词，而属于可复用的操作指南。

### The Runbook Is the Interface
### 运行手册即界面

The more agents operate software environments, the more the runbook becomes the actual interface between human intent and machine work. The codebase is not enough. The ticket is not enough. The chat history is not enough. Each one has pieces of the truth, but none of them reliably tells the agent how to move through the work.
代理操作软件环境的程度越深，运行手册就越成为人类意图与机器工作之间的实际界面。代码库是不够的，工单是不够的，聊天记录也是不够的。每一项都包含部分事实，但没有一项能可靠地告诉代理如何推进工作。

A good runbook does. It turns vague delegation into a bounded loop: What is the outcome? What context should be read first? What is explicitly out of scope? What is the smallest useful verification? What counts as a blocker? What evidence should be left behind? Who owns the next step?
一份好的运行手册可以做到。它将模糊的委派转化为一个有边界的循环：结果是什么？首先应阅读什么背景信息？什么明确在范围之外？最小的有效验证是什么？什么算作阻碍？应该留下什么证据？下一步由谁负责？

That sounds simple, but it changes the shape of the work. Without a runbook, the agent has to infer the workflow from scattered clues. Sometimes it guesses well. Sometimes it confidently follows the wrong path. With a runbook, the agent has a track to run on. It can still make mistakes, but the mistakes become easier to spot because you can compare what happened against an expected process. That is the beginning of trust.
这听起来很简单，但它改变了工作的形态。没有运行手册，代理必须从零散的线索中推断工作流。有时它猜对了，有时它自信地走上了错误的道路。有了运行手册，代理就有了运行轨道。它仍然可能犯错，但错误变得更容易被发现，因为你可以将实际发生的情况与预期流程进行对比。这就是信任的开端。

### My Smallest Useful Runbook
### 我最精简的实用运行手册

The most useful runbooks I write are not long documents. They are usually small, sharp, and boring. For a coding task, the skeleton looks something like this:
我编写的最有用的运行手册通常不是长篇大论，而是短小、精准且枯燥的。对于编码任务，其框架大致如下：

*   Read the issue and the latest comment first. (首先阅读问题和最新评论。)
*   Inspect the existing code before proposing changes. (在提出变更前检查现有代码。)
*   Keep the edit scoped to the requested behavior. (将编辑范围限制在请求的行为内。)
*   Use the repo's existing patterns unless there is a clear reason not to. (除非有明确理由，否则使用仓库现有的模式。)
*   Run the smallest verification that proves the change. (运行能证明变更有效的最小验证。)
*   Do not revert unrelated work. (不要回滚无关的工作。)
*   Leave a handoff with changed files, verification, and remaining risk. (留下包含已更改文件、验证结果和剩余风险的交接信息。)

That is not a prompt trick. It is an operating contract. The exact details change by project. A frontend task might require screenshots. A database migration might require rollback notes. A security fix might require a test that proves the boundary fails closed. A content task might require checking the publish date field instead of trusting the PR description. The point is not to write one universal agent manual. The point is to make the repeatable parts of the work explicit.
这不是提示词技巧，而是一份操作契约。具体细节因项目而异。前端任务可能需要截图；数据库迁移可能需要回滚说明；安全修复可能需要一个证明边界失效时能安全关闭的测试；内容任务可能需要检查发布日期字段，而不是盲目信任 PR 描述。重点不是编写一本通用的代理手册，而是将工作中可重复的部分明确化。

### Runbooks Create Better Stops
### 运行手册能创造更好的停止点

One of the underrated parts of delegation is knowing when work should stop. Agents are good at continuing. That is useful until it is not. An agent can keep refactoring because it sees adjacent cleanup. It can keep trying tests because the failure looks solvable. It can keep changing copy because there is always a smoother sentence. It can keep exploring because the repo has more context to read.
委派中一个常被低估的部分是知道何时应该停止工作。代理擅长持续工作，这在某些时候很有用，但在另一些时候则不然。代理可能会因为看到相邻的清理工作而不断重构；因为它觉得失败看起来可以解决而不断尝试测试；因为它觉得总有更流畅的句子而不断修改文案；因为它觉得仓库里还有更多背景信息可读而不断探索。

Humans do the same thing, but humans usually have more ambient judgment about when the extra motion is no longer worth it. Runbooks give agents better stop conditions. Stop when the focused test passes and the change is narrow. Stop when the blocker is outside this environment. Stop when the next action belongs to another agent. Stop when the task asks for a review and no code change is needed. Stop when the open PR already satisfies the issue and the remaining work is a reviewer decision. This matters because productivity is not just about making agents move faster. It is about making sure they stop in the right place.
人类也会做同样的事，但人类通常对“额外动作何时不再值得”有更强的环境判断力。运行手册为代理提供了更好的停止条件：当重点测试通过且变更范围很小时停止；当阻碍因素超出当前环境时停止；当下一步操作属于另一个代理时停止；当任务要求审查且无需代码变更时停止；当现有的 PR 已经满足问题需求且剩余工作取决于审查者决定时停止。这一点很重要，因为生产力不仅仅是让代理跑得更快，而是确保它们停在正确的地方。

### The Proof Matters More Than the Claim
### 证明比声明更重要

The best runbooks also define what proof looks like. "I fixed it" is not proof. "The blog post is added" is not proof. "The PR is open" is closer, but still incomplete if the post was not wired into the index, the date is wrong, or the route is missing from prerendering.
最好的运行手册还会定义什么是“证明”。“我修复了”不是证明，“博客文章已添加”也不是证明。“PR 已开启”更接近一点，但如果文章没有链接到索引、日期错误或预渲染中缺少路由，那它依然是不完整的。

Useful proof is specific: The new file exists at the expected path. The slug is exported in the post registry. The dateISO is the next Tuesday. The focused data test passes. The PR URL is recorded. The review owner has a real next action. The proof changes by task, but the principle does not. If you want agent work to become reliable, do not just ask for the outcome. Ask for the evidence that the outcome is real. This is where a lot of AI workflows quietly fail. The agent produces plausible completion.
有用的证明是具体的：新文件存在于预期的路径中；Slug 已在文章注册表中导出；日期 ISO 是下周二；重点数据测试通过；PR URL 已记录；审查负责人有明确的下一步行动。证明方式因任务而异，但原则不变。如果你想让代理的工作变得可靠，不要只要求结果，要要求证明结果真实存在的证据。这正是许多 AI 工作流悄然失败的地方——代理只是产出了看似合理的完成结果。
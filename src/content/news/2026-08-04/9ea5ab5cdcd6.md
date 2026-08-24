---
title: "Staying in the Loop: Automating Attention, Not Judgment"
originalUrl: "https://dev.to/prince_of_pasta/staying-in-the-loop-automating-attention-not-judgment-bpl"
date: "2026-08-03T22:36:37.542Z"
---

# Staying in the Loop: Automating Attention, Not Judgment
# 保持同步：自动化“关注”，而非“判断”

Daily feedback on a goal is something you rarely get outside of a formal review. I recently created a daily reflection routine over my own chat history to help me identify instances where I was over-explaining before getting to the next step. It also reminded me of any open threads to reply to before I signed off for the day. Rather than having this bubble up through feedback at review time, the daily accountability helped keep me on track.
在正式评估之外，你很难获得关于目标的日常反馈。最近，我为自己的聊天记录创建了一套日常反思流程，帮助我识别那些在进入下一步之前过度解释的情况。它还提醒我在下班前回复任何未处理的对话。这种日常的自我问责机制帮助我保持在正轨上，而不是等到评估时才通过反馈发现问题。

That routine wasn't an experiment for its own sake. In my 2025 summary blog post, I predicted "the challenge won't be any single capability but orchestrating skills, sub-agents, MCP servers, and other capabilities together effectively." The same capabilities everyone points at a codebase work just as well pointed at your own habits and at the recurring work that never gets prioritized or falls off your desk.
这套流程并非为了实验而实验。在我的 2025 年总结博客中，我曾预测：“挑战将不再是单一的能力，而是如何有效地编排技能、子智能体、MCP 服务器以及其他能力。” 每个人用来分析代码库的那些能力，同样适用于分析你自己的习惯，以及那些从未被优先处理或被遗忘的日常工作。

Working with internal platforms, one of the most useful signals I get is "on the ground" feedback from development teams in support channels and forums. There was no question of the value, but keeping up with it was taking more of the day than I had to give. So I built a routine to collect trends across support threads and surface where friction was showing up. This included an app connector for the chat tool, a skill defining how to fetch and organize the results, and a set of markdown files as a simple state store for durable trends. This gave me a standing view of what developers are hitting, so the decisions I make about platform work start from their experience instead of my assumptions.
在处理内部平台时，我获得的最有用的信号之一是来自支持频道和论坛中开发团队的“一线”反馈。这些反馈的价值毋庸置疑，但跟进它们占用了我太多时间。因此，我构建了一个流程来收集支持对话中的趋势，并找出摩擦点所在。这包括一个用于聊天工具的应用连接器、一个定义如何获取和整理结果的技能，以及一组作为持久化趋势简单状态存储的 Markdown 文件。这让我能够随时掌握开发者遇到的问题，从而使我关于平台工作的决策基于他们的真实体验，而非我的主观臆断。

The same model works for the tasks that never get a formal item on anyone's board. I'm regularly pulled into ADRs (Architecture Decision Records) where the scope reaches past the local team. Those decisions can sometimes stall when wider alignment is needed, or a decision gets made without the follow-up to document it. The routine tracks document status and flags when something has been sitting too long. A to-do list isn't novel, but by using the connector I can see the actual state of the document rather than my last note about it. It counters analysis paralysis without touching the decision itself. The nudge is automatic, but the decision still belongs to the teams it affects.
同样的模式也适用于那些从未被正式列入任务清单的工作。我经常被拉入涉及范围超出本地团队的 ADR（架构决策记录）中。当需要更广泛的协调时，这些决策有时会停滞不前，或者决策做出后却缺乏后续的文档记录。该流程会跟踪文档状态，并在某项任务搁置过久时发出提醒。待办事项列表并不新鲜，但通过使用连接器，我可以看到文档的实际状态，而不是我关于它的最后一条笔记。它在不干预决策本身的情况下，对抗了分析瘫痪。提醒是自动的，但决策权仍属于受影响的团队。

Across these different applications of GenAI, the shape is the same one I described for the support collector. The reflection routine points at my own chat history instead of support threads, and the ADR routine at our document store, but the pieces underneath don't change. This approach works and is encouraged in most harnesses now such as Claude Cowork, ChatGPT Work, or GitHub Copilot, so what you build with one is mostly portable to another.
在这些不同的生成式 AI 应用中，其形态与我描述的支持收集器是一样的。反思流程指向我自己的聊天记录而非支持对话，ADR 流程指向我们的文档存储，但底层的组件并没有改变。这种方法在 Claude Cowork、ChatGPT Work 或 GitHub Copilot 等大多数工具中都行之有效且受到鼓励，因此你在一个平台上构建的内容大多可以迁移到另一个平台。

However, there is a real cost of ownership to these automations. If the schema of a support ticket changes, your skill will need an update to account for that. Silent failure with limited observability is possible, and something to look for. To pull from my days in security you must "trust but verify." Creating the routine is a one-time cost but confirming it still does what you think is ongoing. It's best to keep a critical eye so your personal stack doesn't accidentally become a Rube Goldberg machine.
然而，这些自动化工具确实存在维护成本。如果支持工单的架构发生变化，你的技能就需要相应更新。可能会出现可观测性有限的静默失败，这是需要注意的。借用我从事安全工作时的经验，你必须“信任但要核实”。创建流程是一次性成本，但确认它是否仍在按预期运行则是持续性的工作。最好保持批判性的眼光，以免你的个人技术栈意外变成一台复杂的“鲁布·戈德堡机械”（指过度复杂且脆弱的系统）。

The easy measure to optimize these routines for is time saved. The support trend collector does save me time, but its main value is that the platform decisions I bring to other teams stay grounded in what developers actually reported. The ADR routine makes me faster at ADRs. It also makes it less likely that a decision with cross-team scope quietly expires, which is the part I'd miss if it were gone. The efficiency is real, but it's a side effect. Optimizing for it directly is how you end up faster at producing work that didn't need doing.
优化这些流程最简单的衡量标准是节省的时间。支持趋势收集器确实节省了我的时间，但其主要价值在于，我带给其他团队的平台决策是基于开发者实际反馈的。ADR 流程让我处理 ADR 的速度更快。它还降低了跨团队决策被悄然搁置的可能性，如果失去了它，我会感到非常不便。效率提升是真实的，但它只是副作用。如果直接以效率为优化目标，最终只会让你更快地完成那些本不需要做的工作。

The habit I opened with has an expensive version. In front of leaders, my instinct is to bring more technical analysis, when framing is what actually moves a decision forward. This was something I had self-identified as an improvement area. What I didn't have was anything catching me on the days I fell back into it. The items to watch for were mine to define, and deciding whether a message met them was mine as well. What I handed off was the attention required to check consistently.
我在开头提到的习惯有一个“昂贵”的版本。在领导面前，我的本能是提供更多的技术分析，而实际上，框架构建（framing）才是推动决策的关键。这是我自我识别出的一个改进领域。我所缺乏的是在重蹈覆辙时能提醒我的机制。需要关注的事项由我定义，判断一条信息是否符合这些标准也由我决定。我所外包出去的，是持续检查所需的注意力。

I'm still fine-tuning each of the approaches I discussed. They've shown early value and I plan to expand this to other parts of my daily work. I regularly take a step back and think about it as a system in addition to the tactical task it handles. Each routine can surface a pattern or flag a stalled document, but I'm the one who decides what to do about it and the one accountable if that call is wrong.
我仍在微调我讨论的每一种方法。它们已经展现出初步价值，我计划将其扩展到日常工作的其他部分。我经常退后一步，不仅将其视为处理战术任务的工具，更将其视为一个系统。每一个流程都可以揭示一种模式或标记一份停滞的文档，但我才是决定如何处理的人，也是如果决策错误时承担责任的人。
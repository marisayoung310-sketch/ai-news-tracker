---
title: "We get feedback too late"
originalUrl: "https://dev.to/bjornno/we-get-feedback-too-late-3kap"
date: "2026-06-16T23:07:53.962Z"
---

# We get feedback too late
# 我们收到反馈太晚了

We talk a lot about shipping faster now, but I think the more interesting question is how fast we learn that we are building the wrong thing. Most teams do get feedback. They do beta tests, they invite a few customers, they open a channel somewhere, and then they can say the feature was validated before GA. But if we are honest, a lot of the time the feedback comes after the important decisions are already made.
现在我们经常谈论如何更快地发布产品，但我认为一个更有趣的问题是：我们能多快意识到自己做错了东西？大多数团队确实会收集反馈。他们会进行 Beta 测试，邀请几位客户，开辟反馈渠道，然后宣称该功能在正式发布（GA）前已经过验证。但坦白说，很多时候反馈是在关键决策已经做出之后才收到的。

You work on something for six months. Architecture is decided, workflows are decided, the internal demo has gone well, the release date is starting to feel real. Then you run a beta for a couple of weeks, collect a handful of comments, fix the obvious bugs, maybe polish one screen, and ship. The beta was there, but it was too late to change the shape of the thing. That pattern is everywhere. I have done it plenty of times. We call it feedback, but often it is closer to release insurance.
你埋头苦干了六个月。架构定好了，工作流定好了，内部演示很成功，发布日期也近在眼前。然后你进行为期两周的 Beta 测试，收集了一些评论，修复了明显的 Bug，或许还润色了一个界面，然后就发布了。Beta 测试确实存在，但为时已晚，无法改变产品的核心形态。这种模式随处可见。我做过很多次。我们称之为“反馈”，但它往往更像是“发布保险”。

The problem is not that we do not ask. The problem is that we ask when the cost of listening is already too high. When you are early, feedback is useful because you can still throw things away. When you are late, feedback becomes uncomfortable because every real answer implies rework. So we naturally start filtering for what can fit into the plan we already have.
问题不在于我们不询问，而在于我们询问的时机，此时倾听的成本已经太高了。在早期，反馈是有用的，因为你还有机会推倒重来。在后期，反馈会让人感到不安，因为每一个真实的答案都意味着返工。因此，我们自然而然地开始过滤信息，只保留那些能塞进现有计划的内容。

This is why I am interested in feedback loops that happen while the idea is still soft. Not more surveys. Not more dashboards. Just faster contact with reality. Before you spend months building the feature, can you show someone the workflow? Before you decide what needs documentation, can you watch where people get lost? Before you argue about what users will do, can you compare your guesses with a few real attempts?
这就是为什么我对那些在想法尚处于“柔软”阶段时发生的反馈循环感兴趣。不需要更多的调查问卷，也不需要更多的仪表盘，只需要更快地接触现实。在花费数月开发功能之前，你能否先向别人展示一下工作流？在决定哪些部分需要文档之前，你能否观察一下用户在哪里迷失了方向？在争论用户会怎么做之前，你能否将你的猜测与几次真实的尝试进行对比？

That sounds obvious, but it is surprisingly hard in normal product work. The actual product is messy. The knowledge is split between PMs, designers, support, engineers, sales, and users. A lot of the discussion happens around screenshots, remembered demos, old tickets, and whatever someone can describe in a meeting.
这听起来显而易见，但在日常产品工作中却出奇地困难。实际的产品是混乱的。知识分散在产品经理、设计师、客服、工程师、销售和用户之间。大量的讨论围绕着截图、记忆中的演示、旧工单以及会议中某人随口描述的内容展开。

### Why I am building Cartographer
### 为什么我要开发 Cartographer

Cartographer started from a simple idea: show the system how an application works by using it, then let it build a map of screens, actions, and flows. The AI part is useful when it can help us get to criticism earlier. Not friendly generic feedback like "this looks good, maybe improve onboarding", but more realistic reviews grounded in how the product actually works.
Cartographer 源于一个简单的想法：通过使用应用程序来向系统展示它是如何工作的，然后让系统构建出一张包含界面、操作和流程的地图。AI 的价值在于它能帮助我们更早地获得批评性意见。不是那种“看起来不错，或许可以改进一下新手引导”之类的客套话，而是基于产品实际运作方式的、更现实的评估。

What would a busy admin notice? Where would a new user get stuck? What would someone misunderstand because the current flow teaches the wrong thing? That is different from asking a model to review a screenshot or a static mockup. If the system has seen the real product, the review can be about the product in context. It can see the screens before and after, the actions that are available, the paths people need to take, and the awkward places where the product says one thing but behaves like another.
忙碌的管理员会注意到什么？新用户会在哪里卡住？因为当前的流程引导错误，用户会产生什么误解？这与让模型查看截图或静态原型完全不同。如果系统已经“见过”真实的产品，那么评估就可以基于产品所处的语境。它能看到前后的界面、可用的操作、用户需要走的路径，以及那些产品言行不一的尴尬之处。

This is also where I think it can be faster and in some ways more real than starting with a Figma prototype. Figma is great, and I want Cartographer to integrate with it, because teams already design and test there. But a Figma prototype often starts as an idealized version of the product. Cartographer starts from the actual thing users are already fighting with. The old flows, the weird naming, the missing empty states, the settings page nobody wants to touch. That context matters if you want critical feedback instead of design feedback only.
这也是我认为它比从 Figma 原型开始更快、在某些方面更真实的原因。Figma 很棒，我也希望 Cartographer 能与之集成，因为团队已经在那里进行设计和测试了。但 Figma 原型往往是产品的理想化版本，而 Cartographer 则从用户正在与之“搏斗”的实际产品出发。那些陈旧的流程、奇怪的命名、缺失的空状态、没人想碰的设置页面——如果你想要的是批判性反馈而非仅仅是设计反馈，这些语境至关重要。

If a team can record the current product in a few minutes, they have something concrete to look at together. If they can generate a proposed flow or prototype from that map, they have something to review before committing months to it. If they can ask for critical persona reviews and then compare those expectations with real user feedback, the conversation becomes less about who sounds most convincing in the room. I want the team to be able to say: this is how the product works today, this is the change we think matters, this is where different users are likely to struggle, this is what the AI review warned us about, and this is what actually happened when someone tried it.
如果团队能在几分钟内记录下当前的产品，他们就有了共同审视的具体对象。如果他们能根据那张地图生成建议流程或原型，他们就在投入数月时间之前有了可供评估的内容。如果他们能请求批判性的角色评估，并将这些预期与真实的用户反馈进行对比，那么讨论的焦点就不再是谁在会议室里听起来更有说服力。我希望团队能够说：这就是产品目前的运作方式，这是我们认为重要的改动，这是不同用户可能遇到的困难，这是 AI 评估给我们的警告，而这是某人尝试后实际发生的情况。

### Quality is not slow
### 质量并不意味着缓慢

When the tools get faster it is easy to just make more of everything. More prototypes, more docs, more tickets, more code, more ideas to look at. I get why that feels useful, and I do it too, but I do not think more output is the thing most teams are missing. But I do not think quantity is the interesting part. A team drowning in half finished ideas does not need ten more. It needs a faster way to find the one thing that matters and a safer way to stop doing the rest.
当工具变得更快时，人们很容易制造出更多的东西。更多的原型、更多的文档、更多的工单、更多的代码、更多的想法。我明白为什么这感觉很有用，我自己也这么做，但我认为大多数团队缺少的并不是更多的产出。我不认为数量是重点。一个淹没在半成品想法中的团队不需要再多十个想法。他们需要的是一种更快的方法来找到那件真正重要的事情，以及一种更安全的方法来停止做其余的事情。

For me, quality means the important problems are visible early. It means feedback is not a ceremony near the end, but part of how the work moves. It means you can ship a small slice, learn something real, and let that change the next slice. It also means working more like a team. Not one person disappearing into Cursor for a week and coming back with a mountain of plausible code. More shared context, more discussion, more disagreement before the thing hardens. That is the part I want Cartographer to help with. Not replace the people. Not automate the product judgement. Just make the thing in front of us concrete enough that we can talk about it properly.
对我来说，质量意味着重要的问题能被尽早发现。这意味着反馈不是临近结束时的仪式，而是工作推进的一部分。这意味着你可以发布一小部分功能，学到真实的东西，并让它改变下一个部分。这也意味着更像一个团队一样工作。而不是一个人在 Cursor 里消失一周，然后带着一堆看似合理的代码回来。在产品定型之前，需要更多的共享语境、更多的讨论、更多的分歧。这就是我希望 Cartographer 能提供帮助的地方。不是取代人类，也不是自动化产品判断。只是让摆在我们面前的东西足够具体，以便我们能进行恰当的讨论。

### What I want to test
### 我想测试什么

The current version lets you record an application with a Chrome extension, build a map, edit it, generate documentation, create prototypes, run persona reviews, and collect real feedback from testers. That is a lot of pieces, and some of them are rough. I am not trying to pretend this is a finished product. What I am trying to find out is whether this kind of workflow can make feedback feel closer to the work, instead of something that happens after everyone has already moved on. The useful version of Cartographer is not the one with the longest feature list. It is the one where a team can look at the product as it is, try an idea early, get a critical read on it.
当前版本允许你通过 Chrome 插件记录应用程序、构建地图、编辑地图、生成文档、创建原型、运行角色评估并收集测试人员的真实反馈。这些功能很多，其中一些还很粗糙。我并不是想假装这是一个成品。我想探究的是，这种工作流是否能让反馈更贴近工作本身，而不是在每个人都已经转移注意力之后才发生的事情。有用的 Cartographer 版本不是功能列表最长的那个，而是能让团队审视产品现状、尽早尝试想法并获得批判性解读的那个版本。
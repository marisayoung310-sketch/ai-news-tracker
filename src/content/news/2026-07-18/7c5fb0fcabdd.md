---
title: "The human-in-the-loop is tired"
originalUrl: "https://pydantic.dev/articles/the-human-in-the-loop-is-tired"
date: "2026-07-17T22:10:14.284Z"
---

# The human-in-the-loop is tired
# “人在回路”已疲惫不堪

Yet another thought piece about LLMs. I know. Bear with me. This is an attempt to put words around something I think most developers are experiencing right now but haven't had time to make sense of. Programming with LLMs is genuinely useful and genuinely destabilizing. These two things coexist. If we pretend the second one isn't happening, we will all burn out.
又是一篇关于大语言模型（LLM）的思考文章。我知道。请耐心听我说。我试图用文字描述一种大多数开发者目前正在经历，却还没时间理清的感觉。利用 LLM 编程既非常有用，又极具破坏性。这两者并存。如果我们假装后者不存在，我们最终都会精疲力竭。

At Pydantic, we build tools that developers use to validate data, build AI agents, and observe what their systems are doing in production. We are, quite literally, in the business of making LLM-powered software more reliable. And we are also having a weird time. This isn't a thinkpiece about whether AI will replace programmers. It's not a doomer essay and it's not a hype piece. It's an honest account of what it feels like to be a developer right now, from someone inside it, and some thoughts on what might actually help.
在 Pydantic，我们构建的工具旨在帮助开发者验证数据、构建 AI 智能体，并观察系统在生产环境中的运行情况。我们确实是在从事让 LLM 驱动的软件变得更可靠的事业。但我们自己也正经历着一段奇怪的时期。这不是一篇关于 AI 是否会取代程序员的宏论，也不是一篇末日预言或炒作文章。这只是一个身处其中的开发者，对当下真实感受的记录，以及关于什么可能真正有所帮助的一些思考。

### #Hands in the fabric
### #触碰代码的本质

When I was first learning to code in my early twenties, I remember having this distinct sensation that programming let me dip my hands into the fabric of the universe and shape it to my will. This was, of course, before I'd hit too many compile errors. But that feeling of touching some deep fundamental layer of abstraction, of being able to make things from nothing but logic, has always stuck with me.
二十出头刚学编程时，我记得有一种独特的感觉：编程让我能够亲手触碰宇宙的结构，并按自己的意愿去塑造它。当然，这是在我遇到太多编译错误之前。但那种触及深层抽象逻辑、能够仅凭逻辑从无到有创造事物的感受，一直伴随着我。

I'm not a Computer Science graduate. I'm a designer and a programmer — formally trained in the first, self-taught in the second. I came to the formalisms of software engineering through painful experience rather than academic instruction. If anything, that made me take those principles more seriously once I understood them. When you've earned your opinions about architecture and code quality the hard way, they feel less like textbook rules and more like scar tissue.
我不是计算机专业毕业的。我是一名设计师，也是一名程序员——前者受过正规训练，后者则是自学成才。我通过痛苦的实践而非学术指导，才接触到软件工程的规范。正因如此，一旦理解了这些原则，我反而更加重视它们。当你通过艰难的途径建立起对架构和代码质量的见解时，它们就不再仅仅是教科书上的规则，而更像是你留下的伤疤。

That primal feeling of creation? It's the same promise that the low-code and no-code tools of the 2010s kept making but never quite delivered on. I'm old enough to remember building web pages in Dreamweaver, watching Adobe spruik zero-code design tools that generated absolute spaghetti under the hood. It was always almost there, just good enough to hint at a future that was just around the corner (if only you were smart enough to grasp it).
那种原始的创造感？这正是 2010 年代低代码和无代码工具不断承诺却从未真正实现的东西。我年纪够大，还记得用 Dreamweaver 构建网页的日子，看着 Adobe 吹捧那些零代码设计工具，结果后台生成的全是乱七八糟的代码。它总是“差一点就成功了”，好到足以暗示一个近在咫尺的未来（只要你足够聪明能抓住它）。

If you're cynical about the current wave of AI tools, I get it. We've been promised this before. But this time the gap between promise and reality has actually, finally, narrowed to something meaningful. And that's exactly what makes it so unsettling.
如果你对当前这波 AI 工具持怀疑态度，我完全理解。我们以前也被这样承诺过。但这一次，承诺与现实之间的鸿沟终于缩小到了有意义的程度。而这正是它让人感到不安的原因。

### #What "the code writes itself" actually feels like
### #“代码自动编写”的真实感受

Yes the code (sorta) writes itself, but the human reviewing, directing, and course-correcting feels worse, not better. I recently had a conversation with my colleague Douwe, who maintains the Pydantic AI framework and has been one of the most thoughtful people I know about integrating LLM into open source workflows. He described waking up to thirty PRs every morning, each one pulled overnight by someone's AI, and needing to make snap judgment calls on every single one.
是的，代码（某种程度上）确实是自动编写的，但人类进行审查、指导和纠偏的过程感觉更糟了，而不是更好。最近我和同事 Douwe 聊过，他负责维护 Pydantic AI 框架，是我认识的在将 LLM 集成到开源工作流方面最有想法的人之一。他描述说，每天早上醒来都要面对 30 个 PR，每一个都是别人用 AI 在夜间生成的，他必须对每一个都做出快速判断。

The temptation to delegate the review itself to an AI was enormous. But, as he put it: "at that point, what am I still doing here?". The honest truth is that in the last few months, there have been days when I have spent close to two full days writing a plan for an LLM to execute: obsessively clarifying, specifying, re-specifying, only to have it still do something inexplicably stupid. Port a React hook into a Storybook story file. Read from the wrong plan. Invent components that don't exist.
把审查工作也交给 AI 的诱惑力巨大。但正如他所说：“到了那一步，我在这里还有什么意义？” 事实是，在过去几个月里，我曾有过好几天的时间，几乎全花在为 LLM 编写执行计划上：强迫症般地澄清、指定、重新指定，结果它还是会做出一些莫名其妙的蠢事。比如把 React hook 移植到 Storybook 故事文件中，从错误的计划中读取信息，或者凭空捏造根本不存在的组件。

And these aren't errors of capability; they're errors of coherence. The models are smart enough to produce plausible code, but not always smart enough to maintain a coherent intent across a complex change. This creates a peculiar new kind of fatigue, the fatigue of supervision: of holding the intent in your head while the machine generates volumes of mostly-correct output that still needs your eyes, your judgment, and your taste.
这些不是能力问题，而是连贯性问题。模型足够聪明，能写出看似合理的代码，但并不总能在一个复杂的变更中保持意图的连贯。这产生了一种奇特的新型疲劳——监督疲劳：你必须在脑海中保持意图，同时机器生成大量基本正确但仍需要你的眼睛、判断力和品味去把关的输出。

Douwe put it well: he used to get a dopamine hit from collaborating with a real person on a cool feature in open source. Helping someone become better at their craft. Now, he said, "everything I write goes into some AI black hole. There's no person on the other side actually learning anything." That loss is real and it's worth naming.
Douwe 说得很好：他过去从与真实的人合作开发开源项目中的酷功能中获得多巴胺，帮助别人提升技能。现在他说：“我写的一切都进入了某个 AI 黑洞。对面没有人在真正学习任何东西。” 这种失落感是真实的，值得被正视。

### #The intensity trap
### #强度陷阱

Simon Willison recently highlighted a Berkeley Haas study which describes how AI usage increases the intensity of work. The constant pull of "one more prompt at the end of the day, one more feature that could make this perfect." I felt that one in my bones. I was up until nearly 2am recently, prompting, because I was so close to getting a plan right. Or so I thought.
Simon Willison 最近提到了一项伯克利哈斯商学院的研究，描述了 AI 的使用如何增加了工作强度。那种“在一天结束时再多写一个提示词，再加一个功能让它变得完美”的持续诱惑。我对此深有体会。最近我熬到凌晨两点还在写提示词，因为我觉得离搞定计划只差一点点。或者说，我以为是这样。

Marcelo, another Pydantic colleague, when asked about his Claude Code session freezing said: "just open 5 claude sessions. You'll never notice because you're busy giving feedback to the others." He was joking. I think. But it captures something true about the current moment. The parallelism is exhilarating and kind of feral. The number of things you can start has dramatically increased. The number of things you can thoughtfully finish hasn't changed at all, because that part still requires the one resource we can't parallelise: your brain.
另一位 Pydantic 的同事 Marcelo 在被问及 Claude Code 会话卡死时说：“多开 5 个 Claude 会话就行了。你根本不会注意到，因为你正忙着给其他的会话提供反馈。” 他是在开玩笑。我想是吧。但这捕捉到了当下时刻的某种真相。这种并行处理既令人兴奋又有些野蛮。你能启动的事情数量急剧增加，但你能深思熟虑完成的事情数量却丝毫未变，因为那部分仍然需要我们无法并行化的资源：你的大脑。

Here's a term for what I think is happening: the human reward function problem. In machine learning, a reward function tells an agent what good looks like. Writing code by hand was never easy, but it was full of small rewards. Solving a problem in your head. Understanding a gnarly bit of logic. Watching the code compile. The feeling of control. LLM-assisted programming has automated much of the work that generated those dopamine hits and replaced it with the cognitive load of review and supervision. The satisfying part shrank. The exhausting part grew. And there are no new rewards to fill the gap.
对于正在发生的事情，我有一个术语：人类奖励函数问题。在机器学习中，奖励函数告诉智能体什么是“好的”。手写代码从不轻松，但它充满了小小的奖励：在脑海中解决一个问题，理解一段复杂的逻辑，看着代码编译通过，那种掌控感。LLM 辅助编程自动化了许多产生这些多巴胺的工作，取而代之的是审查和监督的认知负荷。令人满足的部分缩减了，令人疲惫的部分增加了。而且，没有任何新的奖励来填补这个空白。

If you're feeling like your work is simultaneously more productive and less satisfying, you're not broken. The feedback loop is broken. And I think we need to start treating that a...
如果你觉得自己的工作效率更高了，但满足感却降低了，那不是你出了问题。是反馈循环出了问题。我认为我们需要开始正视这一点……
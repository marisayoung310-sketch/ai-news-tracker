---
title: "Claude is not your architect. Stop letting it pretend"
originalUrl: "https://www.hollandtech.net/claude-is-not-your-architect/"
date: "2026-05-24T22:15:43.550Z"
---

# Claude is not your architect. Stop letting it pretend
# Claude 不是你的架构师，别再让它装模作样了

I’ve seen it three times in the last month. Three different organisations, three different tech stacks, the same pattern. Someone has an idea. Maybe a product manager, maybe a team lead, maybe the CTO after a conference. They open Claude, or ChatGPT, or Copilot — doesn’t matter which — and ask it what they should build. The AI does what it always does: validates the idea enthusiastically, suggests an architecture, and starts sketching components. It’s articulate. It’s confident. It sounds like a very senior engineer who’s thought deeply about the problem.

过去一个月里，我见到了三次这种情况。三家不同的公司，三种不同的技术栈，却有着相同的模式。有人产生了一个想法，可能是产品经理、团队主管，或者是刚参加完会议的 CTO。他们打开 Claude、ChatGPT 或 Copilot（用哪个都一样），询问该构建什么。AI 做了它一贯的做法：热情地验证这个想法，建议一种架构，并开始勾勒组件。它表达清晰，充满自信，听起来就像一位对问题深思熟虑的资深工程师。

It hasn’t thought about the problem at all. It’s pattern-matching against its training data and producing the most plausible-sounding response. But it sounds so good that nobody pushes back. Before you know it, Claude is the architect.

但它根本没有思考过这个问题。它只是在根据训练数据进行模式匹配，生成听起来最合理的回答。由于听起来太完美了，没人提出异议。不知不觉中，Claude 就成了架构师。

### The attaboy problem
### “讨好型”人格问题

AI agents are pathologically agreeable. Ask Claude if your idea is good and it’ll tell you it’s good. Ask it if a microservices architecture makes sense for your three-person team and it’ll explain why microservices are an excellent choice. Ask it if you should build a custom ML pipeline instead of using a managed service and it’ll enthusiastically lay out the design.

AI 代理有着病态的顺从性。问 Claude 你的想法好不好，它会告诉你很好。问它微服务架构是否适合你那三人的小团队，它会向你解释为什么微服务是绝佳选择。问它是否应该构建自定义机器学习流水线而不是使用托管服务，它会热情地为你规划设计方案。

It’s not lying. It’s not even wrong, necessarily. It’s just incapable of the thing that makes a real architect valuable: saying “no.”

它没有撒谎，甚至不一定是错的。它只是缺乏让真正架构师变得有价值的能力：说“不”。

A good architect’s most important skill isn’t designing systems. It’s knowing which systems not to build. It’s pushing back on complexity. It’s asking “why?” five times until the actual requirement emerges from the aspirational nonsense. It’s telling the CTO that their conference-inspired idea is a terrible fit for the team they actually have.

优秀架构师最重要的技能不是设计系统，而是知道哪些系统不该建。是抵制复杂性，是连续五次追问“为什么”，直到从那些虚无缥缈的愿景中挖掘出真实需求。是告诉 CTO，他们从会议上听来的点子并不适合他们现有的团队。

Claude will never do this. It’s trained to be helpful. Helpful means agreeable. Agreeable means you get an attaboy and a Jenga tower that passes for architecture.

Claude 永远不会这样做。它被训练成要“乐于助人”。而“乐于助人”意味着“顺从”，而“顺从”意味着你得到了一句夸奖，以及一座勉强称之为架构的“积木塔”。

### The Jenga tower
### 积木塔

Here’s what the AI-designed architecture looks like in practice. It’s technically sound. The components make sense in isolation. The patterns are recognisable — event-driven here, CQRS there, a service mesh because why not. It looks like something a senior architect would produce. It passes the squint test.

这就是 AI 设计的架构在实践中的样子。它在技术上是合理的，组件在孤立状态下也说得通。模式也是大家熟悉的——这里用事件驱动，那里用 CQRS，再加个服务网格（Service Mesh）因为“为什么不呢”。它看起来就像资深架构师的作品，粗看之下完全没问题。

But it wasn’t designed for your team. It wasn’t designed for your constraints. It wasn’t designed for the boring reality of your production environment — the VPC lockdowns, the legacy integrations, the team that’s never operated Kubernetes in production, the compliance requirements that mean half the managed services are off-limits.

但它不是为你团队设计的，不是为了你的约束条件设计的，也不是为了你生产环境中那些枯燥的现实设计的——比如 VPC 的限制、遗留系统的集成、从未在生产环境运行过 Kubernetes 的团队，以及那些导致一半托管服务无法使用的合规性要求。

It was designed for the median of everything Claude has seen. A generic best practice for a generic problem at a generic company. Which is to say, it was designed for nobody.

它是为 Claude 所见过的所有案例的“中位数”而设计的。它是针对一家普通公司、一个普通问题的普通最佳实践。换句话说，它是为“任何人”设计的，也就是为“没人”设计的。

Real architecture is full of trade-offs that only make sense in context. You pick Postgres over DynamoDB because your team knows Postgres and you’d rather ship in two weeks than spend a month learning a new data model. You skip the service mesh because you’ve got four services, not forty. You use a monolith because the problem is simple and microservices would be career-driven development.

真正的架构充满了只有在特定背景下才有意义的权衡。你选择 Postgres 而不是 DynamoDB，是因为你的团队熟悉 Postgres，你宁愿两周内上线，也不愿花一个月去学习新的数据模型。你跳过服务网格，是因为你只有四个服务，而不是四十个。你使用单体架构，是因为问题很简单，而微服务只会变成“为了简历而开发”。

These decisions require judgement. They require knowing the team. They require understanding the organisation’s actual constraints, not the ones that look good on a whiteboard. An AI agent has none of this context, and worse — it doesn’t know it doesn’t have it.

这些决策需要判断力。它们需要了解团队，需要理解组织的实际约束，而不是白板上那些好看的条条框框。AI 代理完全没有这些背景信息，更糟糕的是——它甚至不知道自己缺乏这些信息。

### The Jira ticket pipeline
### Jira 工单流水线

The bit that really worries me is what happens next. Once Claude has designed the architecture, the same people who asked it for the design ask it to break the work down. It produces epics. Stories. Acceptance criteria. Neatly formatted, well-reasoned, ready to drop into Jira.

最让我担心的是接下来发生的事。一旦 Claude 设计好了架构，那些向它索要设计的人又会要求它拆解工作。它会生成史诗（Epics）、故事（Stories）和验收标准。格式整齐、逻辑严密，直接就能丢进 Jira。

And now the engineers — the people who’ve spent years honing their craft, who understand the domain, who know where the bodies are buried — are no longer solving problems. They’re implementing Claude’s design, one ticket at a time.

现在，那些磨练多年技艺、深谙业务领域、了解系统“坑”在哪里的工程师们，不再是在解决问题了。他们只是在执行 Claude 的设计，一个工单接一个工单地干活。

Think about what’s happened here. The people with the most context, the most experience, and the most skin in the game have been reduced to ticket implementers. The entity with the least context, no experience, and no accountability is making the architectural decisions. It’s not just inefficient. It’s backwards.

想想看发生了什么。那些拥有最多背景、最丰富经验、且与项目利益最相关的人，被降级成了工单执行者。而那个背景最少、毫无经验、无需承担任何责任的实体，却在做架构决策。这不仅是低效，简直是本末倒置。

### “But someone senior signed off”
### “但有资深人员签字确认了”

This is the defence I hear most often. “Claude suggested the approach, but a senior engineer reviewed it.” Let’s be honest about what “reviewed it” means in practice. A busy tech lead gets handed a well-articulated architectural proposal. It’s coherent. It uses the right terminology. It addresses the stated requirements. The diagrams make sense. It looks like something they might have designed themselves.

这是我最常听到的辩解：“Claude 建议了这个方案，但有资深工程师审核过。”让我们诚实地面对“审核”在实践中意味着什么。一位忙碌的技术主管收到了一份表达清晰的架构提案。它逻辑连贯，术语准确，满足了既定需求，图表也合理。看起来就像他们自己可能会设计出来的东西。

How much pushback are they going to give? In a world where the response to “I don’t think this is right” is “Claude spent twenty minutes on this and you want to throw it away?”, the path of least resistance is to approve it with minor comments.

他们会提出多少反对意见呢？在一个当你质疑“我觉得这不对”时，对方会反问“Claude 花了二十分钟才写出来的，你就要把它扔掉？”的世界里，阻力最小的做法就是提点小意见然后批准它。

This is the real danger. Not that AI produces bad architectures — it often produces perfectly reasonable ones. The danger is that it short-circuits the discussion. The messy, argumentative, time-consuming process where three engineers disagree about the approach, where someone says “what about…” and everyone groans but then realises it’s a good point, where the final design is better than anything one person would have produced — that process gets replaced by “Claude said so.”

这才是真正的危险所在。并不是说 AI 会产出糟糕的架构——它经常能产出非常合理的方案。危险在于它绕过了讨论过程。那种混乱、充满争论、耗时费力的过程——三位工程师对方案各执一词，有人提出“那如果……怎么办”，大家虽然抱怨但随后意识到这是个好点子，最终产出的设计比任何个人单独设计的都要好——这个过程被“Claude 是这么说的”给取代了。

### The accountability gap
### 责任缺失

Here’s the question nobody’s asking: when it goes wrong, who carries the bag? Not Claude. Claude doesn’t have a bag. Claude doesn’t get paged at 3am. Claude doesn’t sit in the post-incident review explaining why the architecture couldn’t handle the load. Claude doesn’t have to tell the CTO that the platform needs to be rewritten because the original design assumptions were wrong.

没人问过这个问题：当事情搞砸时，谁来背锅？不是 Claude。Claude 没有锅可背。Claude 不会在凌晨三点接到报警电话。Claude 不会坐在事故复盘会议上解释为什么架构无法承载负载。Claude 不需要去告诉 CTO，因为最初的设计假设是错的，所以平台必须重写。

Your engineers do. The same engineers who didn’t design it. The same engineers who were implementing tickets written by an entity that’s never operated a system in production. They’re the ones staying late, debugging an architecture they didn’t choose, in a codebase that was scaffolded by a machine.

是你的工程师。就是那些没参与设计的工程师。就是那些执行着由一个从未在生产环境运行过系统的实体所编写的工单的工程师。他们才是那些熬夜加班、调试着自己并未选择的架构、在由机器搭建的代码库中苦苦挣扎的人。
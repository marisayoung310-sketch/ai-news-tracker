---
title: "The User Doesn't Care - But you should"
originalUrl: "https://lewiscampbell.tech/blog/260607.html"
date: "2026-06-07T22:42:32.922Z"
---

# The User Doesn't Care - But you should
# 用户不在乎——但你应该在乎

7 Jun 2026
2026年6月7日

Throughout my career, I've heard the same cliche repeated again and again. Here's some examples from the wild: "Customers don’t care about your testing at all. They care that the product works." "Users Don’t Care About Your Tech Stack" "First you must accept that engineering elegance != market value." "Users don’t care whether the code was written by AI or by hand, or which framework you used. They care that the product works."
在我的职业生涯中，我一遍又一遍地听到同样的陈词滥调。以下是一些现实中的例子：“客户根本不在乎你的测试。他们只在乎产品好不好用。”“用户不在乎你的技术栈。”“首先你必须接受，工程上的优雅并不等于市场价值。”“用户不在乎代码是 AI 写的还是人工写的，也不在乎你用了什么框架。他们只在乎产品好不好用。”

They all have differences, but they're variations on the same theme. The grizzled pragmatist is telling us all how the world really works. He's showing us a cold, hard truth we're all just too idealistic or short-sighted to see. "Why are you bothering with that? The customer won't care". The key issue here is it's all a bunch of horseshit.
这些说法虽然各有不同，但本质上都是同一个主题的变体。那些饱经风霜的实用主义者在告诉我们世界到底是如何运作的。他们向我们展示了一个冷酷而严峻的真相，而我们这些理想主义者或目光短浅的人却视而不见。“你费那劲干嘛？客户又不在乎。”问题的关键在于，这纯属胡扯。

Consider the same kind of cliche, adapted for other fields: Road users don't care if the bridge has had its final inspection or not. They care that it holds up their car. Passengers don't care whether the pilot is drunk or not. They care that the plane arrives on time. Office workers don't care if the skyscraper's foundation is stable or not. They care about making money. All superficially true. All ignoring the obvious downstream effects.
试想一下，如果把这种陈词滥调套用到其他领域：道路使用者不在乎桥梁是否经过了最终验收，他们只在乎桥能不能承载他们的车；乘客不在乎飞行员是否醉酒，他们只在乎飞机是否准时到达；办公室职员不在乎摩天大楼的地基是否稳固，他们只在乎能不能赚钱。这些话表面上都没错，但都忽略了显而易见的后续影响。

Because of course it's absolutely right that customers do not care at all about the intrinsic properties of computer code. But then there are the downstream effects: Performance, Presence of bugs, How long it takes to fix bugs, How long it takes to add features. The worse your code is, the harder - and slower - it is to resolve these issues.
当然，客户完全不在乎计算机代码的内在属性，这一点绝对正确。但随之而来的是后续影响：性能、Bug 的存在、修复 Bug 所需的时间、添加新功能所需的时间。你的代码越烂，解决这些问题就越困难、越缓慢。

Of course if you're an AirBnB, OpenAI, or Meta you can absolutely steamroll over these concerns through your incredible market capture, massive VC backing, and questionable legality. You are a company like that, right?
当然，如果你是 Airbnb、OpenAI 或 Meta 这样的公司，你完全可以通过惊人的市场占有率、巨额的风险投资支持以及处于灰色地带的法律手段来无视这些顾虑。但你是一家那样的公司吗？

### The Persistence of Folk Wisdom
### 民间智慧的持久性

It's profoundly facile to think that only first order effects matter. Yet this is an incredibly popular folk belief in software. Why? Many people have a tendency to discount or downplay things they themselves are not good at. If one recognises their inability to produce good code, why not adopt a view of software where not only does that not matter, it's actually the people with the ability that are the real problem? They're the ones holding us back with things the customer doesn't even care about! Let me ship bro. So I think partly it's an ego defence mechanism. It lets one avoid one's own shortcomings, and instead externalise it onto others. What are you reading books for, nerd?
认为只有直接影响才重要，这种想法极其肤浅。然而，这在软件行业却是一种非常流行的民间信仰。为什么？许多人倾向于贬低或轻视自己不擅长的事情。如果一个人意识到自己写不出好代码，为什么不采取一种观点：不仅代码质量不重要，反而那些有能力写好代码的人才是真正的问题所在？是他们用客户根本不在乎的东西拖了我们的后腿！让我赶紧发布吧兄弟。所以我认为，这在一定程度上是一种自我防御机制。它让人能够逃避自己的短板，转而将其归咎于他人。你读什么书啊，书呆子？

### We Live in a Society
### 我们生活在社会中

Any serious software effort is a mixture of different concerns, and different perspectives. From tech sales to tech stack, from user experience to unique identifiers. And all of it contributes to success - or failure.
任何严肃的软件开发工作都是不同关注点和不同视角的混合体。从技术销售到技术栈，从用户体验到唯一标识符，所有这些因素都决定了项目的成功或失败。
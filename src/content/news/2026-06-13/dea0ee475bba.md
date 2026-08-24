---
title: "His Today Was Yesterday: a timezone bug, a blast radius, and what AI missed"
originalUrl: "https://dev.to/maxymlyskov/his-today-was-yesterday-a-timezone-bug-a-blast-radius-and-what-ai-missed-2c3i"
date: "2026-06-12T22:59:36.689Z"
---

# His Today Was Yesterday: a timezone bug, a blast radius, and what AI missed
# 他的“今天”是“昨天”：一个时区 Bug、影响范围以及 AI 的盲点

I lead a multi-tenant booking platform where venues sell activities. There's a customer-facing website where users book them. On the main page we show activities available today on initial load. Venues on our platform can be in different time zones. Our team noticed that for one venue on one of our tenants, today's availability was broken: when you clicked an activity card to see available times, the whole list of activities disappeared.

我负责一个多租户预订平台，场馆方在上面销售活动，用户则通过面向客户的网站进行预订。在主页上，我们会在初始加载时显示当天的可用活动。平台上的场馆位于不同的时区。我们的团队注意到，对于其中一个租户下的某个场馆，当天的可用性出现了故障：当你点击活动卡片查看可用时间时，整个活动列表会消失。

I couldn't reproduce it when I looked at that venue myself, which immediately gave me the feeling that something might be wrong with the date itself. Claude, with read access to the DB, pointed out that the venue was in Australia — and since it knew the app is mostly US-based, it guessed that could be the problem. It turned out the issue was the time zone and the logic we had for past-day availability. (While revising this post I thought: why would activities even show up on first load then? We have two requests for getting activities, and they can override each other — which increases the chance of UI discrepancy.)

我自己查看该场馆时无法复现此问题，这让我立刻感觉到可能是日期本身出了问题。Claude 在拥有数据库读取权限的情况下指出，该场馆位于澳大利亚——由于它知道我们的应用主要面向美国，它推测这可能是问题的根源。事实证明，问题确实出在时区以及我们处理过去日期可用性的逻辑上。（在修改这篇文章时我想到：那为什么活动在首次加载时还会显示呢？我们有两个获取活动的请求，它们可能会相互覆盖，这增加了 UI 出现差异的可能性。）

After reviewing the code, Claude found that our logic explicitly excluded all activities from requests for past days in the venue's time zone. The reporting team member was in the USA — their today was the venue's yesterday. The constraint: customers had to see past days exactly as before. I had to fix the glitch inside that frozen behavior, so after the update a US-based user simply saw no available times instead of a disappearing list.

在审查代码后，Claude 发现我们的逻辑明确排除了场馆时区内过去日期的所有活动请求。报告问题的团队成员身处美国——他们的“今天”正是场馆的“昨天”。约束条件是：客户必须像以前一样看到过去日期的内容。我必须在那种固定的行为逻辑内修复这个故障，因此更新后，美国用户看到的不再是列表消失，而是显示“无可用时间”。

Claude's first attempt was to just remove the past-days condition. But that would have required checking how the logic behaves for past days — and that stopped me: it was a blast radius I couldn't cheaply verify. So I went for a very specific fix. For past days I still send all activities, but only with empty time slots. Availability stays exactly as it was for past days, and the UI glitch is gone.

Claude 的第一次尝试是直接删除关于“过去日期”的条件。但这需要检查该逻辑在过去日期下的表现——这让我停了下来：这是一个我无法低成本验证的“影响范围”（blast radius）。所以我采取了一个非常具体的修复方案：对于过去日期，我仍然发送所有活动，但只提供空的可用时间段。这样过去日期的可用性保持不变，UI 故障也消失了。

I told Claude to reproduce the issue with a red test and confirm the fix with a green one — I always prefer pinning backend bugs with unit tests that reproduce the behavior. One caveat: I couldn't verify against real production data. Our subdomain setup makes running the customer site locally painful, and we have no easy way to fake a time zone in code.

我让 Claude 用一个失败的测试（Red test）来复现问题，并用一个通过的测试（Green test）来确认修复——我总是倾向于用能复现行为的单元测试来锁定后端 Bug。需要说明的是：我无法使用真实的生产数据进行验证。我们的子域名设置使得在本地运行客户网站非常麻烦，而且我们在代码中也没有简单的方法来模拟时区。

The main outcome: I'm confident that availability — the most complex part of the application — is isolated from this change and unchanged. I only fixed behavior for days, without touching time-of-day logic. That said, while Claude correctly identified the cause of the specific issue, it didn't look at the problem from another angle and didn't see that the architecture itself was the reason the bug could exist. AI needs explicit constraints and rules for issues that live across multiple layers.

主要结论是：我确信可用性（应用中最复杂的部分）与此次更改是隔离的，且未受影响。我只修复了日期相关的行为，没有触及具体的时间逻辑。话虽如此，虽然 Claude 正确识别了具体问题的起因，但它没有从另一个角度审视问题，也没有发现架构本身才是导致该 Bug 存在的原因。对于跨多个层级的问题，AI 需要明确的约束和规则。

I'm planning to build infrastructure that catches this level of issue. Defining the blast radius and isolating problems are the pills that let developers sleep well. You can never be confident in a change if you haven't first drawn the smallest blast radius you can fully reason about. And you can never sleep happy if you let AI work blindly — without understanding the problems inside your code yourself, and without teaching AI about them.

我计划构建能够捕获此类问题的基础设施。定义影响范围并隔离问题，是让开发者睡个好觉的良药。如果你没有先划定一个你能完全推导出的最小影响范围，你就永远无法对变更充满信心。如果你让 AI 盲目工作——即你自己不理解代码中的问题，也不去教导 AI 理解它们——那你永远无法安稳入睡。

P.S. While writing this post I realized that the logic of how we get activity availability looks like shit. Why would I fetch all activities if I just need availability for one? Something is wrong here — better to isolate the activities request in one go, and the availability/details of a single activity in a second one. That's the right architectural decision, but it's a complex customer-facing task. Does it truly need to happen right now? My rule: file it with a named trigger — refactor when the next bug from the same archetype appears, or when product work touches this flow anyway. Refactoring on disgust alone is how you cause your own outages.

附：在写这篇文章时，我意识到我们获取活动可用性的逻辑简直是一团糟。如果我只需要一个活动的可用性，为什么要获取所有活动？这里肯定有问题——最好将活动请求一次性隔离出来，并在第二次请求中获取单个活动的可用性/详情。这是正确的架构决策，但这是一个复杂的面向客户的任务。它真的需要现在就做吗？我的原则是：将其记录下来并设定触发条件——当下一次出现同类 Bug 时，或者当产品需求触及这个流程时，再进行重构。仅仅因为“看着不爽”就去重构，往往会引发你自己造成的服务中断。
---
title: "Causal Inference Is Different in Business"
originalUrl: "https://towardsdatascience.com/causal-inference-is-different-in-business/"
date: "2026-04-29T07:16:53.385Z"
---

# Causal Inference Is Different in Business
# 商业环境下的因果推断有何不同

**How does decision-gravity dictate this gap?**
**决策的“重力”如何决定了这种差异？**

Everything you learned about causal inference in academia is true. It’s also not enough, and most of us doing applied causal inference experience it. Indeed, what’s different is the gravity of the decisions that lean on the analysis: not every decision deserves the same level of evidence. Match your rigour and causal inference to the gravity of the decision, or waste resources.

你在学术界学到的关于因果推断的一切都是正确的。但这些还不够，大多数从事应用因果推断的人都有这种体会。事实上，真正的区别在于决策对分析的依赖程度（即决策的“重力”）：并非每个决策都需要同等水平的证据支持。请根据决策的重要性来匹配你的严谨度和因果推断方法，否则就是在浪费资源。

Take product discovery. Before building and shipping, many assumptions need validation at several steps. Aiming to nail each answer with perfect causal inference; for what? Moving up one square on a board of many relevant, even necessary, but on their own insufficient decisions. The risk is already spread, hedged, over many decisions, thanks to a process that values incremental evidence, learning and iterations. Simultaneously, causal inference comes with material opportunity cost: the rigour requires delays time-to-impact, while there could have been a project waiting for you where this rigour was actually needed to improve the decision quality (reduce risk, increase accuracy and reliability).

以产品探索为例。在构建和发布产品之前，许多假设需要在多个步骤中进行验证。如果目标是用完美的因果推断来解决每一个问题，那又是为了什么呢？这只不过是在一个充满相关甚至必要、但单凭自身并不足以决定成败的决策棋盘上向前挪动了一格。由于流程重视渐进式证据、学习和迭代，风险已经被分散并对冲到了许多决策中。与此同时，因果推断伴随着实质性的机会成本：严谨性意味着会延迟产生影响的时间，而此时可能正有一个项目在等着你，那里才真正需要这种严谨性来提高决策质量（降低风险、提高准确性和可靠性）。

Final vs. constructive decisions is my go-to framing to make this idea simple: Constructive decisions move you forward in a process. “Should we explore this feature further?”, “Is this user problem worth investigating?” Getting it wrong costs you a sprint, maybe two, while getting it right does not change the company, yet. Final decisions commit resources or change direction, and getting it wrong is expensive or hard to reverse: “Should we invest $2M in building this out?” “Should we kill this product line?“, “Should we allocate more marketing budget into this or that channel?“

“最终决策”与“建设性决策”是我简化这一概念的首选框架：建设性决策推动流程向前发展。例如：“我们应该进一步探索这个功能吗？”、“这个用户问题值得研究吗？”做错的代价是一个或两个冲刺周期，而做对也不会立即改变公司格局。最终决策则涉及资源投入或方向调整，一旦出错，代价高昂且难以逆转，例如：“我们应该投入200万美元来开发这个项目吗？”、“我们应该砍掉这条产品线吗？”、“我们应该在这个渠道还是那个渠道分配更多的营销预算吗？”

In tech, the volume and pace of decisions is unparalleled. Sometimes, these are final decisions. But much more frequent are constructive decisions. As data scientists we are involved in both types, and failing to recognise when we are dealing with one or the other leads to posing the wrong questions or chasing the wrong answers, wasting resources, ultimately.

在科技行业，决策的数量和节奏是无与伦比的。有时这些是最终决策，但更多时候是建设性决策。作为数据科学家，我们参与这两种决策，如果无法识别当前面对的是哪种类型，就会导致提出错误的问题或追求错误的答案，最终浪费资源。

In this article I want to surface three rules that I keep coming back to when embarking on causal inference projects:
1. Start with the problem, not with the answer
2. If you can solve it more easily without causal inference, do it
3. Do 80/20 on your causal inference project too

在本文中，我想提出我在开展因果推断项目时反复遵循的三条原则：
1. 从问题出发，而不是从答案出发
2. 如果能用更简单的方法解决，就不要使用因果推断
3. 在因果推断项目中也要运用“二八定律”

Rules rarely sound fun. But these helped me increase my impact by lots, actually. Let’s unpack that.

规则听起来通常很枯燥，但它们确实极大地提升了我的工作影响力。让我们来详细拆解一下。

### 1. Start with the problem, not the answer
### 1. 从问题出发，而不是从答案出发

Every causal inference project starts with the problem you’re trying to solve; not with the identification strategy and the estimator. It’s the perfect example of doing the right thing, over doing things right. Your methods can be on point, but what’s the value if you are solving for the wrong thing? Nudge yourself to kick off a project with a crystal clear business problem backing it up, and you’d get 50% of work is done before even starting.

每一个因果推断项目都始于你试图解决的问题，而不是始于识别策略和估计量。这是“做正确的事”优于“把事做正确”的完美例证。你的方法可能非常精准，但如果你解决的是错误的问题，那又有什么价值呢？强迫自己在项目启动时就明确背后的商业问题，这样在开始之前你就已经完成了50%的工作。

If you’re highly technical, chances are you know the anatomy of a causal inference project: from DAG to model, to inference, to sensitivity analysis, and answers. But do you know the anatomy of problem solving in organisations? The problem behind the problem.

如果你技术功底深厚，你可能很清楚因果推断项目的结构：从有向无环图（DAG）到模型，再到推断、敏感性分析和最终答案。但你了解组织中解决问题的结构吗？即“问题背后的问题”。

Big problems get broken down into smaller ones. That’s just more workable for a team that needs to find solutions. And it allows us to mobilise multiple teams to solve different part of the bigger (sub) problem. The same goes across roles within one team: you’re estimating churn drivers; your PM needs that to decide whether to invest in retention or acquisition. That’s the challenge: the problem you, the data scientist, are solving is often not the endgame. Your problem is nested inside someone else’s. Other people, around you and above you, need your answer as one input to their solution. Recognise that dependency, and you can tailor your causal inference to what actually matters upstream.

大问题会被拆解成小问题，这对需要寻找解决方案的团队来说更具可操作性。这也使我们能够调动多个团队来解决更大问题的不同部分。团队内部的角色分工也是如此：你正在估算流失驱动因素，而你的产品经理需要这些数据来决定是投资于留存还是获客。这就是挑战所在：你作为数据科学家所解决的问题往往不是最终目标。你的问题嵌套在别人的问题之中。你周围和上级的人需要你的答案作为他们解决方案的一个输入。识别出这种依赖关系，你就能根据上游真正关心的内容来调整你的因果推断。

The wins are concrete: tighter alignment on the causal estimand of interest, or quicker discarding of causal inference altogether. Bottom-line: shorter time-to-insight.

这样带来的好处是具体的：与感兴趣的因果估计量保持更紧密的一致性，或者更快地放弃不必要的因果推断。归根结底：缩短了获得洞察的时间。

*(...)*

The anti-rule: looking at the wrong problems. If you want a quick way to throw away money, then go solve the wrong problems. Not only will the solutions have no material outcome, but also the opportunity cost of not solving the right problem in that time will add up. So, in being eager to find the problem behind the problem, be critical about whether it’s the right one to begin, when you find it. In that sense, starting with the answers does offer the cure. But it goes slightly differently. Ask yourself: If we do get these answers, what do we know that we did not know before? If we know that, then so-what? If the answer to the so-what question makes a lot of sense, not only to you, but also to your manager and their manager (presumably), then you’re on the right problem. Magical.

反面原则：关注错误的问题。如果你想快速浪费钱，那就去解决错误的问题。这不仅会导致解决方案毫无实质性成果，还会累积因果时间成本——即没能在那段时间内解决正确的问题。因此，在急于寻找“问题背后的问题”时，当你找到它后，要批判性地思考它是否是值得开始的正确问题。从这个意义上说，从答案出发确实能提供一种补救方法，但逻辑略有不同。问问自己：如果我们得到了这些答案，我们知道了什么以前不知道的东西？如果我们知道了，那又怎样（so-what）？如果这个“那又怎样”的答案不仅对你有意义，对你的经理甚至他们的经理也有意义，那么你就找对了问题。这简直太神奇了。

2. If you can solve it more easily without causal inference, then...
2. 如果能用更简单的方法解决，就不要使用因果推断，那么……
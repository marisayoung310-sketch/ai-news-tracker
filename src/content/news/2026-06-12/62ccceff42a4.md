---
title: "BI Is Dead, Long Live BI"
originalUrl: "https://towardsdatascience.com/bi-is-dead-long-live-bi/"
date: "2026-06-11T23:11:17.069Z"
---

# BI Is Dead, Long Live BI: Agentic AI
# BI 已死，BI 万岁：代理式 AI (Agentic AI)

The true bottleneck was never the analysis.
真正的瓶颈从来都不是分析本身。

In ten years working in data, I’ve watched the same pattern repeat itself again and again: A (big) tech company hits a technical or process limitation. They solve it internally with new software/paradigm (designed for their own scale, constraints, and engineering culture). They write about it (and maybe, if the stars align, open source it). A couple of engineers start a company to sell the managed version. A few years later, for better or worse, the rest of the industry adopts it.
在数据领域工作的十年里，我目睹了同样的模式反复上演：一家（大型）科技公司遇到了技术或流程上的瓶颈。他们通过新的软件或范式在内部解决问题（这些方案是为他们自身的规模、约束和工程文化量身定制的）。他们撰写相关文章（如果运气好，甚至会将其开源）。几位工程师创办了一家公司来销售其托管版本。几年后，无论好坏，整个行业都会采纳它。

The examples are many: Airbnb wrote about Airflow in 2015; the Modern Data Stack emerged from a wave of posts about internal data platforms at Uber, Netflix, and others; and dbt went from an internal tool to the de facto standard of how data teams model data today. Sometimes the tool travels cleanly, sometimes it only works in the environment it was built for, but the pattern holds.
这样的例子不胜枚举：Airbnb 在 2015 年撰写了关于 Airflow 的文章；现代数据栈（Modern Data Stack）源于 Uber、Netflix 等公司关于内部数据平台的一系列文章；dbt 也从一个内部工具变成了如今数据团队进行数据建模的事实标准。有时这些工具能顺利推广，有时它们只能在最初构建的环境中运行，但这种模式始终存在。

Each cycle was made possible by a foundational constraint getting solved or a resource becoming widely available. Distributed compute unlocked the Hadoop era, and then cheap cloud storage and the rise of self-service tooling unlocked the Modern Data Stack (MDS). During the MDS era, however, the bottleneck wasn’t technical — it was human analytical capacity: what questions to ask, where (and how) to look for answers, and how those answers connect to desired business outcomes.
每一个周期的实现，都得益于基础性约束的解决或资源的广泛普及。分布式计算开启了 Hadoop 时代，随后廉价的云存储和自助式工具的兴起开启了现代数据栈（MDS）时代。然而，在 MDS 时代，瓶颈并非技术问题，而是人类的分析能力：即该问什么问题、去哪里（以及如何）寻找答案，以及这些答案如何与预期的业务成果挂钩。

No amount of additional data or compute was going to solve that, as we’ve collectively proven by shipping thousands upon thousands of dbt models without any concrete business outcome. For a while, it seemed like an unsolvable constraint that we’d have to live with. Then AI agents arrived and flipped the script.
无论增加多少数据或计算资源都无法解决这个问题，正如我们共同证明的那样——我们交付了成千上万个 dbt 模型，却没有任何具体的业务成果。曾几何时，这似乎是一个我们不得不接受的、无法解决的约束。然后，AI 代理（AI agents）出现了，彻底改变了局面。

For the first time, the capacity to ask questions, explore data, and surface answers is no longer tied to how many analysts you can hire or how many dashboards you can build. The analysis, fellow data person, is no longer a bottleneck. Which means the new cycle has already started.
这是第一次，提出问题、探索数据和呈现答案的能力，不再受限于你能雇佣多少分析师或能构建多少仪表盘。各位数据同行，分析本身已不再是瓶颈。这意味着新的周期已经开启。

OpenAI, Meta, and ClickHouse (& more) have all published detailed posts in the past few months about how they’re moving away from dashboard-first analytics toward AI agents as their primary data consumption mechanism, completely disrupting the BI & Analytics process we’ve all become accustomed to. The pattern is familiar, but before drawing the obvious conclusion (“BI is dead, AI agents are the future”), it’s worth asking a more nuanced question: What should a world with free & unlimited analysis look like? What’s the model that we should be building toward?
在过去的几个月里，OpenAI、Meta 和 ClickHouse 等公司都发布了详细的文章，阐述了他们如何从“仪表盘优先”的分析模式转向以 AI 代理作为主要数据消费机制，这彻底颠覆了我们习以为常的 BI 与分析流程。这种模式我们很熟悉，但在得出显而易见的结论（“BI 已死，AI 代理是未来”）之前，值得思考一个更微妙的问题：一个拥有免费且无限分析能力的世界应该是什么样的？我们应该朝着什么样的模型去构建？

What was wrong with BI anyway? The typical workflow of BI has always looked like this: A business user needs to answer a question. They search for a relevant dashboard, find it doesn’t exist, submit a request. They wait two weeks for the data team to build it. (Who said bottleneck?) By the time the dashboard is live, they have either moved on or they glance at it once without it changing anything meaningful. (Difficult to measure business impact when it’s nonexistent.)
BI 到底出了什么问题？典型的 BI 工作流总是这样：业务用户需要回答一个问题。他们搜索相关的仪表盘，发现不存在，于是提交申请。他们等待两周，让数据团队去构建它。（谁说这是瓶颈？）等到仪表盘上线时，他们要么已经不再关注这个问题，要么只是扫了一眼，而它并没有带来任何实质性的改变。（当业务影响不存在时，很难衡量其价值。）

The core problem with the above workflow (and with how we’ve approached BI for decades) is that it’s built around questions that have already been asked. A dashboard is, after all, an answer to a question someone had at a specific point in time, frozen in a chart (and probably no longer relevant).
上述工作流（以及我们几十年来处理 BI 的方式）的核心问题在于，它是围绕“已经被问过的问题”构建的。毕竟，仪表盘只是某人在特定时间点提出的问题的答案，被冻结在图表中（而且很可能已经不再适用）。

What makes this even more frustrating is what I’d call the closed-window problem. In a BI tool, you can see a slice of what’s happening — “Enterprise users are engaging less with this feature” — but you can never see the full picture. What else changed for Enterprise users? What are they doing instead? What changed in the feature? The tool can only show you what someone already decided to measure. It can’t surface what nobody thought to ask.
更令人沮丧的是我所说的“封闭窗口问题”。在 BI 工具中，你只能看到正在发生的事情的一个切片——比如“企业用户对该功能的参与度降低了”——但你永远无法看到全貌。企业用户还发生了什么变化？他们转而做了什么？该功能发生了什么变化？工具只能向你展示别人已经决定要衡量的内容，它无法呈现那些没人想到要问的问题。

AI agents are a genuine improvement on this. The new generation (like what Meta, OpenAI, and ClickHouse have built internally) goes far beyond Text-to-SQL: These agents can navigate business context, reason across documentation and code, and answer, in a few seconds/minutes, complex questions that would have taken an analyst days.
AI 代理在这方面确实有了真正的改进。新一代的 AI 代理（如 Meta、OpenAI 和 ClickHouse 在内部构建的那些）远不止是 Text-to-SQL：这些代理能够理解业务背景，跨文档和代码进行推理，并在几秒或几分钟内回答那些原本需要分析师花费数天才能解决的复杂问题。

But I think we’re optimizing at the wrong level. These state-of-the-art improvements are all in the “how do I answer this question?” step. The question before it — “what question should I even be asking?” — is still left entirely to the user. The yet-to-be-solved problem: what questions should I even be asking?
但我认为我们优化的层面错了。这些最先进的改进都集中在“我该如何回答这个问题？”这一步。而在此之前的问题——“我到底该问什么问题？”——仍然完全留给了用户。尚未解决的问题是：我到底应该问什么？

When I was Head of Product at Sifflet, a data observability platform, we kept seeing the same unexpected behavior: customers were using our alerting features to track business metrics (watching for things like churn signals, demand shifts, and operational anomalies). These alerts had nothing to do with monitoring data pipelines or detecting data quality issues — their sole purpose was to understand which numbers were moving in the business and whether those movements were worth acting on.
当我在数据可观测性平台 Sifflet 担任产品负责人时，我们不断观察到同样的意外行为：客户正在使用我们的警报功能来跟踪业务指标（监控流失信号、需求变化和运营异常等）。这些警报与监控数据管道或检测数据质量问题毫无关系——它们唯一的目的就是了解业务中哪些数据在变动，以及这些变动是否值得采取行动。

What made this striking, above all else, was that these customers had mature BI tools, dedicated analytics teams, and reporting infrastructure that most companies would envy. These weren’t scrappy startups without resources, yet they were still hacking a data observability product to get something none of those tools gave them: a system that watched their data across thousands of tables and told them — without being asked — when something worth caring about had changed.
最引人注目的是，这些客户其实拥有成熟的 BI 工具、专门的分析团队以及大多数公司梦寐以求的报告基础设施。他们并非资源匮乏的初创公司，但他们仍然在“破解”一个数据可观测性产品，以获得那些 BI 工具无法提供的东西：一个能够跨越数千张表监控数据，并在无需人工询问的情况下，主动告知他们何时发生了值得关注的变化的系统。

They weren’t misusing our product. They were building, with the closest thing they could find, the thing that didn’t exist yet. So what should the new model actually look like? Answering questions faster was never the hard(est) part. The real gap was always upstream: Knowing which questions were worth asking. Solving that requires operating at a different layer entirely: not the query layer, not the visualization layer, but the business intent layer. And as far-fetched as it may sound...
他们并没有滥用我们的产品。他们只是在用所能找到的最接近的工具，去构建一个尚未存在的东西。那么，新的模型到底应该是什么样的？更快地回答问题从来都不是最难的部分。真正的差距始终在于上游：知道哪些问题值得一问。解决这个问题需要在一个完全不同的层面进行操作：不是查询层，不是可视化层，而是业务意图层。尽管这听起来可能有些遥不可及……
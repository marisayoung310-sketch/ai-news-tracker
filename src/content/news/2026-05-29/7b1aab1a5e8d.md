---
title: "The internet is being rebuilt for machines"
originalUrl: "https://techcrunch.com/2026/05/28/the-internet-is-being-rebuilt-for-machines/"
date: "2026-05-28T22:50:26.883Z"
---

# The internet is being rebuilt for machines
# 互联网正在为机器而重建

Cloud infrastructure has long been designed around humans who search, click, scroll, and stream in a steady and predictable fashion. AI agents behave differently. They can unleash a swell of activity, spinning up multiple sub-agents that query hundreds of databases, search documents, and call APIs in seconds and then disappear as quickly as they arrived.
长期以来，云基础设施的设计都是围绕着人类进行的，因为人类的搜索、点击、滚动和流媒体行为通常是稳定且可预测的。但人工智能（AI）代理的行为则截然不同。它们可以瞬间引发巨大的活动浪潮，在几秒钟内启动多个子代理，查询数百个数据库、搜索文档并调用 API，然后又像出现时一样迅速消失。

Under that premise, Amazon is redesigning a core piece of its cloud infrastructure. On Thursday, AWS launched its next generation of OpenSearch Serverless, a fully managed search and vector database — essentially a system for storing and retrieving information at scale — that’s designed specifically for agentic workloads. AWS says the new system can instantly scale up when agents trigger tasks and scale back down to zero when idle.
基于这一前提，亚马逊正在重新设计其云基础设施的核心部分。周四，AWS 推出了新一代 OpenSearch Serverless，这是一种全托管的搜索和向量数据库（本质上是一个大规模存储和检索信息的系统），专为代理工作负载而设计。AWS 表示，该新系统可以在代理触发任务时瞬间扩展，并在空闲时缩减至零。

The launch reflects a growing realization across the tech industry: Infrastructure originally designed for a human-driven internet doesn’t work as well in a world increasingly populated by agents. While AI agents still represent a relatively small portion of internet activity, machine-generated traffic is already significant, and poised to grow. Cloudflare says bots accounted for 31% of overall HTTP traffic over the last six months. AI crawlers, search engines, and assistants made up roughly a quarter of all bot requests during that period.
此次发布反映了整个科技行业日益增长的共识：最初为人类驱动的互联网而设计的基础设施，在日益充斥着代理的世界中已不再那么高效。虽然 AI 代理在互联网活动中仍占相对较小的比例，但机器生成的流量已经相当可观，且有望进一步增长。Cloudflare 表示，在过去六个月中，机器人流量占总 HTTP 流量的 31%。其中，AI 爬虫、搜索引擎和助手约占所有机器人请求的四分之一。

“Non-human traffic will exceed human traffic sometime in the first half of 2027,” said Lai Yi Ohlsen, senior product manager at Cloudflare, to TechCrunch. At Google’s I/O developer conference last week, the company said users will be able to start delegating tasks to AI systems, like researching purchases, booking travel, browsing the web, and interacting with apps. But the buck doesn’t stop at consumer-focused AI agents. Enterprises are increasingly deploying agents internally and for their customers, creating new kinds of machine-generated traffic behind the scenes.
Cloudflare 高级产品经理 Lai Yi Ohlsen 对 TechCrunch 表示：“非人类流量将在 2027 年上半年的某个时间点超过人类流量。”在上周的 Google I/O 开发者大会上，谷歌宣布用户将能够开始把任务委托给 AI 系统，例如研究购物、预订旅行、浏览网页以及与应用程序交互。但这种趋势并不止于面向消费者的 AI 代理。企业正越来越多地在内部及为客户部署代理，在幕后创造出新型的机器生成流量。

As a result, cloud providers and infrastructure companies have been reckoning with how to adapt systems built for humans to a world of agents that are constantly and autonomously retrieving information, invoking tools, and generating machine-to-machine traffic. That’s where AWS’s new OpenSearch Serverless comes in.
因此，云服务提供商和基础设施公司一直在思考如何将为人类构建的系统，调整以适应一个由代理主导的世界——这些代理不断地自主检索信息、调用工具并生成机器对机器的流量。这正是 AWS 新版 OpenSearch Serverless 的用武之地。

“The timing is straightforward. Agents are moving from experimentation into production, and they create traffic patterns that previous infrastructure simply wasn’t designed for,” Tia White, general manager for Amazon OpenSearch Service, told TechCrunch. “They spike without warning, they go idle without notice, and enterprise needs search that keeps up without paying for empty or idle compute.”
亚马逊 OpenSearch 服务总经理 Tia White 对 TechCrunch 表示：“时机显而易见。代理正从实验阶段转向生产阶段，它们创造的流量模式是以前的基础设施根本没有考虑过的。它们会毫无预警地激增，也会毫无征兆地进入空闲状态，而企业需要的是能够跟上这种节奏，且无需为闲置计算资源付费的搜索服务。”

The key technical change with this new generation is that it decouples compute from storage, allowing compute to scale up in seconds to accommodate agent traffic bursts and to scale down to zero, so customers pay $0 when agents are idle. “Previously, even in our prior Serverless version, you had to have at least one instance operational and running because storage and compute were coupled,” White said. “You couldn’t just automatically spin up [compute] at the rate you needed to, so you always had idle compute reserved for your workload, whether you were using it or not.”
这一代产品关键的技术变革在于实现了计算与存储的解耦，允许计算资源在几秒钟内扩展以应对代理流量的激增，并在空闲时缩减至零，从而确保客户在代理闲置时支付 0 美元。White 解释道：“以前，即使是在我们之前的 Serverless 版本中，由于存储和计算是耦合的，你必须至少保持一个实例在运行。你无法根据需要自动启动计算资源，因此无论你是否在使用，都必须为工作负载预留闲置的计算资源。”

Think of it like always paying for a parking space, even when you’re not using it. With AWS’s upgraded Serverless, it’s more like paying for a metered parking spot. At launch, OpenSearch Serverless will integrate natively with AI development platforms like Vercel and Kiro, so developers can deploy production-ready search and vector backends for agents without managing infrastructure.
这就像是你即使不用车位也要一直付租金。而 AWS 升级后的 Serverless 更像是按时计费的停车位。发布时，OpenSearch Serverless 将与 Vercel 和 Kiro 等 AI 开发平台原生集成，开发者无需管理基础设施即可为代理部署生产级的搜索和向量后端。

The shift is emerging across the cloud industry. Databricks and Snowflake are repositioning themselves as AI memory and retrieval systems for enterprise data. Microsoft has rolled out updates to Azure designed to handle AI agent bursts and share memory between agents. Cloudflare, in a similar vein to Amazon, last month introduced infrastructure aimed at giving agents persistent environments and instant scalability. The more companies deploy AI agents, the more pressure there will be to redesign infrastructure around machine-generated workloads, which in turn could make agents cheaper and easier to deploy at larger scales.
这种转变正在整个云行业中显现。Databricks 和 Snowflake 正在将自身重新定位为企业数据的 AI 记忆和检索系统。微软已为 Azure 推出了更新，旨在处理 AI 代理的突发流量并在代理之间共享内存。与亚马逊类似，Cloudflare 上个月也推出了旨在为代理提供持久环境和即时扩展能力的基础设施。随着越来越多的公司部署 AI 代理，围绕机器生成的工作负载重新设计基础设施的压力将会越来越大，这反过来又可能使代理在更大规模上的部署变得更便宜、更简单。
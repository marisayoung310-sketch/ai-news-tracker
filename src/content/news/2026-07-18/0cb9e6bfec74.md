---
title: "The state of open source AI"
originalUrl: "https://stateofopensource.ai/"
date: "2026-07-17T22:09:50.839Z"
---

# The state of open source AI
# 开源人工智能的现状

**A Letter From Our CTO, Raffi Krikorian**
**来自我们首席技术官 Raffi Krikorian 的信**

In New Zealand's far north, a Māori broadcaster trains speech models for te reo — a language too small for any market — under a license that keeps the data with its people.
在新西兰的最北端，一家毛利广播公司正在为毛利语（te reo）训练语音模型——这是一种对于任何商业市场来说都过于小众的语言——其采用的许可协议确保了数据归其人民所有。

PwC, one of the largest accounting firms in the world, fine-tuned an open model on the language of finance and runs it today for hundreds of clients, on its own hardware, with no per-token meter running.
全球最大的会计师事务所之一普华永道（PwC），利用金融领域的专业语言对一个开源模型进行了微调，如今正为数百家客户提供服务，且运行在自有硬件上，无需按 Token 计费。

Researchers in Lausanne built an open medical model with the Red Cross, tuned to its humanitarian guidelines, and are preparing clinical trials at home and in Tanzania.
洛桑的研究人员与红十字会合作构建了一个开源医疗模型，根据其人道主义准则进行了调整，目前正准备在瑞士本土和坦桑尼亚进行临床试验。

In East Africa, farmers diagnose cassava disease with a model that runs on the phone itself, offline, in fields the cloud has never reached.
在东非，农民们利用一个可以在手机上离线运行的模型来诊断木薯疾病，这些农田是云端服务从未触及的地方。

In Switzerland, a public consortium trained a national model on public supercomputers and released all of it: weights, data, training code.
在瑞士，一个公共联盟利用公共超级计算机训练了一个国家级模型，并发布了所有内容：权重、数据和训练代码。

None of them asked permission, and none of them could have rented this. They own it — that is the whole idea.
他们无需征求许可，也无法通过租赁获得这些成果。他们拥有它——这正是核心理念所在。

We have been here before. Mozilla exists because one company tried to own the front door to the web, and an open community rose up to make sure it never could. Twenty-five years later, someone is running the same play. We bet on open the first time. Open won. Together, we can do it again.
我们曾经历过这一切。Mozilla 的存在是因为曾有一家公司试图垄断互联网的入口，而一个开放的社区挺身而出，确保了这种情况永远不会发生。二十五年后，有人在重演同样的戏码。我们第一次选择了押注开放，开放赢了。这一次，我们可以再次做到。

Our belief is simple: the path forward is competition and interoperability. We believe in a world of many models, standard ways to plug them together, and the freedom to walk away from any vendor at any time. Open has a record here. It grew the pie and let more people own a slice of it.
我们的信念很简单：前进的道路在于竞争与互操作性。我们相信一个拥有多种模型、具备标准连接方式，且随时有权脱离任何供应商的世界。开放在这方面已有先例。它做大了蛋糕，并让更多人能够分得一杯羹。

Read what follows as a map: where open AI is winning — some numbers surprised even us — and where it is exposed. A case that hides its weak points is an advertisement.
请将接下来的内容视为一张地图：了解开源 AI 在哪些领域占据优势（有些数据甚至让我们感到惊讶），以及它在哪些方面存在短板。掩盖弱点的案例只能算作广告。

***

### Open weights closed the capability gap while the price of intelligence collapsed.
### 开源权重缩小了能力差距，同时智能成本大幅下降。

**Capability gap to the top closed models — at parity on coding, behind on reasoning**
**与顶级闭源模型的能力差距——编程能力持平，推理能力落后**

**Fall in GPT-4-class inference cost in 36 months: $20 → $0.40 per 1M tokens**
**GPT-4 级别推理成本在 36 个月内的下降：从每百万 Token 20 美元降至 0.40 美元**

#### 01 The current state of open-source AI
#### 01 开源人工智能的现状

Parity reached. The contest is one layer up. Open weights are no longer a compromise. They are where the work happens: a majority of production tokens now route through them, and the five highest-volume models on OpenRouter are all open.
能力已达平齐。竞争已上升到更高层面。开源权重不再是一种妥协。它们已成为实际工作的核心：目前大多数生产环境的 Token 都通过它们进行处理，OpenRouter 上流量最大的五个模型全部为开源模型。

Closed models still lead at the frontier, on reasoning and multimodality, but the frontier is not what most workloads need. Commodity inputs do not hold pricing power. Value moves up, to the agentic harness.
闭源模型在推理和多模态的前沿领域仍保持领先，但前沿技术并非大多数工作负载所必需。大宗商品化的输入不再具备定价权。价值正在向上转移，流向智能体（Agentic）的整合应用。

**The capability gap: 8.04% → 0.5% → 3.3%**
**能力差距：8.04% → 0.5% → 3.3%**

Open-vs-closed gap on Chatbot Arena over 24 months. By August 2024, the gap had collapsed to 0.5%, and in February 2025 DeepSeek-R1 briefly matched the top US model. By March 2026 it had reopened to 3.3% as closed reasoning models pulled ahead.
过去 24 个月 Chatbot Arena 上开源与闭源模型的差距。到 2024 年 8 月，差距缩小至 0.5%；2025 年 2 月，DeepSeek-R1 短暂追平了美国顶级模型。到 2026 年 3 月，随着闭源推理模型再次领先，差距扩大至 3.3%。

But 3.3% is an average over a jagged frontier: open is at or near parity on coding, instruction-following and general knowledge, while the gap concentrates in reasoning, long-context retrieval and agentic tasks. The question is no longer whether open models are good enough. It's what you need for your workload.
但 3.3% 是一个参差不齐的前沿领域的平均值：开源模型在编程、指令遵循和通用知识方面已达到或接近平齐，而差距主要集中在推理、长上下文检索和智能体任务上。问题不再是开源模型是否足够好，而是你的工作负载到底需要什么。

***

**Inference fell 50× in 36 months**
**推理成本在 36 个月内下降了 50 倍**

GPT-4-equivalent price per 1M tokens — faster than dotcom-era bandwidth or PC-compute price curves.
GPT-4 等效价格（每百万 Token）——其下降速度超过了互联网泡沫时代的带宽或个人电脑计算价格曲线。

***

**Open weights win the tokens**
**开源权重赢得了 Token 流量**

The share of tokens routed on OpenRouter through open-weight models grew from a negligible base to a third by late 2025 to a majority by mid-2026.
在 OpenRouter 上通过开源权重模型处理的 Token 份额，从微不足道的基数增长到 2025 年底的三分之一，并在 2026 年年中占据了多数。

By request count, closed US providers still lead — the open lead is a token-volume lead, concentrated in coding and agentic workloads.
按请求数量计算，美国闭源提供商仍处于领先地位——开源的领先优势在于 Token 总量，主要集中在编程和智能体工作负载中。

**OpenRouter live leaderboard — trailing month, tokens routed**
**OpenRouter 实时排行榜——过去一个月，处理的 Token 总量**

The five highest-volume models are all open weights. Anthropic's closed Claude models are the next US-built entrants.
流量最大的五个模型均为开源权重模型。Anthropic 的闭源 Claude 模型是紧随其后的美国制造产品。

By mid-2026 the top nine models route roughly 18T weekly tokens for Chinese-built models against ~5.5T for US-built ones — more than 3:1 (FT analysis). Where developers route by cost, they route to open weights.
到 2026 年年中，排名前九的模型中，中国制造的模型每周处理约 18 万亿 Token，而美国制造的模型约为 5.5 万亿——比例超过 3:1（金融时报分析）。当开发者根据成本进行选择时，他们会选择开源权重模型。

***

**Open ships easy. Open deploys hard.**
**开源易于交付，但部署困难。**

Data from the Mozilla / SlashData 2026 developer survey. Open models lead in adoption: 79% of developers adding AI functionality use them, against 71% for closed, and the two are largely complementary, with half of developers using both.
来自 Mozilla / SlashData 2026 开发者调查的数据。开源模型在采用率上领先：79% 添加 AI 功能的开发者使用开源模型，而闭源模型为 71%，两者在很大程度上是互补的，有一半的开发者同时使用两者。

But production is where teams stall: only 51% of open-model teams reach production versus 63% for closed. The gap is operational tooling and trust, not model capability.
但生产环境是团队受阻的地方：只有 51% 使用开源模型的团队成功进入生产阶段，而闭源模型团队为 63%。差距在于运营工具和信任度，而非模型能力本身。

**Open models lead in adoption, and mostly coexist with closed**
**开源模型在采用率上领先，且大多与闭源模型共存**

Share of developers adding AI functionality to their applications who currently use each model type, and how the two overlap.
在应用程序中添加 AI 功能的开发者中，目前使用各类模型的比例及其重叠情况。

*   **Open models: 79%**
*   **Closed models: 71%**
*   **How they combine: 29% OS only, 50% Both, 21% CS only**
*   **开源模型：79%**
*   **闭源模型：71%**
*   **组合方式：29% 仅开源，50% 两者皆用，21% 仅闭源**

***

**Open and closed aren't substitutes for most teams: 50% run both, 29% open only, 21% closed only.**
**对于大多数团队而言，开源和闭源并非替代关系：50% 的团队两者并用，29% 仅用开源，21% 仅用闭源。**

**Where open adoption peaks, and where closed still edges it**
**开源采用率的峰值区域，以及闭源仍占优势的区域**

Open-model adoption by region. Greater China and East Asia lead at 89%; South America and Western Europe are the only two regions where closed adoption exceeds open.
按地区划分的开源模型采用率。大中华区和东亚地区以 89% 领先；南美洲和西欧是仅有的两个闭源模型采用率超过开源模型的地区。

**Production rate by company size**
**按公司规模划分的生产率**

If the gap were about resources, scale would close it, and it doesn't. Closed climbs 54% → 73% with scale. Open barely moves: 53% → 57%.
如果差距源于资源，那么规模化本应缩小差距，但事实并非如此。闭源模型随着规模扩大，生产率从 54% 提升至 73%。而开源模型几乎没有变化：从 53% 仅提升至 57%。

Enterprises can buy their way through closed deployment. Open deployment waits on tooling nobody has finished.
企业可以通过付费解决闭源部署问题。而开源部署则在等待尚未完善的工具链。
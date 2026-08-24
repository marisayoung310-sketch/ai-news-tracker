---
title: "Meta Adaptive Ranking Model: Bending the Inference Scaling Curve to Serve LLM-Scale Models for Ads"
originalUrl: "https://engineering.fb.com/2026/03/31/ml-applications/meta-adaptive-ranking-model-bending-the-inference-scaling-curve-to-serve-llm-scale-models-for-ads/"
date: "2026-04-29T06:57:57.009Z"
---

# Meta Adaptive Ranking Model: Bending the Inference Scaling Curve to Serve LLM-Scale Models for Ads
# Meta 自适应排序模型：扭转推理扩展曲线，为广告业务提供大模型规模支持

By Xi Chen, Yuxin Chen, Zeliang Chen, Jonathan Herbach, Jian Jiao, Jinfu Leng, Dianshi Li, Gaoxiang Liu, Liang Luo, GP Musumeci, Michael Shao, Ellie Wen, Ruichao Xiao, Yavuz Yetim, Nancy Yu, Zhengkai Zhang

Meta continues to lead the industry in utilizing groundbreaking AI Recommendation Systems (RecSys) to deliver better experiences for people, and better results for advertisers. To reach the next frontier of performance, we are scaling Meta’s Ads Recommender runtime models to LLM-scale & complexity to further a deeper understanding of people’s interests and intent.
Meta 继续引领行业，利用突破性的人工智能推荐系统（RecSys）为用户提供更好的体验，并为广告商带来更好的成果。为了达到性能的新前沿，我们正在将 Meta 的广告推荐运行时模型扩展到大模型（LLM）的规模和复杂度，以进一步加深对用户兴趣和意图的理解。

This increase in scale & complexity exacerbates a fundamental “inference trilemma”: the challenge of balancing the increased model complexity and associated need for compute and memory with the low latency and cost efficiency required for a global service serving billions of people. To overcome this, we have developed the Meta Adaptive Ranking Model, which effectively bends the inference scaling curve with high ROI and industry-leading efficiency.
这种规模和复杂度的增加加剧了一个根本性的“推理三难困境”：即如何在平衡模型复杂性增加及其对计算和内存的需求的同时，满足服务全球数十亿用户所需的低延迟和成本效率。为了克服这一挑战，我们开发了 Meta 自适应排序模型（Adaptive Ranking Model），它以高投资回报率和行业领先的效率有效地扭转了推理扩展曲线。

Adaptive Ranking Model replaces a “one-size-fits-all” inference approach with intelligent request routing. By dynamically aligning model complexity with a rich understanding of a person’s context and intent, the system ensures every request is served by the most effective & efficient model. This allows Meta Ads to maintain the strict, sub-second latency the platform depends on while providing a high-quality experience for every person.
自适应排序模型用智能请求路由取代了“一刀切”的推理方法。通过将模型复杂度与对用户背景和意图的深入理解进行动态对齐，该系统确保每个请求都由最有效、最高效的模型来处理。这使得 Meta 广告能够在保持平台所依赖的严格亚秒级延迟的同时，为每个人提供高质量的体验。

Serving LLM-scale models at Meta’s scale required a fundamental rethink of the inference stack, driven by three key innovations:
在 Meta 的规模下运行大模型需要对推理堆栈进行根本性的重新思考，这得益于三项关键创新：

*   **Inference-Efficient Model Scaling:** By shifting to a request-centric architecture, Adaptive Ranking Model serves a LLM-scale & complexity model at sub-second latency, enabling a more sophisticated understanding of a person’s interests and intent without compromising the experience.
    **推理高效的模型扩展：** 通过转向以请求为中心的架构，自适应排序模型能够在亚秒级延迟下运行大模型规模和复杂度的模型，从而在不影响体验的情况下，实现对用户兴趣和意图更复杂的理解。
*   **Model/System Co-Design:** By developing hardware-aware model architectures that align model design with underlying hardware system and silicon’s capabilities and limitations, Adaptive Ranking Model significantly improves hardware utilization in heterogeneous hardware environments.
    **模型/系统协同设计：** 通过开发感知硬件的模型架构，使模型设计与底层硬件系统及芯片的能力和局限性相匹配，自适应排序模型显著提高了异构硬件环境下的硬件利用率。
*   **Reimagined Serving Infrastructure:** Leveraging multi-card architectures and hardware-specific optimizations, Adaptive Ranking Model enables O(1T) parameter scaling, allowing us to serve the LLM-scale runtime RecSys models with unprecedented efficiency.
    **重构的服务基础设施：** 利用多卡架构和针对硬件的优化，自适应排序模型实现了 O(1T) 参数规模的扩展，使我们能够以空前的效率运行大模型规模的运行时推荐系统模型。

By further integrating LLM-scale intelligence into our ads stack, Adaptive Ranking Model delivers a significant increase in ad conversions and advertiser value while maintaining system-wide computational efficiency. This ensures superior performance for businesses of all sizes. Since launching on Instagram in Q4 2025, Adaptive Ranking Model has delivered a +3% increase in ad conversions and +5% increase in ad click through rate for targeted users.
通过将大模型规模的智能进一步集成到我们的广告堆栈中，自适应排序模型在保持系统整体计算效率的同时，显著提高了广告转化率和广告商价值。这确保了各种规模的企业都能获得卓越的性能。自 2025 年第四季度在 Instagram 上推出以来，自适应排序模型已使目标用户的广告转化率提高了 3%，广告点击率提高了 5%。

### Introducing Meta Adaptive Ranking Model
### 介绍 Meta 自适应排序模型

Serving LLM-scale & complexity models in a real-time ads recommendation environment requires resolving a fundamental tension between model complexity and system efficiency. Unlike LLM applications such as chatbots, where response times are measured in seconds, an ad recommendation must achieve two uncompromising constraints:
在实时广告推荐环境中运行大模型规模和复杂度的模型，需要解决模型复杂性与系统效率之间的根本矛盾。与聊天机器人等响应时间以秒为单位的 LLM 应用不同，广告推荐必须满足两个不容妥协的约束：

*   **Latency impacts user experience:** Ads must be chosen and returned with sub-second latency. Scaling ads computation to LLM-scale level and beyond has traditionally been impossible without latency regressions that compromise user experience.
    **延迟影响用户体验：** 广告必须在亚秒级延迟内完成选择并返回。在不出现损害用户体验的延迟回退的情况下，将广告计算扩展到大模型规模及以上，在传统上是不可能的。
*   **Cost efficiency is crucial:** Brute force scaling by simply adding hardware is economically unsustainable. Achieving a positive ROI requires unlocking higher model complexity without a corresponding increase in total costs.
    **成本效率至关重要：** 仅仅通过增加硬件进行暴力扩展在经济上是不可持续的。要实现正向的投资回报率，需要在不增加总成本的情况下解锁更高的模型复杂度。

Adaptive Ranking Model addresses these challenges through a paradigm shift powered by three core innovations across the serving stack:
自适应排序模型通过服务堆栈中的三项核心创新所驱动的范式转变，解决了这些挑战：

*   **Inference-efficient model scaling:** Adaptive Ranking Model achieves a model complexity equivalent to the O(10 GFLOPs) per token used by top-tier LLMs. However, it operates an order of magnitude faster than standard LLM inference, maintaining O(100 ms) bounded latency.
    **推理高效的模型扩展：** 自适应排序模型实现了与顶级 LLM 每个 token 使用的 O(10 GFLOPs) 相当的模型复杂度。然而，它的运行速度比标准 LLM 推理快一个数量级，保持在 O(100 毫秒) 的延迟范围内。
*   **Deep model-system co-design:** Adaptive Ranking Model is deeply co-designed with the underlying hardware and silicon; we’ve boosted model FLOPs utilization (MFU) to 35% across multiple hardware types.
    **深度模型-系统协同设计：** 自适应排序模型与底层硬件和芯片进行了深度协同设计；我们将多种硬件类型上的模型 FLOPs 利用率（MFU）提升到了 35%。
*   **Reimagined serving infrastructure:** Adaptive Ranking Model utilizes a multi-card GPU serving infrastructure to break the physical memory limits of single devices. This allows us to scale model parameters to O(1T), providing a depth of understanding of people’s interests and intent previously impossible at Meta’s scale.
    **重构的服务基础设施：** 自适应排序模型利用多卡 GPU 服务基础设施打破了单设备的物理内存限制。这使我们能够将模型参数扩展到 O(1T)，从而在 Meta 的规模下提供了以前无法实现的对用户兴趣和意图的深度理解。

By unifying these innovations, we ensure that the most effective model is used for every request — providing a highly personalized ad experience for people on our platforms and maximizing advertiser value while maintaining system-wide computational efficiency.
通过整合这些创新，我们确保每个请求都使用最有效的模型——在保持系统整体计算效率的同时，为我们平台上的用户提供高度个性化的广告体验，并最大化广告商价值。

### Inference-Efficient Model Scaling
### 推理高效的模型扩展

Adaptive Ranking Model introduces model-system innovations that fundamentally redefine inference efficiency. This transformation is built on three technical pillars:
自适应排序模型引入了从根本上重新定义推理效率的模型-系统创新。这一转型建立在三个技术支柱之上：

*   Transforming scaling costs from linear to sub-linear by shifting to a request-oriented computation flow that eliminates massive redundancy at LLM-scale.
    通过转向以请求为导向的计算流，将扩展成本从线性转变为亚线性，消除了大模型规模下的巨大冗余。
*   Maximizing structural throughput through architectural refinements that stabilize deep models and minimize internal network bottlenecks.
    通过架构改进实现结构化吞吐量的最大化，从而稳定深度模型并最大限度地减少内部网络瓶颈。
*   Neutralizing complexity overhead through holistic latency optimization, offloading feature preprocessing to GPUs and streamlining the end-to-end execution path.
    通过整体延迟优化来抵消复杂性开销，将特征预处理卸载到 GPU，并简化端到端的执行路径。

**Transforming scaling costs from linear to sub-linear**
**将扩展成本从线性转变为亚线性**

Traditional models process each user-ad pair independently, creating massive computational redundancy. Adaptive Ranking Model eliminates this through Request-Oriented Optimization, which computes high-density user signals once per request rather than once per ad candidate. This shift, powered by Request-Oriented Computation Sharing and In-Kernel Broadcast optimization, which shares request-level embeddings across ad candidates.
传统模型独立处理每个用户-广告对，造成了巨大的计算冗余。自适应排序模型通过“面向请求的优化”消除了这一点，它为每个请求计算一次高密度用户信号，而不是为每个广告候选计算一次。这一转变由“面向请求的计算共享”和“内核内广播优化”驱动，后者在广告候选之间共享请求级别的嵌入。
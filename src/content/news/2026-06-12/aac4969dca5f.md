---
title: "Restless bandits with imperfect binary feedback: PCL-indexability analysis and computation"
originalUrl: "https://arxiv.org/abs/2606.11192"
date: "2026-06-11T23:10:25.881Z"
---

### Restless bandits with imperfect binary feedback: PCL-indexability analysis and computation
### 具有不完美二元反馈的非平稳多臂老虎机：PCL 可索引性分析与计算

**Abstract:** We study restless bandits with binary latent states and imperfect binary feedback, motivated by opportunistic spectrum access with sensing errors. For the associated belief-state model, we develop a partial conservation laws (PCL)-based analytical and computational framework for establishing indexability and evaluating the Whittle index, building on a verification theorem for real-state discounted restless bandits.

**摘要：** 本文研究了具有二元潜在状态和不完美二元反馈的非平稳多臂老虎机（Restless Bandits）问题，其研究动机源于存在感知误差的机会频谱接入场景。针对相关的信念状态模型，我们开发了一种基于部分守恒定律（PCL）的分析与计算框架，用于建立可索引性并评估 Whittle 指数，该框架建立在实状态折扣非平稳多臂老虎机的验证定理基础之上。

The framework analyzes the stochastic dynamics via an associated deterministic skeleton, renewal decompositions, and combinatorics on words. It yields tractable expressions for discounted reward and resource metrics in several threshold regimes, enabling full verification of the PCL-indexability conditions there.

该框架通过关联的确定性骨架、更新分解以及词组合学来分析随机动力学。它在多个阈值区间内为折扣奖励和资源指标提供了易于处理的表达式，从而能够完全验证这些区间内的 PCL 可索引性条件。

For the remaining regime, where a complete analytic verification is not achieved in this paper, we derive efficient numerical schemes for computing the relevant marginal metrics and the marginal productivity (MP) index, which equals the Whittle index when those conditions hold. Extensive computational experiments provide strong evidence that these conditions also hold in that regime across broad parameter ranges and without the stringent parameter restrictions imposed in prior work.

对于本文尚未实现完全解析验证的剩余区间，我们推导出了高效的数值方案，用于计算相关的边际指标和边际生产力（MP）指数；当上述条件成立时，该指数等同于 Whittle 指数。大量的计算实验提供了强有力的证据，表明这些条件在广泛的参数范围内均成立，且无需像以往研究那样施加严格的参数限制。

The experiments further show that the MP index policy typically outperforms standard benchmark policies, often by a substantial margin.

实验进一步表明，MP 指数策略通常优于标准的基准策略，且往往具有显著的性能优势。
---
title: "Rendering-Aware Bayesian 3D Gaussian Splatting with Native Uncertainty and Adaptive Complexity Control"
originalUrl: "https://arxiv.org/abs/2607.05522"
date: "2026-07-08T22:34:49.611Z"
---

# Rendering-Aware Bayesian 3D Gaussian Splatting with Native Uncertainty and Adaptive Complexity Control
# 具有原生不确定性和自适应复杂度控制的渲染感知贝叶斯 3D 高斯泼溅

**Abstract:** 3D Gaussian splatting (3DGS) is a strong representation for real-time novel-view synthesis, but its standard training pipeline relies on point estimates and hand-tuned heuristics, providing no native uncertainty or principled complexity control. This is most limiting under sparse views or fixed acquisition budgets, where a model must identify weakly supported geometry and select informative views.

**摘要：** 3D 高斯泼溅（3DGS）是实现实时新视角合成的强大表示方法，但其标准训练流程依赖于点估计和人工调整的启发式规则，无法提供原生不确定性或原则性的复杂度控制。在稀疏视角或固定采集预算的情况下，这种局限性尤为突出，因为模型必须识别支撑不足的几何结构并选择信息量大的视角。

We introduce a rendering-aware Bayesian 3DGS framework that tracks Gaussian geometry with a Normal-Inverse-Wishart posterior over means and covariances using renderer-derived surrogate summaries. An optional Dirichlet-process extension adds a probabilistic component-usage signal, and the training schedule makes the closed-form versus approximate inference boundary explicit. Re-rendering posterior geometry samples yields native predictive uncertainty for interval calibration and active view selection.

我们引入了一种渲染感知的贝叶斯 3DGS 框架，该框架利用渲染器导出的代理摘要，通过均值和协方差上的正态-逆威沙特（Normal-Inverse-Wishart, NIW）后验分布来追踪高斯几何。可选的狄利克雷过程扩展增加了一个概率性的组件使用信号，训练计划明确了闭式推断与近似推断的边界。通过对后验几何样本进行重渲染，可以获得用于区间校准和主动视角选择的原生预测不确定性。

In a fixed-budget 16-to-32 active-view task, native NIW acquisition improves PSNR by +0.453 dB and LPIPS by -0.0146 over a scoring-only 3-member standard-ensemble baseline, winning 29/39 scene-seed pairs and 10/13 scene means; it also improves over PPU-style (+0.355 dB) and NIW-proxy (+0.401 dB) acquisition. NIW native intervals reduce 95% coverage error by about 17x relative to a shared proxy (0.046 vs. 0.796) and are about 10x closer to nominal coverage than a 3-member deep ensemble (0.047 vs. 0.454) at roughly one-third the training cost.

在固定预算的 16 到 32 个主动视角任务中，原生 NIW 采集方法在 PSNR 上提升了 +0.453 dB，LPIPS 提升了 -0.0146，优于仅基于评分的 3 成员标准集成基线，并在 39 个场景种子对中的 29 个以及 13 个场景均值中的 10 个胜出；它也优于 PPU 风格（+0.355 dB）和 NIW 代理（+0.401 dB）采集方法。NIW 原生区间将 95% 的覆盖误差相对于共享代理降低了约 17 倍（0.046 对比 0.796），并且在仅需约三分之一训练成本的情况下，比 3 成员深度集成方法更接近标称覆盖率（0.047 对比 0.454）。

As a reconstruction compatibility check, paired NIW-vs-standard analysis over 39 scene-seed runs yields +0.030 dB PSNR with 1.6% additional training time. These results position Bayesian 3DGS as a practical probabilistic scene representation for decision-facing tasks such as active view selection.

作为重建兼容性检查，对 39 次场景种子运行进行的 NIW 与标准方法的配对分析显示，在增加 1.6% 训练时间的情况下，PSNR 提升了 +0.030 dB。这些结果表明，贝叶斯 3DGS 是一种实用的概率场景表示方法，适用于主动视角选择等决策导向型任务。
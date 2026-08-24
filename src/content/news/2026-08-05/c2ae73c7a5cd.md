---
title: "Response Magnitude as a Dominant Signal for Held-Out CRISPRi Perturbation Effect Prediction"
originalUrl: "https://arxiv.org/abs/2608.00152"
date: "2026-08-04T22:40:04.535Z"
---

# Response Magnitude as a Dominant Signal for Held-Out CRISPRi Perturbation Effect Prediction
# 响应幅度作为留出 CRISPRi 扰动效应预测的主导信号

**Abstract:** Predicting the magnitude of a CRISPRi perturbation's transcriptomic effect on held-out target genes is an important open problem in single-cell biology. Recent work has documented that simple baselines often match or exceed deep perturbation predictors on related protocols. We study this phenomenon on the Virtual Cell Challenge (VCC) benchmark under a strict held-out target-gene split, identify the specific low-dimensional signal that drives the gap, and characterize how it transfers across cell types.

**摘要：** 预测 CRISPRi 扰动对留出（held-out）目标基因的转录组效应幅度是单细胞生物学中一个重要的开放性问题。近期研究表明，在相关实验方案中，简单的基准模型往往能达到甚至超过深度扰动预测模型的效果。我们在 Virtual Cell Challenge (VCC) 基准测试中，在严格的留出目标基因划分下研究了这一现象，识别出了导致性能差距的具体低维信号，并刻画了该信号在不同细胞类型间的迁移方式。

The target is the log Anderson-Darling distance from non-targeting controls, which is strongly predictable from four deterministic scalar functions of the 2,000-dimensional input. A deep MLP encoder with direct access to the full input collapses toward the marginal training mean, and standard remedies do not close the gap. A linear regression on the four magnitude scalars alone exceeds the strongest x-only classical model, while a Random Forest on the input plus the four scalars substantially outperforms our deep proof-of-concept encoder.

预测目标是相对于非靶向对照组的对数 Anderson-Darling 距离，该距离可以通过 2,000 维输入的四个确定性标量函数进行强预测。直接访问完整输入的深度 MLP 编码器会坍缩至训练集的边缘均值，且标准补救措施无法弥补这一差距。仅使用这四个幅度标量进行的线性回归表现就超过了最强的仅基于 x 的经典模型，而将输入与这四个标量结合的随机森林模型则显著优于我们作为概念验证的深度编码器。

Two pre-specified controls attribute the magnitude gain to per-row alignment rather than added dimensionality. Under zero-shot transfer to two external CRISPRi screens evaluated against a target-gene endpoint rebuilt from single-cell data, magnitude-only predictors transfer positively whereas expression-only predictors are negative or unresolved. Exposing magnitude to the deep encoder improves transfer over its expression-only counterpart, yet the encoder does not outperform a four-scalar linear regression on the same features.

两个预设的对照实验表明，性能的提升归因于逐行对齐（per-row alignment）而非维度的增加。在针对两个外部 CRISPRi 筛选进行零样本（zero-shot）迁移，并根据从单细胞数据重建的目标基因终点进行评估时，仅使用幅度的预测器表现出正向迁移，而仅使用表达量的预测器表现为负向或不确定。将幅度信息引入深度编码器确实改善了其相对于仅使用表达量的迁移效果，但该编码器在相同特征上的表现仍未超过四标量线性回归。

We also find that the Anderson-Darling column distributed with these screens measures transcriptome-wide response breadth rather than target-gene effect strength, so evaluating transfer against it scores a different outcome.

我们还发现，随这些筛选数据分发的 Anderson-Darling 列衡量的是全转录组的响应广度，而非目标基因的效应强度，因此针对该指标评估迁移效果会得出不同的结论。
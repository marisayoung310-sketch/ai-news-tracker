---
title: "Boundary Variance Inflation Causes Acquisition Bias in Gaussian Processes"
originalUrl: "https://arxiv.org/abs/2606.07561"
date: "2026-06-09T23:05:38.248Z"
---

# Boundary Variance Inflation Causes Acquisition Bias in Gaussian Processes
# 边界方差膨胀导致高斯过程中的采集偏差

**Abstract:** Gaussian processes with stationary kernels on bounded domains exhibit inflated posterior variance near the boundary. Despite being a long-recognized artifact in geostatistics and a source of over-exploration in Bayesian optimization, the causes and effects of boundary-induced acquisition bias are underexplored.

**摘要：** 在有界域上使用平稳核的高斯过程在边界附近表现出后验方差膨胀的现象。尽管这在地质统计学中是一个早已被认识到的伪影，也是贝叶斯优化中过度探索的一个来源，但由边界引起的采集偏差的原因和影响尚未得到充分研究。

We trace the root cause to a simple geometric mechanism: the truncation of the kernel correlation neighborhood at the domain boundary creates an observation-independent distortion that worsens with dimensionality.

我们将这一问题的根本原因追溯到一个简单的几何机制：核相关邻域在域边界处的截断产生了一种与观测无关的畸变，且这种畸变会随着维度的增加而恶化。

We show how this distortion manifests across three acquisition classes: variance maximization concentrates selections at the corners, whereas negative integrated posterior variance and expected predictive information gain move selections inward to axis-aligned interior shells.

我们展示了这种畸变如何在三类采集函数中表现出来：方差最大化会将选择集中在角落，而负积分后验方差和预期预测信息增益则会将选择向内移动到轴对齐的内部壳层。

These patterns arise without reference to any objective function, meaning that acquisition behavior can be dominated by kernel geometry rather than the desired task-specific uncertainty. To quantify this, we introduce a function-free selection-profile diagnostic for arbitrary acquisitions, kernels, and bounded-domain geometries.

这些模式的出现无需参考任何目标函数，这意味着采集行为可能被核几何结构所主导，而非任务特定的不确定性。为了量化这一点，我们引入了一种无需函数参与的选择概况诊断方法，适用于任意采集函数、核函数和有界域几何结构。
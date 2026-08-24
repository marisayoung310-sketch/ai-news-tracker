---
title: "Gradient Descent with Large Step Size Restores Symmetry in Deep Linear Networks with Multi-Pathway"
originalUrl: "https://arxiv.org/abs/2606.05219"
date: "2026-06-05T22:49:16.906Z"
---

# Gradient Descent with Large Step Size Restores Symmetry in Deep Linear Networks with Multi-Pathway
# 大步长梯度下降在多路径深度线性网络中恢复对称性

**Abstract:** Recent analyses of multi-pathway Deep Linear Networks use Gradient Flow to predict a "winner-takes-all" specialization in which path symmetry breaks and each feature concentrates in a single pathway. 

**摘要：** 近期对多路径深度线性网络（Deep Linear Networks）的分析利用梯度流（Gradient Flow）预测了一种“赢家通吃”的特化现象，即路径对称性被打破，每个特征都集中在单一路径中。

In this work, we show that discrete Gradient Descent (GD) with a large step size tells a different story. We prove that single-path solutions are sharp minima, whereas distributing signals across pathways reduces sharpness by a factor that decreases with both the number of pathways and depth. 

在这项工作中，我们展示了使用大步长的离散梯度下降（GD）得出了不同的结论。我们证明了单路径解是尖锐极小值（sharp minima），而将信号分布在多条路径上可以降低尖锐度，且降低的幅度随路径数量和网络深度的增加而减小。

Consequently, while early training reproduces the depth-driven symmetry breaking predicted by GF, oscillations at the Edge of Stability subsequently override this tendency and drive the network into a re-balancing phase, where signals redistribute across pathways. 

因此，虽然训练初期会重现梯度流所预测的由深度驱动的对称性破缺，但处于“稳定性边缘”（Edge of Stability）的振荡随后会覆盖这种趋势，并驱动网络进入重新平衡阶段，使信号在各路径间重新分布。

Together, these results clarify how depth shapes pathway competition and explain why large-step GD favors shared representations rather than persistent single-pathway dominance.

总之，这些结果阐明了深度如何塑造路径竞争，并解释了为什么大步长梯度下降更倾向于共享表示，而非持续的单路径主导。
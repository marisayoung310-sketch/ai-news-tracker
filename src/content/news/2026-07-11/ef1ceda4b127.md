---
title: "LLT: Local Linear Transformer for PDE Operator Learning"
originalUrl: "https://arxiv.org/abs/2607.07718"
date: "2026-07-10T22:36:37.351Z"
---

# LLT: Local Linear Transformer for PDE Operator Learning
# LLT：用于偏微分方程算子学习的局部线性 Transformer

**Abstract:** Neural operators have become a common approach for learning PDE solution maps and accelerating numerical simulations. Transformer-based neural operators are of particular interest, since attention can learn long-range dependencies in the computational domain. However, standard attention has two major limitations when applied to PDEs: it scales quadratically with the number of computational nodes, and it lacks an explicit bias toward local interactions.

**摘要：** 神经算子已成为学习偏微分方程（PDE）解映射和加速数值模拟的常用方法。基于 Transformer 的神经算子尤为引人关注，因为注意力机制能够学习计算域中的长程依赖关系。然而，标准注意力机制在应用于偏微分方程时存在两个主要局限：其计算复杂度随计算节点数量呈二次方增长，且缺乏对局部相互作用的显式偏置。

To address these issues, we introduce Local Linear Transformer (LLT) for PDE operator learning. The architecture combines linear global attention with local spatial mixing, and incorporates coordinate and geometry information. We evaluate LLT on several PDE problems, including elasticity, plasticity, airfoil flow, pipe flow, and Darcy flow. The reference data for these problems span finite-element, finite-volume, and finite-difference discretizations on structured and unstructured meshes.

为了解决这些问题，我们引入了用于偏微分方程算子学习的局部线性 Transformer (LLT)。该架构将线性全局注意力与局部空间混合相结合，并融入了坐标和几何信息。我们在多个偏微分方程问题上评估了 LLT，包括弹性、塑性、翼型流、管道流和达西流。这些问题的参考数据涵盖了结构化和非结构化网格上的有限元、有限体积和有限差分离散化方法。

Compared with other neural-operator and transformer baselines from prior studies, LLT achieves competitive or lower relative $L_2$ error across these problems. On matched structured discretizations, wall-clock time per training iteration is reduced by factors of 1.8 to 2.5 relative to Transolver. We also scale the approach and apply it to a three-dimensional car aerodynamics dataset with 32,186 unstructured mesh points per sample. Together, these results indicate that LLT provides an accurate and computationally efficient operator for PDE problems across discretizations, mesh types, and problem settings.

与先前研究中的其他神经算子和 Transformer 基准相比，LLT 在这些问题上实现了具有竞争力或更低的相对 $L_2$ 误差。在匹配的结构化离散化条件下，其单次训练迭代的挂钟时间比 Transolver 缩短了 1.8 到 2.5 倍。我们还扩展了该方法，并将其应用于包含每个样本 32,186 个非结构化网格点的三维汽车空气动力学数据集。总之，这些结果表明，LLT 为跨离散化方法、网格类型和问题设置的偏微分方程问题提供了一种准确且计算高效的算子。
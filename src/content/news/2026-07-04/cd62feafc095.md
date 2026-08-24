---
title: "AnchorSplat: Fast and Structure Consistent Detail Synthesis for Gaussian Splatting"
originalUrl: "https://arxiv.org/abs/2607.01290"
date: "2026-07-03T22:36:28.228Z"
---

# AnchorSplat: Fast and Structure Consistent Detail Synthesis for Gaussian Splatting
# AnchorSplat：用于高斯泼溅（Gaussian Splatting）的快速且结构一致的细节合成

3D Gaussian Splatting (3DGS) has emerged as a powerful representation for high-fidelity rendering. However, existing assets often suffer from quality bottlenecks such as missing details and texture noise. Prior attempts to enhance these assets via 2D image processing introduce multi-view inconsistencies and high computational costs.
3D 高斯泼溅（3DGS）已成为一种用于高保真渲染的强大表示方法。然而，现有的资产往往面临细节缺失和纹理噪声等质量瓶颈。此前通过 2D 图像处理来增强这些资产的尝试，引入了多视图不一致性以及高昂的计算成本。

In this paper, we propose a novel 3D-native refinement paradigm named AnchorSplat. AnchorSplat is an end-to-end deep network operating directly on 3D structures, avoiding the expensive optimization overhead of traditional 3D-2D-3D pipelines. Crucially, AnchorSplat is a strictly source-free solution requiring no original multi-view images.
在本文中，我们提出了一种名为 AnchorSplat 的新型 3D 原生细化范式。AnchorSplat 是一个直接在 3D 结构上运行的端到端深度网络，避免了传统 3D-2D-3D 流水线中昂贵的优化开销。至关重要的是，AnchorSplat 是一种严格的无源（source-free）解决方案，不需要原始的多视图图像。

Central to the proposed method is the Point Anchor Mechanism, which enforces geometric consistency via local offset constraints, mitigating ill-posed mapping and gradient confounding. Furthermore, AnchorSplat replaces iterative densification with a single-pass multiplication mechanism.
该方法的核心是“点锚定机制”（Point Anchor Mechanism），它通过局部偏移约束强制执行几何一致性，从而缓解了病态映射和梯度混淆问题。此外，AnchorSplat 用单次乘法机制取代了迭代致密化过程。

To facilitate research, we construct 3DGS-SR, the first large-scale benchmark for this task. Experiments demonstrate state-of-the-art results on the 3DGS-SR dataset, with throughput up to $10^5$ times faster than optimization methods. Notably, AnchorSplat exhibits robust zero-shot generalization across diverse data distributions, including generative model outputs and real-world scans.
为了促进相关研究，我们构建了 3DGS-SR，这是该任务的首个大规模基准测试集。实验表明，该方法在 3DGS-SR 数据集上达到了最先进（SOTA）的性能，吞吐量比优化方法快达 $10^5$ 倍。值得注意的是，AnchorSplat 在包括生成模型输出和真实世界扫描在内的多种数据分布中，展现出了稳健的零样本泛化能力。
---
title: "TSCA-Net: Temporal-Spatial Clique Attention for Interpretable Multimodal Pedestrian Trajectory Prediction"
originalUrl: "https://arxiv.org/abs/2607.11939"
date: "2026-07-15T22:25:59.565Z"
---

# TSCA-Net: Temporal-Spatial Clique Attention for Interpretable Multimodal Pedestrian Trajectory Prediction
# TSCA-Net：用于可解释多模态行人轨迹预测的时空团注意力机制

**Abstract:** Accurate pedestrian trajectory prediction in crowded environments remains challenging due to the multimodal uncertainty of human motion and the variable complexity of motion dynamics across different scene contexts.
**摘要：** 由于人类运动的多模态不确定性以及不同场景背景下运动动力学的多变复杂性，在拥挤环境中进行准确的行人轨迹预测仍然是一项挑战。

Existing goal-conditioned models rely on static displacement structures that assign equal weight to all historical time steps, standard graph attention mechanisms, and fixed-capacity motion decoders that cannot adapt to local prediction complexity.
现有的目标条件模型依赖于静态位移结构（对所有历史时间步赋予相等权重）、标准图注意力机制以及固定容量的运动解码器，这些方法无法适应局部预测的复杂性。

To address these limitations, we propose TSCA-Net, a trajectory prediction framework built upon three complementary modules.
为了解决这些局限性，我们提出了 TSCA-Net，这是一个基于三个互补模块构建的轨迹预测框架。

The Temporal-Spatial Clique Attention (TSCA) module introduces learnable temporal gating into clique-based goal-history interaction, enabling time-aware modulation of historical observations relative to each candidate goal.
时空团注意力（TSCA）模块将可学习的时间门控引入到基于团（clique）的目标-历史交互中，实现了相对于每个候选目标对历史观测结果的时间感知调节。

The Cross-Pedestrian Clique Potential (CPCP) module models asymmetric pairwise agent relationships through a dynamic clique potential framework with a time-varying social graph.
跨行人团势（CPCP）模块通过具有时变社交图的动态团势框架，对非对称的成对智能体关系进行建模。

The Adaptive KAN Grid Refinement (AKGR) mechanism dynamically adjusts the B-spline grid resolution of a Kolmogorov-Arnold Network-augmented LSTM decoder based on per-agent goal distribution entropy, balancing model expressiveness against overfitting across varying motion complexities.
自适应 KAN 网格细化（AKGR）机制根据每个智能体的目标分布熵，动态调整 Kolmogorov-Arnold 网络增强型 LSTM 解码器的 B 样条网格分辨率，从而在不同的运动复杂性下平衡模型的表达能力与过拟合风险。

Extensive experiments on the ETH/UCY and Stanford Drone Dataset benchmarks demonstrate that TSCA-Net achieves state-of-the-art performance, with average ADE/FDE of 0.13/0.20 m on ETH/UCY and 6.95/10.43 pixels on SDD.
在 ETH/UCY 和 Stanford Drone Dataset 基准测试上的大量实验表明，TSCA-Net 达到了最先进的性能，在 ETH/UCY 上的平均 ADE/FDE 为 0.13/0.20 米，在 SDD 上的平均 ADE/FDE 为 6.95/10.43 像素。

Comprehensive ablation studies confirm the complementary contributions of all three proposed modules.
全面的消融研究证实了所提出的三个模块各自的互补贡献。
---
title: "Mechanistic Analysis of Alignment Algorithms in Language Models"
originalUrl: "https://arxiv.org/abs/2606.09850"
date: "2026-06-10T23:08:35.546Z"
---

# Mechanistic Analysis of Alignment Algorithms in Language Models
# 语言模型对齐算法的机制分析

**Abstract:** Post-training alignment algorithms are predominantly evaluated as black boxes, obscuring how they reshape language models' internal computations. We present a systematic mechanistic analysis of six preference-optimization methods: PPO, DPO, SimPO, ORPO, GRPO, and KTO across three open-weight model families.

**摘要：** 训练后的对齐算法目前主要被当作“黑盒”进行评估，这掩盖了它们重塑语言模型内部计算方式的具体过程。我们对六种偏好优化方法（PPO、DPO、SimPO、ORPO、GRPO 和 KTO）在三个开源权重模型系列上进行了系统的机制分析。

By integrating layer-wise linear probing, Sparse Autoencoders, and crosscoders, we localize preference representations and quantify alignment-induced geometric transformations in latent space. We find that preference signals consistently concentrate in early--mid or mid--late layers, but different objectives induce qualitatively distinct representational shifts.

通过整合逐层线性探测（layer-wise linear probing）、稀疏自动编码器（Sparse Autoencoders）和交叉编码器（crosscoders），我们定位了偏好表征，并量化了对齐操作在潜在空间中引起的几何变换。我们发现，偏好信号始终集中在模型的中前层或中后层，但不同的优化目标会诱导产生性质迥异的表征偏移。

KTO and GRPO enhance linear separability through constructive feature sharing and sparse, high-salience recruitment. In contrast, DPO and ORPO degrade separability via non-constructive geometric rotation and feature attenuation, while PPO and SimPO largely preserve baseline geometry.

KTO 和 GRPO 通过建设性的特征共享和稀疏的高显著性招募（high-salience recruitment）增强了线性可分性。相比之下，DPO 和 ORPO 通过非建设性的几何旋转和特征衰减降低了可分性，而 PPO 和 SimPO 则在很大程度上保留了基准几何结构。

These transformations exhibit architecture-dependent variability, demonstrating that behavioral alignment does not imply uniform internal restructuring. Our findings establish alignment as a heterogeneous intervention, motivate standardized feature-level auditing for safety and interpretability, and highlight the need for mechanism-aware optimization objectives.

这些变换表现出对架构的依赖性，证明了行为上的对齐并不意味着内部结构的统一重组。我们的研究结果确立了对齐作为一种异构干预手段的地位，推动了针对安全性和可解释性的标准化特征级审计，并强调了开发“机制感知型”优化目标的必要性。
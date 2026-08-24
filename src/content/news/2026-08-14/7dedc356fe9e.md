---
title: "CLEAR: Class-wise Expert Aggregation with Structured Sampling for Long-Tailed Classification"
originalUrl: "https://arxiv.org/abs/2608.11287"
date: "2026-08-13T22:57:25.009Z"
---

# CLEAR: Class-wise Expert Aggregation with Structured Sampling for Long-Tailed Classification
# CLEAR：用于长尾分类的类级专家聚合与结构化采样方法

**Abstract:** Long-tailed classification poses a reliability challenge because models trained on imbalanced data are unevenly reliable across frequent and underrepresented classes. While existing methods address imbalance through re-balancing, adjustment, representation learning, or multi-expert modeling, they rarely estimate which expert should be trusted for each class.

**摘要：** 长尾分类带来了一项可靠性挑战，因为在不平衡数据上训练的模型在常见类别和代表性不足的类别之间表现出的可靠性并不均衡。虽然现有方法通过重平衡、调整、表征学习或多专家建模来解决不平衡问题，但它们很少评估对于每个类别应该信任哪位专家。

This paper proposes CLEAR (Class-wise reLiability-aware Expert Aggregation for long-tailed Recognition), a modular ensemble framework for long-tailed classification. CLEAR generates diverse experts through threshold-based structured sampling while preserving the full label space, then estimates a class-wise trust score for each expert using a smoothed class-wise precision formulation.

本文提出了 CLEAR（用于长尾识别的类级可靠性感知专家聚合），这是一个用于长尾分类的模块化集成框架。CLEAR 通过基于阈值的结构化采样生成多样化的专家，同时保留完整的标签空间，然后使用平滑的类级精度公式为每位专家估算类级信任分数。

During inference, expert predictions are combined through class-wise generalized product-of-experts aggregation, allowing different experts to be emphasized for different classes. Experiments on CIFAR-100-LT, ImageNet-LT, and Places-LT across multiple backbones show that CLEAR achieves competitive overall accuracy and particularly strong few-shot performance. These results support class-wise expert reliability as a useful design principle for long-tailed ensemble learning.

在推理过程中，专家预测通过类级广义专家乘积聚合进行组合，从而允许针对不同类别强调不同的专家。在 CIFAR-100-LT、ImageNet-LT 和 Places-LT 上跨多个骨干网络的实验表明，CLEAR 实现了具有竞争力的整体准确率，并在少样本学习中表现尤为出色。这些结果支持将“类级专家可靠性”作为长尾集成学习的一种有效设计原则。
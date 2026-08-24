---
title: "SlideCheck: Guiding Self-Supervised Pretraining of Pathology Foundation Models via Dataset Distributions"
originalUrl: "https://arxiv.org/abs/2606.07590"
date: "2026-06-09T23:05:55.386Z"
---

# SlideCheck: Guiding Self-Supervised Pretraining of Pathology Foundation Models via Dataset Distributions
# SlideCheck：通过数据集分布引导病理学基础模型的自监督预训练

**Abstract:** Pathology foundation models are pretrained on large streams of WSI-derived patches, while supervision during data construction is often slide-level, sparse, or heterogeneous. This mismatch makes it difficult to understand and control which biological patterns enter the pretraining data. 

**摘要：** 病理学基础模型通常在源自全切片图像（WSI）的大规模切片流上进行预训练，而数据构建过程中的监督信息往往是切片级的、稀疏的或异构的。这种不匹配使得理解和控制哪些生物学模式进入预训练数据变得十分困难。

We propose SlideCheck, a lightweight pretraining data guidance tool built on frozen pathology foundation model patch features. Rather than serving as a standalone patch diagnostic model, SlideCheck provides explicit abnormality and malignancy scores for organizing, filtering, and auditing pathology pretraining data. 

我们提出了 SlideCheck，这是一种基于冻结的病理学基础模型切片特征构建的轻量级预训练数据引导工具。SlideCheck 并非作为一个独立的切片诊断模型，而是通过提供明确的异常和恶性程度评分，用于组织、过滤和审计病理学预训练数据。

SlideCheck uses a dual-head MLP to separately model broad abnormal morphology and malignant evidence. A regularized feature-space scorer provides a supervised anchor for patch-level evidence estimation, while score-attention agreement combines patch scores with WSI-level MIL attention to mine high-confidence pseudo labels. 

SlideCheck 使用双头多层感知机（MLP）分别对广泛的异常形态和恶性证据进行建模。正则化的特征空间评分器为切片级证据估计提供了监督锚点，而评分-注意力一致性机制则将切片评分与 WSI 级的多示例学习（MIL）注意力相结合，从而挖掘高置信度的伪标签。

The same scores are then used to construct broad-positive ViT pretraining subsets, where a patch is selected if either abnormality or malignancy evidence exceeds a threshold. Experiments show that SlideCheck-defined data distributions influence the downstream behavior of self-supervised ViT pretraining, indicating that biological composition is an important controllable factor in pathology foundation model development. 

随后，这些评分被用于构建广义阳性的 ViT 预训练子集，其中若切片的异常或恶性证据超过阈值，该切片即被选中。实验表明，由 SlideCheck 定义的数据分布会影响自监督 ViT 预训练的下游表现，这表明生物学组成是病理学基础模型开发中一个重要的可控因素。

Curated subsets can approach full-data performance, suggesting that explicitly scored patch pools may support more efficient and auditable pretraining data construction. These findings position SlideCheck as a data guidance and auditing layer for transforming large, undifferentiated patch pools into controllable and reusable pretraining datasets.

经过筛选的子集可以达到接近全量数据的性能，这表明经过明确评分的切片池可以支持更高效且可审计的预训练数据构建。这些发现将 SlideCheck 定位为一种数据引导和审计层，能够将庞大且未经区分的切片池转化为可控且可重用的预训练数据集。
---
title: "Time Imprint: Learning Time-Aware Representations in Multi-Modal Knowledge Graphs"
originalUrl: "https://arxiv.org/abs/2607.09777"
date: "2026-07-14T22:26:03.569Z"
---

# Time Imprint: Learning Time-Aware Representations in Multi-Modal Knowledge Graphs
# Time Imprint：在多模态知识图谱中学习时间感知表示

Multi-Modal Knowledge Graphs (MMKGs) enrich entities with multiple modalities such as text and images, yet entities with highly similar multi-modal features remain difficult to distinguish. 
多模态知识图谱（MMKGs）通过文本和图像等多种模态丰富了实体信息，然而，具有高度相似多模态特征的实体仍然难以区分。

Temporal information of an entity can serve as an additional modality to disambiguate such entities, but existing approaches rarely treat time as a separate modality alongside text and images due to two major challenges: (1) sparse temporal semantics, which hinder alignment with richer modalities, and (2) multiple timestamps, which introduce noise or reduce robustness in representation learning. 
实体的时序信息可以作为一种额外的模态来消除此类实体的歧义，但现有方法很少将时间与文本和图像并列视为独立的模态，这主要是由于两个主要挑战：(1) 时间语义稀疏，阻碍了其与更丰富模态的对齐；(2) 多个时间戳的存在会引入噪声或降低表示学习的鲁棒性。

To address these challenges, we propose Time Imprint, a framework that treats time as an entity-level modality and jointly aligns temporal, textual, and visual representations via a three-view contrastive objective. 
为了应对这些挑战，我们提出了 Time Imprint 框架，该框架将时间视为实体级模态，并通过三视图对比目标函数联合对齐时间、文本和视觉表示。

Additionally, to mitigate multi-timestamp ambiguity, Time Imprint studies a compact timestamp subset selection design space and aggregates the selected timestamps into a discriminative temporal embedding with attention pooling, balancing temporal specificity and robustness. 
此外，为了减轻多时间戳带来的歧义，Time Imprint 研究了一个紧凑的时间戳子集选择设计空间，并通过注意力池化将选定的时间戳聚合为具有判别力的时间嵌入，从而平衡了时间特异性与鲁棒性。

Experiments on three MMKG benchmarks demonstrate that Time Imprint achieves state-of-the-art link prediction performance, improving Hits@1 by up to 6.07% overall and yielding up to 58% gains on the subset of the top-1% ambiguity samples. 
在三个 MMKG 基准测试上的实验表明，Time Imprint 实现了最先进的链接预测性能，整体 Hits@1 指标提升高达 6.07%，在歧义程度最高的前 1% 样本子集上性能提升高达 58%。

We further examine different fusion strategies and the sensitivity to timestamp availability and quality, clarifying when and why time-as-modality is most beneficial, while adding only modest training overhead. 
我们进一步研究了不同的融合策略以及对时间戳可用性和质量的敏感性，阐明了“时间作为模态”在何时以及为何最有效，同时仅增加了适度的训练开销。
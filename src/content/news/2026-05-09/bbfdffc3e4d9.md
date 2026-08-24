---
title: "Layout-Aware Representation Learning for Open-Set ID Fraud Discovery"
originalUrl: "https://arxiv.org/abs/2605.05215"
date: "2026-05-08T22:45:44.572Z"
---

# Layout-Aware Representation Learning for Open-Set ID Fraud Discovery
# 面向开放集身份欺诈发现的布局感知表征学习

**Abstract:** Identity-document fraud detection is not a stationary binary classification problem. Adaptive attackers modify templates and fabrication pipelines, making historical fraud labels stale, and successful forgeries recur at scale as coherent campaigns. We therefore study layout-aware representation learning for open-set fraud discovery rather than only closed-set classification.

**摘要：** 身份文件欺诈检测并非一个静态的二分类问题。攻击者会不断调整模板和伪造流程，导致历史欺诈标签失效，且成功的伪造手段往往会以连贯的攻击活动形式大规模复现。因此，我们研究了面向开放集欺诈发现的布局感知表征学习，而非仅仅局限于封闭集分类。

We adapt DINOv3 to the document domain via context-aware SimMIM fine-tuning and supervised metric learning with composite loss that encourages inter-class separability and intra-class compactness. The model is trained with U.S. IDs only. With a lightweight MLP and softmax classifier, the embedding achieves 99.83% layout classification accuracy on Canadian layouts.

我们通过上下文感知的 SimMIM 微调以及采用复合损失函数的监督度量学习，将 DINOv3 适配到文档领域，该损失函数旨在增强类间可分性和类内紧凑性。该模型仅使用美国身份证件进行训练。配合轻量级 MLP 和 Softmax 分类器，该嵌入模型在加拿大证件布局上实现了 99.83% 的分类准确率。

Moreover, on a dataset of 20,448 Canadian IDs, embedding-space analysis surfaces 276 adaptive physical-fraud cases, including 222 not surfaced by incumbent detectors. The embedding supports similarity-based expansion from a single confirmed seed to additional related cases not linked by conventional metadata graphs. The layout-aware document embeddings provide a production-aligned basis for discovering novel and campaign-scale fraud under distribution shift.

此外，在包含 20,448 个加拿大身份证件的数据集上，嵌入空间分析发现了 276 起自适应物理欺诈案例，其中 222 起是现有检测器未能识别出的。该嵌入模型支持从单个已确认的种子案例出发，通过相似度扩展发现更多传统元数据图谱无法关联的相关案例。这种布局感知文档嵌入为在分布偏移下发现新型及大规模欺诈活动提供了符合生产环境需求的基石。
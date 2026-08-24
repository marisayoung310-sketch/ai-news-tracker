---
title: "Logical Grammar Induction via Graph Kolmogorov Complexity: A Neuro-Symbolic Framework for Self-Healing Clinical Data Integrity"
originalUrl: "https://arxiv.org/abs/2605.15242"
date: "2026-05-18T22:41:20.709Z"
---

# Logical Grammar Induction via Graph Kolmogorov Complexity: A Neuro-Symbolic Framework for Self-Healing Clinical Data Integrity
# 基于图柯尔莫哥洛夫复杂度的逻辑语法归纳：一种用于临床数据完整性自愈的神经符号框架

**Abstract:** The reliability of Healthcare Information Systems (HIS) is frequently compromised by human-induced data entry errors, which existing statistical anomaly detection methods fail to distinguish from legitimate clinical extremes. 

**摘要：** 医疗信息系统（HIS）的可靠性经常受到人为数据录入错误的损害，而现有的统计异常检测方法无法将这些错误与合理的临床极端情况区分开来。

This paper proposes Logic-GNN, a novel neuro-symbolic framework that treats clinical records as a structured ``private language'' governed by latent logical games. By integrating Temporal Graph Neural Networks (TGNN) with Graph Kolmogorov Complexity, we induce a symbolic grammar that represents the underlying logic of medical interactions. 

本文提出了 Logic-GNN，这是一种新颖的神经符号框架，它将临床记录视为由潜在逻辑博弈支配的结构化“私有语言”。通过将时序图神经网络（TGNN）与图柯尔莫哥洛夫复杂度相结合，我们归纳出了一种能够代表医疗交互底层逻辑的符号语法。

We define anomalies as ``grammatical violations'' that cause a significant expansion in the Minimum Description Length (MDL) of the clinical graph. Evaluated on the Sina System dataset (2M+ records), Logic-GNN achieves an F1-score of 0.94, outperforming state-of-the-art baselines by 12\% in distinguishing between life-threatening medical outliers and data corruption. 

我们将异常定义为会导致临床图的最小描述长度（MDL）显著增加的“语法违规”。在 Sina System 数据集（超过 200 万条记录）上的评估显示，Logic-GNN 的 F1 分数达到了 0.94，在区分危及生命的医疗异常值与数据损坏方面，比现有最先进的基准模型提高了 12%。

Our approach introduces a self-healing mechanism that suggests logical corrections to maintain data integrity in real-time HIS environments.

我们的方法引入了一种自愈机制，能够为实时 HIS 环境中的数据完整性维护提供逻辑修正建议。
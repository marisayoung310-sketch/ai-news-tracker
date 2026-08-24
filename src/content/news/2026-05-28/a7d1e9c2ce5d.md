---
title: "SilIF: Silhouette-Augmented Isolation Forest for Unsupervised Transaction Fraud Detection"
originalUrl: "https://arxiv.org/abs/2605.26135"
date: "2026-05-27T23:04:43.487Z"
---

# SilIF: Silhouette-Augmented Isolation Forest for Unsupervised Transaction Fraud Detection
# SilIF：用于无监督交易欺诈检测的轮廓增强孤立森林

**Abstract:** Unsupervised anomaly detection is widely used in transaction fraud detection where labels are scarce. Isolation Forest (IF) is among the most popular classical methods due to its scalability and ease of deployment. 

**摘要：** 在标签稀缺的交易欺诈检测领域，无监督异常检测被广泛应用。孤立森林（Isolation Forest, IF）因其良好的可扩展性和易于部署的特性，成为最受欢迎的经典方法之一。

We propose SilIF, an augmentation of Isolation Forest that adds a silhouette-based scoring layer computed in a representation space induced by the trees of the forest. For each point, we extract a vector of per-tree path lengths, cluster these "fingerprints" into structural groups, and compute a silhouette score that measures how well the point fits its assigned group versus the nearest alternative. 

我们提出了 SilIF，这是一种对孤立森林的增强方案，它增加了一个基于轮廓系数（silhouette）的评分层，该层是在由森林树结构诱导出的表示空间中计算的。对于每个数据点，我们提取一个各树路径长度的向量，将这些“指纹”聚类为结构化组，并计算轮廓分数，以衡量该点与其所属组的契合度，并与最近的替代组进行比较。

The silhouette signal is combined with the base IF score via a single hyperparameter alpha. On the IEEE-CIS Fraud Detection benchmark (~590K transactions, 3.5% fraud), SilIF with alpha=1.0 improves over plain Isolation Forest by +0.0080 AUC-PR on average across five seeds, with SilIF winning on all five seeds (paired t-test p=0.046). 

轮廓信号通过一个单一的超参数 alpha 与基础 IF 分数相结合。在 IEEE-CIS 欺诈检测基准测试（约 59 万笔交易，3.5% 为欺诈）中，当 alpha=1.0 时，SilIF 在五个随机种子上的平均 AUC-PR 比普通孤立森林提高了 +0.0080，且在所有五个种子测试中均表现更优（配对 t 检验 p=0.046）。

We also report results on a synthetic credit-card dataset (Sparkov) where the silhouette augmentation does not improve over plain IF, and we characterize the conditions that distinguish the two outcomes. The paper presents SilIF as a tunable, easy-to-deploy enhancement to Isolation Forest with honest reporting of when it helps and when it does not. 

我们还报告了在合成信用卡数据集（Sparkov）上的结果，在该数据集上，轮廓增强并未比普通 IF 有所提升，并分析了导致这两种不同结果的条件。本文将 SilIF 作为一种可调、易于部署的孤立森林增强方案进行介绍，并诚实地报告了其适用与不适用的场景。
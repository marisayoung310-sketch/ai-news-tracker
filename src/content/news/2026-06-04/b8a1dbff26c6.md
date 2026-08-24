---
title: "Assessing Region-Level EEG Contributions to Cognitive Workload Prediction"
originalUrl: "https://arxiv.org/abs/2606.02598"
date: "2026-06-03T23:23:28.857Z"
---

# Assessing Region-Level EEG Contributions to Cognitive Workload Prediction
# 评估脑电图（EEG）区域级特征对认知负荷预测的贡献

**Abstract:** Accurate and generalizable estimation of cognitive workload from electroencephalography (EEG) is critical for human-centered and safety-critical systems. Although EEG is widely used for workload assessment, the consistency of region-level EEG contributions across tasks, datasets, and subjects remains unclear.

**摘要：** 从脑电图（EEG）中准确且通用地评估认知负荷，对于以人为本的系统和安全关键型系统至关重要。尽管脑电图已被广泛用于负荷评估，但脑电图区域级特征在不同任务、数据集和受试者之间的贡献一致性仍不明确。

This paper presents a region-level evaluation framework for EEG-based workload prediction in which models are trained and evaluated using features extracted exclusively from electrodes belonging to anatomically defined scalp regions. We perform a large-scale analysis across four publicly available EEG workload datasets spanning diverse task demands, recording hardware, and electrode montages.

本文提出了一个用于基于脑电图的负荷预测的区域级评估框架，在该框架中，模型仅使用从解剖学定义的头皮区域电极中提取的特征进行训练和评估。我们对四个公开的脑电图负荷数据集进行了大规模分析，这些数据集涵盖了不同的任务需求、记录硬件和电极布局。

Region importance is quantified using a model-agnostic, performance-based approach under both mixed-subject and subject-independent evaluation protocols, with results aggregated using a rank-based strategy to ensure robustness across experimental configurations.

区域重要性通过一种与模型无关的、基于性能的方法进行量化，该方法在混合受试者和受试者独立两种评估协议下进行，并使用基于排名的策略汇总结果，以确保在不同实验配置下的稳健性。

Across all datasets and subject-independent evaluations, frontal electrode groups outperform the full-scalp baseline by approximately 15-20% in relative rank position while using substantially fewer electrodes. Fronto-central regions exhibit the most stable predictive utility, whereas posterior and occipital regions contribute less consistently across experimental conditions.

在所有数据集和受试者独立评估中，额叶电极组在相对排名位置上比全头皮基准高出约 15-20%，同时使用的电极数量大幅减少。额中央区表现出最稳定的预测效用，而顶叶和枕叶区域在不同实验条件下的贡献则较不稳定。

These findings indicate that workload-relevant EEG information is most consistently retained within frontal and fronto-central electrode groups, supporting the design of efficient and generalizable EEG-based workload monitoring systems.

这些发现表明，与负荷相关的脑电图信息最稳定地保留在额叶和额中央电极组中，这为设计高效且通用的基于脑电图的负荷监测系统提供了支持。
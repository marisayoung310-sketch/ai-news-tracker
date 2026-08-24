---
title: "Independent-Component-Based Encoding Models of Brain Activity During Story Comprehension"
originalUrl: "https://arxiv.org/abs/2604.24942"
date: "2026-04-29T06:33:49.761Z"
---

# Independent-Component-Based Encoding Models of Brain Activity During Story Comprehension
# 基于独立成分分析的故事理解脑活动编码模型

**Abstract:** Encoding models provide a powerful framework for linking continuous stimulus features to neural activity; however, traditional voxelwise approaches are limited by measurement noise, inter-subject variability, and redundancy arising from spatially correlated voxels encoding overlapping neural signals.

**摘要：** 编码模型为将连续刺激特征与神经活动联系起来提供了一个强大的框架；然而，传统的体素级（voxelwise）方法受到测量噪声、受试者间差异以及由空间相关体素编码重叠神经信号所产生的冗余性的限制。

Here, we propose an independent component (IC)-based encoding framework that dissociates stimulus-driven and noise-driven signals in fMRI data. We decompose continuous fMRI data from naturalistic story listening into ICs using one subset of the data, and train encoding models on independent data to predict IC time series from large language model representations of linguistic input.

在此，我们提出了一种基于独立成分（IC）的编码框架，该框架能够将功能磁共振成像（fMRI）数据中的刺激驱动信号与噪声驱动信号分离开来。我们利用数据的一个子集将自然故事聆听过程中的连续 fMRI 数据分解为独立成分（IC），并在独立的数据集上训练编码模型，通过语言输入的各种大语言模型表征来预测 IC 时间序列。

Across subjects, a subset of ICs exhibited consistently high predictivity. These ICs were spatially and temporally consistent across subjects and included cognitive networks known to respond during story listening (auditory and language). Auditory component time series were strongly correlated with acoustic stimulus features, highlighting the interpretability of identified component time series.

在不同受试者中，一部分 IC 表现出了一致的高预测性。这些 IC 在空间和时间上在受试者间保持一致，并包含了已知在故事聆听过程中会产生反应的认知网络（听觉和语言网络）。听觉成分的时间序列与声学刺激特征高度相关，凸显了所识别成分时间序列的可解释性。

Components identified as noise or motion-related artifacts by ICA-AROMA showed uniformly poor predictive performance, confirming that highly predicted components reflect genuine stimulus-related neural signals rather than confounds. Overall, IC-based encoding models enable analyses at the level of functional networks, accommodating the variability in network locations across individuals and providing interpretable results that are easy to compare across subjects.

被 ICA-AROMA 识别为噪声或运动相关伪影的成分表现出了一致的较差预测性能，这证实了高预测性的成分反映的是真实的刺激相关神经信号，而非混杂因素。总体而言，基于 IC 的编码模型实现了功能网络层面的分析，能够适应不同个体间网络位置的差异，并提供易于在受试者间进行比较的可解释结果。
---
title: "Omni-Sleep: A Sleep Foundation Model via Hierarchical Contrastive Learning of CNS--ANS Dynamic"
originalUrl: "https://arxiv.org/abs/2607.07720"
date: "2026-07-10T22:36:41.629Z"
---

# Omni-Sleep: A Sleep Foundation Model via Hierarchical Contrastive Learning of CNS--ANS Dynamic

**Omni-Sleep：基于中枢神经系统与自主神经系统动态分层对比学习的睡眠基础模型**

***

Sleep physiology arises from the coordinated dynamics of the central nervous system (CNS) and autonomic nervous system (ANS), as reflected by multimodal polysomnography signals including EEG, EOG, EMG, ECG, and respiration.

睡眠生理学源于中枢神经系统（CNS）和自主神经系统（ANS）的协同动态，这反映在包括脑电图（EEG）、眼电图（EOG）、肌电图（EMG）、心电图（ECG）和呼吸信号在内的多模态多导睡眠图（PSG）信号中。

However, existing sleep foundation models often fuse heterogeneous biosignals in a topology-agnostic manner, overlooking their physiological organization.

然而，现有的睡眠基础模型通常以拓扑无关的方式融合异构生物信号，忽略了它们内在的生理组织结构。

We introduce Omni-Sleep, a sleep foundation model that uses the CNS/ANS partition as a physiological prior for topology-constrained representation learning.

我们引入了 Omni-Sleep，这是一个将 CNS/ANS 分区作为生理先验，用于拓扑约束表征学习的睡眠基础模型。

Omni-Sleep learns structured representations through three objectives: intra-system consistency, which captures shared subsystem-level factors within neural and cardio-respiratory signals; inter-system synchronization, which aligns subsystem trajectories to model brain--body dynamics; and latent-space masked temporal modeling, which captures long-horizon sleep dynamics.

Omni-Sleep 通过三个目标学习结构化表征：系统内一致性（intra-system consistency），用于捕捉神经和心肺信号中共享的子系统级因素；系统间同步（inter-system synchronization），用于对齐子系统轨迹以建模脑-体动态；以及潜在空间掩码时间建模（latent-space masked temporal modeling），用于捕捉长周期的睡眠动态。

Pre-trained on over 100,000 hours of multi-center multimodal PSG data, Omni-Sleep is evaluated on sleep staging and multi-disease classification.

Omni-Sleep 在超过 100,000 小时的多中心多模态 PSG 数据上进行了预训练，并在睡眠分期和多疾病分类任务上进行了评估。

Across datasets and modality-ablation settings, Omni-Sleep outperforms strong foundation-model baselines, showing improved label efficiency, cross-dataset generalization, and robustness to missing modalities.

在各种数据集和模态消融设置下，Omni-Sleep 的表现均优于强大的基础模型基准，展现出更高的标签效率、跨数据集泛化能力以及对缺失模态的鲁棒性。

These results highlight the value of physiological hierarchy for generalizable sleep representation learning. Code is available at this https URL.

这些结果凸显了生理层级结构对于实现可泛化睡眠表征学习的价值。代码可在该链接获取。
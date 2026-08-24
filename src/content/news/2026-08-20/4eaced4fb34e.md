---
title: "Data-DPO: Direct Preference Optimization for Target Model Data Selection in LLM Post-Training"
originalUrl: "https://arxiv.org/abs/2608.16926"
date: "2026-08-19T21:56:39.222Z"
---

# Data-DPO: Direct Preference Optimization for Target Model Data Selection in LLM Post-Training

**Data-DPO：用于大模型后训练中目标模型数据选择的直接偏好优化方法**

***

**Abstract:** Data selection in supervised fine-tuning aims to select a small set of effective samples from large-scale candidate data, reducing training cost while preserving model performance. However, existing methods usually treat data value as a relatively static property, and pay limited attention to the compatibility between data and the capability distribution of the target model.

**摘要：** 有监督微调（SFT）中的数据选择旨在从大规模候选数据中筛选出一小部分有效样本，从而在降低训练成本的同时保持模型性能。然而，现有方法通常将数据价值视为一种相对静态的属性，且较少关注数据与目标模型能力分布之间的兼容性。

***

To address this issue, we propose Data-DPO, a target model-oriented SFT data selection method. Data-DPO observes the local training feedback of the target model on different samples through one-step probing, transforms activation differences among samples into pairwise data preferences, and trains a lightweight reward model to learn target-model-aware data preferences.

为了解决这一问题，我们提出了 Data-DPO，这是一种面向目标模型的 SFT 数据选择方法。Data-DPO 通过单步探测（one-step probing）观察目标模型在不同样本上的局部训练反馈，将样本间的激活差异转化为成对的数据偏好，并训练一个轻量级奖励模型来学习目标模型感知的数据偏好。

***

In the final selection stage, Data-DPO further combines target model preference, external quality scores, and marginal diversity to construct a more stable and effective training subset. Experimental results on Vision-Flan and LLaVA-CoT show that Data-DPO consistently outperforms existing data selection baselines under multiple data budgets and stably surpasses full data training performance.

在最终选择阶段，Data-DPO 进一步结合了目标模型偏好、外部质量评分和边际多样性，以构建一个更稳定、更有效的训练子集。在 Vision-Flan 和 LLaVA-CoT 上的实验结果表明，Data-DPO 在多种数据预算下均持续优于现有的数据选择基线，并稳定地超越了全量数据训练的性能。
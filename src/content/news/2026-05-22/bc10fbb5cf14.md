---
title: "GraphDiffMed: Knowledge-Constrained Differential Attention with Pharmacological Graph Priors for Medication Recommendation"
originalUrl: "https://arxiv.org/abs/2605.20188"
date: "2026-05-21T23:09:51.221Z"
---

### GraphDiffMed: Knowledge-Constrained Differential Attention with Pharmacological Graph Priors for Medication Recommendation
### GraphDiffMed：用于药物推荐的知识约束型差分注意力与药理学图先验模型

**Abstract:** Recommending safe and effective medication combinations from electronic health records (EHRs) is a core clinical AI problem, yet it remains difficult because patient trajectories are long, noisy, and clinically heterogeneous.
**摘要：** 从电子健康记录（EHR）中推荐安全有效的药物组合是临床人工智能领域的核心问题，但由于患者病程轨迹长、噪声大且临床异质性强，该问题依然极具挑战性。

Existing methods typically excel at either temporal modeling across visits or pharmacological knowledge integration (e.g., drug-drug interactions, DDIs), but rarely achieve both while robustly suppressing noise.
现有方法通常要么擅长跨就诊的时间序列建模，要么擅长药理学知识整合（如药物-药物相互作用，DDI），但很少能在兼顾两者的同时稳健地抑制噪声。

We present GraphDiffMed, a knowledge-constrained medication recommendation framework built on dual-scale Differential Attention v2.
我们提出了 GraphDiffMed，这是一个基于双尺度差分注意力 v2（Differential Attention v2）构建的知识约束型药物推荐框架。

Differential attention is applied at both intra-visit and inter-visit levels to filter spurious signals within encounters and across longitudinal history, while pharmacological constraints are incorporated during learning.
差分注意力被应用于单次就诊内部和多次就诊之间，以过滤就诊期间及纵向病史中的虚假信号，同时在学习过程中融入了药理学约束。

Experiments on MIMIC-III and ablation studies show that this design consistently improves recommendation quality and ranking over strong baselines while achieving a more favorable safety performance balance.
在 MIMIC-III 数据集上的实验和消融研究表明，该设计在提升推荐质量和排序效果方面始终优于强基准模型，同时实现了更理想的安全性能平衡。

We further find that the strongest-performing configuration uses only demographic auxiliary features under our experimental setting.
我们进一步发现，在我们的实验设置下，性能最强的配置仅使用了人口统计学辅助特征。

Overall, GraphDiffMed demonstrates that combining noise-aware attention with pharmacological constraints yields more reliable and clinically meaningful medication recommendation.
总的来说，GraphDiffMed 表明，将噪声感知注意力与药理学约束相结合，可以产生更可靠且具有临床意义的药物推荐。

We open-source our code at this https URL.
我们已在以下链接开源了代码：[链接地址]。
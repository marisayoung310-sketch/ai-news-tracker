---
title: "MiGHT-EHR: A Multi-task Graph Transformer for Heterogeneous Temporal Electronic Health Records"
originalUrl: "https://arxiv.org/abs/2608.06430"
date: "2026-08-10T22:10:28.226Z"
---

### MiGHT-EHR: A Multi-task Graph Transformer for Heterogeneous Temporal Electronic Health Records
### MiGHT-EHR：用于异构时间电子健康记录的多任务图 Transformer

**Abstract:** Learning from Electronic Health Records (EHRs) has gained significant attention due to its potential to improve clinical prediction. However, effective learning remains challenging because EHRs encode heterogeneous, temporally ordered clinical interactions. In particular, EHRs contain: (i) heterogeneous clinical entities, including patients, visits, diagnoses, prescriptions, and procedures, together with their heterogeneous interactions, (ii) longitudinal patient trajectories across hospital visits and (iii) shared statistical dependencies across related clinical prediction tasks.

**摘要：** 从电子健康记录（EHR）中进行学习因其在改善临床预测方面的潜力而备受关注。然而，有效的学习仍然具有挑战性，因为 EHR 编码了异构的、按时间顺序排列的临床交互。具体而言，EHR 包含：(i) 异构的临床实体，包括患者、就诊记录、诊断、处方和手术，以及它们之间的异构交互；(ii) 跨越多次住院的纵向患者轨迹；以及 (iii) 相关临床预测任务之间共享的统计依赖性。

Existing EHR learning methods capture only a subset of these properties. To bridge this gap, we propose Multi-task Graph transformer for Heterogeneous Temporal EHRs (MiGHT-EHR), which jointly models all three within a unified representation learning method. MiGHT-EHR constructs a heterogeneous graph from EHRs in which nodes represent clinical entities and edges connect statistically associated entities identified via normalized point-wise mutual information.

现有的 EHR 学习方法仅能捕捉到这些属性中的一部分。为了弥补这一差距，我们提出了用于异构时间 EHR 的多任务图 Transformer (MiGHT-EHR)，它在统一的表示学习方法中联合建模了上述所有三个方面。MiGHT-EHR 从 EHR 构建了一个异构图，其中节点代表临床实体，边连接通过归一化点互信息（Normalized Point-wise Mutual Information）识别出的统计相关实体。

Across MIMIC-III and MIMIC-IV datasets, MiGHT-EHR outperforms state-of-the-art methods on average across four tasks: drug recommendation, prediction of length-of-stay, mortality, and readmission, with particularly strong improvements in mortality and readmission prediction. Furthermore, a post-hoc analysis of the learned representations reveals that patient neighborhoods are organized by clinical outcomes, salient medical concepts are recoverable as linear directions in the representation space, and task probabilities are well calibrated.

在 MIMIC-III 和 MIMIC-IV 数据集上，MiGHT-EHR 在药物推荐、住院时长预测、死亡率预测和再入院预测这四项任务的平均表现上均优于现有最先进的方法，特别是在死亡率和再入院预测方面有显著提升。此外，对学习到的表示进行的事后分析表明，患者邻域是按临床结果组织的，显著的医学概念可以在表示空间中作为线性方向被恢复，且任务概率得到了很好的校准。

Collectively, these findings demonstrate that MiGHT-EHR representations support diverse prediction tasks while preserving clinically interpretable structure.

总而言之，这些研究结果表明，MiGHT-EHR 的表示在支持多样化预测任务的同时，保留了临床可解释的结构。
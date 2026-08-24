---
title: "Forecasting Medium-Horizon Alzheimer's Disease Progression: Residual Gap-Aware Transformers for 24-Month CDR-SB Change from ADNI Clinical and Biomarker Histories"
originalUrl: "https://arxiv.org/abs/2605.16319"
date: "2026-05-19T22:55:13.508Z"
---

# Forecasting Medium-Horizon Alzheimer's Disease Progression: Residual Gap-Aware Transformers for 24-Month CDR-SB Change from ADNI Clinical and Biomarker Histories

**预测中长期阿尔茨海默病进展：基于残差间隙感知 Transformer 模型，利用 ADNI 临床与生物标志物历史预测 24 个月 CDR-SB 变化**

---

**Abstract:** Medium-horizon Alzheimer's disease progression prediction is difficult because future clinical scores can remain tied to baseline severity, while biomarker histories are irregular and incompletely observed. We develop an anchor-based analysis of 24-month Clinical Dementia Rating Sum of Boxes (CDR-SB) change using harmonized Alzheimer's Disease Neuroimaging Initiative (ADNI) tables. Each labeled sample is anchored at a mild cognitive impairment visit, uses only clinical and biomarker history observed at or before that anchor, and defines the response as CDR-SB at the future visit closest to 24 months within an 18--30 month window minus anchor CDR-SB.

**摘要：** 阿尔茨海默病的中长期进展预测具有挑战性，因为未来的临床评分往往与基线严重程度相关，且生物标志物的历史数据呈现不规则且观测不完整等特点。我们利用经过协调的阿尔茨海默病神经影像学倡议（ADNI）数据表，开发了一种基于锚点的 24 个月临床痴呆评定量表总分（CDR-SB）变化分析方法。每个标记样本均以轻度认知障碍（MCI）就诊记录作为锚点，仅使用该锚点及之前观测到的临床和生物标志物历史数据；响应变量定义为 18 至 30 个月窗口内最接近 24 个月的未来就诊时的 CDR-SB 分数减去锚点时的 CDR-SB 分数。

---

The analytic cohort contains 2,600 labeled anchors from 858 participants and 7,276 longitudinal rows. We propose a residual gap-aware transformer that combines a mixed-effects statistical reference with transformer-based residual learning from pre-anchor clinical and biomarker histories. The model uses participant-level random intercepts in the mixed-effects reference, observation-level triplet tokenization for irregular histories, and a learned nonnegative time-gap penalty inside self-attention.

分析队列包含来自 858 名参与者的 2,600 个标记锚点和 7,276 行纵向数据。我们提出了一种残差间隙感知 Transformer 模型，该模型将混合效应统计参考与基于 Transformer 的残差学习相结合，用于处理锚点前的临床和生物标志物历史数据。该模型在混合效应参考中使用了参与者层面的随机截距，针对不规则历史数据采用了观测层面的三元组标记化（triplet tokenization），并在自注意力机制中引入了学习型的非负时间间隙惩罚。

---

We compare the proposed model with a Bayesian-information-criterion-selected linear mixed-effects baseline, GRU-D, and STraTS under repeated participant-level train--test splits. Across five participant-level random seeds, the proposed model achieves the best mean test performance across all reported metrics, reducing MSE by 13.1% and increasing prediction--observation correlation by 26.4% relative to the mixed-effects baseline. It also improves over both GRU-D and STraTS in mean error and correlation. These results show that statistical anchoring and gap-aware residual learning provide a useful structure for medium-horizon Alzheimer's disease progression prediction.

我们在重复的参与者层面训练-测试划分下，将所提模型与贝叶斯信息准则（BIC）选择的线性混合效应基准模型、GRU-D 以及 STraTS 进行了比较。在五个参与者层面的随机种子测试中，该模型在所有报告指标上均达到了最佳平均测试性能，相较于混合效应基准模型，均方误差（MSE）降低了 13.1%，预测与观测的相关性提高了 26.4%。此外，该模型在平均误差和相关性方面也优于 GRU-D 和 STraTS。这些结果表明，统计锚定和间隙感知残差学习为中长期阿尔茨海默病进展预测提供了一种有效的架构。
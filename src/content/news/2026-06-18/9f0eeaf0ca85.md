---
title: "Quantifying Consistency in LLM Logical Reasoning via Structural Uncertainty"
originalUrl: "https://arxiv.org/abs/2606.17312"
date: "2026-06-17T23:00:03.110Z"
---

# Quantifying Consistency in LLM Logical Reasoning via Structural Uncertainty
# 通过结构不确定性量化大语言模型逻辑推理的一致性

**Abstract:** Large language models can arrive at the same answer through reasoning paths that are unstable, contradictory, or difficult to rank consistently -- a failure mode especially prevalent in multi-step deductive reasoning.
**摘要：** 大语言模型可以通过不稳定、自相矛盾或难以进行一致性排序的推理路径得出相同的答案——这种失效模式在多步演绎推理中尤为普遍。

Existing methods assess reliability primarily through output dispersion -- measuring how much sampled answers differ -- but this discards a complementary signal: whether the model can consistently rank competing reasoning candidates.
现有的评估方法主要通过输出离散度（即测量采样答案之间的差异程度）来评估可靠性，但这忽略了一个互补的信号：模型是否能够一致地对相互竞争的推理候选方案进行排序。

We propose structural uncertainty, a consistency-aware framework derived from the stability of self-preference-induced rankings over sampled reasoning solutions.
我们提出了“结构不确定性”（structural uncertainty），这是一个基于自偏好诱导排序在采样推理方案上的稳定性而得出的、具有一致性感知能力的框架。

Given a query, we generate multiple candidate solutions and ask the model to judge pairwise preferences among its own outputs.
给定一个查询，我们生成多个候选解决方案，并要求模型对其自身的输出进行两两偏好判断。

We aggregate self-preferences into ranking distributions via Bradley-Terry modeling with PageRank, and decompose the signal into two entropy-based components: across-trial ranking instability and within-trial candidate ambiguity.
我们通过结合 PageRank 的 Bradley-Terry 模型将自偏好聚合为排序分布，并将该信号分解为两个基于熵的组件：跨试验排序不稳定性（across-trial ranking instability）和试验内候选方案模糊性（within-trial candidate ambiguity）。

Across five LLMs and eight benchmarks, structural signals provide information complementary to answer dispersion: on logical and mathematical reasoning tasks, the combination improves identification of unreliable instances, while on factual retrieval the structural signal collapses toward uniformity, diagnosing a regime boundary where reasoning-level consistency evaluation is uninformative.
在五个大语言模型和八个基准测试中，结构信号提供了与答案离散度互补的信息：在逻辑和数学推理任务中，两者的结合提高了对不可靠实例的识别能力；而在事实检索任务中，结构信号趋于一致，这诊断出了一个推理级一致性评估失效的边界范围。

The two components relate differently to accuracy: within-trial ambiguity correlates positively with correctness -- consistent with settings where multiple plausible solution paths remain competitive -- while across-trial instability correlates negatively, signaling unreliable reasoning.
这两个组件与准确率的关系各不相同：试验内模糊性与正确性呈正相关——这与多个合理的解决方案路径同时存在的情况相符；而跨试验不稳定性则与正确性呈负相关，预示着推理过程不可靠。

Structural uncertainty is best understood not as a universal confidence estimator, but as a regime-sensitive evaluator of logical reasoning consistency.
结构不确定性最好不要被理解为一种通用的置信度估计器，而应被视为一种对逻辑推理一致性的、具有范围敏感性的评估工具。
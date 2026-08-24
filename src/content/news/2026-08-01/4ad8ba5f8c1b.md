---
title: "Position: Evaluation Scores Are Perishable Knowledge Claims"
originalUrl: "https://arxiv.org/abs/2607.26191"
date: "2026-07-31T22:23:07.001Z"
---

# Position: Evaluation Scores Are Perishable Knowledge Claims
# 观点：评估分数是具有时效性的知识主张

**Abstract:** Evaluation methodologies for language models increasingly combine multiple signals, from automated metrics and LLM-as-judge ratings to human assessments and benchmark suite results. When these signals are aggregated via averaging, evaluation confidence can then substantially exceed the reliability of the weakest signal: a phenomenon we call trust inflation in evaluation.

**摘要：** 语言模型的评估方法正越来越多地结合多种信号，从自动化指标和“大模型作为裁判”（LLM-as-judge）的评分，到人工评估和基准测试套件结果。当这些信号通过平均值进行汇总时，评估的置信度往往会大大超过其中最弱信号的可靠性：我们将这种现象称为评估中的“信任膨胀”（trust inflation）。

We argue that evaluation scores should be treated as epistemic claims with three properties: formality (human evaluation provides stronger evidence than an automated metric), scope (a benchmark result applies to the tested distribution, not universally), and validity windows (benchmark results expire as contamination accumulates and distributions shift).

我们认为，评估分数应被视为具有三种属性的认知主张：形式性（人工评估比自动化指标提供更强的证据）、适用范围（基准测试结果仅适用于被测分布，而非普适的）以及有效期（随着数据污染的积累和分布的偏移，基准测试结果会失效）。

Several converging research traditions (chain-of-thought analysis, possibilistic logic, and algebraic theory) establish weakest-link aggregation as the conservative endpoint of a parameterized operator family controlled by a single pessimism parameter. Drawing on those traditions, and on concrete lessons from building an evaluation harness for agentic AI, we propose that evaluation results carry explicit metadata (formality tier, scope declaration, and expiration date) to make their epistemic status transparent.

多个趋同的研究传统（思维链分析、可能性逻辑和代数理论）确立了“最弱环节汇总”（weakest-link aggregation）作为由单一悲观参数控制的参数化算子族中的保守端点。借鉴这些传统，并结合构建智能体 AI（agentic AI）评估工具的实际经验，我们建议评估结果应携带明确的元数据（形式等级、适用范围声明和过期日期），以使其认知状态透明化。

We illustrate the cost of mean aggregation on the public HELM leaderboard: across 54 frontier models on ten scenarios, the top-five models ranked by mean score and by weakest-link are completely disjoint.

我们通过公共 HELM 排行榜展示了平均值汇总的代价：在十个场景下的 54 个前沿模型中，按平均分排名和按“最弱环节”排名得出的前五名模型完全不同。
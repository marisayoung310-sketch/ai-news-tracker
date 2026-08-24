---
title: "ClinLens: Towards Long-Horizon Coding Agents for Longitudinal Multimodal Clinical Data Science"
originalUrl: "https://arxiv.org/abs/2607.26155"
date: "2026-07-31T22:22:57.316Z"
---

# ClinLens: Towards Long-Horizon Coding Agents for Longitudinal Multimodal Clinical Data Science
# ClinLens：迈向用于纵向多模态临床数据科学的长程编码智能体

**Abstract:** Clinical data-science agents must transform heterogeneous longitudinal records into auditable analyses, yet existing benchmarks largely isolate medical question answering, structured-table reasoning, or generic scientific repositories. We introduce CLINLENS, a benchmark of 200 executable tasks over five linked MIMIC resources spanning structured electronic health records, notes, electrocardiograms, chest radiographs, and echocardiograms.

**摘要：** 临床数据科学智能体必须将异构的纵向记录转化为可审计的分析结果，然而现有的基准测试大多将医学问答、结构化表格推理或通用科学存储库孤立开来。我们引入了 CLINLENS，这是一个包含 200 个可执行任务的基准测试，涵盖了五个关联的 MIMIC 资源，包括结构化电子健康记录、临床笔记、心电图、胸部 X 光片和超声心动图。

A 4 x 5 taxonomy crosses four patient-time scopes with five analysis capabilities. Program-first reverse synthesis pairs each bounded semi-raw package with an evaluator-private reference workflow and checks required artifacts, cohort and temporal semantics, and the final answer.

该基准测试采用 4 x 5 的分类法，将四种患者时间范围与五种分析能力相结合。通过“程序优先”的逆向合成方法，将每个受限的半原始数据包与评估者私有的参考工作流配对，并检查所需的产出物、队列和时间语义以及最终答案。

On a fixed 126-task suite, the strongest of 24 standardized model-scaffold configurations achieves 56.3% scope-macro STRICTPASS despite 100% EXECSUCCESS. For reference, a separately configured coding agent solves 83 of 126 tasks, while five biomedical systems adapted to GPT-4o-mini reach at most 2.9% scope-macro STRICTPASS. These results expose a substantial gap between runnable submissions and correct clinical analyses.

在固定的 126 个任务集上，24 种标准化模型框架配置中最强的一种虽然达到了 100% 的执行成功率（EXECSUCCESS），但在范围宏观严格通过率（scope-macro STRICTPASS）上仅达到 56.3%。作为参考，一个单独配置的编码智能体解决了 126 个任务中的 83 个，而五个适配 GPT-4o-mini 的生物医学系统在范围宏观严格通过率上最高仅达到 2.9%。这些结果揭示了可运行的提交结果与正确的临床分析之间存在巨大差距。
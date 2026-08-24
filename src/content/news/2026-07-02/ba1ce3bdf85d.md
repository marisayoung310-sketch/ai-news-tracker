---
title: "Contrastive Reflection for Iterative Prompt Optimization"
originalUrl: "https://arxiv.org/abs/2606.30840"
date: "2026-07-01T22:46:59.602Z"
---

# Contrastive Reflection for Iterative Prompt Optimization
# 用于迭代提示优化的对比反思 (Contrastive Reflection)

LLM agents are becoming central to information retrieval: they issue retrieval queries, synthesize answers, and increasingly serve as judges for IR evaluation. Improving the prompts that control these agents is an optimization problem, but in applied IR settings it often looks less like blind search and more like debugging. Engineers need to know which behavior failed, which nearby behavior still worked, what distinguishes the two, and whether a prompt edit improves held-out quality without introducing regressions.

大语言模型 (LLM) 智能体正逐渐成为信息检索 (IR) 的核心：它们负责发出检索查询、综合答案，并越来越多地担任 IR 评估的裁判。改进控制这些智能体的提示词 (Prompts) 是一个优化问题，但在实际的 IR 应用场景中，这看起来更像是调试而非盲目搜索。工程师需要了解哪些行为失败了、哪些相近的行为仍然有效、两者有何区别，以及提示词的修改是否在不引入回归问题的前提下提升了留存数据的质量。

We present Contrastive Reflection, an iterative prompt-optimization framework for agentic IR workflows. The framework starts from a task-centric quality definition: QA agents expose retrieval or reasoning traces, and grading agents expose dimension-level scores and rationales. These structured traces are used to identify error-anchored behavioral slices, add nearby successful examples from the same region, and ask a Teacher LLM to propose a targeted prompt edit. Candidate edits are accepted only when validation performance improves, optionally subject to regression checks.

我们提出了“对比反思”(Contrastive Reflection)，这是一个针对智能体 IR 工作流的迭代提示优化框架。该框架从以任务为中心的质量定义出发：问答 (QA) 智能体展示检索或推理轨迹，而评分智能体则提供维度级别的分数和理由。这些结构化轨迹被用于识别以错误为锚点的行为切片，添加来自同一区域的相近成功案例，并要求教师 LLM 提出有针对性的提示词修改建议。候选修改方案仅在验证性能提升时才会被采纳，并可选择性地进行回归检查。

We instantiate the framework with a tree-based slice selector, but the contribution is the contrastive reflection loop rather than the tree itself. On a public HotpotQA retrieval-augmented QA setup, one tree-selected contrastive repair improves held-out exact-match accuracy from 51.4% to 60.4%. Failure-only and random-evidence variants improve less and break more previously correct examples. A light instruction-only comparison places the method near modern prompt optimizers: MIPROv2 reaches 59.4% and GEPA 57.0%. The result is an interpretable optimization loop for IR agents, aimed at making prompt repair more inspectable and validation-driven.

我们通过基于树的切片选择器实例化了该框架，但其核心贡献在于“对比反思”循环，而非树结构本身。在公开的 HotpotQA 检索增强问答设置中，一次由树选择的对比修复将留存数据的精确匹配准确率从 51.4% 提升至 60.4%。仅针对失败案例或随机证据的变体改进效果较差，且更容易破坏先前正确的示例。与轻量级指令对比显示，该方法处于现代提示优化器的一流水平：MIPROv2 达到 59.4%，GEPA 达到 57.0%。该研究成果为 IR 智能体提供了一个可解释的优化循环，旨在使提示词修复过程更具可审查性和验证驱动性。
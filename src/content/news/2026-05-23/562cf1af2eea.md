---
title: "Harnesses for Inference-Time Alignment over Execution Trajectories"
originalUrl: "https://arxiv.org/abs/2605.21516"
date: "2026-05-22T22:34:50.323Z"
---

# Harnesses for Inference-Time Alignment over Execution Trajectories
# 执行轨迹推理时对齐的“线束”（Harnesses）研究

**Abstract:** Harness engineering has emerged as an important inference-time technique for large language model (LLM) agents, aiming to improve long-term performance through task decomposition and guided execution. 

**摘要：** “线束工程”（Harness engineering）已成为大语言模型（LLM）智能体在推理阶段的一项重要技术，旨在通过任务分解和引导式执行来提升模型的长期表现。

However, more elaborate harnesses are not uniformly better: increasing decomposition or guidance can sometimes improve execution, but can also reduce final task success. 

然而，更复杂的线束设计并不总是更好：增加分解程度或引导力度有时能改善执行效果，但也可能降低最终任务的成功率。

We study harness design through the lens of inference-time trajectory alignment. This perspective separates harness into two mechanisms: task decomposition, which structures a task into sub-goals, and guided execution, which reshapes local action distributions during execution. 

我们通过“推理时轨迹对齐”的视角来研究线束设计。这一视角将线束拆解为两种机制：一是任务分解，即将任务结构化为子目标；二是引导式执行，即在执行过程中重塑局部动作分布。

This decomposition allows us to quantify how workflow granularity, retry budgets, and guidance-induced action reweighting shape the performance limits of harness design. It further reveals concrete failure modes, including over-decomposition, over-pruning, and hallucinated execution. 

这种拆解使我们能够量化工作流粒度、重试预算以及由引导引起的动作重加权如何塑造线束设计的性能极限。此外，它还揭示了具体的失效模式，包括过度分解、过度剪枝以及幻觉执行。

We validate these predictions through controlled synthetic experiments and real terminal agent benchmarks. Inspired by the theory, we further show that effective harnesses can be partial: specifying only the initial steps and leaving the remaining execution to agent can achieve higher pass rate than fully structured workflows.

我们通过受控的合成实验和真实的终端智能体基准测试验证了这些预测。受该理论启发，我们进一步证明有效的线束可以是“部分性”的：仅指定初始步骤并将剩余执行过程留给智能体，往往比完全结构化的工作流能实现更高的通过率。
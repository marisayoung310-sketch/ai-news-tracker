---
title: "CreativityBench: Evaluating Agent Creative Reasoning via Affordance-Based Tool Repurposing"
originalUrl: "https://arxiv.org/abs/2605.02910"
date: "2026-05-07T23:11:45.878Z"
---

# CreativityBench: Evaluating Agent Creative Reasoning via Affordance-Based Tool Repurposing
# CreativityBench：通过基于可供性（Affordance）的工具重用评估智能体的创造性推理

Recent advances in large language models have led to strong performance on reasoning and environment-interaction tasks, yet their ability for creative problem-solving remains underexplored. We study this capability through the lens of creative tool use, where a model repurposes available objects by reasoning about their affordances and attributes rather than relying on canonical usage.
大型语言模型的最新进展使其在推理和环境交互任务中表现出色，但它们在创造性问题解决方面的能力仍未得到充分探索。我们通过“创造性工具使用”的视角研究了这一能力，即模型不再依赖物体的常规用法，而是通过推理其可供性（affordances）和属性来重新利用现有物体。

As a first step, we introduce CreativityBench, a benchmark for evaluating affordance-based creativity in LLMs. To this end, we build a large-scale affordance knowledge base (KB) with 4K entities and 150K+ affordance annotations, explicitly linking objects, parts, attributes, and actionable uses. Building on this KB, we generate 14K grounded tasks that require identifying non-obvious yet physically plausible solutions under constraints.
作为第一步，我们推出了 CreativityBench，这是一个用于评估大语言模型（LLM）中基于可供性的创造力的基准测试。为此，我们构建了一个包含 4000 个实体和超过 15 万条可供性注释的大规模可供性知识库（KB），明确关联了物体、部件、属性和可操作的用途。基于此知识库，我们生成了 1.4 万个基础任务，要求模型在约束条件下识别出非显而易见但物理上可行的解决方案。

Evaluations across 10 state-of-the-art LLMs, including closed and open-source models, show that models can often select a plausible object, but fail to identify the correct parts, their affordances, and the underlying physical mechanism needed to solve the task, leading to a significant drop in performance.
对 10 个最先进的大语言模型（包括闭源和开源模型）的评估显示，模型通常能够选择一个看似合理的物体，但往往无法识别出解决任务所需的正确部件、其可供性以及底层的物理机制，这导致了性能的显著下降。

Furthermore, improvements from model scaling quickly saturate, strong general reasoning does not reliably translate to creative affordance discovery, and common inference-time strategies such as Chain-of-Thought yield limited gains. These results suggest that creative tool use remains a major challenge for current models, and that CreativityBench provides a useful testbed for studying this missing dimension of intelligence, with potential implications for planning and reasoning modules in future agents.
此外，模型规模扩展带来的性能提升很快就会饱和，强大的通用推理能力并不能可靠地转化为创造性的可供性发现，而诸如“思维链”（Chain-of-Thought）等常见的推理时策略所带来的收益也十分有限。这些结果表明，创造性工具使用对当前模型而言仍是一项重大挑战；CreativityBench 为研究这一缺失的智能维度提供了一个有用的测试平台，并对未来智能体的规划和推理模块具有潜在的启示意义。
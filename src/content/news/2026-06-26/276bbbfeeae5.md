---
title: "Project Auto-World: Towards Automated Benchmarking of Neural Relational Reasoners"
originalUrl: "https://arxiv.org/abs/2606.24965"
date: "2026-06-25T22:57:45.310Z"
---

# Project Auto-World: Towards Automated Benchmarking of Neural Relational Reasoners
# 项目 Auto-World：迈向神经关系推理机的自动化基准测试

**Abstract:** Reasoning about relational structures remains a significant challenge for neural models, particularly when they must systematically apply learned knowledge to problem instances that are harder than those seen in training. Progress is hampered by the difficulty of evaluating such generalization, since a priori, it is rarely clear what makes an instance hard.

**摘要：** 对关系结构进行推理对于神经模型而言仍然是一项重大挑战，特别是在模型必须将所学知识系统性地应用于比训练集更难的问题实例时。由于难以评估这种泛化能力，研究进展受到阻碍，因为在先验条件下，很难明确是什么因素导致了一个实例变得困难。

We study how this issue can be addressed by using large language models (LLMs) to automate benchmark generation, learning to produce increasingly challenging instances in an end-to-end manner. Concretely, given a world parametrized by Datalog rules, and an Edge Transformer as the reasoning evaluator, we use LLM-driven evolutionary search (based on FunSearch) and autonomous agentic search to discover sampling functions that yield hard problem instances.

我们研究了如何通过利用大语言模型（LLM）实现基准测试生成的自动化来解决这一问题，即通过端到端的方式学习生成难度不断增加的实例。具体而言，给定一个由 Datalog 规则参数化的世界，并以 Edge Transformer 作为推理评估器，我们利用基于 LLM 的进化搜索（基于 FunSearch）和自主代理搜索来发现能够产生困难问题实例的采样函数。

We also show that the Edge Transformer can be improved using this data such that it generalizes well to further data perturbations. Finally, we show that the same machinery can be applied to novel worlds proposed by LLMs, opening the door to autonomous research on neural relational reasoning.

我们还展示了 Edge Transformer 可以利用这些数据进行改进，从而使其能够良好地泛化到进一步的数据扰动中。最后，我们证明了同样的机制可以应用于由 LLM 提出的新世界，这为神经关系推理的自主研究打开了大门。
---
title: "LCO: LLM-based Constraint Optimization for Safer Agentic LLMs in Real-world Tasks"
originalUrl: "https://arxiv.org/abs/2605.27375"
date: "2026-05-28T22:59:11.232Z"
---

# LCO: LLM-based Constraint Optimization for Safer Agentic LLMs in Real-world Tasks
# LCO：面向现实任务中智能体大模型安全性的基于大模型的约束优化

**Abstract:** Large Language Models (LLMs) are increasingly acting as autonomous agents, but their continuous interaction with the environment can lead to in-context reward hacking (ICRH), a phenomenon where LLMs iteratively optimize their behavior to maximize proxy objectives, inadvertently producing harmful side effects. Existing defense methods are insufficient to address this risk, as ICRH arises not from adversarial inputs but from the model's own over-optimization.

**摘要：** 大语言模型（LLMs）正越来越多地充当自主智能体，但它们与环境的持续交互可能导致“上下文内奖励劫持”（ICRH）。这是一种大模型通过迭代优化自身行为以最大化代理目标，从而无意中产生有害副作用的现象。现有的防御方法不足以应对这一风险，因为 ICRH 并非源于对抗性输入，而是源于模型自身的过度优化。

To mitigate this issue, we propose \textbf{LLM-based Constraint Optimization (LCO)}, a framework that effectively reduces ICRH without model fine-tuning. LCO consists of two modules: \textit{self-thought module}, which guides the LLM to proactively deliberate and integrate potential safety constraints before execution; and \textit{evolutionary sampling module}, which employs LLM-based crossover and mutation to constrain the model's actions within a safe solution space while maintaining task performance.

为了缓解这一问题，我们提出了“基于大模型的约束优化”（LCO），这是一个无需模型微调即可有效减少 ICRH 的框架。LCO 由两个模块组成：一是“自省模块”（self-thought module），引导大模型在执行前主动审议并整合潜在的安全约束；二是“进化采样模块”（evolutionary sampling module），利用基于大模型的交叉和变异操作，将模型的行为限制在安全解空间内，同时保持任务性能。

Experimental results demonstrate that LCO substantially alleviates ICRH in both output-refine and policy-refine scenarios. In particular, on the tweet engagement optimization task, LCO achieves a 39% reduction in the Toxicity Growth Rate (TGR) on GPT-4, while on the policy optimization benchmark, it reduces the ICRH Occurrence Rate by 15.23%, demonstrating safety improvement without sacrificing task performance.

实验结果表明，LCO 在输出优化（output-refine）和策略优化（policy-refine）场景中均能显著缓解 ICRH。特别是在推文互动优化任务中，LCO 使 GPT-4 的毒性增长率（TGR）降低了 39%；而在策略优化基准测试中，它将 ICRH 的发生率降低了 15.23%，证明了在不牺牲任务性能的前提下实现了安全性提升。
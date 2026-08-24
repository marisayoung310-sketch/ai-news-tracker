---
title: "How LLMs Fail and Generalize in RTL Coding for Hardware Design?"
originalUrl: "https://arxiv.org/abs/2606.19347"
date: "2026-06-19T22:19:57.328Z"
---

# How LLMs Fail and Generalize in RTL Coding for Hardware Design?
# 大语言模型在硬件设计 RTL 编码中如何失效与泛化？

**Abstract:** Translating sequential programming priors into the parallel temporal logic of hardware design remains a crucial bottleneck for large language models (LLM). To investigate this, we introduce a new error taxonomy grounded in problem solvability, inspired by cognitive theory. Our taxonomy categorizes failures into syntactic, semantic, solvable functional, and unsolvable functional types.
**摘要：** 将顺序编程的先验知识转化为硬件设计中并行的时序逻辑，对于大语言模型（LLM）而言仍然是一个关键瓶颈。为了研究这一问题，我们受认知理论启发，引入了一种基于问题可解性的新错误分类法。该分类法将故障分为语法错误、语义错误、可解的功能性错误以及不可解的功能性错误四种类型。

Evaluations reveal a strict empirical ceiling on the VerilogEval benchmark, as frontier models plateau at a 90.8% initial pass rate. These plateaus are defined by unsolvable functional errors, exposing persistent knowledge gaps immune to test time compute scaling.
评估显示，在 VerilogEval 基准测试中存在严格的经验上限，前沿模型的初始通过率停滞在 90.8%。这些瓶颈是由不可解的功能性错误所导致的，揭示了即便通过测试时计算扩展（test time compute scaling）也无法弥补的持续性知识缺口。

Furthermore, we expose a striking surface convergence gap: optimization readily eliminates syntax errors but concurrently exacerbates deeper functional failures. Our findings demonstrate that alignment techniques merely teach models to compile. While repeated sampling strategies can patch solvable errors, register-transfer level (RTL) coding capacity remains strictly bounded by pretraining knowledge.
此外，我们揭示了一个显著的表面收敛差距：优化过程虽然能轻易消除语法错误，但同时会加剧更深层次的功能性故障。我们的研究结果表明，对齐技术仅仅是教会了模型如何通过编译。尽管重复采样策略可以修补可解的错误，但寄存器传输级（RTL）的编码能力仍然严格受限于预训练知识。

Addressing challenges in the current LLM based hardware generation pipeline requires more studies in model reasoning rather than alignment interventions.
解决当前基于 LLM 的硬件生成流程中的挑战，需要更多地研究模型推理能力，而非仅仅依赖对齐干预。
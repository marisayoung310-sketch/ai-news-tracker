---
title: "Remember, Don't Re-read: Stateful ReAct Agents for Token-Efficient Autonomous Experimentation"
originalUrl: "https://arxiv.org/abs/2606.14945"
date: "2026-06-16T23:09:31.096Z"
---

# Remember, Don't Re-read: Stateful ReAct Agents for Token-Efficient Autonomous Experimentation
# 记住，别重读：用于高效 Token 自主实验的有状态 ReAct 智能体

**Abstract:** The autoresearch pattern enables autonomous experimentation by having a large language model (LLM) iteratively modify code to optimize a target metric. Its stateless design, however, reconstructs experimental context from scratch at every iteration, incurring $O(n)$ token cost per iteration and $O(n^{2})$ total. 

**摘要：** “自动研究”（autoresearch）模式通过让大语言模型（LLM）迭代修改代码以优化目标指标，从而实现自主实验。然而，其无状态设计在每次迭代时都需要从头重构实验上下文，导致单次迭代产生 $O(n)$ 的 Token 成本，总成本高达 $O(n^{2})$。

This work reformulates the pattern as a stateful ReAct agent using LangGraph, where typed persistent state carries experimental history across iterations via a tool-calling interface. Two benchmarks are evaluated: hyperparameter tuning (15 iterations, small per-iteration observations) and code performance optimization (40 iterations, large per-iteration observations containing full source code and benchmark results). 

本研究利用 LangGraph 将该模式重构为有状态的 ReAct 智能体，通过工具调用接口，利用类型化的持久状态在迭代过程中传递实验历史。研究评估了两个基准测试：超参数调优（15 次迭代，单次迭代观测数据较小）和代码性能优化（40 次迭代，单次迭代观测数据较大，包含完整源代码和基准测试结果）。

On hyperparameter tuning, the stateful agent consumes 90\% fewer tokens (2{,}492 vs.\ 24{,}465). On code optimization, the stateful agent consumes 52\% fewer tokens (627K vs.\ 1{,}275K) while achieving comparable optimization quality on both tasks. 

在超参数调优任务中，有状态智能体减少了 90% 的 Token 消耗（2,492 vs. 24,465）。在代码优化任务中，有状态智能体减少了 52% 的 Token 消耗（627K vs. 1,275K），同时在两项任务中均达到了相当的优化质量。

The token reduction is structural: the stateless agent re-reads the full history at $O(n)$ cost per iteration, while the stateful agent operates within a fixed-size conversation window at $O(1)$ cost. This paper describes the architecture in sufficient detail for practitioners to implement a stateful autoresearch agent for their own workflows.

这种 Token 的减少源于结构上的优化：无状态智能体在每次迭代时需以 $O(n)$ 的成本重读全部历史记录，而有状态智能体则在固定大小的对话窗口内运行，成本仅为 $O(1)$。本文详细描述了该架构，足以让从业者在自己的工作流中实现有状态的自动研究智能体。
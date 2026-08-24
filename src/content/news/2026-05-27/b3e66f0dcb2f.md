---
title: "Toward Reliable Design of LLM-Enabled Agentic Workflows: Optimizing Latency-Reliability-Cost Tradeoffs"
originalUrl: "https://arxiv.org/abs/2605.23929"
date: "2026-05-27T00:23:57.789Z"
---

# Toward Reliable Design of LLM-Enabled Agentic Workflows: Optimizing Latency-Reliability-Cost Tradeoffs
# 面向大模型智能体工作流的可靠性设计：优化延迟、可靠性与成本的权衡

**Abstract:** Modern AI systems increasingly rely on workflows composed of multiple interacting agents, some powered by large language models (LLMs) and others by conventional computational modules. 
**摘要：** 现代人工智能系统日益依赖由多个交互智能体组成的工作流，其中一些由大语言模型（LLM）驱动，另一些则由传统的计算模块驱动。

This paper analyzes the fundamental tradeoffs between latency, reliability, and cost in LLM-enabled agentic workflows. 
本文分析了在大模型驱动的智能体工作流中，延迟、可靠性和成本之间的基本权衡关系。

We introduce performance models for both LLM and non-LLM agents that capture the relationship between computational effort and output quality, incorporating the impact of reasoning and output tokens for LLM agents using a parametric exponential reliability function. 
我们为大模型智能体和非大模型智能体引入了性能模型，用以捕捉计算投入与输出质量之间的关系；并利用参数化指数可靠性函数，纳入了推理和输出 Token 对大模型智能体的影响。

Then, we study the design of sequential workflows under latency and cost constraints. 
随后，我们研究了在延迟和成本约束下的顺序工作流设计问题。

Main results include a water-filling token allocation policy and characterizations of optimal workflow reliability in terms of shadow prices.
主要研究成果包括一种“注水法”（water-filling）Token 分配策略，以及基于影子价格对最优工作流可靠性的刻画。

***

**Subjects:** Artificial Intelligence (cs.AI); Software Engineering (cs.SE)
**学科分类：** 人工智能 (cs.AI)；软件工程 (cs.SE)

**Cite as:** arXiv:2605.23929 [cs.AI]
**引用格式：** arXiv:2605.23929 [cs.AI]
---
title: "From Memory to Skills: Evidence-Grounded Co-Evolution Governance for Long-Horizon LLM Agents"
originalUrl: "https://arxiv.org/abs/2607.16621"
date: "2026-07-21T22:19:18.149Z"
---

# From Memory to Skills: Evidence-Grounded Co-Evolution Governance for Long-Horizon LLM Agents
# 从记忆到技能：长程大模型智能体的证据驱动协同演化治理

**Abstract:** Existing memory systems for long-horizon LLM agents often retrieve prior traces as passive context rather than converting them into executable capabilities. In this paper, we propose MSCE, a training-free Memory--Skill Co-Evolution framework that organizes agent experience into grounded step traces, reusable procedural policies, and declarative environmental cognition.

**摘要：** 现有的长程大模型（LLM）智能体记忆系统通常仅将先前的轨迹作为被动上下文进行检索，而非将其转化为可执行的能力。在本文中，我们提出了 MSCE，这是一个无需训练的“记忆-技能协同演化”框架。该框架将智能体的经验组织为基于证据的步骤轨迹、可重用的程序化策略以及声明式的环境认知。

MSCE crystallizes evidence-backed L2 policies with positive estimated gain into callable skills that retain evidence links, applicability boundaries, decision guidance, verification rules, and reliability estimates. It further introduces reflection-weighted value backfilling, which propagates sparse terminal feedback through dense local self-reflections to produce evidence-calibrated trace values for governing memory and skill evolution.

MSCE 将具有正向预估收益且有证据支持的 L2 策略提炼为可调用的技能，这些技能保留了证据链接、适用边界、决策指南、验证规则以及可靠性评估。此外，该框架引入了“反射加权价值回填”机制，通过密集的局部自我反射来传播稀疏的终端反馈，从而生成经过证据校准的轨迹价值，用于管理记忆和技能的演化。

Experiments on EvoAgentBench and LoCoMo demonstrate that MSCE significantly outperforms state-of-the-art skill-augmented and memory-driven agent baselines, exhibiting strong cross-domain transferability and lifelong-evolution capabilities.

在 EvoAgentBench 和 LoCoMo 上的实验表明，MSCE 的表现显著优于当前最先进的技能增强型和记忆驱动型智能体基准模型，展现出强大的跨领域迁移能力和终身演化能力。
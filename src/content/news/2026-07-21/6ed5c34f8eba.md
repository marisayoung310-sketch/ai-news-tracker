---
title: "SkillCorpus: Consolidating and Evaluating the Open Skill Ecosystem for Real-World LLM Agents"
originalUrl: "https://arxiv.org/abs/2607.15557"
date: "2026-07-20T22:21:39.119Z"
---

# SkillCorpus: Consolidating and Evaluating the Open Skill Ecosystem for Real-World LLM Agents
# SkillCorpus：整合与评估用于现实世界 LLM 智能体的开放技能生态系统

Agent skills, files that package reusable procedural knowledge for an LLM agent, are a popular mechanism for extending agent capabilities. Public repositories now host them in large and growing numbers, yet these artifacts are fragmented, redundant, and uneven in quality, and their value in practice is unclear. A core question remains open, namely how to consolidate this open-source ecosystem into a single usable corpus, and what bounds its benefit on real-world agent tasks.

智能体技能（Agent skills）是指为 LLM 智能体封装可重用程序化知识的文件，是扩展智能体能力的一种流行机制。目前，公共存储库中托管的技能数量庞大且在不断增长，但这些资源碎片化严重、冗余度高且质量参差不齐，其实际应用价值尚不明确。一个核心问题仍然悬而未决：如何将这个开源生态系统整合为一个单一的可用语料库，以及它在现实世界智能体任务中的收益边界在哪里？

We present SkillCorpus, a framework that aggregates, curates, matches, and evaluates the open skill ecosystem at scale. It filters ~821,000 crawled skills through a multi-stage pipeline into 96,401 skills organised by a 16-class taxonomy and three quality facets (utility, robustness, safety), and pairs them with a fine-tuned retrieval-and-selection stack that matches task-relevant skills.

我们提出了 SkillCorpus，这是一个能够大规模聚合、筛选、匹配和评估开放技能生态系统的框架。它通过一个多阶段流水线，从抓取的约 821,000 个技能中筛选出 96,401 个技能，并按照 16 类分类法和三个质量维度（实用性、鲁棒性、安全性）进行组织，同时配备了经过微调的检索与选择栈，以匹配与任务相关的技能。

We evaluate end-to-end across three benchmarks (SkillsBench, GDPVal, QwenClawBench), two harnesses, and two open backbones with a frontier robustness check. Integrating SkillCorpus yields consistent gains across all three benchmarks, largest on SkillsBench (+7.5 pp). An operational analysis traces the gains to a coverage boundary and a harness boundary.

我们在三个基准测试（SkillsBench、GDPVal、QwenClawBench）、两个评估工具以及两个开源骨干模型上进行了端到端评估，并进行了前沿的鲁棒性检查。集成 SkillCorpus 在所有三个基准测试中均取得了持续的性能提升，其中在 SkillsBench 上的提升最为显著（+7.5 个百分点）。操作分析将这些收益归因于覆盖范围边界和评估工具边界。

SkillCorpus is, to our knowledge, the first end-to-end account of when a curated, retrieval-served community corpus improves real agent tasks, and where it does not. The dataset, models, and code will be released upon acceptance.

据我们所知，SkillCorpus 是首个关于经过筛选、由检索驱动的社区语料库在何时能改善真实智能体任务、以及在何种情况下无效的端到端研究。数据集、模型和代码将在论文被录用后发布。
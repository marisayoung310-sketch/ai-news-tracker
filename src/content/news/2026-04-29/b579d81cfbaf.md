---
title: "BenchGuard: Who Guards the Benchmarks? Automated Auditing of LLM Agent Benchmarks"
originalUrl: "https://arxiv.org/abs/2604.24955"
date: "2026-04-29T06:34:46.855Z"
---

# BenchGuard: Who Guards the Benchmarks? Automated Auditing of LLM Agent Benchmarks
# BenchGuard：谁来守护基准测试？大模型智能体基准测试的自动化审计

**Abstract:** As benchmarks grow in complexity, many apparent agent failures are not failures of the agent at all - they are failures of the benchmark itself: broken specifications, implicit assumptions, and rigid evaluation scripts that penalize valid alternative approaches.
**摘要：** 随着基准测试（Benchmarks）的复杂性不断增加，许多看似是智能体（Agent）的失败，实际上并非智能体本身的问题，而是基准测试本身存在缺陷：包括错误的规范说明、隐含的假设，以及惩罚有效替代方案的僵化评估脚本。

We propose employing frontier LLMs as systematic auditors of evaluation infrastructure, and realize this vision through BenchGuard, the first automated auditing framework for task-oriented, execution-based agent benchmarks.
我们提出利用前沿大模型（Frontier LLMs）作为评估基础设施的系统性审计员，并通过 BenchGuard 实现了这一愿景。这是首个针对面向任务、基于执行的智能体基准测试的自动化审计框架。

BenchGuard cross-verifies all benchmark artifacts via structured LLM protocols, optionally incorporating agent solutions or execution traces as additional diagnostic evidence.
BenchGuard 通过结构化的大模型协议对所有基准测试产物进行交叉验证，并可选择性地将智能体解决方案或执行轨迹作为额外的诊断证据纳入考量。

Deployed on two prominent scientific benchmarks, BenchGuard identified 12 author-confirmed issues in ScienceAgentBench - including fatal errors rendering tasks unsolvable - and exactly matched 83.3% of expert-identified issues on the BIXBench Verified-50 subset, catching defects that prior human review missed entirely.
在两个著名的科学基准测试中部署后，BenchGuard 在 ScienceAgentBench 中识别出了 12 个经作者确认的问题（包括导致任务无法完成的致命错误），并在 BIXBench Verified-50 子集上准确匹配了 83.3% 由专家识别出的问题，捕捉到了此前人工审查完全遗漏的缺陷。

A full audit of 50 complex bioinformatics tasks costs under USD 15, making automated benchmark auditing a practical and valuable complement to human review.
对 50 个复杂的生物信息学任务进行全面审计的成本不到 15 美元，这使得自动化基准测试审计成为人工审查的一种实用且有价值的补充。

These findings point toward AI-assisted benchmark development, where frontier models serve not only as subjects of evaluation but as active participants in validating the evaluation infrastructure itself.
这些发现指向了人工智能辅助的基准测试开发方向，即前沿模型不仅作为评估对象，还作为验证评估基础设施本身的积极参与者。
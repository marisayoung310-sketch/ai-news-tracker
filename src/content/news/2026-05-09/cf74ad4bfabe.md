---
title: "Partial Evidence Bench: Benchmarking Authorization-Limited Evidence in Agentic Systems"
originalUrl: "https://arxiv.org/abs/2605.05379"
date: "2026-05-08T22:31:51.364Z"
---

# Partial Evidence Bench: Benchmarking Authorization-Limited Evidence in Agentic Systems
# Partial Evidence Bench：代理系统中授权受限证据的基准测试

**Abstract:** Enterprise agents increasingly operate inside scoped retrieval systems, delegated workflows, and policy-constrained evidence environments. In these settings, access control can be enforced correctly while the system still produces an answer that appears complete even though material evidence lies outside the caller's authorization boundary.

**摘要：** 企业级智能体（Agent）正越来越多地在范围受限的检索系统、委派工作流以及受策略约束的证据环境中运行。在这些场景下，尽管访问控制可以被正确执行，但系统仍可能生成看似完整的答案，即便关键证据实际上位于调用者的授权边界之外。

This paper introduces Partial Evidence Bench, a deterministic benchmark for measuring that failure mode. The benchmark ships three scenario families -- due diligence, compliance audit, and security incident response -- with 72 tasks total, ACL-partitioned corpora, oracle complete answers, oracle authorized-view answers, oracle completeness judgments, and structured gap-report oracles.

本文介绍了 Partial Evidence Bench，这是一个用于衡量上述失效模式的确定性基准测试。该基准测试包含三个场景系列——尽职调查、合规审计和安全事件响应，共计 72 项任务。它提供了基于访问控制列表（ACL）划分的语料库、预言机（Oracle）完整答案、预言机授权视图答案、预言机完整性判断以及结构化的差距报告预言机。

It evaluates systems along four surfaces: answer correctness, completeness awareness, gap-report quality, and unsafe completeness behavior. Checked-in baselines show that silent filtering is catastrophically unsafe across all shipped families, while explicit fail-and-report behavior eliminates unsafe completeness without collapsing the task into trivial abstention.

该基准测试从四个维度评估系统：答案正确性、完整性感知、差距报告质量以及不安全的完整性行为。已有的基线测试表明，在所有场景系列中，“静默过滤”（silent filtering）具有灾难性的不安全性；而明确的“失败并报告”（fail-and-report）行为则能在消除不安全完整性的同时，避免将任务简化为无效的拒绝回答。

Preliminary real-model runs show model-dependent and scenario-sensitive differences in whether systems overclaim completeness, conservatively underclaim, or report incompleteness in an enterprise-usable form. The benchmark's broader contribution is to make a governance-critical agent failure measurable without human judges or contamination-prone static corpora.

初步的真实模型运行结果显示，系统是过度声称完整性、保守地低估完整性，还是以企业可用的形式报告不完整性，存在着模型依赖性和场景敏感性的差异。该基准测试更广泛的贡献在于，它使得这种对治理至关重要的智能体失效问题变得可量化，且无需人工评估或易受污染的静态语料库。
---
title: "Necessary but Not Sufficient: Temperature Control and Reproducibility in LLM-as-Judge Safety Evaluations"
originalUrl: "https://arxiv.org/abs/2606.26185"
date: "2026-06-26T22:48:22.737Z"
---

# Necessary but Not Sufficient: Temperature Control and Reproducibility in LLM-as-Judge Safety Evaluations
# 必要但非充分：LLM 作为评判者（LLM-as-Judge）在安全性评估中的温度控制与可复现性

**Abstract:** LLM-as-judge ("grader") components are now standard in evaluation harnesses, including safety evaluations where a pass/fail verdict may gate downstream deployment decisions. A widespread assumption is that setting the grader's sampling temperature to 0 makes grading deterministic. We test this assumption against a real safety-evaluation codebase (Japan AISI's open-source aisev) and show it fails on two levels.

**摘要：** “LLM 作为评判者”（LLM-as-judge，即“评分器”）组件现已成为评估框架中的标准配置，包括那些通过“通过/失败”判定来决定后续部署决策的安全性评估。目前普遍存在一种假设，即通过将评分器的采样温度（temperature）设置为 0，可以使评分过程具有确定性。我们针对一个真实的安全性评估代码库（日本 AISI 的开源项目 aisev）测试了这一假设，并证明它在两个层面上均告失败。

First, the harness invokes its grader without setting temperature or seed; the underlying provider silently applies its default of 1.0, so items near the decision boundary flip pass/fail across identical runs (per-item disagreement up to ~50% over 20 runs).

首先，该评估框架在调用评分器时并未设置温度或随机种子；底层服务提供商会静默应用其默认值 1.0，导致处于决策边界附近的条目在相同的运行环境下出现“通过/失败”结果的反复（在 20 次运行中，单项不一致率高达约 50%）。

Second, pinning temperature=0 reduces but does not eliminate flips: across 690 API calls spanning two providers, three model tiers, and five sampling configurations, 1-2 of 7 borderline items remain non-reproducible even under forced greedy decoding (top_k=1). Claude Opus 4.7/4.8 has since deprecated temperature entirely, rendering the primary mitigation inapplicable to newer model generations.

其次，将温度固定为 0 可以减少但无法消除这种波动：在跨越两个服务提供商、三个模型层级和五种采样配置的 690 次 API 调用中，即使在强制贪婪解码（top_k=1）的情况下，7 个边界条目中仍有 1-2 个无法实现复现。Claude Opus 4.7/4.8 此后已完全弃用了温度参数，使得这一主要的缓解措施在更新的模型版本中不再适用。

These findings expose a structural gap: evaluation harnesses that report single-run verdicts without variance or grader-disagreement metrics can present noise as a safety property. We release a reproduction harness (690 calls, 7 conditions) and recommend that harnesses treat grader disagreement as a first-class health metric alongside the scores themselves.

这些发现揭示了一个结构性缺陷：如果评估框架在报告单次运行结果时，缺乏方差或评分器不一致性指标，可能会将噪声误报为安全性属性。我们发布了一个复现框架（包含 690 次调用和 7 种条件），并建议评估框架应将“评分器不一致性”与评分本身一样，视为衡量系统健康状况的一级指标。
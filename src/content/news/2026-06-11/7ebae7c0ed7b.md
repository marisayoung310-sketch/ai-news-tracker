---
title: "Deployment-Time Memorization in Foundation-Model Agents"
originalUrl: "https://arxiv.org/abs/2606.10062"
date: "2026-06-10T23:04:50.950Z"
---

# Deployment-Time Memorization in Foundation-Model Agents
# 基础模型智能体中的部署时记忆机制

Foundation-model agents are increasingly long-lived systems that remember users across interactions, making memorization an explicit deployment-time function rather than solely a property of model weights.
基础模型智能体正日益成为长生命周期的系统，能够在多次交互中记住用户。这使得“记忆”成为一种明确的部署时功能，而不仅仅是模型权重本身的一种属性。

Existing work addresses parametric memorization or audits fixed memory configurations, but does not characterize how memory-design choices jointly shape personalization utility, extraction risk, and deletion fidelity.
现有的研究多关注参数化记忆或对固定的内存配置进行审计，但尚未深入探讨内存设计选择如何共同影响个性化效用、提取风险以及删除保真度。

We study this surface as deployment-time memorization, formulating agent memory as a privacy-utility frontier measured by Personalization Recall (PR) and Adversarial Extraction Rate (AER), and sweeping three memory-design knobs: summarization aggressiveness, retrieval breadth (k), and deletion mode.
我们将这一领域研究定义为“部署时记忆”，并将智能体内存构建为由个性化召回率（PR）和对抗性提取率（AER）衡量的隐私-效用边界。我们通过调整三个内存设计关键参数进行实验：摘要激进程度、检索广度（k）以及删除模式。

We further introduce the Forgetting Residue Score (FRS) to quantify whether deleted information remains recoverable from derived memory tiers.
我们进一步引入了遗忘残留分数（FRS），用于量化已删除的信息是否仍能从派生的内存层级中恢复。

On LongMemEval, key-fact summarization reduces canary extraction by 76% on Gemma 3 12B and 64% on GPT-4o-mini while preserving nearly all personalization recall; critically, once content is compressed away, increasing k no longer restores leakage.
在 LongMemEval 测试中，关键事实摘要技术在 Gemma 3 12B 模型上将“金丝雀”数据的提取率降低了 76%，在 GPT-4o-mini 上降低了 64%，同时几乎保留了所有的个性化召回率；关键在于，一旦内容被压缩移除，增加检索广度（k）也无法恢复泄露。

The same compression, however, induces a deletion-fidelity failure: raw-only deletion leaves derived summary copies recoverable in approximately 20% of instances, and only full-pipeline purge or tombstone redaction drives worst-tier residue to zero.
然而，同样的压缩技术也导致了删除保真度的问题：仅删除原始数据会导致约 20% 的情况下，派生的摘要副本仍可被恢复；只有通过全链路清除或墓碑式修订（tombstone redaction），才能将最差层级的残留降至零。

Together, these results establish that persistent agent memory must be evaluated as a first-class memorization mechanism -- assessed by what it helps agents recall, what it makes extractable, and what it can truly erase.
综上所述，这些结果确立了一个观点：持久化智能体内存必须被视为一种一等公民级别的记忆机制来评估——即通过它帮助智能体回忆的内容、它导致的可提取风险，以及它真正能够擦除的内容来进行综合衡量。
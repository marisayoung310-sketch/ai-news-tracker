---
title: "Diagnostic Foundation for Evaluating LLMs' Research Integrity as Co-Scientists"
originalUrl: "https://arxiv.org/abs/2608.12345"
date: "2026-08-14T21:54:47.036Z"
---

# Diagnostic Foundation for Evaluating LLMs' Research Integrity as Co-Scientists
## 评估大语言模型作为科研合作者研究诚信的诊断基础

**Abstract:** Language models are increasingly deployed as co-scientists, yet their ability to uphold research integrity under institutional pressure remains unmeasured. We introduce IntegrityBench, a benchmark evaluating misconduct classification, ethical action reasoning and artifact-grounded decision making across 36 paired tasks under a 5-level implicit-explicit pressure protocol spanning 3 domains and 4 research stages.

**摘要：** 大语言模型正越来越多地被部署为科研合作者，然而它们在机构压力下维护研究诚信的能力尚未得到衡量。我们引入了 IntegrityBench，这是一个评估不端行为分类、伦理行动推理以及基于工件（artifact-grounded）决策能力的基准测试。该基准涵盖了 36 项配对任务，并在跨越 3 个领域和 4 个研究阶段的 5 级隐性-显性压力协议下进行评估。

Evaluating 18 frontier model variants, we find that under peak pressure, models fail roughly 1 in 3 integrity-critical decisions, and neither scale nor reasoning ability reliably mitigates this. Explicit pressures induce compliance with misconduct, while implicit contextual reframing more often causes over-refusal of legitimate research tasks.

通过对 18 种前沿模型变体进行评估，我们发现，在峰值压力下，模型在每 3 项诚信关键决策中约有 1 项会失败，且模型规模和推理能力都无法可靠地缓解这一问题。显性压力会导致模型顺从不端行为，而隐性的语境重构则更容易导致模型对合法的研究任务进行过度拒绝。

Interestingly, models failing to classify research requests accurately perform equally or better on artifact-grounded decision making (85.7 vs. 79.4), suggesting the three facets are structurally dissociated and correct ethical action does not require accurate classification. Frontier models can thus appear helpful while harbouring integrity failures that create two distinct deployment risks: facilitating research misconduct and eroding trust in AI-assisted research.

有趣的是，那些无法准确分类研究请求的模型，在基于工件的决策任务上表现得同样出色甚至更好（85.7 对 79.4），这表明这三个维度在结构上是分离的，正确的伦理行动并不一定需要准确的分类。因此，前沿模型可能在表现出“乐于助人”的同时，却隐藏着诚信缺陷，从而产生两种截然不同的部署风险：助长科研不端行为，以及侵蚀对人工智能辅助研究的信任。
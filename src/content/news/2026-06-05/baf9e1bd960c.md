---
title: "A Systematic Analysis of Linguistic Features in AI-Generated Text Detection Across Domains and Models"
originalUrl: "https://arxiv.org/abs/2606.04177"
date: "2026-06-04T22:54:57.112Z"
---

# A Systematic Analysis of Linguistic Features in AI-Generated Text Detection Across Domains and Models
# 跨领域与模型的人工智能生成文本检测中语言特征的系统性分析

**Abstract:** Interpretable linguistic features offer a promising approach for explaining why a given text appears machine-generated, particularly for non-expert users. However, existing findings on which features reliably indicate LLM-generated text remain fragmented across feature sets, models, and text domains.
**摘要：** 可解释的语言特征为解释文本为何呈现出“机器生成”特征提供了一种有前景的方法，尤其对于非专业用户而言更是如此。然而，关于哪些特征能可靠地指示大语言模型（LLM）生成文本的现有研究结论，在特征集、模型和文本领域之间仍然较为零散。

To address this gap, we conduct a large-scale empirical study assessing the robustness of linguistic signals for characterizing AI-generated text. Our analysis covers 284 interpretable linguistic features across outputs from 27 LLMs and ten text domains under cross-model and cross-domain generalization settings.
为了填补这一空白，我们进行了一项大规模实证研究，评估了用于表征人工智能生成文本的语言信号的稳健性。我们的分析涵盖了在跨模型和跨领域泛化设置下，来自 27 个大语言模型和 10 个文本领域的 284 个可解释语言特征。

We show that classifiers based solely on linguistic features can reliably distinguish AI-generated from human-written text. However, many previously proposed indicators prove strongly context-dependent, with the exception of measures of lexical richness, which remain robust signals across model families and text domains.
研究表明，仅基于语言特征的分类器能够可靠地将人工智能生成的文本与人类撰写的文本区分开来。然而，许多先前提出的指标被证明具有很强的上下文依赖性，唯有“词汇丰富度”指标除外，它在不同模型系列和文本领域中始终保持着稳健的信号特征。

These results demonstrate which linguistic signals generalize across contexts and provide a foundation for more reliable, interpretable analyses of AI-generated language.
这些结果展示了哪些语言信号能够跨上下文泛化，并为对人工智能生成的语言进行更可靠、更具可解释性的分析奠定了基础。
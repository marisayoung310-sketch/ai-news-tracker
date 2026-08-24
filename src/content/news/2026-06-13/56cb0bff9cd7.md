---
title: "Constrained Semantic Decompression in LLMs through Persian Proverb-Conditioned Story Generation"
originalUrl: "https://arxiv.org/abs/2606.12599"
date: "2026-06-12T22:56:40.893Z"
---

# Constrained Semantic Decompression in LLMs through Persian Proverb-Conditioned Story Generation
# 通过波斯谚语条件故事生成实现大语言模型中的约束语义解压

**Abstract:** Transforming a dense, abstract proverb into an engaging and morally faithful narrative requires deep cultural understanding and robust semantic grounding. We frame this problem as a \emph{constrained semantic decompression} task and study proverb-conditioned story generation as a testbed for abstraction-to-realization in large language models (LLMs).

**摘要：** 将一句凝练、抽象的谚语转化为引人入胜且符合道德内涵的叙事，需要深厚的文化理解和扎实的语义基础。我们将此问题定义为“约束语义解压”（constrained semantic decompression）任务，并以谚语条件下的故事生成作为测试平台，研究大语言模型（LLM）如何实现从抽象概念到具体叙事的转化。

Focusing on Persian, we introduce the Proverb Aligned Narrative Dataset (PAND), pairing proverbs with human-written stories and explicit meanings. By a hybrid evaluation framework that combines human-calibrated LLM-as-a-Judge with structural metrics, we analyze model behavior across multiple prompting regimes.

以波斯语为研究对象，我们引入了“谚语对齐叙事数据集”（PAND），该数据集将谚语与人工撰写的故事及明确的含义解释进行配对。通过结合“人工校准的LLM作为评判者”与结构化指标的混合评估框架，我们分析了模型在多种提示策略下的表现。

Our findings reveal a persistent \emph{decompression gap}: current LLMs often achieve strong surface-level fluency while failing to faithfully instantiate the underlying moral and causal structure encoded in proverbs. We further show that explicit reasoning and iterative refinement can partially mitigate these failures, suggesting that many decompression errors arise from difficulties in translating abstract meaning into narrative form rather than a complete lack of relevant knowledge.

研究结果揭示了一个持续存在的“解压鸿沟”（decompression gap）：当前的大语言模型往往能实现较强的表层流畅度，却无法忠实地实例化谚语中所蕴含的道德与因果结构。我们进一步证明，显式推理和迭代优化可以部分缓解这些缺陷，这表明许多解压错误源于将抽象意义转化为叙事形式时的困难，而非模型完全缺乏相关知识。

Our proposed task naturally extends to other forms of compressed cultural knowledge.

我们提出的这项任务可以自然地扩展到其他形式的压缩文化知识领域。
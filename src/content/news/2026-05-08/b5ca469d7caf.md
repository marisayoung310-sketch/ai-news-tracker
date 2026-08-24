---
title: "Structured Progressive Knowledge Activation for LLM-Driven Neural Architecture Search"
originalUrl: "https://arxiv.org/abs/2605.04057"
date: "2026-05-07T23:34:59.101Z"
---

# Structured Progressive Knowledge Activation for LLM-Driven Neural Architecture Search
# 面向大模型驱动的神经架构搜索的结构化渐进式知识激活

**Abstract:** This paper focuses on a key challenge in Neural Architecture Search (NAS): integrating established architectural knowledge while exploring new designs under expensive evaluations. Large language models (LLMs) are a promising assistant for NAS because they can translate rich architectural and coding priors into executable code edits. However, in practice, seemingly local revisions often propagate into non-local behavioral and performance shifts because a single edit can inadvertently couple multiple interacting functional factors, a phenomenon we refer to as functional entanglement.

**摘要：** 本文聚焦于神经架构搜索（NAS）中的一个关键挑战：如何在昂贵的评估成本下，既整合已有的架构知识，又探索新的设计。大语言模型（LLMs）是 NAS 的有力助手，因为它们能够将丰富的架构和编码先验知识转化为可执行的代码修改。然而在实践中，看似局部的修改往往会引发非局部的行为和性能偏移，因为单次编辑可能会无意中耦合多个相互作用的功能因子，我们将这种现象称为“功能纠缠”（functional entanglement）。

To make LLM knowledge usable under such entanglement, we propose Structured Progressive Knowledge Activation (SPARK), which activates relevant priors by explicitly selecting the functional factor to modify and conditioning the edit on that factor. This factor-conditioned editing reduces entangled side effects and yields more targeted, reliable architecture modifications. On CLRS-DFS, SPARK achieves a 28.1x sample-efficient architecture evolution speedup and yields a 22.9 percent relative improvement in OOD accuracy.

为了在存在这种纠缠的情况下有效利用大模型知识，我们提出了结构化渐进式知识激活（SPARK）方法。该方法通过显式选择要修改的功能因子，并基于该因子对编辑过程进行约束，从而激活相关的先验知识。这种基于因子的条件化编辑减少了纠缠带来的副作用，产生了更具针对性且可靠的架构修改。在 CLRS-DFS 任务上，SPARK 实现了 28.1 倍的样本效率架构进化加速，并将分布外（OOD）准确率提升了 22.9%。
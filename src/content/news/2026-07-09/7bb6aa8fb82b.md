---
title: "Narrative World Model: Narratology-Grounded Writer Memory for Long-Form Fiction"
originalUrl: "https://arxiv.org/abs/2607.05577"
date: "2026-07-08T22:30:44.882Z"
---

# Narrative World Model: Narratology-Grounded Writer Memory for Long-Form Fiction
# 叙事世界模型：面向长篇小说的叙事学基础作家记忆系统

**Abstract:** Long-form fiction writers need memory that answers multi-hop questions about evolving story state: who knows a secret and when they learned it, whether an event preceded the narration that revealed it, whether a setup paid off, and how a relationship shifted. General-purpose retrieval and agent-memory systems represent entities and facts but not the narratological structure these questions turn on, so they surface the wrong evidence or none at all.

**摘要：** 长篇小说作家需要一种能够回答关于故事状态演变的多跳问题的记忆系统：例如谁知道某个秘密以及何时得知的、某个事件是否发生在揭示它的叙述之前、伏笔是否得到了呼应，以及人物关系是如何转变的。通用的检索和智能体记忆系统虽然能够表示实体和事实，但无法体现这些问题所依赖的叙事学结构，因此它们往往会提取出错误的证据，甚至根本无法提取出相关信息。

We introduce the Narrative World Model (NWM), a writer-memory system that pairs a narratology-grounded typed temporal-state graph with query-conditioned hybrid retrieval. To measure memory rather than the answerer, we read every system through a single held-constant Opus 4.8 reader over only that system's chapter-safe evidence, on a reproducible public corpus and a validated multi-hop benchmark, and we compare against the strongest existing temporal-knowledge-graph agent-memory framework, Graphiti/Zep (Rasmussen et al., 2025).

我们引入了叙事世界模型（Narrative World Model, NWM），这是一种作家记忆系统，它将基于叙事学的类型化时间状态图与查询条件下的混合检索相结合。为了评估记忆能力而非回答者的能力，我们通过单一且保持不变的 Opus 4.8 阅读器，仅根据各系统提供的章节安全证据进行测试。我们在可复现的公共语料库和经过验证的多跳基准测试上，将其与目前最强大的时间知识图谱智能体记忆框架 Graphiti/Zep (Rasmussen et al., 2025) 进行了对比。

NWM substantially and significantly outperforms this baseline on multi-hop narratological QA across both corpora, and far exceeds GraphRAG and flat retrieval. The advantage is representational rather than an artifact of extraction: it survives rebuilding the baseline with NWM's own extractor, and traces to its narratology-grounded structure and query-conditioned retrieval, not to graph size or extractor quality.

在两个语料库的多跳叙事问答任务中，NWM 的表现均显著优于该基准模型，并远超 GraphRAG 和扁平化检索。这种优势源于其表征方式，而非提取过程的产物：即使使用 NWM 自身的提取器重建基准模型，该优势依然存在。这证明其性能提升归功于其基于叙事学的结构和查询条件下的检索机制，而非图谱规模或提取器质量。
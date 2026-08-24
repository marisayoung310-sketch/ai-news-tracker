---
title: "Data Quality over Capacity: Internalizing Documents into LoRA Adapters for Closed-Book QA"
originalUrl: "https://arxiv.org/abs/2607.21861"
date: "2026-07-27T22:35:10.410Z"
---

# Data Quality over Capacity: Internalizing Documents into LoRA Adapters for Closed-Book QA
# 数据质量重于容量：将文档内化至 LoRA 适配器以实现闭卷问答

**Abstract:** We study baking documents directly into the weights of a 4-bit Gemma-4-e4b model via LoRA, so a system can answer questions about a corpus closed-book: no retrieval and no context-window budget. 

**摘要：** 我们研究了通过 LoRA 将文档直接“烘焙”（内化）到 4-bit Gemma-4-e4b 模型的权重中，从而使系统能够在无需检索且不受上下文窗口限制的情况下，以闭卷方式回答有关语料库的问题。

Across roughly 100 training runs from single documents to a 99-document corpus, we find that once adapter capacity is adequate, training-data quality is the dominant lever on closed-book accuracy, outweighing LoRA rank, learning rate, and two alternative architectures combined; capacity itself is a hard gate below which no data intervention helps. 

在从单篇文档到 99 篇文档语料库的约 100 次训练运行中，我们发现一旦适配器容量充足，训练数据的质量就是影响闭卷准确率的主导因素，其重要性超过了 LoRA 秩（rank）、学习率以及两种替代架构的总和；而容量本身是一道硬门槛，低于此门槛时，任何数据干预都无济于事。

A single curation pass (shortening gold answers to canonical 1-6 word spans and dropping trivia) moved closed-book accuracy from 57.7% to 85.7% on a 15-document corpus, a larger jump than any architectural change. 

仅通过一次数据整理（将标准答案缩短为 1-6 个词的规范片段并剔除琐碎信息），在 15 篇文档的语料库上，闭卷准确率就从 57.7% 提升到了 85.7%，这一增幅超过了任何架构调整带来的提升。

We confirm a capacity trend (rank must grow with corpus size) entangled with a coupling between rank and learning rate that we initially misdiagnosed. 

我们证实了一个容量趋势（秩必须随语料库规模的增加而增加），该趋势与秩和学习率之间的耦合有关，而我们最初对这一耦合存在误判。

On a 15-document slice we add a real retrieval baseline: the internalized adapter (84.2% recall) beats a BM25-RAG pipeline with a base reader (58.9%) and even a realistic gold-chunk oracle (65.6%) at lower latency. 

在 15 篇文档的切片上，我们增加了一个真实的检索基准：内化适配器（召回率为 84.2%）在更低延迟下，表现优于带有基础阅读器的 BM25-RAG 流水线（58.9%），甚至优于真实的黄金分块预言机（65.6%）。

We report the full arc, including three misdiagnoses, as a case study in debugging LLM training empirically.

我们报告了整个研究过程，包括三次误判，以此作为实证调试大语言模型（LLM）训练的案例研究。
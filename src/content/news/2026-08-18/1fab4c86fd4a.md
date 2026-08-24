---
title: "IterCOMP: Reasoning-aware Adaptive Prompt Compression for Multi-hop Question Answering"
originalUrl: "https://arxiv.org/abs/2608.13588"
date: "2026-08-17T21:51:22.124Z"
---

# IterCOMP: Reasoning-aware Adaptive Prompt Compression for Multi-hop Question Answering
# IterCOMP：面向多跳问答的推理感知自适应提示词压缩

**Abstract:** Multi-hop question answering requires complex reasoning across multiple evidence segments, which often overwhelms retrieval-augmented generation (RAG) systems with lengthy and noisy contexts, thereby undermining both efficiency and accuracy.
**摘要：** 多跳问答（Multi-hop question answering）需要在多个证据片段之间进行复杂的推理，这往往会使检索增强生成（RAG）系统面临冗长且嘈杂的上下文，从而损害系统的效率和准确性。

While existing prompt compression methods attempt to address this issue, they are typically designed for single-turn queries and fail to capture interdependent reasoning steps.
尽管现有的提示词压缩方法试图解决这一问题，但它们通常是为单轮查询设计的，无法捕捉相互依赖的推理步骤。

We propose IterCOMP, a unified, training-free prompt compression framework that incorporates multi-hop reasoning within an iterative compression loop.
我们提出了 IterCOMP，这是一个统一的、无需训练的提示词压缩框架，它将多跳推理整合到了一个迭代压缩循环中。

IterCOMP decomposes documents into evidence segments, evaluates question answerability, and generates targeted follow-up questions to iteratively integrate essential evidence, producing a compact, reasoning-oriented prompt.
IterCOMP 将文档分解为证据片段，评估问题的可回答性，并生成有针对性的后续问题以迭代地整合关键证据，从而生成一个紧凑的、面向推理的提示词。

Experiments on MusiQue, 2WikiMultiHopQA, and HotpotQA demonstrate that IterCOMP achieves substantial improvements in Exact Match and F1 scores while reducing the token budget, outperforming existing baselines and exhibiting robustness as reasoning complexity increases.
在 MusiQue、2WikiMultiHopQA 和 HotpotQA 上的实验表明，IterCOMP 在减少 Token 预算的同时，显著提高了精确匹配（Exact Match）和 F1 分数，优于现有的基准模型，并在推理复杂度增加时表现出良好的鲁棒性。
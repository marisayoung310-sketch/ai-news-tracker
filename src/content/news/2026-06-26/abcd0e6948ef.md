---
title: "Graph-Based Phonetic Error Correction of Noisy ASR"
originalUrl: "https://arxiv.org/abs/2606.24889"
date: "2026-06-25T22:58:16.579Z"
---

# Graph-Based Phonetic Error Correction of Noisy ASR
# 基于图的噪声自动语音识别（ASR）语音纠错

**Abstract:** Automatic speech recognition (ASR) systems, despite low overall word error rates, produce residual lexical errors that disproportionately affect semantically critical tokens such as named entities, negations, and sentiment-bearing words. These errors are often structured, arising from phonetic similarity rather than random noise, making naive token-level correction insufficient.

**摘要：** 尽管自动语音识别（ASR）系统的整体词错误率较低，但仍会产生残留的词汇错误，这些错误会对命名实体、否定词和带有情感色彩的词汇等语义关键标记产生不成比例的影响。这些错误通常具有结构性，源于语音相似性而非随机噪声，这使得简单的标记级纠错方法往往不足以解决问题。

We propose a structured ASR correction framework, that we call G-SPIN, that combines phonetic graph modeling with contextual language understanding. A graph neural network (GNN) first constructs acoustically plausible candidate neighborhoods for flagged tokens, explicitly restricting the correction search space to phonetic alternatives.

我们提出了一种名为 G-SPIN 的结构化 ASR 纠错框架，它将语音图建模与上下文语言理解相结合。图神经网络（GNN）首先为被标记的词汇构建声学上合理的候选邻域，明确将纠错搜索空间限制在语音相似的替代词范围内。

A masked language model (MLM) then provides local contextual scoring, and an instruction-tuned large language model (LLM) performs final context-aware re-ranking over this compact candidate set. By decoupling structured phonetic reasoning from contextual semantic selection, our method avoids unconstrained generation while improving correction accuracy. The framework is lightweight, modular, and operates entirely at inference time.

随后，掩码语言模型（MLM）提供局部上下文评分，指令微调的大语言模型（LLM）则对这一精简的候选集进行最终的上下文感知重排序。通过将结构化语音推理与上下文语义选择解耦，我们的方法避免了无约束生成，同时提高了纠错准确率。该框架轻量、模块化，且完全在推理阶段运行。
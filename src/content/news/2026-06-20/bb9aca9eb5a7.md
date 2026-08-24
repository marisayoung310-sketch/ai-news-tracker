---
title: "Detecting Hallucinations for Large Language Model-based Knowledge Graph Reasoning"
originalUrl: "https://arxiv.org/abs/2606.19351"
date: "2026-06-19T22:20:06.509Z"
---

# Detecting Hallucinations for Large Language Model-based Knowledge Graph Reasoning
# 基于大语言模型的知识图谱推理幻觉检测

**Abstract:** Knowledge graph (KG) reasoning infers new knowledge from existing facts and is widely applied in question answering, recommendation, and decision support. With the rapid development of large language models (LLMs), LLM-based KG reasoning frameworks have become increasingly popular by leveraging retrieved KG information. However, hallucinations in LLMs remain a critical issue. Even when relevant KG knowledge is incorporated, models may still generate incorrect outputs, leading to misinformation and unreliable decisions.

**摘要：** 知识图谱（KG）推理通过现有事实推断新知识，并被广泛应用于问答、推荐和决策支持等领域。随着大语言模型（LLM）的快速发展，基于 LLM 的知识图谱推理框架通过利用检索到的知识图谱信息，变得日益流行。然而，大语言模型中的幻觉问题仍然是一个严峻的挑战。即使在引入了相关的知识图谱信息后，模型仍可能生成错误的输出，从而导致错误信息和不可靠的决策。

Existing hallucination detection methods either focus on LLM internal states or verify consistency with retrieved contexts, but both overlook the structural information in KGs, resulting in suboptimal performance. To address this gap, we propose LUCID, the first halLUcination deteCtIon method for LLM-based knowleDge graph reasoning frameworks.

现有的幻觉检测方法要么侧重于分析大语言模型的内部状态，要么验证其与检索上下文的一致性，但两者都忽略了知识图谱中的结构信息，导致性能表现不佳。为了填补这一空白，我们提出了 LUCID，这是首个针对基于大语言模型的知识图谱推理框架的幻觉检测方法。

LUCID jointly leverages LLM attention scores, KG semantics, and structural information. Specifically, it extracts node and edge features from attention scores and semantic similarities, and integrates them with KG structure using a graph neural network. We also construct manually annotated benchmark datasets for evaluation. Experiments on nine datasets show that LUCID achieves state of the art performance compared to 15 baselines.

LUCID 联合利用了大语言模型的注意力分数、知识图谱语义以及结构信息。具体而言，它通过注意力分数和语义相似度提取节点与边特征，并利用图神经网络将其与知识图谱结构进行整合。此外，我们还构建了人工标注的基准数据集用于评估。在九个数据集上的实验表明，与 15 个基准模型相比，LUCID 达到了最先进的性能水平。
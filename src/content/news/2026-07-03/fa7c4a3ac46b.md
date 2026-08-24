---
title: "RareDxR1: Autonomous Medical Reasoning for Rare Disease Diagnosis Beyond Human Annotation"
originalUrl: "https://arxiv.org/abs/2607.00147"
date: "2026-07-02T22:35:06.064Z"
---

# RareDxR1: Autonomous Medical Reasoning for Rare Disease Diagnosis Beyond Human Annotation
# RareDxR1：超越人类标注的罕见病诊断自主医学推理模型

Rare disease differential diagnosis is a critical yet arduous clinical task, requiring physicians to identify precise phenotypes from complex, unstructured patient symptoms and execute intricate reasoning within a vast search space.
罕见病的鉴别诊断是一项关键且艰巨的临床任务，要求医生从复杂、非结构化的患者症状中识别出精确的表型，并在巨大的搜索空间内执行复杂的推理。

However, existing AI approaches typically rely on pipeline-based phenotype extraction or retrieval-augmented generation, which suffer from critical information loss due to predefined ontologies, retrieval bottlenecks, and a lack of diagnostic logic.
然而，现有的AI方法通常依赖于基于流水线的表型提取或检索增强生成（RAG），这些方法由于预定义的本体论、检索瓶颈以及缺乏诊断逻辑，往往会导致严重的信息丢失。

To address these challenges, we introduce RareDxR1, an end-to-end reasoning-centric large language model designed for open-domain rare disease diagnosis directly from unstructured clinical notes.
为了应对这些挑战，我们推出了RareDxR1，这是一个以推理为核心的端到端大语言模型，旨在直接从非结构化临床记录中进行开放域罕见病诊断。

We design a progressive end-to-end training framework by synergizing knowledge internalization with autonomous evolutionary learning, thereby bypassing reliance on structured phenotypes and closed-set decision-making.
我们设计了一个渐进式的端到端训练框架，通过将知识内化与自主进化学习相结合，从而绕过了对结构化表型和封闭集决策的依赖。

To overcome the limitations of RAG and phenotype restriction, we enabled the deep internalization of fragmented rare-disease knowledge directly into the model's parameters.
为了克服RAG和表型限制的局限性，我们实现了将碎片化的罕见病知识直接深度内化到模型参数中。

Moreover, to bridge the gap between model generation and expert reasoning, we propose Reflection-Enhanced Reasoning Sampling (RERS), a strategy that synthesizes expert-level diagnostic trajectories by learning from failures without human annotation.
此外，为了弥合模型生成与专家推理之间的差距，我们提出了反射增强推理采样（RERS），这是一种无需人工标注，通过从失败中学习来合成专家级诊断轨迹的策略。

Additionally, we propose a dual-level curriculum reinforcement learning approach for gradually mastering rare disease diagnosis.
此外，我们提出了一种双层课程强化学习方法，用于逐步掌握罕见病诊断。

Experimental results demonstrate that RareDxR1 achieves state-of-the-art accuracy across different benchmarks, marking a significant breakthrough in open-domain rare disease diagnosis. Our code and dataset will be publicly available.
实验结果表明，RareDxR1在多个基准测试中均达到了最先进的准确率，标志着开放域罕见病诊断领域的重大突破。我们的代码和数据集将公开提供。
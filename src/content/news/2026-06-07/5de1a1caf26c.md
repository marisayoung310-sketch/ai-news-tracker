---
title: "Synthetic Contrastive Reasoning for Multi-Table Q&A"
originalUrl: "https://arxiv.org/abs/2606.05382"
date: "2026-06-06T22:40:24.269Z"
---

# Synthetic Contrastive Reasoning for Multi-Table Q&A
# 用于多表问答的合成对比推理

**Abstract:** Multi-table question answering requires models to retrieve relevant evidence, link schemas, and perform compositional reasoning across relational tables. Existing multi-table Q&A resources typically provide questions and final answers but lack reasoning supervision that explains how answers are derived.

**摘要：** 多表问答（Multi-table Q&A）要求模型能够检索相关证据、链接模式（schema），并在关系表之间执行组合推理。现有的多表问答资源通常只提供问题和最终答案，但缺乏解释答案如何推导出的推理监督信息。

To address this gap, we construct a synthetic contrastive reasoning-trace dataset for MMQA by generating validated positive traces and plausible negative traces with heterogeneous LLMs. We then use the resulting preference pairs to fine-tune open-weight LLMs with Contrastive Preference Optimization (CPO).

为了弥补这一空白，我们通过异构大语言模型（LLM）生成经过验证的正向推理轨迹和合理的负向推理轨迹，构建了一个用于 MMQA 的合成对比推理轨迹数据集。随后，我们利用生成的偏好对，通过对比偏好优化（CPO）对开源权重的大语言模型进行微调。

Across Qwen3-14B, Mistral-8B, and Llama-3.1-8B, CPO achieves absolute average improvements over Q&A supervised fine-tuning ranging from 9.7%-16.3%, with gains up to 21 percentage points on MMQA. Ablations show that heterogeneous positive and negative trace generators strengthen the contrastive signal, and automated as well as human evaluations indicate that the generated pairs are largely faithful, coherent, and meaningfully contrastive.

在 Qwen3-14B、Mistral-8B 和 Llama-3.1-8B 模型上，CPO 相比传统的问答监督微调，实现了 9.7% 到 16.3% 的绝对平均性能提升，在 MMQA 任务上的增幅最高可达 21 个百分点。消融实验表明，异构的正负向轨迹生成器增强了对比信号；自动化评估和人工评估均显示，所生成的偏好对在很大程度上是忠实、连贯且具有显著对比意义的。
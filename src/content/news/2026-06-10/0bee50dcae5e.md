---
title: "Why Limit the Residual Stream to Layers and Not Tokens? Persistent Memory for Continuous Latent Reasoning"
originalUrl: "https://arxiv.org/abs/2606.07720"
date: "2026-06-09T23:01:01.629Z"
---

# Why Limit the Residual Stream to Layers and Not Tokens? Persistent Memory for Continuous Latent Reasoning
# 为什么将残差流限制在层级而非 Token？用于连续潜在推理的持久化记忆

Large language models (LLMs) have demonstrated remarkable reasoning abilities on mathematical and multi-hop planning tasks. The CoCoNuT (Chain of Continuous Thought) paradigm extends this by enabling models to reason in latent space, exploring multiple reasoning paths simultaneously rather than committing to a single chain early on.
大型语言模型（LLMs）在数学和多跳规划任务中展现出了卓越的推理能力。CoCoNuT（连续思维链）范式通过使模型能够在潜在空间中进行推理，从而扩展了这一能力，它允许模型同时探索多条推理路径，而不是过早地局限于单一的思维链。

However, we identify a limitation we term the "concept bottleneck." At each reasoning pass, intermediate hidden states are overwritten, causing the model to lose critical facts computed in earlier steps as reasoning depth increases. We observe this empirically. On HotpotQA, vanilla CoCoNuT (10.4% EM) fails to improve over the CoT baseline (11.0% EM), and performance degrades with curriculum depth on GSM8K.
然而，我们发现了一个被称为“概念瓶颈”（concept bottleneck）的局限性。在每一次推理过程中，中间隐藏状态都会被覆盖，导致模型随着推理深度的增加而丢失早期步骤中计算出的关键事实。我们通过实验观察到了这一点。在 HotpotQA 数据集上，原始的 CoCoNuT（10.4% EM）未能超越 CoT 基准（11.0% EM），且在 GSM8K 上，性能会随着课程深度的增加而下降。

To address this, we propose AGCLR (Adaptive Gated Continuous Latent Reasoning), which augments CoCoNuT with a "Gated Concept Stream." A persistent residual memory maintained across all reasoning passes, controlled by three learned gates: a "write" gate that commits intermediate facts to memory, a "read" gate that retrieves relevant prior states, and a "forget" gate that prunes irrelevant context.
为了解决这个问题，我们提出了 AGCLR（自适应门控连续潜在推理），它通过“门控概念流”增强了 CoCoNuT。这是一种在所有推理过程中保持的持久化残差记忆，由三个学习到的门控机制控制：一个将中间事实写入记忆的“写入”门，一个检索相关先前状态的“读取”门，以及一个剔除无关上下文的“遗忘”门。

Evaluated on GSM8K, HotpotQA, and ProsQA using GPT-2 as our base model, AGCLR achieves consistent improvements across all types of datasets. With the performance gap compounding as curriculum depth increases, directly resolving the concept bottleneck.
在使用 GPT-2 作为基础模型并在 GSM8K、HotpotQA 和 ProsQA 上进行评估后，AGCLR 在所有类型的数据集上都实现了持续的性能提升。随着课程深度的增加，性能差距进一步扩大，从而直接解决了概念瓶颈问题。
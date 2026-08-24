---
title: "MARCH: Scaling Recurrent Memory with Content-Routed State Anchors"
originalUrl: "https://arxiv.org/abs/2608.12435"
date: "2026-08-14T22:04:13.493Z"
---

# MARCH: Scaling Recurrent Memory with Content-Routed State Anchors
# MARCH：通过内容路由状态锚点扩展循环记忆

**Abstract:** Transformers owe much of their strong long-context retrieval capability to a token-level memory that grows with context length. This flexibility, however, incurs a quadratic computation complexity during training and a key-value cache that grows linearly during autoregressive inference.

**摘要：** Transformer 强大的长上下文检索能力很大程度上归功于随上下文长度增长的词元级（token-level）记忆。然而，这种灵活性在训练过程中带来了二次方的计算复杂度，并在自回归推理过程中导致键值（key-value）缓存随长度线性增长。

Recurrent alternatives offer efficient decoding by compressing the entire history into a fixed-size state, but often underperform on recall-intensive tasks since earlier associations usually get overwritten by subsequent updates, and only the most recent contextual information is retained.

循环模型（Recurrent alternatives）通过将整个历史压缩为固定大小的状态来提供高效的解码，但在需要高召回率的任务中表现往往不佳，因为早期的关联通常会被后续的更新覆盖，导致模型只能保留最近的上下文信息。

In this paper, we introduce Memory-Anchor Routing across Context History (MARCH), a network architecture that effectively scales state-space models beyond a fixed-size dimension, while maintaining computational efficiency over long-sequences. MARCH periodically caches cumulative recurrent-state checkpoints as state anchors and associates each anchor with a compact, content-conditioned anchor key.

在本文中，我们引入了“跨上下文历史的记忆锚点路由”（Memory-Anchor Routing across Context History，简称 MARCH）。这是一种网络架构，它能有效地将状态空间模型扩展到固定维度之外，同时在处理长序列时保持计算效率。MARCH 定期将累积的循环状态检查点缓存为“状态锚点”，并将每个锚点与一个紧凑的、基于内容条件的“锚点键”（anchor key）相关联。

This lets MARCH maintain a memory bank, which can grow as context length increases, providing a controllable trade-off between historical resolution and memory cost. At each token, MARCH produces an anchor query to attend all causally available state anchors, and the output is calculated as an attention-style aggregation over all historical anchors along the current state.

这使得 MARCH 能够维护一个随上下文长度增加而增长的记忆库，从而在历史分辨率和内存成本之间提供可控的权衡。在处理每个词元时，MARCH 会生成一个“锚点查询”（anchor query）来关注所有因果可用的状态锚点，其输出计算方式是对所有历史锚点与当前状态进行注意力风格的聚合。

We show that after standard pretraining, MARCH consistently outperforms multiple linear attention variants across commonsense reasoning, LongBench, and in-context retrieval. These results demonstrate that content-routed state caching substantially strengthens recurrent long-range memory while preserving its native computation path.

我们证明，在经过标准预训练后，MARCH 在常识推理、LongBench 和上下文内检索任务中始终优于多种线性注意力变体。这些结果表明，内容路由状态缓存显著增强了循环模型的长程记忆能力，同时保留了其原生的计算路径。
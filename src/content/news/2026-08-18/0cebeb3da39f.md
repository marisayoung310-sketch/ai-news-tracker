---
title: "BCMT: Blockwise Causal Memory Transformer"
originalUrl: "https://arxiv.org/abs/2608.13578"
date: "2026-08-17T21:51:14.690Z"
---

# BCMT: Blockwise Causal Memory Transformer

**Abstract:** Transformer architectures rely on dense self-attention to model long-range dependencies, but this mechanism exhibits quadratic complexity with respect to sequence length. 

**摘要：** Transformer 架构依赖于稠密自注意力机制（dense self-attention）来建模长距离依赖，但该机制在序列长度方面表现出二次复杂度。

We introduce BCMT (Blockwise Causal Memory Transformer), an architecture for long-context language modeling that decouples local token interactions from global context propagation. 

我们引入了 BCMT（分块因果记忆 Transformer），这是一种用于长上下文语言建模的架构，它将局部 Token 交互与全局上下文传播解耦。

Dense causal self-attention is applied independently within local blocks, while each block produces an adaptive summary aggregated through an exponential causal memory. 

稠密因果自注意力在局部块内独立应用，同时每个块通过指数因果记忆（exponential causal memory）聚合生成一个自适应摘要。

This memory is subsequently injected back into the token representations, enabling efficient propagation of long-range contextual information without relying on explicit global attention. 

该记忆随后被注入回 Token 表示中，从而在不依赖显式全局注意力的情况下，实现长距离上下文信息的高效传播。

Unlike standard Transformers and recurrent memory architectures, BCMT maintains neither dense interactions between distant tokens nor learned memory states. 

与标准 Transformer 和循环记忆架构不同，BCMT 既不维护远距离 Token 之间的稠密交互，也不维护学习到的记忆状态。

Its memory mechanism is fully parallelizable and remains compatible with standard implementations of dense self-attention. 

其记忆机制完全可并行化，并与稠密自注意力的标准实现保持兼容。

Experiments on language modeling with context lengths of up to 1024 tokens show that BCMT achieves validation performance comparable to that of Dense Transformers while significantly improving training throughput and reducing memory consumption. 

在上下文长度高达 1024 个 Token 的语言建模实验中，BCMT 的验证性能与稠密 Transformer 相当，同时显著提高了训练吞吐量并降低了内存消耗。

An ablation study further confirms that these improvements arise from the proposed memory mechanism. 

消融研究进一步证实，这些改进源于所提出的记忆机制。

These results demonstrate that an exponential causal memory constructed from block summaries provides an effective alternative to dense global attention mechanisms for long-context language modeling.

这些结果表明，由块摘要构建的指数因果记忆为长上下文语言建模中的稠密全局注意力机制提供了一种有效的替代方案。
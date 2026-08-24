---
title: "Prism Transformer: Progressive Head Schedules for Hierarchical Attention Processing"
originalUrl: "https://arxiv.org/abs/2606.27449"
date: "2026-06-29T22:42:08.449Z"
---

# Prism Transformer: Progressive Head Schedules for Hierarchical Attention Processing
# Prism Transformer：用于分层注意力处理的渐进式注意力头调度

**Abstract:** Multi-head attention conventionally partitions the hidden dimension equally across all heads at every layer, enforcing an identical representational subspace dimension ($d_h = d_{model}/h$) throughout the model's depth. In this work, we identify this uniform allocation as a fundamental structural bottleneck: due to their restricted dimensional space, early-layer heads are unable to faithfully capture complex, high-dimensional contextual patterns.

**摘要：** 传统的多头注意力机制在每一层中将隐藏维度平均分配给所有注意力头，从而在整个模型深度中强制执行相同的表征子空间维度（$d_h = d_{model}/h$）。在这项工作中，我们指出这种均匀分配方式是一个根本性的结构瓶颈：由于维度空间的限制，浅层注意力头无法准确捕捉复杂的、高维的上下文模式。

To resolve this, we introduce the Prism Transformer, a novel architectural paradigm that replaces the static, uniform head configuration with a progressive head schedule. By monotonically increasing the head count across layers, the Prism Transformer naturally establishes a local-to-global representational hierarchy: early layers leverage fewer, exceptionally wide heads to capture complex, local compositional patterns, while deep layers deploy many, narrow heads to decompose these patterns into specialized linguistic features.

为了解决这一问题，我们引入了 Prism Transformer，这是一种全新的架构范式，它用渐进式注意力头调度取代了静态、均匀的注意力头配置。通过在各层中单调增加注意力头的数量，Prism Transformer 自然地建立了一种从局部到全局的表征层次结构：浅层利用较少但极其宽阔的注意力头来捕捉复杂的局部组合模式，而深层则部署大量狭窄的注意力头，将这些模式分解为专门的语言特征。

Crucially, this structural shift is parameter-neutral, compute-neutral, and introduces zero training or inference overhead, preserving identical weight matrices and FLOP budgets as the standard Transformer. Across three model scales (124M, 354M, and 757M), the Prism Transformer consistently outperforms uniform baselines, achieving consistent reductions in validation loss alongside consistent gains on downstream zero-shot benchmarks (including PIQA, HellaSwag, ARC-Easy, and WinoGrande).

至关重要的是，这种结构性转变是参数中立且计算中立的，不会引入任何训练或推理开销，并保持了与标准 Transformer 相同的权重矩阵和 FLOPs（浮点运算次数）预算。在三种模型规模（1.24亿、3.54亿和7.57亿参数）下，Prism Transformer 的表现始终优于均匀配置的基准模型，在降低验证损失的同时，在下游零样本（zero-shot）基准测试（包括 PIQA、HellaSwag、ARC-Easy 和 WinoGrande）中也取得了持续的性能提升。

Our findings demonstrate that non-uniform subspace allocation unlocks latent capacity within the standard Transformer budget, enabling more effective use of model capacity.

我们的研究结果表明，非均匀的子空间分配能够释放标准 Transformer 预算内的潜在容量，从而更有效地利用模型能力。
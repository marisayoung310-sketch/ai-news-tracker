---
title: "Attribution-Guided and Coverage-Maximized Pruning for Structural MoE Compression"
originalUrl: "https://arxiv.org/abs/2606.18304"
date: "2026-06-18T23:20:12.603Z"
---

# Attribution-Guided and Coverage-Maximized Pruning for Structural MoE Compression
# 基于归因引导与覆盖最大化的结构化 MoE 模型压缩剪枝

**Abstract:** Mixture-of-Experts (MoE) models scale compute efficiently, yet remain expensive to deploy due to their substantial memory footprint and inference overhead. Prior compression methods mainly operate at the expert level, either removing entire experts or ranking experts by coarse-grained importance scores. However, such expert-wise decisions are often too coarse to capture fine-grained redundancy, leading to misallocated pruning budgets and limited compression.

**摘要：** 混合专家（MoE）模型虽然能高效扩展计算能力，但由于其庞大的内存占用和推理开销，部署成本依然高昂。现有的压缩方法主要在专家层级进行操作，要么直接移除整个专家，要么通过粗粒度的重要性评分对专家进行排序。然而，这种基于专家的决策往往过于粗糙，难以捕捉细粒度的冗余，从而导致剪枝预算分配不当，压缩效果受限。

To address this problem, we observe that information within MoE experts is highly concentrated in a small subset of channels, leaving substantial redundancy even in experts deemed important. Based on this observation, we propose a structural pruning framework tailored for MoE models. Our method reformulates prune-ratio allocation as a channel-score coverage maximization problem and solves it efficiently using an attribution-based approximation.

为了解决这一问题，我们观察到 MoE 专家内部的信息高度集中在少数通道子集中，即使是被认为重要的专家也存在大量冗余。基于这一观察，我们提出了一种专为 MoE 模型量身定制的结构化剪枝框架。我们的方法将剪枝比例分配重新定义为通道评分覆盖最大化问题，并利用基于归因的近似方法高效地求解该问题。

Experiments on DeepSeek and Qwen MoE models show that our method preserves model accuracy under 50% or 25% structured pruning when combined with 4-bit quantization. On Qwen3-30B-A3B, our approach reduces memory footprint by 5.27$\times$ and consistently outperforms state-of-the-art baselines across diverse benchmarks.

在 DeepSeek 和 Qwen MoE 模型上的实验表明，当结合 4-bit 量化时，我们的方法在 50% 或 25% 的结构化剪枝下仍能保持模型精度。在 Qwen3-30B-A3B 模型上，我们的方法将内存占用降低了 5.27 倍，并在多个基准测试中持续优于当前最先进的基准模型。
---
title: "DC-Leap: Training-Free Acceleration of dLLMs via Draft-Guided Contiguous Leaping Decoding"
originalUrl: "https://arxiv.org/abs/2607.20467"
date: "2026-07-24T22:35:01.349Z"
---

# DC-Leap: Training-Free Acceleration of dLLMs via Draft-Guided Contiguous Leaping Decoding

**Title:** DC-Leap: Training-Free Acceleration of dLLMs via Draft-Guided Contiguous Leaping Decoding
**标题：** DC-Leap：通过草稿引导的连续跳跃解码实现扩散大语言模型（dLLMs）的免训练加速

**Abstract:** While parallel decoding is central to the efficiency of Diffusion Large Language Models (dLLMs), current strategies are often hindered by overly conservative confidence thresholds. These thresholds, necessitated by the Joint Probability Dependence Error (JPDE), result in redundant denoising iterations and suboptimal inference speeds.
**摘要：** 虽然并行解码对于扩散大语言模型（dLLMs）的效率至关重要，但目前的策略往往受到过于保守的置信度阈值的阻碍。这些由联合概率依赖误差（JPDE）所必需的阈值，导致了冗余的去噪迭代和次优的推理速度。

To overcome this, we propose DC-Leap, a training-free framework that enables reliable acceleration of dLLMs in the moderate-confidence regime. DC-Leap introduces a Dynamic Contiguous Verification strategy that integrates strictly-ordered causal constraints into the parallel decoding process. By progressively validating token dependencies, this mechanism effectively neutralizes the JPDE, enabling reliable acceleration with comparable performance.
为了克服这一问题，我们提出了 DC-Leap，这是一个免训练框架，能够在适度置信度范围内实现 dLLMs 的可靠加速。DC-Leap 引入了一种动态连续验证策略，将严格排序的因果约束集成到并行解码过程中。通过逐步验证标记（token）依赖关系，该机制有效地抵消了 JPDE，从而在保持相当性能的同时实现了可靠的加速。

Furthermore, DC-Leap incorporates the draft-guided decoding mechanism, where the draft helps extend the context by leaping forward across multiple tokens, providing look-ahead context and retaining the structural benefits of bidirectional attention during inference.
此外，DC-Leap 结合了草稿引导解码机制，其中草稿通过跨多个标记向前跳跃来帮助扩展上下文，提供前瞻性上下文，并在推理过程中保留了双向注意力的结构优势。

Extensive experiments on standard benchmarks demonstrate that DC-Leap achieves substantial speedups, up to 53.19x on MBPP for long-sequence generation, and up to 105.02x when combined with KV-Cache with comparable generation quality.
在标准基准测试上的大量实验表明，DC-Leap 实现了显著的加速，在 MBPP 长序列生成任务上最高可达 53.19 倍，而在结合 KV-Cache 后，在保持相当生成质量的前提下，加速比最高可达 105.02 倍。

**Authors:** Yanhua Jiao, Tianyi Wu, Xiaoxi Sun, Yulin Li, HuiLing Zhen, Libo Qin, Baotian Hu, Zhuotao Tian, Min Zhang
**作者：** Yanhua Jiao, Tianyi Wu, Xiaoxi Sun, Yulin Li, HuiLing Zhen, Libo Qin, Baotian Hu, Zhuotao Tian, Min Zhang
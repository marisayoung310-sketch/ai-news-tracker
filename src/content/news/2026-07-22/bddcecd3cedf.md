---
title: "SpecLA: Efficient Speculative Decoding for Linear-Attention Models"
originalUrl: "https://arxiv.org/abs/2607.16673"
date: "2026-07-21T22:19:22.279Z"
---

# SpecLA: Efficient Speculative Decoding for Linear-Attention Models
# SpecLA：针对线性注意力模型的高效投机解码

Linear-attention models replace the growing KV cache with recurrent states, but autoregressive decoding still reads, updates, and writes these states one token at a time.
线性注意力模型使用循环状态（recurrent states）取代了不断增长的 KV 缓存，但自回归解码仍然需要逐个 token 地读取、更新和写入这些状态。

Speculative decoding can reduce this cost by verifying several draft tokens in one target pass, yet existing speculative systems are designed for Transformer KV caches.
投机解码可以通过在一次目标模型推理中验证多个草稿 token 来降低这种开销，然而现有的投机系统大多是为 Transformer 的 KV 缓存设计的。

For stateful linear-attention targets, verification must follow recurrent dependencies across chains and branches, acceptance must update only the accepted state trajectory, and the drafter must avoid submitting candidates that waste stateful verification work.
对于具有状态的线性注意力目标模型，验证过程必须遵循跨链和分支的循环依赖关系，接受过程必须仅更新被采纳的状态轨迹，且草稿模型（drafter）必须避免提交会导致状态验证工作浪费的候选 token。

This paper presents SpecLA, a speculative decoding runtime for stateful linear-attention models. SpecLA verifies chains and trees with topology-aware kernels, stores compact factors produced during verification to recover accepted states, and uses confidence pruning plus a target-aligned EAGLE-style drafter to feed useful candidates to the verifier.
本文提出了 SpecLA，这是一个专为有状态线性注意力模型设计的投机解码运行时。SpecLA 利用拓扑感知内核（topology-aware kernels）来验证链和树结构，存储验证过程中产生的紧凑因子以恢复已接受的状态，并结合置信度剪枝和与目标模型对齐的 EAGLE 风格草稿模型，向验证器提供高质量的候选 token。

On an NVIDIA H100 with a public GDN-1.3B target, SpecLA achieves up to 1.70x end-to-end speedup over autoregressive decoding.
在配备 NVIDIA H100 GPU 并使用公开的 GDN-1.3B 模型作为目标模型的情况下，SpecLA 实现了最高 1.70 倍的端到端加速，优于传统的自回归解码。
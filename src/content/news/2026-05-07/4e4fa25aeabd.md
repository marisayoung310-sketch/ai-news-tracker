---
title: "StateSMix: Online Lossless Compression via Mamba State Space Models and Sparse N-gram Context Mixing"
originalUrl: "https://arxiv.org/abs/2605.02904"
date: "2026-05-06T22:55:19.868Z"
---

# StateSMix: Online Lossless Compression via Mamba State Space Models and Sparse N-gram Context Mixing

**StateSMix：基于 Mamba 状态空间模型与稀疏 N-gram 上下文混合的在线无损压缩**

***

**Abstract:** We present StateSMix, a fully self-contained lossless compressor that couples an online-trained Mamba-style State Space Model (SSM) with sparse n-gram context mixing and arithmetic coding. The model is initialised from scratch and trained token-by-token on the file being compressed, requiring no pre-trained weights, no GPU, and no external dependencies.

**摘要：** 我们提出了 StateSMix，这是一种完全自包含的无损压缩器，它将在线训练的 Mamba 风格状态空间模型（SSM）与稀疏 N-gram 上下文混合及算术编码相结合。该模型从零开始初始化，并针对待压缩文件进行逐个 Token 的训练，无需预训练权重、无需 GPU，也不依赖任何外部库。

***

The SSM (DM=32, NL=2, approximately 120K active parameters per file) provides a continuously-updated probability estimate over BPE tokens, while nine sparse n-gram hash tables (bigram through 32-gram, 16M slots each) add exact local and long-range pattern memorisation via a softmax-invariant logit-bias mechanism that updates only non-zero-count tokens. An entropy-adaptive scaling mechanism modulates the n-gram contribution based on the SSM's predictive confidence, preventing over-correction when the neural model is already well-calibrated.

该 SSM（模型维度 DM=32，层数 NL=2，每个文件约 12 万个活跃参数）为 BPE Token 提供持续更新的概率估计；同时，九个稀疏 N-gram 哈希表（从双元到 32 元，每个包含 1600 万个槽位）通过一种 Softmax 不变性 Logit 偏置机制，实现了精确的局部和长距离模式记忆，且仅更新非零计数的 Token。一种熵自适应缩放机制会根据 SSM 的预测置信度来调节 N-gram 的贡献，从而在神经模型已经校准良好的情况下，防止过度修正。

***

On the standard enwik8 benchmark, StateSMix achieves 2.123 bpb on 1 MB, 2.149 bpb on 3 MB, and 2.162 bpb on 10 MB, beating xz -9e (LZMA2) by 8.7%, 5.4%, and 0.7% respectively. Ablation experiments establish the SSM as the dominant compression engine: it alone accounts for a 46.6% size reduction over a frequency-count baseline and beats xz without any n-gram component, while n-gram tables provide a complementary 4.1% gain through exact context memorisation.

在标准的 enwik8 基准测试中，StateSMix 在 1 MB、3 MB 和 10 MB 文件上分别达到了 2.123 bpb、2.149 bpb 和 2.162 bpb 的压缩率，分别比 xz -9e (LZMA2) 优越 8.7%、5.4% 和 0.7%。消融实验证实了 SSM 是主要的压缩引擎：仅凭 SSM 本身，相比频率计数基准就能实现 46.6% 的尺寸缩减，且在没有任何 N-gram 组件的情况下也能击败 xz；而 N-gram 表则通过精确的上下文记忆提供了 4.1% 的补充增益。

***

OpenMP parallelisation of the training loop yields 1.9x speedup on 4 cores. The system is implemented in pure C with AVX2 SIMD and processes approximately 2,000 tokens per second on commodity x86-64 hardware.

训练循环的 OpenMP 并行化在 4 核处理器上实现了 1.9 倍的加速。该系统使用纯 C 语言实现并结合了 AVX2 SIMD 指令集，在普通 x86-64 硬件上每秒可处理约 2,000 个 Token。
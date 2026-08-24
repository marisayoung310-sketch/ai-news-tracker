---
title: "Learn-by-Wire Training Control Governance: Bounded Autonomous Training Under Stress for Stability and Efficiency"
originalUrl: "https://arxiv.org/abs/2605.19008"
date: "2026-05-20T23:02:57.240Z"
---

# Learn-by-Wire Training Control Governance: Bounded Autonomous Training Under Stress for Stability and Efficiency
# Learn-by-Wire 训练控制治理：压力下实现稳定与高效的受限自主训练

**Abstract:** Modern language-model training is increasingly exposed to instability, degraded runs, and wasted compute, especially under aggressive learning-rate, scale, and runtime-stress conditions. This paper introduces Learn-by-Wire Guard (LBW-Guard), a bounded autonomous training-control governance layer that operates above AdamW. Rather than replacing the optimizer update rule, LBW-Guard observes training telemetry, interprets instability-sensitive regimes, and applies bounded control to optimizer execution while preserving fixed training objectives.

**摘要：** 现代语言模型训练日益面临不稳定性、运行退化以及计算资源浪费的问题，尤其是在激进的学习率、大规模参数及运行时压力条件下。本文介绍了 Learn-by-Wire Guard (LBW-Guard)，这是一个运行在 AdamW 之上的受限自主训练控制治理层。LBW-Guard 并非取代优化器的更新规则，而是通过观察训练遥测数据，识别对不稳定性敏感的机制，并在保持既定训练目标的同时，对优化器的执行施加受限控制。

We evaluate LBW-Guard in a Qwen2.5-centered stress-and-robustness suite using WikiText-103, with Qwen2.5-7B as the empirical anchor, model-size comparisons against Qwen2.5-3B and Qwen2.5-14B, learning-rate stress tests, gradient-clipping baselines, and a no-LoRA TinyLlama-1B full-parameter sanity check. In the 7B reference setting, LBW-Guard reduces final perplexity from 13.21 to 10.74, an 18.7% improvement, while reducing end-to-end time from 392.54s to 357.02s, a 1.10x speedup.

我们在以 Qwen2.5 为核心的压力与鲁棒性测试套件中评估了 LBW-Guard，使用了 WikiText-103 数据集，并以 Qwen2.5-7B 作为实证基准，同时对比了 Qwen2.5-3B 和 Qwen2.5-14B 的模型规模，进行了学习率压力测试、梯度裁剪基准测试，以及无 LoRA 的 TinyLlama-1B 全参数完整性检查。在 7B 参考设置下，LBW-Guard 将最终困惑度（perplexity）从 13.21 降低至 10.74，提升了 18.7%，同时将端到端训练时间从 392.54 秒缩短至 357.02 秒，实现了 1.10 倍的加速。

Under stronger learning-rate stress, AdamW degrades to 1885.24 final perplexity at LR=3e-3 and 659.76 at LR=1e-3, whereas LBW-Guard remains trainable at 11.57 and 10.33, respectively. Gradient-clipping baselines do not reproduce this effect. These results support a scoped systems conclusion that stability-sensitive LLM training can benefit from a governance plane above the optimizer. LBW-Guard provides evidence that bounded runtime control can preserve productive compute under stress while remaining distinct from optimizer replacement and local gradient suppression.

在更强的学习率压力下，AdamW 在 LR=3e-3 时最终困惑度退化至 1885.24，在 LR=1e-3 时退化至 659.76；而 LBW-Guard 依然保持可训练状态，困惑度分别为 11.57 和 10.33。梯度裁剪基准测试无法复现此效果。这些结果支持了一个系统层面的结论：对稳定性敏感的大语言模型训练可以从优化器之上的治理层中获益。LBW-Guard 证明了受限的运行时控制能够在压力下保持高效计算，且不同于优化器替换或局部梯度抑制。
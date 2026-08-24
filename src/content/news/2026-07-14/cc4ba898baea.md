---
title: "Signed Symmetric Quantization for Few-Bit Integers"
originalUrl: "https://arxiv.org/abs/2607.08779"
date: "2026-07-13T22:23:36.881Z"
---

# Signed Symmetric Quantization for Few-Bit Integers
# 针对低位整数的有符号对称量化

**Abstract:** The signed integer alphabet contains one more negative representable value than positive. Yet, by convention, the standard symmetric integer quantizer fixes its scale to be strictly positive, which assigns this extra representable value to the negative tail and can force clipping of positive outliers. In this work, we show that, at few-bit precision, such clipping is a non-trivial source of quantization error.

**摘要：** 有符号整数的表示范围中，负数的可表示值比正数多一个。然而，按照惯例，标准的对称整数量化器将其缩放比例（scale）固定为严格正数，这会将这个额外的可表示值分配给负数尾部，从而可能导致正数异常值被强制截断。在这项工作中，我们证明在低位精度下，这种截断是量化误差的一个重要来源。

Asymmetric quantization addresses this problem with a zero point, shifting the grid toward the observed data range; however, this flexibility is well-known to carry a runtime penalty. For example, in this http URL on an AMD EPYC(TM) "Turin" CPU, a 4-bit symmetric format uses up to 9% less memory with up to 2.45$\times$ higher throughput than its asymmetric counterpart.

非对称量化通过引入零点（zero point）解决了这个问题，将量化网格向观测到的数据范围偏移；然而，众所周知，这种灵活性会带来运行时的性能损耗。例如，在 AMD EPYC(TM) "Turin" CPU 上，4 位对称格式比非对称格式节省高达 9% 的内存，且吞吐量提升高达 2.45 倍。

We highlight signed symmetric quantization as a third option that retains the runtime profile of symmetric quantization without the penalty of the asymmetric format: our signed absmax grid places the extra representable value on the dominant-outlier tail through a principled and lightweight sign selection rule while keeping the zero point at zero.

我们提出“有符号对称量化”作为第三种选择，它既保留了对称量化的运行时性能，又避免了非对称格式的性能损耗：我们的有符号绝对值最大（signed absmax）网格通过一种原则性且轻量级的符号选择规则，将额外的可表示值放置在占主导地位的异常值尾部，同时保持零点不变。

Our theoretical analysis offers two main results. First, we establish the signed absmax grid as conditionally bound-optimal on $\ell_2$ quantization error, and show that the condition holds for 88-99% of weight groups across pre-trained large language models (LLMs) at low bit widths. Second, we show that negating the scale of a standard symmetric quantizer is analytically equivalent to a unit zero point shift on the same signed integer alphabet.

我们的理论分析提供了两个主要结果。首先，我们确立了有符号绝对值最大网格在 $\ell_2$ 量化误差上具有条件边界最优性，并证明该条件在低位宽下，适用于预训练大语言模型（LLM）中 88-99% 的权重组。其次，我们证明了对标准对称量化器的缩放比例取负，在分析上等同于在相同的有符号整数表示中进行单位零点偏移。

We empirically validate our proposal on models from the Qwen3, Qwen3.5, and Llama3 families, and observe improvement in perplexity and downstream few-shot accuracy over the standard unsigned symmetric quantizer at no extra inference cost.

我们在 Qwen3、Qwen3.5 和 Llama3 系列模型上对我们的方案进行了实证验证，结果表明，在不增加额外推理成本的情况下，该方法在困惑度（perplexity）和下游少样本（few-shot）准确率方面均优于标准的无符号对称量化器。
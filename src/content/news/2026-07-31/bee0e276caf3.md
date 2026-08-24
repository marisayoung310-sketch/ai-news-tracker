---
title: "Between Gradient and Natural Gradient: A Continuum of LoRA Initializations"
originalUrl: "https://arxiv.org/abs/2607.26247"
date: "2026-07-30T22:37:32.876Z"
---

# Between Gradient and Natural Gradient: A Continuum of LoRA Initializations
# 梯度与自然梯度之间：LoRA 初始化的一条连续谱

Low-rank adaptation (LoRA) fine-tunes large pretrained models at a fraction of the cost of full fine-tuning, but its performance depends strongly on how the adapters are initialized.
低秩自适应（LoRA）以全量微调的一小部分成本对大型预训练模型进行微调，但其性能在很大程度上取决于适配器（adapters）的初始化方式。

Recent schemes initialize the adapters from the downstream loss gradient: some project the raw gradient onto its top directions, while others first whiten it with an estimate of the loss curvature.
近期的方案通过下游损失梯度来初始化适配器：一些方法将原始梯度投影到其主要方向上，而另一些方法则先利用损失曲率的估计值对其进行白化处理。

We show that these seemingly distinct methods are points on a single continuum: a two-parameter family of preconditioned gradient initializations, which we call Unified LoRA (ULoRA), governed by a spectral whitening exponent and an Adam-like diagonal exponent.
我们证明了这些看似截然不同的方法实际上位于同一条连续谱上：这是一个由两个参数控制的预处理梯度初始化族，我们将其称为统一 LoRA（ULoRA），它由谱白化指数和类 Adam 对角线指数共同决定。

Sweeping this family under a full learning-rate search, we find that no single fixed preconditioning strength dominates: the best operating point is task-dependent and frequently lies strictly inside the family, away from the published endpoints.
在全学习率搜索下对该族进行遍历后，我们发现没有任何单一的固定预处理强度具有绝对优势：最佳工作点取决于具体任务，且通常位于该族内部，而非已发表文献中的端点处。

Treated as an upper bound of this family, a tuned ULoRA configuration matches or exceeds full fine-tuning on all five GLUE tasks with RoBERTa-base and is competitive with the strongest baselines on GSM8K with LLaMA-2-7B.
作为该族的一个上限，经过调优的 ULoRA 配置在 RoBERTa-base 的全部五个 GLUE 任务上达到或超过了全量微调的效果，并在 LLaMA-2-7B 的 GSM8K 任务上与最强基准线具有竞争力。

Our deployable, search-free variant, ULoRA-Auto, selects per-layer exponents from measured spectral statistics, approaches this upper bound at no additional search cost, and ranks at or near the top among deployable LoRA methods.
我们可部署且无需搜索的变体 ULoRA-Auto，通过测量的谱统计数据选择逐层指数，在无需额外搜索成本的情况下接近这一上限，并在可部署的 LoRA 方法中名列前茅。

Our results show that a principled design space for LoRA initialization and curvature preconditioning should be treated as a tunable dimension rather than a fixed design decision.
我们的研究结果表明，LoRA 初始化和曲率预处理的原则性设计空间应被视为一个可调维度，而非固定的设计决策。
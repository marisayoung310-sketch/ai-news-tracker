---
title: "Weibull Weight-Scale Parameter Evolution under AdamW Training Dynamics"
originalUrl: "https://arxiv.org/abs/2606.19367"
date: "2026-06-19T22:23:53.145Z"
---

# Weibull Weight-Scale Parameter Evolution under AdamW Training Dynamics
# AdamW 训练动态下 Weibull 权重尺度参数的演变

**Abstract:** Building on a two-parameter Weibull framework for diagnosing transformer weight distributions, we study why the Weibull weight-scale parameter $\lambda$ grows, overshoots, and then relaxes during AdamW training. 

**摘要：** 基于用于诊断 Transformer 权重分布的双参数 Weibull 框架，我们研究了在 AdamW 训练过程中，Weibull 权重尺度参数 $\lambda$ 为何会经历增长、过冲（overshoot）以及随后的回落过程。

We derive a leading-order three-force decomposition of the squared weight norm from the AdamW update: an alignment force measuring the correlation between weights and the adaptive update direction, an injection force from adaptive step magnitude, and a decay force from decoupled weight decay. 

我们从 AdamW 更新公式中推导出了权重平方范数的一阶三力分解：一种衡量权重与自适应更新方向之间相关性的“对齐力”（alignment force）、一种源自自适应步长幅度的“注入力”（injection force），以及一种源自解耦权重衰减的“衰减力”（decay force）。

On self-trained Pythia-70M models with ground-truth optimizer moments, alignment dominates the rise phase, contributing 88-94% of the absolute force budget across four random seeds and remaining robust to super-weight removal. 

在具有真实优化器动量的自训练 Pythia-70M 模型上，对齐力在上升阶段占据主导地位，在四个随机种子实验中贡献了 88-94% 的绝对力预算，并且在剔除超大权重（super-weight）后依然保持稳健。

Near saturation, alignment and decay approach balance, explaining the transition from weight-scale growth to relaxation. These force dynamics directly govern the squared-norm component underlying $\lambda(t)$; the remaining RMS-to-Weibull reconstruction offset is measurable and decomposes into bridge and integration components, totaling approximately 5-6% in densely sampled regions. 

在接近饱和时，对齐力和衰减力趋于平衡，这解释了权重尺度从增长到回落的转变。这些力学动态直接决定了 $\lambda(t)$ 底层的平方范数分量；剩余的 RMS 到 Weibull 重建偏移量是可测量的，并可分解为桥接（bridge）和积分（integration）分量，在密集采样区域总计约占 5-6%。

To extend the analysis to real models where optimizer moments are unavailable, we introduce a spline displacement method that recovers the alignment force from sparse checkpoints with approximately 92-94% accuracy, about twice the naive two-point baseline. 

为了将该分析扩展到无法获取优化器动量的真实模型，我们引入了一种样条位移法（spline displacement method），该方法能从稀疏检查点中恢复对齐力，准确率约为 92-94%，约为朴素两点基准方法的两倍。

We further observe that the peak value of $\lambda(t)$ varies with training-data coherence in our experiments, suggesting a data-dependent component of weight-scale growth that we leave to a controlled follow-up study. Code and data are available at this https URL.

我们进一步观察到，在我们的实验中，$\lambda(t)$ 的峰值随训练数据的相干性而变化，这表明权重尺度增长中存在一个依赖于数据的分量，我们将这一问题留待后续的对照研究中探讨。代码和数据可在该链接获取。
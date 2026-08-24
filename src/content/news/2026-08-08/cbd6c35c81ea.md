---
title: "The Ignition Index: Measuring Global Workspace Dynamics in Language Models"
originalUrl: "https://arxiv.org/abs/2608.05160"
date: "2026-08-07T22:04:13.250Z"
---

# The Ignition Index: Measuring Global Workspace Dynamics in Language Models
# 点火指数：衡量语言模型中的全局工作空间动力学

**Abstract:** We introduce the Ignition Index (I), a validated scalar metric that operationalizes Global Workspace Theory's (GWT) all-or-none ignition prediction in transformer language models. The metric fits a four-parameter sigmoid to per-layer linear probe accuracy as a function of input signal strength, extracting steepness parameter beta-hat: high values indicate abrupt, ignition-like transitions; low values indicate graded build-up.

**摘要：** 我们引入了“点火指数”（Ignition Index, I），这是一种经过验证的标量指标，旨在将全局工作空间理论（GWT）中“全或无”的点火预测应用于 Transformer 语言模型。该指标通过将四参数 Sigmoid 函数拟合至各层的线性探测准确率（作为输入信号强度的函数），提取出陡度参数 beta-hat：高值表示突发性的、类似点火的转换；低值则表示渐进式的积累。

Across 11 models spanning five architecture families, shuffled-label controls demonstrate 9.6-fold selectivity for genuine linguistic structure over spurious probe capacity (p < 0.001, Mann-Whitney U-test). We find: (1) Feedforward transformers exceed SSMs by 89% in aggregate beta-hat (p < 1e-13, Cohen's d = 0.52), with Mamba exhibiting near-linear profiles consistent with absent global broadcast.

在涵盖五个架构系列的 11 个模型中，通过标签混洗对照实验证明，该指标对真实语言结构的识别选择性是虚假探测能力的 9.6 倍（p < 0.001，曼-惠特尼 U 检验）。我们发现：（1）前馈 Transformer 在总 beta-hat 值上比状态空间模型（SSM）高出 89%（p < 1e-13，Cohen's d = 0.52），其中 Mamba 模型表现出近乎线性的特征，这与缺乏全局广播的假设一致。

(2) Huginn-3.5B exhibits 2.12-fold higher ignition along its iteration axis than its depth axis, demonstrating that recurrent architectures manifest workspace-like transitions along the recurrence dimension. (3) Pythia-410M shows a PELT-detected phase transition at training step 256 (+67%), preceding induction-head formation.

（2）Huginn-3.5B 模型在其迭代轴上的点火程度比深度轴高出 2.12 倍，这表明循环架构在循环维度上表现出了类似工作空间的转换。（3）Pythia-410M 模型在训练步数 256 时表现出由 PELT 算法检测到的相变（+67%），这一现象先于归纳头（induction-head）的形成。

(4) Hypotheses linking ignition to model scale and signal strength were not confirmed, suggesting transformer architectures may saturate available ignition mechanisms. The Ignition Index provides the first validated quantitative bridge between GWT's dynamical predictions and mechanistic interpretability, with 9.6-fold measurement selectivity and architecture-level discriminability not previously characterized in the scaling literature.

（4）将点火与模型规模及信号强度联系起来的假设未得到证实，这表明 Transformer 架构可能已经饱和了现有的点火机制。“点火指数”为 GWT 的动力学预测与机械可解释性之间提供了首个经过验证的定量桥梁，其 9.6 倍的测量选择性和架构级辨别力在以往的缩放比例（scaling）文献中尚未被表征。
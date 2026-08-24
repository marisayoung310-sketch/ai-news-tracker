---
title: "Guarantees on Dynamical System Distinguishability for LLM Token Generation"
originalUrl: "https://arxiv.org/abs/2607.28667"
date: "2026-08-03T22:37:54.278Z"
---

### Guarantees on Dynamical System Distinguishability for LLM Token Generation
### 关于大语言模型 Token 生成的动力系统可区分性保证

**Abstract:** Recent work has shown that classifying large language models (LLMs)' responses can be distinguished by modeling token embeddings as trajectories of a black-box dynamical system (DS) and comparing prediction residuals of two DSs. Despite the empirical success of this dynamical approach, a theoretical understanding of why it works, how well it scales as a function of the token sequence, and when it transfers across embedding models remains lacking.

**摘要：** 近期研究表明，通过将 Token 嵌入建模为黑盒动力系统（DS）的轨迹，并比较两个动力系统的预测残差，可以对大语言模型（LLM）的响应进行分类和区分。尽管这种动力学方法在实证上取得了成功，但关于其为何有效、随 Token 序列长度的扩展性如何，以及何时能在不同嵌入模型间迁移，目前仍缺乏理论上的理解。

We address these questions by formalizing the classification task as a binary hypothesis test between two stochastic linear DSs. We show that the total variation distance between the stationary marginal distributions of the two DSs can be arbitrarily small even when the dynamics differ substantially, which provides a fundamental accuracy floor for any classifier that ignores token dynamics.

我们通过将分类任务形式化为两个随机线性动力系统之间的二元假设检验，解决了上述问题。我们证明，即使两个系统的动力学特征存在显著差异，它们平稳边缘分布之间的总变差距离（Total Variation Distance）仍可能任意小；这为任何忽略 Token 动力学的分类器提供了一个基础的准确率下限。

We then show that the misclassification probability of DS-based classification decays exponentially in the sequence length $L$, with the decay governed by a dynamical discriminability quantity $\delta^2$ that captures the spectral distance between the two DSs. We also characterize cross-embedding generalization by introducing an approximate intertwining condition between embedding models and establishing a lower bound on the transferable discriminability in terms of the intertwining map's smallest singular value.

随后，我们证明了基于动力系统的分类方法，其误分类概率随序列长度 $L$ 呈指数级衰减，衰减速度由捕捉两个动力系统间谱距离的动力学可区分性量 $\delta^2$ 所决定。此外，我们通过引入嵌入模型之间的近似交织条件（Approximate Intertwining Condition），并根据交织映射的最小奇异值建立可迁移可区分性的下界，刻画了跨嵌入模型的泛化能力。

Together, these results explain the empirical performance of DS-based classification and motivate further investigation into using DS theory to analyze AI systems, in contrast to the more common approach of using AI to model dynamical systems.

总之，这些结果解释了基于动力系统分类方法的实证表现，并推动了利用动力系统理论来分析人工智能系统的进一步研究，这与目前利用人工智能来建模动力系统的常见方法形成了对比。
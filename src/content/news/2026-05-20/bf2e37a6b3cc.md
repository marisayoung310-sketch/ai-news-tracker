---
title: "Mirror Descent-Type Algorithms for the Variational Inequality Problem with Functional Constraints"
originalUrl: "https://arxiv.org/abs/2605.16262"
date: "2026-05-19T22:54:41.136Z"
---

# Mirror Descent-Type Algorithms for the Variational Inequality Problem with Functional Constraints
# 具有函数约束的变分不等式问题的镜像下降型算法

**Abstract:** Variational inequalities play a key role in machine learning research, such as generative adversarial networks, reinforcement learning, adversarial training, and generative models. This paper is devoted to the constrained variational inequality problems with functional constraints (inequality-type constraints). 

**摘要：** 变分不等式在机器学习研究中发挥着关键作用，例如生成对抗网络、强化学习、对抗性训练和生成模型。本文致力于研究具有函数约束（不等式类型约束）的约束变分不等式问题。

We propose some mirror descent-type algorithms that switch between productive and non-productive steps depending on the values of the functional constraints at iterations, with many different step size rules and stopping criteria. 

我们提出了一些镜像下降型算法，这些算法根据迭代过程中函数约束的值，在有效步（productive steps）和无效步（non-productive steps）之间进行切换，并采用了多种不同的步长规则和停止准则。

We analyze the proposed algorithms and prove their optimal convergence rate to achieve a solution with desired accuracy, for problems with bounded and monotone operators and Lipschitz convex functional constraints. 

我们对所提出的算法进行了分析，并证明了它们在处理具有有界单调算子和 Lipschitz 连续凸函数约束的问题时，能够以最优收敛速度达到预期的精度解。

In addition, we propose a modification of the proposed algorithms by considering each functional constraint in the calculation when we have a productive step, as well as the first constraint that violates the feasibility. This modification can save the running time of algorithms when we have many functional constraints. 

此外，我们对所提算法进行了改进：在执行有效步时，不仅考虑每个函数约束，还考虑第一个违反可行性的约束。当存在大量函数约束时，这种改进可以节省算法的运行时间。

In addition, we provide an analysis of the proposed algorithms for $\delta$-monotone operators, allowing us to apply the proposed algorithms, as a special case, to constrained minimization problems when we do not have access to the exact information about the subgradient of the objective function. 

此外，我们还针对 $\delta$-单调算子对所提算法进行了分析，这使得我们可以将这些算法作为一种特殊情况，应用于无法获取目标函数次梯度精确信息时的约束最小化问题。

Numerical experiments that illustrate the work and performance of the proposed algorithms are also given.

文中还提供了数值实验，用以说明所提算法的工作原理及性能。
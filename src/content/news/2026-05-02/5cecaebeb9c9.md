---
title: "Compositional Meta-Learning for Mitigating Task Heterogeneity in Physics-Informed Neural Networks"
originalUrl: "https://arxiv.org/abs/2604.26999"
date: "2026-05-01T22:27:12.594Z"
---

# Compositional Meta-Learning for Mitigating Task Heterogeneity in Physics-Informed Neural Networks
# 用于缓解物理信息神经网络中任务异构性的组合元学习

**Abstract:** Physics-informed neural networks (PINNs) approximate solutions of partial differential equations (PDEs) by embedding physical laws into the loss function. In parameterized PDE families, variations in coefficients or boundary/initial conditions define distinct tasks. This makes training individual PINNs for each task computationally prohibitive, while cross-task transfer can be sensitive to task heterogeneity.

**摘要：** 物理信息神经网络（PINNs）通过将物理定律嵌入损失函数来近似偏微分方程（PDEs）的解。在参数化 PDE 族中，系数或边界/初始条件的变化定义了不同的任务。这使得为每个任务单独训练 PINN 在计算上代价高昂，且跨任务迁移可能对任务异构性非常敏感。

While meta-learning can reduce retraining cost, existing methods often rely on a single global initialization and may suffer from negative transfer, particularly under feature-scarce coordinate inputs and limited training-task availability. We propose the Learning-Affinity Adaptive Modular Physics-Informed Neural Network (LAM-PINN), a compositional framework that leverages task-specific learning dynamics.

虽然元学习可以降低重新训练的成本，但现有方法通常依赖于单一的全局初始化，并且可能会遭受负迁移的影响，特别是在特征稀缺的坐标输入和有限的训练任务可用性下。我们提出了学习亲和力自适应模块化物理信息神经网络（LAM-PINN），这是一种利用任务特定学习动态的组合框架。

LAM-PINN combines PDE parameters with learning-affinity metrics from brief transfer sessions to construct a task representation and cluster tasks even with coordinate-only inputs. It decomposes the model into cluster-specialized subnetworks and a shared meta network, and learns routing weights to selectively reuse modules instead of relying on a single global initialization.

LAM-PINN 将 PDE 参数与来自简短迁移会话的学习亲和力指标相结合，以构建任务表示，即使在仅有坐标输入的情况下也能对任务进行聚类。它将模型分解为特定于聚类的子网络和一个共享的元网络，并学习路由权重以选择性地重用模块，而不是依赖于单一的全局初始化。

Across three PDE benchmarks, LAM-PINN achieves an average 19.7-fold reduction in mean squared error (MSE) on unseen tasks using only 10% of the training iterations required by conventional PINNs. These results indicate its effectiveness for generalization to unseen configurations within bounded design spaces of parameterized PDE families in resource-constrained engineering settings.

在三个 PDE 基准测试中，LAM-PINN 在未见任务上的均方误差（MSE）平均降低了 19.7 倍，而训练迭代次数仅为传统 PINN 所需的 10%。这些结果表明，在资源受限的工程环境中，该方法对于参数化 PDE 族有界设计空间内的未见配置具有有效的泛化能力。
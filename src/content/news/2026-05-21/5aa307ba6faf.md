---
title: "Robust Basis Spline Decoupling for the Compression of Transformer Models"
originalUrl: "https://arxiv.org/abs/2605.18794"
date: "2026-05-20T23:14:53.094Z"
---

# Robust Basis Spline Decoupling for the Compression of Transformer Models
# 用于 Transformer 模型压缩的鲁棒基样条解耦方法

**Abstract:** Decoupling is a powerful modeling paradigm for representing multivariate functions as compositions of linear transformations and univariate nonlinear functions. A single-layer decoupling can be viewed as a fully connected neural network with a single hidden layer and flexible activation functions, providing a direct link with neural networks. Because of this, the use of decoupling methods has gained increasing attention in neural network domains, particularly compression, since it enables structured approximations with reduced parameter complexity.

**摘要：** 解耦是一种强大的建模范式，用于将多元函数表示为线性变换和单变量非线性函数的组合。单层解耦可以被视为一个具有单隐藏层和灵活激活函数的全连接神经网络，从而与神经网络建立了直接联系。正因如此，解耦方法在神经网络领域（特别是模型压缩）中受到了越来越多的关注，因为它能够实现参数复杂度降低的结构化近似。

Existing tensor-based decoupling methods typically rely on polynomial or piecewise-linear parameterizations of the internal nonlinear functions, which can suffer from numerical instability or limited expressiveness. In this work, we introduce a B-spline-based decoupling framework that generalizes these existing approaches. By exploiting the local support and flexible smoothness control of B-splines, the proposed formulation yields a more numerically stable and expressive representation.

现有的基于张量的解耦方法通常依赖于内部非线性函数的多项式或分段线性参数化，这可能会导致数值不稳定或表达能力受限。在这项工作中，我们引入了一种基于 B 样条（B-spline）的解耦框架，该框架推广了这些现有方法。通过利用 B 样条的局部支撑特性和灵活的平滑度控制，所提出的公式能够产生更具数值稳定性和表达能力的表示。

We derive a constrained coupled matrix-tensor factorization and propose a robust alternating least-squares algorithm, called R-CMTF-BSD, incorporating normalization and Tikhonov regularization. The proposed method is validated through experiments on synthetic data and transformer model compression. Results on the Vision and Swin Transformer architectures demonstrate that B-spline decoupling enables substantial parameter reduction while maintaining competitive accuracy, making the R-CMTF-BSD algorithm a promising tool for structured neural network compression.

我们推导了一种约束耦合矩阵-张量分解方法，并提出了一种名为 R-CMTF-BSD 的鲁棒交替最小二乘算法，该算法结合了归一化和 Tikhonov 正则化。我们通过合成数据和 Transformer 模型压缩实验验证了所提方法。在 Vision Transformer 和 Swin Transformer 架构上的结果表明，B 样条解耦能够在保持竞争性精度的同时实现显著的参数缩减，这使得 R-CMTF-BSD 算法成为结构化神经网络压缩的一种极具前景的工具。
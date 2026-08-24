---
title: "LiNO: Lifting based multiresolution neural operator"
originalUrl: "https://arxiv.org/abs/2607.02715"
date: "2026-07-07T22:41:01.956Z"
---

# LiNO: Lifting based multiresolution neural operator
# LiNO：基于提升方案的多分辨率神经算子

**Abstract:** Recently, neural operators have shown promising outcomes for learning solution operators of differential equations directly from data. This framework learns a functional mapping from the parameter field to the solution field, enabling the prediction of an entire class of solutions rather than a specific instance.
**摘要：** 近年来，神经算子在直接从数据中学习微分方程解算子方面展现出了广阔的前景。该框架学习从参数场到解场的函数映射，从而能够预测一整类解，而不仅仅是特定的实例。

However, existing operators often struggle to capture both global dynamics and fine-scale structure simultaneously. To design an effective operator capable of representing multiscale features, a hierarchical multiscale decomposition framework is required.
然而，现有的算子往往难以同时捕捉全局动力学和精细尺度结构。为了设计出能够表征多尺度特征的有效算子，需要一个分层的多尺度分解框架。

In this study, we develop the Lifting Neural Operator (LiNO), a multiresolution operator built on the second-generation wavelet lifting scheme. LiNO learns a multiresolution decomposition directly from data by parameterizing the lifting transform.
在本研究中，我们开发了提升神经算子（LiNO），这是一种基于第二代小波提升方案构建的多分辨率算子。LiNO 通过对提升变换进行参数化，直接从数据中学习多分辨率分解。

This lifting transformation is adaptive to the underlying solution function and exactly invertible by construction, enabling information-preserving multiscale operator learning. In the lifted multiresolution space, the operator evolves coarse and directional detail coefficients separately, resulting in scale-aware modeling of the underlying physics.
这种提升变换能够适应底层的解函数，并且在构造上是精确可逆的，从而实现了信息保持的多尺度算子学习。在提升后的多分辨率空间中，该算子分别演化粗尺度系数和方向性细节系数，从而实现了对底层物理过程的尺度感知建模。

We evaluate LiNO on several benchmarks, including Darcy flow, the Poisson equation, the Allen-Cahn equation, the compressible Navier-Stokes equation, and the Gray-Scott reaction-diffusion system. Together, these benchmarks cover a wide range of physical behaviors, including multiscale phenomena, transport-dominated dynamics, and chaotic systems.
我们在多个基准测试上评估了 LiNO，包括达西流（Darcy flow）、泊松方程（Poisson equation）、Allen-Cahn 方程、可压缩纳维-斯托克斯方程（Navier-Stokes equation）以及 Gray-Scott 反应扩散系统。这些基准测试共同涵盖了广泛的物理行为，包括多尺度现象、输运主导的动力学以及混沌系统。

LiNO demonstrates strong performance on these challenging benchmarks compared with state-of-the-art neural operators. These results suggest that adaptive multiresolution operators provide a promising direction for scientific machine learning.
与最先进的神经算子相比，LiNO 在这些具有挑战性的基准测试中表现出了强大的性能。这些结果表明，自适应多分辨率算子为科学机器学习提供了一个有前景的发展方向。
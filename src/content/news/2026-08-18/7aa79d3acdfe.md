---
title: "L-FNO: Lorentzian Fourier Neural Operator for Stochastic Event Dynamics"
originalUrl: "https://arxiv.org/abs/2608.13562"
date: "2026-08-17T21:55:36.559Z"
---

# L-FNO: Lorentzian Fourier Neural Operator for Stochastic Event Dynamics
# L-FNO：用于随机事件动力学的洛伦兹傅里叶神经算子

**Abstract:** Modern operational systems face uncertainty even in routine conditions, where rare, bursty, and self-exciting events emerge from both exogenous covariates and endogenous event dynamics.
**摘要：** 现代操作系统即使在常规条件下也面临不确定性，其中罕见、突发和自激事件既源于外生协变量，也源于内生事件动力学。

Standard neural operators are typically trained as regression-style function-to-function models rather than conditional-intensity estimators, limiting their suitability for sparse event regimes.
标准的神经算子通常被训练为回归式的函数到函数模型，而非条件强度估计器，这限制了它们在稀疏事件场景下的适用性。

We introduce the Lorentzian Fourier Neural Operator (L-FNO), a stochastic neural operator that combines an FNO-style covariate path, Lorentzian spectral kernels for history-dependent excitation, and a likelihood-based training objective.
我们引入了洛伦兹傅里叶神经算子（L-FNO），这是一种随机神经算子，它结合了 FNO 风格的协变量路径、用于历史依赖激发的洛伦兹谱核，以及基于似然的训练目标。

We evaluate L-FNO on eight synthetic point-process benchmarks and three real-world datasets covering disease outbreak prediction and semiconductor fault or defect detection.
我们在八个合成点过程基准测试和三个涵盖疾病爆发预测及半导体故障或缺陷检测的真实世界数据集上对 L-FNO 进行了评估。

L-FNO improves event likelihood, calibration diagnostics, and rare-event detection over regression- and likelihood-based neural operator baselines.
与基于回归和似然的神经算子基线相比，L-FNO 在事件似然性、校准诊断和罕见事件检测方面均有所提升。

These results show that structured spectral memory and likelihood-based learning provide effective inductive biases for neural operator models of stochastic event dynamics.
这些结果表明，结构化谱记忆和基于似然的学习为随机事件动力学的神经算子模型提供了有效的归纳偏置。
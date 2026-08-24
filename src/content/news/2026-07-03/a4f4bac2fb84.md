---
title: "SNAP-FM: Sparse Nonlinear Accelerated Projection for Physics-Constrained Generative Modeling"
originalUrl: "https://arxiv.org/abs/2607.00095"
date: "2026-07-02T22:39:36.674Z"
---

# SNAP-FM: Sparse Nonlinear Accelerated Projection for Physics-Constrained Generative Modeling
# SNAP-FM：用于物理约束生成建模的稀疏非线性加速投影

**Abstract:** Generative models have emerged as scalable surrogates for physical simulation, yet they offer no guarantee that their outputs respect the conservation laws, boundary conditions, and nonlinear invariants that govern the underlying physics. 
**摘要：** 生成模型已成为物理模拟的可扩展替代方案，但它们无法保证其输出结果能够遵循支配底层物理规律的守恒定律、边界条件和非线性不变量。

Constrained sampling closes this gap, enforcing such constraints exactly at inference time without retraining, but at a computational cost: projection, correction, and trajectory-optimization steps are repeated during sampling, with these steps becoming expensive for nonlinear constraints. 
约束采样弥补了这一差距，它无需重新训练即可在推理阶段精确执行此类约束，但需要付出计算成本：在采样过程中，投影、校正和轨迹优化步骤需要反复执行，而对于非线性约束，这些步骤的计算开销会变得非常昂贵。

Standard ML frameworks exacerbate this: their dense tensor algebra and limited sparse solver composability obscure the structure that physical constraints naturally induce, making efficient batched nonlinear optimization difficult to realize in practice. 
标准的机器学习框架加剧了这一问题：其稠密张量代数和有限的稀疏求解器组合能力掩盖了物理约束自然诱导出的结构，使得在实践中难以实现高效的批量非线性优化。

We address this bottleneck by exploiting the structure that sample-wise batching and local PDE couplings induce in the projection subproblems -- namely, block-sparse Jacobian and KKT systems -- exposing this structure using this http URL and solving the resulting sparse nonlinear programs with this http URL and GPU sparse factorization. 
我们通过利用样本级批处理和局部偏微分方程（PDE）耦合在投影子问题中诱导出的结构（即块稀疏雅可比矩阵和 KKT 系统）来解决这一瓶颈，利用该 URL 暴露此结构，并使用该 URL 和 GPU 稀疏分解来求解所得的稀疏非线性规划问题。

Applied to Physics-Constrained Flow Matching (PCFM), on PDE benchmarks with linear, nonlinear, one-dimensional, and two-dimensional constraints, this approach accelerates nonlinear constraint projection while maintaining constraint satisfaction. 
该方法应用于物理约束流匹配（PCFM），在包含线性、非线性、一维和二维约束的 PDE 基准测试中，在保持约束满足的同时加速了非线性约束投影。

These results show that sparse GPU nonlinear optimization is a practical foundation for constrained generative sampling in scientific machine learning. 
这些结果表明，稀疏 GPU 非线性优化是科学机器学习中约束生成采样的实用基础。
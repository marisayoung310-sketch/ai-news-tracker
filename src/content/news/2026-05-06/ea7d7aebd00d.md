---
title: "Sparse Regression under Correlation and Weak Signals: A Reproducible Benchmark of Classical and Bayesian Methods"
originalUrl: "https://arxiv.org/abs/2605.00835"
date: "2026-05-05T22:26:08.949Z"
---

# Sparse Regression under Correlation and Weak Signals: A Reproducible Benchmark of Classical and Bayesian Methods
# 相关性与弱信号下的稀疏回归：经典方法与贝叶斯方法的可复现基准测试

**Abstract:** Choosing between classical and Bayesian sparse regression methods involves a real trade-off: penalized estimators like Lasso run in milliseconds but give no uncertainty estimates, while Horseshoe and Spike-and-Slab priors produce full posteriors but need MCMC chains that take minutes per run. 

**摘要：** 在经典稀疏回归方法与贝叶斯稀疏回归方法之间进行选择时，往往面临着现实的权衡：像 Lasso 这样的惩罚估计器运行速度仅需几毫秒，但无法提供不确定性估计；而 Horseshoe 和 Spike-and-Slab 先验虽然能产生完整的后验分布，却需要运行耗时数分钟的 MCMC 链。

Few studies compare these two families head-to-head under the conditions that actually make sparse regression hard -- correlated features, weak signals, and growing dimensionality. We benchmark six methods (OLS, Ridge, Lasso, Elastic Net, Horseshoe, Spike-and-Slab) on synthetic data with three covariance structures (rho up to 0.9), four SNR levels, and p in {20, 50, 100}, plus the Diabetes dataset, totalling over 2,600 experiments.

很少有研究在真正导致稀疏回归变得困难的条件下（即特征相关、信号微弱以及维度增加）对这两类方法进行直接对比。我们针对六种方法（OLS、Ridge、Lasso、Elastic Net、Horseshoe、Spike-and-Slab）进行了基准测试，使用了包含三种协方差结构（rho 高达 0.9）、四种信噪比（SNR）水平以及 p 取值为 {20, 50, 100} 的合成数据，并结合糖尿病数据集，总计进行了超过 2,600 次实验。

The results are clear on some points and nuanced on others. Bayesian methods win on prediction error (MSE 72 vs. 108-267), and the Horseshoe delivers near-nominal 95% coverage (94.8%). But Spike-and-Slab, despite narrower intervals, under-covers at 91.9% -- its continuous relaxation likely plays a role. For variable selection, Lasso and Spike-and-Slab tie at F1 ~ 0.47, making Lasso the practical default when posteriors are not needed. Code and data are available at this https URL.

实验结果在某些方面非常明确，而在其他方面则呈现出细微差别。贝叶斯方法在预测误差方面表现更优（MSE 为 72，而其他方法为 108-267），且 Horseshoe 方法提供了接近标称的 95% 覆盖率（94.8%）。然而，Spike-and-Slab 方法尽管区间更窄，但覆盖率不足，仅为 91.9%——这很可能是由于其连续松弛（continuous relaxation）导致的。在变量选择方面，Lasso 和 Spike-and-Slab 的 F1 分数持平，约为 0.47，这使得在不需要后验分布的情况下，Lasso 成为实际应用中的首选。代码和数据可在该链接获取。
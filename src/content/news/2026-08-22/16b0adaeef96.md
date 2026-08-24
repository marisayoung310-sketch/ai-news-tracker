---
title: "Quantum Kernel Estimation for the Discovery of Early Lung Cancer Detection"
originalUrl: "https://arxiv.org/abs/2608.19304"
date: "2026-08-21T21:53:23.656Z"
---

# Quantum Kernel Estimation for the Discovery of Early Lung Cancer Detection
# 用于早期肺癌检测的量子核估计

**Abstract:** Lung cancer screening with low-dose chest computed tomography reduces mortality, but its impact is limited by uptake, adherence, and management challenges. Blood-based cell-free DNA (cfDNA) biomarkers offer a complementary approach, although early detection remains difficult because of lung cancer heterogeneity and high-dimensional, nonlinear molecular signals.

**摘要：** 低剂量胸部计算机断层扫描（CT）进行的肺癌筛查虽然能降低死亡率，但其效果受到受检率、依从性及管理挑战的限制。基于血液的游离DNA（cfDNA）生物标志物提供了一种补充方案，然而由于肺癌的异质性以及高维、非线性的分子信号，早期检测仍然十分困难。

We evaluated quantum-classical hybrid machine learning for lung cancer detection using DNA fragmentomics and DNA methylation. After feature selection, models were trained using 20- and 40-feature subsets. Features were encoded into quantum Hilbert space using angle and dense-angle feature maps with multiple entanglement strategies.

我们评估了利用DNA片段组学和DNA甲基化进行肺癌检测的量子-经典混合机器学习方法。在特征选择后，我们分别使用20个和40个特征的子集对模型进行了训练。通过角度和密集角度特征映射，并结合多种纠缠策略，将特征编码到量子希尔伯特空间中。

Fidelity-based quantum kernels were computed with exact statevector simulation and integrated with precomputed-kernel SVM and kernel-PCA logistic regression and compared with an SVM model trained on the original features. This framework enabled systematic evaluation of how encoding and entanglement design affect classification.

基于保真度的量子核通过精确状态向量模拟进行计算，并与预计算核支持向量机（SVM）及核主成分分析（kernel-PCA）逻辑回归相结合，同时与基于原始特征训练的SVM模型进行了对比。该框架实现了对编码和纠缠设计如何影响分类效果的系统性评估。

Across repeated held-out evaluations, quantum-kernel models achieved competitive performance on both datasets. For fragmentomics, several 20-feature configurations improved AUC relative to a classical SVM baseline, suggesting effective capture of nonlinear cfDNA fragmentation structure. For methylation, the classical SVM achieved the highest AUC, although selected quantum models remained competitive and improved specificity in some cases.

在多次留出法评估中，量子核模型在两个数据集上均取得了具有竞争力的表现。在片段组学方面，几种20特征配置的AUC值优于经典SVM基准，表明该方法能有效捕捉非线性的cfDNA片段结构。在甲基化方面，经典SVM取得了最高的AUC，但选定的量子模型依然表现出竞争力，并在某些情况下提高了特异性。

Increasing features from 20 to 40 did not consistently improve performance and often increased variability. Overall, these results support quantum kernel methods as a promising approach for cfDNA-based lung cancer detection.

将特征数量从20增加到40并未持续提升性能，反而往往增加了结果的变异性。总体而言，这些结果支持量子核方法作为一种基于cfDNA的肺癌检测的有前景的方法。
---
title: "Limitations of Synthetic Data Generation in Specialized Data-Scarce Domains"
originalUrl: "https://arxiv.org/abs/2608.13729"
date: "2026-08-17T21:56:18.033Z"
---

# Limitations of Synthetic Data Generation in Specialized Data-Scarce Domains
# 专业领域数据稀缺场景下合成数据生成的局限性

**Abstract:** Advances in diffusion-based generative models have motivated the use of synthetic image generation to alleviate data scarcity in vision tasks. While this strategy has shown promise in natural image benchmarks such as ImageNet, its effectiveness in sparse, high-variance real-world domains remains unclear.

**摘要：** 基于扩散模型的生成式模型的发展，推动了利用合成图像生成来缓解视觉任务中数据稀缺问题的研究。尽管这一策略在 ImageNet 等自然图像基准测试中展现出了前景，但其在稀疏、高方差的现实世界领域中的有效性仍不明确。

In this work, we focus on domains where images differ substantially from common image datasets and additional data are expensive to obtain. Against non-generative data augmentation baselines, we evaluate the downstream classifier performance improvements yielded by two schools of generative sparse data extension: distribution modeling and sample perturbation.

在这项工作中，我们聚焦于那些图像与常见数据集存在显著差异且获取额外数据成本高昂的领域。通过与非生成式数据增强基准进行对比，我们评估了两种生成式稀疏数据扩展方法——分布建模（distribution modeling）和样本扰动（sample perturbation）——在下游分类器性能提升方面的表现。

Across five trauma classification tasks using subject-wise train--validation splits, no generative approach consistently outperforms a strong non-generative baseline. Feature-space analysis reveals recurring failure modes: memorization or collapse, distributional drift, and generation of visually plausible but simplified canonical instances that are easier to classify than real data.

在五个基于受试者划分训练集与验证集的创伤分类任务中，没有任何一种生成式方法能够持续优于强有力的非生成式基准。特征空间分析揭示了反复出现的失败模式：记忆化或模型崩溃、分布偏移，以及生成了视觉上合理但被简化的“典型实例”，这些实例比真实数据更容易被分类。
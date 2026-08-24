---
title: "TriHead-GAN: A Generative Adversarial Network with Triple-Head Discriminator for Carbon Emission Time Series Generation"
originalUrl: "https://arxiv.org/abs/2606.07569"
date: "2026-06-09T23:05:45.796Z"
---

# TriHead-GAN: A Generative Adversarial Network with Triple-Head Discriminator for Carbon Emission Time Series Generation
# TriHead-GAN：一种用于碳排放时间序列生成的具有三头判别器的生成对抗网络

**Abstract:** Accurate carbon emission monitoring is critical for climate policy and emerging regulatory mechanisms such as the EU Carbon Border Adjustment Mechanism, yet city-level high-frequency monitoring data remain extremely scarce, severely limiting data-hungry deep learning models. 

**摘要：** 精确的碳排放监测对于气候政策及欧盟碳边境调节机制（CBAM）等新兴监管机制至关重要。然而，城市级的高频监测数据仍然极其匮乏，这严重限制了对数据需求量大的深度学习模型的发展。

Time series generation is a natural remedy, but existing GAN and diffusion-based generators often provide limited explicit supervision for the domain structure of carbon emission data: they may match marginal distributional statistics while insufficiently preserving cross-variable correlations between CO$_2$ and co-emitted pollutants and meteorological factors, and tend to collapse the first-difference statistics of atmospheric measurements, producing sequences that are smooth on average but lack the realistic step-wise variability of the underlying signals. 

时间序列生成是一种自然的补救措施，但现有的基于 GAN 和扩散模型的生成器往往对碳排放数据的领域结构缺乏明确的监督：它们可能匹配了边缘分布统计量，却无法充分保留二氧化碳与共排放污染物及气象因素之间的跨变量相关性；此外，它们往往会丢失大气测量数据的一阶差分统计特征，导致生成的序列在平均意义上平滑，却缺乏原始信号中真实的阶梯式变异性。

We propose TriHead-GAN, a Transformer-based adversarial framework whose triple-head discriminator jointly supervises three complementary aspects of the joint distribution: distributional authenticity via a Wasserstein critic, cross-variable dependency via leakage-free regression of the target variable, and step-wise temporal smoothness via adjacent-difference prediction. 

我们提出了 TriHead-GAN，这是一个基于 Transformer 的对抗性框架。其三头判别器共同监督联合分布的三个互补方面：通过 Wasserstein 判别器监督分布的真实性，通过目标变量的无泄漏回归监督跨变量依赖性，以及通过相邻差分预测监督阶梯式的时间平滑度。

The generator combines global self-attention with local temporal convolution, per-step noise injection, and an anti-smoothing loss that matches first-difference statistics. 

该生成器结合了全局自注意力机制与局部时间卷积、逐步噪声注入，以及一种能够匹配一阶差分统计量的抗平滑损失函数。

Experiments on the self-collected Changsha Carbon dataset, two public carbon datasets (China, US), and the ETTh1 benchmark show that TriHead-GAN achieves favorable performance over mainstream baselines on the vast majority of settings, and that the resulting synthetic windows improve downstream forecasting accuracy in low-resource carbon monitoring scenarios.

在自建的“长沙碳数据集”、两个公共碳数据集（中国、美国）以及 ETTh1 基准测试上的实验表明，TriHead-GAN 在绝大多数设置下均优于主流基准模型，且生成的合成窗口在低资源碳监测场景中提升了下游预测的准确性。
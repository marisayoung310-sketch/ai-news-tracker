---
title: "Diffusion Image Generation with Explicit Modeling of Data Manifold Geometry"
originalUrl: "https://arxiv.org/abs/2606.00094"
date: "2026-06-02T23:22:34.700Z"
---

# Diffusion Image Generation with Explicit Modeling of Data Manifold Geometry
# 通过显式建模数据流形几何的扩散图像生成

**Abstract:** Image generative models aim to sample data points from the underlying data manifold, a task that requires learning and decoding a dense, low-dimensional, and compact parameterization space. To achieve this, we propose the Data Manifold-aware Image diffusioN moDel (MIND), a novel framework that explicitly models manifold geometry by integrating discrete patch tokenization into the score function of a continuous diffusion model.

**摘要：** 图像生成模型旨在从底层数据流形中采样数据点，这一任务需要学习并解码一个稠密、低维且紧凑的参数化空间。为了实现这一目标，我们提出了数据流形感知图像扩散模型（MIND），这是一个通过将离散补丁标记化（patch tokenization）集成到连续扩散模型的得分函数中，从而显式建模流形几何的新型框架。

This approach successfully leverages both the structural quantification capabilities of discrete tokens and the parallel generation flexibility of continuous diffusion. Moreover, we enable end-to-end differentiable training via a novel soft top-$k$ aggregation mechanism and introduce dual-branch high-frequency feature embedding layers to alleviate the spectral bias of transformer backbones on low-dimensional inputs.

该方法成功地利用了离散标记的结构量化能力以及连续扩散的并行生成灵活性。此外，我们通过一种新颖的软 top-$k$ 聚合机制实现了端到端可微训练，并引入了双分支高频特征嵌入层，以缓解 Transformer 主干网络在低维输入上的频谱偏差。

Furthermore, for inference, we design a multi-stage transition sampling scheme that dynamically adjusts the sampling scheme based on timestep. Extensive experiments on ImageNet 256$\times$256 demonstrate the effectiveness of MIND. After 80-epoch training, our base model achieves an FID of 22.73 without guidance, nearly halving the 43.47 FID of the vanilla DiT-B/2 baseline. The proposed method reduces FID by 15.95 and 9.06 on average compared with the baselines DiT and SiT, respectively.

此外，在推理阶段，我们设计了一种多阶段转换采样方案，根据时间步长动态调整采样策略。在 ImageNet 256$\times$256 上的大量实验证明了 MIND 的有效性。经过 80 个 epoch 的训练，我们的基础模型在无引导的情况下达到了 22.73 的 FID，几乎是将原始 DiT-B/2 基准 43.47 的 FID 减半。与基准模型 DiT 和 SiT 相比，该方法平均分别降低了 15.95 和 9.06 的 FID。

For image generation on ImageNet-256$\times$256 with guidance, the proposed MIND-B with only 130M parameters achieves an FID of 2.06, superpassing the LlamaGen-3B with 3.1B parameters. The proposed MIND-XL with 715M parameters further reduces the FID to 1.95. Our MIND introduces a fresh perspective on diffusion-based image generation, paving the way for future research and innovation in this community. The code will be publicly available.

在有引导的 ImageNet-256$\times$256 图像生成任务中，仅拥有 1.3 亿参数的 MIND-B 达到了 2.06 的 FID，超越了拥有 31 亿参数的 LlamaGen-3B。拥有 7.15 亿参数的 MIND-XL 进一步将 FID 降低至 1.95。我们的 MIND 为基于扩散的图像生成引入了全新的视角，为该领域的未来研究和创新铺平了道路。代码将公开提供。
---
title: "WaiT for the Signal: Simple Frequency-Aware Flow-Matching"
originalUrl: "https://arxiv.org/abs/2607.28760"
date: "2026-08-03T22:38:14.298Z"
---

# WaiT for the Signal: Simple Frequency-Aware Flow-Matching

**Title: WaiT for the Signal: Simple Frequency-Aware Flow-Matching**
**标题：WaiT for the Signal：简单且具备频率感知能力的流匹配模型**

**Abstract:**
As image generation models scale to ever higher resolutions, global coherence, local detail, and texture fidelity become critical axes for generation quality. However, standard flow matching treats all spatial frequencies uniformly, ignoring the natural frequency hierarchy where high-frequency bands become indistinguishable from pure noise far earlier than coarse structures.
**摘要：**
随着图像生成模型向更高分辨率扩展，全局连贯性、局部细节和纹理保真度成为衡量生成质量的关键维度。然而，标准的流匹配方法对所有空间频率一视同仁，忽略了自然的频率层级结构——即高频波段比粗糙结构更早地变得与纯噪声无法区分。

We introduce WaiT, a Wavelet-aware image Transformer that decomposes generation into coarse and fine bands via lossless wavelets. True to its name, the high-frequency bands wait for the signal: staying pure noise until coarse structure has emerged, then joining the flow for joint refinement.
我们引入了 WaiT（Wavelet-aware image Transformer），这是一种通过无损小波将生成过程分解为粗波段和细波段的图像 Transformer。正如其名，高频波段会“等待信号”（Wait for the signal）：在粗糙结构显现之前保持纯噪声状态，随后再加入流中进行联合细化。

Since standard FID discards fine-grained detail through aggressive downsampling, we introduce a more stringent three-axis evaluation protocol to assess quality at native resolution. On ImageNet 512x512, WaiT achieves a pixel-space FID of 1.43 and is Pareto-optimal across all three axes, reducing sampling compute by up to 50%.
由于标准的 FID 指标通过激进的下采样丢弃了细粒度细节，我们引入了一套更严格的三轴评估协议，以在原始分辨率下评估质量。在 ImageNet 512x512 数据集上，WaiT 实现了 1.43 的像素空间 FID，并在所有三个维度上达到了帕累托最优，同时将采样计算量降低了高达 50%。

With our largest 2B model, we set a new state-of-the-art FID of 1.3 for pixel-space models on ImageNet 512 resolution. Our formulation outperforms even the strongest latent-space models on texture fidelity, and scales seamlessly to high-resolution OpenImages and to video generation, achieving a state-of-the-art FVD of 0.84 on Kinetics-600 with no algorithmic modifications.
凭借我们最大的 2B 参数模型，我们在 ImageNet 512 分辨率的像素空间模型中创下了 1.3 的最新 FID 纪录。我们的方案在纹理保真度上甚至超越了最强的潜在空间（latent-space）模型，并能无缝扩展到高分辨率的 OpenImages 和视频生成任务，在无需任何算法修改的情况下，在 Kinetics-600 上实现了 0.84 的最新 FVD 纪录。
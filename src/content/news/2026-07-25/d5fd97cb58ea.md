---
title: "RealVDeblur: One-Step Diffusion for Generalizable Real-World Video Deblurring"
originalUrl: "https://arxiv.org/abs/2607.20628"
date: "2026-07-24T22:38:50.314Z"
---

# RealVDeblur: One-Step Diffusion for Generalizable Real-World Video Deblurring
# RealVDeblur：用于通用真实世界视频去模糊的单步扩散模型

**Abstract:** Real-world video deblurring remains challenging due to diverse motion patterns, complex degradations, and the scarcity of realistic training data, yet robust restoration is critical for downstream pipelines such as mobile imaging and 3D reconstruction. This work presents **RealVDeblur**, an efficient generative framework designed to improve in-the-wild robustness under diverse real capture conditions.

**摘要：** 由于运动模式多样、退化复杂以及真实训练数据稀缺，真实世界视频去模糊仍然极具挑战性，但稳健的修复对于移动成像和 3D 重建等下游流程至关重要。本研究提出了 **RealVDeblur**，这是一个高效的生成式框架，旨在提高在各种真实拍摄条件下“野外”环境的稳健性。

First, a large-scale, physically grounded blur synthesis pipeline is constructed from scene-level 3D Gaussian Splatting (3DGS) assets and high-frame-rate videos, providing realistic training data covering both camera-induced and object-motion blur.

首先，研究团队利用场景级 3D 高斯溅射（3DGS）资产和高帧率视频构建了一个大规模、基于物理的模糊合成流水线，提供了涵盖相机抖动和物体运动模糊的真实训练数据。

Second, a video diffusion prior is leveraged for restoration; to better accommodate frame-dependent blur variations, temporal compression in the VAE is disabled and a frame-wise encoding scheme is adopted.

其次，利用视频扩散先验进行修复；为了更好地适应帧相关的模糊变化，该方法禁用了 VAE 中的时间压缩，并采用了逐帧编码方案。

For practical deployment on long videos, multi-step diffusion sampling is distilled into an efficient one-step generator, and a training-free Temporal Window Mask stabilizes inference beyond the training horizon with constant memory usage.

为了在长视频上进行实际部署，研究将多步扩散采样蒸馏为高效的单步生成器，并引入了一种无需训练的时间窗口掩码（Temporal Window Mask），在保持内存使用恒定的前提下，稳定了超出训练范围的推理效果。

Extensive experiments on diverse real-world benchmarks demonstrate strong perceptual quality, semantic fidelity, and temporal consistency on unseen videos, as well as improved robustness in downstream 3D reconstruction under severe motion blur.

在多个真实世界基准测试上的广泛实验表明，该方法在未见过的视频上表现出强大的感知质量、语义保真度和时间一致性，并在严重运动模糊下的下游 3D 重建任务中展现了更高的稳健性。
---
title: "Pulling The REINS: Training-Free Safety Alignment of Video Diffusion Models via Representation Steering"
originalUrl: "https://arxiv.org/abs/2606.17257"
date: "2026-06-17T23:05:57.370Z"
---

# Pulling The REINS: Training-Free Safety Alignment of Video Diffusion Models via Representation Steering
# 驾驭 REINS：通过表征引导实现视频扩散模型的免训练安全对齐

**Abstract:** Open-weight video diffusion models can generate photorealistic unsafe content, from violence to misinformation, yet existing defenses either require expensive safety fine-tuning that degrades general capability, or apply external filters that are trivially bypassed by adversarial prompts. 

**摘要：** 开源权重的视频扩散模型能够生成逼真的不安全内容，从暴力到虚假信息不等。然而，现有的防御措施要么需要昂贵的安全微调（这会降低模型的通用能力），要么依赖于容易被对抗性提示词轻易绕过的外部过滤器。

We present REINS (REpresentation-space INference-time Safety steering), a training-free method that aligns video diffusion models at inference time by steering their internal representations toward safe generation. 

我们提出了 REINS（表征空间推理时安全引导），这是一种免训练方法，通过在推理阶段引导视频扩散模型的内部表征，使其向安全生成的方向对齐。

Our key finding is that safety-relevant structure is linearly encoded in the hidden-state activations of video diffusion transformers, and a single direction, discovered via Supervised PCA on binary safety labels, suffices to separate safe from unsafe generation trajectories. 

我们的核心发现是，与安全相关的结构在线性上被编码在视频扩散 Transformer 的隐藏状态激活中；通过对二元安全标签进行监督主成分分析（Supervised PCA）所发现的单一方向，足以将安全与不安全的生成轨迹区分开来。

At inference, adding this direction to hidden states at an intermediate transformer layer redirects generation from harmful content to semantically related safe alternatives, with no weight updates, no concept enumeration, and negligible computational overhead. 

在推理时，将该方向添加到 Transformer 中间层的隐藏状态中，可以将生成内容从有害信息重定向到语义相关的安全替代方案，且无需更新权重、无需枚举概念，计算开销微乎其微。

Through mechanistic analysis, we reveal that while safety information accumulates monotonically with transformer depth, steering effectiveness peaks at intermediate layers (~50% depth), exposing a fundamental tradeoff between information availability and downstream propagation capacity. 

通过机制分析，我们揭示了尽管安全信息随着 Transformer 层数的增加而单调积累，但引导效果在中间层（约 50% 深度处）达到峰值，这揭示了信息可用性与下游传播能力之间存在的基本权衡。

We evaluate REINS across 9 video diffusion models, multiple parameter scales (1.3B-5B), and both text-to-video and image-to-video generation, to our knowledge, the broadest safety evaluation suite in the video generation literature.

我们在 9 个视频扩散模型、多种参数规模（1.3B-5B）以及文本生成视频和图像生成视频任务上对 REINS 进行了评估。据我们所知，这是视频生成领域文献中最广泛的安全评估套件。
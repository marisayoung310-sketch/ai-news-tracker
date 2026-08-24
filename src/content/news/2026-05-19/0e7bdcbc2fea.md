---
title: "One Pass Is Not Enough: Recursive Latent Refinement for Generative Models"
originalUrl: "https://arxiv.org/abs/2605.15309"
date: "2026-05-18T22:41:50.841Z"
---

# One Pass Is Not Enough: Recursive Latent Refinement for Generative Models
# 一次传递是不够的：生成模型的递归潜在细化

**Abstract:** Despite remarkable progress, image generation is far from solved. The dominant metric, FID, conflates sample fidelity with mode coverage and is close to being saturated. Yet a model can still exhibit mode collapse while achieving a low FID, since a handful of sharp, near-duplicate images can outscore a model that faithfully covers the full data distribution.

**摘要：** 尽管取得了显著进展，图像生成问题远未得到解决。目前主流的评估指标 FID 将样本保真度与模式覆盖率混为一谈，且已接近饱和。然而，一个模型在实现低 FID 的同时仍可能出现模式崩溃（mode collapse），因为少量清晰、近乎重复的图像在评分上可能超过一个能够忠实覆盖完整数据分布的模型。

We argue that precision and recall are essential complements to FID, and that because FID is already saturated, the more meaningful goal is to improve diversity and coverage. Achieving high recall requires a model that explicitly prioritizes mode coverage, unlike most generative models, which optimize sample fidelity.

我们认为，精确率（precision）和召回率（recall）是 FID 的重要补充。鉴于 FID 已经饱和，更有意义的目标是提高多样性和覆盖率。实现高召回率需要一个明确优先考虑模式覆盖的模型，这与大多数优化样本保真度的生成模型不同。

We introduce RTM, which replaces the single-pass latent mapping in style-based generators with an iterative refinement process, and show that this consistently improves both quality and diversity. Integrated with Implicit Maximum Likelihood Estimation (IMLE), which optimizes mode coverage by design, RTM achieves the highest precision and recall among current state-of-the-art approaches while maintaining competitive FID, with improvements across CIFAR-10, CelebA-HQ at 256x256, and nine few-shot benchmarks.

我们引入了 RTM，它将基于风格的生成器中的单次潜在映射替换为迭代细化过程，并证明这能持续提升生成质量和多样性。通过与旨在优化模式覆盖的隐式最大似然估计（IMLE）相结合，RTM 在保持竞争性 FID 的同时，实现了当前最先进方法中最高的精确率和召回率，并在 CIFAR-10、256x256 分辨率的 CelebA-HQ 以及九个少样本基准测试中均取得了改进。

RTM also improves StyleGAN2 and StyleGAN2-ADA on CIFAR-10 and AFHQ-v1 at 512x512, demonstrating that the benefit is not specific to IMLE. Unlike flow-matching baselines that achieve competitive FID at the expense of coverage, recursive refinement improves both quality and diversity simultaneously.

RTM 还改进了 CIFAR-10 和 512x512 分辨率下 AFHQ-v1 上的 StyleGAN2 和 StyleGAN2-ADA，证明了这种优势并非仅限于 IMLE。与以牺牲覆盖率为代价实现竞争性 FID 的流匹配（flow-matching）基准方法不同，递归细化能够同时提升质量和多样性。
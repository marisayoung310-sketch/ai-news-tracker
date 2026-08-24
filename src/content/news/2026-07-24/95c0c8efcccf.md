---
title: "Multi-Mask Diffusion Language Models for Few-Step Generation"
originalUrl: "https://arxiv.org/abs/2607.19686"
date: "2026-07-23T22:32:18.079Z"
---

# Multi-Mask Diffusion Language Models for Few-Step Generation
# 多掩码扩散语言模型：实现少步生成

**Abstract:** Masked diffusion models (MDMs) are a promising family of language generators, but achieving high-quality few-step generation remains challenging. In MDMs, all forward trajectories collapse to a single fully masked state, leaving no terminal entropy for consistency-style few-step generation.

**摘要：** 掩码扩散模型（MDMs）是一类极具前景的语言生成模型，但实现高质量的少步生成仍然具有挑战性。在 MDMs 中，所有前向轨迹都会坍缩到一个单一的全掩码状态，这使得一致性风格的少步生成缺乏终端熵。

While recent few-step alternatives based on uniform-state diffusion avoid this degeneracy, it becomes harder to distinguish clean tokens from noise than MDMs, which usually harms modeling quality and training efficiency.

虽然近期基于均匀状态扩散的少步替代方案避免了这种退化，但与 MDMs 相比，它们更难区分干净标记（clean tokens）与噪声，这通常会损害建模质量和训练效率。

In this work, we propose a multi-mask diffusion model (MultiMDM) that preserves the masking structure towards few-step generation. In the forward process, each clean token is first pushed towards a designated mask and then gradually mixes over the mask set. As a result, the backward process has a drafting capability by predicting a designated mask before refining to a clean token.

在这项工作中，我们提出了一种多掩码扩散模型（MultiMDM），它保留了掩码结构以实现少步生成。在前向过程中，每个干净标记首先被推向一个指定的掩码，然后逐渐在掩码集合中混合。因此，反向过程具备了草拟能力，即在细化为干净标记之前先预测出一个指定的掩码。

We derive a closed-form ELBO training objective for MultiMDM that supports continual training from pretrained MDMs. In addition, we formulate a purely discrete-state consistency distillation scheme, with a shared-Gumbel coupling to reduce pathwise entropy. Experiments on pretraining and distillation show that MultiMDM provides an effective foundation for principled few-step generation.

我们为 MultiMDM 推导了一个闭式 ELBO 训练目标，支持从预训练的 MDMs 进行持续训练。此外，我们制定了一种纯离散状态的一致性蒸馏方案，并利用共享 Gumbel 耦合来降低路径熵。在预训练和蒸馏上的实验表明，MultiMDM 为原则性的少步生成提供了一个有效的基础。
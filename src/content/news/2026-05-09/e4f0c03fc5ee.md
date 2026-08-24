---
title: "ViTok-v2: Scaling Native Resolution Auto-Encoders to 5 Billion Parameters"
originalUrl: "https://arxiv.org/abs/2605.05331"
date: "2026-05-08T22:46:25.999Z"
---

# ViTok-v2: Scaling Native Resolution Auto-Encoders to 5 Billion Parameters
# ViTok-v2：将原生分辨率自动编码器扩展至 50 亿参数

**Abstract:** Vision Transformer (ViT) autoencoders have emerged as compelling tokenizers for images, offering improved reconstruction over convolutional tokenizers. However, existing ViT tokenizers cannot explore this landscape as performance degrades outside training resolutions, and reliance on adversarial losses prevents stable scaling.

**摘要：** 视觉 Transformer (ViT) 自动编码器已成为极具吸引力的图像分词器 (tokenizer)，在重建效果上优于卷积分词器。然而，现有的 ViT 分词器无法有效探索这一领域，因为其性能在训练分辨率之外会下降，且对对抗性损失的依赖阻碍了其稳定扩展。

ViTok (Hansen-Estruch et al., 2025) found that the compression ratio *r* mediates a reconstruction-generation trade-off where lower *r* means better reconstructions but harder generations, so improving tokenizer reconstruction is key to more Pareto-optimal tokenizers.

ViTok (Hansen-Estruch 等人，2025) 发现，压缩比 *r* 在重建与生成之间存在权衡：较低的 *r* 意味着更好的重建效果，但会增加生成的难度。因此，提升分词器的重建能力是实现更优帕累托 (Pareto) 前沿分词器的关键。

We introduce ViTok-v2, which addresses these limitations with native resolution support via NaFlex for generalization across resolutions and aspect ratios, and a novel DINOv3 perceptual loss that replaces both LPIPS and GAN objectives for stable training at any scale.

我们推出了 ViTok-v2，通过 NaFlex 提供原生分辨率支持，实现了跨分辨率和长宽比的泛化；同时引入了一种新型 DINOv3 感知损失，取代了 LPIPS 和 GAN 目标，从而在任何规模下都能实现稳定训练。

ViTok-v2 is trained on about 2B images and scaled to 5B parameters, the largest image autoencoder to date. ViTok-v2 matches or exceeds state-of-the-art reconstruction at 256p and outperforms all baselines at 512p and above.

ViTok-v2 在约 20 亿张图像上进行训练，并扩展至 50 亿参数，是迄今为止规模最大的图像自动编码器。ViTok-v2 在 256p 分辨率下的重建效果达到或超过了当前最先进水平，并在 512p 及以上分辨率下超越了所有基准模型。

In joint scaling experiments with flow matching generators, we show that scaling both the autoencoder and the generator advances the Pareto frontier of this trade-off.

在与流匹配 (flow matching) 生成器的联合扩展实验中，我们证明了同时扩展自动编码器和生成器能够进一步推进这一权衡的帕累托前沿。
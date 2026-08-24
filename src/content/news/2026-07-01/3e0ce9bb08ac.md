---
title: "Data Provenance for Image Auto-Regressive Generation"
originalUrl: "https://arxiv.org/abs/2606.28386"
date: "2026-06-30T22:52:37.852Z"
---

# Data Provenance for Image Auto-Regressive Generation
# 图像自回归生成的溯源研究

**Abstract:** Image autoregressive models (IARs) have recently demonstrated remarkable capabilities in visual content generation, achieving photorealistic quality and rapid synthesis through the next-token prediction paradigm adapted from large language models.
**摘要：** 图像自回归模型（IARs）近期在视觉内容生成领域展现出卓越的能力，通过借鉴大语言模型的“下一词元预测”（next-token prediction）范式，实现了照片级的生成质量与快速合成。

As these models become widely accessible, robust data provenance is required to reliably trace IAR-generated images to the source model that synthesized them. This is critical to prevent the spread of misinformation, detect fraud, and attribute harmful content.
随着这些模型变得广泛可用，我们需要稳健的数据溯源技术，以便可靠地将 IAR 生成的图像追溯至其原始合成模型。这对于防止虚假信息传播、检测欺诈行为以及追究有害内容责任至关重要。

We find that although IAR-generated images often appear visually identical to real images, their generation process introduces characteristic patterns in their outputs, which serves as a reliable provenance signal for the generated images.
我们发现，尽管 IAR 生成的图像在视觉上往往与真实图像无异，但其生成过程会在输出中引入特定的特征模式，这可以作为识别生成图像的可靠溯源信号。

Leveraging this, we present a post-hoc framework that enables the robust detection of such patterns for provenance tracing. Notably, our framework does not require modifications of the generative process or outputs.
基于此，我们提出了一种事后（post-hoc）框架，能够稳健地检测这些模式以进行溯源追踪。值得注意的是，我们的框架无需修改生成过程或输出内容。

Thereby, it is applicable in contexts where prior watermarking methods cannot be used, such as for generated content that is already published without additional marks and for models that do not integrate watermarking.
因此，该方法适用于无法使用传统水印技术的场景，例如针对已发布且未添加额外标记的生成内容，以及未集成水印功能的模型。

We demonstrate the effectiveness of our approach across a wide range of IARs, highlighting its high potential for robust data provenance tracing in autoregressive image generation.
我们通过多种 IAR 模型验证了该方法的有效性，凸显了其在自回归图像生成领域进行稳健数据溯源的巨大潜力。

***

**Paper Details:**
*   **Authors:** Bihe Zhao, Louis Kerner, Michel Meintz, Tameem Bakr, Franziska Boenisch, Adam Dziedzic
*   **arXiv ID:** 2606.28386
*   **Subjects:** Computer Vision and Pattern Recognition (cs.CV); Artificial Intelligence (cs.AI)
*   **Submission Date:** 22 Jun 2026

**论文详情：**
*   **作者：** Bihe Zhao, Louis Kerner, Michel Meintz, Tameem Bakr, Franziska Boenisch, Adam Dziedzic
*   **arXiv ID：** 2606.28386
*   **学科分类：** 计算机视觉与模式识别 (cs.CV)；人工智能 (cs.AI)
*   **提交日期：** 2026年6月22日
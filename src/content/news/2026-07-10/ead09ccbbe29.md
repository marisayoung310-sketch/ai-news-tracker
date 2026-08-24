---
title: "AI for Cultural Heritage Textiles: Fine-Tuned Latent Diffusion for Novel Ulos Motif Synthesis"
originalUrl: "https://arxiv.org/abs/2607.06590"
date: "2026-07-09T22:54:49.856Z"
---

# AI for Cultural Heritage Textiles: Fine-Tuned Latent Diffusion for Novel Ulos Motif Synthesis
# 文化遗产纺织品的 AI 应用：用于新型 Ulos 图案合成的微调潜在扩散模型

**Abstract:** Preserving and revitalising traditional textiles such as Ulos, a cultural heritage of the Batak ethnic group in North Sumatra, Indonesia, requires balancing fidelity to tradition with innovative approaches that meet contemporary design demands. Traditional Ulos weaving faces two key limitations: a narrow range of motifs and a time-intensive design process.

**摘要：** 保护和振兴诸如 Ulos（印度尼西亚北苏门答腊巴塔克民族的文化遗产）等传统纺织品，需要在保持传统忠实度与满足当代设计需求的创新方法之间取得平衡。传统的 Ulos 编织面临两个主要局限：图案范围狭窄以及设计过程耗时。

This study presents a generative AI framework that fine-tunes two pretrained latent diffusion models: Protogen v3.4 and Stable Diffusion v1.4, on a curated, annotated dataset of high-resolution Ulos motifs to generate culturally consistent yet novel designs. Model performance is evaluated quantitatively using Frechet Inception Distance (FID), Inception Score (IS), and qualitatively through assessments by traditional weavers and members of the public.

本研究提出了一个生成式 AI 框架，通过在经过整理和标注的高分辨率 Ulos 图案数据集上，对两个预训练的潜在扩散模型（Protogen v3.4 和 Stable Diffusion v1.4）进行微调，从而生成既符合文化内涵又具有创新性的设计。模型性能通过弗雷歇起始距离 (FID) 和起始分数 (IS) 进行定量评估，并结合传统织工和公众的定性评估进行综合考量。

Protogen v3.4 consistently outperforms Stable Diffusion v1.4, achieving substantially lower FID (~10.5x) and higher IS (2.0x), indicating superior visual fidelity, diversity, and closer alignment with the real Ulos motif distribution. We further examine the effects of strength and guidance scale on generation quality across both models.

Protogen v3.4 的表现始终优于 Stable Diffusion v1.4，其 FID 显著降低（约 10.5 倍），IS 分数更高（2.0 倍），这表明其具有更卓越的视觉保真度、多样性，且与真实的 Ulos 图案分布更为贴合。我们进一步研究了强度 (strength) 和引导尺度 (guidance scale) 对两个模型生成质量的影响。

Lower strength values consistently yield higher fidelity (lower FID), while higher strength values increase generative diversity at the cost of realism, revealing a clear fidelity-diversity tradeoff for both models. Across all tested configurations, a guidance scale of 5-9 provides the most effective balance between fidelity and diversity, stabilising FID, KID, and IS, and is recommended as the operating range for high-quality, diverse Ulos motif generation.

较低的强度值始终能产生更高的保真度（更低的 FID），而较高的强度值则以牺牲真实感为代价增加了生成的多样性，这揭示了两个模型在保真度与多样性之间存在明显的权衡。在所有测试配置中，5-9 的引导尺度在保真度和多样性之间提供了最有效的平衡，使 FID、KID 和 IS 趋于稳定，因此被推荐作为高质量、多样化 Ulos 图案生成的最佳操作范围。

These findings demonstrate that carefully fine-tuned generative AI can support the creative renewal of intangible cultural heritage while preserving its stylistic and symbolic integrity.

这些研究结果表明，经过精心微调的生成式 AI 可以在保护非物质文化遗产的风格和象征完整性的同时，为其创造性更新提供支持。
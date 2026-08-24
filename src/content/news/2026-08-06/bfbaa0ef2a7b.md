---
title: "Hunyuan3D-Buffalo 1.0: A Unified Multimodal Model for Scalable 3D Generation, Understanding, and Editing"
originalUrl: "https://arxiv.org/abs/2608.02711"
date: "2026-08-05T22:39:51.538Z"
---

# Hunyuan3D-Buffalo 1.0: A Unified Multimodal Model for Scalable 3D Generation, Understanding, and Editing

**Hunyuan3D-Buffalo 1.0：用于可扩展 3D 生成、理解和编辑的统一多模态模型**

---

**Abstract:** Recent advances in image generation have demonstrated the potential of unified multimodal models that integrate understanding, generation, and editing. However, unified 3D modeling remains constrained by scarce multimodal data, particularly the lack of large-scale and geometrically consistent editing data.

**摘要：** 图像生成领域的最新进展展示了统一多模态模型在整合理解、生成和编辑方面的潜力。然而，统一 3D 建模仍受限于稀缺的多模态数据，特别是缺乏大规模且几何一致的编辑数据。

---

To address this limitation, we propose Hunyuan3D-Buffalo 1.0, a unified framework supporting 3D understanding, text-to-3D generation, instruction-guided 3D editing, and text-grounded part generation within a single architecture. To enable scalable training, we construct an 87M-scale 3D multimodal corpus, comprising 25M understanding samples, 50M text-to-3D pairs, and 12M editing pairs generated using Nano3D-v2.

为了解决这一局限性，我们提出了 Hunyuan3D-Buffalo 1.0，这是一个统一的框架，在单一架构内支持 3D 理解、文本生成 3D、指令引导的 3D 编辑以及基于文本的部件生成。为了实现可扩展的训练，我们构建了一个 8700 万规模的 3D 多模态语料库，其中包括 2500 万个理解样本、5000 万个文本生成 3D 对，以及使用 Nano3D-v2 生成的 1200 万个编辑对。

---

Architecturally, the framework combines Hunyuan3D-VLM for semantic, structural, and spatial understanding with Hunyuan3D DiT for high-fidelity 3D synthesis. The VLM provides multimodal semantic conditions for generation, while editing and part generation additionally condition the diffusion process on the source object representation to preserve its overall structure and unedited regions.

在架构上，该框架结合了用于语义、结构和空间理解的 Hunyuan3D-VLM，以及用于高保真 3D 合成的 Hunyuan3D DiT。VLM 为生成过程提供了多模态语义条件，而编辑和部件生成则通过将扩散过程进一步调节在源对象表示上，以保留其整体结构和未编辑区域。

---

Extensive experiments show that Hunyuan3D-Buffalo 1.0 achieves state-of-the-art or leading performance on text-to-3D generation and 3D editing benchmarks, while exhibiting strong understanding and part-generation capabilities. Our analysis further shows that both generation and understanding improve editing, demonstrating the effectiveness of unified 3D multimodal training.

大量实验表明，Hunyuan3D-Buffalo 1.0 在文本生成 3D 和 3D 编辑基准测试中达到了最先进或领先的性能，同时展现出强大的理解和部件生成能力。我们的分析进一步表明，生成和理解能力的提升均有助于改善编辑效果，证明了统一 3D 多模态训练的有效性。
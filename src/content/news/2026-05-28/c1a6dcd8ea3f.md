---
title: "Not All Modalities Are Equal: Instruction-Aware Gating for Multimodal Videos"
originalUrl: "https://arxiv.org/abs/2605.26232"
date: "2026-05-27T23:04:57.438Z"
---

# Not All Modalities Are Equal: Instruction-Aware Gating for Multimodal Videos
# 并非所有模态都生而平等：多模态视频的指令感知门控机制

**Abstract:** Pre-trained video large language models excel at visual reasoning. However, they struggle when videos arrive with auxiliary streams, such as audio, depth map, or dense temporal evidence. In such a scenario, uniform fusion induces modality interference, allowing irrelevant channels to distract the model.

**摘要：** 预训练的视频大语言模型在视觉推理方面表现出色。然而，当视频伴随音频、深度图或密集时间证据等辅助流时，这些模型往往表现不佳。在这种情况下，统一的融合方式会导致模态干扰，使得无关的通道分散模型的注意力。

To address this issue, we present a unified multimodal video understanding framework, named UniMVU, that performs instruction-aware fusion across video, audio, depth map, or any other modality inputs via two levels of dynamic gating: inner-modality gates emphasize salient regions within each modality, whereas modality-level gates re-weight whole streams; both are conditioned on the text instruction to adaptively balance modality importance.

为了解决这一问题，我们提出了一个名为 UniMVU 的统一多模态视频理解框架。该框架通过两级动态门控机制，在视频、音频、深度图或任何其他模态输入之间执行指令感知的融合：模态内门控（inner-modality gates）强调各模态内的显著区域，而模态级门控（modality-level gates）则对整个数据流进行重新加权；两者均以文本指令为条件，从而自适应地平衡各模态的重要性。

Our UniMVU combines cross-modal self-attention with instruction-driven inner-modality gating module and a modality-level gating module with control token; for time-aligned streams we further adopt a fast-to-slow fusion scheme that reduces redundancy.

我们的 UniMVU 将跨模态自注意力机制与指令驱动的模态内门控模块以及带有控制标记（control token）的模态级门控模块相结合；对于时间对齐的数据流，我们进一步采用了“快到慢”（fast-to-slow）的融合方案，以减少冗余。

Across six benchmarks (AVQA, AVSD, Music-AVQA, ScanQA, SQA3D and MVBench), our UniMVU achieves consistent gains over static-fusion baselines achieving gains as high as 13.5 in terms of CIDEr metric. Further, our analysis shows that the gating mechanism aligns with the human-interpretable modality relevance, and ablations show the contributions of inner-modality and modality-level gating.

在六个基准测试（AVQA、AVSD、Music-AVQA、ScanQA、SQA3D 和 MVBench）中，UniMVU 在 CIDEr 指标上取得了高达 13.5 的提升，持续优于静态融合基准模型。此外，我们的分析表明，该门控机制与人类可解释的模态相关性相一致，消融实验也验证了模态内门控和模态级门控各自的贡献。

Our UniMVU provides a simple, unified recipe for instruction-aware multimodal video understanding that scales to diverse modalities without hand-crafted fusion rules.

UniMVU 为指令感知的多模态视频理解提供了一种简单、统一的方案，无需人工设计的融合规则即可扩展到多种模态。
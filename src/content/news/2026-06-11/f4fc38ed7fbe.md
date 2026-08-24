---
title: "SD-GRPO: Verifiable Segment Decomposition for Long-Form Vision-Language Generation"
originalUrl: "https://arxiv.org/abs/2606.09871"
date: "2026-06-10T23:08:56.286Z"
---

# SD-GRPO: Verifiable Segment Decomposition for Long-Form Vision-Language Generation

**Abstract:** Group Relative Policy Optimization (GRPO) and its variants, originally developed for Large Language Models (LLMs), have recently been applied to Multimodal LLMs and produced strong results. However, their coarse-grained holistic credit assignment from a single scalar advantage underfits vision-language (VL) tasks, where outputs are often long-form responses grounded in semantically rich images.

**摘要：** 群体相对策略优化（GRPO）及其变体最初是为大语言模型（LLM）开发的，近期已被应用于多模态大语言模型并取得了显著成果。然而，它们基于单一标量优势的粗粒度整体信用分配在视觉-语言（VL）任务中表现不足，因为这类任务的输出通常是基于语义丰富的图像的长篇回复。

To address this limitation, we exploit a structured signal that single-scalar formulations discard: the natural segmentation of long-form VL outputs. Concretely, we propose Segment-Decomposed GRPO (SD-GRPO), which z-normalizes verifiable per-segment rewards across the rollout group, yielding a vector of per-segment advantages in place of a single scalar.

为了解决这一局限性，我们利用了单一标量公式所丢弃的一种结构化信号：长篇视觉-语言输出的自然分段特性。具体而言，我们提出了分段分解 GRPO（SD-GRPO），它在展开组（rollout group）内对可验证的分段奖励进行 z-归一化，从而产生一个分段优势向量，以替代单一的标量。

We evaluate SD-GRPO across three settings spanning controlled and real-world long-form VL generation, organized by increasing semantic entanglement across segments. On a controlled multi-panel dense-captioning task constructed from DOCCI, where segments are semantically independent, SD-GRPO consistently outperforms the GRPO baseline, with larger gains at higher segment counts.

我们在涵盖受控和真实世界长篇视觉-语言生成的三个场景中评估了 SD-GRPO，这些场景按段落间语义纠缠程度递增排列。在基于 DOCCI 构建的受控多面板密集描述任务中（其中各段落语义独立），SD-GRPO 的表现始终优于 GRPO 基线，且在段落数量较多时增益更为显著。

Extending to a controlled multi-chart long-form VQA task constructed from MultiChartQA, we show both theoretically and empirically that rollout-level rewards suffer from cross-segment credit misattribution that scales with output length. On a real-world scientific figure captioning task on the MMSci dataset, where subfigure captions share context across the figure, blending holistic and per-segment rewards further improves on both, suggesting per-segment normalization alone is insufficient when segments are semantically entangled.

在扩展到基于 MultiChartQA 构建的受控多图表长篇视觉问答（VQA）任务时，我们从理论和实证两方面证明，展开层面的奖励会遭受随输出长度增加而加剧的跨段落信用分配错误。在 MMSci 数据集的真实世界科学图表描述任务中（其中子图描述共享整个图表的上下文），结合整体奖励和分段奖励进一步提升了性能，这表明当段落语义纠缠时，仅进行分段归一化是不够的。

Finally, by integrating SD-GRPO into Dr. GRPO, we confirm that it can be applied to any GRPO framework with minimal implementation overhead to enhance long-form VL generation.

最后，通过将 SD-GRPO 集成到 Dr. GRPO 中，我们证实了它可以以极小的实现开销应用于任何 GRPO 框架，从而增强长篇视觉-语言生成能力。
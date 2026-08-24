---
title: "TransSLR: A Lightweight Transformer for Sign Language Recognition"
originalUrl: "https://arxiv.org/abs/2608.06407"
date: "2026-08-10T22:10:43.422Z"
---

# TransSLR: A Lightweight Transformer for Sign Language Recognition
# TransSLR：用于手语识别的轻量级 Transformer

**Abstract:** Automated Sign Language Recognition for under-represented languages remains a largely unsolved problem. Central African Sign Language (CASL) exemplifies this gap: the only available bench-mark, CASL-W60, has a best reported accuracy of 69.93%, and we show that the common heuristic of fine-tuning high-resource models fails to close it.

**摘要：** 针对代表性不足语言的自动化手语识别仍然是一个尚未解决的难题。中非手语（CASL）就是这一差距的典型例子：目前唯一可用的基准测试 CASL-W60 的最高报告准确率仅为 69.93%。我们研究发现，通过微调高资源模型这一常用启发式方法，并无法弥补这一差距。

This failure stems from two compounding factors: the limited scale of available CASL data and the significant lexical and visual domain gap between CASL and large-scale corpora such as WLASL, which renders pre-trained representations largely uninformative.

这种失败源于两个叠加因素：一是可用 CASL 数据规模有限，二是 CASL 与 WLASL 等大规模语料库之间存在显著的词汇和视觉领域差异，这使得预训练的表示在很大程度上失去了参考价值。

To address this, we propose TransSLR, a lightweight Temporal Transformer Encoder trained from scratch on 64-frame normalized pose sequences, with average pooling and a classification head. By operating on geometric keypoint representations rather than raw RGB, TransSLR achieves signer-independent generalization without relying on visual appearance.

为了解决这一问题，我们提出了 TransSLR，这是一个轻量级的时序 Transformer 编码器。它基于 64 帧归一化姿态序列从零开始训练，并结合了平均池化和分类头。通过处理几何关键点表示而非原始 RGB 图像，TransSLR 在不依赖视觉外观的情况下实现了与手语者无关的泛化能力。

On the CASL-W60 benchmark, TransSLR establishes a new state-of-the-art accuracy of 80.39%, surpassing the prior best by +10.46%. Beyond accuracy, our encoder-only design significantly reduces computational overhead, making deployment feasible in resource-constrained environments.

在 CASL-W60 基准测试中，TransSLR 创下了 80.39% 的最新最高准确率，比之前的最佳成绩提升了 10.46%。除了准确率之外，我们纯编码器的设计显著降低了计算开销，使得在资源受限的环境中部署成为可能。

We conduct extensive experiments on the CASL-W60 benchmark, comparing against RGB-based and multimodal baselines, and demonstrate that TransSLR achieves state-of-the-art performance.

我们在 CASL-W60 基准测试上进行了广泛的实验，将其与基于 RGB 和多模态的基准模型进行了对比，证明了 TransSLR 达到了行业领先的性能水平。
---
title: "Breaking the Illusion: When Positive Meets Negative in Multimodal Decoding"
originalUrl: "https://arxiv.org/abs/2605.06679"
date: "2026-05-11T23:15:51.151Z"
---

# Breaking the Illusion: When Positive Meets Negative in Multimodal Decoding
# 打破幻觉：多模态解码中的正负博弈

**Abstract:** Vision-Language Models (VLMs) are frequently undermined by object hallucination, generating content that contradicts visual reality, due to an over-reliance on linguistic priors.
**摘要：** 视觉-语言模型（VLMs）常因过度依赖语言先验而产生与视觉事实相悖的内容，从而导致严重的物体幻觉问题。

We introduce Positive-and-Negative Decoding (PND), a training-free inference framework that intervenes directly in the decoding process to enforce visual fidelity.
我们引入了“正负解码”（Positive-and-Negative Decoding, PND），这是一种无需训练的推理框架，通过直接干预解码过程来强化视觉保真度。

PND is motivated by our finding of an attention imbalance in VLMs, where visual features are under-weighted.
PND 的设计灵感源于我们发现 VLMs 中存在注意力失衡现象，即视觉特征的权重被低估了。

Our framework introduces a dual-path contrast: a positive path that amplifies visual evidence and a negative path that constructs counterfactuals to penalize prior-dominant generation.
我们的框架引入了一种双路径对比机制：正向路径用于放大视觉证据，负向路径则通过构建反事实样本来惩罚那些由先验主导的生成结果。

By contrasting outputs from both paths during decoding, PND steers generation toward visually grounded results.
通过在解码过程中对比两条路径的输出，PND 能够引导生成结果向更符合视觉事实的方向靠拢。

Experiments on POPE, MME, and CHAIR demonstrate state-of-the-art performance without retraining.
在 POPE、MME 和 CHAIR 等数据集上的实验表明，该方法无需重新训练即可达到业内领先水平。
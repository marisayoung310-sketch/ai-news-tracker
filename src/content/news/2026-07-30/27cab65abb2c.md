---
title: "Deep Label-Wise Attentive Temporal Convolutional Networks Improve Medical Coding"
originalUrl: "https://arxiv.org/abs/2607.25129"
date: "2026-07-29T22:21:27.261Z"
---

# Deep Label-Wise Attentive Temporal Convolutional Networks Improve Medical Coding
# 深度标签注意力时间卷积网络提升医疗编码性能

Medical coding is the task of assigning a set of diagnosis and procedure codes for a hospitalization using recorded notes. It requires aggregating information from different parts of the text and focus to different sections for each individual code, making it a very difficult problem even for professional human coders.

医疗编码是指根据住院记录为患者分配一组诊断和手术代码的任务。该任务需要整合文本不同部分的信息，并针对每个独立的代码关注文档的不同章节，这即使对于专业的人类编码员来说也是一个极具挑战性的难题。

We model the task as a multi-label text classification problem. To overcome the mentioned difficulties, we propose a deep neural model consisting of a multi-layer temporal convolution network (TCN) followed by label-wise attention.

我们将该任务建模为多标签文本分类问题。为了克服上述困难，我们提出了一种深度神经网络模型，该模型由多层时间卷积网络（TCN）和随后的标签注意力机制组成。

While multi-layer TCN helps extract a global document representation with the ability to learn relations over very long sequences, label-specific attention mechanism allows the model to focus on different aspects of the same document for each individual label.

多层 TCN 有助于提取全局文档表示，并具备学习超长序列间关系的能力；而标签特定的注意力机制则允许模型针对每一个独立标签，聚焦于同一文档的不同侧面。

Our method achieves significantly better F-1 scores (9% increase) compared to the previous state-of-the-art model, with a remarkable increase in recall score (28% increase), which we believe is the more important metric for a clinical decision support setting.

与之前的最先进模型相比，我们的方法在 F-1 分数上取得了显著提升（增长 9%），召回率也有了显著提高（增长 28%）。我们认为，对于临床决策支持环境而言，召回率是一个更为重要的指标。
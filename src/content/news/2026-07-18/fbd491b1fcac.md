---
title: "CARPRT: Class-Aware Zero-Shot Prompt Reweighting for Black-Box Vision-Language Models"
originalUrl: "https://arxiv.org/abs/2607.14125"
date: "2026-07-17T22:25:18.294Z"
---

# CARPRT: Class-Aware Zero-Shot Prompt Reweighting for Black-Box Vision-Language Models
# CARPRT：面向黑盒视觉-语言模型的类别感知零样本提示词重加权

Pre-trained vision-language models (VLMs) enable zero-shot image classification by computing the similarity score between an image and textual descriptions, typically formed by inserting a class label (e.g., "cat") into a prompt (e.g., "a photo of a").
预训练视觉-语言模型（VLMs）通过计算图像与文本描述之间的相似度得分来实现零样本图像分类，这些文本描述通常是将类别标签（例如“猫”）插入到提示词（例如“一张……的照片”）中形成的。

Since the score for a given image-class pair is sensitive to the choice of prompt, existing studies ensemble multiple prompts using a weighting vector to aggregate scores across different prompts. Yet, in current strategies, the weighting vector assigned to each prompt is shared across all classes, implicitly assuming that prompts are conditionally independent of classes, which often does not hold in practice, as a prompt like "an aerial view of" might be apt for "airport" but ill-suited for "apple".
由于给定图像-类别对的得分对提示词的选择非常敏感，现有研究通常使用加权向量来集成多个提示词，从而汇总不同提示词下的得分。然而，在当前的策略中，分配给每个提示词的权重向量在所有类别间是共享的，这隐含地假设了提示词与类别是条件独立的。但在实际应用中，这种假设往往不成立，例如“……的鸟瞰图”这一提示词可能非常适合“机场”，但却完全不适用于“苹果”。

To address this, we propose class-aware zero-shot prompt reweighting (CARPRT). This scoring scheme adjusts the weighting vector for each class label by capturing the class-specific relevance of different prompts in a training-free manner.
为了解决这一问题，我们提出了类别感知零样本提示词重加权（CARPRT）。该评分方案通过以无需训练的方式捕捉不同提示词在特定类别下的相关性，为每个类别标签调整权重向量。

For each class label and every available prompt, we quantify their class-specific relevance by averaging image-text relevance scores over images predicted to that class under the given prompt. These estimates are then normalized to derive class-specific weights.
对于每个类别标签和所有可用的提示词，我们通过计算在给定提示词下被预测为该类别的图像的图文相关性得分平均值，来量化它们之间的类别特定相关性。随后，这些估计值会被归一化，从而得出类别特定的权重。

Evaluations on standard image classification benchmarks show that CARPRT outperforms existing class-independent reweighting methods, confirming that modeling prompt-class dependencies is crucial for effective zero-shot prediction and even broader VLM-based application settings that rely on prompt ensembling.
在标准图像分类基准上的评估表明，CARPRT 的表现优于现有的类别无关重加权方法，这证实了对提示词-类别依赖关系进行建模对于实现有效的零样本预测，乃至更广泛的依赖提示词集成的 VLM 应用场景至关重要。

Our code is available at this https URL.
我们的代码可在该链接获取。
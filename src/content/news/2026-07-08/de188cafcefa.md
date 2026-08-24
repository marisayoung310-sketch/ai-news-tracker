---
title: "Jointly Improving Dialect Identification and ASR in Indian Languages using Multimodal Feature Fusion"
originalUrl: "https://arxiv.org/abs/2607.02862"
date: "2026-07-07T22:37:49.043Z"
---

# Jointly Improving Dialect Identification and ASR in Indian Languages using Multimodal Feature Fusion
# 利用多模态特征融合联合提升印度语言的方言识别与自动语音识别 (ASR) 性能

**Abstract:** Automatic Speech Recognition (ASR) and Dialect Identification (DID) are crucial for Indian languages, many of which are low-resource and exhibit significant dialectal differences. Existing methods often optimize ASR or DID individually, resulting in performance trade-offs. 
**摘要：** 自动语音识别 (ASR) 和方言识别 (DID) 对于印度语言至关重要，其中许多语言属于低资源语言，且表现出显著的方言差异。现有的方法通常单独优化 ASR 或 DID，导致性能上存在权衡。

In this work, we propose a multimodal framework that jointly improves ASR and DID. Our method employs a Bottleneck Encoder to extract dialectal features from Conformer-based speech representations and a RoBERTa encoder to process ASR-generated CTC embeddings. A gating mechanism merges these features, followed by an attention encoder to refine the representations. 
在这项工作中，我们提出了一种联合提升 ASR 和 DID 的多模态框架。我们的方法采用瓶颈编码器 (Bottleneck Encoder) 从基于 Conformer 的语音表示中提取方言特征，并使用 RoBERTa 编码器处理 ASR 生成的 CTC 嵌入。通过门控机制融合这些特征，随后利用注意力编码器对表示进行精炼。

The learned embeddings are concatenated with Conformer outputs to enhance ASR features. Evaluated on eight Indian languages with thirty-three dialects, our method achieves an average DID accuracy of 81.63% and average CER and WER of 4.65% and 17.73%, respectively. These results highlight the effectiveness of our method for joint ASR-DID modeling.
学习到的嵌入与 Conformer 的输出进行拼接，以增强 ASR 特征。在包含 33 种方言的 8 种印度语言上进行评估，我们的方法实现了 81.63% 的平均 DID 准确率，以及分别为 4.65% 和 17.73% 的平均字符错误率 (CER) 和词错误率 (WER)。这些结果凸显了我们的方法在联合 ASR-DID 建模方面的有效性。

***

**Paper Details:**
*   **Authors:** Saurabh Kumar, Amartyaveer, Prasanta Kumar Ghosh
*   **Subject:** Computation and Language (cs.CL); Audio and Speech Processing (eess.AS)
*   **arXiv ID:** 2607.02862

**论文详情：**
*   **作者：** Saurabh Kumar, Amartyaveer, Prasanta Kumar Ghosh
*   **学科：** 计算与语言 (cs.CL)；音频与语音处理 (eess.AS)
*   **arXiv ID：** 2607.02862
---
title: "AEyeDE: An Attention-Based Attribution Framework for AI-Generated Text Detection"
originalUrl: "https://arxiv.org/abs/2606.00016"
date: "2026-06-02T23:18:18.892Z"
---

# AEyeDE: An Attention-Based Attribution Framework for AI-Generated Text Detection
# AEyeDE：一种用于 AI 生成文本检测的基于注意力归因框架

**Abstract:** Detecting AI-generated text is becoming increasingly challenging as modern language models approach human-level fluency and can evade detectors that rely on surface statistics or likelihood-based signals. 
**摘要：** 随着现代语言模型在流畅度上日益接近人类水平，并能够规避那些依赖表面统计特征或基于似然信号的检测器，检测 AI 生成文本正变得越来越具有挑战性。

We propose \textsc{AEyeDE}, an attribution-driven approach to human-AI authorship detection that leverages model attention as a discriminative signal. Specifically, we extract attention-based attribution matrices for both human- and AI-generated text using a \emph{proxy} Transformer model with white-box access and train a lightweight Convolutional Neural Network to learn representations from these attribution maps. 
我们提出了 \textsc{AEyeDE}，这是一种基于归因的人机文本作者身份检测方法，它利用模型注意力作为判别信号。具体而言，我们使用具有白盒访问权限的“代理”（proxy）Transformer 模型，提取人类和 AI 生成文本的基于注意力的归因矩阵，并训练一个轻量级卷积神经网络（CNN）来从这些归因图中学习特征表示。

Across encoder-decoder translation settings, our method consistently outperforms a text-only baseline. In decoder-only settings, it performs strongly in generator-specific detection, remains competitive on standard benchmarks, and shows robustness under cross-dataset transfer and alternative-spelling perturbations. 
在编码器-解码器（encoder-decoder）翻译设置中，我们的方法始终优于仅基于文本的基准模型。在仅解码器（decoder-only）设置中，它在特定生成器检测方面表现强劲，在标准基准测试中保持竞争力，并展现出在跨数据集迁移和拼写变体扰动下的鲁棒性。

We further show that attention maps exhibit recurring local structures whose relative frequencies differ consistently between human- and AI-generated text across datasets and proxy models. These findings suggest that attention-based attribution maps provide a complementary and interpretable signal for AI-generated text detection. We will make the code publicly available to support future research.
我们进一步证明，注意力图表现出重复的局部结构，这些结构在不同数据集和代理模型中，其相对频率在人类和 AI 生成文本之间存在显著差异。这些发现表明，基于注意力的归因图为 AI 生成文本检测提供了一种互补且可解释的信号。我们将公开代码以支持未来的研究。
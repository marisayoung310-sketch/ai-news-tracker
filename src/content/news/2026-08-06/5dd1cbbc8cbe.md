---
title: "A Unified 2D Framework for DeepLesion Detection, Segmentation and Short Report Generation"
originalUrl: "https://arxiv.org/abs/2608.02805"
date: "2026-08-05T22:40:17.282Z"
---

# A Unified 2D Framework for DeepLesion Detection, Segmentation and Short Report Generation
# 用于 DeepLesion 病灶检测、分割与简短报告生成的统一 2D 框架

**Abstract:** In previous work, we integrated large language models (LLMs) into the lesion segmentation model based on the ULS23 DeepLesion dataset, using short-form findings from the reports. In this study, we developed a unified 2D lesion analysis framework that integrates LLM-based reasoning, lesion bounding box detection, segmentation, and radiology report generation from the original DeepLesion dataset.

**摘要：** 在之前的工作中，我们基于 ULS23 DeepLesion 数据集，利用报告中的简短发现，将大语言模型（LLMs）集成到了病灶分割模型中。在本研究中，我们开发了一个统一的 2D 病灶分析框架，该框架集成了基于 LLM 的推理、病灶边界框检测、分割以及从原始 DeepLesion 数据集中生成放射学报告的功能。

In the testing phase, we achieved relatively high lesion bounding box detection accuracy with mAP50 of 70.1%, mAP50-95 of 46.4%; Lesion segmentation performance with a Dice score of 62.6%; short report generation accuracy with BLEU_1 score of 64.3%, BLEU_4 score of 49.6%, METEOR of 34.7%, and ROUGE_L of 60.1%.

在测试阶段，我们实现了相对较高的病灶边界框检测精度，mAP50 为 70.1%，mAP50-95 为 46.4%；病灶分割性能的 Dice 得分为 62.6%；简短报告生成的准确率方面，BLEU_1 得分为 64.3%，BLEU_4 得分为 49.6%，METEOR 得分为 34.7%，ROUGE_L 得分为 60.1%。

In this work, we address the challenging issue of segmentation in the original DeepLesion dataset and achieve a 28.5% Dice score improvement over the nnUNet lesion segmentation model. We also integrated spatial and anatomical context into the DeepLesion short report generation. We released the implementation, dataset, and models on Github.

在这项工作中，我们解决了原始 DeepLesion 数据集中具有挑战性的分割问题，并比 nnUNet 病灶分割模型实现了 28.5% 的 Dice 得分提升。我们还将空间和解剖学背景信息整合到了 DeepLesion 的简短报告生成中。我们已在 Github 上发布了相关实现、数据集和模型。
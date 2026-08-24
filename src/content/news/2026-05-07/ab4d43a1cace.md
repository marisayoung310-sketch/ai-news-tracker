---
title: "DINO Soars: DINOv3 for Open-Vocabulary Semantic Segmentation of Remote Sensing Imagery"
originalUrl: "https://arxiv.org/abs/2605.03175"
date: "2026-05-06T23:01:15.830Z"
---

# DINO Soars: DINOv3 for Open-Vocabulary Semantic Segmentation of Remote Sensing Imagery
# DINO 腾飞：用于遥感图像开放词汇语义分割的 DINOv3

**Abstract:** The remote sensing (RS) domain suffers from a lack of densely labeled datasets, which are costly to obtain. Thus, models that can segment RS imagery well without supervised fine-tuning are valuable, but existing solutions fall behind supervised methods. 

**摘要：** 遥感（RS）领域面临着缺乏密集标注数据集的问题，而获取这些数据成本高昂。因此，无需监督微调即可良好分割遥感图像的模型极具价值，但现有的解决方案仍落后于监督学习方法。

Recently, DINOv3 surpassed SOTA RS foundation models on the GEO-bench segmentation benchmark without pre-training on RS data. Additionally, this http URL has enabled open vocabulary semantic segmentation (OVSS) with the DINOv3 backbone. We leverage these developments to form an OVSS model for RS imagery, free of RS-domain fine-tuning. 

最近，DINOv3 在未经过遥感数据预训练的情况下，在 GEO-bench 分割基准测试中超越了最先进（SOTA）的遥感基础模型。此外，相关技术已实现了基于 DINOv3 主干网络的开放词汇语义分割（OVSS）。我们利用这些进展构建了一个用于遥感图像的 OVSS 模型，且无需进行遥感领域的微调。

Our model, CAFe-DINO (Cost Aggregation + Feature Upsampling with DINO) exploits the strong OVSS performance of DINOv3 for RS imagery via cost aggregation and training-free upsampling of text-image similarity scores. The robust latent of the DINOv3 backbone eliminates the need for fine-tuning on RS imagery; we instead fine-tune our model on a RS-targeted subset of COCO-Stuff. 

我们的模型 CAFe-DINO（基于 DINO 的代价聚合与特征上采样）通过代价聚合和文本-图像相似度分数的免训练上采样，充分发挥了 DINOv3 在遥感图像上的强大 OVSS 性能。DINOv3 主干网络稳健的潜在特征消除了在遥感图像上进行微调的需求；作为替代，我们在 COCO-Stuff 的遥感目标子集上对模型进行了微调。

CAFe-DINO achieves state-of-the-art performance on key RS segmentation datasets, outperforming OVSS methods fine-tuned on RS data. Our code and data are publicly available at this https URL.

CAFe-DINO 在关键的遥感分割数据集上达到了最先进的性能，优于在遥感数据上进行微调的 OVSS 方法。我们的代码和数据已在指定链接公开。
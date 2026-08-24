---
title: "Synthetic and Derived Training Images for Campus Waste Detection: A Multi-Seed Evaluation with YOLOv8n"
originalUrl: "https://arxiv.org/abs/2607.19535"
date: "2026-07-23T22:35:54.481Z"
---

# Synthetic and Derived Training Images for Campus Waste Detection: A Multi-Seed Evaluation with YOLOv8n
# 用于校园垃圾检测的合成与衍生训练图像：基于 YOLOv8n 的多种子评估

**Abstract:** Incorrect disposal can contaminate campus recycling streams, and a bin-mounted camera could provide feedback as an item is discarded. We evaluated whether synthetic and derived images improve a YOLOv8n detector for this view. The real dataset contained 148 campus photographs: 86 for training, 31 for validation, and 31 for testing. Twelve joint-training configurations varied the amount and source of added images. We repeated seven principal settings with four matched seeds and computed bootstrap percentile intervals over those seeds.

**摘要：** 错误的垃圾投放会污染校园回收流，而安装在垃圾桶上的摄像头可以在物品丢弃时提供反馈。我们评估了合成图像和衍生图像是否能改善 YOLOv8n 检测器在这一场景下的表现。真实数据集包含 148 张校园照片：86 张用于训练，31 张用于验证，31 张用于测试。我们设置了十二种联合训练配置，改变了添加图像的数量和来源。我们使用四个匹配的随机种子重复了七种主要设置，并计算了这些种子下的自助法（bootstrap）百分位区间。

The real-only model reached a mean mAP@0.5 of 0.691 [0.665, 0.722]. Background replacement reduced the mean to 0.560 [0.499, 0.619], isolated-object images gave 0.680 [0.644, 0.724], and the full augmentation pool gave 0.487 [0.438, 0.537]. We also tested hand-and-forearm composites because every real photo showed a held object. Two cutouts in the initial composite set came from test photographs, so we discarded that experiment, rebuilt the set with training-split cutouts, and reran all four seeds. The corrected paired difference was +0.034 [-0.063, 0.199], which does not support a reliable hand-composite effect.

仅使用真实数据的模型平均 mAP@0.5 达到 0.691 [0.665, 0.722]。背景替换将平均值降低至 0.560 [0.499, 0.619]，孤立对象图像得到 0.680 [0.644, 0.724]，而全增强池则为 0.487 [0.438, 0.537]。我们还测试了手部和前臂的合成图像，因为每张真实照片都显示了被持有的物体。由于初始合成集中的两个剪切图来自测试集照片，我们废弃了该实验，使用训练集剪切图重建了数据集，并重新运行了所有四个种子。修正后的配对差异为 +0.034 [-0.063, 0.199]，这并不支持手部合成具有可靠的提升效果。

Single-seed transfer experiments produced source-dependent rankings between joint mixing and sequential pretraining. None of the evaluated configurations exceeded the real-only baseline. The reported intervals quantify seed variation; the 31-photo test set remains too small for strong class-specific conclusions.

单种子迁移实验在联合混合训练和顺序预训练之间产生了依赖于来源的排名。所有评估的配置均未超过仅使用真实数据的基准模型。报告的区间量化了种子差异；31 张照片的测试集对于得出强有力的特定类别结论来说仍然太小。
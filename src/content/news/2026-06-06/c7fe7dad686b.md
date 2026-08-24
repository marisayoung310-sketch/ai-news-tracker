---
title: "TopoPult-SSL: Gland-Mask-Free Cross-Device Meibomian Gland Segmentation via Self-Distilled Weak Clinical Priors"
originalUrl: "https://arxiv.org/abs/2606.05347"
date: "2026-06-05T22:49:29.917Z"
---

# TopoPult-SSL: Gland-Mask-Free Cross-Device Meibomian Gland Segmentation via Self-Distilled Weak Clinical Priors
# TopoPult-SSL：基于自蒸馏弱临床先验的跨设备睑板腺无掩模分割技术

**Abstract:** Every new clinical imaging device creates a domain shift where dense gland masks are expensive yet cheap clinical signals -- eyelid outlines, Pult grades, morphometric ratios -- are routinely recorded.
**摘要：** 每一种新的临床成像设备都会产生领域偏移（domain shift），在这种情况下，获取密集的腺体掩模（gland masks）成本高昂，但一些廉价的临床信号——如眼睑轮廓、Pult 分级和形态计量比——却是常规记录的数据。

We present TopoPult-SSL, a two-stage framework for cross-device meibomian gland segmentation. Stage 1 adapts a source-trained model without target gland masks in the training loss, using four weak-prior anchors driven by target eyelid masks and clinical metadata only.
我们提出了 TopoPult-SSL，这是一个用于跨设备睑板腺分割的两阶段框架。第一阶段在训练损失函数中不使用目标腺体掩模，而是通过仅由目标眼睑掩模和临床元数据驱动的四个弱先验锚点，对源训练模型进行适配。

Stage 2, when target gland masks are available, distils complementary Stage-1 teachers into a single compact student via supervised self-distillation.
第二阶段，当目标腺体掩模可用时，通过监督自蒸馏将第一阶段互补的教师模型提炼为一个单一的紧凑学生模型。

We develop and validate the technique on the public MGD-1k to CAMG research benchmark (1,000 to 100 images, different device), where the distilled model achieves Dice 0.716+/-0.006 (best 0.726), surpassing UA-MT (0.710) and the ensemble teacher (0.720) -- with a single pass.
我们在公开的 MGD-1k 到 CAMG 研究基准（1,000 张到 100 张图像，不同设备）上开发并验证了该技术。实验结果显示，蒸馏后的模型在单次推理中达到了 0.716+/-0.006 的 Dice 系数（最优为 0.726），超过了 UA-MT (0.710) 和集成教师模型 (0.720)。

The gland-mask-free Stage-1 variant reaches Precision 0.694 vs. 0.30-0.34 for SAM/MedSAM (p<0.001), enabling deployment without dense gland contouring. Code and reproducibility scripts are released.
无需腺体掩模的第一阶段变体达到了 0.694 的精度，而 SAM/MedSAM 的精度仅为 0.30-0.34 (p<0.001)，这使得在无需密集腺体轮廓标注的情况下进行部署成为可能。相关代码和可复现脚本已发布。
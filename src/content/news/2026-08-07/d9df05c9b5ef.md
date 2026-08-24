---
title: "Advancing Utility Pole and Sign Detection Through Deep Learning"
originalUrl: "https://arxiv.org/abs/2608.04061"
date: "2026-08-07T01:15:15.875Z"
---

# Advancing Utility Pole and Sign Detection Through Deep Learning
# 通过深度学习推进电线杆与标志检测技术

Utility poles are an essential part of the infrastructure used to support power distribution systems and other critical public services. Their regular inspection is crucial to ensure the stability and safety of the electrical grid. A deep learning framework is presented for the automated detection, segmentation and lean angle estimation of wooden utility poles, and classification of attached electrical warning signs, using ground-level imagery.

电线杆是支撑配电系统及其他关键公共服务基础设施的重要组成部分。定期检查电线杆对于确保电网的稳定性和安全性至关重要。本文提出了一种深度学习框架，利用地面图像对木质电线杆进行自动检测、分割和倾斜角度估计，并对附带的电气警告标志进行分类。

The system is trained on a custom dataset of 4,570 annotated images extracted from Google Street View, featuring challenging real-world scenes with visually ambiguous wooden poles lacking distinctive features. The proposed model is based on the Detection Transformer (DETR), suitably modified and trained on the custom dataset.

该系统基于从谷歌街景（Google Street View）中提取的 4,570 张标注图像组成的自定义数据集进行训练，这些图像涵盖了具有挑战性的现实场景，其中包含缺乏显著特征、视觉上难以辨认的木质电线杆。所提出的模型基于检测转换器（DETR），并针对该自定义数据集进行了适当的修改和训练。

The model outperforms standard object detectors (RetinaNet, Faster R-CNN, YOLOv3-Tiny), achieving a mean average precision of 90.43% for pole detection and 88.26% for sign detection. Extending this model with a segmentation head enables per-instance mask generation, which is then used to estimate pole lean angle.

该模型的性能优于标准目标检测器（RetinaNet、Faster R-CNN、YOLOv3-Tiny），在电线杆检测方面实现了 90.43% 的平均精度（mAP），在标志检测方面实现了 88.26% 的平均精度。通过为该模型增加一个分割头，可以实现实例级掩码生成，进而用于估计电线杆的倾斜角度。

The model accurately estimates lean for 1,367 out of 1,433 test-set poles, with a mean absolute error of 1.01 degrees. Moreover, the custom dataset created in this work is also made publicly available to be used as a benchmark.

该模型能够准确估计测试集中 1,433 根电线杆中的 1,367 根的倾斜度，平均绝对误差为 1.01 度。此外，本研究中创建的自定义数据集也已公开，可作为基准测试使用。
---
title: "VigilFormer: Deformable Attention for Video Anomaly Detection with Causal Risk Inference"
originalUrl: "https://arxiv.org/abs/2606.14724"
date: "2026-06-16T23:09:53.657Z"
---

# VigilFormer: Deformable Attention for Video Anomaly Detection with Causal Risk Inference
# VigilFormer：用于视频异常检测的变形注意力机制与因果风险推理

**Abstract:** Video anomaly detection in surveillance settings must balance detection accuracy against real-time throughput, a tension that existing methods address either through stronger feature extractors or more efficient architectures, but rarely both. 

**摘要：** 监控场景下的视频异常检测必须在检测准确率与实时吞吐量之间取得平衡。现有的方法通常要么通过更强大的特征提取器，要么通过更高效的架构来解决这一矛盾，但很少能两者兼顾。

We present VigilFormer, a unified framework that combines deformable spatio-temporal attention with causal temporal modeling to detect anomalies in untrimmed surveillance video. 

我们提出了 VigilFormer，这是一个统一的框架，它将变形时空注意力机制（Deformable Spatio-Temporal Attention）与因果时间建模相结合，用于检测未剪辑监控视频中的异常。

The proposed Deformable Spatio-Temporal Encoder (DSTE) attends to a sparse set of informative locations across frames, avoiding the quadratic cost of dense attention while retaining the ability to capture irregular motion patterns. 

所提出的变形时空编码器（DSTE）关注跨帧的一组稀疏且具有信息量的位置，在避免密集注意力机制带来的二次方计算成本的同时，保留了捕捉不规则运动模式的能力。

A Causal Anomaly Classifier (CAC) applies dilated causal convolutions over snippet-level features and optimizes a contrastive multiple-instance learning objective that separates anomalous and normal representations without frame-level labels. 

因果异常分类器（CAC）在片段级特征上应用扩张因果卷积，并优化对比多实例学习目标，从而在没有帧级标签的情况下区分异常与正常表征。

To meet deployment constraints, an Adaptive Confidence Scheduler (ACS) dynamically skips low-information frames at inference time, reducing redundant computation in static scenes. 

为了满足部署限制，自适应置信度调度器（ACS）在推理时动态跳过低信息帧，减少了静态场景中的冗余计算。

Evaluated on UCF-Crime, ShanghaiTech, and CUHK Avenue, VigilFormer achieves AUC scores of 87.83%, 97.21%, and 89.74% respectively, at 41.5 FPS on a single GPU, outperforming recent weakly-supervised methods in both accuracy and speed.

在 UCF-Crime、ShanghaiTech 和 CUHK Avenue 数据集上的评估结果显示，VigilFormer 分别达到了 87.83%、97.21% 和 89.74% 的 AUC 分数，并在单 GPU 上实现了 41.5 FPS 的处理速度，在准确率和速度上均优于近期的弱监督方法。
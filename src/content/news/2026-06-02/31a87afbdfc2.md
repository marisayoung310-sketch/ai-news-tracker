---
title: "Lightweight SAR Ship Detection via Contrastive Distillation"
originalUrl: "https://arxiv.org/abs/2605.30380"
date: "2026-06-01T23:22:01.224Z"
---

# Lightweight SAR Ship Detection via Contrastive Distillation
# 基于对比蒸馏的轻量化 SAR 舰船检测

**Abstract:** Deep convolutional and transformer-based detectors achieve strong performance for SAR ship detection but are often computationally prohibitive for real-time or onboard deployment. Lightweight models offer improved efficiency yet struggle to capture the complex structural relationships inherent in SAR backscatter.

**摘要：** 基于深度卷积和 Transformer 的检测器在 SAR 舰船检测方面表现出色，但往往因计算量过大而难以实现实时或机载部署。轻量化模型虽然提高了效率，却难以捕捉 SAR 后向散射中固有的复杂结构关系。

Most existing SAR knowledge-distillation approaches rely on feature or logit matching, which enforces localized activation similarity while neglecting the geometric relationships among object representations. We propose a Structured Unified Relational knowledGE distillation framework for SAR Ship detection (SURGE) that transfers relational geometry from a powerful teacher detector to a compact student detector using a contrastive InfoNCE objective in a shared projection embedding space.

目前大多数 SAR 知识蒸馏方法依赖于特征或 Logit 匹配，这种方法仅强制执行局部激活相似性，却忽略了对象表示之间的几何关系。我们提出了一种用于 SAR 舰船检测的结构化统一关系知识蒸馏框架（SURGE），该框架通过共享投影嵌入空间中的对比 InfoNCE 目标，将关系几何信息从强大的教师检测器迁移到紧凑的学生检测器中。

To the best of our knowledge, this work presents the first transformer-based SAR ship detector knowledge distillation framework in SAR domain. The framework is architecture-agnostic in the sense that it provides a common region-level distillation interface for two-stage, one-stage and transformer-based detectors without modifying their deployed architectures.

据我们所知，这项工作是 SAR 领域首个基于 Transformer 的舰船检测器知识蒸馏框架。该框架具有架构无关性，它为两阶段、单阶段和基于 Transformer 的检测器提供了一个通用的区域级蒸馏接口，且无需修改其已部署的架构。

Experiments on the SSDD and HRSID benchmarks demonstrate that the proposed method yields substantial improvements for two-stage detectors, achieving up to 6.2 mAP and 8.0 AP75 gains over baseline student and even surpassing teacher performance.

在 SSDD 和 HRSID 基准测试上的实验表明，该方法为两阶段检测器带来了显著的性能提升，相比基准学生模型，mAP 提升高达 6.2，AP75 提升高达 8.0，甚至超过了教师模型的性能。
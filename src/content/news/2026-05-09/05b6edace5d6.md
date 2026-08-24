---
title: "Two Steps Are All You Need: Efficient 3D Point Cloud Anomaly Detection with Consistency Models"
originalUrl: "https://arxiv.org/abs/2605.05372"
date: "2026-05-08T22:47:23.491Z"
---

# Two Steps Are All You Need: Efficient 3D Point Cloud Anomaly Detection with Consistency Models
# 只需两步：基于一致性模型的 3D 点云异常检测高效方案

**Abstract:** Diffusion models are rapidly redefining 3D anomaly detection in point cloud data. As 3D sensing becomes integral to modern manufacturing, reliable anomaly detection is essential for high-throughput quality assurance and process control. Yet practical deployment on resource-constrained, latency-critical systems remains limited. Existing methods are often computationally prohibitive or unreliable in complex, unmasked regions, and diffusion pipelines are inherently bottlenecked by iterative denoising.

**摘要：** 扩散模型正在迅速重塑 3D 点云数据的异常检测领域。随着 3D 感知技术成为现代制造业不可或缺的一部分，可靠的异常检测对于高吞吐量的质量保证和过程控制至关重要。然而，在资源受限且对延迟敏感的系统中，其实际部署仍然受到限制。现有方法往往计算成本过高，或在复杂的未遮罩区域表现不可靠，且扩散模型流水线固有的迭代去噪过程也成为了性能瓶颈。

In this work, we address this bottleneck by reformulating reconstruction-based anomaly detection through consistency learning, enabling direct prediction of anomaly-free geometry in one or two network evaluations. We further introduce a novel hybrid loss formulation that explicitly enforces reconstruction toward clean data. This design substantially reduces inference cost, achieving up to 80x faster runtime than the current state-of-the-art method, without GPU acceleration, while preserving strong detection performance.

在这项工作中，我们通过一致性学习重新构建了基于重构的异常检测方法，从而解决了这一瓶颈，实现了仅需一到两次网络评估即可直接预测无异常几何结构的目标。此外，我们引入了一种新颖的混合损失函数，明确强化了向干净数据重构的约束。该设计大幅降低了推理成本，在无需 GPU 加速的情况下，运行速度比当前最先进的方法快 80 倍，同时保持了强大的检测性能。

It outperforms R3D-AD on Anomaly-ShapeNet with 76.20% I-AUROC and remains competitive on Real3DAD with 72.80% I-AUROC, enabling efficient, low-latency anomaly detection on resource-constrained platforms, including drones, smart industrial cameras, and other edge devices.

该方法在 Anomaly-ShapeNet 数据集上以 76.20% 的 I-AUROC 指标超越了 R3D-AD，并在 Real3DAD 数据集上以 72.80% 的 I-AUROC 保持了极具竞争力的表现。这使得在无人机、智能工业相机及其他边缘设备等资源受限平台上，实现高效、低延迟的异常检测成为可能。
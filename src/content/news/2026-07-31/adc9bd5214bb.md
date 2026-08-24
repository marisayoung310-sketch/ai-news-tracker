---
title: "DVPSFormer: Efficient Online Depth-aware Video Panoptic Segmentation for Autonomous Driving"
originalUrl: "https://arxiv.org/abs/2607.26165"
date: "2026-07-30T22:37:41.737Z"
---

# DVPSFormer: Efficient Online Depth-aware Video Panoptic Segmentation for Autonomous Driving
# DVPSFormer：用于自动驾驶的高效在线深度感知视频全景分割

Safe autonomous navigation requires a holistic understanding of dynamic environments, necessitating the simultaneous estimation of metric depth, semantic segmentation, and instance trajectories. While depth-aware video panoptic segmentation (DVPS) unifies these tasks, existing approaches often rely on computationally expensive, multi-stage pipelines or offline tracking, rendering them unsuitable for real-time decision-making.

安全的自动驾驶需要对动态环境有全面的理解，这要求同时估计度量深度、语义分割和实例轨迹。虽然深度感知视频全景分割（DVPS）统一了这些任务，但现有方法通常依赖于计算成本高昂的多阶段流水线或离线跟踪，使其无法满足实时决策的需求。

To address this, we propose DVPSFormer, a unified online architecture designed for efficient 4D scene understanding. Central to our approach is explicit scene discretization (ESD), a novel mechanism that leverages segmentation queries to represent foreground and background regions, enabling a discrete-to-continuous (D2C) depth head to decode metric depth in a single pass. This tightly couples semantic and geometric learning while significantly reducing latency.

为了解决这一问题，我们提出了 DVPSFormer，这是一种专为高效 4D 场景理解而设计的统一在线架构。我们方法的核心是显式场景离散化（ESD），这是一种利用分割查询来表示前景和背景区域的新颖机制，使离散到连续（D2C）深度头能够单次解码度量深度。这不仅紧密耦合了语义和几何学习，还显著降低了延迟。

Furthermore, we propose an online majority voting (OMV) mechanism that exploits temporal consistency to refine classification during instance tracking. DVPSFormer establishes a new state-of-the-art on the Cityscapes-DVPS and SemKITTI-DVPS benchmarks, offering a streamlined solution for online robotic perception. Code and models are available at this https URL.

此外，我们提出了一种在线多数投票（OMV）机制，利用时间一致性在实例跟踪过程中优化分类结果。DVPSFormer 在 Cityscapes-DVPS 和 SemKITTI-DVPS 基准测试中确立了新的行业领先水平，为在线机器人感知提供了一种精简的解决方案。代码和模型可在该链接获取。
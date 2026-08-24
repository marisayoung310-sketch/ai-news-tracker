---
title: "D$^2$Turb: Depth-Aware Simulation and Decoupled Learning for Single-Frame Atmospheric Turbulence Mitigation"
originalUrl: "https://arxiv.org/abs/2605.27460"
date: "2026-05-28T23:07:38.407Z"
---

### D$^2$Turb: Depth-Aware Simulation and Decoupled Learning for Single-Frame Atmospheric Turbulence Mitigation
**D$^2$Turb：用于单帧大气湍流修复的深度感知模拟与解耦学习方法**

---

**Abstract:** Single-frame atmospheric turbulence mitigation is inherently ill-posed due to spatially varying blur coupled with non-rigid geometric distortion. Existing end-to-end approaches trained on flat-field simulations often struggle to balance texture recovery with geometric rectification. To overcome this limitation, we propose D$^2$Turb, a unified framework that bridges physics-grounded simulation with explicitly decoupled restoration.

**摘要：** 由于空间变化的模糊与非刚性几何畸变相互耦合，单帧大气湍流修复本质上是一个病态问题。现有的基于平面场模拟训练的端到端方法，往往难以在纹理恢复与几何校正之间取得平衡。为了克服这一局限，我们提出了 D$^2$Turb，这是一个将物理基础模拟与显式解耦修复相结合的统一框架。

---

First, we introduce a Depth-Aware Turbulence Synthesis protocol that incorporates scene depth into the phase-to-space formulation. This generates physically consistent, depth-dependent degradations and provides a crucial intermediate tilt supervision signal for disentangled learning.

首先，我们引入了一种深度感知湍流合成协议，将场景深度纳入相位到空间的公式中。该协议能够生成物理一致且具有深度依赖性的退化效果，并为解耦学习提供了关键的中间倾斜（tilt）监督信号。

---

Building upon this simulation engine, D$^2$Turb decomposes restoration into two interactive stages: texture deblurring and geometric rectification. The texture deblurring stage employs a deblurring backbone to recover fine-grained details while preserving geometric distortion for the subsequent rectification stage.

基于该模拟引擎，D$^2$Turb 将修复过程分解为两个交互阶段：纹理去模糊和几何校正。纹理去模糊阶段采用去模糊主干网络来恢复细粒度细节，同时为后续的校正阶段保留几何畸变信息。

---

To mitigate the information fragmentation commonly observed in cascaded designs, we further propose an Adaptive Structural Prior Injection (ASPI) mechanism that dynamically transfers deep structural representations from the deblurring module to guide dense flow prediction for spatial unwarping.

为了缓解级联设计中常见的碎片化信息问题，我们进一步提出了一种自适应结构先验注入（ASPI）机制，该机制能够动态地将去模糊模块中的深度结构表征传递出去，从而引导用于空间解畸变的稠密流预测。

---

Extensive experiments demonstrate that D$^2$Turb achieves state-of-the-art performance on both synthetic and real-world datasets, with consistent improvements in both texture recovery and geometric fidelity. Our code and pre-trained models are publicly available at this https URL.

大量实验表明，D$^2$Turb 在合成数据集和真实世界数据集上均达到了最先进的性能，在纹理恢复和几何保真度方面均有持续提升。我们的代码和预训练模型已在链接地址公开。
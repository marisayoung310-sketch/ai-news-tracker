---
title: "MultiView-Bench: A Diagnostic Benchmark for World-Centric Multi-View Integration in VLMs"
originalUrl: "https://arxiv.org/abs/2607.08970"
date: "2026-07-13T22:24:12.342Z"
---

# MultiView-Bench: A Diagnostic Benchmark for World-Centric Multi-View Integration in VLMs
# MultiView-Bench：用于视觉语言模型（VLM）中以世界为中心的多视图整合的诊断基准

**Abstract:** Recent benchmarks for VLMs largely assess single- or limited-view perception, leaving untested the core cognitive ability to integrate observations across viewpoints into a coherent, world-centric (allocentric) 3D mental model.
**摘要：** 近期的视觉语言模型（VLM）基准测试主要评估单视图或有限视图的感知能力，而未能测试将不同视角的观察结果整合为连贯的、以世界为中心（异中心）的3D心理模型这一核心认知能力。

We introduce MultiView-Bench, a diagnostic benchmark expressly designed to evaluate multi-view integration for holistic 3D scene comprehension. Unlike existing datasets that focus on pixel-level mapping or camera-relative navigation, MultiView-Bench requires models to decouple object positioning from transient perspectives and ground them in a fixed global coordinate system.
我们推出了 MultiView-Bench，这是一个专门为评估全方位3D场景理解中的多视图整合能力而设计的诊断基准。与现有的侧重于像素级映射或相机相对导航的数据集不同，MultiView-Bench 要求模型将物体定位与瞬时视角解耦，并将其置于固定的全局坐标系中。

This capability serves as a prerequisite for VLMs before being deployed for downstream tasks such as mechanical part assembly. Our systematic evaluation of frontier VLMs reveals consistent failure modes: strong performance on 2D planar relations from a single image, but marked difficulty with 3D spatial relations and with aggregating information across views.
这种能力是 VLM 在部署到机械零件组装等下游任务前必须具备的前提条件。我们对前沿 VLM 的系统性评估揭示了其一致的失效模式：模型在处理单张图像的2D平面关系时表现出色，但在处理3D空间关系以及跨视图信息聚合时存在显著困难。

We further identify biases in VLMs, such as struggles with unconventional axis directions and sensitivity to object colorways and texture variations. Acknowledging these limitations, we propose ViewNavigator, a multi-agent framework that actively selects informative viewpoints, perceives, and fuses multi-view evidence, improving diverse base models on MultiView-Bench even under a strict budget-matched comparison (and by 3-5x for the full agent).
我们进一步识别了 VLM 中的偏差，例如难以处理非常规轴向，以及对物体配色和纹理变化的敏感性。针对这些局限性，我们提出了 ViewNavigator，这是一个多智能体框架，能够主动选择信息丰富的视角，感知并融合多视图证据。即使在严格的预算匹配比较下，该框架也能提升多种基础模型在 MultiView-Bench 上的表现（完整智能体版本性能提升了 3-5 倍）。
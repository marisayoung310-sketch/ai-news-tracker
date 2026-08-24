---
title: "Scale-Gest: Scalable Model-Space Synthesis and Runtime Selection for On-Device Gesture Detection"
originalUrl: "https://arxiv.org/abs/2605.12506"
date: "2026-05-14T22:58:26.354Z"
---

# Scale-Gest: Scalable Model-Space Synthesis and Runtime Selection for On-Device Gesture Detection
# Scale-Gest：用于端侧手势检测的可扩展模型空间合成与运行时选择

**Abstract:** Realizing on-device ML-based gesture detection under tight real-time performance, energy and memory constraints is challenging, especially when considering mobile devices with varying battery-power levels. Existing EdgeAI deployments typically rely on a single fixed detector, limiting optimization opportunities.
**摘要：** 在严格的实时性能、能耗和内存限制下实现基于机器学习的端侧手势检测极具挑战性，尤其是在考虑电池电量各异的移动设备时更是如此。现有的边缘人工智能（EdgeAI）部署通常依赖于单一的固定检测器，这限制了优化空间。

We present Scale-Gest, a novel run-time adaptive gesture detection framework that expands the detector space into a dense family of tiny-YOLO architectures. We introduce multiple novel device-calibrated ACE (Accuracy-Complexity-Energy) profiles by analyzing different model-resolution-stride operating points.
我们提出了 Scale-Gest，这是一个新颖的运行时自适应手势检测框架，它将检测器空间扩展为一个密集的 tiny-YOLO 架构族。通过分析不同的模型分辨率和步长（stride）工作点，我们引入了多种新颖的、经设备校准的 ACE（准确度-复杂度-能耗）配置文件。

A lightweight run-time controller selects an appropriate ACE mode under user-defined and battery constraints, while a motion-aware hand-gesture-tracking ROI gate crops the input for reduced complexity detection. To evaluate performance of our system in real-world car driving scenarios, we introduce a temporally-annotated Driver Simulated Gesture (DSG-18) dataset.
一个轻量级的运行时控制器会在用户定义和电池电量的约束下选择合适的 ACE 模式，同时，一个具备运动感知能力的手势追踪 ROI（感兴趣区域）门控机制会对输入进行裁剪，以降低检测复杂度。为了评估我们的系统在真实驾驶场景中的性能，我们引入了一个带有时间标注的驾驶员模拟手势（DSG-18）数据集。

Scale-Gest maintains event-level F1 while significantly reducing energy and latency compared to single-detector approaches. On a battery-powered laptop running gesture streams, our ACE controller reduces per-frame energy by 4x (from 6.9 mJ to 1.6 mJ) while maintaining high gesture-detection performance (event-level F1 = 0.8-0.9) and low mean latency (6 ms).
与单一检测器方法相比，Scale-Gest 在保持事件级 F1 分数的同时，显著降低了能耗和延迟。在一台运行手势流的电池供电笔记本电脑上，我们的 ACE 控制器将单帧能耗降低了 4 倍（从 6.9 mJ 降至 1.6 mJ），同时保持了高性能的手势检测（事件级 F1 = 0.8-0.9）和较低的平均延迟（6 毫秒）。
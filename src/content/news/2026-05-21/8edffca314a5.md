---
title: "EgoTraj: Real-World Egocentric Human Trajectory Dataset for Multimodal Prediction"
originalUrl: "https://arxiv.org/abs/2605.19004"
date: "2026-05-20T23:16:25.134Z"
---

# EgoTraj: Real-World Egocentric Human Trajectory Dataset for Multimodal Prediction

**EgoTraj：用于多模态预测的真实世界第一人称人类轨迹数据集**

***

Accurately forecasting human trajectories from an egocentric perspective plays a central role in applications such as humanoid robotics, wearable sensing systems, and assistive navigation. However, progress in this direction remains limited due to the scarcity of egocentric trajectory datasets collected in real-world environments.

从第一人称视角准确预测人类轨迹在人形机器人、可穿戴传感系统和辅助导航等应用中起着核心作用。然而，由于在真实环境中采集的第一人称轨迹数据集稀缺，该领域的研究进展仍然受限。

Addressing this need, we introduce EgoTraj, an egocentric multimodal open dataset recorded using Meta Quest Pro (MQPro). EgoTraj contains 75 sequences of human navigation collected from multiple MQPro wearers in real-world urban environments. Each recording provides synchronized RGB video along with ground-truth data, including continuous time-synchronized 6-degree-of-freedom head poses, per-frame 3D eye gaze vectors, scene annotations.

为了解决这一需求，我们推出了 EgoTraj，这是一个使用 Meta Quest Pro (MQPro) 记录的第一人称多模态开源数据集。EgoTraj 包含 75 段在真实城市环境中由多名 MQPro 佩戴者采集的人类导航序列。每段记录都提供了同步的 RGB 视频以及地面真值数据，包括连续的时间同步 6 自由度头部姿态、逐帧 3D 眼动注视向量和场景标注。

To the best of our knowledge, EgoTraj differs from typical egocentric trajectory datasets by capturing long-horizon, self-directed navigation across diverse urban routes with broad participant diversity. To demonstrate the potential of the dataset, we benchmark several state-of-the-art methods for egocentric trajectory prediction and conduct ablation studies to analyze the contributions of gaze, scene, and motion cues.

据我们所知，EgoTraj 与典型第一人称轨迹数据集的不同之处在于，它捕捉了跨越多样化城市路线、具有广泛参与者多样性的长时程、自主导航数据。为了展示该数据集的潜力，我们对几种最先进的第一人称轨迹预测方法进行了基准测试，并进行了消融研究，以分析注视、场景和运动线索的贡献。

The results highlight the utility of EgoTraj for AR-based perception, navigation, and assistive systems. The EgoTraj dataset, code, and EgoViz Dashboard are publicly available at this https URL.

研究结果突显了 EgoTraj 在基于 AR 的感知、导航和辅助系统中的实用价值。EgoTraj 数据集、代码和 EgoViz 仪表板现已在指定网址公开。
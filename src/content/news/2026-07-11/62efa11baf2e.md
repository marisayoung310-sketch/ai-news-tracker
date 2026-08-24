---
title: "Beyond Thermal Imaging: Inferring Thermophysical Properties from Time-Resolved Thermal Observations"
originalUrl: "https://arxiv.org/abs/2607.07962"
date: "2026-07-10T22:37:08.002Z"
---

# Beyond Thermal Imaging: Inferring Thermophysical Properties from Time-Resolved Thermal Observations
# 超越热成像：从时间分辨热观测中推断热物理性质

**Abstract:** Inferring latent physical properties from sensory observations is a fundamental challenge in machine perception. Among available sensing modalities, thermal imaging is particularly promising because temperature evolution is directly governed by heat-transfer physics and therefore encodes information about underlying thermophysical properties of a scene.

**摘要：** 从感官观测中推断潜在的物理属性是机器感知领域的一项基本挑战。在现有的传感模态中，热成像技术尤为具有前景，因为温度演变直接受热传递物理定律支配，因此编码了场景底层热物理性质的相关信息。

Recovering spatially resolved thermophysical properties from thermal observations could transform applications ranging from digital twins and infrastructure monitoring to robotics and scientific imaging. However, existing thermal scene reconstruction methods can recover temperature fields in complex 3D environments without identifying the thermophyiscal properties that govern thermal evolution, whereas inverse methods provide physically interpretable parameter estimation but typically rely on simplified geometries and controlled experimental conditions.

从热观测中恢复空间分辨的热物理性质，有望变革从数字孪生、基础设施监测到机器人技术和科学成像等多个应用领域。然而，现有的热场景重建方法虽然能够在复杂的 3D 环境中恢复温度场，却无法识别支配热演变的热物理性质；而反演方法虽然能提供具有物理可解释性的参数估计，但通常依赖于简化的几何结构和受控的实验条件。

Here we introduce ThermoField, a framework that unifies thermal scene reconstruction and thermophysical parameter estimation through differentiable heat-transfer simulation. The proposed framework represents these quantities as spatially varying neural fields and constrains them through scene geometry, governing heat-transfer physics, and temporal thermal observations.

本文介绍了 ThermoField，这是一个通过可微热传递模拟将热场景重建与热物理参数估计统一起来的框架。该框架将这些量表示为空间变化的神经场，并通过场景几何结构、支配热传递的物理定律以及时间序列热观测对其进行约束。

We demonstrate that ThermoField jointly reconstructs geometry, estimates spatially varying thermal diffusivity, and predicts thermal evolution under previously unseen environmental conditions. By integrating neural scene representations with differentiable heat-transfer solver, the framework enables physically interpretable parameter inference in complex 3D scenes. Our results establish a bridge between thermal scene reconstruction and inverse heat-transfer analysis, providing a unified approach for geometry reconstruction, thermophysical property estimation, and predictive thermal simulation from thermal observations.

我们证明了 ThermoField 能够联合重建几何结构、估计空间变化的热扩散率，并预测在未见过的环境条件下的热演变。通过将神经场景表示与可微热传递求解器相结合，该框架实现了复杂 3D 场景中具有物理可解释性的参数推断。我们的研究结果在热场景重建与反向热传递分析之间架起了一座桥梁，为从热观测中进行几何重建、热物理性质估计和预测性热模拟提供了一种统一的方法。
---
title: "OverFlowLight: Real-Time Gridlock Prevention and Traffic Signal Optimization for Urban Intersections"
originalUrl: "https://arxiv.org/abs/2606.27381"
date: "2026-06-29T22:41:57.050Z"
---

# OverFlowLight: Real-Time Gridlock Prevention and Traffic Signal Optimization for Urban Intersections
# OverFlowLight：城市路口的实时交通拥堵预防与信号灯优化

**Abstract:** Queue overflow, a severe consequence of urban traffic congestion, occurs when vehicle queues exceed intersection capacity, obstructing upstream traffic and triggering cascading gridlocks. Prevailing traffic signal control (TSC) algorithms, primarily optimized for throughput, often fail to address overflow during peak hours, exacerbating congestion and creating safety hazards.

**摘要：** 队列溢出是城市交通拥堵的严重后果，当车辆排队长度超过路口通行能力时，会阻塞上游交通并引发连锁式交通瘫痪。目前主流的交通信号控制（TSC）算法主要针对通行效率进行优化，往往无法在高峰时段解决溢出问题，从而加剧拥堵并带来安全隐患。

We propose OverFlowLight, a real-time framework designed to preemptively resolve overflow and enhance overall TSC performance. It first introduces a mechanism to accurately detect overflow in real-time by leveraging multi-modal sensing from cameras and radars. Upon detection, it dynamically generates and inserts dedicated overflow phases into the signal cycle to clear the blocking queues.

我们提出了 OverFlowLight，这是一个旨在预防性解决溢出问题并提升整体 TSC 性能的实时框架。该框架首先引入了一种机制，利用摄像头和雷达的多模态感知技术，实现对溢出的实时精准检测。一旦检测到溢出，系统会动态生成并向信号周期中插入专门的“溢出相位”，以疏导阻塞的队列。

This is orchestrated by a hybrid control design that combines rapid rule-based overflow intervention with controller back ends such as reinforcement learning (RL) for longer-horizon efficiency. We conducted extensive real-world deployments of OverFlowLight across 43 intersections in three major cities. The framework demonstrates seamless integration with existing RL-based TSC agents, highlighting its modularity and practical applicability.

该系统由一种混合控制设计进行协调，将基于规则的快速溢出干预与强化学习（RL）等控制器后端相结合，以实现更长期的效率优化。我们在三个主要城市的 43 个路口对 OverFlowLight 进行了广泛的实地部署。该框架展示了与现有基于强化学习的 TSC 智能体的无缝集成能力，突显了其模块化特性和实际应用价值。

Empirical results show that OverFlowLight reduces overflow incidents by 60.4% and increases network throughput by 18.2% compared to deployed baselines. Furthermore, it substantially diminishes the need for manual intervention common with expert-tuned signal plans. This work presents the first practical, scalable, and data-driven framework for actively preventing traffic gridlock, offering a crucial component for building resilient and efficient urban transportation systems.

实证结果表明，与现有的基准方案相比，OverFlowLight 将溢出事件减少了 60.4%，并将路网通行能力提高了 18.2%。此外，它大幅减少了对专家人工调整信号方案的依赖。这项工作提出了首个实用、可扩展且数据驱动的交通拥堵主动预防框架，为构建韧性强、效率高的城市交通系统提供了关键组件。

Our demonstration videos, codes and datasets are available at the anonymous URL, this https URL.

我们的演示视频、代码和数据集可通过匿名链接获取：[点击此处访问](https://anonymous.4open.science/r/OverFlowLight-6666)。
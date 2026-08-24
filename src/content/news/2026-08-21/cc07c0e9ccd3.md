---
title: "A Metamorphic Artificial Age Score Decision-Support Prototype for Flight-Log-Based Drone Propeller Health Monitoring"
originalUrl: "https://arxiv.org/abs/2608.18088"
date: "2026-08-20T21:57:27.252Z"
---

# A Metamorphic Artificial Age Score Decision-Support Prototype for Flight-Log-Based Drone Propeller Health Monitoring
# 一种基于飞行日志的无人机螺旋桨健康监测变形人工年龄评分决策支持原型

**Abstract:** Drone propeller faults can create safety and reliability risks when their effects are distributed across multiple flight-log channels rather than appearing as a single diagnostic signal. This paper proposes a Metamorphic Artificial Age Score (AAS) decision-support prototype for flight-log-based drone propeller health monitoring.
**摘要：** 当无人机螺旋桨故障的影响分布在多个飞行日志通道中，而非表现为单一的诊断信号时，会产生安全和可靠性风险。本文提出了一种基于飞行日志的无人机螺旋桨健康监测“变形人工年龄评分”（Metamorphic Artificial Age Score, AAS）决策支持原型。

Using selected historical real flight logs from the 2024 DronePropA public dataset, the framework computes six health-related indicators from raw MATLAB matrices: trajectory tracking error, attitude instability, thrust-command burden, motor-command imbalance, ESC-command instability, and battery-level stress. These indicators are normalized relative to a healthy baseline and evaluated through candidate scoring policies, metamorphic adequacy relations, and a redundancy-adjusted AAS formulation.
该框架利用 2024 DronePropA 公共数据集中的精选历史真实飞行日志，从原始 MATLAB 矩阵中计算出六项健康相关指标：轨迹跟踪误差、姿态不稳定性、推力指令负载、电机指令不平衡、电调（ESC）指令不稳定性以及电池电量压力。这些指标相对于健康基准进行归一化处理，并通过候选评分策略、变形充分性关系以及冗余调整后的 AAS 公式进行评估。

In this context, AAS is used as a structural policy-adequacy and burden measure rather than as a chronological age measure. A controlled retrospective evaluation was performed using one healthy baseline and three defective propeller cases under the same speed profile and trajectory. The healthy case was assigned to routine monitoring. The Severity 1 case was dominated by ESC-command instability and assigned to maintenance review. The Severity 2 case reached maximum motor-command and ESC-command burden, while the Severity 3 case reached maximum trajectory tracking error; both triggered mandatory inspection.
在此背景下，AAS 被用作结构性策略充分性和负载的度量，而非时间意义上的年龄度量。研究在相同的速度剖面和轨迹下，使用一个健康基准案例和三个螺旋桨缺陷案例进行了受控回顾性评估。健康案例被分配为常规监测；严重程度 1 的案例以电调指令不稳定性为主，被分配为维护审查；严重程度 2 的案例达到了电机指令和电调指令的最大负载，而严重程度 3 的案例达到了最大轨迹跟踪误差；后两者均触发了强制检查。

The results show that propeller fault effects may appear through different operational channels, supporting the need for a multi-indicator decision-support layer for post-flight maintenance prioritization and autonomous-system oversight.
结果表明，螺旋桨故障的影响可能通过不同的操作通道显现，这支持了在飞行后维护优先级排序和自主系统监管中引入多指标决策支持层的必要性。
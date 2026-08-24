---
title: "CruiseBench: A Real-Flight-Aligned N-CMAPSS Benchmark for Engine RUL Prediction"
originalUrl: "https://arxiv.org/abs/2607.19380"
date: "2026-07-23T22:35:33.187Z"
---

# CruiseBench: A Real-Flight-Aligned N-CMAPSS Benchmark for Engine RUL Prediction
# CruiseBench：一个面向航空发动机剩余寿命（RUL）预测的真实飞行对齐 N-CMAPSS 基准测试

Remaining useful life (RUL) prediction estimates how long an engine can continue safe operation and is central to maintenance planning. N-CMAPSS extends C-MAPSS by simulating run-to-failure aero-engine trajectories using recorded real-flight profiles and retaining complete within-flight time series rather than cycle-level snapshots.
剩余寿命（RUL）预测旨在评估发动机能够继续安全运行的时长，这对于维护规划至关重要。N-CMAPSS 在 C-MAPSS 的基础上进行了扩展，通过记录的真实飞行剖面模拟航空发动机从运行到故障的轨迹，并保留了完整的飞行内时间序列，而非仅仅是周期级的快照。

However, this added realism reduces evaluation control because full-flight records increase data volume and entangle degradation cues with operating-regime variation, complicating preprocessing choices and direct comparisons of RUL modeling performance. To mitigate this issue, this paper proposes CruiseBench, a cruise-stage RUL benchmark derived from N-CMAPSS.
然而，这种增加的真实性降低了评估的可控性，因为全飞行记录增加了数据量，并将退化信号与运行工况的变化交织在一起，从而使预处理的选择以及 RUL 建模性能的直接比较变得复杂。为了缓解这一问题，本文提出了 CruiseBench，这是一个源自 N-CMAPSS 的巡航阶段 RUL 基准测试。

It introduces CPM-N-CMAPSS (Cruising-Period Mask for N-CMAPSS), a mask artifact that stores cycle-local cruising intervals identified by the common-altitude method for the nine accessible subdatasets. CruiseBench applies a fixed protocol to the masked rows, using scenario descriptors and measured sensors as inputs while excluding virtual sensors, health parameters, and auxiliary metadata from the feature tensor, preserving native-resolution windows, and applying dataset-wise RUL caps.
该研究引入了 CPM-N-CMAPSS（N-CMAPSS 巡航周期掩码），这是一种掩码工具，用于存储通过通用高度法为九个可访问子数据集识别出的周期内巡航区间。CruiseBench 对掩码后的行应用了固定协议，使用场景描述符和测量传感器作为输入，同时从特征张量中排除了虚拟传感器、健康参数和辅助元数据，保留了原始分辨率窗口，并应用了数据集级别的 RUL 上限。

Experiments with LSTM, GRU, TCN, and TSMixer provide baseline results for this setting. Under CruiseBench-eta5-W256-S10, TSMixer obtains the lowest average RMSE, $3.4\pm1.71$, and Saxena score, $(2.50\pm2.99)\times 10^{4}$. Ablation studies show that flight-stage selection, temporal downscaling method, and RUL-cap threshold affect reported results.
通过 LSTM、GRU、TCN 和 TSMixer 进行的实验为该设置提供了基准结果。在 CruiseBench-eta5-W256-S10 配置下，TSMixer 获得了最低的平均 RMSE（$3.4\pm1.71$）和 Saxena 分数（$(2.50\pm2.99)\times 10^{4}$）。消融研究表明，飞行阶段选择、时间降采样方法和 RUL 上限阈值都会影响报告的结果。

With its fixed cruise-stage protocol, CruiseBench provides a reproducible sub-benchmark for controlled RUL model comparison and CPM-N-CMAPSS provides a stage-specific data foundation for future transfer-learning and domain-adaptation studies.
凭借其固定的巡航阶段协议，CruiseBench 为受控的 RUL 模型比较提供了一个可复现的子基准，而 CPM-N-CMAPSS 则为未来的迁移学习和领域自适应研究提供了特定阶段的数据基础。
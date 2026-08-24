---
title: "Self-Supervised Tree-level Biomass Estimation in Urban Environments From Airborne LiDAR and Optical Observations"
originalUrl: "https://arxiv.org/abs/2606.26194"
date: "2026-06-26T22:48:39.207Z"
---

# Self-Supervised Tree-level Biomass Estimation in Urban Environments From Airborne LiDAR and Optical Observations
# 基于机载激光雷达与光学观测的城市环境树木生物量自监督估算

**Abstract:** Urban tree biomass remains less spatially explicitly quantified than biomass in managed forests because many estimates rely on inventories or coarse products that cannot resolve individual crowns or fine-scale heterogeneity. 
**摘要：** 相比于人工林，城市树木生物量的空间显式量化程度较低，这是因为许多估算方法依赖于清查数据或粗略产品，无法解析单个树冠或精细尺度的异质性。

We present a crown-level above-ground biomass (AGB) framework for an 810 km$^2$ landscape in Ontario, Canada, using leaf-off airborne LiDAR (8--10 pulses m$^{-2}$) and near-infrared RGB orthophotography (0.16--0.20 m) from 2018 and 2023. 
我们提出了一种针对加拿大安大略省 810 平方公里景观的树冠级地上生物量（AGB）框架，该框架利用了 2018 年和 2023 年的落叶期机载激光雷达数据（8--10 个脉冲/平方米）以及近红外 RGB 正射影像（0.16--0.20 米）。

A dual-stream cross-attention network trained on rule-based pseudo-labels produced semantic marks for buildings, needleleaf trees, and deciduous trees, supporting crown delineation and functional-type assignment. 
通过基于规则的伪标签训练的双流交叉注意力网络，我们生成了建筑物、针叶树和阔叶树的语义标记，从而支持了树冠勾勒和功能类型分配。

On independently annotated withheld tiles, global/mean precision, recall, and Dice scores were 0.86, 0.83, and 0.84. 
在独立标注的预留瓦片数据上，全局/平均精确率、召回率和 Dice 系数分别为 0.86、0.83 和 0.84。

Crowns were delineated with multiscale watershed segmentation in mapped tree areas, and AGB was estimated from a crown area--height power-law proxy calibrated to species-specific allometry (Lambert et al., 2005) for 21,921 inventory trees. 
在映射的树木区域内，通过多尺度分水岭分割技术勾勒树冠，并利用针对 21,921 棵清查树木的物种特异性异速生长方程（Lambert et al., 2005）校准的“树冠面积-高度”幂律代理模型来估算 AGB。

For 18,713 inventory--segment matched pairs from a 90,726-tree held-out test set, AGB prediction achieved $R^2=0.609$ using inventory crown geometry and $R^2=0.570$ under operational segmentation, identifying crown delineation as the remaining uncertainty source. 
在包含 90,726 棵树的留出测试集中，对于 18,713 个清查与分割匹配对，使用清查树冠几何形状的 AGB 预测 $R^2$ 达到 0.609，而在实际操作分割下 $R^2$ 为 0.570，这表明树冠勾勒是目前不确定性的主要来源。

Aggregated to 30 m, estimates yielded total AGB stocks of 1.73 Tg in 2018 and 1.81 Tg in 2023 (811--850 Gg C), local densities up to ~140 Mg ha$^{-1}$ along the Niagara Escarpment, and a net carbon gain of 39 Gg C over five years. 
聚合至 30 米尺度后，估算结果显示 2018 年总 AGB 储量为 1.73 Tg，2023 年为 1.81 Tg（811--850 Gg C）；尼亚加拉断崖沿线的局部密度高达约 140 Mg/ha，五年内净碳增量为 39 Gg C。

Deep-ensemble uncertainty maps highlighted high-epistemic-uncertainty areas linked to underrepresented land covers and guided assignment of uncertain crowns to a pooled allometric equation. 
深度集成不确定性图突显了与代表性不足的土地覆盖类型相关的高认知不确定性区域，并指导将不确定的树冠分配给汇总的异速生长方程。

The framework uses standard provincial data, requires no manual annotation, and produces a public bitemporal crown-level AGB database for trees outside forests at management-relevant resolution. 
该框架使用标准的省级数据，无需人工标注，并生成了一个公共的双时相树冠级 AGB 数据库，为森林以外的树木提供了具有管理参考价值的分辨率数据。
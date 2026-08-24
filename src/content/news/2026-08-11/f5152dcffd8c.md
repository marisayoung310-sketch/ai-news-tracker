---
title: "UAV3DCrop: Benchmarking 3D Reconstruction in Repeated Multi-Angle UAV Crop Surveys"
originalUrl: "https://arxiv.org/abs/2608.06404"
date: "2026-08-10T22:10:38.325Z"
---

# UAV3DCrop: Benchmarking 3D Reconstruction in Repeated Multi-Angle UAV Crop Surveys
# UAV3DCrop：重复多角度无人机农作物调查中的 3D 重建基准测试

**Abstract:** Accurate 3D crop monitoring underpins data-driven precision agriculture by enabling field-scale analysis of plant structure, growth dynamics, and management response. Modern 3D reconstruction methods perform strongly on generic benchmarks, but rendered appearance may not translate into metrically and agronomically useful geometry in crop fields.

**摘要：** 精确的 3D 作物监测是数据驱动精准农业的基础，它能够实现对植物结构、生长动态和管理响应的田间尺度分析。现代 3D 重建方法在通用基准测试中表现强劲，但其渲染出的外观未必能转化为农田中具有度量学和农学价值的几何结构。

We introduce UAV3DCrop, a public benchmark of repeated multi-angle unmanned aerial vehicle (UAV) crop surveys. It contains 88,830 RGB images at $5280 \times 3956$ pixels, with a ground sampling distance of 3.6-5.8 mm, from 91 scenes spanning corn, soybean, wheat, and oat.

我们推出了 UAV3DCrop，这是一个针对重复多角度无人机（UAV）作物调查的公开基准测试集。该数据集包含 88,830 张分辨率为 $5280 \times 3956$ 像素的 RGB 图像，地面采样距离（GSD）为 3.6-5.8 毫米，涵盖了玉米、大豆、小麦和燕麦等 91 个场景。

Track A evaluates seven scene-optimized methods -- Neural Radiance Field (NeRF) and 3D Gaussian Splatting (3DGS) variants -- on held-out views, photogrammetry-referenced depth, and canopy-height recovery. Track B tests four pretrained feed-forward models on zero-shot camera-pose and geometry estimation.

赛道 A 在留出视图（held-out views）、摄影测量参考深度以及冠层高度恢复等方面，评估了七种场景优化方法——包括神经辐射场（NeRF）和 3D 高斯溅射（3DGS）的变体。赛道 B 则测试了四种预训练的前馈模型在零样本相机位姿和几何估计方面的表现。

The scene-optimized methods rank differently across the three targets: Splatfacto-big leads appearance, whereas Scaffold-GS leads depth and is statistically tied with Splatfacto for canopy height. Among feed-forward models, MapAnything leads on seven of the eight metrics, while the remaining models vary more across crops and fail severely on absolute scale in a way that alignment concealed.

这些场景优化方法在三个目标上的排名各不相同：Splatfacto-big 在外观表现上领先，而 Scaffold-GS 在深度估计上领先，且在冠层高度方面与 Splatfacto 在统计学上持平。在前馈模型中，MapAnything 在八项指标中的七项领先，而其余模型在不同作物间的表现差异较大，且在绝对尺度上表现严重失准，这种失准往往被对齐操作所掩盖。

Repeated acquisitions reveal further sensitivities that differ by output type and by model, associated with position within the acquisition sequence and with tie-point multiplicity. Current 3D reconstruction methods are therefore not yet interchangeable for agronomic use: no single method wins on appearance, geometry, and canopy height at once, and only one of four feed-forward models recovers usable metric scale.

重复采集揭示了进一步的敏感性，这些敏感性因输出类型和模型而异，并与采集序列中的位置以及连接点（tie-point）的多样性有关。因此，目前的 3D 重建方法在农学应用中尚不可互换：没有单一方法能同时在外观、几何结构和冠层高度上取得最优，且四个前馈模型中仅有一个能恢复出可用的度量尺度。

The dataset is publicly available at this [URL](https://arxiv.org/abs/2608.06404).

该数据集已通过此 [链接](https://arxiv.org/abs/2608.06404) 公开发布。
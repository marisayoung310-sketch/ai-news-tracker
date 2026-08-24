---
title: "MapTCL: Temporal Consistency Learning via Bidirectional Alignment for Vectorized HD Map Construction"
originalUrl: "https://arxiv.org/abs/2608.05209"
date: "2026-08-07T22:08:32.443Z"
---

### MapTCL: Temporal Consistency Learning via Bidirectional Alignment for Vectorized HD Map Construction
### MapTCL：用于矢量化高清地图构建的基于双向对齐的时间一致性学习

**Abstract:** Constructing reliable online HD maps remains challenging in dynamic urban environments due to moving objects and occlusions. While recent works employ feature-level temporal fusion to address this, they rely solely on per-frame ground truth supervision. Consequently, they lack an explicit objective to directly penalize the geometric noise and temporal jitter between consecutive online HD maps.

**摘要：** 由于移动物体和遮挡的存在，在动态城市环境中构建可靠的在线高清（HD）地图仍然具有挑战性。尽管近期的研究采用了特征级时间融合来解决这一问题，但它们仅依赖于单帧的真值（Ground Truth）监督。因此，它们缺乏一个明确的目标函数来直接惩罚连续在线高清地图之间的几何噪声和时间抖动。

To address this, we propose MapTCL, an auxiliary training strategy that formulates temporal consistency loss between current and past frames via bidirectional alignment. Specifically, Bidirectional Vector Consistency Learning (BVCL) models the geometric and semantic discrepancies between associated past and current vector instances as an auxiliary loss. We also employ Raster map Consistency Learning (RCL) as an additional loss to stabilize dense BEV features.

为了解决这一问题，我们提出了 MapTCL，这是一种辅助训练策略，通过双向对齐构建当前帧与过去帧之间的时间一致性损失。具体而言，双向矢量一致性学习（BVCL）将关联的过去和当前矢量实例之间的几何与语义差异建模为辅助损失。我们还采用了栅格地图一致性学习（RCL）作为额外损失，以稳定稠密的鸟瞰图（BEV）特征。

By jointly training with these dual losses, MapTCL improves the temporal stability of generated HD maps. Extensive experiments on two standard benchmarks demonstrate the effectiveness of our approach. As a versatile plug-and-play module, MapTCL consistently enhances existing baseline models, achieving gains of +3.7 mAP & +2.8 C-mAP on nuScenes and +3.1 mAP & +2.5 C-mAP on Argoverse 2 without additional inference overhead.

通过结合这两种损失进行联合训练，MapTCL 提高了生成高清地图的时间稳定性。在两个标准基准测试上的大量实验证明了我们方法的有效性。作为一个通用的即插即用模块，MapTCL 能够持续提升现有的基准模型，在 nuScenes 上实现了 +3.7 mAP 和 +2.8 C-mAP 的提升，在 Argoverse 2 上实现了 +3.1 mAP 和 +2.5 C-mAP 的提升，且无需额外的推理开销。
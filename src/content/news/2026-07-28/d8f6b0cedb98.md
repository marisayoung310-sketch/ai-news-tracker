---
title: "Closing the Loop: Training-Free Revisit Consistency for Autoregressive Generative Rendering"
originalUrl: "https://arxiv.org/abs/2607.21848"
date: "2026-07-27T22:39:29.639Z"
---

# Closing the Loop: Training-Free Revisit Consistency for Autoregressive Generative Rendering
# 闭环：用于自回归生成渲染的免训练重访一致性方法

**Abstract:** Recent conditional video generation models have shown promising potentials to transform 3D engine renderings, such as depth maps and untextured geometry, into photorealistic videos for gaming and immersive content creation. These applications require long-horizon auto-regressive generation that continuously synthesizes new frames while preserving a persistent 3D world.

**摘要：** 近期的条件视频生成模型展现出了巨大的潜力，能够将 3D 引擎渲染（如深度图和无纹理几何体）转换为用于游戏和沉浸式内容创作的逼真视频。这些应用需要长周期的自回归生成，在持续合成新帧的同时保持 3D 世界的一致性。

Auto-regressive generators synthesize video chunk by chunk with a bounded KV cache, so when the camera revisits a location after its context has been evicted, the model often regenerates inconsistent appearance, even though the conditioning renderings (e.g., depth) remain perfectly aligned with the underlying geometry.

自回归生成器通过有限的 KV 缓存以分块（chunk）方式合成视频。因此，当摄像机在上下文被移除后重新访问某位置时，模型往往会生成外观不一致的内容，尽管作为条件的渲染图（如深度图）与底层几何结构依然保持完美对齐。

We address this revisit inconsistency without any post-training by exploiting correspondences the 3D engine already provides: temporal correspondence retrieves pose-matched historical latent chunks into the KV cache as loop-closure memory, while spatial correspondence from camera pose and depth reprojection biases token-level attention toward geometrically corresponding regions of the retrieved chunks.

我们通过利用 3D 引擎已有的对应关系，在无需任何后训练的情况下解决了这种重访不一致问题：时间对应关系将姿态匹配的历史潜在块检索到 KV 缓存中作为闭环记忆；而来自摄像机姿态和深度重投影的空间对应关系，则引导 Token 级注意力偏向于检索块中几何对应的区域。

We demonstrate our method on loop-closure trajectories mined from TartanAir and TartanGround dataset to mirror complicate real-world application scenarios, where it outperforms existing training-free baselines on revisit consistency without losing overall video quality.

我们在从 TartanAir 和 TartanGround 数据集中挖掘出的闭环轨迹上验证了我们的方法，以模拟复杂的现实应用场景。结果表明，该方法在不损失整体视频质量的前提下，在重访一致性方面优于现有的免训练基准模型。
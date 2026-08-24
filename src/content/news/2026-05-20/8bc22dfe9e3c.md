---
title: "Fre-Res: Frequency-Residual Video Token Compression for Efficient Video MLLMs"
originalUrl: "https://arxiv.org/abs/2605.16366"
date: "2026-05-19T22:55:38.110Z"
---

# Fre-Res: Frequency-Residual Video Token Compression for Efficient Video MLLMs

**Abstract:** Video MLLMs face a persistent tension between spatial fidelity and temporal coverage: preserving fine-grained visual details requires many spatial tokens, while capturing short-lived events requires dense temporal sampling. 

**摘要：** 视频多模态大模型（Video MLLMs）在空间保真度和时间覆盖范围之间面临着持续的矛盾：保留细粒度的视觉细节需要大量的空间 Token，而捕捉短时事件则需要密集的时间采样。

We propose **Fre-Res**, a budget-adaptive dual-track video-token compression framework that separates these two forms of evidence. Fre-Res preserves sparse high-fidelity spatial anchors and represents dense temporal evolution through compact residual-frequency tokens. 

我们提出了 **Fre-Res**，这是一个预算自适应的双轨视频 Token 压缩框架，将这两种证据形式分离开来。Fre-Res 保留了稀疏的高保真空间锚点，并通过紧凑的残差频率 Token 来表示密集的时间演变。

Specifically, it applies temporal 1D-DCT to inter-frame residual trajectories in vision-latent space, where we observe strong low-frequency concentration. To align frequency-domain dynamics with native visual embeddings, Fre-Res introduces a Spatial-Guided Absorber that injects temporal residual information into spatially corresponding anchor tokens. 

具体而言，该框架在视觉潜空间（vision-latent space）中对帧间残差轨迹应用了一维离散余弦变换（1D-DCT），我们观察到其中存在强烈的低频集中现象。为了将频域动态与原生视觉嵌入对齐，Fre-Res 引入了一个空间引导吸收器（Spatial-Guided Absorber），将时间残差信息注入到空间对应的锚点 Token 中。

Across fine-grained short-video and long-video reasoning benchmarks, Fre-Res achieves a favorable accuracy--efficiency trade-off, matching or approaching full-token performance while substantially reducing visual-token length. 

在细粒度短视频和长视频推理基准测试中，Fre-Res 实现了良好的准确率与效率平衡，在大幅减少视觉 Token 长度的同时，匹配或接近了全量 Token 的性能表现。

Extensive ablations further show that temporal-frequency residuals preserve causal transition cues, while spatial anchors remain essential for fine-grained object and layout reasoning.

广泛的消融实验进一步表明，时间频率残差保留了因果转换线索，而空间锚点对于细粒度的物体和布局推理仍然至关重要。
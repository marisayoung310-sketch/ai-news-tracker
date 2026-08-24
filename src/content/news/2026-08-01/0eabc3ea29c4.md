---
title: "Bunraku: Turning a Single Illustration into an Editable Live2D Character"
originalUrl: "https://arxiv.org/abs/2607.27348"
date: "2026-07-31T22:27:53.522Z"
---

# Bunraku: Turning a Single Illustration into an Editable Live2D Character
# Bunraku：将单张插画转化为可编辑的 Live2D 角色

**Abstract:** Live2D is the dominant 2D character-animation format for anime characters and virtual avatars, representing each character as a stack of RGBA layers driven by per-layer mesh deformation. Despite its wide use in virtual streaming, mobile games, and interactive characters, authoring a Live2D model still demands weeks of manual layer separation, occlusion completion, mesh placement, and keyframing, and no prior generative method produces such a structured asset end-to-end.

**摘要：** Live2D 是动漫角色和虚拟形象中最主流的 2D 角色动画格式，它将每个角色表示为一系列 RGBA 图层，并通过逐层网格变形来驱动动画。尽管它在虚拟直播、移动游戏和交互式角色中得到了广泛应用，但制作一个 Live2D 模型仍需要数周的手动工作，包括图层分离、遮挡补全、网格放置和关键帧设置。目前尚无现有的生成式方法能够端到端地生成此类结构化资产。

We present the first system that, from a single illustration, generates all the structured information a Live2D runtime consumes: ordered RGBA layers, a deformation mesh per layer, and the parameter-driven keypose vertex offsets that make the character move.

我们提出了首个能够从单张插画出发，生成 Live2D 运行时所需所有结构化信息的系统：有序的 RGBA 图层、每个图层的变形网格，以及驱动角色运动的参数化关键姿态顶点偏移量。

Stage 1 casts layered decomposition as a layered diffusion process under a Live2D-aware organ-level taxonomy, producing an ordered RGBA stack with hidden-region completion.

第一阶段将图层分解视为一种基于 Live2D 感知器官级分类法的分层扩散过程，从而生成带有隐藏区域补全的有序 RGBA 图层堆栈。

Stage 2 builds a content-conforming triangle mesh for each layer from its alpha channel alone, then predicts the keypose displacement field of all layers jointly: every vertex of every layer is one token, self-attention spans layer boundaries, and each displacement is factorised into a bounded direction and a log-magnitude. Joint rather than independent prediction is what makes the result a coherent character instead of separately plausible parts, and is our largest gain; scaling the network 112x yields none.

第二阶段仅根据每个图层的 Alpha 通道构建内容自适应的三角网格，然后联合预测所有图层的关键姿态位移场：每个图层的每个顶点都被视为一个 Token，自注意力机制跨越图层边界，且每个位移被分解为有界方向和对数幅度。联合预测而非独立预测，是使结果成为一个连贯角色而非互不相关的碎片化部件的关键，这也是我们最大的收益；相比之下，将网络规模扩大 112 倍却并未带来任何提升。

On 50 held-out characters, under true generation with no teacher forcing, Stage 2 attains a per-vertex direction cosine of 0.768 (median 0.828). Because a layer's mesh derives from its alpha channel, a clothing layer can be re-textured from a natural-language instruction while the mesh and predicted animation are reused byte-for-byte. We further contribute Live2D-Bench, the first standardized benchmark for the task, and an 8,884-model Live2D corpus with layer and animation supervision.

在 50 个留存测试角色上，在无教师强制（Teacher Forcing）的真实生成条件下，第二阶段实现了 0.768 的逐顶点方向余弦值（中位数为 0.828）。由于图层的网格源自其 Alpha 通道，因此可以通过自然语言指令对服装图层进行重纹理化，同时完全复用原有的网格和预测动画。此外，我们还贡献了 Live2D-Bench，这是该任务的首个标准化基准测试，以及一个包含 8,884 个带有图层和动画监督信息的 Live2D 模型语料库。
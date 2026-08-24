---
title: "Kimi K3 Architecture Overview and Notes"
originalUrl: "https://sebastianraschka.com/blog/2026/kimi-k3-architecture-notes.html"
date: "2026-07-28T22:28:52.330Z"
---

### Kimi K3 Architecture Overview and Notes
### Kimi K3 架构概览与笔记

The Kimi K3 architecture figure for yesterday’s big open-weight model release, along with some observations and thoughts. Yes, it looks relatively complicated, but it’s essentially a scaled-up production version of their Kimi Linear model they released last year (scaled up from 48B -> 2.8T; K3 is by far the biggest open-weight model right now).
这是针对昨天发布的大型开源权重模型 Kimi K3 的架构图，以及我的一些观察和思考。没错，它看起来确实比较复杂，但本质上它是去年发布的 Kimi Linear 模型的生产级放大版本（从 48B 扩展到了 2.8T；K3 是目前为止最大的开源权重模型）。

The one new component compared to Kimi Linear is the LatentMoE. I omitted it in the figure below since it’s already very crowded, but that’s essentially the same LatentMoE as in Nemotron 3 Ultra (you can find it in my LLM Architecture Gallery if you are curious). The idea here is to compress (down-project) large linear layers similar to multi-head latent attention.
与 Kimi Linear 相比，唯一的新组件是 LatentMoE。由于架构图已经非常拥挤，我在下图中省略了它，但它本质上与 Nemotron 3 Ultra 中的 LatentMoE 相同（如果你感兴趣，可以在我的 LLM 架构图库中找到它）。其核心思想是压缩（降维投影）大型线性层，类似于多头潜在注意力（Multi-head Latent Attention）。

Kimi K3’s overall trend (similar to Nemotron 3, DeepSeek V4, and others) is also towards better inference efficiency. That is, there are many components that replace existing components with efficiency-tweaked versions. I.e., MoE -> LatentMoE, regular attention -> multi-head latent attention and Kimi Delta Attention. (I also have short tutorials and write-ups in my gallery if you are curious about additional details).
Kimi K3 的整体趋势（与 Nemotron 3、DeepSeek V4 等类似）也是追求更高的推理效率。也就是说，许多组件被经过效率优化的版本所取代。例如：MoE 变为 LatentMoE，常规注意力机制变为多头潜在注意力和 Kimi Delta Attention。（如果你对更多细节感兴趣，我的图库中也有相关的简短教程和文章）。

The one component change that is not an efficiency tweak is attention residuals. Like DeepSeek V4 improved the residual path with mHC (manifold-constrained Hyper-Connections), attention residuals are a way to improve the residual path, but it works a bit differently. I.e., mHC made the residual path wider. Attention residuals (also already part of Kimi Linear) connect the residuals across layers; the connection itself uses an attention score for an important/contribution weight. According to the report, it improves the validation loss and downstream performance (a bit) consistently and adds about 4% in training cost and 2% in inference cost.
唯一一个非效率优化的组件变更是“注意力残差”（Attention residuals）。就像 DeepSeek V4 通过 mHC（流形约束超连接）改进残差路径一样，注意力残差也是一种改进残差路径的方法，但其工作原理略有不同。mHC 是通过加宽残差路径来实现的，而注意力残差（同样也是 Kimi Linear 的一部分）则是跨层连接残差；连接本身使用注意力分数作为重要性/贡献权重。根据报告，它能持续改善验证损失和下游性能（略有提升），并增加了约 4% 的训练成本和 2% 的推理成本。

Interestingly, Kimi K3 got rid of all RoPE layers and uses NoPE (No Positional Embeddings) everywhere instead. (Again, this is inherited from Kimi Linear). In other architectures, the recent trend was towards RoPE in local attention layers (like sliding window attention) and NoPE in the global layers. There were a few architectures that only used NoPE everywhere, but this is the first frontier-level one as far as I know.
有趣的是，Kimi K3 去掉了所有的 RoPE 层，转而全面使用 NoPE（无位置编码）。（这同样继承自 Kimi Linear）。在其他架构中，近期的趋势是在局部注意力层（如滑动窗口注意力）中使用 RoPE，而在全局层中使用 NoPE。虽然此前已有少数架构全面使用 NoPE，但据我所知，这是第一个达到前沿模型水平的架构。

Kimi K3 now also has native multimodal support, which is great! There are several other interesting training tidbits in the technical report, but that’s it from the architecture front so far. A really great release overall.
Kimi K3 现在还具备了原生多模态支持，这非常棒！技术报告中还有其他一些有趣的训练细节，但就架构层面而言，目前就是这些。总的来说，这是一次非常出色的发布。

Figure 1. Kimi K3 architecture and release-time benchmark comparisons. See K3 in the architecture gallery for more details. Source: website version of my Substack note.
图 1. Kimi K3 架构及发布时的基准测试对比。更多详情请查看架构图库中的 K3 部分。来源：我 Substack 笔记的网页版。
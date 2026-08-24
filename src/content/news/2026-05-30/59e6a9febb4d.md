---
title: "One Mask to Rule Them All: On Hidden Facts after Editing and How to Find Them"
originalUrl: "https://arxiv.org/abs/2605.28839"
date: "2026-05-29T23:14:42.911Z"
---

# One Mask to Rule Them All: On Hidden Facts after Editing and How to Find Them
# 一掩码统领全局：论模型编辑后的隐藏事实及其发现方法

**Abstract:** Knowledge editing methods such as ROME and MEMIT update factual associations in transformer models by modifying MLP weights. While evaluated mainly by output behavior, their internal mechanism remains underexplored. We investigate whether edits rely on a common mechanism, regardless of which fact is modified.

**摘要：** 诸如 ROME 和 MEMIT 等知识编辑方法，通过修改 Transformer 模型中的 MLP 权重来更新事实关联。尽管这些方法主要通过输出行为进行评估，但其内部机制仍未得到充分探索。我们研究了无论修改何种事实，编辑操作是否都依赖于一种通用的机制。

Despite fact-specific weight changes, we argue that ROME and MEMIT target the same subset of weights critical for maintaining edits. To isolate this subset, we train a compact binary mask over the edited weights. The mask reverses 80% of edits on the training set and over 70% on the test set, confirming that diverse edits share a common functional structure.

尽管权重变化因事实而异，但我们认为 ROME 和 MEMIT 实际上针对的是同一组对维持编辑至关重要的权重子集。为了分离出该子集，我们在编辑后的权重上训练了一个紧凑的二值掩码。该掩码在训练集上撤销了 80% 的编辑，在测试集上撤销了超过 70% 的编辑，这证实了不同的编辑操作共享着一种共同的功能结构。

Our analysis reveals that the mask reverses edits by eliminating overattention in later layers. Additionally, we show that injecting the mask during editing drops editing success from 98% to 38%, demonstrating that this mechanism is necessary for edits to succeed.

我们的分析表明，该掩码通过消除后续层中的过度注意力（overattention）来撤销编辑。此外，我们展示了在编辑过程中注入该掩码会使编辑成功率从 98% 降至 38%，这证明了该机制对于编辑的成功是必不可少的。

Our finding that edits suppress rather than overwrite knowledge explains why ROME and MEMIT fail to propagate changes to related facts. The identified common functional subspace informs detection and defense against unwanted edits.

我们发现编辑操作实际上是抑制而非覆盖了原有知识，这解释了为什么 ROME 和 MEMIT 无法将更改传播到相关事实。所识别出的通用功能子空间为检测和防御不必要的编辑提供了参考。
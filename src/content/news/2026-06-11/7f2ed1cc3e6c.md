---
title: "SynIB: Informational Bottleneck for Maximizing Synergy in Multimodal Learning"
originalUrl: "https://arxiv.org/abs/2606.09853"
date: "2026-06-10T23:08:38.006Z"
---

# SynIB: Informational Bottleneck for Maximizing Synergy in Multimodal Learning
# SynIB：用于最大化多模态学习协同效应的信息瓶颈

**Abstract:** A central objective in multimodal learning is to capture synergy: task-relevant information that arises only from the joint use of multiple modalities, and is not available from any single modality alone.
**摘要：** 多模态学习的一个核心目标是捕捉“协同效应”（synergy）：即仅通过联合使用多种模态才能产生、且无法从任何单一模态中获取的任务相关信息。

While most approaches operate at the architectural level through larger or more complex fusion models, we propose a complementary axis: shaping the training objective itself. Standard training often emphasizes unimodal or redundant information, falling short on examples that require cross-modal reasoning.
虽然大多数方法通过更大或更复杂的融合模型在架构层面进行优化，但我们提出了一个互补的维度：重塑训练目标本身。标准的训练方式往往强调单模态或冗余信息，而在需要跨模态推理的样本上表现不足。

We formalize multimodal synergy through information theory and introduce the Synergistic Information Bottleneck (SynIB), a scalable objective that targets synergy directly. To prioritize learning synergy, SynIB motivates the model to predict accurately from all modalities while penalizing confidence when information from any modality is withheld.
我们通过信息论对多模态协同效应进行了形式化定义，并引入了协同信息瓶颈（Synergistic Information Bottleneck, SynIB），这是一种直接针对协同效应的可扩展训练目标。为了优先学习协同效应，SynIB 激励模型在利用所有模态时进行准确预测，同时在缺失任何模态信息时对模型的置信度进行惩罚。

Alongside the standard task loss, the model runs forward passes with one modality masked at a time and is penalized for remaining confident, which would indicate reliance on unimodal cues rather than cross-modal interactions.
除了标准的任务损失外，模型在训练时会依次遮蔽一个模态进行前向传播；如果模型在缺失模态的情况下依然保持高置信度，则会受到惩罚，因为这表明模型依赖于单模态线索而非跨模态交互。

We validate SynIB in two regimes. On synthetic XOR tasks where the ground-truth synergy is known by construction, standard training fails to recover it while SynIB does.
我们在两个实验场景中验证了 SynIB。在通过构造已知真实协同效应的合成 XOR 任务中，标准训练无法恢复该效应，而 SynIB 可以做到。

On five real-world benchmarks, including three MultiBench affective tasks, Hateful Memes with CLIP-ViT and DeBERTa backbones, and a controllable irony extension of CREMA-D we introduce, SynIB improves accuracy on synergy-dependent examples by up to 7.8% and overall accuracy by up to 3.8%.
在五个真实世界的基准测试中（包括三个 MultiBench 情感任务、使用 CLIP-ViT 和 DeBERTa 主干网络的 Hateful Memes 任务，以及我们引入的 CREMA-D 可控反讽扩展任务），SynIB 在依赖协同效应的样本上的准确率提升了高达 7.8%，整体准确率提升了高达 3.8%。
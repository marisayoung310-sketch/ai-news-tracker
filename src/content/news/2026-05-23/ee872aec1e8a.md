---
title: "High Quality Embeddings for Horn Logic Reasoning"
originalUrl: "https://arxiv.org/abs/2605.20467"
date: "2026-05-22T22:27:08.876Z"
---

# High Quality Embeddings for Horn Logic Reasoning
## 用于霍恩逻辑推理的高质量嵌入

**Abstract:** Neural networks can be trained to rank the choices made by logical reasoners, resulting in more efficient searches for answers. A key step in this process is creating useful embeddings, i.e., numeric representations of logical statements. 

**摘要：** 神经网络可以经过训练，对逻辑推理器所做的选择进行排序，从而实现更高效的答案搜索。这一过程中的关键步骤是创建有效的嵌入，即逻辑语句的数值表示。

This paper introduces and evaluates several approaches to creating embeddings that result in better downstream results. We train embeddings using triplet loss, which requires examples consisting of an anchor, a positive example, and a negative example. 

本文介绍并评估了几种创建嵌入的方法，这些方法能够带来更好的下游结果。我们使用三元组损失（triplet loss）来训练嵌入，该方法需要由锚点（anchor）、正例（positive example）和负例（negative example）组成的样本。

We introduce three ideas: generating anchors that are more likely to have repeated terms, generating positive and negative examples in a way that ensures a good balance between easy, medium, and hard examples, and periodically emphasizing the hardest examples during training. 

我们提出了三个核心思路：生成更有可能包含重复项的锚点；以确保简单、中等和困难样本之间良好平衡的方式生成正负样本；以及在训练过程中定期强化最困难的样本。

We conduct several experiments to evaluate this approach, including a comparison of different embeddings across different knowledge bases, in an attempt to identify what characteristics make an embedding well-suited to a particular reasoning task.

我们进行了多项实验来评估该方法，包括在不同知识库中对各种嵌入进行比较，旨在识别出哪些特征使得嵌入能够更好地适应特定的推理任务。
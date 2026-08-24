---
title: "H-Probes: Extracting Hierarchical Structures From Latent Representations of Language Models"
originalUrl: "https://arxiv.org/abs/2605.00847"
date: "2026-05-05T22:22:15.573Z"
---

# H-Probes: Extracting Hierarchical Structures From Latent Representations of Language Models
# H-Probes：从语言模型的潜在表示中提取层次结构

**Abstract:** Representing and navigating hierarchy is a fundamental primitive of reasoning. Large language models have demonstrated proficiency in a wide variety of tasks requiring hierarchical reasoning, but there exists limited analysis on how the models geometrically represent the necessary latent constructions for such thinking. 

**摘要：** 表示和导航层次结构是推理的基本要素。大型语言模型在各种需要层次推理的任务中表现出了熟练度，但目前对于这些模型如何从几何角度表示此类思维所需的潜在结构，分析还非常有限。

To this end, we develop \textit{H-probes}, a collection of linear probes that extract hierarchical structure, specifically depth and pairwise distance, from latent representations. 

为此，我们开发了 *H-probes*，这是一组线性探针，旨在从潜在表示中提取层次结构，特别是深度和成对距离。

In synthetic tree traversal tasks, the H-probes robustly find the subspaces containing hierarchical structure necessary to complete the tasks; furthermore, in comprehensive ablation experiments, we show that these hierarchy-containing subspaces are low-dimensional, causally important for high task performance, and generalize within- and out-of-domain. 

在合成树遍历任务中，H-probes 能够稳健地找到完成任务所需的包含层次结构的子空间；此外，通过全面的消融实验，我们证明了这些包含层次结构的子空间是低维的，对实现高性能具有因果重要性，并且在域内和域外均具有泛化能力。

Furthermore, we find analogous, though weaker, hierarchical structure in real-world hierarchical contexts such as mathematical reasoning traces. These results demonstrate that models represent hierarchy not only at the level of syntax and concepts, but at deeper levels of abstraction -- including the reasoning process itself.

此外，我们在数学推理轨迹等现实世界的层次化语境中，也发现了类似但较弱的层次结构。这些结果表明，模型不仅在语法和概念层面，而且在更深层的抽象层面（包括推理过程本身）都表示了层次结构。
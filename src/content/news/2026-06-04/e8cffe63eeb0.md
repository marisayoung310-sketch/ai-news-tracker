---
title: "Visual Graph Scaffolds for Structural Reasoning in Large Language Models"
originalUrl: "https://arxiv.org/abs/2606.02673"
date: "2026-06-03T23:19:53.573Z"
---

# Visual Graph Scaffolds for Structural Reasoning in Large Language Models
# 用于大语言模型结构化推理的视觉图表支架

**Abstract:** Graphs have been used to enhance large language models (LLMs) for structured reasoning, mostly as external knowledge sources provided to models at test time. In this paper, we take a different view: the value of graphs for LLMs lies not only in supplying information, but also in organizing reasoning.
**摘要：** 图结构已被用于增强大语言模型（LLM）的结构化推理能力，但大多是在测试阶段作为外部知识源提供给模型。在本文中，我们提出了不同的观点：图对于大语言模型的价值不仅在于提供信息，还在于组织推理过程。

Inspired by how humans use graph-structured mind maps to organize branching and converging thoughts, we ask whether graphs can serve as an internal form of reasoning assistance. We study this question on multi-hop question answering tasks, where teacher-provided reasoning traces are rewritten as graph mind maps and used to guide a student model.
受人类如何利用图结构思维导图来组织发散与收敛思维的启发，我们探讨了图是否可以作为一种内部推理辅助形式。我们在多跳问答任务中研究了这一问题，将教师提供的推理轨迹重写为图思维导图，并以此引导学生模型。

Our experiments reveal a clear modality gap. When graph structures are flattened into text, their benefits become limited once direct answer hints are removed. Under this abstract guidance setting, both reasoning efficiency and answer quality degrade substantially.
我们的实验揭示了一个明显的模态差距。当图结构被扁平化为文本时，一旦移除了直接的答案提示，其优势便变得有限。在这种抽象引导设置下，推理效率和答案质量均大幅下降。

In contrast, visual graph guidance remains effective without direct answer clues, and its advantage persists after supervised fine-tuning and KL-based distillation. The above findings support the claim that graphs should be studied not only as external knowledge structures for LLMs, but also as visual scaffolds for organizing reasoning.
相比之下，视觉图引导在没有直接答案线索的情况下依然有效，且其优势在监督微调和基于 KL 散度的蒸馏后依然存在。上述发现支持了这一观点：图不仅应被视为大语言模型的外部知识结构，还应被视为组织推理的视觉支架。
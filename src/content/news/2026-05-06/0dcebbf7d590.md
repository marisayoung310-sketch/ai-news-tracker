---
title: "Agentopic: A Generative AI Agent Workflow for Explainable Topic Modeling"
originalUrl: "https://arxiv.org/abs/2605.00833"
date: "2026-05-05T22:26:03.490Z"
---

# Agentopic: A Generative AI Agent Workflow for Explainable Topic Modeling
# Agentopic：一种用于可解释主题建模的生成式 AI 智能体工作流

Agentopic is a novel agent-based workflow for explainable topic modeling that leverages the reasoning capabilities of Large Language Models (LLMs). Existing topic modeling approaches such as Latent Dirichlet Allocation (LDA) and BERTopic often lack transparency on how topics are assigned or grouped.
Agentopic 是一种新颖的基于智能体的工作流，用于可解释的主题建模，它利用了大语言模型（LLM）的推理能力。现有的主题建模方法（如潜在狄利克雷分配 LDA 和 BERTopic）在主题如何分配或分组方面往往缺乏透明度。

Agentopic addresses this by using multiple agents that collaboratively perform topic identification, validation, hierarchical grouping, and natural language explanation. This design enables users to trace the reasoning behind topic assignments, enhancing interpretability without sacrificing accuracy.
Agentopic 通过使用多个智能体协作执行主题识别、验证、层级分组和自然语言解释来解决这一问题。这种设计使用户能够追踪主题分配背后的推理过程，在不牺牲准确性的前提下增强了可解释性。

When seeded with topics from the British Broadcasting Corporation (BBC) dataset, Agentopic achieves an F1-score of 0.95, matching GPT-4.1, improving on LDA (0.93), and close to BERTopic (0.98). We used Agentopic to augment the BBC dataset with generated explanations to improve the dataset's richness and context.
当使用英国广播公司（BBC）数据集的主题进行种子测试时，Agentopic 的 F1 分数达到了 0.95，与 GPT-4.1 持平，优于 LDA（0.93），并接近 BERTopic（0.98）。我们利用 Agentopic 为 BBC 数据集补充了生成的解释，从而提升了数据集的丰富度和上下文信息。

The unseeded Agentopic generated 2045 semantically coherent topics organized across six hierarchical levels, vastly enriching the original five-category structure. By embedding explainability throughout the workflow, Agentopic offers an interpretable alternative to black-box models, making it particularly valuable for crucial applications like finance and healthcare.
在无种子模式下，Agentopic 生成了 2045 个语义连贯的主题，并将其组织在六个层级中，极大地丰富了原始的五类结构。通过将可解释性嵌入到整个工作流中，Agentopic 为黑盒模型提供了一种可解释的替代方案，使其在金融和医疗保健等关键应用领域具有极高的价值。
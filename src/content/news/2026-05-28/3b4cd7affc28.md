---
title: "Personalizing Embodied Multimodal Large Language Model Agents over Long-term User Interactions"
originalUrl: "https://arxiv.org/abs/2605.26256"
date: "2026-05-27T22:59:28.470Z"
---

# Personalizing Embodied Multimodal Large Language Model Agents over Long-term User Interactions
# 通过长期用户交互实现具身多模态大语言模型智能体的个性化

**Abstract:** Multimodal large language model (MLLM)-based embodied agents have shown strong potential for solving complex tasks in physical environments. However, personalized assistance requires more than following generic instruction or recognizing object categories. In real-world scenarios, the intended target is often specified only implicitly through prior interactions, requiring agents to leverage personalized context accumulated over time.

**摘要：** 基于多模态大语言模型（MLLM）的具身智能体在解决物理环境中的复杂任务方面展现出了巨大潜力。然而，个性化辅助不仅仅需要遵循通用指令或识别物体类别。在现实场景中，预期的目标往往仅通过先前的交互隐式地指定，这要求智能体能够利用随时间积累的个性化上下文。

In this work, we propose POLAR, a multimodal memory-augmented framework for personalized embodied agents over long-term user interactions. POLAR organizes prior interactions into a multimodal knowledge graph that captures semantic memory for personalized context and visual concepts, and episodic memory for embodied experiences such as agent trajectories.

在这项工作中，我们提出了 POLAR，这是一个用于长期用户交互中个性化具身智能体的多模态记忆增强框架。POLAR 将先前的交互组织成一个多模态知识图谱，该图谱捕获了用于个性化上下文和视觉概念的语义记忆，以及用于智能体轨迹等具身经验的情景记忆。

To execute embodied tasks, POLAR retrieves relevant memories to interpret the current request and guide task execution. We evaluate POLAR across multiple MLLM backbones and diverse evaluation scenarios to study the role of memory in long-term personalization.

为了执行具身任务，POLAR 会检索相关记忆以解读当前请求并指导任务执行。我们在多个 MLLM 主干模型和多样的评估场景中对 POLAR 进行了评估，以研究记忆在长期个性化中的作用。

Results show that the proposed memory mechanism consistently improves performance by enabling more effective use of information accumulated over prior interactions. The gains are especially pronounced when the agents are required to reason across multiple interactions, perform multi-hop inference, or tracking updates in user-specific context over time.

结果表明，所提出的记忆机制通过更有效地利用先前交互中积累的信息，持续提升了性能。当智能体需要跨多个交互进行推理、执行多跳推理或随时间跟踪用户特定上下文的更新时，这种性能提升尤为显著。
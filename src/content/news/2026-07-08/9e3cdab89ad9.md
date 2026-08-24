---
title: "Object-Centric Environment Modeling for Agentic Tasks"
originalUrl: "https://arxiv.org/abs/2607.02846"
date: "2026-07-07T22:37:28.338Z"
---

# Object-Centric Environment Modeling for Agentic Tasks
# 面向智能体任务的以对象为中心的环境建模

Large language model (LLM) agents can improve through accumulated experience, but free-form textual memories become difficult to maintain, validate, and reuse as interactions grow. Recent symbolic approaches learn executable skills or programmatic world models, yet often store local procedures or assume simplified dynamics.

大型语言模型（LLM）智能体可以通过积累经验来提升能力，但随着交互的增加，自由形式的文本记忆变得难以维护、验证和重用。近期的符号化方法虽然学习了可执行技能或程序化世界模型，但往往仅存储局部过程或假设了简化的动态环境。

We propose Object-Centric Environment Modeling (OCM), which organizes experience into an executable object-centric environment model. OCM maintains two connected code bases: object knowledge, which defines environment entities and mechanisms as Python classes, and procedure knowledge, which records reusable interaction patterns that must import and use the object model.

我们提出了“以对象为中心的环境建模”（Object-Centric Environment Modeling, OCM），它将经验组织成一个可执行的、以对象为中心的环境模型。OCM 维护两个相互关联的代码库：一是“对象知识”，将环境实体和机制定义为 Python 类；二是“过程知识”，记录必须导入并使用该对象模型的可重用交互模式。

OCM works in an online setting: after each episode, OCM reflects on the trajectory, updates both knowledge bases, and verifies that all procedures execute against the updated object model. During future interaction, the agent uses progressive knowledge disclosure to inspect compact code signatures first and read source code only when needed.

OCM 在在线环境下运行：在每一轮任务结束后，OCM 会对轨迹进行反思，更新两个知识库，并验证所有过程是否能在更新后的对象模型上正确执行。在未来的交互中，智能体采用渐进式知识披露机制，先检查紧凑的代码签名，仅在需要时才读取源代码。

Experiments show that OCM achieves the best average rank across benchmarks and reduces invalid actions, demonstrating that agents can benefit from building object-centric environment models.

实验表明，OCM 在各项基准测试中均取得了最优的平均排名，并减少了无效操作，证明了智能体可以通过构建以对象为中心的环境模型获益。
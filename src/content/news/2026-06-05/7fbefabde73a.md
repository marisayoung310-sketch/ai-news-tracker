---
title: "Can Generalist Agents Automate Data Curation?"
originalUrl: "https://arxiv.org/abs/2606.04261"
date: "2026-06-04T22:54:31.767Z"
---

# Can Generalist Agents Automate Data Curation?
# 通用智能体能否实现数据清洗自动化？

Curating training data is among the most consequential yet labor-intensive parts of modern AI development: practitioners iteratively propose, implement, evaluate, and revise data policies against noisy benchmark feedback. We ask whether generalist coding agents can automate this data-curation loop.
在现代人工智能开发中，清洗训练数据是最关键但也最耗费人力的环节之一：从业者需要根据嘈杂的基准反馈，反复提出、实施、评估并修订数据策略。我们探讨了通用编程智能体是否能够实现这一数据清洗循环的自动化。

We introduce *Curation-Bench*, an agent-centric benchmark that fixes the model, training recipe, and evaluation suite while giving agents command-line access to inspect data, implement policies, submit them to a fixed training/evaluation pipeline, and revise.
我们推出了 *Curation-Bench*，这是一个以智能体为中心的基准测试。它固定了模型、训练方案和评估套件，同时赋予智能体命令行访问权限，使其能够检查数据、实施策略、将其提交至固定的训练/评估流水线，并进行修订。

In a vision-language instruction-tuning instantiation, out-of-the-box agents reach strong published data-selection baselines within ten iterations. However, trajectory analysis reveals a persistent *execution-research gap*: agents mainly tune local policy variants rather than explore new policy families, even when given strategy guides and paper references.
在视觉-语言指令微调的实例中，现成的智能体在十次迭代内即可达到已发表的强力数据选择基准。然而，轨迹分析揭示了一个持续存在的“执行-研究鸿沟”：即使提供了策略指南和论文参考，智能体主要还是在调整局部的策略变体，而非探索新的策略族。

Scaffolds requiring each iteration to cite, instantiate, and adapt a prior method shift agents toward method-guided exploration. The scaffolded agent autonomously composes -- without human design input -- a data-selection policy that outperforms strong published baselines at one-tenth their data budget.
通过引入脚手架（Scaffolds），要求智能体在每次迭代中引用、实例化并适配先前的方法，可以引导智能体进行基于方法的探索。在无需人工设计输入的情况下，这种经过脚手架辅助的智能体能够自主构建出一种数据选择策略，其性能超越了已发表的强力基准，且数据预算仅为后者的十分之一。

Overall, current agents can run the curation loop, but reliable data research requires scaffolded method adaptation, not open-ended prompting alone. Code and benchmark are open-sourced.
总而言之，当前的智能体能够运行数据清洗循环，但可靠的数据研究需要脚手架辅助的方法适配，而不仅仅是开放式的提示词工程。相关代码和基准测试已开源。
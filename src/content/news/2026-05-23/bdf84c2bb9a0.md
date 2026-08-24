---
title: "GenEvolve: Self-Evolving Image Generation Agents via Tool-Orchestrated Visual Experience Distillation"
originalUrl: "https://arxiv.org/abs/2605.21605"
date: "2026-05-22T22:35:11.044Z"
---

# GenEvolve: Self-Evolving Image Generation Agents via Tool-Orchestrated Visual Experience Distillation

**GenEvolve：通过工具编排视觉经验蒸馏实现自我进化的图像生成智能体**

***

**Abstract:** Open-ended image generation is no longer a simple prompt-to-image problem. High-quality generation often requires an agent to combine a model's internal generative ability with external resources. As requests become more diverse and demanding, we aim to develop a general image-generation agent that can self-evolve through trajectories and use tools more effectively across varied generation challenges.

**摘要：** 开放式图像生成已不再是一个简单的“提示词转图像”问题。高质量的生成往往需要智能体将模型的内部生成能力与外部资源相结合。随着用户需求变得日益多样化和严苛，我们旨在开发一种通用的图像生成智能体，使其能够通过轨迹进行自我进化，并在各种生成挑战中更有效地使用工具。

***

To this end, we propose GenEvolve, a self-evolving framework based on Tool-Orchestrated Visual Experience Distillation. In GenEvolve, each generation attempt is modeled as a tool-orchestrated trajectory, where the agent gathers evidence, selects references, invokes generation skills, and composes them into a prompt-reference program.

为此，我们提出了 GenEvolve，这是一个基于“工具编排视觉经验蒸馏”的自我进化框架。在 GenEvolve 中，每一次生成尝试都被建模为一条由工具编排的轨迹，智能体在其中收集证据、选择参考资料、调用生成技能，并将它们组合成一个“提示词-参考”程序。

***

Unlike existing agentic generation methods that mainly rely on image-level scalar rewards, GenEvolve compares multiple trajectories for the same request and abstracts best-worst differences into structured visual experience, provided only to a privileged teacher branch. Inspired by on-policy self-distillation, Visual Experience Distillation provides dense token-level supervision, helping the student internalize better search, knowledge activation, reference selection, and prompt construction.

与现有的主要依赖图像级标量奖励的智能体生成方法不同，GenEvolve 会针对同一请求比较多条轨迹，并将“最优”与“最差”之间的差异抽象为结构化的视觉经验，仅提供给特权教师分支。受在线策略自我蒸馏（on-policy self-distillation）的启发，视觉经验蒸馏提供了密集的标记级（token-level）监督，帮助学生模型内化更好的搜索、知识激活、参考选择和提示词构建能力。

***

We further construct GenEvolve-Data and GenEvolve-Bench. Experiments on public benchmarks and GenEvolve-Bench show substantial gains over strong baselines, achieving state-of-the-art performance among current image-generation frameworks.

我们进一步构建了 GenEvolve-Data 和 GenEvolve-Bench。在公开基准测试和 GenEvolve-Bench 上的实验表明，该方法相比强基线模型取得了显著提升，在当前的图像生成框架中达到了最先进（SOTA）的性能水平。
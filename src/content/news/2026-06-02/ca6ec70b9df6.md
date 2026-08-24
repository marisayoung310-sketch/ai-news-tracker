---
title: "Harness Updating Is Not Harness Benefit: Disentangling Evolution Capabilities in Self-Evolving LLM Agents"
originalUrl: "https://arxiv.org/abs/2605.30621"
date: "2026-06-01T23:17:36.737Z"
---

# Harness Updating Is Not Harness Benefit: Disentangling Evolution Capabilities in Self-Evolving LLM Agents
# “更新工具”不等于“受益于工具”：解构自进化大模型智能体的进化能力

**Abstract:** LLM agents are increasingly deployed as systems built around editable external harnesses, including prompts, skills, memories and tools, that shape task execution without changing model parameters. Harness self-evolution adapts such agents by updating these harnesses from execution evidence. Yet it remains unclear whether a model's base capability in task-solving predicts its capabilities in harness self-evolution: which models produce useful harness updates, and which actually benefit from them?

**摘要：** 大模型（LLM）智能体正越来越多地被部署为围绕可编辑外部“工具”（Harness，包括提示词、技能、记忆和工具）构建的系统，这些工具在不改变模型参数的情况下塑造任务执行过程。工具自进化（Harness self-evolution）通过根据执行证据更新这些工具来适配智能体。然而，目前尚不清楚模型的基础任务解决能力是否能预测其在工具自进化方面的能力：哪些模型能产生有用的工具更新，而哪些模型又能真正从中受益？

We analyze two harness self-evolution capabilities: (i) harness-updating, the capability to produce useful persistent harness updates from execution evidence; (ii) harness-benefit, the capability to benefit from updated harnesses during task solving. Our analysis reveals two findings.

我们分析了两种工具自进化能力：(i) 工具更新能力（harness-updating），即根据执行证据产生有用的持久化工具更新的能力；(ii) 工具受益能力（harness-benefit），即在任务解决过程中从更新后的工具中获益的能力。我们的分析揭示了两个发现。

First, harness-updating is flat in base capability: models from different capability tiers produce harness updates that lead to surprisingly similar gains; even Qwen3.5-9B's updates yield gains comparable to those of Claude Opus 4.6.

首先，工具更新能力在基础能力上表现平坦：来自不同能力层级的模型所产生的工具更新，带来的性能提升惊人地相似；即使是 Qwen3.5-9B 产生的更新，其收益也与 Claude Opus 4.6 相当。

Second, harness-benefit is non-monotonic in base capability: weak-tier models benefit little from updated harnesses, mid-tier models benefit most, and strong-tier models benefit less than mid-tier. We trace low gains at the weak tier to two failure modes: weak-tier models may fail to activate relevant harness artifacts, or activate them but fail to follow them faithfully.

其次，工具受益能力在基础能力上呈现非单调性：弱层级模型从更新后的工具中获益甚微，中层级模型获益最多，而强层级模型的获益则少于中层级模型。我们将弱层级模型收益低的原因归结为两种失效模式：弱层级模型可能无法激活相关的工具组件，或者虽然激活了但无法忠实地遵循它们。

These findings suggest investing capability budget in the task-solving agent rather than the evolver, and targeting harness invocation and long-horizon instruction following in agent training. Our source code is publicly available at this https URL.

这些发现表明，应将能力预算投入到任务解决智能体本身而非进化器上，并在智能体训练中重点关注工具调用和长程指令遵循能力。我们的源代码已在链接中公开。
---
title: "CHI-Bench: Can AI Agents Automate End-to-End, Long-Horizon, Policy-Rich Healthcare Workflows?"
originalUrl: "https://arxiv.org/abs/2605.16679"
date: "2026-05-19T22:49:10.473Z"
---

# CHI-Bench: Can AI Agents Automate End-to-End, Long-Horizon, Policy-Rich Healthcare Workflows?
# CHI-Bench：AI 智能体能否实现端到端、长周期、高策略性医疗工作流的自动化？

**Abstract:** End-to-end automation of realistic healthcare operations stresses three capabilities underrepresented in current benchmarks: policy density, decisions must be grounded in a large library of medical, insurance, and operational rules; Multi-role composition: a single task requires the agent to play multiple roles with handoffs; and multilateral interaction: intermediate workflow steps are multi-turn dialogs, such as peer-to-peer review and patient outreach.

**摘要：** 现实医疗运营的端到端自动化对当前基准测试中尚未充分体现的三项能力提出了严峻挑战：策略密度（决策必须基于庞大的医疗、保险和运营规则库）；多角色组合（单一任务要求智能体在不同角色间切换并进行交接）；以及多边交互（工作流的中间步骤涉及多轮对话，例如同行评审和患者外联）。

We introduce $\chi$-Bench, a benchmark of long-horizon healthcare workflows across three domains: provider prior authorization, payer utilization management, and care management. Each task hands the agent a clinical case in a high-fidelity simulator of 20 healthcare apps exposed via 87 MCP tools, which it must drive to a terminal status through tool calls and writing the role's artifacts, guided by a 1,290+ document managed-care operations handbook skill.

我们推出了 $\chi$-Bench，这是一个涵盖三个领域（医疗服务提供者预授权、支付方利用率管理和护理管理）的长周期医疗工作流基准测试。每项任务都会向智能体提供一个临床案例，该案例运行在一个包含 20 个医疗应用程序的高保真模拟器中，并通过 87 个 MCP 工具进行交互。智能体必须在 1,290 多份管理式医疗运营手册的指导下，通过调用工具和编写角色相关文档，将任务推进至最终状态。

Across 30 agent harness/models configurations, the best agent resolves only 28.0% of tasks, no agent clears 20% on strict pass^3, and executing all tasks in a single session slumps the performance to 3.8%. These results raise the hypothesis that similar gaps are likely to surface in other policy-dense, role-composed, irreversible enterprise domains.

在 30 种智能体架构/模型配置中，表现最好的智能体仅能解决 28.0% 的任务；在严格的 pass^3 指标下，没有任何智能体的成功率超过 20%；而在单次会话中执行所有任务时，性能更是骤降至 3.8%。这些结果引发了一个假设：在其他同样具有高策略密度、多角色组合且操作不可逆的企业领域中，很可能也会出现类似的性能差距。
---
title: "Revealing Interpretable Failure Modes of VLMs"
originalUrl: "https://arxiv.org/abs/2605.12674"
date: "2026-05-14T22:48:52.110Z"
---

# Revealing Interpretable Failure Modes of VLMs
# 揭示视觉语言模型（VLM）的可解释性失效模式

Vision-Language Models (VLMs) are increasingly used in safety-critical applications because of their broad reasoning capabilities and ability to generalize with minimal task-specific engineering. Despite these advantages, they can exhibit catastrophic failures in specific real-world situations, constituting failure modes.
视觉语言模型（VLM）因其广泛的推理能力和在极少特定任务工程下实现泛化的能力，正越来越多地被应用于安全关键型领域。尽管具有这些优势，它们在特定的现实场景中仍可能表现出灾难性的失败，从而构成所谓的“失效模式”。

We introduce REVELIO, a framework for systematically uncovering interpretable failure modes in VLMs. We define a failure mode as a composition of interpretable, domain-relevant concepts—such as pedestrian proximity or adverse weather conditions—under which a target VLM consistently behaves incorrectly. Identifying such failures requires searching over an exponentially large discrete combinatorial space.
我们引入了 REVELIO，这是一个用于系统性揭示 VLM 中可解释失效模式的框架。我们将“失效模式”定义为一组可解释的、与领域相关的概念（例如行人距离或恶劣天气条件）的组合，在这些条件下，目标 VLM 会持续表现出错误行为。识别此类失效需要在一个指数级庞大的离散组合空间中进行搜索。

To address this challenge, REVELIO combines two search procedures: a diversity-aware beam search that efficiently maps the failure landscape, and a Gaussian-process Thompson Sampling strategy that enables broader exploration of complex failure modes.
为了应对这一挑战，REVELIO 结合了两种搜索程序：一种是能够高效映射失效全貌的“多样性感知束搜索”（diversity-aware beam search），另一种是能够对复杂失效模式进行更广泛探索的“高斯过程汤普森采样”（Gaussian-process Thompson Sampling）策略。

We apply REVELIO to autonomous driving and indoor robotics domains, uncovering previously unreported vulnerabilities in state-of-the-art VLMs. In driving environments, the models often demonstrate weak spatial grounding and fail to account for major obstructions, leading to recommendations that would result in simulated crashes.
我们将 REVELIO 应用于自动驾驶和室内机器人领域，揭示了当前最先进 VLM 中此前未被报道的漏洞。在驾驶环境中，这些模型往往表现出较弱的空间定位能力，且无法考虑到重大障碍物，从而导致可能引发模拟碰撞的错误建议。

In indoor robotics tasks, VLMs either miss safety hazards or behave excessively conservatively, producing false alarms and reducing operational efficiency. By identifying structured and interpretable failure modes, REVELIO offers actionable insights that can support targeted VLM safety improvements.
在室内机器人任务中，VLM 要么会忽略安全隐患，要么表现得过于保守，产生误报并降低操作效率。通过识别结构化且可解释的失效模式，REVELIO 提供了可操作的见解，能够支持针对性的 VLM 安全改进。
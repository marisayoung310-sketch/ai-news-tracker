---
title: "Learning Correct Behavior from Examples: Validating Sequential Execution in Autonomous Agents"
originalUrl: "https://arxiv.org/abs/2605.03159"
date: "2026-05-07T23:13:35.037Z"
---

# Learning Correct Behavior from Examples: Validating Sequential Execution in Autonomous Agents
# 从示例中学习正确行为：验证自主智能体的顺序执行

**Abstract:** As autonomous agents become increasingly sophisticated, validating their sequential behavior presents a significant challenge. Traditional testing approaches require manual specification, exact sequence matching, or thousands of training examples. 

**摘要：** 随着自主智能体变得日益复杂，验证其顺序行为已成为一项重大挑战。传统的测试方法通常需要人工指定规则、精确的序列匹配，或者成千上万个训练示例。

We present a novel algorithm that automatically learns correct behavior from just 2-10 passing execution traces and validates new executions against this learned model. Our approach combines dominator analysis from compiler theory with multimodal large language model-powered semantic understanding to identify essential states and handle non-deterministic behavior. 

我们提出了一种新颖的算法，仅需 2-10 个成功的执行轨迹即可自动学习正确行为，并根据该学习模型验证新的执行过程。我们的方法结合了编译器理论中的支配分析（dominator analysis）与多模态大语言模型驱动的语义理解，以识别关键状态并处理非确定性行为。

The system constructs a generalized ground truth model using Prefix Tree Acceptors, merges traces through multi-tiered equivalence detection, and validates new executions via topological subsequence matching. 

该系统利用前缀树自动机（Prefix Tree Acceptors）构建广义的基准真值模型，通过多层等价性检测合并轨迹，并利用拓扑子序列匹配来验证新的执行过程。

In controlled experiments, our system achieved high accuracy in detecting product bugs and false successes using only 3 training traces. This approach provides explainable validation results with coverage metrics and works across diverse domains including UI testing, code generation, and robotic processes.

在对照实验中，我们的系统仅使用 3 个训练轨迹，就在检测产品缺陷和虚假成功方面实现了高准确率。该方法能够提供带有覆盖率指标的可解释验证结果，并适用于包括 UI 测试、代码生成和机器人流程在内的多个领域。
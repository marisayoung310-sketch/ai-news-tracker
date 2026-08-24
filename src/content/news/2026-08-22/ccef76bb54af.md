---
title: "Air Traffic Control Using Large Language Models: Prompt Engineering, Architecture, and Evaluation"
originalUrl: "https://arxiv.org/abs/2608.19299"
date: "2026-08-21T21:48:53.739Z"
---

# Air Traffic Control Using Large Language Models: Prompt Engineering, Architecture, and Evaluation
# 利用大语言模型进行空中交通管制：提示工程、架构与评估

**Abstract:** Air traffic control (ATC) communication is a safety-critical dialogue that remains largely human-driven even as other parts of air traffic management have been semi-automated. In this article, we experimentally evaluate whether large language models (LLMs) can generate operationally realistic ATC transmissions.

**摘要：** 空中交通管制（ATC）通信是一种安全关键型对话，尽管空中交通管理的其他部分已实现半自动化，但该领域目前仍主要由人工主导。在本文中，我们通过实验评估了大语言模型（LLMs）是否能够生成符合实际操作要求的 ATC 通信内容。

An experimental general-aviation flight flying over the San Francisco "Bay Tour" route is hand-transcribed and used as ground truth (P0). Through a pilot-in-the-loop process we design five prompt structures (P1-P5) of increasing constraint and embed them in a stateful multi-turn pipeline, where the model plays ATC to a fixed pilot transcript while conditioning on the accumulating dialogue history.

我们对一次在旧金山“湾区巡航”（Bay Tour）航线上进行的通用航空实验飞行进行了人工转录，并将其作为基准事实（P0）。通过“人在回路”（pilot-in-the-loop）的流程，我们设计了五种约束程度递增的提示结构（P1-P5），并将它们嵌入到一个有状态的多轮对话流水线中。在该流水线中，模型扮演 ATC 角色，针对固定的飞行员转录内容进行回复，同时根据不断积累的对话历史进行条件化生成。

Across nine open- and closed-source LLMs we vary the prompt, the presence of a worked transcript from a different experimental flight as an in-context example, and whether the model conditions on its own prior replies or on injected ground-truth history. Turns are scored with lexical, structural, and semantic similarity metrics and by an LLM-as-judge (GPT-5.5) validated against human expert annotation.

我们在九种开源和闭源大语言模型上进行了测试，通过改变提示词、是否包含来自另一次实验飞行的已处理转录作为上下文示例，以及模型是基于自身先前的回复还是注入的基准事实历史进行条件化生成，来观察模型表现。对话轮次通过词汇、结构和语义相似度指标进行评分，并由经过人类专家标注验证的“大模型作为裁判”（LLM-as-judge，使用 GPT-5.5）进行评估。

Supplying a worked example improves similarity, but tightening the prompt does not: the lightest prompts perform best and the most heavily scripted one collapses as its own errors accumulate through the dialogue, which injecting correct history repairs. These results outline a concrete path and its current limits toward LLM-assisted ATC.

提供已处理的示例可以提高相似度，但收紧提示词约束却适得其反：最简洁的提示词表现最好，而约束最严格的脚本化提示词则随着对话中自身错误的累积而崩溃，不过注入正确的历史记录可以修复这一问题。这些结果勾勒出了一条通往大模型辅助 ATC 的具体路径，同时也指出了其当前的局限性。
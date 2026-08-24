---
title: "Loop Engineering for RAG: The Small Loops Inside Each Step, the Big Loops Across the Pipeline"
originalUrl: "https://towardsdatascience.com/loop-engineering-for-rag-the-small-loops-inside-each-step-the-big-loops-across-the-pipeline/"
date: "2026-08-17T21:56:54.494Z"
---

# Loop Engineering for RAG: The Small Loops Inside Each Step, the Big Loops Across the Pipeline
# RAG 的循环工程：步骤内的“小循环”与流水线间的“大循环”

Large Language Model Loop Engineering for RAG: The Small Loops Inside Each Step, the Big Loops Across the Pipeline Enterprise Document Intelligence [Vol.1 #13bis] – The four bricks return useful results most of the time. Loop engineering is what the system does the rest of the time: when retrieval misses, when generation fails the schema, when the listing comes back incomplete, when an API call times out. Three control surfaces (trigger, termination, recovery) and one rule that separates a useful loop from a spinning one.
大型语言模型 RAG 的循环工程：步骤内的“小循环”与流水线间的“大循环”。企业文档智能 [第1卷 #13bis] —— “四大基石”在大多数情况下能返回有用的结果。而循环工程则是系统在其他情况下的应对之道：当检索失败、生成结果不符合模式、列表返回不完整或 API 调用超时时。本文将探讨三个控制面（触发、终止、恢复）以及区分“有效循环”与“无效空转”的一条准则。

AI engineers today talk a lot about loop engineering. The phrase took off after Boris Cherny, the Anthropic engineer behind Claude Code, said he had mostly stopped prompting: he writes loops that prompt the model until a condition is met. For a coding agent with a test suite to check against, that works.
如今，AI 工程师们经常谈论循环工程。这个概念在 Anthropic 的 Claude Code 工程师 Boris Cherny 表示他已基本不再进行提示词工程后迅速走红：他编写循环来不断提示模型，直到满足特定条件为止。对于拥有测试套件进行校验的编码智能体来说，这种方法非常有效。

For an enterprise RAG pipeline, the loop itself is the part that needs engineering, because the failures it has to absorb are ordinary: the parser flattens the one table the answer lived in, retrieval returns the page next to the right one, the model sends back JSON that fails the schema, the API times out in the middle of a batch. The four bricks handle the clean path; loop engineering is what the system does on every other path, and doing it well is what lets the pipeline recover instead of spin.
对于企业级 RAG 流水线而言，循环本身才是需要精心设计的核心，因为它必须吸收各种常见的故障：解析器将答案所在的表格扁平化处理、检索返回了正确页面旁边的页面、模型返回了不符合模式的 JSON、或者 API 在批处理过程中超时。四大基石处理的是“理想路径”，而循环工程则是系统在处理所有其他路径时的逻辑；做好这一点，才能让流水线实现自我恢复，而不是陷入死循环。

A one-shot pipeline commits to its first try: parse once, retrieve once, generate once, return whatever comes out. When retrieval comes back empty or the answer is half-formed, there is no second chance. A loop gives the pipeline one: notice the miss, adjust, and run the weak step again before the user ever sees it.
“单次执行”（One-shot）流水线只尝试一次：解析一次、检索一次、生成一次，然后直接返回结果。当检索结果为空或答案残缺时，它没有第二次机会。而循环则为流水线提供了机会：在用户察觉之前，识别错误、进行调整并重新运行薄弱环节。

### 1. What loop engineering is
### 1. 什么是循环工程

1.1 The third layer of the agent stack
1.1 智能体技术栈的第三层

Three disciplines stack on top of an LLM call. Prompt engineering writes the call: system message, user message, schema. Context engineering chooses what enters and exits the model’s context window between calls (see Article 7bis). Loop engineering decides when the next call happens, what triggers it, when the loop stops, and how the system recovers when something goes wrong.
LLM 调用之上叠加了三个学科。提示词工程负责编写调用内容：系统消息、用户消息、模式定义。上下文工程负责决定在多次调用之间，哪些内容进入或离开模型的上下文窗口（参见第 7bis 篇）。循环工程则决定下一次调用何时发生、触发条件是什么、循环何时停止，以及当出现问题时系统如何恢复。

A polished prompt with a clean retrieval upstream produces a correct answer most of the time. The rest of the time the call fails in one of the ways the opening listed: an invalid JSON, a self-flagged incomplete listing, a 429 at the deployment’s rate cap. Loop engineering is the discipline of designing what happens next. The shortest critique of bad loop engineering, paraphrasing the practitioner literature, is this: a loop that retries the same action on the same error is not learning, it is spinning. The difference between a loop that helps and a loop that wastes tokens is whether each iteration changes something the previous iteration did not address.
一个精雕细琢的提示词配合干净的检索上游，在大多数情况下能产生正确答案。但在其余情况下，调用会以开头列出的方式失败：无效的 JSON、自检不完整的列表、或部署限流导致的 429 错误。循环工程就是设计“接下来该做什么”的学科。借用从业者的文献，对糟糕循环工程最简短的批评是：在同一个错误上重复相同动作的循环不是在学习，而是在空转。一个有益的循环与一个浪费 Token 的循环之间的区别在于：每一次迭代是否改变了前一次迭代未解决的问题。

1.2 The lineage in one paragraph
1.2 一段话回顾其演进历程

Bounded retry is the oldest pattern in the catalogue: Erlang’s let it crash model has carried some version of it since the 1980s. ReAct (Princeton and Google, October 2022) put it inside an LLM call for the first time: reason about the result, decide to act again or stop. AutoGPT (March 2023) made the autonomous version public. Reflexion (NeurIPS 2023) added self-evaluation. Plan-and-Execute separated planning from execution. Geoffrey Huntley’s Ralph Loop (July 2025) put the goal on disk so a context reset never lost track. Anthropic released the /goal command in Claude Code (May 2026) and packaged the whole stack two weeks later as Dynamic Workflows.
“有界重试”（Bounded retry）是目录中最古老的模式：Erlang 的“让它崩溃”（let it crash）模型自 20 世纪 80 年代以来就一直沿用其变体。ReAct（普林斯顿与谷歌，2022 年 10 月）首次将其引入 LLM 调用中：对结果进行推理，决定再次行动还是停止。AutoGPT（2023 年 3 月）将自主版本公之于众。Reflexion（NeurIPS 2023）增加了自我评估。Plan-and-Execute 将规划与执行分离。Geoffrey Huntley 的 Ralph Loop（2025 年 7 月）将目标存入磁盘，确保上下文重置时不会丢失进度。Anthropic 在 Claude Code 中发布了 /goal 命令（2026 年 5 月），并在两周后将其整个技术栈打包为“动态工作流”（Dynamic Workflows）。
---
title: "Prompt, Context, Loop: The Three Engineering Layers Every RAG System Is Built On"
originalUrl: "https://towardsdatascience.com/prompt-context-loop-the-three-engineering-layers-every-rag-system-is-built-on/"
date: "2026-08-03T22:38:39.478Z"
---

# Prompt, Context, Loop: The Three Engineering Layers Every RAG System Is Built On
# Prompt, Context, Loop：每个 RAG 系统构建的三大工程层级

Large Language Model Prompt, Context, Loop: The Three Engineering Layers Every RAG System Is Built On Enterprise Document Intelligence [Vol.1 #M2] – Every RAG system is built in three engineering layers stacked on one LLM call: prompt (the call itself), context (what fills the model’s window), loop (when the next call fires and when it stops). Knowing which layer you are standing on is half of building and debugging RAG.

大语言模型 Prompt、Context、Loop：每个 RAG 系统构建的三大工程层级。企业文档智能 [第1卷 #M2] —— 每个 RAG 系统都建立在基于单次 LLM 调用的三个工程层级之上：Prompt（调用本身）、Context（填充模型窗口的内容）、Loop（下一次调用何时触发以及何时停止）。明确你当前所处的层级，是构建和调试 RAG 系统成功的一半。

Every RAG system is built in three engineering layers stacked on a single LLM call. Prompt engineering is the call itself: the system message, the instructions, the schema that fixes the output shape. Context engineering is what fills the model’s window: retrieval, compression, deciding what to keep out. Loop engineering is what happens around the call: when the next one fires, when the loop stops, how the system recovers when a check fails.

每个 RAG 系统都建立在基于单次 LLM 调用的三个工程层级之上。Prompt 工程是调用本身：系统消息、指令以及固定输出格式的 Schema。Context 工程是填充模型窗口的内容：检索、压缩以及决定剔除哪些信息。Loop 工程是围绕调用所发生的一切：何时触发下一次调用、循环何时停止、以及系统在检查失败时如何恢复。

Almost every argument about RAG is really an argument about which of these three layers you are standing on. Name the layer and most of the confusion clears. This article is the map: what each layer owns, how they map onto the series, and why the tidy “one replaced the next” story is only half true.

关于 RAG 的几乎所有争论，本质上都是关于你正处于这三个层级中的哪一层。指明层级，大部分困惑便会迎刃而解。本文就是一张地图：阐述每个层级负责的内容、它们如何映射到本系列文章中，以及为什么“一个层级取代另一个”这种整齐的叙事只对了一半。

This article is a manifesto of Enterprise Document Intelligence, a series that builds an enterprise RAG system from four bricks. It treats the three-layer framing (prompt engineering, context engineering, loop engineering) that has become the dominant 2026 narrative, and asks the harder question: is the evolution from one layer to the next actually a sequence, or is it a retrospective story imposed on patterns that were always there?

本文是《企业文档智能》系列的宣言，该系列旨在通过四个模块构建一个企业级 RAG 系统。它探讨了 2026 年已成为主流叙事的“三层架构”（Prompt 工程、Context 工程、Loop 工程），并提出了一个更深刻的问题：从一个层级向下一个层级的演进，究竟是一个序列过程，还是人们强加在既有模式上的事后叙事？

### 1. The three-layer framing
### 1. 三层架构框架

Three disciplines stack on top of an LLM call. Each one is responsible for a different lever; together they describe most of what production teams do when they go past hello-world.

三个学科叠加在 LLM 调用之上。每一个学科负责不同的杠杆；它们共同描述了生产团队在超越“Hello World”阶段后所做的大部分工作。

Prompt engineering is the layer everyone meets first. The model needs a system message that sets its role and constraints, a user message that carries the question and the context block, optionally a schema that fixes the shape of the expected output. Writing those three pieces well is the difference between a model that follows the rules and a model that improvises. The discipline shipped in 2022-2023 with GPT-3.5 and ChatGPT; the term prompt engineering installed in the public discourse around the same time.

Prompt 工程是每个人最先接触的层级。模型需要一个设定角色和约束的系统消息、一个包含问题和上下文块的用户消息，以及可选的用于固定预期输出格式的 Schema。写好这三部分，决定了模型是循规蹈矩还是随意发挥。这一学科随着 2022-2023 年 GPT-3.5 和 ChatGPT 的发布而兴起；“Prompt 工程”这一术语也大约在同一时间进入公众视野。

Context engineering is the layer that ships when the prompt alone is no longer enough. The model has a finite context window; the practitioner decides what fills it. Retrieval picks the relevant documents. Compression removes the noise. Isolation keeps sub-agent outputs out of the main window. The four canonical strategies (LangChain’s write, select, compress, isolate) name what the practitioner has been doing implicitly since the first RAG paper. The term installs in 2025 (Karpathy and Tobi Lütke use it publicly, Anthropic publishes the canonical Effective context engineering for AI agents in 2025).

Context 工程是在仅靠 Prompt 不再足够时出现的层级。模型拥有有限的上下文窗口；从业者需要决定填充什么内容。检索负责挑选相关文档，压缩负责去除噪声，隔离负责将子代理（sub-agent）的输出排除在主窗口之外。四种经典策略（LangChain 的写入、选择、压缩、隔离）定义了从业者自第一篇 RAG 论文以来一直在隐式执行的操作。该术语在 2025 年确立（Karpathy 和 Tobi Lütke 公开使用，Anthropic 在 2025 年发布了权威的《AI 代理的有效上下文工程》）。

Loop engineering is the layer that ships when a single call is no longer enough. The model produced a plausible answer that fails the schema. The listing returned twelve items but the model itself flagged the answer as incomplete. The API timed out. The agent picked the wrong tool. The practitioner now owns four control surfaces: what triggers the next call, when the loop stops, how the system recovers when a call fails, how independent agents verify the result before committing. The name installs in May 2026 with Boris Cherny’s “I don’t prompt Claude anymore. I have loops running that prompt Claude” and Anthropic’s launch of Dynamic Workflows ten days later.

Loop 工程是在单次调用不再足够时出现的层级。模型生成了一个看似合理但未通过 Schema 校验的答案；列表返回了 12 个项目，但模型自身标记答案不完整；API 超时；代理选择了错误的工具。从业者现在拥有四个控制面：触发下一次调用的条件、循环何时停止、系统在调用失败时如何恢复、以及独立代理在提交前如何验证结果。该名称于 2026 年 5 月确立，源于 Boris Cherny 的名言：“我不再直接 Prompt Claude 了。我运行着循环来 Prompt Claude”，以及十天后 Anthropic 推出的 Dynamic Workflows。

The narrative writes itself: prompt engineering became context engineering became loop engineering, each layer added once the previous one was saturated. It is a clean story. It is also slightly wrong.

这种叙事逻辑顺理成章：Prompt 工程演变为 Context 工程，再演变为 Loop 工程，每一层都是在前一层饱和后添加的。这是一个简洁的故事，但它稍微有些偏差。

### 2. The honest version: the patterns predate the names
### 2. 真实版本：模式先于名称存在

The patterns of each layer existed before the name. ReAct (Princeton and Google, October 2022) is the canonical reasoning-plus-action loop, more than three years older than the term loop engineering. AutoGPT made autonomous goal-driven loops public in March 2023. Reflexion added self-evaluation at NeurIPS 2023. Geoffrey Huntley’s Ralph Loop put goals on disk in July 2025. By the time loop engineering installed as a term in May 2026, the patterns had been in production for more than three years.

每个层级的模式在名称出现之前就已经存在。ReAct（普林斯顿和谷歌，2022 年 10 月）是经典的“推理+行动”循环，比“Loop 工程”这一术语早了三年多。AutoGPT 在 2023 年 3 月公开了自主目标驱动的循环。Reflexion 在 2023 年的 NeurIPS 上增加了自我评估。Geoffrey Huntley 的 Ralph Loop 在 2025 年 7 月将目标存入磁盘。当“Loop 工程”在 2026 年 5 月成为术语时，这些模式已经在生产环境中运行了三年多。

The context-engineering side is similar. The original RAG paper (Lewis et al., 2020) is two years before prompt engineering even installed as a term. By 2022 every serious LLM application had a context-management story (chunking, retrieval, deduplication, truncation) that no one called context engineering yet. The LangChain four-strategy taxonomy (write, select, compress, isolate) names what was happening implicitly in every production RAG system for four years.

Context 工程方面也是如此。最初的 RAG 论文（Lewis 等人，2020 年）比“Prompt 工程”作为术语出现还要早两年。到 2022 年，每个严肃的 LLM 应用都有自己的上下文管理方案（分块、检索、去重、截断），尽管当时没人称其为“Context 工程”。LangChain 的四种策略分类（写入、选择、压缩、隔离）定义了四年来每个生产级 RAG 系统中隐式发生的事情。

The honest reading is that all three layers existed simultaneously from the start of the LLM era. What changed across the four-year window is which layer was the dominant bottleneck in production. As long as the bottleneck was prompt quality, no one paid attention to the loop. As soon as the bottleneck shifted to context discipline, the LangChain taxonomy crystallised. As soon as the bottleneck...

客观的解读是，这三个层级从 LLM 时代开始就同时存在。在这四年中发生变化的是，哪个层级成为了生产中的主要瓶颈。只要瓶颈是 Prompt 质量，就没人关注 Loop。一旦瓶颈转移到 Context 规范，LangChain 的分类法便应运而生。一旦瓶颈……
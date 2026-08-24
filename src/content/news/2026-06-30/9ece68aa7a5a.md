---
title: "DMV-Bench: Diagnosing Long-Horizon Multimodal Agents' Visual Memory with Incidental Cue Injection"
originalUrl: "https://arxiv.org/abs/2606.27499"
date: "2026-06-29T22:42:25.848Z"
---

### DMV-Bench: Diagnosing Long-Horizon Multimodal Agents' Visual Memory with Incidental Cue Injection
### DMV-Bench：通过附带线索注入诊断长程多模态智能体的视觉记忆

**Abstract:** Research on agent memory has matured rapidly, but almost entirely on the text side: few existing benchmarks ask, in an interactive environment, when an agent genuinely needs to remember what it saw rather than what it could write down.
**摘要：** 关于智能体记忆的研究发展迅速，但几乎完全集中在文本领域：在现有的基准测试中，很少有测试能在交互式环境中考察智能体何时真正需要记住它所“看到”的内容，而非仅仅是它能“写下”的内容。

We introduce DMV-Bench (Code: this https URL), the first interactive benchmark for multimodal-agent visual memory. DMV-Bench is built on a controlled home-furnishing e-commerce catalogue of 1,000 product variants in which a text-leakage contract ensures the discriminative signal of each task resides in the pixels alone.
我们推出了 DMV-Bench（代码链接：此 URL），这是首个针对多模态智能体视觉记忆的交互式基准测试。DMV-Bench 构建于一个包含 1,000 种产品变体的受控家居电商目录之上，通过文本泄露约束（text-leakage contract）确保每项任务的判别信号仅存在于像素中。

Across a chain of autonomous shopping sessions, every visited product image carries a unique, pre-rendered incidental cue, and the agent is later asked to recall a particular cued product and navigate to its URL.
在一系列自主购物会话中，每个被访问的产品图像都带有独特的、预渲染的附带线索（incidental cue），随后智能体需要回忆起特定的带线索产品并导航至其 URL。

Inspired by dual-coding theory, we propose DualMem, a memory architecture that maintains a visual and a verbal code in parallel.
受双重编码理论（dual-coding theory）的启发，我们提出了 DualMem，这是一种能够并行维护视觉编码和语言编码的记忆架构。

On DMV-Bench, DualMem outperforms a caption baseline and three recent multimodal agent-memory systems at every chain length J in {5, 10, 15, 50} on both Gemini 2.5 Flash and Qwen2.5-VL-7B, with the lead surviving controls for memory-bank size and encoding-position bias, and an asymmetric dual-coding regime in which vision carries the cue end-to-end while the verbal channel plays a smaller query-grounding role.
在 DMV-Bench 测试中，无论是在 Gemini 2.5 Flash 还是 Qwen2.5-VL-7B 模型上，DualMem 在所有链长度 J ∈ {5, 10, 15, 50} 下的表现均优于基准字幕模型及三种近期多模态智能体记忆系统。该优势在控制了记忆库大小和编码位置偏差后依然稳固，并展现出一种非对称的双重编码机制：视觉通道负责端到端的线索传递，而语言通道则发挥较小的查询定位作用。
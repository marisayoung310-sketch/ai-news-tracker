---
title: "RAG Hallucinates — I Built a Self-Healing Layer That Fixes It in Real Time"
originalUrl: "https://towardsdatascience.com/rag-hallucinates-i-built-a-self-healing-layer-that-fixes-it-in-real-time/"
date: "2026-05-05T22:27:15.625Z"
---

# RAG Hallucinates — I Built a Self-Healing Layer That Fixes It in Real Time
# RAG 产生幻觉了——我构建了一个能实时修复它的“自愈层”

Large Language Models RAG Hallucinates — I Built a Self-Healing Layer That Fixes It in Real Time. How a silent production failure led me to build a detection pipeline that catches, fixes, and routes hallucinations before users ever see them.
大型语言模型 RAG 产生幻觉了——我构建了一个能实时修复它的“自愈层”。一次静默的生产环境故障促使我构建了一个检测流水线，能够在用户看到之前捕获、修复并引导这些幻觉。

TL;DR: RAG retrieved the right document. The LLM still contradicted it. That is the failure this system catches. Five failure patterns: numeric contradictions, fake citations, negation flips, answer drift, confident-but-ungrounded responses. Three healing strategies fix bad answers in-place before users see them. No external APIs, no LLM judge, no embeddings model — pure Python under 50ms. 70 tests, every production failure mode I found has a named assertion.
简而言之：RAG 检索到了正确的文档，但大模型（LLM）依然与其产生矛盾。这就是本系统所要捕获的故障。五种故障模式：数值矛盾、虚假引用、否定翻转、答案漂移、自信但无根据的回答。三种修复策略可在用户看到之前原地修复错误答案。无需外部 API、无需 LLM 判别器、无需嵌入模型——纯 Python 实现，耗时低于 50 毫秒。70 个测试用例，我发现的每一种生产环境故障模式都有对应的断言。

### My RAG pipeline was lying (why I built this)
### 我的 RAG 流水线在撒谎（我构建此系统的原因）

I’m building a RAG-powered assistant for EmiTechLogic, my tech education platform. The goal is simple: a learner asks a question, the system pulls from my tutorials and articles, and answers based on that content. The LLM output should not be generic. It should reflect my content, my explanations, what I’ve actually written. Before putting that in front of real learners, I needed to test it properly. What I found was not what I expected.
我正在为我的技术教育平台 EmiTechLogic 构建一个基于 RAG 的助手。目标很简单：学习者提出问题，系统从我的教程和文章中提取信息，并基于这些内容进行回答。LLM 的输出不应该是通用的，它应该反映我的内容、我的解释以及我实际写过的东西。在将其展示给真正的学习者之前，我需要对其进行适当的测试。但我发现的情况与预期不符。

The retrieval was working fine. The right document was coming back. But the LLM was generating answers that directly contradicted what it had just retrieved. No errors, no crashes. Just a confident, fluent answer that was factually wrong. I started researching how common this failure is in production RAG systems. The more I looked, the more I found. This is not a rare edge case or a bug you can patch. It is a structural property of how RAG works.
检索工作正常，正确的文档被找回了。但 LLM 生成的答案却直接与其刚刚检索到的内容相矛盾。没有错误，没有崩溃，只有一个自信、流畅但事实错误的回答。我开始研究这种故障在生产环境 RAG 系统中有多普遍。研究得越深，发现的问题就越多。这不是一个罕见的边缘情况或可以修补的 Bug，而是 RAG 工作方式的一种结构性特征。

### Why it’s dangerous
### 为什么它很危险

What matters practically is that it happens regularly, it is not predictable, and most systems have nothing to catch it before the user sees it. Here is what makes it more dangerous than standard LLM hallucination. With a plain LLM, a wrong answer is at least plausibly uncertain. The user knows the model is working from training data and might be wrong. With RAG, the model read the correct source and still contradicted it. The user has every reason to trust the answer. The system looks like it is doing exactly what it was designed to do. The model isn’t just failing; it’s lying with a straight face.
从实际角度来看，重要的是它经常发生，且不可预测，大多数系统在用户看到之前没有任何手段来捕获它。这就是它比标准 LLM 幻觉更危险的原因。对于普通的 LLM，错误的答案至少在某种程度上是不确定的，用户知道模型是基于训练数据工作的，可能会出错。但在 RAG 中，模型读取了正确的来源却依然与其矛盾。用户有充分的理由信任这个答案。系统看起来完全按照设计意图在运行。模型不仅仅是在失败，它是在一本正经地撒谎。

### Where most RAG systems fail
### 大多数 RAG 系统在哪里失败了

Most RAG tutorials stop at: retrieve documents, stuff them into a prompt, call the model. That works until it does not. The whole promise of retrieval-augmented generation is grounding. Give the model real documents and it will use them. In practice, RAG creates a failure mode that is more dangerous than vanilla hallucination, not less. This is not about conflicting retrieved documents. This is about a model that retrieved exactly the right document and still answered incorrectly.
大多数 RAG 教程止步于：检索文档、塞入提示词、调用模型。这在失效之前确实有效。检索增强生成（RAG）的核心承诺是“落地（Grounding）”。给模型真实的文档，它就会使用它们。但在实践中，RAG 产生了一种比普通幻觉更危险的故障模式。这与检索到的文档冲突无关，而是指模型检索到了完全正确的文档，却依然给出了错误的回答。

### The five patterns of failure
### 五种故障模式

When I was going through documented production failures, five patterns kept showing up:
当我梳理记录在案的生产环境故障时，有五种模式反复出现：

1. **Confident wrong answers:** The model uses words like “definitely” or “clearly stated” while asserting something that has no basis in the retrieved source.
1. **自信的错误答案：** 模型使用“绝对”、“明确指出”等词汇，同时断言一些在检索来源中毫无根据的内容。

2. **Factual contradictions:** The context says 14 days, the answer says 30. The source was there. The model just ignored it.
2. **事实矛盾：** 上下文说 14 天，答案说 30 天。来源就在那里，但模型直接忽略了它。

3. **Hallucinated entities:** Person names, paper citations, organization names that do not appear anywhere in the retrieved documents.
3. **幻觉实体：** 在检索文档中根本不存在的人名、论文引用或组织名称。模型凭空捏造并将它们作为事实呈现。

4. **Answer drift:** The same question gets a different answer over time. This one is silent — no error, no flag, nothing.
4. **答案漂移：** 同一个问题在不同时间得到不同的答案。这是静默的——没有错误，没有标记，什么都没有。

5. **Confident but unfaithful:** The model sounds certain throughout the answer but most of what it says cannot be traced back to any retrieved source.
5. **自信但不忠实：** 模型在整个回答中听起来很确定，但其所说的大部分内容都无法追溯到任何检索来源。高置信度、低落地性，这是我发现的最危险的模式。
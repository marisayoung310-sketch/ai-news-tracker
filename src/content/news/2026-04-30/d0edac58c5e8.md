---
title: "Agentic AI: How to Save on Tokens"
originalUrl: "https://towardsdatascience.com/agentic-ai-how-to-save-on-tokens/"
date: "2026-04-30T01:15:47.713Z"
---

# Agentic AI: How to Save on Tokens
# 代理式 AI：如何节省 Token 开销

**Caching, lazy-loading, routing, compaction, and more**
**缓存、懒加载、路由、压缩及更多技巧**

It’s not hard to realize that working with AI in production is pretty expensive. We all know this and we know most vendors are working pretty hard to figure out how to make agents cheaper. This is why I thought it was a good idea to go through a few design principles to keep in mind when you’re building, which can help you understand where you can grab some savings.
不难发现，在生产环境中使用 AI 的成本相当高昂。我们都深知这一点，也知道大多数供应商都在努力寻找降低代理（Agent）成本的方法。因此，我认为有必要梳理一些在构建应用时应遵循的设计原则，帮助你了解从哪些环节可以节省开支。

We’ll go through how prompt caching works and why it’s a quick win, semantic caching, lazy-loading tools and MCPs, routing and cascading, delegating to subagents, and a bit on keeping the context clean. I am including interactive graphs throughout this article — that helps you visualize the cost savings each principle can get you based on the amount of tokens you are using. Yes, I am obviously staying real throughout, every saving comes with trade-offs.
我们将探讨提示词缓存（Prompt Caching）的工作原理及其为何能快速见效，以及语义缓存、工具与 MCP 的懒加载、路由与级联、子代理委派，以及如何保持上下文整洁。我在文中加入了交互式图表，帮助你根据 Token 使用量直观地看到每种原则带来的成本节省。当然，我会保持客观，因为每一项节省都伴随着相应的权衡。

### Agents get expensive as the context grows
### 随着上下文增长，代理成本随之攀升

Your first agent might ship with a 500-token system prompt and two tools, but once it grows up, those numbers balloon fast. Just to illustrate, the leaked Claude system prompt ran around 24,000 tokens, GPT-5’s around 15,000. People have complained that a simple “hi” in Claude Code with an empty folder consumed roughly 31,000 tokens. OpenClaw users have reported more than 150,000 input tokens sent to Gemini 3.1 Pro for 29 tokens of output on the first turn.
你的第一个代理可能只需要 500 个 Token 的系统提示词和两个工具，但一旦它变得复杂，这些数字就会迅速膨胀。举例来说，泄露的 Claude 系统提示词约为 24,000 个 Token，GPT-5 约为 15,000 个。有人抱怨在 Claude Code 中对一个空文件夹发送简单的“hi”，就消耗了约 31,000 个 Token。OpenClaw 用户报告称，在第一轮对话中，向 Gemini 3.1 Pro 发送了超过 150,000 个输入 Token，却只输出了 29 个 Token。

Add in tools and MCP servers and the numbers get genuinely ridiculous. Tool definitions alone can run into the tens of thousands of tokens. Skip cleaning up tool outputs and old conversation exhaust and you’re paying for that junk on every turn too. Without optimization, 100 messages a day at 166K input tokens runs around $996 a month on Gemini 3.1 Pro and roughly $2,490 on Claude Opus 4.6.
再加上工具和 MCP 服务器，这些数字简直荒谬。仅工具定义就可能达到数万个 Token。如果不清理工具输出和旧的对话冗余，你每一轮都在为这些垃圾信息付费。在没有优化的情况下，每天 100 条消息、每条 166K 输入 Token 的配置，在 Gemini 3.1 Pro 上每月成本约为 996 美元，在 Claude Opus 4.6 上则约为 2,490 美元。

### Reuse tokens when possible
### 尽可能重用 Token

LLM cost doesn’t just come from calling the model too often. It also comes from repeatedly paying to process the same tokens again and again. So for this section we’ll cover K/V caching, the mechanism under prompt caching, and semantic caching, which are two very different things.
大语言模型的成本不仅源于调用过于频繁，还源于反复为处理相同的 Token 付费。因此，本节我们将介绍 K/V 缓存（提示词缓存背后的机制）以及语义缓存，这两者是截然不同的概念。

### K/V caching & prefix caching
### K/V 缓存与前缀缓存

Before a model can generate anything, it first has to process the prompt. This step is called prefill. Prefill costs compute, which means latency and money. So, to be efficient, we shouldn’t keep re-processing the same content. When you use a large language model, the prompt first gets tokenized, then those tokens turn into vectors, and then inside each attention layer those vectors get projected into K/V tensors.
在模型生成任何内容之前，必须先处理提示词。这一步称为“预填充”（Prefill）。预填充需要消耗计算资源，意味着延迟和金钱。因此，为了高效，我们不应反复处理相同的内容。当你使用大语言模型时，提示词首先被分词（Tokenized），然后转化为向量，接着在每个注意力层中，这些向量被投影为 K/V 张量。

The inference engine has to cache the K/V tensors during generation, otherwise the math doesn’t work at any reasonable speed. After it has finished it throws that cache away. But instead of throwing the cache away when the response ends, we can store it, tagged in a way that lets us find it again. Next time a request comes in, we’d check whether that same part of the prompt matches something we already have tensors for. If yes, we load those tensors and skip re-processing it.
推理引擎在生成过程中必须缓存 K/V 张量，否则计算速度将无法达到合理水平。生成结束后，引擎通常会丢弃这些缓存。但我们不必在响应结束后丢弃它，而是可以将其存储起来，并打上标签以便再次查找。当下一次请求到来时，我们检查提示词的相同部分是否匹配我们已有的张量。如果匹配，我们就加载这些张量，从而跳过重复处理。

To get a sense of why this matters economically: let’s say it takes one second to process 2,000 tokens, and you have a system prompt of 10,000 tokens. That’s 5 seconds saved on every single LLM call, just by not recomputing that same start of the prompt through the model over and over again.
为了理解这在经济上的意义：假设处理 2,000 个 Token 需要 1 秒，而你的系统提示词有 10,000 个 Token。通过避免反复计算提示词的开头部分，每次 LLM 调用就能节省 5 秒钟。
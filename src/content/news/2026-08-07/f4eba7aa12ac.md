---
title: "I Built a Tool-Calling Agent in Python. Here’s How I Debugged It"
originalUrl: "https://towardsdatascience.com/i-built-a-tool-calling-agent-in-python-heres-how-i-debugged-it/"
date: "2026-08-07T01:16:04.955Z"
---

# I Built a Tool-Calling Agent in Python. Here’s How I Debugged It
# 我用 Python 构建了一个工具调用智能体，以下是我的调试方法

A minimal loop with real API calls, validation, compact outputs, and trace evidence before adding an agent framework.
在引入智能体框架之前，通过一个包含真实 API 调用、验证、精简输出和追踪证据的最小化循环来实现。

A transparent two-stage tool-calling system converts a Lagos map location into coordinates, validates them, retrieves a rain forecast, and records each step along an evidence trace.
一个透明的两阶段工具调用系统：将拉各斯的地图位置转换为坐标，进行验证，获取降雨预报，并记录证据追踪中的每一步。

A tool-calling agent is impressive when it works. But when it fails, the final answer is not enough. You need to see the function it chose, the arguments it sent, and the result your code returned.
当工具调用智能体正常工作时，它令人印象深刻。但当它失败时，仅看最终答案是不够的。你需要查看它选择的函数、发送的参数以及你的代码所返回的结果。

If you have built a small agent around a product API, a retrieval endpoint, a database lookup, a weather service, or a Model Context Protocol (MCP) tool, you have probably seen the same problem. The model says it checked something. Maybe it did. Maybe it sent malformed arguments. Maybe the API returned no result. Maybe the model request failed before your tool ran at all.
如果你曾围绕产品 API、检索端点、数据库查询、天气服务或模型上下文协议 (MCP) 工具构建过小型智能体，你可能遇到过同样的问题。模型声称它检查了某些内容。也许它确实做了，也许它发送了格式错误的参数，也许 API 没有返回结果，又或者在你的工具运行之前模型请求就已经失败了。

Without the message history, tool arguments, returned payload, and final answer in one place, you are trusting a story instead of inspecting a run.
如果没有将消息历史、工具参数、返回的负载和最终答案集中在一起，你就是在盲目信任一个“故事”，而不是在检查一次实际的运行过程。

OpenAI’s documentation lays out four steps: you describe a tool, the model requests it, you run the tool, and you return the result. That pattern is useful, but the first demo often skips the part that matters once an agent touches real work. Can you prove what the model requested, what Python executed, what failed validation, and whether the final answer used the returned data?
OpenAI 的文档列出了四个步骤：描述工具、模型请求工具、运行工具、返回结果。这种模式很有用，但最初的演示往往忽略了智能体在处理实际工作时最关键的部分。你能证明模型请求了什么、Python 执行了什么、什么验证失败了，以及最终答案是否真的使用了返回的数据吗？

This article is built around that debugging problem. The agent calls public APIs, validates tool arguments with JSON Schema, returns compact tool payloads, records each tool step, catches model request failures, and can write the same run to a Weights & Biases (W&B) Weave trace for review.
本文正是围绕这一调试问题展开的。该智能体调用公共 API，使用 JSON Schema 验证工具参数，返回精简的工具负载，记录每个工具步骤，捕获模型请求失败，并能将相同的运行过程写入 Weights & Biases (W&B) Weave 追踪以供审查。

JSON means JavaScript Object Notation. In this article, JSON Schema is the contract that tells Python which tool arguments are valid before any tool runs.
JSON 代表 JavaScript 对象表示法。在本文中，JSON Schema 是一份契约，它在任何工具运行之前告诉 Python 哪些工具参数是有效的。

The tutorial problem is simple: build an agent that can answer a weather question only by calling real tools, then make every step inspectable. Weather is standing in for the service-backed tasks developers usually give agents: check a package, retrieve a customer record, look up inventory, price an order, or call an internal API.
本教程的问题很简单：构建一个只能通过调用真实工具来回答天气问题的智能体，并使每一步都可检查。天气问题代表了开发者通常交给智能体的服务型任务：查询包裹、检索客户记录、查找库存、为订单定价或调用内部 API。

The useful question is whether the model-selected function call actually happened and returned usable data. The reader takeaway is direct: stop judging a tool-calling agent by the final answer alone. Judge it by the model request, schema validation, Python execution, compact tool result, error path, and final answer together.
真正有意义的问题是：模型选择的函数调用是否真的发生了，并返回了可用的数据。读者的核心收获很直接：不要仅仅通过最终答案来评判工具调用智能体。要结合模型请求、模式验证、Python 执行、精简的工具结果、错误路径和最终答案来综合评判。

The loop is worth building directly once before adopting a larger agent framework or wiring the same tools into MCP. Frameworks and MCP servers are useful when you have many tools, routing rules, state, retries, or team conventions. The point here is to understand the message flow before abstraction hides it.
在采用大型智能体框架或将相同的工具接入 MCP 之前，值得先亲手构建一次这个循环。当你拥有大量工具、路由规则、状态管理、重试机制或团队规范时，框架和 MCP 服务器非常有用。这里的重点是在抽象掩盖细节之前，先理解消息流。

By the end, you will have a script that can: define tools with JSON Schema for an OpenAI model, run a bounded tool calling loop, validate tool names and arguments before execution, keep tool outputs compact before returning them to the model, return a structured error if the model request itself fails, and capture run evidence in console output and Weave.
读完本文，你将拥有一个能够实现以下功能的脚本：为 OpenAI 模型定义 JSON Schema 工具、运行有界的工具调用循环、在执行前验证工具名称和参数、在返回给模型前保持工具输出的精简性、在模型请求本身失败时返回结构化错误，以及在控制台输出和 Weave 中捕获运行证据。

That is the article’s edge. You get a runnable message loop you can inspect, break, verify, and later replace or wrap with MCP or an agent framework from a position of understanding.
这就是本文的优势所在。你将获得一个可运行的消息循环，你可以对其进行检查、中断、验证，并在理解的基础上，稍后将其替换或封装进 MCP 或智能体框架中。

The useful review points are the model request, Python validation, Python execution, compact result shaping, final answer, and trace record. The run should answer four questions.
有用的审查点包括：模型请求、Python 验证、Python 执行、精简的结果塑造、最终答案和追踪记录。运行过程应回答四个问题。

A tool-calling agent may answer, “I checked the API,” but the useful questions start after that sentence: Which tool did the model request? What arguments did it send? What did Python return? Did the final answer use the returned data or hide a failure?
工具调用智能体可能会回答“我检查了 API”，但真正有用的问题从这句话之后才开始：模型请求了哪个工具？它发送了什么参数？Python 返回了什么？最终答案是使用了返回的数据，还是掩盖了失败？

The tutorial builds a small agent around those questions. The user asks whether to carry an umbrella in Lagos. The model has to request a city lookup, receive coordinates, request weather, receive a forecast, and answer from that returned data. Every step is printed and can be traced.
本教程围绕这些问题构建了一个小型智能体。用户询问在拉各斯是否需要带伞。模型必须请求城市查询、接收坐标、请求天气、接收预报，并根据返回的数据进行回答。每一步都会被打印出来并可被追踪。

If you can inspect this small loop, the same habit carries into more serious service-backed agents. A refund agent should show the order lookup, policy check, refund decision, and final message. A document agent should show the search query, retrieved passages, and answer. An MCP tool should still show the tool name, arguments, result, and error path.
如果你能检查这个小循环，同样的习惯也可以应用到更严肃的服务型智能体中。退款智能体应显示订单查询、政策检查、退款决定和最终消息。文档智能体应显示搜索查询、检索到的段落和答案。MCP 工具也应显示工具名称、参数、结果和错误路径。

### What a tool calling agent actually does
### 工具调用智能体实际上做了什么

A tool calling agent in Python is a loop driven by a large language model, or LLM. It lets the model request named functions, receive their results, and continue with updated messages. That sounds close to a chatbot, but the behavior is different.
Python 中的工具调用智能体是一个由大语言模型（LLM）驱动的循环。它允许模型请求命名函数、接收结果，并带着更新后的消息继续运行。这听起来很像聊天机器人，但行为逻辑不同。

A chatbot receives text and returns text. A tool calling agent receives text, may request action, waits for your application to execute that action, reads the tool result, and then decides what to say or do next.
聊天机器人接收文本并返回文本。工具调用智能体接收文本，可能会请求操作，等待你的应用程序执行该操作，读取工具结果，然后决定下一步说什么或做什么。

The important pieces are plain engineering objects:
重要的组成部分是简单的工程对象：
* The model decides whether it needs a tool.
* 模型决定是否需要工具。
* The tool is a Python function owned by your application.
* 工具是属于你应用程序的 Python 函数。
* The schema specifies the arguments the tool accepts.
* Schema 指定了工具接受的参数。
* The messages are the running record of the user request, model tool requests, tool results, and final answer.
* 消息是用户请求、模型工具请求、工具结果和最终答案的运行记录。
* The agent loop is your Python code that keeps the process running until the model stops requesting tools.
* 智能体循环是你的 Python 代码，它保持进程运行，直到模型停止请求工具。

A basic function call is one request and one result. An agent loop is the repeated version. The model can ask for one tool, read the result, ask for another tool, and keep going until it has enough context.
基本的函数调用是一次请求对应一次结果。智能体循环则是其重复版本。模型可以请求一个工具，读取结果，再请求另一个工具，并持续进行，直到拥有足够的上下文。

The weather example uses two tools:
天气示例使用了两个工具：
* `geocode_city`, which turns a city name into latitude, longitude, and country.
* `geocode_city`：将城市名称转换为纬度、经度和国家。
* `get_weather`, which turns latitude and longitude into a compact weather report.
* `get_weather`：将纬度和经度转换为精简的天气报告。

In a real application, those functions call external APIs. A package tool might call...
在实际应用中，这些函数会调用外部 API。包裹查询工具可能会调用……
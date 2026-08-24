---
title: "How to Give an LLM Agent a Browser"
originalUrl: "https://towardsdatascience.com/giving-an-llm-agent-a-browser/"
date: "2026-07-26T22:20:44.720Z"
---

# How to Give an LLM Agent a Browser
# 如何为 LLM Agent 配备浏览器

Building a browser-use agent with OpenAI Agents SDK and Playwright MCP.
使用 OpenAI Agents SDK 和 Playwright MCP 构建浏览器操作智能体。

A large amount of useful work still happens inside web interfaces. To resolve a ticket, the support team needs to use an admin console. An operations team relies on dashboards to keep track of alarms. Before speaking with a customer, a sales rep will probably check the CRM first. For LLM agents to become useful in these workflows, they need to work directly through the browser. In this post, we’ll build a browser-using agent with OpenAI Agents SDK and Playwright MCP. We’ll first look at the loop behind browser use, and then put it into practice through a concrete case study.

大量有价值的工作仍然在 Web 界面中进行。为了解决工单，支持团队需要使用管理控制台；运营团队依赖仪表板来跟踪警报；销售代表在与客户交谈前，通常会先查看 CRM 系统。为了让 LLM Agent 在这些工作流中发挥作用，它们需要能够直接通过浏览器进行操作。在本文中，我们将使用 OpenAI Agents SDK 和 Playwright MCP 构建一个浏览器操作智能体。我们将首先探讨浏览器操作背后的循环逻辑，然后通过一个具体的案例研究将其付诸实践。

### 1. The Mental Model
### 1. 心智模型

At a high level, a browser-using agent is best understood as an LLM placed in an interaction loop with a browser. The loop goes like this: the agent starts with a task and the browser’s current state. The agent then interprets that state, decides what to do next, and sends an action back to the browser. That action would produce a new browser state, which becomes the input for the next decision. This loop continues until the agent believes that the task is complete.

从宏观层面来看，浏览器操作智能体可以被理解为置于浏览器交互循环中的 LLM。该循环如下：智能体从一个任务和浏览器的当前状态开始；智能体解读该状态，决定下一步操作，并将指令发送回浏览器；该操作会产生一个新的浏览器状态，进而成为下一次决策的输入。这个循环会一直持续，直到智能体认为任务已完成。

To make the loop work, we need two connections between the agent and the browser:
1. An observation channel, so that the agent can receive the current browser state.
2. An action channel, so that the agent can interact with the browser.

为了使该循环正常工作，我们需要在智能体和浏览器之间建立两个连接：
1. 观察通道：以便智能体能够接收当前的浏览器状态。
2. 操作通道：以便智能体能够与浏览器进行交互。

For the observation channel, common choices include screenshots, structured page information (e.g., Document Object Model or accessibility tree), or a combination of both. For the action channel, the agent may use mouse and keyboard controls, or target specific page elements, or issue higher-level browser commands. The choices of observation and action are usually independent, but in practice, two pairings are commonly seen:
* screenshot + coordinate-based mouse and keyboard actions
* structured page state + element-targeted browser actions

对于观察通道，常见的选择包括截图、结构化页面信息（如 DOM 或辅助功能树），或两者的结合。对于操作通道，智能体可以使用鼠标和键盘控制，或者针对特定的页面元素进行操作，亦或是发出更高级别的浏览器指令。观察和操作的选择通常是独立的，但在实践中，有两种常见的组合：
* 截图 + 基于坐标的鼠标和键盘操作
* 结构化页面状态 + 针对元素的浏览器操作

The first pairing leans towards general computer use, which extends beyond the browser to other desktop applications. The second one is more specific to browser use, as it takes advantage of the structure already available inside a web page. In this post, we’ll focus on structured page observations together with element-targeted browser actions.

第一种组合倾向于通用的计算机操作，其范围不仅限于浏览器，还涵盖其他桌面应用程序。第二种组合则更专注于浏览器使用，因为它利用了网页内部现有的结构。在本文中，我们将重点介绍结构化页面观察与针对元素的浏览器操作。

### 2. Case Study: Resolving a Customer Support Request
### 2. 案例研究：解决客户支持请求

For our case study, we’ll build a browser-using agent that resolves a customer request through a web-based support console.

在我们的案例研究中，我们将构建一个浏览器操作智能体，通过基于 Web 的支持控制台来解决客户请求。

#### 2.1 Preparing the Support Console
#### 2.1 准备支持控制台

To create the browser environment, I vibe-coded a small customer support console. It’s a static web application built with plain HTML, CSS, and JavaScript. There is no application backend or database: all the data lives in the browser. We can serve the console locally with Python’s built-in HTTP server:

为了创建浏览器环境，我快速编写了一个小型客户支持控制台。这是一个使用纯 HTML、CSS 和 JavaScript 构建的静态 Web 应用程序。它没有后端或数据库：所有数据都存在于浏览器中。我们可以使用 Python 内置的 HTTP 服务器在本地运行该控制台：

```bash
cd toy_app
python -m http.server 8000 --bind 127.0.0.1
```

This makes the console available at http://127.0.0.1:8000, which we later pass to the agent as APP_URL.

这使得控制台可以通过 http://127.0.0.1:8000 访问，稍后我们将把它作为 APP_URL 传递给智能体。

#### 2.2 Defining the Browser-Using Agent
#### 2.2 定义浏览器操作智能体

Next, we configure the browser-using agent. For the tech stack, here we’ll use the OpenAI Agents SDK to power the agent runtime and Playwright MCP to connect the agent to the browser.

接下来，我们配置浏览器操作智能体。在技术栈方面，我们将使用 OpenAI Agents SDK 来驱动智能体运行时，并使用 Playwright MCP 将智能体连接到浏览器。

```python
# pip install openai-agents
from agents import Agent, ModelSettings
from openai.types.shared import Reasoning

agent = Agent(
    name="Support Console Browser Agent",
    model="gpt-5.4",
    model_settings=ModelSettings(
        reasoning=Reasoning(effort="medium"),
    ),
    instructions=AGENT_INSTRUCTIONS,
    mcp_servers=[playwright_server],
)
```

There are three pieces we need to unpack here, i.e., the LLM client, the agent instruction, and the browser tools.

这里我们需要拆解三个部分：LLM 客户端、智能体指令和浏览器工具。

What is Playwright MCP? Playwright is a browser automation library. It drives a real browser on your behalf and performs clicking, typing, navigating, and reading whatever’s on the page. MCP (Model Context Protocol) is a standard way to expose tools to an LLM, so an agent can call them directly. Playwright MCP is what you get when you put the two together, i.e., Playwright’s browser capabilities, exposed as tools an agent can pick up and use.

什么是 Playwright MCP？Playwright 是一个浏览器自动化库。它代表你驱动真实的浏览器，执行点击、输入、导航以及读取页面内容等操作。MCP（模型上下文协议）是一种向 LLM 暴露工具的标准方式，使智能体能够直接调用它们。Playwright MCP 就是将两者结合的产物，即 Playwright 的浏览器功能被封装为智能体可以直接获取和使用的工具。

What makes it interesting is how it shows the agent the page. Instead of a screenshot, Playwright MCP defaults to an accessibility snapshot, which is basically a structured read of what’s on the page. Interactive elements like links, buttons, and input fields each get a reference ID the agent can target directly. That’s exactly the structured observation and element-targeted action pairing we talked about earlier.

它有趣的地方在于它向智能体展示页面的方式。Playwright MCP 默认使用辅助功能快照（accessibility snapshot）而非截图，这本质上是对页面内容的结构化读取。链接、按钮和输入框等交互元素都会获得一个引用 ID，智能体可以直接针对这些 ID 进行操作。这正是我们之前提到的“结构化观察 + 针对元素的动作”组合。
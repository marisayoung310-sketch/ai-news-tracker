---
title: "Building a Streamlit UI for My LangGraph AI Agent"
originalUrl: "https://towardsdatascience.com/building-a-streamlit-ui-for-my-langgraph-ai-agent/"
date: "2026-08-09T22:00:14.908Z"
---

# Building a Streamlit UI for My LangGraph AI Agent
# 为我的 LangGraph AI 智能体构建 Streamlit 用户界面

Building a production-ready web interface for a stateful LangGraph agent.
为有状态的 LangGraph 智能体构建生产就绪的 Web 界面。

In my previous article, I walked through how I built a LangGraph-based AI agent to automate a 15-minute customer service booking session. The agent handles the entire booking process like a real customer service representative. It’s a LangGraph-based agent that orchestrates the following operations:
在上一篇文章中，我介绍了如何构建一个基于 LangGraph 的 AI 智能体，以自动化处理 15 分钟的客户服务预约会话。该智能体像真正的客服代表一样处理整个预约流程。这是一个基于 LangGraph 的智能体，负责协调以下操作：

*   Responds to customer queries and understands their needs.
*   Calculates the price for the service and informs the customer.
*   Handles the customer’s acceptance or rejection.
*   Proposes optimized time slots.
*   Confirms and records the appointment.
*   响应客户查询并理解其需求。
*   计算服务价格并告知客户。
*   处理客户的接受或拒绝。
*   推荐优化的时间段。
*   确认并记录预约。

In the first version of the agent, I did not focus much on the UI/UX part. I just built a Python CLI to test the functionality of the agent. The customer service agent ran entirely in the terminal. The CLI worked well for testing but it was not the best way to demonstrate a customer-facing booking experience.
在智能体的第一个版本中，我并没有过多关注 UI/UX 部分。我只是构建了一个 Python 命令行界面 (CLI) 来测试智能体的功能。该客服智能体完全在终端中运行。CLI 虽然非常适合测试，但并不是展示面向客户的预约体验的最佳方式。

The full source code of this project is available on GitHub at customer-service-agent. Feel free to clone the repo and test it yourself. In this article, we will build a clean, interactive Streamlit UI on top of the existing LangGraph agent.
该项目的完整源代码可在 GitHub 上的 customer-service-agent 获取。欢迎克隆仓库并自行测试。在本文中，我们将基于现有的 LangGraph 智能体构建一个简洁、交互式的 Streamlit 用户界面。

A quick note on the terminology: Throughout this article, I use agent and graph interchangeably. In LangGraph, the agent architecture is defined and executed as a compiled state graph object so they essentially mean the same thing in this article.
关于术语的简要说明：在本文中，我将“智能体 (agent)”和“图 (graph)”交替使用。在 LangGraph 中，智能体架构被定义并执行为一个已编译的状态图对象，因此在本文中它们本质上指代相同的事物。

### User interface for the agent
### 智能体的用户界面

In terms of implementation, Streamlit is not very different from a Python CLI. Both serve as a wrapper for the LangGraph agent. Streamlit is, of course, much more user friendly and looks more appealing. The CLI interface collected input, invoked the graph, and printed the response. The Streamlit page will do the same but it will also render structured information extracted from the graph state such as current booking details, price quote, and acceptance buttons. The architecture still lies in the same application. Streamlit only presents the state to the user and sends user actions back to the agent.
在实现方面，Streamlit 与 Python CLI 并没有太大区别。两者都充当 LangGraph 智能体的包装器。当然，Streamlit 对用户更友好，外观也更具吸引力。CLI 界面负责收集输入、调用图并打印响应。Streamlit 页面也将执行相同的操作，但它还会渲染从图状态中提取的结构化信息，例如当前的预约详情、报价和确认按钮。架构仍然位于同一个应用程序中。Streamlit 只是向用户呈现状态，并将用户的操作发送回智能体。

### Streamlit page
### Streamlit 页面

Since we’re using poetry for dependency management, we can install streamlit using: `poetry add streamlit`. This updates both `pyproject.toml` and `poetry.lock` files. Then we create a new file `streamlit_app.py`. We start by importing the graph builder, models, and observability utilities.
由于我们使用 poetry 进行依赖管理，我们可以使用 `poetry add streamlit` 来安装 streamlit。这会同时更新 `pyproject.toml` 和 `poetry.lock` 文件。然后我们创建一个新文件 `streamlit_app.py`。我们首先导入图构建器、模型和可观测性工具。

```python
from __future__ import annotations
import os
from datetime import datetime
from typing import Any
from uuid import uuid4
import streamlit as st
from dotenv import load_dotenv
from langchain_core.messages import AIMessage, HumanMessage
from langchain_openai import ChatOpenAI
from customer_service_agent.graph import build_graph
from customer_service_agent.models import (
    AgentState, BookingDetails, TimeOption,
)
from customer_service_agent.observability import (
    create_langfuse_handler, flush_langfuse, graph_config,
)
```

The agent graph does not include any Streamlit-specific logic. This separation is important because it allows us to run the graph from a CLI, an API, WhatsApp, or another frontend later. The graph expects an Agent State to be initialized (`graph = StateGraph(AgentState)`) so we add the following in `streamlit_app.py`:
智能体图不包含任何特定于 Streamlit 的逻辑。这种分离非常重要，因为它允许我们稍后通过 CLI、API、WhatsApp 或其他前端运行该图。该图需要初始化一个 Agent State (`graph = StateGraph(AgentState)`)，因此我们在 `streamlit_app.py` 中添加以下内容：

```python
INITIAL_STATE: AgentState = {
    "messages": [],
    "booking_details": BookingDetails(),
    "calculated_price": None,
    "time_options": [],
    "selected_slot": None,
    "status": "gathering_info",
}
```

After the first turn (i.e. first customer message), LangGraph’s checkpointer retains the state. Streamlit reruns the entire Python script whenever user interacts with a widget (e.g. sends a chat message, clicks a button, selects an appointment) so we cannot use local variables. To preserve the conversation across Streamlit runs, we need to use `session_state`. We can initialize the session as follows:
在第一轮（即第一条客户消息）之后，LangGraph 的检查点 (checkpointer) 会保留状态。每当用户与小部件交互（例如发送聊天消息、点击按钮、选择预约）时，Streamlit 都会重新运行整个 Python 脚本，因此我们不能使用局部变量。为了在 Streamlit 的多次运行中保留对话，我们需要使用 `session_state`。我们可以按如下方式初始化会话：

```python
def initialize_session() -> None:
    if "graph" in st.session_state:
        return
    llm = ChatOpenAI(
        model=os.getenv("OPENAI_MODEL", "gpt-4o-mini"),
        temperature=0,
    )
    handler = create_langfuse_handler()
    st.session_state.graph = build_graph(llm)
    st.session_state.handler = handler
    st.session_state.config = graph_config(
        str(uuid4()), handler,
    )
    st.session_state.agent_state = INITIAL_STATE.copy()
    st.session_state.started = False
```

The function first checks if the graph has already been created for this browser session (if "graph" in st.session_state). Without this check, every Streamlit rerun would replace the graph. The `graph_config` function generates a UUID to be used as `thread_id`, which is required by LangGraph to identify a conversation. If a new UUID were generated on every Streamlit rerun, LangGraph would see every message as belonging to a new conversation. We also have the Langfuse tracing integration inside this function. The handler is saved so that the subsequent graph calls can use the same tracing configuration.
该函数首先检查是否已为当前浏览器会话创建了图（if "graph" in st.session_state）。如果没有此检查，每次 Streamlit 重新运行都会替换该图。`graph_config` 函数生成一个 UUID 用作 `thread_id`，这是 LangGraph 识别对话所必需的。如果每次 Streamlit 重新运行都生成一个新的 UUID，LangGraph 会将每条消息视为属于一个新的对话。我们还在该函数中集成了 Langfuse 追踪功能。处理程序 (handler) 被保存下来，以便后续的图调用可以使用相同的追踪配置。

Then, we have the `_invoke` function for handling user input.
接下来，我们有用于处理用户输入的 `_invoke` 函数。

```python
def _invoke(customer_text: str) -> None:
    """Submit one customer turn to the graph and retain its latest state."""
    graph_input: dict[str, Any] = {"messages": [HumanMessage(content=customer_text)]}
    if not st.session_state.started:
        graph_input.update(INITIAL_STATE)
        graph_input["messages"] = [HumanMessage(content=customer_text)]
        st.session_state.started = True
    try:
        result = st.session_state.graph.invoke(graph_input, config=st.session_state.config)
        st.session_state.agent_state = result
        flush_langfuse(st.session_state.handler)
    except Exception:
        st.session_state.started = bool(st.session_state.agent_state.get("messages"))
        st.error("The assistant could not process that request. Please try again.")
```

This function sends the customer action to the LangGraph agent and saves the resulting state for the Streamlit interface. The customer action can be a chat input or a button click (e.g. “Accept quote”). The customer’s message is converted into a LangChain `HumanMessage`.
此函数将客户操作发送给 LangGraph 智能体，并为 Streamlit 界面保存结果状态。客户操作可以是聊天输入或按钮点击（例如“接受报价”）。客户的消息被转换为 LangChain 的 `HumanMessage`。
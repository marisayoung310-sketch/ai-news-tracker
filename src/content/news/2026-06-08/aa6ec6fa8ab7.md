---
title: "Building a Multi-Agent System in Python"
originalUrl: "https://towardsdatascience.com/building-a-multi-agent-system-in-python/"
date: "2026-06-07T22:47:14.716Z"
---

# Building a Multi-Agent System in Python
# 使用 Python 构建多智能体系统

AI Agents are the talk of the town. We see them everywhere, even being used for the simplest of tasks on our phones. They are convenient, fast, and pretty much reliable, and help us navigate day-to-day life. If you want an easy explanation of a scientific concept, you ask ChatGPT. You want a guide for your picky toddler’s diet plan, so you ask AI. Even the task of planning your complete travel tour can be delegated to AI. And, this is exactly what we are going to do in this tutorial (stay tuned!).

AI 智能体（AI Agents）目前正处于风口浪尖。我们随处可见它们的身影，甚至在手机上处理最简单的任务时也会用到它们。它们便捷、快速且相当可靠，帮助我们应对日常生活。如果你想用简单的方式理解一个科学概念，你会问 ChatGPT；如果你需要为挑食的幼儿制定饮食计划，你会求助于 AI；甚至连规划完整的旅行行程，也可以委托给 AI 来完成。而这正是我们在本教程中要实现的目标（敬请期待！）。

We know about AI Agents, but what if we can build and use different AI Agents for different roles in a bigger project? This is where the multi-agent system concept comes into play. As AI applications become more advanced, we are moving from single AI models that answer simple questions and do straightforward tasks to systems where multiple AI agents work together to solve complex problems. A Multi-Agent System (MAS) is a concept where multiple AI agents collaborate with each other to fulfill a bigger goal. Each of these has a specific role leading to the ultimate goal, and they accomplish it with mutual collaboration.

我们已经了解了 AI 智能体，但如果我们能在更大的项目中构建并使用不同的 AI 智能体来担任不同角色，会怎样呢？这就是多智能体系统（Multi-Agent System, MAS）概念发挥作用的地方。随着 AI 应用的日益先进，我们正从回答简单问题和执行直接任务的单一 AI 模型，转向多个 AI 智能体协同工作以解决复杂问题的系统。多智能体系统是一个由多个 AI 智能体相互协作以实现更大目标的概念。其中每个智能体都有特定的角色，共同指向最终目标，并通过相互协作来完成任务。

### A Multi-Agent Travel Planning System
### 多智能体旅行规划系统

In this project, we will be building a Multi-Agent Travel Planning System. So basically, what we will have is that instead of just one AI Agent who will plan our travels, we will have a team of AI agents, each with one specific role, and they will work with one another to make the perfect travel plan for us! We can think of a Multi-Agent Travel Planning System like a real travel agency. Instead of a single person handling everything, different experts will be handling different tasks as per their expertise and work together.

在这个项目中，我们将构建一个多智能体旅行规划系统。简单来说，我们不再只依赖一个 AI 智能体来规划行程，而是拥有一支 AI 智能体团队，每个智能体都有特定的角色，它们将相互配合，为我们制定完美的旅行计划！我们可以把多智能体旅行规划系统想象成一家真正的旅行社：不再由一个人处理所有事情，而是由不同的专家根据各自的专业领域处理不同的任务，并协同工作。

For our AI Travel Planner, we will have the following agents:
对于我们的 AI 旅行规划器，我们将拥有以下智能体：

*   **Travel Research Agent:** This agent will perform the research tasks. It will explore the destination where the client wants to go and find attractions, hidden places, local experiences, travel tips, etc. It will collect the basic information needed to plan the trip.
    **旅行研究智能体：** 该智能体负责执行研究任务。它将探索客户想要前往的目的地，寻找景点、隐藏的地点、当地体验、旅行小贴士等，并收集规划行程所需的基本信息。
*   **Activity Planning Agent:** This agent will plan activities based on the research of the Research Agent. It will be the one to decide which place to visit, when to visit, what activities to do, and how to organize the whole trip!
    **活动规划智能体：** 该智能体根据研究智能体的调研结果来规划活动。它负责决定去哪里参观、何时参观、进行什么活动，以及如何组织整个行程！
*   **Budget Agent:** This agent is responsible for proper budgeting. It will analyze the plan shared by the Activity Planning Agent and share the expected costs, affordable options, money-saving tips, and help customize the trip to the client’s budget.
    **预算智能体：** 该智能体负责合理的预算编制。它将分析活动规划智能体分享的计划，并提供预期费用、经济实惠的选择、省钱技巧，并帮助根据客户的预算定制行程。
*   **Final Travel Assistant:** Lastly, the final travel assistant will combine the output from all three agents: the research, activities plan, and budget, and create a simple personalized travel itinerary!
    **最终旅行助理：** 最后，最终旅行助理将整合来自上述三个智能体的输出（研究、活动计划和预算），并创建一个简洁的个性化旅行行程单！

### Creating the Agent Class
### 创建智能体类

Now comes the part of coding the AI agents. Since we are not creating just one or two agents, we will not be directly coding. Rather, we will use the concept of OOP, and create a class (or a blueprint in easy words) of the agent category, and then use this blueprint to create each individual agent ahead. The agent will store the name which identifies the agent, and the role, that tells AI how the agent should behave. Additionally, we will also create a function run that will give our AI agents the ability to work, that is, to send tasks to the AI model.

现在进入编写 AI 智能体代码的部分。由于我们不仅仅是创建一两个智能体，我们不会直接编写代码。相反，我们将使用面向对象编程（OOP）的概念，创建一个智能体类（简单来说就是蓝图），然后使用这个蓝图来创建后续的每一个独立智能体。智能体将存储用于标识其身份的名称，以及告诉 AI 该如何表现的角色描述。此外，我们还将创建一个 `run` 函数，赋予 AI 智能体工作能力，即向 AI 模型发送任务。

```python
class Agent:
    def __init__(self, name, role):
        self.name = name
        self.role = role

    def run(self, task):
        print(f"{self.name} is working...")
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=
```
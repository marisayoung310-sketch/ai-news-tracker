---
title: "Why I Stopped Using One Agent and Built a Multi-Agent Pipeline Instead"
originalUrl: "https://towardsdatascience.com/why-i-stopped-using-one-agent-and-built-a-multi-agent-pipeline-instead/"
date: "2026-06-24T22:53:11.287Z"
---

# Why I Stopped Using One Agent and Built a Multi-Agent Pipeline Instead
# 为什么我放弃了单智能体，转而构建多智能体流水线

**Agentic AI: Why I Stopped Using One Agent and Built a Multi-Agent Pipeline Instead**
**智能体 AI：为什么我放弃了单智能体，转而构建多智能体流水线**

A practical walkthrough using text-to-SQL as the example.
以 Text-to-SQL 为例的实战演练。

Priyansh Bhardwaj | Jun 24, 2026 | 13 min read
Priyansh Bhardwaj | 2026年6月24日 | 阅读时长 13 分钟

---

Last semester we developed a text-to-SQL application. It was a simple one-agent architecture that takes a user query in natural language and after passing the validations checkpoint it generates a SQL query for it. After completing the development we started testing it and realised that one agent architecture was not enough for our application. It worked for simple queries where only 1 or 2 operations were required but it started failing when the user started asking complex queries, including multiple operations and schema scans.

上学期，我们开发了一个 Text-to-SQL 应用程序。它采用简单的单智能体架构，接收用户的自然语言查询，在通过验证检查点后生成相应的 SQL 查询。开发完成后，我们开始进行测试，结果发现单智能体架构无法满足我们的应用需求。对于仅需 1 到 2 个操作的简单查询，它表现良好；但当用户提出包含多个操作和模式扫描的复杂查询时，它就开始出错。

After thorough testing of the application we realised that a single agent couldn’t perform every task. The agent was trying to parse the intent, map it to a schema, generate a valid SQL, and validate its own output all in one go. By the third retry, the context was so bloated with failed attempts and self-corrections that the agent started contradicting itself. After that we decided to revisit our architecture and implemented multi-agent system with specialised agents for every task instead of relying on just one agent to do everything.

经过详尽的测试，我们意识到单个智能体无法胜任所有任务。该智能体试图一次性完成意图解析、模式映射、生成有效 SQL 以及验证自身输出等所有工作。到了第三次重试时，上下文因充斥着失败的尝试和自我修正而变得臃肿，导致智能体开始自相矛盾。此后，我们决定重新审视架构，并实现了多智能体系统，为每项任务分配专门的智能体，而不是依赖单一智能体完成所有工作。

---

### Why a Single Agent Struggles
### 为什么单智能体难以胜任

There’s an assumption when you first start building with LLMs that if the model is capable enough, a good prompt can do everything. This is achievable for simpler tasks but as the task grows in complexity you’re not just asking the model to think harder, you’re asking it to hold multiple competing mental models in a single context window simultaneously.

刚开始使用大语言模型（LLM）构建应用时，人们往往会有一个假设：只要模型足够强大，一个好的提示词（Prompt）就能解决所有问题。对于简单任务，这确实可行；但随着任务复杂度的增加，你不仅是在要求模型进行更深度的思考，更是在要求它在同一个上下文窗口中同时处理多个相互竞争的思维模型。

Take the text-to-SQL problem as an example. To turn a natural language question into a correct SQL query, you need to:
1. Parse what the user actually wants (intent decomposition)
2. Map those intents against the real schema (schema awareness)
3. Write syntactically correct SQL (query generation)
4. Verify the output SQL (validation)

以 Text-to-SQL 问题为例。要将自然语言问题转化为正确的 SQL 查询，你需要：
1. 解析用户的真实需求（意图分解）
2. 将这些意图映射到实际的数据库模式（模式感知）
3. 编写语法正确的 SQL（查询生成）
4. 验证输出的 SQL（验证）

A single agent trying to do all four will do each of them with mediocrity but none of them well. The failures are very basic, like a join condition that’s almost right but wrong for the user’s context, a filter that ignores a time constraint, or an aggregate that looks correct until you check the edge cases and it fails. Every failed attempt stays in memory. The model sees what it tried before and makes increasingly small adjustments, rather than stepping back and rethinking. After three retries you’re not getting a fresh attempt but a revision of a bad first draft.

试图同时完成这四项工作的单一智能体，往往每项都做得平庸，没有一项能做到极致。失败的表现非常基础，例如连接条件（join condition）看似正确但与用户上下文不符、过滤器忽略了时间限制，或者聚合操作在检查边界情况前看起来正确，但一测试就失败。每一次失败的尝试都会留在内存中。模型会看到之前的尝试，并进行越来越微小的调整，而不是退后一步重新思考。经过三次重试后，你得到的不是一次全新的尝试，而是一份糟糕初稿的修订版。

---

### What Multi-Agent Actually Means
### 什么是真正的多智能体

A multi-agent system is a collection of agents, each with a specific responsibility, coordinated by an orchestrator that manages the flow between them. Instead of one agent doing everything with mediocre results, you have several agents that each specialised in one thing.

多智能体系统是一组智能体的集合，每个智能体承担特定的职责，并由一个协调器（Orchestrator）管理它们之间的流程。与其让一个智能体平庸地完成所有工作，不如拥有多个各司其职的专业智能体。

In practice, there are two ways to create a multi-agent system. The first is sequential, where agents run one after another, each receiving the output of the previous one as its input. The second is parallel, where agents run simultaneously on independent sub-tasks and their outputs are merged by an aggregator. Most real systems use both.

在实践中，构建多智能体系统有两种方式。第一种是顺序式，智能体依次运行，每个智能体接收前一个智能体的输出作为输入。第二种是并行式，智能体同时运行处理独立的子任务，其输出由聚合器合并。大多数实际系统会结合使用这两种方式。

---

### Designing the Agents
### 设计智能体

For a text-to-SQL system, the agent breakdown maps directly to the failure modes we saw with a single agent. We asked it a question for “extracting the top customers in each category and compare their purchase trend against the category average over the last 12 months,” and it helped us to scope every agent in our system.

对于 Text-to-SQL 系统，智能体的拆分直接对应了我们在单智能体中观察到的失败模式。我们向系统提出了一个问题：“提取每个类别中表现最好的客户，并将他们的购买趋势与过去 12 个月的类别平均水平进行比较”，这帮助我们界定了系统中每个智能体的职责范围。

**The Intent Parser Agent** takes the raw user question and decomposes it into discrete intents. The question about top customers contains at least three intents: rank customers by category, compute their purchase trend, and compare that trend against a category-level baseline. A single agent doing this inline tends to partially decompose and then generate SQL for an incomplete interpretation. This agent’s only job is decomposing the user’s query into different intents.

**意图解析智能体（Intent Parser Agent）**：接收原始用户问题并将其分解为离散的意图。关于“表现最好的客户”的问题至少包含三个意图：按类别对客户进行排名、计算他们的购买趋势，并将该趋势与类别基准进行比较。单一智能体在处理时往往只能部分分解，从而生成基于不完整理解的 SQL。该智能体的唯一任务就是将用户查询分解为不同的意图。

**The Schema Agent** receives the decomposed intents and maps them to actual table names, column names, join conditions, and data types from your database schema. This is where a single agents system fails because without explicit schema grounding, the agent invents column names that look plausible but don’t exist. For example `customer_purchase_value` sounds like a real column in the customer transaction database but this column doesn’t exist in our database. Keeping this as a separate agent with the schema injected directly in...

**模式智能体（Schema Agent）**：接收分解后的意图，并将它们映射到数据库模式中的实际表名、列名、连接条件和数据类型。这是单智能体系统失败的地方，因为如果没有明确的模式基础（Schema Grounding），智能体会编造出看起来合理但实际不存在的列名。例如，`customer_purchase_value` 听起来像是客户交易数据库中的真实列，但我们的数据库中并不存在。将其作为一个独立的智能体，并将模式直接注入其中……
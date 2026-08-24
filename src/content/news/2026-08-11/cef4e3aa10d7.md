---
title: "Building an Agent-Ready Data Warehouse: What Traditional Architectures Do Wrong"
originalUrl: "https://towardsdatascience.com/building-an-agent-ready-data-warehouse-what-traditional-architectures-do-wrong/"
date: "2026-08-10T22:11:12.038Z"
---

# Building an Agent-Ready Data Warehouse: What Traditional Architectures Do Wrong
# 构建“智能体就绪”的数据仓库：传统架构的误区

Giving an AI agent access to a data warehouse doesn't automatically make it agent-ready. The real challenge lies in teaching the agent what the data means and when it's reliable enough to use.
仅仅让 AI 智能体（Agent）访问数据仓库，并不意味着它就具备了“智能体就绪”的能力。真正的挑战在于如何教会智能体理解数据的含义，以及判断数据在何时才足够可靠，可以被采纳使用。

Most enterprise data warehouses were designed for a human checkpoint. Engineers prepared the data, analysts formulated queries, dashboards displayed approved metrics, and then executives decided on the next steps. AI agents weaken this checkpoint. A data agent can check metadata, select data sources, write SQL, and use the results to recommend next steps. Some systems can also call tools that trigger a workflow or modify a campaign. The data warehouse thus becomes part of a system that can act based on query results.
大多数企业数据仓库的设计初衷是服务于“人工检查点”。工程师准备数据，分析师编写查询，仪表盘展示经核准的指标，最后由高管决定后续行动。AI 智能体削弱了这一检查点。数据智能体可以检查元数据、选择数据源、编写 SQL，并利用查询结果推荐后续步骤。一些系统甚至可以调用工具来触发工作流或修改营销活动。因此，数据仓库成为了一个能够根据查询结果采取行动的系统的一部分。

This is precisely where a problem arises that many older data warehouse architectures are not designed to address. An agent can generate valid SQL and correctly calculate the requested metric. However, it might still recommend the wrong action because, while the warehouse provides the data, it doesn’t provide the business rules that tell the agent how to use that data or metric.
这正是许多旧版数据仓库架构无法解决的问题所在。智能体可以生成有效的 SQL 并正确计算出所需的指标，但它仍可能给出错误的建议。因为虽然仓库提供了数据，却并未提供告诉智能体如何使用这些数据或指标的业务规则。

### A Queryable Warehouse Is Not Automatically Agent-Ready
### 可查询的仓库并不等同于“智能体就绪”

At first glance, a sophisticated cloud data warehouse might appear AI-ready. The data is centrally located, pipelines are monitored, permissions are configured, and tables have descriptions. Such measures facilitate access. However, they don’t guarantee that the agent will read the data the way the business intends. A schema can tell an agent that campaign costs are a numerical value. But it doesn’t explain whether agency fees are included, currencies have been standardized, or refunds have already been deducted. Nor does it show whether the latest conversion data has been fully processed.
乍一看，先进的云数据仓库似乎已经为 AI 做好了准备。数据集中存储、流水线受到监控、权限配置完善，且表结构有详细描述。这些措施确实方便了访问，但它们无法保证智能体会按照业务意图去解读数据。模式（Schema）可以告诉智能体“营销成本”是一个数值，但它无法解释其中是否包含了代理费、货币是否已标准化、退款是否已扣除，也无法显示最新的转化数据是否已处理完毕。

Current BigQuery data agents rely on selected knowledge sources and metadata, as well as use-case-specific instructions for query processing. They don’t rely solely on table names. Natural language analytics requires written rules for how the business defines each metric. In data infrastructure projects, I’ve often seen metric definitions embedded partly in the transformation logic and partly in dashboard formulas. Other rules exist only in documents or in the minds of analysts. That arrangement becomes fragile when software has to decide what the numbers mean without an analyst.
当前的 BigQuery 数据智能体依赖于选定的知识源、元数据以及针对特定用例的查询处理指令，它们并不单纯依赖表名。自然语言分析需要明确的规则来定义业务中的每一个指标。在数据基础设施项目中，我经常看到指标定义一部分嵌入在转换逻辑中，另一部分隐藏在仪表盘公式里，还有些规则仅存在于文档或分析师的脑海中。当软件必须在没有分析师参与的情况下自行判断数字含义时，这种安排就显得非常脆弱。

### When Correct SQL Produces the Wrong Decision
### 当正确的 SQL 导致错误的决策

Consider a composite scenario based on patterns I have encountered in multi-source campaign analytics. A company aggregates platform data on ad spend, clicks, conversions, and attributed revenue. The reporting layer normalizes currencies, considers attribution windows and exclusion rules, and tracks delayed conversions. The company asks an analytics agent which campaigns should be paused today to protect ROAS. The agent selects tables whose names match the query and generates valid SQL. It calculates the metric correctly and then ranks the lowest-performing campaigns.
考虑一个基于我在多源营销分析中遇到的模式所构建的综合场景。一家公司汇总了各平台的广告支出、点击量、转化率和归因收入数据。报告层会对货币进行标准化处理，考虑归因窗口和排除规则，并追踪延迟的转化。公司询问分析智能体：“为了保护 ROAS（广告支出回报率），今天应该暂停哪些营销活动？”智能体选择了名称与查询匹配的表，并生成了有效的 SQL。它正确计算了指标，并对表现最差的活动进行了排名。

The query is executed and returns a result, but the recommendation remains incorrect. On one platform, the conversions haven’t fully loaded yet. Another shows revenue before cancellations are accounted for. A third uses a different time zone for reporting. The dashboard the company uses for reporting handles these differences, but the agent chooses raw source tables because their names match the question more closely. None of this is a hallucination. The warehouse made the tables queryable, but not the underlying rules.
查询执行并返回了结果，但建议却是错误的。在某个平台上，转化数据尚未完全加载；另一个平台显示的收入未扣除取消订单的部分；第三个平台则使用了不同的时区进行报告。公司用于报告的仪表盘处理了这些差异，但智能体却选择了原始源表，因为它们的名称与问题匹配度更高。这并非“幻觉”，而是因为仓库虽然让表变得“可查询”，却没能让底层的业务规则变得“可查询”。

### Traditional Governance Solves Only Part of the Problem
### 传统治理只能解决部分问题

Traditional governance asks who is allowed to query a table or view a sensitive column. With agents, another question arises: Even if the agent has access to the data, is that data suitable as a basis for decision-making? Table descriptions rarely define valid relationships or authoritative metrics. They also typically lack the granularity of the dataset, expectations regarding recency, mandatory filters, and known limitations.
传统治理关注的是谁有权查询表或查看敏感列。而对于智能体，另一个问题出现了：即使智能体有权访问数据，这些数据适合作为决策依据吗？表描述很少定义有效的关系或权威指标。它们通常也缺乏关于数据集粒度、时效性预期、强制过滤器以及已知局限性的说明。

A semantic layer can make these rules explicit. Semantic views in Snowflake, for example, define business entities over physical data, including facts, metrics, dimensions, and relationships. The underlying principle is vendor-neutral: An agent should query a governed business model rather than reconstructing it from raw schemas. An analyst might notice if the granularity doesn’t match. An agent can transform that same error into a plausible explanation.
语义层（Semantic Layer）可以将这些规则显性化。例如，Snowflake 中的语义视图在物理数据之上定义了业务实体，包括事实、指标、维度和关系。其核心原则与供应商无关：智能体应该查询受治理的业务模型，而不是从原始模式中自行重构。分析师可能会注意到粒度不匹配的问题，但智能体却可能将同样的错误转化为一个看似合理的解释。

### A Fresh Table Can Still Be Incomplete
### 最新的表也可能是不完整的

Pipeline monitoring often treats recency as a technical status. The job is complete. The table has been updated. However, a current table can still be unsuitable for decision-making. Campaign costs might be available within minutes, while conversions are only reliable after several hours. A financial table might be sufficient for reporting, even though it’s not yet reliable enough for an automated pricing recommendation. An agent-enabled data warehouse must demonstrate whether the data required for a decision is complete, not just when the table was last updated.
流水线监控通常将“时效性”视为一种技术状态：任务已完成，表已更新。然而，一张“最新”的表可能仍不适合决策。营销成本可能在几分钟内就能获取，但转化数据可能需要几个小时才可靠。财务表可能足以用于报告，但对于自动定价建议来说可能还不够稳健。一个支持智能体的数据仓库必须能够证明决策所需的数据是否完整，而不仅仅是显示表最后更新的时间。

### The Missing Layer Is a Decision Contract
### 缺失的层级是“决策契约”

I consider the missing architecture layer to be a decision contract. A data contract defines what a producer must deliver. A decision contract specifies how an automated system may use this data for a particular class of decisions. For a campaign budget recommendation, the contract would specify the approved data source, the minimum historical time frame, and the definition of the metric. It would also specify how old the data may be, which completeness...
我认为缺失的架构层级是“决策契约”（Decision Contract）。数据契约定义了生产者必须交付什么，而决策契约则规定了自动化系统如何将这些数据用于特定类别的决策。对于营销预算建议，契约会明确批准的数据源、最小历史时间范围以及指标的定义。它还会规定数据的时效性要求、完整性要求等。
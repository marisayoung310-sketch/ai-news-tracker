---
title: "Guarding the till while autonomous data agents do the digging"
originalUrl: "https://dev.to/gde/guarding-the-till-while-autonomous-data-agents-do-the-digging-3nmi"
date: "2026-07-09T22:53:31.167Z"
---

# Guarding the till while autonomous data agents do the digging
# 在自主数据智能体进行挖掘时守好钱袋子

Autonomous agents are genuinely good at answering messy business questions. Give one an LLM and a set of tools, and it can query a database, dig through files, and build a chart to investigate why a metric moved. No fixed script required.
自主智能体在回答复杂的业务问题方面确实表现出色。给它一个大语言模型（LLM）和一套工具，它就能查询数据库、翻阅文件并生成图表，以调查指标波动的原因，无需任何固定的脚本。

The problem is what happens when nobody’s watching the meter. If a question is simple, you don’t need an agent. You write one SQL query and you’re done. But most real analytical questions aren’t simple. They’re ambiguous, open ended, and take a few rounds of trial and error before they resolve.
问题在于，当没人盯着“计价器”时会发生什么。如果问题很简单，你根本不需要智能体，写一条 SQL 查询就搞定了。但大多数真实的分析问题并不简单。它们模糊、开放，且需要经过几轮试错才能得出结论。

An agent handles that the way a human analyst would if you turned them loose on a data warehouse with no supervision. It tries a query, gets a weird result, tries a different angle, hits a dead end, and tries again. On a warehouse the size of BigQuery, that trial-and-error loop gets expensive fast. Add in the token costs of a long-context LLM reasoning through fifteen turns, and a single agent run can blow past your budget before anyone notices.
智能体的处理方式就像是一个在没有任何监督的情况下被放进数据仓库的人类分析师。它尝试一个查询，得到奇怪的结果，换个角度再试，遇到死胡同，然后再试。在像 BigQuery 这样规模的仓库中，这种试错循环会迅速变得昂贵。再加上长上下文 LLM 在十五轮推理中产生的 Token 成本，单次智能体运行可能在任何人察觉之前就耗尽了你的预算。

In this post, I’ll walk through how I built a cost-safe version of this kind of agent, using the Google Antigravity SDK and the Data Agent Kit (DAK) extension. Two guardrails do the work. A BigQuery scan cost guardrail. It dry-runs every query before it executes and blocks anything that would scan too much data. An LLM token spend guardrail. It pauses the agent for human approval once a session crosses a token budget.
在这篇文章中，我将介绍如何使用 Google Antigravity SDK 和 Data Agent Kit (DAK) 扩展构建一个具有成本安全保障的智能体。主要依靠两道防线：一是 BigQuery 扫描成本防护栏，它会在执行前对每条查询进行预运行（dry-run），并拦截任何扫描数据量过大的查询；二是 LLM Token 消耗防护栏，一旦会话超过 Token 预算，它会暂停智能体并等待人工审批。

### Why autonomous analysis runs amok at scale
### 为什么自主分析在规模化时会失控

To see why this matters, it helps to look at how BigQuery bills, how agents actually reason, and where the two collide.
要理解这一点的重要性，我们需要看看 BigQuery 是如何计费的、智能体是如何推理的，以及这两者在何处发生冲突。

#### The columnar trap
#### 列式存储的陷阱

A lot of people assume that adding a LIMIT 10 or a WHERE clause keeps a query cheap. In a columnar database like BigQuery, that assumption will bite you. BigQuery charges by the bytes it reads from the columns you reference, across the whole table, not the rows you end up seeing. Run something like `SELECT body FROM comments WHERE body LIKE '%pandas%'` and it scans the entire body column for every row before it even gets to filtering.
许多人认为添加 `LIMIT 10` 或 `WHERE` 子句可以降低查询成本。但在像 BigQuery 这样的列式数据库中，这种假设会让你吃亏。BigQuery 是根据你引用的列所读取的字节数来收费的，它是针对整张表，而不是你最终看到的行数。运行类似 `SELECT body FROM comments WHERE body LIKE '%pandas%'` 的查询时，它会在过滤之前扫描每一行的整个 `body` 列。

There's no row-level index to jump to matching rows, so evaluating that filter means reading every value in the column first. The LIMIT clause runs after that scan is already paid for, so it doesn't save you anything. The only real lever is filtering on a partitioned column, which restricts the query to specific physical blocks like a date range, or a clustered column, which prunes blocks based on sorted keys.
由于没有行级索引可以直接跳转到匹配行，因此评估该过滤器意味着必须先读取列中的每个值。`LIMIT` 子句是在扫描付费完成后才运行的，所以它无法为你节省任何费用。唯一有效的手段是在分区列上进行过滤（将查询限制在特定的物理块，如日期范围），或者使用聚簇列（根据排序键修剪数据块）。

#### Why agentic exploration is so inefficient
#### 为什么智能体探索如此低效

A human analyst scopes a query carefully before running it. An agent doesn’t work that way. It loops. For an open-ended problem, the path usually looks like this. It runs a few queries to discover table structures and columns. It tries different combinations of joins, filters, and aggregations to test its hypotheses, and when it hits an empty result or a syntax error, it rewrites and tries again. It runs heavy string scans, `LIKE '%error%'` across a text column, to pull out logs or comments. And when it needs to merge sources, it runs wide multi-key joins that shuffle data across worker slots.
人类分析师在运行查询前会仔细评估范围，但智能体不是这样工作的。它会循环。对于一个开放性问题，其路径通常是这样的：它运行几次查询来发现表结构和列；它尝试不同的连接、过滤和聚合组合来验证假设；当遇到空结果或语法错误时，它会重写并再次尝试。它会运行繁重的字符串扫描（如在文本列上使用 `LIKE '%error%'`）来提取日志或评论。当需要合并数据源时，它会运行大规模的多键连接，这会在工作节点之间进行数据重排（shuffle）。

Here’s where it gets real. In a production environment with tables in the hundreds of terabytes, a single on-demand query scanning 100 TB of one column costs $625 at standard $6.25/TB pricing. Stack a few window functions and nested joins on top and you’re triggering shuffle operations that move gigabytes between worker slots. If you’re on capacity-based billing instead of on-demand, those same queries burn through slot-hours and degrade everyone else’s performance.
这就是问题的关键所在。在拥有数百 TB 表的生产环境中，单次按需查询扫描 100 TB 的单列数据，按标准的 $6.25/TB 定价计算，成本高达 $625。如果再加上几个窗口函数和嵌套连接，你就会触发在工作节点之间移动数 GB 数据的数据重排操作。如果你使用的是基于容量的计费而非按需计费，同样的查询会消耗大量的槽时（slot-hours），并降低其他所有人的性能。

An agent running fifteen turns of unoptimized exploratory queries on TB-scale tables can rack up thousands of dollars in a single run. That’s not a hypothetical. That’s what happens the first time you point one of these things at a real warehouse without a guardrail.
一个在 TB 级表上运行十五轮未经优化探索性查询的智能体，单次运行就可能产生数千美元的费用。这不是假设，这是当你第一次在没有防护栏的情况下将此类智能体指向真实数据仓库时会发生的事情。

### Investigating dev sentiment and tech stack health
### 调查开发者情绪与技术栈健康状况

To build and test this, I used the Stack Overflow dataset from BigQuery Public datasets. Here’s the question I tried to get the answer to: Developer engagement metrics for Python data science libraries (pandas, numpy) on Stack Overflow dropped in late 2023. Answer rates and comment volumes fell. Did that correlate with a specific library release? Was it a boycott, or something more transient?
为了构建和测试这一点，我使用了 BigQuery 公共数据集中的 Stack Overflow 数据集。我试图回答的问题是：2023 年底，Python 数据科学库（pandas, numpy）在 Stack Overflow 上的开发者参与度指标出现下降，回答率和评论量均有所减少。这是否与特定的库版本发布有关？是抵制，还是某种更短暂的现象？

That’s a genuinely open-ended problem, and answering it takes a few steps. First, verify the trend actually happened, and check whether it was unique to pandas and numpy or part of a broader Stack Overflow slowdown. Second, cross-reference the comment trend with PyPI download stats to see whether people actually stopped installing the library, or just stopped needing to ask about it. Third, run text searches on the comments themselves to find the specific error messages or breaking changes people were complaining about.
这是一个真正的开放性问题，回答它需要几个步骤。首先，验证这一趋势是否确实发生，并检查它是 pandas 和 numpy 特有的，还是 Stack Overflow 更广泛放缓的一部分。其次，将评论趋势与 PyPI 下载统计数据进行交叉比对，看看人们是真的停止安装该库，还是仅仅不再需要提问。第三，对评论本身进行文本搜索，找出人们抱怨的具体错误信息或破坏性变更。

To run this without setting up a bunch of infrastructure, the agent queries across two systems. BigQuery holds the Stack Overflow public dataset, hundreds of gigabytes of partitioned post and comment data. A local CSV holds monthly PyPI download rates for pandas and numpy.
为了在不搭建大量基础设施的情况下运行此任务，智能体跨两个系统进行查询。BigQuery 存储了 Stack Overflow 公共数据集，包含数百 GB 的分区帖子和评论数据；本地 CSV 文件则存储了 pandas 和 numpy 的每月 PyPI 下载率。

### Wiring up Data Agent Kit and Antigravity
### 连接 Data Agent Kit 与 Antigravity

Data Agent Kit (DAK) runs as an extension inside the Antigravity IDE or CLI, and it handles the data-connection plumbing so you don’t have to. It exposes database tools as MCP servers, bigquery_remote being the one I used here, which run remotely in GCP and talk directly to your data in BigQuery. It also ships filesystem-based Agent Skills for performing various data operations, such as data cleaning, building data pipelines, querying data etc., using Google Cloud services and standard tools such as Python and Notebooks. Skills are pre-packaged directories with standard SKILL.md instruction files and references. Once you install DAK in your IDE, you configure it with the Google Cloud Proj...
Data Agent Kit (DAK) 作为 Antigravity IDE 或 CLI 中的扩展运行，它处理了数据连接的底层工作，让你无需操心。它将数据库工具作为 MCP 服务器公开（我在这里使用的是 `bigquery_remote`），这些服务器在 GCP 中远程运行，并直接与你在 BigQuery 中的数据通信。它还提供了基于文件系统的“智能体技能”（Agent Skills），用于执行各种数据操作，如数据清洗、构建数据流水线、查询数据等，并使用 Google Cloud 服务以及 Python 和 Notebooks 等标准工具。技能是预打包的目录，包含标准的 `SKILL.md` 指令文件和引用。一旦你在 IDE 中安装了 DAK，你就可以使用 Google Cloud 项目对其进行配置……
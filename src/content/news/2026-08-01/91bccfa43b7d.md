---
title: "Claude Sonnet 5 vs Opus 5: A Real-World Comparison (2026)"
originalUrl: "https://dev.to/tonyspiro/claude-sonnet-5-vs-opus-5-a-real-world-comparison-2026-1o67"
date: "2026-07-31T22:26:22.492Z"
---

# Claude Sonnet 5 vs Opus 5: A Real-World Comparison (2026)
# Claude Sonnet 5 与 Opus 5：实战对比（2026）

Originally published on the Cosmic blog. Anthropic shipped Claude Sonnet 5 on June 30, 2026 and Claude Opus 5 on July 24, 2026. Both are excellent. The expensive mistake is picking one, wiring it into every code path, and then either overpaying on trivial work or under-resourcing the work that actually matters.
本文最初发布于 Cosmic 博客。Anthropic 分别于 2026 年 6 月 30 日和 7 月 24 日发布了 Claude Sonnet 5 和 Claude Opus 5。两者都非常出色。最昂贵的错误在于：只选定其中一个模型并将其硬编码到所有代码路径中，这会导致要么在琐碎任务上过度支出，要么在真正重要的任务上资源投入不足。

This is the practical breakdown: what each model is measurably good at, what the same job costs on each once you account for tokenization, and a routing rule you can ship this week.
以下是实战分析：每个模型在哪些方面表现优异、计入分词（tokenization）成本后同一任务的实际开销，以及一套你本周即可部署的路由规则。

### The short answer
### 简短结论

| Your workload | Use | Why |
| :--- | :--- | :--- |
| Content generation, summarization, chat, classification, tagging | Sonnet 5 | Highest quality per dollar. This is the volume tier. |
| Day-to-day coding, refactors, test writing, PR review | Sonnet 5 | 72.7% on SWE-bench Verified, a 10.4 point jump over Sonnet 4.6. |
| Long autonomous agent runs with tool calls | Opus 5 | Anthropic reports it ranked first on Zapier's AutomationBench for end-to-end task completion. |
| Architecture decisions, ambiguous multi-step problems, novel reasoning | Opus 5 | Self-verification and judgment are the headline improvements. |
| Anything where a wrong answer is expensive to unwind | Opus 5 | Lowest misaligned-behavior score of Anthropic's recent releases at 2.3. |
| High-volume production traffic on a budget | Sonnet 5 | It is the default on Claude Free and Pro for a reason. |

| 你的工作负载 | 使用模型 | 原因 |
| :--- | :--- | :--- |
| 内容生成、摘要、聊天、分类、标签 | Sonnet 5 | 性价比最高，适用于大批量任务。 |
| 日常编码、重构、编写测试、PR 审查 | Sonnet 5 | 在 SWE-bench Verified 上达到 72.7%，较 Sonnet 4.6 提升了 10.4 个百分点。 |
| 涉及工具调用的长程自主智能体任务 | Opus 5 | 据 Anthropic 报告，其在 Zapier 的 AutomationBench 端到端任务完成度中排名第一。 |
| 架构决策、模糊的多步问题、创新推理 | Opus 5 | 自我验证和判断力是其核心改进。 |
| 任何错误代价高昂的任务 | Opus 5 | 在 Anthropic 近期发布中，其失准行为评分最低（2.3 分）。 |
| 预算有限的高并发生产流量 | Sonnet 5 | 它是 Claude 免费版和 Pro 版的默认模型，这并非偶然。 |

If you want one sentence to take away: run Sonnet 5 by default and escalate to Opus 5 on the specific paths where judgment matters more than throughput.
如果你只想记住一句话：默认运行 Sonnet 5，并在那些“判断力重于吞吐量”的特定路径上升级使用 Opus 5。

### What the benchmarks actually say
### 基准测试的真实情况

There is a wrinkle worth knowing before you compare scores. Anthropic evaluated these two models on different suites, so there is no clean head-to-head table, and anyone who publishes one has filled in gaps with guesses.
在对比分数之前，有一个细节值得注意。Anthropic 在不同的测试集上评估了这两个模型，因此不存在直接的对比表格，任何发布此类表格的人都是通过猜测填补了空白。

Here is what was actually published for Sonnet 5:
以下是 Sonnet 5 实际公布的数据：

| Benchmark | Sonnet 5 | Sonnet 4.6 | Opus 4.8 |
| :--- | :--- | :--- | :--- |
| SWE-bench Verified | 72.7% | 62.3% | 79.4% |
| Terminal-bench | 76.1% | 55.4% | not published |
| GPQA Diamond | 78.0% | not published | not published |
| MMMU | 76.3% | not published | not published |
| MathVista | 76.6% | not published | not published |
| CharacterEval | 90.3% | not published | not published |

And here is what was published for Opus 5:
以下是 Opus 5 公布的亮点：
* State of the art on coding and knowledge work, measured on Frontier-Bench and GDPval-AA. (在 Frontier-Bench 和 GDPval-AA 上测得的编码与知识工作领域顶尖水平。)
* First place on Zapier's AutomationBench for end-to-end task completion. (在 Zapier 的 AutomationBench 端到端任务完成度中排名第一。)
* An ARC-AGI 3 score roughly three times the next-best model. (ARC-AGI 3 分数约为次优模型的 3 倍。)
* A misaligned-behavior score of 2.3, the lowest of Anthropic's recent releases. (失准行为评分为 2.3，为 Anthropic 近期发布中最低。)
* Matches Claude Fable 5 on intelligence at approximately half the cost. (智能水平与 Claude Fable 5 持平，但成本仅为其一半左右。)
* A fast mode that runs about 2.5x quicker. (拥有一个运行速度快约 2.5 倍的快速模式。)

Notice what is missing: Anthropic did not publish a SWE-bench Verified number for Opus 5. So the honest comparison on classic coding benchmarks is Sonnet 5 at 72.7% against Opus 4.8 at 79.4%, with Opus 5 positioned above Opus 4.8 on the newer agentic and knowledge-work suites. Treat any "Opus 5 scores X% on SWE-bench" claim you find elsewhere as unsourced.
注意缺失的部分：Anthropic 没有公布 Opus 5 的 SWE-bench Verified 分数。因此，在经典编码基准测试中，诚实的对比是 Sonnet 5 的 72.7% 对比 Opus 4.8 的 79.4%，而 Opus 5 在更新的智能体和知识工作测试集中表现优于 Opus 4.8。在其他地方看到的任何“Opus 5 在 SWE-bench 上得分 X%”的说法，请视为无来源的传言。

The practical read: Sonnet 5 closed most of the gap to the previous Opus generation on straightforward coding. Opus 5's advantage shows up in long-horizon agent work, self-verification, and problems where the model has to decide what the task even is.
实战解读：在简单的编码任务上，Sonnet 5 已经弥补了与上一代 Opus 的大部分差距。Opus 5 的优势体现在长程智能体任务、自我验证以及模型需要自行定义任务目标的问题上。

### What it actually costs
### 实际成本分析

List prices per million tokens:
每百万 Token 的标价：

| Model | Input | Output | Notes |
| :--- | :--- | :--- | :--- |
| Sonnet 5 | $2 | $10 | Introductory pricing through August 31, 2026 |
| Sonnet 5 | $3 | $15 | Standard pricing from September 1, 2026 |
| Opus 5 | $5 | $25 | Same as Opus 4.8 |

Headline math says Opus 5 costs 1.67x Sonnet 5 at standard pricing, and 2.5x during the introductory window. That understates Sonnet 5's real cost, because Sonnet 5 ships a new tokenizer that counts the same text as 1.0x to 1.35x more tokens. You pay per token, not per word, so that inflation lands on your invoice.
表面计算显示，Opus 5 的标准定价是 Sonnet 5 的 1.67 倍，在促销期则是 2.5 倍。但这低估了 Sonnet 5 的实际成本，因为 Sonnet 5 使用了新的分词器，同样的文本会被计算为 1.0 到 1.35 倍的 Token。你是按 Token 付费而非按单词付费，因此这种“通胀”会直接体现在账单上。

Work a concrete example. Take a job that a baseline tokenizer counts as 1,000,000 input tokens and 200,000 output tokens:
举个具体例子。假设一个任务在基准分词器下计算为 100 万输入 Token 和 20 万输出 Token：

| Scenario | Input cost | Output cost | Total | Opus 5 premium |
| :--- | :--- | :--- | :--- | :--- |
| Opus 5 | $5.00 | $5.00 | $10.00 | baseline |
| Sonnet 5 standard, no inflation | $3.00 | $3.00 | $6.00 | 1.67x |
| Sonnet 5 standard, 1.35x inflation | $4.05 | $4.05 | $8.10 | 1.23x |
| Sonnet 5 intro, no inflation | $2.00 | $2.00 | $4.00 | 2.50x |
| Sonnet 5 intro, 1.35x inflation | $2.70 | $2.70 | $5.40 | 1.85x |

That 1.23x row is the one that should change your thinking. On text-heavy workloads that tokenize badly, at standard pricing, Opus 5 costs about 23% more than Sonnet 5 rather than 67% more. If judgment quality matters on that path at all, a 23% premium is easy to justify.
那行“1.23 倍”的数据应该改变你的想法。在分词效率较低的文本密集型工作负载中，按标准定价计算，Opus 5 的成本仅比 Sonnet 5 高出约 23%，而非 67%。如果该路径对判断质量有要求，那么 23% 的溢价是完全合理的。

Two caveats so you use this honestly. The inflation range is 1.0x to 1.35x depending on your content, and where you land is an empirical question about your own data. And the September 1 price change means any cost model you build this month needs revisiting. Run 1,000 real requests through both models, compare your actual billed token counts, and decide from your numbers instead of this table.
为了诚实地使用这些数据，有两个注意事项：分词膨胀率在 1.0 到 1.35 倍之间，具体取决于你的内容，这需要根据你自己的数据进行实证分析。此外，9 月 1 日的价格变动意味着你本月建立的任何成本模型都需要重新评估。建议在两个模型上各运行 1,000 次真实请求，对比实际计费的 Token 数量，并根据你自己的数据而非此表格做出决定。

### A routing rule you can ship
### 一套可立即部署的路由规则

Most teams do not need a clever classifier. A static route based on task type captures nearly all of the savings:
大多数团队不需要复杂的分类器。基于任务类型的静态路由可以捕获几乎所有的成本节省：

1. **Default to Sonnet 5.** Content, chat, summaries, tagging, ordinary code changes. (默认使用 Sonnet 5：内容、聊天、摘要、标签、普通代码变更。)
2. **Escalate to Opus 5 on three triggers:** the task requires more than roughly ten tool calls, the task is architectural or ambiguous, or a wrong answer is expensive to reverse. (在三种情况下升级至 Opus 5：任务需要超过约 10 次工具调用；任务涉及架构设计或模糊不清；或者错误答案的修正成本极高。)
3. **Escalate on retry.** If Sonnet 5's output fails validation twice, retry once on Opus 5 instead of a third time on Sonnet 5. This is the highest-return rule on the list and it takes about six lines of code. (重试时升级：如果 Sonnet 5 的输出两次验证失败，则使用 Opus 5 重试一次，而不是在 Sonnet 5 上进行第三次尝试。这是列表中回报率最高的规则，且只需约六行代码。)

Never hardcode the model name. Anthropic shipped two frontier models in 25 days. Whatever you pin today will be stale within a quarter. Point four is where most of the long-term pain lives. If your model identifiers are compiled into your application, every model release becomes a pull request, a review, and a deploy.
永远不要硬编码模型名称。Anthropic 在 25 天内发布了两个前沿模型。你今天锁定的任何版本在三个月内都会过时。第四点是长期痛苦的根源：如果模型标识符被编译进你的应用程序，那么每一次模型发布都意味着一次 Pull Request、一次审查和一次部署。

Keep model config out of your codebase. Store your routing configuration as content instead. Then swapping Sonnet 5 for Sonnet 5.1 is a field edit that takes effect immediately, with no rebuild.
将模型配置移出代码库。将路由配置作为内容存储。这样，将 Sonnet 5 替换为 Sonnet 5.1 只需要修改一个字段，即可立即生效，无需重新构建。

Install the SDK: `npm install @cosmicjs/sdk`
Define the routing table as an object in Cosmic and read it at runtime.
安装 SDK：`npm install @cosmicjs/sdk`
在 Cosmic 中将路由表定义为一个对象，并在运行时读取它。
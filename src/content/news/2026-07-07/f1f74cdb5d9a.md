---
title: "Stop Ranking Agent Configs by Average Score"
originalUrl: "https://towardsdatascience.com/stop-ranking-agent-configs-by-average-score/"
date: "2026-07-06T22:49:32.871Z"
---

# Stop Ranking Agent Configs by Average Score
# 停止用平均分来评估智能体配置

Agentic AI: Best-worst comparisons, MaxDiff-style judging, and Plackett-Luce utility scores give agent teams a cleaner way to decide which configs to ship, prune, and route toward next.
智能体 AI：通过“最佳-最差”比较、MaxDiff 风格评判以及 Plackett-Luce 效用评分，智能体开发团队可以更清晰地决定哪些配置应该发布、剔除或进行下一步测试。

### Stop Treating Agent Eval Like a Leaderboard
### 别再把智能体评估当成排行榜了

Every agent developer eventually hits the same question: which version should I actually ship? You change the model. You rewrite the prompt. You swap a retrieval tool. You run a batch. The average score moves a little. Maybe one version wins by two points. Maybe the judge prefers one output on Monday and another on Tuesday. So you ship the “best” average. That is often the wrong decision frame.
每一位智能体开发者最终都会遇到同一个问题：我到底该发布哪个版本？你更换了模型，重写了提示词，替换了检索工具，然后运行了一批测试。平均分变动了一点点。也许某个版本赢了两分，也许评判模型周一喜欢这个输出，周二又喜欢那个。于是你发布了“平均分最高”的版本。这往往是错误的决策框架。

Agent performance is rarely just better model + better prompt + better tool. The useful question is how those pieces behave together. A prompt that helps a smaller model may slow down a stronger one. A semantic search tool may pair beautifully with an open-ended prompt and poorly with a rigid step-by-step prompt. This article shows a small, practical way to test that.
智能体的表现很少仅仅取决于“更好的模型 + 更好的提示词 + 更好的工具”。真正有价值的问题是这些组件如何协同工作。一个能帮助小型模型的提示词，可能会拖慢更强大的模型。一个语义搜索工具可能与开放式提示词配合得天衣无缝，却与死板的“分步执行”提示词冲突。本文将展示一种简单实用的测试方法。

Pick a few agent levers. Run competing configurations on the same examples. Ask a judge to choose only the best and worst outputs. Then fit a ranking model that turns those choices into utility scores for each configuration and each interaction.
挑选几个智能体参数。在相同的示例上运行不同的配置。让评判模型仅选出最佳和最差的输出。然后拟合一个排名模型，将这些选择转化为每个配置及其交互作用的效用评分。

The opinion: if you only score every answer in isolation, rank the averages, and take the top config, you are leaving signal on the table. Direct comparison is why golden sets are valuable in the first place. Best-worst comparison forces the judgment where the variation actually matters.
我的观点是：如果你只是孤立地给每个答案打分、对平均分进行排名并选择最高分配置，你实际上浪费了大量有效信息。直接比较正是“黄金数据集”（Golden Sets）之所以有价值的原因。而“最佳-最差”比较则强制评判聚焦于差异真正显著的地方。

You can use the method deeply, with a Plackett-Luce model and factorial interaction terms. Or, if you are building agent-first, you can hand the same structure to an evaluation agent and let it run the loop. The model is not the point by itself. The point is cleaner evidence for the next engineering decision.
你可以深入使用这种方法，结合 Plackett-Luce 模型和因子交互项。或者，如果你采用“智能体优先”的开发模式，可以将同样的结构交给一个评估智能体，让它自动运行循环。模型本身不是目的，目的是为下一次工程决策提供更清晰的证据。

### For Agent-First Builders
### 给“智能体优先”开发者的建议

You do not have to run this by hand. If your normal workflow is to give an agent a goal, a test set, expected outputs, a few models to choose from, and a judge agent to review the results, this method still applies. It just gives the agent a better evaluation protocol.
你不必手动执行这些操作。如果你的常规工作流是给智能体设定目标、测试集、预期输出、几个可选模型，并由一个评判智能体来审查结果，那么这种方法同样适用。它只是为智能体提供了一套更好的评估协议。

Prompt to try: Create a small factorial grid of candidate agent configurations. For each test example, sample several configs and run them independently. Anonymize the outputs. Ask a judge to select exactly one best and one worst response. Fit a Plackett-Luce model, MaxDiff model, or equivalent utility ranking. Report which configs should be deployed, pruned, or tested next, and explain which model/prompt/tool interactions appear to matter.
可以尝试的提示词：创建一个包含候选智能体配置的小型因子网格。对于每个测试示例，采样几种配置并独立运行。将输出匿名化。要求评判模型选出一个最佳和一个最差的响应。拟合一个 Plackett-Luce 模型、MaxDiff 模型或类似的效用排名。报告哪些配置应该部署、剔除或进行下一步测试，并解释哪些模型/提示词/工具的交互作用最为关键。

That is the practical value for agent-first development. The agent can generate candidates, run comparisons, inspect utility results, and propose the next set of configurations. The human still decides what matters, but the system gets better evidence with each cycle.
这就是“智能体优先”开发的实际价值所在。智能体可以生成候选方案、运行比较、检查效用结果并提出下一组配置。人类依然决定什么才是重要的，但系统在每一轮循环中都能获得更好的证据。

### The Experiment
### 实验部分

The task: An agent pipeline extracts structured JSON from invoice images. Invoice extraction is not glamorous, but it is exactly the kind of work that actually runs in production. The schema is fixed, correctness matters, and errors have downstream consequences. That makes it a useful evaluation surface: the agent either got the right fields or it did not.
任务：一个智能体流水线从发票图像中提取结构化 JSON。发票提取工作虽然不显眼，但它正是生产环境中实际运行的那类任务。模式（Schema）是固定的，正确性至关重要，且错误会产生连锁反应。这使其成为一个有用的评估场景：智能体要么提取到了正确的字段，要么没有。

I used the shubh303/Invoice-to-Json dataset from HuggingFace: 100 invoice documents, 5 sampled configurations per document, and 499 total production runs after one invalid run was excluded. Of those, 488 achieved valid schema compliance.
我使用了 HuggingFace 上的 shubh303/Invoice-to-Json 数据集：包含 100 份发票文档，每份文档采样 5 种配置，排除一次无效运行后，总共进行了 499 次生产运行。其中，488 次实现了有效的模式合规。

The design: Three binary factors define the configuration space, producing eight distinct pipelines.
设计：三个二元因子定义了配置空间，产生了八种不同的流水线。

The two prompt styles represent different extraction philosophies. The Systematic Planner is rule-following: it gives the agent an explicit sequence and constrains tool use. The Contextual Leaper is semantic and open: it asks the agent to understand the document first, then extract what is needed with more freedom. Both tools are deterministic stubs. This matters. The experiment is not testing OCR quality, live retrieval quality, or parsing reliability. It is testing how the agent navigates tool handles and manages context execution when the tool affordances change.
这两种提示词风格代表了不同的提取理念。“系统规划者”（Systematic Planner）遵循规则：它给智能体明确的顺序并限制工具使用。“上下文跳跃者”（Contextual Leaper）则是语义化且开放的：它要求智能体先理解文档，然后更自由地提取所需内容。两种工具都是确定性的存根（stubs）。这一点很重要。本实验测试的不是 OCR 质量、实时检索质量或解析可靠性，而是测试当工具功能发生变化时，智能体如何处理工具调用并管理上下文执行。

The evaluation protocol: For each invoice, a random subset of 5 configs from the 8 processed the document independently. A judge model (claude-sonnet-4-6) then selected the single best and single worst output from the anonymized batch. This is Best-Worst Scaling, also known as Maximum Difference or MaxDiff-style comparison.
评估协议：对于每张发票，从 8 种配置中随机抽取 5 种独立处理文档。随后，评判模型（claude-sonnet-4-6）从匿名批次中选出唯一最佳和唯一最差的输出。这就是“最佳-最差缩放”（Best-Worst Scaling），也称为最大差异（Maximum Difference）或 MaxDiff 风格比较。

### What Average Scores Tell You — and What They Miss
### 平均分告诉了你什么——以及它遗漏了什么

Before reaching for a ranking model, look at what a standard analysis would show. Here are the macro score averages for each factor, collapsed across all 499 runs:
在求助于排名模型之前，先看看标准分析会显示什么。以下是所有 499 次运行中，每个因子的宏观平均分：

The gaps are small. A team looking only at this table might reasonably conclude that model matters a little, prompt barely matters, and tool choice is almost a coin flip.
差距很小。如果团队只看这张表，可能会合理地得出结论：模型有一点影响，提示词几乎没影响，而工具选择几乎就像抛硬币一样随机。

Now look at the raw best-worst win rates by configuration:
现在看看按配置划分的原始“最佳-最差”胜率：

*(Table omitted for brevity)*
*(表格因篇幅原因省略)*
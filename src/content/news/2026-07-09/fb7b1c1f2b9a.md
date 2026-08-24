---
title: "Google updates Android Bench with new LLMs, but Gemini still lags behind"
originalUrl: "https://arstechnica.com/google/2026/07/google-revamps-android-ai-dev-benchmark-adds-fable-5-and-other-agents/"
date: "2026-07-08T22:29:31.811Z"
---

# Google updates Android Bench with new LLMs, but Gemini still lags behind
# 谷歌更新 Android Bench 基准测试并引入新大模型，但 Gemini 表现仍落后

Code generation is emerging as one of the most popular applications for large language models (LLMs), but not all agents are equally good at all development tasks. Google created a benchmark earlier this year to evaluate how LLMs perform in Android app development, and Android Bench is getting a big update today. The leaderboard now includes a raft of new models, and Google has adopted a new framework that should be easier to use. Developers are invited to run their own tests and submit feedback that could shape the future of Android Bench.

代码生成正逐渐成为大语言模型（LLM）最热门的应用场景之一，但并非所有智能体在处理各类开发任务时都同样出色。谷歌今年早些时候创建了一个基准测试，旨在评估大模型在 Android 应用开发中的表现，而 Android Bench 在今天迎来了一次重大更新。排行榜现已加入了一系列新模型，谷歌还采用了一个更易于使用的新框架。谷歌邀请开发者运行自己的测试并提交反馈，这些反馈将有助于塑造 Android Bench 的未来。

While they are popular coding tools, LLMs don’t get everything right. Separating the useful outputs from straight-up slop means choosing the right tool. Android Bench aims to demonstrate which AI agents do best on a suite of 100 Android development tasks. After launching Android Bench in March, Google has added metrics like cost and efficiency, as well as open-weight models. To keep Android Bench relevant, Google is updating the test with eight new models, including all the latest heavy-hitters: Claude Fable 5, Claude Sonnet 5, Claude Opus 4.8, GLM 5.2, Kimi K2.7 Code, MiniMax M3, Qwen 3.7 Plus, and Qwen 3.7 Max.

尽管大模型是流行的编程工具，但它们并非万无一失。要从垃圾输出中筛选出有用的代码，关键在于选择合适的工具。Android Bench 旨在展示哪些 AI 智能体在 100 项 Android 开发任务中表现最佳。自 3 月份推出 Android Bench 以来，谷歌增加了成本和效率等指标，并引入了开源权重模型。为了保持 Android Bench 的时效性，谷歌此次更新加入了八款新模型，涵盖了所有最新的重量级产品：Claude Fable 5、Claude Sonnet 5、Claude Opus 4.8、GLM 5.2、Kimi K2.7 Code、MiniMax M3、Qwen 3.7 Plus 和 Qwen 3.7 Max。

Even the initial release of Android Bench didn’t have Google’s AI models at the top—OpenAI’s latest LLMs were slightly in the lead. The story is worse for Gemini now that Google has expanded the lineup. In the new leaderboard, Gemini 3.1 Pro is in fifth place, behind GPT 5.4, Claude Sonnet 5, and Claude Fable 5. In fact, Fable 5 lives up to the hype with a sizeable lead at 84.5 percent accuracy in the test.

即使在 Android Bench 的最初版本中，谷歌的 AI 模型也并未占据榜首——OpenAI 的最新大模型当时略微领先。随着谷歌扩充了模型阵容，Gemini 的处境变得更加严峻。在新的排行榜中，Gemini 3.1 Pro 仅排在第五位，落后于 GPT 5.4、Claude Sonnet 5 和 Claude Fable 5。事实上，Fable 5 名副其实，以 84.5% 的测试准确率遥遥领先。

However, Fable 5 and GPT 5.5 also have extremely high operating costs, chewing through more than $130 in tokens for the 100-problem, 10-run benchmark. Gemini 3.1 Pro didn’t score as high, but it only costs $87 to run the test. Gemini 3.5 Flash, which is supposed to be cheaper to run than other models, has the highest cost on the leaderboard because it took so much longer to complete the benchmark: $165 per run and a 28-hour runtime.

然而，Fable 5 和 GPT 5.5 的运行成本极高，在 100 个问题、10 次运行的基准测试中，消耗的 Token 价值超过 130 美元。Gemini 3.1 Pro 虽然得分没那么高，但运行测试的成本仅为 87 美元。Gemini 3.5 Flash 本应比其他模型更具成本优势，但由于完成基准测试所需时间过长，它反而成了排行榜中成本最高的模型：单次运行成本高达 165 美元，且运行时间长达 28 小时。

The Android coding performance gap for Google’s models is a problem as the company shifts many of its projects toward agentic development. Obviously, Google would prefer that Android developers use Google’s tools in their workflows, which may be why Google has reportedly been offering to buy application source code from developers for AI training.

随着谷歌将许多项目转向智能体开发（agentic development），其模型在 Android 编码性能上的差距成为了一个问题。显然，谷歌更希望 Android 开发者在工作流中使用谷歌的工具，这或许就是为什么据报道谷歌一直在向开发者购买应用程序源代码以用于 AI 训练的原因。

### Community collaboration
### 社区协作

Android Bench is supposed to evolve over time, adopting new workflows to test models. Google hopes that developers will want to contribute to Android Bench by sharing benchmarks and development tasks. To make that more feasible, Google is switching to the Harbor framework. According to the company, this testing sandbox makes it easy for developers to run, evaluate, and share results for Android Bench. Google re-ran all its previous tests with Harbor to get a new baseline for LLM performance. So there has been some shift in the previously reported scores even though the underlying tests haven’t changed (yet). The historical data will remain online in an archive. With the new, easier framework, developers can run their own development tasks against Android Bench and submit those for possible inclusion in the official test. The Android Bench GitHub has been updated with the new dataset and instructions on how to get involved.

Android Bench 的目标是随时间推移不断演进，采用新的工作流来测试模型。谷歌希望开发者能通过分享基准测试和开发任务来为 Android Bench 做出贡献。为了使这一目标更易实现，谷歌转向了 Harbor 框架。据该公司称，这个测试沙箱让开发者能够轻松地运行、评估并分享 Android Bench 的测试结果。谷歌使用 Harbor 重新运行了之前所有的测试，以获得大模型性能的新基准。因此，尽管底层测试尚未改变，但之前报告的分数出现了一些变动。历史数据将保留在在线存档中。借助这个更简单的新框架，开发者可以针对 Android Bench 运行自己的开发任务，并提交这些任务以供官方测试采纳。Android Bench 的 GitHub 页面已更新了新的数据集以及参与指南。
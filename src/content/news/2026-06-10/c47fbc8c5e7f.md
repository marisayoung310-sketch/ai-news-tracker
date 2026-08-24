---
title: "Can tech companies learn to love cheaper AI models? "
originalUrl: "https://techcrunch.com/2026/06/09/can-tech-companies-learn-to-love-cheaper-models/"
date: "2026-06-09T22:56:09.004Z"
---

# Can tech companies learn to love cheaper AI models?
# 科技公司能学会拥抱更便宜的 AI 模型吗？

The AI boom has been built on a basic assumption: Bigger models are more powerful, and the most powerful models win. Now, the industry is about to learn what happens if that assumption starts to break.
AI 的繁荣建立在一个基本假设之上：模型越大越强大，最强大的模型就是赢家。现在，整个行业即将见证如果这一假设开始动摇会发生什么。

Mounting costs have already pressured users to give smaller and cheaper models a second look. This cost-conscious model-shopping is new and it’s unclear how it will affect the industry, but the impact is likely to be significant.
不断攀升的成本已经迫使用户重新审视那些更小、更便宜的模型。这种具有成本意识的模型选购方式尚属新鲜，目前尚不清楚它将如何影响行业，但其影响很可能是深远的。

One prediction, laid out best by Coinbase co-founder Brian Armstrong, is that it will result in the vast majority of tasks shifting to cheaper models. “[D]emand for intelligence is near infinite, but 80% of workloads will be running on 99% cheaper models within 12-18 months,” Armstrong wrote on X. “20% of workloads will still run on latest gen models where IQ maxing is important.”
Coinbase 联合创始人布莱恩·阿姆斯特朗（Brian Armstrong）提出了一个极具代表性的预测：绝大多数任务将转向更便宜的模型。“对智能的需求几乎是无限的，但在未来 12 到 18 个月内，80% 的工作负载将运行在成本降低 99% 的模型上，”阿姆斯特朗在 X 上写道，“只有 20% 的工作负载仍会运行在需要极致智商的最新一代模型上。”

It’s hard to overstate what a significant shift it will be for the AI industry if Armstrong’s prediction comes true. Before now, most AI companies have competed on quality, which has meant defaulting to the most advanced available model. If those same jobs can be handled by cheaper models without affecting quality, it would mean a massive shift in the economics of AI.
如果阿姆斯特朗的预测成真，这对 AI 行业来说将是一次重大的转变。在此之前，大多数 AI 公司都在比拼质量，这意味着默认使用当前最先进的模型。如果同样的任务可以在不影响质量的前提下由更便宜的模型完成，那将意味着 AI 经济模式的巨大变革。

And critically, much of the savings would be coming out of the pockets of the big labs, dealing a financial blow to OpenAI and Anthropic just as they’re heading for their IPOs. It’s a potentially seismic change in the industry, resting on one basic question: Are companies ready to switch to smaller models?
至关重要的是，大部分节省下来的成本将直接削减大型实验室的收入，这对于正准备 IPO 的 OpenAI 和 Anthropic 来说无疑是一次财务打击。这可能是行业内一场地震级的变革，而其核心在于一个基本问题：企业准备好转向更小的模型了吗？

Initial tests suggest that, when the system is arranged right, cheaper models could sub in without any sacrifice in quality. In a recent test by the legal AI tool Harvey, the company was able to reduce inference costs by 3x without reducing quality. The test, performed in partnership with the inference platform Fireworks AI, combined Claude Opus and Fireworks’ GLM 5.1, and shifted to Opus for the most intensive tasks. The result was a significantly lower load in terms of server time and overall cost.
初步测试表明，只要系统配置得当，更便宜的模型完全可以在不牺牲质量的情况下进行替代。在法律 AI 工具 Harvey 最近的一项测试中，该公司在不降低质量的情况下将推理成本降低了 3 倍。该测试与推理平台 Fireworks AI 合作完成，结合了 Claude Opus 和 Fireworks 的 GLM 5.1 模型，并将最繁重的任务交给 Opus 处理。结果显示，服务器时间和总成本的负载显著降低。

“Quality comes first, and in legal it always will,” Harvey co-founder Gabe Pereyra told TechCrunch, referring to the AI legal services his startup provides. “However, the definition of quality is evolving from simply using the most powerful model for everything, to using the best model that gets the right answer most efficiently.”
“质量至上，在法律领域永远如此，”Harvey 联合创始人加布·佩雷拉（Gabe Pereyra）在谈到其初创公司提供的 AI 法律服务时告诉 TechCrunch，“然而，质量的定义正在演变：从单纯地对所有事情都使用最强大的模型，转变为使用能最高效得出正确答案的最佳模型。”

This trend is often framed in terms of major labs versus Chinese models or open-weight ones, but that misses the bigger point. The real divide isn’t between proprietary and open models; it’s between large models and small ones. You can save money by switching from GPT-5.5 to DeepSeek’s V4 Flash, but switching to GPT-5.4-mini works just as well.
这种趋势通常被解读为大型实验室与中国模型或开源权重模型之间的竞争，但这忽略了更本质的问题。真正的分歧不在于专有模型与开源模型之间，而在于大型模型与小型模型之间。你可以通过从 GPT-5.5 切换到 DeepSeek 的 V4 Flash 来省钱，但切换到 GPT-5.4-mini 同样有效。

There’s an active price war going on between in-house inference from the big labs and independently served open-weight models. For the bigger question of small versus large, it doesn’t really matter which kind of small model wins out.
大型实验室的内部推理服务与独立部署的开源权重模型之间正在进行激烈的价格战。至于“小模型对阵大模型”这一更大的议题，哪种小模型最终胜出其实并不重要。

All of this might seem obvious — of course you shouldn’t use more compute than necessary — but it runs counter to the scaling-first approach that has dominated the industry until now. Inspired by the bitter lesson, labs have leaned hard into training the most compute-intensive models possible, pushing the frontier of what AI models can do. With prices heavily subsidized by investors, clients had no reason to choose anything but the most advanced option. With token prices rising and subsidies slowing down, users are facing cost pressure for the first time.
这一切看起来似乎显而易见——当然不应该使用超过必要的算力——但这与迄今为止主导行业的“规模优先”策略背道而驰。受“苦涩的教训”（bitter lesson）启发，实验室一直致力于训练尽可能消耗算力的模型，以推动 AI 能力的边界。在投资者的大力补贴下，客户没有理由不选择最先进的方案。但随着 Token 价格上涨和补贴减少，用户第一次面临了成本压力。

We don’t know whether the new cost pressure will actually drive enterprise users to smaller models. They could just as easily economize by making fewer calls, using less context, or simply giving up on the least promising deployments. But if it turns out that most deployments can be run just as well on a smaller model, it could put a serious damper on the growing demand for inference — and raise new questions about how to justify the cost of training a frontier model.
我们尚不清楚这种新的成本压力是否真的会促使企业用户转向更小的模型。他们同样可以通过减少调用次数、减少上下文使用，或者干脆放弃那些前景不明的项目来节省开支。但如果事实证明大多数部署在小模型上也能运行得同样出色，这可能会严重抑制对推理需求的增长，并引发关于如何证明训练前沿模型成本合理性的新问题。
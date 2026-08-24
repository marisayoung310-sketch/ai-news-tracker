---
title: "GLM 5.2 and the coming AI margin collapse"
originalUrl: "https://martinalderson.com/posts/the-upcoming-ai-margin-collapse-part-1-glm-5-2/"
date: "2026-07-06T22:47:07.517Z"
---

# GLM 5.2 and the coming AI margin collapse
# GLM 5.2 与即将到来的 AI 利润率崩塌

This is a two part series focusing on what I believe is perhaps the least understood upcoming shift in AI economics. If you've enjoyed this and want to be notified about the second post, please feel free to sign up for my newsletter.
这是一个分为两部分的系列文章，重点探讨我认为目前 AI 经济学中最不被理解的即将到来的转变。如果你喜欢这篇文章并希望收到第二篇的通知，欢迎订阅我的时事通讯。

The real DeepSeek moment is upon us. What feels like decades ago, markets recoiled at DeepSeek's R1 model. The theory being that given the underlying V3 model reportedly cost under $6m to train, the market therefore thought the huge investment in capex for model training was over, and thus the stock price of Nvidia et al collapsed overnight. Of course, this was a hugely poor read of where the costs actually lie in AI. Training - while no doubt capex intensive - is a fixed, up-front cost. You spend hundreds of millions to train a model, then you are "done".
真正的“DeepSeek 时刻”已经到来。仿佛在几十年前，市场对 DeepSeek 的 R1 模型感到震惊。当时的理论是，鉴于其底层的 V3 模型据报道训练成本不到 600 万美元，市场因此认为模型训练所需的巨额资本支出（capex）时代已经结束，导致英伟达等公司的股价一夜之间崩盘。当然，这是对 AI 成本构成极其错误的解读。训练——虽然无疑是资本密集型的——是一种固定的前期成本。你花费数亿美元训练一个模型，然后就“完成了”。

Inference, on the other hand, scales with your demand. It has genuine marginal costs. I've written about this at length over the past year or so. Again, the mainstream understanding of this - that the API costs the providers charge are their real costs is mistaken. Indeed, when Anthropic/OpenAI charge $25/MTok for inference, my napkin maths suggests that this is probably something like 90% gross margin on the cost of compute vs the rack rate. It may be a bit higher, or a bit lower (OpenAI's leaked financials suggest a ~60% gross margin on revenue, but this no doubt includes a lot of other costs like support, payment processing and other services they offer), but the whole business model of frontier AI labs is in short to spend a large amount of money on salaries on compute to train a model, then amortise that cost over a lot of very profitable inference. If you can amortise that cost over enough inference you turn from profitable on a COGS basis to... actually profitable.
另一方面，推理成本随需求规模而变化。它具有真正的边际成本。在过去一年左右的时间里，我对此进行了详细论述。同样，主流观点认为提供商收取的 API 费用就是其实际成本，这是错误的。事实上，当 Anthropic 或 OpenAI 收取每百万 Token 25 美元的推理费用时，我的粗略计算表明，相对于计算成本与机架费率，这可能拥有约 90% 的毛利率。这个数字可能略高或略低（OpenAI 泄露的财务数据显示其营收毛利率约为 60%，但这无疑包含了支持、支付处理及其他服务等大量额外成本），但前沿 AI 实验室的整个商业模式简而言之就是：投入大量资金用于薪资和计算资源来训练模型，然后通过大量高利润的推理任务来摊销这些成本。如果你能通过足够的推理量摊销这些成本，你就能从“销售成本（COGS）层面盈利”转变为“真正盈利”。

### GLM 5.2
### GLM 5.2

I have been playing around with GLM5.2 from Z.ai for the last couple of weeks. I believe GLM5.2 is the first model that reaches the "bar" of a genuine open weights competitor to Opus and GPT (at the time of writing, the latest version of GPT was 5.5 - future models no doubt will exceed this). It's genuinely very good and hard for me to tell the difference between Opus - my daily driver and it. I've found that it is slow because of the amount of thinking it tends to do. For non interactive agentic tasks (like reviewing PRs in the background) which aren't time critical this is a non issue, but for interactive use it is definitely a tad too slow to keep my attention. This also somewhat reduces the cost effectiveness of it (more thinking means more tokens, which increases costs).
过去几周我一直在试用 Z.ai 的 GLM5.2。我认为 GLM5.2 是第一个达到“门槛”的模型，真正成为了 Opus 和 GPT 的开源权重竞争对手（撰写本文时，GPT 的最新版本是 5.5——未来的模型无疑会超越这一点）。它确实非常出色，我很难分辨出它与我日常使用的 Opus 之间的区别。我发现它因为倾向于进行大量的“思考”而显得缓慢。对于非交互式的智能体任务（例如在后台审查 PR），由于对时间不敏感，这不是问题，但对于交互式使用，它确实太慢了，无法保持我的注意力。这也降低了它的成本效益（更多的思考意味着更多的 Token，从而增加了成本）。

It also doesn't have vision support. It's funny how quickly I've gone from basically never wanting to use vision (because it was so inaccurate, I'd often pause sessions when I caught it using vision), to using it all the time - since Opus 4.7 introduced far higher resolution vision capabilities. It's genuinely frustrating it not being able to read image-based PDFs, screenshots and design files. I'm sure they have a more multimodal model in the works, but this is a significant weakness against the frontier labs.
它也不支持视觉功能。有趣的是，我从基本上从不使用视觉功能（因为它太不准确，我经常在发现它使用视觉时暂停会话），转变为一直使用它——自从 Opus 4.7 引入了更高分辨率的视觉能力以来。它无法读取基于图像的 PDF、截图和设计文件，这确实令人沮丧。我相信他们正在开发更强大的多模态模型，但这相对于前沿实验室来说是一个明显的弱点。

Secondly, and something I really didn't expect to be a blocker, is the lack of/poor web search capabilities. It turns out that nearly every agentic session does a lot of web searching for looking up items. Z.ai provides a replacement MCP for web search, but it's pretty awful and slow. Fireworks doesn't provide any, though they gave me a very vague answer saying they are always looking to improve products. I would take that as no plans personally, but let's see. I've managed to somewhat work around this by telling the agent to use a CLI based web search like ddgr, but this is a real weakness right now. I am very bullish on the potential of 3rd party web search APIs. This is actually a huge gap in what open weights model providers can offer, and it turns out that great web search capabilities are essential for many agentic tasks. Regardless, this no doubt will be solved with time - there are many people building web search indexes and it just requires the right partnerships and plumbing in place.
其次，我完全没想到会成为阻碍的一点是：缺乏或糟糕的网络搜索能力。事实证明，几乎每个智能体会话都需要进行大量的网络搜索来查找信息。Z.ai 提供了一个用于网络搜索的替代 MCP，但它非常糟糕且缓慢。Fireworks 没有提供任何此类功能，尽管他们给了我一个非常模糊的回答，称他们一直在寻求改进产品。我个人将其理解为目前没有计划，但让我们拭目以待。我通过告诉智能体使用像 ddgr 这样的基于 CLI 的网络搜索来勉强绕过这个问题，但这目前确实是一个明显的弱点。我非常看好第三方网络搜索 API 的潜力。这实际上是开源权重模型提供商目前的一个巨大缺口，事实证明，强大的网络搜索能力对于许多智能体任务至关重要。无论如何，随着时间的推移，这无疑会得到解决——有许多人正在构建网络搜索索引，只需要建立正确的合作伙伴关系和基础设施即可。

### Drop in replacement
### 直接替换

Where it gets really scary for the frontier labs is how easy it is to migrate to open weights models. Both Z.ai and Fireworks offer both an OpenAI compatible and Anthropic compatible endpoint. This makes it absolutely trivial to use with Claude Code and Codex. You just set the base URL to point to your inference provider, give it the API key and tell it to use GLM5.2. Given Anthropic recently announced (then backtracked) on charging API rates for claude -p non interactive agentic use, you will find for many/most of those use cases you can just drop in GLM instead. And for interactive use, apart from the lack of vision and slow(er) speed, it was genuinely almost impossible for me to realise I wasn't using Opus in Claude Code.
对于前沿实验室来说，真正可怕的是迁移到开源权重模型是多么容易。Z.ai 和 Fireworks 都提供了兼容 OpenAI 和 Anthropic 的端点。这使得在 Claude Code 和 Codex 中使用它们变得极其简单。你只需将基础 URL 指向你的推理提供商，提供 API 密钥，并告诉它使用 GLM5.2 即可。鉴于 Anthropic 最近宣布（随后撤回）对 claude -p 非交互式智能体使用收取 API 费用，你会发现对于许多/大多数此类用例，你可以直接用 GLM 替换。而在交互式使用方面，除了缺乏视觉功能和速度较慢之外，在 Claude Code 中，我几乎无法察觉到自己没有在使用 Opus。

This is not Microsoft or Salesforce like lock in, where you need to spend years planning a migration. The switching costs are incredibly low, and I would argue that are actually far less than trying to keep up on all the policy and term changes that the frontier lab models tend to scramble around with. It's possible that Claude Code will make it harder to use 3rd party providers, but there are many good open source options (like Codex itself and OpenCode, amongst dozens). One concern I do hear from enterprise is data privacy and security. There is no doubt that using Z.ai's official API and subscription is almost certainly a non-starter, with their terms being at best weak and the deep connection to Mainland China. But of course, with open weights being open there are many other providers in the market, many with proper contractual provisions. And, if that isn't enough, you can of course host in on premises yourself, which actually opens up even more sensitive data - that couldn't be sent to any third party - to Opus-quality agentic workflows.
这不像微软或 Salesforce 那样的锁定，你需要花费数年时间来规划迁移。转换成本极低，我认为这实际上远低于试图跟上那些前沿实验室模型频繁变动的政策和条款所带来的成本。Claude Code 可能会增加使用第三方提供商的难度，但目前有许多优秀的开源选项（如 Codex 本身和 OpenCode 等数十种）。我从企业那里听到的一个担忧是数据隐私和安全。毫无疑问，使用 Z.ai 的官方 API 和订阅几乎是不可行的，因为他们的条款充其量是薄弱的，且与中国大陆有着深厚的联系。但当然，随着开源权重的开放，市场上还有许多其他提供商，其中许多具有完善的合同条款。而且，如果这还不够，你当然可以在本地自行托管，这实际上可以将更多无法发送给任何第三方的敏感数据，接入到具备 Opus 质量的智能体工作流中。

### Cost savings
### 成本节约

The going rate for GLM5.2 seems to be around the $4.40/MTok mark.
GLM5.2 的当前市场价格似乎在每百万 Token 4.40 美元左右。
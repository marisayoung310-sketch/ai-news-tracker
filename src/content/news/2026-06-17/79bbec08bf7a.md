---
title: "Anthropic \"pauses\" token-based billing for its Claude Agent SDK"
originalUrl: "https://arstechnica.com/ai/2026/06/anthropic-pauses-token-based-billing-for-its-claude-agent-sdk/"
date: "2026-06-16T23:01:13.332Z"
---

# Anthropic "pauses" token-based billing for its Claude Agent SDK
# Anthropic 宣布“暂停”其 Claude Agent SDK 的基于 Token 的计费计划

Last month, Anthropic announced a billing change that would have substantially increased costs for heavy users of its automation-focused Claude Agent SDK, including many third-party apps.
上个月，Anthropic 宣布了一项计费变更，该变更本将大幅增加其以自动化为核心的 Claude Agent SDK 重度用户（包括许多第三方应用）的使用成本。

On Monday, though, Anthropic abruptly announced it had paused those pricing changes just as they were set to take effect, allowing Agent SDK users to continue drawing from the more generous usage limits in their existing Claude subscriptions.
然而，就在这些定价变更即将生效之际，Anthropic 于周一突然宣布暂停执行，允许 Agent SDK 用户继续沿用其现有 Claude 订阅中更宽松的使用限额。

The plan, as announced on May 13, would have treated usage of the Claude Agent SDK (including via third-party apps and the programmatic “claude -p” command) separately from “standard” Claude usage via the chat interface or the official Claude CLI.
根据 5 月 13 日公布的计划，Claude Agent SDK 的使用（包括通过第三方应用和程序化“claude -p”命令的使用）将与通过聊天界面或官方 Claude CLI 进行的“标准”Claude 使用分开计算。

As of June 15, Anthropic said that kind of outside SDK usage would be billed at Anthropic’s prevailing API rates, with subscribers receiving a simple monthly usage credit equal to their subscription price.
Anthropic 原定从 6 月 15 日起，将此类外部 SDK 使用按其现行的 API 费率计费，订阅用户每月将获得等同于其订阅费用的使用额度。

That would have been a major change from the current setup, where Agent SDK use is limited only by the standard weekly caps applied to a user’s current Claude subscription tier.
这将是对当前模式的重大改变，目前 Agent SDK 的使用仅受用户当前 Claude 订阅等级的标准每周上限限制。

Those generous limits allow power users to squeeze a lot more usage out of those paid subscriptions than they would get by paying the same price for API fees.
这些宽松的限额使得高级用户能够从付费订阅中获得远超同等价格 API 费用的使用量。

One analysis suggests that Claude Opus users start saving money from their subscription after just two to three messages per day, and that their subscription could be worth many multiples of its monthly cost in API usage.
一项分析指出，Claude Opus 用户每天只需发送两到三条消息，其订阅费用就能回本，且其订阅带来的 API 使用价值可能是每月订阅费用的数倍。

“If you are a developer using Claude as your primary coding assistant with Opus, you will blow past breakeven in the first week,” developer Matthew Diakonov writes in that analysis.
开发者 Matthew Diakonov 在分析中写道：“如果你是一名使用 Opus 并将 Claude 作为主要编程助手的开发者，你在第一周内就会远超回本点。”

“For anyone using agents heavily, this is a major cost increase,” the developers behind code editor Zed warned its users after Anthropic announced the Agent SDK price change plans.
在 Anthropic 宣布 Agent SDK 定价变更计划后，代码编辑器 Zed 的开发团队曾警告用户：“对于任何重度使用 Agent 的人来说，这都是一次巨大的成本增长。”

On Monday, though, Anthropic gave these power users a pricing reprieve, updating its billing support page to say that it was “pausing the changes to Claude Agent SDK usage described below.”
然而，Anthropic 在周一为这些高级用户提供了定价上的缓冲，更新了其计费支持页面，称其正在“暂停下述关于 Claude Agent SDK 使用的变更”。

The company says that “for now, nothing has changed” and that it is “working to update the plan to better support how users build with Claude subscriptions.” Some users report receiving similar notices via email from Anthropic.
该公司表示，“目前一切照旧”，并且正在“努力更新计划，以更好地支持用户基于 Claude 订阅进行开发”。一些用户报告称已收到 Anthropic 通过电子邮件发送的类似通知。

The sudden pullback on forcing API pricing comes just weeks after GitHub Copilot rolled out its own token-based billing changes, leading to sticker shock for many users who found themselves blowing past the new limits on their subscriptions.
此次突然撤回强制 API 定价的举措，距离 GitHub Copilot 推出其基于 Token 的计费变更仅过去几周。此前，许多用户因发现自己超出了订阅的新限额而感到震惊。

It also comes as Anthropic prepares for a possible initial public stock offering by filing confidential papers with the Securities and Exchange Commission.
与此同时，Anthropic 正通过向美国证券交易委员会提交机密文件，为可能的首次公开募股（IPO）做准备。

While the temporary reprieve is welcome news for Claude Agent SDK users, they should probably expect to bear the full costs of their extensive use before long.
虽然这一暂时的缓冲对 Claude Agent SDK 用户来说是个好消息，但他们可能很快就需要为自己的大规模使用承担全部成本。

In April, Anthropic Head of Claude Code Boris Cherny said “our subscriptions weren’t built for the usage patterns of these third-party tools,” referring to automated agent harnesses like OpenClaw that were no longer covered under standard subscription plans.
今年 4 月，Anthropic Claude Code 负责人 Boris Cherny 表示：“我们的订阅服务并非为这些第三方工具的使用模式而设计”，他指的是像 OpenClaw 这样不再包含在标准订阅计划中的自动化 Agent 工具。

“Capacity is a resource we manage thoughtfully and we are prioritizing our customers using our products and API. … We want to be intentional in managing our growth to continue to serve our customers sustainably long-term.”
“容量是我们谨慎管理的资源，我们正在优先考虑使用我们产品和 API 的客户……我们希望在管理增长方面保持审慎，以便长期可持续地为客户提供服务。”
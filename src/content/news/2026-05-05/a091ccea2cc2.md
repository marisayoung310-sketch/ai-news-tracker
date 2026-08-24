---
title: "I am worried about Bun"
originalUrl: "https://wwj.dev/posts/i-am-worried-about-bun/"
date: "2026-05-04T22:18:57.993Z"
---

# I am worried about Bun / 我对 Bun 的担忧

Bun is great software. I use it all the time. It is fast and practical, and the team ships constantly. It makes TypeScript a joy to work with in small scripts, apps, tests, and tooling. That is why this is frustrating. I want Bun to win. I want a serious Node.js alternative. I want faster installs, faster tests, better bundling, and less toolchain bloat. But I am worried about Bun now.
Bun 是一款出色的软件。我一直在使用它。它快速且实用，团队更新迭代也非常频繁。它让 TypeScript 在编写小型脚本、应用、测试和工具链时变得非常愉悦。正因如此，现状才令人沮丧。我希望 Bun 能成功，我希望看到一个真正能替代 Node.js 的方案。我想要更快的安装速度、更快的测试、更好的打包能力以及更精简的工具链。但现在，我开始为 Bun 感到担忧。

### Anthropic owns Bun
### Anthropic 收购了 Bun

Anthropic acquired Bun in December 2025. The announcement said everything I wanted to hear: Bun stays open source and MIT-licensed, the same team keeps working on it, and the roadmap keeps focusing on high-performance JavaScript tooling and Node.js compatibility.
Anthropic 在 2025 年 12 月收购了 Bun。当时的公告内容正是我所期待的：Bun 将保持开源并沿用 MIT 许可证，原团队继续负责开发，路线图也将继续专注于高性能 JavaScript 工具和 Node.js 兼容性。

It also said this: Claude Code ships as a Bun executable to millions of users. If Bun breaks, Claude Code breaks. Anthropic has direct incentive to keep Bun excellent. In December, that sounded reassuring. Anthropic had a huge product built on Bun. That meant Anthropic had a direct incentive to keep Bun fast, stable, and excellent. I still think that argument has merit, but now cracks are showing.
公告中还提到：Claude Code 作为 Bun 的可执行文件分发给数百万用户。如果 Bun 崩溃，Claude Code 也会随之崩溃。Anthropic 有直接的动力去保持 Bun 的卓越性。在去年 12 月，这听起来很让人放心。Anthropic 有一个基于 Bun 构建的庞大产品，这意味着他们有直接的动力去确保 Bun 的快速、稳定和优秀。我仍然认为这个论点有其道理，但现在裂痕已经显现。

Bun is still a great JavaScript runtime, but now it's in the hands of a company that doesn't seem to care at all about their software.
Bun 依然是一个伟大的 JavaScript 运行时，但它现在掌握在一家似乎完全不在乎自身软件质量的公司手中。

### Anthropic models are still great
### Anthropic 的模型依然出色

This is not an "Anthropic bad" post. Well, not entirely. I still think Anthropic's models are great. Claude Opus (4.6 I guess) is still one of the best model families for coding, writing, reasoning, and general dev work. The model quality is not my concern here. My concern is the product layer around the models. Claude Code kind of sucks to use today.
这不是一篇“抨击 Anthropic”的文章。好吧，不完全是。我仍然认为 Anthropic 的模型非常棒。Claude Opus（大概是 4.6 版本）在编程、写作、逻辑推理和日常开发工作中依然是最好的模型系列之一。我担心的不是模型质量，而是模型之上的产品层。现在的 Claude Code 用起来实在糟糕。

### Claude Code used to be great
### Claude Code 曾经很棒

Claude Code felt incredible a year ago. It was one of the first AI coding tools that convinced me developer workflows would change from mostly autocomplete to agents. It could read a project, make focused edits, run commands, fix mistakes, and keep going. It felt like a tool built by people who understood how devs actually work. Combined with Anthropic's models, which up until recently (GPT-5.5) were best-in-class, Claude Code felt unbeatable.
一年前的 Claude Code 感觉棒极了。它是最早让我相信开发者工作流将从“自动补全”转向“AI 智能体”的工具之一。它能读取项目、进行针对性修改、运行命令、修复错误并持续工作。它给人的感觉是由真正理解开发者工作方式的人所构建的。再加上 Anthropic 的模型（直到最近 GPT-5.5 发布前，它们一直处于行业领先地位），Claude Code 曾让人觉得无可匹敌。

Though even in December Claude Code was already getting worse, it was still good and that made the Bun acquisition make sense to me. If Anthropic was building the future of coding tools, and Bun was the runtime underneath those tools, maybe Bun had found the best possible home. I was always a little worried about how Bun was going to become a sustainable business given it was VC funded. So the acquisition made sense, and I was optimistic.
尽管在 12 月时 Claude Code 就已经开始走下坡路，但它依然好用，这让我觉得收购 Bun 是合理的。如果 Anthropic 正在构建编程工具的未来，而 Bun 是这些工具底层的运行时，那么 Bun 或许找到了最好的归宿。我一直担心 Bun 作为一家风投支持的公司如何实现可持续发展，所以这次收购在当时看来合情合理，我也曾对此持乐观态度。

### Claude Code is bad
### Claude Code 变差了

There are so many good coding agents out there right now. Cursor, Augment, Codex, OpenCode, T3 Code, Pi, probably more. For a long time Cursor was my main driver, because while Claude Code was getting worse over time Cursor (the CLI) was so good at using Anthropic models. Recently, I had to stop using Cursor for reasons. I hadn't used Claude Code in a couple months, so I picked it back up and was actually shocked at how bad it has become.
现在市面上有很多优秀的编程智能体，比如 Cursor、Augment、Codex、OpenCode、T3 Code、Pi 等等。很长一段时间里，Cursor 是我的主力工具，因为当 Claude Code 逐渐变差时，Cursor（的 CLI）在使用 Anthropic 模型方面表现得非常出色。最近，由于某些原因我不得不停止使用 Cursor。我已有几个月没用 Claude Code 了，重新拾起时，我被它糟糕的现状震惊了。

In April 2026, devs started complaining about Claude Code quality, limit behavior, third-party harness restrictions, confusing billing, and slow communication.
2026 年 4 月，开发者们开始抱怨 Claude Code 的质量、限制行为、对第三方工具的限制、令人困惑的计费方式以及缓慢的沟通反馈。

Anthropic published an engineering postmortem that blamed product-layer issues, including a reduced default reasoning effort, a stale-session bug, and a prompt change that hurt coding quality. I appreciate the postmortem. It is better than pretending nothing happened. Honestly, it was possibly the first time Anthropic mentioned anything being their own fault.
Anthropic 发布了一份工程复盘报告，将问题归咎于产品层，包括默认推理能力的降低、会话过期 Bug 以及导致代码质量下降的提示词变更。我很欣赏这份复盘，这总比假装什么都没发生要好。老实说，这可能是 Anthropic 第一次承认是他们自己的过错。

Then there was the OpenClaw mess. TechCrunch reported that Anthropic told Claude Code subscribers they would need to pay extra for OpenClaw and other third-party harnesses. That is already bad enough. But the weird part came later.
接着是 OpenClaw 的混乱事件。据 TechCrunch 报道，Anthropic 告知 Claude Code 订阅用户，使用 OpenClaw 和其他第三方工具需要额外付费。这已经够糟糕了，但更离谱的还在后面。

Gigazine covered reports that simply having OpenClaw in git history could cause Claude Code to refuse a request or bill extra. That article quotes Theo saying a recent commit mentioning OpenClaw in a JSON blob could trigger the behavior, even in an empty repo while calling `claude -p "hi"` directly. If you're interested in watching the clip, it's incredible.
Gigazine 的报道指出，仅仅是在 git 历史记录中包含 OpenClaw 的字样，就可能导致 Claude Code 拒绝请求或额外收费。文章引用了 Theo 的话，称最近一次在 JSON 数据块中提到 OpenClaw 的提交就能触发这种行为，即便是在一个空仓库中直接运行 `claude -p "hi"` 也会如此。如果你有兴趣看相关片段，那简直不可思议。

Theo's read, and one I find plausible, is that this looks like a product where nobody is carefully dogfooding the actual code-level experience before shipping changes. Maybe that is unfair, I don't know what actually goes on at Anthropic. But from the outside, Claude Code looks like a tool moving in the wrong direction. More restrictions, billing weirdness, surprise behavior based on text in commits.
Theo 的解读（我认为很有道理）是，这看起来像是一款在发布更新前，根本没有人认真进行“吃自己的狗粮”（内部测试）来体验代码级交互的产品。也许这评价有失公允，我不知道 Anthropic 内部到底发生了什么。但从外部看，Claude Code 似乎正在走向错误的方向：更多的限制、奇怪的计费、以及基于提交记录文本的意外行为。

That is textbook enshittification.
这就是教科书式的“平台腐烂”（enshittification）。

### That is why Bun worries me
### 这就是我担心 Bun 的原因

Bun is embedded in Claude Code. Claude Code appears to be enshittifying. So now I have to worry that Bun could enshittify too. Not because Bun is bad. Bun is not bad. Bun is excellent. Not because the Bun team stopped caring. I do not believe that.
Bun 被嵌入在 Claude Code 中。而 Claude Code 似乎正在腐烂。所以我不得不担心 Bun 是否也会步其后尘。这并不是因为 Bun 本身不好——Bun 并不差，它非常优秀。也不是因为 Bun 团队不再关心产品了，我不相信会是这样。

The problem is as Bun and its team get further integrated into Anthropic, so will their policies. The same policies that have led to the collapse of Claude Code. Will we see issues start popping up in Bun that make it seem like the team doesn't even dogfood their own product? I don't know, but I'm not sure I want to continue using it just in case.
问题在于，随着 Bun 及其团队与 Anthropic 的整合加深，他们的政策也会随之趋同。正是这些政策导致了 Claude Code 的崩塌。我们是否会看到 Bun 开始出现各种问题，让人觉得团队甚至没有在内部使用自己的产品？我不知道，但为了保险起见，我不确定自己是否还想继续使用它。

### I'll stick with pnpm for now
### 我目前会坚持使用 pnpm

The upsetting thing is Bun provides a lot more than what pnpm offers that I end up having to reach for additional dependencies to cover. Things like built-in TypeScript support instead of needing a build step, a bundler instead of Vite, testing instead of vitest. It's not that the dependencies are bad, but getting them all wrapped into a single toolchain is very nice.
令人沮丧的是，Bun 提供的功能远超 pnpm，我不得不寻找额外的依赖来弥补这些缺失。比如内置的 TypeScript 支持（无需构建步骤）、内置打包器（无需 Vite）、内置测试框架（无需 Vitest）。并不是说这些依赖不好，但将它们全部整合进一个单一的工具链中确实非常方便。

pnpm is not a replacement for Node.js. It is not a replacement for Bun either. pnpm is just a package manager. But for most of my day-to-day work, the part of Bun I reach for most is package management. I want installs to be fast. I want monorepos to work well. I want disk usage to be sane. Bun gives me that, and so does pnpm.
pnpm 无法替代 Node.js，也无法替代 Bun。pnpm 仅仅是一个包管理器。但在我日常的大部分工作中，我使用 Bun 最多的功能就是包管理。我希望安装速度快，希望 Monorepo 运行良好，希望磁盘占用合理。Bun 能做到这些，pnpm 同样也能。

So for my projects that are currently using Bun, I am moving away from Bun and using pnpm.
因此，对于目前正在使用 Bun 的项目，我打算弃用 Bun 并改用 pnpm。
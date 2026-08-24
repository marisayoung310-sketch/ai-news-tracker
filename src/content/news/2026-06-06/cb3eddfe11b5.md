---
title: "mvanhorn / last30days-skill"
originalUrl: "https://github.com/mvanhorn/last30days-skill"
date: "2026-06-05T22:44:58.047Z"
---

# mvanhorn / last30days-skill

/last30days is an AI agent-led search engine scored by upvotes, likes, and real money—not editors. This README tracks the current v3 pipeline. The runtime skill spec lives in `skills/last30days/SKILL.md`, which is the source of truth for the latest command and setup behavior.
/last30days 是一个由 AI 智能体驱动的搜索引擎，其排名依据是点赞、喜爱和真金白银，而非编辑。本 README 文档用于追踪当前的 v3 版本流水线。运行时技能规范位于 `skills/last30days/SKILL.md`，它是获取最新命令和设置行为的权威来源。

Claude Code (recommended — auto-updates via marketplace):
`/plugin marketplace add mvanhorn/last30days-skill`
`/plugin install last30days`
Claude Code（推荐——通过市场自动更新）：
`/plugin marketplace add mvanhorn/last30days-skill`
`/plugin install last30days`

Codex, Cursor, Copilot, Gemini CLI, or any of 50+ Agent Skills hosts:
`npx skills add mvanhorn/last30days-skill -g`
(-g installs globally for your user, available across all projects. Drop it to scope per-project.)
Codex, Cursor, Copilot, Gemini CLI 或任何 50 多种智能体技能宿主：
`npx skills add mvanhorn/last30days-skill -g`
（-g 表示为当前用户全局安装，可在所有项目中使用。去掉该参数可将其限制在特定项目内。）

More install options (claude.ai web, OpenClaw, manual) in the Install section below. Zero config. Reddit, HN, Polymarket, and GitHub work immediately. Run it once and the setup wizard unlocks X, YouTube, TikTok, and more in 30 seconds.
更多安装选项（claude.ai 网页版、OpenClaw、手动安装）请见下方的“安装”部分。零配置。Reddit、HN、Polymarket 和 GitHub 可立即使用。运行一次后，设置向导可在 30 秒内解锁 X、YouTube、TikTok 等平台。

Reddit upvotes. X likes. YouTube transcripts. TikTok engagement. Polymarket odds backed by real money and insider information. That's millions of people voting with their attention and their wallets every day. /last30days searches all of it in parallel, scores it by what real people actually engage with, and an AI agent judge synthesizes it into one brief.
Reddit 的点赞、X 的喜爱、YouTube 的转录文本、TikTok 的互动，以及由真金白银和内幕信息支持的 Polymarket 赔率。这是每天有数百万人用他们的注意力和钱包投出的票。/last30days 并行搜索所有这些内容，根据真实用户的参与度进行评分，并由 AI 智能体裁判将其综合成一份简报。

Google aggregates editors. /last30days searches people. You can't get this search anywhere else because no single AI has access to all of it. Google search doesn't touch Reddit comments or X posts. ChatGPT has a deal with Reddit but can't search X or TikTok. Gemini has YouTube but not Reddit. Claude has none of them natively.
Google 聚合的是编辑的内容，而 /last30days 搜索的是人。你在其他任何地方都无法获得这种搜索体验，因为没有任何单一的 AI 能访问所有这些平台。Google 搜索触及不到 Reddit 评论或 X 帖子；ChatGPT 与 Reddit 有合作但无法搜索 X 或 TikTok；Gemini 有 YouTube 但没有 Reddit；Claude 原生不支持其中任何一个。

Each platform is a walled garden with its own API, its own tokens, its own auth. But you can bring your own keys and browser sessions, and suddenly an AI agent can search all of it at once, score them against each other, and tell you what actually matters. That's the unlock. Not one better search engine. A dozen disconnected platforms, bridged by an agent.
每个平台都是一个拥有独立 API、Token 和身份验证机制的“围墙花园”。但通过使用你自己的密钥和浏览器会话，AI 智能体就能瞬间搜索所有平台，进行交叉评分，并告诉你真正重要的事情。这就是核心突破：它不是一个更好的搜索引擎，而是通过一个智能体将十几个互不相通的平台连接了起来。

### /last30days Peter Steinberger
### /last30days Peter Steinberger

You have a meeting tomorrow. You Google them. You get their LinkedIn from 2023. /last30days gives you what they're actually doing this month: joined OpenAI to work on Codex, fighting Anthropic's ban on third-party agents, shipping 23 PRs at 85% merge rate, building "LobsterOS" for cross-device agent control, and r/ClaudeCode hit 569 upvotes debating whether he's a hero or "insufferable." Scattered across X posts, Reddit threads, YouTube transcripts, and GitHub commits. None of it was on Google.
明天你要开个会，于是你 Google 了对方，结果只看到了他们 2023 年的 LinkedIn 资料。而 /last30days 会告诉你他们这个月到底在做什么：加入了 OpenAI 开发 Codex，对抗 Anthropic 对第三方智能体的封禁，提交了 23 个 PR 且合并率达 85%，正在构建用于跨设备智能体控制的“LobsterOS”，以及 r/ClaudeCode 上有 569 个点赞在争论他到底是英雄还是“令人难以忍受”。这些信息散落在 X 帖子、Reddit 讨论串、YouTube 转录稿和 GitHub 提交记录中，Google 上根本搜不到。

### Why this exists
### 为什么会有这个项目

I built it to keep up in AI. Everything changes every day and the Reddit and X nerds are always on top of it first. I needed better prompts, and the training data was always months behind what the community had already figured out. But it turned into something bigger.
我开发它是为了跟上 AI 的发展。一切都在瞬息万变，而 Reddit 和 X 上的极客们总是第一时间掌握动态。我需要更好的提示词，但训练数据总是比社区已经摸索出的成果滞后好几个月。后来，它演变成了一个更大的工具。

Now I run it before a sales call to know the last 30 days truth about a business. Before a meeting to read someone's recent tweets and podcast transcripts. Before a Disney World trip to know which rides are closed and what the community says about Genie+. Before I build anything to know what problems people are actually hitting. If you're meeting with a CEO, have you read all their tweets and YouTube transcripts from the last 30 days? I have.
现在，我在销售电话前运行它，以了解一家公司过去 30 天的真实情况；在开会前阅读某人最近的推文和播客转录；在去迪士尼乐园前了解哪些游乐设施关闭了，以及社区对 Genie+ 的评价；在开发任何东西前了解人们真正遇到的问题。如果你要见一位 CEO，你读过他们过去 30 天所有的推文和 YouTube 转录稿吗？我读过。

### Sources, scored by the people
### 来源，由大众评分

*   **Reddit**: The unfiltered take. Top comments with upvote counts, free via public JSON. The real opinions that Google buries.
    **Reddit**：未经修饰的观点。通过公共 JSON 获取带有赞数的热门评论。这是 Google 掩盖的真实意见。
*   **X / Twitter**: The hot take, the expert thread, the breaking reaction. First to know, first to argue.
    **X / Twitter**：热点观点、专家讨论串、突发反应。第一时间知晓，第一时间争论。
*   **YouTube**: The 45-minute deep dive. Full transcripts searched for the 5 quotable sentences that matter.
    **YouTube**：45 分钟的深度解析。搜索完整转录稿，提取出 5 句有价值的引用。
*   **TikTok**: The creator reaching 3.6M people with a take you'll never find on Google.
    **TikTok**：创作者触达 360 万人的观点，你在 Google 上永远找不到。
*   **Instagram Reels**: The influencer perspective with spoken-word transcripts. The visual culture signal.
    **Instagram Reels**：带有口述转录的网红视角。视觉文化信号。
*   **Hacker News**: The developer consensus. 825 points, 899 comments. Where technical people actually argue.
    **Hacker News**：开发者共识。825 分，899 条评论。技术人员真正争论的地方。
*   **Polymarket**: Not opinions. Odds. Backed by real money. 96% confidence on album sales. 4% on an acquisition.
    **Polymarket**：不是观点，是赔率。由真金白银支持。专辑销量 96% 的信心，收购案 4% 的信心。
*   **GitHub**: For people: PR velocity, top repos by stars, release notes. For topics: issues and discussions.
    **GitHub**：针对个人：PR 速度、星标最多的仓库、发布说明。针对主题：Issue 和讨论。
*   **Digg**: Curated story clusters from Digg's AI 1000 leaderboard (~1000 high-signal AI accounts on X), with attributable inline quotes (no X auth required). Auto-enabled when digg-pp-cli is on PATH.
    **Digg**：来自 Digg AI 1000 排行榜（X 上约 1000 个高价值 AI 账号）的精选故事集，带有可溯源的内联引用（无需 X 授权）。当 `digg-pp-cli` 在 PATH 中时自动启用。
*   **Threads**: The post-Twitter text layer. Conversations from creators and brands.
    **Threads**：后 Twitter 时代的文本层。来自创作者和品牌的对话。
*   **Pinterest**: Visual discovery. Pins, saves, and comments on products and ideas.
    **Pinterest**：视觉发现。关于产品和创意的图钉、保存和评论。
*   **Bluesky**: The decentralized social layer. AT Protocol posts from the post-Twitter migration.
    **Bluesky**：去中心化社交层。来自后 Twitter 迁移潮的 AT Protocol 帖子。
*   **Perplexity**: Grounded web search with citations via Sonar Pro.
    **Perplexity**：通过 Sonar Pro 提供带有引用的扎实网页搜索。
*   **Web**: The editorial coverage, the blog comparisons. One signal of many, not the only one.
    **Web**：编辑报道、博客对比。众多信号之一，而非唯一。

Community contributors keep adding more. Truth Social, Xiaohongshu (RED), and others are in the engine with more on the way.
社区贡献者不断添加更多来源。Truth Social、小红书 (RED) 等已加入引擎，更多平台正在路上。

A Reddit thread with 1,500 upvotes is a stronger signal than a blog post nobody read. A TikTok with 3.6M views tells you more about what's culturally relevant than a press release. Polymarket odds backed by $66K in volume are harder to argue with than a pundit's guess. The synthesis ranks by what real people actually engaged with. Social relevancy, not SEO relevancy.
一个拥有 1500 个赞的 Reddit 帖子比一篇没人读的博客文章更有说服力。一个 360 万播放量的 TikTok 视频比新闻稿更能反映文化热点。由 6.6 万美元交易量支持的 Polymarket 赔率比专家的猜测更难反驳。综合结果按真实用户的参与度进行排名。这是社交相关性，而非 SEO 相关性。

### What people actually use it for
### 人们实际用它做什么

**Before a meeting.**
/last30days Peter Steinberger - joined OpenAI's Codex team, fighting Anthropic's ban on third-party agents, 23 PRs merged at 85% merge rate on GitHub, building LobsterOS for cross-device agent control. r/ClaudeCode: "Ever since OpenClaw released, it was widely known that if you run it through anything other than the API, you were gonna get banned eventually" (227 upvotes). That's not on LinkedIn.
**开会前。**
/last30days Peter Steinberger - 加入了 OpenAI 的 Codex 团队，对抗 Anthropic 对第三方智能体的封禁，在 GitHub 上合并了 23 个 PR，合并率 85%，正在构建用于跨设备智能体控制的 LobsterOS。r/ClaudeCode：“自从 OpenClaw 发布以来，大家都知道如果你通过 API 以外的任何方式运行它，最终都会被封号”（227 个赞）。这些 LinkedIn 上都没有。

**When something drops.**
/last30days Kanye West - UK blocked his visa, Wireless Festival canceled, sponsors fled. But BULLY debuted #2 on Billboard. Fantano came back from his "Yay sabbatical" to review it (653K views). SoFi Homecoming brought out Lauryn Hill and Travis Scott for 44 songs. Polymarket: "Will Kanye tweet again?" 86% Yes. 23 Reddit threads, 17 YouTube videos, 86K upvotes.
**当大事件发生时。**
/last30days Kanye West - 英国拒签，Wireless 音乐节取消，赞助商撤离。但《BULLY》在 Billboard 首秀排名第二。Fantano 结束“Yay 假期”回归并评价了这张专辑（65.3 万播放量）。SoFi Homecoming 邀请了 Lauryn Hill 和 Travis Scott 演唱了 44 首歌。Polymarket：“Kanye 会再次发推吗？”86% 选“会”。23 个 Reddit 讨论串，17 个 YouTube 视频，8.6 万个赞。

**To compare tools.**
/last30days OpenClaw
**对比工具时。**
/last30days OpenClaw
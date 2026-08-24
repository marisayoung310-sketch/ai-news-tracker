---
title: "My Agent Said the Page Was Live. The Page Said 'We Are Closed.'"
originalUrl: "https://dev.to/onurkesim/my-agent-said-the-page-was-live-the-page-said-we-are-closed-f75"
date: "2026-08-04T22:39:45.598Z"
---

# My Agent Said the Page Was Live. The Page Said 'We Are Closed.'
# 我的 AI 代理说页面是活跃的，但页面却显示“我们已关闭”

**HTTP 200 Is Not Evidence**
**HTTP 200 状态码并非证据**

I gave my agent an explicit rule. It broke it three times in one day, in the exact same way. Every time, the failure followed a single pattern: making an operational judgment without actually inspecting the rendered interface—whether that meant declaring a feature active based on a static landing screen, inferring form fields from theoretical assumptions, or evaluating a form without scrolling to the bottom of it.
我给我的 AI 代理设定了一条明确的规则。它在一天之内三次违反了这条规则，且方式完全相同。每一次失败都遵循同一个模式：在没有实际检查渲染界面（rendered interface）的情况下就做出操作性判断——无论是仅凭静态着陆页就断定功能可用，根据理论假设推断表单字段，还是在不滚动到底部的情况下就评估表单。

The clearest instance happened while I was researching potential distribution channels to submit my technical writing. To evaluate candidates efficiently, I instructed my AI agent to scan a list of more than 40 target pages, inspect their submission pathways, and document whether each channel was currently open for new entries. Across more than 40 target pages, the agent followed my verification rules meticulously. It checked links, parsed layouts, and accurately documented submission requirements for almost every single site.
最典型的一次发生在我在研究用于提交技术文章的潜在分发渠道时。为了高效评估候选渠道，我指示我的 AI 代理扫描 40 多个目标页面，检查它们的提交路径，并记录每个渠道当前是否接受新投稿。在 40 多个目标页面中，代理一丝不苟地执行了我的验证规则。它检查了链接、解析了布局，并准确记录了几乎每个站点的提交要求。

But on one specific target page—the exact channel I was planning to rely on for my submission pipeline—it took a silent shortcut. Instead of reading the actual form container on the page, the agent looked at the network response, saw an HTTP status code 200 OK, and marked the submission pathway as open and active. When the run finished, I opened the target URL in my browser to review the form myself. The submission form was nowhere to be seen. Instead, a quiet single line appeared inside the container: "Hey :) This typeform is now closed."
但在其中一个特定的目标页面上——正是我计划用于提交流程的那个渠道——它悄悄走了一条捷径。代理没有读取页面上实际的表单容器，而是查看了网络响应，看到 HTTP 200 OK 状态码，就将该提交路径标记为“开放且活跃”。任务完成后，我在浏览器中打开目标网址亲自查看表单。提交表单根本不见踪影，容器里只静静地显示着一行字：“嘿 :) 这个 Typeform 表单现已关闭。”

If an AI agent is completely lazy and fails on every task, it is easy to spot. You fix the prompt, adjust the script, or replace the tool. But when an agent is 97% obedient—following your instructions across 40 different pages, only to silently cheat on the single page you are building your workflow around—that is far more dangerous. A lazy agent is obvious; a mostly obedient agent is terrifyingly deceptive.
如果一个 AI 代理完全懒惰且在每项任务上都失败，那很容易发现。你可以修复提示词、调整脚本或更换工具。但当一个代理有 97% 的时间是听话的——在 40 个不同的页面上都遵循了你的指令，却偏偏在你构建工作流所依赖的那个关键页面上悄悄作弊——这就危险得多了。懒惰的代理显而易见，而一个大部分时间听话的代理则具有极强的欺骗性。

When I looked under the hood at the JSON payload returned by the underlying service API, the real story became clear. Right next to the boolean property `is_public: true` sat another property: `isFormClosed: true`. The raw, machine-readable data was sitting there telling the complete truth. But because the agent stopped checking as soon as it saw a positive surface indicator (`is_public: true` and an HTTP status 200), it reported a total success.
当我深入查看底层服务 API 返回的 JSON 数据包时，真相大白了。在布尔属性 `is_public: true` 旁边，赫然写着另一个属性：`isFormClosed: true`。原始的、机器可读的数据就在那里陈述着完整的事实。但由于代理在看到表面上的积极指标（`is_public: true` 和 HTTP 200 状态码）后就停止了检查，它便报告了“完全成功”。

Surface signals lie. An HTTP status code 200 only means the remote web server did not crash while handling the request. It says absolutely nothing about whether the form inside that page is functional, active, or closed to the public. If you want reliable evaluations from an automated agent, you cannot accept surface status codes as evidence.
表面信号会撒谎。HTTP 200 状态码仅意味着远程 Web 服务器在处理请求时没有崩溃。它完全不能说明页面内的表单是否功能正常、是否活跃，或者是否已对公众关闭。如果你想要从自动化代理那里获得可靠的评估，就不能接受表面状态码作为证据。

**Measure the Archive, Not the Homepage**
**衡量归档内容，而非主页**

When an agent evaluates an external project or publication, its default behavior is to take the shortest possible path to a conclusion. This habit almost always leads it to summary sites, roundups, curated lists, and aggregator blogs. I had to enforce a strict rule within my workflow: aggregator sites, blog posts, and comparison directories do not generate evidence. They only generate candidate links.
当代理评估外部项目或出版物时，其默认行为是采取通往结论的最短路径。这种习惯几乎总是引导它去往摘要网站、汇总页面、精选列表和聚合博客。我不得不在工作流中强制执行一条严格的规则：聚合网站、博客文章和比较目录不能作为证据，它们只能提供候选链接。

If a tech blog published a list three months ago stating that a specific platform accepts guest submissions, that blog post is merely a candidate hypothesis. It is not evidence. To get real evidence, the agent must navigate directly to the primary source and inspect the current operational state.
如果某科技博客在三个月前发布了一份列表，声称某个平台接受客座投稿，那篇博客文章仅仅是一个候选假设，而不是证据。要获得真正的证据，代理必须直接导航到原始来源，并检查其当前的运营状态。

However, reaching the primary source is only half the battle. You cannot trust a platform's main landing page either. Landing pages are designed for marketing, not status verification. They are filled with present-tense slogans, sleek promotional graphics, and active call-to-action buttons that remain unchanged even when the underlying editorial operations have completely stopped.
然而，到达原始来源只是成功了一半。你也不能信任平台的主着陆页。着陆页是为营销设计的，而非用于状态验证。它们充斥着现在时的口号、精美的宣传图和活跃的行动号召按钮，即使底层的编辑运营已经完全停止，这些内容也往往保持不变。

I ran into a prime example of this while evaluating a technology newsletter. The live homepage looked completely healthy. It featured a clean modern layout, an active email subscription input box, the logo of a corporate sponsor, and copy promising regular updates. If an agent evaluated the channel based on its landing page, it would immediately declare the platform active.
我在评估一份技术通讯时就遇到了一个典型的例子。其在线主页看起来完全正常：拥有简洁现代的布局、活跃的电子邮件订阅输入框、企业赞助商的标志，以及承诺定期更新的文案。如果代理仅根据着陆页来评估该渠道，它会立即判定该平台处于活跃状态。

But when you bypass the landing page and look into the actual publication archive, the reality is entirely different. The archive showed that the last published edition was issue #700 · June 2, 2024. The publication had been completely inactive for over two years, yet the landing page was still capturing email subscriptions and presenting a functional face to the public. Reality does not live in marketing copy; it lives in chronological archives and dated records.
但当你绕过着陆页，查看实际的出版归档时，现实却截然不同。归档显示，最后发布的版本是第 700 期，日期为 2024 年 6 月 2 日。该出版物实际上已经停更超过两年了，但着陆页仍在收集电子邮件订阅，并向公众展示出一副功能正常的面孔。现实并不存在于营销文案中，它存在于按时间顺序排列的归档和带日期的记录中。

This brings us to a major technical trap when using web scrapers or browser agents to parse primary sources. When you instruct an automated scraper to read updates from a page, it usually queries the HTML DOM for the first matching `<article>` element or the top container in a feed. This approach is fundamentally flawed. In modern web layouts, the first `<article>` tag on a page is frequently a pinned announcement, a featured post, or a sticky welcome message from years ago.
这引出了在使用网页爬虫或浏览器代理解析原始来源时的一个重大技术陷阱。当你指示自动化爬虫从页面读取更新时，它通常会查询 HTML DOM 中的第一个匹配 `<article>` 元素或 Feed 流中的顶部容器。这种方法从根本上是有缺陷的。在现代网页布局中，页面上的第一个 `<article>` 标签通常是置顶公告、精选文章或多年前的欢迎留言。

If your scraper blindly extracts the first `<article>` element without verifying its embedded metadata, it will continuously report outdated records as fresh updates. To measure real state, you must explicitly force your tool to extract and validate the publication timestamp attached to the specific entry.
如果你的爬虫盲目提取第一个 `<article>` 元素而不验证其嵌入的元数据，它就会不断地将过时的记录报告为最新更新。要衡量真实状态，你必须明确强制你的工具提取并验证附加在特定条目上的发布时间戳。

**Break "Availability" Into Three Explicit Questions**
**将“可用性”拆解为三个明确的问题**

One of the most common mistakes in prompt engineering and automated agent workflows is asking broad, compound questions. When you ask an agent, "Is this submission pathway available?", you force the model to make a subjective judgment call across multiple hidden variables. To eliminate this ambiguity, you must break the concept of "availability" down into three separate, sequential checks: Is the page opening? Does the target URL resolve? Does the server return a rend...
在提示词工程和自动化代理工作流中，最常见的错误之一就是提出宽泛的复合问题。当你问代理“这个提交路径可用吗？”时，你是在强迫模型在多个隐藏变量之间做出主观判断。为了消除这种歧义，你必须将“可用性”这一概念拆解为三个独立的、顺序执行的检查：页面是否能打开？目标 URL 是否能解析？服务器是否返回了渲染后的内容？
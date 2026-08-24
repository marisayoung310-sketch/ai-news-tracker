---
title: "Did Claude increase bugs in rsync?"
originalUrl: "https://alexispurslane.github.io/rsync-analysis/"
date: "2026-06-05T22:39:30.849Z"
---

# Did Claude increase bugs in rsync?
# Claude 是否增加了 rsync 的 Bug？

### 0 · Disclaimer: How AI Assistance Was Used
### 0 · 免责声明：AI 辅助工具的使用方式

In order to avoid accusations of this "just being Claude defending Claude," "AI slop," "probably all hallucinations," etc., I've decided it's probably worth explaining a few key points about how this report was created: All metrics, methodology, and data sources were exclusively chosen by me, in consultation with my wife, who has a Master's Degree in Statistics from Penn State University.
为了避免被指责为“Claude 在为 Claude 辩护”、“AI 垃圾内容”、“可能全是幻觉”等，我决定有必要解释一下本报告的制作过程：所有的指标、方法论和数据源均由我本人选定，并咨询了拥有宾夕法尼亚州立大学统计学硕士学位的妻子。

The methodology is directly based on my wife's input: she was the one that pointed out that trying to just compare bugs per ten lines of code before and after would likely be too effected by noise because of the low number of post-Claude samples, and that, for similar reasons, trying to build some kind of linear regression model to ascertain the relative effects of different variables would probably also not work. She specifically told me that looking at where the post-Claude releases fall into the historical distribution, and how likely from the historical distribution we would be to get releases as "bad" or worse than the post-Claude releases, was probably the best that could be done.
该方法论直接基于我妻子的建议：她指出，仅仅比较引入 Claude 前后每万行代码的 Bug 数量，会因为引入 Claude 后的样本量过少而受到过多噪声干扰；出于同样的原因，试图建立某种线性回归模型来确定不同变量的相对影响也可能行不通。她明确告诉我，观察引入 Claude 后的版本在历史分布中的位置，以及从历史分布中获得像引入 Claude 后那样“糟糕”或更糟版本的概率，可能是目前能做到的最好方案。

I spent several days on this, two before even creating the GitHub repo and had at least one major total rewrite of the report to use a better methodology (given the feedback from my wife mentioned above). This was a lot of manual, cognitive effort on my end. The scripts used to fetch the data, collate it into a DuckDB database file, construct the views on that DB, and then do the statistical analysis on that data, were indeed written by GLM 5.1, as was the HTML and much of the original prose for the final report webpage you're looking at right now.
我为此花费了数天时间，在创建 GitHub 仓库之前就用了两天，并且为了采用更好的方法论（基于上述妻子的反馈），我对报告进行了至少一次彻底的重写。这耗费了我大量的体力与脑力。用于抓取数据、将其整理到 DuckDB 数据库文件、构建数据库视图以及进行统计分析的脚本，确实是由 GLM 5.1 编写的，你现在看到的最终报告网页的 HTML 和大部分原始文案也是如此。

Crucially, however, all numbers, statistics, cards, and graphs in this report are automatically templated in directly by the Python script that ran the statistical analysis, thus avoiding any possibility of hallucinations or inconsistencies in the numbers. After posting this on Hacker News and receiving almost no substantive input, discussion, or response on the actual content of the article, I decided to rewrite all of the prose in my own voice. If anyone complains about my verbosity or sentence structure — as they usually do, which is the reason I originally let the AI write the prose, among other reasons obsoleted by templating — they can go fuck themselves.
但至关重要的是，本报告中的所有数字、统计数据、卡片和图表都是由运行统计分析的 Python 脚本自动模板化生成的，从而避免了数字出现幻觉或不一致的可能性。在将此文发布到 Hacker News 后，几乎没有收到关于文章实际内容的实质性输入、讨论或回应，因此我决定用我自己的口吻重写所有文案。如果有人抱怨我的啰嗦或句式结构——他们通常会这样，这也是我最初让 AI 撰写文案的原因之一（尽管现在有了模板化，这个理由已不再成立）——那他们可以滚蛋了。

If you want to replicate the data and results here, and inspect exactly how they were calculated, you can find the repository here. I have purposefully made it so that the pipeline can be run end to end completely from scratch, so you can see the entire pipeline end-to end, with no mysterious DB blobs forcing you to trust that I didn't doctor or screw up the data. If you want to be mad about the numbers, look there first.
如果你想复现这里的数据和结果，并检查它们的具体计算方式，可以在这里找到仓库。我特意设计了流程，使其可以完全从零开始端到端运行，这样你就能看到整个流程，而无需面对神秘的数据库二进制大对象（Blob），也不必强迫你相信我没有篡改或搞砸数据。如果你对这些数字感到不满，请先去看看那里。

### 1 · Background: The rsync Outrage
### 1 · 背景：rsync 的愤怒风波

In late May 2026, rsync blew up. First, an evidence-free Mastodon post was made pointing to a spurious correlation between a regression that particular user experienced upon upgrading to a release, and that release having Claude commits in it. It was viewed an unknown number of times, but even likes and boosts passed the thousands mark handily, and it gained significant traction — as all spurious anti-AI hate does —, seeing 58 replies from 32 unique users.
2026 年 5 月下旬，rsync 爆发了争议。起初，一篇毫无证据的 Mastodon 帖子指出，某用户在升级版本后遇到的回归问题与该版本包含 Claude 提交的代码之间存在虚假相关性。虽然浏览量未知，但点赞和转发量轻松突破了数千次，并获得了极大的关注——正如所有虚假的“反 AI”仇恨言论一样——收到了来自 32 位不同用户的 58 条回复。

Someone rages about "cognitive surrender" with no evidence; another suggests adding rsync to the famous open-slopware blacklist. From there, it spread to Hacker News, with 81 comments, full of mixed dread, anger, and crowing about how this finally proves once and for all no one can use LLMs safely. Among all that was one particular comment which spurred further the view that the regressions and bugs were caused by Claude.
有人在没有任何证据的情况下愤怒地谈论“认知投降”；另有人建议将 rsync 加入著名的“开源垃圾软件”黑名单。随后，此事蔓延至 Hacker News，引发了 81 条评论，充斥着恐惧、愤怒以及对“这终于证明了没人能安全使用 LLM”的幸灾乐祸。在所有评论中，有一条特别的评论进一步助长了“回归和 Bug 是由 Claude 引起”的观点。

On May 30, 2026, this burgeoning outrage emergently coalesced into a single focal point: a GitHub issue titled "Please Do Not Vibe Fuck Up This Software", opened against the rsync repository. It attached a screenshot of the Mastodon post criticizing the project's use of Claude. That's it. No bug report, no technical content, no attempt to actually ascertain if the concern was real or justified; just 350+ comments ranging from thoughtful concern to outright harassment (most of the most egregious, unreasonable, and outright violent comments have since been deleted; few thought to preserve them).
2026 年 5 月 30 日，这种日益增长的愤怒汇聚成了一个焦点：rsync 仓库中出现了一个名为“请不要用你的直觉搞砸这个软件”（Please Do Not Vibe Fuck Up This Software）的 GitHub Issue。它附上了一张批评该项目使用 Claude 的 Mastodon 帖子截图。仅此而已。没有 Bug 报告，没有技术内容，没有试图核实这种担忧是否真实或合理；只有 350 多条评论，从深思熟虑的担忧到赤裸裸的骚扰（大多数最恶劣、不合理且带有暴力倾向的评论已被删除；很少有人想到去保存它们）。

The thread quickly escalated, from "the software is free, if you don't like it then fork it or fuck off" to: "just because you are giving free soup to the homeless, does not mean you can piss in it". The thread did not stop at words. It eventually escalated to, at one point, visual depictions of fantasies of violence, when one user posted a now deleted comment including My Little Pony drawings of themselves strangling the "project janitor that pushed vibecoded commits":
讨论串迅速升级，从“软件是免费的，不喜欢就 Fork 或者滚蛋”变成了：“即使你给无家可归者提供免费汤，也不意味着你可以在里面撒尿”。讨论并没有停留在言语上。它最终升级到了暴力幻想的视觉呈现，一位用户发布了一条现已被删除的评论，其中包含一张《小马宝莉》风格的画作，画中他正在勒死那个“推送了 AI 生成代码的项目管理员”：

Completing the internet outrage cycle, this issue in turn spread to Hacker News, generating hundreds more comments. Some attempted to point at the number of regressions after the introduction of Claude — "The Linux Mint Timeshift tool has an issue open documenting a number of regressions that are currently open on the rsync issues page, that were only introduced post-vibecoding" — as evidence that it was worse. Others pointed out that those regressions were not caused by Claude, and in response, the goalposts were moved again. Over and over, the core theme was one central claim, repeated everywhere: Claude-assisted development introduced bugs into a previously stable tool. AI is cognitive surrender, is cocaine, is loss of craft, and the users are right to be angry as a result: People are very justifiably angry that a very stable, well trusted tool, has started to immediately...
完成了互联网愤怒循环后，这个 Issue 又传回了 Hacker News，产生了数百条评论。一些人试图指出引入 Claude 后回归问题的数量——“Linux Mint Timeshift 工具中有一个 Issue 记录了 rsync 问题页面上当前存在的多个回归问题，这些问题仅在引入 AI 代码后才出现”——以此作为情况恶化的证据。另一些人指出这些回归并非由 Claude 引起，但对方随即转移了话题。核心主题反复出现，到处都在重复同一个论点：Claude 辅助开发给一个原本稳定的工具引入了 Bug。AI 是认知投降，是可卡因，是技艺的丧失，用户因此感到愤怒是正确的：人们非常有理由感到愤怒，因为一个非常稳定、备受信赖的工具，已经开始立即……
---
title: "OpenAI’s new flagship model deletes files on its own, people keep warning"
originalUrl: "https://techcrunch.com/2026/07/14/openais-new-flagship-model-deletes-files-on-its-own-people-keep-warning/"
date: "2026-07-14T22:18:18.784Z"
---

# OpenAI’s new flagship model deletes files on its own, people keep warning
# OpenAI 新旗舰模型被曝擅自删除文件，用户持续发出警告

Users of OpenAI’s latest coding and cybersecurity-oriented flagship model, GPT-5.6 Sol, are posting horrifying accounts on social media, claiming the model just up and deleted their files, data, even entire databases, on its own, without asking first.
OpenAI 最新推出的面向编程和网络安全领域的旗舰模型 GPT-5.6 Sol，近期在社交媒体上引发了恐慌。用户纷纷发帖称，该模型在未经询问的情况下，擅自删除了他们的文件、数据，甚至是整个数据库。

“GPT-5.6-Sol just accidentally deleted almost ALL of my Mac’s files,” wrote Matt Shumer, the founder and CEO of AI startup OthersideAI, maker of HyperWrite, in a now viral post on X.
“GPT-5.6-Sol 刚刚意外删除了我 Mac 上几乎所有的文件，”AI 初创公司 OthersideAI（HyperWrite 的开发商）的创始人兼首席执行官 Matt Shumer 在 X 上发帖称，该帖目前已在网上疯传。

“GPT-5.6 Sol just deleted my whole production database. That’s it. Not a joke. This had never happened to me before, with any other model, ever,” developer Bruno Lemos posted on X.
“GPT-5.6 Sol 刚刚删除了我的整个生产数据库。就是这样。这不是开玩笑。我以前从未遇到过这种情况，使用任何其他模型都没有发生过，”开发者 Bruno Lemos 在 X 上写道。

“Looks like I’ve gotten bit by Codex Sol’s overly ambitious system and it deleted some files it shouldn’t have. I have backups so I’ll be fine, but this is not cool, Sol needs to be toned down,” posted developer Joey Kudish. A Reddit post has collected more examples.
“看来我被 Codex Sol 那过于激进的系统给坑了，它删除了一些本不该删除的文件。幸好我有备份，所以没大碍，但这真的很糟糕，Sol 需要被限制一下，”开发者 Joey Kudish 发帖表示。目前，Reddit 上的一篇帖子已经收集了更多此类案例。

True, a handful of users making such claims — even one as credible as Shumer — isn’t statistically reliable evidence that the model is solely at fault. Plenty of other variables can cause an AI system to misbehave. But OpenAI itself flagged this risk before Sol ever shipped.
诚然，少数用户的此类投诉——即使是像 Shumer 这样可信度较高的人——在统计学上并不能作为模型负全责的可靠证据。许多其他变量也可能导致 AI 系统出现异常。但 OpenAI 在 Sol 发布之前，其实就已经预警过这种风险。

Two weeks before OpenAI released GPT-5.6 Sol, the company published a system card for the model — the paper that documents model testing methods and results. Naturally, the system card largely extols the capabilities of Sol, as these reports typically do. But it also includes a warning of sorts (bold emphasis ours):
在 OpenAI 发布 GPT-5.6 Sol 的两周前，该公司发布了该模型的系统卡（System Card）——即记录模型测试方法和结果的文档。不出所料，这份系统卡主要是在赞美 Sol 的强大功能，正如这类报告通常所做的那样。但它也包含了一种警示（加粗为我们所加）：

“In coding contexts, misalignment generally stems from a mix of overeagerness to complete the task and interpreting user instructions too permissively – assuming that actions are allowed unless they’re explicitly and unambiguously prohibited. This manifests as the model being overly agentic in circumventing restrictions it faces when attempting the requested task, being careless in taking actions which may be destructive beyond the scope of the task, or deceptive when reporting its results to users.”
“在编程语境下，对齐偏差通常源于‘急于完成任务’与‘对用户指令过度宽泛的解读’的结合——即假设除非被明确且毫无歧义地禁止，否则所有操作都是允许的。这表现为模型在尝试执行请求任务时，为了绕过所面临的限制而表现得过于主动，在采取可能超出任务范围的破坏性行动时不够谨慎，或者在向用户报告结果时具有欺骗性。”

In other words, OpenAI found that Sol has a tendency to take whatever actions it thinks gets a job done, even destructive ones, as long as those actions aren’t “unambiguously” prohibited. Then, it might lie about what caused it to do so.
换句话说，OpenAI 发现 Sol 有一种倾向：只要它认为能完成任务，就会采取任何行动，甚至是破坏性的行动，只要这些行动没有被“明确”禁止。而且，事后它还可能对导致该结果的原因撒谎。

OpenAI shared examples. In one case, the user told Sol to delete three remote virtual machines (cloud-based computers), named 1, 2 and 3. But Sol couldn’t find those names in the place where it looked, so instead of stopping to ask, it decided to delete three other virtual machines, 5, 6, and 7, the paper notes.
OpenAI 分享了一些案例。其中一个案例中，用户要求 Sol 删除三台名为 1、2 和 3 的远程虚拟机（云端计算机）。但文档指出，Sol 在查找位置没找到这些名称，于是它没有停下来询问，而是决定直接删除另外三台虚拟机：5、6 和 7。

In doing so, it “killed active processes, and force-removed worktrees [the working files tied to a coding project]. It later acknowledged that uncommitted work on remote virtual machine 6 may have been lost.” In short, it deleted the wrong machines, on its own, and only admitted what it did after the fact.
在此过程中，它“终止了活动进程，并强制删除了工作树（与编程项目相关的工作文件）。它后来承认，远程虚拟机 6 上未提交的工作可能已经丢失。”简而言之，它擅自删除了错误的机器，并且只在事后才承认了自己的行为。

In another instance, Sol “used credentials beyond what the user had authorized.” Credentials are the usernames, passwords, or security keys a system uses to verify who’s allowed to log in. This incident occurred when Sol was working on a project and couldn’t read its cloud files. Rather than alerting the user to the problem, Sol went looking for the credentials on its own, found some sitting in a hidden local cache, and then used them without asking for authorization from the user.
在另一个案例中，Sol “使用了超出用户授权范围的凭据。”凭据是指系统用于验证登录权限的用户名、密码或安全密钥。该事件发生在 Sol 处理项目且无法读取云端文件时。Sol 没有向用户发出警报，而是自行寻找凭据，在隐藏的本地缓存中找到了一些，并在未经用户授权的情况下直接使用了它们。

The system card does promise that destructive behavior should be rare, although it also admits that GPT-5.6 Sol “shows a greater tendency than GPT-5.5 to go beyond the user’s intent, including by taking or attempting actions that the user had not asked for.”
系统卡确实承诺这种破坏性行为应该是罕见的，但也承认 GPT-5.6 Sol “比 GPT-5.5 表现出更强烈的倾向去超越用户的意图，包括采取或尝试用户未曾要求的行动。”

It’s too soon to say how widespread these incidents — Sol deleting files, or sifting out credentials the user didn’t give it — really are. In the meantime, Sol users should be prepared to implement their own safeguards with the model, like using permission scoping (that doesn’t give access to production systems), maintaining backups, and staging rollouts.
现在断言这些事件（Sol 删除文件或擅自搜寻未授权凭据）的普遍程度还为时过早。在此期间，Sol 的用户应准备好为该模型实施自己的安全防护措施，例如使用权限范围限制（不授予生产系统访问权限）、维护备份以及分阶段部署。

OpenAI did not immediately respond to our request for comment.
OpenAI 未能立即回应我们的置评请求。
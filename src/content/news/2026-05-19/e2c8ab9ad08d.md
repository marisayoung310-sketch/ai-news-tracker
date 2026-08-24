---
title: "We stopped AI bot spam in our GitHub repo using Git's –author flag"
originalUrl: "https://archestra.ai/blog/only-responsible-ai"
date: "2026-05-18T22:17:24.998Z"
---

# We stopped AI bot spam in our GitHub repo using Git's –author flag
# 我们利用 Git 的 --author 标志阻止了 GitHub 仓库中的 AI 机器人垃圾信息

Written by Ildar Iskhakov, CTO
作者：Ildar Iskhakov，CTO

When a few months ago GitHub shared statistics about celebrating an enormous contribution of AI in their product metrics, completely missing the point of degraded contribution quality, we already felt that things were going south.
几个月前，当 GitHub 分享统计数据，大肆庆祝 AI 对其产品指标的巨大贡献，却完全忽略了贡献质量下降这一核心问题时，我们就已经预感到情况不妙了。

The first worrying moment was the issue we posted with a $900 bounty. We were hoping to motivate someone to contribute and bring shiny new "MCP Apps" support to our platform. We quickly got the attention of legitimate contributors proposing plans, asking questions, submitting attempts — but soon... AI bots arrived and blew up the issue, taking it to 253 comments total, poisoning the conversation with pointless "implementation plans" and even pure aggression toward the maintainers!
第一个令人担忧的时刻是我们发布了一个 900 美元的悬赏任务。我们希望能激励开发者为我们的平台贡献并带来全新的“MCP Apps”支持。我们很快吸引了真正的贡献者，他们提出了方案、询问问题并提交了尝试——但很快……AI 机器人涌入并引爆了这个 Issue，评论总数达到了 253 条，用毫无意义的“实施计划”甚至对维护者的纯粹攻击污染了讨论区！

AI accounts started flooding not just this issue — but the entire repo. Every sloppy comment triggered a notification for every team member watching the repo. Our GitHub notifications became a wall of noise. Real conversations from contributors like @ethanwater, @developerfred, and @Geetk172 — people actively working on bounties — were getting buried.
AI 账号不仅淹没了这个 Issue，还波及了整个仓库。每一条草率的评论都会触发所有关注该仓库的团队成员的通知。我们的 GitHub 通知变成了一堵噪音墙。来自 @ethanwater、@developerfred 和 @Geetk172 等真正贡献者（他们正在积极处理悬赏任务）的真实对话被彻底掩盖了。

Later, the problem took the form of an epidemic. For example, just for the issue to add x.ai provider support to Archestra, we received 27 pull requests, most of which contributors didn't even try testing. One of our team members had to spend half a day every week cleaning AI garbage out of the repo, removing untested PRs and closing hallucinated issues. When we forgot to do so, our repo quickly became a place completely unfriendly to legitimate contributors.
后来，这个问题演变成了一场瘟疫。例如，仅在为 Archestra 添加 x.ai 提供程序支持的 Issue 中，我们就收到了 27 个 Pull Request，其中大多数贡献者甚至根本没有进行测试。我们的一名团队成员每周不得不花费半天时间清理仓库中的 AI 垃圾，删除未经测试的 PR 并关闭凭空捏造的 Issue。当我们忘记清理时，我们的仓库很快就变成了一个对真正贡献者极不友好的地方。

### Fighting Back
### 反击

At first, we tried to calculate the "reputation" of contributors and built "London-Cat", a tiny bot calculating a contributor's reputation based on merged PRs and a few other signals. It obviously didn't stop the spam, but it helped us figure out "who is who". As a next step, we built an "AI sheriff", which obviously closed a few legitimate PRs 🤦. The constant flow of useless AI comments and proposals was only getting worse, turning legitimate contributors away and making us reconsider: should we stop motivating contributions with bounties? Should we stop giving fun test tasks to our job candidates?
起初，我们尝试计算贡献者的“声誉”，并构建了一个名为“London-Cat”的小型机器人，根据合并的 PR 和其他一些信号来计算贡献者的声誉。这显然没有阻止垃圾信息，但它帮助我们弄清了“谁是谁”。下一步，我们构建了一个“AI 警长”，它显然误关了一些合法的 PR 🤦。源源不断的无用 AI 评论和提案只会愈演愈烈，导致真正的贡献者流失，这让我们不得不重新思考：我们是否应该停止用悬赏来激励贡献？我们是否应该停止给求职者布置有趣的测试任务？

We've decided that we need to fight back and insist on making our repo a comfortable and safe space for legitimate contributors, responsible AI users, newbies, and seasoned engineers. Today we're blocking the ability to create issues, open PRs, and leave comments for those who didn't go through the onboarding.
我们决定必须反击，并坚持将我们的仓库打造为一个舒适、安全的空间，服务于真正的贡献者、负责任的 AI 用户、新手和资深工程师。今天，我们开始限制那些未通过入职引导（onboarding）的用户创建 Issue、提交 PR 和发表评论。

### Doing It in GitHub
### 在 GitHub 上实现

There is no straightforward way to whitelist those who can comment or create PRs on an open source repo, so we had to hack around. There is a setting called "Limit to prior contributors." Simple rule: if you haven't previously committed to main, you can't comment on issues or PRs.
在开源仓库中，没有直接的方法来白名单化那些可以评论或创建 PR 的用户，所以我们不得不采取变通方案。GitHub 有一个名为“限制为既往贡献者（Limit to prior contributors）”的设置。规则很简单：如果你之前没有向主分支提交过代码，你就不能在 Issue 或 PR 上发表评论。

The setting can't tell the difference between an AI bot and a real developer who signed up to work on a bounty. Both are "not prior contributors." Both get locked out. GitHub defines "prior contributor" as someone whose GitHub account is the author of a commit on main. Git commits have two identity fields — author and committer — and they can be different people. You can create a commit attributed to someone else using Git's --author flag.
该设置无法区分 AI 机器人和为了完成悬赏而注册的真实开发者。两者都被视为“非既往贡献者”，都会被拒之门外。GitHub 将“既往贡献者”定义为：其 GitHub 账号是主分支上某次提交的作者（Author）。Git 提交有两个身份字段——作者（Author）和提交者（Committer），它们可以是不同的人。你可以使用 Git 的 `--author` 标志创建一个归属于他人的提交。

If the email matches their GitHub account, GitHub links the commit to their profile and grants them contributor status. Every GitHub account has a noreply email: `<id>+<username>@users.noreply.github.com`.
如果邮箱与他们的 GitHub 账号匹配，GitHub 就会将该提交链接到他们的个人资料，并授予他们贡献者身份。每个 GitHub 账号都有一个 noreply 邮箱：`<id>+<username>@users.noreply.github.com`。

The full flow:
完整流程如下：
1. Onboarding on our website with ethical AI rules and a CAPTCHA.
1. 在我们的网站上进行入职引导，包含道德 AI 规则和验证码。
2. A GitHub Action that fires on submission, looks up the user's GitHub ID, adds their handle to an EXTERNAL_CONTRIBUTORS.md file, and pushes a commit to main authored under their account.
2. 一个在提交时触发的 GitHub Action，它会查找用户的 GitHub ID，将他们的用户名添加到 `EXTERNAL_CONTRIBUTORS.md` 文件中，并以他们的名义向主分支推送一次提交。
3. The user becomes whitelisted and gets access to the repo.
3. 用户被加入白名单并获得仓库访问权限。

### Final Words
### 结语

While GitHub reports massive metric growth — a substantial part of which is AI-generated — we as an open source project team have to do the heavy lifting of cleaning up AI slop from our repository and come up with esoteric workarounds to keep the level of legitimacy of our open source audience.
尽管 GitHub 报告了巨大的指标增长（其中很大一部分是 AI 生成的），但作为开源项目团队，我们不得不承担清理仓库中 AI 垃圾的繁重工作，并想出各种深奥的变通方法，以保持我们开源社区的纯正性。

Slop is not only demotivating contributors who want to spend their time doing good and have to break through the wall of noise instead, it's also bringing a substantial security risk. Dear community, it's time to have a serious talk about the effect AI has on open source.
这些垃圾信息不仅打击了那些想做贡献却不得不冲破噪音墙的贡献者的积极性，还带来了巨大的安全风险。亲爱的社区，是时候认真讨论一下 AI 对开源的影响了。
---
title: "What We Learned by Reproducing 2,200 papers from ICML"
originalUrl: "https://huggingface.co/blog/icml-2026-open-reproductions"
date: "2026-08-13T22:31:29.103Z"
---

# What We Learned by Reproducing 2,200 papers from ICML
# 我们从复现 2,200 篇 ICML 论文中学到了什么

Back in July, we ran a hackathon where more than 1,200 community members brought their own coding agents and tried to reproduce the papers published at ICML 2026, claim by claim. In 19 days, participants published 6,816 Trackio logbooks reproducing 2,226 papers, about a third of the conference 🤯 In this post, we're sharing what we learned from running this hackathon, and what it suggests about the role humans will play when agents are doing the research experiments.

今年 7 月，我们举办了一场黑客松，超过 1,200 名社区成员带着他们自己的编程智能体（coding agents），尝试对 ICML 2026 发表的论文进行逐条声明的复现。在 19 天内，参与者发布了 6,816 份 Trackio 日志，复现了 2,226 篇论文，约占整个会议论文总数的三分之一 🤯 在这篇文章中，我们将分享从这次黑客松中学到的经验，以及它对未来智能体进行科研实验时人类所扮演角色的启示。

### More papers than anyone can review
### 论文数量远超人类评审能力

Questions about how reproducible AI research really is are older than the current AI wave. But these questions are exacerbated by scale. ICML 2026 received 23,918 submissions and accepted 6,352 papers, roughly double the previous year, continuing an exponential trend that is at least partly driven by AI agents making it faster to run experiments and write them up. Reviewing capacity has not doubled along with it.

关于 AI 研究可复现性的质疑，早在当前 AI 热潮之前就已存在。但规模化效应加剧了这些问题。ICML 2026 收到了 23,918 份投稿，录用了 6,352 篇论文，数量约为前一年的两倍。这种指数级增长趋势，部分原因在于 AI 智能体加快了实验运行和论文撰写的速度，而评审能力却并未随之翻倍。

Reviewers at most conferences are volunteers who may not have the time or expertise to fully review a paper. Here is a review of one accepted ICML 2026 spotlight paper, in the reviewer's own words: "My low confidence score is because I did not check all the proofs carefully." Note that this paper got strong scores and a spotlight. Keep it in mind, because we will come back to this exact paper later in the post, and to what happened when we finally did check the proofs carefully.

大多数会议的评审员都是志愿者，他们可能没有足够的时间或专业知识来全面审查一篇论文。以下是 ICML 2026 一篇被录用的焦点论文（spotlight paper）的评审意见，引用评审员的原话：“我给出的置信度分数较低，因为我没有仔细检查所有的证明。” 请注意，这篇论文获得了高分并入选了焦点论文。请记住这一点，因为我们稍后会在文中回到这篇论文，看看当我们真正仔细检查其证明时发生了什么。

What has changed, though, is that the same technology driving the flood of submissions can also help us keep up with it. Coding agents like Claude Code, Codex, Cursor, and Pi can now read a paper, write the code, launch the experiments, and report back on what they found. Checking a paper carefully used to cost a reviewer a weekend; an agent can attempt it in an afternoon, in parallel, thousands of times over. So the question we wanted to ask was: if we actually re-examined a major conference at scale, and tried to reproduce every paper, what would we find?

然而，变化在于，推动投稿激增的同一项技术，也能帮助我们应对这种压力。像 Claude Code、Codex、Cursor 和 Pi 这样的编程智能体现在可以阅读论文、编写代码、启动实验并报告发现。过去，仔细检查一篇论文需要评审员花费一个周末；而智能体可以在一个下午内并行完成数千次尝试。因此，我们想问的问题是：如果我们真正大规模地重新审查一个大型会议，并尝试复现每一篇论文，我们会发现什么？

### The hackathon (July 15 - August 2nd)
### 黑客松（7 月 15 日 - 8 月 2 日）

Rather than audit papers ourselves, we opened it up to the whole community, with all the diversity of agent frameworks, compute budgets, and scientific taste that brings. From July 15 to August 2, 2026, the ICML 2026 Open Reproductions challenge worked like this:

我们没有选择自己审计论文，而是向整个社区开放，利用各种智能体框架、计算预算和科学视角的多样性。从 2026 年 7 月 15 日到 8 月 2 日，ICML 2026 开放复现挑战赛的运作方式如下：

*   **Pick a paper.** We indexed all 6,341 accepted ICML 2026 papers with their abstracts and extracted the core scientific claims of each one, so an agent could start from a concrete, checkable target rather than a 40-page PDF. Multiple people reproducing the same paper was encouraged.
*   **挑选论文。** 我们索引了所有 6,341 篇被录用的 ICML 2026 论文及其摘要，并提取了每篇论文的核心科学声明，这样智能体就可以从一个具体、可验证的目标开始，而不是面对一份 40 页的 PDF。我们鼓励多人复现同一篇论文。

*   **Bring your own agent.** Participants used Claude Code, Codex, Cursor, OpenResearch's orx, and everything in between. We provided a streamlined interface so an agent could pull the paper, its claims, and the challenge instructions with a single command.
*   **自带智能体。** 参与者使用了 Claude Code、Codex、Cursor、OpenResearch 的 orx 等各种工具。我们提供了一个精简的接口，智能体只需一条指令即可拉取论文、声明和挑战说明。

*   **Reproduce, then publish everything.** Every run produced a Trackio logbook: a static Hugging Face Space containing the write-up, the code that ran, the artifacts it produced, and (optionally) the full agent execution trace uploaded as a Hugging Face Dataset. The auditing process itself had to be auditable.
*   **复现并发布一切。** 每次运行都会生成一份 Trackio 日志：一个静态的 Hugging Face Space，包含报告、运行的代码、生成的产物，以及（可选的）作为 Hugging Face 数据集上传的完整智能体执行轨迹。审计过程本身必须是可审计的。

*   **Get judged.** An automated Logbook Judge (running an open-weights model, GLM-5.2) re-read every logbook and issued a per-claim verdict: verified, falsified, toy (evidence at reduced scale), or inconclusive. The judge was explicitly instructed to treat each logbook's self-assessment as untrusted.
*   **接受评判。** 一个自动化的“日志裁判”（运行开源权重模型 GLM-5.2）会重新阅读每一份日志，并对每条声明给出结论：已验证、已证伪、玩具级（在缩小规模下的证据）或不确定。裁判被明确要求不得信任任何日志的自我评估。

Participants received $20 in Hugging Face compute credits to run experiments on HF Jobs; across the challenge, participants launched 2,962 cloud jobs. Where a full reproduction was impossible, for example when a paper's dataset was proprietary or its checkpoints unreleased, participants ran toy reproductions on synthetic data mimicking the original's properties.
参与者获得了 20 美元的 Hugging Face 计算额度，用于在 HF Jobs 上运行实验；在整个挑战赛期间，参与者启动了 2,962 个云端任务。在无法进行完整复现的情况下（例如论文数据集是私有的或检查点未发布），参与者会在模拟原始属性的合成数据上进行“玩具级”复现。

### By the numbers
### 数据概览

By the numbers, this hackathon was probably the largest attempted reproduction of a scientific conference:
从数据来看，这次黑客松可能是科学会议历史上规模最大的复现尝试：

*   1,221 community members joined the organization
*   1,221 名社区成员加入组织
*   6,816 reproduction logbooks published
*   发布了 6,816 份复现日志
*   2,226 papers attempted, 34% of the entire conference, many by several independent teams
*   尝试复现 2,226 篇论文，占整个会议的 34%，其中许多论文由多个独立团队复现
*   35,908 claims judged, with all verdicts frozen in a public dataset at challenge close
*   评判了 35,908 条声明，所有结论在挑战结束时被固化在公开数据集中
*   2,962 HF Jobs launched; 274 full agent-trace datasets published on Hugging Face
*   启动了 2,962 个 HF 任务；在 Hugging Face 上发布了 274 个完整的智能体执行轨迹数据集

### What we found
### 我们的发现

Aggregating the claim-level verdicts per paper:
汇总每篇论文的声明级结论：

*   **51% of examined papers (1,103)** had at least one claim independently verified. Of those, 266 papers were fully reproduced, with every extracted claim verified, and 632 more were partially reproduced with nothing falsified. In total, 3,978 individual claims were confirmed with real experiments.
*   **51% 的被审查论文（1,103 篇）** 至少有一项声明被独立验证。其中，266 篇论文被完全复现（所有提取的声明均被验证），另有 632 篇被部分复现且没有任何声明被证伪。总计 3,978 条独立声明通过真实实验得到了确认。

*   **23% of examined papers (496)** had at least one claim falsified or contested. That includes 49 papers where all claims were falsified and nothing could be verified, and, maybe most interestingly, 242 papers where independent reproduction teams reached opposite verdicts on the same claims. Reproducibility is not binary; it is adversarial.
*   **23% 的被审查论文（496 篇）** 至少有一项声明被证伪或存在争议。这包括 49 篇所有声明均被证伪且无法验证的论文，以及最有趣的一点：242 篇论文中，独立复现团队对同一声明得出了截然相反的结论。可复现性并非非黑即白，它是对抗性的。

*   The remainder sat in the middle: 502 papers with toy-scale evidence only, and 280 where nothing could be established either way (missing artifacts were the most common cause).
*   其余论文处于中间状态：502 篇仅有玩具级证据，280 篇无法得出任何结论（最常见的原因是缺失实验产物）。

### Reproductions done well
### 优秀的复现案例

Some papers came through the gauntlet looking great, and the community's best logbooks are worth reading in their own right:
一些论文经受住了考验，表现出色，社区中最优秀的日志本身就非常值得一读：

*   "Flat Minima and Generalization: Insights from Stochastic Convex Optimization" was reproduced by 20 independent teams, 12 of which verified every claim. The one linked included and published the full agent trace.
*   《Flat Minima and Generalization: Insights from Stochastic Convex Optimization》被 20 个独立团队复现，其中 12 个团队验证了所有声明。链接中的那份日志包含并发布了完整的智能体执行轨迹。

*   "A Coin Flip for Safety: LLM Judges Fail to Reliably Measure Adversarial Robustness" had 14 of 17 logbooks verify every claim. A paper about unreliable LLM judges holding up under scrutiny by LLM agents :)
*   《A Coin Flip for Safety: LLM Judges Fail to Reliably Measure Adversarial Robustness》在 17 份日志中有 14 份验证了所有声明。一篇关于“不可靠的 LLM 裁判”的论文，竟然经受住了 LLM 智能体的审查 :)

### Falsifications, and what happened when we checked them
### 证伪情况，以及当我们检查它们时发生了什么

35 participants formally claimed they had falsified something. We adversarially re-v...
35 名参与者正式声称他们证伪了某些内容。我们进行了对抗性的重新审查……
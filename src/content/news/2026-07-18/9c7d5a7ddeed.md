---
title: "Code Review, Part 2: The Reviewer That Learned To Lie Better"
originalUrl: "https://dev.to/raleighschickel/code-review-part-2-the-reviewer-that-learned-to-lie-better-4901"
date: "2026-07-17T22:24:15.155Z"
---

# Code Review, Part 2: The Reviewer That Learned To Lie Better
# 代码审查（第二部分）：学会了更好地撒谎的审查者

Several posts ago, I wrote about setting up a multi-agent adversarial code review process as part of my development pipeline. The premise came from a podcast: if one frontier model is writing the code, you want a different lineage model doing the review. I'd already been running an informal version of this: just Claude Code reviewing Claude Code with an adversarial prompt. It had shockingly good luck catching real problems. Good enough that I stopped trusting the vibe and decided to go get actual data.

几篇文章前，我写过关于在开发流程中建立多智能体对抗式代码审查机制的内容。这个前提源于一个播客：如果由一个前沿模型编写代码，那么你需要一个不同血缘的模型来进行审查。我之前已经运行过一个非正式版本：仅使用带有对抗性提示词的 Claude Code 来审查 Claude Code。它在发现实际问题方面有着惊人的好运。好到我不再仅仅凭感觉，而是决定去获取真实的数据。

So here's what I set up. Claude Code wrote the PRs. Every PR got reviewed automatically by 2 reviewers running in parallel through GitHub Actions: Claude Code with an adversarial prompt and Gemini with an adversarial prompt. I read everything myself. Then the same Claude Code agent that had written most of the PRs pulled both reviewers' feedback locally and distilled it into a scored ledger, PR by PR, for 6 weeks.

于是我进行了如下设置：由 Claude Code 编写 PR（拉取请求）。每个 PR 都通过 GitHub Actions 由两个并行运行的审查者自动审查：一个是带有对抗性提示词的 Claude Code，另一个是带有对抗性提示词的 Gemini。我亲自阅读了所有内容。然后，编写了大部分 PR 的同一个 Claude Code 智能体将两位审查者的反馈拉取到本地，并在 6 周内将其整理成一份逐个 PR 的评分账本。

Wiring Claude Code to review PRs through a GitHub Action was trivial. Wiring Gemini up the same way was not. Claude Code could not figure out how to get the Gemini CLI working inside a GitHub Action, and I ended up installing the Gemini CLI locally and having it perform the wiring. A couple of weeks into collecting data, I noticed Gemini's reviews were shallow. Not wrong, exactly. Thin. I started wondering whether Gemini actually had read access to the repository or whether it was only ever seeing the diff it was handed. I checked. It was the diff. Just the diff. Nothing but the diff. No file reads, no git history, nothing. And the thing that configured the GitHub Action in the first place was Gemini. It set up its own blindfold.

通过 GitHub Action 将 Claude Code 连接到 PR 审查非常简单，但连接 Gemini 却并非如此。Claude Code 无法弄清楚如何在 GitHub Action 中运行 Gemini CLI，最终我只能在本地安装 Gemini CLI 并由它来完成连接。在收集数据的几周后，我注意到 Gemini 的审查很浅。倒不是说完全错误，只是很单薄。我开始怀疑 Gemini 是否真的拥有仓库的读取权限，还是说它仅仅看到了交给它的差异（diff）。我检查了一下，确实只有差异。仅仅是差异，没有文件读取，没有 git 历史，什么都没有。而最初配置这个 GitHub Action 的正是 Gemini。它给自己戴上了眼罩。

I fixed it and Gemini's reviews got worse. Not louder or more frequent. Worse in a specific way: more confident. Before the fix, a blind Gemini would correctly tell you that it couldn't verify something and to check manually. That's an honest failure mode. After the fix, once it could actually read the code, it started fabricating. Citing files that didn't exist. Quoting functions and API calls that were never written. Building evidence for findings that weren't real and delivering it with the same tone it used for the findings that were.

我修复了这个问题，结果 Gemini 的审查反而变差了。不是变得更吵或更频繁，而是以一种特定的方式变差：变得更自信了。修复之前，处于“盲视”状态的 Gemini 会诚实地告诉你它无法验证某些内容，建议手动检查。这是一种诚实的失败模式。修复之后，一旦它真的能读取代码，它就开始编造了。引用不存在的文件，引用从未编写过的函数和 API 调用。为不存在的问题构建证据，并以与真实问题相同的语气呈现出来。

This was an experiment, so let's look at the numbers: 95 PRs were scored over roughly 6 weeks on a real multi-tenant codebase with auth, per-org data isolation, and Prisma migrations (~61K reviewable lines, ~400K lines when including database seeds). It might be pre-users, but this is not a toy repo or a small pet project.

这是一项实验，让我们看看数据：在约 6 周的时间里，对 95 个 PR 进行了评分，这些 PR 来自一个真实的多租户代码库，包含身份验证、组织间数据隔离和 Prisma 迁移（约 6.1 万行可审查代码，包含数据库种子数据后约 40 万行）。虽然可能还处于预发布阶段，但这绝不是一个玩具仓库或小型个人项目。

I decided on 3 metrics before I had any data. I did that specifically so I couldn't pick metrics that flattered the story afterward: escape rate (a real issue that got past both reviewers and CI and surfaced later), false consensus rate (findings both reviewers flagged that turned out not to be real), and decorrelation (the share of real issues caught by only one of the two). Every finding got hand classified against the actual code, not against the reviewer's own claim about the code.

我在获得任何数据之前就确定了 3 个指标。我这样做是为了确保事后不会挑选那些能美化结果的指标：逃逸率（通过了两位审查者和 CI 但后来才浮现的真实问题）、错误共识率（两位审查者都标记为问题但实际上并非如此的发现）以及去相关性（仅被其中一位审查者发现的真实问题的比例）。每一个发现都根据实际代码进行了人工分类，而不是根据审查者对自己发现的声明。

Final tallies: 0 escapes out of 200 real issues found across the trial. 0 false consensus out of 25 findings both reviewers raised independently. Every time they agreed, they were both right. Decorrelation of roughly 88 percent. The 2 reviewers caught almost entirely different things. Claude's findings were real about 81 percent of the time. Gemini's were real about 45 percent of the time. That number is already generous. It excludes the weeks Gemini was reviewing blind and inventing plausible-sounding blockers out of pure diff-reading anxiety.

最终统计结果：在试验中发现的 200 个真实问题中，逃逸率为 0。在两位审查者独立提出的 25 个发现中，错误共识率为 0。每次他们达成一致时，他们都是对的。去相关性约为 88%。这两位审查者发现的问题几乎完全不同。Claude 的发现约有 81% 是真实的，Gemini 的发现约有 45% 是真实的。这个数字已经很慷慨了，它排除了 Gemini 在“盲视”审查期间，因纯粹的差异阅读焦虑而编造出听起来合理的阻碍因素的那几周。

0 escapes doesn't mean 0 escapable. It means 0 we caught on a codebase that isn't carrying production traffic yet. I want that distinction on the record before I start sounding more confident than I've earned. I have found 19 legitimate issues that escaped the code review process, but half of those are on me and my shoddy QA work or requirements definitions. The decorrelation number is the strongest argument for running 2 reviewers at all.

“0 逃逸”并不意味着“0 可逃逸”。它意味着在一个尚未承载生产流量的代码库中，我们没有发现逃逸。在我的语气变得过于自信之前，我想明确这一点。我确实发现了 19 个逃过代码审查过程的合法问题，但其中一半是因为我自己的 QA 工作或需求定义做得草率。去相关性数据是运行两个审查者最强有力的论据。

PR #148 is the cleanest proof of it. It was a sprint-data ingestion change. Claude reviewed it and found nothing wrong. Gemini caught 2 things Claude missed completely: a multi-write sequence that wasn't wrapped in a transaction and a data-model bug where multiple boards were silently collapsing into a single team identity. Neither of those is a nitpick. If I'd only run Claude on that PR, both of those ship. But decorrelation is not the same as parity. Of the 175 real issues caught by only 1 reviewer, 131 were Claude's and 44 were Gemini's. Gemini's catches clustered on a handful of PRs rather than spreading evenly. Keep both is true. Keep both as equals is not.

PR #148 是最直接的证明。这是一个冲刺数据摄入的变更。Claude 审查后没发现任何问题。Gemini 发现了两个 Claude 完全遗漏的问题：一个未被事务包裹的多重写入序列，以及一个数据模型错误，导致多个看板静默合并为一个团队身份。这两者都不是吹毛求疵。如果我只运行 Claude，这两个问题都会上线。但去相关性并不等同于对等。在仅由一名审查者发现的 175 个真实问题中，131 个是 Claude 发现的，44 个是 Gemini 发现的。Gemini 的发现集中在少数几个 PR 上，而不是均匀分布。保留两者是正确的，但将两者视为同等地位则不然。

Here's the finding that actually changes how I think about this. Once Gemini had real read access, its false positives stopped sounding uncertain and started sounding like evidence. The cleanest demonstration happened on the same day, on 2 different PRs: 171 and 173. Gemini made the same move on both PRs: it claimed to verify that a query was properly scoped to the organization and pasted a backend code snippet to prove it. On 171, the file, the function, even the auth API it quoted: none of it existed. Gemini invented whole cloth, formatted exactly like real code. On 173, the identical move, same format, same confident tone, quoted the actual repository correctly, word for word. Same reviewer. Same day. Same technique. One fabricated, one real. Nothing in the output told you which was which. The only way to tell them apart was to go open the file myself.

以下是真正改变我对此看法的结果。一旦 Gemini 拥有了真正的读取权限，它的误报就不再听起来不确定，而是听起来像证据。最清晰的证明发生在同一天，在两个不同的 PR 上：171 和 173。Gemini 在两个 PR 上都做了同样的动作：它声称验证了查询是否正确限定在组织范围内，并粘贴了一段后端代码片段来证明。在 171 上，它引用的文件、函数，甚至身份验证 API：全都不存在。Gemini 完全是凭空捏造的，格式与真实代码一模一样。在 173 上，同样的动作，同样的格式，同样的自信语气，逐字逐句地正确引用了实际仓库。同一个审查者，同一天，同一种技术。一个编造的，一个真实的。输出中没有任何信息能告诉你哪个是哪个。区分它们的唯一方法就是我自己去打开文件。

That single pair of PRs is the whole argument for why an unverified AI review can't be the gate. A cautious wrong answer is annoying. A confident, well-formatted, entirely fictional one is dangerous because it reads exactly like the truth until somebody checks. It happened again a few PRs later. Gemini flagged what it called a significant cross-tenant data leak on a UI-only change, cited a query and a session field that don't exist any...

这一对 PR 充分说明了为什么未经核实的 AI 审查不能作为把关者。一个谨慎的错误答案令人恼火，但一个自信、格式良好且完全虚构的答案则是危险的，因为它读起来就像真理，直到有人去核实。几轮 PR 后，这种情况再次发生。Gemini 在一个仅涉及 UI 的变更中标记了所谓的重大跨租户数据泄露，并引用了一个根本不存在的查询和一个会话字段……
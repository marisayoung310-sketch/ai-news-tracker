---
title: "We are Changing our Developer Productivity Experiment Design"
originalUrl: "https://metr.org/blog/2026-02-24-uplift-update/"
date: "2026-07-17T22:22:59.517Z"
---

# We are Changing our Developer Productivity Experiment Design
# 我们正在调整开发者生产力实验的设计

**CONTRIBUTORS:** Joel Becker, Nate Rush, Tom Cunningham, David Rein, and Khalid Mahamud
**DATE:** February 24, 2026
**贡献者：** Joel Becker, Nate Rush, Tom Cunningham, David Rein, Khalid Mahamud
**日期：** 2026年2月24日

METR previously published a paper which found the use of AI tools caused a 20% slowdown in completing tasks among experienced open-source developers, using data from February to June 2025. To understand how AI is impacting developer productivity over time, we started a new experiment in August 2025 with a larger pool of developers using the latest AI tools.
METR 此前发表的一篇论文显示，根据 2025 年 2 月至 6 月的数据，使用 AI 工具导致资深开源开发者完成任务的速度下降了 20%。为了了解 AI 如何随时间推移影响开发者生产力，我们于 2025 年 8 月启动了一项新实验，邀请了更多使用最新 AI 工具的开发者参与。

Unfortunately, given participant feedback and surveys, we believe that the data from our new experiment gives us an unreliable signal of the current productivity effect of AI tools. The primary reason is that we have observed a significant increase in developers choosing not to participate in the study because they do not wish to work without AI, which likely biases downwards our estimate of AI-assisted speedup. We additionally believe there have been selection effects due to a lower pay rate (we reduced the pay from $150/hr to $50/hr), and that our measurements of time-spent on each task are unreliable for the fraction of developers who use multiple AI agents concurrently.
遗憾的是，根据参与者的反馈和调查，我们认为新实验的数据无法可靠地反映 AI 工具对当前生产力的影响。主要原因是，我们观察到越来越多的开发者选择不参与研究，因为他们不愿在没有 AI 的情况下工作，这很可能导致我们对 AI 辅助提速的估计偏低。此外，我们认为较低的报酬（我们将时薪从 150 美元降至 50 美元）也产生了选择偏差，且对于同时使用多个 AI 智能体的开发者，我们对任务耗时的测量也不够准确。

Based on conversations with study participants, we believe it is likely that developers are more sped up from AI tools now — in early 2026 — compared to our estimates from early 2025. However, because of the selection effects in our experiment, our data is only very weak evidence for the size of this increase.
根据与研究参与者的交流，我们认为与 2025 年初的估计相比，开发者现在（2026 年初）从 AI 工具中获得的提速可能更为显著。然而，由于实验中存在选择偏差，我们的数据仅能作为这种增长幅度的微弱证据。

Our raw results show some evidence for speedup. Our early 2025 study found the use of AI causes tasks to take 19% longer, with a confidence interval between +2% and +39%. For the subset of the original developers who participated in the later study, we now estimate a speedup of -18% with a confidence interval between -38% and +9%. Among newly-recruited developers the estimated speedup is -4%, with a confidence interval between -15% and +9%. However the true speedup could be much higher among the developers and tasks which are selected out of the experiment. Some developers self-report very high speedups, though as we documented in our earlier study those estimates can be quite unreliable.
我们的原始结果显示了一些提速的迹象。我们 2025 年初的研究发现，使用 AI 会导致任务耗时增加 19%，置信区间在 +2% 到 +39% 之间。对于参与了后续研究的原始开发者子集，我们目前估计的提速为 -18%，置信区间在 -38% 到 +9% 之间。在新招募的开发者中，估计的提速为 -4%，置信区间在 -15% 到 +9% 之间。然而，在那些被排除在实验之外的开发者和任务中，真实的提速可能要高得多。一些开发者自述获得了极高的提速，但正如我们在早期研究中所记录的那样，这些估计可能非常不可靠。

Due to the severity of these selection effects, we are working on changes to the design of our study. Below, we provide further detail and describe our plans for other means of studying the impact of AI on developer productivity.
由于这些选择偏差的影响严重，我们正在着手调整研究设计。下文将提供更多细节，并描述我们研究 AI 对开发者生产力影响的其他计划。

### Wider adoption of AI has made it more difficult to measure task-level productivity
### AI 的广泛应用使得衡量任务级生产力变得更加困难

Our second study, starting in August, consisted of 10 developers from the original study, plus a new set of 47 developers recruited from a more diverse set of open-source projects. The participants were paid $50/hour for their participation. As in the initial study, developers were asked to pre-specify each task that they intended to work on, and then submit the task-description for randomization. Each task was assigned to an “AI allowed” or “AI disallowed” condition. The developers would record the amount of time it took to complete the task, and we could thus compare the average time required to complete a typical task with and without AI.
我们的第二项研究始于 8 月，由最初研究中的 10 名开发者，以及从更多样化的开源项目中新招募的 47 名开发者组成。参与者每小时获得 50 美元的报酬。与最初的研究一样，开发者需要预先指定他们打算从事的每项任务，然后提交任务描述以进行随机分配。每项任务被分配到“允许使用 AI”或“禁止使用 AI”的条件中。开发者记录完成任务所需的时间，从而使我们能够比较在有无 AI 辅助下完成典型任务所需的平均时间。

Throughout 2025 there was an increase in the use of agentic tools among open-source developers, such as Claude Code and Codex. This wider adoption of AI has had two important effects in our study:
在整个 2025 年，开源开发者对智能体工具（如 Claude Code 和 Codex）的使用有所增加。这种 AI 的广泛采用对我们的研究产生了两个重要影响：

1. **Recruitment and retention of developers has become more difficult.** An increased share of developers say they would not want to do 50% of their work without AI, even though our study pays them $50/hour to work on tasks of their own choosing. Our study is thus systematically missing developers who have the most optimistic expectations about AI’s value.
1. **开发者的招募和留存变得更加困难。** 越来越多的开发者表示，他们不愿在没有 AI 的情况下完成 50% 的工作，尽管我们的研究为他们从事自己选择的任务支付每小时 50 美元的报酬。因此，我们的研究系统性地错过了那些对 AI 价值抱有最乐观预期的开发者。

2. **Developers have become more selective in which tasks they submit.** When surveyed, 30% to 50% of developers told us that they were choosing not to submit some tasks because they did not want to do them without AI. This implies we are systematically missing tasks which have high expected uplift from AI.
2. **开发者在提交任务时变得更加挑剔。** 在调查中，30% 到 50% 的开发者告诉我们，他们选择不提交某些任务，因为他们不想在没有 AI 的情况下完成这些任务。这意味着我们系统性地错过了那些预期能从 AI 中获得显著提升的任务。

Together, these effects make it likely that our estimate reported above is a lower-bound on the true productivity effects of AI on these developers. The selection effects seem to affect a minority share of developers and of tasks, which limits the degree of bias. However we are likely missing data on the most active adopters of AI, who may be of most interest. As AI capabilities continue to increase and developers’ expectations grow as well, these effects will only get more dramatic, further limiting the validity of this study design.
综合来看，这些影响使得我们上述报告的估计值很可能是 AI 对这些开发者真实生产力影响的下限。选择偏差似乎只影响了少数开发者和任务，这限制了偏差的程度。然而，我们很可能缺失了那些最积极采用 AI 的开发者的数据，而他们可能正是我们最感兴趣的对象。随着 AI 能力的持续增强以及开发者预期的提高，这些影响只会变得更加剧烈，进一步限制了该研究设计的有效性。

Based on our interviews and surveys we believe the increase in selection is primarily due to higher expectation of AI-driven uplift by our developers. However the second study also had a lower pay rate, $50/hour instead of $150/hour in the original study, and this also likely contributed to the higher selection. We also noticed some other problems, though we judged the magnitude of these to be less severe:
根据我们的访谈和调查，我们认为选择偏差的增加主要是由于开发者对 AI 驱动的效率提升抱有更高的期望。然而，第二项研究的报酬也较低（每小时 50 美元，而最初研究为 150 美元），这也可能导致了更高的选择偏差。我们还注意到其他一些问题，尽管我们认为这些问题的严重程度较低：

* Some developers told us the types of tasks they attempted were different with agentic AI, leaning on the strengths of AI. This has two effects (a) the task-selection will be different between those in our study and those outside it; (b) the time-differences within the study may not represent value-differences, due to the substitution in task-type.
* 一些开发者告诉我们，在使用智能体 AI 时，他们尝试的任务类型发生了变化，更倾向于利用 AI 的优势。这产生了两个影响：(a) 我们研究中的任务选择与研究外的情况会有所不同；(b) 由于任务类型的替代，研究内部的时间差异可能无法代表价值差异。

* Some developers told us the quality of the final work, for a given task, was different between AI-allowed and AI-disallowed conditions, e.g. differences in subjective code quality.
* 一些开发者告诉我们，对于给定的任务，在“允许使用 AI”和“禁止使用 AI”条件下，最终工作的质量有所不同，例如主观代码质量上的差异。
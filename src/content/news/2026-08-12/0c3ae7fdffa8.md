---
title: "Stop Calling the First Significant Day a Win"
originalUrl: "https://towardsdatascience.com/stop-calling-the-first-significant-day-a-win/"
date: "2026-08-11T22:27:49.346Z"
---

# Stop Calling the First Significant Day a Win
# 别再把“首次显著”当作胜利了

Checking an A/B test until it crosses p < 0.05 can turn a nominal 5 percent false-positive rate into almost 28 percent. I use a seeded simulation to show how large the damage gets and compare the fixes that keep early stopping honest.
如果持续观察 A/B 测试直到 p 值小于 0.05，可能会将名义上 5% 的假阳性率推高至近 28%。我通过种子模拟展示了这种损害的严重程度，并对比了能让“提前停止”保持统计有效性的几种修正方案。

Most teams treat A/B testing in a fairly straightforward way. They launch a test, open the dashboard every morning, and wait for the p-value to drop below 0.05. When it does, the result looks official enough to ship. The line has been crossed, the number looks clean, and the winner seems ready to call.
大多数团队处理 A/B 测试的方式相当直接：启动测试，每天早上打开仪表板，等待 p 值降至 0.05 以下。一旦达到这个阈值，结果看起来就足够“官方”并可以发布了。界限已被跨越，数据看起来很漂亮，胜利似乎触手可及。

I would not say that this routine is always done carelessly. In most cases, the team is doing exactly what the standard tutorial taught them to do: define the hypothesis, pick the metric, run the two-proportion z test or t test, and reject the null when p falls below 0.05. Some guides even add the valuable step of calculating the required sample size before the test starts.
我并不是说这种流程总是草率完成的。在大多数情况下，团队所做的正是标准教程所教的内容：定义假设、选择指标、运行双比例 z 检验或 t 检验，并在 p 值低于 0.05 时拒绝原假设。一些指南甚至增加了在测试开始前计算所需样本量的关键步骤。

But there is one crucial thing that often gets missed. The 5 percent false-positive rate is written for one look at one fixed sample, and the math changes once the same dashboard is checked again and again before the experiment ends.
但有一个关键点经常被忽略：5% 的假阳性率是基于“对固定样本进行一次观察”得出的，而一旦在实验结束前反复查看同一个仪表板，数学逻辑就变了。

I ran a simulation to make this visible. The setup was deliberately ordinary: two versions, A and B, both converting at the same true 10 percent rate; 1,000 visitors per arm per day; a two-sided test at the 5 percent level; and 30 days of traffic. Nothing was different between A and B. There was no product improvement to find. The only thing the test could discover was noise.
我运行了一个模拟来直观展示这一点。设置是刻意普通的：两个版本 A 和 B，转化率均为 10%；每天每组 1,000 名访客；5% 水平的双侧检验；持续 30 天。A 和 B 之间没有任何区别，不存在产品改进，测试唯一能发现的只有噪声。

*(Code block omitted for brevity)*

If the test was checked only once at the end, the false-positive rate landed where it should: about 5 percent. But if the test was checked every day and stopped as soon as p dropped below 0.05, the false-positive rate went to 27.7 percent. In other words, more than one in four “wins” were wins created by the stopping rule, not by the product.
如果测试仅在结束时查看一次，假阳性率会落在预期的 5% 左右。但如果每天查看测试，且一旦 p 值低于 0.05 就停止，假阳性率会飙升至 27.7%。换句话说，超过四分之一的“胜利”是由停止规则创造的，而非产品本身。

What this piece adds is a direct measurement of the inflation and a side-by-side benchmark of the fixes on the same simulated data. I use a seeded simulation to measure the false-positive rate under daily peeking, then compare the fixed-sample design, a group-sequential Pocock boundary, and an always-valid p-value by how much validity and speed each one keeps.
本文旨在直接测量这种膨胀，并在相同模拟数据上对各种修正方案进行横向基准测试。我使用种子模拟来测量每日查看下的假阳性率，然后比较固定样本设计、组序贯 Pocock 边界法以及始终有效的 p 值（always-valid p-value），评估它们各自在保持有效性和速度方面的表现。

### The tutorial version is not enough
### 教程版本是不够的

The usual public explanation of A/B testing gives the impression that the test statistic is the whole story. You compute the p-value, compare it with 0.05, and make the call. By itself, that routine is fine, but it is incomplete for the way product teams actually run experiments.
通常关于 A/B 测试的公开解释给人一种错觉，即检验统计量就是全部。你计算 p 值，与 0.05 比较，然后做出决定。单看这个流程没问题，但对于产品团队实际运行实验的方式来说，它是残缺的。

In practice, people rarely wait quietly until the pre-planned end of the test. They look at the dashboard more than once. If the result looks good on day four, or day eight, or day twelve, the pressure to stop becomes very real. The dashboard says significant, the roadmap is waiting, and the business wants the answer.
在实践中，人们很少会安静地等到预定的测试结束。他们会多次查看仪表板。如果结果在第 4 天、第 8 天或第 12 天看起来不错，停止测试的压力就会变得非常真实。仪表板显示“显著”，路线图在等待，业务部门想要答案。

The problem is that every new look gives the same random process another chance to wander across the line. A p-value is not a stable property of the experiment while the data is still accumulating. It moves with the next batch of users, which means a dip that looks decisive on one day can disappear completely the next.
问题在于，每一次新的查看都给了随机过程再次跨越界限的机会。当数据还在积累时，p 值并不是实验的稳定属性。它会随着下一批用户而波动，这意味着某一天看起来决定性的下降，第二天可能完全消失。

*(Figure 1 description: Six A/A tests where nothing is different, watched daily. The p-value moves over time, and some tests cross the line for a day before returning above it.)*
*(图 1 说明：六个无差异的 A/A 测试，每日观察。p 值随时间波动，一些测试在跨越界限一天后又回升至上方。)*

This is why the phrase “we stopped when it became significant” is not a harmless operational detail. It is part of the statistical design. If the stopping rule is not valid, the p-value at the stopping day does not mean what the team thinks it means.
这就是为什么“我们在结果显著时停止”这句话并非无害的操作细节，它是统计设计的一部分。如果停止规则无效，那么停止当天的 p 值并不代表团队所认为的含义。

### How bad it gets depends on how often you look
### 情况有多糟取决于你查看的频率

The damage grows with the number of looks. In the simulation:
损害程度随查看次数的增加而增长。在模拟中：

| How often you look | False-positive rate |
| :--- | :--- |
| 1 look, end only | 5.0% |
| 2 looks | 8.3% |
| 5 looks | 14.0% |
| 10 looks | 19.1% |
| Daily, 30 looks | 27.7% |

| 查看频率 | 假阳性率 |
| :--- | :--- |
| 仅结束时查看 1 次 | 5.0% |
| 查看 2 次 | 8.3% |
| 查看 5 次 | 14.0% |
| 查看 10 次 | 19.1% |
| 每日查看，共 30 次 | 27.7% |

The intuition is simple. If you give noise many chances to look like a signal, some of those looks will cross the threshold by chance. And the team that stops at first significance never sees the later correction. It records the lucky day as the result.
直觉很简单：如果你给噪声多次机会去伪装成信号，其中一些观察结果就会偶然跨越阈值。而那些在“首次显著”时就停止的团队永远看不到后续的修正，他们将那个“幸运日”记录为最终结果。

Among the identical-arm tests that crossed the 0.05 line at least once, half had crossed by day five. That is exactly the moment when a team is most tempted to declare a fast win. But it is also exactly when the sample is still small and the estimate is most fragile.
在至少跨越过一次 0.05 界限的同质组测试中，有一半在第 5 天就跨越了。这正是团队最容易冲动宣布“快速胜利”的时刻，但这也是样本量依然很小、估计值最脆弱的时候。

*(Figure 2 description: Among identical-arm tests that crossed p = 0.05 at least once, many first crossed in the first few days. Early significance is often just early noise.)*
*(图 2 说明：在至少跨越过一次 p = 0.05 的同质组测试中，许多测试在最初几天就首次跨越。早期的显著性往往只是早期的噪声。)*

### Even a real winner gets exaggerated
### 即使是真正的赢家也会被夸大

The same issue shows up even when the effect is real. I reran the simulation with B genuinely better than A: A converted at 10 percent and B at 11 percent, a true relative lift of 10 percent. A test that ran to the fixed 30-day horizon recorded a median lift of 10.1 percent, basically centered on the truth. But a test stopped at first significance recorded a median lift of 12.7 percent. The winner was real, but the measured size of the win was inflated by about a quarter. This happens because crossing the line early usually requires an un...
即使效果是真实的，同样的问题依然会出现。我重新运行了模拟，让 B 确实优于 A：A 的转化率为 10%，B 为 11%，真实的相对提升为 10%。运行至 30 天固定周期的测试记录的中位数提升为 10.1%，基本接近真实值。但如果在“首次显著”时停止，记录的中位数提升则为 12.7%。赢家是真实的，但测得的胜利幅度被夸大了约四分之一。这是因为过早跨越界限通常需要一个……
---
title: "When the Uncertainty Is Bigger Than the Shock: Scenario Modelling for English Local Elections"
originalUrl: "https://towardsdatascience.com/when-the-uncertainty-is-bigger-than-the-shock-scenario-modelling-for-english-local-elections/"
date: "2026-05-06T23:03:29.284Z"
---

# When the Uncertainty Is Bigger Than the Shock: Scenario Modelling for English Local Elections

**当不确定性大于冲击：英国地方选举的情景建模**

Data Science: A scenario analysis case study on calibrated uncertainty, historical error, and why some models are most useful when they refuse to forecast.
数据科学：一项关于校准不确定性、历史误差以及为何某些模型在拒绝预测时反而最有价值的情景分析案例研究。

Obinna Iheanachor | May 6, 2026 | 13 min read
Obinna Iheanachor | 2026年5月6日 | 阅读需13分钟

Across 64 English authorities and six 2026 scenarios, even the strongest scenario shock was only 13% of the median uncertainty band. In plain English: the model’s assumptions moved the result less than historical forecast error did. The most aggressive challenger surge I could parameterise sits inside the noise the model has produced in past elections. That is not a defect. It is the result.
在涵盖64个英国地方当局和6个2026年选举情景的分析中，即使是最强的情景冲击，也仅占中位数不确定性区间的13%。用通俗的话说：模型假设对结果的影响程度，小于历史预测误差的影响。我所能设定的最激进的挑战者激增幅度，依然处于该模型在过往选举中产生的“噪声”范围内。这并非缺陷，而是研究结果。

I built this scenario model expecting clean separation between assumptions. I expected S3, the challenger surge, to dominate. I expected rankings I could defend. What I got was an envelope where the strongest shock sits inside calibrated uncertainty, and where rankings dissolve when intervals are plotted on top of them.
我构建这个情景模型时，本期待假设之间能有清晰的界限。我预期S3（挑战者激增）会占据主导地位，并能得出可辩护的排名。但最终我得到的是一个“包络线”：最强的冲击被包裹在校准后的不确定性之内，而当把区间叠加在排名上时，排名便随之消解了。

This is the second instalment of a project on English local electoral data. Part 1 corrected a categorical-normalisation bug that reversed the original headline. Part 2 picks up where the corrected baseline ends and asks a different question: given the historical churn we now measure correctly, what 2026 scenarios are worth modelling, and how should we read them when uncertainty is wider than the shocks?
这是关于英国地方选举数据项目的第二部分。第一部分修正了一个导致原始标题反转的分类归一化错误。第二部分从修正后的基准线出发，提出了一个不同的问题：鉴于我们现在能准确衡量历史波动，哪些2026年的情景值得建模？当不确定性大于冲击时，我们该如何解读这些结果？

### What was modelled
### 建模内容

The 2026 English local elections are scheduled for Thursday 7 May 2026. This project covers 64 active authorities holding elections that day: 32 London boroughs, 27 metropolitan boroughs, and 5 West Yorkshire authorities. Six scenarios apply different assumptions to the same historical baseline. Four metrics are computed for each scenario × authority combination: `volatility_score`, `delta_fi`, `swing_concentration`, and `turnout_delta`. The model produces 1,536 output rows, each with a point estimate plus calibrated P10, P50, and P90 values from 2,000 draws of the empirical error distribution.
2026年英国地方选举定于2026年5月7日（周四）举行。本项目涵盖当天进行选举的64个活跃地方当局：32个伦敦自治市、27个大都市区和5个西约克郡当局。六种情景对同一历史基准应用了不同的假设。针对每个“情景×当局”组合，计算了四个指标：`volatility_score`（波动得分）、`delta_fi`、`swing_concentration`（摇摆集中度）和 `turnout_delta`（投票率变化）。模型输出了1,536行数据，每一行包含一个点估计值，以及从经验误差分布中抽取2,000次后校准的P10、P50和P90值。

| Scenario | Question | Main assumption |
| :--- | :--- | :--- |
| S0 | What if no new swing is applied? | Historical uncertainty only |
| S1 | What if 2018-2022 challenger patterns continue? | Continuation of recent challenger churn |
| S2 | What if major parties partially recover? | Establishment recovers half lost share |
| S3 | What if challengers surge harder? | Stress test: +4pp challenger surge |
| S4 | What if deprivation-linked turnout rises? | +3pp turnout in IMD deciles 1-3 |
| S5 | What if London volatility is capped by history? | London P90 upper-tail cap |

| 情景 | 问题 | 主要假设 |
| :--- | :--- | :--- |
| S0 | 如果不应用新的摇摆会怎样？ | 仅考虑历史不确定性 |
| S1 | 如果2018-2022年的挑战者模式持续会怎样？ | 近期挑战者变动趋势的延续 |
| S2 | 如果主要政党部分恢复会怎样？ | 建制派恢复一半流失份额 |
| S3 | 如果挑战者激增幅度更大呢？ | 压力测试：挑战者激增+4个百分点 |
| S4 | 如果与贫困相关的投票率上升会怎样？ | IMD（多重剥夺指数）前1-3十分位投票率+3个百分点 |
| S5 | 如果伦敦的波动受历史上限限制会怎样？ | 伦敦P90上尾上限 |

Each scenario is a controlled perturbation. Labels describe assumptions, not outcomes. The full interactive dashboard is on Tableau Public. Two definitions to carry through the rest of the article: scenario shock is the movement in the scenario point estimate relative to the baseline. Uncertainty width is the P10-to-P90 interval calibrated from historical forecast error. The 13% headline is the first divided by the second.
每个情景都是一次受控的扰动。标签描述的是假设，而非结果。完整的交互式仪表板可在Tableau Public上查看。在阅读本文后续内容前，需明确两个定义：情景冲击（scenario shock）是指情景点估计值相对于基准线的变动；不确定性宽度（uncertainty width）是指根据历史预测误差校准的P10到P90区间。文首提到的13%即为前者除以后者的结果。

### Method: backtest errors as the empirical uncertainty distribution
### 方法：将回测误差作为经验不确定性分布

Backtest errors are not just a scorecard. They can become the empirical uncertainty distribution for future scenario analysis. The standard use of a backtest is pass/fail. Did the predictions match held-out reality? That answers whether the model worked, but it leaves the residuals on the floor. A second use treats those residuals as a distribution. How wrong has the model been across boroughs and cycles, in what direction, with what spread? The answer becomes the empirical sample from which future uncertainty bands are drawn.
回测误差不仅仅是一张成绩单，它们可以成为未来情景分析的经验不确定性分布。回测的标准用法是“通过/失败”：预测是否与实际结果相符？这回答了模型是否有效，但却忽略了残差。第二种用法是将这些残差视为一种分布：模型在不同行政区和周期中犯了多大错误？方向如何？分布范围多大？这个答案成为了抽取未来不确定性区间的经验样本。

Predictive bands stop being parametric assumptions about how errors should behave. They are bootstrapped from how errors actually have behaved. This model uses backtests in the second sense. Tier-level mean-centered historical error pools from the 2014→2018 training window and the 2018→2022 backtest form the bootstrap pool from which 2026 uncertainty bands are sampled.
预测区间不再是关于误差应如何表现的参数化假设，而是通过对误差实际表现进行自助抽样（bootstrapping）得出的。本模型采用了第二种用法。从2014→2018训练窗口和2018→2022回测中提取的层级均值中心化历史误差池，构成了2026年不确定性区间抽样的自助样本池。

In practical terms: the model is asking how much movement would count as genuinely unusual relative to the noise it has produced before.
实际而言：模型是在询问，相对于其过去产生的噪声，多大的变动才算得上是真正“异常”的。

Two design choices shape the calibration. Errors are pooled at the tier level, not at the borough level. Each borough has 1-2 prior observations, which is too noisy to characterise a residual distribution. Pooling at the tier level (London, Metropolitan, West Yorkshire) keeps a sample large enough to be informative while preserving the structural distinction between geographies that have historically behaved differently.
两个设计选择决定了校准方式。首先，误差是在层级（Tier）层面而非行政区层面进行汇总的。每个行政区仅有1-2次先验观测，数据噪声太大，无法刻画残差分布。在层级层面（伦敦、大都市区、西约克郡）汇总，既能保持样本量足够大以提供信息，又能保留历史上表现各异的地理区域之间的结构性差异。

Errors are mean-centered before sampling. This separates historical bias from uncertainty dispersion. Without centering, S0’s P50 would drift away from zero because of historical mean error, mixing the model’s track record of being slightly off into the median of the band. After centering, the band represents dispersion around the scenario assumption rather than dispersion around the model’s bias.
其次，误差在抽样前进行了均值中心化处理。这区分了历史偏差与不确定性离散度。如果不进行中心化，S0的P50会因历史平均误差而偏离零点，将模型一贯的轻微偏差混入区间中位数。中心化后，区间代表的是围绕情景假设的离散度，而非围绕模型偏差的离散度。

One nuance worth flagging: mean-centering removes average historical bias but does not force the bootstrap median to equal the point estimate. When residual pools are skewed or bounded (swing_concentration has a lower bound of 1.0), the P50 can still sit slightly off the assumption. Reporting P10/P50/P90 separately, rather than mean ± standard deviation, keeps that asymmetry visible. The 2,000 draws produce stable percentile estimates while keeping the full output under 10,000 rows for clean Tableau ingestion.
值得注意的一个细节是：均值中心化消除了历史平均偏差，但并不强制要求自助抽样的中位数等于点估计值。当残差池出现偏态或有界（例如 `swing_concentration` 的下限为1.0）时，P50仍可能略微偏离假设值。通过分别报告P10/P50/P90，而不是使用“均值±标准差”，可以保持这种不对称性的可见度。2,000次抽样既能产生稳定的百分位数估计，又能将总输出控制在10,000行以内，便于Tableau进行整洁的数据导入。

Data science takeaway: Backtest errors are not just a scorecard. They can become the empirical uncertainty distribution for future scenario analysis, calibrating bands that reflect how the model has actually been wrong.
数据科学启示：回测误差不仅仅是一张成绩单。它们可以成为未来情景分析的经验不确定性分布，通过校准区间来反映模型在过去实际犯错的方式。

### The result: shocks smaller than uncertainty
### 结果：冲击小于不确定性

Three numbers carry the finding: S3 challenger surge: 13% of the median volatility interval. S1 volatility continuation: 6%. S2 establishment recovery: 5%. Each number is the scenario shock divided by the median P10-to-P90 band width across the 64 active authorities. The strongest shock, a +4pp challenger surge, moves the central estimate by abo...
三个数字概括了研究发现：S3挑战者激增仅占中位数波动区间的13%；S1波动持续仅占6%；S2建制派恢复仅占5%。每个数字都是情景冲击除以64个活跃地方当局的中位数P10到P90区间宽度。最强的冲击（+4个百分点的挑战者激增）使中心估计值变动了约……
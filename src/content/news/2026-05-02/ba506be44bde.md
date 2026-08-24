---
title: "Churn Without Fragmentation: How a Party-Label Bug Reversed My Headline Finding"
originalUrl: "https://towardsdatascience.com/fractured-local-britain-voter-volatility-in-english-councils-2018-2022/"
date: "2026-05-01T22:53:35.450Z"
---

# Churn Without Fragmentation: How a Party-Label Bug Reversed My Headline Finding
# 动荡而非碎片化：一个政党标签错误如何颠覆了我的核心发现

A data quality case study from English local elections on categorical normalisation, metric validation, and why raw labels should never define analytical groups.
这是一篇关于英国地方选举的数据质量案例研究，探讨了分类标准化、指标验证，以及为什么原始标签绝不应直接定义分析组别。

Between 2018 and 2022, English urban councils became nearly twice as volatile. Median volatility rose from 12.0 to 22.5. But the party system did not fragment. That distinction became visible only after fixing a categorical data bug.
2018年至2022年间，英国城市议会的波动性几乎翻了一番。中位数波动率从12.0上升至22.5。但政党体系并未出现碎片化。只有在修复了一个分类数据错误后，这一区别才显现出来。

Here, volatility measures how much vote share moved between party families. Fragmentation measures how many effective parties competed. A council can be highly volatile without becoming more fragmented if one major party collapses and another absorbs most of the loss.
在此，波动性衡量的是政党家族之间选票份额的转移程度。碎片化衡量的是参与竞争的有效政党数量。如果一个主要政党崩溃，而另一个政党吸收了大部分流失的选票，那么一个议会可以在不增加碎片化的情况下表现出高度的波动性。

The effective number of parties increased in only 18 of 67 comparable authorities. The median change in the fragmentation index stayed slightly negative: -0.31. The vote moved sharply, but it mostly moved inside an already-consolidating party system.
在67个可比的地方政府中，只有18个的有效政党数量有所增加。碎片化指数的中位数变化保持微弱负值：-0.31。选票发生了剧烈变动，但主要是在一个已经趋于整合的政党体系内部进行的。

The first version of this analysis looked dramatically different. It suggested fragmentation had risen in 66 of 67 councils and that median volatility had tripled. That was wrong. The error came from treating ballot labels such as “Labour Party” and “Labour and Co-operative Party” as separate analytical parties.
该分析的初版结果截然不同。它显示67个议会中有66个出现了碎片化上升，且中位数波动率翻了三倍。这是错误的。错误源于将“工党（Labour Party）”和“工党与合作党（Labour and Co-operative Party）”等选票标签视为独立的分析政党。

Once party families were normalised before computing the metrics, the headline changed completely. What looked like a party-label bug was really a category-modelling failure. And its consequences propagated through every downstream metric. The corrected story is less sensational. It is also more useful.
一旦在计算指标前对政党家族进行了标准化处理，结论便完全改变了。看起来像是政党标签的错误，实际上是分类建模的失败。其后果波及了每一个下游指标。修正后的结论虽然不再那么耸人听闻，但却更有价值。

### Categories are part of the model
### 分类是模型的一部分

Before walking through the findings, it is worth explaining what went wrong, because this is the part that generalises most directly beyond elections. Party labels are not neutral strings. They encode messy institutional reality: alliances, ballot wording, local party brands, national party rebrands, and inconsistent source coding.
在深入探讨发现之前，有必要解释一下哪里出了问题，因为这部分内容最能直接推广到选举之外的领域。政党标签并非中性的字符串。它们编码了混乱的制度现实：联盟、选票措辞、地方政党品牌、全国政党更名以及不一致的源编码。

If those labels are grouped incorrectly, every downstream metric can look precise and still be wrong. That is exactly what happened. Fragmentation was computed before normalising party families. In boroughs where “Labour Party” and “Labour and Co-operative Party” both appeared, the Laakso-Taagepera denominator treated them as separate parties. That artificially inflated the effective number of parties.
如果这些标签分组错误，每一个下游指标看起来都很精确，但实际上却是错误的。这正是所发生的情况。碎片化是在政党家族标准化之前计算的。在“工党”和“工党与合作党”同时出现的行政区，Laakso-Taagepera分母将它们视为独立政党。这人为地夸大了有效政党数量。

The same risk applied to UKIP, Reform UK, and Brexit Party labels. The fix was conceptually simple: compute analytical party families before metric aggregation. The pipeline now separates three identities:
同样的风险也存在于英国独立党（UKIP）、英国改革党（Reform UK）和脱欧党（Brexit Party）的标签中。修复方法在概念上很简单：在指标聚合之前计算分析性的政党家族。现在的流水线将三种身份分离开来：

*   **Metric party family:** used for fragmentation, volatility, and swing calculations.
*   **指标政党家族：** 用于碎片化、波动性和选票摆动计算。
*   **Challenger party family:** used for scenario and challenger identification.
*   **挑战者政党家族：** 用于情景分析和挑战者识别。
*   **Display party label:** used only for Tableau colour and labelling.
*   **显示政党标签：** 仅用于Tableau的颜色和标注。

Do not let display labels leak into metric definitions. Do not let raw strings define analytical categories without an explicit contract.
不要让显示标签渗透到指标定义中。在没有明确契约的情况下，不要让原始字符串定义分析类别。

The difference between the original headline (“fragmentation rose in 66 of 67 councils”) and the corrected headline (“fragmentation rose in only 18 of 67”) is not a rounding error. It is a categorisation error that propagated through the entire pipeline. Every chart and every narrative conclusion shifted once the fix was applied.
原始标题（“67个议会中有66个碎片化上升”）与修正后标题（“67个中仅有18个上升”）之间的差异并非舍入误差。这是一个在整个流水线中传播的分类错误。一旦应用了修复措施，每一张图表和每一个叙述结论都发生了改变。

The broader principle applies well beyond elections. Product categories, job titles, company names, diagnosis codes, and merchant names all have the same failure mode. If category normalisation happens after aggregation, it is too late. The story has already been distorted.
这一更广泛的原则不仅适用于选举。产品类别、职位名称、公司名称、诊断代码和商户名称都存在同样的失效模式。如果分类标准化发生在聚合之后，那就太晚了。故事已经被扭曲了。

### How the analysis works
### 分析是如何运作的

The project follows a pattern-first approach: build the data pipeline, export the metrics, construct the visualisation, then let the data tell you which story it actually supports. The corrected fragmentation finding, the null turnout correlation, and the geographic shift in Green gains all emerged from diagnostic validation, not from the original project plan.
该项目遵循“模式优先”的方法：构建数据流水线，导出指标，构建可视化，然后让数据告诉你它真正支持的故事。修正后的碎片化发现、投票率零相关性以及绿党收益的地理转移，都是从诊断验证中得出的，而非最初的项目计划。

The pipeline ingests ward-level election results from the DCLEAPIL v1.0 dataset (Leman 2025), which draws on Andrew Teale’s LEAP archive and Democracy Club data. It normalises party families, aggregates vote shares to the authority level, computes fragmentation and volatility metrics, and exports structured CSVs for an interactive Tableau dashboard.
该流水线摄取了来自DCLEAPIL v1.0数据集（Leman 2025）的选区级选举结果，该数据集利用了Andrew Teale的LEAP档案和Democracy Club的数据。它对政党家族进行标准化，将选票份额聚合到地方政府层面，计算碎片化和波动性指标，并导出结构化CSV文件用于交互式Tableau仪表板。

The analysis covers 68 English metropolitan borough, London borough, and West Yorkshire authorities across five regions. Of these, 67 have comparable fragmentation data across the 2018-to-2022 window.
该分析涵盖了五个地区的68个英国大都市区、伦敦行政区和西约克郡地方政府。其中，67个在2018年至2022年期间拥有可比的碎片化数据。

The core metrics are:
核心指标包括：

*   **Fragmentation Index:** the Laakso-Taagepera effective number of parties, from authority-level vote shares.
*   **碎片化指数：** 基于地方政府级选票份额计算的Laakso-Taagepera有效政党数量。
*   **Volatility Score:** a composite metric combining a Pedersen-style absolute swing component with the change in fragmentation.
*   **波动性得分：** 结合了Pedersen式绝对摆动分量与碎片化变化的复合指标。
*   **Turnout Delta:** percentage-point change in turnout across the same window.
*   **投票率增量：** 同一窗口期内投票率的百分点变化。
*   **Party Swing:** change in vote share by normalised party family.
*   **政党摆动：** 按标准化政党家族划分的选票份额变化。

The approach generalises to any domain where you need to compute derived metrics from messy categorical data and present them in a validated, reproducible visualisation. The full pipeline, calculated fields, and Tableau build guide are open-source.
这种方法适用于任何需要从混乱的分类数据中计算衍生指标，并以经过验证、可复现的可视化方式呈现的领域。完整的流水线、计算字段和Tableau构建指南均为开源。

### The headline: volatility rose, fragmentation did not
### 核心结论：波动性上升，碎片化未上升

The first dashboard panel maps volatility by authority. Circle size represents the volatility score. Colour represents the change in fragmentation: teal where it rose, amber where it fell.
仪表板的第一个面板按地方政府绘制了波动性地图。圆圈大小代表波动性得分。颜色代表碎片化的变化：青色表示上升，琥珀色表示下降。

*Figure 1: Volatility by authority, 2018 to 2022. Circle size is volatility score. Colour shows whether fragmentation rose (teal) or fell (amber). Higher churn without broad-based fragmentation.*
*图1：2018年至2022年各地方政府的波动性。圆圈大小为波动性得分。颜色显示碎片化是上升（青色）还是下降（琥珀色）。更高的动荡，但没有广泛的碎片化。*

The map shows two things at once. First, volatility genuinely increased: about 1.9 times higher than the prior window. Second, fragmentation did not rise in most places. Only 18 of 67 comparable authorities had a higher effective number of parties in 2022 than in 2018. The highest-volatility authorities were Solihull (67.6), Kingston upon Thames (60.3), Sutton (48.7),
该地图同时展示了两件事。首先，波动性确实增加了：比上一个窗口期高出约1.9倍。其次，大多数地方的碎片化并没有上升。在67个可比的地方政府中，只有18个在2022年的有效政党数量高于2018年。波动性最高的地方政府是索利哈尔（67.6）、泰晤士河畔金斯顿（60.3）和萨顿（48.7）。
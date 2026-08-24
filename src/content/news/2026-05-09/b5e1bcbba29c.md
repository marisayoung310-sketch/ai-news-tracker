---
title: "When Customers Churn at Renewal: Was It the Price or the Project?"
originalUrl: "https://towardsdatascience.com/when-customers-churn-at-renewal-was-it-the-price-or-the-project/"
date: "2026-05-08T22:48:11.364Z"
---

# When Customers Churn at Renewal: Was It the Price or the Project?
# 当客户在续约时流失：是因为价格还是项目？

**Data Science: A practitioner's guide to causal attribution when two churn drivers arrive at once.**
**数据科学：当两个流失驱动因素同时出现时，因果归因的实践指南。**

Renewal pricing is one of those decisions that seems straightforward until you have to measure it. A customer’s introductory rate expires, the invoice goes up, and you want to know whether the price change hurt retention. Simple enough in theory. The problem is that something else is almost always happening at the same time. The initiative that drove the original purchase, whether it was a system migration, compliance push, sales transformation, or product launch, has wrapped up. The team that championed the tool has moved on to the next thing. And the product that once felt essential is quietly becoming a line item someone is going to question.
续约定价是那种看起来很简单，但一旦需要衡量时就变得复杂的决策之一。客户的入门优惠期结束，账单金额上涨，你想知道价格变动是否损害了留存率。理论上这很简单，但问题在于，几乎总有其他事情在同时发生。推动最初购买的计划——无论是系统迁移、合规性推动、销售转型还是产品发布——已经结束。当初支持该工具的团队已经转向了下一个项目。而曾经感觉必不可少的产品，正悄然变成某人会质疑的一项开支。

So when the customer churns, the account team says it is the price. The retention strategy team says the use case ran its course. Product says the platform never got past the original buyer. Everyone has a theory and a spreadsheet to back it up. Which attribution you land on matters, not abstractly, but in terms of what you do next.
因此，当客户流失时，客户经理团队说是价格问题；留存策略团队说是用例已经过时；产品团队则说平台从未超越最初的购买者。每个人都有自己的理论，并有电子表格作为支撑。你最终选择哪种归因方式至关重要，这不仅是抽象的理论，更决定了你接下来的行动。

| If the primary cause is… | The business response is… |
| :--- | :--- |
| Promo expiry (price shock) | Extend discounting, redesign renewal packaging, adjust price ladder |
| Initiative completion (value exhaustion) | Invest in expansion use cases, trigger lifecycle retention plays, improve onboarding to recurring workflows |
| Both forces interact | Time renewal offers around new business moments; discount alone will not solve a value problem |

| 如果主要原因是…… | 业务应对措施是…… |
| :--- | :--- |
| 促销到期（价格冲击） | 延长折扣、重新设计续约方案、调整价格阶梯 |
| 项目完成（价值耗尽） | 投资于扩展用例、触发生命周期留存策略、改进向循环工作流的入职引导 |
| 两者相互作用 | 围绕新的业务节点安排续约优惠；仅靠折扣无法解决价值问题 |

Each method below builds a different counterfactual for the same event. Picking the right one is not the hard part. Knowing which question you are trying to answer before you open a notebook, that is where most of these analyses go sideways.
下面每种方法都为同一事件构建了不同的反事实模型。选择正确的方法并不难，难的是在打开笔记本（Notebook）之前明确你要回答的问题，这正是大多数此类分析偏离方向的地方。

### Define the question before the method
### 在方法之前定义问题

Before you touch the data, you need to decide what you are actually trying to estimate. The same churn event at renewal can produce three meaningfully different numbers depending on what you are asking:
在触碰数据之前，你需要决定你到底要估算什么。同一个续约流失事件，根据你的提问方式，可以得出三个意义截然不同的数字：

1. **The promo-cohort effect.** What was the average churn impact on customers whose introductory discount expired? The finance team usually wants this number because it lines up with how renewal revenue gets reported.
1. **促销群体效应。** 入门折扣到期的客户，其平均流失影响是多少？财务团队通常需要这个数字，因为它与续约收入的报告方式相一致。

2. **The initiative-completion effect.** What was the churn impact on customers whose original adoption use case had concluded by renewal? The retention strategy team wants this one because it speaks to whether the product achieved sticky value or just served a project.
2. **项目完成效应。** 在续约时原始采用用例已经结束的客户，其流失影响是多少？留存策略团队需要这个数字，因为它反映了产品是实现了粘性价值，还是仅仅服务于一个项目。

3. **The joint effect and its interaction.** What happened to customers who faced both at the same time, price increase and value exhaustion arriving together? This number is almost always larger than either force alone would predict, and it is usually the one that actually explains the churn spike.
3. **联合效应及其相互作用。** 当价格上涨和价值耗尽同时发生时，这些客户的情况如何？这个数字几乎总是大于任何单一因素的预测值，而且它通常才是真正解释流失激增的原因。

These are not the same number and they do not answer the same question. Treating them as interchangeable is the most common mistake I see in renewal churn analyses, and it is usually what keeps the account team versus retention strategy debate going in circles.
这些数字并不相同，回答的问题也不一样。将它们视为可互换的是我在续约流失分析中最常见的错误，这通常也是导致客户经理团队与留存策略团队争论不休的原因。

### The Setup
### 设置

The synthetic dataset has 10,000 B2B customers observed around their renewal dates. Each has two flags: `promo_expired` (did their introductory rate end at renewal?) and `initiative_complete` (had the original use case concluded before renewal?).
该合成数据集包含 10,000 名在续约日期前后观察到的 B2B 客户。每个客户有两个标记：`promo_expired`（入门费率是否在续约时结束？）和 `initiative_complete`（原始用例是否在续约前结束？）。

One thing worth flagging upfront: `initiative_complete` needs to be defined using pre-renewal signals, things like customer relationship management (CRM) milestones, implementation completion, or customer success health scores. If you infer it from declining usage after the fact, you will end up calling early churn behavior a cause of churn rather than a symptom of it.
有一点需要提前说明：`initiative_complete` 需要使用续约前的信号来定义，例如客户关系管理 (CRM) 里程碑、实施完成情况或客户成功健康评分。如果你事后通过使用率下降来推断，你最终会将早期的流失行为称为流失的原因，而不是流失的症状。

**The true effects baked into the simulation:**
**模拟中内置的真实效应：**

*   Baseline 6-month churn (neither force): 8%
*   Promo expiry alone: +5 pp (13% churn)
*   Initiative completion alone: +4 pp (12% churn)
*   Both forces together: +14 pp (22% churn), a +5 pp interaction surplus above the additive expectation of 17%
*   基准 6 个月流失率（无任何因素）：8%
*   仅促销到期：+5 个百分点（13% 流失率）
*   仅项目完成：+4 个百分点（12% 流失率）
*   两者同时发生：+14 个百分点（22% 流失率），比 17% 的加性预期高出 5 个百分点的相互作用盈余。
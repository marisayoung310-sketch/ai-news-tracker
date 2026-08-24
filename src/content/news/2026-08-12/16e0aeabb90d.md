---
title: "The Budget Split That Explains Itself"
originalUrl: "https://towardsdatascience.com/the-budget-split-that-explains-itself/"
date: "2026-08-11T22:28:26.203Z"
---

# The Budget Split That Explains Itself
# 预算分配的“自我解释”之道

Data Science: How to diversify a budget without losing the shadow prices that explain the result.
数据科学：如何在不丢失解释结果的“影子价格”前提下实现预算多元化。

Left alone, the optimiser handed the entire £20,000 budget to a single channel. Add one rule that forced a little onto a second channel and it complied, but it also returned a quiet negative number beside that rule. The number meant the floor you set is working against you, and it said exactly what that costs.
如果任由优化器自行运作，它会将全部 2 万英镑预算分配给单一渠道。若增加一条规则强制将少量预算分配给第二个渠道，它会照办，但同时会在该规则旁返回一个不起眼的负数。这个数字意味着你设定的最低限额正在产生负面影响，并精确地揭示了其背后的成本。

Many optimisation workflows stop at the allocation itself. The reason behind the split is already sitting in the math, for free, and the only thing standing between you and it is one modelling decision that looks completely harmless. This is about not throwing it away.
许多优化工作流在得出分配方案后就停止了。其实，分配背后的逻辑早已蕴含在数学模型中，唾手可得，而阻碍你获取这些洞察的，仅仅是一个看起来完全无害的建模决策。本文旨在探讨如何保留这些宝贵的洞察。

Start with why the easy version fails. The obvious approach is to score each channel by return per pound and fund the winners. It makes a clean table and a plan nobody can use. Ranking assumes each choice stands alone, but budget allocation is one connected decision. Every pound you give one channel is a pound the others lose. Add a single rule, “keep at least £3,000 here,” and a sorted list has nothing to say.
首先，我们来看看为什么简单的方案会失败。最直观的方法是根据每英镑的回报率对渠道进行评分，并资助表现最好的渠道。这虽然能生成一张整洁的表格，但得出的计划却往往无法落地。排名假设每个选择都是独立的，但预算分配是一个关联决策。你给一个渠道的每一英镑，都是其他渠道失去的每一英镑。一旦增加一条规则，比如“此处至少保留 3000 英镑”，简单的排序列表就失效了。

So it is a constrained optimisation problem, and Linear Programming is the standard tool for those. The reason to reach for it, though, is not the allocation. It is a byproduct almost everyone ignores. When a continuous LP finishes, it can also provide the dual value of its constraints: how much the objective would move if you loosened a rule by one unit. That byproduct is the explanation. And it is only valid while the model stays a continuous LP.
因此，这是一个约束优化问题，而线性规划（Linear Programming, LP）是解决此类问题的标准工具。然而，使用它的原因不仅仅是为了分配，更是为了获取一个几乎被所有人忽略的副产品。当连续线性规划完成时，它还能提供约束条件的“对偶值”（dual value）：即如果你将某条规则放宽一个单位，目标函数会发生多大变化。这个副产品就是解释。而且，它仅在模型保持为连续线性规划时才有效。

Which is exactly where the harmless-looking decision comes in. A plain LP will dump the whole budget on the single best channel and starve the rest. The natural fix is an on/off switch, a binary “run this channel or not” variable. It solves the dumping. It also turns the model into a mixed-integer program, where the LP shadow prices that made the explanation possible are no longer directly available. You get the split and lose the reason.
这正是那个看起来无害的决策发挥作用的地方。普通的线性规划会将全部预算倾注在表现最好的单一渠道上，而让其他渠道“挨饿”。自然的修正方法是使用开关，即一个二元的“是否运行该渠道”变量。这解决了倾注问题，但也使模型变成了混合整数规划（Mixed-Integer Program），此时，使解释成为可能的线性规划“影子价格”将不再直接可用。你得到了分配方案，却丢失了背后的逻辑。

The way out is to make diversification without a switch. Slice each channel’s budget into bands, and make each band pay less than the one before it.
解决之道在于：在不使用开关的情况下实现多元化。将每个渠道的预算切分成若干区间，并使每个区间的边际收益递减。

```python
from dataclasses import dataclass
@dataclass
class Platform:
    name: str
    productivity: float # historical KPI per unit of spend
    min_spend: float = 0.0 # optional policy floor

# Successive slices of the total budget, each earning a lower marginal yield.
BRACKETS = [(0.25, 1.00), (0.35, 0.65), (0.40, 0.35)] # (budget fraction, marginal yield)
```

The first slice of a strong channel is worth a lot. Its third slice is worth less than the first slice of a weaker rival, so the optimiser spreads the money on its own. No binary variables, so the familiar LP shadow prices remain available. Diminishing returns become geometry instead of logic. Without diminishing returns, the LP concentrates the entire budget on the highest-performing channel. Adding decreasing marginal yields lets the same LP model diversify without introducing binary decisions.
强力渠道的第一部分预算价值很高。但其第三部分预算的价值可能低于较弱竞争对手的第一部分，因此优化器会自动分散资金。由于没有二元变量，熟悉的线性规划影子价格依然可用。边际收益递减变成了几何问题，而非逻辑问题。如果没有边际收益递减，线性规划会将全部预算集中在表现最好的渠道上。通过增加递减的边际收益，同一个线性规划模型无需引入二元决策即可实现多元化。

One caveat on productivity: it is just historical KPI per pound, an observed ratio, not a causal estimate. That keeps the data demand low enough for a small team, at the price of inheriting whatever bias is already in the numbers. A fair trade when it is a deliberate one. The model stays short. PuLP keeps it close to the plain description of the problem.
关于生产力的一点警告：它仅仅是每英镑的历史 KPI，是一个观测比率，而非因果估计。这使得数据需求足够低，适合小团队使用，代价是继承了数据中已有的任何偏差。只要是有意为之，这便是一笔公平的交易。模型保持简洁，PuLP 库使其代码逻辑与问题的直观描述保持高度一致。

```python
import pulp
def allocate(budget, platforms):
    model = pulp.LpProblem("budget_allocation", pulp.LpMaximize)
    slices = {}
    for p in platforms:
        slices[p.name] = [
            (pulp.LpVariable(f"x_{p.name}_b{i}", lowBound=0, upBound=frac * budget), y)
            for i, (frac, y) in enumerate(BRACKETS)
        ]
    model += pulp.lpSum(
        p.productivity * y * var for p in platforms for (var, y) in slices[p.name]
    )
    model += (pulp.lpSum(var for p in platforms for (var, _) in slices[p.name]) <= budget, "total_budget")
    for p in platforms:
        if p.min_spend > 0:
            model += (pulp.lpSum(var for (var, _) in slices[p.name]) >= p.min_spend, f"min_{p.name}")
    model.solve(pulp.PULP_CBC_CMD(msg=False))
    return model, slices
```

One detail earns its keep at the end: every constraint has a name. An unnamed constraint still binds, it just cannot tell you afterwards that it did. Naming them is what lets the split talk back. And talking back is the whole point. Each named constraint reports two things: whether it is tight, and its shadow price.
最后，一个细节至关重要：每个约束都有一个名称。未命名的约束依然有效，但事后无法告诉你它是否起到了限制作用。为它们命名，才能让分配方案“开口说话”。而这正是本文的核心目的。每个命名的约束都会报告两件事：它是否处于紧约束状态（tight），以及它的影子价格。

```python
def interpret(model):
    binding, shadow = [], {}
    for name, con in model.constraints.items():
        shadow[name] = round(con.pi, 4) if con.pi is not None else None
        if con.slack is not None and abs(con.slack) < 1e-6:
            binding.append(name)
    return binding, shadow
```

Read the signs and the plan starts speaking plainly. A binding budget cap is positive: another pound would earn this much more. A binding minimum-spend floor is negative: forcing money onto a weaker channel cost this much. A shadow price of zero is a rule you wrote down that never touched this decision.
解读这些信号，计划就开始变得清晰易懂。紧约束的预算上限影子价格为正：意味着每增加一英镑能带来多少额外收益。紧约束的最低支出下限影子价格为负：意味着强制将资金分配给较弱渠道所付出的成本。影子价格为零，则说明你写下的规则并未对该决策产生任何影响。

Watch it flip. Give it £20,000, two platforms, one lead-gen goal, and a £3,000 floor on each. LinkedIn turned £9,500 into 300 leads, Facebook £8,000 into 150.
看看它的变化。假设有 2 万英镑预算，两个平台，一个潜在客户开发目标，且每个平台设有 3000 英镑的最低限额。LinkedIn 用 9500 英镑带来了 300 个线索，Facebook 用 8000 英镑带来了 150 个。

They are close, so the split settles near 60/40 toward LinkedIn. Only the budget binds, and both floors sit idle. Productivity drove it; no rule interfered. Now make LinkedIn clearly stronger, 380 leads on £9,500 against 30 on £4,200, and drop Facebook’s floor to £500. LinkedIn receives £19,500 while Facebook stays at exactly its £500 minimum. That floor now binds, with a negative shadow price. This is the number from the opening: the model, telling you your own safety rule has a cost, and printing it next to the plan instead of hiding it inside.
两者表现接近，因此分配比例稳定在 60/40 左右，偏向 LinkedIn。此时只有预算上限起作用，两个最低限额均未被触及。生产力驱动了分配，没有规则干扰。现在，让 LinkedIn 的表现更强（9500 英镑带来 380 个线索，而 Facebook 4200 英镑仅带来 30 个），并将 Facebook 的最低限额降至 500 英镑。LinkedIn 获得了 19500 英镑，而 Facebook 刚好维持在 500 英镑的最低限额。此时，该下限成为紧约束，并伴随一个负的影子价格。这就是开头提到的那个数字：模型在告诉你，你设定的安全规则是有代价的，它直接将成本打印在计划旁边，而不是将其隐藏在内部。
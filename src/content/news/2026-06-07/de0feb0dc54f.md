---
title: "Who Will Win the 2026 Soccer World Cup?"
originalUrl: "https://towardsdatascience.com/who-will-win-the-2026-soccer-world-cup/"
date: "2026-06-06T22:46:28.382Z"
---

# Who Will Win the 2026 Soccer World Cup?
# 谁将赢得 2026 年世界杯足球赛？

**Data Science: Who Will Win the 2026 Soccer World Cup? Building a forecast from Elo, Poisson, and 10,000 simulations**
**数据科学：谁将赢得 2026 年世界杯？基于 Elo 等级分、泊松分布和 10,000 次模拟的预测**

Ari Joury, PhD | Jun 6, 2026 | 8 min read
Ari Joury 博士 | 2026 年 6 月 6 日 | 阅读需 8 分钟

The 2026 World Cup kicks off on June 11 with 48 teams, 104 matches, and the usual avalanche of hot takes. I wanted a forecast I could actually defend. Not just a cool machine learning model with nice results, but a model where every number traces back to an explicit assumption I could argue about.
2026 年世界杯将于 6 月 11 日开赛，共有 48 支球队参加，进行 104 场比赛，随之而来的还有铺天盖地的热门评论。我想要一个我真正能够论证的预测。它不仅仅是一个结果漂亮、看起来很酷的机器学习模型，而是一个每一个数字都能追溯到明确假设、且我可以为其辩护的模型。

This article builds that forecast from scratch. It is deliberately simple: rate every team, convert each matchup into a goal distribution, and simulate the whole tournament tens of thousands of times.
本文将从零开始构建这一预测。它的逻辑刻意保持简单：为每支球队评分，将每场对决转化为进球分布，并对整个赛事进行数万次模拟。

This may sound very football-specific, but pretty much everything in this article, from the methodology to the way we interpret results, are universal to data science. Swap “teams” for sales reps, delivery dates, server loads, or churn cohorts and the same three steps give you a defensible forecast instead of a point estimate.
这听起来可能非常针对足球，但本文中的几乎所有内容，从方法论到我们解读结果的方式，对于数据科学来说都是通用的。将“球队”替换为销售代表、交付日期、服务器负载或流失群体，同样的三个步骤就能为你提供一个可辩护的预测，而不是一个简单的点估计。

The real transferable skill here is building a pipeline where every number traces back to an assumption you can argue about, rather than one a black box machine learning model hides from you. In our soccer case, this means: No tracking data, no deep learning, nothing you couldn’t rebuild in an afternoon.
这里真正可迁移的技能是构建一个流水线，让每一个数字都能追溯到你可以论证的假设，而不是隐藏在黑盒机器学习模型背后的数字。在我们的足球案例中，这意味着：没有追踪数据，没有深度学习，没有任何你无法在一个下午内重建的东西。

But don’t stop reading here! The point isn’t sophistication. It’s about having a transparent pipeline that forces you to confront the very modeling choices that black boxes hide. We’ll build our model in three steps and interrogate the assumptions at each one.
但别停下！重点不在于复杂性。而在于拥有一个透明的流水线，迫使你去面对那些被黑盒隐藏的建模选择。我们将分三步构建模型，并审视每一步的假设。

### Step 1: Rate every team with Elo
### 第一步：使用 Elo 等级分评估每支球队

You can’t forecast a match without a number for how good each side is. The cleanest off-the-shelf option for national teams is the World Football Elo rating, an adaptation of Arpad Elo’s chess system. Elo is a single self-correcting equation. Each team carries a rating R.
如果不给每支球队的实力打分，就无法预测比赛。对于国家队来说，最简洁的现成方案是世界足球 Elo 等级分，它是对 Arpad Elo 国际象棋评分系统的改编。Elo 是一个单一的自我修正方程。每支球队都有一个等级分 R。

Before a match, the expected score of team A against team B (on a 0–1 scale, where 1 is a win) is a logistic function of the rating difference: E_A = 1 / (1 + 10^(-(R_A - R_B) / 400))
赛前，A 队对阵 B 队的预期得分（以 0-1 为刻度，1 代表获胜）是等级分差的逻辑函数：E_A = 1 / (1 + 10^(-(R_A - R_B) / 400))

After the match, you nudge the rating toward what actually happened: R_A' = R_A + K * (S_A - E_A), where S_A is the realized result (1 win, 0.5 draw, 0 loss) and K controls how fast ratings move.
赛后，你根据实际结果调整等级分：R_A' = R_A + K * (S_A - E_A)，其中 S_A 是实际结果（1 为胜，0.5 为平，0 为负），K 控制等级分变动的速度。

The football variant adds two wrinkles that matter: K scales with the margin of victory (a 4–0 moves ratings more than a 1–0), and it weights competitive matches above friendlies. The constant 400 is a scale choice — it’s what makes a 400-point gap correspond to roughly a 10:1 favorite (E ≈ 0.91).
足球变体增加了两个重要的细节：K 会随胜分差而缩放（4-0 比 1-0 对等级分的影响更大），并且它对正式比赛的权重高于友谊赛。常数 400 是一个比例选择——它使得 400 分的差距大致对应 10:1 的胜率优势（E ≈ 0.91）。

For the model, we only need the current ratings, stored as a dictionary. I’m using the pre-tournament snapshot from early June 2026, taken from a freely reusable Kaggle dataset that compiles these ratings:
对于模型，我们只需要存储在字典中的当前等级分。我使用的是 2026 年 6 月初赛前的快照，取自一个可自由使用的 Kaggle 数据集，该数据集汇编了这些评分：

```python
# World Football Elo Ratings, pre-tournament snapshot (early June 2026).
# Source: "2026 FIFA World Cup — Historical Elo Ratings" (Kaggle, CC BY-SA 4.0),
# compiling data from World Football Elo Ratings (eloratings.net).
ELO = {
    "Spain": 2155,
    "Argentina": 2113,
    "France": 2062,
    "England": 2020,
    "Brazil": 1988,
    "Portugal": 1984,
    "Colombia": 1977,
    "Netherlands": 1944,
    "Germany": 1925,
    # ... all 48 qualified teams
}
```

Assumption check: Elo compresses everything — form, squad quality, fatigue — into one number and assumes a team’s strength is roughly stationary in the short run. That’s a strong simplification, but it’s an honest, auditable one, and Elo is hard to beat as a single feature.
假设检查：Elo 将一切——状态、阵容质量、疲劳度——压缩成一个数字，并假设球队实力在短期内大致保持不变。这是一个强有力的简化，但它是一个诚实且可审计的简化，作为单一特征，Elo 很难被超越。

### Step 2: Turn a rating gap into a goal distribution
### 第二步：将等级分差转化为进球分布

A rating difference gives us a win probability, but to simulate a tournament we want scorelines — they drive goal difference, group tiebreakers, and the texture of the thing. The standard move in soccer analytics is to model each team’s goals as a Poisson process.
等级分差给了我们获胜概率，但为了模拟锦标赛，我们需要比分——它们决定了净胜球、小组赛平局决胜规则以及比赛的走势。足球分析中的标准做法是将每支球队的进球建模为泊松过程。

The Poisson distribution gives the probability of observing k events when events occur independently at a constant average rate λ: P(k goals) = λ^k * e^(-λ) / k!
泊松分布给出了当事件以恒定的平均速率 λ 独立发生时，观察到 k 次事件的概率：P(k goals) = λ^k * e^(-λ) / k!

Goals fit this well empirically: they’re discrete, relatively rare, and roughly memoryless within a match. If we treat the two teams’ goal counts as independent Poisson variables with means λ_home and λ_away, the full scoreline distribution is just the outer product of their two pmfs, and we can read off win/draw/loss probabilities by summing the appropriate cells:
进球在经验上非常符合这一点：它们是离散的、相对罕见的，并且在比赛中大致是无记忆的。如果我们把两队的进球数视为均值为 λ_home 和 λ_away 的独立泊松变量，那么完整的比分分布就是它们两个概率质量函数（pmf）的外积，我们可以通过对相应的单元格求和来得出胜/平/负的概率：

```python
from scipy.stats import poisson
import numpy as np

def match_probs(lam_home, lam_away, max_goals=10):
    h = poisson.pmf(np.arange(max_goals + 1), lam_home)
    a = poisson.pmf(np.arange(max_goals + 1), lam_away)
    grid = np.outer(h, a) # grid[i, j] = P(home i, away j)
    p_home = np.tril(grid, -1).sum() # home goals > away goals
    p_draw = np.trace(grid)
    p_away = np.triu(grid, 1).sum()
    return p_home, p_draw, p_away
```

Assumption check: the independence assumption is convenient but imperfect — real scorelines show correlation and an excess of low-scoring draws (0–0, 1–1). The standard fix is the Dixon–Coles adjustment, which adds a low-score correction term and a time-decay weighting on historical matches. We’re skipping it here for clarity; it’s a natural upgrade and exactly the kind of refinement my upcoming book‘s Poisson chapter walks through.
假设检查：独立性假设很方便但不完美——真实的比分显示出相关性，且低分平局（0-0, 1-1）过多。标准的修正方法是 Dixon-Coles 调整，它增加了一个低分修正项，并对历史比赛进行了时间衰减加权。为了清晰起见，我们在此略过；这是一个自然的升级，也正是我的新书在泊松章节中详细介绍的那种改进。

### Step 3: Connect ratings to goals
### 第三步：将等级分与进球联系起来

We need λ_home and λ_away as a function of the Elo gap. A robust piece of soccer-modeling folklore is that a ~400-point Elo edge is worth roughly one goal of supremacy. So we split a baseline of ~2.7 total goals (a typical international average) between the teams according to their rating difference:
我们需要 λ_home 和 λ_away 作为 Elo 分差的函数。足球建模中一个稳健的经验法则是，约 400 分的 Elo 优势大约相当于一球的领先优势。因此，我们根据等级分差将约 2.7 个总进球（典型的国际比赛平均值）的基准分配给两支球队：

```python
GOALS_BASE = 2.7
GOALS_PER_400_ELO = 1.0

def lambdas(elo_a, elo_b):
    diff = (elo_a - elo_b) / 400.0 * GOALS_PER_400_ELO
    la = max(0.15, GOALS_BASE / 2 + diff / 2)
    lb = max(0.15, GOALS_BASE / 2 - diff / 2)
    return la, lb
```

The floor at 0.15 keeps even a massive underdog from being assigned a non-physical negative scoring rate. A more principled version fits log(λ) = β₀ + β₁·Δrating as a Poisson GLM on real match data; the linear-supremacy heuristic above is the back-of-envelope version and lands in the same place for the favorites.
0.15 的下限确保了即使是极弱的球队也不会被分配到不符合物理意义的负进球率。一个更严谨的版本是将 log(λ) = β₀ + β₁·Δrating 作为泊松广义线性模型（GLM）在真实比赛数据上进行拟合；上述线性领先启发式方法是“信封背面的计算”版本，对于热门球队来说，其结果是一样的。

### Step 4:
### 第四步：
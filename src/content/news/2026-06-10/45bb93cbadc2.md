---
title: "Can Machine Learning Predict the World Cup?"
originalUrl: "https://towardsdatascience.com/can-machine-learning-predict-the-world-cup/"
date: "2026-06-09T23:07:12.375Z"
---

# Can Machine Learning Predict the World Cup?
# 机器学习能预测世界杯吗？

**Building an ML football forecaster in R**
**在 R 语言中构建机器学习足球预测模型**

**Introduction**
With FIFA set to kick off on Thursday, June 11, 2026, the opening match at the Mexico City Stadium, I think it would be fun to build the best ML model we can to predict match outcomes. To do this, I have brought together several databases—49,000 matches—with data on Elo ratings, match results, and cup locations. From FIFA to the Baltic Cup, with matches from 1872 to 2026, we will take a probabilistic approach to the sport. We will compare the performance of several ML models, including multinomial regression, multinomial ridge / elastic-net model, and LightGBM. We will also work to understand the strengths and weaknesses of our models to create a well-calibrated model that predicts home wins 86% of the time. By weighing model performance, calibration, and complexity, we will find the best model for our data.

**引言**
随着 2026 年 6 月 11 日星期四国际足联世界杯在墨西哥城体育场拉开帷幕，我认为构建一个尽可能优秀的机器学习模型来预测比赛结果会是一件很有趣的事。为此，我整合了多个数据库（共 49,000 场比赛），其中包含了 Elo 等级分、比赛结果和举办地等数据。从国际足联世界杯到波罗的海杯，涵盖了 1872 年至 2026 年的比赛，我们将采用概率论的方法来分析这项运动。我们将比较几种机器学习模型的表现，包括多项式回归、多项式岭回归/弹性网络模型以及 LightGBM。我们还将深入了解这些模型的优缺点，从而创建一个校准良好的模型，使其在预测主场获胜时的准确率达到 86%。通过权衡模型的性能、校准度和复杂度，我们将为数据找到最佳模型。

***

**Soccer by the Numbers**
A lot of people say soccer is sleep-inducing. As a soccer fan, I disagree, but to be fair, this is not without reason. The majority of matches end with fewer than 5 goals, and anything above 20 is an anomaly, if not impossible. In contrast, it’s not uncommon for one player to score more than 50 points in an NBA game. But despite the pace, pubs from England to botecos in Rio remain full. What critics don’t understand is that the low score can make a game more interesting, as this makes it harder for teams to gain a substantial lead, keeping fans on the edge until the end. Unfortunately, this also means matches end in a draw close to 22% of the time—which can also be infuriating. Yet the sport remains as popular as ever.

**数字足球**
很多人说足球让人昏昏欲睡。作为一名足球迷，我并不认同，但平心而论，这种说法并非毫无根据。大多数比赛的进球数少于 5 个，超过 20 个进球的情况即便不是不可能，也是极其罕见的异常现象。相比之下，在 NBA 比赛中，一名球员单场得分超过 50 分并不罕见。但尽管节奏缓慢，从英国的酒吧到里约热内卢的小酒馆，依然座无虚席。批评者不明白的是，低比分反而能让比赛更具趣味性，因为这使得球队更难取得巨大的领先优势，从而让球迷们直到最后一刻都保持紧张感。不幸的是，这也意味着近 22% 的比赛以平局告终——这有时也令人抓狂。然而，这项运动依然像以往一样受欢迎。

***

**Stitching the data together**
Oftentimes the best way to improve a model is to simply get more data. We will be working with `international_results.csv`, `international_team_ratings.csv` and `international_goalscorers.csv`. We want to match `international_results.csv` to `international_team_ratings.csv` so we can use Elo ratings. This could be simple, but as you might’ve guessed, the team names don’t match up perfectly, so we need to turn to text processing unless we want to check 336 teams individually. We also need to be incredibly careful of when the Elo rating was updated. We could take the Elo on the same day the match occurs, but that would be a source of data leakage, as Elo scores are updated only after the match. Making use of it as a feature is tempting but problematic. We must take the most recent Elo score, and as an additional engineered feature we keep track of the time since the latest Elo update, positing that earlier ratings would be more informative than older ones.

**整合数据**
通常，改进模型最好的方法就是获取更多数据。我们将使用 `international_results.csv`、`international_team_ratings.csv` 和 `international_goalscorers.csv`。我们需要将 `international_results.csv` 与 `international_team_ratings.csv` 进行匹配，以便使用 Elo 等级分。这听起来很简单，但正如你可能猜到的，球队名称并不能完美匹配，因此除非我们想逐一核对 336 支球队，否则必须求助于文本处理。我们还需要格外小心 Elo 等级分的更新时间。我们可能会直接使用比赛当天的 Elo 分数，但这会导致数据泄露，因为 Elo 分数是在比赛结束后才更新的。将其作为特征使用虽然诱人，但存在问题。我们必须使用最近一次的 Elo 分数，并将其作为额外的工程特征，记录自上次 Elo 更新以来的时间，假设较新的评分比陈旧的评分更具参考价值。

***

**1. Draw-modeling features**
The most evident failure of our baseline multinomial logistic regression model was its weak performance at classifying draws. While the model could calculate the probability of a draw because we defined the target variable as `match_result ∈ {H, D, A}` (Home win, Draw, Away win), Draw was simply never the most likely outcome. We can see this by the missing column for Draws in the confusion matrix.

**1. 平局建模特征**
我们的基准多项式逻辑回归模型最明显的失败之处在于其在分类平局时的表现较弱。虽然模型可以计算出平局的概率（因为我们将目标变量定义为 `match_result ∈ {H, D, A}`，即主胜、平局、客胜），但平局从未成为最可能的预测结果。我们可以从混淆矩阵中缺失的“平局”列看出这一点。
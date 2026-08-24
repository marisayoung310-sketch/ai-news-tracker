---
title: "Beyond the Scroll: How Social Media Algorithms Shape Your Reality"
originalUrl: "https://towardsdatascience.com/beyond-the-scroll-how-social-media-algorithms-shape-your-reality/"
date: "2026-05-23T23:10:01.747Z"
---

# Beyond the Scroll: How Social Media Algorithms Shape Your Reality
# 滚动之外：社交媒体算法如何塑造你的现实

You’ve probably felt that your social media feed may know you too well. When you browse social media, you notice a very typical behavior: you watch one video, and suddenly your timeline is flooded with more of the same. 5 years ago, it felt a bit like magic. But today, we talk about “the algorithm” as if it were a mysterious entity pulling strings in some Silicon Valley basement.
你可能感觉到社交媒体的信息流似乎太了解你了。当你浏览社交媒体时，会注意到一种非常典型的现象：你看了一个视频，紧接着你的时间线上就充斥着类似的内容。五年前，这感觉还有点像魔法；但今天，我们谈论“算法”时，就好像它是一个在硅谷地下室里操纵一切的神秘实体。

The truth is much less dramatic, and much more interesting. The algorithm isn’t inherently evil, it doesn’t sit there plotting your radicalisation. It’s just a chunk of code running cosine similarities and weighted averages, trying to predict what you’ll click on next. The trouble is what we interact with creates engagement. And the surest way to keep humans engaged turns out to be the worst way to keep them informed (rage-baits, fake news, or worse).
事实远没有那么戏剧化，但也更有趣。算法本身并非邪恶，它不会坐在那里策划你的激进化。它只是一段运行余弦相似度和加权平均值的代码，试图预测你接下来会点击什么。问题在于，我们与之互动的内容会产生参与度。而事实证明，保持人类参与度最有效的方法，往往是让他们获取信息最糟糕的方式（如愤怒诱导、假新闻或更糟的内容）。

This post is about how recommendation engines work, why they tilt us toward echo chambers, and, because reading about a thing is never the same as seeing it, we’ll build one from scratch, point it at real news data, and watch the bubble form.
本文将探讨推荐引擎的工作原理，它们为何将我们推向“回声壁”，并且由于阅读相关内容永远比不上亲眼所见，我们将从零开始构建一个推荐系统，将其指向真实的新闻数据，并观察“信息茧房”是如何形成的。

### The Engagement Engine: How Recommenders Work
### 参与度引擎：推荐系统如何工作

A social media algorithm is, at its heart, a curator. Its job is to sift through millions of posts and serve you the ones you’re most likely to engage with: click, watch, like, share, rage-comment on. It does this based on one word: data. Every action you take is a clue: Which posts you linger on (even without clicking), which videos you watch (and for how long), which accounts you follow, mute, or block, and which topics you search for at 1 a.m.
社交媒体算法的核心本质上是一个策展人。它的工作是从数百万条帖子中筛选出你最可能参与的内容：点击、观看、点赞、分享或愤怒评论。它基于一个核心词来完成这项工作：数据。你的每一个动作都是线索：你在哪些帖子停留（即使没有点击），你观看哪些视频（以及观看时长），你关注、静音或屏蔽了哪些账号，以及你在凌晨一点搜索了什么话题。

Using machine learning, the algorithm spots patterns in this firehose of behaviour. It’s constantly asking the same question: what keeps this person on the platform longer? Remember that this is the largest goal of any social media company: keeping you on the platform longer.
通过机器学习，算法能从这些海量的行为数据中发现模式。它不断地问同一个问题：什么能让这个人留在平台上的时间更长？请记住，这是任何社交媒体公司的首要目标：让你在平台上停留更久。

Two classic techniques sit underneath most recommender systems:
大多数推荐系统背后都采用了两种经典技术：

1. **Collaborative filtering** finds users who behave like you and recommends what they liked. If Alice and Bob both loved *The Matrix* and *Inception*, and Alice also loved *Interstellar*, the system nudges *Interstellar* to Bob. Pretty easy to understand.
1. **协同过滤**：寻找与你行为相似的用户，并推荐他们喜欢的内容。如果 Alice 和 Bob 都喜欢《黑客帝国》和《盗梦空间》，而 Alice 还喜欢《星际穿越》，系统就会向 Bob 推荐《星际穿越》。这很容易理解。

2. **Content-based filtering** looks at the characteristics of what you’ve liked and finds similar things. If you watch a lot of cooking videos, it surfaces more videos tagged “cooking”, “recipe”, or “knife skills”—they resemble what you already enjoyed.
2. **基于内容的过滤**：查看你喜欢的内容特征，并寻找类似的事物。如果你看了很多烹饪视频，它就会推送更多带有“烹饪”、“食谱”或“刀工”标签的视频，因为它们与你已经喜欢的内容相似。

Real platforms blend these methods with hundreds of other signals. But the core idea is the same: learn from your behaviour, predict what else might grab you. The algorithm doesn’t intend to show you bad or false content. It optimises for engagement. And one of the surest ways to keep humans engaged is to tap into our emotions, especially the strong, negative ones. Or videos of cats.
真实的平台会将这些方法与数百种其他信号结合使用。但核心理念是一样的：从你的行为中学习，预测你还可能对什么感兴趣。算法并不打算向你展示糟糕或虚假的内容，它只是在优化参与度。而保持人类参与度最有效的方法之一，就是利用我们的情绪，尤其是那些强烈的负面情绪。当然，还有猫咪视频。

### Building a News Recommender on Real Data
### 基于真实数据构建新闻推荐系统

Let’s stop talking about this abstractly and build one. We will use real anonymised click logs from Microsoft News. The dataset is called MIND (Microsoft News Dataset), published for academic research by Microsoft Research. This sample contains 50,000 users, over 51,000 English news articles across 17 categories, and 156,000+ real impression sessions.
让我们停止抽象的讨论，动手构建一个系统。我们将使用来自 Microsoft News 的真实匿名点击日志。该数据集名为 MIND (Microsoft News Dataset)，由微软研究院发布用于学术研究。该样本包含 50,000 名用户、17 个类别下的 51,000 多篇英文新闻文章，以及 156,000 多次真实的展示会话。

*(Code snippet omitted for brevity)*

Cosine similarity finds your fifty closest neighbours, people who click on the same kinds of articles you do. We take the articles they clicked, weight them by how similar each neighbour is to you, and serve the top fifteen. This is the base of what powers a billion-dollar industry.
余弦相似度可以找到你的五十个“最近邻居”，即那些和你点击相同类型文章的人。我们提取他们点击过的文章，根据每个邻居与你的相似程度进行加权，然后推送排名最高的十五篇。这就是支撑起数十亿美元产业的基础。

### Coswhat similarity?
### 什么是余弦相似度？

Cosine similarity might sound like something out of a math textbook, but bear with me, it’s easier than it looks. To show you how it works, let’s take a quick detour. Imagine the following data points scattered across two axes: mechanical vs. biological, and cuteness.
余弦相似度听起来像是数学课本里的东西，但请耐心听我说，它比看起来简单得多。为了展示其工作原理，让我们绕个小弯。想象一下散布在两个轴上的数据点：机械与生物，以及可爱程度。

Cosine similarity measures the angle between two arrows, each one starting from the origin (0,0) and pointing toward one of our data points. The smaller the angle between them, the more similar the two items are. Think of it this way: if two arrows are almost pointing in the same direction, the items they represent share similar characteristics.
余弦相似度测量的是两条箭头之间的夹角，每条箭头都从原点 (0,0) 出发，指向我们的数据点。它们之间的夹角越小，这两个项目就越相似。可以这样想：如果两条箭头几乎指向同一个方向，那么它们所代表的项目就具有相似的特征。

Take cats and dogs as an example. Both score high on ‘biological’ and high on ‘cuteness’, so their arrows point in nearly the same direction and cosine similarity returns a value close to 1 (its maximum). But if we compare cats with teddy bears, although they are similar on the cute dimension, they are different on the biological axis.
以猫和狗为例。它们在“生物性”和“可爱度”上得分都很高，因此它们的箭头指向几乎相同的方向，余弦相似度返回的值接近 1（最大值）。但如果我们比较猫和泰迪熊，虽然它们在可爱维度上相似，但在生物轴上却截然不同。
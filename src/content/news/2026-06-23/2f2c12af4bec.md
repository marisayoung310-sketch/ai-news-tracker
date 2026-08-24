---
title: "Encoding Categorical Data for Outlier Detection"
originalUrl: "https://towardsdatascience.com/encoding-categorical-data-for-outlier-detection/"
date: "2026-06-22T23:04:35.544Z"
---

# Encoding Categorical Data for Outlier Detection
# 异常检测中的分类数据编码

**Data Science | Encoding Categorical Data for Outlier Detection: Why one-hot encoding isn’t always the best approach, and alternative encodings**
**数据科学 | 异常检测中的分类数据编码：为什么独热编码（One-hot encoding）并非总是最佳方案，以及其他替代编码方法**

W Brett Kennedy | Jun 22, 2026 | 21 min read
W Brett Kennedy | 2026年6月22日 | 21分钟阅读

This article continues my series on Outlier Detection. In this article, we look at working with categorical data. Generally when performing outlier detection with tabular data, we start by converting the data so that it is either entirely categorical or entirely numeric. There are some exceptions, but for the most part this is necessary: most outlier detection algorithms will assume the data is strictly in one format or the other, and we’ll need to get the data into the format the detector expects.
本文是我关于“异常检测”系列文章的延续。在本文中，我们将探讨如何处理分类数据。通常在对表格数据进行异常检测时，我们首先会将数据转换为全分类格式或全数值格式。虽然存在一些例外，但在大多数情况下这是必要的：大多数异常检测算法都假设数据严格处于其中一种格式，因此我们需要将数据转换为检测器所期望的格式。

If the detector expects categorical data, the numeric features will need to be converted to a categorical format, which generally means binning them. And if the detector expects numeric data, any categorical features need to be numerically encoded. This is the more common scenario (the majority of outlier detection algorithms assume numeric data), and is what we’ll cover in this article.
如果检测器期望分类数据，则需要将数值特征转换为分类格式，这通常意味着对它们进行分箱（binning）处理。如果检测器期望数值数据，则需要对任何分类特征进行数值编码。这是更常见的情况（大多数异常检测算法都假设数据为数值型），也是本文将要探讨的内容。

Other articles in the series include: Deep Learning for Outlier Detection on Tabular and Image Data, Distance Metric Learning for Outlier Detection, An Introduction to Using PCA for Outlier Detection, Interpretable Outlier Detection: Frequent Patterns Outlier Factor (FPOF), and Perform Outlier Detection More Effectively Using Subsets of Features. This article also covers some material from the book *Outlier Detection in Python*.
本系列的其他文章包括：《表格与图像数据的深度学习异常检测》、《用于异常检测的距离度量学习》、《PCA异常检测入门》、《可解释的异常检测：频繁模式异常因子 (FPOF)》以及《利用特征子集更有效地执行异常检测》。本文还涵盖了《Python异常检测》（*Outlier Detection in Python*）一书中的部分内容。

### Outlier Detectors
### 异常检测器

Some examples of outlier detection algorithms that assume categorical data include: Frequent Patterns Outlier Factor (FPOF), Association Rules, and Entropy-based methods. Some that work with numeric data include: Isolation Forests, Local Outlier Factor (LOF), kth Nearest Neighbors (kNN), and Elliptic Envelope. If you’re familiar with any outlier detection algorithms, it’s more likely the numeric algorithms, particularly Isolation Forest and LOF; these are probably the most commonly used algorithms. Further, all of the outlier detection algorithms included in scikit-learn and in PYOD (Python Outlier Detection) assume completely numeric data.
一些假设数据为分类数据的异常检测算法示例包括：频繁模式异常因子 (FPOF)、关联规则和基于熵的方法。一些适用于数值数据的算法包括：孤立森林 (Isolation Forests)、局部异常因子 (LOF)、k-近邻 (kNN) 和椭圆包络 (Elliptic Envelope)。如果你熟悉任何异常检测算法，很可能就是这些数值算法，特别是孤立森林和LOF；它们可能是最常用的算法。此外，scikit-learn 和 PYOD (Python Outlier Detection) 中包含的所有异常检测算法都假设数据完全是数值型的。

At the same time, the great majority of real-world tabular data is actually mixed (containing both numeric and categorical columns), which means, it’s very common when performing outlier detection to need to encode the categorical columns. There is a reason for this: mixed data is more difficult to perform outlier detection on. Working with data of just one type (all categorical or all numeric) does simplify the work of finding the most unusual items in the data. And, if we work with numeric data, we have the further benefit of being able to view the data geometrically: as points in space.
与此同时，现实世界中绝大多数表格数据实际上是混合型的（同时包含数值列和分类列），这意味着在执行异常检测时，通常需要对分类列进行编码。原因在于：混合数据更难进行异常检测。仅处理一种类型的数据（全分类或全数值）确实简化了寻找数据中最异常项的工作。而且，如果我们处理数值数据，还有一个额外的好处，即能够从几何角度观察数据：将其视为空间中的点。

If there are, say, 20 numeric columns in a table, then each row of the data can be viewed as a point in 20-dimensional space. At least, we can conceptually imagine them in 20-d space — the human mind can’t actually picture this. But we can picture 2d and 3d spaces and can extrapolate the general idea: we’re looking for points that are physically very distant from most other points.
例如，如果表中包含20个数值列，那么每一行数据都可以被视为20维空间中的一个点。至少，我们可以在概念上想象它们处于20维空间中——尽管人类大脑无法真正直观地描绘出这种景象。但我们可以想象二维和三维空间，并推导出大致的概念：我们正在寻找那些在物理距离上远离大多数其他点的点。

Most numeric outlier detectors work by calculating the distances between each pair of points, and using these distances to identify the points that are most unusual — the points that have few points near them and that are far away from most other points. Though, in practice (for efficiency), the algorithms won’t actually calculate every pairwise distance (some can be skipped where it won’t substantially affect the outlier scores), but in principle, this is what the majority of numeric outlier detectors are doing. We need, then, ways to convert categorical data to a numeric format that supports this well; that is, that makes it meaningful to calculate distances between rows after encoding the categorical values as numbers.
大多数数值异常检测器的工作原理是计算每对点之间的距离，并利用这些距离来识别最异常的点——即那些周围点很少且远离大多数其他点的点。虽然在实践中（为了效率），算法并不会真正计算每一对点之间的距离（有些计算可以跳过，且不会显著影响异常分数），但从原则上讲，这就是大多数数值异常检测器所做的事情。因此，我们需要一些方法将分类数据转换为能够良好支持此过程的数值格式；也就是说，在将分类值编码为数字后，使得计算行与行之间的距离变得有意义。

### Methods to encode categorical data
### 分类数据的编码方法

With prediction problems, the most common encoding methods likely include: One-hot encoding, Ordinal encoding, Target encoding. With outlier detection, the set of options is a bit different, and the strengths and weaknesses of each are also different. Out of the three methods listed here, really only One-hot encoding works well for outlier detection. With outlier detection, the most effective are likely: One-hot encoding, Count encoding.
在预测问题中，最常见的编码方法通常包括：独热编码、序数编码（Ordinal encoding）和目标编码（Target encoding）。而在异常检测中，选项集略有不同，每种方法的优缺点也各不相同。在上述三种方法中，实际上只有独热编码在异常检测中表现良好。在异常检测中，最有效的方法可能是：独热编码和计数编码（Count encoding）。

I’ll describe how each works, and why some work better than others for outlier detection. And I’ll explain why Count encoding (which is rarely used with prediction problems) can be quite useful with outlier detection. I should also say, besides these encoding methods, there are several others that can be useful for prediction. An excellent library for encoding methods is Category Encoders. This will likely cover any of the methods you will need. Many of the methods provided, though, such as Target encoding and CatBoost encoding, require a target column, which is normally not available with outlier detection.
我将描述每种方法的工作原理，以及为什么某些方法在异常检测中比其他方法表现更好。我还将解释为什么计数编码（在预测问题中很少使用）在异常检测中非常有用。我还需要说明，除了这些编码方法外，还有其他几种对预测有用的方法。一个优秀的编码方法库是 `Category Encoders`，它很可能涵盖了你所需的所有方法。不过，其中提供的许多方法（如目标编码和 CatBoost 编码）都需要目标列，而这在异常检测中通常是不可用的。
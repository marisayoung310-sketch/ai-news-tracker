---
title: "Ensembles of Ensembles of Ensembles: A Guide to Stacking"
originalUrl: "https://towardsdatascience.com/ensembles-of-ensembles-of-ensembles/"
date: "2026-04-30T01:15:37.607Z"
---

# Ensembles of Ensembles of Ensembles: A Guide to Stacking
# 模型集成之集成：Stacking 指南

Much like F1, machine learning is a hypercompetitive game of ensemble engineering. The difference of a slight improvement in lap time or loss scores can be measured in the millions of dollars a team brings in when they do what it takes to be the best. Not only does every single component of the system need to be perfect, the way it is all brought together needs to be perfect too.

机器学习就像一级方程式赛车（F1）一样，是一场竞争极其激烈的集成工程博弈。圈速或损失函数得分上的微小改进，对于追求卓越的团队而言，往往意味着数百万美元的收益差距。不仅系统的每一个组件都需要做到完美，将它们整合在一起的方式也必须同样完美。

The state of the art Gradient boosted models have historically been the most competitive models for tabular and time series prediction problems. These are ensemble methods because they combine the results of several base estimators to come up with a final answer that is better than any individual prediction alone. But the state of the art is beginning to change. Pre-trained models such as TabPFN for tabular data, and Chronos for time series are beginning to match or exceed gradient boosted models on certain benchmarks. In a way these are also ensemble methods, except instead of ensembling many predictions, they are an ensemble of the data that they learn from.

从历史来看，梯度提升模型（Gradient boosted models）在表格和时间序列预测问题上一直是最具竞争力的模型。它们属于集成方法，因为它们结合了多个基础估计器的结果，从而得出一个优于任何单一预测的最终答案。但这种技术现状正在发生改变。诸如用于表格数据的 TabPFN 和用于时间序列的 Chronos 等预训练模型，在某些基准测试中已开始追平甚至超越梯度提升模型。从某种意义上说，这些也是集成方法，只不过它们集成的不是多个预测结果，而是它们所学习的数据。

The intuition behind this is broadly applicable, and can be taken further. There is now a situation where two completely different approaches are battling for the top spot across ML leaderboards, and are followed closely by dozens of other architectures that have their own sets of strengths and weaknesses. Given that they all learn in different ways, and also learn from different data, they can all be used together in an additional ensemble that retains a majority of the strengths, while eliminating a majority of the weaknesses. If done properly, this almost always leads to better performance, and a more robust model.

这一直觉具有广泛的适用性，并且可以进一步延伸。目前的情况是，两种截然不同的方法正在机器学习排行榜上争夺榜首，紧随其后的是数十种各有优劣的其他架构。鉴于它们学习方式各异，且学习的数据来源也不同，我们可以将它们全部整合到一个额外的集成模型中，从而在保留大部分优势的同时，消除大部分劣势。如果操作得当，这几乎总能带来更好的性能和更稳健的模型。

### Assertions and assumptions
### 断言与假设

The same strategies that can be used to determine what data is important for making a given prediction can also be used to determine what models are important for making a given prediction. Just like how a combination of base estimations in gradient boosted models is better than a single estimation, a combination of models is better than one. For the rest of this discussion, there is a big assumption that all the correct data is used in the modelling process. In other words, all relevant information is known at time t (or during inference). In data science, this is not a trivial assumption to make, and falsely doing so will largely invalidate claims made here.

用于确定哪些数据对特定预测至关重要的策略，同样可以用于确定哪些模型对特定预测至关重要。正如梯度提升模型中基础估计器的组合优于单一估计一样，模型的组合也优于单一模型。在接下来的讨论中，我们基于一个重要的假设：建模过程中使用了所有正确的数据。换句话说，所有相关信息在 t 时刻（或推理期间）都是已知的。在数据科学中，这是一个不容小觑的假设，如果假设错误，本文所提出的观点将大打折扣。

As it turns out, most of the work in data science is just trying to satisfy this assumption with data in the correct format. Also note that the covariates/features exposed to models are not fixed as different architectures do better with different data, and may not be able to handle certain data types at all (this will be a particularly relevant point for pre-trained language/numeric model hybrids to address, which are still in early development).

事实证明，数据科学中大部分工作其实只是为了通过正确格式的数据来满足这一假设。此外请注意，暴露给模型协变量/特征并非固定不变，因为不同的架构在处理不同数据时表现各异，甚至可能完全无法处理某些数据类型（这一点对于仍处于早期开发阶段的预训练语言/数值混合模型尤为重要）。

### Multi-Layer Stacking
### 多层堆叠（Multi-Layer Stacking）

A generalized approach that can be modified for time series or tabular regression/classification problems.
一种可针对时间序列或表格回归/分类问题进行调整的通用方法。

#### Layer 1
#### 第一层

There are many ways of creating ensemble methods, and it makes the most sense to organize these steps in layers. The first layer is the collection of base models (e.g. CatBoost, MLPs, TabPFN, etc.). For tabular problems, these can be trained with bootstrap aggregation, where new training sets are created by sampling from the base training set with replacement. Individual models are then trained on each new set and their predictions are averaged.

创建集成方法的方式有很多种，按层级组织这些步骤最为合理。第一层是基础模型集合（例如 CatBoost、MLP、TabPFN 等）。对于表格问题，可以使用自助聚合（bootstrap aggregation）进行训练，即通过从基础训练集中进行有放回抽样来创建新的训练集。然后，在每个新数据集上训练单独的模型，并对它们的预测结果进行平均。

Hyperparameter optimization can also be done for each of these models, though this is much more computationally expensive as each model for each sample (or “bag”) is re-trained many times. To cut down on training time, a hyperparameter optimization scheduler like Optuna can be used so that model runs that aren’t doing well are cut short, and a local minimum can be zeroed in on quicker by using some statistical optimization tricks. Alternatively, several hyperparameter presets can be used for each model based on what tends to work well for that particular model on similar datasets. The different models with different presets can either be averaged together to “represent” one model, or they can be registered as different versions of the model and used in the next layer.

也可以对这些模型中的每一个进行超参数优化，尽管这在计算上要昂贵得多，因为每个样本（或“袋”）的每个模型都需要多次重新训练。为了缩短训练时间，可以使用像 Optuna 这样的超参数优化调度器，以便提前终止表现不佳的模型运行，并通过一些统计优化技巧更快地锁定局部最小值。或者，也可以根据特定模型在类似数据集上的表现，为每个模型使用几组预设的超参数。使用不同预设的不同模型既可以平均在一起以“代表”一个模型，也可以注册为该模型的不同版本，并在下一层中使用。

For time series forecasting, traditional bootstrapping becomes an issue. Since the time dimension must be respected, a process cannot randomly break this data up and resample to create new training sets. Instead, cross-validation should be done with a rolling window through time. For this process a new model is created to predict on a validation window with timestamps strictly after those present in the training set. After training and evaluation, that validation window is added to the training set and the process is repeated for the next slice of time (the next validation window). This yields a good idea of how well the model will perform throughout time, but models are not usually ensembled in this step. Since recent time series data is often the most informative, only the model trained on the last step is used for inference. However, the out-of-fold predictions from previous windows can still be used in the next layer.

对于时间序列预测，传统的自助法会产生问题。由于必须考虑时间维度，流程不能随机拆分数据并重采样以创建新的训练集。相反，应使用滚动窗口进行时间交叉验证。在此过程中，创建一个新模型，在时间戳严格晚于训练集的时间窗口上进行预测。训练和评估后，将该验证窗口添加到训练集中，并对下一个时间切片（下一个验证窗口）重复此过程。这能很好地反映模型在整个时间跨度内的表现，但通常不会在这一步进行模型集成。由于最近的时间序列数据往往信息量最大，因此仅使用最后一步训练的模型进行推理。不过，之前窗口的非折叠（out-of-fold）预测结果仍可在下一层中使用。

#### Layer 2
#### 第二层

After training the base models, evaluation metrics on the training set and the validation set are available. For all intermediate steps, the test set should be completely ignored. In layer 2, new strategies can be used since model performance is known, and solid predictions have (hopefully) already been made. For tabular problems, a second round of bagged models can be trained where the predictions of the layer 1 models are added as features. In the case where a base model performs poorly on validation, it can be dropped from this step. In time series, the same strategy cannot be done since the layer 1 mo...

在训练完基础模型后，即可获得训练集和验证集上的评估指标。对于所有中间步骤，应完全忽略测试集。在第二层中，由于已知模型性能，且（希望）已经做出了可靠的预测，因此可以使用新的策略。对于表格问题，可以进行第二轮袋装模型训练，将第一层模型的预测结果作为特征添加进去。如果某个基础模型在验证集上表现不佳，则可以在此步骤中将其剔除。在时间序列中，无法采用相同的策略，因为第一层模型……
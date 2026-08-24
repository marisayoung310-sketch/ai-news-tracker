---
title: "DiScoFormer: One transformer for density and score, across distributions"
originalUrl: "https://huggingface.co/blog/allenai/discoformer"
date: "2026-06-29T22:37:22.724Z"
---

# DiScoFormer: One transformer for density and score, across distributions
# DiScoFormer：跨分布的密度与分数估计统一 Transformer

Many problems in machine learning and the sciences come down to the same task: you have a collection of data points and want to recover the distribution they came from—which values are common, and which are rare. Pinning down that distribution means estimating two quantities: the distribution's density and, more useful as dimensionality grows, its score.
机器学习和科学领域的许多问题最终都归结为同一个任务：你拥有一组数据点，并希望恢复它们所遵循的分布——即哪些值是常见的，哪些是罕见的。确定该分布意味着要估计两个量：分布的密度，以及随着维度增加而变得更有用的分数（score）。

The density is the smooth version of a histogram—high where points cluster and low where they're scarce. The score—the gradient of the log-density—points in the direction the density rises fastest: move a point along the score and it heads toward a more probable region. Diffusion-based generative models (the technology behind AI image generators like Stable Diffusion and DALL-E) start from random noise and repeatedly follow the score, turning that noise into a realistic image. The same score drives Bayesian sampling and the particle simulations used to model systems such as plasma.
密度是直方图的平滑版本——在数据点聚集的地方较高，在稀疏的地方较低。分数（对数密度的梯度）指向密度上升最快的方向：沿着分数移动一个点，它就会向概率更高的区域移动。基于扩散的生成模型（Stable Diffusion 和 DALL-E 等 AI 图像生成器背后的技术）从随机噪声开始，反复遵循分数，将噪声转化为逼真的图像。同样的分数也驱动着贝叶斯采样以及用于模拟等离子体等系统的粒子模拟。

Extracting the density and score from a finite sample is challenging, and today's tools force a trade-off between generalizability and accuracy. One classical approach, kernel density estimation (KDE), computes the density at any location from the data points around it: the closer and more numerous they are, the higher the density. It needs no training and applies to any distribution, but its accuracy falls off sharply as dimensionality grows. Alternatively, neural score-matching models trained to predict the score stay accurate even in high dimensions, but each needs to learn the distribution and must be retrained from scratch for another.
从有限样本中提取密度和分数具有挑战性，而当前的工具往往需要在通用性和准确性之间进行权衡。一种经典方法是核密度估计（KDE），它根据周围的数据点计算任何位置的密度：点越近、数量越多，密度就越高。它无需训练且适用于任何分布，但随着维度的增加，其准确性会急剧下降。另一种选择是经过训练以预测分数的神经分数匹配模型，它们即使在高维空间中也能保持准确，但每个模型都需要学习特定的分布，并且在处理新分布时必须从头开始重新训练。

We introduce a new solution called the DiScoFormer (Density and Score Transformer)—one model that, given a set of data points, estimates both the density and the score of the distribution in a single forward pass without retraining.
我们引入了一种名为 DiScoFormer（密度与分数 Transformer）的新解决方案——这是一个单一模型，给定一组数据点，无需重新训练，即可在单次前向传播中同时估计分布的密度和分数。

### Training a transformer for density and score estimation
### 训练用于密度和分数估计的 Transformer

DiScoFormer maps an entire sample to the density and score of the distribution behind it using stacked layers of transformer blocks. The model utilizes cross-attention, which allows it to evaluate density and score at any point—not just where you have data. Score and density share a mathematical relationship: score is the gradient of the logarithm of density. We leverage this by having a shared backbone with two output heads, one for the density and one for the score.
DiScoFormer 使用堆叠的 Transformer 块层，将整个样本映射到其背后的分布密度和分数。该模型利用交叉注意力机制，使其能够在任何点（而不仅仅是已有数据点的位置）评估密度和分数。分数和密度之间存在数学关系：分数是对数密度的梯度。我们利用这一点，设计了一个共享主干网络和两个输出头，一个用于密度，一个用于分数。

This coupling does more than save parameters. The score head has to match the gradient of the log-density head at every query, so any gap between them is a label-free consistency loss. We use this at inference—hold the context fixed, take a few gradient steps on that consistency loss, and DiScoFormer adapts itself to an out-of-distribution input on the spot, no ground-truth density or score required.
这种耦合不仅仅是为了节省参数。分数头必须在每个查询点与对数密度头的梯度相匹配，因此它们之间的任何差距都可以作为一种无标签的一致性损失。我们在推理时利用这一点——保持上下文不变，对该一致性损失进行几次梯度步长更新，DiScoFormer 就能当场适应分布外（OOD）输入，而无需任何真实密度或分数作为参考。

There's a mathematical reason why the transformer architecture fits this task. Kernel density estimation has a single bandwidth—how far each point's influence reaches, fixed in advance and applied identically everywhere. Attention is a strict generalization of it: we analytically show that a single attention head's weights are nearly a Gaussian kernel over the data, so one cross-attention block can already reproduce KDE's density and score. From there the model goes further, learning several such scales at once and adapting them to the data. DiScoFormer doesn't discard the classical method for a black box but instead includes KDE as a special case and improves on it.
Transformer 架构适合此任务是有数学依据的。核密度估计具有单一带宽——即每个点的影响范围，这是预先固定并统一应用的。注意力机制是其严格的泛化：我们通过分析证明，单个注意力头的权重几乎就是数据上的高斯核，因此一个交叉注意力块已经可以重现 KDE 的密度和分数。在此基础上，模型更进一步，同时学习多种此类尺度并将其适应于数据。DiScoFormer 并没有为了黑盒模型而抛弃经典方法，而是将 KDE 作为一种特殊情况包含在内，并对其进行了改进。

### What data did we use to train DiScoFormer?
### 我们使用什么数据来训练 DiScoFormer？

We relied on Gaussian Mixture Models for two primary reasons. Firstly, GMMs are universal density approximators—with enough components they match essentially any smooth distribution to arbitrarily small error. Secondly, GMMs have closed-form densities and scores, so we always have an exact target to supervise against. We employ both of these properties by drawing a new GMM for every batch, giving the model virtually unlimited examples of target distributions and supervising each against a given GMM's exact density and score.
我们主要基于高斯混合模型（GMM）进行训练，原因有二。首先，GMM 是通用的密度近似器——只要有足够的组件，它们几乎可以以任意小的误差匹配任何平滑分布。其次，GMM 具有闭式解的密度和分数，因此我们始终拥有精确的目标来进行监督。我们利用这两个特性，为每个批次抽取一个新的 GMM，为模型提供几乎无限的目标分布示例，并针对给定 GMM 的精确密度和分数对每个示例进行监督。

### Performance
### 性能表现

Across the board, DiScoFormer beats KDE at both density and score estimation, and the gap widens exactly where KDE struggles. In 100 dimensions, it isn't close—against the best hand-tuned KDE, it cuts score error by about 6.5x and density error by more than 37x, and it keeps improving as you add samples, while KDE runs out of memory. It also travels far outside its training data, staying accurate on mixtures with more modes than it ever saw during training and on non-Gaussian shapes like the Laplace and Student-t. KDE's main advantage remains speed, especially when datasets are small.
总体而言，DiScoFormer 在密度和分数估计方面均优于 KDE，且在 KDE 表现不佳的地方差距进一步拉大。在 100 维空间中，优势非常明显——与经过人工调优的最佳 KDE 相比，它将分数误差降低了约 6.5 倍，密度误差降低了超过 37 倍，并且随着样本量的增加，其性能持续提升，而 KDE 则会耗尽内存。它还能处理远超训练数据范围的情况，在模态数量超过训练期间所见分布以及拉普拉斯（Laplace）和学生 t（Student-t）等非高斯形状上依然保持准确。KDE 的主要优势仍然是速度，尤其是在数据集较小的情况下。

The part about DiScoFormer that we find most promising is that score estimation is a shared dependency across many fields, such as generative modeling, Bayesian inference, and scientific computing. A pretrained, plug-in estimator that stays accurate in high dimensions and removes the need to retrain per problem could cut that cost across all of them at once—one model, reused everywhere score and density show up.
我们认为 DiScoFormer 最具前景的一点是，分数估计是生成建模、贝叶斯推理和科学计算等许多领域的共同需求。一个预训练的、即插即用的估计器，既能保持高维准确性，又无需针对每个问题重新训练，可以同时降低所有这些领域的成本——一个模型，在任何需要分数和密度的地方均可复用。
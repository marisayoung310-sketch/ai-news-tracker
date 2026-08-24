---
title: "The Polynomial That Fixed 30 Years of Cloth Simulation"
originalUrl: "https://towardsdatascience.com/the-polynomial-that-fixed-30-years-of-cloth-simulation/"
date: "2026-06-08T23:13:23.036Z"
---

# The Polynomial That Fixed 30 Years of Cloth Simulation
# 修复了 30 年布料模拟难题的多项式

Physics: The Polynomial That Fixed 30 Years of Cloth Simulation. How a Japanese e-commerce company published one of the most rigorously engineered cloth simulation papers in recent years, why the logarithmic barrier fails under tight strain limits, and how to replicate the core insight in Python.
物理学：修复了 30 年布料模拟难题的多项式。一家日本电子商务公司是如何发表近年来工程化程度最高的布料模拟论文之一的？为什么对数势垒在严苛的应变限制下会失效？以及如何用 Python 复现其核心洞察。

There’s a bug lurking in the code of almost every 3D animation pipeline ever built. It shows up when a character’s sleeve passes through their own torso, when a skirt clips through a leg mid-walk, when a simulated tablecloth phases through the edge of a table like it’s made of light. High-end studios spend thousands of artist hours hunting it down frame by frame before a film goes to theaters. In video games and real-time graphics, it just ships. The clipping bug. Cloth that doesn’t know it’s solid.
在几乎所有已构建的 3D 动画流程代码中，都潜伏着一个 Bug。当角色的袖子穿过躯干、裙子在行走时穿过腿部，或者模拟的桌布像光一样穿过桌面边缘时，它就会出现。高端工作室在电影上映前，需要花费数千个艺术家工时逐帧排查。而在电子游戏和实时图形中，它往往直接被发布出来。这就是穿模 Bug——布料“不知道”自己是固体。

In late 2024, a company called ZOZO (Japan’s largest fashion e-commerce platform) published a physics solver in ACM Transactions on Graphics, the field’s leading journal, under the dry title *A Cubic Barrier with Elasticity-Inclusive Dynamic Stiffness*. It barely made the news at the time. Then the community started posting side-by-side comparisons with every other solver they owned, and the ZOZO demos kept winning.
2024 年末，一家名为 ZOZO（日本最大的时尚电商平台）的公司在图形学领域顶级期刊《ACM Transactions on Graphics》上发表了一个物理求解器，标题平淡无奇：《一种包含弹性动态刚度的三次势垒》（A Cubic Barrier with Elasticity-Inclusive Dynamic Stiffness）。当时这篇论文几乎没有引起关注。随后，社区开始将其与他们拥有的所有其他求解器进行对比，而 ZOZO 的演示效果始终胜出。

The demos showed cloth that behaved like cloth. Not rubber, not jelly, not a ghost: fabric. Five layers of mesh draped over a sphere, each layer touching the next without a single triangle invading another’s space. In their large-scale stress tests, the solver handles beyond 184 million simultaneous contact pairs without a single interpenetration. To understand why a polynomial swap is such a significant breakthrough, you have to look at the decades of mathematical compromises that came before it, and at how you can replicate ZOZO’s core logic in a few hundred lines of Python.
演示展示了像布料一样的布料。不是橡胶，不是果冻，也不是幽灵：而是织物。五层网格覆盖在一个球体上，每一层都接触着下一层，没有一个三角形侵入另一个的空间。在他们的大规模压力测试中，该求解器处理了超过 1.84 亿个同步接触对，且没有发生任何穿模现象。要理解为什么一个多项式的替换会是如此重大的突破，你必须回顾过去几十年的数学妥协，并了解如何用几百行 Python 代码复现 ZOZO 的核心逻辑。

### The Problem Nobody Could Fully Solve
### 没人能完全解决的问题

Fabric, at the level a physics engineer cares about, is a mesh of vertices connected by triangles. Each vertex gets a mass and a velocity, and at every time step the engine integrates Newton’s second law (F = ma) across all of them simultaneously. Forces come from gravity, from the elastic resistance of the fabric, and from any surfaces the cloth is touching. The elastic part is relatively well-solved: model each triangle as a small patch of elastic material, define how it resists stretching and shearing, derive the forces from the deformation gradient. That’s standard Finite Element Method and it works well enough that it’s not the bottleneck. The collision part is where every clever idea eventually breaks.
在物理工程师关心的层面上，织物是由三角形连接的顶点网格。每个顶点都有质量和速度，引擎在每个时间步长内同时对所有顶点积分牛顿第二定律 (F = ma)。力来自重力、织物的弹性阻力以及布料接触的任何表面。弹性部分相对容易解决：将每个三角形建模为一小块弹性材料，定义其如何抵抗拉伸和剪切，并从变形梯度中推导出力。这是标准的有限元方法（FEM），其效果足够好，不是瓶颈所在。碰撞部分才是所有巧妙构思最终失效的地方。

The naive approach is penalty forces: when two surfaces overlap, push them apart with a force proportional to how deep the penetration is. Simple and fast, but fundamentally reactive: the repulsion only activates after penetration has already happened. With a large time step, surfaces can travel straight through each other before the force kicks in, and if you make the penalty stiff enough to catch fast-moving surfaces, you get numerical instabilities that blow the simulation apart.
最简单的方法是惩罚力（Penalty Forces）：当两个表面重叠时，施加一个与穿透深度成正比的力将它们推开。这种方法简单快速，但本质上是被动的：排斥力只有在穿透发生后才会激活。如果时间步长较大，表面在力生效前就会直接穿过彼此；而如果你为了捕捉快速移动的表面而将惩罚力设置得足够硬，就会产生数值不稳定性，导致模拟崩溃。

The other classic approach is constraint projection: at the end of each step, detect intersections and explicitly move vertices apart to resolve them. More stable in practice, but it doesn’t conserve energy properly, introduces drift over long simulations, and in scenes with thousands of contacts it becomes genuinely difficult to make robust, it resolves one intersection, and creates two more. For decades, those were the choices: accept clipping, accept rubber-like stretching, or accept that your simulation would occasionally explode, usually some mix of all three.
另一种经典方法是约束投影（Constraint Projection）：在每个步骤结束时，检测交点并显式地将顶点移开以解决冲突。在实践中更稳定，但它不能正确地守恒能量，在长时间模拟中会引入漂移，并且在有数千个接触点的场景中，要使其稳健变得非常困难——解决了一个交点，却又产生了两个。几十年来，选择只有这些：接受穿模、接受像橡胶一样的拉伸，或者接受你的模拟偶尔会爆炸，通常是这三者的某种混合。

### Incremental Potential Contact: The Academic Gold Standard
### 增量势能接触：学术界的黄金标准

In 2020, a US academic and industry research team published Incremental Potential Contact (IPC), which reframed the collision problem entirely. The key idea: don’t model contact as a force or a constraint. Model it as an energy. Specifically, add a term to the total energy that becomes infinitely large as two surfaces approach zero distance. Since simulation is just energy minimisation, the solver will naturally avoid configurations where surfaces are close — not because you’ve told it to, but because moving into them would cost infinite energy. Penetration becomes mathematically unreachable, not just penalized.
2020 年，一个美国学术和工业研究团队发表了“增量势能接触”（Incremental Potential Contact, IPC），彻底重构了碰撞问题。其核心思想是：不要将接触建模为力或约束，而是将其建模为能量。具体来说，在总能量中增加一项，当两个表面接近零距离时，该项趋于无穷大。由于模拟本质上就是能量最小化，求解器会自然地避免表面靠近的配置——不是因为你命令它这样做，而是因为进入这些配置需要消耗无限的能量。穿透在数学上变得不可触及，而不仅仅是被惩罚。

At each time step, you’re solving: $x_{t+1} = \text{argmin}(E_{kinetic}(x) + E_{elastic}(x) + B(x))$, where B(x) is the barrier energy: a function that blows up as any pair of surfaces gets within threshold distance $\hat{d}$.
在每个时间步长，你都在求解：$x_{t+1} = \text{argmin}(E_{kinetic}(x) + E_{elastic}(x) + B(x))$，其中 $B(x)$ 是势垒能量：一个当任何一对表面进入阈值距离 $\hat{d}$ 时就会爆炸的函数。

IPC’s barrier is logarithmic:
IPC 的势垒是对数形式的：
$$ B_{\log}(d)= \begin{cases} -(d-\hat{d})^{2}\log\!\left(\frac{d}{\hat{d}}\right), & d<\hat{d},\\ 0, & d\ge\hat{d}. \end{cases} $$

As $d \to 0$, $\log(d/\hat{d}) \to -\infty$, so $B_{\log}(d) \to +\infty$. The separation between surfaces can asymptotically approach zero but never reach it. It’s a genuinely elegant idea, and the results showed it — thin cloth sheets stacked on each other, each layer resting correctly on the one below, zero interpenetration.
当 $d \to 0$ 时，$\log(d/\hat{d}) \to -\infty$，因此 $B_{\log}(d) \to +\infty$。表面之间的间距可以渐近地趋于零，但永远不会达到零。这是一个非常优雅的想法，结果也证明了这一点——薄布料层叠在一起，每一层都正确地停留在下一层之上，零穿透。

### Why Logarithms Are the Wrong Shape
### 为什么对数函数形状不对

Here’s the subtlety ZOZO’s paper exploits. The log barrier’s second derivative (its curvature, which directly determines how stiff the Newton system becomes near contact) grows without bound as surfaces approach:
这就是 ZOZO 论文所利用的微妙之处。对数势垒的二阶导数（即其曲率，直接决定了牛顿系统在接近接触时的刚度）随着表面接近而无界增长：
$$ \lim_{d\to 0^+} B_{\log}''(d)=\infty $$

That’s mathematically necessary: you need the barrier to get infinitely steep at zero to guarantee infinite energy there. But it creates a serious problem for Newton’s method. Whenever two surfaces get close, the linear system you need to solve at each iteration becomes ill-conditioned: small numerical errors get amplified, the solver requires far more iterations to converge, and in tight configurations it can fail entirely.
这在数学上是必要的：你需要势垒在零点处变得无限陡峭，以保证那里有无限的能量。但这给牛顿法带来了严重的问题。每当两个表面靠近时，你在每次迭代中需要求解的线性系统就会变得病态（ill-conditioned）：微小的数值误差会被放大，求解器需要更多的迭代才能收敛，而在严苛的配置下，它甚至可能完全失败。
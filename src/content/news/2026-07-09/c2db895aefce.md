---
title: "NoiseLang: Where N = 5 is a Dirac delta"
originalUrl: "https://manualmeida.dev/articles/noiselang/"
date: "2026-07-08T22:32:55.488Z"
---

# NoiseLang: Where N = 5 is a Dirac delta
# NoiseLang：当 N = 5 成为狄拉克δ函数时

During my telecommunications degree I took a course on signals and noise, I spent a lot of evenings writing probability by hand: expectations, variances, the odds of two random variables landing in some region. It always sucked, when I tried to run it on a computer, so much boilerplate. That wish became NoiseLang. I started it about nine years ago, however, I never finished it. Only recently, I brought it back thanks to AI tools and something far more ambitious than what I could have built alone the first time.
在攻读电信学位期间，我修过一门关于信号与噪声的课程。我花了很多个夜晚手写概率计算：期望值、方差、两个随机变量落在某个区域的概率。每当我尝试在计算机上运行这些计算时，总是感到非常糟糕，因为需要编写大量的样板代码。这个愿望最终催生了 NoiseLang。我大约在九年前就开始了这个项目，但一直没能完成。直到最近，得益于 AI 工具以及比我当初单枪匹马所能构建的更宏大的目标，我才重新启动了它。

### Everything is a distribution
### 万物皆分布

The whole language hangs on one idea, that every value is a probability distribution. A plain number is a Dirac spike, a distribution with all its weight on a single value. Since constants and random variables are the same kind of object, every operator in the language maps distributions to distributions. A name always refers to one fixed node, the same way X is the same X across a whole page of math. So X + X is 2X and X - X is exactly 0. If you want variable independence you write separate draws, ie, using ~ multiple times, or ~[N] to draw N independent variables into a vector.
整个语言的核心理念是：每一个值都是一个概率分布。一个普通的数字就是一个狄拉克尖峰（Dirac spike），即所有权重都集中在单一数值上的分布。由于常量和随机变量属于同一种对象，语言中的每个运算符都将分布映射为分布。一个名称始终指向同一个固定的节点，就像数学公式中 X 在整页纸上都代表同一个 X 一样。因此，X + X 等于 2X，而 X - X 严格等于 0。如果你想要变量独立，可以编写独立的抽取操作，例如多次使用 `~`，或者使用 `~[N]` 将 N 个独立变量抽取到一个向量中。

```
X ~ unif_int(1, 6)
Y ~ unif_int(1, 6)
X + Y # two independent dice, a real 2d6 distribution
```
```
X ~ unif_int(1, 6)
Y ~ unif_int(1, 6)
X + Y # 两个独立的骰子，一个真实的 2d6 分布
```

Nothing runs until you ask for some results, for example, P(X + Y < 10), at that moment it forces the runtime to run millions of simulations (across all cores, if available) and return an estimate with a standard error attached.
在你请求结果之前，程序不会运行任何计算。例如，当你执行 `P(X + Y < 10)` 时，它会强制运行时环境进行数百万次模拟（如果可用，会跨所有核心运行），并返回一个带有标准误差的估计值。

```
Bday = unif_int(1, 365)
days ~[23] Bday # 23 people in a room
P(has_duplicates(days)) # the birthday paradox, about 0.507
```
```
Bday = unif_int(1, 365)
days ~[23] Bday # 房间里的 23 个人
P(has_duplicates(days)) # 生日悖论，结果约为 0.507
```

This is much easier to watch than to describe, so I built some cool demos!
这比文字描述直观得多，所以我制作了一些很酷的演示！

### A number is a distribution
### 数字即分布

A = 5 looks like a plain constant, and it is, but Noise sees it as a probability distribution where every draw lands on 5. Statisticians call this a Dirac delta, a single infinitely-thin spike.
`A = 5` 看起来像是一个普通的常量，它确实也是，但 Noise 将其视为一个概率分布，其中每次抽取的结果都落在 5 上。统计学家称之为狄拉克δ函数（Dirac delta），即一个无限细的单尖峰。

### The tilde spreads it out
### 波浪号（~）将其展开

D1 ~ unif_int(1, 6) binds a fair die, a discrete uniform where all six faces are equally likely. The spike fans out into six flat bars, so D1 is now uncertain, but you still write it like any other variable.
`D1 ~ unif_int(1, 6)` 绑定了一个公平的骰子，这是一个离散均匀分布，六个面出现的概率相等。尖峰展开成六个平坦的柱状，因此 D1 现在具有不确定性，但你编写它的方式与任何其他变量无异。

### Join them and a bell appears
### 将它们结合，钟形曲线便会出现

Add the constant and two independent dice with S = A + D1 + D2. The flat shapes convolve into a triangle peaked at 12, already curving toward a bell, and if you join a few more they sharpen into a true Gaussian. That's the central limit theorem showing up for free!
通过 `S = A + D1 + D2` 将常量和两个独立骰子相加。这些平坦的形状卷积成一个在 12 处达到峰值的三角形，已经呈现出钟形曲线的趋势；如果你再多加几个，它们就会收敛成真正的高斯分布。这就是中心极限定理的免费呈现！

### A query collapses millions of draws
### 查询操作收敛数百万次抽取

Nothing runs until you ask. E(S), the expected value, fires a Monte Carlo pass that averages millions of rolls into one number, and by the law of large numbers the running mean settles on 12. You wrote a few lines of math, and an expert-level kernel ran underneath.
在你请求之前，什么都不会运行。`E(S)`（期望值）会触发一次蒙特卡洛模拟，将数百万次掷骰的结果平均为一个数字。根据大数定律，运行平均值最终会稳定在 12。你只写了几行数学公式，底层却运行了一个专家级的内核。

### Why it sat for nine years
### 为什么它搁置了九年

The design was never the hard part, because a parser and a tree-walking interpreter for this language is a weekend of work. The problem was everything else, writing a efficient Monte Carlo runtime, instead of a naive interpreter, conditional bayesian inference, and more. Current version is a compiler, a JIT (using the amazing Cranelift), a WASM backend, and a pile of careful numerical code, so for a cute-weekend project it stayed permanently out of reach.
设计从来不是难点，因为为这种语言编写解析器和树遍历解释器只需一个周末。真正的问题在于其他一切：编写高效的蒙特卡洛运行时（而不是简单的解释器）、条件贝叶斯推理等等。当前版本包含一个编译器、一个 JIT（使用了出色的 Cranelift）、一个 WASM 后端以及大量严谨的数值代码，因此对于一个“周末小项目”来说，它始终遥不可及。

### Building the ambitious version with an agent
### 利用 AI Agent 构建宏大版本

At my day job and side projects, I am experimenting with the boundaries of what today’s AI agents can do. For example, I am also porting a game I built 15 years ago for iOS, in archaic Objective-C to a modern game engine (with relative success). With NoiseLang, I realized, AI is great at building the JIT parts, the runtime parts, the numerical parts, but it sucks at coming up with good language design ideas, many times overriding existing language features for different purposes, or coming up with different syntax for non-orthogonal features.
在我的日常工作和副业中，我一直在探索当今 AI Agent 的能力边界。例如，我正在将 15 年前用古老的 Objective-C 为 iOS 开发的一款游戏移植到现代游戏引擎中（并取得了相对成功）。在 NoiseLang 项目中，我意识到 AI 非常擅长构建 JIT 部分、运行时部分和数值计算部分，但在提出优秀的语言设计理念方面却很糟糕——它经常为了不同的目的覆盖现有的语言特性，或者为非正交特性提出不同的语法。

### One IR, three backends
### 一个中间表示（IR），三个后端

Under the hood, `~` and the distribution constructors build an append-only DAG called the RvGraph. This graph is the single source of truth, which later are converted into three different code paths: a columnar batch interpreter that works everywhere and acts as the correctness oracle; a Cranelift JIT that fuses a whole expression into one native kernel; a WASM emitter that does the same for the browser. One shared module defines what the graph means, so the two code generators stay thin and cannot drift apart. Anything a backend can’t successfully compile falls back to the interpreter, and the results stay identical across backends and core counts. All tests run in all three code paths and compared to be bit-identical.
在底层，`~` 和分布构造函数构建了一个名为 RvGraph 的只读 DAG（有向无环图）。该图是唯一的真理来源，随后被转换为三条不同的代码路径：一个可在任何地方运行并作为正确性基准的列式批处理解释器；一个将整个表达式融合为单个原生内核的 Cranelift JIT；以及一个为浏览器执行相同操作的 WASM 发射器。一个共享模块定义了图的含义，因此两个代码生成器保持精简且不会产生偏差。任何后端无法成功编译的内容都会回退到解释器，且结果在不同后端和核心数之间保持一致。所有测试都在这三条代码路径中运行，并进行比对以确保位级一致。

### Making the Monte Carlo loop cheap
### 让蒙特卡洛循环变得廉价

All the performance work is about one loop: draw a few million samples, evaluate the expression on each, and reduce the results. A handful of techniques carry most of it, while keeping the results deterministic (that was the hard part). Kernel fusion keeps every intermediate value in registers, so an arithmetic-heavy expression stays on registers. The PRNG (xoshiro256++) compiles into the kernel, and the ln, sin, and cos become inline polynomial approximations, speeding up the kernel by a factor of 2. My favorite trick is in the RNG. Generating random numbers is a serial dependency chain, so instead of fighting that, the kernel runs four independent streams at once and lets the out-of-order core overlap them. This trick ended up beating a hand-written SIMD kernel! On my 14-core M4 Pro, a one-line P(...) sustains around 5.8 billion samples per second and scales about 9.6× from one core to all of them. Per core, the generated kernel runs within about 1.15× of hand-written Rust compiled by LLVM.
所有的性能优化都围绕一个循环：抽取数百万个样本，对每个样本求值，并归约结果。少数几种技术承担了大部分工作，同时保持了结果的确定性（这是最难的部分）。内核融合将每个中间值保留在寄存器中，因此算术密集型表达式可以完全在寄存器中完成。伪随机数生成器（xoshiro256++）被编译进内核，而 ln、sin 和 cos 则变成了内联多项式近似，使内核速度提升了两倍。我最喜欢的技巧在于 RNG。生成随机数是一个串行依赖链，因此与其对抗它，不如让内核同时运行四个独立的流，并利用乱序执行核心将它们重叠。这个技巧最终击败了手写的 SIMD 内核！在我的 14 核 M4 Pro 上，一行 `P(...)` 代码每秒可维持约 58 亿次采样，并从单核扩展到全核时实现了约 9.6 倍的性能提升。在单核性能上，生成的内核运行速度仅比 LLVM 编译的手写 Rust 代码慢约 1.15 倍。
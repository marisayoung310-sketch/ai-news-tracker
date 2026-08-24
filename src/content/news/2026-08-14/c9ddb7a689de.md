---
title: "Design Notes for a Deterministic C++ Simulation Framework"
originalUrl: "https://dev.to/mendolatech/design-notes-for-a-deterministic-c-simulation-framework-56fo"
date: "2026-08-13T22:45:08.575Z"
---

# Design Notes for a Deterministic C++ Simulation Framework
# C++ 确定性仿真框架设计笔记

“Same inputs, same result” sounds like a simple requirement. In a multithreaded simulation, it is an architectural constraint that touches data layout, scheduling, physics, randomness, floating-point behavior, serialization, and debugging. Determinism is valuable for replays, lockstep networking, regression tests, and reproducing hard failures. It does not happen automatically.

“相同的输入，相同的结果”听起来是一个简单的要求。在多线程仿真中，这是一个涉及数据布局、调度、物理、随机性、浮点行为、序列化和调试的架构约束。确定性对于回放、同步网络（lockstep networking）、回归测试以及重现棘手的故障非常有价值。它不会自动实现。

Define the determinism boundary. Start by stating what must match. Do two runs on the same executable and machine need identical results? Across different compilers? Across CPU architectures? Across operating systems? Those are increasingly difficult guarantees. A framework should document the supported boundary rather than using “deterministic” as a universal adjective.

定义确定性边界。首先明确什么必须保持一致。在同一可执行文件和机器上运行两次，是否需要完全相同的结果？跨不同编译器呢？跨 CPU 架构呢？跨操作系统呢？这些保证的难度呈指数级增长。框架应该记录其支持的边界，而不是将“确定性”作为一个通用的形容词来使用。

Control time. Do not feed variable wall-clock deltas directly into a deterministic simulation. Use a fixed simulation step and decide how the renderer catches up or interpolates. Record inputs by simulation tick. If the system pauses or falls behind, handle that condition explicitly instead of silently changing the rules.

控制时间。不要将可变的挂钟时间增量（wall-clock deltas）直接输入到确定性仿真中。使用固定的仿真步长，并决定渲染器如何追赶或插值。按仿真时钟周期（tick）记录输入。如果系统暂停或滞后，应显式处理该情况，而不是悄悄地改变规则。

Make randomness replayable. Every pseudorandom decision needs a known generator, seed, and consumption order. A global generator shared by many systems is fragile because adding one random call in an unrelated feature shifts the sequence everywhere. Prefer scoped streams or deterministic derivation by system, entity, and tick where appropriate. Record seeds in test and replay artifacts.

使随机性可重现。每一个伪随机决策都需要一个已知的生成器、种子和消耗顺序。由多个系统共享的全局生成器非常脆弱，因为在不相关的功能中添加一个随机调用，就会改变全局的随机序列。在适当的情况下，优先使用作用域流（scoped streams）或基于系统、实体和时钟周期的确定性推导。在测试和回放产物中记录种子。

Schedule parallel work deliberately. Multithreading introduces nondeterministic execution order. If two jobs write shared state, results may depend on timing even when data races are technically avoided. A robust job graph should make read and write sets visible, separate independent phases, and define deterministic merge or reduction rules. Avoid relying on thread completion order. Parallelize work whose outputs can be combined predictably.

刻意地调度并行工作。多线程引入了非确定性的执行顺序。如果两个任务写入共享状态，即使在技术上避免了数据竞争，结果也可能取决于执行时机。一个健壮的任务图（job graph）应该使读写集可见，分离独立的阶段，并定义确定性的合并或归约规则。避免依赖线程完成的顺序。仅对输出可以被可预测地合并的工作进行并行化。

Keep entity iteration stable. Entity-component systems often use dense arrays and swap-remove operations for speed. That can change iteration order. If order affects gameplay, collision resolution, or random-number consumption, define a stable ordering rule or ensure the algorithm is order-independent. Document where ordering is meaningful.

保持实体迭代的稳定性。实体组件系统（ECS）为了速度，通常使用紧凑数组和交换删除（swap-remove）操作。这可能会改变迭代顺序。如果顺序会影响游戏逻辑、碰撞检测或随机数消耗，请定义稳定的排序规则，或确保算法与顺序无关。记录下哪些地方的顺序是有意义的。

Treat floating point carefully. Floating-point operations are not perfectly associative. Parallel reductions, compiler optimizations, instruction sets, and platform libraries can change low bits that later amplify. Options include constrained build settings, fixed-point arithmetic for selected systems, deterministic math routines, quantization, or a narrower same-platform guarantee. The right choice depends on the product.

谨慎处理浮点数。浮点运算并不完全满足结合律。并行归约、编译器优化、指令集和平台库可能会改变低位数据，并随后被放大。可选方案包括：受限的构建设置、针对特定系统的定点算术、确定性数学库、量化，或更窄的“同平台一致”保证。正确的选择取决于具体产品。

Build replay and state hashing early. A deterministic framework should be able to: record inputs by tick; restore a known initial state; replay without live input; hash relevant state at checkpoints; report the first divergent tick; dump enough context to inspect the responsible systems. Without those tools, “determinism” is difficult to verify.

尽早构建回放和状态哈希功能。一个确定性框架应该能够：按时钟周期记录输入；恢复已知的初始状态；在没有实时输入的情况下进行回放；在检查点对相关状态进行哈希处理；报告第一个出现分歧的时钟周期；转储足够的上下文以检查负责的系统。没有这些工具，“确定性”将难以验证。

AtlasCore is a public Mendola.Tech C++20 simulation-framework project that explores entity systems, job scheduling, and deterministic simulation. It sits alongside other inspectable work on the Mendola.Tech portfolio.

AtlasCore 是 Mendola.Tech 的一个开源 C++20 仿真框架项目，旨在探索实体系统、任务调度和确定性仿真。它与 Mendola.Tech 作品集中的其他可审查项目并列。

Determinism is an operating capability. The biggest benefit is not philosophical purity. It is turning a rare, timing-sensitive failure into a reproducible test case. That only works when the framework treats determinism as a system-wide contract, records the information required to replay, and reports divergence in a form a developer can investigate.

确定性是一种操作能力。它最大的好处不是哲学上的纯粹性，而是将罕见的、对时序敏感的故障转化为可重现的测试用例。只有当框架将确定性视为系统级的契约，记录回放所需的信息，并以开发者可调查的形式报告分歧时，这种能力才能发挥作用。
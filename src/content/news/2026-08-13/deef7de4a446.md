---
title: "A critical review of Xilem in 2026"
originalUrl: "https://hackmd.io/@s_haMSbyTAOWfoXc1aYNUg/Hka74gCwZg"
date: "2026-08-12T22:23:39.578Z"
---

# A critical review of Xilem in 2026
# 2026 年 Xilem 深度评测

This is a long-overdue review of Xilem's current state, with a focus on pain points and needed changes. My opinion, which I think is widely shared by people who've worked on Xilem, is that the current architecture isn't remotely close to working. Making non-trivial apps with Xilem is painful, people aren't using it, other frameworks are much more convenient. Xilem needs to change or it will die.

这是一篇迟来的 Xilem 现状评测，重点关注其痛点及亟需的改进。我的观点——我认为这也是许多参与过 Xilem 开发的人所共有的——是目前的架构距离“可用”还差得很远。使用 Xilem 构建非简单的应用程序非常痛苦，人们并不愿意使用它，而其他框架则方便得多。Xilem 必须做出改变，否则终将消亡。

## The developer experience
## 开发者体验

Xilem's DX is, to be blunt, awful. There's a few recurring problems:
- Xilem still hasn't found a scalable way to compose components and manage complex state.
- The architecture is very generics-heavy, in a way that can blow up compile times if the user doesn't know how to appease the trait solver. Future compiler releases might solve the problem, but for now this is a footgun.
- The generics-heavy abstractions lead to obtuse error messages. Even when the error points at a legitimate root cause, finding that cause from the error message is always way harder than it should be.
- The first-time user experience has a lot of small papercuts, such as having to write `+ use<>` in the signature of component functions.

坦率地说，Xilem 的开发者体验（DX）非常糟糕。存在几个反复出现的问题：
- Xilem 至今仍未找到一种可扩展的方式来组合组件和管理复杂状态。
- 架构过度依赖泛型，如果用户不知道如何“安抚”编译器（trait solver），编译时间会爆炸。未来的编译器版本或许能解决这个问题，但目前这简直是“自掘坟墓”。
- 过度抽象的泛型导致了晦涩难懂的错误信息。即使错误指向了真正的根本原因，从错误信息中定位该原因也远比应有的难度大得多。
- 初次使用者的体验存在许多细小的“割手”之处，例如必须在组件函数的签名中编写 `+ use<>`。

These problems aren't from a lack of care: Philip, Daniel and I (and others) have spent a lot of time trying to find better ways to compose the UI and make the error messages better. Speaking from experience, our efforts have not born fruit, because Xilem suffers from profound architectural *and* organizational problems that we've failed to address.

这些问题并非源于不够用心：Philip、Daniel 和我（以及其他人）花费了大量时间试图寻找更好的 UI 组合方式并改善错误信息。以我的经验来看，我们的努力并没有结出果实，因为 Xilem 饱受深层的架构和组织问题困扰，而我们未能解决这些问题。

## General organizational problems
## 总体组织问题

Xilem has flipped between being a pure research effort, a corporate-funded project meant to showcase the potential of the Linebender stack, and a general-purpose GUI framework for everyday coding. This pull between different goals has led to systemic problems, not because any specific maintainer's decisions, but because of general project drift. The biggest problems are:

Xilem 在纯研究项目、旨在展示 Linebender 技术栈潜力的企业资助项目，以及用于日常编码的通用 GUI 框架之间反复摇摆。这种在不同目标之间的拉扯导致了系统性问题，这并非源于某位维护者的决策，而是源于项目整体方向的漂移。最大的问题在于：

- **Premature optimization:** The Xilem architecture has been driven by efforts to maximize performance. Given that we still don't benchmark Xilem, these efforts are mostly based on faith.
- **Complexity addiction:** Xilem is way too complex. Its essential complexity is high, *and* we keep solving problems by adding more generic parameters, more traits, more complexity.
- **Scope creep:** The framework is too large and feature-rich, given that the architecture is still being iterated on. It has a native backend *and* a web backend, a tokio runtime, about 30 traits (187 if we include `xilem_web`), the `View` trait has about 70 implementations (21 in `xilem_core` alone), etc. Having so much *stuff* makes it hard to iterate on architecture, which is why people who try changing it often end up going with clean-room projects. This tendency to always add more, more generics, more complexity, more features, means that we have a very hard time experimenting with architectural changes because every change has a wide blast radius. This is a major problem, because the architecture badly needs change.

- **过早优化：** Xilem 的架构一直由追求极致性能的努力所驱动。鉴于我们至今仍未对 Xilem 进行基准测试，这些努力大多基于“信仰”。
- **复杂性成瘾：** Xilem 太复杂了。其本质复杂性很高，而且我们不断通过增加更多的泛型参数、更多的 trait 和更多的复杂性来解决问题。
- **范围蔓延：** 考虑到架构仍在迭代中，该框架显得过于庞大且功能过剩。它拥有原生后端和 Web 后端、tokio 运行时、约 30 个 trait（如果算上 `xilem_web` 则有 187 个）、`View` trait 拥有约 70 个实现（仅 `xilem_core` 中就有 21 个）等等。拥有如此多的“东西”使得架构迭代变得困难，这就是为什么试图改变它的人最终往往选择从零开始（clean-room projects）。这种总是增加更多泛型、更多复杂性、更多功能的倾向，意味着我们很难尝试架构变更，因为每一次改动的影响范围都太广。这是一个重大问题，因为架构迫切需要变革。

## Architecture problems
## 架构问题

As far as I'm concerned, Xilem's architecture is stuck in multiple dead-ends.
### Two-way data bindings don't work

在我看来，Xilem 的架构陷入了多个死胡同。
### 双向数据绑定行不通

Xilem's design aesthetic is centered around composing mutable access to a central state. [...] My take is simple: **two-way bindings don't work in Rust** (and barely work in other languages). Xilem's obsession with two-way bindings means that every single view needs to carry around a `State` generic argument even though most need it, which leads to worse compile error messages and worse interfaces. Also, having every component both read a slice of app state and mutate it produces awkward function signatures.

Xilem 的设计美学围绕着组合对中心状态的可变访问。……我的观点很简单：**双向绑定在 Rust 中行不通**（在其他语言中也勉强能用）。Xilem 对双向绑定的执着意味着每一个视图都需要携带一个 `State` 泛型参数，尽管大多数视图并不需要它，这导致了更糟糕的编译错误信息和更差的接口。此外，让每个组件既读取应用状态片段又对其进行修改，会产生笨拙的函数签名。
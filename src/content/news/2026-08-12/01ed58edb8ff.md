---
title: "Mojo 1.0"
originalUrl: "https://www.modular.com/blog/modular-26-5-mojo-1-0-is-here"
date: "2026-08-11T22:11:13.316Z"
---

# Mojo 1.0

**August 11, 2026 | Modular 26.5: Mojo 1.0 is here! | Modular Team**

2026年8月11日 | Modular 26.5：Mojo 1.0 正式发布！| Modular 团队

Today, the Mojo language officially reaches 1.0: a milestone the language has been building toward since its first release in 2023. Mojo has grown into a general-purpose language with a vibrant developer community writing their own libraries, tools, and applications on top of it. With Mojo 1.0, developers can now build for the long-term on a stable, production-ready language foundation.

今天，Mojo 语言正式迈入 1.0 版本：这是该语言自 2023 年首次发布以来一直努力实现的一个里程碑。Mojo 已经成长为一种通用编程语言，拥有一个充满活力的开发者社区，他们正在其之上编写自己的库、工具和应用程序。随着 Mojo 1.0 的发布，开发者现在可以在一个稳定、生产就绪的语言基础上进行长期开发。

### Mojo 1.0: A stable foundation for ecosystem growth
### Mojo 1.0：生态系统增长的稳定基石

Modular has rapidly evolved the Mojo language through extensive internal use. But that pace of progress has come with a tradeoff: frequent changes have made it difficult for the community to maintain long-term projects.

Modular 通过大量的内部使用，迅速推动了 Mojo 语言的演进。但这种快速进步也带来了代价：频繁的变动使得社区难以维护长期项目。

As we stated when we first announced the path to Mojo 1.0, its primary goal is to provide a stable foundation developers can build on. We are making that commitment today because Mojo is ready: it is no longer just a language we are developing; it is a language we rely on every day in production as the foundation of our commercial infrastructure, MAX and Modular Cloud.

正如我们在首次宣布 Mojo 1.0 路线图时所言，其主要目标是提供一个开发者可以信赖的稳定基础。我们今天做出这一承诺是因为 Mojo 已经准备就绪：它不再仅仅是我们正在开发的语言；它已成为我们每天在生产环境中依赖的语言，是我们商业基础设施（MAX 和 Modular Cloud）的基石。

Importantly, Mojo 1.0 does not mark the end of the language’s evolution, but it is an important milestone on a longer journey. During the 1.x timeframe, changes should primarily be additive, giving developers confidence that the language will not continually shift beneath them. Breaking changes may still be made, but will be managed with care, following the standards of how mature languages (e.g. C++) evolve over time.

重要的是，Mojo 1.0 并不标志着该语言演进的终结，而是漫长旅程中的一个重要里程碑。在 1.x 阶段，变更将主要以增量为主，让开发者确信语言基础不会频繁变动。虽然仍可能存在破坏性变更，但我们将谨慎管理，遵循成熟语言（如 C++）随时间演进的标准。

Yet, this milestone belongs just as much to our incredible community as it does to us. Since we open-sourced the standard library, nearly 200 contributors have landed more than 1,100 pull requests, changing over 200,000 lines of code, and more than a thousand others have filed issues that shaped the language. To every developer who filed an issue, opened a pull request, wrote a language proposal, or built a package: thank you for being the architects of this language alongside us.

然而，这个里程碑不仅属于我们，也属于我们出色的社区。自我们开源标准库以来，近 200 名贡献者提交了超过 1,100 个 Pull Request，修改了超过 20 万行代码，还有超过一千人提交了塑造该语言的 Issue。感谢每一位提交 Issue、发起 Pull Request、撰写语言提案或构建包的开发者：感谢你们与我们共同成为这门语言的架构师。

### Mojo improvements in 26.5
### 26.5 版本中的 Mojo 改进

Much of this release is focused on completing the work required for Mojo 1.0 – a throughline across our last several releases as we’ve worked to make the language more consistent, predictable, and approachable.

本次发布的大部分工作集中在完成 Mojo 1.0 所需的收尾工作——这也是我们过去几次发布的一贯主线，旨在使语言更加一致、可预测且易于上手。

Where Mojo offered multiple ways to express the same idea, we’ve converged on one. Variables are now consistently declared with `var`, closures have been unified, there is a single `Pointer` type, and a number of renamings have made the Mojo lexicon more precise and consistent.

在 Mojo 提供多种方式表达同一概念的地方，我们已统一为一种。现在变量统一使用 `var` 声明，闭包已统一，拥有单一的 `Pointer` 类型，并且通过一系列重命名，使 Mojo 的词汇表更加精确和一致。

This release completes that final round of language simplification and cleanup, giving Mojo 1.0 the stable, coherent foundation we want developers to be able to build on for years to come.

本次发布完成了最后一轮语言简化和清理工作，为 Mojo 1.0 提供了我们希望开发者在未来多年内能够持续构建的稳定、连贯的基础。

Beyond this foundational work, Mojo 1.0 also includes several new features and improvements since the last beta release:
除了这些基础工作外，Mojo 1.0 还包含自上次测试版以来的多项新功能和改进：

*   Mojo now supports Python-style “lambda” syntax for inline closures.
    Mojo 现在支持用于内联闭包的 Python 风格“lambda”语法。
*   The Mojo LSP server is far more stable and reliable, greatly improving your everyday experience with VS Code and other editors.
    Mojo LSP 服务器更加稳定可靠，极大地改善了您在 VS Code 和其他编辑器中的日常使用体验。
*   The Mojo AI Skills are now “1.0 ready”, covering new project creation, GPU programming, porting from other languages, etc.
    Mojo AI Skills 现已达到“1.0 就绪”状态，涵盖新项目创建、GPU 编程、从其他语言移植等功能。
*   Mojo now diagnoses memory safety problems involving reference invalidation, e.g. noticing when `List.append` invalidates a reference into the list.
    Mojo 现在可以诊断涉及引用失效的内存安全问题，例如检测 `List.append` 何时会导致指向列表的引用失效。
*   “where” clauses are more consistently used across the standard library, and allow a descriptive message to make failures more actionable.
    “where”子句在标准库中得到了更一致的使用，并允许添加描述性消息，使失败原因更易于处理。

These are only a few of the highlights. See the full Mojo changelog on mojolang.org for the complete list of changes.
以上仅是部分亮点。请访问 mojolang.org 查看完整的 Mojo 更新日志以获取所有变更列表。

### Where Mojo goes from here
### Mojo 的未来方向

Mojo 1.0 is a major milestone, but there’s so much more we are planning for the language. Mojo has already established itself as a powerful language for writing high-performance code across modern CPUs, GPUs, and accelerators. The next phase of its evolution is to broaden that foundation and make Mojo a truly great general-purpose systems programming language.

Mojo 1.0 是一个重要的里程碑，但我们为该语言规划的内容远不止于此。Mojo 已经确立了其作为编写跨现代 CPU、GPU 和加速器的高性能代码的强大语言地位。其演进的下一阶段是拓宽这一基础，使 Mojo 成为一种真正出色的通用系统编程语言。

That means continuing to invest in the core language and developer experience, with major capabilities ahead including a robust asynchronous programming model, pattern matching and unions, and much more. You can see what we are working toward in the Mojo roadmap.

这意味着我们将继续投资于核心语言和开发者体验，未来将引入包括强大的异步编程模型、模式匹配和联合类型等在内的重大功能。您可以在 Mojo 路线图中查看我们正在努力的方向。

Finally, we will continue to progressively open-source more of the Mojo language, as well as components in MAX that we have built with it. Our commitment remains unchanged – we will open source the Mojo compiler and toolchain in 2026.

最后，我们将继续逐步开源更多的 Mojo 语言内容，以及我们用它构建的 MAX 组件。我们的承诺保持不变——我们将在 2026 年开源 Mojo 编译器和工具链。

### MAX enhancements in 26.5
### 26.5 版本中的 MAX 增强

While Mojo 1.0 is the highlight of this release, 26.5 brings improvements to MAX, too.
虽然 Mojo 1.0 是本次发布的亮点，但 26.5 也为 MAX 带来了改进。

Installing MAX is now easier: use `max["serve"]` and `max["benchmark"]` (`max-serve` and `max-benchmark` with conda) to install only the dependencies you need, or `max["all"]` to install everything. The `modular` package will be retired in 26.6.
安装 MAX 现在变得更容易：使用 `max["serve"]` 和 `max["benchmark"]`（在 conda 中为 `max-serve` 和 `max-benchmark`）仅安装您需要的依赖项，或使用 `max["all"]` 安装所有内容。`modular` 包将在 26.6 版本中退役。

MAX also adds support for two new model families: GLM-5.2 and Nemotron-H, both hybrid Mamba-2 models. And Kimi 2.5 now works with Module V3, our streamlined model-authoring path.
MAX 还增加了对两个新模型系列的支持：GLM-5.2 和 Nemotron-H，两者均为混合 Mamba-2 模型。此外，Kimi 2.5 现在可以与 Module V3（我们简化的模型创作路径）配合使用。

Last, our collection of open source agent skills is a great way to get started with this release. We've used these skills internally to speed up full model lifecycle bring-up, and they've picked up 7.2K+ downloads through skills.sh.
最后，我们的开源 Agent Skills 集合是上手本次发布版本的好方法。我们在内部使用这些技能来加速完整的模型生命周期启动，并且它们在 skills.sh 上已经获得了超过 7,200 次下载。

For the full list of updates, see the MAX changelog.
有关更新的完整列表，请参阅 MAX 更新日志。

### Get started with 26.5 and Mojo 1.0
### 开始使用 26.5 和 Mojo 1.0

Install or upgrade to get started in minutes:
安装或升级以在几分钟内开始使用：

```bash
uv pip install --upgrade mojo
uv pip install max[all]
```

1.0 is just the beginning, and we’ll share more on our plans for Mojo, MAX, and open source at ModCon on August 18th in San Francisco. Tune in virtually via the livestream or join the in-person waitlist.
1.0 仅仅是一个开始，我们将在 8 月 18 日于旧金山举行的 ModCon 大会上分享更多关于 Mojo、MAX 和开源的计划。欢迎通过直播在线参与，或加入线下活动的候补名单。
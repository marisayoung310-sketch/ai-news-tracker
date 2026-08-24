---
title: "I’ve Been a Flutter GDE for 8 Years. Here’s the Ground Truth on “Flutter is Dying”"
originalUrl: "https://dev.to/gde/ive-been-a-flutter-gde-for-8-years-heres-the-ground-truth-on-flutter-is-dying-23pp"
date: "2026-08-18T21:54:32.788Z"
---

# I’ve Been a Flutter GDE for 8 Years. Here’s the Ground Truth on “Flutter is Dying”
# 我担任 Flutter GDE 已有 8 年：关于“Flutter 正在消亡”的真相

Every few months, like clockwork, the tech blogosphere gets flooded with the same recycled headline: “Is Flutter Dying?”, “Why CTOs Are Quietly Leaving Flutter”, or “Why Google is Killing Its Cross-Platform Bet.” As someone who has been a Flutter Google Developer Expert for eight years now—literally from day one of the GDE program—and a five-decade software industry veteran, I usually just chuckle at the clickbait. “Flutter is dead.” — Said every six months since 2018. Meanwhile: Flutter is kicking tail on every single measurable scale.

每隔几个月，科技博客圈就会像设定好闹钟一样，充斥着同样陈词滥调的标题：“Flutter 正在消亡吗？”、“为什么 CTO 们正在悄悄放弃 Flutter？”或者“为什么谷歌要扼杀它的跨平台赌注？”作为一名担任 Flutter 谷歌开发者专家（GDE）长达八年（从 GDE 项目成立的第一天起）的从业者，同时也是拥有五十年经验的软件行业老兵，我通常只会对这些标题党嗤之以鼻。“Flutter 已死。”——自 2018 年以来，这句话每半年就会出现一次。然而事实是：Flutter 在每一个可衡量的指标上都表现得极其出色。

The alarmist articles point to standard corporate reorganizations, shifting tech job boards, and "state management fatigue" as evidence of Flutter’s demise. But having watched this ecosystem evolve from an experimental alpha into an enterprise powerhouse, the reality on the ground is the exact opposite. Here is the real insider story on what’s actually happening with Dart and Flutter.

这些危言耸听的文章将常规的企业重组、科技招聘市场的变动以及“状态管理疲劳”作为 Flutter 走向衰亡的证据。但作为见证了这个生态系统从实验性的 Alpha 版本演变为企业级强大工具的人，现实情况恰恰相反。以下是关于 Dart 和 Flutter 现状的真实内幕。

### 1. The Inside Story: What Happened at Google?
### 1. 内幕故事：谷歌内部发生了什么？

When tech companies restructured engineering teams recently, the internet spun a wild narrative that "Google put Flutter on life support." Having direct access to internal teams, I watched the commitment to Dart and Flutter remain steadfast within the organization. However, there was a temporary disconnect: internal engineering activity was roaring, but external communications and public advocacy had slowed down, leaving an information vacuum that clickbait writers eagerly filled. I personally called out to team leaders and senior VPs that this perception gap needed immediate correction. And the leadership responded strongly:

近期科技公司重组工程团队时，互联网上流传着一种荒谬的说法，称“谷歌已将 Flutter 撤下生命维持系统”。由于我能直接接触内部团队，我亲眼见证了组织内部对 Dart 和 Flutter 的承诺依然坚定。然而，当时确实存在暂时的脱节：内部工程活动非常活跃，但外部沟通和公共宣传有所放缓，留下了一个信息真空，而标题党作者们急切地填补了这一空白。我亲自向团队领导和高级副总裁指出，这种认知差距需要立即纠正。领导层也做出了强有力的回应：

*   **Revitalized DevRel & Advocacy:** A renewed surge in active community engagement, tutorials, and public roadmaps.
*   **Enterprise Adoption Transparency:** Showcasing massive internal and external production milestones.
*   **Aggressive Core Investment:** Deep work on the Impeller rendering engine, Dart 3.x ergonomics, WebAssembly (Wasm) compilation, and native multiplatform performance.

*   **重振开发者关系与宣传：** 重新掀起社区互动、教程发布和公开路线图的热潮。
*   **企业采用透明化：** 展示大规模的内部和外部生产里程碑。
*   **积极的核心投入：** 在 Impeller 渲染引擎、Dart 3.x 人体工程学、WebAssembly (Wasm) 编译以及原生多平台性能方面进行深度开发。

Flutter is not a side project at Google; it powers critical business apps across Google (Google Ads, Google Pay, Family Link, Google Classroom) and continues to see deep infrastructure investment.

Flutter 在谷歌内部绝非副业；它驱动着谷歌内部的关键业务应用（如 Google Ads、Google Pay、Family Link、Google Classroom），并持续获得深度的基础设施投入。

### 2. The "Hiring Paradox": Why Flutter Job Postings Look Different
### 2. “招聘悖论”：为什么 Flutter 的职位发布看起来与众不同

Critics often point to public job boards and claim, "Look, there are fewer Flutter job postings than native Android or iOS!" What they fail to realize is how enterprises actually adopt Flutter: When an enterprise migrates to Flutter, they rarely post 10 new external job listings. Instead, they merge their existing 5-person iOS team and 5-person Android team into a single, unified Flutter team—often cutting total hiring demand in half while doubling feature velocity.

批评者经常指着招聘网站声称：“看，Flutter 的职位发布比原生 Android 或 iOS 少得多！”他们没有意识到企业实际上是如何采用 Flutter 的：当企业迁移到 Flutter 时，他们很少会发布 10 个新的外部招聘需求。相反，他们会将现有的 5 人 iOS 团队和 5 人 Android 团队合并为一个统一的 Flutter 团队——这通常会将总招聘需求减半，同时将功能交付速度提高一倍。

Flutter's sheer efficiency is what creates the illusion of fewer job listings. And when greenfield Flutter positions do open up, junior applicants aren't competing in a vacuum—they are competing against senior mobile engineers with a decade of native iOS and Android experience who upskilled into Flutter. That’s not a sign of a dying framework; that’s a sign of a mature, competitive engineering discipline.

Flutter 的极高效率造成了职位发布较少的错觉。当确实出现新的 Flutter 职位时，初级申请者并非在真空中竞争——他们是在与拥有十年原生 iOS 和 Android 开发经验、并已转型掌握 Flutter 的资深移动工程师竞争。这绝不是框架消亡的迹象，而是一个成熟且具有竞争力的工程学科的标志。

### 3. "State Management Fatigue" Is a Solved Problem
### 3. “状态管理疲劳”是一个已解决的问题

Another frequent complaint is that Flutter has "too many state management libraries." Yes, Flutter gave developers freedom. And over the years, the community experimented with everything from ScopedModel and Provider to BLoC, MobX, and Riverpod.

另一个常见的抱怨是 Flutter 有“太多的状态管理库”。是的，Flutter 给了开发者自由。多年来，社区尝试了从 ScopedModel 和 Provider 到 BLoC、MobX 和 Riverpod 的各种方案。

*   **2018 (Streams & Microtasks):** Heavyweight stream controllers and async microtask queues.
*   **2020 (Provider & Codegen):** Context lookups, code generation, and complex lifecycles.
*   **2026 (Signals & Modern BLoC):** Fine-grained reactivity, 0ms synchronous updates, and zero boilerplate.

*   **2018 年（流与微任务）：** 重量级的流控制器和异步微任务队列。
*   **2020 年（Provider 与代码生成）：** 上下文查找、代码生成和复杂的生命周期。
*   **2026 年（Signals 与现代 BLoC）：** 细粒度响应式、0 毫秒同步更新以及零样板代码。

That evolution isn’t a sign of fragmentation—it’s the natural progress of modern software engineering. We learned what worked (unidirectional data flow, state machines, fine-grained reactivity) and discarded what didn't (excessive code generation, microtask queue latency, and lingering build dependencies). Today, with modern solutions like pure Dart Signals and frameworks like BlocSignal, state management in Flutter is faster, more synchronous, and more reliable than it has ever been.

这种演变不是碎片化的标志，而是现代软件工程的自然进步。我们学会了什么有效（单向数据流、状态机、细粒度响应式），并抛弃了无效的部分（过度的代码生成、微任务队列延迟以及冗余的构建依赖）。如今，借助纯 Dart Signals 和 BlocSignal 等现代解决方案，Flutter 中的状态管理比以往任何时候都更快、更同步、更可靠。

### 4. The Measurable Reality: Flutter is Kicking Tail
### 4. 可衡量的现实：Flutter 表现强劲

If you want to know whether a framework is healthy, look at the cold, hard data:
*   **Play Store / App Store Presence:** Over 1,000,000+ Flutter apps published and growing rapidly.
*   **Rendering Engine:** Impeller delivers flawless 60/120fps GPU pipelines, eliminating shader jank once and for all.
*   **Web Performance:** Wasm compilation brings near-native performance to the browser.
*   **Universal Reach:** Seamless execution across iOS, Android, macOS, Windows, Linux, Embedded, and Web (via Jaspr).
*   **Language Evolution:** Modern Dart 3.x delivers sealed classes, pattern matching, records, and primary constructors.

如果你想知道一个框架是否健康，看看这些冷冰冰的数据：
*   **应用商店表现：** 已发布超过 100 万个 Flutter 应用，且数量在快速增长。
*   **渲染引擎：** Impeller 提供完美的 60/120fps GPU 流水线，彻底消除了着色器卡顿。
*   **Web 性能：** Wasm 编译为浏览器带来了近乎原生的性能。
*   **通用覆盖：** 在 iOS、Android、macOS、Windows、Linux、嵌入式设备和 Web（通过 Jaspr）上实现无缝运行。
*   **语言演进：** 现代 Dart 3.x 带来了密封类、模式匹配、记录类型和主构造函数。

### The Bottom Line
### 总结

Every successful technology goes through the classic hype curve:
1. The Novelty Phase (Everything is magic!)
2. The "Trough of Disillusionment" (Clickbait writers declare it dead when the initial hype normalizes)
3. The Plateau of Productivity (Enterprises quietly build profitable, massive-scale products with it every day)

每一项成功的技术都会经历经典的炒作周期：
1. 新奇阶段（一切皆魔法！）
2. “幻灭低谷”（当最初的炒作回归常态时，标题党作者宣布它已死）
3. “生产力高原”（企业每天都在悄悄地用它构建盈利的大规模产品）

Flutter is firmly in the Plateau of Productivity. It is mature, stable, blazingly fast, and supported by one of the most vibrant developer communities in software history. So the next time you see a headline asking "Is Flutter Dying?"... smile, close the tab, and go build something great. 🚀

Flutter 正稳稳地处于“生产力高原”阶段。它成熟、稳定、速度极快，并拥有软件史上最活跃的开发者社区之一。所以，下次当你看到标题问“Flutter 正在消亡吗？”时……笑一笑，关掉标签页，去构建一些伟大的东西吧。🚀

*Randal L. Schwartz is a Google Developer Expert (GDE) in Dart and Flutter, author of numerous classic programming books, five-decade software industry veteran, and Project Lead for the BlocSignal ecosystem.*

*Randal L. Schwartz 是 Dart 和 Flutter 领域的谷歌开发者专家（GDE），多本经典编程书籍的作者，拥有五十年经验的软件行业老兵，也是 BlocSignal 生态系统的项目负责人。*
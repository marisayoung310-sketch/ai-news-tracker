---
title: "The Economic Benefit of Refactoring"
originalUrl: "https://martinfowler.com/articles/exploring-gen-ai/refactoring-economic-benefit.html"
date: "2026-07-30T22:31:14.226Z"
---

# The Economic Benefit of Refactoring
# 重构的经济效益

Giles Edwards-Alexander is CTO for Europe, Middle East and India at Thoughtworks. He has over 25 years experience in engineering and technology leadership across technologies from mobile to AI and industries including retail, fintech and healthcare. This article is part of “Exploring Gen AI”. A series capturing Thoughtworks technologists' explorations of using gen ai technology for software development. 30 July 2026
Giles Edwards-Alexander 是 Thoughtworks 欧洲、中东和印度地区的首席技术官（CTO）。他在工程和技术领导领域拥有超过 25 年的经验，涵盖从移动端到人工智能等多种技术，以及零售、金融科技和医疗保健等行业。本文是“探索生成式 AI”（Exploring Gen AI）系列文章的一部分，该系列记录了 Thoughtworks 技术专家们在软件开发中使用生成式 AI 技术的探索历程。2026 年 7 月 30 日。

As part of getting to grips with the new world of agentic engineering, I built an application to support my work. It’s a sophisticated app: high-quality web UI with dynamic refresh and look-up, modals and auto-save, integrations to external systems, machine learning and text analysis, background jobs, and a proper environment setup with fully automated deployment. It’s approximately 150,000 lines of code, primarily in Rust (~120 kLoC) with the remainder in TypeScript and Terraform. This was entirely written by agents. Mostly Claude Code, and some use of Cursor. I didn’t read or review any of the code, except occasionally, out of interest.
为了掌握代理工程（agentic engineering）这一新领域，我构建了一个应用程序来辅助我的工作。这是一个复杂的应用：拥有高质量的 Web UI，支持动态刷新和查找、模态框和自动保存、与外部系统的集成、机器学习和文本分析、后台作业，以及具备完全自动化部署的完善环境设置。代码量约为 15 万行，主要使用 Rust（约 12 万行），其余部分为 TypeScript 和 Terraform。这些代码完全由 AI 代理编写，主要是 Claude Code，也用到了一些 Cursor。除了偶尔出于好奇查看一下，我没有阅读或审查过任何代码。

While building the application, I could see some things going awry. After watching an edit to line 4,000 of a file scroll by in the terminal, I had a closer look. The data access layer had grown to over 6,000 lines. As more features landed, this continued to grow. Every query, read or write, repeated the same HTTP request setup, the same JSON encoding and decoding. Eventually, it reached 17,155 lines. In a single Rust file.
在构建应用的过程中，我发现了一些问题。在终端看到对一个文件第 4,000 行的编辑滚动而过时，我仔细检查了一下。数据访问层已经增长到超过 6,000 行。随着更多功能的加入，它持续膨胀。每一次查询、读取或写入，都重复着相同的 HTTP 请求设置、相同的 JSON 编码和解码。最终，它达到了 17,155 行。而且是在一个单一的 Rust 文件中。

### An experiment in refactoring
### 重构实验

The 17,155 line file was the entire data access layer. A single, self-contained module. Reviewing the code, there was no de-duplication, no internal language, limited extraction of functions, and very little extraction of classes. It did have a clear boundary with an interface to preserve. It was a great target for refactoring.
这个 17,155 行的文件就是整个数据访问层，是一个单一的、自包含的模块。审查代码后发现，其中没有去重，没有内部语言，函数提取有限，类提取也非常少。不过，它确实有一个清晰的边界和需要保留的接口。这成为了重构的绝佳目标。

The goal of refactoring an agentic code base is to spend tokens now in refactoring to make token consumption for future work lower. An experiment should be able to show that as this file was refactored the token cost of making separate feature implementations in this code base would decrease. Precisely because agents never learn this was now possible to run as an experiment. I could prompt a fresh agent to make exactly the same change after every refactoring stage. Unlike a human engineer, the experiment would not be tainted by learning from previous steps.
重构代理代码库的目标是：现在投入 Token 进行重构，以降低未来工作的 Token 消耗。实验应该能够证明，随着该文件的重构，在该代码库中实现独立功能所需的 Token 成本会降低。正是因为 AI 代理不会“学习”，这使得将其作为实验运行成为可能。我可以在每个重构阶段后，提示一个新的代理进行完全相同的更改。与人类工程师不同，该实验不会因为从之前的步骤中学习而受到干扰。

**The Process:**
1. Create an overall refactoring plan, following strict refactoring discipline.
2. Craft a representative change, described in a single prompt.
3. Establish a baseline cost of change: in a sub-agent, execute that prompt, including asking the sub-agent to report token consumption. Throw away the change.
4. In a loop: Apply a single step of the overall refactoring. In a sub-agent, execute exactly the same change receiving the token cost of the change. Throw away the change.
5. Record all token costs, time to execute the change, and lines of code after each step of the refactoring, including the baseline.

**流程：**
1. 制定总体重构计划，遵循严格的重构准则。
2. 设计一个具有代表性的变更，并用一个提示词（prompt）描述。
3. 建立变更的基准成本：在子代理中执行该提示词，并要求子代理报告 Token 消耗量。随后丢弃该变更。
4. 循环执行：应用总体重构的一个步骤。在子代理中执行完全相同的变更，并获取该变更的 Token 成本。随后丢弃该变更。
5. 记录所有 Token 成本、执行变更的时间，以及重构每一步（包括基准）后的代码行数。

One caveat: Claude doesn’t provide reliable methods for counting tokens live despite showing token counts, reporting tokens consumed per session, and billing for tokens. I’m assuming this is a temporary issue that will improve over time. Instead, the sub-agent reported the number of characters received and sent and used tiktoken to approximate tokens, by dividing character count by four.
一个注意事项：尽管 Claude 会显示 Token 计数、报告每会话消耗的 Token 并进行计费，但它目前不提供可靠的实时 Token 计数方法。我假设这是一个暂时的、会随时间改善的问题。因此，我让子代理报告接收和发送的字符数，并使用 `tiktoken` 通过将字符数除以 4 来估算 Token 数量。

### Results
### 结果

*(Table omitted for brevity, showing the reduction in LoC and token consumption as refactoring steps 1-15 were applied.)*
*（为简洁起见省略表格，该表展示了随着重构步骤 1-15 的应用，代码行数和 Token 消耗量的减少。）*

The interesting metrics here are the total lines of code in the data access layer, the total lines of code in the largest single file in the data access layer and the input tokens consumed while producing the change. This chart shows four things. The first point is the baseline, step 0, and then the same metrics are repeated after each refactoring step has been applied.
这里有趣的指标是：数据访问层的总代码行数、数据访问层中单个最大文件的总代码行数，以及在产生变更时消耗的输入 Token。该图表展示了四点：第一个点是基准（步骤 0），之后是应用每个重构步骤后重复测量的相同指标。

The total lines of code in the data access layer as a whole. Initially, this is just the single file I started with. This becomes many files as refactorings are applied. By the end there are 19 Rust files.
数据访问层的总代码行数。最初，这只是我开始时的那个单一文件。随着重构的进行，它变成了许多文件。到最后，共有 19 个 Rust 文件。

The lines of code in the single largest file in the data access layer. This started as the entirety of the data layer in the single initial file. By the end, the single largest file is a test library. Further refactoring passes could apply the same approach to this.
数据访问层中单个最大文件的代码行数。最初，这包含了整个数据层。到最后，最大的单个文件变成了一个测试库。进一步的重构可以对该文件应用相同的方法。

The total input tokens consumed by the sub-agent while applying the representative change. The total output tokens produced by the sub-agent while applying the representative change.
子代理在应用代表性变更时消耗的总输入 Token，以及子代理在应用代表性变更时产生的总输出 Token。

### Refactoring reduces token consumption
### 重构降低了 Token 消耗

The results are clear. Input tokens stay fairly flat until the largest file starts to fall, and then they drop before, in the words of Claude, falling off a cliff.
结果很明确。在最大文件开始缩减之前，输入 Token 的消耗量保持相对平稳；随后它们开始下降，用 Claude 的话来说，就是“跌落悬崖”。
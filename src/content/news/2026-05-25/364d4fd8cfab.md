---
title: "AI Makes Building Cheap. Our Product Architectures Still Assume It’s Expensive."
originalUrl: "https://dev.to/randror/ai-makes-building-cheap-our-product-architectures-still-assume-its-expensive-1n14"
date: "2026-05-24T22:23:51.415Z"
---

# AI Makes Building Cheap. Our Product Architectures Still Assume It’s Expensive.
# AI 让构建软件变得廉价，但我们的产品架构仍假设它很昂贵。

One of the strange things happening right now is that people can suddenly build surprisingly useful software with AI. Founders are building internal tools with Claude. PMs are prototyping workflows in a weekend. Small teams are generating working features faster than organizations can even review them.
目前正在发生一件奇怪的事情：人们突然能够利用 AI 构建出令人惊讶的实用软件。创始人正在用 Claude 构建内部工具；产品经理（PM）可以在一个周末内完成工作流原型设计；小团队生成可用功能的速度，甚至超过了组织审核它们的速度。

And it raises a very reasonable question: If useful software can now be built so quickly, why do mature product teams still move so slowly? Part of the answer is that large products are not isolated systems. In a small prototype, a feature mostly needs to work by itself. But in mature products, features need to safely coexist with everything already there: permissions, workflows, integrations, edge cases, monitoring, and operational constraints.
这引发了一个非常合理的问题：如果实用的软件现在可以如此快速地构建，为什么成熟的产品团队行动依然如此缓慢？部分答案在于，大型产品并非孤立的系统。在小型原型中，一个功能通常只需要自身能运行即可；但在成熟产品中，功能必须与现有的一切安全共存：权限、工作流、集成、边缘情况、监控以及运营约束。

And most importantly: features don’t only need to work individually. They need to work together. This is why complexity often feels closer to n² than to n. If you have 10 features, you are not only managing 10 features. You are also managing the interactions between them. That is where mature products become slow. Not because teams forgot how to build — but because every new thing has to safely coexist with everything already there. At some point, shipping software becomes less about building the feature itself — and more about safely integrating it into a living system.
最重要的是：功能不仅需要单独工作，还需要协同工作。这就是为什么复杂性往往更接近 n² 而非 n。如果你有 10 个功能，你管理的不仅仅是这 10 个功能，还要管理它们之间的交互。这就是成熟产品变慢的原因——不是因为团队忘记了如何构建，而是因为每一项新事物都必须与现有的一切安全共存。在某种程度上，交付软件不再仅仅是构建功能本身，更多的是将其安全地集成到一个动态系统中。

### Maybe We Need a Different Layer for Experimentation
### 也许我们需要一个不同的实验层

I’ve been wondering whether AI pushes us toward a different product architecture model. Not replacing the core product. But adding a safer experimentation layer around it. Tools like Base44, Lovable, and similar AI builders already demonstrate how fast isolated software creation can become. The problem is that mature products are not isolated environments. So maybe the opportunity is not turning entire products into vibe-coded systems — but creating safer modular layers where that speed becomes possible without destabilizing the core product itself.
我一直在思考，AI 是否正在推动我们走向一种不同的产品架构模型。不是取代核心产品，而是在其周围增加一个更安全的实验层。像 Base44、Lovable 以及类似的 AI 构建工具已经证明了孤立的软件创建可以有多快。问题在于，成熟产品并非孤立的环境。因此，机会或许不在于将整个产品变成“感觉编码”（vibe-coded）系统，而在于创建更安全的模块化层，在不破坏核心产品的前提下实现这种速度。

The goal is not rebuilding the entire system around AI-generated software. It’s creating safer boundaries for experimentation inside existing products. Imagine a product with stable foundations: authentication, permissions, APIs, shared design primitives, and strict operational boundaries. And on top of that, lightweight modular “boxes” that can be developed independently using AI. These boxes would remain operationally isolated, use restricted interfaces to existing services, mostly operate in readonly mode, and maintain their own isolated logic and storage.
目标不是围绕 AI 生成的软件重建整个系统，而是在现有产品内部为实验创建更安全的边界。想象一个拥有稳定基础的产品：身份验证、权限、API、共享设计原语和严格的运营边界。在此之上，是可以使用 AI 独立开发的轻量级模块化“盒子”。这些盒子在运营上保持孤立，通过受限接口访问现有服务，大多以只读模式运行，并维护其独立的逻辑和存储。

In many cases, each box could function as a small end-to-end product surface: its own UI, workflows, logic, and isolated data layer — connected to the core product through controlled interfaces. Users shouldn’t necessarily feel like they’re constantly moving between separate applications. The experience can still feel unified, even if the experimentation layer remains operationally isolated underneath.
在许多情况下，每个盒子都可以作为一个小型端到端的产品界面：拥有自己的 UI、工作流、逻辑和独立的数据层，并通过受控接口连接到核心产品。用户不一定会感到自己在不断地在不同的应用程序之间切换。即使底层的实验层在运营上是孤立的，用户体验依然可以保持统一。

The goal would not be perfect engineering. The goal was fast learning. In that stage, the mindset can also be different. You don’t always need to fully understand or perfect the internal implementation. You need to define the input, evaluate the output, and test it against enough realistic cases to know whether it actually creates value. If the experiment consistently works across real scenarios, maybe that is enough to keep learning. If it matures, then you can decide whether it deserves deeper engineering, stronger guarantees, and tighter integration into the core product.
目标不是完美的工程，而是快速学习。在这个阶段，思维方式也可以有所不同。你不必总是完全理解或完善内部实现。你需要定义输入、评估输出，并针对足够多的现实案例进行测试，以了解它是否真正创造了价值。如果实验在真实场景中持续有效，也许这就足以继续学习了。如果它成熟了，你再决定它是否值得进行更深入的工程化、更强的保障以及与核心产品更紧密的集成。

PMs, founders, or small teams could rapidly test workflows, internal tools, AI experiences, or customer-specific functionality without introducing major risk into the core product itself. And if an experiment fails? You remove the box. Minimal cleanup. Minimal blast radius. Minimal organizational overhead.
产品经理、创始人们或小团队可以快速测试工作流、内部工具、AI 体验或特定客户的功能，而不会给核心产品带来重大风险。如果实验失败了呢？移除那个盒子即可。清理工作极少，影响范围极小，组织开销极低。

### AI May Change What We Optimize For
### AI 可能会改变我们的优化目标

I think a lot of software organizations still operate under assumptions from a world where building was expensive. So naturally, we optimized for long-term maintainability, scalability, system quality, and centralized control. And those things still matter. But AI dramatically changes the cost of experimentation. Which means the bottleneck may shift somewhere else: learning speed, iteration speed, organizational flexibility, and safe experimentation.
我认为许多软件组织仍然在“构建成本高昂”的世界假设下运作。因此，我们自然而然地优化了长期可维护性、可扩展性、系统质量和集中控制。这些固然重要，但 AI 极大地改变了实验的成本。这意味着瓶颈可能会转移到其他地方：学习速度、迭代速度、组织灵活性和安全实验能力。

That doesn’t mean every company should suddenly let AI generate random production systems. There are still real problems to solve: governance, security, consistency, maintainability, observability, and architecture sprawl. But I do think many teams are underestimating how much product experimentation itself is about to change. Because maybe not every idea needs to become part of the core product immediately. Maybe products need safer ways to explore ideas before fully integrating them into the core product.
这并不意味着每家公司都应该突然让 AI 生成随意的生产系统。治理、安全、一致性、可维护性、可观测性和架构蔓延等问题依然需要解决。但我确实认为，许多团队低估了产品实验本身即将发生的变化。因为也许并非每个想法都需要立即成为核心产品的一部分。也许产品需要更安全的方式来探索想法，然后再将其完全集成到核心产品中。
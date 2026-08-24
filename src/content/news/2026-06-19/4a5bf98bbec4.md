---
title: "Demo Is Not the Product"
originalUrl: "https://dev.to/lavkeshdwivedi/demo-is-not-the-product-205d"
date: "2026-06-18T23:18:50.549Z"
---

# Demo Is Not the Product
# 演示不是产品

Originally published on lavkesh.com. I've watched it happen dozens of times and I've done it myself more than once. You pick a use case, connect it to a model, write a prompt, feed in some sample data, and it works. Not just works. It's impressive. You show it to stakeholders and the energy in the room is real. Someone says 'this is exactly what we needed.' Someone else asks how fast you can ship it.
本文最初发布于 lavkesh.com。我曾多次目睹这种情况发生，自己也经历过不止一次。你选择一个用例，将其连接到一个模型，编写一个提示词（prompt），输入一些样本数据，然后它就跑通了。不仅仅是跑通，效果还令人印象深刻。你向利益相关者展示它，房间里的气氛非常热烈。有人说：“这正是我们所需要的。”另一个人问你多久能上线。

Six months later, the team is rebuilding it from scratch. Not because the idea was wrong. Because the thing that made the demo work is not the same thing that makes a production system work, and nobody designed for the difference.
六个月后，团队不得不从零开始重构。不是因为想法错了，而是因为让演示成功的因素，与让生产系统成功的因素并不相同，而没有人为这种差异进行过设计。

The first thing that breaks is evaluation. In the demo, evaluation is the person running the demo. You look at the output, it looks right, you move on. In production, nobody is watching every output. You need automated evaluation, and you need to have designed for it from the start, which means you needed to define what 'good' looks like before you started building.
首先崩溃的是评估环节。在演示中，评估者就是演示者本人。你看一眼输出结果，觉得没问题，就继续下一步。但在生产环境中，没有人会盯着每一个输出。你需要自动化的评估，而且必须从一开始就为此进行设计，这意味着你在开始构建之前，就必须定义好什么是“好”的结果。

The second thing that breaks is the prompt. Prompts in demos are written to work on the examples you have. They have not been tested against the distribution of actual user inputs, which is always stranger and more varied than whatever you planned for. The first week of real usage surfaces things no demo could have predicted.
其次崩溃的是提示词。演示中的提示词是针对你手头的示例编写的。它们没有经过实际用户输入分布的测试，而真实输入总是比你预想的更奇怪、更多样。投入使用的第一周就会暴露出任何演示都无法预测的问题。

The third thing is cost. Demo tokens are free in the sense that you're not tracking them. Production tokens cost money, and the cost math often doesn't close at scale, especially if the original architecture was calling the model in ways that made sense for a demo but are genuinely wasteful in production.
第三点是成本。演示阶段的 Token 是“免费”的，因为你根本没在追踪它们。生产环境的 Token 是要花钱的，而且在大规模应用时，成本账往往算不过来，尤其是当最初的架构设计是为了演示方便，但在生产环境中却极其浪费时。

The fourth thing is the model itself. You built against whatever was current when you started. A newer model is out now. It's better, and you'd like to use it, except switching models means retesting everything because the same prompt produces different outputs across model versions.
第四点是模型本身。你是基于开始时的当前模型构建的。现在有了更新的模型，它更好，你想使用它，但切换模型意味着必须重新测试一切，因为同一个提示词在不同模型版本间会产生不同的输出。

The teams doing this well tend to share a few habits. They treat evaluation as infrastructure, not an afterthought. They build evals before they build features, which forces them to define success concretely rather than pointing at a demo and saying 'like this.'
那些做得好的团队通常有几个共同习惯。他们将评估视为基础设施，而不是事后补救。他们在构建功能之前先构建评估体系，这迫使他们具体地定义成功标准，而不是指着演示说“就像这样”。

They separate the model from the application logic. The model is a dependency. It has an interface. The rest of the application doesn't know or care which model is behind that interface, which means you can swap, update, and version the model without triggering a rewrite of everything around it.
他们将模型与应用逻辑分离。模型是一个依赖项，它拥有一个接口。应用程序的其他部分不需要知道也不关心接口背后是什么模型，这意味着你可以替换、更新和管理模型版本，而无需重写周围的所有代码。

They build cost monitoring in from the start, not as an audit mechanism but as a feedback loop that informs architectural decisions. Token usage is an engineering metric, not just a billing line item.
他们从一开始就内置了成本监控，不是作为审计机制，而是作为指导架构决策的反馈循环。Token 使用量是一个工程指标，而不仅仅是一个账单条目。

The demo is proof that the product is worth building. It is not the product. That distinction sounds pedantic right up until you're six months in, the team is exhausted, and the stakeholder who loved the demo is asking why it's taking so long.
演示证明了产品值得开发，但它本身并不是产品。这种区别听起来可能有些吹毛求疵，直到你做了六个月，团队精疲力竭，而当初喜欢演示的利益相关者开始质问为什么进度这么慢时，你才会真正明白。
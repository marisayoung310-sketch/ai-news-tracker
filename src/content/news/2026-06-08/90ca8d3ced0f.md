---
title: "I design with Claude more than Figma now"
originalUrl: "https://blog.janestreet.com/i-design-with-claude-code-more-than-figma-now-index/"
date: "2026-06-07T22:33:52.538Z"
---

# I design with Claude more than Figma now
# 我现在使用 Claude 设计的时间比 Figma 还多

Feb 05, 2026 | 5 min read
2026年2月5日 | 5分钟阅读

By: Edwin Morris
作者：Edwin Morris

For a long time I was skeptical of LLMs—whenever I reached for them I was disappointed by the results. Last year I tried Copilot and Cursor to tweak a game I’d built, and neither generated working changes. At a previous job I tried Gemini to outline product briefs and generate wireframes, but ended up throwing them all away. Every time I tried LLMs it was for something I was already good at, and they did a worse job than I would have.
长期以来，我对大语言模型（LLM）一直持怀疑态度——每当我尝试使用它们时，结果总是让我失望。去年，我尝试用 Copilot 和 Cursor 来调整我开发的一款游戏，但两者都没能生成可用的修改代码。在上一份工作中，我曾尝试用 Gemini 来撰写产品概要和生成线框图，但最终都因为效果不佳而弃之不用。每次我尝试使用 LLM 时，都是在做我本就擅长的事情，而它们表现得比我还要糟糕。

Having joined Jane Street this past summer, I’m finding AI support indispensable. There’s just so much that’s new to me, and so much I’m not good at yet, like OCaml and Bonsai. But one big surprise is how much it’s changed the thing I’m best at: my design workflow. Instead of laboring over spec docs, building Figma mockups, writing proposals, and reviewing the implementation with devs, I find myself building prototype features that just do the exact thing I have in mind.
去年夏天加入 Jane Street 后，我发现 AI 的辅助变得不可或缺。这里有太多对我而言全新的事物，也有太多我尚不擅长的领域，比如 OCaml 和 Bonsai。但让我感到意外的是，它极大地改变了我最擅长的领域：我的设计工作流。我不再需要费力撰写规格文档、制作 Figma 原型、编写提案并与开发人员反复核对实现细节，而是直接构建出能够实现我构想的原型功能。

What that looks like in practice is:
在实践中，流程如下：

* Write something describing the problem and my proposal
* 写下对问题和提案的描述
* Open my editor, start a build, the server, and Claude, using that description I wrote as the prompt
* 打开编辑器，启动构建、服务器和 Claude，并将我写下的描述作为提示词（Prompt）
* Get the basic functionality working to prove to myself that it’s possible
* 实现基本功能，向自己证明方案的可行性
* Iterate on that as much as I want
* 随心所欲地进行迭代
* Push changes to a development environment and ask users what they think
* 将更改推送到开发环境，并询问用户的反馈
* Submit a feature (our version of a pull request) that looks and behaves exactly the way I want
* 提交一个功能（我们版本的 Pull Request），其外观和行为完全符合我的预期

A prototype feature in the actual codebase has felt better in almost every way compared to mockups and docs. Take a prototype I made recently that added LLM prompting to a JSQL input (JSQL is an internal SQL dialect that we use for lots of different user-facing tools). This prototype really works, and I spent days living with it and testing it. Claude gave me free, unlimited iteration, unbothered when I changed my mind for the 50th time or asked for a small tweak.
相比于原型图和文档，在实际代码库中构建原型功能在各方面都感觉更好。以我最近制作的一个原型为例，它为 JSQL 输入框添加了 LLM 提示功能（JSQL 是我们用于多种面向用户工具的内部 SQL 方言）。这个原型确实有效，我花了几天时间使用并测试它。Claude 为我提供了免费且无限的迭代机会，即使我第 50 次改变主意或要求进行微调，它也从不抱怨。

I refined the Submit button, added keyboard shortcuts, tweaked copy, adjusted the prompt, and added generated confirmation messages. These are workflow improvements that would have taken days or weeks of engineering and design back-and-forth at my previous job, or more likely would just never have happened. All the effort spent on this feature went into improving the real artifact, and none on ancillary in-between work like creating Figma components or formatting docs.
我优化了“提交”按钮，添加了快捷键，调整了文案，修改了提示词，并增加了生成的确认消息。这些工作流的改进在我的上一份工作中可能需要数天甚至数周的工程与设计反复沟通，甚至很可能永远不会发生。投入到这个功能上的所有精力都用于改进最终产品本身，而没有浪费在创建 Figma 组件或格式化文档等辅助性工作上。

It took me a while to arrive at this workflow. When I joined last summer, I only approached smaller-sized tasks with AI, like UX papercut fixes. For bigger ideas I was still using Figma and docs, and when I tried making those things with Claude it failed. But in the past 2 months the situations where I’ve reached for Figma have fallen off a cliff.
我花了一段时间才摸索出这套工作流。去年夏天刚加入时，我只用 AI 处理一些小任务，比如修复 UX 细节问题。对于更大的构想，我仍然依赖 Figma 和文档，而当我尝试用 Claude 实现这些大构想时，往往以失败告终。但在过去两个月里，我使用 Figma 的频率断崖式下跌。

Through some combination of improved models, my own facility with them, and carefully choosing the right scope, AI is now working for big stuff too—not just the JSQL prompt but a half dozen other prototypes that make user-facing, data model, and library changes, including some that are 2000+ line diffs; I’m using it to implement interactive prototypes for brand new apps after designing them in Figma; and for some new apps I’m even skipping Figma entirely, iterating on the visual design from the beginning with Claude.
得益于模型能力的提升、我对其熟练度的增加，以及对任务范围的精准把控，AI 现在也能处理大型任务了——不仅是 JSQL 提示功能，还有其他六七个涉及面向用户界面、数据模型和库更改的原型，其中一些代码差异（diff）甚至超过 2000 行；我会在 Figma 设计完成后，用它来实现全新应用的交互原型；对于某些新应用，我甚至完全跳过了 Figma，直接从一开始就与 Claude 共同迭代视觉设计。

As a designer this has been empowering. Engineers have the ability to create working proofs of concept when they have an idea. Designers have to convince other people to do that for us. For an idea like “direct LLM prompting in the JSQL input” I’d be proposing something whose feasibility is not even clear at the outset; getting someone to build a prototype might waste their time. In other cases I might propose something that doesn’t clearly fill a user need. By using Claude to make these ideas real I’m making it a lot easier for others to evaluate them—they can just use it.
作为一名设计师，这赋予了我极大的自主权。工程师在有想法时，有能力创建可运行的概念验证（PoC），而设计师则必须说服别人来为我们做这件事。对于像“在 JSQL 输入框中直接进行 LLM 提示”这样的想法，我提出的方案在最初阶段可行性并不明确；找人去构建原型可能会浪费他们的时间。在其他情况下，我提出的方案可能无法清晰地满足用户需求。通过使用 Claude 将这些想法变为现实，我让其他人评估这些方案变得容易得多——他们可以直接上手使用。

But there’s a downside: in this workflow, the reviewer is given a fully baked feature. Does that mean they have zero input on the functionality and are just supposed to review the code? Review is not the most fun work—the equivalent in the design world would be getting a detailed wireframe from a PM and being asked to make it look good. I want to make my proposal as clearly and completely as possible, but I still want my engineering teammates to treat it the same way they’d treat a mockup in Figma, as something they and I can iterate on together in design-space.
但这也存在一个缺点：在这种工作流中，评审者拿到的是一个已经完全成型的功能。这是否意味着他们对功能本身没有任何发言权，只能负责审查代码？审查工作并不有趣——这在设计界相当于从产品经理那里拿到一份详细的线框图，然后被要求把它做得好看。我希望尽可能清晰、完整地呈现我的提案，但我仍然希望我的工程团队伙伴能像对待 Figma 原型图那样对待它，将其视为我们可以在设计空间中共同迭代的对象。

Our solution for now is just to think about these features differently. I write a short reminder in the description: prototypes are living proposal docs, the code is disposable, and a reviewer’s job is to give feedback about the design and user experience. Eventually, reviewers still take over the idea and implement it in a separate feature, referencing the prototype but owning the production code. In practice we’re still figuring out what makes sense and feels good with this new workflow.
我们目前的解决方案是换个角度看待这些功能。我在描述中写了一段简短的提醒：原型是动态的提案文档，代码是可抛弃的，评审者的工作是针对设计和用户体验提供反馈。最终，评审者会接手这个想法并在独立的功能中实现它，参考原型但负责生产环境的代码。在实践中，我们仍在探索这种新工作流中哪些部分是合理且舒适的。

There’s also a fear I have that designing with Claude keeps me out of a fluid, creative mindset and stuck in an iterative one, constrained to the outcomes I think Claude can produce. That’s fine for mature tools, where changes are iterative, but might mean I miss ideas when working on something new. This is a familiar tension. When I was getting started professionally in 2011 there was a lot of discourse about whether designers should code. Critics argued that once you’ve started programming you’re less likely to make big changes to an idea. But I liked making websites, and I liked programming, so I kept writing code.
我还有一个担忧：与 Claude 一起设计可能会让我脱离流畅的创造性思维，陷入迭代式思维，局限于我认为 Claude 能产出的结果。对于成熟的工具来说，这种迭代式的改变没问题，但在处理新事物时，这可能意味着我会错过一些灵感。这是一种熟悉的矛盾。2011 年我刚入行时，关于“设计师是否应该写代码”有过很多讨论。批评者认为，一旦开始编程，你就更难对想法做出重大改变。但我喜欢制作网站，也喜欢编程，所以我坚持写代码。

Then, when frontend frameworks like React became common and frontend development got more complicated, like others I decided to specialize. I still made personal projects in React—that certainly helped me interact with devs—but I spent almost all my time at work in Figma and docs. Had I joined Jane Street before LLMs, I think I would have become even more entrenched in Figma.
后来，当 React 等前端框架普及，前端开发变得更加复杂时，我也像其他人一样决定专注于设计。我仍然会用 React 做个人项目——这确实有助于我与开发人员沟通——但在工作中，我几乎所有的时间都花在 Figma 和文档上。如果我在 LLM 出现之前加入 Jane Street，我想我会更加深陷于 Figma 之中。
---
title: "Ask an AI expert: What exactly is the full stack?"
originalUrl: "https://blog.google/innovation-and-ai/technology/ai/full-stack-ai-explainer/"
date: "2026-06-29T22:37:15.241Z"
---

# Ask an AI expert: What exactly is the full stack?
# 咨询 AI 专家：究竟什么是“全栈”？

If you’ve spent any time lately reading about AI or using AI tools, you’ve probably heard about “full-stack” AI and app development. Our unique full-stack approach to AI lets us deliver powerful, cost-efficient products to expert developers and everyday users alike. But what exactly does it mean when a technology system is "full-stack”? We asked Google expert Richard Seroter, who leads developer experience at Google Cloud, to explain it — and why it enables Google to bring helpful AI to billions of people.

如果你最近花时间阅读过关于人工智能的内容或使用过 AI 工具，你可能已经听说过“全栈”AI 和应用开发。我们独特的全栈 AI 方法使我们能够为专业开发者和普通用户提供强大且经济高效的产品。但是，当一个技术系统被称为“全栈”时，它究竟意味着什么？我们请教了谷歌云开发者体验负责人、谷歌专家 Richard Seroter，请他进行解释，并说明为什么这种方法能让谷歌为数十亿人带来有益的 AI。

***

**First things first: What exactly do you do at Google?**
**首先，你在谷歌具体负责什么工作？**

I originally came to Google as a product manager, and I’ve been leading our developer relations and technical writing teams for about three years now. My team, now inclusive of product engineering for languages and frameworks along with our Open Source Programs Office, and I help software developers successfully build with Google Cloud products. We do a lot of different things, from building the programming languages and frameworks that developers use, to meeting directly with the community to share best practices, to running the technical writing team that crafts our documentation. Ultimately, our entire focus is on giving developers the confidence that they can get things done with Google products.

我最初是以产品经理的身份加入谷歌的，大约三年前开始领导我们的开发者关系和技术写作团队。我的团队现在还包括负责语言和框架的产品工程部门以及开源项目办公室。我们致力于帮助软件开发者利用谷歌云产品成功进行构建。我们做了很多不同的事情，从构建开发者使用的编程语言和框架，到直接与社区会面分享最佳实践，再到管理负责撰写文档的技术写作团队。归根结底，我们的核心目标是让开发者有信心利用谷歌产品完成他们的工作。

***

**Given our topic today, I would imagine that means you’re helping developers use our full-stack technology.**
**鉴于我们今天的主题，我想这意味着你正在帮助开发者使用我们的全栈技术。**

I am, yes!
是的，没错！

***

**Let’s define that term. Where does the phrase “full-stack” come from, and what does it mean when we’re talking about tech?**
**让我们来定义一下这个术语。 “全栈”这个词从何而来？在谈论技术时它又意味着什么？**

When the term "full-stack" originally came out in software development a decade or so ago, people were usually thinking about applications. Historically, building an app required multiple specialized teams: a front-end developer to build beautiful user interfaces, a back-end developer to handle server-side logic and a dedicated database team. The concept of a "full-stack engineer" emerged to describe a developer who could work across all of these functions independently. Instead of constantly handing off components from one person to another, a full-stack engineer could take an idea from a rough concept all the way to a fully running piece of software.

大约十年前，“全栈”一词在软件开发领域出现时，人们通常指的是应用程序。从历史上看，构建一个应用程序需要多个专业团队：负责构建精美用户界面的前端开发人员、处理服务器端逻辑的后端开发人员，以及专门的数据库团队。“全栈工程师”这一概念应运而生，用来描述那些能够独立跨越所有这些职能工作的开发者。全栈工程师无需不断地将组件从一个人转交给另一个人，而是可以将一个想法从粗略的概念一直推进到完全运行的软件。

***

**So it started with apps, and now it’s on to AI?**
**所以它始于应用程序，现在又应用到了 AI 上？**

Right. We’ve taken that exact same end-to-end principle and applied it to AI. If you’re trying to deliver value with AI, you can either buy a bunch of disparate parts from different vendors and try to stitch them together yourself, or you can look for an integrated system where everything you need is already connected.

没错。我们采用了完全相同的端到端原则，并将其应用于 AI。如果你想通过 AI 提供价值，你要么可以从不同的供应商那里购买一堆零散的部件并尝试自己拼凑，要么可以寻找一个集成的系统，其中你需要的一切都已经连接好了。

***

**What disparate parts can someone stitch together to make a full AI stack?**
**一个人可以拼凑哪些零散部件来构建一个完整的 AI 栈？**

An intentional AI stack needs a cohesive combination of layers to get a job done: compute infrastructure, an AI model, an orchestration platform and the user interfaces. At Google, we’ve deliberately invested in every single layer. We provide the hardware like Tensor Processing Units (TPUs), frontier models developed by Google DeepMind like the Gemini family of models, the Gemini Enterprise Agent Platform and the interfaces people use daily, like Maps and Gmail. We’ve essentially done the hunting for you and put all the necessary components right inside the box.

一个经过深思熟虑的 AI 栈需要各层之间紧密结合才能完成工作：计算基础设施、AI 模型、编排平台和用户界面。在谷歌，我们刻意投资了每一个层面。我们提供诸如张量处理单元 (TPU) 之类的硬件、由 Google DeepMind 开发的前沿模型（如 Gemini 模型系列）、Gemini 企业代理平台，以及人们日常使用的界面（如地图和 Gmail）。我们本质上已经为你完成了搜寻工作，并将所有必要的组件都打包在了一起。

***

**Did we know we wanted to have a full-stack approach way back when Google first started working on AI?**
**早在谷歌刚开始研究 AI 时，我们就知道我们要采用全栈方法吗？**

It was absolutely a deliberate, decades-long strategy. For instance, our bet on custom TPUs is already over 10 years old. We recognized early on that there’s massive value in owning our own supply chain and raw infrastructure when serving up the world's most important internet services. Owning that thread throughout the entire stack lets us deliver a level of service, performance and reliability that's very hard to achieve if you're at the mercy of multiple parties.

这绝对是一个经过深思熟虑、长达数十年的战略。例如，我们对定制 TPU 的投入已经超过 10 年了。我们很早就认识到，在提供全球最重要的互联网服务时，拥有自己的供应链和原始基础设施具有巨大的价值。掌控整个技术栈的脉络，使我们能够提供一种服务水平、性能和可靠性，而如果受制于多方，这是很难实现的。

***

**On the flip side, does adopting a full-stack platform limit builders in some way?**
**另一方面，采用全栈平台是否会在某种程度上限制开发者？**

That’s a very fair concern, but locking people in doesn't align with our ethos. No company does open source quite like Google; we regularly give away foundational technology and source code that the entire industry depends on. We like to describe our AI platform as "opinionated but extensible" and "batteries included” — meaning everything you need to build and run an application is ready to go out of the box. However, if you want to use another company’s AI model instead of Gemini, or hook up different software instead of Google Workspace, you can plug those right in. We want you to use our products every day based on the completeness of our platform, not because we forced you into a closed choice.

这是一个非常合理的担忧，但锁定用户并不符合我们的理念。没有哪家公司能像谷歌这样对待开源；我们经常免费提供整个行业所依赖的基础技术和源代码。我们喜欢将我们的 AI 平台描述为“有主见但可扩展”以及“内置电池”——这意味着构建和运行应用程序所需的一切都已开箱即用。然而，如果你想使用其他公司的 AI 模型而不是 Gemini，或者连接不同的软件而不是 Google Workspace，你可以直接插入使用。我们希望你因为我们平台的完整性而每天使用我们的产品，而不是因为我们强迫你做出封闭的选择。

***

**Besides simplicity, what are some other benefits to working with full-stack AI?**
**除了简单之外，使用全栈 AI 还有哪些其他好处？**

Because Google manages the entire stack — literally from running the underlying infrastructure all the way up to delivering Gmail — there's massive system reliability. If a technical failure happens at one layer, our ownership of the platform allows us to...

因为谷歌管理着整个技术栈——从运行底层基础设施一直到交付 Gmail——所以系统具有极高的可靠性。如果某一层发生技术故障，我们对平台的掌控权使我们能够……
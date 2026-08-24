---
title: "What happens when AI starts building itself?"
originalUrl: "https://techcrunch.com/2026/05/14/what-happens-when-ai-starts-building-itself/"
date: "2026-05-14T22:37:30.541Z"
---

# What happens when AI starts building itself?
# 当人工智能开始自我构建时，会发生什么？

Richard Socher has been a major figure in AI for some time, best known for founding the early chatbot startup You.com and, before that, his work on Imagenet. Now, he’s joining the current generation of research-focused AI startups with Recursive Superintelligence, a San Francisco-based startup that came out of stealth on Wednesday with $650 million in funding.
Richard Socher 在人工智能领域深耕已久，最为人熟知的是他创立了早期聊天机器人初创公司 You.com，在此之前，他还曾参与 Imagenet 的研究工作。如今，他加入了当前以研究为导向的人工智能初创公司浪潮，创立了位于旧金山的 Recursive Superintelligence。该公司于周三结束隐身状态，并获得了 6.5 亿美元的融资。

Socher is joined in the new venture by a cohort of prominent AI researchers, including Peter Norvig and Cresta co-founder Tim Shi. Together, they’re working to create a recursively self-improving AI model, one that can autonomously identify its own weaknesses and redesign itself to fix them, without human involvement — a long-held holy grail of contemporary AI research.
与 Socher 一同加入这家新公司的还有一批杰出的人工智能研究人员，包括 Peter Norvig 和 Cresta 的联合创始人 Tim Shi。他们正致力于打造一种递归式自我改进的人工智能模型，这种模型能够在无需人类干预的情况下，自主识别自身弱点并重新设计以进行修复——这长期以来被视为当代人工智能研究的“圣杯”。

I spoke with him on Zoom after the launch, digging into Recursive’s unique technical approach and why he doesn’t think of this new project as a neolab, the informal term for a new generation of AI startups that prioritize research over building products. This interview has been edited for length and clarity.
发布会后，我通过 Zoom 与他进行了交谈，深入探讨了 Recursive 独特的技术路径，以及为什么他并不认为这个新项目属于“新实验室”（neolab）——这是一个非正式术语，指代那些重研究轻产品的新一代人工智能初创公司。为简洁明了起见，本次采访内容经过了编辑。

We hear a lot about recursion these days! It feels like a very common goal across different labs. What do you see as your unique approach?
如今我们经常听到“递归”这个词！这似乎是各大实验室共同的目标。你认为你们独特的方法是什么？

Our unique approach is to use open-endedness to get to recursive self-improvement, which no one has yet achieved. It’s an elusive goal for a lot of people. A lot of people already assume it happens when you just do auto-research. You know, you can take AI and ask it to make some other thing better, which could be a machine learning system, or just a letter that you write, or, you know, whatever it might be, right? But that’s not recursive self-improvement. That’s just improvement.
我们独特的方法是利用“开放性”（open-endedness）来实现递归式自我改进，这是目前还没有人实现的目标。对许多人来说，这是一个难以捉摸的目标。很多人认为只要做“自动研究”就能实现这一点。你可以让 AI 去优化其他事物，比如一个机器学习系统，或者仅仅是你写的一封信，或者其他任何东西，对吧？但这并不是递归式自我改进，那仅仅是改进而已。

Our main focus, is to build truly recursive, self-improving superintelligence at scale, which means that the entire process of ideation, implementation and validation of research ideas would be automatic. First [it would automate] AI research ideas, eventually any kind of research ideas, even eventually in the physical domains. But it's particularly powerful when it's AI working on itself, and it's developing a new kind of sense of self awareness of its own shortcomings.
我们的核心重点是构建真正可扩展的、递归式的自我改进超级智能，这意味着研究构思、实施和验证的整个过程都将是自动化的。首先是自动化 AI 研究构思，最终扩展到任何类型的研究构思，甚至最终延伸到物理领域。但当 AI 作用于自身，并发展出一种对自身缺陷的自我意识时，这种能力尤为强大。

You used the term open-ended — does that have a specific technical meaning?
你提到了“开放性”这个词——它有特定的技术含义吗？

It does. In fact, Tim Rocktäschel, one of our cofounders, led the open-endedness and self-improvement teams at Google DeepMind and particularly worked on the world model Genie 3, which is a great example of open-endedness. You can tell it any concept, any world, any agent, and it just creates it, and it's interactive. In biological evolution, animals adapt to the environment, and then others counter-adapt to those adaptations. It's just a process that can evolve for billions of years, and interesting stuff keeps happening, right? That's how we developed eyes in our [heads].
确实有。事实上，我们的联合创始人之一 Tim Rocktäschel 曾领导 Google DeepMind 的开放性和自我改进团队，并特别参与了世界模型 Genie 3 的研发，这是开放性的一个绝佳例子。你可以告诉它任何概念、任何世界、任何智能体，它都能将其创造出来，并且是交互式的。在生物进化中，动物适应环境，然后其他物种针对这些适应进行反适应。这是一个可以持续进化数十亿年的过程，有趣的事情不断发生，对吧？我们头上的眼睛就是这样进化出来的。

Another example is rainbow teaming, from another paper from Tim. Have you heard of red teaming? In cybersecurity, it means-- So, red teaming also has to be done in an LLM context. Basically you try to get the LLM to tell you how to build a bomb, and you want to make sure that it doesn’t do it. Now, humans can sit there for a long time and come up with interesting examples of what the AI shouldn't say. But what if you tested this first AI with a second AI, and that second AI now has the task of making the first AI [try to] say all the possible bad things. And then they can go back and forth for millions of iterations. You can actually allow two AIs to co-evolve. One keeps attacking the other, and then comes up with not just one angle but many different angles, and hence the rainbow analogy. And then you can inoculate the first AI, and you become safer and safer. This was an idea from Tim Rocktaeschel, and it’s now used in all the major labs.
另一个例子是来自 Tim 另一篇论文中的“彩虹测试”（rainbow teaming）。你听说过“红队测试”（red teaming）吗？在网络安全中，这意味着……红队测试也必须在大型语言模型（LLM）的背景下进行。基本上，你试图让 LLM 告诉你如何制造炸弹，而你要确保它不会这样做。人类可以花很长时间坐在那里，想出各种 AI 不该说的有趣例子。但如果你用第二个 AI 来测试第一个 AI，而第二个 AI 的任务是让第一个 AI 尝试说出所有可能的坏话呢？然后它们可以进行数百万次的迭代。你实际上可以让两个 AI 共同进化。一个不断攻击另一个，不仅从一个角度，而是从许多不同的角度，这就是“彩虹”类比的由来。然后你可以为第一个 AI 接种疫苗，使其变得越来越安全。这是 Tim Rocktaeschel 的一个想法，现在已被所有主流实验室采用。

How do you know when it’s done?
你怎么知道它什么时候算完成了？

I suppose it’s never done. Some of these things will never be done. You can always get more intelligent. You can always get better at programming and math and so on. There are some bounds on intelligence; I’m actually trying to formalize those right now, but they’re astronomical. We’re very far away from those limits.
我想它永远不会完成。其中一些事情永远不会有终点。你总能变得更聪明。你总能在编程、数学等方面做得更好。智能是有一些界限的；我目前正试图将这些界限形式化，但它们是天文数字级别的。我们距离那些极限还非常遥远。

As a neolab, it feels like you’re supposed to be doing something that the major labs aren’t doing. So part of the implication here is that you don’t think the major labs are going to reach RSI [recursive self-improvement] by doing what they’re doing. Is that fair to say?
作为一家“新实验室”，感觉你们应该在做主流实验室没做的事情。所以这是否暗示你认为主流实验室通过目前的方式无法实现 RSI（递归式自我改进）？这样说公平吗？

I can’t really comment on what they’re doing, but I do think we’re approaching it differently. We really embrace the concept of open-endedness, and our team is entirely focused on that vision. And the team has been researching this and doing papers in this space for the last decade. And the team has a track record of really pushing the field forward significantly and shipping real products. You know, Tim Shi built Cresta into a unicorn. Josh Tobin was one of the first people at OpenAI and eventually led their Codex teams and the deep research teams. I actually sometimes struggle a little bit with this neolab category. I feel like we're not just a lab. I want us to be become a really viable company, to really have amazing products that people love to use, that have positive impact on humanity.
我无法评论他们正在做什么，但我确实认为我们的切入点不同。我们非常拥抱“开放性”这一概念，我们的团队完全专注于这一愿景。在过去十年里，团队一直在该领域进行研究并发表论文。而且团队有推动领域重大进步并交付实际产品的记录。你知道，Tim Shi 将 Cresta 打造成了一家独角兽公司。Josh Tobin 是 OpenAI 的首批员工之一，最终领导了他们的 Codex 团队和深度研究团队。实际上，我有时对“新实验室”这个分类感到有些困惑。我觉得我们不仅仅是一个实验室。我希望我们能成为一家真正可行的公司，拥有人们乐于使用、并对人类产生积极影响的卓越产品。

So when do you plan to ship your first product?
那么，你们计划什么时候发布第一款产品？

I’ve thought about that a lot. The team has made so much progress, we may actually pull up the timelines from what we had initially assumed. But yes, there will be products, and you’ll have to wait quarters, not years.
我考虑过很多次。团队已经取得了巨大的进展，我们可能会提前最初设定的时间表。但可以肯定的是，会有产品问世，你只需要等待几个季度，而不是几年。

One of the ideas around recursive self-improvement is that, once we have this sort of system, compute becomes the only important resource. The faster you run the system, the faster it will improve, and there’s no outside human activity that will really make a difference. So the race just becomes, how much processing power can we throw at this? Do you think that’s the world we’re headed toward?
关于递归式自我改进的一个观点是，一旦我们拥有了这样的系统，算力就成了唯一重要的资源。系统运行得越快，改进得就越快，外部的人类活动将不再产生实质性影响。所以竞争就变成了：我们能投入多少处理能力？你认为我们正在走向那样的世界吗？

Compute is not to be underestimated. I think in the future, a really important question will be: how much compute does humanity want to spend to solve...
算力不容小觑。我认为在未来，一个非常重要的问题将是：人类愿意投入多少算力来解决……
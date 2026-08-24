---
title: "A startup claims it broke through a bottleneck that’s holding back LLMs"
originalUrl: "https://www.technologyreview.com/2026/06/19/1139313/a-startup-claims-it-broke-through-a-bottleneck-thats-holding-back-llms/"
date: "2026-06-19T22:18:33.185Z"
---

# A startup claims it broke through a bottleneck that’s holding back LLMs
# 一家初创公司声称突破了阻碍大语言模型发展的瓶颈

**EXECUTIVE SUMMARY**
**执行摘要**

Miami-based AI startup Subquadratic came out of stealth mode last month with a huge claim. It announced that it had solved a mathematical bottleneck that had been holding back large language models for almost a decade. The details were thin, and many people were unconvinced. But Subquadratic has started to bring the receipts, sharing the results of an independent evaluation of its new tech. The results suggest that the company’s claims might be worth paying attention to.
总部位于迈阿密的人工智能初创公司 Subquadratic 上个月结束了隐身状态，并提出了一个惊人的主张。该公司宣布，他们已经解决了一个困扰大语言模型（LLM）近十年的数学瓶颈。起初，相关细节非常匮乏，许多人对此持怀疑态度。但 Subquadratic 已经开始拿出证据，分享了对其新技术进行独立评估的结果。这些结果表明，该公司的说法或许值得关注。

According to Subquadratic, it has developed a new kind of LLM, called SubQ, that is faster and cheaper and uses a lot less energy than any other model on the market. The company also claims that SubQ is able to process up to 12 times as much text at once than most other models, allowing it to carry out a range of data-heavy tasks, such as analyzing hundreds of documents or entire code bases. What’s more, Subquadratic says, SubQ does this while more or less matching the performance of the best models put out by Google DeepMind, OpenAI, and Anthropic on key tasks like coding.
据 Subquadratic 称，他们开发了一种名为 SubQ 的新型大语言模型，其速度更快、成本更低，且能耗远低于市场上任何其他模型。该公司还声称，SubQ 一次性处理文本的能力是大多数其他模型的 12 倍，这使其能够执行一系列数据密集型任务，例如分析数百份文档或整个代码库。此外，Subquadratic 表示，SubQ 在实现这些功能的同时，在编程等关键任务上的表现几乎可以媲美 Google DeepMind、OpenAI 和 Anthropic 推出的顶级模型。

The problem was that the company at first provided little evidence for its claims beyond a handful of self-published test scores. And it has yet to make SubQ widely available for people to try out themselves. So it’s no surprise that Subquadratic’s claims were met with skepticism. Dan McAteer, an artificial intelligence engineer, captured the overall response on X: “SubQ is either the biggest breakthrough since the Transformer ... or it’s AI Theranos.”
问题在于，该公司起初除了少量自行发布的测试分数外，几乎没有提供其他证据来支持其主张。而且，它尚未向公众广泛开放 SubQ 以供亲自试用。因此，Subquadratic 的说法遭到质疑也就不足为奇了。人工智能工程师 Dan McAteer 在 X 上总结了大众的普遍反应：“SubQ 要么是自 Transformer 以来最大的突破……要么就是 AI 界的 Theranos（骗局）。”

A month on, the company has published more information about its model, including the results of additional independent tests run by third-party firm Appen. “We expected healthy skepticism,” says Subquadratic cofounder and chief technology officer Alex Whedon. “In hindsight, releasing the third-party benchmarks alongside the initial announcement would have preempted much of the skepticism, which is why we’re taking the time to make sure any future results are fully verified before putting them out.”
一个月过去了，该公司发布了更多关于其模型的信息，包括由第三方公司 Appen 进行的额外独立测试结果。“我们预料到了这种合理的怀疑，”Subquadratic 联合创始人兼首席技术官 Alex Whedon 表示，“事后看来，如果在最初发布时就公布第三方基准测试结果，本可以避免大部分质疑。这就是为什么我们现在花时间确保未来的任何结果在发布前都经过充分验证。”

Subquadratic asked Appen, which evaluates other companies’ models, to run its tests on SubQ. The results seem to back up a lot of Subquadratic’s claims. “That was really exciting to me, it validated their architecture,” says Jeanine Sinanan-Singh, Appen’s director of generative AI research. “I was like, ‘Wow, this could be a game changer,’ because models struggle with speed and inefficiency,” she adds. “But when you have kind of shocking results, it’s really not as credible when you say it yourself.”
Subquadratic 委托专门评估其他公司模型的 Appen 对 SubQ 进行了测试。结果似乎证实了 Subquadratic 的许多说法。“这让我感到非常兴奋，它验证了他们的架构，”Appen 生成式 AI 研究总监 Jeanine Sinanan-Singh 说。“我当时想，‘哇，这可能会改变游戏规则’，因为模型一直受困于速度和效率问题，”她补充道，“但当你拿出这种令人震惊的结果时，如果只是自卖自夸，可信度确实不高。”

SubQ won’t replace existing top models across the board, but it could offer huge increases in speed at a fraction of the typical cost for certain tasks. Subquadratic insists that in the long run, though, its breakthrough could change how LLMs are built. “We hope we’re kicking off a new age of efficiency,” says Justin Dangel, the firm’s cofounder and CEO. “We don’t think anybody will be building on transformers in a few years.”
SubQ 不会全面取代现有的顶级模型，但在执行特定任务时，它可以在极低成本下大幅提升速度。不过，Subquadratic 坚称，从长远来看，他们的突破可能会改变大语言模型的构建方式。“我们希望开启一个效率至上的新时代，”该公司联合创始人兼首席执行官 Justin Dangel 表示，“我们认为几年后，没人会再基于 Transformer 架构进行构建了。”

**Attention!**
**注意！**

To understand why Subquadratic’s claims are a big deal, let’s dig into how most LLMs work. The key mechanism inside an LLM is a type of neural network called a transformer, which runs a process known as dense attention. Today’s LLMs typically chain together multiple transformers. (The foundational paper of the LLM era, published by researchers at Google in 2017, was titled “Attention Is All You Need.”)
要理解为什么 Subquadratic 的主张意义重大，我们需要深入了解大多数大语言模型的工作原理。大语言模型内部的核心机制是一种称为 Transformer 的神经网络，它运行着一种被称为“密集注意力”（dense attention）的过程。如今的大语言模型通常将多个 Transformer 串联在一起。（大语言模型时代的奠基性论文由谷歌研究人员于 2017 年发表，标题为《注意力就是你所需要的一切》。）

Dense attention works like this: When a transformer processes a chunk of text, it first encodes each word (or part of a word, known as a token) with a number. To capture the meaning of the full text, it then multiplies each of those numbers with every other number for that text. For example, a piece of text 10,000 words long would kick off almost 50 million individual multiplications. That’s a lot of computation and the main reason that LLMs are notorious power hogs.
密集注意力的工作方式如下：当 Transformer 处理一段文本时，它首先用数字对每个单词（或单词的一部分，称为 token）进行编码。为了捕捉全文的含义，它随后会将这些数字中的每一个与该文本中的所有其他数字相乘。例如，一段 10,000 字的文本会引发近 5,000 万次独立的乘法运算。这是巨大的计算量，也是大语言模型以“耗电大户”著称的主要原因。

“If you want to summarize The Great Gatsby, you have to look at the first word and the last word together, and then you have to look at every other combination,” says Dangel. As the length of the text increases, the number of computations skyrockets. That’s because each additional number must be multiplied by all other previous numbers. Double the number of words, and you roughly quadruple the number of computations, a rate of increase known as a quadratic expansion.
“如果你想总结《了不起的盖茨比》，你必须同时查看第一个词和最后一个词，然后还要查看所有其他的组合，”Dangel 说。随着文本长度的增加，计算量会呈指数级飙升。这是因为每一个新增的数字都必须与之前所有的数字相乘。单词数量翻倍，计算量大约会增加到原来的四倍，这种增长率被称为“二次方扩展”（quadratic expansion）。

(You can picture this yourself: Draw a circle and mark dots around its edge. Each dot is a token. Then draw lines between pairs of dots to represent the multiplication of those two tokens. A circle with five dots will have 10 lines crossing it. Make it 10 dots and you will have 45 lines, 20 dots and you will have 190 lines, and so on.)
（你可以这样想象：画一个圆，在圆周上标记点。每个点代表一个 token。然后在每两个点之间画线，代表这两个 token 的乘法运算。一个有 5 个点的圆会有 10 条连线。如果是 10 个点，就会有 45 条线；20 个点则会有 190 条线，以此类推。）

**Slashing costs**
**削减成本**

Subquadratic’s solution is to ditch dense attention, the core operation of a transformer, in favor of what’s known as sparse attention, which slashes the number of computations needed. Instead of multiplying the number assigned to each token by every other number, sparse attention selects just some of the numbers to multiply. The idea is that not all relationships between words in a piece of text matter.
Subquadratic 的解决方案是放弃 Transformer 的核心操作——密集注意力，转而采用所谓的“稀疏注意力”（sparse attention），从而大幅减少所需的计算量。稀疏注意力不再将分配给每个 token 的数字与所有其他数字相乘，而是仅选择部分数字进行相乘。其核心理念是：文本中并非所有单词之间的关系都同等重要。

“Sparse attention says not all of those relationships are important, because they’re not,” says Whedon. “If you’re reading a book, you’re not going to look at the first and second words, first and third—that’s insane.” It’s a simple approach, and Subquadratic is not the first to try it. “Pretty much everything under the sun has been attempted,” says Will Depue, an independent AI researcher who previously worked at OpenAI. “It’s not impossible, but it’s akin to running a four-minute mile.”
“稀疏注意力认为并非所有关系都重要，事实也确实如此，”Whedon 说，“如果你在读书，你不会去关注第一个词和第二个词、第一个词和第三个词之间的关系——那太疯狂了。”这是一种简单的方法，Subquadratic 并不是第一个尝试的人。“几乎所有能想到的方法都被尝试过了，”曾在 OpenAI 工作过的独立 AI 研究员 Will Depue 说，“这并非不可能，但就像跑进四分钟一英里一样困难。”

Previous techniques for selecting which numbers to multiply and which to ignore have not produced a mechanism that can capture the meaning of a document as well as dense attention can. Subquadratic claims to have cracked the problem at last. It pitches SubQ as the first sparse-attention LLM that rivals mainstream dense-attention models in performance. “Historically, most mechanisms have used fixed patterns,”
此前用于选择哪些数字相乘、哪些数字忽略的技术，都未能产生一种能像密集注意力那样精准捕捉文档含义的机制。Subquadratic 声称终于攻克了这一难题。他们将 SubQ 推崇为首个在性能上可与主流密集注意力模型相媲美的大语言模型。“从历史上看，大多数机制都使用了固定的模式，”
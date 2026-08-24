---
title: "The only AI glossary you’ll need this year"
originalUrl: "https://techcrunch.com/2026/07/03/artificial-intelligence-definition-glossary-hallucinations-guide-to-common-ai-terms/"
date: "2026-07-03T22:28:50.170Z"
---

# The only AI glossary you’ll need this year
# 今年你唯一需要的 AI 术语表

Artificial intelligence is rewriting the world, and simultaneously inventing a whole new language to describe how it’s doing it. Sit in on any product meeting, pitch, or panel these days, and you’ll hear people toss around LLMs, RAG, RLHF, and a dozen other terms that can make even very smart people in the tech world feel a little insecure. This glossary is our attempt to fix that: plain-English definitions of the AI terms you’re most likely to actually run into, whether you’re building with this stuff, investing in it, or just trying to keep up by reading TechCrunch or listening to related podcasts. We update it regularly as the field evolves, so consider it a living document, much like the AI systems it describes.

人工智能正在重塑世界，同时也发明了一套全新的语言来描述这一过程。如今，参加任何产品会议、推介会或小组讨论，你都会听到人们频繁使用 LLM（大语言模型）、RAG（检索增强生成）、RLHF（人类反馈强化学习）以及其他十几个术语，这些术语甚至会让科技界非常聪明的人感到一丝不安。这份术语表是我们试图解决这一问题的尝试：用通俗易懂的英语解释你最可能遇到的 AI 术语，无论你是正在开发相关产品、进行投资，还是仅仅通过阅读 TechCrunch 或收听相关播客来跟上时代。随着该领域的不断发展，我们会定期更新这份术语表，因此请将其视为一份动态文档，就像它所描述的 AI 系统一样。

### AGI
Artificial general intelligence, or AGI, is a nebulous term. But it generally refers to AI that’s more capable than the average human at many, if not most, tasks. OpenAI CEO Sam Altman once described AGI as the “equivalent of a median human that you could hire as a co-worker.” Meanwhile, OpenAI’s charter defines AGI as “highly autonomous systems that outperform humans at most economically valuable work.” Google DeepMind’s understanding differs slightly from these two definitions; the lab views AGI as “AI that’s at least as capable as humans at most cognitive tasks.” Confused? Not to worry — so are experts at the forefront of AI research.

### 通用人工智能 (AGI)
通用人工智能（Artificial General Intelligence，简称 AGI）是一个模糊的术语。但它通常指在许多（如果不是大多数）任务上比普通人类更有能力的 AI。OpenAI 首席执行官 Sam Altman 曾将 AGI 描述为“相当于你可以雇佣作为同事的普通人类”。与此同时，OpenAI 的章程将 AGI 定义为“在大多数具有经济价值的工作中表现优于人类的高度自主系统”。Google DeepMind 的理解与上述两个定义略有不同；该实验室将 AGI 视为“在大多数认知任务上至少与人类一样有能力的 AI”。感到困惑？别担心，处于 AI 研究前沿的专家们也同样困惑。

### AI agent
An AI agent refers to a tool that uses AI technologies to perform a series of tasks on your behalf — beyond what a more basic AI chatbot could do — such as filing expenses, booking tickets or a table at a restaurant, or even writing and maintaining code. However, as we’ve explained before, there are lots of moving pieces in this emergent space, so “AI agent” might mean different things to different people. Infrastructure is also still being built out to deliver on its envisaged capabilities. But the basic concept implies an autonomous system that may draw on multiple AI systems to carry out multistep tasks.

### AI 智能体 (AI agent)
AI 智能体是指一种利用 AI 技术代表你执行一系列任务的工具——其能力超出了基础 AI 聊天机器人的范畴——例如报销费用、预订票务或餐厅座位，甚至编写和维护代码。然而，正如我们之前解释过的，这个新兴领域中有很多变数，因此“AI 智能体”对不同的人可能意味着不同的含义。为了实现其预期的能力，相关基础设施仍在建设中。但其基本概念是指一个自主系统，它可能会调用多个 AI 系统来执行多步骤任务。

### API endpoints
Think of API endpoints as “buttons” on the back of a piece of software that other programs can press to make it do things. Developers use these interfaces to build integrations — for example, allowing one application to pull data from another, or enabling an AI agent to control third-party services directly without a human manually operating each interface. Most smart home devices and connected platforms have these hidden buttons available, even if ordinary users never see or interact with them. As AI agents grow more capable, they are increasingly able to find and use these endpoints on their own, opening up powerful — and sometimes unexpected — possibilities for automation.

### API 端点 (API endpoints)
可以将 API 端点想象成软件背后的“按钮”，其他程序可以通过按下这些按钮来让软件执行操作。开发人员使用这些接口来构建集成——例如，允许一个应用程序从另一个应用程序提取数据，或者使 AI 智能体能够在无需人工手动操作每个接口的情况下直接控制第三方服务。大多数智能家居设备和互联平台都具备这些隐藏的按钮，即使普通用户从未看到或与之交互。随着 AI 智能体变得越来越强大，它们正越来越多地能够自行发现并使用这些端点，从而为自动化开启了强大且有时出人意料的可能性。

### Chain of thought
Given a simple question, a human brain can answer without even thinking too much about it — things like “which animal is taller, a giraffe or a cat?” But in many cases, you often need a pen and paper to come up with the right answer because there are intermediary steps. For instance, if a farmer has chickens and cows, and together they have 40 heads and 120 legs, you might need to write down a simple equation to come up with the answer (20 chickens and 20 cows). In an AI context, chain-of-thought reasoning for large language models means breaking down a problem into smaller, intermediate steps to improve the quality of the end result. It usually takes longer to get an answer, but the answer is more likely to be correct, especially in a logic or coding context. Reasoning models are developed from traditional large language models and optimized for chain-of-thought thinking thanks to reinforcement learning. (See: Large language model)

### 思维链 (Chain of thought)
面对一个简单的问题，人类大脑无需过多思考就能回答——比如“长颈鹿和猫哪个更高？”但在许多情况下，你通常需要纸笔才能得出正确答案，因为这涉及中间步骤。例如，如果一个农场主有鸡和牛，总共有 40 个头和 120 条腿，你可能需要写下一个简单的方程来得出答案（20 只鸡和 20 头牛）。在 AI 语境下，大语言模型的“思维链推理”意味着将问题分解为更小的中间步骤，以提高最终结果的质量。这通常需要更长的时间来获得答案，但答案更有可能是正确的，特别是在逻辑或编码语境中。推理模型是在传统大语言模型的基础上开发的，并通过强化学习针对思维链思考进行了优化。（参见：大语言模型）

### Coding agents
This is a more specific concept that an “AI agent,” which means a program that can take actions on its own, step by step, to complete a goal. A coding agent is a specialized version applied to software development. Rather than simply suggesting code for a human to review and paste in, a coding agent can write, test, and debug code autonomously, handling the kind of iterative, trial-and-error work that typically consumes a developer’s day. These agents can operate across entire codebases, spotting bugs, running tests, and pushing fixes with minimal human oversight. Think of it like hiring a very fast intern who never sleeps and never loses focus — though, as with any intern, a human still needs to review the work.

### 编程智能体 (Coding agents)
这是一个比“AI 智能体”更具体的概念，指能够自主地一步步采取行动以完成目标的程序。编程智能体是应用于软件开发的专业版本。编程智能体不仅仅是建议代码供人类审查和粘贴，它还可以自主编写、测试和调试代码，处理那些通常占用开发人员一天时间的迭代式、试错性工作。这些智能体可以在整个代码库中运行，发现错误、运行测试并推送修复，且只需极少的人工监督。可以把它想象成雇佣了一个从不睡觉、从不走神的超级实习生——当然，和任何实习生一样，人类仍然需要审查其工作成果。

### Compute
Although somewhat of a multivalent term, compute generally refers to the vital computational power that allows AI models to operate. This type of processing fuels the AI industry, giving it the ability to train and deploy its powerful models. The term is often a shorthand for the kinds of hardware that provides the computational power — things like GPUs, CPUs, TPUs, and other forms of infrastructure that form the bedrock of the modern AI industry.

### 算力 (Compute)
虽然这是一个多义词，但“算力”通常指使 AI 模型能够运行的关键计算能力。这种处理能力推动了 AI 行业的发展，使其能够训练和部署强大的模型。该术语通常是提供计算能力的硬件的简称——例如 GPU、CPU、TPU 以及构成现代 AI 行业基石的其他形式的基础设施。

### Deep learning
A subset of self-improving machine learning in which AI algorithms are designed with a multi-layered, artificial neural network (ANN) structure. This allows them to make more complex correlations compared to simpler machine learning-based systems, such as linear models or decision trees. The structure of deep learning algorithms draws inspiration from the interconnected pathways of neurons in the human brain. Deep learning AI models are able to identify important characteristics in data themselves, rather than requiring human engineers to define these features. The structure also supports algorithms that can learn from errors and, through a process of repetition and adjustment, improve their own outputs. However, deep learning systems require a lot of data points to yield good results (millions or more). They also typically take longer to train compared to simpler machine learning algorithms — so development costs tend to be higher. (See: Neural network)

### 深度学习 (Deep learning)
这是机器学习的一个子集，其 AI 算法被设计为具有多层人工神经网络（ANN）结构。与线性模型或决策树等更简单的机器学习系统相比，这使它们能够建立更复杂的关联。深度学习算法的结构灵感来源于人脑中神经元的互联路径。深度学习 AI 模型能够自行识别数据中的重要特征，而无需人类工程师定义这些特征。该结构还支持算法从错误中学习，并通过重复和调整的过程改进自身的输出。然而，深度学习系统需要大量数据点（百万级或更多）才能产生良好的结果。与简单的机器学习算法相比，它们的训练时间通常也更长，因此开发成本往往更高。（参见：神经网络）

### Diffusion
Diffusion is the tech at the heart of many art-, music-, and text-generating AI models. Inspired by physics, diffusion systems slowly “destroy” the...

### 扩散模型 (Diffusion)
扩散模型是许多艺术、音乐和文本生成 AI 模型的核心技术。受物理学启发，扩散系统会缓慢地“破坏”……
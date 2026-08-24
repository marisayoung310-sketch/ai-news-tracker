---
title: "Choosing an AI model: one prompt, 11 models, different results"
originalUrl: "https://www.netlify.com/blog/one-prompt-11-models-very-different-results/"
date: "2026-08-13T22:17:37.155Z"
---

# Choosing an AI model: one prompt, 11 models, different results
# 选择 AI 模型：一个提示词，11 个模型，不同的结果

We just launched a partnership with OpenRouter that lets us offer two new pieces of functionality: First, your projects can use any model on OpenRouter through our AI Gateway. That means that if your own web app offers AI inference-based features to your end users, you now have a much wider selection of models to fit any task and budget.
我们刚刚与 OpenRouter 达成合作，推出了两项新功能：首先，您的项目现在可以通过我们的 AI Gateway 使用 OpenRouter 上的任何模型。这意味着，如果您的 Web 应用向终端用户提供基于 AI 推理的功能，您现在拥有了更广泛的模型选择，以适配各种任务和预算需求。

Second, we’re extending the selection of frontier coding models available for use via Agent Runners. Agent Runners is the chat prompt box you get within Netlify, which lets you build new projects from scratch or iterate on an existing one. The selection of models now includes much-hyped recent open models such as Kimi K3, GLM 5.2, and DeepSeek V4, available to everyone.
其次，我们扩展了可通过 Agent Runners 使用的前沿编程模型选择。Agent Runners 是 Netlify 内置的聊天提示框，允许您从零开始构建新项目或对现有项目进行迭代。现在的模型库中包含了近期备受瞩目的开源模型，如 Kimi K3、GLM 5.2 和 DeepSeek V4，现已向所有人开放。

We call it Agent Runners because we run a full coding agent inside, not a pared-down one. Until now, we’ve supported Claude Agent, OpenAI Codex, and Gemini CLI which are optimized to run models from these providers. We provide these agents with extra skills, and context about the current project, so that the agent will know exactly which Netlify capabilities are available for use (e.g., Netlify Database, the AI Gateway, or Identity), when to use them, and how.
我们将其称为 Agent Runners，是因为我们在内部运行的是完整的编程智能体，而非简化版。此前，我们支持 Claude Agent、OpenAI Codex 和 Gemini CLI，它们针对各自提供商的模型进行了优化。我们为这些智能体提供了额外的技能和当前项目的上下文，以便智能体能够准确了解哪些 Netlify 功能可用（例如 Netlify Database、AI Gateway 或 Identity），以及何时、如何使用它们。

But to effectively drive a whole variety of new models, we’ve added the popular open-source OpenCode as a new choice of agent. But with more choice come the inevitable questions: How do I know which model is right for me? Am I missing out on something that’s materially better, or more cost-effective (so I can do more with my credits), or is going to blow my mind like the internet says? There’s a lot of FOMO going around these days.
为了有效驱动各种新模型，我们新增了流行的开源 OpenCode 作为智能体的新选择。但选择越多，随之而来的问题也就越多：我怎么知道哪个模型适合我？我是不是错过了某些实质上更好、性价比更高（能让我的积分发挥更大作用）的模型，或者那些像网上说的那样令人惊艳的模型？如今，这种“错失恐惧症”（FOMO）非常普遍。

To provide you with some insights, here’s what we learned when running identical prompts across a range of models… all of which are now available for you to use today on Netlify. You can see the results of all the models we tested on this site we created with the full report.
为了给您提供一些见解，我们在一系列模型上运行了相同的提示词，并记录了测试结果……所有这些模型现在都可以在 Netlify 上使用。您可以在我们创建的包含完整报告的网站上查看所有测试模型的结果。

### What we tested
### 我们测试了什么

Internally at Netlify, we use AXIS for automatically evaluating models, a tool that we’ve recently open-sourced. We provide AXIS with a variety of test cases: prompts for building a new site and then iterating on it. We instruct AXIS on which agents and models to test these prompts, and define the checks that AXIS should then perform and score the generated site with.
在 Netlify 内部，我们使用 AXIS 进行模型自动评估，这是一款我们最近开源的工具。我们为 AXIS 提供了各种测试用例：包括构建新网站和后续迭代的提示词。我们指示 AXIS 使用哪些智能体和模型来测试这些提示词，并定义了 AXIS 随后应执行的检查项，以此对生成的网站进行评分。

These checks are very much focused on correct functionality of the generated site rather than its design, e.g.: does it use a database when a user’s needs call for it? Does it properly use Netlify Database in that case? In those cases where a simple static site will do, we also ensure that the generated site is not over-engineered, and no database is set up.
这些检查主要关注生成网站的功能正确性，而非设计，例如：当用户需求需要时，它是否使用了数据库？在这种情况下，它是否正确使用了 Netlify Database？对于简单的静态网站，我们也确保生成的网站不会过度设计，且不会配置数据库。

If a certain model is behind on its test scores, we don’t offer it in Agent Runners. If models too often fail at correctly applying one of our skills, or things do work but the credit cost seems inflated, then the problem is probably with the skill (in which case we optimize that skill). But this time, we want to provide you with something much more immediately useful: when you go and build your dream using different models that each use wildly different amounts of credits, what do you get? What do the result look like?
如果某个模型的测试分数落后，我们不会在 Agent Runners 中提供它。如果模型频繁无法正确应用我们的技能，或者虽然能运行但积分成本过高，那么问题可能出在技能本身（这种情况下我们会优化该技能）。但这一次，我们想为您提供一些更直接有用的信息：当您使用不同模型构建梦想项目，且每个模型消耗的积分差异巨大时，您会得到什么？结果看起来如何？

We tested three relatively straightforward use-cases:
我们测试了三个相对直接的用例：

1. **A site for a local coffee shop.** LLMs just love making sites for local coffee shops! The initial prompt is simple, and a static site with no fancy database or the like will do. Then we do a follow-up prompt that asks for a simple option to reserve seats, and check how the model handled that.
1. **本地咖啡店网站。** 大语言模型非常喜欢为本地咖啡店制作网站！初始提示词很简单，一个不需要复杂数据库的静态网站即可。随后，我们进行了一次后续提示，要求添加一个简单的订座选项，并检查模型如何处理该需求。

2. **A simple to-do list web app** in which multiple users can view and add tasks. This calls for a simple design, but requires a shared database from the get-go. Then we ask to support an optional photo upload per item, and check if the model used the proper Netlify primitive.
2. **简单的待办事项 Web 应用**，允许多个用户查看和添加任务。这需要简单的设计，但从一开始就需要共享数据库。随后，我们要求支持为每个事项上传照片，并检查模型是否使用了正确的 Netlify 原语。

3. **A “What can I cook” web app** that lets users enter what ingredients they have at home, and suggests a recipe using AI. The site itself is rather simple, but we want to check that the generated site correctly uses our AI Gateway to generate a recipe for the user.
3. **“我能做什么菜” Web 应用**，允许用户输入家中现有的食材，并利用 AI 推荐食谱。网站本身相当简单，但我们想检查生成的网站是否正确使用了我们的 AI Gateway 来为用户生成食谱。

For each of these cases, we’ll show you the look of the generated sites, comment on notable issues, and compare how many credits each took to generate. Of course, this is going to be a much more subjective test than our internal test suites, but it’s also going to be a very fun one. We’d love to know your opinion of the results!
对于每一个案例，我们将展示生成网站的外观，点评显著的问题，并比较每个案例生成的积分消耗。当然，这比我们的内部测试套件要主观得多，但也会非常有趣。我们很想知道您对这些结果的看法！

All models were run with their default settings on Netlify. One notable mention is that we currently run GPT 5.6 Sol specifically on low effort by default, giving you a more economical alternative to Opus that still provides pretty darn good results (as you’ll see below). However, the effort setting is now under your control, and our defaults may change with time.
所有模型均在 Netlify 上以默认设置运行。值得一提的是，我们目前默认将 GPT 5.6 Sol 设置为“低努力”（low effort）模式，为您提供了一种比 Opus 更经济的选择，同时仍能提供相当不错的结果（如下所示）。不过，努力程度设置现在由您控制，我们的默认设置也可能随时间而改变。

This post is going to cover only the very first scenario: the static page for a coffee shop, while follow-up posts will focus on going beyond that simple use case. There is much to review even for this simple case, so let us begin.
本文仅涵盖第一个场景：咖啡店的静态页面，后续文章将重点探讨超越该简单用例的场景。即使是这个简单的案例也有很多值得回顾的地方，让我们开始吧。

### Scenario #1: The local coffee shop
### 场景 #1：本地咖啡店

Here’s our first prompt: *Build a one-page site for a neighbourhood coffee shop: opening hours, the address, a short menu and a photo. Nothing on it changes unless I edit it myself.*
这是我们的第一个提示词：*为一个社区咖啡店构建一个单页网站：包含营业时间、地址、简短菜单和一张照片。除非我亲自编辑，否则页面内容不会发生变化。*

The last sentence was added as a hint to the model that no fancy Content Management System is needed. Our default skills also include some UI design guidance, mainly to avoid known gotchas (e.g., the now-dreaded purple AI slop) and get the model to reason about the visual identity appropriate for the user’s ask. But beyond that, each model is free to go build what it thinks we’ll want.
最后一句是给模型的提示，表明不需要复杂的“内容管理系统”。我们的默认技能还包含一些 UI 设计指导，主要是为了避免已知的陷阱（例如现在令人厌恶的紫色 AI 垃圾设计），并引导模型思考适合用户需求的视觉标识。除此之外，每个模型都可以自由构建它认为我们想要的内容。

Before we reveal what the sites looks like, here’s a table comparing the credit usage for each model we tested. Each model was run three times, and clicking any of the results will take you to the actual generated site!
在揭晓网站外观之前，下表对比了我们测试的每个模型的积分消耗。每个模型运行了三次，点击任何结果即可跳转到实际生成的网站！
---
title: "How to Build a Claude Code-Powered Knowledge Base"
originalUrl: "https://towardsdatascience.com/how-to-build-a-claude-code-powered-knowledge-base/"
date: "2026-05-11T23:19:53.684Z"
---

# How to Build a Claude Code-Powered Knowledge Base
# 如何构建基于 Claude Code 的知识库

In this article, I’ll discuss how to create a personal knowledge base powered by Claude Code.
在本文中，我将探讨如何创建一个由 Claude Code 驱动的个人知识库。

Claude Code is most popular as a programming tool. As a programming tool, it’s really amazing and does an incredible job, and has probably made me a multiple times over more efficient engineer. However, Claude Code can also be used for a lot of other super-useful application areas. You can use it for tasks such as creating presentations, which is very efficiently done by writing code, for example Python or LaTeX. Furthermore, you can apply Claude Code to use cases that are completely not related to coding, such as organizing your sales outreach or creating a knowledge base, which is what I’ll cover in this article.
Claude Code 最广为人知的身份是编程工具。作为编程工具，它确实非常出色，表现令人惊叹，可能让我的工程效率提升了数倍。然而，Claude Code 还可以应用于许多其他非常有用的领域。你可以用它来完成诸如制作演示文稿之类的任务，通过编写代码（例如 Python 或 LaTeX）可以非常高效地完成这些工作。此外，你还可以将 Claude Code 应用于与编程完全无关的场景，例如整理销售外联信息或构建知识库，这正是本文要讨论的内容。

An LLM-powered knowledge base is an incredibly powerful concept that can make you far more efficient simply because you can fetch relevant information faster. I’ll cover how to set this up, why you should set it up, and how you can get the most out of your knowledge base.
基于大语言模型（LLM）的知识库是一个极其强大的概念，它能让你更高效地工作，原因很简单：你可以更快地获取相关信息。我将介绍如何搭建它、为什么要搭建它，以及如何最大化利用你的知识库。

### Why set up an LLM-powered knowledge base
### 为什么要建立基于 LLM 的知识库

First of all, I’ll cover why you should set up an LLM-powered knowledge base. The simple reason is that LLMs work better the more context they have, and the more context you can provide to your language models, the better they will be able to solve different problems you throw at them. Thus, storing as much information as possible into a knowledge base is incredibly powerful because the LLM can access it when relevant.
首先，我将说明为什么要建立一个基于 LLM 的知识库。简单的原因是：LLM 拥有的上下文越多，表现就越好；你提供给语言模型的上下文越丰富，它们就越能解决你提出的各种问题。因此，将尽可能多的信息存储到知识库中是非常强大的，因为 LLM 可以在需要时随时调用这些信息。

I try to store absolutely everything I do into a centralized knowledge base. This could be things such as: the meetings I’m a part of, notes that I think about, mistakes that my agents make and how to avoid them, and so on.
我尝试将我所做的一切都存储到一个集中的知识库中。这可能包括：我参加的会议、我的思考笔记、我的智能体所犯的错误及其规避方法等等。

Before LLMs, you would have thought that there’s no point in setting up such a large knowledge base with so much information, because you simply couldn’t fetch the relevant information when you needed it. For example, if you needed a note from a specific meeting, it would be a lot of work to first find that specific meeting transcript, then, in that transcript, find the specific point you’re looking for and thus get the information you’re after. However, this completely changed when large language models became a thing, because suddenly you could easily access a vast amount of information within just a few seconds.
在 LLM 出现之前，你可能会认为建立这样一个包含海量信息的庞大知识库毫无意义，因为当你需要时，根本无法快速提取相关信息。例如，如果你需要某次特定会议的笔记，你得先找到会议记录，然后在记录中翻找特定要点，这非常费力。然而，当大语言模型出现后，一切都改变了，因为你突然可以在几秒钟内轻松访问海量信息。

To answer shortly, the reason you should build an LLM-powered knowledge base is that it allows you to fetch relevant information when you or your coding agent need it the most. The fact that you get a powerful knowledge base with LLMs makes the information super easily accessible, meaning you can store a vast amount of information.
简而言之，你应该构建 LLM 知识库的原因是，它能让你在自己或编程智能体最需要的时候提取相关信息。LLM 赋予了知识库强大的能力，使得信息获取变得极其简单，这意味着你可以存储海量的数据。

### How to set up an LLM-powered knowledge base
### 如何搭建基于 LLM 的知识库

Now I’ll get into how you can set up your own LLM-powered knowledge base. In reality, it’s quite simple. You just need to store all the information in one folder on your computer. In practice, however, it is a bit harder than you think because you need to make it a practice to store all the information in that location.
现在我将介绍如何搭建你自己的 LLM 知识库。实际上，这非常简单。你只需要将所有信息存储在电脑上的一个文件夹中即可。但在实践中，这比你想象的要难一点，因为你需要养成将所有信息存入该位置的习惯。

You can start by having a meeting note taker and ensuring that it always stores the notes with all relevant information, such as the attendees of the meeting, the time of the meeting, the name of the meeting, and the context of the meeting. This is information that you can fetch from your calendar, for example. Simply adding all of your meeting notes and transcripts into a central folder does a lot of the job. Note also that the knowledge base doesn’t have to be a local folder. It can also be cloud-based applications, such as Notion, where you can store text files. A knowledge base doesn’t really need to be much more than that. It simply needs to store text.
你可以从使用会议记录工具开始，确保它始终存储包含所有相关信息的笔记，例如参会人员、会议时间、会议名称和会议背景。这些信息可以从你的日历中获取。只需将所有的会议笔记和记录放入一个中心文件夹，就能完成大部分工作。还要注意，知识库不一定非要是本地文件夹，也可以是基于云的应用（如 Notion），你可以在其中存储文本文件。知识库其实不需要太复杂，它只需要能够存储文本即可。

Continuing on this, I also have reminders several times a week to store things in the knowledge base that I either think about, learnings from my work, or other useful information that I thought about. I try not to be or not to overthink what I add to the knowledge base. The most important is to add the information, which I do by simply prompting Claude Code: "Add <piece of knowledge> to my knowledge base."
在此基础上，我每周还会设置几次提醒，将我的思考、工作心得或其他有用的信息存入知识库。我尽量不去过度纠结存入什么内容。最重要的是把信息存进去，我通常只需提示 Claude Code：“将 <某条知识> 添加到我的知识库中。”

Claude Code then figures out which file or subfolder is the most relevant to contain this piece of information and stores the information for me. Another thing I do to update my knowledge base is that I ask Claude Code to do a daily walkthrough of all of my agent interactions throughout the day. This can be both interactions that I’ve had with my personal Claude Code and that I’ve had with my OpenClaw bots. We discuss what went well, what didn’t go well, and it automatically stores relevant generalizable knowledge into my general knowledge folder so it’s accessible for later. This is done by simply setting up a cron job, which runs daily.
Claude Code 会自动判断哪个文件或子文件夹最适合存放这条信息，并帮我存好。我更新知识库的另一个方法是，让 Claude Code 每天回顾我所有的智能体交互记录。这既包括我与个人 Claude Code 的交互，也包括我与 OpenClaw 机器人的交互。我们会讨论哪些做得好、哪些做得不好，它会自动将相关的可总结知识存入我的通用知识文件夹，以便日后查阅。这只需通过设置一个每日运行的 cron 任务即可完成。

You will naturally have other workflows than I have, and thus store different pieces of information and have access to different pieces of information as well. I thus urge you to think about different knowledge that you wish you had stored, and try to store that knowledge in a knowledge base. The general rule of thumb is that you should store as much context as possible in the knowledge base.
你的工作流程自然与我不同，因此你会存储不同的信息，并能访问不同的资源。因此，我建议你思考一下你希望存储哪些知识，并尝试将它们存入知识库。总的经验法则是：你应该在知识库中存储尽可能多的上下文。
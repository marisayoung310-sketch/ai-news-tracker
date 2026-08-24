---
title: "How to Create Powerful Loops in Claude Code"
originalUrl: "https://towardsdatascience.com/how-to-create-powerful-loops-in-claude-code/"
date: "2026-06-23T22:51:29.269Z"
---

# How to Create Powerful Loops in Claude Code
# 如何在 Claude Code 中创建强大的循环

In this article, I’ll discuss how to create loops for your calling agents to make them vastly more effective.
在本文中，我将探讨如何为你的调用代理（calling agents）创建循环，从而大幅提升它们的工作效率。

Loops have become a very popular topic with coding agents lately. Loops are basically a concept where you have an agent work in a self-verifying loop and have the agent work more autonomously. This is in contrast to how we used coding agents earlier, where you spin up a new coding agent, make the coding agent implement something, verify its results, and continue like that until you’re done with your work.
循环最近已成为编程代理领域的热门话题。循环本质上是一个让代理在自我验证循环中工作，并使其更具自主性的概念。这与我们过去使用编程代理的方式形成了对比：过去我们启动一个新的编程代理，让它实现某个功能，验证结果，然后重复此过程直到工作完成。

Loops are incredibly powerful because they allow you to take more of a backseat as a human and get more tasks done. This is because you don’t have to follow up the agent as closely, and it works more autonomously itself and is more able to complete work end-to-end.
循环之所以极其强大，是因为它们让你作为人类可以更多地退居二线，并完成更多任务。这是因为你无需紧密跟进代理的工作，它能更自主地运作，并更有能力端到端地完成工作。

In this article, I’ll discuss why you should be working in loops while interacting with coding agents and how you can do it. I’ll cover some techniques you should be actively utilizing when interacting with coding agents to effectively set up loops and make your coding agents as effective as possible.
在本文中，我将讨论为什么在与编程代理交互时应该使用循环，以及如何实现它。我将介绍一些你在与编程代理交互时应积极利用的技术，以有效地设置循环，并使你的编程代理尽可能高效。

### Why use loops with coding agents?
### 为什么要与编程代理一起使用循环？

First of all, let’s cover why you should be using loops when using coding agents. The simplest answer is that loops allow you to do more work. The reason for this is that when you set up a loop, the agent is more able to autonomously complete tasks end-to-end, which frees up time for you as a human, allowing you to do more work.
首先，让我们探讨一下为什么要在使用编程代理时使用循环。最简单的答案是，循环能让你完成更多工作。原因在于，当你设置了循环，代理就更有能力自主地端到端完成任务，这为你节省了时间，让你能够处理更多工作。

You can imagine these two scenarios:
你可以想象以下两种场景：

**Scenario 1:** You spin up agent A, make a plan with it, and have it begin work. You then spin up agent B, and before you’re done planning the task with agent B, agent A is asking you questions or telling you it’s completed some work and needs you to verify it. You decide to finish agent B, and right after you’re done there, you go back to agent A. Interact with it, have it continue to work, and before you’re done there, agent B needs input from you again. You then continue like this, and you’re only able to interact with two agents at once, essentially, completing two tasks at once.
**场景 1：** 你启动代理 A，与它制定计划并让它开始工作。然后你启动代理 B，在与代理 B 规划任务还没结束时，代理 A 就开始问你问题，或者告诉你它完成了一些工作需要你验证。你决定先完成代理 B 的任务，刚做完就回到代理 A。与它交互，让它继续工作，还没忙完，代理 B 又需要你的输入。你就这样持续下去，实际上你一次只能与两个代理交互，本质上一次只能完成两个任务。

**Scenario 2:** You spin up Agent A and have it run a loop to self-verify its work. Agent A will then start working on a task, and you tell it to only come back to you once it’s finished that task. Once you’ve finished instructing Agent A, you can start doing the same for Agent B, setting a goal and having it work in a loop. This time, Agent A doesn’t interrupt you for more input because it has the self-verification loop and doesn’t need your input in the same way anymore. Thus, you can continue setting tasks on agents C, D, E, and so on, until agent A finishes its work.
**场景 2：** 你启动代理 A 并让它运行一个循环来自我验证工作。代理 A 开始处理任务，你告诉它只有在完成任务后才来找你。一旦你指示完代理 A，你就可以对代理 B 做同样的事情，设定目标并让它在循环中工作。这一次，代理 A 不会因为需要更多输入而打断你，因为它有自我验证循环，不再以同样的方式需要你的输入。因此，你可以继续为代理 C、D、E 等设置任务，直到代理 A 完成工作。

The conclusion here is that scenario 2 simply allows you to spin up more agents and complete more tasks, which is, of course, incredibly valuable because it allows you to do more work at once.
结论是，场景 2 让你能够启动更多的代理并完成更多的任务，这当然非常有价值，因为它让你能够同时处理更多的工作。

### How to work in loops
### 如何在循环中工作

Now, the big question, of course, is how do you actually work in loops? There are a lot of different ways to do it, but I’ll cover the simplest technique that you can start implementing right away. This technique is to use the `/goal` command with either Claude Code or Codex.
现在，最大的问题当然是：你到底该如何进行循环工作？实现的方法有很多，但我将介绍一种你可以立即开始实施的最简单技术。该技术是在 Claude Code 或 Codex 中使用 `/goal` 命令。

`/goal <define your goal here and how to verify it>`

I, for example, say:
例如，我会这样说：

> /goal Implement everything I asked for. Verify it end to end by clicking through the browser using the Playwright MCP. It's not acceptable to test the application only through integration tests. You need to actually click around the app. Continue like this until it works. Fix any issues if you encounter them then do an end to end test again. Run Codex exec and run the review skill with Codex and make him approve it and iterate until Codex has approved it. When Codex has approved it, come to me and tell me which servers I can test it on and exactly how to test it.
> /goal 实现我要求的所有内容。通过使用 Playwright MCP 在浏览器中点击来端到端地验证它。仅通过集成测试来测试应用程序是不可接受的。你需要实际在应用程序中进行点击操作。持续这样操作直到它能正常工作。如果遇到问题，请修复它们，然后再次进行端到端测试。运行 Codex exec 并使用 Codex 的 review 技能，让它批准代码，并不断迭代直到 Codex 批准为止。当 Codex 批准后，来告诉我我可以在哪些服务器上测试它，以及具体如何测试。

Essentially, what `/goal` does is implement a hook. This hook is triggered every time Claude Code or Codex finishes its work, and it basically makes the coding agent reflect on whether it completed the task you wrote under `/goal` or not. If it is completed, it comes back to you and informs you of its work. If it thinks it’s not completed, it will continue working towards that goal until it’s happy.
本质上，`/goal` 的作用是实现一个钩子（hook）。每当 Claude Code 或 Codex 完成工作时，这个钩子就会被触发，它基本上会让编程代理反思它是否完成了你在 `/goal` 下编写的任务。如果已完成，它会回来通知你工作结果。如果它认为未完成，它将继续朝着该目标努力，直到它满意为止。

It’s essentially a way to just make the coding agents continue working until they actually reach your goal, or they believe it’s completely unattainable. A very powerful way to make coding agents work for longer periods of time, and thus work more autonomously and complete more work.
这本质上是一种让编程代理持续工作，直到它们真正达到你的目标，或者认为目标完全无法实现的方法。这是一种让编程代理长时间工作，从而更自主地完成更多工作的强大方式。

Also, notice in the prompt that I give the agent a lot of other information on how to verify its work. This is a topic I’ll cover in the next section, as it’s incredibly important if you want to get the most out of the `/goal` command.
此外，请注意在提示词中，我给了代理很多关于如何验证其工作的其他信息。这是我将在下一节中讨论的主题，因为如果你想充分利用 `/goal` 命令，这一点至关重要。

### How to make `/goal` effective
### 如何使 `/goal` 有效

In this section, I’ll cover how to make the `/goal` command effective. Of course, you can just give a goal to the agent, but if you’re not particular about which goal you set and how the agent can verify the goal, you’re not going to get good results. You need to provide the agent with a way to verify its own work and minimize the chance of bugs.
在本节中，我将介绍如何使 `/goal` 命令有效。当然，你可以直接给代理一个目标，但如果你对设定的目标以及代理如何验证目标不够讲究，你就无法获得好的结果。你需要为代理提供一种验证其自身工作并最大限度减少 Bug 几率的方法。

I do this in two main ways:
我主要通过两种方式来实现：

1. Tell the agent to verify its work end-to-end using the Playwright MCP and interacting with the browser.
1. 告诉代理使用 Playwright MCP 并通过与浏览器交互来端到端地验证其工作。
2. Have the agent run Codex Exec to review the code it’s providing to minimize the chance of bugs.
2. 让代理运行 Codex Exec 来审查它提供的代码，以最大限度地减少 Bug 几率。

I’ll cover the first point: I used Playwright MCP, but you can use any browser interaction method that you want to. I like Playwright because it works very well, and the agent is able to complete all of its work. Telling the agent to verify its work end-to-end is very effective.
我将介绍第一点：我使用了 Playwright MCP，但你可以使用任何你想要的浏览器交互方法。我喜欢 Playwright，因为它运行得非常好，而且代理能够完成所有的工作。告诉代理端到端地验证其工作是非常有效的。
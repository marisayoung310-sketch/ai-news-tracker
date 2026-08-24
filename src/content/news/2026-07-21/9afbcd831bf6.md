---
title: "AI’s most important protocol is getting a little bit easier to use"
originalUrl: "https://techcrunch.com/2026/07/20/ais-most-important-protocol-is-getting-a-little-bit-easier-to-use/"
date: "2026-07-20T22:17:41.532Z"
---

# AI’s most important protocol is getting a little bit easier to use
# AI 最重要的协议正变得更易于使用

The Model Context Protocol (MCP) is one of the basic building blocks of AI interoperability, giving AI models a secure way to access external data sources and services. It’s the plumbing that lets a chatbot reach into your calendar, your database, or your internal tools, instead of engineers building custom pipes for every connection.
模型上下文协议（MCP）是 AI 互操作性的基本构建模块之一，它为 AI 模型提供了一种安全访问外部数据源和服务的方式。它就像是管道系统，让聊天机器人能够接入你的日历、数据库或内部工具，而无需工程师为每一次连接都去构建定制化的管道。

Next week, that protocol is getting a significant update, and while it might not be noticeable to end users, it could make a big difference in how the ecosystem develops. The official spec for the new version has been public since May, but we got an unusually clear explanation of the changes Monday morning from the folks at Arcade — a two-year-old startup that’s built its entire business around the work of getting AI agents to actually function inside real companies, letting them securely connect to and act on tools like Gmail, Slack, and Salesforce.
下周，该协议将迎来一次重大更新。虽然终端用户可能察觉不到，但这可能会对生态系统的发展产生深远影响。新版本的官方规范自五月起就已公开，但我们在周一上午从 Arcade 的团队那里得到了关于这些变更的清晰解读。Arcade 是一家成立两年的初创公司，其核心业务是让 AI 智能体在真实企业环境中真正发挥作用，使其能够安全地连接并操作 Gmail、Slack 和 Salesforce 等工具。

Arcade raised $60 million in June on the idea that most AI agents don’t fail because the underlying models are weak but because the infrastructure around them isn’t ready yet, and that’s what this update is trying to address. Essentially, MCP is changing the way it handles session IDs — the little tokens that servers use to remember “ah, this is the same conversation as five seconds ago” — so servers can operate more easily at a larger scale.
Arcade 在六月份筹集了 6000 万美元，其理念是：大多数 AI 智能体的失败并非因为底层模型能力不足，而是因为其周边的基础设施尚未准备就绪，而这次更新正是为了解决这一问题。本质上，MCP 正在改变其处理会话 ID 的方式——即服务器用来识别“啊，这是五秒前的那场对话”的小型令牌——从而使服务器能够更轻松地在大规模环境下运行。

As Arcade founder Nate Barbettini puts it: [Under the current system] The first time an MCP client like Claude connects to a server, it sends a “hello”: I’m Claude, here’s my version, here are my capabilities. The server replies with its own capabilities and hands back a session ID… From then on, the client sends that session ID on every request so the server knows it is the same conversation. Sometimes the ID expires, so the client has to notice, request a new one, and carry on….
正如 Arcade 创始人 Nate Barbettini 所言：[在当前系统中] 当像 Claude 这样的 MCP 客户端首次连接到服务器时，它会发送一个“问候”：我是 Claude，这是我的版本，这是我的功能。服务器回复其自身的功能并返回一个会话 ID……从那时起，客户端在每次请求时都会发送该会话 ID，以便服务器知道这是同一场对话。有时 ID 会过期，客户端必须察觉到这一点，请求一个新的 ID，然后继续……

Picture a real deployment. You’re running a server for millions of users, behind a load balancer whose entire job is to route each request to whatever server in the farm is free, sometimes in a different region. Now every one of those machines has to know about a session ID that some other machine handed out. It’s not impossible, but it’s a serious pain, and it fights the load balancer instead of working with it.
想象一下真实的部署场景。你正在为数百万用户运行服务器，后端有一个负载均衡器，其全部工作就是将每个请求路由到服务器集群中空闲的机器上，有时甚至是在不同的区域。现在，每一台机器都必须了解由另一台机器分发的会话 ID。这并非不可能，但非常麻烦，而且这与负载均衡器的工作机制相冲突，而不是协同工作。

In other words, the current setup assumes one server remembers you, but real companies spread traffic across dozens of servers that don’t talk to each other by default, so today’s MCP servers have to do extra work just to keep track of who’s who. That’s been a significant headache for anyone running an MCP server at scale, and part of the reason we haven’t seen more companies ship large-scale, first-party MCP integrations despite all the hype around agentic AI this year.
换句话说，当前的设置假设有一台服务器能记住你，但真实的企业会将流量分散到几十台默认互不通信的服务器上，因此今天的 MCP 服务器必须做额外的工作来追踪谁是谁。对于任何大规模运行 MCP 服务器的人来说，这都是一个巨大的头痛问题，这也是尽管今年围绕智能体 AI 的炒作不断，我们却没看到更多公司推出大规模、第一方 MCP 集成的原因之一。

Under the new system, the protocol will take a looser, “stateless” approach to session IDs on the server side, similar to how most ordinary websites already work, which should make the whole system a lot easier to maintain and, in theory, cheaper to run at scale. That’s all pretty technical, but it’s an important reminder that not every part of AI development is moving at breakneck speeds. While model training races ahead, a lot of the technical infrastructure those models need is still subject to the slow log-rolling of standards-body consensus. It really is happening; it’s just a little slower!
在新系统中，该协议将在服务器端采用一种更宽松的“无状态”会话 ID 处理方式，类似于大多数普通网站的工作原理。这应该会使整个系统更易于维护，理论上在大规模运行时成本也更低。这些内容虽然非常技术化，但它提醒我们：并非 AI 开发的每一个环节都在以惊人的速度前进。当模型训练突飞猛进时，这些模型所需的许多技术基础设施仍受制于标准机构缓慢的共识达成过程。变革确实正在发生，只是速度稍微慢了一些！
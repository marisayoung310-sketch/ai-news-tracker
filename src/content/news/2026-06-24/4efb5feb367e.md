---
title: "Introducing Claude Tag"
originalUrl: "https://www.anthropic.com/news/introducing-claude-tag"
date: "2026-06-23T22:46:51.935Z"
---

# Introducing Claude Tag

**Claude Tag is a new way for teams to work with Claude.**
Claude Tag 是一种团队与 Claude 协作的全新方式。

**We’re starting on Slack, which Claude can join as a team member. Grant Claude access to selected channels, and connect it to whichever tools, data—and even codebases—you choose. Then, anyone in the channel can tag @Claude in, and delegate tasks to it while they focus on other work. Claude builds context by remembering relevant information from the channels it’s in, and can plan out tasks to complete in the future.**
我们首先从 Slack 开始，Claude 可以作为团队成员加入其中。你可以授予 Claude 特定频道的访问权限，并将其连接到你选择的任何工具、数据甚至代码库。之后，频道内的任何人都可以通过 @Claude 来指派任务，从而腾出精力专注于其他工作。Claude 通过记忆所在频道的相关信息来构建上下文，并能规划未来需要完成的任务。

**We see Claude Tag as the beginning of an evolution of Claude Code: it makes the model even more proactive, and it works better with a full team. Tagging @Claude is now one of the main ways we get things done at Anthropic. Today, 65% of our product team’s code is created by our internal version of Claude Tag. The same pattern is now spreading well beyond engineering—we’re tagging Claude to chase down product metrics and data, work through support tickets, or even help find the root cause of tricky bugs.**
我们将 Claude Tag 视为 Claude Code 演进的开端：它使模型更加主动，并且在整个团队协作中表现更佳。如今，@Claude 已成为我们在 Anthropic 完成工作的主要方式之一。目前，我们产品团队 65% 的代码是由内部版本的 Claude Tag 生成的。同样的模式现在正扩展到工程领域之外——我们通过 @Claude 来追踪产品指标和数据、处理支持工单，甚至协助查找棘手 Bug 的根本原因。

**We’re launching Claude Tag on Slack, since it’s a natural home for collaborative work between teams and AI, and where much of Anthropic’s day-to-day work already happens. It’s available today in beta for Claude Enterprise and Team customers. Our goal is to expand where it’s available more widely, so that teams can tag @Claude in the many other places they work.**
我们选择在 Slack 上推出 Claude Tag，因为这里是团队与 AI 协作的天然场所，也是 Anthropic 日常工作的主要阵地。该功能即日起面向 Claude Enterprise 和 Team 客户提供测试版。我们的目标是进一步扩大其适用范围，让团队能够在更多工作场景中 @Claude。

### Working with @Claude
### 如何与 @Claude 协作

**If you’ve worked with Claude Code or Cowork before, Claude Tag will feel familiar. Tag @Claude with a request in simple terms and it’ll break its task down into stages and then work through them in turn, using the tools it has access to. Once it’s done, it’ll respond in a Slack thread with what it’s created.**
如果你之前使用过 Claude Code 或 Cowork，那么 Claude Tag 会让你感到非常熟悉。只需用简单的语言 @Claude 并提出请求，它就会将任务拆解为多个阶段，并利用其拥有的工具依次完成。任务完成后，它会在 Slack 线程中回复其成果。

**But tagging Claude comes with a few new advantages:**
但 @Claude 还有几个新的优势：

*   **@Claude is multiplayer.** Within a given Slack channel, there’s one Claude that interacts with everyone. This means that anyone can see what it’s working on, and can pick up the conversation from where the last person left off. This makes tagging Claude very different from working within a single chat or for a single task—it’s much more like interacting collaboratively with a teammate.
    **@Claude 支持多人协作。** 在同一个 Slack 频道中，只有一个 Claude 与所有人互动。这意味着任何人都可以看到它正在处理的工作，并可以从上一个人中断的地方继续对话。这使得 @Claude 与在单一聊天窗口或处理单一任务的工作方式截然不同——它更像是与队友进行协作。

*   **@Claude learns over time.** As Claude follows along with its channel, it builds more context about the work. This means that users don’t need to explain things to it from scratch over and over again. And Claude can even automatically learn from other Slack channels and data sources, if it’s granted permission. (It doesn’t report from private channels.) This gives it the tacit knowledge necessary for it to provide the best possible work.
    **@Claude 会持续学习。** 随着 Claude 对频道的跟进，它会积累更多关于工作的上下文。这意味着用户无需反复从头解释。如果获得授权，Claude 甚至可以自动从其他 Slack 频道和数据源中学习（它不会报告私密频道的内容）。这赋予了它提供最佳工作成果所需的默会知识。

*   **@Claude takes initiative.** If “ambient” behavior is enabled, Claude will proactively keep you updated about whatever it thinks you might need to know. It’ll flag relevant information from across the channels it’s in and the tools it’s connected to, and follow up on threads or tasks that have gone quiet without being resolved.
    **@Claude 具有主动性。** 如果启用了“环境感知”行为，Claude 会主动向你更新它认为你可能需要了解的信息。它会标记来自其所在频道和已连接工具的相关信息，并跟进那些已沉寂但尚未解决的线程或任务。

*   **@Claude works asynchronously.** Set Claude a task, and you can focus on your other priorities while it works. It can also schedule tasks for itself, pursuing a project autonomously over hours or days. We’ve found this particularly helpful at Anthropic: we now spend much more of our time delegating tasks to many Claudes in parallel.
    **@Claude 支持异步工作。** 给 Claude 分配任务后，你可以在它工作时专注于其他优先事项。它还可以为自己安排任务，在数小时或数天内自主推进项目。我们在 Anthropic 发现这特别有用：我们现在将更多时间用于并行地向多个 Claude 分配任务。

**You can also send Claude direct messages: it’ll respond privately, using the personal tools and connectors you’ve set up.**
你也可以给 Claude 发送私信：它会使用你设置的个人工具和连接器进行私密回复。

### Getting started
### 入门指南

**We’ve designed Claude Tag with teams and organizations in mind: @Claude’s access to sensitive data and task-specific tools can be very tightly controlled.**
我们在设计 Claude Tag 时充分考虑了团队和组织的需求：@Claude 对敏感数据和特定任务工具的访问权限可以得到严格控制。

**To get up and running, system administrators specify which tools and information the model should have access to, in which channels. Think of it as creating separate Claude identities for different uses: everything, including its memories, will stay scoped to the channels defined by the administrators. For example, a model set up for sales work won’t pass on memories to one set up for engineering; nor will it give engineers access to any sales data or tools. More information about provisioning access is available here.**
要开始使用，系统管理员需指定模型在哪些频道可以访问哪些工具和信息。可以将其视为为不同用途创建独立的 Claude 身份：包括记忆在内的一切内容，都将限制在管理员定义的频道范围内。例如，为销售工作设置的模型不会将记忆传递给为工程工作设置的模型；也不会让工程师访问任何销售数据或工具。有关配置访问权限的更多信息，请点击此处。

**Once permissions are set, everyone can begin tagging right away. Administrators can set limits for token spend (both for the organization and for individual channels), and can view a log of everything that @Claude has done, along with who requested each task.**
权限设置完成后，所有人即可立即开始使用 @Claude。管理员可以设置 Token 消耗限额（针对整个组织或单个频道），并可以查看 @Claude 所做一切工作的日志，以及每项任务的请求者。

**If you’re a Claude Enterprise or Team customer, you have access to Claude Tag in beta starting today. To get started, visit here and follow these four steps:**
如果你是 Claude Enterprise 或 Team 客户，即日起即可使用 Claude Tag 测试版。要开始使用，请访问此处并按照以下四个步骤操作：

1. **Pair Claude Tag with your Slack workspace**
   将 Claude Tag 与你的 Slack 工作区配对
2. **Give Claude access to your tools**
   授予 Claude 访问你工具的权限
3. **Set a limit on your organization’s monthly spend**
   设置组织的月度消费限额
4. **Test Claude in a private channel to confirm it works.**
   在私密频道中测试 Claude 以确认其运行正常。

**Claude Tag replaces the existing Claude in Slack app. To migrate, administrators can opt in within 30 days. We’re issuing an introductory launch credit to eligible Enterprise and Team organizations so that the whole company can try it out.**
Claude Tag 将取代现有的 Claude in Slack 应用。管理员可在 30 天内选择迁移。我们正在向符合条件的 Enterprise 和 Team 组织发放入门启动额度，以便全公司都能试用。

**Claude Tag works with Opus 4.8. You can read our docs and product page.**
Claude Tag 支持 Opus 4.8。你可以阅读我们的文档和产品页面。
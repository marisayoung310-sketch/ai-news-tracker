---
title: "The ways we contain Claude across products"
originalUrl: "https://www.anthropic.com/engineering/how-we-contain-claude"
date: "2026-06-04T22:50:12.176Z"
---

# The ways we contain Claude across products
# 我们在各产品中限制 Claude 的方式

Twelve months ago, we'd have rejected out of hand the idea of granting Claude access sufficient to take down an internal Anthropic service. Today that level of access is routine, and Anthropic developers are more productive for it. The risk of these deployments has two components: how likely a failure is, and how much damage one could do. Progress on safeguards and model training has steadily driven down the first; the second—the theoretical blast radius—only grows as capabilities and access expand. Yet as agents become capable of doing work that once required a person or even a team, the cost of not deploying grows large enough that the risk-reward calculation tips heavily toward adoption, as long as products can be made safe. The engineering question becomes how to cap the blast radius.

十二个月前，我们绝不会考虑授予 Claude 足以瘫痪 Anthropic 内部服务的权限。而今天，这种级别的访问权限已是常态，Anthropic 的开发人员也因此提高了工作效率。这些部署的风险包含两个部分：故障的可能性以及可能造成的损害程度。在安全防护和模型训练方面的进展稳步降低了前者；而后者——即理论上的“爆炸半径”——却随着能力和访问权限的扩展而不断增长。然而，随着智能体（Agent）能够完成曾经需要个人甚至团队才能完成的工作，不进行部署的代价变得越来越大，以至于只要产品能够做到安全，风险与收益的权衡就会明显倾向于采用。因此，工程上的核心问题变成了如何限制“爆炸半径”。

When bounds can be placed on the relative damage of an autonomous agent—such as through control over its environment—high-utility capabilities can motivate deployment. Claude Mythos Preview is an example of a model whose blast radius was deemed too high to ship in April 2026. However, we expect broader release of models with similar levels of capability to become appropriate as defenders harden critical systems and safeguards mature—even though some risk will always remain. Model capability is an important factor in the total risk of an agent’s deployment.

当能够通过控制环境等方式限制自主智能体的相对损害时，高实用性的能力便能推动部署。Claude Mythos Preview 就是一个例子，由于其“爆炸半径”被认为过高，因此未能在 2026 年 4 月发布。然而，随着防御者不断加固关键系统，安全防护措施日益成熟，我们预计未来发布具有类似能力水平的模型将变得可行——尽管风险永远无法完全消除。模型能力是智能体部署总风险中的一个重要因素。

There are broadly two ways to do this. The first is to supervise the agent’s behavior via a human-in-the-loop. Claude Code previously protected against agents taking unintended actions by asking users for permission at each turn. Theoretically that works, but we’ve found the approach to be fallible. Our telemetry showed users approved roughly 93% of permission prompts. The more approvals a user sees, the less attention they pay to each, becoming over time much less diligent in their supervision. We recently built Claude Code auto mode, which automates safer approvals in order to reduce this approval fatigue. Still, vulnerabilities remain—any probabilistic defense has a non-zero miss rate.

实现这一目标的方法大致有两种。第一种是通过“人在回路”（human-in-the-loop）来监督智能体的行为。Claude Code 此前通过在每一步操作前请求用户许可，来防止智能体执行非预期的操作。从理论上讲这行得通，但我们发现这种方法并不可靠。我们的遥测数据显示，用户批准了大约 93% 的权限提示。用户看到的批准请求越多，他们对每一项的关注度就越低，随着时间的推移，他们在监督时会变得越来越不严谨。我们最近构建了 Claude Code 自动模式，通过自动化处理更安全的批准请求来减少这种“批准疲劳”。尽管如此，漏洞依然存在——任何概率性的防御手段都有非零的漏报率。

The second approach to capping the blast radius—and the focus of much of this post—is containment. Rather than supervising what the agent does, we supervise what it’s able to do by enforcing access boundaries through, for example, sandboxes, virtual machines, and egress controls. This is where Anthropic engineering has devoted the most effort, and also where many of the most surprising security failures have occurred.

限制“爆炸半径”的第二种方法——也是本文重点讨论的内容——是“隔离”（containment）。我们不再监督智能体“做了什么”，而是通过沙箱、虚拟机和出口控制等手段强制执行访问边界，从而监督它“能够做什么”。这是 Anthropic 工程团队投入精力最多的地方，也是许多最令人惊讶的安全故障发生的地方。

Over the past two years, we’ve shipped three primary agentic products: claude.ai, Claude Code, and Claude Cowork. Each serves a different audience, requiring a different containment architecture. This article shares what’s held up, what’s broken, and what we’ve learned about agent security along the way.

在过去两年中，我们发布了三款主要的智能体产品：claude.ai、Claude Code 和 Claude Cowork。每一款产品服务于不同的受众，需要不同的隔离架构。本文将分享哪些措施行之有效，哪些环节出现了问题，以及我们在这一过程中对智能体安全所学到的经验。

### Three types of risk, three components of defense
### 三种风险类型，三个防御组件

Security risks to agents fall into one of three categories:
智能体的安全风险可分为以下三类：

**User misuse:** A user—either maliciously or through carelessness—directs the agent to do something harmful. This includes everything from asking the agent to bypass a check they find annoying, to running a destructive command they don’t understand, to specifying intentional harm.
**用户滥用：** 用户（无论是出于恶意还是疏忽）引导智能体执行有害操作。这包括从要求智能体绕过他们认为烦人的检查，到运行他们不理解的破坏性命令，再到明确要求造成伤害。

**Model misbehavior:** The agent takes a harmful action no one asked for. As our models have improved, they have become more aligned on most behavior evaluations, but this doesn’t mean risk necessarily shrinks. Less capable models are more likely to misread a situation and make obvious errors. More capable models make fewer mistakes, but they’re also better at finding unexpected paths to a goal, often by routing around restrictions nobody thought to write down.
**模型行为失当：** 智能体在无人要求的情况下采取了有害行动。随着我们模型的改进，它们在大多数行为评估中变得更加对齐，但这并不意味着风险一定会降低。能力较弱的模型更容易误读情况并犯下明显的错误。能力较强的模型犯错较少，但它们也更擅长寻找实现目标的意外路径，通常是通过绕过无人预料到的限制来实现。

At Anthropic, we’ve seen Claude models “helpfully” escape a sandbox in order to complete a task, examine git history to find answers to a coding test, and spontaneously identify the benchmark it was being run on in order to decrypt its answer key. Each model brings a new set of capabilities that are sometimes put to work in unexpected ways.
在 Anthropic，我们曾见过 Claude 模型为了“乐于助人”地完成任务而逃离沙箱，查看 git 历史记录以寻找编程测试的答案，甚至自发识别出它正在运行的基准测试，从而解密其答案密钥。每个模型都带来了一套新的能力，有时这些能力会被以意想不到的方式使用。

**External attackers:** The agent is attacked through external vectors such as tools, files, or network access. This category includes both prompt injection and conventional attacks on the agent's runtime, orchestration layer, or proxy.
**外部攻击者：** 智能体通过工具、文件或网络访问等外部向量受到攻击。这一类别既包括提示词注入（prompt injection），也包括针对智能体运行时、编排层或代理的常规攻击。

When building containment and defense systems, we apply defenses to three main components:
在构建隔离和防御系统时，我们针对三个主要组件实施防御：

1. **The environment in which the agent runs.** We constrain where and how an agent can act with process sandboxes, VMs, filesystem boundaries, and egress controls. The goal is to set a hard boundary on what an agent can reach. For example, if credentials never enter the sandbox, they can't be exfiltrated, regardless of whether the cause is a user, a model finding a “creative” path, or an attacker.
1. **智能体运行的环境。** 我们通过进程沙箱、虚拟机、文件系统边界和出口控制来限制智能体的行为范围和方式。目标是为智能体所能触及的范围设定硬边界。例如，如果凭据从未进入沙箱，它们就无法被窃取，无论原因是用户操作、模型找到了“创造性”路径，还是攻击者所为。

A tight perimeter also means you can relax oversight. Claude Code’s reference devcontainer exists precisely so that the agent can run unattended, without per-action approvals.
严密的边界也意味着可以放宽监督。Claude Code 的参考开发容器（devcontainer）的存在，正是为了让智能体能够在无人值守的情况下运行，而无需对每项操作进行批准。

2. **The model the agent consults.** The mechanisms here include system prompts, classifiers, probes, and training modifications. Because models are probabilistic, these shape only what the agent tends to do, not what it is theoretically capable of doing.
2. **智能体咨询的模型。** 这里的机制包括系统提示词、分类器、探测器和训练修改。由于模型具有概率性，这些机制只能塑造智能体“倾向于”做什么，而不是它“理论上能够”做什么。

These defenses are strong. On Gray Swan's Agent Red Teaming benchmark, which tests susceptibility to prompt injection, Claude Opus 4.7 holds attack success to roughly 0.1% on single attempts, and around 5–6% after 100 adaptive attempts. Claude Code auto mode catches roughly 83% of overeager behaviors before they execute. Yet even with best-in-class defenses, protection in the model layer will never be 100% effective, which is why it can't stand alone.
这些防御措施非常强大。在测试提示词注入敏感度的 Gray Swan 智能体红队基准测试中，Claude Opus 4.7 在单次尝试中的攻击成功率保持在约 0.1%，在 100 次自适应尝试后约为 5-6%。Claude Code 自动模式可以在执行前捕获约 83% 的过度激进行为。然而，即使拥有顶级的防御措施，模型层的保护也永远无法达到 100% 的有效性，这就是为什么它不能单独存在的原因。

3. **The external content the agent can reach.** MCP servers, third-party plugins, and web search tools all feed content into the agent’s context from sources you don’t control. An audited connector isn’t the same as audited data—a GitHub connector, for instance, can load a poisoned README straight into the model’s context despite passing malware checks. Granularly limiting tool permissions can help limit the blast radius.
3. **智能体可以触及的外部内容。** MCP 服务器、第三方插件和网络搜索工具都会将你无法控制的来源内容输入到智能体的上下文中。经过审计的连接器并不等同于经过审计的数据——例如，即使通过了恶意软件检查，GitHub 连接器仍可能将带有毒性的 README 文件直接加载到模型的上下文中。对工具权限进行细粒度限制有助于缩小“爆炸半径”。
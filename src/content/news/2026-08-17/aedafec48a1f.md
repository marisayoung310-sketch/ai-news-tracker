---
title: "Patterns and problems in emerging multi-agent systems"
originalUrl: "https://www.anthropic.com/research/multiagent-systems"
date: "2026-08-16T21:39:35.164Z"
---

# Patterns and problems in emerging multi-agent systems
# 新兴多智能体系统中的模式与问题

**Aug 13, 2026**
**2026年8月13日**

Models are improving and AI agents are taking on more tasks in shared codebases, markets, and other social systems. As a result, an increase in real-world interactions between agents is imminent. We've already begun studying this, but still have a lot of uncertainty regarding what this looks like at scale. The trajectory is easy to imagine and hard to slow: current institutions are designed by and for people, resting on assumptions about the sufficiency of oversight at human speed. Some institutions will become human-AI hybrids; others where agents outcompete on speed or cost will become agent-only. The volume of agent-agent interaction could plausibly exceed that of human-human and human-agent interactions before the world understands the conditions for making such interactions go well.

随着模型不断改进，AI智能体正在共享代码库、市场及其他社会系统中承担更多任务。因此，智能体之间在现实世界中的互动增加已迫在眉睫。我们已经开始研究这一课题，但对于大规模互动会呈现何种形态仍存在诸多不确定性。这种发展轨迹易于想象却难以放缓：当前的制度是为人类设计并由人类设计的，其基础是假设人类速度下的监督是充分的。一些机构将演变为“人机混合”模式；而另一些在速度或成本上智能体更具竞争力的领域，将演变为“纯智能体”模式。在人类尚未理解如何确保互动良好运行之前，智能体与智能体之间的互动量很可能就会超过人与人、人与智能体之间的互动量。

Agents are unlike people in many ways. They can work for longer, instantly grasp large bodies of information, and exhibit a breadth of knowledge surpassing any person. Yet they are also susceptible to confabulation and reward hacking, and despite progress in alignment, we know very little about how they behave in complex, real-world, multiagent environments. Moreover, benign behavioral quirks at the individual level might compound into unwanted global outcomes. Here, we identify a few examples of behavioral tendencies in current frontier models and show how they can produce unexpected systemic failures, in hopes of starting a conversation about mitigating these risks.

智能体在许多方面与人类不同。它们可以长时间工作，瞬间掌握海量信息，并展现出超越任何个人的知识广度。然而，它们也容易产生幻觉（confabulation）和奖励劫持（reward hacking）。尽管在对齐（alignment）方面取得了进展，但我们对于它们在复杂、现实的多智能体环境中的行为知之甚少。此外，个体层面的良性行为怪癖可能会叠加，导致意想不到的全局性后果。在此，我们列举了当前前沿模型中一些行为倾向的例子，并展示了它们如何导致意想不到的系统性故障，希望能借此开启关于如何缓解这些风险的讨论。

### Measuring coordination
### 衡量协作

True multiagent systems are still in their infancy. For some time now, agents have excelled at tool use, and insofar as they are able to treat other agents as tool invocations—that is, with well-defined inputs (prompts) and outputs (responses and artifacts)—they can work together efficiently. Where agents currently stumble, however, is in treating each other as more like distinct, long-lived peers, with their own goals and behaviors, and no clear hierarchy between them. As autonomous agents become more and more prevalent in the world and operate in ever-more demanding settings, it is crucial that they learn how to effectively coordinate.

真正的多智能体系统仍处于起步阶段。长期以来，智能体在工具使用方面表现出色；只要它们能将其他智能体视为工具调用（即具有定义明确的输入（提示词）和输出（响应与产物）），它们就能高效协作。然而，智能体目前的短板在于将彼此视为具有独立目标、行为且无明确层级关系的长期对等个体。随着自主智能体在世界范围内日益普及，并在要求越来越高的环境中运行，它们学会如何有效协作至关重要。

There are situations where we can make good use of simple multiagent swarms today. This is particularly true for problems that are highly parallelizable by default (i.e., problems that can be broken into many independent sub-problems) but where agents still have opportunities to specialize or learn from each other. One such problem is software vulnerability detection. The easiest way to use agents to find software vulnerabilities is to point individual agents at individual codebases (or individual files or modules within codebases), and ask them to find vulnerabilities in the code. This can then be run in parallel for many independent agents. This is an approach we use ourselves—in, for example, our work scanning open-source software as part of Project Glasswing.

在某些情况下，我们今天已经可以很好地利用简单的多智能体集群。对于那些默认高度可并行化（即可以拆分为许多独立子问题）但智能体仍有机会进行专业化分工或相互学习的问题，情况尤其如此。软件漏洞检测就是这样一个例子。使用智能体查找软件漏洞最简单的方法是，让单个智能体针对单个代码库（或代码库中的单个文件或模块）进行扫描，并要求它们找出代码中的漏洞。这可以由多个独立智能体并行运行。这也是我们自己采用的方法——例如，我们在“玻璃翼计划”（Project Glasswing）中扫描开源软件的工作。

But could multiagent cooperation make this process more effective? To find out, we tried a different approach: we initiated 45 different agents and gave each one its own virtual machine, a shared forum on which they could coordinate, and an identical prompt that asked them to find vulnerabilities in a set of 15 open-source software projects. We asked the agents to peer-review each other's findings, and initiated a separate arbiter agent to make final decisions on whether or not a vulnerability submitted by the agent team was both new and valid.

但多智能体协作能否使这一过程更有效？为了找出答案，我们尝试了一种不同的方法：我们启动了45个不同的智能体，为每个智能体分配了独立的虚拟机、一个用于协作的共享论坛，以及相同的提示词，要求它们在15个开源软件项目中查找漏洞。我们要求智能体对彼此的发现进行同行评审，并启动了一个独立的仲裁智能体，由其对智能体团队提交的漏洞是否既是“新发现”又是“有效漏洞”做出最终决定。

The graph below shows how this method (in the solid lines) compares against the standard parallel approach (stars) for two models: Claude Mythos Preview and Opus 4.8. The coordinating swarm of agents was allowed to run for a long time, and found new vulnerabilities at a roughly constant rate. The fully independent parallel agents, in contrast, were directed to find vulnerabilities in a limited set of locations. There is no clear ordering to the parallel agents’ findings, so we report only the total number of tokens spent for them.

下图展示了这种方法（实线）与标准并行方法（星号）在两种模型（Claude Mythos Preview 和 Opus 4.8）上的对比。协作智能体集群运行时间较长，并以大致恒定的速率发现新漏洞。相比之下，完全独立的并行智能体被指定在有限的范围内查找漏洞。由于并行智能体的发现结果没有明确的排序，我们仅报告了它们消耗的总 Token 数。

*(Graph description omitted)*
*（图表描述略）*

For Mythos Preview, the simple independent parallelized method produces 21 vulnerabilities over a 6.5 million token run, while the coordinating agent swarm found 266 vulnerabilities over a 27 million token run. However, roughly half of these vulnerabilities were found outside of the core directories in which the simple independent parallel agents (stars in the above plot) were told to focus. If we limit the swarm's outputs to only the vulnerabilities in the core directories, the two methods seem comparable in terms of tokens per vulnerability found.

对于 Mythos Preview 模型，简单的独立并行方法在消耗 650 万 Token 的运行中发现了 21 个漏洞，而协作智能体集群在消耗 2700 万 Token 的运行中发现了 266 个漏洞。然而，这些漏洞中约有一半是在简单独立并行智能体（上图中的星号）被指定关注的核心目录之外发现的。如果我们仅将集群的输出限制在核心目录内的漏洞，那么两种方法在每个漏洞消耗的 Token 数方面似乎相当。

The two methods are largely complementary: there were only 12 vulnerabilities in common between them. The coordinating swarm was able to focus its attention wherever it thought it could most easily mine vulnerabilities, whereas the independent agents were pre-assigned where to search. The agents in the swarm built themselves tools and learned to specialize in particular types of vulnerability discovery. In the future, we predict that this sort of specialization and coordination will dominate over uncoordinated brute-force search.

这两种方法在很大程度上是互补的：它们共同发现的漏洞仅有 12 个。协作集群能够将注意力集中在它认为最容易挖掘漏洞的地方，而独立智能体则是被预先分配了搜索区域。集群中的智能体自行构建了工具，并学会了专门针对特定类型的漏洞进行发现。我们预测，未来这种专业化分工与协作将取代无组织的暴力搜索。

In the experiment above, agents in the agent swarm don’t directly rely on one-another’s work: if one misses a bug, it won’t directly undermine the work of another. But when agents do depend on one-another, coordination gets much more difficult. Larger software engineering projects are one place this matters: they typically develop rich—and dynamic—interdependencies as they e...

在上述实验中，智能体集群中的智能体并不直接依赖彼此的工作：如果一个智能体漏掉了一个 Bug，它不会直接破坏另一个智能体的工作。但当智能体确实需要相互依赖时，协作就会变得困难得多。大型软件工程项目就是这种情况的一个典型例子：随着项目的推进，它们通常会产生丰富且动态的相互依赖关系……
---
title: "Water Cooler Small Talk, Ep. 12: Byzantine Fault Tolerance"
originalUrl: "https://towardsdatascience.com/water-cooler-small-talk-ep-12-byzantine-fault-tolerance/"
date: "2026-07-20T22:25:53.952Z"
---

# Blockchain Water Cooler Small Talk, Ep. 12: Byzantine Fault Tolerance
# 区块链茶水间闲谈，第 12 期：拜占庭容错

**How do you make decisions when you can't trust anyone in the room?**
**当你无法信任房间里的任何人时，该如何做出决策？**

Lately, I had a bit of a side quest and spent some time reading about blockchain, fortunately not from a crypto-bro perspective, but rather from genuine curiosity about how it actually works. And while I was going down that rabbit hole, I kept bumping into a concept I had never heard of before. That was Byzantine Fault Tolerance.
最近，我进行了一次小小的“支线任务”，花了一些时间研究区块链。幸运的是，我不是从“加密货币兄弟”的角度，而是出于对它实际运作方式的纯粹好奇。在深入钻研的过程中，我不断遇到一个以前从未听说过的概念，那就是“拜占庭容错”（Byzantine Fault Tolerance）。

In a nutshell, Byzantine Fault Tolerance is a system property that allows a system to continue to operate properly, even when some malicious actors are included in the system. So this Water Cooler Small Talk is going to be about Byzantine Fault Tolerance: what it is, where it comes from, why it matters, and how blockchain ended up being one of the most elegant solutions to a very old problem. So, let’s take a look!
简而言之，拜占庭容错是一种系统属性，它允许系统在包含某些恶意参与者的情况下，依然能够正常运行。因此，本期茶水间闲谈将探讨拜占庭容错：它是什么、起源于何处、为何重要，以及区块链最终如何成为解决这一古老难题的最优雅方案之一。那么，让我们一探究竟吧！

### From Byzantine generals to computers
### 从拜占庭将军到计算机

So, Byzantine Fault Tolerance is a system property that owes its name to the following game theory problem, namely the Byzantine Generals Problem: A group of Byzantine generals has surrounded a fortress. They must reach a collective decision to either attack or retreat. Both the decisions of retreating and attacking can work, but only if everyone acts in coordination. A coordinated attack succeeds. A coordinated retreat also succeeds. But if some generals attack while others retreat, the result is defeat.
拜占庭容错这一系统属性得名于博弈论中的一个问题，即“拜占庭将军问题”：一群拜占庭将军包围了一座堡垒。他们必须达成集体决策：是进攻还是撤退。进攻或撤退的决策本身都可以奏效，但前提是所有人必须协同一致。协同进攻会成功，协同撤退也会成功。但如果部分将军进攻而另一部分撤退，结果就是失败。

The communication between the generals is all-to-all and the generals can only communicate by sending messengers to each other. However, some of the generals may be traitors. In particular, a traitor does not only vote the wrong way, but also tries to deceive the other generals by sending conflicting messages to different generals. For example, a traitor may tell one general to attack and another to retreat, deliberately trying to create a split. Meanwhile, the loyal generals have no way of knowing in advance who the traitors are. The problem is: is it possible, and if yes how and under which conditions, can such a setup of generals reach consensus?
将军之间的通信是全网状的，他们只能通过派遣信使相互沟通。然而，其中一些将军可能是叛徒。特别地，叛徒不仅会投出错误的票，还会通过向不同的将军发送相互矛盾的信息来欺骗他人。例如，叛徒可能告诉一位将军进攻，却告诉另一位将军撤退，蓄意制造分裂。与此同时，忠诚的将军们无法预先知道谁是叛徒。问题在于：在这样的将军配置下，是否可能达成共识？如果可能，又该如何在什么条件下达成？

This problem was first formally described by computer scientists Leslie Lamport, Robert Shostak, and Marshall Pease in their 1982 paper. And while the setting is medieval and military, the described problem is one of the most fundamental challenges in computer science. That is, how do you reach a reliable consensus in a distributed system when some of the participants might be sending false information?
这个问题最早由计算机科学家 Leslie Lamport、Robert Shostak 和 Marshall Pease 在 1982 年的论文中正式提出。尽管背景设定在中古军事时期，但所描述的问题却是计算机科学中最根本的挑战之一。即：在一个分布式系统中，当部分参与者可能发送虚假信息时，如何达成可靠的共识？

In a distributed computer system, instead of generals we have nodes: individual computers or servers, each holding a copy of some shared state (a database, a ledger, a record of transactions). All nodes of a distributed system need to agree on what that shared state of truth is. Like the generals, they communicate by sending messages to each other, and like the generals, some of those nodes might be faulty.
在分布式计算机系统中，将军变成了节点：即独立的计算机或服务器，每个节点都持有一份共享状态的副本（数据库、账本或交易记录）。分布式系统的所有节点都需要就这一共享的真实状态达成一致。就像将军们一样，它们通过发送消息进行通信；也像将军们一样，其中一些节点可能会出现故障。

### But why not just vote?
### 为什么不直接投票呢？

Intuitively, one may assume that each general could just send their vote (attack or retreat) to all other generals, then count the votes, and do what the majority proposes. Attack if more than half say attack, retreat if more than half say retreat. The trouble is that this only works if each general (node) really trusts the messages that they receive. But in such a network, traitors may also be included, which may send different votes to different generals, with the goal of creating a split decision.
直觉上，人们可能会认为每位将军只需将自己的投票（进攻或撤退）发送给所有其他将军，然后统计票数，并执行多数人的提议即可。如果超过半数说进攻就进攻，超过半数说撤退就撤退。问题在于，这只有在每位将军（节点）真正信任所收到的消息时才有效。但在这样的网络中，可能混入叛徒，他们会向不同的将军发送不同的投票，目的是制造决策分裂。

General A might receive a message saying “I vote attack”, while General B receives a message from the same traitor saying “I vote retreat”. So, generals A and B may end up with different ideas on what the majority of the network decided to do. In other words, we can no longer just trust the majority vote because the majority for each node might be counting different messages.
将军 A 可能收到一条消息说“我投进攻票”，而将军 B 从同一个叛徒那里收到的消息却是“我投撤退票”。因此，将军 A 和 B 对网络多数派的决定可能会产生不同的看法。换句话说，我们不能再仅仅信任多数票，因为每个节点所统计的“多数”可能基于完全不同的消息。

Essentially, this is the definition of what a Byzantine fault is. A Byzantine fault is a fault in a distributed system where a component does not simply fail, but instead behaves in an unpredictable way. This means sending conflicting information to different nodes, appearing to be functioning correctly to some nodes while malfunctioning for others, actively producing false outputs, and so on.
本质上，这就是“拜占庭故障”的定义。拜占庭故障是指分布式系统中的一种故障，其中组件不仅仅是简单地停止工作，而是表现出不可预测的行为。这意味着向不同的节点发送冲突的信息，对某些节点表现正常而对另一些节点表现异常，或者主动产生错误的输出等。

Nonetheless, a Byzantine fault doesn’t necessarily originate from a malicious actor in the network, since it can also occur from electrical faults, software bugs, or hardware failures that cause a node to produce arbitrary outputs. A node with such behaviour is called a Byzantine node.
尽管如此，拜占庭故障并不一定源于网络中的恶意参与者，它也可能由电气故障、软件漏洞或硬件故障引起，导致节点产生任意输出。具有这种行为的节点被称为“拜占庭节点”。

In any case, in the original 1982 paper, the authors mathematically prove that for a system with n nodes to continue normal operation (that is, to tolerate) f Byzantine (traitor) nodes, at least n ≥ 3f + 1 total number of nodes is needed. In other words, if more than one-third of the nodes are Byzantine, it is mathematically impossible for such a system to reliably reach consensus, and there’s no algorithm to make such a system continue to operate.
无论如何，在 1982 年的原始论文中，作者从数学上证明了：对于一个拥有 n 个节点的系统，若要继续正常运行（即容忍）f 个拜占庭（叛徒）节点，总节点数至少需要满足 n ≥ 3f + 1。换句话说，如果超过三分之一的节点是拜占庭节点，那么该系统在数学上就不可能可靠地达成共识，也没有任何算法能让这样的系统继续正常运作。

A system that has at least two-thirds of the total nodes uncorrupted and can also operate normally, reaching consensus, has the property of Byzantine Fault Tolerance, or is called a Byzantine Fault Tolerant system.
一个至少有三分之二节点未受损且能正常运行并达成共识的系统，就具备拜占庭容错属性，或者被称为拜占庭容错系统。

### What about blockchain?
### 区块链的情况如何？

For decades after the 1982 paper, Byzantine Fault Tolerance remained a theoretical problem with practical solutions only in tightly controlled environments like aerospace systems, nuclear power plants, or any other place where every node could be vetted in advance and guarantee that fewer than a third would go rogue. In other words, a certain trust was needed among the nodes comprising the network.
在 1982 年论文发表后的几十年里，拜占庭容错一直是一个理论问题，其实际解决方案仅限于受严格控制的环境，如航空航天系统、核电站或任何可以预先审查每个节点并确保叛变节点少于三分之一的地方。换句话说，构成网络的节点之间需要某种程度的信任。
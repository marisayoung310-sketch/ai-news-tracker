---
title: "EC2 not responding? The issue might be here (and it seems too basic to happen)"
originalUrl: "https://dev.to/asant_ops/ec2-not-responding-the-issue-might-be-here-and-it-seems-too-basic-to-happen-33ch"
date: "2026-04-30T22:41:32.784Z"
---

# EC2 not responding? The issue might be here (and it seems too basic to happen)
# EC2 没响应？问题可能出在这里（而且简单到令人难以置信）

In day-to-day cloud operations, some incidents stand out not because of their complexity, but quite the opposite. They are those cases where, once you discover the root cause, you think: “this can’t be it”. This is one of them.
在日常云运维中，有些故障之所以引人注目，并非因为它们复杂，恰恰相反。在这些案例中，当你发现根本原因时，你往往会想：“不可能是这个原因吧”。这就是其中之一。

### The scenario
### 场景描述

The EC2 instance was running, with a public IP and everything seemingly correct.
EC2 实例正在运行，拥有公网 IP，一切看起来都很正常。

*   Status: running
*   Public IP available
*   No visible alerts
*   状态：运行中
*   公网 IP 可用
*   无可见告警

Even so, every attempt to access it resulted in a timeout. No clear error. No direct clue.
即便如此，每次尝试访问它都会导致超时。没有明确的错误提示，也没有直接的线索。

### Where to look first
### 首先该检查哪里

In situations like this, before assuming something more complex, the first step is always to review the Security Group. More specifically: the inbound rules.
在这种情况下，在假设存在更复杂的问题之前，第一步永远是检查安全组（Security Group）。更具体地说：检查入站规则。

### The problem
### 问题所在

When analyzing the Security Group, the situation was straightforward: No inbound rules configured. This means the instance was not accepting any external connections. No SSH, no HTTP, no any other port. This is expected behavior in AWS: everything is denied by default unless explicitly allowed.
分析安全组时，情况一目了然：没有配置任何入站规则。这意味着该实例不接受任何外部连接。无论是 SSH、HTTP 还是其他任何端口。这是 AWS 的预期行为：除非明确允许，否则默认拒绝所有流量。

### Why this happens
### 为什么会发生这种情况

This type of situation is more common than it seems. Some examples:
这种情况比看起来更常见。例如：

*   Creating an instance without reviewing the Security Group
*   Using a default Security Group with no rules
*   Changes made during testing that were not reverted
*   Switching Security Groups without proper validation
*   创建实例时未检查安全组
*   使用了没有任何规则的默认安全组
*   测试期间所做的更改未还原
*   切换安全组时未进行适当验证

In the middle of daily operations, this kind of detail is easy to overlook.
在日常运维工作中，这类细节很容易被忽略。

### How to fix
### 如何修复

The fix is simple: add the required rule to the Security Group.
修复方法很简单：在安全组中添加所需的规则。

Example for SSH access:
以 SSH 访问为例：

*   Type: SSH
*   Port: 22
*   Source: your IP (recommended) or 0.0.0.0/0 for testing
*   类型：SSH
*   端口：22
*   源：你的 IP（推荐）或用于测试的 0.0.0.0/0

### After the fix
### 修复之后

Once the rule was added, access to the instance was restored immediately. No restart required. No additional changes needed.
规则添加后，对实例的访问立即恢复。无需重启，也无需进行其他更改。

### Practical takeaway
### 实践总结

Before assuming complex issues, always check the basics. In many cases, what looks like a serious incident is just a simple configuration that went unnoticed. And precisely because it looks simple, it happens more often than expected.
在假设存在复杂问题之前，请务必先检查基础配置。很多时候，看起来严重的故障仅仅是因为一个被忽视的简单配置。正因为它看起来简单，所以发生的频率往往比预想的要高。

### Quick checklist for unreachable EC2
### EC2 无法访问时的快速检查清单

*   Security Group
*   Network ACL
*   Route Table
*   Instance status
*   安全组
*   网络 ACL
*   路由表
*   实例状态

In most cases, the issue is in the first item.
在大多数情况下，问题都出在第一项上。

### Further reading
### 延伸阅读

If you want to dive deeper, the official documentation explains how Security Groups work and how rules are evaluated: [docs.aws.amazon.com](https://docs.aws.amazon.com)
如果你想深入了解，官方文档解释了安全组的工作原理以及规则的评估方式：[docs.aws.amazon.com](https://docs.aws.amazon.com)

### Note
### 备注

This content is based on real-world scenarios from day-to-day operations. AI tools were used only for text review.
本文内容基于日常运维中的真实场景。AI 工具仅用于文本校对。
---
title: "Building an Escalation Root-Cause Agent with Gemini and ADK"
originalUrl: "https://dev.to/aadilmajeedlone/building-an-escalation-root-cause-agent-with-gemini-and-adk-5b23"
date: "2026-08-21T21:52:14.566Z"
---

# Building an Escalation Root-Cause Agent with Gemini and ADK
# 使用 Gemini 和 ADK 构建升级案例根因分析智能体

Gen AI Academy APAC — Track 1 (AI Agents with Gemini, ADK, and Cloud Run)
Gen AI Academy APAC — 赛道 1（基于 Gemini、ADK 和 Cloud Run 的 AI 智能体）

Why I built this
I lead a customer service team of 25 agents at Amazon, handling both buyer-side and marketplace seller support. A big part of my job is reviewing escalated cases — calls or chats where a customer asked for a supervisor — and figuring out why they escalated in the first place. Was it a policy gap? A training issue? A system limitation nobody flagged?
我为什么构建这个项目
我在亚马逊领导着一个由 25 名客服代表组成的团队，负责处理买家端和平台卖家的支持工作。我工作中的很大一部分是审查升级案例（即客户要求转接主管的通话或聊天记录），并找出他们升级投诉的根本原因。是因为政策漏洞？培训问题？还是无人察觉的系统限制？

Right now, that review is manual. Every escalation gets read, tagged, and turned into a coaching note by a human — usually me, or one of my leads. It works, but it doesn't scale well, and patterns across dozens of cases are easy to miss when you're reviewing them one at a time between everything else on your plate.
目前，这种审查是人工完成的。每一份升级案例都需要人工阅读、标记并撰写辅导笔记——通常由我或我的组长来完成。这种方法虽然有效，但难以扩展。当你需要在繁杂的日常事务中逐一审查案例时，很容易忽略几十个案例中隐藏的共性模式。

So for Track 1 of the Gen AI Academy APAC program, I built an agent that does the first pass of this analysis automatically: read an escalation summary, classify the root cause against a standard taxonomy, flag whether it looks like a repeat pattern, and draft a coaching note — the same way I would, just faster and more consistently.
因此，在 Gen AI Academy APAC 项目的赛道 1 中，我构建了一个可以自动完成初步分析的智能体：它能读取升级案例摘要，根据标准分类法对根因进行归类，标记是否属于重复出现的模式，并起草辅导笔记——其逻辑与我本人处理时一致，但速度更快、表现更稳定。

What it does
The agent takes a case summary like this: Customer requested a refund for a damaged item outside the standard return window. Agent denied it citing policy; customer says a rep last month approved a similar exception for someone else.
它的功能
该智能体接收如下案例摘要：客户要求为一件超出标准退货期限的损坏商品退款。客服代表引用政策拒绝了请求；客户表示上个月有另一位代表为他人批准了类似的例外情况。

And returns a structured analysis:
{ "root_cause_category": "policy_misapplication", "severity": "medium", "is_likely_repeat_pattern": true, "pattern_reasoning": "Inconsistent policy application across agents suggests a training or documentation gap rather than an isolated error.", "coaching_note": "..." }
随后返回结构化的分析结果：
{ "root_cause_category": "policy_misapplication"（政策误用）, "severity": "medium"（中等严重程度）, "is_likely_repeat_pattern": true（可能是重复模式）, "pattern_reasoning": "不同客服代表对政策执行的不一致，表明存在培训或文档缺失，而非孤立错误。", "coaching_note": "..."（辅导笔记） }

It's built on Google's Agent Development Kit (ADK) with Gemini as the underlying model, and deployed as a live service on Cloud Run. The agent has one tool — a lookup function for the standard root-cause taxonomy — which keeps the categories consistent and easy to update without touching the core prompt.
该项目基于 Google 的智能体开发工具包 (ADK)，以 Gemini 为底层模型，并作为实时服务部署在 Cloud Run 上。该智能体配备了一个工具——用于查询标准根因分类法的查找函数，这使得分类保持一致，且无需修改核心提示词即可轻松更新。

For batch review, I also built a runner script that processes a whole CSV of cases at once and outputs a summary report — closer to how I'd actually use this day to day, reviewing a batch of the week's escalations rather than one at a time.
为了进行批量审查，我还编写了一个运行脚本，可以一次性处理整个 CSV 格式的案例文件并输出汇总报告——这更贴近我日常的工作方式，即批量审查本周的升级案例，而不是逐一处理。

What I learned building it
A few things stood out going through this: Getting the taxonomy right mattered more than the prompt engineering. Once I had six clear, non-overlapping root-cause categories with real definitions, the model's classifications got noticeably more consistent.
构建过程中的心得
在整个过程中，有几点感触颇深：确定正确的分类法比提示词工程更重要。一旦我定义了六个清晰、互不重叠且具有实际定义的根因类别，模型的分类结果就明显变得更加一致。

Structured output is where this becomes actually useful. Free-text analysis is fine to read once; a fixed JSON shape is what lets you aggregate patterns across dozens of cases and actually spot something you'd have missed manually.
结构化输出才是该项目真正有用的地方。自由文本分析读一次还可以，但固定的 JSON 格式能让你汇总几十个案例中的模式，从而发现人工审查时容易遗漏的问题。

Deployment had more friction than the coding did. Getting a fresh Google Cloud project's IAM permissions set up correctly for Cloud Build and Artifact Registry took longer than writing the agent itself — worth knowing going in if you're new to GCP.
部署过程比编写代码更具挑战性。为一个全新的 Google Cloud 项目正确配置 Cloud Build 和 Artifact Registry 的 IAM 权限，所花的时间比编写智能体本身还要长——如果你是 GCP 新手，这一点值得注意。

Try it / see the code
Live agent (Cloud Run): https://escalation-root-cause-agent-507816071353.us-central1.run.app
Source code: https://github.com/aadilmajeedlone/escalation-root-cause-agent
The repo includes a README.md with full setup instructions if you want to run it yourself, plus a sample CSV of synthetic escalation cases to test against (no real customer data used anywhere in this project).
尝试使用 / 查看代码
实时智能体 (Cloud Run): https://escalation-root-cause-agent-507816071353.us-central1.run.app
源代码: https://github.com/aadilmajeedlone/escalation-root-cause-agent
仓库中包含一份 README.md，提供了完整的设置说明，供你自行运行；此外还附带了一个合成升级案例的 CSV 样本供测试（本项目全程未使用任何真实的客户数据）。

What's next
The natural extension is Track 2 — instead of feeding it a CSV manually, connect it directly to a real ticketing system via MCP so it can pull escalations and analyze them without a manual export step. That's the version I'd actually want running against my team's queue.
下一步计划
自然的延伸是赛道 2——不再手动导入 CSV，而是通过 MCP 直接连接到真实的工单系统，使其能够自动拉取升级案例并进行分析，无需手动导出步骤。这正是我希望在团队工单队列中实际运行的版本。

Built for the Google Cloud Gen AI Academy APAC program, in partnership with Hack2Skill.
本项目为 Google Cloud Gen AI Academy APAC 项目而建，与 Hack2Skill 合作完成。
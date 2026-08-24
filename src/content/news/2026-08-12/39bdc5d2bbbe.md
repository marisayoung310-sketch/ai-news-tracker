---
title: "Can a Local LLM Run My AI Assistant?"
originalUrl: "https://towardsdatascience.com/can-a-local-llm-run-my-ai-assistant/"
date: "2026-08-11T22:28:41.436Z"
---

# Can a Local LLM Run My AI Assistant?
# 本地大模型能胜任我的 AI 助手吗？

Agentic AI Can a Local LLM Run My AI Assistant? I replayed 27 real production tasks through qwen3-coder:30b on my home RTX 3090 to see if a self-hosted model could replace Claude as the brain behind Jarvis — quality, cost, and reliability, measured.
**智能体 AI：本地大模型能胜任我的 AI 助手吗？** 我在自家的 RTX 3090 显卡上，通过 qwen3-coder:30b 模型重现了 27 个真实的生产任务，旨在测试自托管模型是否能取代 Claude，成为我个人助手 Jarvis 的“大脑”——并对质量、成本和可靠性进行了量化评估。

Arsen Apostolov Aug 11, 2026 14 min read Share The machine the second round ran on. Photo by the author.
Arsen Apostolov | 2026年8月11日 | 14分钟阅读 | 分享 | 第二轮测试所用的机器。图片由作者提供。

TL;DR — I replayed 27 real tasks from my own AI agent against two local models, one hardware upgrade apart, scoring both against the same frozen Claude baseline. On a single RTX 3090 capped at a 16K context, a 30B model scored 22.8/100 to Claude’s 89.4, and leaked malformed tool-call syntax into a quarter of its answers — broken, not merely worse.
**简而言之：** 我用两个不同硬件配置的本地模型，重现了我的 AI 智能体执行过的 27 个真实任务，并与 Claude 的原始表现进行了对比。在单张 RTX 3090（限制 16K 上下文）上，30B 模型得分为 22.8 分（Claude 为 89.4 分），且四分之一的回答中出现了语法错误的工具调用——这不仅仅是表现不佳，而是直接“坏掉”了。

On three 3090s with a 256K context, a 122B model scored 80.0, eliminated the malformed calls entirely (0 of 27), and cost $0.000969 per task against Claude’s $0.763 — roughly 787× cheaper. My agent now runs on the local model; I cancelled Claude Max and kept Pro.
而在三张 3090 显卡（256K 上下文）上，122B 模型得分为 80.0 分，完全消除了语法错误（27 次调用中 0 次出错），且单次任务成本仅为 0.000969 美元，远低于 Claude 的 0.763 美元——成本降低了约 787 倍。现在我的智能体已切换至本地模型运行；我取消了 Claude Max 订阅，仅保留了 Pro。

The honest caveat: model size and context budget changed together and I ran no control, so this measures a system upgrade, not an isolated model effect.
诚实的免责声明：模型规模和上下文预算是同时改变的，且我没有设置对照组，因此这衡量的是整个系统的升级，而非单一模型的效果。

Jarvis is my personal AI agent — a LangGraph react-agent wired into roughly 90 tools: email, calendar, notes, files, Office, WhatsApp, Discord, image generation, even spawning sub-agents for longer jobs. It ran on Claude from the day I built it, because Claude was the model I trusted it with.
Jarvis 是我的个人 AI 智能体——一个基于 LangGraph 的 React 智能体，连接了大约 90 种工具：电子邮件、日历、笔记、文件、Office、WhatsApp、Discord、图像生成，甚至能为长任务生成子智能体。从我构建它的第一天起，它就一直运行在 Claude 上，因为 Claude 是我最信任的模型。

A month ago I tried to replace that brain with a model running on my own hardware. It went badly, and I wrote up exactly how badly. Then I changed the hardware and tried again, and got a different answer. Both attempts are below, measured the same way, because the distance between them is the actual finding.
一个月前，我尝试用运行在我自己硬件上的模型来替换这个“大脑”。结果很糟糕，我详细记录了糟糕的程度。后来我升级了硬件并再次尝试，得到了不同的结果。两次尝试的记录都在下方，且采用了相同的衡量方式，因为这两次结果之间的差距正是本次发现的核心所在。

Last time, on a smaller stage The earlier piece — Local LLM Agents on an RTX 3090 — tested 5 local models across 2 agent frameworks on 17 tasks: 12 coding, 5 general-agent. qwen3-coder:30b topped that leaderboard cleanly. It was a fair test, and it told the truth about that scope.
**上一次，在更小的舞台上：** 我之前的文章《RTX 3090 上的本地 LLM 智能体》测试了 5 个本地模型在 2 个智能体框架下的表现，涵盖 17 个任务：12 个编码任务，5 个通用智能体任务。qwen3-coder:30b 稳居榜首。那是一次公平的测试，也真实反映了该范围内的表现。

Jarvis is a different scope entirely. Not 17 tasks in a clean harness — ~90 real tools, a personal-context system prompt, and years of actual messy requests logged in Langfuse, Jarvis’s self-hosted tracing. If the benchmark win was going to generalize anywhere, it should generalize here.
但 Jarvis 的范畴完全不同。它不是 17 个整洁的测试任务，而是涉及约 90 种真实工具、个人上下文系统提示词，以及多年来记录在 Jarvis 自托管追踪系统 Langfuse 中的真实且杂乱的请求。如果基准测试的胜利具有普适性，那么它应该在这里得到体现。

The setup: a replay, not a re-run I pulled 28 real historical task prompts straight from Jarvis’s own Langfuse traces (90-day window), stratified across 7 categories — calendar, code, email, files, general, messaging, notes — 4 each. Claude’s side of the comparison is its actual historical production answer, already logged in Langfuse. I did not re-run it.
**设置：重现，而非重新运行：** 我直接从 Jarvis 的 Langfuse 追踪记录（90 天窗口期）中提取了 28 个真实的历史任务提示词，分为 7 个类别——日历、代码、邮件、文件、通用、消息、笔记，每类 4 个。对比中 Claude 的部分是其历史生产环境中的实际回答，已记录在 Langfuse 中。我没有重新运行它。

Re-running Claude through a sandboxed harness would mean feeding it fake stubbed tool data it never actually saw, which handicaps it for no good reason — the honest baseline is the answer it really gave, with the real data it really had. That baseline is frozen: it is identical in both rounds below. Only the local model is re-run.
在沙盒环境中重新运行 Claude 意味着要向它提供它从未见过的虚假存根工具数据，这会无缘无故地削弱它的表现——最诚实的基准是它在拥有真实数据时给出的真实回答。该基准是固定的：在下方的两轮测试中完全相同。只有本地模型是重新运行的。

The local side is a fresh run through a sandboxed replay harness: the real Jarvis LangGraph agent code, in-process, with every write-capable tool (send email, write to calendar, post to Discord/WhatsApp, write files) intercepted so nothing real happens.
本地模型侧是通过沙盒重现框架进行的全新运行：使用真实的 Jarvis LangGraph 智能体代码，在进程内运行，并拦截所有具有写入能力的工具（发送邮件、写入日历、发布到 Discord/WhatsApp、写入文件），确保不会发生任何实际操作。

Read-only tools that touch real external systems — Outlook COM for email and calendar — are intercepted too, but the mock serves the real recorded output from that task’s original Langfuse trace when one exists, not a generic stub. The local model reasons over the same real inbox and calendar content Claude saw, not invented placeholder text.
接触真实外部系统的只读工具（如用于邮件和日历的 Outlook COM）也会被拦截，但模拟器会提供该任务原始 Langfuse 追踪记录中的真实输出（如果存在），而不是通用的存根。本地模型是在 Claude 所见的相同真实收件箱和日历内容上进行推理，而不是虚构的占位符文本。

The wrapper is default-deny: any tool not on a short explicit allowlist gets mocked. That detail earned its keep — between the two rounds Jarvis grew new tools, and default-deny meant they were intercepted automatically instead of quietly executing against my real accounts.
包装器采用“默认拒绝”策略：任何不在明确白名单上的工具都会被模拟。这个细节非常关键——在两轮测试之间，Jarvis 增加了新工具，而“默认拒绝”意味着它们被自动拦截，而不是在我的真实账户上静默执行。

Quality is scored independently — not pairwise, to avoid position bias — by an LLM judge (claude-opus-4-8) on a 1–5 scale mapped to 0–100, applied identically to every answer in both rounds. Worth flagging plainly: the judge is a Claude model, scoring Claude’s own answers alongside the local ones.
质量由 LLM 裁判（claude-opus-4-8）独立评分（非成对比较，以避免位置偏差），采用 1-5 分制并映射到 0-100 分，两轮测试中的每个回答均采用相同的评分标准。需要明确指出的是：裁判是 Claude 模型，它在为本地模型评分的同时也在为自己的回答评分。

That’s self-preference bias — a documented effect in LLM-as-judge setups, where a model tends to rate outputs from its own family more favorably. I can’t cleanly rule it out, and it probably flatters Claude. It’s a real limitation of this methodology, not a footnote to bury — and it matters more in round 2, where the local model is close enough for a thumb on the scale to change how you read the result.
这存在“自我偏好偏差”——这是 LLM 作为裁判时的一种已知效应，模型往往会给同家族的输出打出更高的分数。我无法完全排除这种可能性，它很可能美化了 Claude 的表现。这是该方法论的一个真实局限，而不是可以掩盖的脚注——在第二轮测试中，这一点尤为重要，因为此时本地模型的表现已经足够接近，微小的偏差就可能改变你对结果的解读。

Cost is the other half of the comparison, and it needs an instrument. Claude’s side is easy — Langfuse already recorded the real API billing for every historical call. The local side is electricity, which nothing bills you for per task. Every local run is logged as a priced experiment in HomeLab Monitor, the open-source monitoring stack I maintain: it attributes measured GPU energy to the window each run occupied and converts it at my actual dual-rate tariff. Neither side of the cost comparison is an estimate.
成本是对比的另一半，需要量化工具。Claude 的成本很容易计算——Langfuse 已经记录了每次历史调用的真实 API 账单。本地侧则是电费，没有任何系统会按任务为你计费。每次本地运行都会作为一项定价实验记录在 HomeLab Monitor（我维护的开源监控栈）中：它将测得的 GPU 能耗归因于每次运行的时间窗口，并按我实际的双费率电价进行换算。成本对比的双方都不是估算值。

Three passes before the number was trustworthy Worth a paragraph, because the numbers below are only worth publishing if the process that produced them holds up. The first scoring pass had a silent bug: the judge model wraps its response in a list of content blocks, not a plain string, and the scorer’s JSON parser choked on ~40 of 54 judge calls — caught, logged, and quietly replaced with a neutral fallback score instead of erroring out loud. That run said Claude 71.6 vs qwen 43.5. Mostly noise.
**在数据可信之前进行了三次尝试：** 值得专门写一段，因为只有当产生数据的过程经得起推敲时，下方的数字才值得发布。第一次评分过程有一个隐蔽的 Bug：裁判模型将响应封装在内容块列表中，而不是纯字符串中，导致评分器的 JSON 解析器在 54 次裁判调用中约 40 次出错——我捕获并记录了这些错误，并用中性的后备分数静默替换，而不是直接报错。那次运行显示 Claude 为 71.6 分，qwen 为 43.5 分。这大部分是噪音。

Fixed and re-run, the gap got more extreme — Claude 89.2, qwen bucketed at exactly 15 or 45 on nearly every task. Investigating that found the real problem: 16 of the 28 tasks are calendar, email, notes, or messaging — categories where the safety wrapper correctly mocks the underlying Outlook COM calls, but the mock was returning a generic canned string instead of real data. qwen was reasoning over placeholder
修复并重新运行后，差距变得更加极端——Claude 为 89.2 分，qwen 在几乎每个任务上都被归类为 15 分或 45 分。调查发现真正的问题在于：28 个任务中有 16 个是日历、邮件、笔记或消息——在这些类别中，安全包装器正确地模拟了底层的 Outlook COM 调用，但模拟器返回的是通用的预设字符串，而不是真实数据。qwen 是在占位符上进行推理的。
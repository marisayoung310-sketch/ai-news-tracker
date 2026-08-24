---
title: "We got local models to triage the OpenClaw repo for FREE!*"
originalUrl: "https://huggingface.co/blog/local-models-pr-triage"
date: "2026-06-23T22:47:23.307Z"
---

# We got local models to triage the OpenClaw repo for FREE!*

**我们成功利用本地模型免费对 OpenClaw 仓库进行了分类处理！***

*Free as in beer, excluding the cost of electricity, and assuming you already own the hardware.
*这里的“免费”是指像免费啤酒一样（无需支付软件授权费），不包含电费成本，且假设你已经拥有相关硬件。

June 2026 will go down as the moment that people realized closed models can be taken away. With the removal of Anthropic's latest flagship model Claude Fable 5 fresh in memory, one can see why it is more important than ever to own your AI stack and be able to run models locally, especially if you are building your business on top of AI. In that light, we wanted to share how we use local models like Gemma and Qwen in an agent harness, to run classification tasks.
2026 年 6 月将作为人们意识到闭源模型随时可能被收回的时刻载入史册。Anthropic 最新旗舰模型 Claude Fable 5 被下架的记忆犹新，人们不难理解为什么拥有自己的 AI 技术栈并能在本地运行模型变得前所未有的重要，尤其是当你基于 AI 构建业务时。鉴于此，我们想分享如何利用 Gemma 和 Qwen 等本地模型，通过智能体框架（agent harness）来执行分类任务。

This approach is different from using a model like BERT for classification. A local model in an agent harness like Pi can be used in tandem with structured outputs, to assign labels. We chose this approach because we already had local models and the harness on hand, and have conviction that similar setups will increase in popularity as local models improve in capability.
这种方法与使用 BERT 等模型进行分类有所不同。在像 Pi 这样的智能体框架中，本地模型可以与结构化输出配合使用来分配标签。我们选择这种方法是因为我们手头已经有了本地模型和框架，并且我们坚信，随着本地模型能力的提升，类似的配置将会越来越受欢迎。

Our starting point was open source contributions in the OpenClaw repo. OpenClaw gets hundreds of issues and PRs every day, which need to be triaged, prioritized and routed to maintainers. I, Onur, am working to make local models work well with OpenClaw. Being a maintainer of this specific vertical, I need to react quickly to any P0 issues. With SOTA closed models like GPT-5, Opus, or Sonnet, this is a pretty straightforward task. But I happen to sit on 128 GB of unified memory, namely an NVIDIA GB10. So I took on the task: Can I build a real-time notification system that filters and notifies me for only the issues that I am responsible for... with local open-weight models?
我们的切入点是 OpenClaw 仓库中的开源贡献。OpenClaw 每天都会收到数百个 Issue 和 PR，需要进行分类、优先级排序并分发给维护者。我（Onur）正在致力于让本地模型与 OpenClaw 良好协作。作为该特定垂直领域的维护者，我需要对任何 P0 级问题做出快速响应。使用 GPT-5、Opus 或 Sonnet 等 SOTA（最先进）闭源模型，这任务相当简单。但我恰好拥有 128 GB 的统一内存，即 NVIDIA GB10。于是我承担了这个任务：我能否利用本地开源权重模型，构建一个实时通知系统，仅过滤并通知我负责的问题？

This tiny box, a.k.a. DGX Spark, can run gemma-4-26b-a4b with high concurrency and generate hundreds of tokens per second. If I set up my OpenClaw main agent running on a $200/mo ChatGPT Pro plan to trigger a job on every new issue or PR, that would use up my quota. I might instead set it to run every 2 hours, or 6 hours. This would batch issues over longer periods, so we would be trading real-time notifications for delayed processing. If I were to run this on a local model on the hardware I already have up and running, I would not only have near-instantaneous notifications, I would also be able to do it for free (or rather, for the cost of electricity).
这个小盒子，也就是 DGX Spark，可以高并发运行 gemma-4-26b-a4b，并以每秒数百个 token 的速度生成内容。如果我设置运行在每月 200 美元 ChatGPT Pro 计划上的 OpenClaw 主智能体，在每个新 Issue 或 PR 上触发任务，那很快就会耗尽我的配额。我可能不得不将其设置为每 2 小时或 6 小时运行一次。这将导致问题在较长时间内被批量处理，从而以牺牲实时通知为代价换取延迟处理。如果我使用现有的硬件运行本地模型，不仅能获得近乎即时的通知，还能免费（或者说，仅需支付电费）完成这项工作。

Categorizing issues and PRs: We came up with a finite set of labels representing the categories of issues we need to triage, and then use a local model to classify each issue into one of those categories, like local_models, self_hosted_inference, acp, agent_runtime, codex, ui_tui and so on. But how do we classify pull requests? A simple single request to a Chat Completions endpoint with a tool JSON schema, with the topics as an enum? Kind of. But this is 2026, not 2023, and we have AGENTS. We can do better!
分类 Issue 和 PR：我们制定了一套有限的标签集，代表我们需要分类的问题类别，然后使用本地模型将每个问题归入其中一个类别，例如 local_models、self_hosted_inference、acp、agent_runtime、codex、ui_tui 等。但我们该如何对 Pull Request 进行分类呢？是向 Chat Completions 端点发送一个带有工具 JSON 模式（以主题作为枚举）的简单请求吗？算是吧。但现在是 2026 年，不是 2023 年，我们有智能体（AGENTS）。我们可以做得更好！

For the local model choices, we tested gemma-4-26b-a4b and qwen3.6-35b-a3b. With performance optimizations, both can generate hundreds of tokens per second locally. We use an agent harness to drive the classification run. For this, we bundle pi as a harness that can call local model endpoints. The agent by default receives the PR title, body and a truncated excerpt of the PR diff in the first prompt. Then, it can choose to use the bash tool to perform read-only operations on the OpenClaw repo (in case it needs to look at the codebase), or the final_json tool to submit the final classification result.
在本地模型选择上，我们测试了 gemma-4-26b-a4b 和 qwen3.6-35b-a3b。通过性能优化，两者都能在本地实现每秒数百个 token 的生成速度。我们使用智能体框架来驱动分类运行。为此，我们将 pi 打包为一个可以调用本地模型端点的框架。智能体在第一个提示词中默认接收 PR 标题、正文以及 PR diff 的截断摘要。然后，它可以选择使用 bash 工具对 OpenClaw 仓库执行只读操作（以防需要查看代码库），或者使用 final_json 工具提交最终分类结果。

You wouldn't want to give full bash access to a local model running in this high-throughput setting, because a prompt-injected issue or PR could otherwise steer the model into doing something unrelated to classification. For that reason, we use reposhell instead of bash: a restricted bash-like shell that only allows read-only operations (ls, find, cat, grep, etc.) on the OpenClaw repo.
你肯定不希望在这种高吞吐量环境下给本地模型完全的 bash 访问权限，因为提示词注入（prompt-injected）的 Issue 或 PR 可能会诱导模型执行与分类无关的操作。因此，我们使用 reposhell 代替 bash：这是一个受限的类 bash shell，仅允许对 OpenClaw 仓库进行只读操作（如 ls、find、cat、grep 等）。

Here is a concrete example where this mattered. In one saved session example, qwen3.6-35b-a3b was classifying openclaw/openclaw#84621, titled "Fix Kimi tool-call rewriting stop reason handling." The thinking block shows the model initially considering coding_agent_integrations because the changed path extensions/kimi-coding made it look plausible. The model used reposhell to inspect the local repo with simple read-only commands like ls extensions, ls extensions/kimi-coding, and cat extensions/kimi-coding/package.json. That package metadata showed the extension was actually @openclaw/kimi-provider, an OpenClaw Kimi provider plugin. So the model corrected the final labels to inference_api and tool_calling, and explicitly excluded coding_agent_integrations.
这是一个至关重要的具体案例。在一次保存的会话示例中，qwen3.6-35b-a3b 正在对 openclaw/openclaw#84621 进行分类，标题为“修复 Kimi 工具调用重写停止原因处理”。思考过程显示，模型最初考虑将其归类为 coding_agent_integrations，因为更改的路径 extensions/kimi-coding 看起来很像。模型使用 reposhell 通过简单的只读命令（如 ls extensions、ls extensions/kimi-coding 和 cat extensions/kimi-coding/package.json）检查了本地仓库。该包元数据表明该扩展实际上是 @openclaw/kimi-provider，一个 OpenClaw Kimi 提供程序插件。因此，模型将最终标签更正为 inference_api 和 tool_calling，并明确排除了 coding_agent_integrations。
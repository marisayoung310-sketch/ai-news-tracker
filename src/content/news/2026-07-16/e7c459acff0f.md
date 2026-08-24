---
title: "Model Showdown Round 9: Qwen 3.6 27B vs Qwen 3.6 35B-A3B vs Qwythos-9B vs GLM-4.7-Flash vs Nemotron-3-Nano"
originalUrl: "https://dev.to/carryologist/model-showdown-round-9-qwen-36-27b-vs-qwen-36-35b-a3b-vs-qwythos-9b-vs-glm-47-flash-vs-4j69"
date: "2026-07-15T22:24:47.675Z"
---

# Model Showdown Round 9: Qwen 3.6 27B vs Qwen 3.6 35B-A3B vs Qwythos-9B vs GLM-4.7-Flash vs Nemotron-3-Nano

Round 7 ended on a cliffhanger I couldn't stop thinking about. Qwen 3.6 35B-A3B built the entire feature — read the codebase, wrote the files, got a clean build — and then spent 77 messages, more than half its session, failing to take a Playwright screenshot. It never committed. It never pushed. All that work, gone. Was that a bad day, or is it structural?
第七轮比赛以一个让我久久不能忘怀的悬念结束。Qwen 3.6 35B-A3B 完成了整个功能的开发——读取代码库、编写文件、成功构建——然后却在 77 条消息（超过其会话的一半）中反复尝试截取 Playwright 屏幕截图却以失败告终。它从未提交代码，也从未推送。所有的努力都付诸东流。这只是偶然的失误，还是结构性的缺陷？

Round 9 was supposed to answer that with three contestants: the 35B-A3B running back for a rematch, a dense 27B challenger, and NVIDIA's Nemotron-3-Nano as an architectural wild card. Clean, narrow, three-way test of dense-vs-MoE. It didn't stay clean. By the time I was done, I'd expanded the field to five models, and I'd personally patched two separate llama.cpp/template bugs live, mid-bakeoff, just to get two of the contestants to a fair starting line. One of those fixes worked perfectly — and the model still failed anyway, for a completely different reason. Let's get into it.
第九轮比赛本应通过三位选手来回答这个问题：35B-A3B 回归寻求复赛，一位稠密（Dense）架构的 27B 挑战者，以及作为架构“外卡”选手的 NVIDIA Nemotron-3-Nano。这本应是一场干净、聚焦的稠密模型与 MoE 模型的三方对决。但情况并没有保持简单。当我完成时，参赛模型已增加到五个，而且我还在比赛进行中现场修复了两个独立的 llama.cpp/模板漏洞，只为了让其中两个选手能站在公平的起跑线上。其中一个修复方案非常完美——但该模型最终还是因为完全不同的原因失败了。让我们深入了解一下。

### The Setup
### 比赛设置

This is Round 9 of the Local Model Showdown, a sub-series of Model Showdown that only tests models I can actually run on my own hardware. No API keys, no cloud spend — just an RTX 5090 and however much patience the model has for a real coding task.
这是“本地模型对决”的第九轮，这是“模型对决”系列的一个子系列，仅测试我能在自己的硬件上实际运行的模型。无需 API 密钥，无需云端支出——只有一张 RTX 5090 显卡，以及模型对真实编程任务所能展现的耐心。

The homelab, unchanged from Round 7:
家庭实验室配置，与第七轮保持一致：
*   **CPU:** AMD Ryzen 9 9950X3D, 64GB RAM
*   **GPU:** NVIDIA RTX 5090, 32GB VRAM
*   **Inference:** llama.cpp, single-model serving, one contestant loaded at a time
*   **Agent platform:** Coder Agents
*   **OS:** Ubuntu 24.04

### The Contestants
### 参赛选手

The plan called for three. I ran five.
原计划是三位，但我运行了五位。

| Run | Model | Architecture | Role |
| :--- | :--- | :--- | :--- |
| 1 | Qwen 3.6 27B | Dense transformer | Primary dense challenger |
| 2 | Qwen 3.6 35B-A3B | MoE transformer | Incumbent / Round 7 rematch |
| 3 | Qwythos-9B-Claude-Mythos-5-1M | Dense, MTP speculative decoding | Unplanned wild card |
| 4 | GLM-4.7-Flash | Dense | Unplanned wild card |
| 5 | Nemotron-3-Nano-30B-A3B | Hybrid Transformer-Mamba-2 MoE | Architectural wild card |

Why the field grew: once the harness and the model-serving pipeline were working, running two more small/cheap contestants cost almost nothing extra in setup, and both turned out to matter — one for a completely novel failure mode I hadn't seen in six rounds of this series, the other for confirming a fix actually worked in practice, not just in a curl test. Model-to-run mapping was randomized and sealed before any task prompt was sent, same as every round in this series.
参赛阵容扩大的原因：一旦测试框架和模型服务流水线运行起来，增加两个小型/廉价的参赛者几乎不需要额外的设置成本，而且两者都发挥了作用——一个展示了我在此系列六轮比赛中从未见过的全新故障模式，另一个则证实了修复方案在实际应用中确实有效，而不仅仅是在 curl 测试中。与本系列每一轮一样，模型运行顺序在发送任何任务提示之前都是随机化并密封的。

### The Task
### 任务内容

Identical to Round 7, on purpose — this is the only way to get a clean cross-round read on the 35B-A3B incumbent.
与第七轮完全相同，这是为了能够清晰地对比 35B-A3B 卫冕选手的跨轮表现。

**Goal:** Add a Tag Manager to the /admin section.
**目标：** 在 /admin 部分添加一个标签管理器。

**Requirements:**
**要求：**
*   `lib/tags.ts` — read all tags from published and draft posts (gray-matter)
*   `GET /api/admin/tags` — JSON list of tags with post counts
*   `PUT /api/admin/tags/{tag}` — rename a tag across all posts
*   `DELETE /api/admin/tags/{tag}` — remove a tag from all posts
*   `/admin/tags` page — list with inline rename/delete
*   Link `/admin/tags` from the admin nav
*   Screenshot of the finished page in the PR description, via Playwright MCP
*   `npm run build` must pass before any commit
*   Commit in logical chunks, push the branch

Same nine requirements. Same baseline commit. Same "no hand-holding" philosophy — the only messages I sent mid-run were a bare "continue" when a session paused at a harness turn-limit, never a hint about what to do next.
同样的九项要求。同样的基准提交。同样的“不手把手教学”原则——我在运行过程中发送的唯一消息是在会话因测试框架轮次限制而暂停时发送的简单的“继续”，从不提示下一步该做什么。

### Interlude: The Infrastructure Fought Back Twice
### 插曲：基础设施的两次反击

This is the part that wasn't in the plan. Two of the five models — Qwythos-9B and Nemotron-3-Nano — failed their very first request with a hard error before ever seeing the actual task. Both failures traced back to llama.cpp's automatic tool-call parser, and both required extracting the model's raw jinja chat template out of the GGUF metadata and hand-patching it.
这是计划外的一部分。五个模型中的两个——Qwythos-9B 和 Nemotron-3-Nano——在看到实际任务之前，就在第一次请求时出现了严重错误。这两个故障都追溯到 llama.cpp 的自动工具调用解析器，都需要从 GGUF 元数据中提取模型的原始 jinja 聊天模板并手动修补。

Qwythos-9B's bug: its embedded template unconditionally raises `Jinja Exception: System message must be at the beginning` the moment it sees a second system-role message. Coder always sends two — its own agent prompt, then a workspace-context note — so every single request 400'd before the model ever ran. The template's own author clearly didn't anticipate a harness that layers system messages.
Qwythos-9B 的漏洞：其嵌入式模板在看到第二条系统角色消息时，会无条件抛出 `Jinja Exception: System message must be at the beginning`。Coder 总是发送两条消息——它自己的代理提示词，然后是工作区上下文说明——因此每个请求在模型运行前都报 400 错误。模板作者显然没有预料到会有分层系统消息的测试框架。

Fix: pull the template via the server's `/props` endpoint, patch the three-line conditional block that renders the first system message but raises on the second, and reload with `--chat-template-file` pointing at the patched copy. Verified the patch preserved the model's native Claude/Anthropic-style `<tool_call><function=...>` format — this wasn't a case of stripping tool support to dodge the crash.
修复方案：通过服务器的 `/props` 端点提取模板，修补那个渲染第一条系统消息但在第二条时报错的三行条件代码块，并使用指向修补后副本的 `--chat-template-file` 重新加载。验证了修补程序保留了模型原生的 Claude/Anthropic 风格 `<tool_call><function=...>` 格式——这不是通过剥离工具支持来规避崩溃。

Nemotron-3-Nano's bug was subtler. The historical config used a `--special` flag that causes the model's `<|im_end|>` stop token to print as literal output text instead of being silently consumed — which broke the auto-derived tool-call parser with a `500: unparsed peg-native output error`. The existing workaround was overriding the template entirely with a generic chatml template. That avoided the crash, but the generic template doesn't render the tools list into the prompt at all — so the model couldn't see what functions existed, and it hallucinated plausible-sounding ones (ls, pwd) that didn't match anything I'd actually provided.
Nemotron-3-Nano 的漏洞更微妙。历史配置使用了 `--special` 标志，导致模型的 `<|im_end|>` 停止标记被打印为字面输出文本，而不是被静默消耗——这导致自动派生的工具调用解析器出现 `500: unparsed peg-native output error`。现有的解决方法是用通用的 chatml 模板完全覆盖原模板。这避免了崩溃，但通用模板根本不会将工具列表渲染到提示词中——因此模型无法看到存在哪些函数，并幻觉出了一些听起来合理（如 ls, pwd）但与我实际提供的任何函数都不匹配的函数。

Fix: drop `--special`, keep the real native template with tool-schema injection intact. Verified — repeated tests produced correctly parsed, correctly-named tool calls. Both fixes worked. I confirmed each one with direct API tests before sending a single task prompt. Both models still failed the actual bakeoff task anyway — though as it turns out, I could only fully confirm one of those two follow-up failures was really the model's fault. More on that below.
修复方案：去掉 `--special`，保留带有工具模式注入的真实原生模板。验证通过——重复测试产生了正确解析、正确命名的工具调用。两个修复方案都奏效了。在发送任何任务提示之前，我通过直接 API 测试确认了每一个修复。但这两个模型最终还是在实际比赛任务中失败了——尽管事实证明，我只能完全确认其中一个后续失败确实是模型本身的错。详情见下文。

### The Results
### 比赛结果

| Model | Messages | Total Tokens | Interventions | Outcome |
| :--- | :--- | :--- | :--- | :--- |
| Qwen 3.6 27B | 304 | 7,967,497 | 8 (neutral) | Complete — PR #19, 4 commits |
| Qwen 3.6 35B-A3B | 237 | 5,592,314 | 5 (neutral) | Complete — PR #20, 5 commits — best run |
| Qwythos-9B | 14 | 76,605 | 2 (neutral) | Failed — never executed a real tool call |
| GLM-4.7-Flash | 246 | 4,951,774 | 3 neutral + 1 correction | Complete — PR #21, 1 commit |
| Nemotron-3-Nano | 165 | 2,302,880 | 4 (neutral) | Failed — never found the repo |
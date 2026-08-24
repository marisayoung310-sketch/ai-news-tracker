---
title: "We Got the Prompt Cache Working. Our Pipeline Got Slower."
originalUrl: "https://dev.to/terum/we-got-the-prompt-cache-working-our-pipeline-got-slower-265f"
date: "2026-07-25T22:19:06.658Z"
---

# We Got the Prompt Cache Working. Our Pipeline Got Slower.
# 我们启用了 Prompt 缓存，但流水线反而变慢了。

"You're spawning a fresh codex exec for every single call? Just run the app-server and reuse a thread. The prompt cache alone will pay for it." That sentence sounds so obviously right that nobody ever benchmarks it.
“你还在为每一次调用都启动一个新的 codex exec 进程吗？直接运行 app-server 并复用线程吧。光是 Prompt 缓存带来的收益就足以抵消成本了。”这句话听起来如此正确，以至于没人会去进行基准测试。

We run a small bazaar of headless AI daemons — designers, reviewers, code workers — and each one shells out to OpenAI's Codex CLI dozens of times per work item. A resident codex app-server --stdio with warm threads looked like free money.
我们运行着一组小型无头 AI 守护进程——包括设计师、审查员和代码工作者——每一个进程在处理单个工作项时，都会调用数十次 OpenAI 的 Codex CLI。一个带有预热线程的常驻 codex app-server --stdio 看起来就像是白捡的便宜。

We measured it four times. The prompt cache eventually hit 86% on the turns that mattered. The pipeline got slower than the boring baseline, and 39% more expensive in raw tokens. This is the story of why, and of what app-server is actually for.
我们进行了四次测量。在关键的轮次中，Prompt 缓存命中率最终达到了 86%。但流水线运行速度却比原本枯燥的基准方案更慢，且原始 Token 消耗增加了 39%。这就是背后的故事，以及 app-server 真正的用途。

The setup was deliberately minimal: no resident daemon, no pool. The server is spawned privately for one formation, runs its turns, and is killed by a context manager on the way out — success or crash. That keeps the comparison honest: same lifecycle as a subprocess, and adopting it stays a measurement problem instead of an architecture debate.
测试环境被刻意保持在最小化：没有常驻守护进程，没有线程池。服务器仅为一次任务私有启动，运行完所有轮次后，由上下文管理器在退出时将其销毁——无论成功还是崩溃。这保证了对比的公平性：与子进程拥有相同的生命周期，将其引入仅是一个测量问题，而非架构之争。

### Trusting the probe
### 信任探测器

Before writing any integration, we cloned the actual openai/codex source and pointed a probe at a real app-server: handshake, per-turn sandbox overrides, interrupts, forks, kill-and-resume. Eight checks, all green, plus three findings you won't find in any docs:
在编写任何集成代码之前，我们克隆了真实的 openai/codex 源码，并用探测器指向一个真实的 app-server：进行握手、每轮沙箱覆盖、中断、分叉、杀死并恢复。八项检查全部通过，此外还有三项你在任何文档中都找不到的发现：

*   cwd and sandboxPolicy are sticky when omitted — every turn must re-state them explicitly, or turn 3 silently inherits turn 2's write access.
*   cwd 和 sandboxPolicy 在省略时具有粘性——每一轮都必须显式重新声明，否则第 3 轮会静默继承第 2 轮的写入权限。
*   Token usage arrives on thread/tokenUsage/updated, not on turn/completed.
*   Token 使用量是通过 thread/tokenUsage/updated 事件返回的，而不是在 turn/completed 事件中。
*   An empty thread that never ran a turn is never materialized — you cannot resume it later. Pre-warming a thread pool is a trap.
*   从未运行过任何轮次的空线程永远不会被实例化——你无法在稍后恢复它。预热线程池是一个陷阱。

And the seductive one: on the probe's trivial two-turn thread, turn 2 reported 15,104 cached input tokens. See? The cache works. Ship it. That number cost us three more measurement runs to un-believe.
还有一个诱人的发现：在探测器简单的两轮线程中，第 2 轮报告了 15,104 个缓存的输入 Token。看吧？缓存生效了。发布吧。为了推翻这个数字，我们又多跑了三次测量。

### The four runs
### 四次运行

Same fixture repo, same greenfield request, one real four-stage formation each:
使用相同的测试仓库、相同的全新请求，以及每个阶段真实的四步编排：

| | A: codex exec (baseline) | B: app-server | C: + unified schema | D: + prompt slimming |
| :--- | :--- | :--- | :--- | :--- |
| **wall** | 204.4 s | 137.5 s | 205.1 s | 218.0 s |
| **processes spawned** | 4 | 1 | 1 | 1 |
| **raw total tokens** | 79,640 | 111,855 | 115,062 | 110,385 |
| **cached share** | 0% | 0% | 66.4% | 69.7% (85.8% on turns 2–4) |
| **output quality** | pass | pass | pass | pass |

Run B — the naive port. One server, one thread, four turns. 33% faster. And the cache that the probe promised? Zero. On every turn.
运行 B——简单的迁移。一个服务器，一个线程，四轮调用。速度快了 33%。但探测器承诺的缓存呢？为零。每一轮都是如此。

The cache autopsy was the best part. The structured-output JSON schema is rendered into the model's context before the system message — it is part of the cached prefix. Our four stages each pass a different schema, so every turn invalidated the entire prefix. A controlled micro-test confirmed it: keep the schema identical across turns and 90.8% of the input comes back cached. The probe's trivial turns had shared one schema by accident. Real formations never did.
缓存分析是最好玩的部分。结构化输出的 JSON Schema 在系统消息之前被渲染到模型的上下文中——它是缓存前缀的一部分。我们的四个阶段每个都传递了不同的 Schema，因此每一轮都导致整个前缀失效。受控的微测试证实了这一点：保持各轮次的 Schema 一致，90.8% 的输入就能被缓存。探测器简单的测试轮次只是偶然共享了同一个 Schema，而真实的编排从未做到过。

Run C — one unified envelope schema for all four stages, per-stage validation moved client-side. The cache came alive: 66% overall. The speedup died: wall time back to baseline. And raw tokens were now 44% above baseline, because the thread history accumulates every previous turn on top of the prior-stage results we were still embedding in each prompt. We were paying for the same context twice.
运行 C——为所有四个阶段使用统一的封装 Schema，并将各阶段的验证移至客户端。缓存生效了：整体命中率 66%。但速度提升消失了：总耗时回到了基准水平。原始 Token 消耗比基准高出 44%，因为线程历史记录累积了每一轮的结果，而我们仍然在每个 Prompt 中嵌入了前一阶段的结果。我们为相同的上下文付了两次钱。

Run D — so remove the embeddings and let the thread history carry the context. That is the endgame everyone imagines when they say "reuse the thread." Input dropped by… 4.7%. The history already contains everything the embeddings contained — deleting the copy you control does nothing about the copy the thread keeps for you. Cache share peaked at 85.8% on turns 2–4. Wall time: slowest of all four runs.
运行 D——移除嵌入内容，让线程历史记录承载上下文。这就是每个人在说“复用线程”时所想象的终极方案。输入 Token 仅下降了 4.7%。历史记录已经包含了嵌入内容中的所有信息——删除你控制的副本，对于线程为你保留的副本毫无影响。缓存命中率在第 2-4 轮达到 85.8% 的峰值。总耗时：四次运行中最慢的。

Cache and speed never composed. The only fast run was the one with zero cache. The cheapest run was the boring baseline.
缓存和速度从未兼得。唯一快速的运行是缓存为零的那次。最便宜的运行是那个枯燥的基准方案。

### So what is app-server for?
### 那么 app-server 到底有什么用？

Look at what the protocol actually offers: thread/list, thread/resume, thread/fork, turn/interrupt, fine-grained delta notifications, live token-usage updates. That is not a batch accelerator. That is the backend of an interactive session — an IDE extension, a chat panel. A human watching streamed output, hitting stop, branching a conversation, reopening yesterday's session.
看看该协议实际提供了什么：线程列表、线程恢复、线程分叉、轮次中断、细粒度的增量通知、实时 Token 使用更新。这不是批处理加速器。这是交互式会话的后端——比如 IDE 插件、聊天面板。人类用户看着流式输出，点击停止，分支对话，重新打开昨天的会话。

Model latency is identical either way (we measured 3.58 s vs 3.64 s per turn). The only thing a resident server amortizes for a headless pipeline is ~0.17 s of process startup. Meanwhile its headline feature — the thread that remembers everything — is precisely what an auditable multi-agent system must refuse: our provenance lives in git commits and CUE records, not in a model's conversational memory. A hidden transcript that influences output is not a cache. It is unaccounted state.
无论哪种方式，模型延迟都是一样的（我们测得每轮 3.58 秒对比 3.64 秒）。常驻服务器为无头流水线分摊的唯一成本就是约 0.17 秒的进程启动时间。与此同时，它最主打的功能——那个“记住一切”的线程——恰恰是可审计的多智能体系统必须拒绝的：我们的溯源信息存在于 Git 提交和 CUE 记录中，而不是模型的对话记忆里。一个影响输出的隐藏记录不是缓存，而是未被记录的状态。

For headless one-shot work, codex exec isn't the naive option. It is the designed-for option.
对于无头的单次任务，codex exec 并不是一种“幼稚”的选择，而是它本该被使用的设计初衷。

### What we kept
### 我们保留了什么

The dormant pilot (opt-in behind an env var, default off), the measurement rig (four reproducible drivers), and — honestly the best return on the whole detour — the bug harvest from reading the source instead of the README:
我们保留了休眠的试点方案（通过环境变量开启，默认关闭）、测量装置（四个可复现的驱动程序），以及——老实说，这是整个绕路过程中最大的收获——通过阅读源码而非 README 所发现的 Bug：

*   exec resume rebuilds config from the current invocation. Omit --sandbox workspace-write on resume and your coder resumes read-only. Omit nothing, ever; centralize command construction.
*   exec resume 会根据当前调用重建配置。如果在恢复时省略 --sandbox workspace-write，你的编码器将以只读模式恢复。永远不要省略任何参数；请集中化管理命令构建。
*   --ephemeral sessions are never registered in the thread store. Resuming one is not "flaky" — it is impossible by design.
*   --ephemeral 会话永远不会在线程存储中注册。恢复此类会话不是“不稳定”——而是设计上就不可能。
*   Structured output requires required to list every key in properties, recursively. One optional property = HTTP 400 on every real call, while your mocked tests stay green. Translate provider-side contracts into local red tests.
*   结构化输出要求递归列出 properties 中的每一个键。一个可选属性会导致每次真实调用都返回 HTTP 400，而你的模拟测试却显示通过。请将提供商侧的契约转化为本地的失败测试（Red Tests）。
*   Reconnect chatter arrives as JSONL error events on stdout. If your liveness monitor counts them as heartbeats, a dead upstream with a chatty client is immortal. Diagnostics are not liveness.
*   重连的闲聊信息会作为 JSONL 错误事件出现在 stdout 上。如果你的存活监控将其计为心跳，那么一个死掉的上游配合一个话痨客户端就会变得“永生”。诊断信息不等于存活状态。

Four runs, one conclusion: measure before you migrate — and when a feature's headline benefit is your architecture's anti-feature, no benchmark will rescue it. The benchmark's job is to let you stop wanting it.
四次运行，一个结论：迁移前先测量——当一个功能的主打优势恰好是你架构的“反功能”时，任何基准测试都救不了它。基准测试的作用是让你不再想要它。
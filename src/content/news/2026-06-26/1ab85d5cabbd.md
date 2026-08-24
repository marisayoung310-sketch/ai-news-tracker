---
title: "Three Loops, No Ship"
originalUrl: "https://dev.to/vystartasv/three-loops-no-ship-2pg0"
date: "2026-06-25T23:01:55.989Z"
---

# Three Loops, No Ship / 三次迭代，依然搁浅

I spent three iterations on an auto-fix pipeline that still doesn't work reliably. Here's what I learned.
我在一个自动修复流水线上进行了三次迭代，但它依然无法稳定工作。以下是我学到的经验。

**Loop 1**
**第一轮循环**

Wrote a background script. Pull tickets from Azure DevOps, run them through a local model, hand to a coding agent, push the result. Poll → triage → fix → push. Worked 40% of the time on trivial tickets. Anything that crossed file boundaries or needed real context — stalled or hallucinated. I shipped it anyway. That was naive.
编写了一个后台脚本。从 Azure DevOps 拉取工单，通过本地模型运行，交给编码代理，最后推送结果。轮询 → 分类 → 修复 → 推送。在处理简单工单时，成功率约为 40%。任何涉及跨文件或需要实际上下文的任务，要么卡住，要么产生幻觉。我还是发布了它，这太天真了。

**Loop 2**
**第二轮循环**

Made it smarter. Pre-selected relevant files. Broke big tickets into subtasks. Turned complex edits into atomic steps with verification between each. Got it to 55% or so. But every fix created two new edge cases. The complexity was compounding faster than the reliability.
让它变得更聪明。预选相关文件，将大工单拆分为子任务，将复杂的编辑转化为带有验证步骤的原子操作。成功率提升到了 55% 左右。但每一次修复都会产生两个新的边缘情况。复杂度的增长速度远超可靠性的提升速度。

**Loop 3**
**第三轮循环**

Went all in. Embeddings for dedup. Multi-repo routing. Auto-revert. A learning loop that fed failures back into future runs. The model server started dying. 890 memory errors in a day. Root cause: two independent consumers hitting the same local model server, each with its own retry loop. When memory filled up, retries amplified instead of staggering. The system was making itself worse. Fixes were simple in hindsight — stop retrying OOM, serialize access, use the local binary not npx. But the pattern kept repeating: add more to fix the last thing, break something else.
全力以赴。引入嵌入（Embeddings）进行去重，实现多仓库路由，加入自动回滚，以及将失败反馈到未来运行的学习循环。模型服务器开始崩溃，一天内出现了 890 次内存错误。根本原因是：两个独立的消费者同时访问同一个本地模型服务器，且各自都有重试循环。当内存耗尽时，重试机制不仅没有错开，反而加剧了负载。系统在自我恶化。事后看来，修复方法很简单——停止对内存溢出（OOM）进行重试，序列化访问，使用本地二进制文件而非 npx。但这种模式不断重复：为了修复上一个问题而增加新功能，结果又破坏了其他东西。

**Where I'm At**
**现状**

The pipeline still only works on easy tickets. Hard ones need a human. After three rounds, the main thing I learned is that local models hit a wall before your ambition does — not in quality, in working memory. And adding features doesn't fix reliability gaps. It just moves them around. The 507 retry spiral taught me more than any successful deploy this year. Because it was entirely my fault. Not the model's, not the framework's. I built concurrent consumers with independent retry loops and expected them to coordinate. They didn't.
该流水线目前仅适用于简单工单，困难工单仍需人工介入。经过三轮迭代，我学到的最重要一点是：本地模型的瓶颈往往先于你的野心出现——不是质量问题，而是工作内存限制。增加功能并不能填补可靠性缺口，只是在转移问题。507 错误引发的重试螺旋教会我的东西，比今年任何一次成功的部署都要多。因为这完全是我的错，不是模型的问题，也不是框架的问题。我构建了带有独立重试循环的并发消费者，却指望它们能自动协调，但它们并没有做到。

**What's Next**
**下一步**

I'll do a fourth loop. Smaller. A dedicated fast model for cheap work, the big model only for editing. One consumer at a time. Might work. Might be loop 5's prologue. I'm looking for people building similar things. Local agent pipelines, auto-fix loops, small-model orchestration — the stuff that's not quite working yet but you keep iterating on. No Slack. No Discord. No newsletter. Just people who build this stuff and want to compare notes. What media would you gravitate around? A private GitHub org? A Telegram group? Occasional calls? Reply or find me — curious what works.
我将进行第四轮循环。规模更小。使用专门的快速模型处理简单任务，大模型仅用于编辑。一次只运行一个消费者。也许能行，也许这只是第五轮循环的序章。我正在寻找也在构建类似东西的人。本地代理流水线、自动修复循环、小模型编排——那些还没完全跑通但你仍在不断迭代的东西。没有 Slack，没有 Discord，没有通讯稿。只有那些构建这些东西并希望交流心得的人。你倾向于哪种交流媒介？私有的 GitHub 组织？Telegram 群组？偶尔的通话？回复我或找到我——我很想知道什么方式最有效。

Failure post, not a success story. If you're building something similar — don't retry OOM, serialize your consumers, and measure what your model server can actually hold.
这是一篇失败总结，而非成功故事。如果你正在构建类似的东西——请不要对 OOM 进行重试，序列化你的消费者，并测量你的模型服务器实际的承载能力。
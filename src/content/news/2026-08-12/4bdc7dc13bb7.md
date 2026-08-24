---
title: "My AI Agent Captured the Flag. Then the Platform Refused to Accept It."
originalUrl: "https://dev.to/xenocoregiger31/my-ai-agent-captured-the-flag-then-the-platform-refused-to-accept-it-1d7b"
date: "2026-08-11T22:24:19.227Z"
---

# My AI Agent Captured the Flag. Then the Platform Refused to Accept It.
# 我的 AI 智能体成功夺旗，但平台却拒绝承认

Today was a good day and a weird day, in that order. The good part: the autonomous pentest agent I've been building — I call it HALO — went from "runs a bunch of tools and hopes" to an actual web-recon → web-attack → flag-capture pipeline that pulled real flags out of a live target. The weird part: it captured flags on VulnBegin, and then, when it came time to actually submit them, they wouldn't take. Not an error. Not a crash. Just… rejected. I want to write down both halves honestly, because the second half is the more interesting engineering lesson, and it's the one I'd have skipped past a few months ago.

今天过得既美好又诡异，顺序正是如此。美好之处在于：我一直在构建的自主渗透测试智能体（我称之为 HALO）已经从“运行一堆工具并祈祷”进化为一套真正的“Web 侦察 → Web 攻击 → 夺旗”流水线，并从实时目标中成功获取了真实的旗帜（Flag）。诡异之处在于：它在 VulnBegin 上捕获了旗帜，但当我尝试提交时，平台却不予接受。没有报错，没有崩溃，只是……被拒绝了。我想诚实地记录下这两部分，因为后半部分是更有趣的工程经验，也是几个月前的我会直接跳过的内容。

### What actually shipped today
### 今天实际交付了什么

A few concrete milestones, roughly in the order they unblocked each other:
The arsenal went from 31 tools to 42. I wired in a chunk of web + OSINT tooling — content discovery, subdomain enumeration, template scanning, XSS probing, passive URL collection. The point wasn't "more tools = better." It was to give the agent enough of a web-attack surface that it could go from host to flag without me babysitting each step.

几个具体的里程碑，大致按它们相互解锁的顺序排列：
工具库从 31 个增加到了 42 个。我接入了一系列 Web 和 OSINT 工具——包括内容发现、子域名枚举、模板扫描、XSS 探测和被动 URL 收集。重点不在于“工具越多越好”，而是为了给智能体提供足够的 Web 攻击面，让它无需我每一步都盯着就能从主机一路攻到旗帜。

I stopped the silent hangs. This one cost me the most time and had the dumbest root cause. A couple of the Go-based scanners would just… hang. No output, no error, they'd ride the timeout all the way to the wall and die with nothing. I'd assumed it was a networking or a binary-compatibility problem and chased that for way too long. It wasn't. The agent runs as an MCP server over stdio — meaning the server's own stdin is the JSON-RPC pipe the whole system talks over. When I spawned a child scanner, it inherited that stdin, tried to read from it, and blocked forever waiting on a pipe that was never going to feed it. One line — `stdin=subprocess.DEVNULL` on the subprocess call — took one scanner from a 60-second timeout to a 1-second run. That's the whole fix. I'm still a little mad about how long it took to find.

我解决了静默挂起的问题。这个问题耗费了我最多的时间，且根本原因极其愚蠢。几个基于 Go 的扫描器总是会……挂起。没有输出，没有报错，它们会一直运行到超时，然后悄无声息地终止。我曾以为是网络或二进制兼容性问题，并为此纠结了太久。其实不然。该智能体作为 MCP 服务器通过 stdio 运行——这意味着服务器自身的 stdin 是整个系统通信所用的 JSON-RPC 管道。当我启动子扫描器时，它继承了该 stdin，试图从中读取数据，结果因为等待一个永远不会有输入的管道而永久阻塞。只需一行代码——在子进程调用中加入 `stdin=subprocess.DEVNULL`——就让一个扫描器从 60 秒超时变成了 1 秒运行。修复就是这么简单。我到现在还在为花这么久才发现它而感到恼火。

A pile of invocation fixes. Small, unglamorous, necessary: a resolver that reads targets from stdin instead of a flag it silently ignored; dropping a scan flag that was quietly adding 20 seconds per run; making one tool resolve hostnames to IPs because it flatly refuses DNS names; pointing a content-discovery tool at a content wordlist instead of, embarrassingly, a password list. None of these are clever. All of them were the difference between "the pipeline works" and "the pipeline looks like it works and returns nothing."

一堆调用修复。琐碎、枯燥但必要：一个从 stdin 读取目标而不是从被静默忽略的 flag 中读取的解析器；删掉了一个每次运行悄悄增加 20 秒耗时的扫描标志；让一个工具将主机名解析为 IP，因为它完全拒绝 DNS 名称；将内容发现工具指向内容字典，而不是（尴尬地）指向密码字典。这些都不算聪明，但它们决定了流水线是“真正工作”还是“看起来在工作却什么都没返回”。

361 tests, green. Every branch of the flag-capture logic is mocked and asserted — which tool fires when, what short-circuits on a capture, what escalates when there's no flag yet. No live traffic in the test suite. That mattered a lot today, because it meant I could refactor the pipeline mid-engagement without wondering whether I'd broken the thing that finds flags.

361 个测试全部通过。夺旗逻辑的每一个分支都经过了模拟和断言——哪个工具何时触发、捕获时如何短路、没有旗帜时如何升级。测试套件中没有实时流量。这在今天非常重要，因为它意味着我可以在渗透过程中重构流水线，而不必担心是否破坏了寻找旗帜的功能。

The shape of the pipeline, if you're curious: engage runs deterministic web recon first (I don't let the model choose to skip recon — it doesn't get a vote), then a port sweep, then the active web attack — content discovery, a sweep of likely flag locations and any newly discovered paths, then template and XSS scanning. Every single tool's output gets scanned for flag patterns. First hit short-circuits the slower generic loop and raises a very satisfying banner.

如果你好奇的话，流水线的形态如下：engage 首先运行确定性的 Web 侦察（我不让模型选择跳过侦察——它没有投票权），然后是端口扫描，接着是主动 Web 攻击——内容发现、对可能存在旗帜的位置及任何新发现路径的扫描，最后是模板和 XSS 扫描。每一个工具的输出都会被扫描以匹配旗帜模式。一旦命中，就会立即短路较慢的通用循环，并弹出一个令人满意的横幅。

### And then it caught one
### 然后，它抓到了一个

It worked. The pipeline pulled flag-shaped tokens off VulnBegin — a paid, Advanced-tier challenge hub I've been grinding on. (I'm going to be deliberately vague about the specifics here; it's someone's paid content, and spoiling the solution or dumping the flags would be a jerk move.) I want to be precise about what "it worked" means, though, because this is where it gets good. The agent extracted strings that matched the flag format. It logged them. As far as the agent was concerned, it had won. The platform disagreed.

成功了。流水线从 VulnBegin 上提取出了旗帜格式的令牌——这是一个我一直在攻克的付费高级挑战平台。（我在这里会刻意模糊细节；这是别人的付费内容，剧透答案或泄露旗帜是非常不道德的行为。）不过，我想精确定义一下“成功了”意味着什么，因为好戏才刚刚开始。智能体提取出了符合旗帜格式的字符串，并记录了下来。在智能体看来，它已经赢了。但平台并不这么认为。

### The bug: captured, but wouldn't commit
### Bug：捕获了，但无法提交

I submitted what it found. Rejected. Tried the next one. Rejected. No error message worth anything — the platform just didn't accept them as valid answers. Here's the thing: I don't fully know why yet. So instead of pretending I do, here are the live hypotheses, roughly in order of how much I believe them:

我提交了它找到的内容。被拒绝。尝试下一个。被拒绝。没有任何有价值的错误信息——平台只是不接受它们作为有效答案。问题在于：我目前还不完全清楚原因。所以，与其假装知道，不如列出我目前的假设，按我认可的可能性排序：

1. **The instance rotated out from under me.** This hub spawns randomized, short-lived instances — they time out on the order of ~45 minutes. If the agent captured a flag from one instance and I submitted after that instance expired and got replaced, the platform is validating against a different live instance whose flag is different. The token was real; it was just real for a box that no longer exists. This is my leading theory, and it's uncomfortably close to a bug I logged today for a different reason — I had a tool cheerfully hammering a target whose scope had already expired, because the agent has no concept of "the engagement is over, stop." Same blind spot, two symptoms.

1. **实例在我不知情的情况下轮换了。** 该平台会生成随机的、短寿命的实例——它们大约在 45 分钟左右超时。如果智能体从一个实例中捕获了旗帜，而我在该实例过期并被替换后才提交，平台就会针对另一个旗帜不同的实时实例进行验证。令牌是真的，但它只对一个已经不存在的机器有效。这是我目前最倾向的理论，它与我今天因另一个原因记录的 Bug 非常相似——我有一个工具在欢快地攻击一个已经过期的目标，因为智能体没有“任务已结束，请停止”的概念。同样的盲点，两种症状。

2. **It caught a decoy.** Good challenges plant decoy flags — strings that match the format exactly and are placed somewhere findable specifically to waste your time. My flag-extraction regex is format-based. It cannot tell a real flag from a well-made fake. If the agent grabbed a decoy, it would look like a clean capture and fail every submission, forever.

2. **它抓到了诱饵。** 优秀的挑战会设置诱饵旗帜——这些字符串完全符合格式，被放置在容易找到的地方，专门用来浪费你的时间。我的旗帜提取正则表达式是基于格式的，它无法区分真旗帜和精心制作的假旗帜。如果智能体抓到了诱饵，它看起来就像是一次完美的捕获，但提交永远会失败。

3. **Format/normalization drift.** The captured string might carry a wrapper, trailing whitespace, or an encoding artifact from however it was embedded in the page, so the exact bytes I submitted didn't match the exact bytes the platform expects. This one's easy to test and easy to fix if it's the cause — and easy to rule out, which is why it's on the list even though I doubt it.

3. **格式/归一化偏差。** 捕获的字符串可能带有包装符、尾随空格，或者由于其嵌入页面的方式而产生的编码伪影，导致我提交的精确字节与平台预期的字节不匹配。这一点很容易测试和修复——如果这是原因的话，也很容易排除，所以我把它列在清单上，尽管我对此表示怀疑。

4. **Right format, wrong path.** I was running generic wordlists today, not lists tuned to this challenge. Generic lists surface the obvious, low-value stuff — login pages, a predictable directory or two — and miss the actual flag path entirely. So it's entirely possible the agent captured a flag-shaped thing that was never the answer, because it never found where the answer lived.

4. **格式正确，路径错误。** 我今天运行的是通用字典，而不是针对此挑战优化的字典。通用字典只能发现显而易见的低价值内容——比如登录页面、一两个可预测的目录——而完全错过了真正的旗帜路径。因此，完全有可能智能体捕获了一个旗帜形状的东西，但它根本不是答案，因为它从未找到答案真正所在的地方。

5. **Session-bound validation.** Some platforms bind a flag to your auth...
5. **会话绑定验证。** 一些平台将旗帜与你的身份验证绑定……
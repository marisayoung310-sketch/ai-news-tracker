---
title: "Who does Anubis actually stop?"
originalUrl: "https://fzakaria.com/2026/07/09/who-does-anubis-actually-stop"
date: "2026-07-12T22:14:50.774Z"
---

# Who does Anubis actually stop?
# Anubis 到底拦截了谁？

I have been working on a patch to the Linux kernel to support $ORIGIN for the interpreter (PT_INTERP) via bpf in binfmt_misc [thread]. Of course I’m leveraging an LLM to help me do this! To pre-seed the context of the LLM, I asked it to read the https://lore.kernel.org/ thread. Uh oh. Looks like they have adopted Anubis, which is an HTTP proxy that requires proof-of-work before allowing access to the resource.
我一直在为 Linux 内核编写一个补丁，旨在通过 binfmt_misc 中的 bpf 为解释器 (PT_INTERP) 提供 $ORIGIN 支持 [线程]。当然，我正在利用大语言模型 (LLM) 来协助我完成这项工作！为了预先填充 LLM 的上下文，我让它读取 https://lore.kernel.org/ 上的线程。糟糕，看来他们采用了 Anubis，这是一个 HTTP 代理，要求在允许访问资源之前必须先完成工作量证明 (proof-of-work)。

Did this really do anything? Unfortunately, no. My AI diligently came up with anubis-fetch, which you can find at https://github.com/fzakaria/anubis-fetch. The tool tries to natively solve the proof of work or, as a last resort, will launch Chromium to visit the URL. This tool also impersonates a real Chrome TLS/JA3 fingerprint natively via req so it clears passive Cloudflare blocking too.
这真的起到作用了吗？遗憾的是，并没有。我的 AI 勤奋地编写出了 anubis-fetch，你可以在 https://github.com/fzakaria/anubis-fetch 找到它。该工具尝试原生解决工作量证明，或者作为最后手段，启动 Chromium 来访问该 URL。该工具还通过 req 原生模拟了真实的 Chrome TLS/JA3 指纹，因此它也能绕过 Cloudflare 的被动拦截。

☝️ # HTML to stdout $ anubis-fetch https://lore.kernel.org/linux-mm/some-thread/T/ # readable plain text $ anubis-fetch --text https://lore.kernel.org/linux-mm/some-thread/T/
☝️ # 输出 HTML 到标准输出 $ anubis-fetch https://lore.kernel.org/linux-mm/some-thread/T/ # 可读纯文本 $ anubis-fetch --text https://lore.kernel.org/linux-mm/some-thread/T/

So who did we stop? The exact adversary Anubis targets defeats it trivially. The whole use of Anubis feels regressive and marginalizes those without access to “good” AI. For a scraper, solving the Anubis challenge is a one-time, amortized-to-zero cost since the cookie can be cached and reused. For a human, it’s seconds of spinner, battery drain on every fresh visit. They can’t amortize anything amongst each other. This “regressive tax” is paid even more so by those with weaker devices or who access the content on their phone. Clients that don’t leverage JavaScript (e.g., text browsers (w3m/lynx), screen readers, RSS readers) are completely left out.
那么我们到底拦截了谁？Anubis 针对的对手可以轻而易举地击败它。使用 Anubis 的整个过程让人感觉是一种倒退，它边缘化了那些无法使用“优秀”AI 工具的人。对于爬虫来说，解决 Anubis 的挑战是一次性的、摊销成本几乎为零的操作，因为 Cookie 可以被缓存和重复使用。而对于人类来说，每次访问都要面对几秒钟的加载转圈和电池消耗。他们无法在彼此之间分摊任何成本。这种“累退税”对于那些设备性能较弱或通过手机访问内容的用户来说，负担更为沉重。那些不使用 JavaScript 的客户端（例如文本浏览器 w3m/lynx、屏幕阅读器、RSS 阅读器）则被完全拒之门外。

Did deploying Anubis stop any of the aforementioned bot-farms or are they mildly inconvenienced when they had to augment their bots to support a new proof of work solution briefly? The irony is that Anubis’s goal is to stop AI but it was incredibly easy for AI to circumvent it and yet the cost to humans and an open web remains.
部署 Anubis 是否阻止了上述任何机器人农场？还是说它们仅仅是在被迫升级机器人以支持新的工作量证明方案时，受到了轻微的困扰？讽刺的是，Anubis 的目标是阻止 AI，但 AI 却能极其轻松地绕过它，而人类和开放网络却依然要为此付出代价。

With the presumption Anubis is now a regressive tax, how much does it cost us? Every number here is a rough estimate. This is not a environmental argument at all since the bot-farmers and AI tools themselves are using many orders of magnitude more energy. Nevertheless, it’s interesting to see how much time is spent doing proof-of-work challenges that marginalize people.
假设 Anubis 现在是一种累退税，它到底让我们付出了多少代价？这里的每一个数字都是粗略估计。这绝不是一个关于环境的论点，因为机器人农场和 AI 工具本身消耗的能量要高出几个数量级。尽管如此，看看有多少时间被浪费在这些边缘化人类的工作量证明挑战上，还是很有趣的。

Difficulty d is the number of leading zero hex characters the hash must have, so the expected work per solve is W = 16^d hashes.
难度 d 是哈希值必须具备的前导零十六进制字符数，因此每次求解的预期工作量为 W = 16^d 次哈希运算。

| Difficulty | Hashes / solve | Go native | Browser JS | Felt wall-clock |
| :--- | :--- | :--- | :--- | :--- |
| 4 | 65,536 | ~1.3 ms | ~130 ms | ~1–5 s |
| 5 | 1,048,576 | ~20 ms | ~2 s | ~5–15 s |

| 难度 | 求解哈希数 | Go 原生 | 浏览器 JS | 实际感知耗时 |
| :--- | :--- | :--- | :--- | :--- |
| 4 | 65,536 | ~1.3 毫秒 | ~130 毫秒 | ~1–5 秒 |
| 5 | 1,048,576 | ~20 毫秒 | ~2 秒 | ~5–15 秒 |

Difficulty 4 is the common default. Rates assumed: ~50 MH/s native (Go), ~0.5 MH/s in-browser JS; “felt” wall-clock includes page load, the worker, and the reload.
难度 4 是常见的默认设置。假设速率：原生 (Go) 为 ~50 MH/s，浏览器内 JS 为 ~0.5 MH/s；“实际感知耗时”包括页面加载、Worker 运行和重载时间。

Let C be the number of Anubis challenge-solves per day, worldwide. Assume a felt time of t = 2 s and device energy E = 20 J per solve (screen + CPU).
设 C 为全球每天完成 Anubis 挑战的次数。假设实际感知耗时 t = 2 秒，每次求解的设备能耗 E = 20 焦耳（屏幕 + CPU）。

Human-time / year = C × t × 365 / 3.15×10⁷
Energy / year (kWh) = C × E × 365 / 3.6×10⁶

| C (solves/day) | Human-time wasted / year | Energy / year |
| :--- | :--- | :--- |
| 1 M | ~23 person-years | ~2 MWh |
| 10 M | ~230 person-years | ~20 MWh |
| 100 M | ~2,300 person-years | ~200 MWh |

| C (次/天) | 每年浪费的人类时间 | 每年能耗 |
| :--- | :--- | :--- |
| 100 万 | ~23 人年 | ~2 兆瓦时 |
| 1000 万 | ~230 人年 | ~20 兆瓦时 |
| 1 亿 | ~2,300 人年 | ~200 兆瓦时 |

Collectively we are wasting an impressive amount of time waiting for access to websites; time we didn’t spend before the AI era. As a human, time is precious and finite to me, whereas to a robot it is not.
我们集体浪费了惊人的时间在等待访问网站上；这些时间在 AI 时代之前是不存在的。作为人类，时间对我来说是宝贵且有限的，而对于机器人来说则不然。
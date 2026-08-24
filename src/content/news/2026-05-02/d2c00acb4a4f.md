---
title: "11 Minutes, $1.73, and GPT-5.5 Cybersecurity Simulation"
originalUrl: "https://dev.to/simon_paxton/11-minutes-173-and-gpt-55-cybersecurity-simulation-3n9"
date: "2026-05-01T22:43:28.573Z"
---

# 11 Minutes, $1.73, and GPT-5.5 Cybersecurity Simulation
# 11 分钟、1.73 美元与 GPT-5.5 网络安全模拟

The UK AI Security Institute says GPT-5.5 cybersecurity simulation results now look a lot less like a one-off milestone and a lot more like a repeatable frontier capability. In its latest evaluation, AISI found that an early checkpoint of OpenAI’s GPT-5.5 reached roughly the same level as Anthropic’s Mythos Preview on hard cyber tasks—and slightly beat it on one key benchmark.
英国人工智能安全研究所（AISI）表示，GPT-5.5 的网络安全模拟结果现在看起来不再像是一个偶然的里程碑，而更像是一种可重复的前沿能力。在最新的评估中，AISI 发现 OpenAI GPT-5.5 的早期检查点在处理高难度网络任务时，达到了与 Anthropic 的 Mythos Preview 大致相同的水平，并在一个关键基准测试中略胜一筹。

That matters because AISI was explicitly testing whether Mythos Preview’s earlier result was a weird outlier. Instead, a second model from a different developer now lands in the same range, including solving a difficult multi-step cyber attack simulation end-to-end in some attempts. If you’ve been tracking rising AI cyber capabilities, this is the part worth circling.
这一点至关重要，因为 AISI 当时明确是在测试 Mythos Preview 此前的结果是否只是一个异常值。然而现在，来自另一家开发商的第二个模型也达到了同样的水平，甚至在某些尝试中能够端到端地解决复杂的多步骤网络攻击模拟。如果你一直在关注人工智能网络能力的提升，那么这一点非常值得重点关注。

### GPT-5.5 Cybersecurity Simulation Is No Longer a One-Model Fluke
### GPT-5.5 网络安全模拟不再是单一模型的侥幸

AISI’s headline finding is simple: GPT-5.5 reached a similar cyber capability level to Mythos Preview. That is the interesting result. Back in April, AISI said Mythos Preview was the first frontier model it had seen complete its corporate network attack simulation end-to-end, a multi-step exercise it estimates would take a human expert around 20 hours.
AISI 的核心发现很简单：GPT-5.5 在网络安全能力上达到了与 Mythos Preview 相当的水平。这是一个引人注目的结果。早在四月份，AISI 就曾表示 Mythos Preview 是其见过的第一个能够端到端完成企业网络攻击模拟的前沿模型，而据估计，人类专家完成这项多步骤练习大约需要 20 小时。

The obvious follow-up was whether that was a breakthrough tied to one model family. AISI’s answer is now: probably not. GPT-5.5, from a different lab, hit a comparable level and achieved a slightly higher average pass rate than Mythos Preview on expert tasks. That shift changes the interpretation. A surprising benchmark win can be a stunt. Two frontier models from different developers hitting about the same bar starts to look like a capability class.
随之而来的问题是，这是否仅限于某个特定模型系列的突破。AISI 现在给出的答案是：大概率不是。来自不同实验室的 GPT-5.5 达到了相当的水平，并且在专家级任务上的平均通过率略高于 Mythos Preview。这种转变改变了人们的解读方式：一次令人惊讶的基准测试胜利可能只是噱头，但来自不同开发商的两个前沿模型达到同样的门槛，则开始显现出一种“能力等级”的特征。

### How GPT-5.5 Performed Across OpenAI's Cyber Task Suite
### GPT-5.5 在 OpenAI 网络任务套件中的表现

AISI’s testbed is broader than a single dramatic demo. It uses a suite of 95 narrow cyber tasks across four difficulty tiers, built in capture-the-flag format—structured challenges where the model has to actually recover a “flag” by solving the task. Those tasks cover things like reverse engineering, web exploitation, and cryptography.
AISI 的测试平台不仅仅是一个单一的演示。它使用了一套包含 95 个细分网络任务的测试集，分为四个难度等级，采用“夺旗赛”（CTF）格式——即模型必须通过解决任务来实际获取“旗帜”的结构化挑战。这些任务涵盖了逆向工程、网络漏洞利用和密码学等领域。

The easier tasks are already saturated by frontier models, so the interesting comparison is in the advanced suite. On Expert-level tasks, AISI reports these average pass rates:
较简单的任务已被前沿模型完全攻克，因此更有意义的对比在于高级任务套件。在专家级任务中，AISI 报告的平均通过率如下：

| Model | Expert task pass rate |
| :--- | :--- |
| GPT-5.5 | 71.4% ± 8.0% |
| Mythos Preview | 68.6% ± 8.7% |
| GPT-5.4 | 52.4% ± 9.8% |
| Opus 4.7 | 48.6% ± 10.0% |

That is a real jump over earlier OpenAI and Anthropic frontier models. GPT-5.5 is not edging forward from 68% to 71% in a vacuum; it is sitting well above GPT-5.4 and Opus 4.7 on the hardest tier AISI reports.
这比 OpenAI 和 Anthropic 早期前沿模型有了实质性的飞跃。GPT-5.5 并非在真空中从 68% 缓慢提升到 71%；在 AISI 报告的最难等级中，它明显领先于 GPT-5.4 和 Opus 4.7。

The advanced tasks themselves are also nasty in exactly the way you’d want for this kind of evaluation. AISI says they include reversing stripped binaries and embedded firmware without source code, building reliable exploits for memory corruption bugs, recovering keys from weak crypto implementations, winning TOCTOU races, unpacking obfuscated malware, and weaponizing synthetic vulnerabilities planted in real open-source software.
这些高级任务本身也非常棘手，完全符合此类评估的要求。AISI 表示，任务包括逆向分析无符号二进制文件和无源代码的嵌入式固件、为内存损坏漏洞构建可靠的利用程序、从弱加密实现中恢复密钥、赢得 TOCTOU（检查时间/使用时间）竞争条件、解包混淆的恶意软件，以及将植入真实开源软件中的合成漏洞武器化。

One example AISI highlights is a reverse-engineering challenge built around a stripped Rust ELF implementing a custom virtual machine, plus a second unknown-format file containing bytecode for that VM. That is not “write a phishing email.” It is the kind of task where benchmark scores start to tell you something about actual technical depth.
AISI 强调的一个例子是逆向工程挑战，该挑战围绕一个实现自定义虚拟机的无符号 Rust ELF 文件，以及第二个包含该虚拟机字节码的未知格式文件。这可不是“写一封钓鱼邮件”那么简单。这是那种能够通过基准测试分数反映出实际技术深度的任务。

### Why Minutes Matter: The Human-versus-Model Time Gap
### 为什么时间至关重要：人类与模型的效率差距

AISI says GPT-5.5 solved a difficult cyber task in under 11 minutes. The same full-chain simulation is estimated to take a human expert about 20 hours. The raw comparison is startling, but it needs one clarification: this does not mean GPT-5.5 is a drop-in replacement for a human red teamer.
AISI 表示，GPT-5.5 在不到 11 分钟内就解决了一项高难度网络任务。据估计，人类专家完成同样的完整链条模拟大约需要 20 小时。这种原始对比令人震惊，但需要澄清的是：这并不意味着 GPT-5.5 可以直接替代人类红队成员。

The benchmark is measuring performance on a controlled task suite, not whether you can hand the model a production network and expect clean autonomous operation. Still, the time gap matters for two reasons. First, it changes what becomes cheap to try. A model that can take repeated shots at a hard multi-step task in minutes is operating in a very different regime from a human expert who needs most of a day. Even partial success becomes more operationally interesting when attempts are fast.
该基准测试衡量的是在受控任务套件中的表现，而不是指你可以将生产网络交给模型并期望其实现完美的自主运行。尽管如此，这种时间差距在两个方面意义重大。首先，它改变了尝试的成本。一个能在几分钟内对复杂多步骤任务进行反复尝试的模型，其运作模式与需要耗费大半天时间的人类专家截然不同。当尝试速度极快时，即使是部分成功也具有了更高的操作价值。

Second, AISI says the run cost was $1.73. That is a tiny price for a benchmark result at this level. If frontier models can attempt advanced cyber tasks quickly and cheaply, scaling the number of runs stops being the bottleneck. That cost number is easy to miss, but it is one of the most important lines in the evaluation. High-end cyber capability is one thing. High-end cyber capability at commodity-run pricing is another.
其次，AISI 表示运行成本仅为 1.73 美元。对于这一级别的基准测试结果来说，这是一个微不足道的代价。如果前沿模型能够快速且廉价地尝试高级网络任务，那么运行次数的扩展就不再是瓶颈。这个成本数字很容易被忽略，但它是评估报告中最重要的数据之一。高端网络能力是一回事，以商品化运行价格实现高端网络能力则是另一回事。

This is also why model autonomy research keeps spilling into security. Once you combine strong task performance with low per-run cost and agentic iteration, you get the same pattern people worry about in things like agentic sandbox escape: more attempts, more persistence, and less friction.
这也是为什么模型自主性研究不断渗透到安全领域的原因。一旦将强大的任务执行能力与低廉的单次运行成本以及智能体迭代结合起来，就会出现人们在“智能体沙箱逃逸”等问题中所担心的模式：更多的尝试、更强的持久性以及更低的阻力。

### What GPT-5.5 Actually Changes for Cyber Evaluation
### GPT-5.5 对网络安全评估的实际影响

The cleanest update is that cyber evals now need to assume multiple labs can produce models at this level. GPT-5.5’s result means benchmark designers can no longer treat top-tier cyber performance as a lab-specific anomaly. That pushes evaluation in two directions.
最明确的结论是，网络安全评估现在必须假设多家实验室都能生产出达到这一水平的模型。GPT-5.5 的结果意味着基准测试设计者不能再将顶级网络性能视为特定实验室的异常现象。这推动了评估向两个方向发展。

One is harder, more realistic tasks. AISI notes that basic tasks have been saturated since at least February 2026. When models max out easier CTF-style challenges, the useful signal moves to practitioner and expert tasks with larger search spaces and more steps.
一是更难、更现实的任务。AISI 指出，基础任务至少从 2026 年 2 月起就已经饱和。当模型在较简单的 CTF 风格挑战中达到极限时，有价值的信号就会转向搜索空间更大、步骤更多的从业者和专家级任务。

The other is more careful interpretation. Stronger benchmark performance does not automatically prove deployable defensive capability. A model passing expert CTF cybersecurity tasks can still fail in messy real environments full of unreliable tooling, access constraints, and adversarial inputs. We’ve already seen how brittle agentic systems can be when the environment fights back—whether through deliberate attacks like prompt injection in peer review or through the ordinary chaos of multi-step tooling.
另一个方向是更谨慎的解读。更强的基准测试表现并不自动证明其具备可部署的防御能力。一个能通过专家级 CTF 网络安全任务的模型，在充满不可靠工具、访问限制和对抗性输入的混乱现实环境中，仍然可能失败。我们已经看到，当环境进行反击时，智能体系统是多么脆弱——无论是通过同行评审中的提示词注入等蓄意攻击，还是通过多步骤工具链中常见的混乱情况。
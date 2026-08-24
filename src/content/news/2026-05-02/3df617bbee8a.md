---
title: "GPT-5.5 matches heavily hyped Mythos Preview in new cybersecurity tests"
originalUrl: "https://arstechnica.com/ai/2026/05/amid-mythos-hyped-cybersecurity-prowess-researchers-find-gpt-5-5-is-just-as-good/"
date: "2026-05-01T22:21:00.183Z"
---

# GPT-5.5 matches heavily hyped Mythos Preview in new cybersecurity tests

**GPT-5.5 在最新网络安全测试中表现与备受炒作的 Mythos Preview 持平**

Last month, Anthropic made a big deal about the supposedly outsize cybersecurity threat represented by its Mythos Preview model, leading the company to restrict the initial release to “critical industry partners.” But new research from the UK’s AI Security Institute (AISI) suggests that OpenAI’s GPT-5.5, which launched publicly last week, reached “a similar level of performance on our cyber evaluations” as Mythos Preview, which the group evaluated last month.

上个月，Anthropic 大肆宣传其 Mythos Preview 模型所带来的巨大网络安全威胁，导致该公司将该模型的初始发布限制在“关键行业合作伙伴”范围内。但英国人工智能安全研究所（AISI）的最新研究表明，上周公开发布的 OpenAI GPT-5.5 在该机构的网络安全评估中，达到了与上个月评估的 Mythos Preview“相似的性能水平”。

Since 2023, the AISI has run a variety of frontier AI models through 95 different Capture the Flag challenges designed to test capabilities on cybersecurity tasks, such as reverse engineering, web exploitation, and cryptography. On the highest-level “Expert” tasks, GPT-5.5 passed an average of 71.4 percent, slightly higher than the 68.6 percent achieved by Mythos Preview (though within the margin of error).

自 2023 年以来，AISI 已经让多种前沿 AI 模型完成了 95 项不同的“夺旗”（Capture the Flag）挑战，旨在测试其在逆向工程、网络攻击和密码学等网络安全任务中的能力。在最高级别的“专家”任务中，GPT-5.5 的平均通过率为 71.4%，略高于 Mythos Preview 的 68.6%（尽管两者处于误差范围内）。

In one particularly difficult task that involved building a disassembler to decode a Rust binary, AISI notes that “GPT-5.5 solved the challenge in 10 minutes and 22 seconds with no human assistance at a cost of $1.73” in API calls. GPT-5.5 also matched Mythos Preview in its progress on “The Last Ones” (TLO), an AISI test range set up to simulate a 32-step data extraction attack on a corporate network. GPT-5.5 succeeded in 3 of 10 attempts on TLO, compared to 2 of 10 for Mythos Preview—no previous model had ever succeeded at the test even once.

在其中一项涉及构建反汇编程序以解码 Rust 二进制文件的极难任务中，AISI 指出：“GPT-5.5 在无人协助的情况下，仅用 10 分 22 秒就解决了该挑战，API 调用成本为 1.73 美元。” GPT-5.5 在“最后一人”（The Last Ones, TLO）测试中的进展也与 Mythos Preview 持平，该测试旨在模拟针对企业网络的 32 步数据提取攻击。GPT-5.5 在 10 次尝试中成功了 3 次，而 Mythos Preview 成功了 2 次——此前没有任何模型能在该测试中成功过一次。

But GPT-5.5 still fails at AISI’s more difficult “Cooling Tower” simulation of an attempted disruption of the control software for a power plant, as every previously tested AI model also has.

但 GPT-5.5 在 AISI 更高难度的“冷却塔”（Cooling Tower）模拟测试中依然失败，该测试模拟了对发电厂控制软件的破坏企图，此前所有测试过的 AI 模型也都未能通过该测试。

Is it just “fear-based marketing”? The new results for GPT-5.5 suggest that, when it comes to cybersecurity risk, Mythos Preview was likely not “a breakthrough specific to one model” but rather “a byproduct of more general improvements in long-horizon autonomy, reasoning, and coding,” AISI writes.

这仅仅是“基于恐惧的营销”吗？AISI 写道，GPT-5.5 的最新结果表明，在网络安全风险方面，Mythos Preview 可能并非“某个特定模型的突破”，而更像是“在长程自主性、推理和编码方面更广泛改进的副产品”。

In a recent interview with the Core Memory podcast, OpenAI CEO Sam Altman criticized what he calls “fear-based marketing” in promoting limited releases for certain AI models. While he said he’s “sure Mythos is a great model for cybersecurity,” he added that “it is clearly incredible marketing to say, ‘We have built a bomb. We are about to drop it on your head. We will sell you a bomb shelter for $100 million.’”

在最近接受 Core Memory 播客采访时，OpenAI 首席执行官山姆·奥特曼（Sam Altman）批评了他在推广某些 AI 模型限量发布时所称的“基于恐惧的营销”。虽然他表示“确信 Mythos 是一个出色的网络安全模型”，但他补充说：“声称‘我们制造了一枚炸弹，即将投在你的头上，我们要以 1 亿美元的价格卖给你一个防空洞’，这显然是一种令人难以置信的营销手段。”

“There will be a lot more rhetoric about models that are too dangerous to release,” Altman continued. “There will also be very dangerous models that will have to be released in different ways.”

“未来会有更多关于模型过于危险而无法发布的言论，”奥特曼继续说道，“但也会有非常危险的模型，必须以不同的方式发布。”

In February, OpenAI rolled out its Trusted Access for Cyber pilot program, letting security researchers and enterprises verify their identities and register their interest in studying OpenAI’s frontier models for “legitimate defensive work.” Last month, OpenAI said it was using that trusted access list to control the limited launch of GPT-5.4-Cyber, a model variant that it says is “purposely fine-tuned for additional cyber capabilities and with fewer capability restrictions.”

今年 2 月，OpenAI 推出了“网络可信访问”（Trusted Access for Cyber）试点计划，允许安全研究人员和企业验证身份，并注册以研究 OpenAI 的前沿模型，用于“合法的防御工作”。上个月，OpenAI 表示正在利用该可信访问列表来控制 GPT-5.4-Cyber 的限量发布，该模型变体据称是“专门针对额外网络能力进行微调，并减少了能力限制”。

On Thursday, OpenAI CEO Sam Altman said on social media that the initial release of GPT-5.5-Cyber would similarly be limited “to critical cyber defenders in the next few days.”

周四，OpenAI 首席执行官山姆·奥特曼在社交媒体上表示，GPT-5.5-Cyber 的初始发布同样将在“未来几天内仅限于关键的网络防御者”。
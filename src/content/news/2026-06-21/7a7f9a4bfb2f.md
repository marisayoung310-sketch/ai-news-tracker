---
title: "I am dreading our LLM-written incident report future"
originalUrl: "https://surfingcomplexity.blog/2026/06/19/i-am-dreading-our-llm-written-incident-report-future/"
date: "2026-06-20T22:44:34.951Z"
---

# I am dreading our LLM-written incident report future
# 我对未来由大语言模型（LLM）撰写的事故报告感到担忧

Lorin Hochstein incidents June 19, 2026 2 Minutes The other day, Reginald Braithwaite posted the following toot. For posterity, I’ve also included my own response to it: Braithwaite’s post is dripping with sarcasm, but make no mistake, incident reports written entirely by LLMs is coming. And I am not looking forward to this future.

前几天，Reginald Braithwaite 发布了以下推文。为了留作记录，我也附上了我的回复：Braithwaite 的文章充满了讽刺意味，但毫无疑问，完全由大语言模型（LLM）撰写的事故报告时代即将到来。而我并不期待这样的未来。

Before I dive in here, I want to note that there is a lot of toil you need to do in order to gather the data you need to write a good incident report, and LLMs can help significantly reduce that toil. I’ve got no issues there. But there’s a world of difference between using LLMs to help you assemble the ingredients involved in writing an incident report, and using an LLM to actually write the report itself.

在深入探讨之前，我想指出，撰写一份高质量的事故报告需要耗费大量精力去收集数据，而 LLM 可以显著减轻这些繁琐的工作。对此我没有异议。但使用 LLM 来辅助收集撰写报告所需的素材，与直接让 LLM 撰写报告本身，这两者之间有着天壤之别。

Braithwaite’s post is horrifying to me precisely because of the seduction of the LLM as a tool for generating an incident report. After all, you can just ask it to write the report, and it’ll do it. And that’s exactly what scares me.

Braithwaite 的文章之所以让我感到恐惧，正是因为 LLM 作为事故报告生成工具所带来的诱惑力。毕竟，你只需要让它写报告，它就能完成。而这正是让我感到害怕的地方。

There’s a famous quote by the cartoonist Dick Guindon: “Writing is Nature’s way of showing you how sloppy your thinking is“. You might think you understand a concept, but it’s only when you put metaphorical pen to paper, when you actually try to explain the concept in written words to a potential reader, that you realize how fuzzy your understanding actually is. Writing in your own words forces you to confront how much you actually understand what it is that you’re writing about. Or, as Leslie Lamport put it, “If you’re thinking without writing, you only think you’re thinking.”

漫画家 Dick Guindon 有一句名言：“写作是大自然向你展示你的思维有多么草率的方式。”你可能以为自己理解了一个概念，但只有当你真正动笔，尝试用文字向潜在读者解释这个概念时，你才会意识到自己的理解有多么模糊。用自己的语言写作，会迫使你直面自己对所写内容的真实理解程度。正如 Leslie Lamport 所言：“如果你只思考而不写作，那你只是以为自己在思考。”

Having an LLM generate the text of an incident write-up bypasses this thinking step. Now there’s no human in the loop of the writing process that has to confront whether the explanation is actually consistent with the evidence that they’ve gathered. Instead, what you get is a plausible explanation of what happened to someone who is not intimately familiar with the details.

让 LLM 生成事故报告的文本，绕过了这一思考过程。现在，写作过程中没有人类参与，也就没有人去核实解释是否与收集到的证据真正一致。相反，你得到的是一份对不熟悉细节的人来说看似合理的解释。

They might read, nod along, and think, “yes, that makes sense.” But the LLM may have invented couplings between systems that aren’t there, and may miss critical interactions that were actually part of the incident, and because nobody did the hard work of actually synthesizing the data to do the write-up, nobody will notice. Because if you’re trying to reduce the writing effort, how much effort are you really going to put into checking the LLMs work.

读者可能会读着读着点头，觉得“没错，这说得通”。但 LLM 可能虚构了系统中并不存在的耦合关系，也可能遗漏了事故中实际存在的关键交互。由于没有人进行艰苦的数据综合工作来撰写报告，也就没人会发现这些问题。因为如果你是为了减少写作负担，你又真的会花多少精力去检查 LLM 的工作成果呢？

In my view, LLM-generated incident write-ups are more dangerous than using LLM for coding or for AI SRE style tasks. For coding tasks, there’s always a testing step to check that the code exhibits the desired behavior, even if nobody looks at the code itself for meaningful details. For AI SRE tasks, either the LLM output helps you resolve the incident, or it doesn’t. In both cases, Nature is the ultimate arbiter of the LLM output.

在我看来，由 LLM 生成的事故报告比将 LLM 用于编程或 AI SRE 任务更危险。对于编程任务，总有一个测试步骤来检查代码是否表现出预期的行为，即使没有人去查看代码本身的细节。对于 AI SRE 任务，LLM 的输出要么能帮你解决事故，要么不能。在这两种情况下，大自然（现实结果）是检验 LLM 输出的最终裁判。

But incident write-ups aren’t like that. The consequences of a poor report aren’t immediately apparent the way incorrect code or an incorrect operational diagnosis are in the moment. Instead, we get incident reports that have the superficially correct form, but are actually incorrect, with no obvious test for correctness. And, because incident reports are time-consuming to write, the temptation to use AI tools to generate them will be overwhelming.

但事故报告并非如此。一份糟糕报告的后果不像错误的代码或错误的运维诊断那样立竿见影。相反，我们得到的事故报告在形式上看似正确，实则错误百出，且没有明显的正确性测试方法。而且，由于撰写事故报告非常耗时，使用 AI 工具来生成它们的诱惑力将是巨大的。

But these LLMs will not go around talking to people that were involved in the incident. These reports will be simulacra; they will have the right form, but they will not provide readers with genuine insights into the nature of the system. The amount of learning will be significantly curtailed. And, yes, people will probably use AI to summarize them as well. It’s not a future I’m looking forward to.

但这些 LLM 不会去与事故相关人员沟通。这些报告将只是模拟品；它们拥有正确的外壳，却无法为读者提供对系统本质的真正洞察。学习的深度将大打折扣。而且，是的，人们可能还会用 AI 来总结这些报告。这不是我所期待的未来。
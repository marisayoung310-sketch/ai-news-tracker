---
title: "On Accountability"
originalUrl: "https://addisoncrump.info/research/on-accountability/"
date: "2026-07-23T22:34:01.230Z"
---

# On Accountability
# 关于问责制

In 2024, I attended ICST in Toronto. I went to attend the first "Artificial Intelligence in Software Testing" workshop (AIST), where I gave a tutorial on a potential competition and participated in a panel (which, turned into a roundtable discussion) about the field. Our concerns at the time were principally about LLMs with two prominent questions: "how can we research this reliably?" and "how much can we reasonably expect to come from this?"

2024年，我参加了在多伦多举办的ICST会议。我此行的目的是参加首届“软件测试中的人工智能”（AIST）研讨会，并在会上就一项潜在的竞赛进行了辅导，还参与了一个关于该领域的专家小组讨论（后来演变成了一场圆桌会议）。当时我们主要关注的是大语言模型（LLM），并提出了两个核心问题：“我们该如何可靠地研究它？”以及“我们能合理地期待从中获得什么？”

Readers who have visited before will know that I'm not the greatest fan of LLMs, to say the least. The many arguments against it are weary of needing to be repeated so often, and I am weary of repeating them. Back in 2024, the scale of these harms was not yet well-understood, and so the panel itself was mostly concerned with the fact that we could not realistically do research on LLMs themselves, but only the viability of their applications. No empirical result about efficacy would be generalisable, and anything could be denied (in favour of or against LLMs) by simply claiming that the research was studying the wrong targets or applying them in the wrong way.

读过我往期文章的读者应该知道，我绝不是大语言模型的拥趸。反对它的论据已经多到让人厌倦，而我也厌倦了反复重申。回到2024年，当时这些危害的规模尚未被充分理解，因此专家小组主要担心的是，我们无法真正对大语言模型本身进行研究，只能研究其应用的可行性。任何关于效能的实证结果都无法推广，而且只要声称研究对象选错了或应用方式不对，任何结论（无论是支持还是反对大语言模型）都可以被轻易推翻。

Ironically, though I had attended ICST specifically to attend AIST, it was not the most impactful part of the conference for me. That title belongs to the second keynote from the main conference track, "We build the world we measure" by Mike Hoye. The keynote, ironically, was mostly not about measurement, but its consequences. The speaker derided the industry for its utter disregard for the well-being of its customers, and the lack of accountability faced by companies that develop software. Ultimately, he called for accountability in software engineering, akin to the measures put into place by other engineering fields, all justified by a simple fact: software is simply too integral to our daily lives, and too consequential.

讽刺的是，尽管我参加ICST就是为了参加AIST研讨会，但它并不是会议中对我影响最深的部分。这个头衔属于主会场的第二场主题演讲——Mike Hoye的《我们构建了我们所衡量的世界》（We build the world we measure）。讽刺的是，这场演讲大部分内容并非关于“衡量”本身，而是关于其后果。演讲者抨击了整个行业对客户福祉的漠视，以及软件开发公司所面临的问责缺失。最终，他呼吁在软件工程中建立问责制，类似于其他工程领域所采取的措施，而这一切的理由很简单：软件已经太深入我们的日常生活，且影响过于深远。

I barely remember the workshop I had joined for anymore, but I remember where I sat during the keynote, specific slides, the shape of the room, the rapt attention and silence of the audience, and the brief conversation I had with the speaker afterward. I also remember the two Google engineers (one senior, one junior) who joined the conversation -- rather forcefully -- to assert that accountability is toxic, and counter to the freedom of software development. I remember the smugness with which he said this, and the certainty with which he claimed this, and his inability to justify that claim beyond repeating the claim itself or excuses already accounted for in the keynote.

我已经记不清当初参加的那个研讨会的内容了，但我记得在主题演讲时我坐在哪里，记得具体的幻灯片、房间的布局、观众专注而安静的神情，以及演讲结束后我与演讲者进行的简短交谈。我还记得两名谷歌工程师（一位资深，一位初级）加入谈话时那种强硬的态度，他们断言问责制是有毒的，且违背了软件开发的自由。我记得他说这话时那种自鸣得意的神情，那种笃定的语气，以及他除了重复自己的观点或搬出那些在演讲中已被驳斥的借口外，根本无法为自己的主张提供任何合理的辩护。

At the time, I just found this infuriating. A quintessential self-report on avoiding responsibility for the software one develops, knowing that people depend on it. Now, I remember it in the context of LLMs. Our industry is so poisoned by the idea that consent is optional; that responsibility is something to be dismissed in a limitation of warranty; that negligence is excusable in the name of progress; that features are more valuable than stability; that usability is secondary to commercialibility; that somehow, there is no monetary gain too small to justify an indignity to users.

当时，我只觉得这令人愤怒。这简直是明知人们依赖于自己开发的软件，却还要逃避责任的典型自我写照。现在，我是在大语言模型的背景下回想起这件事的。我们的行业被一种观念毒害太深：认为同意是可有可无的；认为责任可以通过“免责声明”来推卸；认为疏忽可以以“进步”之名被原谅；认为功能比稳定性更重要；认为易用性次于商业化；认为似乎没有任何金钱利益小到不能成为羞辱用户的理由。

The idea that companies are somehow not responsible for the software they create and distribute is pervasive and normalised, while people's lives revolve around programs working as anticipated often without any alternatives. I'm coming back to the ideas of the keynote more often these days. LLMs have sponsored a radical shift in how programs are developed for many -- mostly for worse. Now, the very same companies which have, for decades now, shirked responsibility for the consequences of their programs, are using these tools to increase the output of code at the cost of maintainability, understanding, and accountability in the software they distribute.

“公司对其开发和分发的软件无需负责”这一观念已经变得普遍且常态化，而人们的生活却围绕着这些程序的预期运行，且往往别无选择。最近，我越来越频繁地回想起那场主题演讲的观点。大语言模型引发了许多人开发程序方式的剧烈转变——而且大多是向坏的方向转变。现在，那些几十年来一直逃避程序后果责任的公司，正利用这些工具来增加代码产出，代价却是牺牲了所分发软件的可维护性、可理解性和问责性。

Effectively any programmer can produce code with an LLM that accomplishes a task that can be commercialised. I see our field shifting from one that already has problems with accountability to one where there simply is none. I see a world where individual programmers, who maybe historically had enough stake in their work to see it done well, become disconnected from the code they are responsible for, assigned enormous workloads which can only be accomplished by simply caring less and relying on the code generator more.

实际上，任何程序员都可以利用大语言模型编写出能够完成商业化任务的代码。我看到我们的领域正在从一个本就存在问责问题的行业，转变为一个完全没有问责制的行业。我看到这样一个世界：曾经对自己的工作有足够投入、力求精益求精的程序员，正与他们负责的代码脱节；他们被分配了巨大的工作量，而完成这些工作的唯一途径就是减少对代码的关注，更多地依赖代码生成器。

Where those same programmers are "held accountable" by being replaced when something fails; after all, since nearly any programmer can operate the tools that actually produce the code, we become more expendable, more exchangeable. To me, and certainly to those who truly benefit from the commercialisation of software, this developer sounds like perfect scapegoat to be held accountable for the harms without consequences for the system or the people that actually cause those harms.

当出现故障时，这些程序员会被“问责”——即被解雇；毕竟，既然几乎任何程序员都能操作这些生成代码的工具，我们变得更加可有可无，更加容易被替代。对我来说，当然也对那些真正从软件商业化中获利的人来说，这种程序员听起来就是完美的替罪羊：他们为危害承担责任，而系统或真正导致这些危害的人却无需承担任何后果。

When something causes harm in the traditional engineering domains, the company faces severe penalties, and a proper investigation is done to determine the cause of the failure. It is rarely because of an individual's failings alone, but because of systematic failures that induce it. When something causes harm in software engineering, the company abdicates responsibility entirely, rarely faces any consequences, and, if anything ends up happening to hold anyone "accountable", it is most often implemented by simply dismissing the programmers involved.

在传统工程领域，当发生危害时，公司会面临严厉的惩罚，并会进行适当的调查以确定故障原因。这很少仅仅是因为个人的失误，而是由系统性故障引发的。而在软件工程中，当发生危害时，公司会完全放弃责任，几乎不面临任何后果；如果最终有人被“问责”，通常也只是简单地解雇相关的程序员。

And now, we are entering a paradigm where developers are both encouraged and expected not to feel responsible for their work; to defer responsibility as much as possible to a tool. And maybe someday, we enter a paradigm where product designers simply generate code directly, without the involvement of a programmer at all; where no one feels any personal responsibility and no one is individually accountable for any failure. It simply becomes "the way that it is"; software is simply expected to fail, even when it is critical for the user. Admittedly, for many users, it already feels like we're there. The only difference is that maybe, at one point, that

现在，我们正进入一种范式，开发者被鼓励甚至被期望不对自己的工作负责；尽可能地将责任推卸给工具。也许有一天，我们会进入一种产品设计师直接生成代码、完全无需程序员参与的范式；那时，没有人会感到个人责任，也没有人会为任何故障承担个人责任。这仅仅变成了“现状”；软件被默认会出错，即使它对用户至关重要。诚然，对于许多用户来说，感觉我们已经身处那个阶段了。唯一的区别在于，也许在某个时刻，那……
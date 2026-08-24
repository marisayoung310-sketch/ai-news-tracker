---
title: "Human mathematicians are being outcounterexampled"
originalUrl: "https://xenaproject.wordpress.com/2026/07/20/human-mathematicians-are-being-outcounterexampled/"
date: "2026-07-21T22:21:31.236Z"
---

# Human mathematicians are being outcounterexampled
# 人类数学家正在被反例超越

It’s been an interesting few weeks for counterexamples. This post is basically my perspective of what has been going on in the world of formalization, AI tools and, in particular, counterexamples.
过去几周在反例领域发生了一些有趣的事情。这篇文章主要是我对形式化、人工智能工具，特别是反例领域近期进展的个人看法。

### Unit distance
### 单位距离问题

Two months ago today (20th May 2026), ChatGPT disproved Erdős’ Unit Distance conjecture in discrete geometry. This is now old news but I had to start somewhere. The announcement was accompanied with testimonies by human mathematicians, many of whom I knew and a few of whom I trusted, saying that they believed the argument (they had been given early access to it and had checked it).
两个月前的今天（2026年5月20日），ChatGPT 推翻了离散几何中埃尔德什（Erdős）的单位距离猜想。这虽然已是旧闻，但我必须以此作为开端。随之发布的还有多位人类数学家的证言，其中许多是我认识的，也有几位是我信任的，他们表示相信这一论证（他们提前获得了访问权限并进行了核查）。

The basic structure of the proof is that a profound theorem in number theory due to Golod and Shafarevich from the 1960s could be used to construct a counterexample to the conjecture. It is now 9 years since I had a mid-life crisis, realised I no longer trusted many human mathematicians when it comes to technical details, discovered Lean, and started to argue that interactive theorem provers should play an important role in the future of mathematics. So of course my first question was “is the counterexample formalized in Lean”. The answer was “no”.
该证明的基本结构是利用20世纪60年代戈洛德（Golod）和沙法列维奇（Shafarevich）提出的一个深刻数论定理，来构建该猜想的反例。距离我经历中年危机、意识到在技术细节上不再信任许多人类数学家、发现 Lean 语言并开始主张交互式定理证明器应在数学未来中发挥重要作用，已经过去9年了。所以，我的第一个问题自然是：“这个反例在 Lean 中形式化了吗？”答案是“没有”。

But under a week later (26th May 2026), I got an email from Fields Medallist Mike Freedman. Mike is now the Chief Science Officer for Logical Intelligence, a company cofounded by Turing Award winner and “godfather of AI” Yan LeCun. Mike informed me that their system had autoformalized the entire ChatGPT-generated paper in Lean and could I take a look. I looked, and my post-doc Thomas Browning looked too. And indeed this was what Logical Intelligence had done: they had formalized precisely the statement that the profound theorem of number theory implied the Erdős counterexample. Breakthrough LLM-generated mathematics being formalized in real time. Interesting data point.
但不到一周后（2026年5月26日），我收到了菲尔兹奖得主迈克·弗里德曼（Mike Freedman）的邮件。迈克现在是 Logical Intelligence 公司的首席科学官，该公司由图灵奖得主、“AI教父”杨立昆（Yann LeCun）共同创立。迈克告知我，他们的系统已经将 ChatGPT 生成的整篇论文在 Lean 中进行了自动形式化，并问我能否看一看。我看了，我的博士后托马斯·布朗宁（Thomas Browning）也看了。事实确实如此：Logical Intelligence 已经精确地形式化了那个“数论深刻定理蕴含埃尔德什反例”的陈述。大语言模型生成的数学成果正在被实时形式化，这是一个有趣的数据点。

Of course there is an elephant in the room here though, the profound theorem of number theory which takes 100+ pages to prove (it needs huge chunks of global class field theory, a theory developed at the beginning of the 20th century and for which there are still no short proofs; it is proving difficult to compress). In 2025 I had run a Clay Summer School with Richard Hill on the formalization of class field theory, and one year later we have nearly done the local case (it is the current PhD project of my student Edison Xie); the global case remained open, and indeed in 2025 formalizing global class field theory seemed like a fantasy.
当然，这里有一个显而易见却被回避的问题：那个数论深刻定理需要100多页才能证明（它需要用到大量20世纪初发展的全局类域论，且至今没有简短的证明；事实证明它很难压缩）。2025年，我曾与理查德·希尔（Richard Hill）共同举办过一次关于类域论形式化的克雷暑期学校（Clay Summer School）。一年后，我们几乎完成了局部情形（这是我学生谢艾迪生（Edison Xie）目前的博士课题）；而全局情形仍然悬而未决，事实上在2025年，形式化全局类域论看起来还像是一个幻想。

One month later, on June 26th 2026, my perception of what was possible again changed. Boris Alexeev announced on the Lean Zulip that he had steered ChatGPT to a complete formalization of the Erdős counterexample, assuming nothing beyond the axioms of mathematics. Boris works at OpenAI and had used their new model Sol to do the autoformalization. Boris made the code public and it did not take long for me to realise that somewhere within all this AI-generated (and sometimes horrible, although sometimes decent) code was indeed a proof of some really hard theorems in global class field theory.
一个月后，即2026年6月26日，我对可能性的认知再次被刷新。鲍里斯·阿列克谢耶夫（Boris Alexeev）在 Lean Zulip 上宣布，他引导 ChatGPT 完成了埃尔德什反例的完整形式化，且未假设任何数学公理之外的内容。鲍里斯在 OpenAI 工作，并使用了他们的新模型 Sol 进行自动形式化。鲍里斯公开了代码，我很快意识到，在这些由 AI 生成的（有时很糟糕，但有时还不错）代码中，确实隐藏着一些全局类域论中极难定理的证明。

Also of interest to me was that Sol had generated 1.2 million lines of Lean code in the three weeks that it had worked on the project. Lean’s fantastic (declaration of conflict of interest: I am a maintainer) mathematics library mathlib is only 2.3 million lines of code, and took nine years to write. Perhaps it was at this point that the penny really dropped for me — large AI-generated developments of mathematics are inevitable. One cannot trust AI-generated code so I ran it in a sandbox on my machine (malicious Lean code can run arbitrary commands on your computer — Lean is a programming language, after all). Indeed, it was proving nontrivial theorems about the cohomology of number fields. Wow.
令我感兴趣的还有，Sol 在该项目工作的这三周内生成了120万行 Lean 代码。Lean 那出色的（利益冲突声明：我是维护者之一）数学库 mathlib 总共也只有230万行代码，且耗时九年才写成。也许就在那一刻，我彻底醒悟了——大规模由 AI 生成的数学进展是不可避免的。由于不能信任 AI 生成的代码，我在机器的沙盒中运行了它（毕竟 Lean 是一种编程语言，恶意的 Lean 代码可以在你的电脑上运行任意命令）。事实证明，它确实证明了关于数域上同调的一些非平凡定理。哇。

### Group schemes of order n
### n阶群概形

A week after Boris’ revelation, in early July, I was thinking hard about how to run my Formalizing Fermat workshop. This workshop was sponsored by Logos Research, who, like Logical Intelligence (and Harmonic and Axiom AI and Moonshot AI and…) have a tool which can autoformalize mathematics — translating it from human language into Lean — building on mathlib.
在鲍里斯披露消息一周后的7月初，我正在苦思冥想如何举办我的“费马大定理形式化”研讨会。该研讨会由 Logos Research 赞助，他们像 Logical Intelligence（以及 Harmonic、Axiom AI、Moonshot AI 等公司）一样，拥有一种能够自动形式化数学的工具——基于 mathlib 将人类语言翻译成 Lean。

Logos told me that they were only going to allow 5 people at a time to use their system during the workshop, and there were 25 attendees, so I told all attendees that I would buy them a Claude Max subscription for a month, so they had something to experiment with when it wasn’t their turn for Logos’ tool. The workshop was 6th to 10th July, and the Claude Max subscription would give attendees access to Claude Fable, at least until Tuesday 7th, when it was being switched off.
Logos 告诉我，研讨会期间他们一次只允许5人使用其系统，而参会者有25人。所以我告诉所有参会者，我会为他们每人购买一个月的 Claude Max 订阅，这样当他们轮不到使用 Logos 工具时，也有东西可以实验。研讨会于7月6日至10日举行，Claude Max 订阅可以让参会者访问 Claude Fable，至少在7日（周二）该功能被关闭之前是这样。

When OpenAI got wind of what I was doing, they also offered all attendees free ChatGPT Pro access for a month; this was a big deal because ChatGPT Sol was coming out on the 9th. So basically all attendees would have access to Sol and Fable for 4 out of the 5 days of the workshop, and Logos’ tool for the entire week. In fact Fable access was not removed on the 7th so we were in even better shape.
当 OpenAI 获悉我的计划后，他们也为所有参会者提供了为期一个月的免费 ChatGPT Pro 访问权限；这意义重大，因为 ChatGPT Sol 将于9日发布。所以基本上，所有参会者在研讨会5天中的4天都能使用 Sol 和 Fable，并且整周都能使用 Logos 的工具。事实上，Fable 的访问权限在7日并没有被移除，所以我们的情况比预想的还要好。

I was not sure how good Logos’ tool was going to be, but I wanted a development of the theory of finite flat group schemes in Lean for my ongoing proof of Fermat’s Last Theorem, so I put uploaded some classic papers in the area to Fable and ChatGPT, and got them together to write down an exposition of the theory in natural language. I passed this pdf document over to Logos the day before the workshop, and on the first day of the workshop they said that one of the claims in the pdf was false and they had found an explicit counterexample. Another counterexample! I took a look and indeed the LLM-generated pdf was simply wrong at some point when describing a standard construction; false alarm.
我不确定 Logos 的工具效果如何，但我正在进行的费马大定理证明需要 Lean 中关于有限平坦群概形理论的推导，所以我将该领域的一些经典论文上传到了 Fable 和 ChatGPT，并让他们共同用自然语言写出一份理论阐述。我在研讨会前一天将这份 PDF 文档交给了 Logos，而在研讨会第一天，他们就指出 PDF 中的一个断言是错误的，并且他们已经找到了一个明确的反例。又一个反例！我仔细一看，原来是那个大语言模型生成的 PDF 在描述某种标准构造时确实出错了；虚惊一场。
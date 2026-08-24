---
title: "The Chatbot That Foretold Why People Share Secrets With ChatGPT"
originalUrl: "https://www.wired.com/story/inventing-eliza-book-excerpt-chatbot/"
date: "2026-07-14T22:23:27.638Z"
---

# The Chatbot That Foretold Why People Share Secrets With ChatGPT
# 预言了人们为何向 ChatGPT 倾诉秘密的聊天机器人

In the 60 years that ELIZA has been influencing computation and culture, conventional accounts portray it as the earliest example of what we now call chatbots, one that could converse as an automated psychologist. The deceptively simple program is known for “fooling” even the secretary who watched MIT professor Joseph Weizenbaum create it. That’s how the story goes.
在 ELIZA 影响计算领域和文化的 60 年里，传统叙事将其描述为我们现在所称的“聊天机器人”的最早范例，一个能够像自动心理学家一样进行对话的程序。这个看似简单的程序以“欺骗”了当时观看麻省理工学院教授约瑟夫·魏岑鲍姆（Joseph Weizenbaum）开发它的秘书而闻名。故事大抵如此。

However, in all those accounts—even after all its adaptations across programming languages and research fields, in classrooms and popular culture—one essential piece of the story has been missing: the source code for the ELIZA program itself. Our new book, *Inventing ELIZA*, recovers this source code from the MIT Archives, offering for the first time a close reading and discussion of that code along with newly uncovered dialogs for ELIZA scripts beyond its popular “DOCTOR” persona.
然而，在所有这些叙述中——即使经过了各种编程语言、研究领域、课堂和流行文化的改编——故事中缺失了一个至关重要的部分：ELIZA 程序本身的源代码。我们的新书《发明 ELIZA》（*Inventing ELIZA*）从麻省理工学院档案馆中找回了这些源代码，首次对代码进行了细致的解读和讨论，并展示了除其广为人知的“医生”（DOCTOR）角色之外，新发现的 ELIZA 脚本对话。

This investigation revealed many ELIZAs: in its different program versions, designed to run a wide variety of scripts or personas, built using a series of technical innovations. *Inventing ELIZA* seeks to correct and to complicate ELIZA’s history and influence by exploring the misconceptions, multiple versions, and missing code of ELIZA. In this excerpt from the book, we examine one of ELIZA's earliest interactions, how it laid the groundwork for human relationships with computers for decades to come, and how the complex program continues to speak to the unrestrained drive of today's AI industry.
这项调查揭示了许多个 ELIZA：在不同的程序版本中，它们被设计用来运行各种脚本或角色，并利用一系列技术创新构建而成。《发明 ELIZA》试图通过探索关于 ELIZA 的误解、多个版本以及缺失的代码，来修正并丰富其历史与影响。在本书的节选中，我们审视了 ELIZA 最早的互动之一，探讨了它如何为未来几十年的“人机关系”奠定基础，以及这个复杂的程序如何持续回应着当今人工智能行业那股不受约束的驱动力。

Men are all alike.
男人都一个样。
IN WHAT WAY
哪方面？
They’re always bugging us about something or other.
他们总是在某些事情上烦我们。
CAN YOU THINK OF A SPECIFIC EXAMPLE
你能举个具体的例子吗？
Well, my boyfriend made me come here.
嗯，我男朋友让我来这儿。
YOUR BOYFRIEND MADE YOU COME HERE
你男朋友让你来这儿？
He says I’m depressed much of the time.
他说我大部分时间都很沮丧。
I AM SORRY TO HEAR YOU ARE DEPRESSED
听到你很沮丧，我很遗憾。

That dialog has been reprinted countless times and has inspired programmers and writers to dream up many of the chatbots that followed. Yet the closer one inspects that dialog, the more questions arise: Who was this young woman? Was she a real person, or is she the invention of ELIZA creator Joseph Weizenbaum? How exactly did the ELIZA system generate its responses, and how much were they edited? Why did the system work so well to draw people in?
这段对话被转载了无数次，并激励了程序员和作家们构想出后来出现的许多聊天机器人。然而，人们越仔细审视这段对话，产生的问题就越多：这位年轻女性是谁？她是真实存在的人，还是 ELIZA 的创造者约瑟夫·魏岑鲍姆虚构出来的？ELIZA 系统究竟是如何生成这些回复的，其中又有多少是经过编辑的？为什么这个系统能如此有效地吸引人们？

ELIZA, and her “DOCTOR” persona, helped catalyze a mode of thought and an anxiety about people’s relationships with computers. Weizenbaum explored this in his 1976 book *Computer Power and Human Reason*, invoking philosophical, social, and political critiques. The unique machine interaction presented by his program revealed how new forms of human-computer relation would have profound effects that he attempted to explore and to contest. After seeing its public reception, Weizenbaum was startled by the quick and often emotional attachments people would form with ELIZA, which he saw as “clear evidence that people were conversing with the computer as if it were a person who could be appropriately and usefully addressed in intimate terms.” The tendency to attribute empathy and invest private feelings into a computer puzzled Weizenbaum. He was concerned by the extent to which people associated rationality with computation, and ascribed understanding and intelligence to computer systems where none existed.
ELIZA 及其“医生”角色，催化了一种关于人机关系的思维模式和焦虑。魏岑鲍姆在 1976 年的著作《计算机能力与人类理性》（*Computer Power and Human Reason*）中探讨了这一点，并引用了哲学、社会和政治层面的批判。他的程序所呈现的独特机器互动揭示了新型人机关系将产生深远影响，他试图对此进行探索和反驳。在看到公众的反应后，魏岑鲍姆对人们与 ELIZA 之间迅速建立的、往往带有情感色彩的依恋感到震惊。他认为这是“明确的证据，表明人们在与计算机交谈时，将其视为一个可以恰当且有益地进行亲密交流的人”。这种将同理心赋予计算机并投入私人情感的倾向让魏岑鲍姆感到困惑。他担心人们将理性与计算联系在一起的程度，以及将理解力和智能归因于根本不存在这些特性的计算机系统。

This tendency became known as the “ELIZA effect.” By 1991 the term was appearing in online forums, but its use predated that appearance by decades. Sociologist Sherry Turkle defines “the ELIZA effect” as “our more general tendency to treat responsive computer programs as more intelligent than they really are. Very small amounts of interactivity cause us to project our own complexity onto the undeserving object.” Cognitive and computer scientist Douglas Hofstadter describes it as “the susceptibility of people to read far more understanding than is warranted into strings of symbols—especially words—strung together by computers,” which applies easily to generative AI systems today.
这种倾向后来被称为“ELIZA 效应”。到 1991 年，这个术语开始出现在在线论坛上，但它的使用早在几十年前就开始了。社会学家雪莉·特克尔（Sherry Turkle）将“ELIZA 效应”定义为：“我们更普遍地倾向于将有响应的计算机程序看得比实际更聪明。极少量的交互作用就会导致我们将自身的复杂性投射到这些并不具备复杂性的对象上。”认知科学家兼计算机科学家道格拉斯·霍夫施塔特（Douglas Hofstadter）将其描述为：“人们容易将远超实际的理解力解读到由计算机串联起来的符号串（尤其是文字）中”，这很容易适用于当今的生成式 AI 系统。

To understand the power and provocation of ELIZA, we can look to the infamous challenge formulated by computer scientist Alan Turing in the essay “Computing Machinery and Intelligence,” in which Turing posed the question “Can Machines Think?” Turing premised his thought experiment on a parlor game—not about technology but about gender: A man and a woman are hidden in a separate room and an interrogator tries to identify who is which gender by asking a series of questions. The man tries to mislead the interrogator, pretending to be a woman, while the woman tries to convince the interrogator of the “correct” answer. That is, both of them claim they are the “real” woman, a challenge to essentialist notions of gender.
为了理解 ELIZA 的力量和挑衅性，我们可以看看计算机科学家艾伦·图灵（Alan Turing）在论文《计算机器与智能》中提出的著名挑战，图灵在文中提出了“机器能思考吗？”这一问题。图灵的思想实验基于一个客厅游戏——它无关技术，而关乎性别：一男一女被藏在单独的房间里，审问者通过提出一系列问题来辨别谁是哪种性别。男人试图误导审问者，假装自己是女人，而女人则试图让审问者相信“正确”的答案。也就是说，他们都声称自己是“真正的”女人，这是对本质主义性别观念的一种挑战。

In his revision of this game, Turing replaces the original gender question with what is now called the Turing test. In this challenge a machine pretends to be a man, rather than a man pretending to be a woman. More than a mere opening gambit, Turing’s choice of the initial gender imitation game has ensured that artificial intelligence would remain intertwined with questions of gender and identity. In this sense imitation, drag, and gender deconstruction laid the groundwork for AI and the performance of intellect. Weizenbaum’s ELIZA picks up where Turing left off, not least with the opening line of the dialog: “Men are all alike.”
在对这个游戏的修订中，图灵用现在所谓的“图灵测试”取代了最初的性别问题。在这个挑战中，机器假装成男人，而不是男人假装成女人。图灵选择最初的性别模仿游戏，不仅仅是一个开场白，它确保了人工智能将始终与性别和身份问题交织在一起。从这个意义上说，模仿、变装和性别解构为人工智能和智能表现奠定了基础。魏岑鲍姆的 ELIZA 延续了图灵的思路，对话的第一句“男人都一个样”便是明证。

Nonetheless, even though Weizenbaum references Turing’s imitation game in his 1966 paper introducing ELIZA, he explicitly distances his creation from any claims of intelligence:
尽管如此，即使魏岑鲍姆在 1966 年介绍 ELIZA 的论文中提到了图灵的模仿游戏，但他明确地将自己的作品与任何关于智能的宣称区分开来：

The crucial test of understanding … is not the subject’s ability to continue a conversation, but to draw valid conclusions … In order for a computer program to be able to do that, it must at least have the capacity to store selected parts of its inputs. ELIZA throws away [most] of its inputs … ELIZA in its use so far has had as one of its principal objectives the concealment of its lack of understanding.
理解的关键测试……不在于主体继续对话的能力，而在于得出有效结论的能力……为了使计算机程序能够做到这一点，它至少必须具备存储部分输入信息的能力。ELIZA 丢弃了（大部分）输入信息……到目前为止，ELIZA 的主要目标之一就是掩盖它缺乏理解力的事实。

This assessment shows that ELIZA was never intended to pass the Turing test, but rather to explore the psychological factors that might lead humans to misinterpret.
这一评估表明，ELIZA 从未打算通过图灵测试，而是为了探索那些可能导致人类产生误解的心理因素。
---
title: "Super Mario is mathier than you think"
originalUrl: "https://www.technologyreview.com/2026/06/23/1138262/super-mario-is-mathier-than-you-think/"
date: "2026-06-23T22:45:31.929Z"
---

# Super Mario is mathier than you think
# 超级马力欧比你想象的更具数学性

Here’s a problem you probably didn’t solve in school: You’re an ambitious young plumber from Brooklyn in a world inhabited by violent human-size mushrooms called Goombas. The love of your life has been kidnapped, so you embark on a quest to rescue her, venturing through stretches of pipe-filled and monster-ridden terrain where your only means of protection are your powers of jumping and stomping.
这是一个你可能在学校里没遇到过的问题：你是一位来自布鲁克林的雄心勃勃的年轻水管工，身处一个居住着暴力、人型大小蘑菇（栗宝宝）的世界。你的一生挚爱被绑架了，于是你踏上了营救她的征程，穿越充满管道和怪物的地形，而你唯一的防御手段就是跳跃和踩踏。

It’s a journey so arduous that no computer—real or hypothetical—is powerful enough to figure out if you can reach her. And according to research published by the MIT Hardness Group, determining whether your quest is possible at all is at least as complicated as decoding the encryption behind financial transactions. But if this problem could talk, the first thing it would say is “Hello, it’s a-me, Mario!”
这是一段极其艰巨的旅程，没有任何计算机（无论是现实中的还是理论上的）强大到足以判断你是否能救到她。根据麻省理工学院“硬度小组”（MIT Hardness Group）发表的研究，判断你的任务是否可行，其复杂程度至少相当于破解金融交易背后的加密技术。但如果这个问题会说话，它说的第一句话一定是：“你好，是我，马力欧！”

For the love of the game: Though it does have a YouTube channel, the MIT Hardness Group isn’t an official research group. Instead, it’s a placeholder name for theoretical computer science projects—including several related to Super Mario—from Erik Demaine’s class “Algorithmic Lower Bounds: Fun with Hardness Proofs.”
出于对游戏的热爱：虽然麻省理工学院“硬度小组”有一个 YouTube 频道，但它并不是一个正式的研究小组。相反，它是 Erik Demaine 教授的课程“算法下界：硬度证明的乐趣”（Algorithmic Lower Bounds: Fun with Hardness Proofs）中理论计算机科学项目的代称，其中包括几个与《超级马力欧》相关的项目。

Demaine, a professor of computer science, received a MacArthur fellowship (also known as a “genius” grant) for his work in computational geometry on protein folding and origami. But he also researches complexity theory, which focuses on organizing problems into categories based on how much time and memory space it takes for computers to solve them. He happens to be an avid Super Mario fan as well.
计算机科学教授 Demaine 因其在蛋白质折叠和折纸计算几何领域的工作而获得了麦克阿瑟奖（也被称为“天才奖”）。但他同时也研究复杂性理论，该理论专注于根据计算机解决问题所需的时间和内存空间，将问题进行分类。碰巧，他也是一位狂热的《超级马力欧》粉丝。

“I grew up playing NES [Nintendo Entertainment System] games,” Demaine says. “I poured many hours into playing as a kid, so it’s fun to come back to it these many years later and tie it into my research.”
“我是玩着 NES（任天堂娱乐系统）游戏长大的，”Demaine 说，“小时候我花了很多时间玩这些游戏，所以多年后的今天能重拾旧爱，并将其与我的研究联系起来，是一件很有趣的事。”

Super Mario takes place on a horizontally scrolling universe of platforms, pipes, and other obstacles. The object of the game is to rescue Princess Peach, the monarch of the Mushroom Kingdom, by racing through this terrain while sidestepping or dueling monsters like Goombas and deadly porcupines called Spinies. The game takes place over several levels; in the original version, each level ends with a flagpole that sends Mario on to the next part of his mission.
《超级马力欧》发生在一个由平台、管道和其他障碍物组成的横向卷轴世界中。游戏的目标是通过穿越这些地形，同时躲避或对抗栗宝宝（Goombas）和致命的刺猬（Spinies）等怪物，来营救蘑菇王国的统治者碧姬公主。游戏分为多个关卡；在原始版本中，每个关卡的终点都有一根旗杆，马力欧触碰后便会进入任务的下一阶段。

Over the last 14 years, Demaine and his collaborators have proved many things about Super Mario, such as that it’s even harder than the infamous traveling-salesman problem (which seeks the most efficient route between many different locations) or the problem of factoring large numbers. But the result that surprised Demaine the most came from four of his students: Hayashi Ani ’21, MEng ’23; Holden Hall ’26; Ricardo Ruiz ’24, MEng ’25; and Naveen Venkat ’23, MEng ’24.
在过去的 14 年里，Demaine 和他的合作者证明了关于《超级马力欧》的许多结论，例如它甚至比臭名昭著的“旅行商问题”（寻找多个地点之间的最有效路线）或大数分解问题还要困难。但最让 Demaine 感到惊讶的结果来自他的四名学生：Hayashi Ani、Holden Hall、Ricardo Ruiz 和 Naveen Venkat。

For their final project in that 2023 class, the team used a combination of fan-made Super Mario level editors and a platform called Super Mario Maker to create levels so hard that they are undecidable. In other words, it’s impossible to write a computer program that always correctly predicts whether, in those levels, Mario can reach the castle.
在 2023 年那门课的期末项目中，该团队结合了粉丝制作的《超级马力欧》关卡编辑器和一个名为《超级马力欧创作家》（Super Mario Maker）的平台，创造出了极其困难、以至于“不可判定”的关卡。换句话说，不可能编写出一个计算机程序，能够始终准确地预测在这些关卡中马力欧是否能到达城堡。

Previously, Demaine had believed that Super Mario belonged in the PSPACE complexity class, which contains problems that are solvable but whose solutions become impractically complex as the problem gets bigger. At the time, he had even said that PSPACE was Mario’s “permanent home.” But the new findings pushed Super Mario into RE-Complete, the class of undecidable problems. “It’s the hardest complexity class we could imagine for these sorts of games,” Demaine says.
此前，Demaine 曾认为《超级马力欧》属于 PSPACE 复杂性类，这类问题虽然可解，但随着问题规模的扩大，其解法会变得极其复杂。当时，他甚至说 PSPACE 是马力欧的“永久家园”。但新的研究结果将《超级马力欧》推向了 RE-Complete，即不可判定问题的类别。“这是我们能为这类游戏想象出的最难的复杂性类，”Demaine 说。

What computers can’t solve: In 1936, Alan Turing, the father of modern computer science, created a puzzle now known as the Halting Problem to prove it’s not possible to construct a computer that can solve everything. At the core of the Halting Problem lies a paradox, and it goes like this: Suppose you have a fancy computer, called the Oracle, that looks at any program and correctly determines whether a computer following it will ever come to a stop.
计算机无法解决的问题：1936 年，现代计算机科学之父艾伦·图灵（Alan Turing）提出了一个现在被称为“停机问题”（Halting Problem）的谜题，以证明不可能制造出一台能解决所有问题的计算机。停机问题的核心是一个悖论，它是这样的：假设你有一台高级计算机，称为“预言机”（Oracle），它能查看任何程序并准确判断运行该程序的计算机是否会停止。

For example, if it sees the program “Take 1 and add 3,” the Oracle will say the program halts, but if the program says “Take 1 and add 1 to it until it becomes 0,” the Oracle will say it runs forever. Now suppose you have another computer, the Contrarian, and you put the Oracle inside it. When you give the Contrarian a program, it passes it to the Oracle and then does the opposite of whatever the Oracle says the program will do.
例如，如果它看到程序“取 1 并加 3”，预言机会说该程序会停止；但如果程序说“取 1 并不断加 1 直到它变成 0”，预言机会说它会永远运行下去。现在假设你有另一台计算机，称为“反向机”（Contrarian），你把预言机放进它里面。当你给反向机一个程序时，它会将其传给预言机，然后做出与预言机预测结果相反的行为。

So if the Oracle assesses the Contrarian’s program and thinks it will halt, the Contrarian will run forever. If the Oracle thinks the program will run forever, the Contrarian will halt. Either way, the Oracle’s assessment is wrong, so the classification problem is undecidable.
因此，如果预言机评估反向机的程序并认为它会停止，反向机就会永远运行；如果预言机认为程序会永远运行，反向机就会停止。无论哪种情况，预言机的评估都是错误的，因此这个分类问题是不可判定的。

The proofs that Super Mario is undecidable rely on a more complex version of this idea. The team’s argument breaks down the video game using a technique called a reduction, in which mathematicians convert a problem they’re trying to solve into a problem they already know something about.
关于《超级马力欧》不可判定的证明依赖于这一思想的更复杂版本。该团队的论证使用了一种称为“归约”（reduction）的技术来拆解这款游戏，在这种技术中，数学家将他们试图解决的问题转化为一个他们已经有所了解的问题。

“The classic example I remember in a math class is: How do you make a pot of boiling water?” Demaine recalls. “Well, I fill up the pot with water from the sink, and then I put it on the stove, and then it eventually boils. Okay, now I’ll give you a pot of water that’s already filled. How do you make a pot of boiling water? Well, I empty out the pot first and reduce to the previous problem.”
“我记得数学课上的一个经典例子是：你如何烧开一壶水？”Demaine 回忆道，“嗯，我从水槽里往壶里接满水，然后把它放在炉子上，最后水就开了。好，现在我给你一壶已经接满水的壶，你如何烧开它？嗯，我先把壶里的水倒掉，然后就归约到了上一个问题。”

In their particular world of platforms and porcupines, the team broke down their Super Mario level into localized parts of Mario’s path called gadgets, which they could use to prove that the level was undecidable. “A gadget in our sense is anything in your environment that decides whether or not you can go through one pattern [within a level],” explains Jayson Lynch.
在他们那个充满平台和刺猬的特定世界里，团队将《超级马力欧》关卡拆解为马力欧路径的局部部分，称为“小工具”（gadgets），他们利用这些小工具证明了该关卡是不可判定的。“我们所说的小工具是指环境中任何决定你是否能通过（关卡内）某种模式的东西，”Jayson Lynch 解释道。
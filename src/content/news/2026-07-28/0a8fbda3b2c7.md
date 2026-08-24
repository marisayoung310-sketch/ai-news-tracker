---
title: "On AI"
originalUrl: "https://jcs.org/2026/07/23/ai"
date: "2026-07-27T22:36:36.424Z"
---

# On AI

In 2019, I started watching Andreas Kling's programming videos, many of which were live-coding sessions writing his new operating system SerenityOS. He was always pretty fast at writing code, especially since his IDE, Qt Creator, had knowledge of all his C++ code and could auto-complete classes, variable names, and function signatures. Back then it seemed like he had much of the code written in his head and was limited just by his typing speed.
2019 年，我开始观看 Andreas Kling 的编程视频，其中许多是他在编写新操作系统 SerenityOS 时的实时编码会话。他写代码的速度一直很快，尤其是因为他的集成开发环境（IDE）Qt Creator 了解他所有的 C++ 代码，并能自动补全类、变量名和函数签名。当时看来，他似乎早已在脑海中构思好了大部分代码，仅仅受限于打字速度。

Four years later, he switched to CLion which had early GitHub Copilot support for AI-assisted code completion. While initially skeptical of Copilot, he experimented with it and within months, Copilot was writing code blocks, "reading [his] mind", and writing whole functions. His IDE's auto-completion through AI seemed like it had finally caught up with his brain and he could get ideas out into code faster.
四年后，他转用了 CLion，该软件当时已支持 GitHub Copilot 的 AI 辅助代码补全功能。虽然起初他对 Copilot 持怀疑态度，但他进行了尝试，几个月内，Copilot 就已经能编写代码块、“读懂他的心思”并编写完整的函数了。他 IDE 中的 AI 自动补全功能似乎终于赶上了他的思维速度，使他能更快地将想法转化为代码。

While I found it fascinating watching Andreas speed up his development, none of it appealed to me for my work for years after. I didn't even use an IDE or an LSP in my editor. I was skeptical of AI and probably wrote it off too soon due to its early failures. I eventually tinkered with Claude in a web browser, asking it questions that I would have otherwise asked a search engine and been directed to a Stack Overflow answer.
虽然看着 Andreas 加快开发速度让我觉得很着迷，但在随后的几年里，这些技术对我自己的工作毫无吸引力。我甚至不在编辑器中使用 IDE 或 LSP。我曾对 AI 持怀疑态度，可能因为其早期的失败而过早地否定了它。最终，我在浏览器中试用了 Claude，向它询问那些我本会去搜索引擎查询并跳转到 Stack Overflow 答案的问题。

Once Claude Code came out, I was amazed at the power of giving it access to a directory of code on my laptop and letting it directly read and modify files. Its ability to completely (and quickly) reverse engineer a binary blob with zero context is still pretty awesome. Once local models got good and small enough, I started using Ollama on my M4 Mac Mini to do local offline work.
当 Claude Code 发布时，我被它能够访问我笔记本电脑上的代码目录并直接读取和修改文件的能力所震撼。它在零上下文的情况下完全（且快速）逆向工程二进制文件的能力依然令人惊叹。当本地模型变得足够优秀且轻量后，我开始在我的 M4 Mac Mini 上使用 Ollama 进行本地离线工作。

Like many things, it's possible to like and use a technology, language, or tool while rejecting all of the hype, fraud, and negative communities that build up around them (like Rails, or Rust). Of course, you can also choose not to like or use any of those things. You can prefer to use a hand saw instead of a circular saw, or to drive a manual transmission car instead of a self-driving EV. But I think at this point it's naive to think of all AI technology as useless or bad. The AI industry on the other hand…
就像许多事物一样，你完全可以喜欢并使用某种技术、语言或工具，同时拒绝围绕它们产生的炒作、欺诈和负面社区（比如 Rails 或 Rust）。当然，你也可以选择不喜欢或不使用这些东西。你可以选择用手锯代替圆锯，或者开手动挡汽车而不是自动驾驶电动车。但我认为，到了现在这个阶段，如果认为所有的 AI 技术都毫无用处或有害，那是很天真的。不过，AI 行业本身则是另一回事……

In 2020, taking inspiration from Andreas, I started recording my own videos programming on an 8 Mhz Macintosh 512Ke (later a Macintosh Plus) in the THINK C 5 IDE. I had never actually used a classic Macintosh before and I wanted to learn what it was like to program for them as one would have 40 years ago. I made a rule for myself that I would only write code on the Macintosh itself, typing everything on its Apple M0110 keyboard. No modern computers would be involved in writing, editing, or compiling any of the code for my projects.
2020 年，受 Andreas 的启发，我开始录制自己在 8 MHz 的 Macintosh 512Ke（后来换成了 Macintosh Plus）上使用 THINK C 5 IDE 编程的视频。我以前从未真正使用过经典的 Macintosh，我想了解 40 年前的人们是如何为它编程的。我给自己定了一条规矩：只能在 Macintosh 本机上编写代码，所有内容都必须通过其 Apple M0110 键盘输入。在我的项目代码编写、编辑或编译过程中，绝不涉及任何现代计算机。

Since starting that series, I've written (most of) an IMAP e-mail client, a revision control system, a Wikipedia reader, an IRC client, then a multi-user, multi-threaded BBS server. It all taught me a lot about the Macintosh and about C, and ignited my vintage computing hobby which has introduced me to many new friends.
自该系列开始以来，我已经编写了（大部分）IMAP 电子邮件客户端、版本控制系统、维基百科阅读器、IRC 客户端，以及一个多用户、多线程的 BBS 服务器。这一切让我对 Macintosh 和 C 语言有了深入了解，也点燃了我的复古计算爱好，并让我结识了许多新朋友。

One thing about writing my e-mail client that bugged me was that it required a proxy server on a modern server to strip TLS and present plaintext to the poky Macintosh. So after adding Wi-Fi functionality to my Mac Plus, I added a TLS offloading device so my Mac could do TLS decryption independently. That provided the final giant piece of the puzzle needed to write a "modern" web browser (at least something newer than MacWeb that could parse HTML 5) for classic Mac OS, since everything is encrypted these days. I started working on that browser in 2024, adding other protocols such as Gopher (and begrudgingly, Gemini).
在编写电子邮件客户端时，有一件事让我很困扰：它需要现代服务器上的代理服务器来剥离 TLS，并将明文呈现给缓慢的 Macintosh。因此，在为我的 Mac Plus 添加 Wi-Fi 功能后，我增加了一个 TLS 卸载设备，以便我的 Mac 可以独立进行 TLS 解密。这为编写适用于经典 Mac OS 的“现代”网络浏览器（至少是比 MacWeb 更新、能解析 HTML 5 的浏览器）提供了最后一块关键拼图，因为如今一切都是加密的。我于 2024 年开始开发该浏览器，并添加了 Gopher（以及勉强添加的 Gemini）等其他协议。

A couple months ago, I was feeling particularly salty about computers and posted these notes: I have lost all enthusiasm for reading about new software projects, especially dealing with vintage computing. What would have sounded amazing a year or two ago and made me want to engage with the author, I now just assume was something AI spit out and feels hollow and boring so I skim past it.
几个月前，我对计算机感到特别不满，并写下了这些笔记：我已经失去了阅读新软件项目的热情，尤其是涉及复古计算的项目。一两年前听起来很棒、让我想要与作者交流的内容，现在我只会假设那是 AI 生成的，感觉空洞且无聊，所以我直接略过。

And writing software feels like being Marge in that go-kart race. Work slow and steady for a year writing something neat that had never been brought to a platform before, but someone can hear about it and use Claude to whiz by you in a week and make something with 10 times the functionality. Case in point, I saw these today: A modern web browser for Mac OS 9 with CSS, ES5 JavaScript, and TLS. A 3D printer monitoring app for System 7 with video. A year ago either would have sounded awesome but now I scroll past because I assume AI wrote it all.
编写软件的感觉就像卡丁车比赛中的 Marge。你稳扎稳打地花了一年时间编写了一个以前从未在该平台上实现过的精巧程序，但有人听说后，用 Claude 在一周内就超越了你，并做出了功能强十倍的东西。举个例子，我今天看到了这些：一个支持 CSS、ES5 JavaScript 和 TLS 的 Mac OS 9 现代浏览器；一个支持视频的 System 7 3D 打印机监控应用。一年前，这两者听起来都会很棒，但现在我只会滑过去，因为我假设它们都是 AI 写的。

Today someone posted this, a completely vibe-coded Gopher client for classic Mac OS. Claude even made a fancy website for it. And wouldn't you know it, but some of the code for it even comes from my own projects.
今天有人发布了这个，一个完全由“氛围编程”（vibe-coded）生成的经典 Mac OS Gopher 客户端。Claude 甚至为它制作了一个精美的网站。你猜怎么着，其中一些代码甚至来自我自己的项目。

The other week, Andreas tweeted this: Feels like “I actually enjoy writing code by hand” is about to become the big 2026 virtue signal for programmers. While I don't totally agree, it did cause me to question why I bother writing software for 40-year-old computers that only gets used by a handful of people and why I'm bothered by vibecoded software in this context.
前几周，Andreas 发推文说：“我真的很享受手写代码”似乎即将成为 2026 年程序员们主要的道德标榜。虽然我并不完全同意，但这确实让我反思：为什么我要费心为只有少数人使用的 40 年前的计算机编写软件？为什么在这种背景下，我会对“氛围编程”的软件感到困扰？

I write a lot of my software because I want it, but I'm also happy to make it for others in the community to use. Maybe I'm just being vain though, because I want my labor-of-love to be appreciated by people in the community I'm a part of and if a vibecoded version enters the chat with a ton of features and a slick interface, I'm afraid my work will get drowned out and it'll feel like a lot of wasted effort. My Comet will get Yahoo'd.
我编写很多软件是因为我需要它们，但我也很高兴能为社区中的其他人提供这些工具。也许我只是虚荣心作祟，因为我希望我的心血结晶能得到我所在社区成员的认可。如果一个“氛围编程”版本带着海量功能和精美界面出现，我担心我的工作会被淹没，感觉就像白费力气。我的 Comet（彗星）会被 Yahoo（雅虎）吞没。

So if a vibecoded tool is genuinely useful and available now while mine's been in development for years, maybe I should just be happy that other people in the community have something new to use. I can continue working on my version for myself and release it when it's ready. After all, Claude has to take that code from somewhere.
所以，如果一个“氛围编程”工具现在确实有用且可用，而我的项目已经开发了多年，也许我应该为社区里的其他人有了新工具可用而感到高兴。我可以继续为自己开发我的版本，并在准备好时发布它。毕竟，Claude 的代码总得有个来源。
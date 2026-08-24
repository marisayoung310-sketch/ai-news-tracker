---
title: "Lobsters Interview with mitchellh"
originalUrl: "https://alexalejandre.com/programming/interview-with-mitchell-hashimoto/"
date: "2026-07-09T22:52:21.894Z"
---

# Lobsters Interview with mitchellh

**Jul 2026 - Alex Alejandre**

Mitchell Hashimoto was behind Vagrant, Packer, Consul, Terraform, Vault, Nomad, Waypoint and now builds Ghostty and Vouch. In this interview, we talk about terminals, Zig and open source.

Mitchell Hashimoto 曾参与开发 Vagrant、Packer、Consul、Terraform、Vault、Nomad 和 Waypoint，目前正在开发 Ghostty 和 Vouch。在本次采访中，我们聊了聊终端、Zig 语言以及开源。

***

**You’ve been interviewed a lot. Why do people like to interview you?**

你接受过很多采访。为什么人们喜欢采访你？

In interviews, everyone comes from a different angle. Many people want to know how the software engineering to business founder mindset transition went. Then others are interested in product stuff, the work I did at Hashicorp or Ghostty now. What’s different here is there’s no known agenda coming into it; neither of us have anything to sell.

在采访中，每个人的切入点都不同。许多人想了解从软件工程师到企业创始人的思维转变过程。还有些人对产品感兴趣，比如我过去在 Hashicorp 的工作，或者现在的 Ghostty。这次采访的不同之处在于，我们没有任何预设的议程；我们双方都没有什么东西要推销。

***

**What do you find so fun about terminals? Like, why Ghostty?**

你觉得终端有什么好玩的？比如，为什么选择做 Ghostty？

I spent ~15 years building CLI applications (not TUIs like we see nowadays). Through that process, I accidentally learned how to color things, move cursors etc. Leaving Hashicorp, I wanted to sharpen my technical skills (where they’d grown dull from neglect) and specifically work on: Pre-AI GPU programming, desktop/single node systems programming (spending so much time on the distributed side where you didn’t worry about cache locality or vector operations, since network costs dominated). I also really wanted to play with Zig. I wanted to satisfy those 3 things.

我花了大约 15 年时间构建 CLI 应用程序（不是我们现在看到的 TUI）。在这个过程中，我无意中学会了如何处理颜色、移动光标等。离开 Hashicorp 后，我想磨练一下自己（因疏于练习而生疏的）技术，特别是想钻研：AI 时代之前的 GPU 编程、桌面/单节点系统编程（因为在分布式领域待了太久，网络成本占主导地位，无需担心缓存局部性或向量运算）。此外，我真的很想玩玩 Zig。我想满足这三点需求。

After 15 years building CLIs, I didn’t understand how a terminal emulator worked. I knew the components of a terminal but really wanted to understand how it worked, which would also let me work on the GPU, desktop and in Zig. My goal was to run vim and the compiler in it, have it build itself, then throw it away. But as I learned more about the terminal ecosystem, I understood nothing fit the niche I wanted: fast, feature-rich and natively cross-platform. I shared it with a few friends in Discord, who asked if they could share it with others because they were actually using it every day. The Ghostty Discord was just my friends’ group chat which got repurposed. I didn’t want to publish because my public persona would generate too much undue attention, so I ran a private beta for a long time.

在构建了 15 年 CLI 后，我其实并不了解终端模拟器是如何工作的。我知道终端的组成部分，但真的很想深入理解其原理，这也让我能够同时在 GPU、桌面端和 Zig 语言上进行实践。我的目标是在其中运行 vim 和编译器，让它能自我构建，然后将其抛弃。但随着我对终端生态系统的深入了解，我发现没有现成的工具能满足我的需求：快速、功能丰富且原生跨平台。我在 Discord 上与几个朋友分享了它，他们问我是否可以分享给其他人，因为他们确实每天都在使用。Ghostty 的 Discord 频道最初只是我朋友们的群聊，后来被重新利用了。我不想公开，因为我的公众形象会带来太多不必要的关注，所以我进行了很长时间的私密测试。

***

**How can we push terminals harder?**

我们该如何进一步挖掘终端的潜力？

I don’t support pushing terminals to the extreme. Sure, they’re an application platform capable of the same things other application platforms on top of the OS are like the browser, old Java app runtime environments. You could build all functionality into it: video and microphone access, responsive layouts… You could.

我不支持将终端推向极端。当然，它们是一个应用程序平台，能够实现操作系统之上其他应用平台（如浏览器、旧版 Java 运行时环境）所能做的事情。你可以将所有功能构建进去：视频和麦克风访问、响应式布局……你确实可以这样做。

But the browser is good at something, the desktop is good at something else and text-based (monospaced-grid) applications are also good at something unique. These text-based applications should be quick to implement, easy to interact with, clear in their security model. There’s a lot of opportunity in the ecosystem here and I’d love to build more protocols to enable that.

但浏览器擅长某些领域，桌面端擅长另一些领域，而基于文本（等宽网格）的应用程序也有其独特之处。这些基于文本的应用程序应该实现快速、交互简单，并且具有清晰的安全模型。这个生态系统里有很多机会，我很乐意构建更多的协议来实现这一点。

Terminal-based applications lend themselves to composition better than other paradigms. TUIs less so, but most CLI tools have mechanisms (beyond stdin and stdout) to use them like a function (the UNIX do one thing philosophy is the extreme). Neovim and AI tooling offer ever more cmdline flags. A world of better terminal applications, is a world of better automation, scriptability.

基于终端的应用程序比其他范式更易于组合。TUI 稍逊一筹，但大多数 CLI 工具都有（超越 stdin 和 stdout 的）机制，可以将它们像函数一样使用（UNIX 的“只做一件事”哲学就是这种极致）。Neovim 和 AI 工具提供了越来越多的命令行标志。一个拥有更好终端应用程序的世界，就是一个拥有更好自动化和脚本能力的世界。

I want to make the terminal a special place for applications. The PTY’s in-band signalling (an unstructured byte stream with escape sequences) is a big problem. The Nushell ecosystem tries to fix it with another layer, but we need a fundamental improvement. Many people dislike the Microsoft ecosystem, but PowerShell gets a lot right with structured data.

我想让终端成为应用程序的特殊场所。PTY 的带内信号（一种带有转义序列的非结构化字节流）是一个大问题。Nushell 生态系统试图通过增加一层来解决这个问题，但我们需要根本性的改进。许多人不喜欢微软生态系统，但 PowerShell 在处理结构化数据方面确实做得很好。

***

**What do you think about non-legacy terminal APIs?**

你如何看待非传统的终端 API？

My guiding star is how we now have multiple major, huge application platforms: the browser, emacs, the whole Apple ecosystem, Microsoft ecosystem, Android, video game console platforms. These ecosystems have strengths and weaknesses, but how do their frameworks work? On the web, it’s the DOM and JS APIs. On Apple, it’s AppKit, Cocoa and SwiftUI. On Windows, it’s Win32, WinUI etc. On Linux, it’s GTK and Qt etc. When someone says we need a better way of accessing clipboard data (historical protocols are text only, what about images, multiple MIME types etc. which desktops have handled for decades), I would grab the docs for clipboard managers on every platform to see what we’ve landed on. There’s no reason for us to build something based on our own understanding without researching decades of prior art. That’s the approach I’m trying to take here. I’ve not introduced any custom protocols yet.

我的指导原则是参考我们现在拥有的多个大型应用平台：浏览器、Emacs、整个苹果生态系统、微软生态系统、Android 和游戏机平台。这些生态系统各有优劣，但它们的框架是如何工作的呢？在 Web 上，是 DOM 和 JS API；在苹果上，是 AppKit、Cocoa 和 SwiftUI；在 Windows 上，是 Win32、WinUI 等；在 Linux 上，是 GTK 和 Qt 等。当有人说我们需要一种更好的方式来访问剪贴板数据时（历史协议仅支持文本，但桌面端几十年来已经处理了图像、多种 MIME 类型等），我会去查阅每个平台上剪贴板管理器的文档，看看我们最终达成了什么共识。我们没有理由在不研究几十年前现有技术的情况下，仅凭自己的理解去构建东西。这就是我在这里尝试采取的方法。目前我还没有引入任何自定义协议。

Two protocols scream at me. Currently, terminals have a main screen and an alt (sometimes called primary and secondary) with different properties. Main screen is like your shell with scrollback etc. and the alternate screen is like Neovim, most TUIs etc. There are only 2, you either turn a mode on or off putting you into primary or secondary (taking up the whole screen, losing scrollback etc.)

有两个协议让我印象深刻。目前，终端有一个主屏幕和一个备用屏幕（有时称为第一和第二屏幕），它们具有不同的属性。主屏幕就像你的 shell，带有回滚功能等；而备用屏幕则用于 Neovim、大多数 TUI 等。目前只有这两种，你要么开启模式，要么关闭模式，从而进入第一或第二屏幕（占用整个屏幕，失去回滚功能等）。

I’d like to introduce an n-screen API to create and populate an unlimited number of screens in the background, let you overlay screens with separate grid sizes etc. The terminal emulator could handle line wrapping, selection, routing mouse events etc. You could specify a screen as a standalone window which the terminal emulator renders outside of the grid - imagine your Neovim tabs being native window tabs opened at the same time! This foundational layer would solve a lot of things.

我想引入一个 n-screen API，在后台创建并填充无限数量的屏幕，让你能够叠加具有不同网格大小的屏幕等。终端模拟器可以处理自动换行、选择、路由鼠标事件等。你可以将一个屏幕指定为独立窗口，由终端模拟器在网格之外进行渲染——想象一下你的 Neovim 标签页变成了同时打开的原生窗口标签页！这一基础层将解决很多问题。

I also have a spec’d out button protocol. Currently, there are mouse protocols to get notified when someone clicks a grid cell. But you only receive events for what’s currently on the screen, not history, when things scroll back… We currently support hyperlinks (OSC 8) and I’d like something similar to OSC 8 where clicking sends a message (which you specify) to the program. You could create a button with an open_profile ID which will still register when the user scrolls back in history. This affects main screen applications (the only ones with scroll back) like Claude Code. I have no interest discussing AI here, it’s just a really popular main.

我还制定了一个按钮协议规范。目前，有鼠标协议可以在用户点击网格单元格时发出通知。但你只能收到当前屏幕上的事件，而不是历史记录，当内容滚动回去时……我们目前支持超链接（OSC 8），我希望有一种类似于 OSC 8 的机制，点击时向程序发送（你指定的）消息。你可以创建一个带有 open_profile ID 的按钮，即使在用户回滚历史记录时，它仍然可以被注册。这会影响像 Claude Code 这样（唯一拥有回滚功能）的主屏幕应用程序。我没兴趣在这里讨论 AI，它只是一个非常热门的主题。
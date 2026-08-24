---
title: "How to Make a Nintendo 64 Game in 2026"
originalUrl: "https://phoboslab.org/log/2026/08/xibalba64-making-of"
date: "2026-08-07T01:13:15.930Z"
---

# How to Make a Nintendo 64 Game in 2026
# 如何在 2026 年制作一款任天堂 64 游戏

Two years ago, I was Porting my JavaScript Game Engine to C for No Reason. I have since found a reason: making a new N64 game! The result is Xibalba 64 – a Wolfenstein 3D-like FPS. Modretro agreed to publish the game as a physical launch title for their M64 (a modern N64 clone), complete with cartridge, packaging and manual!

两年前，我出于某种原因将我的 JavaScript 游戏引擎移植到了 C 语言。后来我找到了一个理由：制作一款全新的 N64 游戏！成果就是《Xibalba 64》——一款类似《德军总部 3D》的 FPS 游戏。Modretro 同意将这款游戏作为其 M64（一款现代 N64 克隆机）的实体首发游戏发行，并配备了卡带、包装和说明书！

This, to my knowledge, is only the second physical release of any new N64 game since the end of the console's original commercial life. The infamous Xeno Crisis by Bitmap Bureau – originally a new game for the Sega Mega Drive and subsequently released on many, many more consoles – came to the N64 in 2023. No other new games have been published for the N64 since Tony Hawk's Pro Skater 3 in 2002.

据我所知，这是自该主机原始商业生命周期结束以来，第二款发行的全新 N64 实体游戏。Bitmap Bureau 开发的著名游戏《Xeno Crisis》——最初是为世嘉 Mega Drive 开发的新游戏，随后登陆了许多其他平台——于 2023 年登陆了 N64。自 2002 年的《托尼·霍克职业滑板 3》以来，再没有其他新游戏为 N64 发行过。

### The Engine
### 引擎

Impact was a JavaScript game engine I developed back in 2010. It was tailored for 2D action games, handling tile sheets, background maps, sprites and collision detection. It's very simple, but still a sound foundation for whatever you want to throw at it. Two years ago I rewrote Impact in C. Why? I don't know. It was fun.

Impact 是我在 2010 年开发的 JavaScript 游戏引擎。它专为 2D 动作游戏量身定制，处理瓦片图集、背景地图、精灵和碰撞检测。它非常简单，但对于任何你想实现的功能来说，它仍然是一个坚实的基础。两年前，我用 C 语言重写了 Impact。为什么？我不知道，只是觉得很有趣。

This C port, high_impact, has a notion of a “platform backend”. The platform handles the low-level plumbing – opening a window, creating a drawing surface, reading input, etc. Out of the box, high_impact comes with two platform backends (SDL2 and Sokol), and you can compile your game for either one. This already enables high_impact games to run on many different devices.

这个 C 语言移植版本 high_impact 引入了“平台后端”的概念。平台负责处理底层工作——打开窗口、创建绘图表面、读取输入等。开箱即用，high_impact 提供了两个平台后端（SDL2 和 Sokol），你可以选择其中任何一个来编译你的游戏。这使得 high_impact 游戏已经能够在许多不同的设备上运行。

The rendering backend in high_impact is also modular. You can compile your game with a software renderer, OpenGL or Metal (for iOS/macOS). Support for new platform backends or rendering backends can be added without modifying any other part of the engine. A perfect starting point for an N64 game.

high_impact 中的渲染后端也是模块化的。你可以使用软件渲染器、OpenGL 或 Metal（针对 iOS/macOS）来编译你的游戏。添加新的平台后端或渲染后端支持时，无需修改引擎的其他任何部分。这是开发 N64 游戏的完美起点。

### N64 Hardware and Platform Library
### N64 硬件与平台库

The N64 is a quirky beast. In addition to the 93 MHz MIPS CPU (big-endian!), it has two coprocessors for handling graphics, sound and more: “Reality Display Processor” (RDP) – a fixed-function graphics processor; “Reality Signal Processor” (RSP) – a programmable vector processor. Both of these live in the same physical package, commonly called the “Reality Coprocessor” (RCP).

N64 是一个古怪的机器。除了 93 MHz 的 MIPS CPU（大端序！）之外，它还有两个用于处理图形、声音等的协处理器：“现实显示处理器”（RDP）——一个固定功能的图形处理器；“现实信号处理器”（RSP）——一个可编程的向量处理器。这两者位于同一个物理封装中，通常被称为“现实协处理器”（RCP）。

For the first few years of the N64's life, Nintendo closely guarded access to the RSP. It was exclusively used by Nintendo's officially sanctioned platform library, “libultra”. Only later did Nintendo allow game studios to write custom “microcode” (actually just MIPS assembly) for the RSP. Keeping the hardware happy is no simple feat, and the instructions for the RDP are quirky and complicated. Programming your game on bare metal is pretty much out of the question.

在 N64 生命周期的最初几年，任天堂严密控制着对 RSP 的访问。它仅供任天堂官方认可的平台库“libultra”使用。直到后来，任天堂才允许游戏工作室为 RSP 编写自定义“微代码”（实际上只是 MIPS 汇编）。让硬件正常工作绝非易事，而且 RDP 的指令既古怪又复杂。在裸机上编程几乎是不可能的。

In recent years, Nintendo's official “libultra” has made its way onto the internet, but using it would risk a copyright lawsuit. Luckily, the N64 homebrew scene has picked up a lot of steam in the last few years and we have a very capable alternative now: Libdragon.

近年来，任天堂官方的“libultra”已经流传到了互联网上，但使用它会有版权诉讼的风险。幸运的是，N64 自制软件社区在过去几年里发展迅速，我们现在有了一个非常有能力的替代方案：Libdragon。

Libdragon is basically SDL for the N64. It provides facilities for drawing sprites and triangles, sound output, controller input and much more. It took me only a few evenings to build a new platform backend for high_impact on top of libdragon. I tested this with Biolab Disaster. The game code remained unmodified; performance was meh, but I was using the N64 hardware in the most naive way possible.

Libdragon 本质上就是 N64 上的 SDL。它提供了绘制精灵和三角形、声音输出、控制器输入等功能。我只用了几个晚上就在 libdragon 之上为 high_impact 构建了一个新的平台后端。我用《Biolab Disaster》进行了测试。游戏代码保持不变；性能一般，但我当时是以最原始的方式使用 N64 硬件。

### Dev Environment
### 开发环境

Libdragon provides the compilers and everything else that's necessary to build a ROM file for the N64. The installation instructions and all other documentation are comprehensive and well-written. The library comes with many examples to get you started. In general, it was a pleasure to work with Libdragon. Just a heads up: you probably want to use the preview branch as the “stable” trunk branch has hopelessly fallen behind.

Libdragon 提供了编译器以及构建 N64 ROM 文件所需的一切。安装说明和所有其他文档都非常全面且编写精良。该库附带了许多示例供你入门。总的来说，使用 Libdragon 是一种愉快的体验。提醒一下：你可能需要使用预览分支（preview branch），因为“稳定”的主干分支（trunk branch）已经严重落后了。

For testing, a good emulator is invaluable. For the longest time, N64 emulation was extremely inaccurate. Lackluster emulation of the RSP and RDP coprocessors, in particular, was the cause of most problems. Most emulators just emulated Nintendo's platform library, libultra. They emulated the intent to draw a triangle, not what the hardware would actually do. While inaccurate, this made emulation possible at all in the early days.

对于测试来说，一个好的模拟器是无价的。在很长一段时间里，N64 模拟极其不准确。特别是对 RSP 和 RDP 协处理器模拟的不足，是大多数问题的原因。大多数模拟器只是模拟了任天堂的平台库 libultra。它们模拟的是绘制三角形的意图，而不是硬件实际执行的操作。虽然不准确，但这在早期使得模拟成为可能。

These days the N64 core in Ares is much closer to the actual hardware – the RDP and RSP are fully emulated, including accurate timing for the RSP. The infamous slow memory bandwidth of the N64, however, can still only be tested on real hardware (which recently caused me some disappointment).

如今，Ares 中的 N64 核心已经非常接近实际硬件——RDP 和 RSP 得到了完全模拟，包括 RSP 的精确时序。然而，N64 那臭名昭著的缓慢内存带宽仍然只能在真实硬件上进行测试（这最近让我感到有些失望）。

So you need a real N64 and a cartridge that lets you play arbitrary .z64 ROM files. The open-source SummerCart64 is excellent and available from many different manufacturers. Be aware: some manufacturers (especially on AliExpress) cheap out on the components of the board. SummerCart64 has the usual SD card slot to store your ROMs, but what makes it great for development is its USB-C port: you can directly connect it to your PC and upload a ROM as part of your build process using sc64deployer.

因此，你需要一台真正的 N64 和一张可以让你运行任意 .z64 ROM 文件的卡带。开源的 SummerCart64 非常出色，并且可以从许多不同的制造商处购买。请注意：一些制造商（特别是在速卖通上）会在电路板组件上偷工减料。SummerCart64 有用于存储 ROM 的常规 SD 卡槽，但它对开发而言最棒的地方在于其 USB-C 端口：你可以将其直接连接到 PC，并使用 sc64deployer 将 ROM 作为构建过程的一部分上传。

I ended up with the N64 next to my PC, connected via USB, and used a cheap $10 USB analog capture card to display its video output in a window on my desktop. On Linux, it took some fiddling with mpv to get low-latency output; here's the script I used. With this setup, iterating on real hardware was just a matter of compiling and pushing the N64 reset button.

最终，我的 N64 放在 PC 旁边，通过 USB 连接，我使用了一个廉价的 10 美元 USB 模拟采集卡，将视频输出显示在桌面窗口中。在 Linux 上，需要对 mpv 进行一些调整才能获得低延迟输出；这是我使用的脚本。通过这种设置，在真实硬件上进行迭代只需要编译并按下 N64 的重置按钮即可。

### The Game
### 游戏

I originally made Xibalba as a demo for my JavaScript game engine in 2014. WebGL was still the hot new thing back then; a 3D game in a browser was quite a novelty. The game was very short, featuring only a handful of levels, weapons and enemy types. In contrast, I w...

我最初在 2014 年制作《Xibalba》是为了演示我的 JavaScript 游戏引擎。当时 WebGL 还是热门的新事物；在浏览器中运行 3D 游戏相当新奇。这款游戏非常短，只有少数几个关卡、武器和敌人类型。相比之下，我……
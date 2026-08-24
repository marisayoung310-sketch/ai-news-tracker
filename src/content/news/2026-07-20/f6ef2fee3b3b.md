---
title: "More emulation goodness, an Intel Itanium (IA-64) emulator that boots Windows"
originalUrl: "https://raymii.org/s/blog/Intel_Itanium_IA-64-Emulator_that_boots_Windows.html"
date: "2026-07-19T22:16:21.748Z"
---

# More emulation goodness, an Intel Itanium (IA-64) emulator that boots Windows

**更多模拟器佳音：一款能启动 Windows 的 Intel Itanium (IA-64) 模拟器！**

The emulation space is going crazy, after my previous post on Windows booting on DEC Alpha es40 emulator, there is now another huge breakthrough in the emulation of other non-x86 CPU emulation.

模拟器领域正变得疯狂。继我之前发布关于在 DEC Alpha es40 模拟器上启动 Windows 的文章后，非 x86 CPU 模拟领域又迎来了一项重大突破。

Yufeng Gao with help from gdwnldsKSC (the man behind the updated es40-fork) has released version 0.1 of his Intel Itanium (IA-64) emulator that boots the Itanium version of Windows Server 2003 and Windows XP 64-bit. No OpenVMS or HP-UX yet and Linux / BSD also don't boot. But Windows is amazing already.

Yufeng Gao 在 gdwnldsKSC（更新版 es40 分支的幕后功臣）的帮助下，发布了他的 Intel Itanium (IA-64) 模拟器 0.1 版本，该模拟器能够启动 Itanium 版本的 Windows Server 2003 和 Windows XP 64-bit。虽然目前还无法运行 OpenVMS 或 HP-UX，Linux 和 BSD 也无法启动，但能运行 Windows 已经非常令人惊叹了。

Here is a screenshot of Windows Server 2003 with the Luna theme running in the emulator: It runs quite slowly, (486-levels of performance on a Ryzen 5000 series according to this discord channel) but hey, it runs at all. How cool is that!

这是在模拟器中运行带有 Luna 主题的 Windows Server 2003 的截图：它的运行速度相当缓慢（据 Discord 频道称，在 Ryzen 5000 系列处理器上仅有 486 级别的性能），但嘿，它毕竟能跑起来了。这难道不酷吗！

Let's hope development continues and we might even get to run OpenVMS on Itanium, emulated. HP-UX would be nice as well, but I care more for OpenVMS. As far as I know there are no commercial Itanium emulators yet.

希望开发工作能持续下去，我们甚至可能在模拟的 Itanium 上运行 OpenVMS。如果能支持 HP-UX 当然更好，但我个人更关注 OpenVMS。据我所知，目前还没有商业化的 Itanium 模拟器。

You can read more about the Intel Itanium (IA-64) CPU on Wikipedia and here is a great video from RetroBytes with some more history. Basically it was a promising architecture, but didn't make it and effectively it was only used for HP-UX and OpenVMS in the later years. But OpenVMS is now available on x86 and HP-UX is dead in the water, no migration path available there.

你可以在维基百科上阅读更多关于 Intel Itanium (IA-64) CPU 的信息，这里还有一段来自 RetroBytes 的精彩视频，介绍了更多历史背景。简单来说，这曾是一个很有前途的架构，但最终未能成功，在后期实际上仅用于 HP-UX 和 OpenVMS。不过，OpenVMS 现在已经可以在 x86 上运行，而 HP-UX 则已陷入死胡同，没有可用的迁移路径。

I don't think Windows on Itanium was ever used intensively. If you do know of more usage in the real world, please let me know. Here are two more screenshots, also showing Windows XP 64-bit for the Itanium:

我不认为 Windows on Itanium 曾被广泛使用。如果你了解更多现实世界中的应用案例，请告诉我。这里还有两张截图，展示了用于 Itanium 的 Windows XP 64-bit：

The screenshots come from discord. The emulator was announced on Twitter: The code is not open source, but the twitter thread stated: Once cleaned up, it will be available here: https://github.com/TheBrokenPipe/ski.

这些截图来自 Discord。该模拟器是在 Twitter 上宣布的：代码目前尚未开源，但 Twitter 帖子中提到：一旦清理完毕，它将发布在这里：https://github.com/TheBrokenPipe/ski。

Update: 2026-07-20: There seems to be a QEMU fork that can also run Server 2008. See this repo. I haven't checked that one out but it does state that it's written using LLM's. Was mentioned on the Discord server.

更新：2026-07-20：似乎还有一个可以运行 Server 2008 的 QEMU 分支。请查看此仓库。我还没有亲自测试过，但据称它是使用大语言模型（LLM）编写的。这是在 Discord 服务器上被提及的。
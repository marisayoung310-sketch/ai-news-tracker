---
title: "Fully Preserving Fisher-Price Pixter"
originalUrl: "https://dmitry.gr/?r=05.Projects&proj=37.%20Pixter"
date: "2026-05-11T23:07:54.115Z"
---

# Fully Preserving Fisher-Price Pixter
# 完全保存费雪 (Fisher-Price) Pixter 掌机

**TLDR:** First ever complete reverse engineering, documentation, emulation, and preservation of all Fisher-Price/Mattel Pixter device series and [almost] all the games.
**简而言之：** 首次对费雪/美泰 (Fisher-Price/Mattel) Pixter 系列设备及其 [几乎] 所有游戏进行了完整的逆向工程、文档记录、模拟和保存。

---

### Pixter Color: The beginning
### Pixter Color：起源

In 2000, the famous American toy company Fisher-Price released a simple drawing-oriented handheld gaming console for kids called Pixter. It featured no brain-rotting social media and focused, instead, on drawing, sketching, and educational games. The initial sales figure from the holiday season of the release was half a million units, which is not too shabby at all.
2000 年，美国著名玩具公司费雪 (Fisher-Price) 发布了一款名为 Pixter 的儿童绘图掌机。它没有让人沉迷的社交媒体，而是专注于绘画、素描和益智游戏。发布当年的假日季销量就达到了 50 万台，成绩相当不错。

Besides letting kids draw using an included stylus on the 80x80 monochrome display while catchy tunes played on repeat from the speaker, the device also allowed plug-in games to expand the possible activities. There exist 25 known games for Pixter (I had to edit wikipedia to correct their record). Soon after, there was a Pixter Plus, which added more memory and expanded the built-in game. Then there was Pixter 2.0, which added wireless comms. Neither of those radically changed the device itself and all the games remained cross-compatible.
除了让孩子们使用附带的触控笔在 80x80 的单色屏幕上绘画，同时扬声器循环播放动听的旋律外，该设备还支持插入游戏卡带以扩展功能。目前已知 Pixter 共有 25 款游戏（我不得不去编辑维基百科以修正他们的记录）。不久之后，Pixter Plus 发布，增加了内存并扩展了内置游戏。随后是增加了无线通信功能的 Pixter 2.0。这两款设备都没有对硬件本身进行根本性的改变，所有游戏依然保持跨设备兼容。

One cool feature of Pixter devices was that you could draw an image in one game, using its stamps and tools, save it to internal memory, plug in another game, load it, and draw on top of it. So you could, literally, customize a cool car in "Cool Wheels", save the image, plug in "Barbie Fashion Show" and plop a barbie into your cool car image. What joy this must have been!
Pixter 设备的一个酷炫功能是，你可以在一个游戏中使用印章和工具绘制图像，将其保存到内存中，然后插入另一个游戏，加载该图像并继续在其上绘画。因此，你完全可以在《Cool Wheels》中定制一辆酷车，保存图像，然后插入《Barbie Fashion Show》，把芭比娃娃放到你的酷车图片里。这一定带来了无穷的乐趣！

In 2003, Pixter Color came out, adding color, 4x the screen resolution, and a new game cartridge connector. An adapter came with it to allow it to run old games, and it ran them all (pixel-doubled) perfectly! Obviously, the old monochrome Pixters could not run new color games. The main purpose of the device remained the same - sketching and stickers with ability to save your compositions in memory, just in color now! Games got more advanced and intricate. There was even a camera attachment! There are 32 games known to exist for Pixter Color.
2003 年，Pixter Color 发布，增加了彩色显示、4 倍的屏幕分辨率以及新的游戏卡带接口。它附带了一个适配器，可以运行旧版游戏，并且运行效果（像素倍增后）非常完美！显然，旧款单色 Pixter 无法运行新的彩色游戏。设备的核心用途保持不变——素描和贴纸，并能将作品保存在内存中，只是现在变成了彩色！游戏变得更加先进和复杂。甚至还有一个摄像头配件！目前已知 Pixter Color 共有 32 款游戏。

In 2005, Pixter Multimedia came out, which added a better screen (quality-wise, the resolution remained the same) and a yet another game cartridge connector (a superset of the Pixter Color connector), allowing for Multimedia-only carts. Nine of these Pixter Multimedia exclusive game are known to exist.
2005 年，Pixter Multimedia 发布，它配备了更好的屏幕（质量上，分辨率保持不变）和另一个游戏卡带接口（Pixter Color 接口的超集），支持 Multimedia 专属卡带。目前已知有 9 款 Pixter Multimedia 独占游戏。

As I had written before, my friend Josh pointed me at Pixter Color as potential PalmOS porting target, and after a lot of work, I got PalmOS fully working on that device. This is not that story, however! To get PalmOS working, the device had to be understood, a method to run code on it had to be found, and among all that research, a lot of work was done on documenting Pixter Color.
正如我之前写过的，我的朋友 Josh 向我推荐了 Pixter Color，认为它是一个潜在的 PalmOS 移植目标。经过大量工作，我成功让 PalmOS 在该设备上完美运行。不过，这并不是那个故事！为了让 PalmOS 运行，必须先理解该设备，找到在其上运行代码的方法，而在所有这些研究过程中，我完成了大量关于 Pixter Color 的文档记录工作。

Previously, a few places online mentioned that “THERE ARE CURRENTLY NO EMULATORS FOR THIS DEVICE OR PLATFORM. ANY CLAIMS TO OFFER THEM ARE SCAMS!”. This is no longer true, I am happy to report. I am here to present a complete historical preservation of all information pertaining to how Pixter devices work and almost all the games. However, let us go in order...
此前，网上有几处提到：“目前没有针对该设备或平台的模拟器。任何声称提供模拟器的行为都是诈骗！”我很高兴地告诉大家，事实不再如此了。我在此展示对 Pixter 设备工作原理的所有相关信息以及几乎所有游戏的完整历史保存。然而，让我们按顺序来……

---

### Sometimes, you get lucky
### 有时，你会很幸运

As there were no official docs on writing Pixter games or code, the first step of the process was to open a Pixter and see what was inside. It would later turn out that starting with Pixter Color was quite lucky -- its main SoC is the LQFP version of Sharp LH75411. Why is this lucky? Unlike other chips and chip package...
由于没有关于编写 Pixter 游戏或代码的官方文档，该过程的第一步是拆开一台 Pixter，看看里面有什么。后来证明，从 Pixter Color 开始研究是非常幸运的——它的主 SoC 是 Sharp LH75411 的 LQFP 封装版本。为什么这很幸运？与其他芯片和芯片封装不同……
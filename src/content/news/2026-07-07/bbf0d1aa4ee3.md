---
title: "Mr. Baby Paint & accidentally discovering a new cellular automata"
originalUrl: "https://tekstien-marginaalien-keskus.aalto.fi/residenssi/heikki/blog/004-december-2/"
date: "2026-07-06T22:47:44.831Z"
---

# Mr. Baby Paint & accidentally discovering a new cellular automata

**December — Mr. Baby Paint & accidentally discovering a new cellular automata & pixel-fattening Heikki Lotvonen | written on 4.2.2026**
12月——Mr. Baby Paint、意外发现的元胞自动机与像素加粗算法，作者：Heikki Lotvonen | 写于2026年4月2日

I spent a better part of December on building Mr. Baby Paint, a radically simple co-op drawing app for toddlers & accidentally discovering a flood-fill cellular automata, plus developing pixel-fattening algorithms for bitmap fonts.
我花了大半个12月来开发“Mr. Baby Paint”——一款为幼儿设计的极简协作绘画应用，期间还意外发现了一种基于泛洪填充（flood-fill）的元胞自动机，并为位图字体开发了像素加粗算法。

### Designing software for toddlers: Mr. Baby Paint
### 为幼儿设计软件：Mr. Baby Paint

I also managed to make and release a new editor during December! It's called Mr. Baby Paint. My 3-year old kid wants to participate in everything I do, including computer stuff. He enjoys pressing the springy keys, wiggling the mouse, making it do clicky sounds, and spinning the wheel. But with that kind of skillset, there's not yet a lot he can do with the computer.
12月里，我还成功制作并发布了一款新编辑器，名叫 Mr. Baby Paint。我那3岁的孩子想参与我做的每一件事，包括用电脑。他喜欢按压有弹性的键盘、晃动鼠标、制造点击声以及拨动滚轮。但以他目前的技能水平，他还无法在电脑上做太多事情。

All I could think of is two things: experimental keyboard-smashing poetry in a text editor, or "action paint" in a drawing app. We tried both Wordpad and MS Paint. As simple as it gets, I thought. While he did manage to draw some beautiful but random scribbles and produce interesting yet unintelligible letter poems, overall the experience was more frustrating than fun.
我当时能想到的只有两件事：在文本编辑器里进行“乱敲键盘”式的实验诗歌创作，或者在绘画应用里进行“动作绘画”。我们试了 Wordpad 和 MS Paint，我本以为它们已经足够简单了。虽然他确实画出了一些漂亮但随意的涂鸦，也写出了一些有趣但无法解读的字母诗，但总的来说，这段经历挫败感多于乐趣。

Because his mouse movements and clicks were haphazard and erratic, and key presses random, I had to constantly intervene to bring back the typing or drawing mode after he "mis"clicked some random menu, toolbar or taskbar item. And changing colors, fonts or other options also meant I had to take the mouse away from him for a bit. He found these interruptions annoying, because he just wanted to keep playing. (But for some reason, when the computer is off, he's not interested in playing with them.)
由于他的鼠标移动和点击杂乱无章，按键也是随机的，每当他“误”点到菜单、工具栏或任务栏的某个项目时，我就不得不不断介入，帮他恢复到打字或绘画模式。而更改颜色、字体或其他选项也意味着我必须暂时把鼠标从他手中拿走。他觉得这些打断很烦人，因为他只想一直玩下去。（但不知为何，当电脑关机时，他对这些东西又没兴趣了。）

So, Wordpad or MS Paint wouldn't do, and I couldn't find anything else that would be simple enough for our needs and his skillset. So, I had to make my own. And I wanted to tackle this task with the same seriousness that I would any other software project, and really think how to design a good software experience for toddlers (in co-op with their carers). The result is a radically simple drawing app called Mr. Baby Paint.
所以，Wordpad 或 MS Paint 都不行，我也找不到其他既能满足我们需求又适合他技能水平的软件。因此，我必须自己做一个。我希望以对待其他软件项目同样的严谨态度来处理这项任务，并认真思考如何为幼儿（及其监护人协作）设计良好的软件体验。最终的成果就是这款名为 Mr. Baby Paint 的极简绘画应用。

At first I thought because the app is simple, that it would be a simple to do, but it turned out to be a much more interesting challenge than I expected, and it produced some surprising outcomes, like accidentally discovering a flood fill based cellular automaton.
起初我以为因为应用很简单，开发起来也会很简单，但事实证明这比我预期的要有趣得多，而且产生了一些意想不到的结果，比如意外发现了一种基于泛洪填充的元胞自动机。

### Requirements
### 需求

The minimum viable product I envisioned for this drawing app is as follows: a fullscreen blank canvas with no menus or toolbars, where clicking and dragging the mouse draws directly on the screen. My kid sits on my lap controlling the mouse while I handle keyboard shortcuts with my left hand — CMD+S to save his drawings and CMD+E to clear the canvas. The entire screen is the drawing area, and nothing breaks the experience, not even if he smashes the keyboard.
我为这款绘画应用设想的最小可行性产品（MVP）如下：一个全屏空白画布，没有菜单或工具栏，点击并拖动鼠标即可直接在屏幕上绘画。我的孩子坐在我腿上控制鼠标，而我用左手处理键盘快捷键——CMD+S 保存他的画作，CMD+E 清空画布。整个屏幕都是绘画区域，没有任何东西会打断体验，即使他乱敲键盘也不会。

But, I also wanted the app to be slightly more interesting and fun than that and really encourage drawing and creative play. Every action should be rewarding, whether they were intentional or not. So every action either makes a mark, produces a sound effect, visual effect, or a combination of these. There's no way to "mess up". So, left-click draws, scroll drops sand and right-click paintbuckets. The faster you draw, the more paint splatter it produces.
但我还希望这款应用能比这更有趣、更好玩，真正鼓励绘画和创意游戏。每一个动作都应该是令人愉悦的，无论是有意还是无意。所以每一个动作要么留下痕迹，要么产生音效、视觉效果，或者是它们的组合。这里没有“搞砸”一说。左键点击绘画，滚动滚轮落下沙子，右键点击使用油漆桶。画得越快，产生的颜料飞溅就越多。

One of the problems I had was that when you move the mouse really fast, the computer doesn't actually register the movement as a fluid continuous curve, but as discrete points in space captured every few milliseconds. This is fine for normal computer use, but unuseable for a drawing app where you want to draw a continuous line.
我遇到的一个问题是，当你快速移动鼠标时，电脑并不会将移动记录为一条流畅的连续曲线，而是记录为每隔几毫秒捕捉到的空间离散点。这对于普通电脑使用来说没问题，但对于想要画出连续线条的绘画应用来说是不可用的。

Most drawing apps solve this by connecting each point with a line, which works great for moderately fast mouse movements. But, toddler mouse movements can be really fast, so the distance between the captured mouse positions can be tens or hundreds of pixels apart, making the supposedly fluid curve look very angular. I solved this by using a Catmull-Rom spline to connect the points, which creates a smooth continuous curve between points. Then, I just stamp the brush texture along the curve every 1px. This approach was laggy for larger brushes, so I had to limit the stamping distance for them.
大多数绘画应用通过用直线连接每个点来解决这个问题，这对于中等速度的鼠标移动效果很好。但是，幼儿的鼠标移动速度可能非常快，捕捉到的鼠标位置之间的距离可能相隔几十甚至几百像素，使得本应流畅的曲线看起来非常生硬。我通过使用 Catmull-Rom 样条曲线连接这些点解决了这个问题，它在点之间创建了平滑的连续曲线。然后，我只需每隔 1 像素沿着曲线印上笔刷纹理。这种方法对于较大的笔刷会有延迟，所以我不得不限制了它们的印记间距。

### The UI
### 用户界面

Instead of requiring precise mouse control, I made use of the erratic mouse movement: moving the cursor anywhere on the screen edges changes some setting: Left edge of the screen is divided into 16 segments, which controls the brush size AND the selected font. Bottom edge of the screen is also divided into 16 segments, for selecting one of 16 colors. Top edge is divided into 64, for selecting one of the following characters: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 ! ?". One of the fonts is a set of icons and shapes instead. Right edge is divided into just two: circle and square brush.
为了不需要精确的鼠标控制，我利用了那种杂乱的鼠标移动：将光标移动到屏幕边缘的任何位置都会更改设置：屏幕左边缘分为 16 个部分，用于控制笔刷大小和所选字体。屏幕底边也分为 16 个部分，用于选择 16 种颜色之一。顶边分为 64 个部分，用于选择以下字符之一：“A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 ! ?”。其中一种字体是一组图标和形状。右边缘仅分为两个部分：圆形和方形笔刷。

### Co-op paint
### 协作绘画

In reality, it's not really meant for toddlers to use all by themselves, but the idea is to (of course) do this activity together with a toddler — so it's more like a co-op paint for parents (or other carers) and toddlers. All of the more complex functionalities are meant to be activated with a keyboard shortcut by the parent while the toddler can focus on the main thing, drawing, without any unneccessary interruptions.
实际上，它并不是为了让幼儿独自使用而设计的，其初衷（当然）是与幼儿一起进行这项活动——所以它更像是为家长（或其他监护人）和幼儿准备的协作绘画。所有更复杂的功能都旨在由家长通过键盘快捷键激活，而幼儿可以专注于主要的事情——绘画，而不会受到任何不必要的干扰。

For example, it can be difficult for young kids to actually hold down the left mouse button, so a parent can hold down the Alt (or Option on Mac) key to trigger the draw function while their child just moves the mouse around.
例如，幼儿可能很难一直按住鼠标左键，所以家长可以按住 Alt（Mac 上为 Option）键来触发绘画功能，而孩子只需移动鼠标即可。

Other keyboard shortcuts include:
其他键盘快捷键包括：
* Draw with Left-Click or hold down Option/Alt (左键点击或按住 Option/Alt 绘画)
* Fill with Right-Click or Cmd/Ctrl + X (右键点击或 Cmd/Ctrl + X 填充)
* Pour sand with Mouse Scroll or hold down Enter (滚动鼠标或按住 Enter 倾倒沙子)
* Pause fill and sand falling with Spacebar (空格键暂停填充和沙子下落)
* Save the drawing with Cmd/Ctrl + S (Cmd/Ctrl + S 保存画作)
* Erase the drawing with Cmd/Ctrl + E (Cmd/Ctrl + E 清除画作)
* Undo with Cmd/Ctrl + Z (Cmd/Ctrl + Z 撤销)
* Redo with Cmd/Ctrl + Shift + Z (Cmd/Ctrl + Shift + Z 重做)
* Close a stroke (drawn line) with Cmd/Ctrl + C (Cmd/Ctrl + C 闭合笔触)
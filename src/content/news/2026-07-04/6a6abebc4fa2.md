---
title: "The Dune keypad device can be your meeting controller and more"
originalUrl: "https://techcrunch.com/2026/07/03/the-dune-keypad-device-can-be-your-meeting-controller-and-more/"
date: "2026-07-03T22:29:04.067Z"
---

# The Dune keypad device can be your meeting controller and more
# Dune 键盘设备：你的会议控制器及更多功能

My biggest pet peeve with meeting apps is that each one has a different shortcut for muting your mic or turning off your webcam. It’s hard to remember which keys do what when you’re mid-meeting and trying to make a point or ask a question. I always wanted a physical, universal button for mute and camera control — something I could hit without thinking.
我使用会议软件时最头疼的一点是，每个软件静音麦克风或关闭摄像头的快捷键都不一样。在会议中途，当你正试图表达观点或提出问题时，很难记住哪个键对应什么功能。我一直想要一个物理的、通用的静音和摄像头控制按钮——一种我无需思考就能按下的设备。

Project Mirage’s Dune, a tiny, three-key aluminum keypad — about the size of a stick of gum — that plugs into your MacBook’s USB-C port, does just that. The $119 gadget has three buttons, and it changes context based on what app you are looking at. For instance, in meeting apps and sites, it could be toggle mic, toggle video, and bring window to the front. For Excel or Sheets, it could be copy, paste, and undo. For Chrome, it could be refresh, jump to URL bar, and paste. You get the gist.
Project Mirage 推出的 Dune 正是为此而生。它是一个小巧的三键铝制键盘，大小约等于一根口香糖，通过 MacBook 的 USB-C 接口连接。这款售价 119 美元的设备拥有三个按钮，并会根据你当前使用的应用程序自动切换功能。例如，在会议应用和网站中，它可以是切换麦克风、切换视频和将窗口置顶；在 Excel 或 Sheets 中，它可以是复制、粘贴和撤销；在 Chrome 中，它可以是刷新、跳转到地址栏和粘贴。你大概明白它的意思了。

Developers can also use it with apps like VS Code or GitHub to merge, approve, or close a pull request. The startup builds each unit to match your specific Mac model, so it sits flush against the laptop with no gap underneath. If your ports are already in use, you can connect it through a dongle instead. Dune has no battery and needs no separate charger — it draws power straight from the MacBook.
开发者也可以将其用于 VS Code 或 GitHub 等应用，进行合并、批准或关闭 Pull Request 等操作。这家初创公司会根据你具体的 Mac 型号定制每一台设备，使其能与笔记本电脑紧密贴合，底部没有缝隙。如果你的接口已被占用，也可以通过转接头连接。Dune 没有电池，也不需要单独充电——它直接从 MacBook 获取电力。

Currently, the startup supports M2 Air or later and M1 Pro or later models of MacBook running macOS 15 Sequoia or a later version. The device looks and feels nice, but I felt the keys had more resistance. Right now, it is easy to push a key by mistake. A few times, I mistakenly unmuted myself or killed my camera because my hand brushed the device while reaching for a water bottle or coffee mug. It shouldn’t be this easy to press a key.
目前，该设备支持运行 macOS 15 Sequoia 或更高版本的 M2 Air 及后续机型，以及 M1 Pro 及后续机型的 MacBook。这款设备外观和手感都不错，但我感觉按键的阻力稍大。目前，它很容易被误触。有几次，我在伸手拿水瓶或咖啡杯时手碰到了设备，导致我不小心取消了静音或关闭了摄像头。按键不应该这么容易被触发。

Dune ships with a companion app for configuring shortcuts, either per-app or system-wide. Within a given app, you can assign a Dune key to a keyboard shortcut, a command, or a link that opens an app or URL.
Dune 附带一个配套应用程序，用于配置快捷方式，既可以针对特定应用，也可以设置全局快捷键。在特定的应用程序内，你可以将 Dune 的按键分配给键盘快捷键、命令，或者打开某个应用或网址的链接。

Through the app, Dune also syncs with your calendar and surfaces your next meeting a few minutes before it starts, so you can join, dismiss, or send an “I’m running late” message with one tap. If you want deeper customization, you can write and run your own Python script. If you don’t code, Dune has an easy integration with Claude Desktop: You describe the shortcut you want in plain language, and Claude writes it and assigns it to a key for that app — no manual setup required.
通过该应用，Dune 还能与你的日历同步，并在会议开始前几分钟提醒你，这样你只需轻轻一点，就能加入会议、拒绝会议或发送“我会迟到”的消息。如果你想要更深度的定制，可以编写并运行自己的 Python 脚本。如果你不会编程，Dune 与 Claude Desktop 的集成非常简单：你只需用通俗语言描述你想要的快捷方式，Claude 就会编写代码并将其分配给该应用的按键——无需手动设置。

I built a shortcut that, whenever I’m on a startup’s website, pulls up a quick brief on the company: its competitors, investors, and questions I might ask if I booked a meeting with them. For anyone whose job involves sizing up companies quickly — investors, founders, operators — it’s a task tailor-made for Dune. I also built one that converts images to JPEG so I can upload them quickly to WordPress or social platforms. Both were easy to build and needed no manual configuration, though getting a shortcut fully working still takes some back-and-forth with Claude, including debugging once you actually run it.
我创建了一个快捷方式：每当我访问一家初创公司的网站时，它就会调出该公司的简要信息，包括竞争对手、投资者，以及如果我预约了会议可能会问的问题。对于那些需要快速评估公司的人（如投资者、创始人和运营人员）来说，这简直是为 Dune 量身定制的功能。我还创建了一个将图片转换为 JPEG 格式的快捷方式，以便快速上传到 WordPress 或社交平台。两者都很容易构建，无需手动配置，尽管要让快捷方式完全正常工作，仍需要与 Claude 进行一些反复沟通，包括在实际运行后的调试。

The app also has a marketplace, from where you can explore skills made by other Dune owners. If the marketplace takes off, it could become core to Dune’s growth and retention strategy — hardware as a thin front end for a Claude-powered skills ecosystem, where each new skill gives owners one more reason to stick around. However, at the moment, there are only limited skills. Plus, there is no way to test out a skill without assigning it to the hardware button — ideally, the app would let you preview a skill before committing it to hardware.
该应用还有一个市场，你可以在那里探索其他 Dune 用户制作的“技能”。如果这个市场发展起来，它可能会成为 Dune 增长和留存策略的核心——硬件作为由 Claude 驱动的技能生态系统的轻量级前端，每一项新技能都让用户多了一个留下的理由。然而，目前可用的技能还很有限。此外，如果不将技能分配给硬件按钮，就无法测试它——理想情况下，应用应该允许你在将其应用到硬件之前先预览技能。

The startup needs to proactively add more of its own suggested skills for different apps to its users. Project Mirage’s device retails for $149 after its introductory price expires, and it’s a solid pick for anyone productivity-minded. MuteMe covers just mute/unmute, and Stream Deck offers business-focused macros, but Dune is easier to customize on both hardware and software.
这家初创公司需要主动为用户添加更多针对不同应用的建议技能。Project Mirage 的这款设备在优惠期结束后零售价为 149 美元，对于任何注重生产力的人来说，它都是一个不错的选择。MuteMe 仅涵盖静音/取消静音功能，Stream Deck 提供面向商业的宏命令，但 Dune 在硬件和软件上的定制都更加简便。
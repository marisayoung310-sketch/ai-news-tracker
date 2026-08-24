---
title: "Framework responds to complaints that BIOS update bricks Ryzen 7040 laptops"
originalUrl: "https://arstechnica.com/gadgets/2026/08/framework-responds-to-complaints-that-bios-update-bricked-ryzen-7040-laptops/"
date: "2026-08-19T21:48:50.399Z"
---

# Framework responds to complaints that BIOS update bricks Ryzen 7040 laptops
# Framework 回应关于 BIOS 更新导致 Ryzen 7040 笔记本电脑“变砖”的投诉

A BIOS update for the Framework Laptop 13 with AMD Ryzen 7040-series processors is bricking the systems, multiple users have reported online. Framework started shipping pre-built Ryzen 7040-based Framework Laptop 13 computers and compatible motherboards in 2023.
多名用户在网上反映，针对搭载 AMD Ryzen 7040 系列处理器的 Framework Laptop 13 的 BIOS 更新导致系统“变砖”。Framework 于 2023 年开始发售预装 Ryzen 7040 的 Framework Laptop 13 电脑及兼容主板。

In June 2026, Framework released BIOS 3.20 for the devices. The update adds mainboard support for features, including a haptic touchpad and new speakers, for the higher-end Framework Laptop 13 Pro and fixes issues, including one “where the Battery Extender status was reported incorrectly following a reboot, hibernation, or shutdown after the timer had expired,” per a post on Framework’s forum from an employee.
2026 年 6 月，Framework 为这些设备发布了 BIOS 3.20 版本。根据 Framework 员工在论坛上的发帖，此次更新为主板增加了对高端 Framework Laptop 13 Pro 功能的支持（包括触觉反馈触控板和新扬声器），并修复了一些问题，其中包括“在计时器到期后，重启、休眠或关机时电池扩展器（Battery Extender）状态报告错误”的问题。

Some users say that they installed the update successfully. Numerous others, however, claim that the installation stalls, bricking the laptop. “[T]he update process seems to have stalled,” a Framework forum user named Sven posted in July. “What I see is a black screen and a progress bar with 2 dots and then the Framework logo. The progress bar is not moving for about 3 hours now. Also, I can’t turn off the Framework using the power button, no matter how long I hold it down. Now the BIOS update is stuck, and I can not power down or reboot the machine.”
一些用户表示他们已成功安装更新。然而，许多其他用户声称安装过程卡住，导致笔记本电脑“变砖”。一位名为 Sven 的 Framework 论坛用户在 7 月发帖称：“更新过程似乎卡住了。我看到的是黑屏，进度条上有两个点，然后是 Framework 的标志。进度条已经有大约 3 个小时没有动静了。此外，无论我按住电源键多久，都无法关闭 Framework。现在 BIOS 更新卡住了，我既无法关机也无法重启机器。”

Ars Technica contacted Framework, asking how many customers are affected. In a company statement, Framework said it has “received reports of a small percentage of Framework Laptop 13 7040 Series BIOS updates resulting in non-bootable boards.” Framework is investigating the root cause of the issue, the statement said.
Ars Technica 联系了 Framework，询问有多少客户受到影响。Framework 在一份公司声明中表示，已“收到报告称，小部分 Framework Laptop 13 7040 系列的 BIOS 更新导致主板无法启动”。声明称，Framework 正在调查该问题的根本原因。

There are reports of users having problems with BIOS upgrades on Ryzen 7040-based Framework Laptop 13 devices going back to at least March 2025. After the most recent BIOS update, some users reported that Framework support told them they needed a new motherboard, but Framework wouldn’t provide it for free because the customer was past warranty.
有报告显示，早在 2025 年 3 月，就有用户在使用基于 Ryzen 7040 的 Framework Laptop 13 设备进行 BIOS 升级时遇到问题。在最近一次 BIOS 更新后，一些用户反映 Framework 客服告知他们需要更换新主板，但由于客户已过保修期，Framework 不会免费提供。

Framework’s statement to Ars says: “… in addition to replacing in-warranty Mainboards, we are making exceptions for out-of-warranty replacements where we can confirm a stable-release BIOS update caused the board to become non-bootable.”
Framework 在给 Ars 的声明中表示：“……除了更换保修期内的主板外，如果我们能确认是稳定版 BIOS 更新导致主板无法启动，我们也会对过保修期的更换申请进行特殊处理。”

Framework is also introducing a “Crisis Recovery Mode” BIOS functionality to enable a path for failed updates to be directly recoverable. “Our latest Framework Desktop BIOS release includes this functionality, and we are actively bringing it to Framework Laptop 12, 13, and 16 in our upcoming BIOS release cycles for each,” Framework said.
Framework 还引入了“紧急恢复模式”（Crisis Recovery Mode）BIOS 功能，为更新失败提供直接恢复的途径。Framework 表示：“我们最新的 Framework 台式机 BIOS 版本已包含此功能，我们正积极将其引入 Framework Laptop 12、13 和 16 的后续 BIOS 发布周期中。”

We won’t be sure of the source of the problems until Framework provides more information. Blogger Guanzhong Chen, however, wrote a detailed blog post this week about their purported experience with their motherboard breaking and suggested the problem stems from “some bug with the software that caused it to display what appears to be random memory on the screen, especially when this has happened before to other people for other BIOS versions.”
在 Framework 提供更多信息之前，我们无法确定问题的根源。不过，博主 Guanzhong Chen 本周撰写了一篇详细的博客文章，讲述了其主板损坏的经历，并指出问题可能源于“软件中的某个错误，导致屏幕上显示出看似随机的内存数据，尤其是当其他人之前在其他 BIOS 版本中也遇到过这种情况时。”

The software developer, who was ultimately able to flash the firmware onto their motherboard after a support representative reportedly told him to buy a new one, added: “At the same time, it somehow flashes the BIOS slower in regular operation than a cheap 15 MHz programmer over pogo pins, which really makes you wonder what it’s doing under the hood.”
这位软件开发者在被客服告知需要购买新主板后，最终成功自行刷入了固件。他补充道：“与此同时，它在正常运行时的 BIOS 刷写速度竟然比通过弹簧针（pogo pins）连接的廉价 15 MHz 编程器还要慢，这真让人怀疑它在后台到底在做什么。”
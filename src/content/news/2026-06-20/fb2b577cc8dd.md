---
title: "Changes/UseKmsconVTConsole"
originalUrl: "https://fedoraproject.org/wiki/Changes/UseKmsconVTConsole"
date: "2026-06-19T22:22:22.523Z"
---

# Changes/UseKmsconVTConsole

### Use kmscon as default VT console
### 将 kmscon 作为默认的虚拟终端（VT）控制台

#### Summary
This change is to replace the kernel console fbcon with the userspace console kmscon in Fedora, to provide an enhanced and more secure console for Fedora users. The long term goal is also to deprecate fbcon/fbdev emulation in the kernel, and this is the first step in this direction.

此项变更旨在将 Fedora 中的内核控制台 `fbcon` 替换为用户空间控制台 `kmscon`，从而为 Fedora 用户提供一个增强且更安全的控制台。长远目标是弃用内核中的 `fbcon/fbdev` 模拟，而这是迈向该目标的第一步。

#### Detailed Description
fbcon is a terminal emulator in the kernel, which is not well maintained (it lost scrolling support a few years ago due to a CVE), and requires a fbdev emulation layer in the kernel, as all GPU drivers are using the newer drm interface. It still requires userspace executable like getty and bash to be useful.

`fbcon` 是内核中的一个终端模拟器，目前维护状况不佳（几年前因 CVE 漏洞失去了滚动支持），并且需要内核中的 `fbdev` 模拟层，因为所有 GPU 驱动程序都在使用较新的 `drm` 接口。它仍然需要像 `getty` 和 `bash` 这样的用户空间可执行文件才能发挥作用。

kmscon is a simple terminal emulator based on linux kernel mode setting (KMS). It can replace fbcon for VT console, and provide better keyboard support, and better security. This change will do the following: Install kmscon by default, and update the symbolic link /usr/lib/systemd/system/autovt@.service to point to kmsconvt@.service, to start kmscon by default when switching VT.

`kmscon` 是一个基于 Linux 内核模式设置（KMS）的简单终端模拟器。它可以替代 `fbcon` 作为 VT 控制台，并提供更好的键盘支持和更高的安全性。此项变更将执行以下操作：默认安装 `kmscon`，并将符号链接 `/usr/lib/systemd/system/autovt@.service` 更新为指向 `kmsconvt@.service`，以便在切换 VT 时默认启动 `kmscon`。

#### Benefit to Fedora
kmscon is more configurable, and has more features than fbcon:
* Uses xkbcommon for keyboard layout, so it supports multiple layout, and switching between them with configurable shortcut.
* Has better unicode support.
* Can use pango for font rendering, and has better compatibility with double-width character.
* Scrolling.
* Better security, as it's a userspace program, compared to fbcon running in the kernel. A crash in kmscon will make the systemd service to restart it. A crash in fbcon triggers a kernel panic.

`kmscon` 比 `fbcon` 更具可配置性，且功能更丰富：
* 使用 `xkbcommon` 处理键盘布局，因此支持多种布局，并可通过可配置的快捷键进行切换。
* 拥有更好的 Unicode 支持。
* 可以使用 `pango` 进行字体渲染，对双倍宽度字符的兼容性更好。
* 支持滚动。
* 安全性更高，因为它是一个用户空间程序，而 `fbcon` 运行在内核中。`kmscon` 崩溃只会导致 systemd 服务重启它，而 `fbcon` 崩溃则会触发内核恐慌（Kernel Panic）。

#### User Experience Improvements
The look & feel of the VT console, will be much better. Users will be able to configure special fonts, and use more unicode characters. Users will have the same keyboard layout has what they have in graphical environment. (Currently the kernel keyboard layout are different). Users will be able to scroll in the console.

VT 控制台的视觉体验将得到显著改善。用户将能够配置特殊字体并使用更多的 Unicode 字符。用户在控制台中的键盘布局将与图形环境中的保持一致（目前内核的键盘布局与图形环境不同）。用户还可以在控制台中进行滚动操作。

#### Caveats
Starting graphical application from the console (like "startx") won't work, but you can work around it by using the script kmscon-launch-gui startx.

从控制台启动图形应用程序（如 "startx"）将无法直接工作，但可以通过使用脚本 `kmscon-launch-gui startx` 来解决此问题。
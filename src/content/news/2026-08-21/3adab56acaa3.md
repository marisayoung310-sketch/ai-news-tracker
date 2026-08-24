---
title: "AprilNEA / OpenLogi"
originalUrl: "https://github.com/AprilNEA/OpenLogi"
date: "2026-08-20T21:55:43.238Z"
---

# AprilNEA / OpenLogi

**Warning:** OpenLogi is under active development and not yet stable — features and config may still change. Give the repo a Star ⭐ and Watch 👀 it to get notified when a new release lands.
**警告：** OpenLogi 处于活跃开发阶段，尚未稳定——功能和配置仍可能发生变化。请给仓库点个 Star ⭐ 并 Watch 👀，以便在发布新版本时收到通知。

### OpenLogi ⚡️
A native, local-first alternative to Logitech Options+, written in Rust 🦀. Unlock the full capabilities of Logitech mice, keyboards, and webcams over HID++ and UVC. Fed up with Options+? Try OpenLogi. Runs on macOS, Linux, and Windows.
一个用 Rust 编写的、原生的、本地优先的 Logitech Options+ 替代方案 🦀。通过 HID++ 和 UVC 协议解锁罗技鼠标、键盘和摄像头的全部功能。厌倦了 Options+？试试 OpenLogi。支持 macOS、Linux 和 Windows。

### Beyond Options+ (超越 Options+)
Things OpenLogi does that Options+ won't:
OpenLogi 能做到而 Options+ 做不到的事情：
* **Stay light:** Native Rust + GPUI.
* **保持轻量：** 原生 Rust + GPUI。
* **Run on Linux:** Linux is a first-class platform in OpenLogi.
* **运行在 Linux 上：** Linux 在 OpenLogi 中是第一优先级平台。
* **Gestures on any button:** Give the gesture role to any physical button — or turn gestures off entirely.
* **任意按键手势：** 将手势功能分配给任何物理按键，或者完全关闭手势。
* **Plain-text config:** Everything is one TOML file you can sync between machines however you like.
* **纯文本配置：** 所有设置都在一个 TOML 文件中，你可以随心所欲地在不同机器间同步。
* **Script it:** A real CLI alongside the GUI.
* **脚本化：** 除了 GUI 外，还提供真正的 CLI。

### Features (功能)
* **Devices:** Connected over Logi Bolt receivers, Unifying receivers, Bluetooth, or a wired connection, with battery percentage and charge state.
* **设备：** 支持通过 Logi Bolt 接收器、Unifying 接收器、蓝牙或有线连接，并显示电池百分比和充电状态。
* **Button remapping:** Via the OS input hook: a built-in action catalog plus custom keyboard shortcuts authored in the TOML config.
* **按键重映射：** 通过操作系统输入钩子实现：内置动作目录，以及在 TOML 配置中自定义的键盘快捷键。
* **Per-application profile overlays:** Auto-switch on app focus (macOS + Windows; Linux on X11 / XWayland only).
* **应用专属配置覆盖：** 在应用获得焦点时自动切换（macOS + Windows；Linux 仅限 X11 / XWayland）。
* **Litra lights:** Power, brightness, and color temperature, with optional auto power that follows camera activity.
* **Litra 灯光：** 控制电源、亮度和色温，并可选随摄像头活动自动开关电源。
* **Mouse:** Capture and remap the middle, mode-shift, and thumbwheel buttons; per-direction gesture bindings with live capture.
* **鼠标：** 捕获并重映射中键、模式切换键和拇指滚轮；支持在任何支持的按键上进行实时捕获的方向手势绑定。
* **Actions Ring:** A cursor-centred, eight-slot overlay of actions, with per-application layouts.
* **动作环 (Actions Ring)：** 一个以光标为中心的八槽位动作覆盖层，支持应用专属布局。
* **DPI control:** With presets and Cycle / Set-preset actions.
* **DPI 控制：** 支持预设以及循环/设置预设动作。
* **SmartShift wheel:** Mode toggle, sensitivity, and a permanent-ratchet panel.
* **SmartShift 滚轮：** 模式切换、灵敏度调节和永久棘轮面板。
* **Keyboard:** Global F-key remapping, typed text, key combos, multi-step workflows, and static RGB lighting.
* **键盘：** 全局 F 键重映射、文本输入、组合键、多步工作流以及静态 RGB 灯光控制。
* **Camera:** Any Logitech UVC webcam (plug and play); live preview; image controls (zoom, focus, exposure, etc.) written straight to UVC hardware; one-click profiles.
* **摄像头：** 支持任何罗技 UVC 摄像头（即插即用）；实时预览；直接写入 UVC 硬件的图像控制（缩放、对焦、曝光等）；一键配置。

### Install (安装)
**Important:** Quit Logi Options+ first: the two applications fight over HID++ access, and only one can own a given receiver at a time.
**重要：** 请先退出 Logi Options+：这两个应用程序会争夺 HID++ 访问权限，且同一时间只能有一个程序控制接收器。

* **macOS:** Requires macOS 13 or later. Download the .dmg from the latest release or install via Homebrew: `brew install --cask openlogi`.
* **macOS：** 需要 macOS 13 或更高版本。从最新发布页面下载 .dmg 文件，或通过 Homebrew 安装：`brew install --cask openlogi`。
* **Linux:** Download the package (.deb, .rpm, .pkg.tar.zst) from the latest release. NixOS users can import the repository's module.
* **Linux：** 从最新发布页面下载对应的包（.deb, .rpm, .pkg.tar.zst）。NixOS 用户可以直接导入仓库的模块。
* **Windows:** Signed portable .zip archives and per-user .msi installers are attached to each release.
* **Windows：** 每个发布版本都附带了已签名的便携版 .zip 压缩包和用户级 .msi 安装程序。

### Usage & Development (使用与开发)
See `USAGE.md` for CLI usage, `CONFIGURATION.md` for configuration details, and `DEVELOPMENT.md` for building from source.
请参阅 `USAGE.md` 了解 CLI 使用方法，`CONFIGURATION.md` 了解配置详情，以及 `DEVELOPMENT.md` 了解如何从源码构建。

### Acknowledgments (致谢)
Windows, cameras, and i18n by @davidbudnick — keyboard RGB, Windows.
Windows、摄像头和国际化功能由 @davidbudnick 开发 — 键盘 RGB、Windows 支持。
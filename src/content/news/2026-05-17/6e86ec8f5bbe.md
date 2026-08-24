---
title: "How to Fix Samsung Galaxy Book4 Pro Speakers on Linux"
originalUrl: "https://dev.to/bernardo_lebron/how-to-fix-samsung-galaxy-book4-pro-speakers-on-linux-25n9"
date: "2026-05-16T22:39:24.538Z"
---

# How to Fix Samsung Galaxy Book4 Pro Speakers on Linux
# 如何修复 Linux 下三星 Galaxy Book4 Pro 的扬声器问题

### The Problem
### 问题所在

If you have a Samsung Galaxy Book4 Pro running Linux, you've probably noticed that the internal speakers don't work. The headphone jack works fine, but the built-in speakers are completely silent — regardless of your distro or kernel version. This post documents what actually works after hours of research through forums, repositories, and documentation.

如果你正在使用运行 Linux 的三星 Galaxy Book4 Pro，你可能已经发现内置扬声器无法工作。耳机插孔工作正常，但内置扬声器完全静音——无论你使用什么发行版或内核版本。本文记录了在查阅了数小时的论坛、代码仓库和文档后，真正有效的解决方案。

### Why It Happens
### 原因分析

The Galaxy Book4 Pro uses the Realtek ALC298 codec combined with MAX98390 smart amplifiers connected via I2C bus. The Linux kernel detects the codec correctly, but never initializes the MAX98390 amplifier — resulting in completely silent speakers. On Windows, Samsung installs a proprietary DSP driver that automatically initializes and controls this amp. On Linux, that driver simply doesn't exist.

Galaxy Book4 Pro 使用 Realtek ALC298 编解码器，并结合了通过 I2C 总线连接的 MAX98390 智能放大器。Linux 内核可以正确识别编解码器，但无法初始化 MAX98390 放大器，导致扬声器完全静音。在 Windows 上，三星安装了专有的 DSP 驱动程序，可以自动初始化并控制该放大器。而在 Linux 上，该驱动程序根本不存在。

### Diagnosis
### 诊断

First, confirm your hardware is affected:
`cat /proc/asound/card0/codec#0 | grep -i "codec\|subsystem"`

首先，确认你的硬件是否受此问题影响：
`cat /proc/asound/card0/codec#0 | grep -i "codec\|subsystem"`

If you see Codec: Realtek ALC298 and a Subsystem ID starting with 0x144d (Samsung), you're in the right place. Also confirm the amp is never initialized:
`sudo dmesg | grep -i "max98\|cs35\|speaker\|amp"`

如果你看到 `Codec: Realtek ALC298` 且子系统 ID（Subsystem ID）以 `0x144d`（三星）开头，那么你找对地方了。此外，确认放大器未被初始化：
`sudo dmesg | grep -i "max98\|cs35\|speaker\|amp"`

If there are no lines about MAX98390, the amp was never woken up.

如果没有关于 MAX98390 的行，说明放大器从未被唤醒。

### The Fix
### 修复方法

Thanks to the amazing work by @Andycodeman and the open source community, there's a DKMS driver that solves the problem. The fix installs the MAX98390 driver, creates a systemd service that initializes the amp on every boot, and works automatically after restarting.

感谢 @Andycodeman 和开源社区的出色工作，现在有一个 DKMS 驱动程序可以解决这个问题。该修复程序会安装 MAX98390 驱动程序，创建一个在每次启动时初始化放大器的 systemd 服务，并在重启后自动生效。

Before installing, verify:
`# Secure Boot must be disabled`
`mokutil --sb-state`

安装前请确认：
`# 必须禁用安全启动 (Secure Boot)`
`mokutil --sb-state`

Installation (Ubuntu/Zorin/Mint/Pop!_OS):
`curl -sL https://github.com/Andycodeman/samsung-galaxy-book-linux-fixes/archive/refs/heads/main.tar.gz | tar xz && cd samsung-galaxy-book-linux-fixes-main/speaker-fix && sudo ./install.sh`

安装（适用于 Ubuntu/Zorin/Mint/Pop!_OS）：
`curl -sL https://github.com/Andycodeman/samsung-galaxy-book-linux-fixes/archive/refs/heads/main.tar.gz | tar xz && cd samsung-galaxy-book-linux-fixes-main/speaker-fix && sudo ./install.sh`

Test without rebooting:
`sudo systemctl start max98390-hda-i2c-setup.service`
If sound comes out, reboot to confirm it persists:
`sudo reboot`

无需重启即可测试：
`sudo systemctl start max98390-hda-i2c-setup.service`
如果有声音输出，请重启以确认设置是否持久生效：
`sudo reboot`

### Improving Sound Quality with EasyEffects
### 使用 EasyEffects 提升音质

The driver initializes the amp, but the sound is more "raw" than on Windows (where Samsung uses proprietary DSP). To improve it, install EasyEffects:
`sudo apt install -y easyeffects calf-plugins`

驱动程序虽然初始化了放大器，但声音比 Windows 下（三星使用了专有 DSP）要“原始”得多。为了改善音质，请安装 EasyEffects：
`sudo apt install -y easyeffects calf-plugins`

In the Effects → Output tab, add:
*   **Equalizer** — boost mids (1kHz~4kHz) and reduce excessive bass (32Hz~250Hz)
*   **Limiter** with threshold at -3dB — prevents distortion on peaks
*   **Compressor** with 4:1 ratio and 5ms attack — softens hard transients

在“效果 (Effects)”→“输出 (Output)”选项卡中，添加：
*   **均衡器 (Equalizer)** — 增强中频 (1kHz~4kHz) 并减少过多的低音 (32Hz~250Hz)
*   **限制器 (Limiter)** — 阈值设为 -3dB，防止峰值失真
*   **压缩器 (Compressor)** — 比率设为 4:1，启动时间 (attack) 设为 5ms，以柔化突兀的瞬态

Set EasyEffects to run in the background: ⋯ → Launch as a Service

将 EasyEffects 设置为在后台运行：⋯ → 作为服务启动 (Launch as a Service)

### Tested On
### 测试环境

| Model | Distro | Kernel | Status |
| :--- | :--- | :--- | :--- |
| Galaxy Book4 Pro (NP940XGK) | Zorin OS 18.1 | 6.17.0-23-generic | ✅ Working |

| 型号 | 发行版 | 内核 | 状态 |
| :--- | :--- | :--- | :--- |
| Galaxy Book4 Pro (NP940XGK) | Zorin OS 18.1 | 6.17.0-23-generic | ✅ 正常工作 |

### Credits
### 致谢

*   **Andycodeman** — DKMS packaging, install scripts, dynamic I2C detection
*   **Kevin Cuperus** — Original MAX98390 driver code (upstream PR #5616)
*   **Google Redrix (Chromebook)** — DSP firmware blobs extracted from same MAX98390 hardware

*   **Andycodeman** — DKMS 打包、安装脚本、动态 I2C 检测
*   **Kevin Cuperus** — 原始 MAX98390 驱动代码 (上游 PR #5616)
*   **Google Redrix (Chromebook)** — 从相同的 MAX98390 硬件中提取的 DSP 固件二进制文件

👉 **Repository:** [https://github.com/Andycodeman/samsung-galaxy-book-linux-fixes](https://github.com/Andycodeman/samsung-galaxy-book-linux-fixes)
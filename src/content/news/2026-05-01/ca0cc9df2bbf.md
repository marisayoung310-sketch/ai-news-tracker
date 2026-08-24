---
title: "Virtualizing SteamOS with QEMU/KVM: The Steps Nobody Tells You"
originalUrl: "https://dev.to/retro-1o1/virtualizing-steamos-with-qemukvm-the-steps-nobody-tells-you-2mcm"
date: "2026-04-30T22:41:50.539Z"
---

# Virtualizing SteamOS with QEMU/KVM: The Steps Nobody Tells You
# 在 QEMU/KVM 中虚拟化 SteamOS：那些没人告诉你的步骤

SteamOS is not a standard Linux distribution. It ships as a recovery image for the Steam Deck, not a generic ISO. That fact explains every strange requirement you face when you try to run it in a virtual machine. The file you download is a .bz2 archive, not an installer. The VM must present the virtual drive as NVMe. And if you let the system reboot right after installation it will launch into Gaming Mode, which cannot work without the Deck's custom AMD GPU. I have a full in-depth walkthrough on my blog. This post gives you the reasoning and the exact commands to get a working VM, plus the one intervention that saves you from a permanent black screen.

SteamOS 并不是一个标准的 Linux 发行版。它作为 Steam Deck 的恢复镜像发布，而非通用的 ISO 文件。这一事实解释了你在尝试将其运行在虚拟机中时所遇到的所有奇怪要求。你下载的文件是一个 .bz2 压缩包，而不是安装程序。虚拟机必须将虚拟驱动器呈现为 NVMe 设备。此外，如果你在安装后直接让系统重启，它会进入“游戏模式”（Gaming Mode），而该模式在没有 Steam Deck 定制 AMD GPU 的情况下无法运行。我的博客上有完整的深度指南。本文将为你提供实现这一目标的逻辑和确切命令，以及一个能让你免于陷入永久黑屏的关键操作。

### The .bz2 Archive Hides a Raw Disk Image
### .bz2 压缩包中隐藏的原始磁盘镜像

Head to Valve's official SteamOS page and you get a steamOS-recovery-image.bz2 file. Decompress it with: `tar -xjf steamOS-recovery-image.bz2`. Inside you'll find a .img file. It's a raw block-level copy of a full SteamOS installation, not a live environment. It contains a GPT partition table, the bootloader, and the A/B root partitions used for atomic updates. Valve compresses it with BZIP2 to keep the download small. That's fair.

前往 Valve 的官方 SteamOS 页面，你会得到一个 `steamOS-recovery-image.bz2` 文件。使用 `tar -xjf steamOS-recovery-image.bz2` 进行解压。在里面你会发现一个 .img 文件。这是一个完整 SteamOS 安装的原始块级副本，而不是一个 Live 环境。它包含了 GPT 分区表、引导加载程序以及用于原子更新的 A/B 根分区。Valve 使用 BZIP2 对其进行压缩以减小下载体积，这很合理。

### Why You Must Use an NVMe Virtual Drive
### 为什么必须使用 NVMe 虚拟驱动器

The Steam Deck uses an NVMe SSD. The recovery image's installer scripts look for a block device at `/dev/nvme0n1`. If you attach the virtual disk as a SATA or IDE drive, the kernel sees `/dev/sda` and the installer will say no valid target is found. It's not a bug. It's what the script expects. In QEMU you emulate an NVMe controller. First create a virtual disk: `qemu-img create -f qcow2 steamOSDrive.qcow2 16G`. Then map it in the launch command. The crucial flags are: `-drive if=none,id=nvme0,file=steamOSDrive.qcow2 -device nvme,drive=nvme0,serial=badbeef`. The serial number is required and can be any string. The moment the recovery environment sees an NVMe namespace, the install option lights up.

Steam Deck 使用的是 NVMe SSD。恢复镜像的安装脚本会寻找 `/dev/nvme0n1` 处的块设备。如果你将虚拟磁盘挂载为 SATA 或 IDE 驱动器，内核会将其识别为 `/dev/sda`，安装程序就会提示找不到有效目标。这不是 Bug，而是脚本的预期行为。在 QEMU 中，你需要模拟一个 NVMe 控制器。首先创建一个虚拟磁盘：`qemu-img create -f qcow2 steamOSDrive.qcow2 16G`。然后在启动命令中映射它。关键参数是：`-drive if=none,id=nvme0,file=steamOSDrive.qcow2 -device nvme,drive=nvme0,serial=badbeef`。序列号是必须的，可以是任意字符串。一旦恢复环境检测到 NVMe 命名空间，安装选项就会被激活。

### UEFI Firmware Is Not Optional
### UEFI 固件是必不可少的

SteamOS boots via UEFI with a GPT partition layout. Legacy BIOS won't work. QEMU provides UEFI through the OVMF firmware. You need two files: `OVMF_CODE.fd` (read-only firmware code) and `OVMF_VARS.fd` (persistent NVRAM for boot variables). On most distros these live in `/usr/share/ovmf/x64/`. Pass them as pflash drives: `-drive if=pflash,format=raw,unit=0,file=OVMF.fd,readonly=on -drive if=pflash,format=raw,unit=1,file=OVMF_VARS.fd`. Without these, the VM tries BIOS mode, finds nothing on a GPT disk, and halts.

SteamOS 通过 UEFI 和 GPT 分区布局启动。传统的 BIOS 模式无法工作。QEMU 通过 OVMF 固件提供 UEFI 支持。你需要两个文件：`OVMF_CODE.fd`（只读固件代码）和 `OVMF_VARS.fd`（用于启动变量的持久化 NVRAM）。在大多数发行版中，它们位于 `/usr/share/ovmf/x64/`。将它们作为 pflash 驱动器传入：`-drive if=pflash,format=raw,unit=0,file=OVMF.fd,readonly=on -drive if=pflash,format=raw,unit=1,file=OVMF_VARS.fd`。如果没有这些，虚拟机将尝试 BIOS 模式，在 GPT 磁盘上找不到引导项，从而停止运行。

### The Full Installation Command
### 完整的安装命令

With all pieces in place, the complete QEMU command for the installation phase looks like this:

当所有准备就绪后，安装阶段的完整 QEMU 命令如下：

```bash
qemu-system-x86_64 \
 -cpu host -enable-kvm -smp 2 -m 8G \
 -drive if=pflash,format=raw,unit=0,file=OVMF.fd,readonly=on \
 -drive if=pflash,format=raw,unit=1,file=OVMF_VARS.fd \
 -drive file=SteamOS.img,format=raw \
 -drive if=none,id=nvme0,file=steamOSDrive.qcow2 \
 -device nvme,drive=nvme0,serial=badbeef \
 -display "gtk,gl=on" \
 -device usb-tablet -usb
```

It boots the recovery image with the empty NVMe drive ready. Inside the VM, open the "Wipe Devices & Install SteamOS" option and click Proceed. The installer will write the A/B partitions to your virtual NVMe.

它会启动恢复镜像，并准备好空的 NVMe 驱动器。在虚拟机内部，打开“Wipe Devices & Install SteamOS”选项并点击 Proceed。安装程序会将 A/B 分区写入你的虚拟 NVMe 磁盘。

### The Gaming Mode Trap (Cancel the Reboot)
### 游戏模式陷阱（取消重启）

Once the installation finishes, the wizard asks you to restart. If you click Proceed, SteamOS boots into Gaming Mode, which expects AMD GPU hardware. Inside a VM you get nothing but a black screen. Do not reboot. Instead, press `Ctrl + Alt + T` inside the VM to open a terminal. From there you force SteamOS to boot into the KDE Plasma desktop. Run these chroot commands on both partition sets:

安装完成后，向导会要求你重启。如果你点击 Proceed，SteamOS 会进入游戏模式，该模式需要 AMD GPU 硬件支持。在虚拟机中，你只会看到黑屏。不要重启。相反，在虚拟机内按下 `Ctrl + Alt + T` 打开终端。从那里你可以强制 SteamOS 进入 KDE Plasma 桌面。在两个分区集上分别运行以下 chroot 命令：

```bash
sudo steamos-chroot --disk nvme0n1 --partset A --no-overlay
steamos-readonly disable
echo '[Autologin]' > /etc/sddm.conf.d/zz-steamos-autologin.conf
echo 'Session=plasma.desktop' >> /etc/sddm.conf.d/zz-steamos-autologin.conf
steamos-readonly enable
exit
```

Repeat the same block for `--partset B`. Then type `reboot`. The VM will now start directly into a working KDE Plasma session.

对 `--partset B` 重复上述操作。然后输入 `reboot`。现在虚拟机将直接启动进入可用的 KDE Plasma 会话。

### Why All This Matters
### 这一切的意义

SteamOS is a locked-down appliance OS built for one device. Running it in a VM reveals the assumptions baked into the installer and teaches you a lot about how Valve's immutable filesystem and A/B update scheme work. And once you have a working desktop session, you can use it almost like any Arch-based system. For a deeper dive that covers additional configuration, GPU passthrough notes, and troubleshooting, check out the full original guide on MusaBase: *How to Virtualize SteamOS: Test Its Power Within QEMU/KVM (2026 Updated)*. That's it. No magic, just an OS that wants to be on real Deck hardware. With a few QEMU tricks, you can convince it to run anyway.

SteamOS 是为单一设备构建的封闭式系统。在虚拟机中运行它，可以揭示安装程序中预设的假设，并让你深入了解 Valve 的不可变文件系统和 A/B 更新机制是如何工作的。一旦你拥有了可用的桌面会话，你几乎可以像使用任何基于 Arch 的系统一样使用它。如需深入了解更多配置、GPU 直通说明和故障排除，请查看 MusaBase 上的完整原始指南：*How to Virtualize SteamOS: Test Its Power Within QEMU/KVM (2026 Updated)*。就是这样。没有魔法，这只是一个本应运行在真实 Deck 硬件上的操作系统。通过一些 QEMU 技巧，你依然可以成功让它运行起来。
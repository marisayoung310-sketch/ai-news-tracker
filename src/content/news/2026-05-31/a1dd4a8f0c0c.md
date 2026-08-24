---
title: "Nix on Sailfish X (Sailfish OS for Sony Xperia)"
originalUrl: "https://toast.al/posts/techlore/2026-05-30_nix-on-sailfish-os/"
date: "2026-05-30T22:30:07.200Z"
---

# Nix on Sailfish X (Sailfish OS for Sony Xperia)

Sailfish OS is a partially-open, GNU/Linux-based mobile OS to compete with the U.S.-based, privacy-draining, you-no-longer-truly-own-your-device, nannying Android / iOS duopoly. That was a mouthful, but we need to address the fact that we need to be taking back our freedoms, privacy, sovereignty from these megacorporations. Step one is planning your duopoly off-ramp — & while there are quite a few Linux options, Sailfish OS is a viable one of those options & the one I chose (since I like Sony hardware, & you will want microSD support for a Linux phone — if not for your phones generally until the OEMs took them away from us).

Sailfish OS 是一个半开放的、基于 GNU/Linux 的移动操作系统，旨在与美国主导的、侵犯隐私的、让你不再真正拥有设备所有权的、充满管制的 Android/iOS 双头垄断进行竞争。这话虽然说起来很长，但我们必须正视一个事实：我们需要从这些巨头手中夺回我们的自由、隐私和主权。第一步是规划你的“双头垄断”退出方案——虽然 Linux 选项不少，但 Sailfish OS 是其中一个可行的选择，也是我个人的选择（因为我喜欢索尼的硬件，而且你会希望 Linux 手机支持 microSD 卡——如果不是为了你的手机普遍支持的话，直到 OEM 厂商把这个功能从我们手中夺走）。

We will be looking to augment the small package set Jolla provides by installing Nix + Nixpkgs, which will give us access to the largest package set for software out there where much of it is compiled for aarch64 consumption! This is the set up I chose (& would recommend given it’s what I did), but readers are to take part of the free part of free software & make modifications.

我们将通过安装 Nix + Nixpkgs 来扩充 Jolla 提供的有限软件包集合，这将使我们能够访问目前最大的软件库，其中大部分软件都已为 aarch64 架构编译！这是我选择的配置（鉴于这是我的实践，我也会推荐它），但读者们应当发挥自由软件的“自由”精神，根据自己的需求进行修改。

### Quick background
### 背景简述

I actually set this up on my device a while back & I loved the novelty I showing folks proper Nix running on a phone (the NixOS phone project doesn’t support much unfortunately), but in hindsight I would have made some changes. The Sailfish OS 5.1.0.7 update (which I was so excited to get the notification for!) ultimately went bad for me — & it seems enough other users that they yanked it & created a 5.1.0.8 patch to help with the storage calculation situation. I was able to get back up & running without losing any data, but I decided to grow space for the root partition by culling space / rebuilding the nix partition as I wanted to start over since I mistakenly used the Determinate Nix installer instead of the official one & got stranded on their proprietary fork after an upgrade since they stopped supporting the upstream Nix installation[*]. Needless to say, I would be better off just starting over on Nix… while actually taking notes.

我之前在设备上配置过这个方案，我很喜欢向人们展示在手机上运行原生 Nix 的新奇感（遗憾的是 NixOS 手机项目支持的设备并不多），但事后看来，我本该做些调整。Sailfish OS 5.1.0.7 更新（我当时收到通知时非常兴奋！）最终对我来说出了问题——似乎其他用户也遇到了足够多的问题，导致官方撤回了该版本并发布了 5.1.0.8 补丁来修复存储计算问题。我成功恢复了系统且没有丢失任何数据，但我决定通过清理空间/重建 nix 分区来扩大根分区，因为我想重新开始。我之前错误地使用了 Determinate Nix 安装程序而不是官方版本，导致在升级后被困在他们的专有分支上，因为他们停止了对上游 Nix 安装的支持[*]。不用说，我最好还是在 Nix 上重新开始……同时做好笔记。

### Laying the seabed: Device layout, file systems, & where to put Nix
### 铺设基石：设备布局、文件系统及 Nix 的存放位置

On the Sailfish side, we know that the device setup uses LVM for a logical volume layout separating root & home, with home being LUKS-encrypted, & both on ext4. But within this layout /nix will need a location. The Nix folder has some special requirements that deserve some thought:
* The Nix store should never have plaintext sensitive data, so no need for encryption overhead.
* Nix, without setting bounds, will balloon & eat a ton of space on disk.
* Broadly, Nix is write once, read many I/O with append-only/immutable behavior instead of mutating files.
* Heaps of tiny *.drv & .nar files.

在 Sailfish 端，我们知道设备设置使用 LVM 进行逻辑卷布局，将 root 和 home 分开，其中 home 使用 LUKS 加密，两者都基于 ext4 文件系统。但在这种布局中，/nix 需要一个位置。Nix 文件夹有一些特殊要求，值得深思：
* Nix 存储库不应包含明文敏感数据，因此无需加密开销。
* 如果不加限制，Nix 会迅速膨胀并占用大量磁盘空间。
* 从广义上讲，Nix 是“一次写入，多次读取”的 I/O 模式，具有仅追加/不可变的特性，而不是修改文件。
* 存在大量微小的 *.drv 和 .nar 文件。

With this workload, I will opt for a separate LVM volume to prevent any runaway chance of Nix growing beyond a size I want, while using F2FS with neither fscrypt nor LUKS encryption. While ext4 is a safe default here (& actually has tools Sailfish repositories ship with), & the differences have been narrowing, I still can’t quit F2FS in this scenario since:
* It’s optimized for NAND flash like eMMC & UFS.
* inline_data can store .drv & .nar files in the inode.
* inline_dentry can help query the ocean that is /nix/store.
* atgc can help identify hot vs. cold data to clean / move data in a manner to reduce writes.
* gc_merge to only GC when FS isn’t under pressure or even more optimally, script a hybrid TRIM such as after a Nix garbage collection or big home-manager build.

针对这种工作负载，我选择使用独立的 LVM 卷，以防止 Nix 无限制增长，同时使用 F2FS 文件系统，且不启用 fscrypt 或 LUKS 加密。虽然 ext4 是一个安全的默认选择（Sailfish 仓库中也确实提供了相关工具），且两者之间的差距正在缩小，但在这种情况下我依然倾向于 F2FS，原因如下：
* 它针对 eMMC 和 UFS 等 NAND 闪存进行了优化。
* inline_data 可以将 .drv 和 .nar 文件直接存储在 inode 中。
* inline_dentry 有助于查询庞大的 /nix/store。
* atgc 有助于识别热数据与冷数据，从而以减少写入的方式清理/移动数据。
* gc_merge 可以在文件系统压力较小时进行垃圾回收，或者更理想地，编写脚本在 Nix 垃圾回收或大型 home-manager 构建后执行混合 TRIM 操作。

### Discovery of our Recovery
### 发现恢复模式

**Important:** You should already have finished installing following Sailfish X Guide page. Just like seasoned Android ROM fans recognize, given that these were once Android devices, we will need to do some recovery in the form of flashing some images. These images will come in ZIP archive from either the trials page or via purchasing a license.

**重要提示：** 你应该已经按照 Sailfish X 指南页面完成了安装。正如资深的 Android ROM 玩家所知，鉴于这些设备曾经是 Android 设备，我们需要通过刷入一些镜像来进行恢复。这些镜像包含在从试用页面下载或购买许可证后获得的 ZIP 压缩包中。

**Note:** For whatever odd reason, they only let you purchase a license if you are in Europe? 🤨

**注意：** 不知为何，他们只允许欧洲用户购买许可证？🤨

Unzipping the archive, & changing into its extract directory, we get…
解压压缩包并进入提取目录后，我们得到……

```bash
$ find . -type f -iname "*.img"
./vendor_boot.img
./hybris-boot.img
./hybris-recovery.img
./dtbo.img
```

Take a wild guess which one of these images is gonna be used. Jolla’s published a Recovery Guide too you should follow.
猜猜看这些镜像中哪一个会被用到。Jolla 也发布了恢复指南，你应该遵循它。

```bash
$ fastboot flash boot_a hybris-boot.img
$ fastboot flash boot_b hybris-boot.img
$ fastboot reboot
```

This puts our device into a state where once attached to a capable machine with telnet, we can phone in with `telnet 10.42.66.66` (or whatever the address the tiny font on the display says). Once the telnet is executed, whisper you best “I’m in” Trinity impression, & read the menu options on screen.

这会将我们的设备置于一种状态：一旦连接到支持 telnet 的机器，我们就可以通过 `telnet 10.42.66.66`（或者显示屏上微小字体显示的地址）进行连接。一旦执行了 telnet，模仿《黑客帝国》里 Trinity 的语气低声说一句“我进来了”（I'm in），然后阅读屏幕上的菜单选项。
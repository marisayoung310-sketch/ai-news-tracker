---
title: "The death and rebirth of my home server"
originalUrl: "https://sgt.hootr.club/blog/home-server-rebirth/"
date: "2026-07-19T22:16:13.461Z"
---

# The death and rebirth of my home server
# 我的家庭服务器之死与重生

A few evenings ago my partner and I were in the mood to install this particular Linux ISO. The guys from Red Letter Systems had spoken of it well, it had good reviews on boundingboxd, and my partner liked the installation trailer.
几天前的晚上，我和伴侣兴致勃勃地想要安装某个特定的 Linux ISO 镜像。Red Letter Systems 的那帮人对它评价很高，在 boundingboxd 上也有不错的口碑，而且我伴侣也很喜欢它的安装预告片。

I opened Tremotesf on my phone to check whether I already had it on the Pi, but the torrent list wouldn't load. The SMB mount wouldn't mount. I couldn't SSH into it either.
我打开手机上的 Tremotesf 查看树莓派上是否已经下载好了，但种子列表无法加载。SMB 挂载也失败了，我也无法通过 SSH 连接到它。

Not eager to ruin the evening by starting a debugging session then and there, I chalked it up to a simple issue with the recent changes I made to the NixOS configuration and resolved to take a look at it the next day.
我不希望因为立刻开始调试而毁了那个夜晚，于是将其归咎于我最近对 NixOS 配置所做的改动，并决定第二天再处理。

The next day I hooked the Pi up to the dedicated debugging display I have in the closet, cracked knuckles, said "it's debugging time" or something to that effect, and rebooted the brick.
第二天，我把树莓派连接到储藏室里的专用调试显示器上，活动了一下手指关节，说了句“调试时间到了”之类的话，然后重启了这个“砖头”。

The current NixOS generation started booting, loaded the kernel and... hung there. No more output. The previous generation did the same. I took the microSD card out for further inspection.
当前的 NixOS 版本开始引导，加载了内核，然后……就卡在那里了，没有任何输出。尝试之前的版本也是一样。我取出了 microSD 卡进行进一步检查。

The first obvious step was to fsck it; the power had mysteriously gone out in the whole building a few days prior, and perhaps it happened right when one of the blocks containing some files important for the boot process was being written? Anyway, it was worth a check. fsck.ext4 reported and fixed lots of errors. Running it again reported the FS as clean, but ejecting and then plugging the card back in turned up more errors...
最显而易见的步骤是运行 fsck；几天前整栋楼莫名其妙地停电了，也许正好是在写入引导过程重要文件的某个区块时发生的？总之，检查一下是有必要的。fsck.ext4 报告并修复了大量错误。再次运行显示文件系统已修复，但弹出并重新插入卡后，又出现了更多错误……

Long story short, the card was likely dead, and the blackout had simply delivered the coup de grace. Press F to pay respects.
长话短说，这张卡很可能已经报废了，而那次停电只是给了它致命一击。按 F 表示哀悼。

### Taking inventory
### 清点库存

This Raspberry Pi 4B had been running for years almost 24/7 so this didn't come as a surprise. My understanding is that SD cards can sustain a comparatively small number of write cycles before they start to fail. The surprising part was that mine managed to run for so long with no issues, considering how badly I'd been treating it. The microSD was mounted as the root FS and I had taken next to no precautions to minimize writes.
这台树莓派 4B 已经几乎 24/7 运行了多年，所以这并不令人意外。据我所知，SD 卡在开始损坏前只能承受相对较少的写入周期。令人惊讶的是，考虑到我平时对它有多“粗暴”，它竟然能坚持运行这么久而没出问题。这张 microSD 卡被挂载为根文件系统，而我几乎没有采取任何减少写入的预防措施。

I didn't lose much, all things considered. The important stuff mostly lived in external HDDs and the configuration lived almost entirely in my NixOS configuration. The only things that lived on the microSD card and I had no backup for were .torrent files and caches for Navidrome, Jellyfin, and slskd, all of which I could easily regenerate. Immich's data was safely backed up on an external drive and I was taking regular backups, so nothing was lost there.
总的来说，我并没有损失太多。重要的东西大多存储在外部硬盘中，配置则几乎完全存在于我的 NixOS 配置文件里。唯一存储在 microSD 卡上且没有备份的只有 .torrent 文件以及 Navidrome、Jellyfin 和 slskd 的缓存，这些我都可以轻松重建。Immich 的数据安全地备份在外部驱动器上，而且我一直在进行定期备份，所以那里没有任何损失。

I've never had a "primary" drive die on me like this before; the worst I've seen were a few dead flash drives that contained nothing important. The fear of a dead drive and lost data has resided in the back of my mind ever since I was a teenager and accidentally [wiped] the main OS X partition on my macbook while trying to install Linux for the first time, but now it's worse than ever, so I wanted to take strong precautions.
我以前从未遇到过“主”驱动器这样损坏的情况；我见过最糟糕的情况也只是几个坏掉的闪存盘，里面没存什么重要的东西。自从我十几岁时第一次尝试安装 Linux 意外抹除 MacBook 上的主 OS X 分区后，对驱动器损坏和数据丢失的恐惧就一直萦绕在心头，但现在这种恐惧比以往任何时候都强烈，所以我决定采取强有力的预防措施。

### Configuring the new setup
### 配置新系统

I set out to rebuild my home server with a few things in mind:
我着手重建家庭服务器，并考虑了以下几点：

* Try to minimize writes to the microSD.
* 尽量减少对 microSD 的写入。
* Have some redundancy in the data stored on external hard drives.
* 对存储在外部硬盘上的数据进行冗余备份。
* Back up everything important.
* 备份所有重要内容。

#### Swap, /tmp, and other volatile data
#### Swap、/tmp 及其他易失性数据

Swap is useful to have, even with the 8GB of RAM on my Pi, but I don't think swapping to the microSD is a good idea if I want it to live long, so I could either swap to an external HDD (very slow) or use zram.
即使我的树莓派有 8GB 内存，Swap 依然很有用，但如果我想让 microSD 卡寿命更长，我不认为将 Swap 放在上面是个好主意。所以我要么选择 Swap 到外部硬盘（非常慢），要么使用 zram。

zram, formerly called compcache, is a Linux kernel module for creating a compressed block device in RAM, i.e. a RAM disk with on-the-fly disk compression.
zram（前身为 compcache）是一个 Linux 内核模块，用于在内存中创建压缩块设备，即带有实时磁盘压缩功能的 RAM 磁盘。

The common uses for zram are swap or /tmp. I chose to enable zram for swap but not for /tmp, which I kept as a normal RAM disk; I'm not 100% sure how these two features interact but I figured I'd let the kernel figure out how and when to swap out the cold pages in /tmp to the compressed swap rather than reserving a separate block for it.
zram 的常见用途是 Swap 或 /tmp。我选择为 Swap 启用 zram，但没有为 /tmp 启用，而是将其保留为普通的 RAM 磁盘；我不确定这两个功能是如何交互的，但我打算让内核自己决定何时将 /tmp 中的冷页面交换到压缩 Swap 中，而不是为此预留单独的区块。

```nix
{
  # Enable in-memory compressed swap device
  zramSwap.enable = true;
  # Use a RAM disk for /tmp
  boot.tmp.useTmpfs = true;
}
```

I also chose to have journald log to memory rather than to disk. I need to investigate whether it's possible to log to memory and only occasionally flush to disk (in which case I'd mount /var/log to a subvolume on an HDD) but I haven't figured that part out yet.
我还选择让 journald 将日志记录到内存而不是磁盘。我需要研究是否可以只记录到内存并偶尔刷新到磁盘（在这种情况下，我会将 /var/log 挂载到硬盘上的子卷），但我还没搞定这一部分。

```nix
{
  # Store journal logs in memory to /run/log/journal
  services.journald.storage = "volatile";
}
```

The microSD card remains mounted to /, but I disabled atime because it causes writes whenever a file is accessed and I don't think it's very useful.
microSD 卡仍然挂载在 / 下，但我禁用了 atime，因为它会在每次访问文件时产生写入，而且我认为它没什么大用。

```nix
{
  fileSystems."/" = {
    device = "/dev/disk/by-label/takodachi";
    fsType = "ext4";
    options = [ "noatime" ];
  };
}
```

#### External HDDs
#### 外部硬盘

If you live in the current year of 2026 you probably know this is not a good time to be buying any new drives (or RAM, or GPUs, or anything that can be used to build datacenters and feed the pockets of executives enraptured by AI psychosis) and that it's a better idea to get scrappy and creative with what you have.
如果你生活在 2026 年，你可能知道现在不是购买新驱动器（或内存、GPU，或任何可用于构建数据中心并填满那些沉迷于 AI 狂热的高管腰包的东西）的好时机，利用手头现有的资源进行拼凑和创新才是更好的主意。

I have tons of drives lying around of all sorts of makes, sizes, and ages. I treat them mostly as cold storage for old data that I kinda want to keep; they're the digital equivalent of a junk drawer. I've always wanted to immolate them for a higher purpose but never quite found one until now. I took two of these old 2.5" HDDs from the pile.
我手头有很多各种品牌、容量和年限的硬盘。我主要把它们当作冷存储，存放一些我想保留但又不常用的旧数据；它们就像是数字版的“杂物抽屉”。我一直想把它们用于更有意义的地方，但直到现在才找到机会。我从堆里挑出了两块旧的 2.5 英寸硬盘。

The first was a 500GB drive that contained a Windows filesystem. This used in my partner's laptop; a 3KG behemoth from another era of business machines, meant more as a desktop you could easily move to another desk and occasionally bring home rather than a truly portable machine. First I swapped out the HDD with an SSD as an act of mercy on the dying laptop; eventually I set my partner up with a Surface Pro 5 running NixOS and they kindly gave me the old laptop and HDD to play around with.
第一块是 500GB 的硬盘，里面装的是 Windows 文件系统。它曾用在我伴侣的笔记本电脑里；那是一台来自商务机时代的 3 公斤重巨兽，与其说是便携设备，不如说是一台可以轻松移动到另一张桌子、偶尔带回家的台式机。起初，我出于对那台垂死笔记本的怜悯，把硬盘换成了 SSD；后来我给伴侣配置了一台运行 NixOS 的 Surface Pro 5，他们便大方地把旧笔记本和硬盘送给我折腾了。

The second was a 320GB drive that seemed to contain... a home assistant installation? I have no idea how that ended up there. Anyway, this was a Hitachi drive with an apple logo on it, so it used to be inside either my 2006 white plastic macbook or a mac mini of a similar...
第二块是 320GB 的硬盘，里面似乎装了……一个 Home Assistant 系统？我完全不知道它是怎么出现在那里的。总之，这是一块带有苹果标志的日立硬盘，所以它以前应该是在我 2006 年的白色塑料 MacBook 或类似时期的 Mac mini 里……
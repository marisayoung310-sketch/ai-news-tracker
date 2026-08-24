---
title: "FreeBSD ate my ram"
originalUrl: "https://crocidb.com/post/freebsd-ate-my-ram/"
date: "2026-07-04T22:18:55.845Z"
---

# FreeBSD ate my ram

Last month I posted about my journey migrating my site server from an old Ubuntu server to FreeBSD. Some people on Hacker News noticed that, when I showed the fastfetch result, I said I was confused with the RAM usage compared to btop and commented that fastfetch is probably more correct. I decided to enter that rabbit hole and try to understand why reporting free or used memory in a modern operating system is more complicated than it seems.

上个月，我发布了关于将我的网站服务器从旧的 Ubuntu 服务器迁移到 FreeBSD 的历程。一些 Hacker News 的用户注意到，当我展示 fastfetch 的结果时，我提到对它与 btop 相比的内存使用率感到困惑，并评论说 fastfetch 可能更准确。我决定深入探究这个问题，试图理解为什么在现代操作系统中报告空闲或已用内存比看起来要复杂得多。

Another user shared Linux ate my RAM, which provide a quick explanation for the same effect on Linux. And if you want a quick answer for FreeBSD too: the usage sometimes look off because the OS will cache everything it can from the disk into the RAM to improve overall performance, but that cache is volatile and will be freed in case it needs more memory. If you want a slightly longer answer, keep reading. But just a quick disclaimer before: I am not an expert in operating systems internals, especially FreeBSD. This is a writeup of weeks of research in this field on my free time. If you find anything that’s particularly wrong, please comment it: sharing (knowledge) is caring!

另一位用户分享了“Linux ate my RAM”（Linux 吃掉了我的内存），它为 Linux 上的相同现象提供了快速解释。如果你也想了解 FreeBSD 的简短答案：内存使用率有时看起来不准确，是因为操作系统会尽可能将磁盘内容缓存到内存中以提高整体性能，但这种缓存是易失性的，如果系统需要更多内存，它会被释放。如果你想要更详细的解释，请继续阅读。但在开始之前先声明：我不是操作系统内核（尤其是 FreeBSD）方面的专家。这是我利用业余时间进行数周研究后的总结。如果你发现任何错误，请指出：分享知识就是关怀！

### RAM usage is hard to define
### 内存使用率很难定义

The whole point of Linux ate my RAM is explaining how unused RAM is wasted RAM. Just like the CPU cache will cache RAM contents because the CPU can access that quicker, the RAM will cache disk data to improve the user’s experience in the system. How that cache works is a bit more complicated, but before that, it’s important to understand how the kernel manages RAM.

“Linux ate my RAM”的核心观点是解释未使用的内存就是浪费的内存。就像 CPU 缓存会缓存内存内容以便 CPU 更快地访问一样，内存也会缓存磁盘数据以改善用户的系统体验。这种缓存的工作方式比较复杂，但在深入之前，了解内核如何管理内存非常重要。

Most modern operating systems have a Virtual Memory (VM) system. What it does is basically divide the physical memory into pages of (usually) 4KiB. Each page is then added to different queues, so that the kernel can juggle them around to make sure all the processes have their memory when they need and the whole system will keep working through moments of scarcity.

大多数现代操作系统都有虚拟内存 (VM) 系统。它的基本作用是将物理内存划分为（通常为）4KiB 的页面。每个页面随后被添加到不同的队列中，以便内核可以调度它们，确保所有进程在需要时都能获得内存，并使整个系统在资源紧缺时仍能正常运行。

For example: the swap memory. I never thought exactly how the Swap memory was used, except that it’s a space separate in disk that will store temporarily part of the RAM if needed. But in summary, when the OS sees allocated RAM that’s not being used too much, it will set it in a way that it can be stored in disk in case more memory is demanded. When those pages are requested again by the program that owns it, it will then get moved back into RAM.

例如：交换内存 (Swap)。我以前从未仔细想过交换内存究竟是如何使用的，只知道它是磁盘上的一块独立空间，在需要时会临时存储部分内存数据。简而言之，当操作系统发现已分配的内存使用率不高时，它会将其标记为可存储到磁盘，以备内存需求增加时使用。当拥有这些页面的程序再次请求它们时，它们会被移回内存。

Every OS has a different set of pages and rules for how to manage them. On FreeBSD, the types of page queues are:
```c
#define PQ_NONE 255
#define PQ_INACTIVE 0
#define PQ_ACTIVE 1
#define PQ_LAUNDRY 2
#define PQ_UNSWAPPABLE 3
#define PQ_COUNT 4
```
You can find that at `sys/vm/vm_page.h`. All other unix-based systems will have something similar: Linux, OpenBSD, NetBSD, DragonFlyBSD.

每个操作系统都有不同的一套页面及其管理规则。在 FreeBSD 上，页面队列的类型如下：
（代码见上文）
你可以在 `sys/vm/vm_page.h` 中找到这些定义。所有其他类 Unix 系统都有类似的机制：Linux、OpenBSD、NetBSD、DragonFlyBSD。

If we check `top`, we see that it doesn’t just report memory usage, but divides it into a few categories:
* **active**: active pages are pages that are actively being used by (mostly) userland processes
* **inactive**: pages that haven’t been accessed by those process in some time will be moved into inactive
* **laundry**: this is the queue of pages to be written to swap. When the system needs to allocate space that is not in the free queue, it will move inactive pages to this queue
* **wired**: that’s memory in PQ_NONE, PQ_UNSWAPPABLE and memory that the kernel itself is using and is not managed by the VM
* **free**: purely unused memory

如果我们查看 `top` 命令，会发现它不仅报告内存使用情况，还将其分为几个类别：
* **active（活跃）**：正在被（主要是）用户态进程积极使用的页面。
* **inactive（非活跃）**：一段时间内未被进程访问的页面会被移入此队列。
* **laundry（待清洗）**：这是准备写入交换空间的页面队列。当系统需要分配空间而空闲队列不足时，它会将非活跃页面移入此队列。
* **wired（锁定）**：这是处于 PQ_NONE、PQ_UNSWAPPABLE 状态的内存，以及内核自身使用且不由虚拟内存系统管理的内存。
* **free（空闲）**：纯粹未使用的内存。

When memory that was inactive, went to laundry, got written to disk (swap), is requested again by the process that owns it, it will then get retrieved from the disk into inactive and finally to active again. And now we can start to see why it’s not so easy to tell exactly how much memory is being used and how much is free. Memory in the free queue is guaranteed to be free, but we can argue that the one in the inactive queue is too, since it’s reclaimable, because the kernel will free that whenever more memory is demanded. Wired memory is mostly locked, however, that’s where disk cache goes, so part of what’s in wired is also reclaimable, making it “free” too!

当处于非活跃状态的内存进入待清洗队列并被写入磁盘（交换空间）后，如果被所属进程再次请求，它会从磁盘取回进入非活跃状态，最终再次变为活跃状态。现在我们可以看出，为什么很难准确判断到底使用了多少内存，又有多少是空闲的。空闲队列中的内存确实是空闲的，但我们也可以认为非活跃队列中的内存也是空闲的，因为它是可回收的——内核会在需要更多内存时释放它们。锁定内存大部分是不可移动的，但磁盘缓存也存放在这里，因此锁定内存的一部分也是可回收的，这使得它们也算作“空闲”！

### Disk Cache
### 磁盘缓存

ZFS, the default FreeBSD filesystem nowadays, has ARC, Adaptive Replacement Cache, a specialized system that caches recently used data in memory, improving the repeated reading from disk. That cache shrinks as the system claims more memory. The kernel itself has mechanisms to do this cache, but ARC bypasses that. All the stats from that can be accessed via the kernel parameters `kstat.zfs.misc.arcstats.*`.

ZFS 是目前 FreeBSD 的默认文件系统，它拥有 ARC（自适应替换缓存），这是一个专门的系统，用于在内存中缓存最近使用的数据，从而提高磁盘重复读取的性能。当系统申请更多内存时，该缓存会缩小。内核本身有实现此缓存的机制，但 ARC 会绕过它。所有相关统计数据都可以通过内核参数 `kstat.zfs.misc.arcstats.*` 访问。

Using `sysctl`, we can fetch it all:
`sysctl kstat.zfs.misc.arcstats`
This will show literally all the parameters available, but now just these are important:
`sysctl -n kstat.zfs.misc.arcstats.size`
`sysctl -n kstat.zfs.misc.arcstats.c_min`
`sysctl -n kstat.zfs.misc.arcstats.c_max`
These will show the current cache as well as the minimum and maximum configured, all in bytes. Using `gnumfmt` we can convert to readable units:
`$ sysctl -n kstat.zfs.misc.arcstats.size | gnumfmt --to=iec`
`3.1G`

使用 `sysctl`，我们可以获取所有这些信息：
`sysctl kstat.zfs.misc.arcstats`
这会显示所有可用的参数，但目前只有以下几个重要：
（命令见上文）
这些命令将以字节为单位显示当前缓存大小以及配置的最小值和最大值。使用 `gnumfmt`，我们可以将其转换为可读单位：
`$ sysctl -n kstat.zfs.misc.arcstats.size | gnumfmt --to=iec`
`3.1G`

That’s also shown in `top`, with even more details. That’s for ZFS, but you can run other filesystems on FreeBSD.

这些信息也会在 `top` 中显示，且更为详细。以上是针对 ZFS 的情况，但你也可以在 FreeBSD 上运行其他文件系统。

### Why fastfetch and btop report differently?
### 为什么 fastfetch 和 btop 的报告结果不同？

Now we get to the interesting part. Both of these tools, and many others such as `htop`, try to report the memory usage so the user (or sysadmin) can have an idea of what’s going on with their systems. For that, they all have to pick a heuristic; effectively decide what they’ll call used memory. And the whole difference comes from the fact that they have different heuristics.

现在到了有趣的部分。这两个工具以及许多其他工具（如 `htop`）都试图报告内存使用情况，以便用户（或系统管理员）了解系统状态。为此，它们都必须选择一种启发式方法，即有效地定义什么是“已用内存”。而所有差异都源于它们采用了不同的启发式算法。

I digged into the source code of each tool to go after how they determine that.
`fastfetch` does this:
`free memory = free + inactive + cache*`
`used memory = total - free memory`
More on that cache later! In my old ThinkPad X230, running FreeBSD 15.0-RELEASE, that looks like: 82% of used memory!

我深入研究了每个工具的源代码，以了解它们是如何计算的。
`fastfetch` 的逻辑是：
`空闲内存 = 空闲 + 非活跃 + 缓存*`
`已用内存 = 总内存 - 空闲内存`
关于那个缓存，稍后再说！在我运行 FreeBSD 15.0-RELEASE 的旧 ThinkPad X230 上，结果显示：82% 的内存已用！

`btop`, on the other hand, does:
`available memory = total memory - active - wired`
`free memory = free`
`used memory = active + wired`
Running it at the same time as `fastfetch` was giving me this: Only...

而 `btop` 的逻辑是：
`可用内存 = 总内存 - 活跃 - 锁定`
`空闲内存 = 空闲`
`已用内存 = 活跃 + 锁定`
当它与 `fastfetch` 同时运行时，给我的结果是：仅……
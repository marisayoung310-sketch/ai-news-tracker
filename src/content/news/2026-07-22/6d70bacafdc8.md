---
title: "Linux kernel will support $ORIGIN, sort of"
originalUrl: "https://fzakaria.com/2026/07/20/linux-kernel-will-support-origin-sort-of"
date: "2026-07-21T22:21:09.808Z"
---

# Linux kernel will support $ORIGIN, sort of
# Linux 内核将支持 $ORIGIN，某种程度上

For some reason, during TacoSprint 2026 I decided to see if we could tackle relocatable binaries in Nix. I enjoy these lofty goals to push Nix and the surrounding ecosystem forward. I am bold if not stupid.
出于某种原因，在 2026 年的 TacoSprint 活动期间，我决定尝试解决 Nix 中二进制文件的可重定位问题。我喜欢这种推动 Nix 及其周边生态系统发展的宏大目标。我这人要么是勇敢，要么就是愚蠢。

I left the last earlier post with one potential idea of how to get there: We could patch the Linux kernel so that $ORIGIN is supported in PT_INTERP and the shebang. I waded through the complexity of sending patches over email (turns out I actually enjoy this workflow!), and sent a proposal to the Linux kernel mailing list.
我在上一篇文章中留下了一个实现该目标的潜在想法：我们可以修补 Linux 内核，使 PT_INTERP 和 shebang 支持 $ORIGIN。我克服了通过电子邮件发送补丁的复杂性（事实证明我实际上很喜欢这种工作流程！），并向 Linux 内核邮件列表发送了一份提案。

My first attempt here proposed simply adding direct support for $ORIGIN in the Virtual File System (VFS) subsystem. I waited nervously. I was expecting the result from what I had come to read about online; someone non-politely telling me to F$#CK OFF because there is something I missed, misunderstood or did not consider. 🤬
我的第一次尝试是提议直接在虚拟文件系统 (VFS) 子系统中添加对 $ORIGIN 的支持。我紧张地等待着。根据我在网上读到的内容，我预期的结果是：有人会很不客气地让我“滚蛋”，因为我遗漏、误解或未考虑到某些事情。🤬

The result was completely different. 😲 Christian Brauner, the maintainer for VFS responded to me in good faith, asking for the rationale for the change and eventually proposing some ways in which such a support could make it into the subsystem.
结果却完全不同。😲 VFS 的维护者 Christian Brauner 善意地回复了我，询问了这一变更的理由，并最终提出了一些让这种支持进入子系统的方法。

Note It definitely helped having someone like John Ericson chime in and advocate why having a non-fixed interpreter (PT_INTERP) is useful to Nix and other use-cases (i.e. Buck & Bazel). He offered that potentially we could leverage eBPF as a programmable way to select an interpreter through binfmt_misc. Whoa! 🤯
值得注意的是，有像 John Ericson 这样的人加入并倡导为什么非固定解释器 (PT_INTERP) 对 Nix 和其他用例（如 Buck 和 Bazel）很有用，这绝对有帮助。他提出，我们或许可以利用 eBPF 作为一种可编程方式，通过 binfmt_misc 来选择解释器。哇！🤯

I wanted to merely allow $ORIGIN but a programmable selection could let us do anything! The idea must have really intrigued him because soon-after, on his vacation, Christian offered the first draft of such a solution. We went back and forth a little over the mailing list and the end result is a patch series that will make its way into -next branch in the near future.
我原本只是想允许使用 $ORIGIN，但可编程的选择机制意味着我们可以做任何事情！这个想法一定让他非常感兴趣，因为不久之后，他在度假时就提供了该方案的初稿。我们在邮件列表上进行了一些交流，最终的结果是一系列补丁，这些补丁将在不久的将来进入 -next 分支。

If you don’t know what eBPF is or binfmt_misc, WTF did we just collaborate on? Let’s take a look! I won’t do eBPF justice, and there are plenty of articles online about it as it’s quite in-vogue at the moment. tl;dr; You can write programs in a C subset that gets compiled to an instruction set whose virtual machine is running within the kernel.
如果你不知道什么是 eBPF 或 binfmt_misc，那我们刚才到底合作了什么？让我们来看看！我无法详尽地介绍 eBPF，但网上有很多关于它的文章，因为它目前非常流行。简而言之：你可以用 C 语言的一个子集编写程序，这些程序会被编译成一种指令集，其虚拟机在内核中运行。

Shouldn’t the kernel be super fast? Yes, the programs are jitted to their native CPU architecture and the programs have a fixed-time slice. Isn’t this some crazy vulnerability for the kernel? Before any code is loaded it is “verified” to be safe. Checkout this guide for more info.
内核不应该非常快吗？是的，这些程序会被 JIT 编译为原生 CPU 架构，并且程序有固定的时间片。这难道不会给内核带来疯狂的漏洞吗？在加载任何代码之前，它都会被“验证”以确保安全。查看此指南以获取更多信息。

We can now support $ORIGIN with a relatively simple eBPF program:
现在，我们可以通过一个相对简单的 eBPF 程序来支持 $ORIGIN：

```c
SEC("struct_ops.s/match")
bool BPF_PROG(nix_match, struct linux_binprm *bprm) {
    return !bpf_strncmp(bprm->buf, 4, "\x7f" "ELF");
}

SEC("struct_ops.s/load")
int BPF_PROG(nix_load, struct linux_binprm *bprm) {
    char path[256];
    long n;
    n = bpf_path_d_path(&bprm->file->f_path, path, sizeof(path));
    if (n < 0) return n;
    /* derive the loader location from the binary's path */
    return bpf_binprm_set_interp(bprm, path, sizeof(path));
}

SEC(".struct_ops.link")
struct binfmt_misc_ops nix = {
    .match = (void *)nix_match,
    .load = (void *)nix_load,
    .name = "nix",
};
```

Once the above program is loaded and registered into the kernel, we then ask the binfmt_misc subsystem to trigger it. Checkout this thread if you want to see the complete example.
一旦上述程序被加载并注册到内核中，我们就可以要求 binfmt_misc 子系统触发它。如果你想查看完整示例，请查看此线程。

```bash
> bpftool struct_ops register nix_origin.bpf.o
> /sys/fs/bpf
> echo ':origin:B::::nix:' > /proc/sys/fs/binfmt_misc/register
```

What does that mean? It means that every binary now triggers the nix_match function above, in this case any ELF file, but it could be executables with a new segment like PT_INTERP_NIX, and the kernel will ask nix_load to determine the interpreter to use dynamically. Our special BPF program has support for $ORIGIN 💥
这意味着什么？这意味着现在每个二进制文件都会触发上面的 nix_match 函数（在本例中是任何 ELF 文件，但也可以是带有新段（如 PT_INTERP_NIX）的可执行文件），内核将要求 nix_load 动态确定要使用的解释器。我们特殊的 BPF 程序支持 $ORIGIN 💥

What else could you do? Well we can now even completely replace the traditional QEMU binfmt_misc registration script with a BPF program now like this one. What else can we do? Since we can now programmatically select our interpreter based on anything in the file, we can do quite a lot. I’m keen to hear your suggestions and ideas 💡.
你还能做什么？好吧，我们现在甚至可以用像这样的 BPF 程序完全取代传统的 QEMU binfmt_misc 注册脚本。我们还能做什么？由于我们现在可以根据文件中的任何内容以编程方式选择解释器，我们可以做很多事情。我很期待听到你的建议和想法 💡。

Some of the smaller items are that we can even support $ORIGIN in the shebangs (#!$ORIGIN/bin/ld.so) very easily as seen here: we simply look at the first 256 bytes of the file and look for $ORIGIN to trigger.
一些较小的改进是，我们甚至可以非常容易地在 shebang (#!$ORIGIN/bin/ld.so) 中支持 $ORIGIN，如下所示：我们只需查看文件的前 256 个字节并寻找 $ORIGIN 来触发。

One downside or side-effect of the traditional binfmt_misc hand-off was that the way in which the desired final binary was invoked was non-transparent. The registered interpreter becomes the process. It owns the entire process identity, and the binary you actually asked to run gets demoted to an argument.
传统 binfmt_misc 移交机制的一个缺点或副作用是，调用最终目标二进制文件的方式是不透明的。注册的解释器成为了进程本身。它拥有整个进程标识，而你实际想要运行的二进制文件被降级为参数。

For wine or qemu that’s acceptable as they are emulators but for a per-binary BPF loader that might pick a traditional ld.so it does not make much sense. This leaks in a few painful ways but the simplest are : argv[0] and /proc/<pid>/cmdline show the interpreter invocation, not what you executed. /proc/self/exe names the interpreter. Relocatable programs commonly locate themselves through /proc/self/exe, and instead they find the dynamic linker. 😩
对于 Wine 或 QEMU 来说，这是可以接受的，因为它们是模拟器，但对于可能选择传统 ld.so 的逐个二进制文件的 BPF 加载器来说，这没有多大意义。这会导致一些令人痛苦的泄露，最简单的是：argv[0] 和 /proc/<pid>/cmdline 显示的是解释器的调用，而不是你执行的内容。/proc/self/exe 指向的是解释器。可重定位程序通常通过 /proc/self/exe 定位自身，但结果却找到了动态链接器。😩

Christian sent a large patch series for this as well. His latest patch series adds two new dispatch modes that close the gap from opposite ends and covers a few other gotchas that these modes can fix. The loader substitition L is the one I’m most excited about for Nix. With the L flag, the kernel executes the matched binary natively as the main image, and merely substitutes the registered interpreter for the loader named in the binary’s PT_INTERP. binfmt_misc stops being a hand-off and becomes a plain PT_INTERP override. There’s no contract and no identity to reconstruct, so a stock dynamic loader works unchanged.
Christian 也为此发送了一系列大型补丁。他最新的补丁系列增加了两种新的调度模式，从两端弥补了差距，并涵盖了这些模式可以修复的其他一些陷阱。加载器替换模式 (L) 是我最期待 Nix 使用的功能。使用 L 标志，内核将匹配的二进制文件作为主镜像原生执行，并仅将注册的解释器替换为二进制文件 PT_INTERP 中指定的加载器。binfmt_misc 不再是移交，而是变成了简单的 PT_INTERP 覆盖。没有契约，也没有需要重建的标识，因此标准的动态加载器无需更改即可工作。

Where does this leaves us? I’ll be tracking the Linux kernel releases and, once this lands in -next and ships in a tagged release, I plan to upstream a NixOS module that registers the $ORIGIN support at boot. 🎉 The plan is to gate it on a new PT_INTERP_NIX segment rather than matching every ELF file. That keeps things backwards compatible: the BPF handler only kicks in for binaries that explicitly opt-in by c
这让我们处于什么位置？我将持续关注 Linux 内核版本，一旦此功能进入 -next 分支并发布在带标签的版本中，我计划向上游提交一个 NixOS 模块，在启动时注册 $ORIGIN 支持。🎉 计划是将其限制在一个新的 PT_INTERP_NIX 段上，而不是匹配每个 ELF 文件。这保持了向后兼容性：BPF 处理程序仅对通过 c 明确选择加入的二进制文件生效。
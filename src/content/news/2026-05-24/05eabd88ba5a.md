---
title: "80386 Microcode Disassembled"
originalUrl: "https://www.reenigne.org/blog/80386-microcode-disassembled/"
date: "2026-05-23T22:52:02.154Z"
---

# 80386 Microcode Disassembled
# 80386 微代码反汇编

After I posted 8086 microcode disassembled, Ken Shirriff sent me a high-resolution image of the microcode ROM from the 80386. I didn't expect I would ever do anything with it for a couple of reasons: one is that it's absolutely huge (94720 bits) compared to the 8086 one (10752 bits) so (even with bitract or similar) it would be extremely tedious to transcode and check.
在我发布了 8086 微代码反汇编之后，Ken Shirriff 发给我一张 80386 微代码 ROM 的高分辨率图像。起初我没想过要处理它，原因有二：首先，与 8086 的 10752 位相比，它的规模极其庞大（94720 位），因此即使使用 bitract 或类似工具，转码和校验的工作也将极其繁琐。

The other reason is that I wouldn't know where to start with it - at least with the 8086 there was a patent which gave the general outline and some chunks of code which I could search for. The 80386 was a complete black box. I knew what it did and had a rough idea of how it might work but that turning that into something that I could search for in a big blob of binary seemed like an insurmountable challenge.
另一个原因是，我不知道该从何下手——至少对于 8086，还有一份专利提供了大致的轮廓和一些我可以搜索的代码片段。而 80386 则是一个完全的黑盒。我知道它的功能，也大致了解它的工作原理，但要将其转化为可以在一大块二进制数据中搜索的内容，似乎是一项无法逾越的挑战。

Some years later, I was talking to GloriousCow and Smartest Blob (possibly amongst others) on Discord and they mentioned that it would be interesting to get high resolution images of the 80386 die and try to extract the microcode from it. I mentioned that the first part had already been done but that turning the image into a binary blob and a binary blob into intelligible microcode seemed too hard.
几年后，我在 Discord 上与 GloriousCow 和 Smartest Blob（可能还有其他人）聊天时，他们提到如果能获得 80386 芯片的高分辨率图像并尝试从中提取微代码会很有趣。我提到第一步（获取图像）已经完成了，但将图像转化为二进制数据块，再将二进制数据块转化为可理解的微代码似乎太难了。

Well, they may have taken that as a bit of a challenge - they threw various bits of image processing, neural networks, and human-aided automation at the problem and a few days later had the binary blob extracted from the image and cross-checked. Disassembling it was still quite a challenge, though!
好吧，他们可能把这当成了一种挑战——他们运用了各种图像处理、神经网络和人工辅助自动化技术来解决这个问题。几天后，他们就从图像中提取出了二进制数据块并完成了交叉校验。不过，反汇编它仍然是一个巨大的挑战！

We found various patterns and gradually figured out how to rearrange it into μ-ops on one axis and μ-op bits on the other. Then on the order in which to read the μ-ops (helped by a block of unused μ-ops at one end). And how to divide up the μ-op bits into fields.
我们发现了各种模式，并逐渐弄清楚了如何将其重新排列：一个轴是微操作（μ-ops），另一个轴是微操作位。接着我们确定了读取微操作的顺序（得益于末端的一块未使用微操作），以及如何将微操作位划分为不同的字段。

From the 8086 microcode work I assumed that two of the fields would be source and destination registers to copy from. I also knew that the 80386 could do an ALU operation in 2 cycles, suggesting that there had to be a field to specify a second input to the ALU in order that the microcode for these operations could load both operands to the ALU in the first cycle and then the output to the destination on the second cycle.
根据 8086 微代码的工作经验，我推测其中两个字段应该是用于复制的源寄存器和目标寄存器。我还知道 80386 可以在 2 个周期内完成一次 ALU 操作，这表明必须有一个字段来指定 ALU 的第二个输入，以便这些操作的微代码能在第一个周期将两个操作数加载到 ALU，并在第二个周期将输出写入目标。

There was also a pattern that occurred with some regularity that we suspected might indicate the end of an instruction (we were right). Ken helped too by tracing various lines and bits of logic on the 80386 die so that we could see how things were connected up. Gradually the picture become clearer.
还有一个规律出现的模式，我们怀疑它可能标志着指令的结束（我们猜对了）。Ken 也提供了帮助，他追踪了 80386 芯片上的各种线路和逻辑位，让我们得以了解各部分是如何连接的。渐渐地，全貌变得清晰起来。

Each time we figured something out it gave a clue as to the meaning of other chunks of microcode that used the same construct. At the same time we were working on decoding the instruction decoder (which consists of multiple smaller PLAs) and the protection test PLA. Eventually we got to the point where we could associate 386 instructions with chunks of microcode, and things became much clearer.
每当我们弄清楚一点，它就会为其他使用相同结构的微代码片段提供线索。与此同时，我们还在解码指令译码器（由多个较小的 PLA 组成）和保护测试 PLA。最终，我们能够将 386 指令与微代码片段关联起来，事情变得明朗多了。

The 80386 is much faster on a per-cycle basis than the 8086 for most instructions, a feat which it achieves by throwing a lot more transistors at the problem - many algorithms which are implemented by microcode in the 8086 are essentially "hardware accelerated" in the 80386 so I realised early on that more of the 80386 microcode would be setting up these accelerators instead of embodying algorithms directly.
对于大多数指令，80386 在单周期性能上比 8086 快得多。它通过投入更多的晶体管实现了这一壮举——许多在 8086 中由微代码实现的算法，在 80386 中本质上是“硬件加速”的。因此我早早就意识到，80386 的微代码更多是在配置这些加速器，而不是直接体现算法本身。

Figuring out the interfaces between the accelerators (like the multiply and divide hardware, the barrel shifter, and the protection test unit) and the microcode was a lot of the work. How many different instructions does the 80386 have, according to the microcode? What are they?
弄清楚加速器（如乘除法硬件、桶形移位器和保护测试单元）与微代码之间的接口是工作量很大的一部分。根据微代码，80386 有多少种不同的指令？它们是什么？

The microcode has 215 entry points from the decoding ROM - quite an increase over the 60 of the 8086! Part of this is new instructions, and part is that instructions are handled by different routines depending on such things as whether their operands are registers or memory, whether the CPU is in real or protected mode, and whether REP prefixes are in operation.
微代码有 215 个来自译码 ROM 的入口点——比 8086 的 60 个有了显著增加！这部分是因为新指令，另一部分是因为指令会根据操作数是寄存器还是内存、CPU 处于实模式还是保护模式、以及是否有 REP 前缀等情况，由不同的例程来处理。

I won't list them all here but you can find them in the fields.txt file if you're interested (along with all the subroutines and shared code). It's not very meaningful to list the top-level microcode routine size since many of them do a small amount of work and then jump to a routine shared with another entry point. It's also not meaningful to list the number of opcodes each entry point handles, as the instruction decoder uses more than just the opcode to determine which routine to use.
我不会在这里一一列出，但如果你感兴趣，可以在 fields.txt 文件中找到它们（以及所有的子例程和共享代码）。列出顶层微代码例程的大小意义不大，因为其中许多例程只做少量工作，然后就跳转到与其他入口点共享的例程。列出每个入口点处理的操作码数量也没有意义，因为指令译码器不仅仅使用操作码来决定使用哪个例程。

Are there any instructions not handled by the microcode? Surprisingly, no! Unlike the 8086 (and also unlike modern CPUs), the 80386 is always executing a μ-op and there is microcode for every instruction.
有没有不被微代码处理的指令？令人惊讶的是，没有！与 8086（以及现代 CPU）不同，80386 始终在执行微操作，并且每条指令都有对应的微代码。

Does the microcode contain any "junk code" that doesn't do anything? The routine from 0x849 to 0x856 inclusive (marked as "unused?" in the microcode disassembly) doesn't seem to have any entry points associated with it. I'm not completely sure what it does, but it has a lot in common with the routine #PF (PAGE_FAULT) routine at 0x8e9-0x8f5 - both end up doing an interrupt 0x0e with the error code set to the last error code from the paging unit.
微代码中是否包含任何“垃圾代码”？从 0x849 到 0x856（在微代码反汇编中标记为“未使用？”）的例程似乎没有任何关联的入口点。我不完全确定它的作用，但它与 0x8e9-0x8f5 的 #PF（页错误）例程有很多共同点——两者最终都会执行中断 0x0e，并将错误代码设置为来自分页单元的最后一个错误代码。

But this routine sets CR2 to some mysterious value from the paging unit instead of the fault linear address. All the other microcode seems to be designed to implement the documented behaviour of the CPU (or undocumented behaviour in the case of the routines that handle interaction with the ICE (In-Circuit Emulator) hardware used for low-level debugging.
但这个例程将 CR2 设置为来自分页单元的某个神秘值，而不是故障线性地址。所有其他微代码似乎都是为了实现 CPU 的文档化行为而设计的（或者在处理与用于底层调试的 ICE（在线仿真器）硬件交互的例程时，实现的是未文档化的行为）。

Does the microcode have any hidden features, opcodes or easter eggs that have not yet been documented? I am not totally sure about this as I don't have a real 386 machine to try it on, but I may have found a flaw in the IO permission bitmap handling that was used by some protected-mode OSes to grant user-mode processes limited access to IO ports (a practice that might be considered horrifyingly insecure by modern standards). When a 4-byte port access occurs then it seems
微代码是否有任何尚未记录的隐藏功能、操作码或彩蛋？我对此不太确定，因为我没有真正的 386 机器来测试，但我可能发现了一些保护模式操作系统在处理 IO 许可位图时的一个缺陷，该位图用于授予用户模式进程对 IO 端口的有限访问权限（这种做法在现代标准看来可能极其不安全）。当发生 4 字节端口访问时，似乎……
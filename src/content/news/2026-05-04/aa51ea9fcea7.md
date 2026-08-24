---
title: "This Wasm interpreter fits in a QR code"
originalUrl: "https://purplesyringa.moe/blog/this-wasm-interpreter-fits-in-a-qr-code/"
date: "2026-05-03T22:17:53.584Z"
---

# This Wasm interpreter fits in a QR code

**This Wasm interpreter fits in a QR code**
这个 Wasm 解释器可以塞进一个二维码里。

May 3, 2026
2026 年 5 月 3 日

2944 bytes. Less than 0.006% of Wasmtime, smaller than a C “Hello, world!”.
2944 字节。不到 Wasmtime 大小的 0.006%，比一个 C 语言的“Hello, world!”程序还要小。

Zero dependencies, no cheating: just a static x86-64 Linux executable. Scan the QR code above with zbarimg --raw -Sbinary or another QR decoder that supports binary data, or directly download the program from the GitHub repo, and you’re good to go.
零依赖，没有作弊：仅仅是一个静态的 x86-64 Linux 可执行文件。使用 `zbarimg --raw -Sbinary` 或其他支持二进制数据的二维码解码器扫描上方的二维码，或者直接从 GitHub 仓库下载该程序，即可直接运行。

Here’s me playing the Rust guessing game, cross-compiled for Wasm:
这是我运行交叉编译为 Wasm 的 Rust 猜数字游戏：

And here’s me running QuickJS, straight from official releases:
这是我运行直接从官方发布版本获取的 QuickJS：

The interpreter implements the entire Lime1 Wasm feature set, and a chunk of WASI sufficient for these programs. It’s not quite feature-complete, it’s slow, and it’s insecure – but it’s still a marvelous feat of engineering with reasonable capabilities.
该解释器实现了完整的 Lime1 Wasm 功能集，以及足以运行这些程序的 WASI 部分。它虽然功能不够完备、运行缓慢且不安全，但它仍然是一项具备合理能力的卓越工程成就。

I had insane fun working on it, and now I want to share what made this possible.
我在开发过程中获得了极大的乐趣，现在我想分享一下是什么让这一切成为可能。

### Acknowledgements
### 致谢

Thanks to:
感谢：

Yuki for writing a tool for the project and rubber-duck debugging.
Yuki 为该项目编写工具并提供“橡皮鸭调试”支持。

Genbox for contributing the idea of using a QR code.
Genbox 贡献了使用二维码的想法。

### Sizecoding 101
### 尺寸编程（Sizecoding）入门

QR codes can contain up to 2953 bytes. If the project was any simpler, I’d just use assembly – but that has a disastrous effect on velocity, which is crucial for an open-ended project that requires constant experimentation and sweeping changes.
二维码最多可以容纳 2953 字节。如果项目再简单一点，我就会直接使用汇编语言——但这会对开发速度产生灾难性的影响，而对于一个需要不断实验和进行大规模修改的开放式项目来说，速度至关重要。

Herding gcc with `-Os -fno-align-functions -fno-align-jumps -fno-align-labels -fno-align-loops -fno-jump-tables -fno-asynchronous-unwind-tables -fomit-frame-pointer` helps, but not when the simplest C program is already too large. The issue is not the language, but metadata: symbols, ELF sections, dynamic linking. The headers are tiny, but they add up, and at this scale each one has to be abolished.
使用 `gcc` 并配合 `-Os -fno-align-functions -fno-align-jumps -fno-align-labels -fno-align-loops -fno-jump-tables -fno-asynchronous-unwind-tables -fomit-frame-pointer` 等参数会有所帮助，但当最简单的 C 程序都已经太大时，这就无济于事了。问题不在于语言，而在于元数据：符号、ELF 节区、动态链接。头部信息虽然很小，但累积起来就很多，而在这种规模下，必须废除每一个不必要的字节。

A linker script can merge almost all sections – code, globals, constants – into one, dropping unnecessary alignment from the binary. This makes code writeable and data executable, but security was never a goal in this experiment.
链接器脚本可以将几乎所有的节区（代码、全局变量、常量）合并为一个，从而从二进制文件中剔除不必要的对齐。这使得代码可写、数据可执行，但安全性从来不是这个实验的目标。

```ld
ENTRY(_start) OUTPUT_FORMAT(elf64-x86-64) SECTIONS { . = 0x400000; .text : { *(.text .text.* .data .data.* .rodata .rodata.*) } .bss : { *(.bss .bss.*) *(COMMON) } /DISCARD/ : { *(.note.*) } }
```

`strip --strip-section-headers` removes symbol information and section info, retaining only segments – a crude approximation sufficient for the kernel to run the program.
`strip --strip-section-headers` 会移除符号信息和节区信息，仅保留段（segments）——这是一种足以让内核运行程序的粗略近似方法。

Linking libc is expensive. libc does two things: initializes the program and invokes syscalls. In most operating systems, only libc knows how to do this, but Linux offers a stable userland ABI. You only need 23 bytes of machine code to wrap main:
链接 libc 代价高昂。libc 做两件事：初始化程序和调用系统调用。在大多数操作系统中，只有 libc 知道如何做到这一点，但 Linux 提供了一个稳定的用户态 ABI。你只需要 23 字节的机器码来包装 `main` 函数：

```asm
asm ( ".globl _start;" "_start:" "pop %rdi;" // argc "mov %rsp, %rsi;" // argv "lea 8(%rsi,%rdi,8), %rdx;" // envp "call main;" "mov $60, %eax;" // exit "xor %edi, %edi;" "syscall;" );
```

This is inline assembly, and you’ll need to get used to it, because in sizecoding it’s everywhere. Invoking syscalls, like read, is as simple as:
这是内联汇编，你需要习惯它，因为在尺寸编程中它无处不在。调用系统调用（如 `read`）非常简单：

```c
long rax = SYS_read; asm volatile ("syscall" : "+a"(rax) : "D"(fd), "S"(buf), "d"(count) : "rcx", "r11", "memory"); return rax;
```

x86 also has a party trick up its sleeve: legacy CISC instructions. `memcpy`, `memset`, `strlen`, and all that jazz can each be implemented with a single 2-byte `rep` instruction.
x86 还有一个绝活：传统的 CISC 指令。`memcpy`、`memset`、`strlen` 等等，每一个都可以用一条 2 字节的 `rep` 指令来实现。

These features make x86/Linux the best combination for this project – x86-64, more specifically, since Wasm needs 64-bit operations. This is unlike demos, which usually target Windows or older architectures because they use a different set of features.
这些特性使得 x86/Linux 成为该项目的最佳组合——更具体地说是 x86-64，因为 Wasm 需要 64 位操作。这与通常针对 Windows 或旧架构的演示程序不同，因为它们使用不同的特性集。

This forms a 200-byte clean slate. Now what?
这构成了一个 200 字节的干净起点。接下来呢？

### Parsing
### 解析

To execute a Linux ELF program, you only need to parse headers, map segments to memory, and jump to the entry point. Dynamic linking is only slightly harder. Wasm is not like that – it has a multitude of different sections describing various moving parts:
要执行一个 Linux ELF 程序，你只需要解析头部、将段映射到内存并跳转到入口点。动态链接稍微难一点。Wasm 则不同——它有许多不同的节区来描述各种动态部分：

*   Type section – the dictionary of function signatures.
*   类型节区——函数签名的字典。
*   Import section – IDs associated with syscalls.
*   导入节区——与系统调用关联的 ID。
*   Function section – function signatures as indices into the type section.
*   函数节区——作为类型节区索引的函数签名。
*   Memory section – amount of memory to allocate.
*   内存节区——要分配的内存量。
*   Global section – initial global values.
*   全局节区——初始全局变量值。
*   Export section – the index of the _start function.
*   导出节区——`_start` 函数的索引。
*   Start section – the initializing function.
*   启动节区——初始化函数。
*   Element section – jump tables.
*   元素节区——跳转表。
*   Code section – function bodies.
*   代码节区——函数体。
*   Data section – initial memory contents.
*   数据节区——初始内存内容。

Parsing this takes 800 bytes, or 25% of the quota down the drain before executing code. And that’s already after some optimization! So here’s the first one of many unorthodox tricks I used.
解析这些内容需要 800 字节，在执行代码之前就消耗了 25% 的配额。而且这还是在经过一些优化之后的结果！所以，这是我使用的众多非传统技巧中的第一个。

### Imports
### 导入

Wasm programs import syscalls as external functions, like `environ_get` or `fd_read`. Simple interpreters store the names as strings, but I store hashes instead – collisions are not an issue because the WASIp1 interface is closed.
Wasm 程序将系统调用作为外部函数导入，例如 `environ_get` 或 `fd_read`。简单的解释器将名称存储为字符串，但我存储的是哈希值——因为 WASIp1 接口是封闭的，所以哈希冲突不是问题。

x86 has instructions for CRC32, and for syscall names, hashing the first 8 bytes of the name and its length gives a collision-free hash at the cost of a single instruction.
x86 有 CRC32 指令，对于系统调用名称，对名称的前 8 个字节及其长度进行哈希处理，只需一条指令即可获得无冲突的哈希值。

Hashes can then be resolved to implementations with flat maps. But of which layout?
然后，哈希值可以通过扁平映射（flat maps）解析为实现。但采用哪种布局呢？

```c
// Interleaved keys and values? 
// 键值交错？
struct key_value { unsigned short key; unsigned short value; }; struct key_value table[20]; 

// Or separate keys and values? 
// 还是键值分离？
unsigned short keys[20]; unsigned short values[20];
```

C++ uses the former, but the latter is both faster (if using vectorization) and shorter: `repne scasw` (the x86 generalization of `memchr`) can locate the key in just two bytes.
C++ 使用前者，但后者既更快（如果使用向量化）也更短：`repne scasw`（`memchr` 的 x86 通用版本）可以在两个字节内定位到键。

### Control flow
### 控制流

What’s the first instruction in an average Wasm program? `i32.const`? `call`? Nope, it’s `block`, and it’s worse than you might think.
普通 Wasm 程序中的第一条指令是什么？`i32.const`？`call`？不，是 `block`，而且它比你想象的还要糟糕。

CPUs implement control flow as conditional jumps to instruction addresses. Wasm begs to differ. Wasm functions are trees with high-level constructs, like `if` and `loop`. Instead of jumping, you can continue a loop (jumping to its beginning) or break from a block (jumping to its end). With enough nesting, any control flow can be simulated.
CPU 将控制流实现为跳转到指令地址的条件跳转。Wasm 则不然。Wasm 函数是具有高级结构（如 `if` 和 `loop`）的树。你不需要跳转，而是可以继续循环（跳转到循环开头）或从块中跳出（跳转到块末尾）。通过足够的嵌套，任何控制流都可以被模拟。

Jumps look like `br <level>`, where `<level>` specifies how many blocks to exit. Typical interpreters analyze the code before execution to know which instruction each jump targets. Since Wasm instructions are variable-length, this requires two functions per opcode: “parse” and “execute” – a luxury we can’t afford. But there is a workaround:
跳转看起来像 `br <level>`，其中 `<level>` 指定要退出多少个块。典型的解释器在执行前会分析代码，以了解每个跳转指向哪条指令。由于 Wasm 指令长度可变，这需要每个操作码对应两个函数：“解析”和“执行”——这是我们负担不起的奢侈。但有一个变通方法：

`const char *p; // g`
（原文在此处截断）
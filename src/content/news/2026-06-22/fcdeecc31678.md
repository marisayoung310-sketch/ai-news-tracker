---
title: "Performance improvements in libffi"
originalUrl: "https://atgreen.github.io/repl-yell/posts/libffi-plan-cache/"
date: "2026-06-21T22:42:15.165Z"
---

# Performance improvements in libffi
# libffi 的性能提升

libffi is a function call interpreter. You hand it a description of a function’s signature at runtime, and it works out, on the spot, how to place each argument and make the call. It interprets the calling convention the way a bytecode VM interprets instructions. Nothing is compiled ahead of time, because the whole point is that you don’t know the signature ahead of time.
libffi 是一个函数调用解释器。你在运行时向它提供函数签名的描述，它会当场计算出如何放置每个参数并进行调用。它解释调用约定的方式，就像字节码虚拟机解释指令一样。没有任何东西是预先编译的，因为其核心意义就在于你无法预知函数签名。

An interpreter is not what you reach for when you want speed. That is what JIT compilation is for, and some systems choose it instead.
当你追求速度时，解释器并不是你的首选。那是即时（JIT）编译的用武之地，一些系统也确实选择了这种方式。

A runtime can JIT-compile a bespoke call stub for each signature, native code that drops the arguments into registers and jumps, with no interpretation left at runtime. It’s quicker, but it works by generating code at runtime into memory that’s both writable and executable, which is exactly what modern systems are trying to stamp out.
运行时环境可以为每个签名 JIT 编译一个定制的调用存根（stub），即一段将参数放入寄存器并跳转的本地代码，这样运行时就不再需要解释。这种方式更快，但它的工作原理是在运行时将代码生成到既可写又可执行的内存中，而这正是现代系统极力杜绝的做法。

So libffi stays an interpreter, on purpose. The question I set out to answer was how much faster it could get that way, by making better use of what it already knows instead of generating code at runtime or mapping any page writable and executable.
因此，libffi 有意保持为一个解释器。我试图回答的问题是：在不生成运行时代码、也不将任何页面映射为可写且可执行的前提下，通过更好地利用已知信息，它能提升多少性能。

### The waste
### 浪费所在

When you call a function through libffi, the work splits across two places. ffi_prep_cif runs once per signature. It classifies the whole thing, but it keeps only two results: the size of the stack frame the call will need, and a small code for how the return value comes back. The frame size has to be known before the call is built, because any argument that doesn’t fit in a register spills to the stack, and that space is reserved up front. The return code is for afterward, because the result comes back in rax, or xmm0, or memory depending on the type, and something has to know where to read it from. Both are small and fixed-size, so they live in the ffi_cif. What prep throws away is the part it spent most of its time on: where each individual argument goes.
当你通过 libffi 调用函数时，工作被分成了两部分。`ffi_prep_cif` 每个签名运行一次。它会对整个签名进行分类，但只保留两个结果：调用所需的栈帧大小，以及一个关于返回值如何返回的小代码。栈帧大小必须在构建调用之前确定，因为任何无法放入寄存器的参数都会溢出到栈上，而这部分空间需要预先保留。返回代码用于后续处理，因为结果会根据类型返回到 `rax`、`xmm0` 或内存中，必须有机制知道从哪里读取它。这两者都很小且大小固定，因此它们存储在 `ffi_cif` 中。而 `prep` 丢弃的部分正是它花费大部分时间计算的内容：每个参数的具体放置位置。

So on every ffi_call, the marshalling code walks the argument list again and re-derives that placement from scratch before copying the values into place. For a three-argument call on x86-64 that’s around 650 instructions of bookkeeping, and it produces the identical answer every single time.
因此，在每次 `ffi_call` 时，编组（marshalling）代码都会再次遍历参数列表，从头开始重新推导放置位置，然后再将值复制到相应位置。对于 x86-64 架构上的三参数调用，这涉及约 650 条簿记指令，且每次产生的结果完全相同。

Most of those instructions aren’t moving argument bytes. They’re deciding where the bytes go. The x86-64 calling convention has genuine rules, and applying them to a single argument means walking its type, recursing into a struct’s fields and chasing the pointers in its type descriptor, sorting each 8-byte chunk into an integer or floating-point register class, and checking whether it still fits in the registers that are left or has to spill to the stack. That is branch-heavy, pointer-chasing work, the sort a CPU runs slowly, and it reruns on every call to compute a placement that never changes.
这些指令中大部分并不是在移动参数字节，而是在决定字节去向。x86-64 调用约定有明确的规则，将其应用于单个参数意味着遍历其类型、递归进入结构体字段并追踪类型描述符中的指针、将每个 8 字节块分类到整数或浮点寄存器类中，并检查它是否还能放入剩余的寄存器，还是必须溢出到栈上。这是典型的分支密集型、指针追踪型工作，CPU 运行起来很慢，但它却在每次调用时重复运行，去计算一个永远不会改变的放置方案。

But function argument placement is a pure function of the signature. We can compute it once, remember it, and skip the work on every later call.
但函数参数的放置是签名的一个纯函数。我们可以计算一次，记住它，并在后续的每次调用中跳过这些工作。

### A plan
### 方案（Plan）

The fix is a “plan”: the placement compiled into a flat list of moves, a tiny bytecode for one signature. If ffi_call re-deriving the placement on every call is like interpreting a program by re-walking its syntax tree each time, the plan is the compiled bytecode: the tree-walk happens once, and every later call just runs the flat list. build_plan walks the argument types once, classifies each one the way the ABI rules say, and emits a move per piece: this 8-byte word goes in rdi, that 32-bit int gets sign-extended into rsi, this double lands in an SSE slot, that oversized thing spills to the stack. With the plan in hand, making the call is just running the moves. No re-classification.
解决方案是一个“方案”（plan）：将放置逻辑编译成一个扁平的移动指令列表，即针对特定签名的微型字节码。如果说 `ffi_call` 每次重新推导放置位置就像是通过反复遍历语法树来解释程序，那么“方案”就是编译后的字节码：树遍历只发生一次，后续的每次调用只需运行这个扁平列表。`build_plan` 会遍历一次参数类型，按照 ABI 规则对每个参数进行分类，并为每个部分发出一条移动指令：这个 8 字节字放入 `rdi`，那个 32 位整数进行符号扩展后放入 `rsi`，这个双精度浮点数放入 SSE 插槽，那个超大的对象溢出到栈上。有了这个方案，进行调用只需执行这些移动操作，无需重新分类。

The opcodes are deliberately dumb. GP64 copies a word into a general register; SE8/SE16/SE32 sign-extend a narrow int; SSE64/SSE32 move a float; STACK memcpys a spilled argument. A three-argument call compiles to three or four of them.
操作码被设计得非常简单。`GP64` 将一个字复制到通用寄存器；`SE8/SE16/SE32` 对窄整数进行符号扩展；`SSE64/SSE32` 移动浮点数；`STACK` 将溢出的参数进行内存拷贝。一个三参数调用会被编译成三到四个这样的操作码。

When every argument is a single 64-bit value in a general register, which is most pointer-passing code, the plan doesn’t even need the interpreter. It’s marked thunk-eligible, and a small hand-written thunk in .text loads the values straight from the argument array into the argument registers and calls. It skips the move loop, the intermediate register image, and the copying back and forth entirely. The call on the right keeps an int, so it needs the sign-extend, so it runs the move loop instead.
当每个参数都是通用寄存器中的单个 64 位值（这是大多数指针传递代码的情况）时，该方案甚至不需要解释器。它被标记为“thunk-eligible”，一段手写的微型 thunk 代码会直接将值从参数数组加载到参数寄存器中并进行调用。它完全跳过了移动循环、中间寄存器镜像以及来回复制的过程。右侧的调用包含一个整数，因此需要符号扩展，所以它会运行移动循环。

The plan is plain data, and the thunk ships in the binary’s read-only text like any other function. Nothing is ever both writable and executable, the same property closures already get from static trampolines.
该方案只是普通数据，而 thunk 像其他任何函数一样存在于二进制文件的只读代码段中。没有任何东西会同时既可写又可执行，这与静态蹦床（static trampolines）提供的闭包属性相同。

### Build it once, invoke it many times
### 构建一次，多次调用

The plan is exposed as a small, opt-in API. You build a plan from a prepared ffi_cif, invoke it as many times as you like, and free it when you’re done:
该方案通过一个小型的可选 API 暴露出来。你从准备好的 `ffi_cif` 构建一个方案，根据需要多次调用它，并在完成后释放它：

```c
ffi_call_plan *plan = ffi_call_plan_alloc(&cif); /* build the plan once */
ffi_call_plan_invoke(plan, fn, &rv, av); /* invoke it, no per-call setup */
/* ... invoke it again, and again ... */
ffi_call_plan_free(plan);
```

ffi_call itself is untouched. A binding that already caches an ffi_cif per signature, which is most of them, caches a plan beside it and calls through ffi_call_plan_invoke. The plan is immutable once built, so one plan can be shared and invoked from any thread without a lock. A signature the fast path can’t handle is still fine: invoke falls back to ffi_call for it.
`ffi_call` 本身保持不变。那些已经为每个签名缓存 `ffi_cif` 的绑定（大多数绑定都是如此）可以在旁边缓存一个方案，并通过 `ffi_call_plan_invoke` 进行调用。方案一旦构建就是不可变的，因此一个方案可以在任何线程中共享和调用，无需加锁。如果快速路径无法处理某个签名，也没关系：`invoke` 会回退到 `ffi_call` 来处理。
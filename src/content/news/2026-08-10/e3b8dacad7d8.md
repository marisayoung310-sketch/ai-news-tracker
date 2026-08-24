---
title: "Relying on Go"
originalUrl: "https://antonz.org/relying-on-go/"
date: "2026-08-09T21:58:17.426Z"
---

# Relying on Go / 依赖 Go 语言

Everyone is creating a new programming language these days, often one that's "like Go but with more features" or "like Rust but simpler". Solod, a systems language for C and Go developers, might look like one of those languages, but it takes a different approach.

如今每个人都在创造新的编程语言，通常是“像 Go 但功能更多”或者“像 Rust 但更简单”的语言。Solod 是一门面向 C 和 Go 开发者的系统语言，它看起来可能也是其中之一，但它采取了不同的路径。

### Go's tooling / Go 的工具链

Solod is not "Go-like" in the usual sense, nor is it an attempt to "fix Go's mistakes". At the language level, Solod is literally a subset of Go. Solod reuses much of Go's existing tooling, including syntax highlighting, LSP, linters, and the package management system.

Solod 并不是通常意义上的“类 Go”语言，也不是为了“修复 Go 的错误”而生。在语言层面，Solod 实际上就是 Go 的一个子集。Solod 重用了 Go 现有的许多工具，包括语法高亮、LSP、代码检查器（linters）以及包管理系统。

Take this quick-start guide, for example:

以这份快速入门指南为例：

**Quick start / 快速入门**

Install the So command line tool:
安装 So 命令行工具：
`go install solod.dev/cmd/so@latest`

Create a new Go project and add the Solod dependency to use the So standard library:
创建一个新的 Go 项目并添加 Solod 依赖，以使用 So 标准库：
`go mod init example`
`go get solod.dev@latest`

Write regular Go code, but use Solod packages instead of the standard Go packages:
编写常规的 Go 代码，但使用 Solod 包代替标准的 Go 包：

```go
package main 
import "solod.dev/so/math" 

func main() { 
    ans := math.Sqrt(1764) 
    println("Hello, world! The answer is", int(ans)) 
}
```

Run without saving the binary:
无需保存二进制文件即可运行：
`so run .`

That's it! There's nothing new here. It's mostly standard Go workflow, except for `so run`, which is a Go program that mimics `go run`.

就是这样！这里没有什么新鲜事。这基本上是标准的 Go 工作流程，除了 `so run`，它是一个模仿 `go run` 的 Go 程序。

### Go's standard library / Go 的标准库

Solod also reuses a lot of Go's standard library code and tests. Some of it is taken verbatim from Go's source code, like these two string functions:

Solod 还重用了大量 Go 的标准库代码和测试。其中一些是直接从 Go 源代码中照搬过来的，比如这两个字符串函数：

```go
// CutPrefix returns s without the provided leading prefix string 
// and reports whether it found the prefix. 
func CutPrefix(s, prefix string) (string, bool) { 
    if !HasPrefix(s, prefix) { return s, false } 
    return s[len(prefix):], true 
} 

// HasPrefix reports whether the string s begins with prefix. 
func HasPrefix(s, prefix string) bool { 
    return len(s) >= len(prefix) && s[:len(prefix)] == prefix 
}
```

Of course, Solod retains the Go authors' copyright. Some code requires changes to support the manual memory management with explicit allocators used by Solod:

当然，Solod 保留了 Go 作者的版权。有些代码需要进行修改，以支持 Solod 使用的带有显式分配器的手动内存管理：

```go
// Go version. 
func Clone(s string) string { 
    if len(s) == 0 { return "" } 
    b := make([]byte, len(s)) 
    copy(b, s) 
    return unsafe.String(&b[0], len(b)) 
} 

// Solod version. 
func Clone(a mem.Allocator, s string) string { 
    if len(s) == 0 { return "" } 
    b := mem.AllocSlice[byte](a, len(s), len(s)) 
    copy(b, s) 
    return string(b) 
}
```

You can probably see the resemblance.

你大概能看出它们的相似之处。

### A grain of salt / 值得注意的地方

Go tools don't know that Solod is a subset of the full Go language, so they won't flag features Solod doesn't support, like function literals or iterators. These diagnostics come from the custom `so` tooling:

Go 工具并不知道 Solod 是完整 Go 语言的一个子集，因此它们不会标记 Solod 不支持的特性，例如函数字面量或迭代器。这些诊断信息来自自定义的 `so` 工具：

```go
package main 
func main() { 
    f := func(n int) { println(n) } 
    f(42) 
} 
// main.go:4:7: function literals are not supported 
// f := func(n int) { 
// ^here
```

Also, although a substantial part of Go's standard library is ported verbatim or with minimal changes from the original source, that doesn't mean the code is automatically correct. Solod still needs its own tests, including ones that run under sanitizers and static analyzers.

此外，尽管 Go 标准库的很大一部分是直接移植或仅经过微小修改，但这并不意味着代码自动就是正确的。Solod 仍然需要自己的测试，包括在清理器（sanitizers）和静态分析器下运行的测试。

### It's all C in the end / 最终一切皆为 C

All Solod code is translated to regular C11 and then compiled with GCC or Clang. Solod therefore relies on C tooling and decades of optimization work just as much as on Go's.

所有的 Solod 代码都会被翻译成标准的 C11，然后使用 GCC 或 Clang 进行编译。因此，Solod 对 C 工具链和数十年的优化成果的依赖，丝毫不亚于对 Go 的依赖。

**Solod code:**
**Solod 代码：**
```go
package main 
import "solod.dev/so/math" 

func main() { 
    ans := math.Sqrt(1764) 
    println("Hello, world! The answer is", int(ans)) 
}
```

**Translated C code:**
**翻译后的 C 代码：**
```c
// -- main.h -- 
#pragma once 
#include "so/builtin/builtin.h" 
#include "so/math/math.h" 

// -- main.c -- 
#include "main.h" 
int main(void) { 
    double ans = math_Sqrt(1764.0); 
    so_println("%s %" PRIdINT, "Hello, world! The answer is", (so_int)(ans)); 
    return 0; 
}
```

The C version is noisier, of course, especially for more complex programs than this one. But it remains readable. And since there's no runtime, interoperability between Solod and C costs nothing.

当然，C 版本会更繁琐一些，特别是对于比这更复杂的程序而言。但它依然保持了可读性。而且由于没有运行时（runtime），Solod 和 C 之间的互操作性几乎没有开销。

### Final thoughts / 结语

A new language doesn't necessarily need a new ecosystem. Solod relies heavily on Go, and I see that as a strength, not a weakness. Reusing Go's proven tools and standard library makes Solod more reliable and easier to work with.

一门新语言不一定非要一个全新的生态系统。Solod 严重依赖 Go，我认为这是一个优势，而不是弱点。重用 Go 经过验证的工具和标准库，使得 Solod 更加可靠且易于使用。

If you're interested, take a look at Solod's readme — it has everything you need to get started. Or try it online without installing anything.

如果你感兴趣，可以看看 Solod 的自述文件（readme）——里面有你入门所需的一切。或者无需安装，直接在线尝试。
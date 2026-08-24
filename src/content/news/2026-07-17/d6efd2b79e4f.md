---
title: "How Our Rust-to-Zig Rewrite Is Going"
originalUrl: "https://rtfeldman.com/rust-to-zig"
date: "2026-07-16T22:26:13.726Z"
---

# How Our Rust-to-Zig Rewrite Is Going
# 我们的 Rust 到 Zig 重构进展如何

For the past year and a half, the team building Roc's compiler has been rewriting our 300,000 lines of Rust code into Zig, for reasons I'll recap below. We recently passed an exciting milestone: feature parity with the original compiler! Since the Bun project recently shared an experience report of their rewrite in the other direction (from Zig to Rust, although that's only the tip of the iceberg of differences between our rewrites), this seems like a nice time to reflect on how our move from Rust to Zig is going.

在过去的一年半里，Roc 编译器团队一直在将我们 300,000 行的 Rust 代码重写为 Zig，原因我将在下文回顾。最近我们达成了一个令人兴奋的里程碑：与原始编译器实现了功能对等！由于 Bun 项目最近分享了他们反向重构（从 Zig 到 Rust，尽管这只是我们重构差异的冰山一角）的经验报告，现在似乎是一个回顾我们从 Rust 迁移到 Zig 进展的好时机。

### Passing Feature Parity
### 达成功能对等

Hitting this milestone made it possible to update Brendan Hansknecht's charming 2024 WASM-4 game, Rocci Bird (with art by Luke DeVault) to use the new compiler. It's a nice example because the whole game is under a thousand lines of Roc code, and you can play it on itch.io or right here via WebAssembly: Click or tap the game, then press Space (or tap) to flap. On mobile you don't have a right arrow key, so refresh the page to restart the game.

达成这一里程碑使得更新 Brendan Hansknecht 迷人的 2024 年 WASM-4 游戏 Rocci Bird（由 Luke DeVault 设计美术）以使用新编译器成为可能。这是一个很好的例子，因为整个游戏的代码不到一千行，你可以在 itch.io 上玩，或者直接通过 WebAssembly 在这里体验：点击或轻触游戏，然后按空格键（或点击）来拍动翅膀。在移动设备上没有右箭头键，所以请刷新页面以重新开始游戏。

Rocci Bird's updated source code is a bit more concise than the original, and `roc build --opt=size` now outputs a 31KB wasm binary. (The original compiler produced a binary more than double that size.) Rocci Bird is by no means a large code base, but getting it to run at all required landing a lot of features in the new compiler. Seeing those chunky purple pixels brought a smile to my face when we finally got there!

Rocci Bird 更新后的源代码比原来更简洁，并且 `roc build --opt=size` 现在输出的 wasm 二进制文件仅为 31KB。（原始编译器生成的二进制文件大小是这个的两倍多。）Rocci Bird 绝不是一个庞大的代码库，但要让它运行起来，需要在新编译器中实现许多功能。当我们最终实现目标时，看到那些厚实的紫色像素，我不禁露出了微笑！

To be clear, this is a milestone but not a formal release. (We aim to land version 0.1.0 later this year.) That said, it's a wonderful milestone to have reached, and I'm extremely grateful to all the people who came together to make this happen!

需要说明的是，这是一个里程碑，而非正式发布。（我们的目标是在今年晚些时候发布 0.1.0 版本。）尽管如此，这是一个非常棒的里程碑，我非常感谢所有共同努力实现这一目标的人！

*(List of contributors omitted for brevity)*
*(贡献者名单因篇幅原因省略)*

Speaking of time: our 487-day rewrite took 476 days longer than Bun's 11-day rewrite from their ~500K lines of Zig into Rust. There are many reasons for this difference which have nothing to do with Rust or Zig, including the fact that theirs was a direct port whereas we'd decided to rewrite because of how much we were going to change. The techniques they used wouldn't have worked in our case. The laundry list of changes we made also means comparing our original Rust code base and new Zig code base won't be apples-to-apples. Still, we've reached a nice point to reflect on how the rewrite has gone, both in terms of what new features it has unlocked for Roc programmers, as well as how our experiences with Rust and Zig have compared. Let's get into it!

说到时间：我们 487 天的重构比 Bun 从他们约 50 万行 Zig 代码重构为 Rust 的 11 天多用了 476 天。造成这种差异的原因有很多，与 Rust 或 Zig 本身无关，包括他们的项目是直接移植，而我们决定重构是因为我们打算进行大量的改动。他们使用的方法在我们的案例中并不适用。我们所做的繁杂改动也意味着将我们原始的 Rust 代码库与新的 Zig 代码库进行比较并非“苹果对苹果”的等价比较。尽管如此，我们已经到了一个很好的节点来反思重构的进展，无论是它为 Roc 程序员解锁了哪些新功能，还是我们对 Rust 和 Zig 的使用体验对比。让我们深入了解一下！

### Hot Code Loading + Cross-Compiled Binaries
### 热代码加载 + 交叉编译二进制文件

Roc's new compiler automatically does hot code loading during development. For example, I can run `roc server.roc` to start a Web server, then change some of its code while it's running. The next time that server handles a request, it'll automatically be handled using the new code.

Roc 的新编译器在开发过程中会自动进行热代码加载。例如，我可以运行 `roc server.roc` 启动一个 Web 服务器，然后在它运行时修改部分代码。当服务器下次处理请求时，它会自动使用新代码进行处理。

Hot loading is standard behavior for interpreted languages like Python, but not so much for high-performance compiled languages like Roc. When I'm ready to deploy, `roc build server.roc` gets me an LLVM-optimized, self-contained binary that I can drop onto a machine and run. Roc also cross-compiles; building a static binary that runs on Alpine Linux is as simple as `roc build --target=x64musl`, and that command will produce the same output bytes (for the same input source code bytes) when run on a Mac or any other system—which not all compilers guarantee.

热加载对于 Python 等解释型语言来说是标准行为，但对于 Roc 这种高性能编译型语言来说则不然。当我准备部署时，`roc build server.roc` 会为我生成一个经过 LLVM 优化、自包含的二进制文件，我可以将其直接放到机器上运行。Roc 还支持交叉编译；构建一个在 Alpine Linux 上运行的静态二进制文件就像 `roc build --target=x64musl` 一样简单，而且该命令在 Mac 或任何其他系统上运行时，会产生相同的输出字节（对于相同的输入源代码字节）——并非所有编译器都能保证这一点。

### Pattern Matching with String Interpolation
### 带字符串插值的模式匹配

The HTTP request-handling logic from that video looks like this:
视频中的 HTTP 请求处理逻辑如下所示：

```rust
match (verb, path) {
    ("GET", "/users/${id}/${page}") => match page {
        "" | "profile" => ok(id)
        "settings" => ok(with_default(user_agent, id))
        "posts/${post_id}" => ok("Post ID: ${post_id}")
        _ => not_found
    }
    ("GET", "/users/${id}") => ok(id)
    ("POST", "/posts/new") => created(with_default(…))
    _ => not_found
}
```

This uses several features we introduced in the new compiler. For example, that `"/users/${id}"` syntax is not implemented with parsing template strings at runtime, but rather with a new language feature: string interpolation.

这使用了我们在新编译器中引入的几项功能。例如，`"/users/${id}"` 语法并不是通过在运行时解析模板字符串来实现的，而是通过一项新的语言特性：字符串插值。
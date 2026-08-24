---
title: "Claude Code uses Bun written in Rust now"
originalUrl: "https://simonwillison.net/2026/Jul/19/claude-code-in-bun-in-rust/"
date: "2026-07-19T22:12:33.008Z"
---

# Claude Code now uses Bun written in Rust
# Claude Code 现已使用 Rust 编写的 Bun

In *Rewriting Bun in Rust*, Jarred Sumner made the following claim: Claude Code v2.1.181 (released June 17th) and later use the Rust port of Bun. Startup got 10% faster on Linux but otherwise, barely anyone noticed. Boring is good.

在《用 Rust 重写 Bun》一文中，Jarred Sumner 声称：Claude Code v2.1.181（6 月 17 日发布）及更高版本已开始使用 Rust 移植版的 Bun。在 Linux 上，启动速度提升了 10%，但除此之外，几乎没人察觉到变化。平淡即是好。

I decided to have a poke at my own Claude Code installation to see if I could find evidence that it was using Bun written in Rust. I found these two commands convincing:

我决定检查一下我自己的 Claude Code 安装，看看能否找到它正在使用 Rust 版 Bun 的证据。我发现以下两条命令非常有说服力：

`strings ~/.local/bin/claude | grep -m1 'Bun v1'`

For me this outputs Bun v1.4.0 (macOS arm64). The most recent release of Bun on GitHub is currently v1.3.14 from May 12th, so that v1.4.0 version number in Claude supports them shipping a preview of a not-yet-released Bun version. (Update: The Rust version has been released as Bun canary - running `bun upgrade --canary` will install this release.)

对我而言，该命令输出的是 `Bun v1.4.0 (macOS arm64)`。目前 GitHub 上最新的 Bun 版本是 5 月 12 日发布的 v1.3.14，因此 Claude 中显示的 v1.4.0 版本号证实了他们正在发布尚未正式推出的 Bun 预览版。（更新：Rust 版本已作为 Bun canary 发布——运行 `bun upgrade --canary` 即可安装此版本。）

`strings ~/.local/bin/claude | grep -Eo 'src/[[:alnum:]_./-]+\.rs'`

This outputs a list of 563 filenames, starting with these:
`src/runtime/bake/dev_server/mod.rs`
`src/runtime/bake/production.rs`
`src/bundler/bundle_v2.rs`

该命令输出了 563 个文件名列表，开头如下：
`src/runtime/bake/dev_server/mod.rs`
`src/runtime/bake/production.rs`
`src/bundler/bundle_v2.rs`

It looks like Bun in Rust is indeed being run in production across millions of different devices. Like Jarred said, "Boring is good".

看起来，用 Rust 编写的 Bun 确实已经在数百万台不同的设备上投入生产环境运行了。正如 Jarred 所说：“平淡即是好”。

Update: Here's a neat trick from Ajan Raj:
`cat > /tmp/bun-version.ts <<'EOF'`
`console.log("embedded bun:", Bun.version);`
`process.exit(0);`
`EOF`
`BUN_OPTIONS="--preload=/tmp/bun-version.ts" claude --version`

更新：这是来自 Ajan Raj 的一个小技巧：
`cat > /tmp/bun-version.ts <<'EOF'`
`console.log("embedded bun:", Bun.version);`
`process.exit(0);`
`EOF`
`BUN_OPTIONS="--preload=/tmp/bun-version.ts" claude --version`

This outputs 1.4.0 for me. Here's the commit from May 17th that updated the version in package.json to 1.4.0. That version hasn't been changed since then, but also hasn't yet made it into a tagged release outside of canary.

这对我来说输出的是 1.4.0。这是 5 月 17 日将 `package.json` 中的版本更新为 1.4.0 的提交记录。自那时起该版本号未再更改，但也尚未进入 canary 之外的正式标签发布版本中。
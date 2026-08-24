---
title: "Build System Reworked"
originalUrl: "https://ziglang.org/devlog/2026/#2026-05-26"
date: "2026-05-27T23:02:52.359Z"
---

# Build System Reworked / 构建系统重构

**May 26, 2026 | Build System Reworked | Author: Andrew Kelley**
**2026年5月26日 | 构建系统重构 | 作者：Andrew Kelley**

Big branch just landed: separate the maker process from the configurer process. This devlog entry is essentially a preview of the upcoming release notes, but serves as an advanced notice to those who want to help test out the new features and provide feedback that will guide the Zig project moving forward.
一个重大分支刚刚合并：将“构建者（maker）”进程与“配置者（configurer）”进程分离开来。这篇开发日志本质上是即将发布的发行说明的预览，同时也作为预先通知，旨在帮助那些希望测试新功能并提供反馈的用户，这些反馈将指引 Zig 项目未来的发展方向。

Before, build.zig files plus the build system implementation were all compiled into one bloated process, in Debug mode. After build.zig logic finished constructing a build graph in memory, the “build runner” code executed it.
在此之前，`build.zig` 文件和构建系统实现都被编译成一个臃肿的进程，且处于 Debug 模式。当 `build.zig` 逻辑在内存中构建完构建图后，“构建运行器（build runner）”代码便会执行它。

Now, build.zig files are compiled into a small process (the “configurer”) in debug mode. After this logic finishes constructing a build graph in memory, it is serialized to a binary configuration file. The parent zig build process is aware of this file and caches it for next time. While waiting for all that, it asynchronously compiles the build graph execution process (the “maker”) in release mode. Once the configuration file is available and the maker process is finished compiling, the maker process is executed, passing it the configuration file. The maker process only needs to be compiled once per zig version thanks to the global cache. The maker process then executes the build graph, which is contained within the serialized configuration file.
现在，`build.zig` 文件被编译成一个处于 debug 模式的小型进程（即“配置者”）。当该逻辑在内存中完成构建图的构造后，它会被序列化为一个二进制配置文件。父级 `zig build` 进程会识别该文件并将其缓存以供下次使用。在等待上述过程的同时，它会异步地以 release 模式编译构建图执行进程（即“构建者”）。一旦配置文件就绪且“构建者”进程编译完成，系统便会执行“构建者”进程，并将配置文件传递给它。得益于全局缓存，“构建者”进程在每个 Zig 版本中只需编译一次。随后，“构建者”进程会执行包含在序列化配置文件中的构建图。

The primary motivation of this change was to make zig build faster, in three ways:
此次变更的主要动机是为了通过以下三种方式提升 `zig build` 的速度：

1. Only the user’s build.zig logic will be compiled with each change, rather than the entire build system along with it. This is starting to become more valuable now that we have introduced --watch, --fuzz and --webui. The build system can grow more features without making zig build take longer.
1. 每次修改时，仅编译用户的 `build.zig` 逻辑，而不是连同整个构建系统一起编译。随着我们引入了 `--watch`、`--fuzz` 和 `--webui`，这一点变得愈发重要。构建系统可以在不增加 `zig build` 时间的前提下扩展更多功能。

2. Now the build system can skip rerunning the build.zig logic entirely when it knows nothing will change, for example if you add -freference-trace to your zig build command line, it now avoids re-running your build.zig logic redundantly, using the same configuration as last time.
2. 现在，当构建系统确定没有任何变化时，可以完全跳过 `build.zig` 逻辑的重新运行。例如，如果你在 `zig build` 命令行中添加了 `-freference-trace`，它现在会使用与上次相同的配置，从而避免冗余地重新运行 `build.zig` 逻辑。

3. Now the process that actually executes the build graph is compiled with optimizations enabled.
3. 现在，实际执行构建图的进程在编译时启用了优化。

To demonstrate points 2 and 3, here is the difference between running zig build --help before and after:
为了演示第 2 点和第 3 点，以下是运行 `zig build --help` 前后的性能对比：

*(Benchmark data omitted for brevity)*
*(基准测试数据略)*

It’s dramatic because before, build.zig logic was being executed with each zig build command, but now, the build system uses the cached, serialized configuration instead.
效果非常显著，因为之前每次执行 `zig build` 命令时都会运行 `build.zig` 逻辑，而现在构建系统直接使用缓存的序列化配置。

Aside from performance, I expect third-party tooling such as ZLS to benefit from consuming the serialized configuration file rather than maintaining a fork of the build runner.
除了性能之外，我预计像 ZLS 这样的第三方工具将受益于直接读取序列化配置文件，而无需再维护一个构建运行器的分支。

This changeset heavily reworks the internal mechanism of the zig build system, however, it is mostly non-breaking from an API perspective, with the exceptions noted in the PR linked above.
此次变更大幅重构了 Zig 构建系统的内部机制，但从 API 角度来看，它基本是向后兼容的，除了上述 PR 中提到的例外情况。

For most people I’m guessing this is the main breaking change they’ll hit:
对于大多数人来说，我猜测这是他们会遇到的主要破坏性变更：

`if (b.args) |args| { run_cmd.addArgs(args); }` ⬇️ `run_cmd.addPassthruArgs();`

This removes a capability from build scripts since they can no longer observe those arguments. In exchange, it means that when changing those arguments, build scripts no longer must be rebuilt from source.
这移除了构建脚本的一项功能，因为它们无法再观察到这些参数。作为交换，这意味着在更改这些参数时，构建脚本不再需要从源码重新编译。

If you’re someone who wants to influence the direction of Zig, this is a good time to upgrade your projects to the development version and try out these changes. We’ll be releasing 0.17.0 within a couple weeks from now. However, if you don’t have time, and you find out that 0.17.0 broke your build, don’t worry, there will be plenty of opportunity to get fixes in for the 0.17.1 tag as well.
如果你希望影响 Zig 的发展方向，现在是将项目升级到开发版本并尝试这些变更的好时机。我们将在几周内发布 0.17.0 版本。不过，如果你没有时间，且发现 0.17.0 破坏了你的构建，请不必担心，后续还有很多机会在 0.17.1 版本中进行修复。

***

**April 08, 2026 | Incremental compilation with LLVM | Author: Matthew Lugg**
**2026年4月8日 | LLVM 增量编译 | 作者：Matthew Lugg**

I’ve been spending a bit of time working on personal projects after merging my type resolution changes last month, but I did find the time recently to make some improvements to the LLVM codegen backend. This involved a few different enhancements with various goals, but one nice user-facing change was that I managed to get incremental compilation working with the LLVM backend.
在上个月合并了类型解析变更后，我花了一些时间处理个人项目，但最近我确实抽出时间对 LLVM 代码生成后端进行了一些改进。这涉及几个不同目标的增强功能，其中一个对用户友好的改进是，我成功让 LLVM 后端支持了增量编译。

Sadly this can’t do anything to speed up the dreaded LLVM Emit Object: that time is entirely down to LLVM. However, what incremental compilation does help with is minimizing the time spent in the actual Zig compiler code, which means that if your code has compile errors (so “LLVM Emit Object” will be skipped), you’ll usually get those errors very quickly. (Of course, it does still give you a slight speed-up in successful builds too.)
遗憾的是，这无法加快令人头疼的“LLVM Emit Object”过程：该耗时完全取决于 LLVM。然而，增量编译确实有助于最小化 Zig 编译器代码本身的执行时间，这意味着如果你的代码存在编译错误（此时会跳过“LLVM Emit Object”），你通常能非常快地获得错误提示。（当然，它在成功构建时也能带来一定的速度提升。）

This support is available in master branch builds right now, and will be in the 0.16.0 release (which we’ll be tagging very soon).
此支持目前已在 master 分支构建中可用，并将包含在 0.16.0 版本中（我们很快就会发布该版本）。

For anyone who still hasn’t tried it, especially if you’re using Zig’s master branch, please do try out incremental compilation by passing -fincremental --watch to zig build!
对于尚未尝试过的用户，特别是正在使用 Zig master 分支的用户，请务必通过在 `zig build` 中添加 `-fincremental --watch` 来尝试增量编译！
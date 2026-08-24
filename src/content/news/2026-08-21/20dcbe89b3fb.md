---
title: "Malicious Rust crate Arrayref runs a build-time payload"
originalUrl: "https://safedep.io/arrayref-proc-macro1-rust-build-time-malware/"
date: "2026-08-20T21:48:09.752Z"
---

# Malicious Rust crate Arrayref runs a build-time payload
# 恶意 Rust crate “arrayref” 运行构建时恶意负载

**Summary**
On August 20, 2026, a compromised release of the popular Rust crate `arrayref` appeared on crates.io. Version 0.3.10 added a dependency on a typosquatted crate called `proc-macro1`, whose build script downloads and runs a remote binary while a project compiles. The code runs at build time, so simply compiling a project that pulled the bad versions is enough to trigger it. The crates.io team has since removed the malicious versions.

**摘要**
2026 年 8 月 20 日，流行的 Rust crate `arrayref` 的一个受损版本出现在 crates.io 上。0.3.10 版本增加了一个名为 `proc-macro1` 的仿冒（typosquatted）crate 依赖，其构建脚本会在项目编译时下载并运行一个远程二进制文件。由于代码在构建时运行，因此只需编译拉取了这些恶意版本的项目即可触发攻击。crates.io 团队现已删除了这些恶意版本。

---

**Packages involved**
The genuine `arrayref` and `append-only-vec` crates are maintained by `droundy`, whose account appears to have been compromised. The corresponding GitHub repositories are no longer available. `github.com/droundy/arrayref`, `github.com/droundy/append-only-vec`, and the entire `github.com/droundy` account all return 404, so the upstream code is no longer available for inspection.

**涉及的软件包**
正版的 `arrayref` 和 `append-only-vec` crate 由 `droundy` 维护，其账户似乎已被入侵。相应的 GitHub 仓库已无法访问。`github.com/droundy/arrayref`、`github.com/droundy/append-only-vec` 以及整个 `github.com/droundy` 账户均返回 404 错误，因此上游代码已无法进行审查。

A separate account, `dtolney`, published `proc-macro1`. The username closely resembles David Tolnay’s real `dtolnay` account. Its metadata forges `authors = ["David Tolnay <[email protected]>"]` and points repository at a `dtolnay/proc-macro1` path that returns 404.

另一个名为 `dtolney` 的账户发布了 `proc-macro1`。该用户名与 David Tolnay 真实的 `dtolnay` 账户非常相似。其元数据伪造了 `authors = ["David Tolnay <[email protected]>"]`，并将仓库指向一个返回 404 的 `dtolnay/proc-macro1` 路径。

---

**What the build script does**
The payload lives in the build script of `proc-macro1` 1.0.107. It stores its server address as base64 fragments and reassembles them at build time. Decoded, those fragments produce the payload host `hxxps://23[.]254[.]165[.]112:9089/` and the command and control address `23[.]254[.]165[.]112:443`. The script fetches an architecture-specific binary over a TLS connection that accepts any certificate without validation, then runs it detached from the build. On Unix it drops and runs `/tmp/rust-setup`. On Windows it writes a PowerShell script and a VBScript launcher under `%TEMP%` and starts them hidden, then abandons the child process so the compiler does not wait for it.

**构建脚本的功能**
恶意负载位于 `proc-macro1` 1.0.107 的构建脚本中。它将服务器地址存储为 base64 片段，并在构建时重新组装。解码后，这些片段指向恶意负载主机 `hxxps://23[.]254[.]165[.]112:9089/` 以及命令与控制（C2）地址 `23[.]254[.]165[.]112:443`。该脚本通过不验证证书的 TLS 连接获取特定架构的二进制文件，然后将其与构建过程分离运行。在 Unix 系统上，它会释放并运行 `/tmp/rust-setup`；在 Windows 上，它会在 `%TEMP%` 目录下写入 PowerShell 脚本和 VBScript 启动器并隐藏运行，随后放弃子进程，从而使编译器无需等待其完成。

---

**How it spread**
The owner account yanked the older `arrayref` releases 0.3.5 through 0.3.9. Yanking a crate makes Cargo print a “consider updating to a version that is not yanked” warning, which nudges developers toward the only non-yanked release, the malicious 0.3.10. The reporter who filed the RustSec advisory noted this is how they hit it. `arrayref` is widely used as a transitive dependency. It sits deep in common Rust graphs through `tiny-skia`, `sctk-adwaita`, and `winit`, which places it under most GUI work built on `egui`, `eframe`, and `iced`.

**传播方式**
所有者账户撤回（yanked）了较旧的 `arrayref` 0.3.5 到 0.3.9 版本。撤回 crate 会导致 Cargo 打印“考虑更新到未撤回版本”的警告，这会诱导开发者转向唯一的非撤回版本，即恶意的 0.3.10。提交 RustSec 建议的报告者指出，他们正是因此中招。`arrayref` 被广泛用作传递依赖。它通过 `tiny-skia`、`sctk-adwaita` 和 `winit` 深植于常见的 Rust 依赖图中，这意味着大多数基于 `egui`、`eframe` 和 `iced` 构建的 GUI 项目都受到影响。

---

**Part 2: Technical Analysis**
Our technical analysis covers the two crates behind this incident, `arrayref` 0.3.10 and `proc-macro1` 1.0.107. `arrayref` 0.3.10 pulls in a dependency called `proc-macro1`. The malicious code is in the build script of `proc-macro1`, not in `arrayref` itself. The injection point in `arrayref` is a small crate of four macros. Up to 0.3.9 it has no build script and no runtime dependencies. Version 0.3.10 keeps that macro source and adds one line to the manifest: `[dependencies.proc-macro1] version = "1.0.107"`. This entry is sufficient to introduce the malicious crate.

**第二部分：技术分析**
我们的技术分析涵盖了此次事件背后的两个 crate：`arrayref` 0.3.10 和 `proc-macro1` 1.0.107。`arrayref` 0.3.10 引入了一个名为 `proc-macro1` 的依赖。恶意代码位于 `proc-macro1` 的构建脚本中，而非 `arrayref` 本身。`arrayref` 的注入点是一个包含四个宏的小型 crate。在 0.3.9 版本之前，它没有构建脚本，也没有运行时依赖。0.3.10 版本保留了宏源代码，并在清单中添加了一行：`[dependencies.proc-macro1] version = "1.0.107"`。这一条目足以引入恶意 crate。
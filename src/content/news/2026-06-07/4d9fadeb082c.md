---
title: "Zeroserve: A zero-config web server you can script with eBPF"
originalUrl: "https://su3.io/posts/introducing-zeroserve"
date: "2026-06-06T22:34:51.325Z"
---

# Zeroserve: A zero-config web server you can script with eBPF

**Zeroserve: 一个可以使用 eBPF 脚本化的零配置 Web 服务器**

zeroserve is a small, fast, zero-config HTTPS server. You hand it a tarball of a website and it serves it - over HTTP/2 and TLS 1.3, with hot reload and a tiny resident footprint. The twist is that you can drop eBPF programs into the tarball and they run on every request, in userspace, as sandboxed middleware - rewriting, authenticating, and rate-limiting requests, or reverse-proxying them to a backend when you want it to act as a gateway in front of your app.

Zeroserve 是一个轻量、快速且零配置的 HTTPS 服务器。你只需给它一个网站的 tarball（归档文件），它就能通过 HTTP/2 和 TLS 1.3 协议将其发布出来，并支持热重载，且内存占用极小。其独特之处在于，你可以将 eBPF 程序放入 tarball 中，这些程序会在每个请求中以沙盒中间件的形式在用户空间运行——用于重写、认证、限流，或者在需要将其作为应用网关时，将请求反向代理到后端。

In short:
* **Fast:** on one core it beats nginx across most workloads - small and large static files, scripted middleware, and small-response proxying, all over HTTPS.
* **Efficient eBPF scripting:** scripts are JIT-compiled to native code and sandboxed in userspace, cheap enough to run on every request.
* **Program-as-configuration:** your eBPF program is the whole configuration, deciding what happens to each request.
* **io_uring throughout:** every network and disk operation is submitted through io_uring.
* **Modern TLS in the box:** TLS 1.3, HTTP/2, Encrypted Client Hello, SNI certificate selection, and JA4 fingerprinting.
* **Simple to operate:** serve a whole site from one tarball and hot-reload it (and the TLS material) with a SIGHUP.

简而言之：
* **快速：** 在单核性能上，它在大多数工作负载下都优于 Nginx，无论是处理大小静态文件、脚本化中间件，还是小响应代理，且全程支持 HTTPS。
* **高效的 eBPF 脚本：** 脚本被 JIT 编译为原生代码并在用户空间沙盒中运行，开销极低，足以在每个请求中执行。
* **程序即配置：** 你的 eBPF 程序就是全部配置，决定了每个请求的处理逻辑。
* **全程 io_uring：** 所有的网络和磁盘操作都通过 io_uring 提交。
* **内置现代 TLS：** 支持 TLS 1.3、HTTP/2、加密客户端问候 (ECH)、SNI 证书选择以及 JA4 指纹识别。
* **运维简单：** 通过一个 tarball 即可发布整个网站，并可通过 SIGHUP 信号热重载网站内容及 TLS 证书。

It's meant to be an alternative to nginx and Caddy, and the design bet is about configuration. Those servers give you a declarative config language - location blocks, rewrite rules, map directives, try_files - and then, once the declarative language hits its limits, an optional scripting runtime bolted on the side (Lua, or Caddy's plugins). Behavior ends up split across two layers: directives that quietly grow their own control flow, plus scripts that run somewhere in the request lifecycle you have to keep in your head. zeroserve collapses that into one thing. There is no config file. The eBPF program is the configuration - a single, ordinary, sandboxed program that sees every request and decides what happens: routing, headers, auth, rate limiting, proxying. I want the whole request path in one program I can read top to bottom.

它的设计初衷是作为 Nginx 和 Caddy 的替代品，其核心设计理念在于配置方式。那些服务器提供声明式配置语言（如 location 块、重写规则、map 指令、try_files 等），但当声明式语言达到极限时，通常需要额外挂载脚本运行时（如 Lua 或 Caddy 插件）。这导致行为被拆分为两层：一方面是逐渐变得复杂的指令控制流，另一方面是需要在脑海中时刻追踪其执行时机的脚本。Zeroserve 将这一切合二为一。这里没有配置文件，eBPF 程序就是配置本身——一个单一、普通且受沙盒保护的程序，它能感知每个请求并决定如何处理：路由、头部修改、认证、限流、代理。我希望整个请求路径都在一个我可以从头读到尾的程序中完成。

### One tarball, served in place
### 单个 tarball，原地服务

The whole site is a single tar file. zeroserve indexes it on load - building a path -> byte-range map - and then serves files by issuing byte-range reads against the tarball itself. Nothing is ever unpacked to disk. The site lives entirely in that one file, so there's no document root for a stray location rule to expose, and a deploy is a single atomic file swap.

整个网站就是一个单一的 tar 文件。Zeroserve 在加载时对其进行索引，构建“路径到字节范围”的映射，然后通过对 tarball 本身执行字节范围读取来提供文件。没有任何内容会被解压到磁盘。网站完全存在于那个文件中，因此不存在会被错误配置暴露的文档根目录，部署也仅仅是原子性的文件替换。

To package a directory:
`zeroserve --pack ./public > site.tar`
`zeroserve --addr 0.0.0.0:8080 site.tar`

打包目录：
`zeroserve --pack ./public > site.tar`
`zeroserve --addr 0.0.0.0:8080 site.tar`

Deploying a new version is "replace the tarball and send SIGHUP". The reload swaps the site, the scripts, and the TLS material atomically, in the same process, with no dropped connections:
`killall -SIGHUP zeroserve`

部署新版本只需“替换 tarball 并发送 SIGHUP 信号”。重载操作会在同一进程中原子性地交换网站内容、脚本和 TLS 材料，且不会丢弃任何连接：
`killall -SIGHUP zeroserve`

All network and disk I/O goes through io_uring (via the monoio runtime). Each instance is a single-threaded event loop. That sounds like a limitation, and per-process it is - but it's the right shape when your scaling unit is "more processes", and it's why many of them coexist happily on one box.

所有的网络和磁盘 I/O 都通过 io_uring（使用 monoio 运行时）进行。每个实例都是一个单线程事件循环。这听起来像是一个限制，从单进程角度看确实如此，但当你的扩展单元是“更多进程”时，这正是最合适的形态，这也是为什么它们可以在同一台机器上和谐共存的原因。

### Scripting with eBPF, in userspace
### 在用户空间使用 eBPF 脚本

This is the part I find most fun. Any .c file you put under .zeroserve/scripts/ gets compiled to an eBPF object at pack time (with clang and llc) and runs on every request. The eBPF runs entirely in userspace: zeroserve loads the bytecode into a runtime (async-ebpf) inside its own ordinary, unprivileged process, so the kernel's BPF subsystem and CAP_BPF stay out of it. async-ebpf JIT-compiles the bytecode to native machine code (it vendors uBPF), so your "config" runs as native x86-64.

这是我觉得最有趣的部分。任何你放在 `.zeroserve/scripts/` 下的 `.c` 文件都会在打包时（使用 clang 和 llc）被编译为 eBPF 对象，并在每个请求中运行。eBPF 完全在用户空间运行：Zeroserve 将字节码加载到其自身普通、无特权的进程内的运行时（async-ebpf）中，因此内核的 BPF 子系统和 CAP_BPF 权限完全不参与其中。async-ebpf 将字节码 JIT 编译为原生机器码（它集成了 uBPF），因此你的“配置”实际上是以原生 x86-64 代码运行的。

A pointer cage does the job the kernel verifier normally would, keeping the program from reading or writing memory it shouldn't: every memory access in the JIT-compiled code is masked into the program's own arena, so a stray access stays confined to the script's own memory. The script runs directly on zeroserve's single event loop. To keep one slow script from stalling every other connection, the runtime is fully preemptible: a timer can interrupt JIT-compiled native code mid-execution and hand control back to the event loop.

指针隔离（Pointer cage）完成了内核验证器通常的工作，防止程序读写不该访问的内存：JIT 编译代码中的每一次内存访问都被掩码限制在程序自身的内存区域内，因此任何越界访问都会被限制在脚本自身的内存中。脚本直接在 Zeroserve 的单事件循环上运行。为了防止某个慢脚本阻塞其他连接，运行时是完全可抢占的：定时器可以在 JIT 编译的原生代码执行过程中将其打断，并将控制权交还给事件循环。

The programming model is a chain of scripts, run in sorted filename order, sharing a per-request metadata map. If a script calls `zs_respond` or `zs_reverse_proxy`, the chain short-circuits.

编程模型是一系列脚本链，按文件名排序执行，并共享一个请求级别的元数据映射。如果某个脚本调用了 `zs_respond` 或 `zs_reverse_proxy`，脚本链将短路终止。
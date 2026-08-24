---
title: "let-go: Almost Clojure written in Go"
originalUrl: "https://github.com/nooga/let-go"
date: "2026-05-10T22:20:17.689Z"
---

# let-go: Almost Clojure written in Go

let-go Greetings loafers! (λ-gophers haha, get it?) let-go is a Clojure dialect with a bytecode compiler and stack VM, written in Go. A single ~10MB binary, ~7ms cold start, no JVM. Roughly 95% Clojure-compatible on the jank-lang test suite.
let-go 问候各位懒人（λ-gophers，哈哈，懂了吗？）！let-go 是一个用 Go 语言编写的 Clojure 方言，包含字节码编译器和栈虚拟机。它是一个约 10MB 的单一二进制文件，冷启动时间约 7ms，且无需 JVM。在 jank-lang 测试套件上，它与 Clojure 的兼容性约为 95%。

I started this in 2021 as an elaborate joke: an excuse to write Clojure while pretending to write Go. It turned out useful. I use it for CLIs, scripts, and web servers, and I built a daemonless container runtime on top of it. You can compile let-go programs to standalone binaries or self-contained WASM web pages. It even runs on Plan 9.
我于 2021 年启动了这个项目，最初只是一个精心设计的玩笑：借口写 Go 的同时实际上在写 Clojure。结果发现它非常有用。我用它来编写 CLI 工具、脚本和 Web 服务器，甚至还在它之上构建了一个无守护进程的容器运行时。你可以将 let-go 程序编译为独立的二进制文件或自包含的 WASM 网页。它甚至可以在 Plan 9 上运行。

It is not a drop-in replacement for Clojure JVM. It does not load JARs and does not aim to. Most idiomatic Clojure code runs unmodified, but a real project with library dependencies will need adjustments. See Known limitations below.
它不是 Clojure JVM 的直接替代品。它不加载 JAR 包，也不打算这样做。大多数地道的 Clojure 代码无需修改即可运行，但带有库依赖的实际项目则需要进行调整。请参阅下文的“已知限制”。

### Goals (in no particular order)
### 目标（排名不分先后）

* Quality entertainment
* 实现高质量的娱乐性
* Implement most of Clojure: persistent data structures, lazy seqs, transducers, protocols, records, multimethods, core.async, BigInts
* 实现大部分 Clojure 特性：持久化数据结构、惰性序列、转换器 (transducers)、协议、记录 (records)、多重方法 (multimethods)、core.async、大整数 (BigInts)
* Comfy two-way Go interop (functions, structs, channels)
* 舒适的双向 Go 互操作（函数、结构体、通道）
* AOT compilation to bytecode and standalone binaries
* AOT（预先）编译为字节码和独立二进制文件
* Boot the runtime inside a single requestAnimationFrame (10ms left over at 60fps)
* 在单个 requestAnimationFrame 内启动运行时（60fps 下剩余 10ms）
* Compile programs to self-contained WASM web pages with terminal emulation
* 将程序编译为带有终端模拟功能的自包含 WASM 网页
* Make it legal to write Clojure at your Go dayjob
* 让在 Go 工作中使用 Clojure 变得“合法”
* nREPL in the browser (let-go VM in WASM, editor over WebSocket)
* 浏览器中的 nREPL（WASM 中的 let-go 虚拟机，通过 WebSocket 连接编辑器）
* Stretch: let-go bytecode → Go translation
* 进阶目标：let-go 字节码转 Go 代码

**Non-goals:** drop-in JVM Clojure replacement; linter/formatter for Clojure-at-large.
**非目标：** 作为 JVM Clojure 的直接替代品；作为通用 Clojure 的 linter/formatter。

---

### Benchmarks
### 基准测试

let-go vs Babashka, Joker, go-joker, gloat, and Clojure JVM. All benchmark files are valid Clojure that runs unmodified. Apple M1 Pro.
let-go 对比 Babashka、Joker、go-joker、gloat 和 Clojure JVM。所有基准测试文件均为无需修改即可运行的有效 Clojure 代码。测试环境：Apple M1 Pro。

| | let-go | babashka | joker | go-joker | gloat | clojure JVM |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Binary size** | 10MB | 68MB | 26MB | 32MB | 26MB | 304MB (JDK) |
| **Startup** | 6.7ms | 18ms | 12ms | 13ms | 16ms | 363ms |
| **Idle memory** | 13.5MB | 27MB | 22MB | 23MB | 23MB | 92MB |

let-go wins decisively on the small things: smallest binary, fastest startup (~50× under JVM, ~3× under Babashka), lowest memory. It also wins on short-lived data work like map/filter (7.9ms vs Babashka's 21.5ms) and persistent maps (20.8ms vs 23.7ms). On bigger numerical workloads other implementations pull ahead. go-joker's WASM JIT compiles inner numeric loops and beats us on fib (1.47s vs 2.08s), tak, reduce, and transducers. The JVM dominates on long compute runs once HotSpot warms up. We're about even with Babashka on most algorithmic benchmarks and 10×+ faster than upstream Joker (bytecode VM vs tree-walk).
let-go 在轻量级指标上完胜：二进制文件最小、启动最快（比 JVM 快约 50 倍，比 Babashka 快约 3 倍）、内存占用最低。在 map/filter（7.9ms 对比 Babashka 的 21.5ms）和持久化映射（20.8ms 对比 23.7ms）等短时数据处理任务上也表现优异。在更大规模的数值计算任务中，其他实现则更胜一筹。go-joker 的 WASM JIT 会编译内部数值循环，在 fib（1.47s 对比 2.08s）、tak、reduce 和转换器测试中超过了我们。JVM 在 HotSpot 预热后的长时计算任务中占据主导地位。我们在大多数算法基准测试中与 Babashka 持平，且比上游 Joker 快 10 倍以上（字节码虚拟机对比树遍历）。

Full per-benchmark numbers and methodology: [benchmark/results.md](https://github.com/nooga/let-go/blob/main/benchmark/results.md).
完整的基准测试数据和方法论请见：[benchmark/results.md](https://github.com/nooga/let-go/blob/main/benchmark/results.md)。

---

### Compatibility
### 兼容性

Tested against jank-lang/clojure-test-suite: 4696 / 4921 assertions pass (95.4%) across 217 files. Remaining gaps are mostly numeric edge cases (overflow detection on +/-/*/inc/dec, BigInt promotion at the Long boundary, BigDecimal) plus a handful of stub namespaces.
针对 jank-lang/clojure-test-suite 进行了测试：在 217 个文件中，4696 / 4921 个断言通过（95.4%）。剩余的差距主要是数值边界情况（+/-/*/inc/dec 的溢出检测、Long 边界处的 BigInt 提升、BigDecimal）以及少量存根命名空间。

### Standard namespaces
### 标准命名空间

* **clojure.core**: macros, destructuring, lazy seqs, transducers, protocols, records, multimethods, atoms, regex, metadata, BigInt
* **clojure.string**: full
* **clojure.set**: full
* **clojure.walk**: prewalk, postwalk, keywordize-keys, stringify-keys, walk
* **clojure.edn**: read, read-string
* **clojure.pprint**: pprint, cl-format
* **clojure.test**: deftest, is, testing, are, fixtures
* **clojure.core.async**: channels, go/go-loop, alts!, mult/pub, pipe/merge/split (real goroutines, not IOC)
* **io**: polymorphic readers/writers, slurp/spit, lazy line-seq, encoding, URLs, with-open
* **http**: Ring-style server + client, streaming responses
* **json**: read-json, write-json (float-preserving, record-aware)
* **transit**: transit+json codec with rolling cache
* **os**: sh, stat, ls, cwd, getenv/setenv, exit, os-name, arch, user-name, hostname, separators
* **System**: JVM-shaped: getProperty, getProperties, getenv, exit, currentTimeMillis, nanoTime. Exposes let-go.version, let-go.commit, user.home, user.dir, os.name, os.arch, etc.
* **syscall**: direct Linux syscalls (mount, unshare, mknod, prctl, capset, seccomp, AppArmor)
* **pods**: Babashka pods over JSON / EDN / transit

### Babashka pods
### Babashka Pods

let-go can load Babashka pods, which opens up the whole pod ecosystem: SQLite, AWS, Docker, file watching, etc.
let-go 可以加载 Babashka pods，从而开启了整个 pod 生态系统：SQLite、AWS、Docker、文件监控等。

```clojure
(pods/load-pod 'org.babashka/go-sqlite3 "0.3.13")
(pod.babashka.go-sqlite3/execute! "app.db" ["create table users (id integer primary key, name text)"])
(pod.babashka.go-sqlite3/query "app.db" ["select * from users"])
;; => [{:id 1 :name "Alice"}]
```

It shares `~/.babashka/pods/` with bb, so install pods with babashka and use them from lg. See the pod registry for what's available.
它与 bb 共享 `~/.babashka/pods/` 目录，因此你可以用 babashka 安装 pods 并在 lg 中使用它们。查看 pod 注册表了解可用资源。

---

### Known limitations
### 已知限制

* **Not implemented**: Refs / STM (atoms + channels cover practical concurrency), Agents (use go blocks and channels), Hierarchies (derive, underive, ancestors, descendants, parents): stubs only.
* **未实现**：Refs / STM（atoms + channels 已涵盖实际并发需求）、Agents（请使用 go blocks 和 channels）、层级结构（derive, underive 等）：仅提供存根。
* **with-precision**: BigDecimal works (M literals, bigdec, exact arithmetic) but with-precision is a no-op.
* **with-precision**：BigDecimal 可用（M 字面量、bigdec、精确算术），但 with-precision 是空操作。
* **Chunked sequences**: lazy seqs are unchunked.
* **分块序列**：惰性序列是非分块的。
* **Reader tagged literals**: (#inst, #uuid).
* **读取器标签字面量**：(#inst, #uuid)。
* **deftype**: (use defrecord).
* **deftype**：请使用 defrecord。
* **reify**: (protocols can only be extended to named types).
* **reify**：协议只能扩展到命名类型。
* **Spec**: (no clojure.spec).
* **Spec**：不支持 clojure.spec。
* **alter-var-root**.
* **Numeric overflow detection**: +/-/*/inc/dec wrap silently on int64 overflow; use +'/-'/*' for BigInt math.
* **数值溢出检测**：+/-/*/inc/dec 在 int64 溢出时会静默回绕；请使用 +'/-'/*' 进行 BigInt 数学运算。
* **subseq / rsubseq**: sorted collections work (sorted-map, sorted-set, rseq); range queries don't.
* **subseq / rsubseq**：有序集合可用（sorted-map, sorted-set, rseq）；但不支持范围查询。

### Behavioral differences
### 行为差异

* `concat*` (used internally by quasiquote) is eager; user-facing `concat` is lazy.
* `concat*`（quasiquote 内部使用）是及时的；面向用户的 `concat` 是惰性的。
* `<!` / `<!!` are identical, same for `>!` / `>!!` (Go channels always block).
* `<!` / `<!!` 是相同的，`>!` / `>!!` 也是如此（Go 通道总是阻塞的）。
* `go` blocks are real goroutines, not IOC state machines (cheaper, and they can call blocking ops directly).
* `go` 块是真正的 goroutine，而不是 IOC 状态机（更廉价，且可以直接调用阻塞操作）。
* No BigDecimal: numeric tower is int64 + float64 + BigInt.
* 无 BigDecimal：数值体系为 int64 + float64 + BigInt。
* Regex is Go flavor (re2), not Java regex.
* 正则表达式为 Go 风格 (re2)，而非 Java 正则。
* `letfn` uses atoms internally for forward references.
* `letfn` 内部使用 atoms 处理前向引用。

---

### Examples
### 示例

Things written in let-go:
用 let-go 编写的项目：
* **xsofy**: a roguelike that runs in the browser and the terminal from the same source.
* **xsofy**：一个可以在浏览器和终端中运行的 Roguelike 游戏，代码源相同。
* **lgcr**: a daemonless container runtime, built on the syscall namespace.
* **lgcr**：一个无守护进程的容器运行时，基于 syscall 命名空间构建。

In this repo: `examples/`: small programs, `test/`: .lg test files.
本仓库中：`examples/`：小程序，`test/`：.lg 测试文件。

### Try it online
### 在线尝试

Bare-bones browser REPL, running a WASM build of let-go.
极简浏览器 REPL，运行 let-go 的 WASM 构建版本。

### Install
### 安装

**Homebrew (macOS / Linux)**
```bash
brew tap nooga/let-go
brew install let-go
```

**Download**
[Prebuilt bin](https://github.com/nooga/let-go/releases)
[预编译二进制文件](https://github.com/nooga/let-go/releases)
---
title: "Your Loom App Quietly Became a Thread Pool Again: A Field Guide to Virtual Thread Pinning"
originalUrl: "https://dev.to/maschiojv/your-loom-app-quietly-became-a-thread-pool-again-a-field-guide-to-virtual-thread-pinning-2a3f"
date: "2026-07-10T22:36:30.311Z"
---

# Your Loom App Quietly Became a Thread Pool Again: A Field Guide to Virtual Thread Pinning
# 你的 Loom 应用悄悄变回了线程池：虚拟线程 Pinning 实战指南

The incident that taught me to respect pinning looked like nothing. A service freshly migrated to virtual threads, a load test that plateaued at about 420 requests per second no matter how much traffic we threw at it, CPU sitting at 9%, zero errors, zero warnings, nothing in the logs. The machine had 8 cores, and the one downstream HTTP call in the hot path took about 19 ms. Do the arithmetic: 8 × (1000 / 19) ≈ 421. The service that was supposed to scale to millions of virtual threads was serving exactly one request per CPU core. Loom had quietly handed us back a bounded thread pool, and the code looked perfectly innocent. That failure mode has a name — pinning — and this is the field guide I wish I'd had that night: what it is, the two (and only two) things that cause it, what JDK 24 changed, and how to catch it before your throughput graph does.

那次让我学会敬畏 Pinning（固定）问题的事故看起来平平无奇。一个刚迁移到虚拟线程的服务，无论我们施加多大的流量，负载测试始终停留在每秒约 420 个请求，CPU 使用率仅为 9%，没有错误，没有警告，日志里也空空如也。机器有 8 个核心，热路径（hot path）中唯一的下游 HTTP 调用耗时约 19 毫秒。算一下：8 × (1000 / 19) ≈ 421。这个本应扩展到数百万虚拟线程的服务，实际上每个 CPU 核心只处理了一个请求。Loom 悄无声息地把我们带回了有界线程池的时代，而代码看起来却完全没问题。这种故障模式有一个名字——Pinning（固定）——这就是我希望在那晚就能拥有的实战指南：它是什么，导致它的两个（且仅有两个）原因，JDK 24 做了哪些改变，以及如何在吞吐量图表崩溃前发现它。

### What pinning actually is
### 什么是 Pinning

A virtual thread doesn't own an OS thread. It runs on a small pool of platform threads called carrier threads — concretely, the workers of a dedicated ForkJoinPool living in a thread group named CarrierThreads, with default parallelism equal to Runtime.availableProcessors(). When a virtual thread blocks — on I/O, a lock, a queue — it normally unmounts: it saves its stack, steps off the carrier, and frees that carrier to run another virtual thread. That unmount is the entire trick that lets a handful of OS threads serve millions of virtual ones.

虚拟线程并不拥有操作系统线程。它运行在一个称为“载体线程”（carrier threads）的小型平台线程池上——具体来说，是名为 CarrierThreads 的线程组中专用的 ForkJoinPool 的工作线程，其默认并行度等于 Runtime.availableProcessors()。当虚拟线程阻塞时（在 I/O、锁或队列上），它通常会执行“卸载”（unmount）：保存堆栈，离开载体线程，并释放该载体去运行另一个虚拟线程。这种卸载机制正是让少量操作系统线程能够服务数百万虚拟线程的全部奥秘所在。

Pinning is when the unmount can't happen. The virtual thread blocks but stays mounted, and its carrier sits there doing nothing useful for the whole duration. One pinned carrier is a rounding error. But the default carrier pool is only as big as your core count, so if a hot path pins routinely, you pin every carrier at once — and then no virtual thread anywhere makes progress. That's not a slowdown; it's scheduler starvation, and from the outside it looks a lot like a deadlock. You can raise the ceiling with -Djdk.virtualThreadScheduler.parallelism=N, but that only delays the moment of exhaustion. It doesn't fix anything.

Pinning 指的是无法进行卸载的情况。虚拟线程阻塞了但仍保持挂载状态，其载体线程在整个阻塞期间只能原地待命，无法做任何有用的工作。一个载体被 Pin 住可能只是误差，但默认的载体池大小仅等于你的核心数，所以如果热路径频繁发生 Pinning，你很快就会把所有载体全部锁死——此时，没有任何虚拟线程能继续执行。这不仅仅是变慢，而是调度器饥饿（scheduler starvation），从外部看非常像死锁。你可以通过 -Djdk.virtualThreadScheduler.parallelism=N 来提高上限，但这只会推迟耗尽的时间，并不能解决任何问题。

### The two causes — and it really is just two
### 两个原因——确实只有两个

There are exactly two situations where the JVM cannot unmount a blocked virtual thread:
JVM 无法卸载阻塞的虚拟线程的情况恰好只有两种：

1. **Blocking inside synchronized (JDK 21 through 23).** Up to and including JDK 23, an object monitor is tied to the carrier thread that entered it. If a virtual thread blocks — or calls Object.wait() — while holding a monitor, the JVM can't move it off the carrier without breaking monitor ownership, so it pins. This is by far the most common cause in real code, because a blocking call buried inside a synchronized method is trivial to write and invisible at the call site. And the monitor doesn't have to be yours: synchronized inside a library, or inside the JDK itself, pins exactly the same way. ConcurrentHashMap.computeIfAbsent runs your mapping function under an internal bin lock — put a blocking call inside it and you've pinned a carrier without a single synchronized keyword in your own code.

1. **在 synchronized 内部阻塞（JDK 21 到 23）。** 在 JDK 23 及之前，对象监视器（monitor）绑定在进入它的载体线程上。如果虚拟线程在持有监视器时阻塞（或调用 Object.wait()），JVM 无法在不破坏监视器所有权的情况下将其移出载体，因此它会被 Pin 住。这是实际代码中最常见的原因，因为隐藏在 synchronized 方法内部的阻塞调用非常容易编写，且在调用点难以察觉。而且这个监视器不一定是你自己的：库内部或 JDK 自身的 synchronized 也会以同样的方式导致 Pinning。例如，ConcurrentHashMap.computeIfAbsent 会在内部 bin 锁下运行你的映射函数——如果在其中放入一个阻塞调用，即使你自己的代码中没有一个 synchronized 关键字，你也会锁死一个载体。

2. **Native frames.** When a virtual thread has a native method (JNI) or a foreign downcall (the Foreign Function & Memory API) on its stack and it blocks, the JVM can't capture and restore the native frame, so it pins. This one has no synchronized to blame — and it is not fixed by JDK 24. It also hides in a place nobody expects: class initialization runs through native frames, so a blocking call inside a static initializer pins even on the newest JDKs.

2. **原生帧（Native frames）。** 当虚拟线程的堆栈中存在原生方法（JNI）或外部调用（Foreign Function & Memory API）并发生阻塞时，JVM 无法捕获和恢复原生帧，因此它会被 Pin 住。这种情况与 synchronized 无关，且在 JDK 24 中也未得到解决。它还隐藏在一个意想不到的地方：类初始化过程会经过原生帧，因此在静态初始化块中的阻塞调用即使在最新的 JDK 上也会导致 Pinning。

Just as important is what's not on the list: ordinary blocking I/O through the JDK (Socket, InputStream, Files), BlockingQueue, ReentrantLock, CompletableFuture, Thread.sleep() — all of it was re-plumbed for Loom and unmounts cleanly. Pinning is a short, specific list, which is exactly why it's detectable.

同样重要的是，不在列表中的内容：通过 JDK 进行的普通阻塞 I/O（Socket、InputStream、Files）、BlockingQueue、ReentrantLock、CompletableFuture、Thread.sleep()——所有这些都已为 Loom 重新设计，可以干净地卸载。Pinning 的原因列表很短且明确，这正是它可被检测的原因。

### The canonical bug
### 典型 Bug

Nearly every real pin I've read in a dump is some flavor of a cache or rate limiter guarding a slow call with synchronized:
我在转储文件中看到的几乎每一个真实的 Pinning 问题，都是某种形式的缓存或限流器，它们用 synchronized 保护了一个缓慢的调用：

```java
public class PriceService {
    private final Map<String, BigDecimal> cache = new HashMap<>();
    // Looks harmless. On JDK 21-23 it pins the carrier for the whole HTTP call.
    public synchronized BigDecimal lookup(String symbol) {
        return cache.computeIfAbsent(symbol, s -> httpClient.quote(s)); // <-- blocks while holding the monitor
    }
}
```

Every cache miss blocks on the network while holding the monitor. On JDK 21–23 that virtual thread pins its carrier for the entire round trip. Run a few hundred concurrent requests and you've pinned every carrier; the rest of the workload queues behind a monitor that never unmounts. That's my 420-requests-per-second incident in five lines.

每次缓存未命中都会在持有监视器的同时阻塞在网络上。在 JDK 21–23 中，该虚拟线程会在整个往返过程中锁死其载体。运行几百个并发请求，你就锁死了所有载体；其余的工作负载只能排队等待一个永远不会卸载的监视器。这就是我那次每秒 420 个请求事故的五行代码真相。

### What JDK 24 changed (JEP 491)
### JDK 24 的改变 (JEP 491)

JDK 24 shipped JEP 491, "Synchronize Virtual Threads without Pinning". It reworked monitor ownership so the monitor is associated with the virtual thread itself rather than its carrier — which means a virtual thread can now unmount while blocked inside synchronized, while waiting to enter one, or while parked in Object.wait(). The most common cause of pinning simply goes away on JDK 24+, with no code change.

JDK 24 发布了 JEP 491，“在不进行 Pinning 的情况下同步虚拟线程”。它重构了监视器所有权，使监视器与虚拟线程本身关联，而不是与载体关联——这意味着虚拟线程现在可以在 synchronized 内部阻塞、等待进入监视器或在 Object.wait() 中挂起时进行卸载。最常见的 Pinning 原因在 JDK 24+ 中直接消失了，无需修改任何代码。

Two practical consequences:
两个实际影响：
* On JDK 24+, the only remaining pins come from native frames — JNI, FFM downcalls, and class initialization.
* 在 JDK 24+ 上，仅存的 Pinning 原因来自原生帧——JNI、FFM 调用和类初始化。
* The old detection flag -Djdk.tracePinnedThreads was removed in JDK 24. Don't ship runbooks that depend on it. If you're on JDK 21–23, though, synchronized pinning is very much alive, and upgrading is often the single cleanest fix you can make.
* 旧的检测标志 -Djdk.tracePinnedThreads 在 JDK 24 中被移除。不要发布依赖它的运维手册。不过，如果你还在使用 JDK 21–23，synchronized 导致的 Pinning 依然存在，而升级通常是你所能做的最彻底的修复。

### How to catch it
### 如何捕获它

**On JDK 21–23 — the legacy flag.** Run with: `java -Djdk.tracePinnedThreads=full -jar app.jar`. The JVM prints a stack trace every time a virtual thread pins, and the frame annotated `<== monitors:1` is the culprit. That one line is the whole diagnosis. Just remember this flag no longer exists on JDK 24.

**在 JDK 21–23 上——使用旧标志。** 运行：`java -Djdk.tracePinnedThreads=full -jar app.jar`。JVM 会在每次虚拟线程被 Pin 住时打印堆栈跟踪，标记为 `<== monitors:1` 的帧就是罪魁祸首。这一行就是完整的诊断结果。记住，这个标志在 JDK 24 中已不存在。

**Everywhere — JFR.** Since JDK 21 the JVM emits a `jdk.VirtualThreadPinned` Flight Recorder event when a virtual thread blocks while pinned. It's enabled by default — but with a 20 ms threshold, so short pins are invisible unless you lower it. In JDK 24 the event got better: it's emitted...
**在所有版本上——使用 JFR。** 从 JDK 21 开始，当虚拟线程在被 Pin 住时阻塞，JVM 会发出 `jdk.VirtualThreadPinned` Flight Recorder 事件。它默认开启，但阈值为 20 毫秒，因此除非你降低阈值，否则短暂的 Pinning 是不可见的。在 JDK 24 中，该事件得到了改进：它会发出……
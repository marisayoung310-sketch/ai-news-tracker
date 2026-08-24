---
title: "what the double-fork?"
originalUrl: "https://bower.sh/what-the-double-fork"
date: "2026-07-31T22:25:52.963Z"
---

# What the double-fork?

I built zmx as a multi-faceted learning exercise. I wanted to learn more about zig, posix, daemons, ptys, libghostty, and terminals. Creating a program that fits into my core dev toolchain was merely a side-effect. While researching about how to create a daemon, buried in the implementation of abduco, I discovered the double-fork.
我构建 zmx 是为了进行多方面的学习实践。我想深入了解 zig、posix、守护进程 (daemons)、pty、libghostty 和终端。创建一个能融入我核心开发工具链的程序仅仅是一个副产品。在研究如何创建守护进程时，我在 abduco 的实现代码中发现了“双重 fork”（double-fork）技术。

Hidden behind the double-fork technique is a cascade of terms and concepts that are fundamental to how linux manages processes. This post is me coming to the surface and intended to be a reminder when I read zmx and say "what the double-fork?"
在双重 fork 技术背后，隐藏着一系列对于 Linux 进程管理至关重要的术语和概念。这篇文章是我对这些知识的梳理，旨在当我阅读 zmx 代码并发出“这双重 fork 是什么鬼？”的疑问时，能作为一个备忘录。

### what is a daemon?
### 什么是守护进程？

A daemon belongs to a session that has no controlling terminal. For example, when you background a process using ctrl-z+bg or {cmd} &, the session still has a controlling terminal which means it can control those background processes. This is not ideal for a daemon.
守护进程属于一个没有控制终端的会话。例如，当你使用 `ctrl-z` + `bg` 或 `{cmd} &` 将进程放入后台时，该会话仍然拥有一个控制终端，这意味着它仍然可以控制这些后台进程。这对于守护进程来说并不理想。

There are other ways to background a process that does disconnect it from the terminal, with varying degrees of pros and cons:
还有其他将进程放入后台并使其与终端断开连接的方法，它们各有优缺点：
* nohup {cmd} &
* setsid {cmd} &
* {cmd} & disown

### how does fork work in a program?
### 程序中的 fork 是如何工作的？

When using fork(2) in a program, it will create a child process in addition to still running the parent process that called fork. This was hard for me to grok when building out zmx. It is as-if the program clones itself at that exact line and both copies continue independently from there. Typically when creating a daemon you would use the child process of the fork and then kill the parent process.
在程序中使用 `fork(2)` 时，它会在继续运行调用 fork 的父进程的同时，创建一个子进程。在构建 zmx 时，这一点很难理解。它就像程序在那一行代码处克隆了自己，此后两个副本独立运行。通常在创建守护进程时，你会使用 fork 出来的子进程，然后杀掉父进程。

* Identical memory at fork point (copy-on-write)
* Identical open file descriptors (shared offsets)
* Different return value from fork():
    * parent → child's PID (55)
    * child → 0
* Both run independently from here
* fork 点内存完全相同（写时复制）
* 打开的文件描述符完全相同（共享偏移量）
* fork() 的返回值不同：
    * 父进程 → 子进程的 PID (55)
    * 子进程 → 0
* 此后两者独立运行

### what is a session?
### 什么是会话？

In linux, a session is a container for process groups. Process groups are a container for processes that receives signals from the same terminal. At-most one process group in a session can be in the foreground. It receives signals and can write to the terminal. All other process groups in the session are background, and SIGTTOU/SIGTTIN will stop them if they write to or read from the terminal.
在 Linux 中，会话是进程组的容器。进程组是接收来自同一终端信号的进程容器。一个会话中最多只能有一个进程组处于前台。它接收信号并可以向终端写入数据。会话中的所有其他进程组都在后台，如果它们尝试向终端写入或从终端读取数据，SIGTTOU/SIGTTIN 信号将停止它们。

### what is a controlling terminal?
### 什么是控制终端？

Only a session leader can create a controlling terminal for the session. A session can have at-most one controlling terminal. The session leader that opens the terminal becomes the controlling process.
只有会话首领（session leader）才能为会话创建控制终端。一个会话最多只能有一个控制终端。打开终端的会话首领即成为控制进程。

### why double-fork?
### 为什么要双重 fork？

When launching a daemon, you normally set the child process of the fork to be the session leader via setsid() which creates a new session that removes the current controlling terminal. This is important because we don't want a controlling terminal for our daemon or else it could receive signals to shutdown when the controlling terminal closes.
启动守护进程时，通常会通过 `setsid()` 将 fork 出来的子进程设为会话首领，从而创建一个新的会话并移除当前的控制终端。这一点很重要，因为我们不希望守护进程拥有控制终端，否则当控制终端关闭时，它可能会收到关闭信号。

However, if the first fork's child process is also the daemon process, then it's technically possible for the daemon to open a terminal device (e.g. open("/dev/console", O_RDWR)) and then it would acquire a controlling terminal! A controlling terminal would expose the daemon to terminal-generated signals (e.g. SIGINT) or SIGHUP from terminal disconnect which could kill the daemon.
然而，如果第一次 fork 的子进程就是守护进程本身，那么从技术上讲，守护进程是有可能打开一个终端设备（例如 `open("/dev/console", O_RDWR)`）并获取控制终端的！控制终端会使守护进程暴露在终端生成的信号（如 SIGINT）或终端断开连接产生的 SIGHUP 信号下，这可能会导致守护进程被杀死。

The first fork produces a child guaranteed not to be a group leader, so setsid() will succeed. By forking a second time, the grandchild process (the daemon) is not the session leader. Per POSIX, only a process that is the session leader can acquire a controlling terminal.
第一次 fork 产生的子进程保证不是进程组首领，因此 `setsid()` 会成功。通过第二次 fork，孙进程（即守护进程）不再是会话首领。根据 POSIX 标准，只有作为会话首领的进程才能获取控制终端。

Apparently this is "a bit paranoid" and on Linux it is arguable since a session leader only acquires a controlling terminal under implementation-defined conditions. But the double-fork is the portable way to guarantee the daemon can never acquire one, regardless of how a given POSIX implementation behaves. So we baked it into zmx.
显然这“有点偏执”，在 Linux 上这也有争议，因为会话首领只有在特定实现定义的条件下才会获取控制终端。但双重 fork 是一种可移植的方法，无论 POSIX 实现如何表现，它都能保证守护进程永远无法获取控制终端。所以我们将它内置到了 zmx 中。

### beyond the double-fork
### 双重 fork 之外

The double-fork detaches the daemon from any controlling terminal, but that's only one piece of a robust daemon. A daemon also needs to clean up everything it inherited from the parent that launched it like file descriptors, working directory, and standard streams.
双重 fork 将守护进程与任何控制终端分离，但这只是健壮守护进程的一部分。守护进程还需要清理从启动它的父进程那里继承的所有内容，例如文件描述符、工作目录和标准流。

In zmx, after the second fork, the daemon does two more things:
在 zmx 中，第二次 fork 之后，守护进程还会做两件事：

1. First, it redirects stdin, stdout, and stderr to /dev/null via dup2(2). This is critical: if the parent was launched by a test harness like bats, those file descriptors might be pipes. As long as the daemon holds the write end open, the harness will hang waiting for EOF. Redirecting to /dev/null closes that loop.
   首先，它通过 `dup2(2)` 将 stdin、stdout 和 stderr 重定向到 `/dev/null`。这至关重要：如果父进程是由像 bats 这样的测试工具启动的，这些文件描述符可能是管道。只要守护进程保持写端打开，测试工具就会一直等待 EOF 而挂起。重定向到 `/dev/null` 可以关闭这个循环。

2. Second, it closes all inherited file descriptors from 3 up to 64 (skipping any that the caller explicitly wants to keep, like a server socket). This releases resources the daemon doesn't need and prevents the same hang on higher-numbered FDs.
   其次，它关闭从 3 到 64 的所有继承的文件描述符（跳过调用者明确希望保留的，如服务器套接字）。这释放了守护进程不需要的资源，并防止了更高编号 FD 导致的挂起。

* We do *not* chdir because opening a shell in the cwd is a feature of zmx
* We do *not* umask mainly because it has never been an issue
* 我们*不*执行 `chdir`，因为在当前工作目录打开 shell 是 zmx 的一个特性。
* 我们*不*执行 `umask`，主要是因为它从未引发过问题。

### preferred ways to daemon a process
### 守护进程的首选方式

Ideally you would be able to create a daemon...
理想情况下，你应该能够创建一个守护进程……
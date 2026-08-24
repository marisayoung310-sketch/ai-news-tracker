---
title: "Moving beyond fork() + exec()"
originalUrl: "https://lwn.net/SubscriberLink/1076018/16f01bbbb8e0d1f0/"
date: "2026-06-06T22:34:09.158Z"
---

# Moving beyond fork() + exec()
# 超越 fork() + exec()

Since the earliest days of Unix, two of the core process-oriented system calls have been fork(), which creates a child process as a copy of the parent, and exec(), which runs a new program in the place of the current one. In Linux kernels, those system calls are better known as clone() and execve(), but the core functionality remains the same. While there is elegance to this process-creation model, there are shortcomings as well. A recent proposal from Li Chen to add "spawn templates" to the kernel will not be accepted in its current form, but it may point the way toward a new process-creation primitive in the future.

自 Unix 诞生之初，两个核心的进程相关系统调用便是 fork()（创建一个作为父进程副本的子进程）和 exec()（在当前进程位置运行一个新程序）。在 Linux 内核中，这些系统调用更广为人知的名称是 clone() 和 execve()，但其核心功能保持不变。尽管这种进程创建模型具有优雅之处，但也存在缺陷。Li Chen 最近提出的一项向内核添加“生成模板（spawn templates）”的提案虽然不会以当前形式被采纳，但它可能为未来一种新的进程创建原语指明了方向。

fork() is a relatively expensive system call; it must copy the entire process state (including memory) for the child process. Many optimizations have been made over the years, but a fork is still a fundamentally costly operation. To make things worse, a fork() call is often immediately followed by an exec(), which will discard all of that memory that was so carefully copied for the child. Attempts (such as vfork()) have been made over the years to optimize for this case, but the pattern still is more expensive than it could be.

fork() 是一个相对昂贵的系统调用；它必须为子进程复制整个进程状态（包括内存）。多年来，人们进行了许多优化，但 fork 本质上仍然是一个代价高昂的操作。更糟糕的是，fork() 调用之后往往紧跟着 exec()，而后者会丢弃掉所有为子进程精心复制的内存。多年来，人们曾尝试（例如 vfork()）针对这种情况进行优化，但这种模式的开销仍然比预期的要高。

### Spawn templates
### 生成模板

Chen's patch set takes an interesting approach to optimize the fork() and exec() pattern. It is focused on applications that repeatedly launch processes running the same executable; imagine, for example, a program that must run Git repeatedly to obtain information about the contents of a repository. In such cases, the program could establish a template to accelerate those invocations, spreading the setup cost across multiple operations. This template would be created with the spawn_template_create() system call:

Chen 的补丁集采用了一种有趣的方法来优化 fork() 和 exec() 模式。它专注于那些重复启动运行相同可执行文件的进程的应用程序；例如，想象一个必须反复运行 Git 来获取仓库内容信息的程序。在这种情况下，程序可以建立一个模板来加速这些调用，将设置成本分摊到多次操作中。该模板将通过 spawn_template_create() 系统调用来创建：

```c
struct spawn_template_create_args {
    __aligned_u64 flags;
    __s32 execfd;
    __u32 exec_flags;
    __aligned_u64 filename;
    /* Some fields elided */
};
int spawn_template_create(struct spawn_template_create_args *args, size_t args_size);
```

This call will return a file descriptor representing a template for the executable file, which can be specified as either a file descriptor (execfd) or an absolute path (filename), but not both. To create the template, the kernel will open the indicated file and cache a bunch of information that will allow a process to run that file more quickly in the future.

该调用将返回一个代表可执行文件模板的文件描述符，该文件既可以通过文件描述符 (execfd) 指定，也可以通过绝对路径 (filename) 指定，但不能同时使用两者。为了创建模板，内核将打开指定的文件并缓存大量信息，从而使进程在未来能够更快地运行该文件。

The application in question may run a given executable many times, but each invocation is different in a number of ways. The details of a specific invocation must be placed into an instance of this structure:

相关的应用程序可能会多次运行给定的可执行文件，但每次调用的细节在某些方面会有所不同。特定调用的详细信息必须放入此结构的实例中：

```c
struct spawn_template_spawn_args {
    __aligned_u64 flags;
    __aligned_u64 pidfd;
    __aligned_u64 argv;
    __aligned_u64 envp;
    __aligned_u64 actions;
    __aligned_u64 actions_len;
    __aligned_u64 reserved[4];
};
```

The argv field is a pointer to the argument list to be passed to the program, while envp points to its environment. Changes to file descriptors and signal handling, instead, are passed through actions, which is a pointer to an array of:

argv 字段是指向传递给程序的参数列表的指针，而 envp 指向其环境变量。对文件描述符和信号处理的更改则通过 actions 传递，它是一个指向以下数组的指针：

```c
struct spawn_template_action {
    __u32 type;
    __u32 flags;
    __s32 fd;
    __s32 newfd;
    __aligned_u64 arg;
};
```

If, for example, file descriptor four should be closed in the child, the associated spawn_template_action structure would have type set to SPAWN_TEMPLATE_ACTION_CLOSE and fd set to four. Other actions exist for duplicating file descriptors, opening files, changing the working directory, and changing signal handling. Once the spawn_template_spawn_args structure has been filled in, the new process can be run with:

例如，如果需要在子进程中关闭文件描述符 4，则关联的 spawn_template_action 结构会将 type 设置为 SPAWN_TEMPLATE_ACTION_CLOSE，并将 fd 设置为 4。其他操作还包括复制文件描述符、打开文件、更改工作目录以及更改信号处理。一旦填充了 spawn_template_spawn_args 结构，就可以通过以下方式运行新进程：

```c
int spawn_template_spawn(int template_fd, struct spawn_template_spawn_args *args, int args_size);
```

Internally, this system call follows something close to the normal fork()/exec() path. Chen is careful to point out that all of the normal checks applied when executing a new file remain in place. But the cached information in the template makes the whole process faster than it was before. How much faster? Benchmark results provided in the cover letter show an improvement of about 2%, which may not seem like a lot, but it may make a difference for applications that fit the expected pattern.

在内部，此系统调用遵循类似于常规 fork()/exec() 的路径。Chen 特别指出，执行新文件时应用的所有常规检查仍然有效。但模板中缓存的信息使整个过程比以前更快。快多少？封面信中提供的基准测试结果显示性能提升了约 2%，这看起来可能不多，但对于符合预期模式的应用程序来说，这可能会产生影响。

### Toward posix_spawn()
### 迈向 posix_spawn()

The most detailed review of this work was posted by Mateusz Guzik, who said: "This problem is dear to my heart and I have been pondering it on and off for some time now. The entire fork + exec idiom is terrible and needs to be retired". He pointed out that the focus of the patch set was a bit strange in that it left the fork() part of the problem untouched. That is where most of the cost lies, he said, so optimization efforts should seek to remove it from the picture. Rather than copying the current process, "creating a pristine process is the way to go".

对这项工作最详细的审查是由 Mateusz Guzik 发表的，他说：“这个问题一直萦绕在我的心头，我已经断断续续思考了一段时间。整个 fork + exec 的惯用法非常糟糕，需要被淘汰”。他指出，该补丁集的重点有点奇怪，因为它没有触及 fork() 部分的问题。他说，大部分成本都在那里，因此优化工作应该设法将其从流程中移除。与其复制当前进程，“创建一个原始进程才是正道”。

Christian Brauner was favorable toward the goal, saying: "The idea of having a builder api for exec isn't all that crazy". His suggestion, though, was that a new API should be built on top of the existing pidfd abstraction. Without getting into any degree of detail, he said that the right approach would be to create an option to pidfd_open() to create an empty process. A series of calls to a new pidfd_config() system call would then configure this new process as desired, setting up its environment, image to execute, and more. pidfd_config() would thus be analogous to fsconfig().

Christian Brauner 对这一目标表示赞同，他说：“为 exec 提供一个构建器 API 的想法并不疯狂”。不过，他的建议是，新的 API 应该建立在现有的 pidfd 抽象之上。他没有深入细节，但表示正确的方法是为 pidfd_open() 创建一个选项来创建一个空进程。随后，通过一系列对新的 pidfd_config() 系统调用的调用，可以按需配置这个新进程，设置其环境、要执行的镜像等。因此，pidfd_config() 将类似于 fsconfig()。

An important objective for a new interface, Brauner said, would be the ability to support an implementation of posix_spawn() in user space. posix_spawn() is well suited as a replacement for the fork()/exec() pattern; developers would likely welcome a native implementation that isn't (unlike the current implementation) hiding fork() and exec() under the covers. Chen agreed that the API as broadly sketched out by Brauner seemed better, and said that...

Brauner 表示，新接口的一个重要目标是能够支持在用户空间实现 posix_spawn()。posix_spawn() 非常适合作为 fork()/exec() 模式的替代方案；开发者很可能会欢迎一种原生的实现，而不是（像当前的实现那样）在底层隐藏 fork() 和 exec()。Chen 同意 Brauner 大致勾勒出的 API 看起来更好，并表示……
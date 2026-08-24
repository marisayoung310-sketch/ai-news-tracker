---
title: "building a web server in aarch64 assembly to give my life (a lack of) meaning"
originalUrl: "https://imtomt.github.io/ymawky/"
date: "2026-05-08T22:40:06.152Z"
---

# Building a Web Server in Aarch64 Assembly to Give My Life (a Lack of) Meaning
# 用 Aarch64 汇编构建 Web 服务器，为我（匮乏的）人生赋予意义

ymawky is a small, static http web server written entirely in aarch64 assembly for macos. it uses raw darwin syscalls with no libc wrappers, serves static files, supports GET, HEAD, PUT, OPTIONS, DELETE, byte ranges, directory listing, custom error pages, and tries to be as hardened as possible.
ymawky 是一个小型静态 HTTP Web 服务器，完全使用 macOS 的 aarch64 汇编语言编写。它直接调用 Darwin 系统内核接口（syscalls），不依赖任何 libc 封装。它能够提供静态文件服务，支持 GET、HEAD、PUT、OPTIONS、DELETE、字节范围请求、目录列表、自定义错误页面，并尽可能地强化了安全性。

why? why not? the dream of the 80s is alive in ymawky. everybody has nginx. having apache makes you a square. so why not strip every single convenience layer that computer science has given us since 1957? i wanted to understand how a web server actually works, something i know little about coming from a low-level/systems background. the risks that come up, the problems that need to be solved, the things you don’t think about when you’re writing python or c. this (probably) won’t replace nginx, but it is doing something in the most difficult way possible.
为什么？为什么不呢？80 年代的梦想在 ymawky 中得以延续。每个人都在用 nginx，用 apache 又显得太古板。那么，为什么不剥离自 1957 年以来计算机科学赋予我们的每一层便利呢？我来自底层/系统背景，但对 Web 服务器的实际工作原理知之甚少，我想深入了解它。我想探索其中涉及的风险、需要解决的问题，以及那些在编写 Python 或 C 时根本不会去考虑的事情。这（大概）不会取代 nginx，但它是在以最困难的方式完成任务。

### Constraints
### 约束条件

i gave myself some constraints for this project:
我为这个项目设定了一些约束：

* aarch64 assembly only
* 仅限 aarch64 汇编
* macos/darwin, not linux. only because that’s the system i have right now. sorry linuxheads :(
* 仅限 macOS/Darwin，不支持 Linux。这仅仅是因为我目前使用的就是这个系统。抱歉了 Linux 用户们 :(
* raw syscalls only: no libc wrappers
* 仅限原始系统调用：不使用任何 libc 封装
* static files only
* 仅限静态文件
* no preexisting parsers
* 不使用现有的解析器
* absolutely no external libraries
* 绝对不使用外部库

### Assembly, My Beloved
### 汇编，我的挚爱

assembly language is the layer between machine code and other languages. c gets compiled into assembly, which then gets assembled into an executable binary. assembly is essentially human-readable mnemonics that directly correspond to raw executable bytes: mov, add, ldr, str, cmp, among others. svc #0x80 is the human-readable equivalent to the bytes D4 00 10 01 you’ll find in the executable binary.
汇编语言是机器码与其他编程语言之间的桥梁。C 语言被编译成汇编，然后再汇编成可执行的二进制文件。汇编本质上是人类可读的助记符，直接对应于原始的可执行字节：例如 mov、add、ldr、str、cmp 等。svc #0x80 就是你在可执行二进制文件中看到的字节 D4 00 10 01 的人类可读版本。

you get almost no abstractions. you move values around between cpu registers and memory, compare them, jump to different portions of your code, and call the kernel for syscalls. it makes simple things look complicated, but it also makes almost every step the cpu takes visible and under your control. it does exactly what you tell it to, without warnings, and without any help. if it’s behaving incorrectly, it’s because you wrote it incorrectly.
你几乎没有任何抽象层。你需要在 CPU 寄存器和内存之间移动数值、进行比较、跳转到代码的不同部分，并调用内核进行系统调用。这让简单的事情看起来很复杂，但也让 CPU 执行的每一步都变得可见且可控。它完全按照你的指令行事，没有警告，也没有任何辅助。如果它运行异常，那一定是因为你写错了。

writing a web server in assembly means there are no http libraries. no automatic cleanup. no string types: strings are just regions of memory that hold individual bytes sequentially. a struct as it exists in c doesn’t really exist as a language feature. you have to know the exact offset in bytes between each field, and the total size of the struct, or the cpu will happily read the wrong memory.
用汇编编写 Web 服务器意味着没有 HTTP 库，没有自动清理机制，也没有字符串类型：字符串只是内存中按顺序存储单个字节的区域。C 语言中的结构体（struct）在汇编中并不是一种语言特性。你必须确切地知道每个字段之间的字节偏移量以及结构体的总大小，否则 CPU 会毫不犹豫地读取错误的内存地址。

### Raw Syscalls
### 原始系统调用

ymawky doesn’t use any libc wrappers, it just uses raw calls to the kernel. take, for example, this snippet of code that opens a file:
ymawky 不使用任何 libc 封装，直接调用内核。以这段打开文件的代码片段为例：

```asm
mov x16, #5 ; SYS_open syscall number
adrp x0, filename@PAGE
add x0, x0, filename@PAGEOFF
mov x1, #0x0 ; O_RDONLY is just 0x0000
svc #0x80
b.cs open_failed
```

in darwin, the syscall number goes in the x16 register (in aarch64 linux, it goes in x8). syscall number 5 is open(), which takes a couple arguments: filename and mode. you put each argument in the registers by hand, then call the kernel with svc #0x80. if open() fails, the carry flag is set. we check that with b.cs open_failed, which means “if the carry flag is set, branch to open_failed”. then we have to write open_failed to do whatever cleanup and response handling is needed. this happens a lot. assembly doesn’t have “exceptions” or “objects”, it just sets a cpu flag that you have to check and deal with.
在 Darwin 中，系统调用号放在 x16 寄存器中（在 aarch64 Linux 中，它放在 x8 中）。系统调用号 5 是 open()，它需要两个参数：文件名和模式。你需要手动将每个参数放入寄存器，然后通过 svc #0x80 调用内核。如果 open() 失败，进位标志（carry flag）会被置位。我们使用 b.cs open_failed 来检查，意思是“如果进位标志被置位，则跳转到 open_failed”。然后我们必须编写 open_failed 来处理必要的清理和响应。这种情况经常发生。汇编没有“异常”或“对象”，它只会设置一个 CPU 标志，你必须手动检查并处理它。

### General Overview
### 总体概述

at its most basic, a web server receives a request, processes it, returns a status code, and maybe a file. a lot goes into that “receives a request” bit:
最基础的 Web 服务器流程是：接收请求、处理请求、返回状态码，可能还会返回一个文件。而“接收请求”这一步涉及很多工作：

* set up sockets with socket(AF_INET, SOCK_STREAM, 0)
* 使用 socket(AF_INET, SOCK_STREAM, 0) 设置套接字
* configure the socket with setsockopt(serverfd, SOL_SOCKET, SO_REUSEADDR, &buf, sizeof(int))
* 使用 setsockopt(serverfd, SOL_SOCKET, SO_REUSEADDR, &buf, sizeof(int)) 配置套接字
* bind a file descriptor to an address with bind(sockfd, &addr, 16)
* 使用 bind(sockfd, &addr, 16) 将文件描述符绑定到地址
* listen to the socket for new connections with listen(sockfd, 5)
* 使用 listen(sockfd, 5) 监听套接字以获取新连接
* accept a connection with accept(sockfd, NULL, NULL)
* 使用 accept(sockfd, NULL, NULL) 接受连接

ymawky is a fork-on-request server. that means for each new inbound connection, it calls the fork() syscall. this has some advantages:
ymawky 是一个“请求即派生”（fork-on-request）服务器。这意味着对于每个新的入站连接，它都会调用 fork() 系统调用。这有一些优点：

* memory is not shared between request handlers
* 请求处理程序之间内存不共享
* it’s easier to understand
* 更容易理解
* it’s easier to write
* 更容易编写

but it also has some pretty significant disadvantages:
但它也有一些非常明显的缺点：

* bloat
* 臃肿
* each process has its own memory space
* 每个进程都有自己的内存空间
* it fundamentally handles fewer concurrent connections than models like nginx’s event-driven async non-blocking model
* 从根本上讲，它处理并发连接的能力远不如 nginx 的事件驱动异步非阻塞模型
* with more concurrent connections, the kernel spends more time switching between processes than actually being in the process
* 当并发连接增加时，内核花费在进程切换上的时间比实际执行进程的时间还要多
* did i mention the bloat? and memory consumption?
* 我提到过臃肿吗？还有内存消耗？

binding to sockets and listening is the easy part. the real soul-crushing task is processing requests. a lot goes into this:
绑定套接字和监听只是简单部分。真正令人崩溃的任务是处理请求，这涉及很多工作：

* determining request type: GET, HEAD, OPTIONS, PUT, or DELETE
* 确定请求类型：GET、HEAD、OPTIONS、PUT 或 DELETE
* extracting the requested path
* 提取请求路径
* normalizing the path, like decoding %20 into a space
* 规范化路径，例如将 %20 解码为空格
* performing safety checks on the path
* 对路径执行安全检查
* parsing header fields the client sent over
* 解析客户端发送的头部字段
* getting information about the requested file
* 获取请求文件的信息
* figuring out whether it is a directory or a regular file
* 判断它是目录还是普通文件
* writing upload bodies to temporary files for PUT
* 将 PUT 请求的上传主体写入临时文件
* building response headers
* 构建响应头部
* writing the response, which is somehow not straightforward
* 写入响应（这在某种程度上并不简单）
* closing any open files
* 关闭所有打开的文件
* handling errors without crashing the server
* 在不导致服务器崩溃的情况下处理错误

### Parsing HTTP by Hand
### 手动解析 HTTP

i hate string parsing. especially in assembly. unfortunately, an http request is just a string asking a server to do something, and the server has to understand it. let’s walk through an example http request:
我讨厌字符串解析，尤其是在汇编中。不幸的是，HTTP 请求只是一串要求服务器执行某些操作的字符串，而服务器必须理解它。让我们来看一个 HTTP 请求示例：

```http
GET /index.html HTTP/1.0\r\n
Range: bytes=1-5\r\n\r\n
```

that first line tells us a lot. it’s a GET request, which means the client would like us to send over index.html. HTTP/1.0 tells the server what version of http the client is using. the \r\n sequence, carriage return plus linefeed, tells the server “that’s the end of this line, please process the next one”. the \r\n\r\n at the end tells the server that’s the end of the header. if we never receive \r\n\r\n, we have to bail with 400 Bad Request. then there is Range: bytes=3-5, which means “from this file...
第一行告诉了我们很多信息。这是一个 GET 请求，意味着客户端希望我们发送 index.html。HTTP/1.0 告诉服务器客户端正在使用的 HTTP 版本。\r\n 序列（回车加换行）告诉服务器“这一行结束了，请处理下一行”。末尾的 \r\n\r\n 告诉服务器头部结束了。如果我们从未收到 \r\n\r\n，我们必须返回 400 Bad Request。接着是 Range: bytes=3-5，意思是“从这个文件中……”
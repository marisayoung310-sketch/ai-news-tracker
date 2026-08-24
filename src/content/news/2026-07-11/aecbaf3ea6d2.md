---
title: "In Emacs, Everything Looks Like a Service"
originalUrl: "http://yummymelon.com/devnull/in-emacs-everything-looks-like-a-service.html"
date: "2026-07-10T22:28:38.740Z"
---

# In Emacs, Everything Looks Like a Service
# 在 Emacs 中，万物皆可视为服务

A common refrain is that Emacs is an operating system (OS). This isn’t true, but what invites comparison to an OS is its ability to orchestrate applications and utilities above the OS kernel level. The diagram below suggests a truer picture of how Emacs’ relates to an OS and its capabilities.
人们常说 Emacs 是一个操作系统（OS）。这其实并不准确，但它之所以会被拿来与操作系统作比较，是因为它具备在操作系统内核之上编排应用程序和工具的能力。下图展示了 Emacs 与操作系统及其功能之间关系的更真实图景。

Emacs’ built-in access to OS system services (file system, network, etc.) coupled with the ability to run other programs makes it routine to improvise client behavior within it. Because of this, Emacs users are able to accomplish many of their computing needs from the different client modes that have been made for it. This gives credence to the notion of “living only in Emacs.”
Emacs 内置了对操作系统服务（如文件系统、网络等）的访问能力，再加上运行其他程序的功能，使得在其中即兴构建客户端行为变得非常普遍。正因如此，Emacs 用户能够通过为其开发的各种客户端模式来满足大部分计算需求。这为“只生活在 Emacs 中”这一理念提供了支撑。

In this post, we’ll examine some of the ways Emacs lets you build a client. By the end of this post, you’ll hopefully be convinced that from within Emacs, everything looks like a service.
在本文中，我们将探讨 Emacs 允许你构建客户端的几种方式。读完本文后，希望你能相信：在 Emacs 内部，一切皆可视为服务。

### Client-Server Model
### 客户端-服务器模型

Let’s first provide some definitions. The Client–Server model is a common computer interaction pattern where a task is partitioned between the provider of a resource (the service) and the requester of that resource (the client). The client issues a request to the server, and the server in turn returns a response as shown in the diagram below.
首先让我们给出一些定义。客户端-服务器模型是一种常见的计算机交互模式，其中任务被分配给资源提供者（服务）和资源请求者（客户端）。客户端向服务器发出请求，服务器随后返回响应，如下图所示。

Depending on the implementation, the transaction (request + response) can occur over a network or be local to a system. Client-server models using a network has been most elaborated upon with REST-style software architectures. Shown in the sequence diagram below is a common implementation pattern for REST-style client server architecture.
根据实现方式的不同，事务（请求+响应）既可以通过网络进行，也可以在系统本地完成。使用网络的客户端-服务器模型在 REST 风格的软件架构中得到了最详尽的阐述。下图的时序图展示了 REST 风格客户端-服务器架构的一种常见实现模式。

### Emacs as a Client
### 作为客户端的 Emacs

From the diagram above, there are three concerns the client is typically responsible for:
根据上图，客户端通常负责以下三个方面：

*   **UI:** User interface (if any).
*   **UI：** 用户界面（如果有的话）。
*   **Client Edge:** Sub-system concerned with communication with the service. For networked clients, this is the network sub-system.
*   **客户端边缘（Client Edge）：** 负责与服务进行通信的子系统。对于网络客户端，这就是网络子系统。
*   **Local Database:** Representation of data that is exchanged or synchronized with the server. How this data is managed is up to the implementation requirements.
*   **本地数据库：** 与服务器交换或同步的数据的表示形式。如何管理这些数据取决于具体的实现需求。

For the above concerns, Emacs provides numerous libraries both built-in and third-party which can implement a client. Listed below are some built-in libraries with their respective links for further reading:
针对上述需求，Emacs 提供了大量内置及第三方库来实现客户端。以下列出了一些内置库及其对应的参考链接：

*   **UI:** Minibuffers, Buffers, Completion, Tabulated List Mode, Variable Pitch, Table (vtable), Transient
*   **UI：** Minibuffers, Buffers, Completion, Tabulated List Mode, Variable Pitch, Table (vtable), Transient
*   **Client Edge:** URL, Socket (TCP/UDP), SMTP
*   **客户端边缘：** URL, Socket (TCP/UDP), SMTP
*   **Serialization/Deserialization:** JSON, XML
*   **序列化/反序列化：** JSON, XML
*   **Local Database:** Collections, Association Lists, Property Lists, Hash Tables, SQLite
*   **本地数据库：** Collections, Association Lists, Property Lists, Hash Tables, SQLite

Requirements dictate the amount of complexity required to implement the Emacs client. If there is an existing command line utility that can do the “heavy lifting”, said utility can be reframed as a “service” that can be accessed via a shell call.
实现 Emacs 客户端所需的复杂度取决于具体需求。如果现有的命令行工具可以完成“繁重的工作”，那么该工具就可以被重构为可以通过 shell 调用访问的“服务”。

### Elisp
### Elisp

All the libraries mentioned above are accessed through the Emacs Lisp (Elisp) programming language. Elisp is a dynamic programming language which allows for a high degree of improvisation during run-time. This capability allows for complex orchestration of any behavior that is available to Emacs, from Elisp functions to shell commands.
上述所有库均通过 Emacs Lisp (Elisp) 编程语言进行访问。Elisp 是一种动态编程语言，允许在运行时进行高度的即兴创作。这种能力使得对 Emacs 可用的任何行为（从 Elisp 函数到 shell 命令）进行复杂编排成为可能。

### Example: wttr.in client
### 示例：wttr.in 客户端

wttr.in is a console-oriented weather forecast web-service. It supports JSON output so we can build an Emacs wttr command which will prompt for a location, make the HTTP request, process the JSON response and display the result in the mini-buffer.
wttr.in 是一个面向控制台的天气预报 Web 服务。它支持 JSON 输出，因此我们可以构建一个 Emacs `wttr` 命令，该命令会提示输入位置、发起 HTTP 请求、处理 JSON 响应并将结果显示在 mini-buffer 中。

*(Code blocks omitted for brevity, but the logic follows the standard Emacs Lisp pattern of fetching data, parsing JSON, and displaying results.)*
*(为简洁起见省略代码块，但其逻辑遵循了获取数据、解析 JSON 并显示结果的标准 Emacs Lisp 模式。)*
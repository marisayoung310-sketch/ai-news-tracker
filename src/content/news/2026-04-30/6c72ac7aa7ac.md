---
title: "FastCGI: 30 years old and still the better protocol for reverse proxies"
originalUrl: "https://www.agwa.name/blog/post/fastcgi_is_the_better_protocol_for_reverse_proxies"
date: "2026-04-30T00:52:24.049Z"
---

# FastCGI: 30 years old and still the better protocol for reverse proxies

HTTP reverse proxying is a minefield. Just the other week, a researcher disclosed a desync vulnerability in Discord's media proxy that allowed spying on private attachments. This is not unusual; these vulnerabilities just keep coming. The problem is the widespread use of HTTP as the protocol between reverse proxies and backends, even though it's unfit for the job. But we don't have to use HTTP here. There's a 30-year-old protocol for proxy-to-backend communication that avoids HTTP's pitfalls. It's called FastCGI, and its specification was released 30 years ago today.

HTTP 反向代理是一个雷区。就在前几周，一位研究人员披露了 Discord 媒体代理中的一个同步漏洞，该漏洞允许窃取私人附件。这种情况并不罕见；此类漏洞层出不穷。问题在于，尽管 HTTP 并不适合这项工作，但它仍被广泛用作反向代理与后端之间的通信协议。其实我们不必非要使用 HTTP。有一种 30 年历史的代理到后端通信协议，可以规避 HTTP 的缺陷。它就是 FastCGI，其规范于 30 年前的今天发布。

### FastCGI is a Wire Protocol, not a Process Model
### FastCGI 是一种传输协议，而非进程模型

It's true that some web servers can automatically spawn FastCGI processes to handle requests for files with the .fcgi extension, much like they would for .cgi files. But you don't have to use FastCGI this way - you can also use the FastCGI protocol just like HTTP, with requests sent over a TCP or UNIX socket to a long-running daemon that handles them as if they were HTTP requests. For example, in Go all you have to do is import the `net/http/fcgi` standard library package and replace `http.Serve` with `fcgi.Serve`.

诚然，一些 Web 服务器可以自动生成 FastCGI 进程来处理带有 `.fcgi` 扩展名的文件请求，就像处理 `.cgi` 文件一样。但你不必非要以这种方式使用 FastCGI——你也可以像使用 HTTP 一样使用 FastCGI 协议，通过 TCP 或 UNIX 套接字将请求发送给一个长期运行的守护进程，该进程会像处理 HTTP 请求一样处理它们。例如，在 Go 语言中，你只需导入 `net/http/fcgi` 标准库包，并将 `http.Serve` 替换为 `fcgi.Serve` 即可。

Everything else about your app stays the same - even your handler, which continues to use the standard `http.ResponseWriter` and `http.Request` types. Popular proxies like Apache, Caddy, nginx, and HAProxy support FastCGI backends, and the configuration is simple.

你应用程序的其他部分保持不变——甚至你的处理器（handler）也无需改动，它继续使用标准的 `http.ResponseWriter` 和 `http.Request` 类型。Apache、Caddy、nginx 和 HAProxy 等主流代理都支持 FastCGI 后端，且配置非常简单。

### Why HTTP Sucks for Reverse Proxies: Desync Attacks / Request Smuggling
### 为什么 HTTP 不适合反向代理：同步攻击 / 请求走私

HTTP/1.1 has the tragic property of looking simple on the surface (it's just text!) but actually being a nightmare to parse robustly. There are so many different ways to format the same HTTP message, and there are too many edge cases and ambiguities for implementations to handle consistently. As a result, no two HTTP/1.1 implementations are exactly the same, and the same message can be parsed differently by different parsers.

HTTP/1.1 有一个悲剧性的特点：表面上看起来很简单（它只是文本！），但实际上要稳健地解析它简直是一场噩梦。格式化同一个 HTTP 消息的方法太多了，且存在太多的边缘情况和歧义，导致实现者很难保持一致。结果就是，没有两个 HTTP/1.1 的实现是完全相同的，同一个消息在不同的解析器下可能会被解析出不同的结果。

The most serious problem is that there is no explicit framing of HTTP messages - the message itself describes where it ends, and there are multiple ways for a message to do that, all with their own edge cases. Implementations can disagree about where a message ends, and consequently, where the next message begins. This is the foundation of HTTP desync attacks, also known as request smuggling, wherein a reverse proxy and a backend disagree about the boundaries between HTTP messages, causing all sorts of nightmare security issues, such as the Discord vulnerability I linked above.

最严重的问题在于 HTTP 消息没有明确的帧结构——消息本身描述了它在哪里结束，而实现这种描述的方法有多种，每种都有其独特的边缘情况。不同的实现对于消息在哪里结束、从而在哪里开始下一个消息，可能会产生分歧。这就是 HTTP 同步攻击（也称为请求走私）的基础，即反向代理和后端对 HTTP 消息边界的理解不一致，从而导致各种噩梦般的安全问题，例如我上面提到的 Discord 漏洞。

### Why HTTP Sucks for Reverse Proxies: Untrusted Headers
### 为什么 HTTP 不适合反向代理：不可信的头部

If desync attacks were the only problem, you could just use HTTP/2 and call it a day. Unfortunately, there's another problem: HTTP has no robust way for the proxy to convey trusted information about the request, such as the real client IP address, authenticated username (if the proxy handles authentication), or client certificate details (if mTLS is used). The only option is to stick this information in HTTP headers, alongside the headers proxied from the client, without a clear structural distinction between trusted headers from the proxy and untrusted headers from a potential attacker.

如果同步攻击是唯一的问题，你大可直接使用 HTTP/2 了事。不幸的是，还有另一个问题：HTTP 没有一种稳健的方法让代理传递关于请求的可信信息，例如真实的客户端 IP 地址、已认证的用户名（如果代理处理认证）或客户端证书详情（如果使用了 mTLS）。唯一的选择是将这些信息放入 HTTP 头部，与从客户端代理过来的头部混在一起，且无法在结构上明确区分来自代理的可信头部和来自潜在攻击者的不可信头部。

FastCGI completely avoids this class of problem by providing domain separation between headers from the client and information added by the proxy. Though trusted data from the proxy and HTTP request headers are transmitted to the backend in the same key/value parameter list, HTTP header names are prefixed with the string "HTTP_", making it structurally impossible for clients to send a header that would be interpreted as trusted data.

FastCGI 通过在客户端头部和代理添加的信息之间提供域隔离，完全避免了这类问题。虽然来自代理的可信数据和 HTTP 请求头部在同一个键/值参数列表中传输到后端，但 HTTP 头部名称被加上了 "HTTP_" 前缀，这在结构上使得客户端不可能发送一个会被解释为可信数据的头部。
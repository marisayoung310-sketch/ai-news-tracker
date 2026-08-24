---
title: "Iroh 1.0"
originalUrl: "https://www.iroh.computer/blog/v1"
date: "2026-06-15T23:12:46.894Z"
---

# Iroh 1.0

Dial keys. Not IPs. It's a simple idea really, and it's the right abstraction for the future of the internet. IP addresses can break, without warning, and it's outside of your device's control. Keys, however, are created & controlled by you. They stay the same as your device moves, and are yours to throw away, or not.
使用密钥拨号，而非 IP 地址。这其实是一个简单的想法，也是互联网未来的正确抽象方式。IP 地址可能会毫无预警地失效，且不受你设备的控制。然而，密钥是由你创建并控制的。无论设备如何移动，密钥始终保持不变，且由你决定是否丢弃。

IP addresses can be private and inaccessible behind firewalls, but with iroh your device can be securely addressable no matter where it is. We think this is how the internet should work, which is why iroh exists, and today we're delighted to announce iroh version 1.0.
IP 地址可能处于防火墙之后，导致私有且无法访问，但有了 iroh，无论你的设备身处何地，都能被安全地寻址。我们认为这才是互联网应有的工作方式，这也是 iroh 存在的意义。今天，我们很高兴地宣布 iroh 1.0 版本正式发布。

This is our first stable release, but the project has grown significantly over the 65 versions that led to 1.0. iroh is already used all over the place. The public relays we run have seen more than 200 million endpoints created, in the last 30 days alone. Developers are using iroh to stream video, train large language models, talk to agents, secure chats, play games, send files, and many more things than we could jam into this list.
这是我们的首个稳定版本，但该项目在通往 1.0 的 65 个版本迭代中已经取得了显著成长。iroh 目前已被广泛使用。仅在过去 30 天内，我们运营的公共中继节点就见证了超过 2 亿个端点的创建。开发者们正在使用 iroh 进行视频流传输、训练大语言模型、与智能体通信、加密聊天、玩游戏、发送文件，以及更多无法在此一一列举的应用场景。

Iroh is a fundamental technology aimed at a fundamental shift in the internet, and it's running on millions of devices today. After more than 4 years of building in the open, we have a foundation we're both proud of.
Iroh 是一项旨在推动互联网根本性变革的基础技术，目前已在数百万台设备上运行。经过四年多的开源构建，我们拥有了一个令我们引以为傲的基石。

We shifted onto open standards, preferring IETF drafts whenever possible. We built our own implementation of QUIC multipath, so iroh can build & manage multiple routes within the same connection, and hot swap paths as conditions change. We implemented QUIC NAT traversal, so we can establish direct connections while keeping connection details encrypted. We added full local-first configurations so iroh can find & connect to local devices, without internet access. We built & continually check that iroh can compile to WASM & run in the browser. We worked with power users to add hooks, so you can inject logic to control how connections should work. We've even added support for custom transports, so you can plug in technologies like Bluetooth Low-Energy (BLE), LoRa (under construction), WiFi Aware, or even Tor to build connections, and all of this fits under the same dial-by-key abstraction.
我们转向了开放标准，尽可能优先采用 IETF 草案。我们构建了自己的 QUIC 多路径实现，使 iroh 能够在同一连接内建立和管理多条路由，并根据网络状况实时切换路径。我们实现了 QUIC NAT 穿透，从而在保持连接细节加密的同时建立直接连接。我们增加了完整的“本地优先”配置，使 iroh 无需互联网接入即可发现并连接本地设备。我们构建并持续验证 iroh 对 WASM 的编译支持，确保其能在浏览器中运行。我们与高级用户合作添加了钩子（hooks），以便你可以注入逻辑来控制连接的工作方式。我们甚至增加了对自定义传输协议的支持，你可以接入蓝牙低功耗（BLE）、LoRa（开发中）、WiFi Aware 甚至 Tor 等技术来建立连接，而这一切都统一在“密钥拨号”的抽象之下。

The power of that key can't be overstated. We use it to secure the connection. And because all data that comes from the connection is secured by that key, we can build up from that same key into identity, permissions, and attribution. We can also use that same key as an address we can dial, no matter where it is in the world. It turns the internet into a secure localhost.
密钥的力量怎么强调都不为过。我们用它来保护连接。由于来自连接的所有数据都由该密钥保护，我们可以基于同一个密钥构建身份验证、权限管理和归属确认。我们还可以将同一个密钥用作拨号地址，无论它在世界何处。它将互联网变成了一个安全的本地主机（localhost）。

Iroh connections are also far more efficient. It's normal to see 95% of data transferred in a connection pass directly between devices. Going direct means fewer hops through the cloud, which lowers your egress bill. It's also fewer hops through routers, which means the internet is more efficient overall.
Iroh 连接的效率也高得多。通常情况下，连接中 95% 的数据传输都是在设备间直接进行的。直接传输意味着通过云端的跳数更少，从而降低了你的出口流量费用。这也意味着通过路由器的跳数更少，使整个互联网的效率更高。

### Python, Node.js, Kotlin & Swift support
### Python、Node.js、Kotlin 和 Swift 支持

We previously paused FFI support because of maintenance overhead with API churn and promised to bring it back with a stable 1.0 API. Now we're following through on this promise: In addition to the Rust crate, we now officially support Python, Node.js, Swift, and Kotlin. This makes your application use case even easier, making it possible to embed iroh into your swift iOS application or your Kotlin Android app. Check out the documentation and generated API docs.
我们之前因 API 变动带来的维护开销而暂停了 FFI 支持，并承诺在 1.0 稳定 API 发布时将其带回。现在我们兑现了这一承诺：除了 Rust crate 外，我们现在正式支持 Python、Node.js、Swift 和 Kotlin。这使得你的应用开发更加轻松，你可以将 iroh 嵌入到你的 Swift iOS 应用或 Kotlin Android 应用中。请查看文档和生成的 API 文档。

### Wire Stability
### 线路稳定性

Iroh version 1.0 asserts stability for both the wire protocol and language APIs: an iroh v1 endpoint will be able to communicate with another iroh v1 endpoint, regardless of minor version or language. In the future we may version these two aspects independently, for example: we may release version 2 of a given language API, but keep compatibility over the wire. Any change that affects the wire stability of iroh will always coincide with a major release.
Iroh 1.0 版本确保了线路协议和语言 API 的稳定性：无论次要版本或语言如何，一个 iroh v1 端点都能够与另一个 iroh v1 端点进行通信。未来我们可能会独立对这两个方面进行版本控制，例如：我们可能会发布某个语言 API 的第 2 版，但保持线路协议的兼容性。任何影响 iroh 线路稳定性的更改都将始终伴随大版本发布。

### Major version support policy
### 大版本支持策略

Version 1.0 is the first major release of iroh, which we're announcing in conjunction with our support schedule for customers: Read our support schedule. In short: Major and minor versions after 1.0 are supported on a schedule. The 0.35 minor version won't receive further releases. Public relay support for 0.35x continues through Dec 31, 2026, more on that in the section below. We do not plan to support canary (0.9x) and release candidates (1.0.0-rcX) after today. It's important to note there are a significant number of bug fixes and improvements in 1.0, so if you encounter an issue on an earlier release we want you to try updating to the 1.0 to ensure it is still an issue there before opening a bug report.
1.0 版本是 iroh 的首个大版本发布，我们同时公布了客户支持计划：阅读我们的支持计划。简而言之：1.0 之后的大版本和次要版本将按计划提供支持。0.35 次要版本将不再有后续发布。0.35x 的公共中继支持将持续到 2026 年 12 月 31 日，详情见下文。我们计划在今天之后不再支持 canary (0.9x) 和候选发布版本 (1.0.0-rcX)。需要注意的是，1.0 版本包含大量错误修复和改进，因此如果你在早期版本中遇到问题，请在提交错误报告前尝试更新到 1.0 版本，以确认该问题是否依然存在。

### Public Relay Support
### 公共中继支持

We maintain a set of public relays, most commonly accessed via the "n0" preset for building an endpoint.
我们维护着一组公共中继节点，通常通过构建端点时的 "n0" 预设进行访问。

| Release | Final day of public relay operation |
| :--- | :--- |
| v1.0 | until End of Life |
| v0.35x | Dec 31, 2026 |
| v0.9x & v1.0.0-rcX | Sept 30, 2026 |

| 版本 | 公共中继运行最后日期 |
| :--- | :--- |
| v1.0 | 直至生命周期结束 |
| v0.35x | 2026 年 12 月 31 日 |
| v0.9x & v1.0.0-rcX | 2026 年 9 月 30 日 |

We will bump public relays to their latest version shortly after each release, usually within 24 hours. Wire-breaking relay changes will get new URLs so older clients keep working. As always, relay binaries themselves are open source, and we offer hosted relays through iroh services. Public relays are rate-limited for relayed traffic, which can change at any time.
我们会在每次发布后不久（通常在 24 小时内）将公共中继升级到最新版本。破坏线路协议的中继更改将获得新的 URL，以确保旧客户端继续工作。一如既往，中继二进制文件本身是开源的，我们也通过 iroh 服务提供托管中继。公共中继对中继流量有限速，且限速标准可能随时更改。

### The time to build is now
### 现在是构建的最佳时机

The internet should be built on dialing keys. On connections that just work. On connections that are secure, and default to being direct. With 1.0 you now have a mature networking stack that you can put into your app with confidence. Now is the time to come build on iroh, and we can't wait to see what you come up with.
互联网应该建立在密钥拨号之上。建立在那些“即插即用”的连接之上。建立在安全且默认直接传输的连接之上。有了 1.0 版本，你现在拥有了一个成熟的网络栈，可以放心地将其集成到你的应用中。现在是基于 iroh 进行构建的最佳时机，我们迫不及待地想看到你的作品。

Check out the iroh quickstart guide for application developers. Join the discussion on reddit | hackernews | bluesky | x.com
查看面向应用开发者的 iroh 快速入门指南。加入讨论：reddit | hackernews | bluesky | x.com

Iroh is a dial-any-device networking library that just works. Compose from an ecosystem of ready-made protocols to get the features you need, or go fully custom on a clean abstraction over dumb pipes. Iroh is open source, and already running in production on hundreds of thousands of devices. To get started, take a look at our docs, dive directly into the code, or chat with us in our [Discord].
Iroh 是一个能够连接任何设备的网络库，且运行稳定。你可以从现成的协议生态系统中组合所需功能，或者在简单的管道抽象之上进行完全自定义。Iroh 是开源的，目前已在数十万台设备上投入生产使用。若要开始使用，请查看我们的文档，直接深入代码，或在我们的 [Discord] 中与我们交流。
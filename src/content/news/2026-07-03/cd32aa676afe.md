---
title: "Newly discovered PamStealer isn't your typical macOS malware"
originalUrl: "https://arstechnica.com/security/2026/07/new-pamstealer-macos-malware-uses-clever-tradecraft-to-remain-stealthy/"
date: "2026-07-02T22:33:00.177Z"
---

# Newly discovered PamStealer isn't your typical macOS malware
# 新发现的 PamStealer 并非典型的 macOS 恶意软件

Researchers have found a never-before-seen piece of macOS malware that combines a series of clever tradecraft to infect Macs with stealthy, custom-developed credential-stealing code. The malware is delivered in two stages. The first is distributed in a disk image that masquerades as Maccy, a clipboard manager for Macs. It’s compiled as AppleScript that is notable for the way it delivers the second stage. The malware is named PamStealer because the Rust-written infostealer uses the Pluggable Authentication Modules interface built into macOS to validate the target’s login password before sending it to an attacker-controlled server.

研究人员发现了一种前所未见的 macOS 恶意软件，它结合了一系列巧妙的手段，通过隐蔽的、定制开发的凭据窃取代码感染 Mac。该恶意软件分两个阶段进行传播。第一阶段通过一个磁盘映像分发，伪装成 Mac 的剪贴板管理器 Maccy。它被编译为 AppleScript，其交付第二阶段的方式非常引人注目。该恶意软件被命名为 PamStealer，因为这个用 Rust 编写的信息窃取程序利用了 macOS 内置的“可插拔认证模块”（PAM）接口，在将目标用户的登录密码发送到攻击者控制的服务器之前，先对其进行验证。

### A quieter execution chain
### 更安静的执行链

The use of both disk image and AppleScript is common in malware for Macs. More unusual is the way PamStealer combines them to gain stealth. When the AppleScript is double-clicked, it’s opened in the macOS Script Editor, where the malicious functionality is buried deep within the file. “Rather than relying on shell commands such as curl or zsh, the AppleScript executes a self-contained JavaScript for Automation (JXA) downloader that retrieves and stages the payload using native Objective-C APIs,” researchers from Jamf, a security firm for macOS users, wrote. “Combined with a Rust-based second stage and a password capture workflow that validates credentials locally through PAM, the result is a quieter execution chain than we typically observe in commodity macOS stealers.”

在 Mac 恶意软件中使用磁盘映像和 AppleScript 是很常见的。不同寻常的是 PamStealer 将它们结合起来以实现隐蔽性的方式。当双击该 AppleScript 时，它会在 macOS 脚本编辑器中打开，恶意功能被深埋在文件内部。为 macOS 用户提供安全服务的 Jamf 公司研究人员写道：“该 AppleScript 没有依赖 curl 或 zsh 等 shell 命令，而是执行了一个独立的自动化 JavaScript (JXA) 下载器，利用原生 Objective-C API 来检索并部署有效载荷。结合基于 Rust 的第二阶段以及通过 PAM 在本地验证凭据的密码捕获工作流，其执行链比我们通常在普通 macOS 窃取程序中观察到的更为安静。”

When a user, expecting to install a trustworthy clipboard manager, encounters the disk image, they’re prompted to press Command-R immediately after double-clicking it. This command executes malicious code inside the AppleScript directly. It also allows the execution to bypass com.apple.quarantine, a macOS attribute that provides warnings and restrictions when executable files have been downloaded from the Internet. As Jamf explained: PamStealer combines a recently emerging delivery surface with a less familiar payload. While the clickable .scpt and Script Editor lure build on tradecraft that is already gaining adoption across the macOS threat landscape, the malware distinguishes itself through a self-contained JXA dropper, a Rust-based second stage, and a password capture workflow that validates credentials locally through PAM before harvesting them.

当用户本想安装一个可信的剪贴板管理器却遇到了该磁盘映像时，系统会提示他们在双击后立即按下 Command-R。此命令会直接执行 AppleScript 中的恶意代码。它还允许执行过程绕过 com.apple.quarantine（这是 macOS 的一个属性，用于在从互联网下载可执行文件时提供警告和限制）。正如 Jamf 所解释的那样：PamStealer 将一种新兴的交付界面与一种不太常见的有效载荷结合在一起。虽然可点击的 .scpt 文件和脚本编辑器诱饵是基于在 macOS 威胁领域中已逐渐普及的手段，但该恶意软件的独特之处在于其独立的 JXA 投放器、基于 Rust 的第二阶段，以及在窃取凭据前通过 PAM 在本地验证凭据的密码捕获工作流。

That second stage puts considerable effort into staying hidden, masquerading as Finder, encrypting its command-and-control traffic, and holding back prompts like the Full Disk Access request for as long as forty minutes so its activity does not line up with launch. Together, these behaviors illustrate how commodity macOS stealers continue to evolve, adopting quieter execution chains and native implementations that reduce traditional detection opportunities while remaining compatible with standard macOS features.

第二阶段在保持隐藏方面投入了大量精力：它伪装成 Finder，加密其命令与控制流量，并将“完全磁盘访问”请求等提示延迟长达 40 分钟，以确保其活动不会与启动时间重合。这些行为共同说明了普通 macOS 窃取程序是如何不断演进的——它们采用更安静的执行链和原生实现，在减少传统检测机会的同时，仍能与标准的 macOS 功能保持兼容。

The first stage puts its payload inside an app bundle that impersonates real components built into macOS. The component changes from sample to sample of the malware. Finder.app under com.apple.finder.core or com.apple.finder.monitor, and a Software Update.app under com.apple.security.daemon, are two examples. In either case, they run hidden. They also display macOS’s genuine Finder.icns as its icon.

第一阶段将其有效载荷放入一个伪装成 macOS 内置真实组件的应用程序包中。该组件在恶意软件的不同样本中会有所变化。例如 com.apple.finder.core 或 com.apple.finder.monitor 下的 Finder.app，以及 com.apple.security.daemon 下的 Software Update.app。无论哪种情况，它们都在后台隐藏运行，并显示 macOS 原生的 Finder.icns 作为图标。

The second stage is a lean Mach-O file written for Macs running on Apple CPUs. The attacker’s choice to write it in Rust is relatively uncommon for macOS infostealers. More common are languages such as Swift, Go, and Objective-C. This binary calls the read interface of a bundled SQLite app. This allows the infostealer to read database files directly.

第二阶段是一个为运行在 Apple 芯片上的 Mac 编写的精简 Mach-O 文件。攻击者选择用 Rust 编写它在 macOS 信息窃取程序中相对少见，更常见的语言是 Swift、Go 和 Objective-C。该二进制文件调用了一个捆绑的 SQLite 应用程序的读取接口，这使得信息窃取程序能够直接读取数据库文件。

PamStealer shows a native password prompt designed to resemble a system authorization request. Text that appears with the prompt says: “Maccy wants to make changes. Enter your password to allow this.” As noted earlier, once a target complies, the malware validates it locally through the PAM API. “This check is done entirely through PAM: there is no call out to dscl, security, osascript or any spawned process to verify the password, as many commodity macOS stealers do,” Jamf said. “The result is a quieter routine that keeps only a verified password, and one fewer process chain for defenders to detect on.”

PamStealer 会显示一个原生密码提示框，旨在模仿系统授权请求。提示框中显示的文字是：“Maccy 想要进行更改。请输入您的密码以允许此操作。”如前所述，一旦目标用户照做，恶意软件就会通过 PAM API 在本地进行验证。Jamf 表示：“此检查完全通过 PAM 完成：没有调用 dscl、security、osascript 或任何生成的进程来验证密码，而许多普通 macOS 窃取程序都会这样做。其结果是一个更安静的例程，它只保留已验证的密码，并且减少了一个防御者可以检测到的进程链。”

If the validation fails, PamStealer displays the prompts again until it receives the correct one. Once the target enters the correct password, PamStealer displays a message stating that the file is damaged and can’t be installed. This is designed to be a decoy to prevent the target from suspecting anything is amiss.

如果验证失败，PamStealer 会再次显示提示，直到收到正确的密码。一旦目标输入了正确的密码，PamStealer 就会显示一条消息，称文件已损坏且无法安装。这旨在作为一种诱饵，防止目标怀疑有任何异常。

The malware uses tactics to maximize the information it can steal. One tactic is to request the target grant full disk access to the fake Maccy app. It also contains code designed to access ethereum accounts. The various techniques—particularly the Script Editor lure, a self-contained JXA dropper, a Rust-based second stage, and local validation of credentials through PAM are all noteworthy. “Together, these behaviors illustrate how commodity macOS stealers continue to evolve, adopting quieter execution chains and native implementations that reduce traditional detection opportunities while remaining compatible with standard macOS features,” Jamf said.

该恶意软件使用多种策略来最大化其窃取的信息量。其中一种策略是请求目标授予虚假的 Maccy 应用程序“完全磁盘访问”权限。它还包含旨在访问以太坊账户的代码。这些各种技术——特别是脚本编辑器诱饵、独立的 JXA 投放器、基于 Rust 的第二阶段以及通过 PAM 进行的本地凭据验证——都值得注意。Jamf 总结道：“这些行为共同说明了普通 macOS 窃取程序是如何不断演进的，它们采用更安静的执行链和原生实现，在减少传统检测机会的同时，仍能与标准的 macOS 功能保持兼容。”
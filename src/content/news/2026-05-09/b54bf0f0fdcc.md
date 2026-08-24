---
title: "Stop MITM on the first SSH connection, on any VPS or cloud provider"
originalUrl: "https://www.joachimschipper.nl/Stop%20MITM%20on%20the%20first%20SSH%20connection,%20on%20any%20VPS%20or%20cloud%20provider.html"
date: "2026-05-08T22:38:42.494Z"
---

# Stop MITM on the first SSH connection, on any VPS or cloud provider
# 在任何 VPS 或云服务商上，阻止首次 SSH 连接时的中间人攻击 (MITM)

Published on 8 May 2026
发布于 2026 年 5 月 8 日

This little script stops attacks on the first SSH connection to a new VM, even on providers (like Hetzner Cloud) that don't offer a proprietary solution; we only need cloud-init, which is widely supported.
这个小程序可以阻止针对新虚拟机首次 SSH 连接的攻击，即使是在那些不提供专有解决方案的云服务商（如 Hetzner Cloud）上也能生效；我们只需要广泛支持的 cloud-init 即可。

Summary (for experts; read on for a longer explanation): inject a temporary SSH host (private) key via cloud-init, and trust that temporary SSH host key just long enough to generate and retrieve the "real" (long-term) SSH host keys. The script is a simple but hardened implementation of this technique; the comments in the script discuss implementation choices.
摘要（专家请阅；详细解释请继续阅读）：通过 cloud-init 注入一个临时的 SSH 主机（私钥），并仅在生成和获取“真实”（长期）SSH 主机密钥的短暂时间内信任该临时密钥。该脚本是此技术的一种简单但经过加固的实现；脚本中的注释讨论了实现时的选择。

The technique appears to be new: I haven't found a proper write-up of this, nor of any other provider-independent solution (but I'd welcome a correction). This technique actually protects the first connection, whereas just answering "yes" when ssh asks "The authenticity of host [...] can't be established" (i.e. Trust On First Use) leaves you open to an attacker rerouting your traffic to a proxy, or to an attacker generously deciding to provide your VM (... for now).
这项技术似乎是全新的：我没有找到相关的正式文档，也没有找到其他与服务商无关的解决方案（如果有人指正，我将不胜感激）。该技术真正保护了首次连接，而当 SSH 询问“无法确认主机真实性”时直接回答“yes”（即“首次使用信任”原则），会让你面临风险——攻击者可以将你的流量重定向到代理，或者“慷慨地”暂时为你提供一台虚拟机。

This technique also makes leaks of the cloud-init userdata harmless. Injecting a long-term SSH host (private) key via cloud-init does allow you to authenticate the first connection (by adding the public part of the injected key to ~/.ssh/known_hosts), but leaves valuable (private) key material in the cloud-init userdata, where an attacker can often obtain it from the metadata service, which any process on the VM can typically read.
这项技术还使得 cloud-init 用户数据泄露变得无害。通过 cloud-init 注入长期 SSH 主机（私钥）确实可以让你验证首次连接（通过将注入密钥的公钥部分添加到 `~/.ssh/known_hosts`），但这会将宝贵的（私钥）材料留在 cloud-init 用户数据中，攻击者通常可以从元数据服务中获取这些数据，而虚拟机上的任何进程通常都能读取这些数据。

Security analysis / threat model: Throughout, we trust the (Open)SSH protocol and implementation, and we do not rely on you, the administrator, detecting the attack.
安全分析/威胁模型：在整个过程中，我们信任 (Open)SSH 协议及其实现，并且不依赖于管理员（你）去发现攻击。

We are secure against a network attacker: We protect the integrity of the administrator's workstation, and the VM against an attacker who has full control over the network ("man-in-the-middle"), and who learns the cloud-init user-data at any point after the script terminates, because the attacker never learns any key material at a time when it is still valuable.
我们能够抵御网络攻击者：我们保护管理员工作站和虚拟机的完整性，即使攻击者完全控制了网络（“中间人”），并且在脚本结束后获取了 cloud-init 用户数据，他们也无法在密钥仍具价值时获取任何密钥材料。

To prevent accidental use of the temporary SSH host key, the script keeps it in a temporary directory; the temporary SSH host key is never in ~/.ssh/known_hosts.
为了防止意外使用临时 SSH 主机密钥，脚本将其保存在临时目录中；临时 SSH 主机密钥永远不会出现在 `~/.ssh/known_hosts` 中。

Hacking the administrator workstation still doesn't get an attacker the (long-term) SSH host (private) key: We protect (only) the VM, including its (long-term) SSH host (private) key against an attacker who has full control over the network and who has full control over the administrator workstation, but who does not actually connect to the VM, because the (long-term) SSH host (private) key was never on the administrator workstation.
即使黑入管理员工作站，攻击者也无法获得（长期）SSH 主机（私钥）：我们保护虚拟机（及其长期私钥），即使攻击者完全控制了网络和管理员工作站，但只要他们没有实际连接到虚拟机，就无法获取密钥，因为（长期）私钥从未出现在管理员工作站上。

Hacking the VM and/or provider still doesn't get an attacker the administrator's workstation: We protect (only) the integrity of the administrator's workstation against an attacker who has full control over the network, and who has full control over the VM and/or provider because we assume (Open)SSH is secure.
即使黑入虚拟机或服务商，攻击者也无法获得管理员工作站的控制权：我们保护管理员工作站的完整性，即使攻击者完全控制了网络、虚拟机或服务商，因为我们假设 (Open)SSH 本身是安全的。
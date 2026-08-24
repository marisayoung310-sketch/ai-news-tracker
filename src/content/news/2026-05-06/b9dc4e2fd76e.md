---
title: "Widely used Daemon Tools disk app backdoored in monthlong supply-chain attack"
originalUrl: "https://arstechnica.com/security/2026/05/widely-used-daemon-tools-disk-app-backdoored-in-monthlong-supply-chain-attack/"
date: "2026-05-05T22:19:21.387Z"
---

# Widely used Daemon Tools disk app backdoored in monthlong supply-chain attack
# 广泛使用的磁盘工具 Daemon Tools 遭供应链攻击，被植入后门长达一个月

Daemon Tools, a widely used app for mounting disk images, has been backdoored in a monthlong compromise that has pushed malicious updates from the servers of its developer, researchers said Tuesday. Kaspersky, the security firm reporting the supply-chain attack, said it began on April 8 and remained active as of the time its post went live. Installers that are signed by the developer’s official digital certificate and downloaded from its website infect Daemon Tools executables, causing the malware to run at boot time. Kaspersky didn’t explicitly say so, but based on technical details, the infected versions appear to be only those that run on Windows. Versions 12.5.0.2421 through 12.5.0.2434 are affected. Neither Kaspersky nor developer AVB could be contacted immediately for additional details.

研究人员周二表示，广泛用于挂载磁盘镜像的应用程序 Daemon Tools 在长达一个月的安全入侵中被植入后门，其开发商的服务器被用于推送恶意更新。报告此次供应链攻击的安全公司卡巴斯基（Kaspersky）称，攻击始于 4 月 8 日，且在报告发布时仍处于活跃状态。这些由开发商官方数字证书签名并从其官网下载的安装程序会感染 Daemon Tools 的可执行文件，导致恶意软件在系统启动时运行。虽然卡巴斯基未明确说明，但根据技术细节判断，受感染的版本似乎仅限于 Windows 版本，受影响版本为 12.5.0.2421 至 12.5.0.2434。目前无法立即联系到卡巴斯基或开发商 AVB 获取更多细节。

### Hard to defend against
### 难以防御

Infected versions contain an initial payload that collects MAC addresses, hostnames, DNS domain names, running processes, installed software, and system locales. The malware sends them to an attacker-controlled server. Thousands of machines in more than 100 countries were targeted. Out of the many machines infected, about 12 of them, belonging to retail, scientific, government, and manufacturing organizations, have received a follow-on payload—an indication that the supply-chain attack targets select groups.

受感染版本包含一个初始载荷，用于收集 MAC 地址、主机名、DNS 域名、正在运行的进程、已安装软件及系统区域设置。恶意软件会将这些信息发送至攻击者控制的服务器。全球 100 多个国家的数千台机器成为目标。在众多受感染机器中，约有 12 台属于零售、科研、政府和制造机构的机器接收了后续载荷，这表明该供应链攻击针对的是特定群体。

The incident is only the latest supply-chain attack. Other such attacks include the poisoning of the CCleaner Windows utility in 2017, the Solar Winds app management software for enterprises in 2020, and 3CX VoIP client in 2023. Such attacks are hard to defend against because users are infected when they do nothing more than install digitally signed updates available through official channels. In all three cases it took weeks or months before the compromised update distribution channels were discovered.

此次事件只是近期发生的又一起供应链攻击。其他此类攻击还包括 2017 年 CCleaner Windows 工具被投毒、2020 年 SolarWinds 企业应用管理软件事件，以及 2023 年的 3CX VoIP 客户端事件。此类攻击极难防御，因为用户仅仅是通过官方渠道安装了带有数字签名的更新就会被感染。在上述三起案例中，受损的更新分发渠道均在数周或数月后才被发现。

“Based on our long-term experience of analyzing supply chain attacks, we can conclude that attackers orchestrated the DAEMON Tools compromise in a highly sophisticated manner,” Kaspersky researchers wrote. “For example, the time it took to detect this attack, which turned out to be about one month, is comparable to the 3CX supply chain attack which we researched together with the cybersecurity community in 2023. Given the high complexity of the attack, it is paramount for organizations to carefully examine machines that had DAEMON Tools installed, for abnormal cybersecurity-related activities that occurred on or after April 8.”

“基于我们长期分析供应链攻击的经验，我们可以断定攻击者以极其复杂的方式策划了此次 DAEMON Tools 入侵，”卡巴斯基研究人员写道。“例如，发现此次攻击所花费的时间约为一个月，这与我们 2023 年与网络安全社区共同研究的 3CX 供应链攻击相当。鉴于此次攻击的高度复杂性，各机构务必仔细检查安装了 DAEMON Tools 的机器，排查 4 月 8 日及之后发生的异常网络安全活动。”

One of the follow-on payloads pushed to about a dozen organizations was what Kaspersky described as a “minimalistic backdoor.” It has the ability to execute commands, download files, and run shellcode payloads in memory—making the infection harder to detect. Kaspersky said that it observed a more complex backdoor dubbed QUIC RAT, installed on a single machine belonging to an educational institution located in Russia. Initial analysis found that it can inject payloads into the notepad.exe and conhost.exe processes and supports a variety of C2 communication protocols, including HTTP, UDP, TCP, WSS, QUIC, DNS, and HTTP/3.

推送到约十几家机构的后续载荷之一被卡巴斯基描述为“极简后门”。它具备执行命令、下载文件以及在内存中运行 Shellcode 载荷的能力，这使得感染更难被检测。卡巴斯基表示，他们观察到一种名为 QUIC RAT 的更复杂后门，被安装在俄罗斯一家教育机构的一台机器上。初步分析发现，它可以将载荷注入 notepad.exe 和 conhost.exe 进程，并支持多种 C2 通信协议，包括 HTTP、UDP、TCP、WSS、QUIC、DNS 和 HTTP/3。

The 100 infected organizations were primarily located in Russia, Brazil, Turkey, Spain, Germany, France, Italy, and China. Kaspersky’s visibility into the attack is limited because it’s based solely on telemetry provided by its own products. Kaspersky researchers wrote: The analysis shows that 10% of the affected systems belong to businesses and organizations. Attackers attempted to infect most of the affected machines only with the information collector payload. However, the other backdoor payload, which is more complex, has been observed only on a dozen machines of government, scientific, manufacturing and retail organizations located in Russia, Belarus and Thailand. This manner of deploying the backdoor to a small subset of infected machines clearly indicates that the attacker had intentions to conduct the infection in a targeted manner. However, their intent – whether it is cyberespionage or ‘big game hunting’ – is currently unclear.

受感染的 100 家机构主要位于俄罗斯、巴西、土耳其、西班牙、德国、法国、意大利和中国。卡巴斯基对此次攻击的可见性有限，因为其数据仅基于自身产品提供的遥测信息。卡巴斯基研究人员写道：分析显示，10% 的受影响系统属于企业和机构。攻击者试图用信息收集载荷感染大多数受影响机器。然而，另一种更复杂的后门载荷仅在位于俄罗斯、白俄罗斯和泰国的政府、科研、制造和零售机构的十几台机器上被发现。这种仅向极少数受感染机器部署后门的方式清楚地表明，攻击者意图进行有针对性的感染。不过，他们的意图——无论是网络间谍活动还是“大猎物狩猎”（Big Game Hunting，指针对高价值目标的勒索或攻击）——目前尚不清楚。

More recent supply-chain attacks have hit Trivy, Checkmarx, and Bitwarden and more than 150 packages available through open source repositories. Last year, there were at least six notable such attacks. Anyone who uses Daemon Tools should take time to scan the entirety of their machines using reputable antivirus software. Windows users should additionally check for indicators of compromise listed in the Kaspersky post. For more technically advanced users, Kaspersky recommends monitoring “suspicious code injections into legitimate system processes, especially when the source is executables launched from publicly accessible directories such as Temp, AppData, or Public.”

近期，Trivy、Checkmarx 和 Bitwarden 以及开源存储库中的 150 多个软件包也遭受了供应链攻击。去年，至少发生了六起此类重大攻击。任何使用 Daemon Tools 的用户都应花时间使用信誉良好的杀毒软件对机器进行全面扫描。Windows 用户还应检查卡巴斯基文章中列出的入侵指标（IOC）。对于技术水平较高的用户，卡巴斯基建议监控“对合法系统进程的可疑代码注入，特别是当来源是从 Temp、AppData 或 Public 等公共访问目录启动的可执行文件时。”
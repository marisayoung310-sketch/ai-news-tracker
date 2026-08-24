---
title: "Ollama Out-of-Bounds Read, Docker UFW Bypass, & EagleSpy RAT Analysis"
originalUrl: "https://dev.to/soytuber/ollama-out-of-bounds-read-docker-ufw-bypass-eaglespy-rat-analysis-5c9l"
date: "2026-05-10T22:24:30.073Z"
---

# Ollama Out-of-Bounds Read, Docker UFW Bypass, & EagleSpy RAT Analysis

**Today's Highlights**
This week, a critical out-of-bounds read vulnerability in Ollama could lead to remote memory leaks, highlighting AI security risks. We also revisit a common Docker networking pitfall that bypasses UFW, exposing databases, and dive into a technical analysis of the rebranded EagleSpy V6.0 RAT distributed via Odysee and Telegram.

**今日要点**
本周，Ollama 中一个严重的越界读取漏洞可能导致远程内存泄漏，凸显了人工智能的安全风险。我们还将重温一个常见的 Docker 网络陷阱——即绕过 UFW 防火墙导致数据库暴露的问题，并深入分析通过 Odysee 和 Telegram 分发的重命名版 EagleSpy V6.0 远程访问木马（RAT）。

---

### Ollama Out-of-Bounds Read Vulnerability Allows Remote Process Memory Leak
**Source:** [r/cybersecurity](https://reddit.com/r/cybersecurity/comments/1t96jg8/ollama_outofbounds_read_vulnerability_allows/)

A newly identified out-of-bounds (OOB) read vulnerability within Ollama, a popular framework for running large language models locally, poses a significant security risk. This flaw could enable a remote attacker to leak sensitive process memory, potentially exposing confidential data or internal system details. The vulnerability stems from improper handling of memory boundaries, allowing unauthorized access to adjacent memory regions during specific operations.

**Ollama 越界读取漏洞允许远程进程内存泄漏**
**来源：** [r/cybersecurity](https://reddit.com/r/cybersecurity/comments/1t96jg8/ollama_outofbounds_read_vulnerability_allows/)

Ollama 是一个用于在本地运行大语言模型的流行框架，其内部新发现的一个越界（OOB）读取漏洞构成了重大安全风险。该缺陷可能使远程攻击者泄露敏感的进程内存，从而可能暴露机密数据或内部系统细节。该漏洞源于对内存边界处理不当，导致在特定操作期间可以未经授权地访问相邻的内存区域。

Given Ollama's role in local AI development and deployment, such a memory leak could compromise intellectual property, user data, or even system-level credentials if an attacker can exploit it to read privileged memory. This incident underscores the emerging security challenges within AI/ML ecosystems, particularly with locally hosted models. While the immediate impact is a memory leak, OOB vulnerabilities can sometimes be chained with other exploits to achieve more severe outcomes, such as arbitrary code execution. Users are strongly advised to update their Ollama installations to the latest patched version as soon as possible to mitigate this risk. Implementing robust input validation and reviewing memory safety practices in AI frameworks are crucial steps to prevent similar vulnerabilities in the future.

鉴于 Ollama 在本地 AI 开发和部署中的作用，如果攻击者能够利用该漏洞读取特权内存，这种内存泄漏可能会危及知识产权、用户数据甚至系统级凭据。此事件凸显了 AI/ML 生态系统中新兴的安全挑战，特别是在本地托管模型方面。虽然直接影响是内存泄漏，但 OOB 漏洞有时可以与其他漏洞结合使用，以实现更严重的后果，例如任意代码执行。强烈建议用户尽快将 Ollama 安装更新到最新的补丁版本，以降低此风险。实施稳健的输入验证并审查 AI 框架中的内存安全实践，是防止未来出现类似漏洞的关键步骤。

**Comment:** For anyone using Ollama to experiment with LLMs locally, this is a critical patch. An OOB read leading to remote memory leak is a serious vector for data exfiltration, directly compromising the local AI environment.

**评论：** 对于任何在本地使用 Ollama 试验大语言模型的人来说，这是一个关键补丁。导致远程内存泄漏的 OOB 读取是数据外泄的严重途径，会直接危及本地 AI 环境。

---

### Docker bypasses UFW and exposed my database. Again.
**Source:** [r/selfhosted](https://reddit.com/r/selfhosted/comments/1t92807/docker_bypasses_ufw_and_exposed_my_database_again/)

This post highlights a recurrent and often overlooked security pitfall for Docker users: Docker's default networking behavior can bypass host-level firewalls like UFW (Uncomplicated Firewall), inadvertently exposing containerized services to the internet. When Docker publishes a port, it directly manipulates iptables rules, often inserting them before UFW's rules. This means that even if a user configures UFW to block a specific port, Docker's iptables rule can still allow inbound connections to that port on the host, forwarding them to the container.

**Docker 绕过 UFW 导致我的数据库再次暴露**
**来源：** [r/selfhosted](https://reddit.com/r/selfhosted/comments/1t92807/docker_bypasses_ufw_and_exposed_my_database_again/)

这篇文章强调了 Docker 用户一个反复出现且常被忽视的安全陷阱：Docker 的默认网络行为可能会绕过 UFW（简单防火墙）等主机级防火墙，从而无意中将容器化服务暴露在互联网上。当 Docker 发布端口时，它会直接操作 iptables 规则，通常将其插入到 UFW 规则之前。这意味着即使配置了 UFW 来阻止特定端口，Docker 的 iptables 规则仍然可能允许对主机上该端口的入站连接，并将其转发到容器。

The author recounts their personal experience of a database being unexpectedly exposed despite UFW being active. The primary defense mechanism is to configure Docker to use the userland-proxy or to manage iptables rules more explicitly to ensure Docker's rules are properly nested or controlled. Alternatively, utilizing docker-compose to declare networks and restricting container-to-host port mappings can help. For critical services, binding to 127.0.0.1 instead of 0.0.0.0 (all interfaces) within the docker run -p or docker-compose.yml configuration is essential to prevent unintended external exposure. This serves as a vital practical hardening guide for anyone deploying Docker containers, especially those containing sensitive services like databases, emphasizing the need to understand container networking beyond simple firewall rules.

作者讲述了他们尽管启用了 UFW，但数据库仍意外暴露的个人经历。主要的防御机制是配置 Docker 使用 userland-proxy，或者更明确地管理 iptables 规则，以确保 Docker 的规则被正确嵌套或控制。或者，利用 docker-compose 声明网络并限制容器到主机的端口映射也有帮助。对于关键服务，在 `docker run -p` 或 `docker-compose.yml` 配置中绑定到 `127.0.0.1` 而不是 `0.0.0.0`（所有接口）对于防止意外的外部暴露至关重要。对于任何部署 Docker 容器（尤其是包含数据库等敏感服务）的人来说，这是一份重要的实用加固指南，强调了在简单防火墙规则之外理解容器网络的需求。

**Comment:** This Docker-UFW interaction is a classic trap. Always bind your Docker services to 127.0.0.1 unless explicitly needed, and understand how Docker's iptables rules interact with your host firewall.

**评论：** 这种 Docker 与 UFW 的交互是一个经典陷阱。除非明确需要，否则请务必将 Docker 服务绑定到 127.0.0.1，并了解 Docker 的 iptables 规则如何与您的主机防火墙交互。

---

### Technical Analysis of EagleSpy V6.0 (CraxsRAT Rebrand) Distributed Through Odysee and Telegram
**Source:** [r/netsec](https://reddit.com/r/netsec/comments/1t8df0j/technical_analysis_of_eaglespy_v60_craxsrat/)

A recent technical analysis exposes EagleSpy V6.0, an Android Remote Access Trojan (RAT) identified as a rebranded version of the well-known CraxsRAT. This sophisticated malware is being actively distributed through non-traditional channels such as Odysee and Telegram, indicating a shift in threat actors' preferred distribution vectors for evading conventional security measures. The analysis provides an in-depth look into the RAT's capabilities, which typically include comprehensive device control, data exfiltration, call recording, SMS interception, and potentially even camera and microphone access.

**EagleSpy V6.0（CraxsRAT 重命名版）技术分析：通过 Odysee 和 Telegram 分发**
**来源：** [r/netsec](https://reddit.com/r/netsec/comments/1t8df0j/technical_analysis_of_eaglespy_v60_craxsrat/)

最近的一项技术分析揭露了 EagleSpy V6.0，这是一种 Android 远程访问木马（RAT），被认定为知名 CraxsRAT 的重命名版本。这种复杂的恶意软件正通过 Odysee 和 Telegram 等非传统渠道积极分发，表明威胁行为者为了规避常规安全措施，正在改变其首选的分发媒介。该分析深入探讨了该 RAT 的功能，通常包括全面的设备控制、数据外泄、通话录音、短信拦截，甚至可能包括摄像头和麦克风访问权限。

Its rebranding suggests an attempt by malicious actors to avoid detection by existing signatures associated with CraxsRAT, making it a persistent threat. The distribution through platforms like Odysee, a decentralized video platform, and Telegram, a popular messaging app, points to tactics designed to leverage trust and circumvent app store security checks. This highlights a growing concern in supply chain security, where seemingly benign content or direct messaging can be weaponized to deliver potent malware. Organizations and individual users must exercise extreme caution when downloading applications or files from untrusted sources, even if they appear legitimate. Implementing robust mobile endpoint detection and response (EDR) solutions, coupled with user awareness training about phishing and suspicious downloads, are critical defensive techniques against such evolving threats.

其重命名表明恶意行为者试图避免被与 CraxsRAT 相关的现有特征码检测到，使其成为一种持续存在的威胁。通过去中心化视频平台 Odysee 和流行通讯应用 Telegram 等平台进行分发，指向了旨在利用信任并规避应用商店安全检查的策略。这凸显了供应链安全中日益严重的问题，即看似良性的内容或直接消息传递可能被武器化以传播强效恶意软件。组织和个人用户在从不受信任的来源下载应用程序或文件时必须格外小心，即使它们看起来是合法的。实施强大的移动端点检测与响应（EDR）解决方案，并结合关于网络钓鱼和可疑下载的用户意识培训，是抵御此类不断演变的威胁的关键防御技术。

**Comment:** The use of Odysee and Telegram for RAT distribution is a notable supply chain vector. This detailed analysis helps defenders identify and protect against this rebranded threat, emphasizing vigilance beyond traditional app stores.

**评论：** 使用 Odysee 和 Telegram 进行 RAT 分发是一个值得注意的供应链媒介。这份详细的分析有助于防御者识别并防范这种重命名后的威胁，强调了在传统应用商店之外保持警惕的重要性。
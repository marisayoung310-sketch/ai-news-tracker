---
title: "Massive breach spills credentials for thousands of sensitive networks"
originalUrl: "https://arstechnica.com/security/2026/06/massive-breach-spills-credentials-for-thousands-of-sensitive-networks/"
date: "2026-06-17T22:56:09.758Z"
---

# Massive breach spills credentials for thousands of sensitive networks
# 大规模数据泄露：数千个敏感网络凭据遭曝光

Researchers have uncovered a massive breach of Fortinet firewalls that has given Russian-speaking attackers near-unrestricted access to some of the world’s largest and most powerful organizations, including Oracle, Chevron, Lenovo, Federal Express, a NATO defense contractor, and Fortinet itself.
研究人员近日发现了一起针对 Fortinet 防火墙的大规模入侵事件。讲俄语的攻击者借此获得了对全球多家大型顶尖机构近乎无限制的访问权限，受影响机构包括甲骨文（Oracle）、雪佛龙（Chevron）、联想（Lenovo）、联邦快递（FedEx）、一家北约（NATO）国防承包商，甚至包括 Fortinet 公司本身。

Nearly 74,000 Fortinet devices from more than 21,000 IP addresses in 194 countries have been compromised and their plaintext credentials exposed online, Bob Diachenko, a security researcher and head of SecurityDiscovery.com, said online and in an interview. He said he found the data after gaining access to the attackers’ command-and-control server and other infrastructure. The exposed data also included the industry, revenue, and employee count for each compromised organization.
安全研究员兼 SecurityDiscovery.com 负责人 Bob Diachenko 在线上及采访中表示，来自 194 个国家的 21,000 多个 IP 地址下的近 74,000 台 Fortinet 设备遭到入侵，其明文凭据在网上被泄露。他表示，自己在获取了攻击者的命令与控制（C2）服务器及其他基础设施的访问权限后发现了这些数据。泄露的信息还包括每个受害组织的行业、营收及员工人数。

### Exceptional scale, poor opsec
### 规模空前，但操作安全（OpSec）拙劣

Independent researcher Kevin Beaumont reported that “almost all” of the compromised devices remained online as of Wednesday morning. He went on to say that he has confirmed with multiple organizations found in the attackers’ logs that the credentials are real and current. In many cases, once the threat actors compromised the devices, they went on to access affected organizations’ centralized authentication systems, such as Radius servers and Microsoft Active Directory.
独立研究员 Kevin Beaumont 报告称，截至周三上午，“几乎所有”被入侵的设备仍处于在线状态。他进一步表示，已与攻击者日志中发现的多家机构核实，这些凭据真实且有效。在许多案例中，攻击者在入侵设备后，会进一步访问受害组织的集中式身份验证系统，例如 Radius 服务器和微软 Active Directory。

The number of compromised devices comprises roughly half of all Internet-facing Fortinet firewalls, based on polling from Shodan. “The scale of this breach touches nearly every sector of the global economy, sparing no industry,” researchers from Hudson Rock, a security firm that also analyzed the data, wrote. “The threat actors have built a verified database of working credentials for some of the largest enterprises on the planet.”
根据 Shodan 的数据统计，被入侵的设备数量约占所有面向互联网的 Fortinet 防火墙总数的一半。同样分析了该数据的安全公司 Hudson Rock 的研究人员写道：“此次泄露的规模触及了全球经济的几乎每一个领域，没有任何行业能幸免。攻击者已经建立了一个包含全球多家大型企业有效凭据的验证数据库。”

Diachenko, Beaumont, and Hudson Rock all urged Fortinet users to investigate their networks immediately for signs of compromise. Hudson Rock provided this search engine for locating affected domains.
Diachenko、Beaumont 和 Hudson Rock 均敦促 Fortinet 用户立即检查其网络是否存在被入侵的迹象。Hudson Rock 还提供了一个搜索引擎，供用户查询受影响的域名。

The scale of the operation is exceptional. The threat actor, which Diachenko said was criminally motivated, started by mass-scanning the Internet for FortiGate remote login endpoints. They then used a custom binary with 25,000 threads to spray hundreds of thousands of those endpoints with thousands of login and password combinations. Successful attempts now gave the attackers a “network tap inside the organization.”
此次行动的规模非同寻常。Diachenko 指出，该攻击者具有犯罪动机，他们首先通过大规模扫描互联网寻找 FortiGate 远程登录端点。随后，他们使用了一个拥有 25,000 个线程的自定义二进制程序，对数十万个端点进行了数千种账号密码组合的“喷洒式”攻击。一旦尝试成功，攻击者便在组织内部获得了一个“网络接入点”。

Hudson Rock said the attackers went on to “actively intercept SSL VPN authentication hashes and crack them using a massive, dedicated 45-GPU cluster managed via Hashtopolis.” From there, they used the GPU cluster to crack the hashes, meaning to try massive combinations of plain-text passwords until they found the right one. These passwords allowed the threat actors to move laterally to compromise Active Directory environments and other centralized authentication systems.
Hudson Rock 表示，攻击者随后“主动拦截 SSL VPN 身份验证哈希值，并使用通过 Hashtopolis 管理的、由 45 个 GPU 组成的庞大专用集群进行破解”。他们利用该 GPU 集群破解哈希值，即尝试海量的明文密码组合，直到找到正确的密码。这些密码使攻击者能够进行横向移动，进而入侵 Active Directory 环境及其他集中式身份验证系统。

“This aggressive methodology has led to severe, real-world consequences,” Hudson Rock said. “Diachenko’s research confirmed full network compromises at multiple organizations across Japan, Taiwan, Vietnam, Iraq, and Turkey. Most alarmingly, this includes a Turkish NATO defense contractor from which classified defense documents were successfully exfiltrated by the group.”
“这种激进的方法导致了严重的现实后果，”Hudson Rock 称，“Diachenko 的研究证实，日本、台湾、越南、伊拉克和土耳其的多家机构网络已被完全攻破。最令人担忧的是，其中包括一家土耳其的北约国防承包商，该组织已成功从其内部窃取了机密国防文件。”

In the interview, Diachenko put it more succinctly. “The scale is the sophistication,” he said.
在采访中，Diachenko 简洁地总结道：“规模本身就是一种复杂性。”

The scale didn’t stop there. The attackers used the massive cluster to run a” feedback-driven, 12-level recursive system.” In other words, there wasn’t a single flat dictionary run. Password candidates came from custom dictionaries with as many as eight words, common keyboard patterns, and cracking rules. Each one looped back with each step. When guesses were successful, the passwords were fed back as seeds to generate still more candidates. In other words, the cracking techniques improved with each successful guess. “They were quite innovative on that,” the researcher said.
这种规模并未止步于此。攻击者利用庞大的集群运行了一个“反馈驱动的 12 层递归系统”。换句话说，这并非简单的字典攻击。密码候选集来自包含多达八个单词的自定义字典、常见的键盘模式以及破解规则。每一步都会进行循环反馈。当猜测成功时，这些密码会被反馈作为种子，以生成更多的候选密码。简而言之，破解技术随着每一次成功的猜测而不断进化。研究人员评价道：“他们在这一点上非常有创新性。”

The innovation contrasts sharply with the operational security of the attackers, who left artifacts on the server they used. In hacker circles, such moves are considered amateur mistakes.
这种创新与攻击者拙劣的操作安全形成了鲜明对比，他们在使用的服务器上留下了痕迹。在黑客圈中，这种行为被视为业余错误。

Hudson Rock said that the top countries where compromised devices were found were India, the US, Taiwan, Mexico, Turkey, and Thailand. The top industries affected were IT services, construction materials, telecommunications, construction and engineering, industrial equipment, and financial services. Other organizations whose data appeared in the database included: Foxconn, Samsung, Comcast, Siemens, PwC, and Accenture. Hudson Rock said that the database listed thousands of others, including major government agencies and critical infrastructure providers.
Hudson Rock 表示，受影响设备最多的国家包括印度、美国、台湾、墨西哥、土耳其和泰国。受影响最严重的行业包括 IT 服务、建筑材料、电信、建筑与工程、工业设备和金融服务。数据库中出现的其他机构还包括：富士康（Foxconn）、三星（Samsung）、康卡斯特（Comcast）、西门子（Siemens）、普华永道（PwC）和埃森哲（Accenture）。Hudson Rock 称，数据库中还列出了数千家其他机构，包括主要的政府部门和关键基础设施提供商。

Firewalls have long been a favorite network entry point for hackers. These devices accept connections from the outside Internet, sit at the perimeter of a network, and have access to valuable resources deep inside. The links above list a number of steps Fortinet firewall users should take to ensure their networks are secure. Given that the data has been available to cybercriminals and potentially other threat actors who, like Diachenko, found it, the risk is substantial.
防火墙长期以来一直是黑客最青睐的网络切入点。这些设备接收来自外部互联网的连接，位于网络边界，并能访问内部深处的宝贵资源。上述链接列出了 Fortinet 防火墙用户应采取的若干步骤，以确保其网络安全。鉴于这些数据已被网络犯罪分子以及像 Diachenko 那样发现数据的其他潜在威胁行为者所掌握，风险极其巨大。
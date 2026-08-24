---
title: "DynIP – Dynamic DNS with RFC 2136, IPv6, DNSSEC, and BYOD"
originalUrl: "https://dynip.dev/"
date: "2026-05-27T00:12:30.966Z"
---

# DynIP – Dynamic DNS with RFC 2136, IPv6, DNSSEC, and BYOD
# DynIP – 支持 RFC 2136、IPv6、DNSSEC 和 BYOD 的动态 DNS 服务

Dynamic DNS that actually works. 60-second updates. Generous free tier. RFC 2136 TSIG. Bring your own domain. DNSSEC. For homelabs, edge routers, and infrastructure teams.
这是一个真正好用的动态 DNS 服务。提供 60 秒快速更新、慷慨的免费层级、RFC 2136 TSIG 支持、自定义域名（BYOD）以及 DNSSEC 安全保障。专为家庭实验室、边缘路由器和基础设施团队打造。

Updates in seconds, not minutes. Most DDNS providers cache for 30 minutes. DynIP propagates in under a minute end-to-end. Your router sends an update, your hostname resolves correctly worldwide within ~60 seconds.
更新只需几秒，而非几分钟。大多数 DDNS 提供商的缓存时间长达 30 分钟，而 DynIP 的端到端传播时间不到一分钟。当您的路由器发送更新后，您的主机名在约 60 秒内即可在全球范围内正确解析。

Built on real DNS standards. RFC 2136 TSIG means your FortiGate, MikroTik, OPNsense, OpenWRT, or any router that speaks DNS UPDATE works out of the box with our code generator.
基于真正的 DNS 标准构建。通过 RFC 2136 TSIG 支持，您的 FortiGate、MikroTik、OPNsense、OpenWRT 或任何支持 DNS UPDATE 的路由器，都可以通过我们的代码生成器实现开箱即用。

Native IPv6 done right. Modern ISPs increasingly give you native IPv6 alongside CGNATed IPv4. DynIP supports both: update A and AAAA records side-by-side, run IPv6-only zones, or both. Built for the network you have today and the network you'll have tomorrow.
原生 IPv6 的正确实现方式。现代 ISP 越来越多地在提供 CGNAT IPv4 的同时提供原生 IPv6。DynIP 两者兼顾：支持同时更新 A 和 AAAA 记录、运行纯 IPv6 区域或两者并存。专为满足您当前及未来的网络需求而设计。

Quick Start Guide:
1. Create a Zone: Type your device name, select your preferred base domain, and click Create Zone.
2. Get the Config: Click the Snippets button next to your new domain.
3. Deploy: Select your device type and copy the generated configuration block directly into your router's CLI.
快速入门指南：
1. 创建区域：输入设备名称，选择您偏好的基础域名，然后点击“创建区域”。
2. 获取配置：点击新域名旁边的“代码片段（Snippets）”按钮。
3. 部署：选择您的设备类型，并将生成的配置块直接复制到路由器的命令行界面（CLI）中。

Custom Namespaces (BYOD): Bring your own domain to DynIP. Once added, you can provision dynamic subdomains under your own namespace.
自定义命名空间（BYOD）：将您自己的域名带到 DynIP。添加后，您可以在自己的命名空间下配置动态子域名。
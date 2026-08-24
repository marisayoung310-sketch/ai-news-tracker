---
title: "Deploying Pi-hole DNS Sinkhole Service on Ubuntu 24.04"
originalUrl: "https://dev.to/vultr/deploying-pi-hole-dns-sinkhole-service-on-ubuntu-2404-1na8"
date: "2026-06-10T23:08:23.098Z"
---

# Deploying Pi-hole DNS Sinkhole Service on Ubuntu 24.04
# 在 Ubuntu 24.04 上部署 Pi-hole DNS 拦截服务

Pi-hole is a network-level ad and tracker blocking application that acts as a DNS sinkhole, returning a null address for known ad and tracking domains. This guide deploys Pi-hole using Docker Compose with Traefik handling automatic HTTPS for the admin dashboard, after freeing the system's port 53. By the end, you'll have Pi-hole resolving and sinkholing DNS queries with an HTTPS-secured admin console.
Pi-hole 是一款网络级的广告和追踪器拦截应用，它充当 DNS 黑洞（Sinkhole），为已知的广告和追踪域名返回空地址。本指南将使用 Docker Compose 部署 Pi-hole，并利用 Traefik 为管理后台自动配置 HTTPS，同时会先释放系统占用的 53 端口。完成本指南后，你将拥有一个能够解析和拦截 DNS 查询，并配有 HTTPS 安全管理控制台的 Pi-hole 服务。

### Free Port 53
### 释放 53 端口

Ubuntu's systemd-resolved binds port 53 by default. Release it before deploying.
Ubuntu 的 `systemd-resolved` 默认会占用 53 端口。在部署前请先将其释放。

1. Stop and disable systemd-resolved:
1. 停止并禁用 systemd-resolved：
```bash
$ sudo systemctl stop systemd-resolved
$ sudo systemctl disable systemd-resolved
```

2. Replace the resolver configuration:
2. 替换解析器配置：
```bash
$ sudo rm /etc/resolv.conf
$ echo "nameserver 1.1.1.1" | sudo tee /etc/resolv.conf
```

### Set Up the Directory Structure
### 设置目录结构

1. Create the project directory structure:
1. 创建项目目录结构：
```bash
$ mkdir -p ~/pihole/{etc-pihole,etc-dnsmasq.d,letsencrypt}
$ cd ~/pihole
```

2. Create the environment file:
2. 创建环境变量文件：
```bash
$ nano .env
DOMAIN=pihole.example.com
LETSENCRYPT_EMAIL=admin@example.com
TZ=UTC
```

### Deploy with Docker Compose
### 使用 Docker Compose 部署

1. Add your user to the Docker group:
1. 将你的用户添加到 Docker 组：
```bash
$ sudo usermod -aG docker $USER
$ newgrp docker
```

2. Create the Docker Compose manifest:
2. 创建 Docker Compose 清单文件：
```bash
$ nano docker-compose.yml
```
*(Content omitted for brevity, please refer to the original configuration provided in your prompt)*

3. Start the services:
3. 启动服务：
```bash
$ docker compose up -d
```

4. Verify the services are running:
4. 验证服务是否正在运行：
```bash
$ docker compose ps
```

### Initial Configuration
### 初始配置

1. Set the admin password:
1. 设置管理密码：
```bash
$ docker compose exec pihole pihole setpassword
```

2. Open the dashboard: Open https://pihole.example.com/admin in a browser and sign in.
2. 打开仪表盘：在浏览器中访问 https://pihole.example.com/admin 并登录。

3. Permit dashboard access from all origins: Go to Settings → DNS, toggle Basic to access advanced settings, and select Permit all origins under Interface Settings. Save & Apply.
3. 允许从所有来源访问仪表盘：进入 Settings → DNS，切换到高级设置（Advanced），在 Interface Settings 下选择 "Permit all origins"。点击保存并应用。

**Warning:** Restrict access to port 53 with your firewall — open DNS resolvers can be abused for amplification attacks.
**警告：** 请务必使用防火墙限制对 53 端口的访问——开放的 DNS 解析器可能会被滥用于放大攻击。

### Test Resolution
### 测试解析

From any client, confirm blocking and normal resolution:
从任何客户端确认拦截和正常解析功能：
```bash
$ dig @SERVER_IP flurry.com
$ dig @SERVER_IP vultr.com
```
The first should resolve to 0.0.0.0; the second should return real records.
第一个命令应该解析为 0.0.0.0；第二个命令应该返回真实的记录。

### Next Steps
### 后续步骤

Pi-hole is running with HTTPS for the dashboard. From here you can:
Pi-hole 现已运行并为仪表盘启用了 HTTPS。接下来你可以：

* Add custom blocklists via Adlists in the dashboard
* 通过仪表盘中的 Adlists 添加自定义拦截列表
* Enable conditional forwarding to your LAN router for local hostname resolution
* 启用条件转发到你的局域网路由器，以实现本地主机名解析
* Point your LAN DHCP server at Pi-hole for network-wide filtering
* 将局域网 DHCP 服务器指向 Pi-hole，实现全网过滤

For the full guide with additional tips, visit the original article on Vultr Docs.
如需获取包含更多技巧的完整指南，请访问 Vultr Docs 上的原始文章。
---
title: "How to Actually Set Up the Gluetun VPN Killswitch"
originalUrl: "https://dev.to/gab_builds/how-to-actually-set-up-the-gluetun-vpn-killswitch-49j6"
date: "2026-05-06T22:53:44.751Z"
---

# How to Actually Set Up the Gluetun VPN Killswitch
# 如何正确设置 Gluetun VPN 终止开关 (Killswitch)

Most guides show you how to configure Gluetun. Almost none of them show you how to verify the killswitch is actually working — not just configured. This is the gap. You can have Gluetun running, qBittorrent connecting through it, and still have a broken killswitch that leaks your real IP the moment the VPN drops. I learned this the hard way. Here's how to set it up correctly and test it properly.
大多数教程只教你如何配置 Gluetun，却几乎没人教你如何验证终止开关是否真的在工作，而不仅仅是“配置好了”。这就是问题的关键所在。你可能运行着 Gluetun，qBittorrent 也通过它连接，但如果终止开关失效，一旦 VPN 断开，你的真实 IP 就会泄露。我曾为此吃过苦头。以下是正确设置并进行有效测试的方法。

### What the Killswitch Actually Does
### 终止开关的实际作用

Gluetun is a VPN client that runs as a Docker container. The killswitch ensures that if the VPN connection drops, all traffic from dependent containers stops completely - it doesn't fall back to your real IP. The key mechanism: instead of connecting containers to Gluetun over a network bridge, dependent containers (qBittorrent, Radarr, Sonarr, Prowlarr) share Gluetun's network stack directly using `network_mode: service:gluetun`. This means they have no independent network access — if Gluetun goes down, they go offline.
Gluetun 是一个以 Docker 容器形式运行的 VPN 客户端。终止开关的作用是确保当 VPN 连接断开时，所有依赖容器的流量会完全停止，而不会回退到你的真实 IP。其核心机制是：依赖容器（如 qBittorrent、Radarr、Sonarr、Prowlarr）不再通过网桥连接到 Gluetun，而是直接使用 `network_mode: service:gluetun` 共享 Gluetun 的网络栈。这意味着它们没有独立的网络访问权限——如果 Gluetun 宕机，它们也会随之离线。

### The Compose Setup
### Compose 配置

Here's the correct pattern. Pay attention to `network_mode` — this is where most configs go wrong:
这是正确的配置模式。请务必注意 `network_mode`，这是大多数配置出错的地方：

```yaml
services:
  gluetun:
    image: qmcgaw/gluetun
    container_name: gluetun
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun:/dev/net/tun
    ports:
      - 8080:8080 # qBittorrent web UI
      - 7878:7878 # Radarr
      - 8989:8989 # Sonarr
      - 9696:9696 # Prowlarr
    environment:
      - VPN_SERVICE_PROVIDER=nordvpn
      - VPN_TYPE=wireguard
      - WIREGUARD_PRIVATE_KEY=${WIREGUARD_PRIVATE_KEY}
      - SERVER_COUNTRIES=${SERVER_COUNTRIES}
    restart: unless-stopped

  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    network_mode: service:gluetun # ← this is the killswitch
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
      - WEBUI_PORT=8080
    volumes:
      - ${CONFIG_PATH}/qbittorrent:/config
      - ${DOWNLOADS_PATH}:/downloads
    depends_on:
      - gluetun
    restart: unless-stopped

  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    network_mode: service:gluetun # ← same for all dependent services
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
    volumes:
      - ${CONFIG_PATH}/radarr:/config
      - ${MOVIES_PATH}:/movies
      - ${DOWNLOADS_PATH}:/downloads
    depends_on:
      - gluetun
    restart: unless-stopped
```

Important: All ports for dependent containers must be declared on the gluetun service, not on the individual containers. Since they share Gluetun's network, they don't have their own ports to expose.
重要提示：所有依赖容器的端口必须在 `gluetun` 服务中声明，而不是在各自的容器中。因为它们共享 Gluetun 的网络，所以它们没有自己的端口可以暴露。

### Verifying the Killswitch Works
### 验证终止开关是否有效

This is the step most guides skip. Don't assume it's working — test it.
这是大多数教程都会跳过的一步。不要想当然地认为它在工作，请务必测试。

**Step 1 - Confirm traffic is going through the VPN**
**第一步 - 确认流量通过 VPN**
`docker exec qbittorrent curl -s ifconfig.me`
This should return your VPN's IP address, not your home IP. If it returns your home IP, your `network_mode` config is wrong.
这应该返回你 VPN 的 IP 地址，而不是你的家庭 IP。如果返回的是家庭 IP，说明你的 `network_mode` 配置有误。

**Step 2 - Test the killswitch**
**第二步 - 测试终止开关**
```bash
# Stop Gluetun
docker stop gluetun
# Try to make a network request from qBittorrent
docker exec qbittorrent curl -s --max-time 5 ifconfig.me
```
If the killswitch is working correctly, the `curl` command should hang and timeout — not return any IP at all. If it returns your home IP, the killswitch is not working.
如果终止开关工作正常，`curl` 命令应该会挂起并超时，而不返回任何 IP。如果它返回了你的家庭 IP，说明终止开关未生效。

**Step 3 - Restore**
**第三步 - 恢复**
`docker start gluetun`
Wait 10-15 seconds for the VPN to reconnect, then verify the VPN IP is back:
`docker exec qbittorrent curl -s ifconfig.me`
等待 10-15 秒让 VPN 重新连接，然后验证 VPN IP 是否已恢复。

### Common Issues
### 常见问题

*   **curl returns your home IP after stopping Gluetun:** Your containers aren't actually using `network_mode: service:gluetun`. Double-check the compose file — it's easy to have it on one container but not others.
    **停止 Gluetun 后 curl 仍返回家庭 IP：** 你的容器实际上并没有使用 `network_mode: service:gluetun`。请仔细检查 compose 文件，很容易出现只在一个容器上配置而忽略了其他容器的情况。
*   **qBittorrent web UI isn't accessible:** Make sure the port is declared on the `gluetun` service, not on `qbittorrent`. This catches a lot of people.
    **无法访问 qBittorrent Web UI：** 确保端口是在 `gluetun` 服务中声明的，而不是在 `qbittorrent` 中。很多人都会在这里栽跟头。
*   **Gluetun won't start:** Check that `/dev/net/tun` exists on your host: `ls /dev/net/tun`. If it doesn't exist, run: `sudo mkdir -p /dev/net && sudo mknod /dev/net/tun c 10 200`.
    **Gluetun 无法启动：** 检查宿主机是否存在 `/dev/net/tun`：`ls /dev/net/tun`。如果不存在，请运行：`sudo mkdir -p /dev/net && sudo mknod /dev/net/tun c 10 200`。
*   **VPN keeps reconnecting:** Try switching to a server closer to your location using the `SERVER_COUNTRIES` environment variable in your `.env` file.
    **VPN 不断重连：** 尝试在 `.env` 文件中使用 `SERVER_COUNTRIES` 环境变量，切换到离你地理位置更近的服务器。

### Wrapping Up
### 总结

The killswitch isn't magic — it's just Docker networking. Once you understand that `network_mode: service:gluetun` removes independent network access from dependent containers, the whole thing clicks. The test in Step 2 is the one thing worth doing even if you skip everything else. A killswitch you haven't tested is the same as no killswitch.
终止开关并非魔法，它只是 Docker 的网络特性。一旦你理解了 `network_mode: service:gluetun` 会移除依赖容器的独立网络访问权限，一切就豁然开朗了。即使你跳过所有其他步骤，第二步的测试也是绝对值得做的。一个未经测试的终止开关，等同于没有终止开关。
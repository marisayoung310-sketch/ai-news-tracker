---
title: "How to Uninstall Hermes Desktop from macOS"
originalUrl: "https://dev.to/0xkoji/how-to-uninstall-hermes-desktop-from-macos-366j"
date: "2026-06-06T22:44:36.787Z"
---

### How to Uninstall Hermes Desktop from macOS
### 如何在 macOS 上卸载 Hermes Desktop

I installed Hermes Desktop on macOS but it was different from what I expected lol (I thought it would work as a client application for my Hermes agent I set up). Here are 4 steps to uninstall Hermes Desktop from macOS.
我在 macOS 上安装了 Hermes Desktop，但它和我想象的不太一样（我原以为它能作为我设置的 Hermes 代理的客户端应用程序使用）。以下是在 macOS 上卸载 Hermes Desktop 的 4 个步骤：

1 Stop Hermes gateway
`hermes gateway stop`
1. 停止 Hermes 网关
`hermes gateway stop`

2 Kill the process
`pkill -f "hermes"`
2. 终止进程
`pkill -f "hermes"`

3 Remove files
`rm -f ~/.local/bin/hermes`
`rm -rf ~/.hermes`
3. 删除文件
`rm -f ~/.local/bin/hermes`
`rm -rf ~/.hermes`

4 Clean up system ctl
`launchctl unload ~/Library/LaunchAgents/ai.hermes.gateway.plist`
`launchctl remove ai.hermes.gateway`
`rm -f ~/Library/LaunchAgents/ai.hermes.gateway.plist`
4. 清理系统控制 (system ctl)
`launchctl unload ~/Library/LaunchAgents/ai.hermes.gateway.plist`
`launchctl remove ai.hermes.gateway`
`rm -f ~/Library/LaunchAgents/ai.hermes.gateway.plist`
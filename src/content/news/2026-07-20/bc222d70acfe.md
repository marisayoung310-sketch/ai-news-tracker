---
title: "andrewrabert / jellium-desktop"
originalUrl: "https://github.com/andrewrabert/jellium-desktop"
date: "2026-07-19T22:15:13.069Z"
---

### Jellium Desktop

**Jellium Desktop**
An unofficial Jellyfin desktop client built on CEF and mpv.
这是一个基于 CEF 和 mpv 构建的非官方 Jellyfin 桌面客户端。

**Downloads**
**下载**

*   **Linux**
    *   AppImage (x86_64, aarch64)
    *   Arch Linux (AUR): `jellium-desktop-git`
    *   Flatpak (non-Flathub bundle)
    *   Arch Linux (AUR): `jellium-desktop-git`
    *   Flatpak (非 Flathub 捆绑包)

*   **macOS**
    *   Apple Silicon
    *   Intel
    *   After installing, remove quarantine: `sudo xattr -cr /Applications/Jellium\ Desktop.app`
    *   安装后，请移除隔离属性：`sudo xattr -cr /Applications/Jellium\ Desktop.app`

*   **Windows**
    *   x64
    *   arm64

**Development**
**开发**

This project uses `just` as a command runner. Available recipes:
本项目使用 `just` 作为命令运行器。可用指令如下：

*   **[package]**
    *   `appimage` ... # [linux] build AppImage
    *   `flatpak` ... # [linux] build Flatpak bundle
    *   `dmg` # [macos] build Apple Disk Image (.dmg)
    *   `appimage` ... # [linux] 构建 AppImage
    *   `flatpak` ... # [linux] 构建 Flatpak 捆绑包
    *   `dmg` # [macos] 构建 Apple 磁盘映像 (.dmg)

*   **[maintenance]**
    *   `outdated` # List outdated dependencies
    *   `clean` # Remove build artifacts
    *   `outdated` # 列出过期的依赖项
    *   `clean` # 清除构建产物

*   **[test]**
    *   `test` # Run tests
    *   `test` # 运行测试

*   **[lint]**
    *   `fmt` # Format workspace
    *   `fmt-check` # Check formatting
    *   `clippy` # Run clippy
    *   `lint` # Lint workspace
    *   `strict-lint` # Strict lint workspace
    *   `fmt` # 格式化工作区
    *   `fmt-check` # 检查格式
    *   `clippy` # 运行 clippy
    *   `lint` # 对工作区进行代码检查
    *   `strict-lint` # 对工作区进行严格代码检查

*   **[build]**
    *   `build` # Build the app
    *   `build` # 构建应用

*   **[run]**
    *   `run *args` # Run the app
    *   `run-mpv *args` # Run the mpv CLI
    *   `run *args` # 运行应用
    *   `run-mpv *args` # 运行 mpv 命令行界面
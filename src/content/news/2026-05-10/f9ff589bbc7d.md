---
title: "Inflorescence – A cross-platform native GUI for Pijul"
originalUrl: "https://nest.pijul.com/tzemanovic/inflorescence"
date: "2026-05-09T22:20:03.701Z"
---

# Inflorescence – A cross-platform native GUI for Pijul

Inflorescence is a cross-platform native GUI for Pijul, aiming for a pleasant UX, heavily inspired by Magit, and built using the Iced framework.

Inflorescence 是一个为 Pijul 设计的跨平台原生图形用户界面（GUI），旨在提供舒适的用户体验。它深受 Magit 的启发，并基于 Iced 框架构建。

### Core Principles / 核心原则

*   **Quick and easy to navigate and to execute common actions:** Designed for efficiency.
    *   **快速且易于导航及执行常见操作：** 为高效而设计。
*   **Everything can be done with keyboard only (though mouse is also supported):** Prioritizing power users.
    *   **所有操作均可通过键盘完成（同时也支持鼠标）：** 优先考虑高级用户需求。
*   **Show a menu of possible commands to aid exploration:** Helping users discover functionality.
    *   **显示可用命令菜单以辅助探索：** 帮助用户发现各项功能。
*   **Be responsive (use async):** Ensuring a smooth interface.
    *   **保持响应性（使用异步）：** 确保界面流畅。
*   **Logic separated from UI implementation:** Allows for reuse to build TUI, Emacs, or other integrations.
    *   **逻辑与 UI 实现分离：** 便于复用逻辑以构建 TUI、Emacs 或其他集成工具。

### Feature Highlights / 功能亮点

*   **Watches over the active files (respecting .ignore filter):** Always shows up-to-date state.
    *   **监控活动文件（遵循 .ignore 过滤器）：** 始终显示最新状态。
*   **Shows diffs in context:** Currently supported in changed files (recorded changes diffs are not yet supported).
    *   **在上下文中显示差异（Diff）：** 目前支持已更改的文件（暂不支持已记录变更的差异）。
*   **Local vs. Remote comparison:** Can compare local against a remote repository.
    *   **本地与远程对比：** 支持将本地仓库与远程仓库进行对比。
*   **Interactive recording change selection:** You can keep editing files while selecting changes (toggles next to files and hunks).
    *   **交互式变更记录选择：** 你可以在选择变更的同时继续编辑文件（通过文件和代码块旁边的切换开关）。
*   **Toggle individual files and hunks:** Note that toggle states are not currently persisted (resets on restart).
    *   **切换单个文件和代码块：** 请注意，切换状态目前不会持久化（重启后会重置）。
*   **Project finder with Git repo import:** Automatically searches subdirectories for Pijul and Git repositories.
    *   **支持 Git 导入的项目查找器：** 自动搜索子目录中的 Pijul 和 Git 仓库。
*   **Persisted project management:** Previously managed projects are saved and ordered by last closed timestamp.
    *   **持久化项目管理：** 之前管理的项目会被保存，并按最后关闭时间排序。
*   **Image rendering:** Can render images tracked in Pijul (currently limited to the latest version).
    *   **图像渲染：** 可以渲染 Pijul 追踪的图像（目前仅限于显示最新版本）。
*   **Channel inspection:** Inspect logs and diffs of other channels without switching to them.
    *   **通道检查：** 无需切换即可查看其他通道的日志和差异。

### Installation / 安装

This project is developed and tested on Linux, but it should work on other platforms. Issue reports are welcome.

该项目在 Linux 上开发和测试，但也应能在其他平台上运行。欢迎提交问题反馈。

**Install via Cargo:**
```bash
cargo install --path inflorescence
```

**Add a desktop shortcut (Linux):**
```bash
# Copy the .desktop file
cp contrib/holonyte-inflorescence.desktop ~/.local/share/applications/
# Copy the app icon
cp assets/icon.png ~/.local/share/icons/inflorescence.png
```

**添加桌面快捷方式 (Linux):**
```bash
# 复制 .desktop 文件
cp contrib/holonyte-inflorescence.desktop ~/.local/share/applications/
# 复制应用图标
cp assets/icon.png ~/.local/share/icons/inflorescence.png
```

### Configuration / 配置

*   **Known projects:** Stored in `~/.config/inflorescence/projects.toml`.
    *   **已知项目：** 存储在 `~/.config/inflorescence/projects.toml` 中。
*   **Key bindings:** Not yet configurable via UI (can be modified in `inflorescence_model/src/action.rs`).
    *   **快捷键：** 暂不支持通过 UI 配置（可在 `inflorescence_model/src/action.rs` 中修改源码）。
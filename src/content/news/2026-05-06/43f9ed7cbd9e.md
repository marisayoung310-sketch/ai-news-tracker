---
title: "bwya77 / vscode-dark-islands"
originalUrl: "https://github.com/bwya77/vscode-dark-islands"
date: "2026-05-05T22:21:12.647Z"
---

# bwya77 / vscode-dark-islands

**Islands Dark** is a dark color theme for Visual Studio Code inspired by the easemate IDE. It features floating glass-like panels, rounded corners, smooth animations, and a deeply refined UI.

**Islands Dark** 是一款受 easemate IDE 启发，专为 Visual Studio Code 设计的深色主题。它拥有悬浮的玻璃质感面板、圆角设计、流畅的动画效果以及深度优化的用户界面。

### Features / 功能特性

*   **Deep dark canvas (#131217)** with floating panels.
    深邃的深色画布（#131217）搭配悬浮面板。
*   **Glass-effect borders** with directional light simulation (brighter top/left, subtle bottom/right).
    具有方向性光影模拟的玻璃质感边框（左上角较亮，右下角较暗）。
*   **Rounded corners** on all panels, notifications, command palette, and sidebars.
    所有面板、通知、命令面板和侧边栏均采用圆角设计。
*   **Pill-shaped activity bar** with glass selection indicators.
    药丸形状的活动栏，带有玻璃质感的选中指示器。
*   **Breadcrumb bar and status bar** that dim when not hovered.
    面包屑导航栏和状态栏在未悬停时会自动变暗。
*   **Tab close buttons** that fade in on hover.
    标签页关闭按钮在鼠标悬停时淡入显示。
*   **Smooth transitions** on sidebar selections, scrollbars, and status bar.
    侧边栏选择、滚动条和状态栏均具备平滑过渡效果。
*   **Pill-shaped scrollbar thumbs.**
    药丸形状的滚动条滑块。
*   **Color-matched icon glow effect** (works best with Seti Folder icon theme).
    与颜色匹配的图标发光效果（配合 Seti Folder 图标主题效果最佳）。
*   **Warm syntax highlighting** with comprehensive language support (JS/TS, Python, Go, Rust, HTML/CSS, JSON, YAML, Markdown).
    温暖的语法高亮，支持多种主流语言（JS/TS, Python, Go, Rust, HTML/CSS, JSON, YAML, Markdown）。
*   **IBM Plex Mono** in the editor, **FiraCode Nerd Font Mono** in the terminal.
    编辑器使用 IBM Plex Mono 字体，终端使用 FiraCode Nerd Font Mono 字体。

---

### Installation / 安装指南

This theme has two parts: a color theme and CSS customizations that create the floating glass panel look.
该主题包含两部分：颜色主题以及用于实现悬浮玻璃面板外观的 CSS 自定义样式。

#### One-Liner Install (Recommended) / 一键安装（推荐）

The fastest way to install:
最快捷的安装方式：

*   **macOS/Linux:** `curl -fsSL https://raw.githubusercontent.com/bwya77/vscode-dark-islands/main/bootstrap.sh | bash`
*   **Windows:** `irm https://raw.githubusercontent.com/bwya77/vscode-dark-islands/main/bootstrap.ps1 | iex`

#### Manual Clone Install / 手动克隆安装

If you prefer to clone first:
如果您倾向于先克隆仓库：

*   **macOS/Linux:**
    ```bash
    git clone https://github.com/bwya77/vscode-dark-islands.git islands-dark
    cd islands-dark
    ./install.sh
    ```
*   **Windows:**
    ```powershell
    git clone https://github.com/bwya77/vscode-dark-islands.git islands-dark
    cd islands-dark
    .\install.ps1
    ```

The scripts will automatically:
脚本将自动执行以下操作：
*   ✅ Install the Islands Dark theme extension. (安装 Islands Dark 主题插件)
*   ✅ Install the Custom UI Style extension. (安装 Custom UI Style 插件)
*   ✅ Install Bear Sans UI fonts. (安装 Bear Sans UI 字体)
*   ✅ Back up your existing settings and apply Islands Dark settings. (备份现有设置并应用 Islands Dark 设置)
*   ✅ Enable Custom UI Style and reload VS Code. (启用 Custom UI Style 并重启 VS Code)

*Note: IBM Plex Mono and FiraCode Nerd Font Mono must be installed separately (the script will remind you).*
*注意：IBM Plex Mono 和 FiraCode Nerd Font Mono 需要单独安装（脚本会提醒您）。*

---

### Nix Flake Install / Nix Flake 安装

If you use Nix, you can run a pre-configured instance of VS Code (or VSCodium) with the theme, extensions, and fonts already bundled.
如果您使用 Nix，可以直接运行预配置好的 VS Code (或 VSCodium) 实例，其中已捆绑了主题、插件和字体。

To run it directly without installing:
直接运行（无需安装）：
```bash
# Run VS Code
nix run github:bwya77/vscode-dark-islands#vscode
# Or run VSCodium
nix run github:bwya77/vscode-dark-islands#vscodium
```

---

### Manual Installation / 手动安装步骤

**Step 1: Install the theme** (克隆仓库并复制扩展文件到 `.vscode/extensions` 目录)
**Step 2: Install the Custom UI Style extension** (在插件市场搜索并安装 `Custom UI Style` by subframe7536)
**Step 3: Install recommended icon theme** (安装 `Seti Folder` 图标主题以获得最佳发光效果)
**Step 5: Install fonts** (安装 `IBM Plex Mono`, `FiraCode Nerd Font Mono` 以及仓库 `fonts/` 目录下的 `Bear Sans UI`)
**Step 6: Apply the settings** (将仓库中的 `settings.json` 内容合并到您的 VS Code 用户设置中)
**Step 7: Enable Custom UI Style** (通过命令面板运行 `Custom UI Style: Enable` 并重启 VS Code)

*Note: You may see a "corrupt installation" warning after enabling. This is expected since Custom UI Style injects CSS into VS Code. Click the gear icon on the warning and select "Don't Show Again".*
*注意：启用后您可能会看到“安装已损坏”的警告。这是正常现象，因为 Custom UI Style 会向 VS Code 注入 CSS。点击警告上的齿轮图标并选择“不再显示”即可。*

---

### What the CSS customizations do / CSS 自定义项说明

| Element | Effect |
| :--- | :--- |
| **Canvas** | Deep dark background behind all panels. (所有面板背后的深色背景) |
| **Sidebar** | Floating with rounded corners, glass borders, drop shadow. (悬浮圆角、玻璃边框、投影效果) |
| **Editor** | Floating with rounded corners, glass borders, browser-tab effect. (悬浮圆角、玻璃边框、浏览器标签页效果) |
| **Activity bar** | Pill-shaped with glass inset shadows, circular selection indicator. (药丸形状、玻璃内阴影、圆形选中指示器) |
| **Command center** | Pill-shaped with glass effect. (药丸形状、玻璃质感) |
| **Bottom panel** | Floating with rounded corners. (悬浮圆角) |
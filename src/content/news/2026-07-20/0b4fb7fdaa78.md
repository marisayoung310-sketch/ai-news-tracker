---
title: "Minecraft: Java Edition now uses SDL3"
originalUrl: "https://www.minecraft.net/en-us/article/minecraft-26-3-snapshot-4"
date: "2026-07-19T22:12:57.030Z"
---

# Minecraft: Java Edition now uses SDL3

**Minecraft: Java Edition 现在使用 SDL3**

Minecraft 26.3 Snapshot 4. A Minecraft Java Snapshot. Happy Snapshot Tues... Thursday? Yes, you read that right! As we've entered peak vacation season here in Sweden, snapshots might not come out on their usual schedule. In today's snapshot we have switched the library used for window management, input and platform integration from GLFW to SDL3. We have also added new item components for custom furnace fuels, as well as several technical changes for signs, world generation and loot tables. Happy mining!

Minecraft 26.3 快照 4。这是一个 Minecraft Java 快照。快照周二快乐……周四？没错，你没看错！随着瑞典进入度假高峰期，快照可能无法按常规时间发布。在今天的快照中，我们将用于窗口管理、输入和平台集成的库从 GLFW 切换到了 SDL3。我们还为自定义熔炉燃料添加了新的物品组件，并对告示牌、世界生成和战利品表进行了一些技术性更改。祝挖掘愉快！

### Known Issues
**已知问题**

* Exclusive fullscreen mode on Windows may cause the game to crash in certain situations, especially when using multiple monitors.
* Entering Exclusive fullscreen mode crashes the game on Wayland.

* 在 Windows 上，独占全屏模式在某些情况下可能会导致游戏崩溃，尤其是在使用多显示器时。
* 在 Wayland 环境下进入独占全屏模式会导致游戏崩溃。

### New Features
**新特性**

* Players in spectator mode can now interact with portals to teleport.

* 旁观模式下的玩家现在可以与传送门交互以进行传送。

### Changes
**更改**

* Minor Tweaks to Blocks, Items and Entities.
* Armadillos no longer try to roll up when submerged in liquids.

* 对方块、物品和实体的微小调整。
* 犰狳在浸没于液体中时不再尝试蜷缩。

### UI
**用户界面 (UI)**

* Removed the Raw Input mouse setting. Mouse input now always uses relative mouse mode while playing in-game.
* Key bindings now use physical keys instead of keyboard-layout-specific key codes.
* Borderless Fullscreen is now the default fullscreen mode.
* Switching between Borderless and Exclusive Fullscreen no longer requires restarting the game.
* Exclusive fullscreen mode on macOS is no longer supported.
* The minimum window size is now 320 by 240 pixels.
* On macOS, holding a key while entering text now displays the native accent and candidate popup.
* On Linux systems, the game will now use and prefer Wayland natively if available.

* 移除了“原始输入”鼠标设置。现在在游戏内游玩时，鼠标输入始终使用相对鼠标模式。
* 按键绑定现在使用物理按键，而非特定于键盘布局的键码。
* 无边框全屏现在是默认的全屏模式。
* 在无边框全屏和独占全屏之间切换不再需要重启游戏。
* macOS 不再支持独占全屏模式。
* 最小窗口尺寸现为 320x240 像素。
* 在 macOS 上，输入文本时按住按键现在会显示原生的重音符号和候选词弹窗。
* 在 Linux 系统上，如果可用，游戏现在将优先原生使用 Wayland。

### Debug Overlay
**调试覆盖层**

* The debug overlay now supports a separate GUI scale than the rest of the game. This is customizable through the Debug Options screen, F3 + F6.
* The default scale is "Auto", which tries to stay at a higher resolution than normal.
* Another option is "Unchanged", which matches your regular GUI scale.
* The rest of the options work the same as in the normal "GUI Scale", controlling the scale directly.
* Added a "player_speed" debug entry that displays the speed of the player in blocks per tick.
* The debug overlay now shows the display refresh rate.

* 调试覆盖层现在支持与游戏其他部分不同的 GUI 缩放比例。这可以通过“调试选项”界面（F3 + F6）进行自定义。
* 默认缩放为“自动”，它会尝试保持比正常情况更高的分辨率。
* 另一个选项是“未更改”，它会匹配你常规的 GUI 缩放比例。
* 其余选项的工作方式与常规“GUI 缩放”相同，直接控制缩放比例。
* 添加了“player_speed”调试条目，以每刻方块数显示玩家速度。
* 调试覆盖层现在显示显示器刷新率。

### Creative Inventory
**创造模式物品栏**

* Reordered mineral item and block ordering to have non-tiered ingredients up first, then tiered ingredients that craft into equipment last.
* Improved ordering of Natural Blocks tab so that all inner ordering of group content sequentially progresses from Overworld -> Nether -> End to stay consistent with other tabs.

* 重新排列了矿物物品和方块的顺序，将非分级原料放在前面，将可合成装备的分级原料放在最后。
* 改进了“自然方块”选项卡的排序，使所有组内内容的顺序按“主世界 -> 下界 -> 末地”依次排列，以与其他选项卡保持一致。

### Technical Changes
**技术性更改**

* The Data Pack version is now 111.0.
* The Resource Pack version is now 92.0.
* Loot table types that have a dedicated registry now support registry element and tag references.
* Windowing and Input Backend: Minecraft now uses SDL3 instead of GLFW for window management, input and platform integration.
* Keyboard input now uses SDL scancodes for physical key positions and SDL keycodes for layout-dependent text editing shortcuts.

* 数据包版本现为 111.0。
* 资源包版本现为 92.0。
* 拥有专用注册表的战利品表类型现在支持注册表元素和标签引用。
* 窗口与输入后端：Minecraft 现在使用 SDL3 代替 GLFW 进行窗口管理、输入和平台集成。
* 键盘输入现在使用 SDL 扫描码来确定物理按键位置，并使用 SDL 键码来进行依赖于布局的文本编辑快捷键。

### Data Components
**数据组件**

* Added `minecraft:cooking_fuel`: Describes an item that can be used as fuel for a Furnace, Smoker or Blast Furnace.

* 添加了 `minecraft:cooking_fuel`：描述一种可用作熔炉、烟熏炉或高炉燃料的物品。
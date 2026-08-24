---
title: "Bevy 0.19"
originalUrl: "https://bevy.org/news/bevy-0-19/"
date: "2026-06-20T22:43:56.654Z"
---

# Bevy 0.19

**Next Generation Scenes | Render Big Scenes Faster! | Solari Improvements | More Feathers Widgets | Text Input | Contact Shadows | Physically Based Screen Space Reflections | Rectangular Area Lights | Richer text | App Settings | More Post-Processing Effects | Render Recovery | Render Graph as Systems | Improved Skinned Mesh Culling | Parallax Corrected Cubemaps | Partial Bindless / Reduced Bind Group Overhead | Diagnostics Overlay | Contiguous Query Access | Delayed Commands | Text Gizmos | Cancellable Web Tasks | Asset Saving | Resources as Components | Remote Entity Reservation | Interactive Transform Gizmo | Infinite Grid | White Furnace Test | Observer Run Conditions | Serializing and Deserializing Asset Handles | Self-Referential Relationships | Accessible Label Component | What's Next? | Support Bevy | Contributors**

下一代场景 | 更快地渲染大型场景！| Solari 改进 | 更多 Feathers 组件 | 文本输入 | 接触阴影 | 基于物理的屏幕空间反射 | 矩形区域光 | 更丰富的文本 | 应用设置 | 更多后期处理效果 | 渲染恢复 | 作为系统的渲染图 | 改进的蒙皮网格剔除 | 视差校正立方体贴图 | 部分无绑定/减少绑定组开销 | 诊断覆盖层 | 连续查询访问 | 延迟命令 | 文本 Gizmos | 可取消的 Web 任务 | 资源保存 | 作为组件的资源 | 远程实体预留 | 交互式变换 Gizmo | 无限网格 | 白炉测试 | 观察者运行条件 | 序列化和反序列化资源句柄 | 自引用关系 | 可访问标签组件 | 下一步计划？| 支持 Bevy | 贡献者

***

**Bevy 0.19**
**Posted on June 19, 2026 by Bevy Contributors**

**Bevy 0.19**
**发布于 2026 年 6 月 19 日，由 Bevy 贡献者撰写**

Fields of Aaru: a cozy life sim set in the mystical afterlife of Ancient Egypt. Made with Bevy!

《Fields of Aaru》：一款以古埃及神秘来世为背景的温馨生活模拟游戏。由 Bevy 制作！

Thanks to 261 contributors, 1185 pull requests, community reviewers, and our generous donors, we're happy to announce the Bevy 0.19 release on crates.io!

感谢 261 位贡献者、1185 个拉取请求、社区审阅者以及我们慷慨的捐赠者，我们很高兴地宣布 Bevy 0.19 在 crates.io 上发布了！

For those who don't know, Bevy is a refreshingly simple data-driven game engine built in Rust. You can check out our Quick Start Guide to try it today. It's free and open source forever! You can grab the full source code on GitHub. Check out Bevy Assets for a collection of community-developed plugins, games, and learning resources.

对于那些还不了解的人，Bevy 是一款用 Rust 构建的、令人耳目一新的简单数据驱动游戏引擎。您可以查看我们的“快速入门指南”立即尝试。它永远免费且开源！您可以在 GitHub 上获取完整的源代码。查看 Bevy Assets 获取社区开发的插件、游戏和学习资源集合。

To update an existing Bevy App or Plugin to Bevy 0.19, check out our 0.18 to 0.19 Migration Guide.

要将现有的 Bevy 应用或插件更新到 Bevy 0.19，请查看我们的“0.18 到 0.19 迁移指南”。

Since our last release a few months ago we've added a ton of new features, bug fixes, and quality of life tweaks, but here are some of the highlights:

自几个月前我们上次发布以来，我们添加了大量新功能、错误修复和体验优化，以下是一些亮点：

**Next Generation Scenes:** Our brand new, massively improved scene system for Bevy has finally landed! Ergonomically define scenes in our new BSN (Bevy Scene Notation) format in code via the bsn! macro or (in a future release) in assets. Scenes are composable, patchable, and dependency aware. No more manually pulling in all of the ECS and asset dependencies required to spawn something!

**下一代场景：** 我们为 Bevy 开发的全新、大幅改进的场景系统终于落地了！通过 bsn! 宏在代码中，或（在未来版本中）在资源文件中，以我们新的 BSN（Bevy 场景符号）格式符合人体工程学地定义场景。场景是可组合、可修补且具备依赖感知能力的。再也不需要手动引入生成对象所需的所有 ECS 和资源依赖项了！

**Render Bigger Scenes Faster:** We've moved even more work to the GPU and optimized the renderer in a number of areas. Bevy can draw even more things even faster!

**更快地渲染大型场景：** 我们将更多工作转移到了 GPU 上，并在多个领域优化了渲染器。Bevy 现在可以更快地绘制更多内容！

**Contact Shadows:** Shadow quality makes a huge difference to how "polished" your game looks. Bevy 0.19 adds contact shadows to the mix, dramatically improving shadow detail without the cost of full raytracing.

**接触阴影：** 阴影质量对游戏看起来有多“精致”有巨大影响。Bevy 0.19 加入了接触阴影，在无需全光线追踪成本的情况下，显著提升了阴影细节。

**More Feathers Widgets:** Bevy's opinionated "editor tooling" widget collection got a ton of new widgets. It was also ported to BSN, making it much more pleasant to use!

**更多 Feathers 组件：** Bevy 固有的“编辑器工具”组件集合增加了大量新组件。它还被移植到了 BSN，使用起来更加顺手！

**Text Input:** Bevy UI finally has upstream support for text entry via the new EditableText component.

**文本输入：** Bevy UI 终于通过新的 EditableText 组件获得了对文本输入的上游支持。

**Richer Text:** Bevy now has more flexible font selection, with support for higher level features like "font families" and variable font properties.

**更丰富的文本：** Bevy 现在拥有更灵活的字体选择，支持“字体族”和可变字体属性等更高级的功能。

**App Settings:** We've added an official "app settings" framework, which can load and save settings from files and expose them as ECS resources.

**应用设置：** 我们添加了一个官方的“应用设置”框架，可以从文件加载和保存设置，并将其作为 ECS 资源公开。

**Post Processing Effects:** We've added built in "vignette" and "lens distortion" post processing effects.

**后期处理效果：** 我们添加了内置的“晕影”和“镜头畸变”后期处理效果。

**Improved Skinned Mesh Culling:** Skinned meshes can now take their animations into account when they are being culled.

**改进的蒙皮网格剔除：** 蒙皮网格现在可以在剔除时考虑其动画状态。
---
title: "The 4% rule: picking app background colors that survive cheap phone screens"
originalUrl: "https://dev.to/daksh-gargas/the-4-rule-picking-app-background-colors-that-survive-cheap-phone-screens-346k"
date: "2026-08-02T22:18:42.542Z"
---

# The 4% rule: picking app background colors that survive cheap phone screens
# 4% 原则：如何选择在廉价手机屏幕上依然“存活”的背景色

Every design team eventually ships a beautiful off-white, off-blue, or off-anything background… and then opens the app on a $120 phone and watches it turn dirty gray. Same hex, same build. This post explains why, and gives you a small formula to convert any tint you've chosen into one that survives budget panels.
每个设计团队最终都会发布一个漂亮的灰白、灰蓝或任何带有微色调的背景……然后当你在一部 120 美元的手机上打开应用时，却发现它变成了脏灰色。同样的十六进制颜色代码，同样的构建版本。本文将解释其中的原因，并提供一个简单的公式，帮助你将选定的色调转换为在廉价屏幕上依然能保持效果的颜色。

### Why subtle tints die on cheap screens
### 为什么微妙的色调会在廉价屏幕上“死亡”

Four panel-level failure modes, all common in the budget tier:
在入门级设备中，常见的四种屏幕显示失效模式：

1. **Weak gamut coverage.** Entry-level LCDs cover only a fraction of sRGB — independent panel measurements routinely land in the 55–70% range, with large per-color error. A low-chroma tint simply doesn't have the budget to survive that compression.
1. **色域覆盖不足。** 入门级 LCD 屏幕仅能覆盖 sRGB 的一小部分——独立的屏幕测试通常显示其覆盖范围在 55%–70% 之间，且存在较大的色彩偏差。低饱和度的色调根本无法在如此严重的压缩下保持原样。

2. **Cold white points.** sRGB assumes a D65 white (6500K). Budget modules commonly ship visibly cooler — high-6000s to 9000K+ — because blue-ish whites look "brighter" in a store. That blue cast is spread across the entire grayscale, and its magnitude is comparable to a subtle warm tint. Net result: the panel can cancel your background color outright.
2. **冷色温白点。** sRGB 标准假设白点为 D65 (6500K)。廉价屏幕模块通常出厂色温明显偏冷（6000K 后段至 9000K 以上），因为偏蓝的白色在卖场里看起来更“亮”。这种蓝色调会覆盖整个灰阶，其强度足以抵消微妙的暖色调。最终结果：屏幕直接“抵消”了你的背景色。

3. **Stretched gamuts on budget AMOLED.** The opposite failure: "vivid" default modes stretch sRGB content across the panel's wider native gamut. Your quiet tint renders at roughly double saturation and suddenly has an opinion.
3. **廉价 AMOLED 的色域拉伸。** 相反的失效模式：“鲜艳”模式会将 sRGB 内容拉伸到屏幕更广的原生色域中。你原本柔和的色调会被渲染出双倍的饱和度，瞬间变得突兀。

4. **Banding.** Many cheap panels are 6-bit + FRC. Soft near-white gradients develop visible steps, which makes barely-different surface colors look like rendering bugs.
4. **色彩断层（Banding）。** 许多廉价屏幕是 6-bit + FRC。柔和的近白色渐变会出现明显的阶梯感，使得细微的表面颜色差异看起来像渲染错误。

---

### The 4% rule
### 4% 原则

You don't need a colorimeter to know if you're at risk. Use channel spread — the distance between your highest and lowest RGB channel — as a chroma proxy:
你不需要色度计就能判断自己是否处于风险中。使用通道跨度（最高 RGB 通道与最低 RGB 通道之间的差值）作为色度代理：

`spread = max(R, G, B) − min(R, G, B)`

If spread is under ~10 of 255 (≈4%), your tint is inside a cheap panel's error bar. It may render as intended, as gray, or as tinted the other direction — you don't get a vote. (Quick check on any hex: two outer pairs of digits within ~0x0A of each other = you're in the danger zone.)
如果跨度小于 255 中的约 10（≈4%），你的色调就处于廉价屏幕的误差范围内。它可能按预期显示，可能显示为灰色，也可能偏向相反的色调——你无法控制。 (快速检查十六进制代码：如果两个外侧的数字对彼此相差在 0x0A 以内，你就处于危险区。)

Why 4%? Because that's the same order of magnitude as the grayscale tint produced by a few-hundred-kelvin white-point error — the most common budget-panel defect. Your color and the panel's error are the same size, so the panel wins half the time.
为什么是 4%？因为这与几百开尔文的白点误差所产生的灰阶色偏处于同一数量级——这是最常见的廉价屏幕缺陷。你的颜色和屏幕的误差大小相当，所以屏幕有一半概率会“赢”。

---

### Converting your color: the budget-tier formula
### 转换颜色：入门级设备的公式

Don't pick a different color for cheap devices — that forks your brand. Derive the same hue at higher chroma:
不要为廉价设备选择不同的颜色——那会分裂你的品牌形象。在保持色相不变的情况下提高饱和度：

*   Take your canvas color.
*   Find `maxC` (highest channel), and each channel's distance from it: `d = maxC − channel`.
*   Pick a spread multiplier `k` — 2 if your spread is ≤4%, 1.2–1.5 if you're already near 5%.
*   Drop the ceiling a touch so cards can sit above the canvas in pure white: `maxNew = maxC − 4`.
*   Each new channel = `maxNew − d × k`.

*   获取你的画布颜色。
*   找到 `maxC`（最高通道值），以及每个通道与它的距离：`d = maxC − channel`。
*   选择一个跨度乘数 `k` —— 如果跨度 ≤4%，取 2；如果接近 5%，取 1.2–1.5。
*   稍微降低上限，以便卡片能以纯白色浮在画布之上：`maxNew = maxC − 4`。
*   每个新通道 = `maxNew − d × k`。

**Worked example** — say your designer chose a cool "paper blue" #F2F5FA:
**示例** — 假设设计师选择了一种冷色调的“纸张蓝” #F2F5FA：

*   Channels 242 / 245 / 250 → spread 8 (3.1%): danger zone.
*   k = 2, maxNew = 246.
*   R = 246 − (8×2) = 230 → E6
*   G = 246 − (5×2) = 236 → EC
*   B = 246 → F6
*   Budget variant: #E6ECF6 — spread 16 (6.3%), same hue, twice the presence, and pure #FFFFFF cards now sit a clear step above it.

*   通道 242 / 245 / 250 → 跨度 8 (3.1%)：危险区。
*   k = 2, maxNew = 246。
*   R = 246 − (8×2) = 230 → E6
*   G = 246 − (5×2) = 236 → EC
*   B = 246 → F6
*   廉价版变体：#E6ECF6 — 跨度 16 (6.3%)，色相相同，存在感加倍，且纯白色的 #FFFFFF 卡片现在能清晰地浮在它上方。

If you prefer perceptual tooling: convert to OKLCH, multiply C by ~2, subtract ~0.01 from L, keep H — same result with cleaner math. (Avoid HSL for this: its S value is wildly misleading near white.)
如果你更喜欢感知色彩工具：转换为 OKLCH，将 C 乘以约 2，从 L 中减去约 0.01，保持 H 不变——结果相同且计算更简洁。（避免使用 HSL：其 S 值在接近白色时极具误导性。）

---

### Ship it as tiers, not themes
### 按层级发布，而非主题

*   **Tier 1 — color-managed panels (iPhones, flagship Androids):** your original tint, near-white cards.
*   **Tier 2 — budget panels:** the converted tint, pure-white cards, hairlines nudged one step darker.
*   Everything else — ink, accent, type — stays identical. Users never see "a different theme"; they see the same brand, legible.

*   **第一层级 — 色彩管理屏幕（iPhone、旗舰安卓机）：** 使用原始色调，近白色卡片。
*   **第二层级 — 廉价屏幕：** 使用转换后的色调，纯白色卡片，细线稍微加深一级。
*   其他所有元素（墨色、强调色、字体）保持不变。用户不会看到“不同的主题”；他们看到的是同一个品牌，且清晰易读。

---

### Test on glass, not in Figma
### 在真机上测试，而不是在 Figma 里

Emulators show you your monitor's opinion. On the real device, at full brightness and ~40%:
模拟器显示的是你显示器的观点。在真实设备上，在全亮度和约 40% 亮度下测试：

*   Does the canvas read as a color — or as a white that needs cleaning?
*   Can you see where a card ends without tilting the phone?
*   Is a canvas→white gradient smooth, no steps?
*   Is your content (photos especially) still the warmest, richest thing on screen?

*   画布看起来是有颜色的，还是像一张需要清洗的脏白纸？
*   不倾斜手机时，你能看清卡片的边缘吗？
*   画布到白色的渐变是否平滑，没有阶梯感？
*   你的内容（尤其是照片）是否依然是屏幕上最温暖、最丰富的元素？

Four yeses on your cheapest test device and you're done.
在最廉价的测试设备上得到四个“是”，你就大功告成了。
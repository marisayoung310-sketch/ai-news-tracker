---
title: "How I built the fastest color manipulation library in TypeScript and the optimization techniques I learned"
originalUrl: "https://dev.to/dkryaklin/how-i-built-the-fastest-color-manipulation-library-in-typescript-and-the-optimization-techniques-i-56al"
date: "2026-04-30T22:42:14.019Z"
---

# How I built the fastest color manipulation library in TypeScript and the optimization techniques I learned

### Introduction
In 2025, I started building a color manipulation library called `colordx`. The frontend ecosystem is moving towards CSS Color 4: OKLCH, OKLab, Display-P3, Rec.2020. Most existing libraries were designed for the sRGB era and bolted modern color spaces on top. I wanted to build something that treats the modern stuff as a first-class citizen. But the goal I cared about most was performance. Not just "faster than colord" fast. I wanted `colordx` to be the fastest option in the benchmarks I cared about, and I wanted to actually understand why. This article is a short list of the optimization techniques that mattered the most. If you are working on a hot-path JavaScript library, I hope at least a few of these are useful.

### 简介
2025 年，我开始构建一个名为 `colordx` 的颜色处理库。前端生态系统正向 CSS Color 4 标准迈进：OKLCH、OKLab、Display-P3 和 Rec.2020。大多数现有的库都是为 sRGB 时代设计的，只是在原有基础上强行添加了对现代色彩空间的支持。我希望构建一个将现代色彩空间视为“一等公民”的库。但我最关心的目标是性能。不仅仅是“比 colord 快”那么简单，我希望 `colordx` 在我关注的基准测试中成为最快的选择，并且我想真正理解其中的原因。本文简要列出了对我而言最重要的优化技巧。如果你正在开发一个高频调用的 JavaScript 库，希望其中一些技巧对你有所帮助。

---

### Results first
| Benchmark | colordx | colord | culori | chroma-js | color |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Parse HEX → toHsl | 38 ns | 99 ns | 151 ns | 294 ns | 382 ns |
| Parse HEX → lighten → toHex | 64 ns | 176 ns | 206 ns | 850 ns | 1010 ns |
| Mix two colors | 102 ns | 759 ns | 1230 ns | 870 ns | 1900 ns |
| Parse HEX → toOklch | 271 ns | — | 287 ns | 916 ns | 534 ns |
| inGamutP3 | 202 ns | — | 1030 ns | — | — |

### 测试结果先行
（见上表）

---

### 1. Keep one canonical internal representation
Every `Colordx` instance stores exactly one thing: an `RgbColor` object `{ r, g, b, a }`. All conversions go through it. The reason is V8 monomorphism. The class has a fixed shape, so V8 always sees the same two fields on every method call. A library that stores different color models in different instances ends up with polymorphic inline caches everywhere, and JIT performance drops.

### 1. 保持单一的规范内部表示
每个 `Colordx` 实例只存储一件事：一个 `RgbColor` 对象 `{ r, g, b, a }`。所有的转换都通过它进行。原因在于 V8 的单态性（monomorphism）。该类具有固定的形状，因此 V8 在每次方法调用时看到的字段始终相同。如果一个库在不同的实例中存储不同的颜色模型，最终会导致到处都是多态内联缓存（polymorphic inline caches），从而降低 JIT 性能。

---

### 2. Don't use Object.create to skip the constructor
This was the single biggest win. My first version used `Object.create(Colordx.prototype)` in the internal factory to skip parsing. It looks clean but it is a trap. ES2022 classes with field declarations have a specific V8 hidden class transition chain. `Object.create` bypasses the constructor, so the field initialization transitions never fire. The resulting instance has a different hidden class than one created with `new Colordx()`. V8 sees two shapes flowing into every hot method, ICs go polymorphic, performance dies.

Fix: use a sentinel symbol so the constructor can skip parsing while still going through the proper field transition chain.

### 2. 不要使用 Object.create 来跳过构造函数
这是性能提升最大的一点。我的第一个版本在内部工厂函数中使用 `Object.create(Colordx.prototype)` 来跳过解析。这看起来很简洁，但却是一个陷阱。带有字段声明的 ES2022 类具有特定的 V8 隐藏类转换链。`Object.create` 会绕过构造函数，因此字段初始化转换永远不会触发。生成的实例与通过 `new Colordx()` 创建的实例具有不同的隐藏类。V8 会看到两种形状流入每个热点方法，导致 IC 变为多态，性能随之崩溃。

解决方法：使用一个哨兵符号（sentinel symbol），这样构造函数既可以跳过解析，又能走完正确的字段转换链。

---

### 3. Precomputed lookup tables for hex output
`toString(16).padStart(2, '0')` allocates a string every call. Precompute all 256 possibilities. Three array lookups instead of three string allocations. Borrowed from `color-bits`.

### 3. 为十六进制输出预计算查找表
`toString(16).padStart(2, '0')` 每次调用都会分配一个字符串。预计算所有 256 种可能性，用三次数组查找代替三次字符串分配。此技巧借鉴自 `color-bits`。

---

### 4. Bitwise hex parsing
`parseInt('ff', 16)` is slow because it is a general-purpose parser. Exploit the ASCII layout to decode a hex character with two integer ops: `(c & 0xf) + 9 * (c >> 6)`. Based on Lemire's technique.

### 4. 位运算十六进制解析
`parseInt('ff', 16)` 很慢，因为它是一个通用解析器。利用 ASCII 布局，通过两次整数运算即可解码十六进制字符：`(c & 0xf) + 9 * (c >> 6)`。基于 Lemire 的技术。

---

### 5. Reuse a module-level buffer when callers always destructure
`rgbToHslRaw` is the hot path for lighten, darken, saturate, etc. Every call would allocate a fresh `{ h, s, l, a }` object. But all internal callers immediately destructure the result, so there is no aliasing. So I reuse a single object. This works only because the function is internal and I control all callers. I would not expose this pattern in a public API.

### 5. 当调用者总是解构时，复用模块级缓冲区
`rgbToHslRaw` 是 lighten、darken、saturate 等操作的热点路径。每次调用都会分配一个新的 `{ h, s, l, a }` 对象。但所有内部调用者都会立即解构结果，因此不存在别名问题。所以我复用了一个单一对象。这之所以可行，是因为该函数是内部函数，且我控制了所有调用者。我不会在公共 API 中暴露这种模式。

---

### 6. Avoid closure allocation by hoisting helpers to module level
If a helper function is defined inside another function, V8 creates a new closure object on every call. Hoist it to module level and it is allocated once.

### 6. 通过将辅助函数提升到模块级来避免闭包分配
如果辅助函数定义在另一个函数内部，V8 每次调用都会创建一个新的闭包对象。将其提升到模块级，它就只会分配一次。

---

### 7. Inline conversions to avoid intermediate object allocation
`rgbToOklch` used to call `rgbToOklab` and destructure the result. The intermediate `OklabColor` object is pure overhead. Inlining the math saves one allocation per call. I usually hate duplicated code, but for short, well-tested math the allocation savings are real.

### 7. 内联转换以避免中间对象分配
`rgbToOklch` 过去会调用 `rgbToOklab` 并解构结果。中间的 `OklabColor` 对象纯属开销。内联数学运算可以节省每次调用的分配。我通常讨厌重复代码，但对于简短且经过充分测试的数学运算，节省分配带来的收益是实实在在的。

---

### 8. Provide *Into siblings for per-pixel work
For 500×500 OKLCH gradient renders (250k pixels per frame), the natural API allocates 500k–1M short-lived 3-tuples per frame. The GC pressure causes frame hitches during interactive drag. So every channel function has a sibling that writes into a caller-provided buffer. On a 250k-pixel chained OKLCH→P3 bench, allocations drop from ~9 MB/iter to ~500 kB/iter. Wall-clock is only ~5% better, but interactive renders become visibly smoother.

### 8. 为逐像素操作提供 *Into 后缀的兄弟函数
对于 500×500 的 OKLCH 渐变渲染（每帧 25 万像素），常规 API 每帧会分配 50 万到 100 万个短命的 3 元组。GC 压力会导致交互拖拽时的掉帧。因此，每个通道函数都有一个写入调用者提供缓冲区的兄弟函数。在 25 万像素的 OKLCH→P3 链式基准测试中，分配量从约 9 MB/次下降到约 500 kB/次。实际耗时仅提升了约 5%，但交互渲染变得明显更流畅了。

---

### 9. DRY the data, not the structure
Once I had both `oklabToLinear` and `oklabToLinearInto`, the obvious refactor was to make the allocating version delegate to the `*Into` version. It regressed the `*Into` path by ~20%. The reason was V8 polymorphism. External callers pass a `Float64Array`. The new wrapper passes a plain `[number, number, number]`. The `*Into` call site went from monomorphic to polymorphic, V8's speculative optimizations got disabled. The compromise: keep the math...

### 9. DRY（不要重复）数据，而不是结构
当我同时拥有 `oklabToLinear` 和 `oklabToLinearInto` 时，显而易见的重构是让分配版本委托给 `*Into` 版本。但这导致 `*Into` 路径的性能下降了约 20%。原因是 V8 的多态性。外部调用者传入的是 `Float64Array`，而新的包装器传入的是普通的 `[number, number, number]`。`*Into` 的调用点从单态变成了多态，V8 的推测性优化被禁用了。折中方案是：保留数学运算……
---
title: "HTML Can Do That"
originalUrl: "https://chrisburnell.com/html-can-do-that/"
date: "2026-08-19T21:53:45.138Z"
---

# HTML Can Do That

HTML has been gobbling up swathes of what used to be JavaScript’s remit. This page lists a bunch of dynamic functionality that we can now achieve with just HTML.

HTML 正在不断吞噬原本属于 JavaScript 的领域。本页面列出了一系列现在仅需 HTML 即可实现的动态功能。

---

### `<dialog>`
**Available since March 2022** (Chrome 37+, Edge 79+, Firefox 98+, Opera 24+, Safari 15.4+, etc.)

**2022 年 3 月起可用**（Chrome 37+、Edge 79+、Firefox 98+、Opera 24+、Safari 15.4+ 等）

Opened and closed entirely with `command` and `commandfor` HTML attributes that describe what command is being directed at which element, matched by `id`.

完全通过 `command` 和 `commandfor` HTML 属性进行打开和关闭，这些属性通过 `id` 匹配，描述了针对哪个元素执行什么命令。

```html
<button command="show-modal" commandfor="example-dialog">Open dialog</button>
<dialog id="example-dialog">
  <p>Look, Ma! No JavaScript!</p>
  <form method="dialog">
    <button type="submit">Close</button>
  </form>
</dialog>
```

---

### `popover`
**Available since January 2025** (Chrome 114+, Edge 114+, Firefox 125+, Opera 100+, Safari 17+, etc.)

**2025 年 1 月起可用**（Chrome 114+、Edge 114+、Firefox 125+、Opera 100+、Safari 17+ 等）

Light dismiss, Esc to close, no managing z-index to wrangle it onto a top layer. All managed with `popover` and `popovertarget` attributes in HTML.

支持轻触关闭、Esc 键关闭，无需管理 z-index 即可将其置于顶层。所有功能均通过 HTML 中的 `popover` 和 `popovertarget` 属性进行管理。

```html
<button popovertarget="example-popover">Toggle popover</button>
<div id="example-popover" popover>
  <p>Same deal as the &lt;dialog&gt; above: no JS, just HTML attributes!</p>
</div>
```

---

### Grouped `<details>`
**Available since September 2025** (Chrome 120+, Edge 120+, Firefox 130+, Opera 106+, Safari 17.2+, etc.)

**2025 年 9 月起可用**（Chrome 120+、Edge 120+、Firefox 130+、Opera 106+、Safari 17.2+ 等）

A shared `name` attribute turns a group of `<details>` into an exclusive accordion. Open one and the others close automatically. Magic!

共享的 `name` 属性可以将一组 `<details>` 元素变成互斥的手风琴组件。打开一个，其他的会自动关闭。简直是魔法！

```html
<details name="example-group">
  <summary>First</summary>
  <p>Open the second one and watch this close on its own.</p>
</details>
<details name="example-group">
  <summary>Second</summary>
  <p>First one’s hidden now.</p>
</details>
```

---

### `command` & `commandfor`
**Available since December 2025** (Chrome 135+, Edge 135+, Firefox 144+, Opera 120+, Safari 26.2+, etc.)

**2025 年 12 月起可用**（Chrome 135+、Edge 135+、Firefox 144+、Opera 120+、Safari 26.2+ 等）

**Note:** So far only `show-modal`, `close`, `request-close`, `toggle-popover`, `show-popover`, and `hide-popover` have landed stable in browsers. We can look forward to invokers supported in the future to increment/decrement values, interact with media elements, copy text, etc.

**注意：** 目前只有 `show-modal`、`close`、`request-close`、`toggle-popover`、`show-popover` 和 `hide-popover` 在浏览器中稳定可用。我们可以期待未来支持更多调用器（invokers），用于增减数值、交互媒体元素、复制文本等。

```html
<button command="show-popover" commandfor="example-command-popover">Open</button>
<button command="hide-popover" commandfor="example-command-popover">Close</button>
<div id="example-command-popover" popover>
  <p><code>show-popover</code> opens this and <code>hide-popover</code> closes it!</p>
</div>
```

---

### Native input pickers
**Available since March 2017** (Various browser versions)

**2017 年 3 月起可用**（各浏览器版本）

Colour, range, and date pickers, built right into the browser. Your mileage may vary with these elements; although, hand-written JS solutions tend to vary wildly, and I think we can expect form elements to receive more love over the coming years.

颜色、范围和日期选择器直接内置于浏览器中。这些元素在不同环境下的表现可能有所差异；尽管如此，手写的 JS 解决方案往往差异更大，我认为我们可以期待表单元素在未来几年得到更多的优化。

```html
<label>Colour <input type="color" value="#5f8aa6"></label>
<label>Range <input type="range" min="0" max="100" value="50"></label>
<label>Date <input type="date"></label>
```

---

### `<datalist>`
**Available since March 2019** (Chrome 20+, Edge 12+, Firefox 4+, etc.)

**2019 年 3 月起可用**（Chrome 20+、Edge 12+、Firefox 4+ 等）

**Note:** This isn’t yet supported across the board with all input types, e.g. colour or date inputs. Native autocomplete suggestions, no dropdown library required.

**注意：** 并非所有输入类型都全面支持此功能，例如颜色或日期输入。这是原生的自动补全建议，无需任何下拉菜单库。

```html
<label>Favourite HTML element 
  <input type="text" list="example-datalist">
</label>
<datalist id="example-datalist">
  <option value="a">
  <option value="abbr">
  <option value="address">
</datalist>
```

---

### `loading="lazy"`
**Available since March 2022** (Chrome 77+, Edge 79+, Firefox 75+, etc.)

**2022 年 3 月起可用**（Chrome 77+、Edge 79+、Firefox 75+ 等）

This image defers loading until it’s near the viewport. Not an `IntersectionObserver` in sight.

此图片会延迟加载，直到它接近视口。完全不需要 `IntersectionObserver`。

```html
<img src="/images/avatar@2x.jpeg" loading="lazy" width="200" height="200" alt="Avatar">
```

---

### `hidden="until-found"`
**Available since December 2025** (Chrome 102+, Edge 102+, Firefox 148+, etc.)

**2025 年 12 月起可用**（Chrome 102+、Edge 102+、Firefox 148+ 等）

Navigating to the fragment link below reveals the hidden section. The browser automatically removes `hidden="until-found"`.

导航到下方的片段链接会显示隐藏的部分。浏览器会自动移除 `hidden="until-found"` 属性。

```html
<a href="#example-until-found">Jump to hidden content</a>
<div id="example-until-found" hidden="until-found">
  <p>Yahaha! You found me!</p>
</div>
```

---

*Built by Chris Burnell for HTML Day 2026 during the Online Event run by Zachary Kai on Saturday, 8th August 2026.*

*由 Chris Burnell 为 2026 年 8 月 8 日星期六由 Zachary Kai 主办的 HTML Day 2026 在线活动制作。*
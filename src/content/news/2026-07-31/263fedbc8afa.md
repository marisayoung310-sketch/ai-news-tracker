---
title: "Building Progressively Enhanced Forms Using htmx"
originalUrl: "https://www.rafa.ee/articles/progressive-enhanced-forms-htmx/"
date: "2026-07-30T22:35:52.760Z"
---

# Building Progressively Enhanced Forms Using htmx
# 使用 htmx 构建渐进增强的表单

June 25, 2026; Free of LLM-generated text
2026 年 6 月 25 日；无 AI 生成内容

I recently built a new form for ties, with lots of interactivity. It’s for editing a bookmark and connecting it to lists: A screencast of a form for editing a bookmark. The user presses a button to rename the bookmark to the title fetched from the bookmarked website, then searches for lists to add the bookmark to. The feature uses progressive enhancement: it works without JS, but uses HTMX to add some niceties when JS is enabled. In this post, I’ll go through my approach and talk about a few things to keep in mind when building a UI in this style.
我最近为 ties 构建了一个交互性很强的新表单，用于编辑书签并将其关联到列表：这是一个编辑书签表单的录屏。用户按下按钮，将书签重命名为从目标网站获取的标题，然后搜索要添加书签的列表。该功能采用了渐进增强（progressive enhancement）：它在没有 JS 的情况下也能工作，但在启用 JS 时，会使用 HTMX 来增加一些便利性。在这篇文章中，我将分享我的方法，并讨论在这种 UI 风格下构建时需要注意的几点。

### Transient State
### 瞬态（Transient）状态

Interfaces that work without JS are fundamentally different from single page applications: updating the UI in response to user interactions will often require a roundtrip to the server (usually initiated by a `<a>` or `<form>` elements). Before the user completed their task and you’ve saved something to the database, you’ll have “transient state”: Input that the user entered, that isn’t persisted (yet), and that needs to survive this roundtrip.
无需 JS 即可工作的界面与单页应用（SPA）有着本质区别：响应用户交互来更新 UI 通常需要与服务器进行往返通信（通常由 `<a>` 或 `<form>` 元素发起）。在用户完成任务并将数据保存到数据库之前，你会遇到“瞬态状态”：即用户输入但尚未持久化的数据，这些数据需要能够在往返通信中存活下来。

One example from the form described above would be a new name for the bookmark. When the user hits the “rename” button, the name is sent to the server, and if there are validation errors, the server will return a response showing an error. The response includes the users input value, so they don’t have to type it again. In an SPA, transient state would live in JS memory, and you’d use some library with an unholy amount of dependencies to manage it. Since we’re making do without JS, we’ll have to use classic HTML features to manage this state, each with its own set of tradeoffs. Thinking about how this transient state flows through the system will help mapping complex interactions to HTML.
上述表单中的一个例子是书签的新名称。当用户点击“重命名”按钮时，名称会被发送到服务器；如果存在验证错误，服务器将返回包含错误的响应。该响应会包含用户输入的值，这样他们就不必重新输入。在 SPA 中，瞬态状态存在于 JS 内存中，你通常需要使用带有大量依赖项的库来管理它。既然我们不使用 JS，就必须利用经典的 HTML 特性来管理这种状态，每种方法都有其权衡。思考这种瞬态状态如何在系统中流动，将有助于将复杂的交互映射到 HTML 中。

### Form Values
### 表单值

This is used for the “rename” field from the example, and the most commonly used one. When the form is submitted, the server receives these values and can include them in its response so they don’t vanish when the user interacts with the server. It’s simple, and most likely the technique you’re already using for lots of user input. A drawback of this technique is that values will disappear if the user reloads the page. Another one is that values are only submitted for one form - if you have multiple forms on a single page, values from the other forms will vanish on submit. For example, the bookmark edit form above is split into two forms: one for renaming the bookmark, and another one assigning lists (I’ll go into the reasons for the split later on). You can work around this using HTMX, so users without JS will experience graceful degradation.
这是示例中“重命名”字段所使用的方法，也是最常用的方法。当表单提交时，服务器接收这些值并将其包含在响应中，这样当用户与服务器交互时，这些值就不会消失。这很简单，很可能也是你已经在处理大量用户输入时所使用的技术。该技术的缺点是，如果用户刷新页面，值就会丢失。另一个缺点是值仅针对单个表单提交——如果你在同一页面上有多个表单，其他表单的值在提交时会丢失。例如，上面的书签编辑表单被拆分为两个表单：一个用于重命名书签，另一个用于分配列表（我稍后会解释拆分的原因）。你可以使用 HTMX 来解决这个问题，从而确保没有 JS 的用户也能获得优雅降级的体验。

### Query Parameters and Paths
### 查询参数与路径

By putting state into the path or query parameters of the page, it will survive across page reloads. It will also survive bookmarking, being shared as a link, etc. This is a good usecase for e.g. search queries, like the “search for lists to connect” input in the form above. The most common ways to set the path and query parameters are links’ href attributes and forms’ action attributes. You can also use a form with the method="GET" attribute which will put all input values of that form into the query string. Lastly, you can use submit buttons’ formaction attributes to change the path and query parameters for a form only when a specific submit button is pressed. This one is super handy; I only learned about it while writing this post!
通过将状态放入页面的路径或查询参数中，它可以在页面刷新后存活。它还可以通过书签保存、作为链接分享等方式保留。这非常适合搜索查询等场景，例如上述表单中“搜索要关联的列表”输入框。设置路径和查询参数最常见的方法是链接的 `href` 属性和表单的 `action` 属性。你也可以使用 `method="GET"` 的表单，它会将该表单的所有输入值放入查询字符串中。最后，你可以使用提交按钮的 `formaction` 属性，仅在按下特定提交按钮时更改表单的路径和查询参数。这非常方便；我是在写这篇文章时才发现它的！

### Detecting Which Button Was Pressed
### 检测按下了哪个按钮

One thing that surprised me when building the new form for ties was that you have no control over what the enter button does; It just submits the first submit button of the form associated to the input. An accessible form is a keyboard-controllable one, so I ended up splitting the bookmark editing form into two, so hitting enter in the list search input would not rename the bookmark. To know which button a user pressed when submitting a form, you can use a buttons formaction attribute to change the path the form will submit to; Or you can set the name and value attributes of the button to send a specific form value to the server when that button was pressed.
在为 ties 构建新表单时，有一件事让我感到惊讶：你无法控制回车键的行为；它只会提交与输入框关联的表单中的第一个提交按钮。一个可访问的表单应该是可以通过键盘控制的，所以我最终将书签编辑表单拆分为两个，这样在列表搜索输入框中按回车就不会触发书签重命名。为了知道用户在提交表单时按下了哪个按钮，你可以使用按钮的 `formaction` 属性来更改表单提交的路径；或者你可以设置按钮的 `name` 和 `value` 属性，以便在按下该按钮时向服务器发送特定的表单值。

### Progressive Enhancement
### 渐进增强

To support users without JS, I find it easiest to write a whole feature without htmx first. This makes sure I don’t architect myself into a corner where I need to refactor later on when I find out something is not possible without JS. After that’s done, I sprinkle some htmx on top to improve the experience where JS is available. In my example above, this includes “active search” where users don’t need to hit enter to see search results, and a little spinner to show when the page is waiting for a response from the server. It usually surprises me how little htmx is really needed when I follow this approach. When testing changes later on, I disable JS using the browsers devtools, or I add a hx-disable attribute.
为了支持没有 JS 的用户，我发现最简单的方法是先在不使用 htmx 的情况下编写完整功能。这能确保我不会陷入架构困境，避免以后发现某些功能在没有 JS 时无法实现而需要重构。完成后，我再添加一些 htmx 来改善 JS 可用时的体验。在上面的例子中，这包括“主动搜索”（用户无需按回车即可看到搜索结果）以及在页面等待服务器响应时显示的小加载动画。当我遵循这种方法时，通常会惊讶于实际所需的 htmx 代码竟如此之少。在后续测试更改时，我会使用浏览器开发者工具禁用 JS，或者添加 `hx-disable` 属性。

### hx-target
### hx-target

I’m still figuring out the right way to scope htmx swaps. I’ve often found bugs because a too narrow part of the page was updated, leaving other parts of the page showing stale data. Fiddling with out-of-band swaps to solve this feels error prone and overly hard to maintain. I usually end up swapping the whole page as it’s least likely to break in the future. A downside of this is that sometimes user input will get lost during the swap, but that’s rare and usually acceptable.
我仍在探索界定 htmx 交换范围的正确方法。我经常发现一些 bug，因为页面更新的范围太窄，导致页面其他部分显示了过期数据。为了解决这个问题而折腾带外（out-of-band）交换感觉很容易出错且难以维护。我通常最终会选择交换整个页面，因为这样在未来最不容易出问题。这种方法的缺点是，有时用户输入会在交换过程中丢失，但这很少见，通常是可以接受的。

### Further Reading
### 延伸阅读

That’s it, I hope you took away something useful from this post! If you want find out whether this approach might be suitable for your next project, or if you are already using html/htmx and would like to learn more, here are some of my favorite resources. Alexander Petros’ blog “Unplanned Obsolescence” is a goldmine, with *Less htmx is more* and *Who’s Afraid of a Hard Page Load?* being good starting points. *How I use HTMX with Go* and *Django + htmx patterns* go into some patterns for using htmx in the backend. They translate well to other languages and ecosystems. *If not React, then what?* can help you decide.
以上就是全部内容，希望你从这篇文章中有所收获！如果你想了解这种方法是否适合你的下一个项目，或者你已经在尝试使用 html/htmx 并想深入学习，以下是我最喜欢的一些资源。Alexander Petros 的博客“Unplanned Obsolescence”是一个宝库，其中《Less htmx is more》和《Who’s Afraid of a Hard Page Load?》是很好的入门文章。《How I use HTMX with Go》和《Django + htmx patterns》探讨了一些在后端使用 htmx 的模式，这些模式同样适用于其他语言和生态系统。《If not React, then what?》可以帮助你做出决策。
---
title: "Phoenix LiveView 1.2"
originalUrl: "https://phoenixframework.org/blog/phoenix-liveview-1-2-released"
date: "2026-06-14T22:38:54.473Z"
---

# Phoenix LiveView 1.2

Phoenix LiveView 1.2 released! Posted on June 10th, 2026 by Steffen Deusch.
Phoenix LiveView 1.2 正式发布！由 Steffen Deusch 于 2026 年 6 月 10 日发布。

LiveView 1.2.0 is available now! To update from LiveView 1.1 to 1.2, simply update the version requirement in your mix.exs file and re-fetch your dependencies: `{:phoenix_live_view, "~> 1.2.0"}`
LiveView 1.2.0 现已可用！要从 LiveView 1.1 升级到 1.2，只需更新 `mix.exs` 文件中的版本要求并重新获取依赖项即可：`{:phoenix_live_view, "~> 1.2.0"}`

### Colocated CSS (同构 CSS)

In LiveView 1.1, we introduced Colocated Hooks and Colocated JavaScript, allowing you to write hooks directly inside any HEEx template. LiveView 1.2 builds on the background work done for `Phoenix.LiveView.ColocatedJS` to allow you to colocate CSS in HEEx too.
在 LiveView 1.1 中，我们引入了同构 Hooks 和同构 JavaScript，允许你直接在任何 HEEx 模板中编写 Hooks。LiveView 1.2 在 `Phoenix.LiveView.ColocatedJS` 的基础工作之上，进一步允许你在 HEEx 中实现 CSS 同构。

```elixir
def table(assigns) do
  ~H"""
  <style :type={MyApp.ColocatedCSS}>
    thead { color: ...; }
    tbody, tr:hover { ... }
  </style>
  <table>...</table>
  """
end
```

As with Colocated JS, the `:type` attribute tells LiveView to extract the content of the tag at compile time into a special `phoenix-colocated` folder in your `_build` directory. This is then picked up by your bundler (usually Tailwind or Esbuild) and processed as part of your normal CSS pipeline.
与同构 JS 一样，`:type` 属性告诉 LiveView 在编译时将标签内容提取到 `_build` 目录下的一个特殊的 `phoenix-colocated` 文件夹中。随后，它会被你的打包工具（通常是 Tailwind 或 Esbuild）拾取，并作为常规 CSS 流水线的一部分进行处理。

That’s the easy part though. What you usually want when defining colocated styles is to scope them, such that they don’t accidentally apply to other elements on the page from different components. Modern CSS has a relatively new `@scope` rule, which allows us to do just that, with some caveats.
但这只是简单部分。在定义同构样式时，你通常希望对其进行作用域限制（scope），以防止它们意外地应用到页面上其他组件的元素中。现代 CSS 有一个相对较新的 `@scope` 规则，它允许我们实现这一点，但也有一些注意事项。

### The `@scope` rule
### `@scope` 规则

```css
@scope (scope root) to (scope limit) { /* … */ }
```

The `@scope` rule accepts a root selector and an optional limit selector. If we are able to annotate the rendered HTML to include a unique attribute that identifies the “root” of a template and where it ends, we can have rules that only apply to that template. Since we control how HEEx compiles to HTML, we can do just that.
`@scope` 规则接受一个根选择器和一个可选的限制选择器。如果我们能够标注渲染后的 HTML，包含一个唯一属性来标识模板的“根”及其结束位置，我们就可以让规则仅应用于该模板。由于我们控制着 HEEx 如何编译为 HTML，我们完全可以做到这一点。

Let’s look at an example:
让我们看一个例子：

```elixir
attr :description, :string
slot :item
def my_list(assigns) do
  ~H"""
  <style :type={MyApp.ColocatedCSS}>
    p { font-weight: bold; }
  </style>
  <div>
    <p>{@description}</p>
    <ul>
      <li :for={item <- @item}>{render_slot(@item)}</li>
    </ul>
  </div>
  """
end
```

When we use this component in another template, like in your LiveView’s `render/1` function:
当我们像在 LiveView 的 `render/1` 函数中那样在另一个模板中使用此组件时：

```html
<p>Hello World</p>
<.my_list description="My List">
  <:item>
    <p>Item 1</p>
  </:item>
  <:item>
    Item 2
  </:item>
</.my_list>
```

the unmodified rendered HTML would look something like this:
未修改的渲染 HTML 看起来大致如下：

```html
<p>Hello World</p>
<div>
  <p>My List</p>
  <ul>
    <li>
      <p>Item 1</p>
    </li>
    <li>
      Item 2
    </li>
  </ul>
</div>
```

Now, to properly identify the parts of the HTML that belong to the `my_list` component, we need to annotate the boundaries of all templates:
现在，为了正确识别属于 `my_list` 组件的 HTML 部分，我们需要标注所有模板的边界：

```html
<p phx-r>Hello World</p>
<div phx-r phx-css-foo>
  <p>My List</p>
  <ul>
    <li>
      <p phx-r>Item 1</p>
    </li>
    <li>
      Item 2
    </li>
  </ul>
</div>
```

We use a special `phx-r` attribute which is added to all outermost elements of a template and which can be used as the limit selector in a `@scope` rule. Note that we used a slot in the example above. The `<p>Item 1</p>` does not belong to `my_list`‘s template, but to the caller instead. Therefore, it is also considered a “root” and gets a `phx-r` attribute.
我们使用一个特殊的 `phx-r` 属性，它被添加到模板的所有最外层元素中，并可用作 `@scope` 规则中的限制选择器。请注意，我们在上面的示例中使用了插槽（slot）。`<p>Item 1</p>` 不属于 `my_list` 的模板，而是属于调用者。因此，它也被视为一个“根”，并获得一个 `phx-r` 属性。

Then, because `my_list` uses scoped colocated CSS, its root elements (it only has a single one in this example) also get a unique `phx-css-*` attribute. Combined, this allows us to write the following CSS:
然后，因为 `my_list` 使用了作用域同构 CSS，其根元素（在本例中只有一个）也会获得一个唯一的 `phx-css-*` 属性。结合起来，这允许我们编写以下 CSS：

```css
@scope ([phx-css-foo]) to ([phx-r]) {
  p { font-weight: bold; }
}
```

With this rule, only `p` tags that belong to `my_list`‘s template will be rendered bold, while any other `p` tags on the page are unaffected.
使用此规则，只有属于 `my_list` 模板的 `p` 标签会被渲染为粗体，而页面上的任何其他 `p` 标签则不受影响。

LiveView does not automatically inject the `phx-r` attribute. Instead, it is opt-in with a new compile-time configuration:
LiveView 不会自动注入 `phx-r` 属性。相反，它需要通过一个新的编译时配置来启用：

```elixir
config :phoenix_live_view,
  # the attribute set on all root tags. Used for Phoenix.LiveView.ColocatedCSS.
  root_tag_attribute: "phx-r"
```

### We don’t ship scoping by default
### 我们默认不提供作用域功能

With all that effort for colocated CSS, you might be startled when you hear that we don’t actually ship scoping in LiveView 1.2. The reason is that the `@scope` rule is not yet well supported across browsers at the time of writing (June 2026). Instead, we ship a `@behaviour` you can implement to do custom scoping, which also allows you to use different strategies. We do have the `@scope` implementation in the docs if you decide to be an early adopter.
尽管为同构 CSS 付出了这么多努力，但当你听说 LiveView 1.2 实际上并未默认提供作用域功能时，可能会感到惊讶。原因在于，在撰写本文时（2026 年 6 月），`@scope` 规则在各浏览器中的支持度尚不理想。相反，我们提供了一个你可以实现的 `@behaviour` 来进行自定义作用域，这也允许你使用不同的策略。如果你决定成为早期采用者，我们确实在文档中提供了 `@scope` 的实现方案。

### Small improvements landing in 1.2
### 1.2 版本中的小改进

*   You can now implement a `Phoenix.LiveView.HTMLFormatter.TagFormatter` behaviour to format `<script>` and `<style>` tags in HEEx with a tool of your choice. We have an example using prettier in the documentation.
    你现在可以实现 `Phoenix.LiveView.HTMLFormatter.TagFormatter` 行为，使用你选择的工具来格式化 HEEx 中的 `<script>` 和 `<style>` 标签。我们在文档中提供了一个使用 prettier 的示例。
*   `Phoenix.LiveView.JS` structs are now automatically encoded when sent with `push_event` if you use either Jason or the built-in JSON module. You can also call `JS.to_encodable/1` to encode them to a string yourself.
    如果你使用 Jason 或内置的 JSON 模块，`Phoenix.LiveView.JS` 结构体在通过 `push_event` 发送时现在会自动编码。你也可以调用 `JS.to_encodable/1` 自行将其编码为字符串。
*   HEEx debug annotations can now be configured per module by setting the `@debug_heex_annotations` and `@debug_attributes` module attributes.
    HEEx 调试注解现在可以通过设置 `@debug_heex_annotations` 和 `@debug_attributes` 模块属性来按模块进行配置。
*   Test warnings can now be configured by category.
    测试警告现在可以按类别进行配置。
*   We now have separate documentation for the JavaScript client and some more which can be found in the changelog.
    我们现在为 JavaScript 客户端提供了单独的文档，更多内容可以在更新日志中找到。

If you have feedback, please don’t hesitate to post a thread on the Elixir forum or contact me on BlueSky. If you find any issues or bugs, please open up an issue.
如果你有任何反馈，请随时在 Elixir 论坛上发帖或在 BlueSky 上联系我。如果你发现任何问题或 Bug，请提交 Issue。

Thank you to Dashbit for sponsoring this work! Happy coding! -Steffen
感谢 Dashbit 对这项工作的赞助！祝编码愉快！-Steffen
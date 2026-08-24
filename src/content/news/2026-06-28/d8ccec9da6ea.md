---
title: "Guards! Guards"
originalUrl: "https://hauleth.dev/post/guards-guards/"
date: "2026-06-27T22:37:03.050Z"
---

# Guards! Guards!

Let's start with a simple quiz. Given a module defined as:
让我们从一个简单的测验开始。假设定义了如下模块：

```elixir
defmodule Foo do
  def a(x) when is_integer(x) or is_map_key(x, :foo), do: true
  def a(x), do: false

  def b(x) when is_map_key(x, :foo) or is_integer(x), do: true
  def b(x), do: false
end
```

Try to answer these questions.
试着回答以下问题。

**Q: What will be the result of `Foo.a(%{foo: 21})`?**
**问：`Foo.a(%{foo: 21})` 的结果是什么？**

*   true
*   false

**WRONG / RIGHT**
**错误 / 正确**

This one is straightforward. We check the guard; it has one condition: `is_integer(x) or is_map_key(x, :foo)`. The first one returns `false`, the second returns `true`. The Boolean alternative results in `true`, and the first case is matched.
这道题很简单。我们检查守卫（guard），它有一个条件：`is_integer(x) or is_map_key(x, :foo)`。第一个条件返回 `false`，第二个返回 `true`。布尔“或”运算的结果为 `true`，因此匹配第一个子句。

**Q: What will be the result of `Foo.a(37)`?**
**问：`Foo.a(37)` 的结果是什么？**

*   true
*   false

**WRONG / RIGHT**
**错误 / 正确**

This one is straightforward as well. We check the guard; it has one condition: `is_integer(x) or is_map_key(x, :foo)`. The first one returns `true`, the second one isn't fired at all because the `or` operator is short-circuiting.
这道题同样简单。我们检查守卫，条件是 `is_integer(x) or is_map_key(x, :foo)`。第一个条件返回 `true`，第二个条件根本不会执行，因为 `or` 运算符具有短路特性。

**Q: What will be the result of `Foo.b(%{foo: 21})`?**
**问：`Foo.b(%{foo: 21})` 的结果是什么？**

*   true
*   false

**WRONG / RIGHT**
**错误 / 正确**

Again, similar to the previous questions. We check the guard; it has one condition: `is_map_key(x, :foo) or is_integer(x)`. The first one returns `true` and the rest is short-circuited.
同样，这与前面的问题类似。我们检查守卫，条件是 `is_map_key(x, :foo) or is_integer(x)`。第一个条件返回 `true`，其余部分被短路。

**Q: What will be the result of `Foo.b(37)`?**
**问：`Foo.b(37)` 的结果是什么？**

*   true
*   false

**WRONG / RIGHT**
**错误 / 正确**

Ouch, something changed… Again, we check the guard, one condition is `is_map_key(x, :foo) or is_integer(x)`. We hit the first clause `is_map_key(x, :foo)`, and this doesn't return `false`, instead it fails. Failure in one of the guard functions isn't converted to `false` but instead makes the whole guard expression fail. This means that the `is_integer(x)` part will never be called.
哎呀，情况变了……我们再次检查守卫，条件是 `is_map_key(x, :foo) or is_integer(x)`。我们执行第一个子句 `is_map_key(x, :foo)`，它没有返回 `false`，而是直接报错（fail）。守卫函数中的错误不会被转换为 `false`，而是会导致整个守卫表达式失败。这意味着 `is_integer(x)` 部分永远不会被调用。

This behaviour is often surprising for a lot of Elixir developers, as it seemingly breaks the commutative property of boolean operators. However, to be honest, these never were commutative because of short-circuiting.
这种行为经常让许多 Elixir 开发者感到惊讶，因为它似乎破坏了布尔运算符的交换律。然而，老实说，由于短路机制的存在，它们从来都不是可交换的。

It seems that Elixir at the time of writing (Elixir 1.20.1, OTP 29) does not warn about this issue.
看起来在撰写本文时（Elixir 1.20.1, OTP 29），Elixir 并未针对此问题发出警告。
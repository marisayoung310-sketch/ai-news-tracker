---
title: "python's pre-declared constants are kinda weird"
originalUrl: "https://sebsite.pw/w/20260801-pythonconstants.html"
date: "2026-08-13T22:39:06.199Z"
---

# Python's pre-declared constants are kinda weird

**Python's pre-declared constants are kinda weird**
Python 有 6 个预定义的“常量”：`True`、`False`、`None`、`__debug__`、`Ellipsis`（等同于 `...`）以及 `NotImplemented`。但出于某种原因，它们的行为各不相同。

**True, False, and None**
`True`、`False` 和 `None` 是关键字。它们不是标识符，而是直接作为词法记号（lexical tokens）存在。这非常奇怪；在 Python 中没有其他东西是这样的。通常，名称是在常规名称解析过程中解析的，而不是在词法分析器（lexer）本身中。一个有趣的副作用是，像 `x.True` 这样的表达式会引发 `SyntaxError`。我很好奇这个决定的理由是什么（如果有的话）。关于这些常量还有一些更有趣的事情，但我稍后再谈，因为它们与其他常量有关。

**__debug__**
`__debug__` 是一个布尔常量：它通常为 `True`，但在使用 `-O` 标志运行时为 `False`。这个想法类似于在非调试构建中禁用 `assert`：如果检查在“优化”构建中开销太大，你可以将代码包裹在 `if __debug__` 中。不过 `__debug__` 非常有趣，因为它虽然是一个普通标识符（不像 `True`、`False` 和 `None`），但它是语言中唯一不能被赋值的标识符：
```python
>>> __debug__ = 67
File "<stdin>", line 1
SyntaxError: cannot assign to __debug__
```
你甚至不能将其作为属性赋值：
```python
>>> x.__debug__ = 67
File "<stdin>", line 1
SyntaxError: cannot assign to __debug__
```
同样，没有其他标识符有这种行为。这是一个真正的特例。但因为它不是关键字，所以它的行为与 `True`、`False` 和 `None` 略有不同：`x.__debug__` 会引发 `AttributeError`（而不是 `SyntaxError`），因为它在语法上是有效的；它只是在查找一个不存在的属性。有趣的是，尝试删除 `__debug__` 还有一个特殊的错误消息（尽管如果不是因为这个特例，这本来会引发 `NameError`），但这不适用于删除名为 `__debug__` 的属性：
```python
>>> del __debug__
File "<stdin>", line 1
SyntaxError: cannot delete __debug__
>>> del x.__debug__
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'x' is not defined
```
如果定义了 `x`，则会引发 `AttributeError`。无论哪种情况，出于某种原因，它都不是 `SyntaxError`（与赋值不同）。

**Tangent: SyntaxError is a lie**
说到错误：给 `__debug__` 赋值是我所知道的少数几个尽管语法本身并不无效，却引发 `SyntaxError` 的情况之一。在这里，你可以亲自验证：
```python
>>> assert (__debug__ := 67)
```
在调试构建中运行该断言会引发 `SyntaxError`，但使用 `-O` 时，断言不会被编译，因此不会引发异常。另外两个例子是在函数外部使用 `yield` 或 `await`：
```python
>>> assert (yield)
>>> assert (await 67)
```

**Ellipsis and NotImplemented**
`Ellipsis` 和 `NotImplemented` 在参考手册的“常量”部分有记录，但与其他 4 个常量不同，它们不是“真正的”常量。它们只是普通的内置对象，因此可以被全局变量遮蔽：
```python
>>> NotImplemented = 67
>>> NotImplemented
67
```
同样，我对这里的基本原理感到好奇。为什么它们不是特殊的，而其他常量却是？

**Overwriting constants**
这里有一件有趣的事情：尽管是词法记号，`True`、`False` 和 `None` 也作为普通内置对象存在：
```python
>>> import builtins
>>> getattr(builtins, 'True')
True
>>> getattr(builtins, 'False')
False
>>> getattr(builtins, 'None') is None
True
```
如果不使用 `getattr`，就没有办法直接访问它们。但有趣的地方来了：`setattr` 也可以工作！
```python
>>> setattr(builtins, 'True', 67)
>>> getattr(builtins, 'True')
67
```
然而，当使用词法记号访问时，这并不会改变值：
```python
>>> True
True
```
但 `__debug__` 具有相同的行为！
```python
>>> setattr(builtins, '__debug__', 67)
>>> builtins.__debug__
67
>>> __debug__
True
```
所以 `__debug__` 在某种程度上可以被赋值，但尽管它不是词法记号，它却像 `True`、`False` 和 `None` 一样被特殊处理：它的值不受 `builtins` 模块更改的影响。所以它确实是一个常量！而 `Ellipsis` 和 `NotImplemented` 再次证明它们实际上不是常量：
```python
>>> setattr(builtins, 'Ellipsis', 67)
>>> Ellipsis
67
```
但这并不会改变 `...` 的值：
```python
>>> ...
Ellipsis
```
所以从某种意义上说，`...` 是一个真正的常量，但 `Ellipsis` 却不是。很奇怪，对吧？
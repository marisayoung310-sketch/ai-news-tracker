---
title: "You Must Fix Your Asserts"
originalUrl: "https://kristoff.it/blog/fix-your-asserts/"
date: "2026-05-31T22:37:37.385Z"
---

# You Must Fix Your Asserts
# 你必须修复你的断言 (Asserts)

Fear is the killer of the mind ...and the codebase as well. A user on a discussion platform wrote: "I think 'disabling asserts in prod' is a pretty common technique, yeah?" As far as I know that is probably a correct statement, but I believe it to be an irredeemably bad practice. Let’s start with some context first, since this discussion started because of how `std.debug.assert` works in Zig.

恐惧是思维的杀手……也是代码库的杀手。一位用户在讨论平台上写道：“我认为‘在生产环境中禁用断言’是一种很常见的做法，对吧？”据我所知，这可能是一个事实，但我认为这是一种无可救药的糟糕实践。让我们先从背景谈起，因为这场讨论源于 Zig 中 `std.debug.assert` 的工作方式。

### Asserts in general
### 关于断言 (Asserts)

An assert is a line of code that introduces a new fact to the program, such as “this argument can never be null”, or “this integer can never be even”, and they kinda look like this: `assert(my_arg != null); assert(my_num % 2 != 0);` If your type system can be used to enforce one of these constraints, then you will probably want to use the facilities in your language rather than asserts. For example, in Zig normal pointers (e.g. `*Foo`) can never be null, while optional pointers (`?*Foo`) can, but they also force you to check before you can access the value (and for which Zig has dedicated idioms).

断言是一行向程序引入新事实的代码，例如“此参数绝不为空”或“此整数绝不为偶数”，它们看起来像这样：`assert(my_arg != null); assert(my_num % 2 != 0);` 如果你的类型系统可以用来强制执行这些约束，那么你通常应该使用语言本身提供的功能，而不是断言。例如，在 Zig 中，普通指针（如 `*Foo`）绝不为空，而可选指针（`?*Foo`）则可以为空，但它们也强制你在访问值之前进行检查（Zig 为此提供了专门的惯用法）。

Asserts can be used to explicitly state pre/post conditions and invariants in your code. This is useful because, if you pick good assertions, those will be able to protect you from programming mistakes better than unit tests, especially if you fuzz your code. An assert is worth a thousand unit tests (and orders of magnitude more than that if you fuzz), but that’s a story for a follow-up post.

断言可用于显式声明代码中的前置/后置条件和不变量。这很有用，因为如果你选择了好的断言，它们比单元测试更能保护你免受编程错误的影响，尤其是当你对代码进行模糊测试（fuzzing）时。一个断言胜过一千个单元测试（如果进行模糊测试，效果更是指数级提升），但这将是后续文章的主题。

### Asserts in Zig
### Zig 中的断言

Asserts in Zig are based on `unreachable`, a language feature that marks invalid code paths.
Zig 中的断言基于 `unreachable`，这是一个标记无效代码路径的语言特性。

```zig
const Op = enum { a, b, c }; 
fn execute(orig_op: Op) void { 
    var op = orig_op; 
    if (op == .a) { 
        op = .b; // turn .a into .b 
    } 
    const op_cost = switch(op) { 
        .a => unreachable, // impossible to reach 
        .b => 50, 
        .c => 100, 
    }; 
    // finalize op 
}
```

In this example the `.a` case is always mutated into a `.b` case by the `if` statement which means that, once we reach the `switch`, it’s impossible to enter the `.a` case. Another neat property of `unreachable` is that it can be used as a statement, but it is also valid anywhere an expression (of any type) is expected. In the example above we’re computing the “cost” of an operation, and it might be that it doesn’t even make sense for `.a` to have an associated cost. Thanks to `unreachable` we don’t even have to come up with an awkward placeholder value for a case that can never happen anyway. Zig’s stdlib `assert` function also leverages `unreachable` and is implemented as follows: `pub fn assert(ok: bool) void { if (!ok) unreachable; // assertion failure }`

在这个例子中，`.a` 情况总是被 `if` 语句修改为 `.b` 情况，这意味着一旦我们到达 `switch`，就不可能进入 `.a` 分支。`unreachable` 的另一个巧妙之处在于，它既可以用作语句，也可以用在任何期望表达式（任何类型）的地方。在上面的例子中，我们正在计算操作的“成本”，而 `.a` 拥有关联成本可能根本没有意义。多亏了 `unreachable`，我们甚至不需要为永远不会发生的情况想出一个尴尬的占位符值。Zig 的标准库 `assert` 函数也利用了 `unreachable`，实现如下：`pub fn assert(ok: bool) void { if (!ok) unreachable; // 断言失败 }`

### Build modes
### 构建模式

Zig has multiple build modes: Debug, ReleaseSafe, ReleaseFast, ReleaseSmall. This is not a setting that is necessarily global to your program: every dependency can be built in a different mode and you can even use `@setRuntimeSafety` for block-level granularity within a single function. When an assert is tripped “illegal behavior” occurs. Checked modes (Debug, ReleaseSafe, `@setRuntimeSafety(true)`) guarantee a crash of your program by panicking, while unchecked modes (ReleaseFast, ReleaseSmall, `@setRuntimeSafety(false)`) incur “unchecked illegal behavior”. In short, unchecked illegal behavior means that the program will misbehave.

Zig 有多种构建模式：Debug、ReleaseSafe、ReleaseFast、ReleaseSmall。这不一定是全局设置：每个依赖项都可以以不同的模式构建，你甚至可以使用 `@setRuntimeSafety` 在单个函数内实现块级粒度的控制。当断言被触发时，会发生“非法行为”。检查模式（Debug、ReleaseSafe、`@setRuntimeSafety(true)`）通过恐慌（panic）保证程序崩溃，而未检查模式（ReleaseFast、ReleaseSmall、`@setRuntimeSafety(false)`）则会导致“未检查的非法行为”。简而言之，未检查的非法行为意味着程序将出现异常表现。

### Zig asserts are not macros
### Zig 的断言不是宏

When approaching Zig, one thing that surprises C/C++ developers especially, is the fact that `std.debug.assert` is not a macro (and FYI Zig doesn’t have macros). In those languages, it is common to disable assertions in a way which essentially acts as though every call to assert had been commented out, including whatever expression is passed to the macro. This means that in C/C++ you should never put an expression with side effects into a call to assert, as that whole operation will be commented out when asserts are disabled. In Zig this is just not a thing because `std.debug.assert` is a normal function, which means that its arguments are evaluated before calling it no matter what the logic inside the function is.

在接触 Zig 时，令 C/C++ 开发者感到惊讶的一点是，`std.debug.assert` 不是宏（顺便说一下，Zig 没有宏）。在那些语言中，通常以一种方式禁用断言，其效果就像是把每个断言调用都注释掉了一样，包括传递给宏的任何表达式。这意味着在 C/C++ 中，你永远不应该把带有副作用的表达式放入断言调用中，因为当断言被禁用时，整个操作都会被注释掉。在 Zig 中，这种情况不存在，因为 `std.debug.assert` 是一个普通函数，这意味着无论函数内部逻辑如何，其参数在调用前都会被求值。
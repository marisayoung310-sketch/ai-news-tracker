---
title: "a bunch of stuff i used to not know about K&R C"
originalUrl: "https://sebsite.pw/w/20260712-kandr.html"
date: "2026-07-15T22:24:22.060Z"
---

# a bunch of stuff i used to not know about K&R C
# 关于 K&R C 我以前不知道的一些事

2026-07-12 ok so i've been reading the "specification" from "the c programming language" (1st edition). alongside that, i've also been reading the c89 rationale document, and the source code for the 7th edition unix c compiler. i've also been reading some other related stuff. and i didn't really know anything about pre-ansi c until i did this research, but i found a bunch of stuff, so i'm documenting my findings here :3

2026-07-12 最近我一直在阅读《C 程序设计语言》（第一版）中的“规范”。与此同时，我还阅读了 C89 的基本原理文档以及第七版 Unix C 编译器的源代码，还看了一些其他相关资料。在做这些研究之前，我对 ANSI C 之前的 C 语言几乎一无所知，但我发现了很多有趣的东西，所以在这里记录一下我的发现 :3

wait hang on real quick before i get started here's a thing i thought about so, c's grammar is context-sensitive and ambiguous and Bad; we already know this. but in the context of c's development, it kinda makes sense actually. well, ok, it doesn't make "sense", but it's more justifiable. the original c compiler was a single-pass compiler. that was one of c's things actually, that it was even possible to write a single-pass compiler for it -- that was a necessity for a heavily memory-constrainted system like the ones they were working with. and if you're writing a single-pass compiler, then, by necessity, you're already keeping track of scopes and identifiers and stuff while parsing. so the fact that the grammar changes depending on whether or not an identifier refers to a typedef really doesn't matter, since it's not much any extra work to just check; you'll need to check at some point anyway.

等等，在开始之前，我先说一个我的想法：C 语言的语法是上下文相关的、有歧义的，而且很糟糕；这一点我们都知道。但在 C 语言发展的背景下，这其实是有道理的。好吧，说“有道理”可能不太准确，但至少是可以辩解的。最初的 C 编译器是一个单遍（single-pass）编译器。事实上，C 语言的特点之一就是能够为其编写单遍编译器——这对于他们当时工作的内存极其受限的系统来说是必须的。如果你在编写单遍编译器，那么在解析时，你必然已经在跟踪作用域、标识符等信息了。因此，语法是否会根据标识符是否指向 typedef 而改变其实并不重要，因为进行检查并不会增加多少额外工作；反正你迟早都要检查。

in modern c, this is really hard to handle correctly because of its fucked up scoping rules, particularly that you can have a discontinuous scope if you have a nested function declarator in the prototype of a function definition. but in k&r c, this is a non-issue, since function prototype scope isn't a thing at all! so, like, don't get me wrong, c's grammar is awful and bad and not good. and the context-sensitivity was a mistake. but, i can understand where it came from, and how it did the job well in a historical context. anyway here's the actually interesting stuff:

在现代 C 语言中，由于其混乱的作用域规则，这很难正确处理，特别是如果你在函数定义的原型中嵌套了函数声明符，就会出现不连续的作用域。但在 K&R C 中，这不是问题，因为根本就没有函数原型作用域这回事！所以，别误会，C 语言的语法确实很糟糕、很烂、不好用，上下文相关性也是个错误。但我能理解它的由来，以及它在历史背景下是如何出色地完成任务的。总之，下面是真正有趣的内容：

void is an ansi invention, apparently maybe this is common knowledge, but it surprised me. i guess there wasn't really a need for it back then: functions implicitly returned int, but if you didn't want to return anything meaningful, you could just not use a return statement, or use return without an expression. and all pointers were assignable to all other pointers, so char * could be used for "generic" pointers

`void` 原来是 ANSI 的发明，这可能是一个常识，但还是让我感到惊讶。我想当时确实不需要它：函数默认返回 `int`，如果你不想返回任何有意义的值，只需不使用 `return` 语句，或者使用不带表达式的 `return` 即可。而且所有指针都可以赋值给其他所有指针，所以 `char *` 可以用作“通用”指针。

different floating point types there was no long double, however, there was long float, which was a synonym for double. i'm really curious what the history/rationale of this was. long double makes sense because it avoids adding a new keyword, and long float would make sense if double wasn't a keyword, but the fact that both can be used interchangeably is weird to me

关于不同的浮点类型，当时没有 `long double`，但有 `long float`，它是 `double` 的同义词。我很好奇这背后的历史和原理。`long double` 有意义，因为它避免了增加新关键字；如果 `double` 不是关键字，`long float` 也有意义，但两者可以互换使用这一点让我觉得很奇怪。

some more interesting stuff with type specifiers there was no signed specifier; only unsigned. furthermore, there were much fewer valid combinations of type specifiers: unsigned, short, and long acted as "adjectives" to be used alongside int (or float in the case of long float). so, long wasn't valid, but long int was. the order didn't matter, so int long was also valid. likewise, unsigned int was a thing, but unsigned wasn't, and neither was unsigned char. there could also be only one adjective, so, for example, there was no unsigned short int (some later compilers implemented other unsigned types as extensions; more on that in a bit). so like, the idea was that you'd almost always use signed integers, except that char was either signed or unsigned depending on what was most efficient for the target, and int could also be made unsigned. this surprised me.

关于类型说明符还有一些更有趣的事情：当时没有 `signed` 说明符，只有 `unsigned`。此外，有效的类型说明符组合要少得多：`unsigned`、`short` 和 `long` 充当“形容词”，与 `int`（或 `long float` 中的 `float`）一起使用。所以，单独的 `long` 无效，但 `long int` 有效。顺序无关紧要，所以 `int long` 也有效。同样，`unsigned int` 是合法的，但单独的 `unsigned` 无效，`unsigned char` 也不行。而且只能有一个形容词，例如，没有 `unsigned short int`（一些后来的编译器将其他无符号类型作为扩展实现；稍后会详细说明）。所以，当时的理念是，你几乎总是使用有符号整数，除非 `char` 根据目标平台最高效的方式决定是有符号还是无符号，而 `int` 也可以被设为无符号。这让我很惊讶。

different behavior for integer promotion speaking of unsigned: so, the dialect of c documented in "the c programming language" only allows the unsigned specifier alongside int. but later compilers allowed unsigned short int and unsigned long int (and possibly unsigned char?) as extensions. but the thing is, since there wasn't a standard, no one could agree on how integer promotion should work with unsigned integers. this wasn't documented in k&r (since it wasn't relevant), so two diverging practices emerged: "unsigned preserving" and "value preserving". so like, assume sizeof(short int) < sizeof(int). now, what's the result of the expression -1 < (unsigned short int)0? "unsigned preserving" implementations would say the result is 0 (false), since the operands are promoted to unsigned int. "value preserving" implementations would say the result is 1, since all possible unsigned short values fit within (signed) int, so it's made signed.

关于整数提升的不同行为：说到 `unsigned`，在《C 程序设计语言》中记录的 C 方言只允许 `unsigned` 与 `int` 一起使用。但后来的编译器将 `unsigned short int` 和 `unsigned long int`（可能还有 `unsigned char`？）作为扩展允许使用。问题在于，由于没有标准，没人能就无符号整数的整数提升方式达成一致。K&R 中没有记录这一点（因为它当时不相关），因此出现了两种分歧的做法：“无符号保留”（unsigned preserving）和“值保留”（value preserving）。假设 `sizeof(short int) < sizeof(int)`。那么表达式 `-1 < (unsigned short int)0` 的结果是什么？“无符号保留”实现会说结果是 0（假），因为操作数被提升为 `unsigned int`。“值保留”实现会说结果是 1，因为所有可能的 `unsigned short` 值都能放入（有符号）`int` 中，所以它被提升为有符号数。

honestly, i'm surprised (but glad) that the standard ended up taking a hard stance here, rather than just making the behavior implementation defined. the standardized behavior was the "value preserving" behavior. the rationale has this to say: The unsigned preserving rules greatly increase the number of situations where unsigned int confronts signed int to yield a questionably signed result, whereas the value preserving rules minimize such confrontations. Thus, the value preserving rules were considered to be safer for the novice, or unwary, programmer. After much discussion, the Committee decided in favor of value preserving rules, despite the fact that the UNIX C compilers had evolved in the direction of unsigned preserving.

老实说，我很惊讶（但也感到高兴）标准最终在这里采取了强硬立场，而不是仅仅将这种行为定义为“由实现决定”。标准化的行为是“值保留”行为。基本原理文档中这样写道：无符号保留规则极大地增加了 `unsigned int` 与 `signed int` 冲突并产生可疑符号结果的情况，而值保留规则最大限度地减少了这种冲突。因此，值保留规则被认为对新手或粗心的程序员更安全。经过多次讨论，委员会决定采用值保留规则，尽管当时的 UNIX C 编译器已经朝着无符号保留的方向发展了。

that last sentence is really interesting to me. compilers were leaning toward one practice, but the opposing practice was standardized. maybe non-unix compilers generally did value preserving, while unix compilers generally did unsigned preserving? not sure.

最后那句话让我觉得非常有趣。编译器倾向于一种做法，但相反的做法却被标准化了。也许非 Unix 编译器通常采用值保留，而 Unix 编译器通常采用无符号保留？我不确定。

unsigned integer constants back to k&r: since unsigned integers were (seemingly) kinda an afterthought, there was no U integer suffix (there was a L integer suffix though). furthermore, there were no unsigned constants at all! what i mean by that is: in standard c, if a non-decimal (i.e. hex, octal, or binary) integer constant doesn't fit in int, it first tries unsigned int before trying long (as opposed to decimal integer constants which are

回到 K&R：由于无符号整数（看起来）有点像是事后才想到的，所以没有 `U` 整数后缀（但有 `L` 整数后缀）。此外，根本没有无符号常量！我的意思是：在标准 C 中，如果一个非十进制（即十六进制、八进制或二进制）整数常量无法放入 `int`，它会先尝试 `unsigned int`，然后再尝试 `long`（这与十进制整数常量不同，后者是……）
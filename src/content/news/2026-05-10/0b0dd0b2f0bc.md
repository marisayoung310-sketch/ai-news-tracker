---
title: "On forking the Web"
originalUrl: "https://dillo-browser.org/lab/web-fork/"
date: "2026-05-09T22:18:21.410Z"
---

# On forking the Web
# 关于分叉万维网 (On forking the Web)

Written on 2026-05-06 by Rodrigo Arias Mallo
由 Rodrigo Arias Mallo 写于 2026 年 5 月 6 日

### Introduction
### 引言

This document contains a set of informal notes on how to build an alternative specification to the Web, in such a way that hopefully prevents many of its drawbacks while still preserves many of the good points. This document is not an specification, and is therefore subject to change over time. The Web is composed of several components, each may need to be reviewed. For know let's focus on the HTML specification (18.3 MiB of uncompressed size as of 2026-05-06) and leave the rest for later.
本文档包含了一系列关于如何构建万维网（Web）替代规范的非正式笔记，旨在尽可能规避现有 Web 的诸多弊端，同时保留其优点。本文档并非正式规范，因此可能会随时间推移而更改。Web 由多个组件组成，每个组件都可能需要重新审视。目前，我们先专注于 HTML 规范（截至 2026 年 5 月 6 日，其未压缩大小为 18.3 MiB），其余部分留待后续讨论。

### Goals
### 目标

Before building an specification, we should first have a clear list of goals that will drive the decisions on what should be part of the specification and what not.
在构建规范之前，我们首先需要一份清晰的目标清单，这将决定哪些内容应纳入规范，哪些不应纳入。

#### Simplicity
#### 简洁性

The whole specification must be simple and short, so that we can guarantee a diversity of browsers and other clients that can be created with low effort. Keeping things simple over time (decades) is very hard, if not impossible. One potential rule is to constraint the specification in length (bytes). We already use this technique in Dillo to restrict the release to fit in a single floppy disk, so we could use the same approach. Using the limit as 1.44 MiB of a compressed tar.gz with the complete specification.
整个规范必须简单且简短，以确保能够以较低的成本创建多样化的浏览器和其他客户端。长期（数十年）保持简洁是非常困难的，甚至是不可能的。一个潜在的规则是限制规范的长度（字节数）。我们在 Dillo 项目中已经使用过这种技术，将发布版本限制在单张软盘的大小内，因此我们可以采用同样的方法。将限制设定为 1.44 MiB 的压缩 tar.gz 文件，其中包含完整的规范。

#### Semantic versioning
#### 语义化版本控制

The current "Web specification" is a page that changes roughly weekly. This makes it imposible to program a client that conforms to the specification without constant changes. Instead, the specification should have a very precise semantic version like 1.2.3, so that we know that a page that conforms with the version 1.2.3 can be correctly render by a browser that supports 1.2.3, 1.2.0 or 1.3.0, but not one that supports only 1.1.0 or 2.0.0. Having a semantic versions allows authors to focus on the standard instead of on the current state of implementation of a given web browser. For example, you could target the version 1.2.0 knowing that, say, 90% of the browsers support this standard. A published version of the standard NEVER, EVER, EVER, EVER changes. Typos are corrected by bumping the patch version number. Retro-compatible new features are introduced by bumping the minor version. And breaking new changes require a major bump. This implies that you can buy a printed copy of the 1.2.0 standard, and use that in a desert island to program a perfectly compliant browser that will remain forever able to correctly parse 1.2.X documents.
当前的“Web 规范”是一个大约每周都会更新的页面。这使得编写符合规范的客户端变得不可能，因为必须不断进行更改。相反，规范应该有一个非常精确的语义版本号（如 1.2.3），这样我们就能知道，符合 1.2.3 版本的页面可以被支持 1.2.3、1.2.0 或 1.3.0 的浏览器正确渲染，但不能被仅支持 1.1.0 或 2.0.0 的浏览器渲染。拥有语义版本号可以让作者专注于标准本身，而不是特定浏览器的当前实现状态。例如，你可以针对 1.2.0 版本进行开发，因为你知道大约 90% 的浏览器都支持该标准。已发布的标准版本永远、永远、永远、永远不会改变。拼写错误通过增加补丁版本号来修正。向后兼容的新功能通过增加次版本号来引入。而破坏性的新更改则需要增加主版本号。这意味着你可以购买一份 1.2.0 标准的印刷版，即使在荒岛上，也能根据它编写出一个完全合规的浏览器，并且它将永远能够正确解析 1.2.X 的文档。

#### Strict grammar
#### 严格的语法

The specification must contain a non-ambiguous formal grammar that can be parsed easily. A page can then be tested against the standard and reject or accept as compliant. Pages that don't conform with the specification won't be rendered. It is explicitly forbidden for clients to accept any page that doesn't conform with the specification. This prevents the standardized diabolic rules that one must implement in order to correct a broken page, and forces the specification to correct its own mistakes in a later version. Having a strict grammar will likely cause humans to migrate to a language that is easy to write and is more forgiving (for example Markdown), and this is the intended effect. The objective is that parsers can be simplified and the cost of creating tools that can manipulate the content is lowered. In particular, changes in the patch version number only change wording, the grammar is kept the same.
规范必须包含一个易于解析且无歧义的形式语法。这样，页面就可以根据标准进行测试，从而被拒绝或接受为合规。不符合规范的页面将不会被渲染。明确禁止客户端接受任何不符合规范的页面。这避免了为了纠正损坏页面而必须实现的那些“魔鬼般的”标准化规则，并迫使规范在后续版本中自行修正错误。拥有严格的语法可能会促使人们转向一种易于编写且更具包容性的语言（例如 Markdown），这正是预期的效果。其目标是简化解析器，并降低创建内容处理工具的成本。特别地，补丁版本号的更改仅涉及措辞，语法保持不变。

#### Reusing HTML if possible
#### 如果可能，重用 HTML

It would be nice to be able to build a subset of HTML so that it would work with minimal effort in already existing software. However, this may not be possible given the complexity of parsing HTML. Similarly, creating a formal grammar of an XML document is non-trivial. So it would need to be reviewed if HTML/XML is a suitable format for simple parsing.
如果能够构建 HTML 的一个子集，使其能在现有软件中以最小的代价运行，那将是非常好的。然而，考虑到解析 HTML 的复杂性，这可能无法实现。同样，为 XML 文档创建形式语法也并非易事。因此，需要重新评估 HTML/XML 是否是适合简单解析的格式。

#### Resistance to standard capture
#### 对标准捕获的抵御

One of the problems with the Web is that as soon as a monopolistic entity can build a mechanism to extract revenue from it, there will be an incentive to capture the standard and change it to for their own benefit. In the particular case of the Web, this has resulted in a standard that grows out of control in complexity so it increases the barrier of entry for new browsers and reduces the competition. I have some rough ideas on how to try to prevent this situation, but this would need to be studied more carefully from the point of view of game theory.
Web 的问题之一是，一旦垄断实体能够建立起从中获取收入的机制，他们就会有动力去“捕获”标准并为了自身利益对其进行修改。就 Web 而言，这导致标准在复杂性上失控，从而提高了新浏览器的准入门槛并削弱了竞争。我对于如何防止这种情况有一些粗略的想法，但这需要从博弈论的角度进行更仔细的研究。

#### Text first
#### 文本优先

The objective of the specification is to cover enough details to transfer information among humans, in very much the same way a printed book or article would do. Written text should be the preferred medium as it is the most versatile way to encode information as it can be translated, read aloud by a computer or stored in a compact amount of storage. Text should be able to wrap the screen size, so that the same document can be read both in small and large screens.
该规范的目标是涵盖足够多的细节，以便在人类之间传递信息，就像印刷书籍或文章所做的那样。书面文本应作为首选媒介，因为它是编码信息最通用的方式——它可以被翻译、由计算机朗读或以紧凑的存储空间保存。文本应能够根据屏幕大小自动换行，以便同一文档既能在小屏幕上阅读，也能在大屏幕上阅读。

#### No scripting
#### 无脚本

Adding scripting capabilities was a mistake, so we can avoid it now. This doesn't restrict users to have interactive programs. An example is an interactive map that is currently loaded in the browser using JavaScript so show a location of a place of interest. Instead, you can provide a Geo link to open the location in any client that supports the protocol. Similarly, any client can use the tiles of your server, provided that there is an open specification. The advantage of using a native program to load a standardized file or URL is that it can be optimized to the device in use and prevent the "one size fits all" approach of many interactive Web pages.
添加脚本功能是一个错误，所以我们现在可以避免它。这并不限制用户使用交互式程序。例如，目前浏览器中通过 JavaScript 加载的交互式地图用于显示兴趣点的位置。相反，你可以提供一个 Geo 链接，在任何支持该协议的客户端中打开该位置。同样，只要有开放的规范，任何客户端都可以使用你服务器上的瓦片（tiles）。使用原生程序加载标准化文件或 URL 的优势在于，它可以针对所使用的设备进行优化，并避免许多交互式网页那种“一刀切”的做法。

### Non-goals
### 非目标

The objective is not to create a feature-by-feature clone of the Web, but to create an specification that allows humans to exchange knowledge, notes, and other forms of information without the imposed requirement of having to run a full blown VM to read it.
我们的目标不是创建一个功能上完全克隆 Web 的系统，而是创建一个允许人类交换知识、笔记和其他形式信息的规范，且无需强制要求运行一个完整的虚拟机（VM）来读取这些内容。
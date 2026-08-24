---
title: "Guix shell now inside Emacs"
originalUrl: "https://tusharhero.codeberg.page/guix-shell-in-emacs.html"
date: "2026-07-31T22:25:46.350Z"
---

# Guix shell now inside Emacs

**Guix shell 现已集成至 Emacs**

This is my submission for Emacs Carnival July 2026. If you don't know what GNU Guix is: It's an advanced package manager and a distribution of the GNU Operating system. With kernel support for both GNU Linux-libre and, experimentally, for the GNU Hurd. Guix's package manager is inspired by Nix, except that it uses GNU Guile instead of Nixlang for package definitions, system definitions. Also replacing Systemd with GNU Shepherd (GNU's Init System and Service manager).

这是我为 2026 年 7 月 Emacs 嘉年华提交的文章。如果你还不了解 GNU Guix：它是一个先进的软件包管理器，也是 GNU 操作系统的发行版。它支持 GNU Linux-libre 内核，并实验性地支持 GNU Hurd。Guix 的包管理器灵感来源于 Nix，不同之处在于它使用 GNU Guile 而非 Nixlang 来进行包定义和系统定义。此外，它还用 GNU Shepherd（GNU 的初始化系统和服务管理器）取代了 Systemd。

One of the features I use the most with Guix is guix shell. Which allows you to create software environments with the specified packages. I use this whenever I have to quickly try out software like some programming language implementations, developer tool or build some random project. I also use this to specify the development dependencies of the projects I work on, the dependencies are listed in a manifest.scm file. (specifications->manifest '("gcc-toolchain" "gdb" "mupdf" "make")) If you run a guix shell in a directory containing the file, it gets the appropriate dependencies for you. Check the info manual for more information: (info "(guix) Invoking guix shell").

我在 Guix 中使用频率最高的功能之一是 `guix shell`。它允许你创建包含指定软件包的软件环境。每当我需要快速尝试某些软件（如编程语言实现、开发工具）或构建某个随机项目时，我都会用到它。我也用它来指定我所参与项目的开发依赖项，这些依赖项列在 `manifest.scm` 文件中。（例如：`(specifications->manifest '("gcc-toolchain" "gdb" "mupdf" "make"))`）。如果你在包含该文件的目录下运行 `guix shell`，它会自动为你获取相应的依赖项。更多信息请查阅 info 手册：`(info "(guix) Invoking guix shell")`。

Anyway, how does this tie back to GNU Emacs? If you are like most Emacs users, you don't like starting a new instance of emacs for every project…
`$ you@yourcomputer ~/Projects/awesome-program$ guix shell`
`guix shell: loading environment from '/home/you/Projects/awesome-program/manifest.scm'...`
`$ you@yourcomputer ~/Projects/awesome-program$ emacs`
Too annoying. What you instead want is to have a M-x guix-shell inside Emacs itself. This was contributed to the emacs-guix package by yours truly. Check the info manual for more information: (info "(emacs-guix) Guix Shell").

总之，这与 GNU Emacs 有什么联系呢？如果你像大多数 Emacs 用户一样，不喜欢为每个项目都启动一个新的 Emacs 实例……
`$ you@yourcomputer ~/Projects/awesome-program$ guix shell`
`guix shell: loading environment from '/home/you/Projects/awesome-program/manifest.scm'...`
`$ you@yourcomputer ~/Projects/awesome-program$ emacs`
这太麻烦了。你真正想要的是在 Emacs 内部直接使用 `M-x guix-shell`。这一功能是由本人贡献给 `emacs-guix` 软件包的。更多信息请查阅 info 手册：`(info "(emacs-guix) Guix Shell")`。

Here's how I usually use it. Firstly, let's you feel like using Python. In the CLI, you would do.
`$ you@yourcomputer ~/Projects/awesome-program$ guix shell python`
The same in Emacs is like so, But what if you want to use multiple packages? Like
`$ you@yourcomputer ~/Projects/awesome-program$ guix shell python python-numpy`
Well, we got you covered there as well, (Yeah, I forgot about the commas). How about generating a manifest.scm file that you can use in the future? In the CLI, you would do,
`$ you@yourcomputer ~/Projects/awesome-program$ guix shell python python-numpy --export-manifest > manifest.scm`
In Emacs, you would do,

以下是我通常的使用方式。首先，假设你想使用 Python。在命令行中，你会这样做：
`$ you@yourcomputer ~/Projects/awesome-program$ guix shell python`
在 Emacs 中也是一样的。但如果你想使用多个软件包呢？比如：
`$ you@yourcomputer ~/Projects/awesome-program$ guix shell python python-numpy`
没问题，我们也支持（是的，我忘了加逗号）。那么如何生成一个以后可以使用的 `manifest.scm` 文件呢？在命令行中，你会这样做：
`$ you@yourcomputer ~/Projects/awesome-program$ guix shell python python-numpy --export-manifest > manifest.scm`
而在 Emacs 中，你只需这样做：

I think there is still much to be desired in this interface. It doesn't even attempt to provide of guix shell's power, for which it would probably need a transient menu (library powering magit and the other menus in emacs-guix). You might also be interested in packages like ben.el.

我认为这个界面还有很多改进空间。它甚至还没有尝试提供 `guix shell` 的全部功能，为此它可能需要一个 transient 菜单（即驱动 Magit 和 emacs-guix 中其他菜单的库）。你可能也会对 `ben.el` 之类的软件包感兴趣。
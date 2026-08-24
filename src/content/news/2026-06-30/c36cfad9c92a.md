---
title: "Canvas patch: we need testers"
originalUrl: "https://monadicsheep.org/blog/call-for-canvas-patch-testers.html"
date: "2026-06-29T22:40:15.554Z"
---

# Canvas patch: we need testers
# Canvas 补丁：我们需要测试人员

The Canvas patch is almost done. Except that we need more testing, specifically for its MS Windows port. (Though testers on other operating systems like GNU/Linux and MacOS are also welcome.) Since we don't have any computers running MS Windows, we are not sure if the code is actually correct. Please follow the following instructions for testing it on MS Windows.

Canvas 补丁已基本完成。目前我们还需要进行更多测试，特别是针对其 MS Windows 移植版本的测试。（当然，也欢迎 GNU/Linux 和 MacOS 等其他操作系统的用户参与测试。）由于我们手头没有运行 MS Windows 的计算机，无法确定代码是否完全正确。请按照以下说明在 MS Windows 上进行测试。

You can discuss the results or ask us questions at MonadicSheep Emacs Fork's Issue tracker, #phi-mu-lambda on Libera IRC (open webchat in browser), or on the fediverse (tag the post with #emacs).

您可以前往 MonadicSheep Emacs 分支的 Issue 追踪器、Libera IRC 上的 #phi-mu-lambda 频道（可在浏览器中打开网页聊天），或在联邦宇宙（Fediverse）上（请为帖子添加 #emacs 标签）讨论测试结果或向我们提问。

### 1. Building GNU Emacs on MS Windows
### 1. 在 MS Windows 上构建 GNU Emacs

More detailed information is available here. Install MSYS2 by following the official instructions mentioned there. Open a MSYS2 UCRT64 session terminal. In the bash prompt, run the following commands to get the canvas patch source code.

更多详细信息请点击此处。请按照官方说明安装 MSYS2。打开一个 MSYS2 UCRT64 会话终端。在 bash 提示符下，运行以下命令以获取 Canvas 补丁的源代码。

```bash
pacman -Sy git
git clone https://codeberg.org/MonadicSheep/emacs
```

Now, change directory to emacs source checkout, by running the following command.

现在，运行以下命令进入 Emacs 源码目录。

```bash
cd emacs/
```

Install dependencies:

安装依赖项：

```bash
pacman -Sy --needed base-devel autoconf \
 mingw-w64-ucrt-x86_64-toolchain \
 mingw-w64-ucrt-x86_64-xpm-nox \
 mingw-w64-ucrt-x86_64-gmp \
 mingw-w64-ucrt-x86_64-gnutls \
 mingw-w64-ucrt-x86_64-libtiff \
 mingw-w64-ucrt-x86_64-giflib \
 mingw-w64-ucrt-x86_64-libpng \
 mingw-w64-ucrt-x86_64-libjpeg-turbo \
 mingw-w64-ucrt-x86_64-librsvg \
 mingw-w64-ucrt-x86_64-libwebp \
 mingw-w64-ucrt-x86_64-lcms2 \
 mingw-w64-ucrt-x86_64-libxml2 \
 mingw-w64-ucrt-x86_64-zlib \
 mingw-w64-ucrt-x86_64-harfbuzz \
 mingw-w64-ucrt-x86_64-libgccjit \
 mingw-w64-ucrt-x86_64-sqlite3 \
 mingw-w64-ucrt-x86_64-libtree-sitter
```

Now, run the following command to build Emacs.

现在，运行以下命令来构建 Emacs。

```bash
make
```

This may take a while depending on your hardware. Once that is done, you should be able to start emacs with the following command.

根据您的硬件配置，这可能需要一些时间。完成后，您应该可以通过以下命令启动 Emacs。

```bash
./src/emacs
```

### 2. Testing
### 2. 测试

Evaluate the following in `*scratch*` (Using `C-c C-c` keybinding).

在 `*scratch*` 缓冲区中执行以下代码（使用 `C-c C-c` 快捷键）。

```elisp
(defun make-rect (width height pixel) (make-vector (* width height) pixel))
(setq rect-canvas-vec (make-rect 250 250 #xFFFF0000))
(setq rect-canvas `(image :type canvas :data-width 250 :data-height 250 :data ,rect-canvas-vec))
(insert (propertize "#" 'display rect-canvas))
(defvar rect-canvas-timer nil)
(let ((i 0))
  (setq rect-canvas-timer (run-with-timer 0 0.016 (lambda ()
    (if (< i (* 20 250))
        (progn
          (aset rect-canvas-vec (+ (* 115 250) i) #xFF0000FF)
          (canvas-refresh rect-canvas t)
          (setq i (1+ i)))
      (cancel-timer rect-canvas-timer))))))
```

You should be able to see something like this.

您应该能看到类似这样的效果。
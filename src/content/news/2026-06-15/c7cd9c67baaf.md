---
title: "Introduction-to-Autonomous-Robots / Introduction-to-Autonomous-Robots"
originalUrl: "https://github.com/Introduction-to-Autonomous-Robots/Introduction-to-Autonomous-Robots"
date: "2026-06-14T22:41:56.449Z"
---

# Introduction to Autonomous Robots

**Introduction to Autonomous Robots**
《自主机器人导论》（Introduction to Autonomous Robots）是一本专注于自主机器人计算原理的开源教科书。

The source-code is released under Creative Commons 4.0 (CC-BY-NC-ND), whereas the print version is copyrighted by MIT Press. You are therefore permitted to use images and content from the book for non-commercial purposes (including teaching) with proper attribution, but you cannot post compiled versions of the book online.
其源代码采用知识共享 4.0 协议（CC-BY-NC-ND）发布，而印刷版版权归麻省理工学院出版社（MIT Press）所有。因此，在注明出处的前提下，您可以将书中的图片和内容用于非商业目的（包括教学），但不得在网上发布该书的编译版本。

The book is available on Amazon Introduction to Autonomous Robots, you can also review it and/or rate it there.
该书已在亚马逊（Amazon）上架，您也可以在亚马逊页面对其进行评论或评分。

**How to compile**
**如何编译**

Due to copyright issues, we are not allowed to have a freely available PDF version of this book online. However, you can create one yourself if you so choose! In order to compile a PDF of this book yourself, you either need a working implementation of Latex on your computer or use the online Latex editor overleaf.com.
由于版权问题，我们无法在网上提供该书的免费 PDF 版本。不过，如果您愿意，可以自行制作！为了自行编译该书的 PDF，您需要在电脑上安装可用的 LaTeX 环境，或者使用在线 LaTeX 编辑器 overleaf.com。

**Overleaf compilation**
**Overleaf 编译**

On overleaf, you can either upload a zip file of the source code ("download ZIP" option underneath the green "Code" button on this page), or fork the project into your Github account and import it directly into Overleaf from there.
在 Overleaf 上，您可以上传源代码的压缩包（点击本页面绿色“Code”按钮下方的“download ZIP”选项），或者将该项目 Fork 到您的 Github 账户，然后直接从那里导入到 Overleaf。

**Latex Compilation Prerequisites**
**LaTeX 编译前提条件**

* LaTeX installation with pdflatex and bibtex
* 安装包含 pdflatex 和 bibtex 的 LaTeX 环境
* ImageMagick (for converting missing figures)
* ImageMagick（用于转换缺失的图表）

**Compilation Steps**
**编译步骤**

```bash
pdflatex -interaction=nonstopmode book.tex
bibtex book
pdflatex -interaction=nonstopmode book.tex
pdflatex -interaction=nonstopmode book.tex
```

The final PDF will be generated as book.pdf.
最终生成的 PDF 文件名为 book.pdf。

**Notes**
**注意事项**

* The -interaction=nonstopmode flag allows compilation to continue past non-fatal errors
* `-interaction=nonstopmode` 参数允许编译在遇到非致命错误时继续进行
* Multiple pdflatex runs are needed to resolve cross-references and citations
* 需要多次运行 pdflatex 以解析交叉引用和引文
* Some warnings about overfull boxes are normal and don't affect the final output
* 关于“overfull boxes”的一些警告是正常的，不会影响最终输出

**Citation**
**引用方式**

This book can be cited as follows:
本书引用格式如下：

Nikolaus Correll, Bradley Hayes, Christoffer Heckman and Alessandro Roncone. Introduction to Autonomous Robots: Mechanisms, Sensors, Actuators, and Algorithms, MIT Press, 2022 (forthcoming).

```bibtex
@book{correll2022introduction,
  title={Introduction to Autonomous Robots: Mechanisms, Sensors, Actuators, and Algorithms},
  author={Correll, Nikolaus and Hayes, Bradley, and Heckman, Christoffer, and Roncone, Alessandro},
  year={2022},
  edition={1st},
  publisher={MIT Press, Cambridge, MA}
}
```
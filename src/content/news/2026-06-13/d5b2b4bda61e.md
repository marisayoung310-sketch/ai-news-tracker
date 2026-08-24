---
title: "Claude Fable is relentlessly proactive"
originalUrl: "https://simonwillison.net/2026/Jun/11/fable-is-relentlessly-proactive/"
date: "2026-06-12T22:50:52.848Z"
---

# Claude Fable is relentlessly proactive
# Claude Fable 展现出惊人的主动性

11th June 2026
2026年6月11日

After two days of experience with Claude Fable 5 I think the best way to describe it is relentlessly proactive. It knows a whole lot of tricks and it will deploy pretty much any of them to get to its goal.
在体验了 Claude Fable 5 两天后，我认为描述它最贴切的词就是“极其主动”。它掌握着大量的技巧，并且为了达成目标，它几乎会动用其中的任何一种。

I’ll illustrate this with an example. I was hacking on Datasette Agent today when I noticed a glitch: a horizontal scrollbar that shouldn’t be there in the jump menu chat prompt. I snapped this screenshot:
我用一个例子来说明。今天我在开发 Datasette Agent 时发现了一个小故障：跳转菜单的聊天提示框中出现了一个本不该存在的水平滚动条。我截下了这张图：

Then I started a fresh claude session in my datasette-agent checkout, dragged in the screenshot and told it: "Look at dependencies to help figure out why there is a horizontal scrollbar here."
随后，我在 datasette-agent 的代码库中开启了一个新的 Claude 会话，拖入截图并告诉它：“查看一下依赖项，帮我找出为什么这里会出现水平滚动条。”

I had a hunch the cause was in a dependency of Datasette Agent (likely Datasette itself) and I knew Fable was good at digging into dependency code, either by inspecting installed files in its own virtual environment site-packages or by referencing a local checkout on disk. Telling it to start with dependencies felt like a good bet.
我直觉认为问题出在 Datasette Agent 的某个依赖项中（很可能是 Datasette 本身），而且我知道 Fable 很擅长深入挖掘依赖代码，无论是通过检查其虚拟环境 site-packages 中的已安装文件，还是通过引用磁盘上的本地代码库。让它从依赖项入手是一个不错的选择。

I got distracted by a domestic task and wandered away from my computer. When I came back a few minutes later I saw my machine open a browser window in my regular Firefox and then navigate to the dialog in question. I had not told Claude Code to use any browser automation, and I was pretty sure it wasn’t possible for it to trigger mouse movements or keyboard shortcuts within a window, so how was it doing that?
我因为处理家务走开了几分钟。当我回来时，发现电脑自动打开了我的 Firefox 浏览器，并导航到了那个有问题的对话框。我并没有指示 Claude Code 使用任何浏览器自动化工具，而且我非常确定它不可能在窗口内触发鼠标移动或键盘快捷键，那么它是怎么做到的呢？

I watched in fascination as it continued with its explorations, then saw it open a Safari window instead of Firefox. I also grabbed this snapshot from the Claude terminal:
我着迷地看着它继续探索，随后发现它打开了一个 Safari 窗口，而不是 Firefox。我还从 Claude 的终端里截取了这张快照：

What was it doing there with `uv run --with pyobjc-framework-Quartz`? It turns out Fable had hacked up its own pattern for taking screenshots of browser windows. It was using Python to iterate through all available windows on my machine, then filtering for Safari windows with expected strings such as "textarea" in the window name. It used that to find their window number—an integer like 153551—which it could then use with the `screencapture` CLI tool to grab a PNG.
它运行 `uv run --with pyobjc-framework-Quartz` 是在做什么？原来 Fable 自创了一套截取浏览器窗口的方案。它利用 Python 遍历了我机器上所有打开的窗口，然后筛选出窗口名称中包含“textarea”等预期字符串的 Safari 窗口。它通过这种方式找到了窗口编号（例如 153551 这样的整数），然后利用 `screencapture` 命令行工具截取 PNG 图片。

OK fine, that’s a neat way of taking screenshots. But what was it taking screenshots of? Turns out it had been writing its own scratch HTML pages to try and recreate the bug, then opening Safari and grabbing screenshots.
好吧，这确实是一种巧妙的截图方法。但它截的是什么呢？原来它一直在编写自己的临时 HTML 页面来尝试复现这个 Bug，然后打开 Safari 进行截图。

OK, so I can see how it’s opening test pages and taking screenshots, but how on earth was it triggering the modal dialog that was meant to be under test? That’s only available via a click or a keyboard shortcut, and I couldn’t see a mechanism for it to run those in Safari.
好吧，我明白了它是如何打开测试页面并截图的，但它究竟是如何触发那个需要测试的模态对话框的呢？那个对话框只能通过点击或键盘快捷键触发，而我没看出它在 Safari 中运行这些操作的机制。

I eventually figured out what it had done. Claude was running in a folder that contained the source code for the application. It knows enough about Datasette to be able to run a local development server. It turns out it was editing Datasette’s own templates to add JavaScript that would trigger the correct keyboard shortcut as soon as the window opened, adding code like this:
最终我弄明白了它的做法。Claude 运行在包含应用程序源代码的文件夹中。它对 Datasette 的了解足以让它运行本地开发服务器。原来它修改了 Datasette 自身的模板，添加了一段 JavaScript 代码，以便在窗口打开时立即触发正确的键盘快捷键，代码如下：

```javascript
<script>
window.addEventListener("load", function () {
  setTimeout(function () {
    document.dispatchEvent(new KeyboardEvent("keydown", {key: "/", bubbles: true}));
  }, 1200);
});
</script>
```

1.2 seconds after the window opens, this code triggers a simulated `/` key, which is the keyboard shortcut for opening the modal dialog.
在窗口打开 1.2 秒后，这段代码会触发一个模拟的 `/` 按键，这正是打开模态对话框的快捷键。

There was one challenge left. In order to understand what was going on, Claude needed to run JavaScript on the page to take measurements for itself. It wrote its own custom web application to capture information via CORS, then ran that as a local server and opened a page with JavaScript that would POST directly to it!
还剩下一个挑战。为了理解发生了什么，Claude 需要在页面上运行 JavaScript 来进行测量。它编写了一个自定义的 Web 应用程序，通过 CORS 捕获信息，然后将其作为本地服务器运行，并打开了一个包含 JavaScript 的页面，直接向该服务器发送 POST 请求！

All this does is accept a POST request full of JSON and write that to the `/tmp/diag.json` file. It sends `Access-Control-Allow-Origin: *` headers (including from OPTIONS requests) so that code running on another domain can still communicate back to it.
这一切的作用仅仅是接收一个包含 JSON 的 POST 请求，并将其写入 `/tmp/diag.json` 文件。它发送了 `Access-Control-Allow-Origin: *` 响应头（包括对 OPTIONS 请求的响应），以便在其他域上运行的代码能够与它通信。

Then Claude injected this code into the template that it was loading in a browser:
随后，Claude 将这段代码注入到了它在浏览器中加载的模板里：

```javascript
const host = document.querySelector("navigation-search");
const ta = host.shadowRoot.querySelector("textarea");
const cs = getComputedStyle(ta);
fetch("http://127.0.0.1:9999/diag", {
  method: "POST",
  body: JSON.stringify({
    dpr: window.devicePixelRatio,
    scrollWidth: ta.scrollWidth,
    clientWidth: ta.clientWidth,
    whiteSpace: cs.whiteSpace,
    width: cs.width,
  }),
});
```

This took measurements of the `<textarea>` inside the `<navigation-search>` Web Component and sent them to the server, which wrote them to a file on disk, which Claude could then read.
这段代码测量了 `<navigation-search>` Web 组件内部的 `<textarea>`，并将数据发送到服务器，服务器将其写入磁盘文件，Claude 随后便可读取这些数据。

Having figured out all of these tricks Fable... hit some invisible guardrail and downgraded itself to Opus. Thankfully Opus had access to the full transcript and could continue using the tricks pioneered by Fable, and shortly afterwards found, tested and verified the fix.
在搞清楚了所有这些技巧后，Fable……触碰到了某种无形的护栏，自动降级回了 Opus 模型。好在 Opus 可以访问完整的对话记录，并能继续使用 Fable 开创的这些技巧。不久之后，它就找到、测试并验证了修复方案。

I prompted Opus to: "Write a report in /tmp/automation-report.md where you note down all of the tricks you have used in this session to test against real browsers on my computer, include runnable code examples."
我提示 Opus：“在 /tmp/automation-report.md 中写一份报告，记录下你在本次会话中为了在我的电脑上测试真实浏览器所使用的所有技巧，并包含可运行的代码示例。”
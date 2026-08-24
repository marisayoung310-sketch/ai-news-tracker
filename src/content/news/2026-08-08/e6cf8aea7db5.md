---
title: "Four false positives in one evening: telling a broken web app from a broken measurement"
originalUrl: "https://dev.to/smirnovartur/four-false-positives-in-one-evening-telling-a-broken-web-app-from-a-broken-measurement-5gd3"
date: "2026-08-07T22:06:48.822Z"
---

# Four false positives in one evening: telling a broken web app from a broken measurement
# 一晚上的四个误报：如何区分“网页应用崩溃”与“测量工具失效”

I spent an evening opening other companies' product configurators — 3D and parametric tools on manufacturers' sites — looking for things that were genuinely broken. Twenty-seven of them. The findings were real. But the part worth writing down is that four separate times in one evening, my tooling told me an application was broken when it was fine.
我花了一个晚上打开其他公司的产品配置器（制造商网站上的 3D 和参数化工具），寻找真正出现故障的地方。我一共检查了 27 个，其中确实发现了一些问题。但值得记录的是，在同一个晚上，我的工具竟然有四次误报——它告诉我应用崩溃了，但实际上它们运行良好。

Every one of those four passed automated checks that looked rigorous. What caught them was a screenshot. If you write scripts that judge pages you don't own — uptime checks, competitor teardowns, scraping health, QA of an embedded widget — you will hit these. Here is the full list of signals that lied to me, and the one control that never has.
这四个案例都通过了看起来非常严苛的自动化检查。最终发现问题的，是一张截图。如果你编写脚本来评估非自有的页面（例如在线状态检查、竞品分析、爬虫健康度监测、嵌入式组件的质量保证），你一定会遇到这些情况。以下是误导我的信号列表，以及唯一从未出错的验证方法。

### The four false positives
### 四个误报案例

All four produced the same symptom: no `<canvas>` on the page, and an almost empty `innerText`. That looks damning when the page is literally titled "Configurator". It is also what three completely healthy situations look like:
这四个案例表现出相同的症状：页面上没有 `<canvas>` 元素，且 `innerText` 几乎为空。当页面标题明确写着“配置器”时，这看起来确实像是崩溃了。但以下三种完全正常的情况也会表现出同样的特征：

1. **The tool starts on a click.** An orange button launches it. My script measured an unopened door and reported an empty room. Four automated passes — raw HTTP with a browser UA, my own browser, two runs from a clean profile, a control on the same domain — all four confidently examined a page that hadn't started yet.
1. **工具需要点击触发。** 一个橙色按钮负责启动它。我的脚本测量了一个尚未打开的“门”，并报告说房间是空的。四次自动化测试（使用浏览器 UA 的原始 HTTP 请求、我自己的浏览器、两次干净配置文件的运行、以及同一域名的对照组）都自信地检查了一个尚未启动的页面。

2. **The entire UI lives inside the canvas.** One hall configurator draws its menus, its undo/redo and its PDF export in WebGL. Empty DOM text is correct there, not a defect.
2. **整个 UI 都在 Canvas 内部。** 有一个大厅配置器，它的菜单、撤销/重做功能以及 PDF 导出功能都是用 WebGL 绘制的。在这种情况下，DOM 文本为空是正常的，并非故障。

3. **The tool is behind a login.** I was measuring a sign-in page. Fifty-four characters of text and one button reading "Anmelden". The page is a landing page about the configurator, not the configurator.
3. **工具需要登录。** 我测量的是一个登录页面。页面上只有 54 个字符的文本和一个写着“Anmelden”（登录）的按钮。这只是关于配置器的落地页，而不是配置器本身。

No network-level or DOM-level check distinguishes these from an actual failure. A screenshot distinguishes all four instantly. So the first rule I now follow, before any measurement at all: Take the screenshot first. Look at the picture. What you cannot see in the image, you do not measure. It costs one second and it is the highest-yield step in the whole process.
没有任何网络层或 DOM 层的检查能将这些情况与真正的故障区分开来。但一张截图可以瞬间识别出这四种情况。因此，我现在遵循的第一条规则是：在进行任何测量之前，先截图。看一眼图片。如果你在图片中看不到它，就不要去测量它。这只需要一秒钟，却是整个过程中收益最高的一步。

The corollary is that automation answers "is it reachable", never "does it work." When you catch yourself designing a fifth automated pass, what you actually need is one human opening the page and clicking the obvious thing.
由此得出的推论是：自动化只能回答“它是否可访问”，永远无法回答“它是否能正常工作”。当你发现自己正在设计第五种自动化测试时，你真正需要的是找个人打开页面，点击那个显眼的按钮。

### Signals that lied, and why
### 误导性的信号及其原因

*   **"No canvas" and "empty innerText".** The two least reliable signals I use. Demoted permanently: they are now a reason to look at a screenshot, never a finding.
*   **“没有 Canvas”和“空的 innerText”。** 这是我使用过的最不可靠的两个信号。它们已被永久降级：现在它们只是查看截图的理由，绝不再作为故障结论。

*   **Reading pixels off someone else's WebGL canvas.** I nearly built a proof-of-emptiness on this. Copy the canvas into a 2D context, count non-transparent pixels, get zero — on a perfectly live scene. WebGL clears the drawing buffer after compositing unless `preserveDrawingBuffer` is set. The zero is an artefact of the spec, not evidence about their app.
*   **读取他人 WebGL Canvas 的像素。** 我差点就用这个来证明页面是空的。将 Canvas 复制到 2D 上下文中，计算非透明像素，结果为零——尽管场景明明是实时运行的。除非设置了 `preserveDrawingBuffer`，否则 WebGL 在合成后会清除绘图缓冲区。这个“零”是规范带来的产物，而不是应用故障的证据。

*   **ERR_ABORTED, even on the company's own domain.** One site showed eight failed requests, its own domain, its own scripts. That passed my "only count first-party failures" filter and looked like the real thing. Re-run waiting for networkidle instead of domcontentloaded: sixty-five responses, all 200, zero errors. My own measurement was cutting the page off mid-load. A failure is a 4xx or 5xx status in a response — not a request that got aborted, and you must wait for the network to settle before you believe anything.
*   **ERR_ABORTED，即使在公司自己的域名上。** 有个网站显示有八个请求失败，全是它自己的域名和脚本。这通过了我的“仅统计第一方故障”过滤器，看起来像是真的出了问题。重新运行测试，将等待条件从 `domcontentloaded` 改为 `networkidle` 后：65 个响应全部为 200，零错误。原来是我自己的测量在页面加载中途就切断了连接。真正的故障是响应中的 4xx 或 5xx 状态，而不是被中止的请求。在相信任何结果之前，你必须等待网络稳定。

*   **A third-party widget failing.** Their chat widget threw `net::ERR_FAILED` plus CORS. Real, reproducible — and it did exactly the same thing on two unrelated sites, in different countries, on different accounts. That is my environment being filtered, not their code. Same for analytics, tag managers and captcha endpoints: when those fail, you have measured your own ad blocker.
*   **第三方组件故障。** 他们的聊天组件抛出了 `net::ERR_FAILED` 和 CORS 错误。这是真实且可复现的——但它在两个不相关的网站、不同国家、不同账户上表现完全一致。这是我的环境被过滤了，而不是他们的代码有问题。分析工具、标签管理器和验证码接口也是如此：当它们失败时，你测量的其实是你自己的广告拦截器。

*   **transferSize from a persistent browser profile.** Returns zero or garbage, because the response came from cache. Weight gets measured from a clean profile or not at all.
*   **来自持久化浏览器配置文件的 `transferSize`。** 返回零或乱码，因为响应来自缓存。页面大小必须在干净的配置文件中测量，否则就不要测量。

*   **403 with no User-Agent.** One door configurator returned 403 and 118 bytes to a headless request, and 200 to the same request with a real browser UA. The site was healthy; my headless client was being filtered, and I almost filed it as broken. Without a genuine User-Agent, every 403, timeout and empty body you collect is worthless. Likewise 403/503 from a WAF: that is a block against a datacentre IP, not a defect.
*   **没有 User-Agent 的 403 错误。** 一个门配置器对无头浏览器请求返回 403 和 118 字节，但对带有真实浏览器 UA 的相同请求返回 200。网站是健康的；我的无头客户端被过滤了，我差点把它归类为故障。没有真实的 User-Agent，你收集到的每一个 403、超时和空响应体都是毫无价值的。同样，来自 WAF 的 403/503 错误也是针对数据中心 IP 的拦截，而不是应用缺陷。

*   **A 300×150 canvas.** That is the HTML default and proves nothing.
*   **300×150 的 Canvas。** 这是 HTML 的默认值，什么也证明不了。

*   **Single beautiful observations that didn't reproduce.** I saw requests to a URL containing a literal `undefined/undefined`. Gorgeous finding. It did not appear on either re-run, so it does not exist.
*   **无法复现的“完美”观察。** 我看到请求中包含一个字面上的 `undefined/undefined` URL。多么漂亮的发现。但在两次重测中它都没有出现，所以它并不存在。

### The control that always works
### 唯一有效的对照验证法

Everything above is one question wearing different costumes: am I being filtered? For a while I answered it with external text proxies — fetch the same URL through a service on another network, compare. Then all four services I used went down at once: 403, 522, 521, 429. Which taught me the more useful lesson — I ran a known-good file through the same proxies and got the same 521 back. The proxies were down, not the sites. An error from your verification tool is not evidence about your target.
以上所有问题其实都披着不同外衣的同一个问题：我被过滤了吗？有一段时间，我通过外部文本代理来回答这个问题——通过另一个网络上的服务获取相同的 URL 并进行比较。后来，我使用的四个服务同时挂了：403、522、521、429。这教会了我更重要的一课——我用同样的代理去访问一个已知正常的网页，也得到了同样的 521 错误。是代理挂了，而不是网站挂了。验证工具报错，并不代表目标网站有问题。

The replacement is better than what it replaced, needs nothing external, and works every time: **Fetch the neighbouring object, from your own network, in the same request.**
替代方案比之前的方法更好，不需要任何外部资源，且每次都有效：**在同一个请求中，从你自己的网络获取相邻的对象。**

A 404 on a file? Request the file next to it in the same directory. An empty page? Request a different page on the same domain. A dead domain? Request their homepage. The logic is airtight. Geo-filters, datacentre blocks and User-Agent screening kill the whole connection. None of them can selectively 404 one filename and serve its neighbour.
文件 404 了？请求同一目录下旁边的文件。页面是空的？请求同一域名下的另一个页面。域名挂了？请求他们的主页。这个逻辑无懈可击。地理过滤、数据中心拦截和 User-Agent 筛选会切断整个连接。它们不可能选择性地让一个文件名 404，却正常提供它的邻居文件。

A worked example. A decor texture returned 404 at 564 bytes. Its neighbour in the same directory, same User-Agent, same client, same second, returned 200 at 1877 bytes. No filtering mechanism in existence produces that. The file is genuinely missing.
举个例子。一个装饰纹理文件返回 404，大小为 564 字节。同一目录下、使用相同 User-Agent、相同客户端、在同一秒请求的邻居文件返回 200，大小为 1877 字节。现有的任何过滤机制都无法产生这种结果。说明该文件确实丢失了。
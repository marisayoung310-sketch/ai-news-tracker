---
title: "Building an HTML-first site doubled our users overnight"
originalUrl: "https://mohkohn.co.uk/writing/html-first/"
date: "2026-06-10T22:59:57.840Z"
---

# Building an HTML-first site doubled our users overnight
# 构建“HTML 优先”网站，我们的用户量一夜翻倍

Jun 10, 2026
2026年6月10日

This is a story of how building HTML-first doubled a company’s users literally overnight. My client was a utility company, and they had a big problem. To apply for their services, customers could either use an old ASP form on the website, or follow a manual process. The manual process was more expensive for the company, of course. Adding a lot of pressure, this was a regulated monopoly, and if their customer satisfaction dropped below 96% (if I remember correctly) it could result in millions of pounds in fines.
这是一个关于如何通过“HTML 优先”（HTML-first）策略让一家公司的用户量一夜之间翻倍的故事。我的客户是一家公用事业公司，他们面临一个巨大的难题：客户若要申请服务，要么使用网站上陈旧的 ASP 表单，要么走人工流程。当然，人工流程对公司而言成本更高。更糟糕的是，这是一家受监管的垄断企业，如果客户满意度低于 96%（如果我没记错的话），可能会导致数百万英镑的罚款。

There were two previous failed (and very expensive) attempts to solve the problem. In the most recent, contractors in another country had built a React app. The React app was online for 3 days before being pulled because of customer complaints. I took one look at it and told my boss “we can’t take ownership of this.” It was a mess of loading spinners and global javascript states. It was not accessible. Image upload was a vital part of the form, and it attempted to store images (along with all other form data) in localstorage which has a 5mb limit!
此前曾有过两次失败（且代价高昂）的尝试。最近的一次是外包团队开发的一个 React 应用，上线仅 3 天就因客户投诉被下架。我只看了一眼就告诉老板：“我们不能接手这个烂摊子。”它充斥着各种加载动画和混乱的全局 JavaScript 状态，且完全没有可访问性可言。图片上传是表单的关键部分，但它竟然试图将图片（连同所有其他表单数据）存储在只有 5MB 容量限制的 LocalStorage 中！

I took a very bold decision and built a new version of the site using Astro. It was HTML-first. Javascript existed, in web components, but only to progressively-enhance a website that worked perfectly fine without it. My logic was thus: This is a public service; It should work on every machine possible; It should work when connections are poor; The forms must never lose data once it is entered.
我做出了一个大胆的决定：使用 Astro 构建新版网站。它采用“HTML 优先”原则。JavaScript 依然存在（以 Web Components 的形式），但仅用于对一个即便没有 JS 也能完美运行的网站进行渐进式增强。我的逻辑如下：这是一项公共服务；它应该能在任何设备上运行；它应该在网络状况不佳时也能工作；表单一旦输入，绝不能丢失数据。

I was very moved by this anecdote from Terence Eden: A few years ago I was doing policy research in a housing benefits office in London. They are singularly unlovely places. The walls are brightened up with posters offering helpful services for people fleeing domestic violence. The security guards on the door are cautiously indifferent to anyone walking in. The air is filled with tense conversations between partners - drowned out by the noise of screaming kids. In the middle, a young woman sits on a hard plastic chair. She is surrounded by canvas-bags containing her worldly possessions. She doesn’t look like she is in a great emotional place right now. Clutched in her hands is a games console - a PlayStation Portable. She stares at it intensely; blocking out the world with Candy Crush. Or, at least, that’s what I thought.
Terence Eden 分享的一则轶事让我深受触动：几年前，我在伦敦的一间住房福利办公室做政策研究。那是个极其压抑的地方，墙上贴着为逃离家庭暴力者提供帮助的海报。门口的保安对进出的人表现出一种谨慎的冷漠。空气中弥漫着伴侣间紧张的对话，被孩子们的尖叫声淹没。在人群中央，一位年轻女性坐在坚硬的塑料椅上，身边堆满了装着她全部家当的帆布袋。她看起来情绪非常低落，手里紧紧攥着一台 PlayStation Portable（PSP）游戏机。她盯着屏幕，似乎正沉浸在《糖果传奇》中试图隔绝外界。至少，我是这么认为的。

Walking behind her, I glance at her console and recognise the screen she’s on. She’s connected to the complementary WiFi and is browsing the GOV.UK pages on Housing Benefit. She’s not slicing fruit; she’s arming herself with knowledge. The PSP’s web browser is - charitably - pathetic. It is slow, frequently runs out of memory, and can only open 3 tabs at a time. But the GOV.UK pages are written in simple HTML. They are designed to be lightweight and will work even on rubbish browsers. They have to. This is for everyone.
我从她身后走过，瞥了一眼她的游戏机，认出了屏幕上的内容。她连接了免费 WiFi，正在浏览 GOV.UK 网站上的住房福利页面。她不是在切水果，而是在用知识武装自己。PSP 的浏览器用“可怜”来形容都算客气了：它速度慢、经常内存溢出，且一次只能打开 3 个标签页。但 GOV.UK 的页面是用简单的 HTML 编写的。它们被设计得非常轻量，即使在糟糕的浏览器上也能运行。它们必须如此，因为这是面向所有人的服务。

Some requirements I derived: Each session with the form should have a unique ID; At every step in the form wizard, submitted data should be stored on the backend, including uploads; It should be possible to complete the form without javascript; It should be possible to complete the form on outdated and crap web browsers; We had to meet WCAG accessibility (the team settled on AA rather than AAA); Javascript and modern CSS should be used to enhance the experience.
我总结了一些需求：表单的每个会话都应有唯一 ID；表单向导的每一步提交的数据（包括上传文件）都应存储在后端；必须支持在没有 JavaScript 的情况下完成表单；必须支持在过时且糟糕的浏览器上完成表单；必须符合 WCAG 可访问性标准（团队最终定为 AA 级而非 AAA 级）；使用 JavaScript 和现代 CSS 来提升体验。

The basic setup ended up being that each step in the form wizard was its own page. When the user clicked next, the form would submit. If the data was judged to be valid by the API, the browser would be redirected to the next step. A venerable web application pattern that has had a small modern renaissance thanks to Remix, form submissions and redirects took a while to explain to my colleagues, on account of everyone being used to heavily client-side web applications.
最终的基本架构是：表单向导的每一步都是一个独立的页面。当用户点击“下一步”时，表单会提交。如果 API 验证数据有效，浏览器就会重定向到下一步。这是一种古老但因 Remix 而在现代焕发新生的 Web 应用模式。向同事解释这种“表单提交与重定向”模式花了不少时间，因为大家都习惯了重度依赖客户端的 Web 应用。

I have nothing against heavily client-side applications, in their place. But this is just a big form - it’s not showing real-time data. Our user could be standing in the middle of a field on a new-build housing estate, holding a decade-old commodity android phone they bought in Tesco. Shipping them 20MB of javascript before we even render a form would be a ridiculous thing to do.
我并不反对重度客户端应用，它们有其适用场景。但这里仅仅是一个大型表单，并不需要展示实时数据。我们的用户可能正站在新建住宅区的空地上，手里拿着在超市买的十年前的廉价安卓手机。在渲染表单前先给他们发送 20MB 的 JavaScript 代码，简直是荒谬至极。

Next, I tackled one of my biggest bugbears, form validation (and form and form error rendering). I have seen teams waste person-months of effort wrangling React validation libraries. If you are a React person, you might be scoffing at this - skill issue, I guess - but it is the reality for many teams. I would like to humbly suggest that you too may be spending more time than you realise, and a lot more time than is necessary, interacting with and maintaining poor imitations of the validation system that ships with every browser.
接下来，我解决了最让我头疼的问题之一：表单验证（以及表单和错误信息的渲染）。我见过许多团队浪费数月的人力去折腾 React 验证库。如果你是 React 开发者，可能会对此嗤之以鼻——觉得这是技术水平问题——但这确实是许多团队的现状。我想谦虚地建议，你可能也花费了比你意识到的更多、且完全没必要的时间，去维护那些浏览器原生验证系统的拙劣模仿品。

So I built an HTML web component. These are simple custom elements that wrap around existing HTML and bring it to life. No shadow DOM, no (or little) rendering HTML in javascript. Mine wrapped around any HTML form, picked up the HTML validation, and made it look modern. It would prevent those HTML validation popup tooltips, and instead place the error in the aria-describedby element associated with the field (today, aria-errormessage is advised instead).
于是，我构建了一个 HTML Web Component。这些简单的自定义元素包裹在现有的 HTML 周围，赋予其生命力。没有 Shadow DOM，也不在 JavaScript 中渲染（或极少渲染）HTML。我的组件可以包裹任何 HTML 表单，捕获 HTML 验证逻辑，并使其外观现代化。它会阻止那些原生的 HTML 验证弹出提示，转而将错误信息放置在与字段关联的 `aria-describedby` 元素中（现在建议使用 `aria-errormessage`）。

It would clear validation while you typed, if you reached a valid state, and assess it again on blur and submit. Exactly the user experience a form needs, delivered in under 1KB. If it failed, the form would fall back to built-in browser validation. If that failed, the backend API would handle validation. We reported validation issues to the user as early as possible given their browser, and always fell back to an acceptable experience if it failed.
它会在用户输入时清除验证状态（如果已达到有效状态），并在失去焦点或提交时重新评估。这正是表单所需要的用户体验，且体积不到 1KB。如果组件失效，表单会回退到浏览器内置验证；如果内置验证也失效，后端 API 会处理验证。我们根据用户浏览器的能力，尽可能早地向用户反馈验证问题，并确保在任何情况下都能提供可接受的体验。

I have since written a new version of this web component from scratch, aimed for general use. It’s called validation-enhancer. I have been in this industry for over 20 years, and it is the best form validation library I have ever used. I am very proud of it. The code is so simple to work with:
此后，我从零开始重写了这个 Web Component，旨在供通用场景使用。它叫 `validation-enhancer`。我在这个行业工作了 20 多年，这是我用过最好的表单验证库，我为此感到非常自豪。它的代码使用起来非常简单：

`<validation-enhancer> <form> <label for="my` ...
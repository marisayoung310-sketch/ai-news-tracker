---
title: "Personality Quiz SEO: How We Index Result Pages for Origin Of You at Inithouse"
originalUrl: "https://dev.to/jakub_inithouse/personality-quiz-seo-how-we-index-result-pages-for-origin-of-you-at-inithouse-1925"
date: "2026-06-23T22:49:56.670Z"
---

# Personality Quiz SEO: How We Index Result Pages for Origin Of You at Inithouse
# 个性测试 SEO：我们在 Inithouse 如何为 Origin Of You 的结果页面建立索引

Most personality quiz apps treat their quiz page as the money page. Big hero, catchy CTA, maybe a testimonial. Then they wonder why Google ignores it. We run a portfolio of products at Inithouse, a studio shipping apps in parallel. Two of them deal heavily with per-user result pages: Origin Of You (a self-discovery app combining 5 personality frameworks into a single portrait) and Tarotas (a tarot reading app with per-card interpretations in 5 languages). Here is what we learned about getting quiz-style content to rank.

大多数个性测试应用都将测试页面视为核心页面（Money Page）。放上大图、醒目的行动号召（CTA），或许再加点用户评价，然后就纳闷为什么 Google 对其视而不见。我们在 Inithouse 运营着一系列产品，这是一个并行开发多款应用的工作室。其中两款产品大量涉及用户个性化结果页面：Origin Of You（一款将 5 种人格框架结合为单一画像的自我探索应用）和 Tarotas（一款提供 5 种语言、针对每张卡牌进行解读的塔罗牌应用）。以下是我们关于如何让测试类内容获得排名的经验总结。

### The quiz page is invisible to Google
### 测试页面对 Google 是“隐形”的

A typical quiz page is interactive JavaScript: questions, progress bars, conditional logic. Googlebot sees a shell. Even with SSR, the page content is generic ("Take our personality quiz!") with no long-tail keyword density. There is nothing for Google to differentiate from ten thousand other quiz pages. The insight: Google does not want to rank your quiz. It wants to rank the answer.

典型的测试页面是交互式 JavaScript：包含问题、进度条和条件逻辑。Googlebot 看到的只是一个外壳。即使使用了服务端渲染（SSR），页面内容也往往非常通用（例如“参加我们的个性测试！”），缺乏长尾关键词密度。对于 Google 来说，这与成千上万个其他测试页面毫无区别。核心洞察是：Google 并不想给你的“测试”排名，它想给“答案”排名。

### Result pages are the real content
### 结果页面才是真正的内容

Every personality result, every tarot card reading, every quiz outcome should have its own URL with standalone content. Not a modal. Not a query parameter. A real page. For Origin Of You, this means each of the personality profiles gets a dedicated route with 300+ words of unique text, related profiles for internal linking, and structured metadata. For Tarotas, each of the 78 cards has its own page across 5 languages: that is 390 indexable URLs from a single content model.

每一个个性测试结果、每一次塔罗牌解读、每一个测试结论都应该拥有独立的 URL 和独立的内容。不是弹窗，也不是查询参数，而是一个真正的页面。对于 Origin Of You 来说，这意味着每一种人格画像都有一个专属路径，包含 300 字以上的独特文本、用于内部链接的相关画像，以及结构化元数据。对于 Tarotas，78 张卡牌中的每一张在 5 种语言下都有自己的页面：这意味着通过单一内容模型生成了 390 个可索引的 URL。

The pattern works because result pages match real search intent. Nobody searches "take personality quiz." They search "INFJ personality traits," "co znamena karta smrti tarot," "am I an introvert or ambivert." Those queries land on result pages, not quiz pages.

这种模式之所以有效，是因为结果页面匹配了真实的搜索意图。没有人会搜索“参加个性测试”，他们搜索的是“INFJ 人格特质”、“死神牌的含义（塔罗）”、“我是内向还是外向”。这些查询会引导用户进入结果页面，而不是测试页面。

### Long-tail intent in local languages
### 本地语言的长尾意图

English personality queries are competitive. But localized variants in smaller markets? Wide open. We see this clearly with Tarotas. Czech queries like "karta smrti vyznam" or "tarot vyklad karet zdarma" have decent volume and almost no competition from quality content. The same applies to Slovak, Polish, and German. For Origin Of You, Czech queries around "test osobnosti zdarma" or "jaky jsem typ osobnosti" convert well because the app already speaks the language natively. The play: if your quiz targets multiple languages, each language variant of each result page is a separate indexable entity. Multiply your result count by your language count. That is your real page inventory.

英语个性查询竞争激烈，但在较小市场的本地化变体中呢？机会巨大。我们在 Tarotas 上清楚地看到了这一点。捷克语查询如“karta smrti vyznam”（死神牌含义）或“tarot vyklad karet zdarma”（免费塔罗牌占卜）拥有不错的搜索量，且几乎没有高质量内容的竞争。斯洛伐克语、波兰语和德语也是如此。对于 Origin Of You，围绕“test osobnosti zdarma”（免费人格测试）或“jaky jsem typ osobnosti”（我是什么人格类型）的捷克语查询转化率很高，因为该应用本身就支持这些语言。策略是：如果你的测试针对多种语言，那么每个结果页面的每种语言版本都是一个独立的可索引实体。将你的结果数量乘以语言数量，那才是你真正的页面库存。

### JSON-LD: Quiz schema vs Article
### JSON-LD：Quiz Schema 与 Article Schema 的对比

Google supports Quiz schema markup (under LearningResource). We tested it. The honest answer: it does not move the needle yet for personality-style quizzes. Google treats it as educational assessment markup (think: math quiz, certification test), not entertainment or self-discovery. What works better: Article or WebPage schema on result pages with clear name, description, and about properties. Add FAQPage schema if you include common questions about the result type. Keep it simple.

Google 支持 Quiz Schema 标记（属于 LearningResource）。我们测试过，老实说：对于个性测试类内容，它目前并没有什么实质性帮助。Google 将其视为教育评估标记（例如数学测验、认证考试），而不是娱乐或自我探索。更好的做法是：在结果页面上使用 Article 或 WebPage Schema，并清晰地标注名称（name）、描述（description）和关于（about）属性。如果你包含关于结果类型的常见问题，可以添加 FAQPage Schema。保持简单即可。

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "name": "The Mediator Personality Profile",
  "description": "Deep dive into the Mediator archetype...",
  "about": {
    "@type": "Thing",
    "name": "Mediator personality type"
  }
}
```

### Internal linking: result pages link to each other
### 内部链接：结果页面之间的互链

Each result page should link to 3-5 related results. "You got Mediator? Compare with The Advocate and The Idealist." This creates a dense internal link graph that Google crawls efficiently. For Tarotas, every card page links to cards in the same suit and cards with thematic connections. For Origin Of You, each profile links to complementary and contrasting types. The bonus: users click these links. Average pages per session goes up. Google notices.

每个结果页面都应链接到 3-5 个相关结果。例如：“你是调停者？对比一下倡导者和理想主义者。”这会创建一个密集的内部链接图谱，供 Google 高效抓取。对于 Tarotas，每张卡牌页面都会链接到同花色的卡牌以及具有主题关联的卡牌。对于 Origin Of You，每个画像都会链接到互补和对比的人格类型。额外的好处是：用户会点击这些链接，单次会话的平均页面浏览量会上升，Google 会注意到这一点。

### The checklist
### 检查清单

If you are building a quiz app and want organic traffic:
如果你正在开发一款测试应用并希望获得自然流量：

*   Give every result its own URL with 300+ words of unique content.
    为每个结果提供独立的 URL，并包含 300 字以上的独特内容。
*   Target long-tail queries in the user's language, not generic "take quiz" terms.
    针对用户语言的长尾查询进行优化，而不是使用通用的“参加测试”类词汇。
*   Use Article schema on result pages, skip Quiz schema for now.
    在结果页面使用 Article Schema，暂时跳过 Quiz Schema。
*   Build internal links between related results (3-5 per page).
    在相关结果之间建立内部链接（每页 3-5 个）。
*   Multiply by languages: each locale of each result is a page.
    按语言倍增：每个结果的每个语言版本都是一个独立页面。
*   Treat the quiz page itself as a funnel entry point, not an SEO target.
    将测试页面本身视为漏斗入口，而不是 SEO 的目标页面。

We still experiment with this at Inithouse. Some things work, some do not. But the core principle holds: in quiz apps, the answers rank, not the questions.
我们在 Inithouse 仍在进行相关实验。有些方法有效，有些则不然。但核心原则始终不变：在测试类应用中，是“答案”在获得排名，而不是“问题”。
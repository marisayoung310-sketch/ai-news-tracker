---
title: "The Big Con of Agentic AI"
originalUrl: "https://towardsdatascience.com/the-big-con-of-agentic-ai/"
date: "2026-07-10T22:37:44.468Z"
---

# The Big Con of Agentic AI
# 代理式 AI 的惊天骗局

**Agentic AI: What our over-dependence on external consulting teaches us about delegating our minds to machines**
**代理式 AI：我们对外部咨询的过度依赖，如何揭示了将思维外包给机器的风险**

Chinmay Kakatkar | Jul 10, 2026
Chinmay Kakatkar | 2026年7月10日

Reading through the latest wave of articles, opinion pieces, and forecasts from consultants and AI vendors, all confidently predicting the imminent takeover of human work by agentic AI, I recently found myself thinking about my first year at Imperial College London, back in 2009. Our lecturer for the introductory programming course would often tell us to sketch out the solutions to coursework assignments with pen and paper before coding them up on a computer, because that slower, more deliberate process of writing and drawing by hand can help establish a deeper understanding of the subject matter and lead to better solutions.
阅读了近期由咨询师和 AI 厂商发布的一系列文章、评论和预测，它们都自信地预言代理式 AI 即将接管人类工作。这让我不禁回想起 2009 年我在伦敦帝国理工学院的第一年。当时，我们的编程入门课讲师经常告诉我们，在电脑上编写代码之前，先用纸笔勾勒出作业的解决方案。因为那种更缓慢、更深思熟虑的手写和绘图过程，有助于建立对学科内容的深刻理解，从而得出更好的方案。

Today that advice seems more pertinent than ever. The seductive promise of AI has drawn in individuals, organizations, and governments alike. A student submits an AI-generated essay, bypassing the cognitive struggle through which writing becomes understanding. A company replaces human employees with AI agents, shedding the tacit, institutional knowledge needed to evaluate the AI output. A court supplements sentencing decisions with opaque and potentially biased algorithmic risk scores. Whatever the motivation in each case, ceding cognition, judgment, and accountability to AI may well become the default over time, until our dependency on AI — and the players in its broader ecosystem — gets so deeply embedded and normalized that reversing it seems neither necessary nor feasible.
今天，这条建议显得比以往任何时候都更加中肯。AI 诱人的承诺吸引了个人、组织乃至政府。学生提交 AI 生成的论文，绕过了通过写作实现理解的认知过程；公司用 AI 代理取代人类员工，丢弃了评估 AI 输出所需的隐性机构知识；法院利用不透明且可能存在偏见的算法风险评分来辅助量刑决策。无论动机如何，随着时间的推移，将认知、判断和问责权让渡给 AI 很可能成为默认模式，直到我们对 AI 及其生态系统参与者的依赖变得如此根深蒂固且常态化，以至于想要扭转这一局面既显得没必要，也不再可行。

This forfeiture of human agency is concerning enough in itself. What makes it more so is that the polished-looking AI output being deferred to is, on closer inspection, often of only generic value, and sometimes simply wrong. There is an illuminating parallel here with the management consulting industry, which performs a strikingly similar confidence trick, or “con”. Consultants routinely package generic analyses in polished presentations and project far greater certainty in their recommendations than the underlying evidence would warrant. Organizations that defer to external consultants wholesale gradually shed the capacity to think for themselves.
这种人类主体性的丧失本身就令人担忧。更令人不安的是，那些被我们盲目采纳的、看起来光鲜亮丽的 AI 输出，经仔细审视后往往只有泛泛的价值，有时甚至完全错误。这与管理咨询行业存在一种发人深省的相似之处——该行业也在玩弄一种极其类似的“信任游戏”或“骗局”。咨询师习惯于将通用的分析包装在精美的演示文稿中，并对其建议表现出远超底层证据所能支撑的确定性。那些全盘依赖外部咨询师的组织，正逐渐丧失独立思考的能力。

Consultants can be wrong, both in the quality of their insights and in their ethical conduct, and AI systems are, at their core, probabilistic pattern matchers with no intrinsic values and no accountability for the outputs they produce. Both derive their authority less from demonstrated correctness than from the asymmetry between the confidence with which their recommendations are delivered and the client’s diminishing ability to challenge them. Taking the consulting industry’s structural dynamic as an instructive analogy, this article synthesizes what we know about our growing dependence on agentic AI, traces the risks of overdependence at the individual, organizational, and societal levels, and proposes ways to reclaim agency at each of those levels before our capacity to do so irretrievably slips away.
咨询师可能会犯错，无论是在洞察质量还是职业道德方面；而 AI 系统本质上只是概率性的模式匹配器，没有内在价值观，也不对其产生的输出承担责任。两者权威的来源，与其说是被证明的正确性，不如说是“建议交付时的自信”与“客户质疑能力下降”之间的不对称。本文将咨询行业的结构性动态作为一种启发性类比，综合了我们对日益增长的代理式 AI 依赖的认知，追踪了个人、组织和社会层面的过度依赖风险，并提出了在这些能力彻底丧失之前，如何重新夺回主体性的方法。

### The Original Con
### 最初的骗局

In 2023, the economists Mariana Mazzucato and Rosie Collington published *The Big Con*, arguing that a confluence of incentive structures, information asymmetries, and institutional pressures had allowed the management consulting industry to extract returns in excess of the value it creates. Surely, sophisticated clients would simply stop hiring expensive firms that did not deliver? Not quite, since a client who outsources a strategic function over many years may no longer possess the internal expertise to evaluate whether the advice it receives is sound, which is a key dynamic that perpetuates the engagement.
2023 年，经济学家玛丽安娜·马祖卡托（Mariana Mazzucato）和罗西·科林顿（Rosie Collington）出版了《大骗局》（*The Big Con*），指出激励结构、信息不对称和制度压力的汇合，使得管理咨询行业能够获取超过其创造价值的回报。当然，成熟的客户难道不会停止聘用那些无法交付成果的高价公司吗？并非如此，因为一个长期将战略职能外包的客户，可能不再具备评估所获建议是否合理的内部专业知识，而这正是维持这种合作关系的关键动态。

The parallel with today’s AI vendors is noteworthy: deep integration, high costs, and a customer base that progressively grows less capable of evaluating what it is being sold. Despite its conspiratorial connotation, the central problem *The Big Con* highlights is structural rather than moral. Many consultants in Mazzucato and Collington’s account were genuinely trying to have a positive impact, and many of the officials who hired them were doing their best to act responsibly under budget and staffing pressures. The arrangement required neither cynicism from the consultants nor negligence from the clients, but simply that repeated delegation be allowed to run its natural course.
与当今 AI 厂商的相似之处值得注意：深度集成、高昂成本，以及客户群评估所购产品的能力逐渐下降。尽管“骗局”一词带有阴谋论色彩，但《大骗局》强调的核心问题是结构性的，而非道德上的。马祖卡托和科林顿书中的许多咨询师确实在努力产生积极影响，而聘用他们的许多官员也是在预算和人员压力下尽力负责。这种安排既不需要咨询师的玩世不恭，也不需要客户的疏忽大意，仅仅是让反复的“外包”顺其自然地发展而已。

What *The Big Con* ultimately offers is less a critique of any industry or individual than a warning about how markets reward short-termism. Outsourcing as a “rationalization” measure can paint a falsely favorable financial picture in the near term, shield decision makers by externalizing accountability, and hollow out the capability to strategize and execute. It is the corporate equivalent of managing fitness through expensive personal trainers rather than developing the habit of exercise yourself: no doubt, trainers can deliver real value, but they can also build (over-)dependence rather than self-sufficiency.
《大骗局》最终提供的与其说是对某个行业或个人的批评，不如说是对市场如何奖励短期主义的警告。将外包作为一种“合理化”手段，可以在短期内描绘出一幅虚假的财务利好图景，通过外部化问责来保护决策者，并掏空自身的战略规划和执行能力。这相当于企业通过昂贵的私人教练来管理健康，而不是培养自己的锻炼习惯：毫无疑问，教练可以提供真正的价值，但他们也可能建立起（过度）依赖，而非自给自足。

The mechanism at work is something akin to the dark side of what management scholars call “unlearning by not doing.” The less an organization performs a function internally, the less it knows how to do it; the less it knows, the more it needs outside help; and the more it pays for outside help, the less it builds the knowledge that would eventually make outside help unnecessary. A reform movement that swept through public administration from the 1980s onward, in the U.S. and beyond, popularized exactly this logic under the slogan “steer more, row less.” But Mazzucato and Collington show why that approach backfired for those functions where doing and directing cannot be cleanly separated. As they put it, “The less [an organization] rows, the less it learns, the less productive it becomes: the less it can steer.”
其运作机制类似于管理学者所说的“因不做而遗忘”（unlearning by not doing）的阴暗面。一个组织内部执行某项职能越少，就越不知道如何去做；知道得越少，就越需要外部帮助；而为外部帮助支付的费用越多，就越无法积累那些最终能让外部帮助变得多余的知识。从 20 世纪 80 年代开始，一场席卷美国及其他地区公共行政部门的改革运动，以“多掌舵，少划桨”（steer more, row less）为口号推广了这一逻辑。但马祖卡托和科林顿指出，对于那些“做”与“导”无法明确分离的职能，这种方法为何会适得其反。正如他们所言：“（一个组织）划桨越少，学到的就越少，生产力就越低：它能掌舵的能力也就越弱。”
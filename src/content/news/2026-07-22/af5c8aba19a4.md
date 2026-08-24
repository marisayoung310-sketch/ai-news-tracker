---
title: "AI Didn't Kill Software Engineering. It Made It More Valuable Than Ever."
originalUrl: "https://dev.to/jlio_csarkdel_6c306c2/ai-didnt-kill-software-engineering-it-made-it-more-valuable-than-ever-4o9n"
date: "2026-07-21T22:22:18.125Z"
---

# AI Didn't Kill Software Engineering. It Made It More Valuable Than Ever.
# AI 没有终结软件工程，反而使其价值倍增。

We've Been Asking the Wrong Question. For years the industry asked: "Will AI replace software developers?" Now we know that isn't the right question. The better question is: What becomes valuable when writing code is no longer expensive? That single shift changes software engineering.
多年来，我们一直问错了问题。业界一直在问：“AI 会取代软件开发人员吗？”现在我们知道，这并不是正确的问题。更好的问题是：当编写代码不再昂贵时，什么才变得有价值？这一单一的转变改变了软件工程。

For decades every major methodology—from Waterfall to Agile, DDD and Clean Architecture—evolved in a world where writing software was expensive. Documentation aged quickly because updating it was costly. Specifications were abandoned because implementation consumed weeks. Generative AI changed that assumption. Writing code is now almost free. Value moved elsewhere.
几十年来，每一种主流方法论——从瀑布模型到敏捷开发，从领域驱动设计（DDD）到整洁架构——都是在编写软件成本高昂的世界中演变而来的。文档很快就会过时，因为更新它的成本很高。规范被废弃，因为实现过程需要数周时间。生成式 AI 改变了这一假设。现在编写代码几乎是免费的，价值已经转移到了其他地方。

Code Is Cheap. Judgment Isn't. Modern LLMs generate hundreds of lines of code in seconds. They do not decide: what should be built; which business rules matter; which edge cases deserve attention; what architectural trade-offs should survive for years. Those remain engineering decisions.
代码很廉价，但判断力不是。现代大语言模型（LLM）可以在几秒钟内生成数百行代码。它们无法决定：应该构建什么；哪些业务规则重要；哪些边缘情况值得关注；哪些架构权衡应该在未来几年内保持有效。这些仍然是工程决策。

The Bottleneck Has Moved. Typing is no longer the bottleneck. Thinking is. Specifications. Architecture. Acceptance criteria. Code review. Engineering has become less about producing code and more about producing clarity.
瓶颈已经转移。打字不再是瓶颈，思考才是。规范、架构、验收标准、代码审查。工程学已经不再仅仅是关于产出代码，而是更多地关于产出清晰度。

Why Vibe Coding Doesn't Scale. Chats are a poor long-term source of truth. Every prompt expands the context window. Every correction burns more tokens. Eventually the model reasons about the conversation rather than the software. That is the hidden cost of vibe coding.
为什么“感觉编程”（Vibe Coding）无法扩展？聊天记录不是长期的真理来源。每一个提示词都会扩大上下文窗口，每一次修正都会消耗更多的 Token。最终，模型是在对对话进行推理，而不是对软件本身。这就是“感觉编程”的隐形成本。

Specifications Become the Project Memory. That realization led me to write Spec Driven Development. Instead of relying on conversations, every feature starts with a specification, evolves into a plan, becomes executable tasks and only then turns into code. The outcome is straightforward: fewer ambiguities; fewer tokens; less rework; more predictable software. (https://books.kodel.com.br/en/books/sdd/)
规范成为项目的记忆。这一认识促使我编写了《规范驱动开发》（Spec Driven Development）。不再依赖对话，每个功能都从规范开始，演变为计划，成为可执行的任务，最后才转化为代码。结果显而易见：更少的歧义、更少的 Token 消耗、更少的返工，以及更可预测的软件。

But Specifications Need Architecture. Great specifications cannot rescue a chaotic codebase. Architecture exists to answer one question: Where does this belong? That question inspired FOCUS Architecture. Rather than multiplying layers, it organizes software around four responsibilities: View, Orchestrator, Use Cases, Repository. Its purpose isn't novelty. Its purpose is lowering the cost of change. In the AI era that also means smaller context windows, fewer tokens and fewer unintended modifications. (https://books.kodel.com.br/en/books/focus/)
但规范需要架构。优秀的规范无法拯救混乱的代码库。架构的存在是为了回答一个问题：这段代码应该放在哪里？这个问题启发了 FOCUS 架构。它不是增加层级，而是围绕四个职责组织软件：视图（View）、编排器（Orchestrator）、用例（Use Cases）和仓库（Repository）。其目的不是标新立异，而是降低变更成本。在 AI 时代，这也意味着更小的上下文窗口、更少的 Token 消耗以及更少的意外修改。

Standing on Giants. Neither book claims to reinvent software engineering. Both synthesize decades of work from Martin Fowler, Kent Beck, Eric Evans, Bertrand Meyer, Robert C. Martin, Andrew Hunt, David Thomas and many others, reinterpreting timeless ideas for AI-assisted development.
站在巨人的肩膀上。这两本书都没有声称要重塑软件工程。它们都综合了 Martin Fowler、Kent Beck、Eric Evans、Bertrand Meyer、Robert C. Martin、Andrew Hunt、David Thomas 等人的数十年工作成果，为 AI 辅助开发重新诠释了那些永恒的理念。

Two Books. One Goal. Spec Driven Development structures engineering thinking. FOCUS Architecture structures engineering systems. One answers what should be built. The other answers where it belongs. Together they help human engineers and AI agents build software that remains understandable years after it ships.
两本书，一个目标。《规范驱动开发》构建工程思维，《FOCUS 架构》构建工程系统。前者回答应该构建什么，后者回答它应该放在哪里。它们共同帮助人类工程师和 AI 代理构建出在发布多年后依然易于理解的软件。

Final Thoughts. AI made code inexpensive. Engineering became even more valuable. The future won't belong to teams with the best AI. It will belong to teams with the best engineering discipline.
结语。AI 让代码变得廉价，工程学变得比以往任何时候都更有价值。未来不属于拥有最强 AI 的团队，而属于拥有最严谨工程纪律的团队。
---
title: "GRID: Grammar-Railed Decoding for Enterprise SQL Generation"
originalUrl: "https://arxiv.org/abs/2607.11951"
date: "2026-07-15T22:22:03.749Z"
---

# GRID: Grammar-Railed Decoding for Enterprise SQL Generation
# GRID：面向企业级 SQL 生成的语法约束解码技术

**Abstract:** Large language models can write SQL, but enterprise deployment demands more than plausible text: outputs must be syntactically valid, must respect per-role and per-schema policy, must carry provable (not best-effort) guarantees, must not slow down as generations grow, and must leave a compliance-grade record of every decision.

**摘要：** 大型语言模型虽然能够编写 SQL，但企业级部署的需求远不止于生成看似合理的文本：输出结果必须在语法上有效，必须遵守基于角色和架构的策略，必须具备可证明的（而非尽力而为的）保证，必须在生成长度增加时保持性能，并且必须为每一个决策留下符合合规性要求的记录。

We present GRID (Grammar-Railed Decoding), a grammar-constrained decoding engine that keys exact next-token masks on parser configurations (lexer scan state x LALR(1) stack) rather than on token sequences, and uses the incrementally advanced LALR(1) parser itself as a viable-prefix oracle. LLM tokens are bridged to grammar terminals by a byte-level trie walk with a context-independent/context-dependent split that makes cache-key soundness hold by construction.

我们提出了 GRID（语法约束解码），这是一种语法约束解码引擎。它基于解析器配置（词法扫描状态 x LALR(1) 堆栈）而非标记序列来锁定精确的下一个标记掩码，并利用增量推进的 LALR(1) 解析器本身作为可行前缀的预言机。通过基于字节的 Trie 树遍历，结合上下文无关/上下文相关的拆分，LLM 标记被桥接到语法终结符，从而在构建层面确保了缓存键的稳健性。

Role-based access control is compiled into the language: role projections subset the grammar's productions and schema lexicons restrict identifier terminals, so forbidden verbs and identifiers are unreachable at mask level. Four guarantees (soundness, completeness, termination, and near-constant per-token cost) are stated with explicit preconditions and each paired with a test or benchmark.

基于角色的访问控制（RBAC）被编译进语言中：角色投影对语法的产生式进行子集化，架构词典限制了标识符终结符，因此在掩码层面，被禁止的动词和标识符是不可达的。文中明确提出了四项保证（稳健性、完备性、终止性和近乎恒定的单标记成本），并为每一项保证提供了明确的前提条件及相应的测试或基准验证。

Rust kernels bring the per-token mask to a 3.6-6.7 us median, ahead of llguidance at p50 and p90 on two tokenizers with zero false rejects; per-token guard cost is position-flat at n=16,000. On Spider, constrained decoding is worth +13 execution-accuracy points at 0.5B, and one checker-guided repair pass over the provably mask-unenforceable residue (column-level policy) lifts a 7B model to 94.5% executable.

Rust 内核将单标记掩码的延迟中位数控制在 3.6-6.7 微秒，在两种分词器上的 p50 和 p90 指标均优于 llguidance，且零误拒；在 n=16,000 时，单标记防护成本保持平稳。在 Spider 基准测试中，约束解码使 0.5B 模型在执行准确率上提升了 13 个百分点；通过一次由检查器引导的修复过程处理无法通过掩码强制执行的残留部分（列级策略），7B 模型的执行成功率提升至 94.5%。

A hash-chained per-token audit trail replays bit-identically with 100% tamper detection. We state plainly what the mask cannot do (distribution faithfulness, column-level RBAC, non-LALR(1) languages) and where measured cost remains.

基于哈希链的单标记审计追踪支持位级精确重放，并具备 100% 的防篡改检测能力。我们明确指出了该掩码无法实现的功能（如分布保真度、列级 RBAC、非 LALR(1) 语言）以及当前仍存在的成本开销。
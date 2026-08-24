---
title: "Validating the RAG Answer Before the User Sees It: Spans, Quotes, and the Feedback Loop"
originalUrl: "https://towardsdatascience.com/validating-the-rag-answer-before-the-user-sees-it-spans-quotes-and-the-feedback-loop/"
date: "2026-07-06T22:49:25.062Z"
---

# Validating the RAG Answer Before the User Sees It: Spans, Quotes, and the Feedback Loop
# 在用户看到 RAG 答案前进行验证：跨度、引用与反馈循环

**Enterprise Document Intelligence [Vol.1 #8C] – Structured output is the start of validation, not the end: check the evidence, accept not-found, loop the feedback**
**企业文档智能 [第1卷 #8C] —— 结构化输出只是验证的开始，而非终点：核实证据、接受“未找到”结果、构建反馈循环**

Kezhan Shi | Jul 6, 2026 | 26 min read
Kezhan Shi | 2026年7月6日 | 26分钟阅读

This article closes the generation brick of Enterprise Document Intelligence, a series that builds an enterprise RAG system from four bricks: document parsing, question parsing, retrieval, and generation. Article 8A (the answer contract) declared the typed answer schema; Article 8B (prompt assembly) built the dispatcher that calls the model against it. This part is about what happens after the model answers: the validator that checks spans, quotes, and formats; not found as a first-class output; the join that lifts citations to rectangles on the PDF; and the feedback loops that turn generation from a terminal step into a step the pipeline can react to.
本文标志着“企业文档智能”系列中“生成”模块的完结。该系列旨在通过四个模块构建企业级 RAG 系统：文档解析、问题解析、检索和生成。第 8A 篇（答案契约）定义了类型化的答案模式；第 8B 篇（提示词组装）构建了调用模型的调度器。本篇将探讨模型回答之后的过程：用于检查跨度（spans）、引用和格式的验证器；将“未找到”作为一等输出；将引用映射到 PDF 矩形区域的连接逻辑；以及将生成过程从终端步骤转变为流水线可响应环节的反馈循环。

Generation is the fourth brick. A reader landing here can pick up the first three from their own articles: Document parsing, the PDF turned into structured tables: Article 5A (what to read in a PDF) and Article 5B (the relational data model). Question parsing, the user string turned into a typed ParsedQuestion: Article 6A (the thesis), Article 6B (extraction), and Article 6C (dispatch). Retrieval, the passages filtered down to what should hold the answer: Article 7A (retrieval as filtering), Article 7B (anchor detection), and Article 7C (the LLM arbiter).
生成是第四个模块。初次阅读的读者可以从之前的文章中了解前三个模块：文档解析（将 PDF 转换为结构化表格）：第 5A 篇（PDF 读取内容）和第 5B 篇（关系数据模型）。问题解析（将用户字符串转换为类型化的 ParsedQuestion）：第 6A 篇（论点）、第 6B 篇（提取）和第 6C 篇（调度）。检索（将段落过滤至包含答案的内容）：第 7A 篇（作为过滤的检索）、第 7B 篇（锚点检测）和第 7C 篇（LLM 仲裁器）。

### 1. Trust but verify
### 1. 信任但要验证

A typed answer is not a checked answer. Structured output is the start of validation, not the end. The model still cites lines outside the input range, paraphrases quotes it swore were verbatim, sets complete_answer_found=True on a partial answer, and returns shapes the brief didn’t ask for. The fix is post-generation validation. The validator takes the parsed question alongside the answer so it can flag shape mismatches against what was requested.
类型化的答案并不等于经过校验的答案。结构化输出只是验证的开始，而非终点。模型仍然会引用输入范围之外的行，将它声称是“逐字引用”的内容进行改写，在仅找到部分答案时将 `complete_answer_found` 设为 `True`，并返回指令未要求的格式。解决方法是进行生成后验证。验证器将解析后的问题与答案一并处理，从而能够标记出与请求格式不符的差异。

Three checks combine:
*   **Shape:** the returned answer must be an instance of the schema the registry picked for the brief, with items populated when answer_found=True.
*   **Evidence:** every Span must reference a real line range, every quote must be a substring of the cited lines after a tolerant whitespace + bibliographic-refs normalization.
*   **Format:** ISO 8601 for dates, ISO 4217 for currencies, etc.
三项检查结合如下：
*   **形状（Shape）：** 返回的答案必须是注册表中为该任务选定的模式实例，且当 `answer_found=True` 时，必须填充相应条目。
*   **证据（Evidence）：** 每个跨度（Span）必须引用真实的行范围；在经过容错空格和参考文献规范化处理后，每个引用必须是所引行内容的子字符串。
*   **格式（Format）：** 日期需符合 ISO 8601，货币需符合 ISO 4217 等。

### 1.1 The validator
### 1.1 验证器实现

Below is the implementation. Notice the per-item, per-span loop: each problem is reported individually so the failure mode is visible at a glance (a wrong span on item 2 doesn’t hide a wrong currency on item 3).
以下是实现代码。请注意针对每个条目和每个跨度的循环：每个问题都会被单独报告，以便一眼就能看出故障模式（条目 2 的跨度错误不会掩盖条目 3 的货币错误）。

```python
def validate_answer(answer: AnswerBase, line_df: pd.DataFrame, parsed_q: ParsedQuestion | None = None) -> list[str]:
    errors: list[str] = []
    valid_lines = set(line_df["overall_line_num"].values)
    
    if parsed_q is not None:
        ExpectedSchema = ANSWER_REGISTRY[parsed_q.expected_answer_shape]
        if not isinstance(answer, ExpectedSchema):
            errors.append(f"shape mismatch: {ExpectedSchema.__name__} expected")
            
    if bool(answer.items) != answer.answer_found:
        errors.append(f"answer_found mismatch len(items)={len(answer.items)}")
        
    for i, item in enumerate(answer.items):
        if not item.spans:
            errors.append(f"item[{i}] has no spans")
        for j, sp in enumerate(item.spans):
            if sp.line_start not in valid_lines:
                errors.append(f"line_start {sp.line_start} not in input")
            if sp.line_end < sp.line_start:
                errors.append(f"line_end before line_start")
            if sp.quote:
                cited = _join_cited_lines(line_df, sp)
                if _normalize(sp.quote) not in _normalize(cited):
                    errors.append(f"quote not verbatim in cited lines")
                    
        if (date := getattr(item, "date", None)) is not None:
            if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", date.iso):
                errors.append(f"date.iso not YYYY-MM-DD")
        if (amt := getattr(item, "amount", None)) is not None:
            if not re.fullmatch(r"[A-Z]{3}", amt.currency):
                errors.append(f"currency not ISO 4217")
                
        if answer.extraction_method == "verbatim" and not any(sp.quote for sp in item.spans):
            errors.append(f"verbatim but no quote")
            
    return errors
```

One axis the loop doesn’t cover: fields against each other. Every check above reads one field at a time. The next category is cross-field: constraints where two fields have to agree. A contract’s start_date must precede its end_date; the line items of an invoice must sum to its stated total. The schema hints at where this bites: a value with extraction_method="computed" (a total the model added up rather than read off the page) is exactly what should be reconciled against its parts.
该循环未覆盖的一个维度是：字段间的相互校验。上述检查均是逐个字段进行的。下一类是跨字段校验：即两个字段必须保持一致的约束。例如，合同的开始日期必须早于结束日期；发票的明细项总和必须等于其标明的总额。模式定义暗示了这一点：当 `extraction_method="computed"`（即模型计算出的总额而非直接从页面读取）时，正是需要与各组成部分进行核对的地方。

### 1.2 Verbatim is harder than it sounds
### 1.2 “逐字引用”比听起来更难

Run the validator on the actual model output for the Attention Is All You Need paper... Three recurring causes:
*   **Whitespace and bibliographic refs:** The PDF parser splits one logical paragraph into 5-10 physical lines; the model rebuilds it as one string with single spaces. Source lines often carry [9]-style refs the model strips. Both look “wrong” but are semantically faithful.
*   **Adjacent-line conflation:** The model picks the wrong line number for a quote, often pointing at the line after the.
在针对《Attention Is All You Need》论文的实际模型输出上运行验证器时……有三个反复出现的原因：
*   **空格与参考文献：** PDF 解析器将一个逻辑段落拆分为 5-10 个物理行；模型将其重组为带有单空格的字符串。源行通常带有模型会剔除的 [9] 样式的引用。两者看起来都“不对”，但在语义上是忠实的。
*   **相邻行混淆：** 模型为引用选择了错误的行号，通常指向了目标行之后的那一行。
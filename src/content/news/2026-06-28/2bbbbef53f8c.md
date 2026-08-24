---
title: "Building a RAG System from Scratch — Tool Use: Let the LLM Search Autonomously"
originalUrl: "https://dev.to/hiroki-kameyama/building-a-rag-system-from-scratch-tool-use-let-the-llm-search-autonomously-29ho"
date: "2026-06-27T22:37:54.752Z"
---

# Building a RAG System from Scratch — Tool Use: Let the LLM Search Autonomously
# 从零构建 RAG 系统 — 工具调用：让 LLM 自主搜索

In the previous article, we examined the design decisions behind our RAG pipeline. Now we'll give the LLM the ability to call our search functions autonomously — this is Tool Use.
在上一篇文章中，我们探讨了 RAG 流水线背后的设计决策。现在，我们将赋予 LLM 自主调用搜索函数的能力——这就是“工具调用”（Tool Use）。

### What Changes with Tool Use
### 工具调用带来了什么改变

In our RAG pipeline so far, we always called `search()` before generating an answer. The flow was hardcoded:
在目前的 RAG 流水线中，我们总是先调用 `search()` 再生成答案。流程是硬编码的：
`question → search() → generate_answer()`

With Tool Use, the LLM decides whether to search, what to search for, and when it has enough information to answer:
引入工具调用后，LLM 可以自行决定是否搜索、搜索什么内容，以及何时拥有足够的信息来回答：
`question → LLM decides → search() if needed → LLM decides → answer`

This matters when:
这在以下情况尤为重要：
* The question might already be answerable without retrieval
* 问题无需检索即可回答
* The right search query isn't the same as the user's question
* 正确的搜索查询词与用户的原始问题不一致
* Multiple searches with different queries improve the answer
* 使用不同的查询词进行多次搜索可以提升回答质量

### How Tool Use Works
### 工具调用是如何工作的

The LLM is given a list of available functions with their signatures and descriptions. It responds with either:
我们会向 LLM 提供一份可用函数列表，包含其签名和描述。LLM 会做出以下两种响应之一：
* A `function_call` — "call this function with these arguments"
* `function_call` —— “请使用这些参数调用此函数”
* A text answer — "I have enough information to answer directly"
* 文本回答 —— “我已经有足够的信息直接回答了”

Your code executes the function call and sends the result back. The LLM then decides whether to call another function or produce a final answer.
你的代码负责执行函数调用并将结果传回。随后，LLM 会决定是继续调用其他函数，还是给出最终答案。

* You → LLM: "here are available tools + user question"
* 你 → LLM：“这是可用工具 + 用户问题”
* LLM → You: `function_call { name: "search_documents", args: { query: "F1 score" } }`
* LLM → 你：`function_call { name: "search_documents", args: { query: "F1 score" } }`
* You → execute `search_documents("F1 score")` → results
* 你 → 执行 `search_documents("F1 score")` → 得到结果
* You → LLM: `function_result { ... }`
* 你 → LLM：`function_result { ... }`
* LLM → You: "The F1 score is calculated as..."
* LLM → 你：“F1 分数的计算方式是……”

---

### Step 1: Basic Tool Use — 06_tool_basic.py
### 第一步：基础工具调用 — 06_tool_basic.py

```python
# 06_tool_basic.py
import psycopg2
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# ... (Database connection and get_embedding function omitted for brevity)

def search_documents(query: str, top_k: int = 3) -> list[dict]:
    query_embedding = get_embedding(query)
    cur.execute("""
        SELECT title, body, category, 1 - (embedding <=> %s::vector) AS similarity 
        FROM documents 
        ORDER BY embedding <=> %s::vector 
        LIMIT %s;
    """, (query_embedding, query_embedding, top_k))
    rows = cur.fetchall()
    return [ {"title": r[0], "body": r[1], "category": r[2], "similarity": round(r[3], 4)} for r in rows ]

# ── Tool definition ──────────────────────────────────────────
# Instead of calling search_documents() directly, we describe it to the LLM.
# The description is what the LLM uses to decide when to call it.
tools = types.Tool(
    function_declarations=[
        types.FunctionDeclaration(
            name="search_documents",
            description="Search documents in the vector DB for a given query. "
                        "Use this when you need information to answer the question.",
            parameters=types.Schema(
                type=types.Type.OBJECT,
                properties={
                    "query": types.Schema(type=types.Type.STRING, description="The search query"),
                    "top_k": types.Schema(type=types.Type.INTEGER, description="Number of documents to retrieve (default: 3)"),
                },
                required=["query"],
            ),
        ),
    ]
)
```

# ── 工具定义 ──────────────────────────────────────────
# 我们不再直接调用 search_documents()，而是将其描述提供给 LLM。
# LLM 正是根据这些描述来决定何时调用该函数。

```python
def run(question: str):
    print(f"Question: {question}\n")
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=question,
        config=types.GenerateContentConfig(tools=[tools]),
    )
    
    part = response.candidates[0].content.parts[0]
    if part.function_call:
        # LLM decided to call a tool
        func_name = part.function_call.name
        func_args = dict(part.function_call.args)
        print(f"→ LLM called: {func_name}({func_args})")
        result = search_documents(**func_args)
        print(f"→ Retrieved {len(result)} documents")
    else:
        # LLM answered directly without searching
        print(f"→ LLM answered directly (no search needed)")
        print(part.text)

run("How do you calculate the F1 score?")
run("What is 2 + 2?") # LLM should answer this without searching
```

**Output:**
**输出：**
```text
# Question: How do you calculate the F1 score?
# → LLM called: search_documents({'query': 'F1 score calculation'})
# → Retrieved 3 documents
#
# Question: What is 2 + 2?
# → LLM answered directly (no search needed)
# → 4
```
The LLM correctly decides when to search and when not to.
LLM 能够准确判断何时需要搜索，何时不需要。

---

### Step 2: Multiple Tools — 07_tool_multi.py
### 第二步：多工具调用 — 07_tool_multi.py

Now we give the LLM two tools: one for general search and one for category-filtered search. The LLM picks the right one based on the question.
现在我们为 LLM 提供两个工具：一个用于通用搜索，另一个用于按类别过滤的搜索。LLM 会根据问题选择合适的工具。

*(Key additions to the tool definitions)*
*(工具定义的关键补充)*

```python
tools = types.Tool(
    function_declarations=[
        types.FunctionDeclaration(
            name="search_documents",
            description="Search all categories when the category is unknown or the question spans multiple categories.",
            # ... parameters ...
        ),
        types.FunctionDeclaration(
            name="search_by_category",
            description="Search within a specific category (ML, Python, or Cloud). "
                        "Use this when the question clearly targets one category.",
            parameters=types.Schema(
                type=types.Type.OBJECT,
                properties={
                    "query": types.Schema(type=types.Type.STRING),
                    "category": types.Schema(type=types.Type.STRING, description="Category name: ML, Python, or Cloud"),
                    "top_k": types.Schema(type=types.Type.INTEGER),
                },
                required=["query", "category"],
            ),
        ),
    ]
)
```

The description is the routing logic. The LLM...
这些描述就是路由逻辑。LLM 会……
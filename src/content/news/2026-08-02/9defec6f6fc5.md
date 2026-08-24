---
title: "From Software Engineer to AI Engineer - Part 3: Giving it a hand"
originalUrl: "https://dev.to/bjornvdlaan/from-software-engineer-to-ai-engineer-part-3-2o9k"
date: "2026-08-01T22:20:30.716Z"
---

# From Software Engineer to AI Engineer - Part 3: Giving it a hand
# 从软件工程师到 AI 工程师 - 第 3 部分：赋予它“双手”

As we have seen, models are conceptually quite simple: a list of input messages goes in and the model predicts the next token repeatedly to form the output message. It can't reach the internet or your database or Slack. And it cannot reliably do arithmetic or (cringe example incoming) tell you the number of r's in 'strawberry' - remember from part 1 that it never sees the letters, only token IDs.
正如我们所见，模型的概念非常简单：输入一系列消息，模型通过反复预测下一个 token 来生成输出消息。它无法访问互联网、你的数据库或 Slack。它也无法可靠地进行算术运算，或者（尴尬的例子来了）告诉你“strawberry”中有几个 r——请记住第一部分的内容，它从不直接看到字母，只能看到 token ID。

In that sense, the model is like a brain without a body. It can reason through a problem, describe the steps to take, even recite all of Shakespeare. But without a body, the model cannot perform any action. This is where tools come in, and making them is very much like normal software engineering.
从这个意义上说，模型就像一个没有身体的大脑。它可以推理问题、描述解决步骤，甚至背诵莎士比亚全集。但没有身体，模型就无法执行任何操作。这就是工具发挥作用的地方，而构建这些工具的过程与常规软件工程非常相似。

### What a tool actually is
### 什么是工具

Tools are just functions or methods in a programming language. How tool use works under the hood depends on the model, but let's walk through it conceptually. It starts with a catalog of tools that the model can use, often a json list. In the API you pass this catalog as a separate tools parameter and the provider injects it for you:
工具本质上就是编程语言中的函数或方法。工具在底层是如何运作的取决于具体模型，但让我们从概念上梳理一下。它始于一个模型可以使用的工具目录，通常是一个 JSON 列表。在 API 中，你将此目录作为单独的 `tools` 参数传递，提供商会为你将其注入：

```json
[
  {
    "name": "multiply",
    "description": "Multiplies two numbers and returns the result.",
    "parameters": {
      "type": "object",
      "properties": {
        "a": { "type": "number", "description": "The first number." },
        "b": { "type": "number", "description": "The second number." }
      },
      "required": ["a", "b"]
    }
  },
  [..more tools..]
]
```

If the model decides that it wants to use a tool, its output message will be a structured message like we saw in article 2:
如果模型决定使用某个工具，它的输出消息将是我们第二篇文章中看到的结构化消息：

```json
{
  "name": "multiply",
  "arguments": { "a": 24, "b": 57 }
}
```

Your job as an AI engineer is to take such outputs and pass them to (Python) functions that actually perform the action. Then you respond with a structured message:
作为 AI 工程师，你的工作是获取这些输出，并将它们传递给实际执行操作的（Python）函数。然后，你返回一条结构化消息：

```text
Tool result (multiply): { "result": 1368 }
```

The tool result is now part of the model's context window and can, therefore, be used for further reasoning. So how did the model learn to do this? The model was trained on large volumes of tool-use transcripts, so requesting a tool and reading back a result is a pattern it has seen many times. Your tool catalog is the variable part, the runtime configuration if you will.
工具结果现在成为了模型上下文窗口的一部分，因此可以用于进一步的推理。那么模型是如何学会这一点的呢？模型是在海量的工具使用记录上进行训练的，因此请求工具并读取结果是它见过无数次的模式。你的工具目录就是可变的部分，或者说是运行时配置。

### Let's now look at a real example. PayIQ gets its first tool
### 现在让我们看一个真实的例子。PayIQ 获得了它的第一个工具

Payment operations requires deterministic arithmetic, and models are not reliable calculators. Create `app/tools.py` (and an empty `app/__init__.py` so we can import our tools). We will create a tool that calculates refund costs.
支付操作需要确定性的算术运算，而模型并不是可靠的计算器。创建 `app/tools.py`（以及一个空的 `app/__init__.py` 以便我们导入工具）。我们将创建一个计算退款成本的工具。

```python
from langchain_core.tools import tool

@tool
def calculate_refund_cost(
    original_charge_eur: float,
    refund_amount_eur: float,
    processing_fee_pct: float,
    processing_fee_fixed_eur: float,
    refund_admin_fee_eur: float = 0.25,
) -> dict:
    """Calculate what refunding a payment actually costs the merchant.
    Use this whenever the user gives you (a) the original charge amount and 
    (b) the payment method's fee structure (percentage plus fixed fee per transaction).
    Do not guess the fee structure yourself if the user hasn't provided it.
    
    Processing fees paid on the original charge are NOT returned by the processor 
    when you refund, and most processors charge a small admin fee per refund on top.
    The returned total_cost_of_refund_eur represents the merchant's total out-of-pocket 
    cost after the refund is processed: refunded amount + non-refundable original 
    processing fee + refund admin fee.

    Limitations:
    - Assumes the original payment processing fee is fully retained by the processor after a refund.
    - Does not account for currency conversion costs, exchange-rate changes, taxes, etc.
    """
    processing_fee = (
        original_charge_eur * processing_fee_pct / 100 + processing_fee_fixed_eur
    )
    total = refund_amount_eur + refund_admin_fee_eur + processing_fee
    return {
        "refund_amount_eur": round(refund_amount_eur, 2),
        "processing_fee_eur": round(processing_fee, 2),
        "total_cost_of_refund_eur": round(total, 2),
    }
```

Docstrings have always been important guidance for programmers deciding which function to use, and they now fulfill the same role for models choosing between tools. And models actually read the docs, so docstrings are arguably more important than ever.
文档字符串（Docstrings）对于程序员决定使用哪个函数一直很重要，现在它们在模型选择工具时也扮演着同样的角色。而且模型确实会阅读文档，所以文档字符串的重要性可以说比以往任何时候都更加突出。

### Three tips for writing tool docstrings:
### 编写工具文档字符串的三个技巧：

1. **Say when, not just what.** "Use this whenever the user gives you (a)... and (b)..." - that is routing logic helping the model choose between tools. A docstring that only describes the computation leaves the when to chance.
1. **说明何时使用，而不仅仅是做什么。** “每当用户提供 (a)... 和 (b)... 时使用此工具”——这是帮助模型在不同工具之间进行选择的路由逻辑。如果文档字符串只描述计算过程，那么“何时使用”就只能靠运气了。

2. **Set boundaries.** "Do not guess the fee structure yourself" might be the most crucial logic in the whole tool definition. Hallucinating the fee structure will impact the calculation heavily. Another example is to explicitly tell the model not to underestimate the costs even if the user keeps asking for a better answer. Assistants without such boundaries have made real headlines: a car dealership's chatbot was talked into "agreeing" to sell a Chevy Tahoe for one dollar, and Air Canada was held liable in court for a refund policy its chatbot invented. Boundaries matter.
2. **设定边界。** “不要自己猜测费用结构”可能是整个工具定义中最关键的逻辑。幻觉出费用结构会严重影响计算结果。另一个例子是明确告诉模型不要低估成本，即使用户不断要求给出更优惠的答案。没有这种边界的助手曾引发过真实的新闻：一家汽车经销商的聊天机器人被诱导“同意”以一美元的价格出售一辆雪佛兰 Tahoe，加拿大航空也因其聊天机器人编造的退款政策而在法庭上被判承担责任。边界至关重要。

3. **Be frank about limitations.** Every piece of logic has assumptions. For example, our simple refund tool assumes euros and does not take into account cross-border payments with multiple currencies. Making these limitations explicit is useful because...
3. **坦诚局限性。** 每一段逻辑都有其假设前提。例如，我们简单的退款工具假设货币为欧元，且未考虑涉及多种货币的跨境支付。明确这些局限性非常有用，因为……
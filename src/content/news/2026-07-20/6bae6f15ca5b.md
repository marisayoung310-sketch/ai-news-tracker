---
title: "Building Production-Grade LLM Evaluation Pipelines: From Vibes to Metrics"
originalUrl: "https://dev.to/imus_d7584cbc8ee9b0336256/building-production-grade-llm-evaluation-pipelines-from-vibes-to-metrics-66d"
date: "2026-07-19T22:18:04.218Z"
---

# Building Production-Grade LLM Evaluation Pipelines: From Vibes to Metrics
# 构建生产级 LLM 评估流水线：从“感觉良好”到量化指标

Building Production-Grade LLM Evaluation Pipelines: From Vibes to Metrics. How we replaced "looks good to me" with automated evaluation catching 92% of hallucinations before deployment.
构建生产级 LLM 评估流水线：从“感觉良好”到量化指标。我们如何用自动化评估取代“看起来不错”，并在部署前拦截了 92% 的幻觉。

### The Problem: Why "Vibe Checks" Fail in Production
### 问题所在：为什么“感觉检查”在生产环境中会失效

Three months ago, our team shipped a RAG-based customer support assistant. It worked great in testing — we'd ask it questions, read the answers, and say "yeah, that looks right." Then it hit production. A customer asked about their billing cycle. The assistant confidently cited a policy that didn't exist. Another asked about API rate limits and got numbers from a competitor's documentation. By the time we caught it, 500+ users had seen hallucinated responses. The post-mortem was brutal: we had zero automated evaluation. Our test process was literally "ask 5 questions, read answers, thumbs up."
三个月前，我们的团队发布了一个基于 RAG（检索增强生成）的客户支持助手。它在测试阶段表现良好——我们问它问题，阅读答案，然后说“嗯，看起来没问题”。随后它上线了。一位客户询问账单周期，助手自信地引用了一条根本不存在的政策。另一位客户询问 API 速率限制，结果得到了竞争对手文档中的数据。当我们发现时，已有超过 500 名用户看到了幻觉回复。事后分析非常惨痛：我们没有任何自动化评估。我们的测试流程实际上就是“问 5 个问题，读答案，点个赞”。

### What Production Evaluation Actually Needs
### 生产环境评估真正需要什么

Academic benchmarks (MMLU, HellaSwag) don't tell you if your system works for your use case. Production evaluation needs:
学术基准测试（如 MMLU, HellaSwag）无法告诉你系统是否适用于你的具体场景。生产环境评估需要：

*   **Domain-specific judges** — Your criteria, not generic "helpfulness"
*   **领域特定的评判器** — 使用你的标准，而非通用的“有用性”
*   **Speed** — Evaluation must run in CI/CD, not overnight
*   **速度** — 评估必须在 CI/CD 中运行，而不是耗费整晚
*   **Regression detection** — Know immediately when a prompt change breaks things
*   **回归检测** — 当提示词变更导致系统损坏时，能立即知晓
*   **CI/CD integration** — Block merges that degrade quality
*   **CI/CD 集成** — 拦截会导致质量下降的代码合并
*   **Golden dataset management** — Versioned, stratified, growing test cases
*   **黄金数据集管理** — 版本化、分层且不断增长的测试用例

### Architecture: The Evaluation Pipeline
### 架构：评估流水线

```text
┌─────────────┐   ┌──────────────┐   ┌────────────────────┐   ┌──────────────┐
│ Test Cases  │──▶│ LLM Under    │──▶│ Judge Ensemble     │──▶│ Metrics &    │
│ (Golden Set)│   │ Test         │   │ - Faithfulness     │   │ Regression   │
└─────────────┘   └──────────────┘   │ - Instruction F.   │   │ Detection    │
                                     │ - JSON Schema      │   └──────┬───────┘
                                     │ - Custom LLM       │          ▼
                                     └────────────────────┘   ┌──────────────┐
                                                              │ Dashboard/   │
                                                              │ PR Comments  │
                                                              └──────────────┘
```

### Core Abstractions
### 核心抽象

```python
# eval/base.py
@dataclass(frozen=True)
class TestCase:
    id: str
    input: dict[str, Any]
    expected: dict[str, Any] | None = None
    tags: list[str] = field(default_factory=list) # ["edge-case", "long-context"]

@dataclass(frozen=True)
class EvaluationResult:
    test_case_id: str
    judge_name: str
    score: float
    passed: bool
    reasoning: str

class Judge(ABC):
    @abstractmethod
    async def evaluate(self, test_case: TestCase, response: Any) -> EvaluationResult: ...

class EvaluationHarness:
    def __init__(self, judges: list[Judge]):
        self.judges = judges
    async def evaluate_all(self, test_cases, generate_fn, concurrency=10):
        # Runs all cases through all judges with controlled concurrency ...
```

### The Judge Ensemble: Beyond RAGAS
### 评判器集成：超越 RAGAS

RAGAS gives you faithfulness and answer relevance. But production needs more:
RAGAS 可以提供忠实度和答案相关性，但生产环境需要更多：

| Judge | Purpose | Type | Threshold |
| :--- | :--- | :--- | :--- |
| **评判器** | **目的** | **类型** | **阈值** |
| Faithfulness | Answer contradicts retrieved context? | LLM | 0.8 |
| 忠实度 | 答案是否与检索到的上下文矛盾？ | LLM | 0.8 |
| Instruction Following | All prompt constraints satisfied? | LLM | 0.9 |
| 指令遵循 | 是否满足所有提示词约束？ | LLM | 0.9 |
| JSON Schema | Valid structured output? | Deterministic | 1.0 |
| JSON 模式 | 是否为有效的结构化输出？ | 确定性 | 1.0 |
| Safety | PII, harmful content, policy violations | LLM | 1.0 |
| 安全性 | PII、有害内容、政策违规 | LLM | 1.0 |
| Domain Expert | Medical/legal/financial accuracy | LLM (few-shot) | 0.85 |
| 领域专家 | 医疗/法律/金融准确性 | LLM (少样本) | 0.85 |

### Custom LLM Judge with Few-Shot
### 带少样本（Few-Shot）的自定义 LLM 评判器

```python
# eval/judges.py
class LLMJudge(Judge):
    def __init__(self, name, criteria, model="gpt-4o-mini", few_shot_examples=None):
        self.name = name
        self.criteria = criteria
        self.model = model
        self.few_shot = few_shot_examples or []

    async def evaluate(self, test_case, response):
        client = instructor.from_openai(AsyncOpenAI())
        class Output(BaseModel):
            score: float = Field(ge=0, le=1)
            reasoning: str
            passed: bool
        
        result = await client.chat.completions.create(
            model=self.model,
            response_model=Output,
            messages=[
                {"role": "system", "content": self._system_prompt()},
                *self._few_shot_messages(),
                {"role": "user", "content": self._build_prompt(test_case, response)},
            ],
            temperature=0.0,
        )
        return EvaluationResult(...)
```

### Faithfulness Judge (Production-Ready)
### 忠实度评判器（生产就绪）

```python
def create_faithfulness_judge() -> LLMJudge:
    return LLMJudge(
        name="faithfulness",
        criteria="""
        Evaluate whether the ANSWER is faithful to the CONTEXT.
        - Score 1.0: All claims in answer are directly supported by context
        - Score 0.5: Some claims unsupported but not contradictory
        - Score 0.0: Answer contains claims directly contradicted by context
        """,
        threshold=0.8,
        few_shot_examples=[
            {
                "input": {"context": "Company founded in 2019. Revenue $10M in 2023.", "answer": "The company was founded in 2019 and reached $10M revenue in 2023."},
                "output": {"score": 1.0, "reasoning": "All claims supported", "passed": True}
            },
            {
                "input": {"context": "Product launched in January 2024.", "answer": "The product launched in March 2024 after extensive beta testing."},
                "output": {"score": 0.0, "reasoning": "Contradicts launch date", "passed": False}
            },
        ]
    )
```

### Golden Dataset Strategy
### 黄金数据集策略

Don't start with 1000 cases. Start with 50 real production cases.
不要一上来就搞 1000 个用例，先从 50 个真实的生产用例开始。

```json
# eval/golden_set.jsonl
{"id": "support-001", "input": {"question": "How do I reset my password?", "context": "..."}, "expected": {"answer": "Use the 'Forgot Password' link..."}, "tags": ["basic", "auth"]}
{"id": "support-042", "input": {"question": "Why was I charged twice?", "context": "..."}, "expected": null, "tags": ["billing", "edge-case"]}
```

Stratification matters:
分层很重要：
*   40% basic/happy-path (基础/正常路径)
*   30% edge cases (ambiguous, multi-step) (边缘情况：歧义、多步骤)
*   20% adversarial (injection, off-topic) (对抗性：注入、离题)
*   10% multilingual/long-context (多语言/长上下文)

Version your dataset: Git-track it. Every production failure becomes a new test case.
版本化你的数据集：使用 Git 跟踪。每一个生产环境的故障都应成为一个新的测试用例。

### Regression Detection That Works
### 有效的回归检测

```python
def regression_report(self, baseline: dict[str, float]) -> dict[str, Any]:
    current = self.summary()
    report = {}
    for judge_name, metrics in current.items():
        if judge_name not in baseline: continue
        baseline_mean = baseline[judge_name]
        current_mean = metrics["mean_score"]
        diff = current_mean - baseline_mean
        
        report[judge_name] = {
            "baseline": baseline_mean,
            "current": current_mean,
            "delta": diff,
            "regressed": diff < -0.05, # 5% drop = regression
            "improved": diff > 0.02,
        }
    return report
```

### CI/CD Integration: GitHub Actions
### CI/CD 集成：GitHub Actions

```yaml
# .github/workflows/llm-eval.yml
name: LLM Evaluation
on:
  pull_request:
    paths: ['prompts/**', 'eval/**']
  schedule: ['0 2 * * *'] # Nightly
jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      ...
```
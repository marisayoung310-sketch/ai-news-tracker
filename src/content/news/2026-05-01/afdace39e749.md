---
title: "TauricResearch / TradingAgents"
originalUrl: "https://github.com/TauricResearch/TradingAgents"
date: "2026-04-30T22:29:11.201Z"
---

# TauricResearch / TradingAgents

### TradingAgents: Multi-Agents LLM Financial Trading Framework

**News**

[2026-04] TradingAgents v0.2.4 released with structured-output agents (Research Manager, Trader, Portfolio Manager), LangGraph checkpoint resume, persistent decision log, DeepSeek/Qwen/GLM/Azure provider support, Docker, and a Windows UTF-8 encoding fix. See CHANGELOG.md for the full list.
[2026-04] TradingAgents v0.2.4 版本发布，引入了结构化输出智能体（研究经理、交易员、投资组合经理）、LangGraph 断点续传、持久化决策日志、DeepSeek/Qwen/GLM/Azure 提供商支持、Docker 以及 Windows UTF-8 编码修复。完整列表请参阅 CHANGELOG.md。

[2026-03] TradingAgents v0.2.3 released with multi-language support, GPT-5.4 family models, unified model catalog, backtesting date fidelity, and proxy support.
[2026-03] TradingAgents v0.2.3 版本发布，支持多语言、GPT-5.4 系列模型、统一模型目录、回测日期保真度以及代理（Proxy）支持。

[2026-03] TradingAgents v0.2.2 released with GPT-5.4/Gemini 3.1/Claude 4.6 model coverage, five-tier rating scale, OpenAI Responses API, Anthropic effort control, and cross-platform stability.
[2026-03] TradingAgents v0.2.2 版本发布，涵盖 GPT-5.4/Gemini 3.1/Claude 4.6 模型，引入五级评分标准、OpenAI Responses API、Anthropic 努力程度控制以及跨平台稳定性优化。

[2026-02] TradingAgents v0.2.0 released with multi-provider LLM support (GPT-5.x, Gemini 3.x, Claude 4.x, Grok 4.x) and improved system architecture.
[2026-02] TradingAgents v0.2.0 版本发布，支持多提供商 LLM（GPT-5.x, Gemini 3.x, Claude 4.x, Grok 4.x）并改进了系统架构。

[2026-01] Trading-R1 Technical Report released, with Terminal expected to land soon. 🎉 TradingAgents officially released! We have received numerous inquiries about the work, and we would like to express our thanks for the enthusiasm in our community. So we decided to fully open-source the framework. Looking forward to building impactful projects with you! 🚀
[2026-01] Trading-R1 技术报告发布，终端（Terminal）预计即将上线。🎉 TradingAgents 正式发布！我们收到了大量关于该项目的咨询，感谢社区的热情支持。因此，我们决定将该框架完全开源。期待与大家共同构建具有影响力的项目！🚀

---

### TradingAgents Framework
### TradingAgents 框架

TradingAgents is a multi-agent trading framework that mirrors the dynamics of real-world trading firms. By deploying specialized LLM-powered agents: from fundamental analysts, sentiment experts, and technical analysts, to trader, risk management team, the platform collaboratively evaluates market conditions and informs trading decisions. Moreover, these agents engage in dynamic discussions to pinpoint the optimal strategy.
TradingAgents 是一个多智能体交易框架，旨在模拟现实世界交易公司的运作动态。通过部署由大语言模型（LLM）驱动的专业智能体——从基本面分析师、情绪专家、技术分析师，到交易员和风险管理团队——该平台能够协同评估市场状况并为交易决策提供依据。此外，这些智能体还会进行动态讨论，以确定最优策略。

TradingAgents framework is designed for research purposes. Trading performance may vary based on many factors, including the chosen backbone language models, model temperature, trading periods, the quality of data, and other non-deterministic factors. It is not intended as financial, investment, or trading advice.
TradingAgents 框架仅供研究使用。交易表现可能因多种因素而异，包括所选的基础语言模型、模型温度参数、交易周期、数据质量以及其他非确定性因素。本框架不构成任何财务、投资或交易建议。

Our framework decomposes complex trading tasks into specialized roles. This ensures the system achieves a robust, scalable approach to market analysis and decision-making.
我们的框架将复杂的交易任务分解为专业角色，确保系统能够以稳健且可扩展的方式进行市场分析和决策。

#### Analyst Team
#### 分析师团队

*   **Fundamentals Analyst:** Evaluates company financials and performance metrics, identifying intrinsic values and potential red flags.
    **基本面分析师：** 评估公司财务状况和绩效指标，识别内在价值及潜在风险信号。
*   **Sentiment Analyst:** Analyzes social media and public sentiment using sentiment scoring algorithms to gauge short-term market mood.
    **情绪分析师：** 使用情绪评分算法分析社交媒体和公众情绪，以衡量短期市场氛围。
*   **News Analyst:** Monitors global news and macroeconomic indicators, interpreting the impact of events on market conditions.
    **新闻分析师：** 监控全球新闻和宏观经济指标，解读事件对市场状况的影响。
*   **Technical Analyst:** Utilizes technical indicators (like MACD and RSI) to detect trading patterns and forecast price movements.
    **技术分析师：** 利用技术指标（如 MACD 和 RSI）检测交易模式并预测价格走势。

#### Researcher Team
#### 研究员团队

Comprises both bullish and bearish researchers who critically assess the insights provided by the Analyst Team. Through structured debates, they balance potential gains against inherent risks.
由看涨和看跌研究员组成，他们会对分析师团队提供的见解进行批判性评估。通过结构化的辩论，他们在潜在收益与固有风险之间取得平衡。

#### Trader Agent
#### 交易员智能体

Composes reports from the analysts and researchers to make informed trading decisions. It determines the timing and magnitude of trades based on comprehensive market insights.
汇总分析师和研究员的报告以做出明智的交易决策。它根据全面的市场洞察来确定交易的时机和规模。

#### Risk Management and Portfolio Manager
#### 风险管理与投资组合经理

Continuously evaluates portfolio risk by assessing market volatility, liquidity, and other risk factors. The risk management team evaluates and adjusts trading strategies, providing assessment reports to the Portfolio Manager for final decision. The Portfolio Manager approves/rejects the transaction proposal. If approved, the order will be sent to the simulated exchange and executed.
通过评估市场波动性、流动性及其他风险因素，持续评估投资组合风险。风险管理团队评估并调整交易策略，向投资组合经理提供评估报告以供最终决策。投资组合经理批准或拒绝交易提案。若获批准，订单将被发送至模拟交易所并执行。

---

### Installation and CLI
### 安装与命令行界面 (CLI)

**Installation**
**安装**

Clone TradingAgents:
克隆 TradingAgents：
```bash
git clone https://github.com/TauricResearch/TradingAgents.git
cd TradingAgents
```

Create a virtual environment in any of your favorite environment managers:
在您喜欢的任何环境管理器中创建虚拟环境：
```bash
conda create -n tradingagents python=3.13
conda activate tradingagents
```

Install the package and its dependencies:
安装包及其依赖项：
```bash
pip install .
```

**Docker**
**Docker**

Alternatively, run with Docker:
或者，使用 Docker 运行：
```bash
cp .env.example .env # add your API keys
docker compose run --rm tradingagents
```

For local models with Ollama:
对于使用 Ollama 的本地模型：
```bash
docker compose --profile ollama run --rm tradingagents-ollama
```

**Required APIs**
**所需 API**

TradingAgents supports multiple LLM providers. Set the API key for your chosen provider:
TradingAgents 支持多种 LLM 提供商。请为您选择的提供商设置 API 密钥：
```bash
export OPENAI_API_KEY=... # OpenAI (GPT)
export GOOGLE_API_KEY=... # Google (Gemini)
export ANTHROPIC_API_KEY=... # Anthropic (Claude)
export XAI_API_KEY=... # xAI (Grok)
export DEEPSEEK_API_KEY=... # DeepSeek
export DASHSCOPE_API_KEY=... # Qwen (Alibaba DashScope)
export ZHIPU_API_KEY=... # GLM (Zhipu)
export OPENROUTER_API_KEY=... # OpenRouter
export ALPHA_VANTAGE_API_KEY=... # Alpha Vantage
```

For enterprise providers (e.g. Azure OpenAI, AWS Bedrock), copy `.env.enterprise.example` to `.env.enterprise` and fill in your credentials. For local models, configure Ollama with `llm_provider: "ollama"` in your config. Alternatively, copy `.env.example` to `.env` and fill in your keys:
对于企业级提供商（如 Azure OpenAI, AWS Bedrock），请将 `.env.enterprise.example` 复制为 `.env.enterprise` 并填入您的凭据。对于本地模型，请在配置中设置 `llm_provider: "ollama"`。或者，将 `.env.example` 复制为 `.env` 并填入您的密钥：
```bash
cp .env.example .env
```

**CLI Usage**
**CLI 使用方法**

Launch the interactive CLI:
启动交互式 CLI：
```bash
tradingagents # installed command
python -m cli.main # alternative: run directly from source
```

You will see a screen where you can select your desired tickers, analysis date, LLM provider, research depth, and more. An interface will appear showing results as they load, letting you track the agent's progress as it runs.
您将看到一个界面，可以在其中选择所需的股票代码、分析日期、LLM 提供商、研究深度等。界面将显示加载结果，让您可以跟踪智能体运行时的进度。

---

### TradingAgents Package Implementation Details
### TradingAgents 包实现细节

We built TradingAgents with LangGraph to ensure flexibility and modularity. The framework supports multiple LLM providers: OpenAI, Google, Anthropic, xAI, DeepSeek, Qwen (Alibaba DashScope), GLM (Zhipu), OpenRouter, Ollama for local models, and Azure OpenAI for enterprise.
我们使用 LangGraph 构建了 TradingAgents，以确保灵活性和模块化。该框架支持多种 LLM 提供商：OpenAI、Google、Anthropic、xAI、DeepSeek、Qwen（阿里通义千问）、GLM（智谱）、OpenRouter、用于本地模型的 Ollama 以及用于企业的 Azure OpenAI。

**Python Usage**
**Python 使用方法**

To use TradingAgents inside your code, you can import the `tradingagents` module and initialize a `TradingAgentsGraph()` object. The `.propagate()` function will return a decision. You can run `main.py`, here's also a quick example:
要在代码中使用 TradingAgents，您可以导入 `tradingagents` 模块并初始化一个 `TradingAgentsGraph()` 对象。`.propagate()` 函数将返回一个决策。您可以运行 `main.py`，以下是一个快速示例：

```python
from tradingagents.graph.trading_graph import TradingAgentsGraph
```
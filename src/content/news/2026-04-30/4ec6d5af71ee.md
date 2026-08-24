---
title: "ZhuLinsen / daily_stock_analysis"
originalUrl: "https://github.com/ZhuLinsen/daily_stock_analysis"
date: "2026-04-30T01:05:12.623Z"
---

# ZhuLinsen / daily_stock_analysis

### 📈 Intelligent Stock Analysis System
🤖 An AI-powered intelligent analysis system for A-shares, Hong Kong stocks, and US stocks. It automatically analyzes your watchlist daily and pushes a "Decision Dashboard" to Enterprise WeChat, Feishu, Telegram, Discord, Slack, or Email.

🤖 基于 AI 大模型的 A股/港股/美股自选股智能分析系统，每日自动分析并推送「决策仪表盘」到企业微信/飞书/Telegram/Discord/Slack/邮箱。

---

### ✨ Key Features | 功能特性

| Module | Feature | Description |
| :--- | :--- | :--- |
| **AI** | Decision Dashboard | One-sentence core conclusion + Rating + Buy/Sell points + Risk alerts + Action checklist |
| **Analysis** | Multi-dimensional Analysis | Aggregates technicals, real-time quotes, chip distribution, news sentiment, announcements, capital flow, and fundamentals |
| **Market** | Global Markets | Supports A-shares, HK stocks, US stocks, US indices, and common ETFs |
| **Strategy** | Market Strategy System | Built-in strategies: A-share review, US Regime, Moving Averages, Chan Theory, Elliott Wave, Sentiment Cycles, etc. |
| **Review** | Market Overview | Daily market summary, index performance, gain/loss statistics, and sector strength (supports CN/HK/US/Both) |
| **Web** | Dual-theme Workbench | Supports manual analysis, configuration management, task progress, historical reports, backtesting, and position management |
| **Import** | Smart Import | Supports images, CSV/Excel, clipboard; watchlist input supports code/name/pinyin/alias completion |
| **History** | Report Management | View historical reports, full Markdown reports, re-analysis, and batch management |
| **Backtest** | AI Backtest Validation | Post-validation of historical analysis to check directional accuracy and simulated returns |
| **Agent** | Strategy Q&A | Multi-turn strategy Q&A; supports 11 built-in strategies (e.g., MA Golden Cross, Chan Theory, Wave Theory) via Web/Bot/API |
| **Push** | Multi-channel Notifications | Supports Enterprise WeChat, Feishu, Telegram, Discord, Slack, Email, etc. |
| **Automation** | Scheduled Execution | Supports GitHub Actions, Docker, local cron jobs, and FastAPI service mode |

*For functional details, field contracts, fundamental P0 timeout semantics, trading discipline, data source priority, and Web/API behavior, please refer to the [Full Configuration and Deployment Guide](https://github.com/ZhuLinsen/daily_stock_analysis).*

---

### 🚀 Quick Start | 快速开始

#### Method 1: GitHub Actions (Recommended)
Deploy in 5 minutes, zero cost, no server required.

1. **Fork this repository** (Click the Fork button at the top right; don't forget to Star ⭐).
2. **Configure Secrets**: Go to `Settings` → `Secrets and variables` → `Actions` → `New repository secret`.
3. **AI Model Configuration**: Configure at least one model provider (e.g., AIHubMix, Gemini, OpenAI, etc.).
4. **Notification Channel Configuration**: Configure at least one channel (e.g., WeChat, Telegram, Slack).
5. **Watchlist Configuration**: Set `STOCK_LIST` (e.g., `600519,hk00700,AAPL,TSLA`).
6. **News Source Configuration**: Recommended to configure at least one search service (e.g., Anspire, SerpAPI, Tavily).
7. **Enable Actions**: Go to the `Actions` tab → "I understand my workflows, go ahead and enable them".
8. **Manual Test**: `Actions` → `每日股票分析` → `Run workflow`.

#### Method 2: Local / Docker Deployment
```bash
# Clone the project
git clone https://github.com/ZhuLinsen/daily_stock_analysis.git && cd daily_stock_analysis
# Install dependencies
pip install -r requirements.txt
# Configure environment variables
cp .env.example .env && vim .env
# Run analysis
python main.py
```

---

### 📱 Push Results | 推送效果

#### Decision Dashboard | 决策仪表盘
🎯 **2026-02-08 Decision Dashboard**
Analyzed 3 stocks | 🟢Buy: 0 | 🟡Watch: 2 | 🔴Sell: 1

**Summary:**
* ⚪ Zhongtu Gaoxin (000657): Watch | Rating 65 | Bullish
* ⚪ Yongding Shares (600105): Watch | Rating 48 | Oscillating
* 🟡 Xinlai Material (300260): Sell | Rating 35 | Bearish

*(Detailed breakdown including News Sentiment, Performance Expectations, Risk Alerts, and Catalysts follows in the report.)*

---

### 🖥️ Web Interface | Web 界面
The Web Workbench provides configuration management, task monitoring, manual analysis, historical reports, backtesting, position management, smart import, and light/dark themes.

*   **Start command:** `python main.py --webui`
*   **Access:** `http://127.0.0.1:8000`

---

### ⚠️ Disclaimer | 免责声明
This project is for learning and research purposes only and does not constitute any investment advice. The stock market involves risks; please invest with caution. The author is not responsible for any losses incurred from using this project.

本项目仅供学习和研究使用，不构成任何投资建议。股市有风险，投资需谨慎。作者不对使用本项目产生的任何损失负责。
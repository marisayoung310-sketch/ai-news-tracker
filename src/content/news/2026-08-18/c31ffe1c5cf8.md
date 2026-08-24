---
title: "🚀 crewai-go v0.4.0 is live!"
originalUrl: "https://dev.to/rhgs/crewai-go-v040-is-live-14j1"
date: "2026-08-17T21:54:17.976Z"
---

# 🚀 crewai-go v0.4.0 is live!

If you love the multi-agent AI orchestration concepts from Python’s CrewAI, but want the performance, native concurrency, and low memory footprint of Go, check out crewai-go. The v0.4.0 release brings key capabilities to make building multi-agent systems in Go fast, type-safe, and production-ready.
如果你喜欢 Python 版 CrewAI 的多智能体 AI 编排理念，但又追求 Go 语言的高性能、原生并发能力和低内存占用，那么请务必关注 crewai-go。v0.4.0 版本带来了多项关键功能，使在 Go 中构建多智能体系统变得快速、类型安全且可用于生产环境。

✨ Key Highlights:
✨ 核心亮点：

🛠️ Custom Tools: Easily create and bind custom tools using tools.NewTool(...).
🛠️ 自定义工具：使用 `tools.NewTool(...)` 即可轻松创建并绑定自定义工具。

🔄 Sequential Context Flow: Outputs from previous tasks flow directly into subsequent tasks as context.
🔄 顺序上下文流：前序任务的输出可直接作为上下文流入后续任务。

📦 Structured Outputs: Map LLM responses straight into native Go structs using standard `json:"..."` tags.
📦 结构化输出：使用标准的 `json:"..."` 标签，将 LLM 的响应直接映射为原生的 Go 结构体。

🏠 Flexible Provider Support: Run fully offline with Ollama or integrate seamlessly with OpenAI.
🏠 灵活的模型提供商支持：既可以通过 Ollama 完全离线运行，也可以与 OpenAI 无缝集成。

🧠 Short-Term Memory: Agents keep context across complex task executions.
🧠 短期记忆：智能体能够在复杂的任务执行过程中保持上下文。

💡 Quick Example:
💡 快速示例：

```go
package main

import (
	"context"
	"fmt"
	"log"
	"github.com/rhgs/crewai-go/crew"
)

func main() {
	researcher := crew.NewAgent(crew.AgentConfig{
		Role:      "AI Researcher",
		Goal:      "Analyze tech trends",
		Backstory: "An expert in discovering high-impact open-source Go tools.",
	})

	task := crew.NewTask(crew.TaskConfig{
		Description:    "Summarize the main benefits of using Go for AI agent orchestration.",
		ExpectedOutput: "3 concise bullet points.",
		Agent:          researcher,
	})

	c := crew.NewCrew(crew.CrewConfig{
		Agents: []*crew.Agent{researcher},
		Tasks:  []*crew.Task{task},
	})

	result, err := c.Kickoff(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(result.Raw)
}
```

🔗 Release details & GitHub repo: [github.com/rhgs/crewai-go/releases/tag/v0.4.0](https://github.com/rhgs/crewai-go/releases/tag/v0.4.0)
🔗 发布详情与 GitHub 仓库：[github.com/rhgs/crewai-go/releases/tag/v0.4.0](https://github.com/rhgs/crewai-go/releases/tag/v0.4.0)
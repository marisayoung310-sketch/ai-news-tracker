---
title: "jamiepine / voicebox"
originalUrl: "https://github.com/jamiepine/voicebox"
date: "2026-06-22T23:00:25.734Z"
---

# jamiepine / voicebox

**Voicebox: The open-source AI voice studio. Clone any voice. Generate speech. Dictate into any app. Talk to agents in voices you own. The full voice I/O stack, running locally on your machine.**
Voicebox：开源 AI 语音工作室。克隆任意声音，生成语音，在任何应用中进行听写，并用你拥有的声音与 AI 智能体对话。这是一套完整的语音输入/输出（I/O）栈，完全在你的本地机器上运行。

**voicebox.sh • Docs • Download • Features • API • Troubleshooting**
voicebox.sh • 文档 • 下载 • 功能 • API • 故障排除

**Click the image above to watch the demo video on voicebox.sh**
点击上方图片，在 voicebox.sh 观看演示视频。

**What is Voicebox?**
**Voicebox is a local-first AI voice studio — a free and open-source alternative to ElevenLabs and WisprFlow in one app. Clone voices from a few seconds of audio, generate speech in 23 languages across 7 TTS engines, dictate into any text field with a global hotkey, and give any MCP-aware AI agent a voice of your choosing.**
什么是 Voicebox？
Voicebox 是一款“本地优先”的 AI 语音工作室，它将 ElevenLabs 和 WisprFlow 的功能合二为一，是一款免费且开源的替代方案。只需几秒钟的音频即可克隆声音，支持 7 种 TTS 引擎和 23 种语言的语音生成，通过全局快捷键在任何文本框中进行听写，并为你选择的任何支持 MCP 的 AI 智能体赋予声音。

**The two cloud incumbents sit on opposite halves of the voice I/O loop — ElevenLabs on output, WisprFlow on input. Voicebox does both, bridges them with a bundled local LLM for refinement and per-profile personas, and runs the whole thing on your machine.**
目前云端领域的两大巨头分别占据了语音 I/O 循环的两端——ElevenLabs 负责输出，WisprFlow 负责输入。Voicebox 则兼顾两者，并通过内置的本地大语言模型（LLM）进行润色和个性化配置，将这一切完全运行在你的机器上。

*   **Complete privacy** — models, voice data, and captures never leave your machine
*   **7 TTS engines** — Qwen3-TTS, Qwen CustomVoice, LuxTTS, Chatterbox Multilingual, Chatterbox Turbo, HumeAI TADA, and Kokoro
*   **Voice cloning and preset voices** — zero-shot cloning from a reference sample, or 50+ curated preset voices via Kokoro and Qwen CustomVoice
*   **23 languages** — from English to Arabic, Japanese, Hindi, Swahili, and more
*   **Post-processing effects** — pitch shift, reverb, delay, chorus, compression, and filters
*   **Expressive speech** — paralinguistic tags like [laugh], [sigh], [gasp] via Chatterbox Turbo; natural-language delivery control via Qwen CustomVoice
*   **Unlimited length** — auto-chunking with crossfade for scripts, articles, and chapters
*   **Stories editor** — multi-track timeline for conversations, podcasts, and narratives
*   **Voice input** — global dictation hotkey with push-to-talk and toggle modes, accessibility-verified auto-paste on macOS, in-app mic on every text field, Whisper-based STT
*   **Agent voice output** — one tool call (voicebox.speak) and any MCP-aware agent (Claude Code, Cursor, Cline) speaks to you in a voice you've cloned
*   **Voice personalities** — attach a free-form persona to any voice profile, then Compose, Rewrite, or Respond via a bundled local LLM — agents can invoke the same modes over MCP
*   **API-first** — REST API plus a built-in MCP server for integrating voice I/O into your own apps and agents
*   **Native performance** — built with Tauri (Rust), not Electron
*   **Runs everywhere** — macOS (MLX/Metal), Windows (CUDA), Linux, AMD ROCm, Intel Arc, Docker

*   **完全隐私** — 模型、语音数据和录音绝不会离开你的机器。
*   **7 种 TTS 引擎** — Qwen3-TTS, Qwen CustomVoice, LuxTTS, Chatterbox Multilingual, Chatterbox Turbo, HumeAI TADA 以及 Kokoro。
*   **声音克隆与预设音色** — 通过参考样本进行零样本（zero-shot）克隆，或使用 Kokoro 和 Qwen CustomVoice 提供的 50 多种精选预设音色。
*   **23 种语言** — 从英语到阿拉伯语、日语、印地语、斯瓦希里语等。
*   **后期处理效果** — 音高偏移、混响、延迟、合唱、压缩和滤波。
*   **表现力语音** — 通过 Chatterbox Turbo 支持 [laugh]（笑）、[sigh]（叹气）、[gasp]（喘息）等副语言标签；通过 Qwen CustomVoice 实现自然语言表达控制。
*   **无限长度** — 针对脚本、文章和章节提供带交叉淡入淡出的自动分段功能。
*   **故事编辑器** — 用于对话、播客和叙事的轨道时间轴。
*   **语音输入** — 全局听写快捷键，支持按键说话和切换模式；macOS 上经辅助功能验证的自动粘贴；每个文本框内嵌麦克风；基于 Whisper 的语音转文字（STT）。
*   **智能体语音输出** — 只需一个工具调用 (voicebox.speak)，任何支持 MCP 的智能体（如 Claude Code, Cursor, Cline）都能用你克隆的声音与你对话。
*   **语音个性** — 为任何语音配置文件附加自由格式的个性设定，通过内置本地 LLM 进行创作、重写或回复——智能体可以通过 MCP 调用相同模式。
*   **API 优先** — 提供 REST API 和内置 MCP 服务器，方便将语音 I/O 集成到你自己的应用和智能体中。
*   **原生性能** — 使用 Tauri (Rust) 构建，而非 Electron。
*   **全平台运行** — 支持 macOS (MLX/Metal), Windows (CUDA), Linux, AMD ROCm, Intel Arc, Docker。

---

### Download Platform / 下载平台

*   **macOS (Apple Silicon):** Download DMG
*   **macOS (Intel):** Download DMG
*   **Windows:** Download MSI
*   **Docker:** `docker compose up`
*   **View all binaries →**
*   **Linux:** Pre-built binaries are not yet available. See voicebox.sh/linux-install for build-from-source instructions.

*   **macOS (Apple Silicon):** 下载 DMG
*   **macOS (Intel):** 下载 DMG
*   **Windows:** 下载 MSI
*   **Docker:** `docker compose up`
*   **查看所有二进制文件 →**
*   **Linux:** 暂无预编译二进制文件。请参阅 voicebox.sh/linux-install 获取源码编译说明。

**Having trouble? See the Troubleshooting Guide for common install, generation, model-download, and GPU issues.**
遇到问题？请查看《故障排除指南》，了解常见的安装、生成、模型下载及 GPU 相关问题。

---

### Features: Multi-Engine Voice Cloning / 功能：多引擎声音克隆

**Seven TTS engines with different strengths, switchable per-generation:**
七种各具优势的 TTS 引擎，可在每次生成时切换：

| Engine | Languages | Strengths |
| :--- | :--- | :--- |
| Qwen3-TTS (0.6B / 1.7B) | 10 | High-quality multilingual cloning, delivery instructions ("speak slowly", "whisper") |
| Qwen CustomVoice | 10 | 9 curated preset voices with natural-language delivery control — no reference audio required |
| LuxTTS | English | Lightweight (~1GB VRAM), 48kHz output, 150x realtime on CPU |
| Chatterbox Multilingual | 23 | Broadest language coverage — Arabic, Danish, Finnish, Greek, Hebrew, Hindi, Malay, Norwegian, Polish, Swahili, Swedish, Turkish and more |
| Chatterbox Turbo | English | Fast 350M model with paralinguistic emotion/sound tags |
| TADA (1B / 3B) | 10 | HumeAI speech-language model — 700s+ coherent audio, text-acoustic dual alignment |
| Kokoro | 8 | 50 curated preset voices, tiny 82M model, fast CPU inference |

| 引擎 | 语言 | 优势 |
| :--- | :--- | :--- |
| Qwen3-TTS (0.6B / 1.7B) | 10 | 高质量多语言克隆，支持表达指令（如“慢点说”、“耳语”） |
| Qwen CustomVoice | 10 | 9 种精选预设音色，支持自然语言表达控制，无需参考音频 |
| LuxTTS | 英语 | 轻量级（约 1GB 显存），48kHz 输出，CPU 上可达 150 倍实时速度 |
| Chatterbox Multilingual | 23 | 最广泛的语言覆盖——阿拉伯语、丹麦语、芬兰语、希腊语、希伯来语、印地语、马来语、挪威语、波兰语、斯瓦希里语、瑞典语、土耳其语等 |
| Chatterbox Turbo | 英语 | 快速的 350M 模型，支持副语言情感/声音标签 |
| TADA (1B / 3B) | 10 | HumeAI 语音语言模型——支持 700 秒以上连贯音频，文本-声学双重对齐 |
| Kokoro | 8 | 50 种精选预设音色，超小 82M 模型，CPU 推理速度快 |

---

### Emotions & Paralinguistic Tags / 情感与副语言标签

**Only Chatterbox Turbo interprets paralinguistic tags like [laugh] and [sigh]. Qwen3-TTS, LuxTTS, Chatterbox Multilingual, and HumeAI TADA read them literally as text. With Chatterbox Turbo selected, type / in the text input to open the tag inserter and add expressive tags inline with speech:**
只有 Chatterbox Turbo 能解析 [laugh]（笑）和 [sigh]（叹气）等副语言标签。Qwen3-TTS、LuxTTS、Chatterbox Multilingual 和 HumeAI TADA 会将它们作为文本字面读取。选中 Chatterbox Turbo 后，在文本输入框中输入 `/` 即可打开标签插入器，在语音中添加表现力标签：

`[laugh] [chuckle] [gasp] [cough] [sigh] [groan] [sniff] [shush] [clear throat]`

---

### Post-Processing Effects / 后期处理效果

**8 audio effects powered by Spotify's pedalboard library. Apply after generation, preview in real time, build reusable presets.**
由 Spotify 的 pedalboard 库驱动的 8 种音频效果。生成后应用，实时预览，并构建可复用的预设。

*   **Pitch Shift:** Up or down by up to 12 semitones (音高偏移：最高上下 12 个半音)
*   **Reverb:** Configurable room size, damping, wet/dry mix (混响：可配置房间大小、阻尼、干湿比)
*   **Delay:** Echo with adjustable time, feedback, and mix (延迟：带可调时间、反馈和混合的回声)
*   **Chorus / Flanger:** Modulated delay for metallic or lush textures (合唱/镶边：用于金属感或丰富质感的调制延迟)
*   **Compressor:** Dynamic range compression (压缩器：动态范围压缩)
*   **Gain:** Volume adjustment (-40 to +40 dB) (增益：音量调节 -40 到 +40 dB)
*   **High-Pass Filter:** Remove low frequencies (高通滤波：去除低频)
*   **Low-Pass Filter:** Remove high frequencies (低通滤波：去除高频)

**Ships with 4 built-in presets (Robotic, Radio, Echo Chamber, Deep Voice) and supports custom presets. Effects can be assigned per-profile as defaults.**
内置 4 种预设（机器人、收音机、回声室、深沉嗓音），并支持自定义预设。效果可按配置文件分配为默认值。

---

### Unlimited Generation Length / 无限生成长度

**Text is automatically split at sentence boundaries and each chunk is generated independently, then crossfaded together. Works with all engines.**
文本会在句子边界自动拆分，每个片段独立生成，然后通过交叉淡入淡出合并。适用于所有引擎。

*   **Configurable auto-chunking limit (100–5,000 chars)** (可配置自动分段限制：100–5,000 字符)
*   **Crossfade slider (0–200ms) for smooth transitions** (交叉淡入淡出滑块：0–200ms，实现平滑过渡)
*   **Max text length: 50,000 characters** (最大文本长度：50,000 字符)
*   **Smart splitting respects abbreviations, CJK punctuation, and [tags]** (智能拆分：识别缩写、中日韩标点符号及 [标签])

---

### Generation Versions / 生成版本

**Every generation supports multiple versions with provenance tracking:**
每次生成都支持多个版本，并带有来源追踪：

*   **Original** — clean TTS output, always preserved (原始：纯净的 TTS 输出，始终保留)
*   **Effects versions** — apply different effects chains from any source version (效果版本：从任何源版本应用不同的效果链)
*   **Takes** — regenerate with a new seed for variation (拍摄：使用新种子重新生成以获得变化)
*   **Source tracking** — each version records its lineage (来源追踪：每个版本记录其血统)
*   **Favorites** — star generations for quick access (收藏：标记生成结果以便快速访问)

---

### Async Generation Queue / 异步生成队列

*   **Generation is non-blocking. Submit and immediately start typing the next one.** (生成是非阻塞的。提交后可立即开始输入下一条。)
*   **Serial execution queue prevents GPU contention** (串行执行队列防止 GPU 争用)
*   **Real-time SSE status streaming** (实时 SSE 状态流)
*   **Failed generations can be retried** (失败的生成可重试)
*   **Stale generations from crashes auto-recover on startup** (崩溃导致的陈旧生成在启动时自动恢复)

---

### Voice Profile Management / 语音配置文件管理

*   **Create profiles from audio files or record directly in-app** (从音频文件创建配置文件或直接在应用内录制)
*   **Import/export profiles to share or back up** (导入/导出配置文件以进行共享或备份)
*   **Multi-sample support for higher quality cloning** (支持多样本以获得更高质量的克隆)
*   **Per-profile default effects chains** (每个配置文件可设置默认效果链)
*   **Organize with...** (使用...进行组织)
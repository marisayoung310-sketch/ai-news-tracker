---
title: "babbled notes: a sound-to-music agent for people who could not make music before"
originalUrl: "https://dev.to/brookehoward2008droid/babbled-notes-a-sound-to-music-agent-for-people-who-could-not-make-music-before-c0p"
date: "2026-05-24T22:24:24.090Z"
---

# babbled notes: a sound-to-music agent for people who could not make music before
# babbled notes：为无法创作音乐的人群打造的“声音转音乐”智能体

💎 You make a sound. Any sound. The agent hears it. Music comes back. 𝕓𝕒𝕓𝕓𝕝𝕖𝕕 𝕟𝕠𝕥𝕖𝕤 Hum into a microphone. Tap your desk. Exhale slowly. Click your tongue. Whistle once. A Gemma 4 agent reads what you made, decides what music lives inside it, and plays it back as piano, cello, marimba, or drums. You chose nothing. The agent chose everything. Built for people who have never been able to make music before -- people who are non-verbal, people with ALS, cerebral palsy, locked-in syndrome, quadriplegia, Parkinson's. People who have always heard music inside them and had no way to get it out.

💎 你发出声音。任何声音。智能体捕捉它，音乐随之而来。𝕓𝕒𝕓𝕓𝕝𝕖𝕕 𝕟𝕠𝕥𝕖𝕤 向麦克风哼唱、敲击桌面、缓慢呼气、弹舌、吹口哨。Gemma 4 智能体会读取你创作的内容，决定其中蕴含的音乐，并将其转化为钢琴、大提琴、马林巴或鼓声播放出来。你无需做出任何选择，一切由智能体决定。它专为那些从未能创作音乐的人群而设计——包括非语言障碍者、渐冻症（ALS）、脑瘫、闭锁综合征、四肢瘫痪及帕金森病患者。这些人内心始终回荡着音乐，却苦于无法将其表达出来。

🔗 GitHub: https://github.com/brookehoward2008-droid/Babbled-notes-v2 
🎵 Agent architecture: HERMES.md

◈ Why this is an agent, not a tool
◈ 为什么这是一个“智能体”而非“工具”

A tool does what you tell it. You configure it. You choose the settings. You push the button. An agent perceives its environment, reasons about what it observes, and takes action on its own judgment. babbled notes runs a full agent loop on every sound:

工具只会执行你的指令。你需要配置它、选择设置、按下按钮。而智能体能够感知环境、对观察到的事物进行推理，并根据自己的判断采取行动。babbled notes 对每一个声音都运行完整的智能体循环：

| Component | What it does |
| :--- | :--- |
| **Perceive** | Web Audio API reads the mic: FFT pitch analysis, RMS amplitude, onset detection. Outputs a structured DspDigest. |
| **Reason** | Gemma 4 (gemma-4-26b-a4b-it) receives the raw audio AND the DspDigest. Decides mood, instrument voice, articulation, and note timing. |
| **Act** | Web Audio API synthesizer plays the composition. Real instruments. Real time. |
| **Reflect** | User edits the Lilt score. Agent re-renders without re-recording. |

| 组件 | 功能 |
| :--- | :--- |
| **感知 (Perceive)** | Web Audio API 读取麦克风输入：进行 FFT 音高分析、RMS 振幅分析及起始检测，输出结构化的 DspDigest。 |
| **推理 (Reason)** | Gemma 4 (gemma-4-26b-a4b-it) 接收原始音频和 DspDigest，决定情绪、乐器音色、发音方式及音符时序。 |
| **行动 (Act)** | Web Audio API 合成器播放乐曲。真实乐器，实时呈现。 |
| **反思 (Reflect)** | 用户编辑 Lilt 乐谱。智能体无需重新录音即可重新渲染。 |

The user never chooses a key, a tempo, a voice, or a mood. The agent reads the sound and decides all of it.

用户无需选择调式、速度、音色或情绪。智能体通过读取声音，决定了这一切。

💎 The NeuralGem
💎 NeuralGem（神经宝石）

The agent communicates its state through the NeuralGem -- a canvas visualizer with no text labels:
智能体通过 NeuralGem 与用户交流——这是一个没有任何文字标签的画布可视化界面：

*   **IDLE** -> breathing silver ring. waiting for input.
*   **RECORDING** -> crystallizing polygon. sides grow as your audio level rises. color shifts purple to cyan as the sound builds.
*   **PROCESSING** -> hexagon forming. the agent is reading your sound.
*   **LOCKED** -> hexagon. facets lit in the mood color the agent chose. the agent has heard you. music is loading.

*   **空闲 (IDLE)** -> 呼吸状的银色圆环，等待输入。
*   **录音 (RECORDING)** -> 结晶状的多边形，随着音频电平升高，边数增加；颜色从紫色渐变为青色。
*   **处理 (PROCESSING)** -> 六边形正在形成，智能体正在读取你的声音。
*   **锁定 (LOCKED)** -> 六边形，切面点亮为智能体选择的情绪颜色。智能体已接收到你的声音，音乐正在加载。

For users who are non-verbal, have cognitive differences, or who cannot read: shape and color carry all the information. No labels to parse. No configuration panel to navigate. Tap once to start. Tap once to stop.

对于非语言障碍者、认知差异人群或无法阅读的用户来说：形状和颜色承载了所有信息。无需解析标签，无需操作配置面板。点击一次开始，点击一次停止。

◈ How the agent reasons
◈ 智能体如何推理

The agent sends two things to Gemma 4 simultaneously:
智能体同时向 Gemma 4 发送两样东西：

1. **Raw audio (base64 WebM)**: The actual sound. Gemma 4 can hear the texture -- a tremor in a hum, the scrape of a breath, the sharp crack of a tongue click. These textures do not survive FFT analysis. They live in the audio.
2. **DspDigest (structured JSON)**: What the perception layer already calculated precisely.

1. **原始音频 (base64 WebM)**：真实的声音。Gemma 4 能听出其中的质感——哼唱中的颤抖、呼吸的摩擦声、弹舌的清脆声。这些质感在 FFT 分析中会丢失，但它们存在于音频中。
2. **DspDigest (结构化 JSON)**：感知层已经精确计算出的数据。

Gemma 4 reads both and decides: this is a sustained hum that rose in pitch. Mood: pensive. Voice: cinematic cello. Articulation: legato. Two melody notes, one drone pad underneath. Timestamps aligned to the 1.6-second interval in the digest.

Gemma 4 读取两者并做出判断：这是一段音高上升的持续哼唱。情绪：沉思。音色：电影感大提琴。发音：连奏。包含两个旋律音符，底部有一个持续的背景音（drone）。时间戳与摘要中 1.6 秒的间隔对齐。

The agent turned a two-second hum into a composition with melody, countermelody, and an ambient drone. The user made one sound. The agent made the music.

智能体将两秒钟的哼唱变成了一段包含旋律、对位旋律和环境背景音的乐曲。用户只发出了一声，而音乐由智能体创作。

◈ The Lilt Contract
◈ Lilt 契约

The agent's reasoning follows a set of guidelines built into the system prompt. These are not hardcoded rules -- Gemma 4 interprets them against what it actually heard.

智能体的推理遵循系统提示词中内置的一套准则。这些并非硬编码的规则，而是 Gemma 4 根据实际听到的内容进行解读的依据。

*   **Slow, soft, or hummed sounds**: mood = "gentle" or "pensive", voice = "cinematic cello" or "grand piano", articulation = "legato".
*   **Sharp, rhythmic, or tapped sounds**: mood = "energetic" or "tight", voice = "marimba" or "drum kit", articulation = "staccato".

*   **缓慢、柔和或哼唱的声音**：情绪 = “温柔”或“沉思”，音色 = “电影感大提琴”或“大钢琴”，发音 = “连奏”。
*   **尖锐、有节奏或敲击的声音**：情绪 = “充满活力”或“紧凑”，音色 = “马林巴”或“鼓组”，发音 = “断奏”。

Always keep pitches harmonious (C major, A minor, or pentatonic). Timestamps must align with DSP onsets but feel musically polished. Always include a drone layer using "synthesizer ambient" voice.

始终保持音高和谐（C 大调、A 小调或五声音阶）。时间戳必须与 DSP 起始点对齐，但要保持音乐上的润色。始终包含一个使用“合成器环境音”音色的背景层。

◈ The Lilt format
◈ Lilt 格式

The agent outputs in Lilt -- a flat timestamp-based musical notation. The code is editable live. Change a velocity, shift a timestamp, swap a pitch, add a note. The synthesizer re-renders immediately. No new recording. No new API call. This is the feedback loop. The agent interprets. The user adjusts. The agent re-renders.

智能体以 Lilt 格式输出——这是一种基于时间戳的扁平化乐谱记法。代码可实时编辑。修改力度、平移时间戳、交换音高、添加音符，合成器会立即重新渲染。无需重新录音，无需新的 API 调用。这就是反馈循环：智能体解读，用户调整，智能体重新渲染。

💎 Who the agent serves
💎 智能体服务对象

| Profile | What they give | What the agent produces |
| :--- | :--- | :--- |
| **Non-verbal autism** | Sustained hum, single tone | Cello or piano melody in that pitch |
| **Cerebral palsy** | Tremor-affected taps | Percussive or piano rhythm |
| **ALS** | Minimal breath control | Ambient drone with gentle melody over it |
| **Locked-in syndrome** | Single eye-blink switch click | One-trigger composition, loops |
| **Quadriplegia** | Hard puff / soft puff contrast | Two-dynamic melody: accent and soft |
| **Parkinson's** | Tremor vocal hum | Cello composition that treats tremor as vibrato |

| 用户画像 | 输入内容 | 智能体产出 |
| :--- | :--- | :--- |
| **非语言自闭症** | 持续哼唱，单音 | 该音高的大提琴或钢琴旋律 |
| **脑瘫** | 受震颤影响的敲击 | 打击乐或钢琴节奏 |
| **渐冻症 (ALS)** | 微弱的呼吸控制 | 带有柔和旋律的环境背景音 |
| **闭锁综合征** | 单次眨眼开关点击 | 单触发式乐曲，循环播放 |
| **四肢瘫痪** | 强吹气/弱吹气对比 | 双动态旋律：重音与轻音 |
| **帕金森病** | 震颤的哼唱 | 将震颤处理为揉弦的大提琴乐曲 |
---
title: "bradautomates / claude-video"
originalUrl: "https://github.com/bradautomates/claude-video"
date: "2026-07-06T22:45:21.116Z"
---

# bradautomates / claude-video

**/watch Give Claude the ability to watch any video.**
**/watch 让 Claude 具备观看任何视频的能力。**

Claude Code (recommended — auto-updates via marketplace):
`/plugin marketplace add bradautomates/claude-video`
`/plugin install watch@claude-video`
Claude Code（推荐——通过市场自动更新）：
`/plugin marketplace add bradautomates/claude-video`
`/plugin install watch@claude-video`

Codex, Cursor, Copilot, Gemini CLI, or any of 50+ Agent Skills hosts:
`npx skills add bradautomates/claude-video -g` (-g installs globally for your user, available across all projects. Drop it to scope per-project.)
Codex、Cursor、Copilot、Gemini CLI 或任何 50 多种 Agent Skills 宿主：
`npx skills add bradautomates/claude-video -g`（-g 表示为用户全局安装，可在所有项目中使用。去掉该参数可将其限制在当前项目内。）

More install options (claude.ai web, manual) in the Install section below. Zero config to start — yt-dlp and ffmpeg install on first run via brew on macOS (Linux/Windows print exact commands). Captions cover most public videos for free. Whisper API key is only needed when a video has no captions.
更多安装选项（claude.ai 网页版、手动安装）请见下方的“安装”部分。无需配置即可启动——首次运行时，macOS 会通过 brew 自动安装 yt-dlp 和 ffmpeg（Linux/Windows 会打印出具体安装命令）。字幕可免费覆盖大多数公开视频。仅在视频没有字幕时才需要 Whisper API 密钥。

Claude can read a webpage, run a script, browse a repo. What it can't do, out of the box, is watch a video. You paste a YouTube link and it has to either guess from the title or pull a transcript that's missing 90% of what's on screen. With Claude Video /watch you can paste a URL or a local path, ask a question, and Claude fetches captions first, downloads only what it needs, extracts frames (scene-aware, or fast keyframes at efficient detail), pulls a timestamped transcript (free captions when available, Whisper API as fallback), and Reads every frame as an image. By the time it answers, it has seen the video and heard the audio.
Claude 可以阅读网页、运行脚本、浏览代码库。但它开箱即用时无法观看视频。当你粘贴 YouTube 链接时，它要么只能根据标题猜测，要么只能提取丢失了屏幕上 90% 内容的字幕。使用 Claude Video 的 `/watch` 命令，你可以粘贴 URL 或本地路径并提问，Claude 会先获取字幕，仅下载必要部分，提取帧（支持场景感知，或以高效细节提取关键帧），获取带时间戳的转录文本（优先使用免费字幕，Whisper API 作为备选），并将每一帧作为图像进行读取。在回答问题时，它已经“看”过了视频并“听”过了音频。

`/watch https://youtu.be/dQw4w9WgXcQ what happens at the 30 second mark?`
`/watch https://youtu.be/dQw4w9WgXcQ 30秒处发生了什么？`

### What people actually use it for
### 人们实际的用途

**Analyze someone else's content.**
`/watch https://youtu.be/<viral-video> what hook did they open with?`
Claude looks at the first frames, reads the opening transcript, breaks down the structure. Same for ad creative, competitor launches, podcast intros, anything where the how matters as much as the what.
**分析他人的内容。**
`/watch https://youtu.be/<viral-video> 他们开篇用了什么钩子（hook）？`
Claude 会查看前几帧，阅读开篇转录文本，并拆解其结构。同样适用于广告创意、竞争对手发布会、播客开场白，以及任何“方式”与“内容”同样重要的场景。

**Diagnose a bug from a video.**
Someone sends you a screen recording of something broken.
`/watch bug-repro.mov what's going wrong?`
Claude watches the recording, finds the frame where the issue appears, describes what's on screen, often catches the cause without you ever opening the file.
**通过视频诊断 Bug。**
有人发给你一段故障的屏幕录像。
`/watch bug-repro.mov 哪里出错了？`
Claude 会观看录像，找到问题出现的帧，描述屏幕上的内容，通常无需你亲自打开文件就能捕捉到原因。

**Summarize a video.**
`/watch https://youtu.be/<long-thing> summarize this`
does the obvious thing — pulls the structure, the key moments, what was actually said and shown. Faster than watching at 2x.
**总结视频。**
`/watch https://youtu.be/<long-thing> 总结一下`
执行显而易见的操作——提取结构、关键时刻、实际所说和所展示的内容。比 2 倍速观看更快。

**Cut the hype out of an update video.**
`/watch https://youtu.be/<launch-video> what's actually new — skip the hype`
Strip a "game-changer" feature drop down to the few things that matter, so you get the substance without ten minutes of intro and overselling.
**剔除更新视频中的炒作成分。**
`/watch https://youtu.be/<launch-video> 到底有什么新功能——跳过炒作`
将所谓的“颠覆性”功能发布精简为真正重要的几点，让你在没有十分钟开场白和过度营销的情况下获取实质内容。

**Turn a playlist into notes.**
`/watch https://youtu.be/<video> summarize this to a note`
Run it across a series and file a per-video summary, so a channel or course becomes a searchable set of notes instead of hours you have to sit through.
**将播放列表转化为笔记。**
`/watch https://youtu.be/<video> 将此总结为笔记`
对整个系列运行此命令并归档每个视频的摘要，这样频道或课程就变成了一套可搜索的笔记，而不是你需要花费数小时去观看的内容。

### How it works
### 工作原理

You paste a video and a question. URL (anything yt-dlp supports — YouTube, Loom, TikTok, X, Instagram, plus a few hundred more) or a local path (.mp4, .mov, .mkv, .webm). yt-dlp checks captions first. At transcript detail, captioned URLs return without downloading video. Otherwise, or when Whisper needs audio, it downloads only what the run needs.
你粘贴视频和问题。支持 URL（yt-dlp 支持的任何平台——YouTube、Loom、TikTok、X、Instagram 等数百个）或本地路径（.mp4, .mov, .mkv, .webm）。yt-dlp 会优先检查字幕。如果只需转录文本，带字幕的 URL 无需下载视频即可返回结果。否则，或者当 Whisper 需要音频时，它只会下载运行所需的部分。

ffmpeg extracts frames at the chosen detail. efficient decodes keyframes only (near-instant); balanced/token-burner prefer scene-change frames and fall back to the duration-aware uniform sampler when they under-produce. JPEGs are 512px wide by default and clamped to 1998px tall for Claude Read compatibility.
ffmpeg 会按选定的细节级别提取帧。efficient 模式仅解码关键帧（近乎瞬时）；balanced/token-burner 模式优先选择场景切换帧，并在提取不足时回退到基于时长的均匀采样器。为兼容 Claude 的读取，JPEG 默认宽度为 512px，高度限制在 1998px 以内。

The transcript comes from one of two places. First try: yt-dlp pulls native captions (manual or auto-generated) from the source. Free, instant, accurate-ish. Fallback: extract a mono 16 kHz 64 kbps mp3 audio clip (~480 kB/min) and ship it to Whisper — Groq's whisper-large-v3 (preferred — cheaper and faster) or OpenAI's whisper-1.
转录文本来自两个来源之一。首先尝试：yt-dlp 从源头提取原生字幕（手动或自动生成）。免费、即时、相对准确。备选方案：提取单声道 16 kHz 64 kbps 的 mp3 音频片段（约 480 kB/分钟）并发送给 Whisper——Groq 的 whisper-large-v3（首选——更便宜、更快）或 OpenAI 的 whisper-1。

Frames + transcript are handed to Claude. The script prints frame paths with t=MM:SS markers and the transcript with timestamps. Claude Reads each frame in parallel — JPEGs render directly as images in its context. Claude answers grounded in what's actually on screen and in the audio. Not "based on the description" or "according to the title." It saw the frames. It heard the transcript. It answers the way someone who watched the video would.
帧和转录文本被交给 Claude。脚本会打印带有 t=MM:SS 标记的帧路径以及带有时间戳的转录文本。Claude 并行读取每一帧——JPEG 直接作为图像渲染在其上下文中。Claude 的回答基于屏幕上实际显示的内容和音频内容，而不是“基于描述”或“根据标题”。它看到了帧，听到了转录文本，它的回答方式就像一个真正看过视频的人。

Cleanup. The script prints a working directory at the end. If you're not asking follow-ups, Claude removes it.
清理。脚本最后会打印工作目录。如果你没有后续提问，Claude 会将其删除。

### Frame budget — why it matters
### 帧预算——为什么它很重要

Token cost is dominated by frames. Every frame is an image; image tokens add up fast. The script's auto-fps logic exists so you don't blow your context budget on a sparse scan of a 30-minute video that would have been better answered by a focused 30-second window.
Token 成本主要由帧决定。每一帧都是一张图像；图像 Token 消耗很快。脚本的自动帧率逻辑旨在防止你为了对 30 分钟的视频进行稀疏扫描而耗尽上下文预算，因为针对性的 30 秒窗口往往能提供更好的回答。

| Duration | Default frame budget | What you get |
| :--- | :--- | :--- |
| ≤30 s | ~30 frames | Dense — basically every key moment |
| 30 s - 1 min | ~40 frames | Still dense |
| 1 - 3 min | ~60 frames | Comfortable |
| 3 - 10 min | ~80 frames | Sparse but workable |
| > 10 min | 100 frames (capped modes) | "Sparse scan" warning — re-run focused, or --detail token-burner for full uncapped coverage |

| 时长 | 默认帧预算 | 效果 |
| :--- | :--- | :--- |
| ≤30 秒 | ~30 帧 | 密集——基本涵盖每个关键时刻 |
| 30 秒 - 1 分钟 | ~40 帧 | 依然密集 |
| 1 - 3 分钟 | ~60 帧 | 舒适 |
| 3 - 10 分钟 | ~80 帧 | 稀疏但可用 |
| > 10 分钟 | 100 帧（上限模式） | “稀疏扫描”警告——建议重新运行 focused 模式，或使用 --detail token-burner 获取完整覆盖 |

When the user names a moment ("around 2:30", "the last 30 seconds", "from 0:45 to 1:00"), pass --start / --end. Focused mode gets denser per-second budgets, capped at 2 fps. Far more useful than a sparse pass over the whole thing.
当用户指定某个时刻（“2:30 左右”、“最后 30 秒”、“从 0:45 到 1:00”）时，请传入 `--start` / `--end` 参数。Focused 模式会获得更密集的每秒预算，上限为 2 fps。这比对整个视频进行稀疏扫描要有用得多。

### Frame deduplication
### 帧去重

Frame selection — keyframes (efficient), scene-change detection (balanced/token-burner), or the uniform sampler it falls back to — can still surface near-identical frames: a screen recording that holds one slide for 90 seconds produces a dozen, each billed as a separate image. A dedup pass drops them before frames reach Claude.
帧选择——关键帧（efficient）、场景切换检测（balanced/token-burner）或回退到的均匀采样器——仍可能产生近乎相同的帧：一段在 90 秒内保持同一张幻灯片的屏幕录像会产生十几帧，每一帧都会作为单独的图像计费。去重步骤会在帧到达 Claude 之前将其剔除。

It runs by default on every frame mode (--no-dedup turns it off): One ffmpeg call scales each extracted JPEG to a 16×16 grayscale thumbnail. Everything after is pure-stdlib Python — no image libraries. For each frame, compute the mean absolute difference against the last frame that was kept (average per-pixel brightness change, 0–255 scale). If that difference is at or below the threshold (2.0), the frame is a near-duplicate and is dropped. Otherwise it's kept and becomes the new reference.
它在所有帧模式下默认运行（使用 `--no-dedup` 可关闭）：一次 ffmpeg 调用将每个提取的 JPEG 缩放为 16×16 的灰度缩略图。之后的所有操作均为纯标准库 Python——无需图像库。对于每一帧，计算其与上一保留帧的平均绝对差值（平均每像素亮度变化，0-255 刻度）。如果差值小于或等于阈值（2.0），则该帧被视为近乎重复并被丢弃。否则，它将被保留并成为新的参考帧。
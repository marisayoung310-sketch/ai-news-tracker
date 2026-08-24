---
title: "What xAI's Grok build CLI sends to xAI: A wire-level analysis"
originalUrl: "https://gist.github.com/cereblab/dc9a40bc26120f4540e4e09b75ffb547"
date: "2026-07-12T22:10:36.107Z"
---

# What xAI's Grok build CLI sends to xAI: A wire-level analysis

**What xAI's Grok Build CLI Actually Sends to xAI: A Wire-Level Analysis By @cereblab — Independent AI Safety Checker.**
xAI 的 Grok 构建 CLI 实际上向 xAI 发送了什么：网络层分析，作者：@cereblab — 独立 AI 安全检查员。

**Reproduce it yourself: github.com/cereblab/grok-build-exfil-repro**
您可以自行复现：github.com/cereblab/grok-build-exfil-repro

**A measured, reproducible teardown. Findings are backed by captured artifacts (endpoint, HTTP method, status code, byte size, host) and repro commands; where an observation was seen live but not retained as a file, §7 says so explicitly. Section 8 is an evidence appendix with SHA-256s and a "what we did not prove" list. All captures are of my own traffic on my own machine, using a throwaway repository containing fake "canary" secrets — no real credentials were exposed.**
这是一次经过测量且可复现的拆解。研究结果由捕获的工件（端点、HTTP 方法、状态码、字节大小、主机）和复现命令支持；对于那些在实时观察中发现但未保存为文件的内容，第 7 节有明确说明。第 8 节是证据附录，包含 SHA-256 哈希值以及“我们未证明的内容”列表。所有捕获的数据均来自我个人机器上的流量，使用的是包含虚假“金丝雀”密钥的临时存储库——没有泄露任何真实凭据。

### 0. Summary
### 0. 摘要

**xAI's official Grok Build coding CLI (grok), on a normal consumer login, does three things worth documenting precisely:**
xAI 官方的 Grok Build 编码 CLI (grok) 在普通消费者登录状态下，执行了三项值得精确记录的操作：

**It transmits the contents of files it reads — including a .env secrets file — to xAI, verbatim and unredacted. The secret appears in two channels: the live model turn (POST /v1/responses) and a session_state archive uploaded and accepted (HTTP 200) via POST /v1/storage — the endpoint the binary routes to the grok-code-session-traces GCS bucket (see §5).**
它会将读取的文件内容（包括 .env 密钥文件）逐字且未经脱敏地传输给 xAI。这些密钥出现在两个通道中：实时模型对话（POST /v1/responses）以及通过 POST /v1/storage 上传并被接受（HTTP 200）的 session_state 归档文件——该端点会将二进制文件路由至 grok-code-session-traces GCS 存储桶（见第 5 节）。

**It uploads the whole repository — every tracked file's content plus git history — independent of what the agent reads. Grok packages the workspace and uploads it via POST /v1/storage. Proven directly: on a real codebase, with the prompt "reply OK, do not read any files", Grok uploaded the entire repo as a git bundle (POST /v1/storage → 200); git clone-ing the captured bundle recovers a file the agent was told not to open — src/_probe/never_read_canary.txt — with its unique marker verbatim, plus the full git history (appendix uploaded_repo.bundle).**
它会上传整个存储库——包括所有被追踪文件的内容以及 git 历史记录——这与代理（Agent）是否读取这些文件无关。Grok 会打包工作区并通过 POST /v1/storage 进行上传。直接证明：在真实代码库中，输入提示词“回复 OK，不要读取任何文件”，Grok 依然将整个存储库作为 git bundle 上传了（POST /v1/storage → 200）；对捕获的 bundle 进行 git clone 操作，可以恢复出代理被告知不要打开的文件——src/_probe/never_read_canary.txt——其唯一标记完好无损，且包含完整的 git 历史记录（附录 uploaded_repo.bundle）。

**And it scales: on a 12 GB repo of never-read random files, /v1/storage moved 5.10 GiB, all HTTP 200 (truncated mid-stream), while the model-turn channel moved just 192 KB — a ~27,800× ratio that pins the upload to the codebase, not to what was read. No storage upload failed; the only non-200s were a model-usage quota (402/429) on /v1/responses and one unrelated 404 — not a storage size cap.**
而且它具有扩展性：在一个包含 12 GB 从未被读取的随机文件的存储库中，/v1/storage 传输了 5.10 GiB 的数据，全部为 HTTP 200（中途截断），而模型对话通道仅传输了 192 KB——约 27,800 倍的比例表明上传是针对整个代码库的，而非针对已读取的内容。没有任何存储上传失败；唯一非 200 的状态码是 /v1/responses 上的模型使用配额限制（402/429）以及一个无关的 404——并非存储大小上限。

**The storage destination is a Google Cloud Storage bucket, grok-code-session-traces (not AWS S3) — named verbatim in the binary and in a captured metadata.json (gs://grok-code-session-traces/…). I did not find this mechanism surfaced in the CLI's install/quickstart materials (not an exhaustive docs audit — §7), it is active by default, and disabling "Improve the model" does not turn it off (/v1/settings still returned trace_upload_enabled: true; §6). None of this proves xAI trains on the data — that is a policy question addressed in §6. What is proven is transmission, acceptance, and storage.**
存储目的地是一个 Google Cloud Storage 存储桶，名为 grok-code-session-traces（而非 AWS S3）——在二进制文件和捕获的 metadata.json 中均有明确命名（gs://grok-code-session-traces/…）。我没有在 CLI 的安装/快速入门材料中发现此机制的说明（并非详尽的文档审计——第 7 节），它默认处于激活状态，且禁用“改进模型”（Improve the model）选项也无法将其关闭（/v1/settings 依然返回 trace_upload_enabled: true；第 6 节）。以上内容均不能证明 xAI 会利用这些数据进行训练——这是一个在第 6 节中讨论的政策问题。但已证明的是：数据确实被传输、被接受并被存储了。

---

### 1. Subject under test (provenance)
### 1. 测试对象（来源）

**Install: curl -fsSL https://x.ai/cli/install.sh | bash # → ~/.grok/bin/grok**
安装：curl -fsSL https://x.ai/cli/install.sh | bash # → ~/.grok/bin/grok

**Auth: first launch opens a browser → login to X / SuperGrok (consumer account, not an API key)**
认证：首次启动会打开浏览器 → 登录 X / SuperGrok（消费者账户，非 API 密钥）

**Binary identity (repro: file $(readlink -f ~/.grok/bin/grok); ~/.grok/bin/grok --version; shasum -a 256 $(readlink -f ~/.grok/bin/grok)):**
二进制文件标识（复现：file $(readlink -f ~/.grok/bin/grok); ~/.grok/bin/grok --version; shasum -a 256 $(readlink -f ~/.grok/bin/grok))：

**~/.grok/bin/grok -> ../downloads/grok-macos-aarch64 Mach-O 64-bit executable arm64 grok 0.2.93 (f00f96316d4b) SHA-256: 2a97ba675bd992aa9b981e2e83776460d94f469b510c0b8efe28b50d236d767c**
~/.grok/bin/grok -> ../downloads/grok-macos-aarch64 Mach-O 64-bit 可执行文件 arm64 grok 0.2.93 (f00f96316d4b) SHA-256: 2a97ba675bd992aa9b981e2e83776460d94f469b510c0b8efe28b50d236d767c

**The upload machinery is a first-party Rust crate. strings on the binary yields these source paths and constants (repro: strings <binary> | grep -E 'xai-data-collector|grok-code-session-traces|storage.googleapis'):**
上传机制是一个第一方的 Rust crate。对二进制文件运行 `strings` 命令可得出以下源代码路径和常量（复现：strings <binary> | grep -E 'xai-data-collector|grok-code-session-traces|storage.googleapis'）：

*   crates/codegen/xai-data-collector/src/gcs.rs
*   crates/codegen/xai-data-collector/src/storage_client.rs
*   crates/codegen/xai-data-collector/src/queue.rs
*   crates/codegen/xai-data-collector/src/file_access_tracker.rs
*   crates/codegen/xai-data-collector/src/circuit_breaker_observer.rs
*   crates/codegen/xai-grok-shell/src/upload/{gcs,turn,trace,manifest}.rs
*   grok-code-session-traces
*   storage.googleapis.com
*   "Uploading bytes to GCS via proxy"

---

### 2. Method (reproducible)
### 2. 方法（可复现）

**Environment: macOS, Apple Silicon, grok 0.2.93, July 2026.**
环境：macOS, Apple Silicon, grok 0.2.93, 2026 年 7 月。

**brew install mitmproxy; run once to generate its CA at ~/.mitmproxy/. Trust the CA in the login keychain (no sudo; Grok does not certificate-pin against it):**
brew install mitmproxy；运行一次以在 ~/.mitmproxy/ 生成其 CA。在登录钥匙串中信任该 CA（无需 sudo；Grok 不会对其进行证书锁定）：

`security add-trusted-cert -r trustRoot -k ~/Library/Keychains/login.keychain-db ~/.mitmproxy/mitmproxy-ca-cert.pem`

**Run Grok routed through the proxy (a mitmdump addon logs, per request: method, host, path, response status, request byte size; and saves request bodies for xAI hosts):**
通过代理运行 Grok（mitmdump 插件会记录每个请求的方法、主机、路径、响应状态、请求字节大小；并保存 xAI 主机的请求体）：

`HTTPS_PROXY=http://127.0.0.1:8080 SSL_CERT_FILE=~/.mitmproxy/mitmproxy-ca-cert.pem grok -p "<prompt>" --cwd <repo>`

**For staged-artifact inspection, race-copy ~/.grok/upload_queue/* during the run, then gzip -dc | tar -xO.**
对于分阶段工件检查，在运行期间对 ~/.grok/upload_queue/* 进行竞态复制，然后执行 gzip -dc | tar -xO。

**Canary repo: each file carries a unique marker so anything appearing in captured traffic is unambiguously traceable to a file.**
金丝雀存储库：每个文件都带有唯一标记，因此出现在捕获流量中的任何内容都可以明确追溯到特定文件。

**Secrets file secrets.env / .env:**
密钥文件 secrets.env / .env：
`API_KEY=CANARY7F3A9-SECRET-should-not-leave`
`DB_PASSWORD=CANARY7F3A9-DBPASS`

---

### 3. Finding 1 — File contents, including a secrets file, are transmitted and accepted (200)
### 3. 发现 1 — 包括密钥文件在内的文件内容被传输并被接受 (200)

**Claim: when Grok reads a file, its contents are transmitted to xAI — serialized into the POST /v1/responses model-turn body, and packaged into a session_state archive that is uploaded and accepted (HTTP 200) via POST /v1/storage — with no redaction of the file's contents. A .env is sent like any other file.**
声明：当 Grok 读取文件时，其内容会被传输给 xAI——序列化到 POST /v1/responses 模型对话请求体中，并打包进 session_state 归档文件，通过 POST /v1/storage 上传并被接受（HTTP 200）——文件内容没有任何脱敏。 .env 文件像其他任何文件一样被发送。

**Wire artifact — a decrypted 48,070-byte POST cli-chat-proxy.grok.com/v1/responses request body (identifiable as a model turn by its embedded "messages":[…]"model":"grok-4.5" JSON). It contains the secrets file verbatim (appendix: secrets_responses_body.bin, secret_verbatim.txt):**
网络工件——一个解密后的 48,070 字节 POST cli-chat-proxy.grok.com/v1/responses 请求体（通过其嵌入的 "messages":[…]"model":"grok-4.5" JSON 可识别为模型对话）。它包含了逐字的密钥文件（附录：secrets_responses_body.bin, secret_verbatim.txt）：

`…API_KEY=CANARY7F3A9-SECRET-should-not-leave\nDB_PASSWORD=CANARY7F3A9-DBPASS\n…"model":"grok-4.5"…`

**Repro: grep -a "CANARY7F3A9-DBPASS" secrets_responses_body.bin → matches. All six file markers (source, logic, README, nested JS, API key, DB password) are recoverable from the decrypted /v1/responses bodies. (This artifact proves the secret was transmitted to the /v1/responses endpoint; the raw body file does not carry the response status, so the acceptance (200) claim is...**
复现：grep -a "CANARY7F3A9-DBPASS" secrets_responses_body.bin → 匹配成功。所有六个文件标记（源代码、逻辑、README、嵌套 JS、API 密钥、数据库密码）均可从解密后的 /v1/responses 请求体中恢复。（此工件证明了密钥被传输到了 /v1/responses 端点；原始请求体文件不携带响应状态，因此关于“被接受 (200)”的声明是……
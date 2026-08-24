---
title: "Shai-Hulud Themed Malware Found in the PyTorch Lightning AI Training Library"
originalUrl: "https://semgrep.dev/blog/2026/malicious-dependency-in-pytorch-lightning-used-for-ai-training/"
date: "2026-04-30T22:16:37.695Z"
---

# Shai-Hulud Themed Malware Found in the PyTorch Lightning AI Training Library
# PyTorch Lightning AI 训练库中发现“沙虫”（Shai-Hulud）主题恶意软件

The PyPI package 'lightning', a widely-used deep learning framework, was compromised in a supply chain attack affecting versions 2.6.2 and 2.6.3 published on April 30, 2026. Teams building image classifiers, fine-tuning LLMs, running diffusion models, or developing time-series forecasters frequently have lightning somewhere in their dependency tree. Running pip install lightning is all that is needed to activate.
广泛使用的深度学习框架 PyPI 包“lightning”在 2026 年 4 月 30 日发布的 2.6.2 和 2.6.3 版本中遭到供应链攻击。无论是构建图像分类器、微调大语言模型（LLM）、运行扩散模型还是开发时间序列预测器的团队，其依赖树中往往都包含 lightning。只需运行 `pip install lightning` 即可激活该恶意软件。

The malicious versions contain a hidden `_runtime` directory with obfuscated JavaScript payload that executes automatically upon module import. The attack steals credentials, authentication tokens, environment variables, and cloud secrets, while also attempting to poison GitHub repositories. It has Shai-Hulud themes including creating public repositories called `EveryBoiWeBuildIsaWormBoi`.
这些恶意版本包含一个隐藏的 `_runtime` 目录，其中含有混淆的 JavaScript 载荷，会在模块导入时自动执行。该攻击会窃取凭据、身份验证令牌、环境变量和云密钥，并试图污染 GitHub 存储库。它带有“沙虫”（Shai-Hulud）主题，包括创建名为 `EveryBoiWeBuildIsaWormBoi` 的公共存储库。

We believe that this attack is the work of the same threat actor behind the mini Shai-Hulud campaign. The IOC structure is consistent with that operation: the malicious commit messages follow the same Dune-themed naming convention, with this campaign using the prefix `EveryBoiWeBuildIsAWormyBoi` to distinguish it from the original Mini Shai-Hulud attack.
我们认为此次攻击与“迷你沙虫”（Mini Shai-Hulud）活动的幕后黑手是同一威胁行为者。其入侵指标（IOC）结构与该行动一致：恶意提交信息遵循相同的《沙丘》（Dune）主题命名惯例，此次活动使用前缀 `EveryBoiWeBuildIsAWormyBoi` 以区别于最初的“迷你沙虫”攻击。

### Affected Packages
### 受影响的包
- lightning version 2.6.2
- lightning version 2.6.3

### For Semgrep Customers
### 给 Semgrep 用户的建议
Semgrep has an advisory and rule to cover this so you can find to check your projects. Trigger a new scan if you haven't recently on your projects. Check the advisories page to see if any projects have installed these package versions recently: https://semgrep.dev/orgs/-/advisories. Check your dependency filter for matches. If you see “No matching dependencies” you are not actively using the malicious dependency in any of your projects. If you did match, additional advice on remediation and indicators of compromise are below.
Semgrep 已发布相关公告和规则以覆盖此漏洞，您可以据此检查项目。如果您最近未对项目进行扫描，请触发一次新扫描。请查看公告页面，确认是否有项目近期安装了这些版本的包：https://semgrep.dev/orgs/-/advisories。检查您的依赖过滤器是否有匹配项。如果显示“No matching dependencies”（无匹配依赖），则说明您的项目中未主动使用该恶意依赖。如果匹配成功，请参考下方的补救建议和入侵指标。

If you matched: Also audit your repositories for the injected files listed in the IOCs below (`.claude/` and `.vscode/` directories with unexpected contents), and rotate any GitHub tokens, cloud credentials, or API keys that may have been present in the affected environment.
如果匹配成功：请审计您的存储库，查找下文 IOC 中列出的注入文件（`.claude/` 和 `.vscode/` 目录中包含异常内容），并轮换受影响环境中可能存在的所有 GitHub 令牌、云凭据或 API 密钥。

### Cross-Ecosystem Spread: PyPI to npm
### 跨生态传播：从 PyPI 到 npm
Unlike mini Shai-Hulud, which targeted npm directly, the entry point here is PyPI. The malware payload is still JavaScript, and the worm propagation happens through npm. Once running, if the malware finds npm publish credentials, it injects a `setup.mjs` dropper and `router_runtime.js` into every package that token can publish to, sets `scripts.preinstall` to execute the dropper, bumps the patch version, and republishes. And any downstream developer who installs one of those packages runs the full malware on their machine, has their tokens stolen and packages wormed.
与直接针对 npm 的“迷你沙虫”不同，此次攻击的切入点是 PyPI。恶意软件载荷仍为 JavaScript，且蠕虫传播通过 npm 进行。一旦运行，如果恶意软件发现 npm 发布凭据，它会将 `setup.mjs` 释放器和 `router_runtime.js` 注入到该令牌可发布的所有包中，设置 `scripts.preinstall` 以执行释放器，提升补丁版本并重新发布。任何安装了这些包的下游开发者都会在机器上运行完整的恶意软件，导致令牌被窃取，包被植入蠕虫。

### How it Works
### 工作原理
The exfiltration component shares its design with the "Mini Shai-Hulud" mechanism from their last campaign, using four parallel channels so stolen data gets out even if individual paths are blocked.
数据外泄组件的设计与上次活动中的“迷你沙虫”机制相同，使用了四个并行通道，即使个别路径被封锁，被盗数据也能传出。

1. **HTTPS POST to C2**: Stolen data is immediately POSTed to an attacker-controlled server over port 443. The domain and path are stored as encrypted strings in the payload, making static analysis harder.
1. **HTTPS POST 至 C2 服务器**：被盗数据通过 443 端口立即 POST 到攻击者控制的服务器。域名和路径以加密字符串形式存储在载荷中，增加了静态分析的难度。

2. **GitHub commit search dead-drop**: The malware polls the GitHub commit search API for commit messages prefixed with `EveryBoiWeBuildIsAWormyBoi`, which carry a double-base64-encoded token. Once decoded, the token is used to authenticate an Octokit client for further operations.
2. **GitHub 提交搜索死信投递**：恶意软件轮询 GitHub 提交搜索 API，查找以 `EveryBoiWeBuildIsAWormyBoi` 为前缀的提交信息，其中携带了双重 Base64 编码的令牌。解码后，该令牌用于验证 Octokit 客户端以进行后续操作。

3. **Attacker-controlled public GitHub repo**: A new public repository is created with a randomly chosen Dune-word name and the description "A Mini Shai-Hulud has Appeared". Stolen credentials are committed as `results/results-<timestamp>-<n>.json`.
3. **攻击者控制的公共 GitHub 存储库**：创建一个新的公共存储库，名称随机选择《沙丘》词汇，描述为“A Mini Shai-Hulud has Appeared”。被盗凭据以 `results/results-<timestamp>-<n>.json` 的形式提交。

4. **Push to victim's own repo**: If the malware obtains a `ghs_` GitHub server token, it pushes stolen data directly to all branches of the victim's own `GITHUB_REPOSITORY`.
4. **推送到受害者自己的存储库**：如果恶意软件获取了 `ghs_` GitHub 服务器令牌，它会将窃取的数据直接推送到受害者自身 `GITHUB_REPOSITORY` 的所有分支。

### What Gets Stolen
### 窃取内容
The malware targets credentials across local files, environment, CI/CD pipelines, and cloud providers:
恶意软件针对本地文件、环境、CI/CD 流水线和云服务提供商中的凭据进行窃取：

- **Filesystem**: Scans 80+ credential file paths for `ghp_`, `gho_`, and `npm_` tokens.
- **文件系统**：扫描 80 多个凭据文件路径，查找 `ghp_`、`gho_` 和 `npm_` 令牌。
- **Shell / Environment**: Runs `gh auth token` and dumps all environment variables.
- **Shell / 环境**：运行 `gh auth token` 并转储所有环境变量。
- **GitHub Actions**: Dumps `Runner.Worker` process memory to extract secrets marked "isSecret":true.
- **GitHub Actions**：转储 `Runner.Worker` 进程内存，提取标记为 "isSecret":true 的密钥。
- **Cloud (AWS/Azure/GCP)**: Enumerates and fetches all Secrets Manager values, SSM parameters, and Key Vault secrets.
- **云服务 (AWS/Azure/GCP)**：枚举并获取所有 Secrets Manager 值、SSM 参数和 Key Vault 密钥。

### Persistence via Developer Tooling
### 通过开发者工具实现持久化
Once inside a repository, the malware plants persistence hooks targeting two of the most common developer tools: Claude Code and VS Code.
一旦进入存储库，恶意软件会植入针对两种最常用开发者工具（Claude Code 和 VS Code）的持久化钩子。

- **Claude Code**: `.claude/settings.json`. The malware writes a `SessionStart` hook into the repository's Claude Code settings, pointing to `node .vscode/setup.mjs`. It fires every time a developer opens Claude Code in the infected repo.
- **Claude Code**：`.claude/settings.json`。恶意软件在存储库的 Claude Code 设置中写入一个 `SessionStart` 钩子，指向 `node .vscode/setup.mjs`。每当开发者在受感染的存储库中打开 Claude Code 时，它就会触发。
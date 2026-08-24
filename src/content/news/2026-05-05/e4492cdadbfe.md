---
title: "Release v0.9.0 · Foxboron/ssh-tpm-agent"
originalUrl: "https://github.com/Foxboron/ssh-tpm-agent/releases/tag/v0.9.0"
date: "2026-05-04T22:37:15.697Z"
---

# Release v0.9.0 · Foxboron/ssh-tpm-agent

### Packaging change
ssh-tpm-agent releases now has a tarball with an accompanying signature. Please use this tarball instead of the Github generated tarball to have ssh-tpm-agent report the correct version. Alternatively please checkout the tag release straight from git.

### 打包方式变更
ssh-tpm-agent 的发布版本现在包含一个压缩包及其附带的签名文件。请使用此压缩包而非 GitHub 自动生成的压缩包，以确保 ssh-tpm-agent 能正确显示版本号。或者，您也可以直接从 git 检出对应的标签版本。

---

### Changes
**Key confirm dialog and process chain**
ssh-tpm-add now supports the -c flag for adding keys with a confirmation dialog. This will require user-interaction through ssh-askpass before the key is used for authentication or signatures. Additionally the ssh-askpass prompt now contains the process chain that prompted the dialog instead of it appearing context less. Thanks to @Mic92 for implementing this.

### 更新内容
**密钥确认对话框与进程链**
ssh-tpm-add 现在支持 `-c` 参数，用于添加带有确认对话框的密钥。在密钥被用于身份验证或签名之前，需要通过 `ssh-askpass` 进行用户交互。此外，`ssh-askpass` 的提示框现在会显示触发该对话框的进程链，而不再是无上下文的提示。感谢 @Mic92 的实现。

---

**Public keys permissions changes**
Public keys are now saved as world readable, 644, instead of the only readable by the owner. This mirrors the behaviour from ssh-keygen.

**公钥权限变更**
公钥现在保存为全局可读（权限 644），而非仅限所有者可读。这与 `ssh-keygen` 的行为保持一致。

---

### Generated Changelog
**What's Changed**
* Tests | Data Races eliminated by @derwesx in #91
* when keyring returns ENOENT, treat it as ENOKEY by @Mic92 in #94
* Fix typo in README by @Gusted in #98
* Fix typo of 'shouldnt' by @jas4711 in #104
* Create public keys with permissions 644 by @nlewo in #111
* docs: fix bash syntax highlighting in README by @only1thor in #113
* ssh-tpm-add: add -c flag for per-use confirmation by @Mic92 in #114
* fix: Provide err context (fixes #118) by @vorburger in #119
* fix: Provide err context for 'Failed changing passphrase on the key by @vorburger in #120
* fix: ssh-tpm-keygen for empty passphrase by @vorburger in #121
* agent: show requesting process in confirm prompt by @Mic92 in #124
* Embed version in git-archive tarballs and populate VERSION from it when set by @jas4711 in #105

### 更新日志
**主要变更**
* 测试 | 消除数据竞争 (由 @derwesx 在 #91 提交)
* 当密钥环返回 ENOENT 时，将其视为 ENOKEY (由 @Mic92 在 #94 提交)
* 修复 README 中的拼写错误 (由 @Gusted 在 #98 提交)
* 修复 'shouldnt' 的拼写错误 (由 @jas4711 在 #104 提交)
* 创建权限为 644 的公钥 (由 @nlewo 在 #111 提交)
* 文档：修复 README 中的 bash 语法高亮 (由 @only1thor 在 #113 提交)
* ssh-tpm-add：添加用于单次确认的 -c 参数 (由 @Mic92 在 #114 提交)
* 修复：提供错误上下文 (修复 #118) (由 @vorburger 在 #119 提交)
* 修复：为“更改密钥密码失败”提供错误上下文 (由 @vorburger 在 #120 提交)
* 修复：针对空密码的 ssh-tpm-keygen 问题 (由 @vorburger 在 #121 提交)
* 代理：在确认提示中显示请求进程 (由 @Mic92 在 #124 提交)
* 在 git-archive 压缩包中嵌入版本号，并在设置时从中填充 VERSION (由 @jas4711 在 #105 提交)
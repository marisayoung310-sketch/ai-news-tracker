---
title: "I created the simple logger."
originalUrl: "https://dev.to/bearatol/i-created-the-simple-logger-12lo"
date: "2026-06-26T22:48:04.773Z"
---

### Title: I created the simple logger.
### 标题：我创建了一个简单的日志记录器 (logger)。

lg logger I wrote a logger that is as simple as possible, suitable as a replacement for the standard logger, because it works on its basis.
lg logger 是我编写的一个尽可能简单的日志记录器，适合作为标准 logger 的替代品，因为它是在标准库的基础上构建的。

It can't compare with zap and logrus, it just adds the convenience of using the standard log.
它无法与 zap 或 logrus 相提并论，它只是增加了使用标准 log 的便利性。

It is very convenient if you do not need to drag zap, logrus with you, but just make go get and use it as log, only write lg (which is even shorter) and with error levels, backlight.
如果你不想引入 zap 或 logrus 这样庞大的依赖，而只是想通过 `go get` 安装并像使用 log 一样使用它，那么它非常方便。你只需要输入 `lg`（比 `log` 更短），并且它还支持错误级别和高亮显示。

The backlight can be turned off with one function.
高亮显示可以通过一个函数轻松关闭。

The tests are written, the linter is there, CI/CD is configured, the license is described.
测试用例已经编写完成，集成了 linter，配置了 CI/CD，并且说明了许可证信息。

Perhaps it will be useful to someone.
也许它会对某些人有所帮助。
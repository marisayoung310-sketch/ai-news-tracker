---
title: "Bundler Quiz!"
originalUrl: "https://dev.to/gemmaro/bundler-quiz-3fkh"
date: "2026-07-25T22:19:16.203Z"
---

# Bundler Quiz! / Bundler 测验！

(Translated from the Japanese article.) This is a quiz about Ruby's Bundler! Add 8 characters to the following Gemfile so that bundle install fails (with non-zero exit code) for the second time or later.
（译自日语文章。）这是一个关于 Ruby Bundler 的测验！请在以下 Gemfile 中添加 8 个字符，使得 `bundle install` 在第二次或之后运行时失败（返回非零退出代码）。

```ruby
source "https://rubygems.org"
gemspec
```

Notes: Bundler is a fairly recent version (approximately version 3 or later). The first invocation succeeds. If you find the answer (on your own), please send me a direct message on ruby.social or email, etc.!
注意：Bundler 版本较新（约为 3.0 或更高版本）。第一次执行必须成功。如果你（独立）找到了答案，请通过 ruby.social 发送私信或通过电子邮件等方式联系我！

Wrong Answers
错误答案

An invalid URL like https://rubygems.org12345678: It doesn't fail since Bundler doesn't refer to the URL.
像 `https://rubygems.org12345678` 这样的无效 URL：它不会失败，因为 Bundler 并未引用该 URL。

An invalid URL and gems: It fails on the first run. It must fail only on the second or later runs.
无效的 URL 和 gems：这会导致第一次运行就失败。题目要求必须仅在第二次或之后的运行中失败。

License
许可协议

Copyright (C) 2026 gemmaro
Copying and distribution of this file, with or without modification, are permitted in any medium without royalty provided the copyright notice and this notice are preserved. This file is offered as-is, without any warranty.
版权所有 (C) 2026 gemmaro
在保留版权声明和本声明的前提下，允许在任何媒介中免费复制和分发本文件，无论是否经过修改。本文件按“原样”提供，不提供任何形式的保证。
---
title: "JSON5E - JSON5 for Humans"
originalUrl: "https://github.com/boris-kolpackov/libpdjson5/blob/master/JSON5E.md"
date: "2026-07-20T22:23:48.237Z"
---

# JSON5E - JSON5 for Humans

JSON5E - JSON5 for Humans
JSON5E 是 JSON5 格式的一个扩展，旨在让手动编写和维护变得更加自然。如果说 JSON5 保留了 JSON 的整体结构并从 ECMAScript 5 中汲取灵感，那么 JSON5E 则在保留 JSON 对象模型的同时，努力使其外观和感觉更接近 `/etc` 目录下常见的配置文件。

JSON5E is an extension of the JSON5 format that aims to be even more natural to write and maintain by hand. Where JSON5 retains the overall JSON shape and draws on ECMAScript 5 for inspiration, JSON5E tries harder to approximate the look and feel of a typical configuration file found in /etc while retaining the JSON object model.

Specifically, JSON5E extends JSON5 with the following syntax:
具体而言，JSON5E 通过以下语法扩展了 JSON5：

**Implied top-level objects.**
**隐式顶层对象。**

JSON5: `{ delay: 10, timeout: 30 }`
JSON5E: `delay: 10, timeout: 30`
Note that top-level arrays and simple values are still supported (but there are no implied top-level arrays).
请注意，顶层数组和简单值仍然受支持（但没有隐式顶层数组）。

**Newline in addition to comma as a separator.**
**除逗号外，换行符也可作为分隔符。**

JSON5: `{ delay: 10, timeout: 30 }`
JSON5E: `{ delay: 10 \n timeout: 30 }`
Note that it must be a newline, not just a whitespace.
请注意，必须是换行符，而不仅仅是空格。

**`-` and `.` are allowed in unquoted object member names. But not as a first character.**
**在未加引号的对象成员名称中允许使用 `-` 和 `.`，但不能作为首字符。**

JSON5: `{ 'connection-delay': 10, 'connection-timeout': 30 }`
JSON5E: `{ connection-delay: 10, connection-timeout: 30 }`

**`#`-style comments in addition to `//` and `/* */`.**
**除 `//` 和 `/* */` 外，还支持 `#` 风格的注释。**

JSON5: 
```json
{ 
  // Initial delay before connecting. 
  // delay: 10, 
  // Connection timeout. 
  // timeout: 30 
}
```
JSON5E: 
```json
{ 
  # Initial delay before connecting. 
  # delay: 10, 
  # Connection timeout. 
  # timeout: 30 
}
```

**Putting it all together,**
**综合来看：**

JSON5: 
```json
{ 
  // Initial delay before connecting. 
  // 'connection-delay': 10, 
  // Connection timeout. 
  // 'connection-timeout': 30 
}
```
JSON5E: 
```json
# Initial delay before connecting. 
# connection-delay: 10 
# Connection timeout. 
# connection-timeout: 30 
```

Which looks a lot more like a typical configuration file.
这看起来更像是一个典型的配置文件。

The following parser implementations support JSON5E:
以下解析器实现支持 JSON5E：

C: [libpdjson5](https://github.com/oliversturm/libpdjson5)
C++: [libstud-json](https://github.com/oliversturm/libstud-json)
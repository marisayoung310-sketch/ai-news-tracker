---
title: "Volkswagen blocks Home Assistant by requiring client assertion"
originalUrl: "https://github.com/robinostlund/homeassistant-volkswagencarnet/issues/967"
date: "2026-05-29T22:46:09.999Z"
---

### Volkswagen blocks Home Assistant by requiring client assertion
### 大众汽车通过强制要求客户端断言（Client Assertion）封锁 Home Assistant

**Original:**
Volkswagen has recently implemented a change to its authentication process that effectively blocks third-party integrations like Home Assistant from accessing vehicle data. Users of the `homeassistant-volkswagencarnet` integration have reported that they are no longer able to log in, despite their credentials working perfectly fine in the official Android app and web portal.

**Translation:**
大众汽车最近对其身份验证流程进行了更改，实际上阻止了像 Home Assistant 这样的第三方集成访问车辆数据。`homeassistant-volkswagencarnet` 集成的用户报告称，尽管他们的凭据在官方安卓应用和网页门户中完全正常，但他们已无法登录。

**Original:**
The issue, documented in a GitHub issue report, highlights that the authentication service now requires a "client assertion." This is a security mechanism that verifies the identity of the client application itself, rather than just the user's credentials. Because the Home Assistant integration is not an officially authorized client by Volkswagen, it lacks the necessary cryptographic keys to provide this assertion, resulting in a login failure.

**Translation:**
GitHub 问题报告中记录的这一问题指出，身份验证服务现在要求提供“客户端断言”（client assertion）。这是一种安全机制，用于验证客户端应用程序本身的身份，而不仅仅是验证用户的凭据。由于 Home Assistant 集成并非大众汽车官方授权的客户端，它缺乏提供此断言所需的加密密钥，从而导致登录失败。

**Original:**
While the official Volkswagen app and browser-based logins continue to function, the integration's inability to authenticate means users can no longer monitor or control their vehicles through their Home Assistant dashboards. As of now, there is no immediate workaround, and the community is investigating whether a new authentication flow can be implemented to bypass this restriction.

**Translation:**
虽然官方大众汽车应用和基于浏览器的登录功能仍然正常，但该集成无法进行身份验证，意味着用户无法再通过 Home Assistant 仪表板监控或控制他们的车辆。目前尚无直接的解决方案，社区正在研究是否可以实施新的身份验证流程来绕过此限制。
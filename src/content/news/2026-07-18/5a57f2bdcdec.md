---
title: "Supabase Sign in with Apple keeps throwing invalid_client: the checklist that actually finds it"
originalUrl: "https://dev.to/toritic/supabase-sign-in-with-apple-keeps-throwing-invalidclient-the-checklist-that-actually-finds-it-5c7i"
date: "2026-07-17T22:24:39.521Z"
---

# Supabase Sign in with Apple keeps throwing invalid_client: the checklist that actually finds it
# Supabase “Sign in with Apple” 持续报错 invalid_client：一份真正有效的排查清单

You rotate a key for Sign in with Apple, and suddenly every login throws invalid_client. It was supposed to be a five minute change. Three hours later you are still staring at the same error. This one bites hard because invalid_client is Apple's answer to about six different mistakes, and the error text never tells you which one you made. Here is the checklist that finds it, in the order of most likely to least.
当你更新了“Sign in with Apple”的密钥后，突然所有的登录请求都报 `invalid_client` 错误。这本该是一个五分钟就能搞定的变更，结果三小时后你依然盯着同样的错误发愁。这个问题之所以棘手，是因为 `invalid_client` 是苹果对大约六种不同错误统一返回的提示，而错误信息本身从不告诉你具体错在哪。以下是按可能性从高到低排列的排查清单。

### What is actually being checked
### 实际的校验逻辑

When Supabase (or any backend) talks to Apple, it presents a client secret that is not a static string: it is a JWT you generate, signed with your .p8 key. Apple validates five things about it, and a mismatch in any one of them returns invalid_client:
当 Supabase（或任何后端）与苹果服务器通信时，它会提交一个客户端密钥（client secret）。这并不是一个静态字符串，而是你使用 `.p8` 密钥签名生成的 JWT。苹果会校验其中的五项内容，任何一项不匹配都会返回 `invalid_client`：

*   the JWT is signed by the key whose Key ID is in the JWT header
*   JWT 必须由 JWT 头部中 Key ID 所对应的密钥进行签名
*   that key belongs to your Apple team
*   该密钥必须属于你的 Apple 开发者团队
*   the sub claim matches your Services ID (not your App ID)
*   `sub` 声明必须匹配你的 Services ID（而非 App ID）
*   the iss claim is your Team ID
*   `iss` 声明必须是你的 Team ID
*   the JWT is not expired
*   JWT 必须在有效期内

### The checklist
### 排查清单

1. **Did you regenerate the client-secret JWT after rotating the .p8?** This is the classic trap. Rotating the key in the Apple Developer portal does nothing to the JWT you generated from the old key. That JWT still carries the old Key ID in its header, so Apple rejects it. After any key rotation you must generate a fresh client-secret JWT from the new .p8 and paste that into your provider config. The old secret does not "refresh".
1. **更新 .p8 密钥后，你重新生成 client-secret JWT 了吗？** 这是最经典的陷阱。在 Apple 开发者后台更新密钥，并不会自动更新你之前用旧密钥生成的 JWT。那个 JWT 的头部依然携带旧的 Key ID，因此会被苹果拒绝。每次更新密钥后，你必须使用新的 .p8 文件生成全新的 client-secret JWT，并将其粘贴到你的服务配置中。旧的密钥不会“自动刷新”。

2. **Is the sub claim your Services ID?** The sub in the client-secret JWT must be the Services ID (the identifier you created for web auth, usually something like com.yourapp.web), not the App ID and not the bundle id. If you copied the wrong identifier when generating the secret, Apple sees a client it does not know.
2. **`sub` 声明是否为 Services ID？** client-secret JWT 中的 `sub` 必须是 Services ID（即你为 Web 认证创建的标识符，通常类似于 `com.yourapp.web`），而不是 App ID 或 Bundle ID。如果你在生成密钥时复制了错误的标识符，苹果会认为这是一个它不认识的客户端。

3. **Does the Key ID in the JWT header match the uploaded key?** Decode your client secret at any JWT debugger (it is not sensitive to decode, it is public claims plus a signature). The header's kid must be exactly the Key ID shown next to your Sign in with Apple key in the developer portal. A stale kid means you signed with a key Apple no longer associates with that configuration.
3. **JWT 头部中的 Key ID 是否与上传的密钥匹配？** 使用任何 JWT 调试工具解码你的 client secret（解码并不涉及敏感信息，它只是公开声明加上签名）。头部中的 `kid` 必须与开发者后台中“Sign in with Apple”密钥旁显示的 Key ID 完全一致。如果 `kid` 过期，意味着你使用的签名密钥已不再与该配置关联。

4. **Is the JWT expired?** Apple caps client-secret JWTs at 6 months (exp at most 15777000 seconds after iat). If you generated the secret long ago and it worked until today, this is your answer: it aged out, which people then misdiagnose as a rotation problem while rotating everything except the one thing that expired.
4. **JWT 是否过期？** 苹果对 client-secret JWT 的有效期限制为 6 个月（`exp` 最多比 `iat` 晚 15,777,000 秒）。如果你很久之前生成的密钥一直能用直到今天才报错，原因就在这里：它过期了。人们常将其误判为密钥轮换问题，结果把所有东西都换了一遍，唯独没换那个真正过期的东西。

5. **Is the ES256 algorithm actually used?** The secret must be signed with ES256 (the .p8 is an EC key). A generator defaulting to HS256 or RS256 produces a structurally valid JWT that Apple rejects. The decoded header should read "alg": "ES256".
5. **是否确实使用了 ES256 算法？** 密钥必须使用 ES256 签名（.p8 是一个 EC 密钥）。如果生成器默认使用 HS256 或 RS256，生成的 JWT 虽然结构合法，但会被苹果拒绝。解码后的头部应显示 `"alg": "ES256"`。

6. **Are the domain and return URL registered on the Services ID?** If the identifiers all match but auth still fails at the redirect step, check that the Services ID has your auth domain (for Supabase: `<project-ref>.supabase.co`) and the exact callback URL registered under its Sign in with Apple configuration.
6. **域名和返回 URL 是否已在 Services ID 中注册？** 如果标识符都匹配，但在重定向步骤仍然失败，请检查 Services ID 的“Sign in with Apple”配置中是否注册了你的认证域名（对于 Supabase 而言是 `<project-ref>.supabase.co`）以及准确的回调 URL。

### The five minute reset, when you would rather stop debugging
### 当你想放弃调试时：五分钟重置法

When the state is too tangled, a clean rebuild is faster than archaeology:
当状态过于混乱时，彻底重建比排查旧记录更快：

*   In the Apple portal: create a fresh key with Sign in with Apple enabled, download the new .p8, note the Key ID.
*   在 Apple 后台：创建一个启用了“Sign in with Apple”的新密钥，下载新的 .p8 文件，并记下 Key ID。
*   Confirm the Services ID, Team ID, and domain/return URL config.
*   确认 Services ID、Team ID 以及域名/返回 URL 配置。
*   Generate a brand new client-secret JWT (ES256, iss = Team ID, sub = Services ID, kid = the new Key ID, exp under 6 months).
*   生成一个全新的 client-secret JWT（算法 ES256，`iss` = Team ID，`sub` = Services ID，`kid` = 新的 Key ID，`exp` 在 6 个月内）。
*   Paste it into your provider config (in Supabase: Authentication, then Providers, then Apple) and save.
*   将其粘贴到你的提供商配置中（在 Supabase 中：Authentication -> Providers -> Apple）并保存。
*   Test in a private window.
*   在隐私模式窗口中进行测试。

Every value is freshly derived, so any stale-state mismatch is gone.
所有值都是重新生成的，因此任何旧状态导致的不匹配问题都会消失。
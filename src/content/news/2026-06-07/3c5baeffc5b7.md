---
title: "Meta confirms 1000s of Instagram accounts were hacked by abusing its AI chatbot"
originalUrl: "https://this.weekinsecurity.com/meta-confirms-thousands-of-instagram-accounts-were-hacked-by-abusing-its-ai-chatbot/"
date: "2026-06-06T22:33:30.876Z"
---

# Meta confirms 1000s of Instagram accounts were hacked by abusing its AI chatbot
# Meta 证实数千个 Instagram 账户因其 AI 聊天机器人被滥用而遭黑客攻击

Meta is notifying thousands of people whose Instagram accounts were hijacked during the months-long abuse of the company's AI chatbot, which hackers repeatedly tricked into taking control of a person's account.
Meta 正在通知数千名用户，他们的 Instagram 账户在公司 AI 聊天机器人长达数月的滥用期间被劫持。黑客多次诱骗该机器人，从而夺取了用户的账户控制权。

In a new data breach notification letter, seen by this week in security, Meta has revealed for the first time how many people had their accounts hijacked as part of the long-running hacking campaign, which was discovered earlier this week and first reported by 404 Media ($) and TechCrunch ($). The number of affected accounts gives some clarity as to how widespread this hacking campaign was, and for how long it operated.
在一封被《this week in security》看到的最新数据泄露通知信中，Meta 首次披露了在此次长期黑客攻击活动中被劫持账户的具体人数。该活动于本周早些时候被发现，并由 404 Media 和 TechCrunch 率先报道。受影响账户的数量揭示了此次黑客攻击的广泛程度及其持续时间。

According to the data breach notice filed with Maine's attorney general's office late on Friday, Meta notified at least 20,225 people that their accounts had been compromised, including 30 people in Maine. The compromises allowed the hackers to take over the person's entire Instagram and any linked accounts, including obtaining contact information, dates of birth, and profile information, as well as the ability to access the person's posts, direct messages, and account activity, the notice reads.
根据周五晚间提交给缅因州总检察长办公室的数据泄露通知，Meta 已通知至少 20,225 名用户其账户遭到入侵，其中包括 30 名缅因州居民。通知显示，这些入侵行为使黑客能够完全接管用户的 Instagram 及其关联账户，包括获取联系方式、出生日期和个人资料信息，并有权访问用户的帖子、私信和账户活动记录。

Meta's notice confirmed that the breach relates to "a vulnerability in an AI-assisted account recovery system for Instagram," which was exploited to "perform password resets on Instagram user accounts."
Meta 的通知证实，此次泄露与“Instagram AI 辅助账户恢复系统中的一个漏洞”有关，该漏洞被利用来“对 Instagram 用户账户执行密码重置”。

As previously reported, hackers abused a flaw in Meta's chatbot that allowed anyone to reset the password of any account that did not have two-factor authentication switched on. The bug tricked the chatbot into sending a verification code to an email address controlled by the hacker, rather than the account holder's email address on file, simply by asking it. The chatbot complied anyway.
正如之前报道的那样，黑客利用了 Meta 聊天机器人中的一个缺陷，该缺陷允许任何人重置未开启双重身份验证的账户密码。黑客只需向聊天机器人提出要求，就能诱骗其将验证码发送到黑客控制的电子邮件地址，而不是账户持有人在系统中预留的邮箱。而聊天机器人竟然照做了。

"The tool itself worked properly and functioned as intended; however due to a bug in a separate code path, the system did not properly verify that the email address provided by the individual requesting a password reset matched the email address associated with that user’s Instagram account," said Meta in its breach notice.
Meta 在泄露通知中表示：“该工具本身运行正常，功能符合预期；但由于独立代码路径中存在一个错误，系统未能正确验证请求重置密码者提供的电子邮件地址，是否与该用户 Instagram 账户关联的邮箱相匹配。”

"As a result, when an individual provided an email address not previously associated with the account, the system incorrectly sent a password reset link to that unassociated email rather than rejecting the request. This allowed unauthorized third parties to receive a password reset link for accounts they did not own," the company added.
该公司补充道：“因此，当有人提供一个此前未与该账户关联的电子邮件地址时，系统错误地将密码重置链接发送到了该邮箱，而不是拒绝请求。这使得未经授权的第三方能够收到他们并不拥有的账户的密码重置链接。”

At this point, Meta says, the hackers could reset someone's password and take over their account as if they were the rightful owner.
Meta 表示，至此，黑客便可以重置他人的密码，并像合法所有者一样接管其账户。

Meta said that it is "unaware" of what, if any, personal information was accessed during the hacks. (An email to Meta's press line asking for clarity on this was unreturned as of early Saturday.) According to Maine's listing, the hacks began around April 17 and lasted until this week, when Meta said that it had secured the chatbot. Instagram reportedly started notifying affected individuals earlier this week by sending a password reset notification, even as some reported that the hacks were ongoing.
Meta 表示，目前“尚不清楚”黑客在攻击过程中获取了哪些个人信息（如果有的话）。（截至周六早间，发给 Meta 新闻部门询问此事的邮件尚未得到回复。）根据缅因州的记录，黑客攻击始于 4 月 17 日左右，一直持续到本周，Meta 称其已修复了该聊天机器人。据报道，Instagram 本周早些时候开始通过发送密码重置通知来告知受影响用户，尽管当时仍有用户报告称黑客攻击仍在继续。

Meta also confirmed in the notice that it alerted users to secure their accounts, saying it "instructed impacted users to reset their passwords and re-authenticate through secure, verified channels."
Meta 还在通知中确认，已提醒用户保护其账户安全，并表示已“指示受影响用户重置密码，并通过安全、经过验证的渠道重新进行身份验证”。

Meta said that it has disabled the AI chatbot for now and removed the code path that allowed the chatbot to reset user accounts, and said it's also checking other chatbots across its platforms to prevent a repeat incident. It's not yet clear what circumstances led up to the chatbot being abused, but comes soon after Meta laid off thousands of employees while rewarding top executives with stock incentives, as the company continues to double-down on AI.
Meta 表示，目前已禁用该 AI 聊天机器人，并删除了允许其重置用户账户的代码路径。公司还表示正在检查其平台上的其他聊天机器人，以防止类似事件再次发生。目前尚不清楚导致聊天机器人被滥用的具体情况，但此事发生在该公司继续加码 AI 投入，同时裁员数千人并向高管发放股票激励之后不久。
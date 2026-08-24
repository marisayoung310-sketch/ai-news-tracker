---
title: "Oracle warns of security bug that hackers abused to breach 100+ companies"
originalUrl: "https://techcrunch.com/2026/06/11/oracle-warns-of-security-bug-that-hackers-abused-to-breach-100-companies/"
date: "2026-06-11T23:02:03.920Z"
---

# Oracle warns of security bug that hackers abused to breach 100+ companies
# 甲骨文警告：黑客利用安全漏洞入侵超过 100 家公司

Oracle warned its corporate customers that there is a critical-rated vulnerability in its PeopleSoft software, which is used by large companies to manage payroll and human resources, a day after a cybercrime group took credit for abusing the flaw as part of a mass-hacking campaign.

甲骨文公司（Oracle）向其企业客户发出警告，称其 PeopleSoft 软件存在一个严重等级的漏洞。该软件被大型企业广泛用于管理薪资和人力资源。就在警告发出前一天，一个网络犯罪团伙声称利用该漏洞发动了一场大规模黑客攻击。

The company published the security advisory on Thursday after the hacking group ShinyHunters claimed to have breached more than 100 organizations that use PeopleSoft servers. Mandiant, the Google-owned security unit that investigates cyberattacks, warned in a blog post that the new Oracle flaw is the same bug that the ShinyHunters group is abusing in its hacking campaign targeting PeopleSoft customers.

在黑客组织 ShinyHunters 声称已入侵超过 100 家使用 PeopleSoft 服务器的机构后，甲骨文于周四发布了安全公告。谷歌旗下的安全部门 Mandiant 在一篇博客文章中警告称，甲骨文此次披露的新漏洞，正是 ShinyHunters 组织在针对 PeopleSoft 客户的黑客行动中所利用的同一个漏洞。

Oracle, which has not released a patch for the vulnerability at the time of writing, said in the advisory that the bug can be exploited over the internet without needing any authentication, such as a password. The tech giant recommended that customers who use PeopleSoft software apply its mitigations to prevent exploitation.

截至本文撰写时，甲骨文尚未发布针对该漏洞的补丁。该公司在公告中表示，该漏洞可以在无需任何身份验证（如密码）的情况下通过互联网被利用。这家科技巨头建议使用 PeopleSoft 软件的客户采取其提供的缓解措施，以防止遭受攻击。

On Wednesday, a ShinyHunters member told TechCrunch that the gang compromised the companies by abusing an unpatched flaw in PeopleSoft servers. The bug is known as a zero-day because the company affected, in this case Oracle, had no time to fix it before it was discovered and exploited.

周三，一名 ShinyHunters 成员告诉 TechCrunch，该团伙通过利用 PeopleSoft 服务器中一个未修补的漏洞入侵了这些公司。该漏洞被称为“零日漏洞”，因为受影响的公司（在本例中为甲骨文）在漏洞被发现并利用之前，根本没有时间进行修复。

Mandiant confirmed that it has also notified more than “100 global organizations,” most of them in the United States, in an effort to restrict access to their potentially vulnerable systems. The cybersecurity group said that about two-thirds of these organizations are in higher education, which aligns with what ShinyHunters previously claimed.

Mandiant 证实，他们也已通知了超过“100 家全球机构”（其中大多数位于美国），旨在限制对这些潜在易受攻击系统的访问。该网络安全团队表示，这些机构中约有三分之二属于高等教育领域，这与 ShinyHunters 此前的说法相吻合。

“While several organizations successfully blocked the activity or remediated the vulnerabilities, others experienced compromise, resulting in stolen data being published on the ShinyHunters [Data Leak Website],” Mandiant wrote. Oracle did not respond to TechCrunch’s request for comment.

Mandiant 写道：“虽然一些机构成功阻止了攻击活动或修复了漏洞，但其他机构仍遭到了入侵，导致被窃取的数据被发布在 ShinyHunters 的[数据泄露网站]上。”甲骨文未回应 TechCrunch 的置评请求。

The ShinyHunters member told TechCrunch this week that some of the hacked organizations are universities and colleges. The hacker shared a message they said was sent to one of the victim schools, in which the hackers claimed to have stolen “hundreds of thousands of student records containing full name, home address, phone, email, date of birth, gender, ethnicity, enrollment status, GPA, major, and student ID across all campuses,” among other data.

ShinyHunters 成员本周告诉 TechCrunch，部分被黑的机构是大学和学院。该黑客分享了一条据称发送给其中一所受害学校的信息，黑客在信息中声称窃取了“数十万份学生记录，包含全名、家庭住址、电话、电子邮件、出生日期、性别、种族、入学状态、GPA、专业和各校区的学生 ID”等数据。

PeopleSoft, and its customers, are the latest victims in a long series of hacking campaigns where the ShinyHunters gang targeted organizations that all share the same vulnerable software. In the last year, the group targeted several companies that use Salesforce and Gainsight, as well as software provided by education giant Instructure, and among others.

PeopleSoft 及其客户是 ShinyHunters 团伙一系列黑客行动中的最新受害者，该团伙专门针对使用同一款易受攻击软件的机构进行攻击。在过去一年中，该组织还针对了多家使用 Salesforce 和 Gainsight 的公司，以及教育巨头 Instructure 提供的软件等。

Once the hackers identify vulnerable software and companies that use it, they try to steal corporate or customer data and then threaten to release it unless the victims pay a ransom. Earlier this year, education tech company Instructure said it paid the hackers after they breached the company’s systems twice. As part of the hacking campaign, ShinyHunters defaced the login pages of several schools that use Instructure’s popular school information portal Canvas.

一旦黑客确定了易受攻击的软件及其使用公司，他们就会试图窃取企业或客户数据，并威胁称除非受害者支付赎金，否则将公开这些数据。今年早些时候，教育科技公司 Instructure 表示，在系统两次被入侵后，他们向黑客支付了赎金。作为黑客行动的一部分，ShinyHunters 还篡改了多所使用 Instructure 旗下热门学校信息门户 Canvas 的学校登录页面。
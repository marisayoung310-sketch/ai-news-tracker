---
title: "Trojaned OpenSSH (in 2002)"
originalUrl: "http://miod.online.fr/software/openbsd/stories/trojan.html"
date: "2026-06-10T23:07:44.268Z"
---

# Trojaned OpenSSH (in 2002)
# 2002 年 OpenSSH 被植入木马事件

This is a story I had been considering writing for a long time, as many wrong or stupid things have been said or written at the time it happened. Being on a quite sensitive subject, I have however opted to redact a few things, especially the identity of two OpenBSD developers, as well as some IP addresses and other minor details which could help identify them. They will be referred to as dev1 and dev2 in this story. It does not matter who they are, and they really are trustworthy.

这是一个我考虑了很久才写下的故事，因为在事件发生时，外界流传着许多错误或愚蠢的说法。由于这是一个相当敏感的话题，我选择对部分内容进行删减，特别是两位 OpenBSD 开发者的身份，以及一些可能暴露他们身份的 IP 地址和其他细节。在本文中，他们将被统称为 dev1 和 dev2。他们是谁并不重要，他们确实是值得信赖的。

The month of august 2002 did not start well for OpenBSD. The source archives (tarballs) of OpenSSH had been replaced with trojaned versions, without anyone at OpenBSD noticing. Other people started to notice this, and tried to reach us; at some point, Alexander Guy was notified on IRC. It was shortly after 8am here in western Europe on august 1st, barely after midnight in Calgary, when he reported the problem on the OpenBSD developers' chat.

2002 年 8 月对 OpenBSD 来说开局不利。OpenSSH 的源代码压缩包（tarballs）被替换成了植入木马的版本，而 OpenBSD 内部竟无人察觉。随后，外界人士发现了异常并试图联系我们；最终，Alexander Guy 在 IRC 上收到了通知。那是 8 月 1 日西欧时间上午 8 点刚过，卡尔加里时间刚过午夜，他在 OpenBSD 开发者聊天室中报告了这一问题。

*(IRC log omitted for brevity)*
*(此处省略 IRC 日志)*

I had to leave to attend a funeral on that morning and could not do anything more. Meanwhile, Theo de Raadt and Peter Valchev disconnected all OpenBSD systems from the network and started to inspect them, looking for tampering and suspicious activity. A bit before 6am in Calgary, de Raadt put some systems back online and asked everyone to change passwords and ssh keys.

那天早上我必须去参加一场葬礼，无法再做更多处理。与此同时，Theo de Raadt 和 Peter Valchev 断开了所有 OpenBSD 系统的网络连接，开始检查系统，寻找篡改痕迹和可疑活动。卡尔加里时间凌晨 6 点前，de Raadt 将部分系统重新上线，并要求所有人更改密码和 SSH 密钥。

*(IRC log omitted for brevity)*
*(此处省略 IRC 日志)*

Unfortunately, it was soon noticed that my idea of doing chmod 000 on the files in order for them to no longer get fetchable by the ftp mirrors would not cause the files to disappear from the ftp mirrors. Around 6:30am Calgary time, 2:30pm western Europe time:

不幸的是，我们很快发现，我试图通过将文件权限修改为 `chmod 000` 来阻止 FTP 镜像抓取文件的想法，并不能让这些文件从 FTP 镜像中消失。卡尔加里时间凌晨 6:30，西欧时间下午 2:30：

*(IRC log omitted for brevity)*
*(此处省略 IRC 日志)*

(I have never been scolded for this. But should this happen a second time, I would create a new directory, move the trojaned files to the directory, and chmod 000 these files and the directory, to cause the mirrors to delete the files rather than skip them.) Lead OpenSSH developer Markus Friedl was informed of the situation shortly after.

（我从未因此受到责备。但如果这种情况再次发生，我会创建一个新目录，将木马文件移入其中，并对这些文件和目录执行 `chmod 000`，这样镜像服务器就会删除这些文件，而不是仅仅跳过它们。）OpenSSH 首席开发者 Markus Friedl 随后不久便获悉了此事。

*(IRC log omitted for brevity)*
*(此处省略 IRC 日志)*
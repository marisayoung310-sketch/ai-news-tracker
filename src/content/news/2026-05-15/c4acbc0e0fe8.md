---
title: "Zero-day exploit completely defeats default Windows 11 BitLocker protections"
originalUrl: "https://arstechnica.com/security/2026/05/zero-day-exploit-completely-defeats-default-windows-11-bitlocker-protections/"
date: "2026-05-14T22:41:47.905Z"
---

# Zero-day exploit completely defeats default Windows 11 BitLocker protections
# 零日漏洞彻底击破 Windows 11 默认 BitLocker 防护

A zero-day exploit circulating online allows people with physical access to a Windows 11 system to bypass default BitLocker protections and gain complete access to an encrypted drive within seconds.
一个正在网络上传播的零日漏洞允许能够物理接触 Windows 11 系统的人员绕过默认的 BitLocker 防护，并在几秒钟内完全访问加密驱动器。

The exploit, named YellowKey, was published earlier this week by a researcher who goes by the alias Nightmare-Eclipse. It reliably bypasses default Windows 11 deployments of BitLocker, the full-volume encryption protection Microsoft provides to make disk contents off-limits to anyone without the decryption key, which is stored in a secured piece of hardware known as a trusted platform module (TPM). BitLocker is a mandatory protection for many organizations, including those that contract with governments.
该漏洞被命名为“YellowKey”，由一位化名为 Nightmare-Eclipse 的研究人员于本周早些时候发布。它能可靠地绕过 Windows 11 默认部署的 BitLocker。BitLocker 是微软提供的一种全卷加密保护措施，旨在防止未经授权者访问磁盘内容，其解密密钥存储在名为可信平台模块（TPM）的安全硬件中。对于许多组织（包括与政府签约的机构）而言，BitLocker 是一项强制性的保护措施。

### When one disk volume manipulates another
### 当一个磁盘卷操纵另一个磁盘卷时

The core of the YellowKey exploit is a custom-made FsTx folder. Online documentation of this folder is hard to find. As explained later, the directory associated with the file fstx.dll appears to involve what Microsoft calls the transactional NTFS, which allows developers to have “transactional atomicity” for file operations in transactions with a single file, multiple files, or ones that span multiple sources.
YellowKey 漏洞的核心是一个定制的 FsTx 文件夹。关于该文件夹的在线文档很难找到。正如后文所述，与 fstx.dll 文件关联的目录似乎涉及微软所谓的“事务性 NTFS”（Transactional NTFS），它允许开发人员在涉及单个文件、多个文件或跨多个源的事务中，实现文件操作的“事务原子性”。

The steps for carrying out the bypass are simple:
执行此绕过操作的步骤很简单：

1. Copy the custom FsTx folder from the Nightmare-Eclipse exploit page to an NTFS- or FAT-formatted USB drive
2. Connect the USB drive to the BitLocker-protected device
3. Boot up the device and immediately press and hold down the [Ctrl] key
4. Enter Windows recovery
1. 将 Nightmare-Eclipse 漏洞页面上的自定义 FsTx 文件夹复制到 NTFS 或 FAT 格式的 USB 驱动器中。
2. 将该 USB 驱动器连接到受 BitLocker 保护的设备。
3. 启动设备并立即按住 [Ctrl] 键。
4. 进入 Windows 恢复模式。

There are at least two ways to accomplish the third step. One way is to boot into Windows, hold down the [Shift] key, click on the power icon, and click restart. Another is to power on the device and restart it as soon as Windows starts booting. In either case, a command (CMD.EXE) prompt appears. The prompt has full access to the entire drive contents, allowing an attacker to copy, modify, or delete them.
完成第三步至少有两种方法。一种是进入 Windows 系统，按住 [Shift] 键，点击电源图标并选择重启。另一种是在设备开机后，一旦 Windows 开始启动就立即重启。无论哪种方式，都会出现命令提示符（CMD.EXE）。该提示符拥有对整个驱动器内容的完全访问权限，允许攻击者进行复制、修改或删除操作。

In a normal Windows Recovery flow, the attacker would need to enter a BitLocker recovery key. Somehow, the YellowKey exploit bypasses this safeguard. Multiple researchers, including Kevin Beaumont and Will Dormann, have confirmed the exploit works as described here.
在正常的 Windows 恢复流程中，攻击者需要输入 BitLocker 恢复密钥。而 YellowKey 漏洞以某种方式绕过了这一安全防线。包括 Kevin Beaumont 和 Will Dormann 在内的多位研究人员已证实该漏洞确实如文中所述有效。

It’s unclear what in the custom FsTx folder causes the bypass. Dormann said that it appears to be related to Transactional NTFS, which itself uses command-log file system under the hood. Dormann further noted that by looking at the Windows fstx.dll, one will see code that explicitly looks for \System Volume Information\FsTx in the FsTxFindSessions() function.
目前尚不清楚自定义 FsTx 文件夹中的什么内容导致了绕过。Dormann 表示，这似乎与事务性 NTFS 有关，而该技术底层使用了命令日志文件系统。Dormann 进一步指出，查看 Windows 的 fstx.dll 可以发现，其 FsTxFindSessions() 函数中存在明确查找 \System Volume Information\FsTx 的代码。

The contents of this FsTx directory used in the YellowKey exploit reveal no strings related to RecoverySimulation.ini. It does, however, show the files and paths \??\C:\Windows\win.ini and \??\X:\Windows\System32\winpeshl.ini, “where X:\Windows\System32\winpeshl.ini is what controls what WinRE [Windows Recovery] does when it fires up.”
YellowKey 漏洞所使用的 FsTx 目录内容中并未发现与 RecoverySimulation.ini 相关的字符串。然而，它确实显示了 \??\C:\Windows\win.ini 和 \??\X:\Windows\System32\winpeshl.ini 等文件路径，“其中 X:\Windows\System32\winpeshl.ini 控制着 WinRE（Windows 恢复环境）启动时的行为。”

Dormann, who is a senior principal vulnerability analyst at Tharros Labs, continued: But what’s intriguing to me is: Why can the presence a \System Volume Information\FsTx directory on one volume affect the contents of ANOTHER VOLUME when it’s replayed? 🤔
Tharros Labs 的高级首席漏洞分析师 Dormann 继续说道：“但让我感到好奇的是：为什么在一个卷上存在的 \System Volume Information\FsTx 目录，在重放时会影响另一个卷的内容？🤔”

In a normal WinRE session, you have a X:\Windows\System32 directory that has a winpeshl.ini file in it:
[LaunchApp]
AppPath=X:\sources\recovery\recenv.exe
在正常的 WinRE 会话中，X:\Windows\System32 目录下会有一个 winpeshl.ini 文件：
[LaunchApp]
AppPath=X:\sources\recovery\recenv.exe

However, with the YellowKey exploit, it looks like Transactional NTFS bits on a USB Drive are able to delete the winpeshl.ini file on ANOTHER DRIVE (X:). And we get a cmd.exe prompt, with bitlocker unlocked instead of the expected Windows Recovery environment.
然而，通过 YellowKey 漏洞，USB 驱动器上的事务性 NTFS 位似乎能够删除另一个驱动器（X:）上的 winpeshl.ini 文件。于是我们得到了一个 cmd.exe 提示符，且 BitLocker 已被解锁，而不是预期的 Windows 恢复环境。

While the TPM-only Bitlocker bypass is indeed interesting, I think the buried lede here is that a \System Volume Information\FsTx directory on one volume has the ability to modify the contents of another volume when it is replayed. To me, this in and of itself sounds like a vulnerability.
“虽然仅针对 TPM 的 BitLocker 绕过确实很有趣，但我认为这里被掩盖的重点是：一个卷上的 \System Volume Information\FsTx 目录在重放时竟然有能力修改另一个卷的内容。对我来说，这本身听起来就是一个漏洞。”

A Microsoft representative declined to answer questions sent by email about the reported vulnerability other than to say the company is investigating.
微软的一位代表拒绝回答通过电子邮件发送的关于该漏洞的问题，仅表示公司正在调查中。

People should know that at the moment, BitLocker on Windows 11 isn’t providing the protection it’s supposed to. That means stolen or lost devices can still be accessed even when BitLocker is enabled. This bypass works only in the Windows 11 default mode of BitLocker, which stores decryption keys in the TPM. This TPM-only configuration has long been considered insufficient by many security professionals, who instead advise that a PIN should be required before the key can be retrieved from the TPM.
人们应该知道，目前 Windows 11 上的 BitLocker 并未提供其应有的保护。这意味着即使启用了 BitLocker，被盗或丢失的设备仍然可能被访问。这种绕过方式仅适用于 Windows 11 默认的 BitLocker 模式（即密钥存储在 TPM 中）。许多安全专家长期以来一直认为这种仅依赖 TPM 的配置是不够的，他们建议在从 TPM 获取密钥之前应要求输入 PIN 码。

Beaumont advised people to enable a BIOS password lock to prevent YellowKey attacks. While using BIOS password locks is a good practice, it’s unclear how they provide any protection against this particular exploit.
Beaumont 建议人们启用 BIOS 密码锁以防止 YellowKey 攻击。虽然使用 BIOS 密码锁是一种良好的做法，但目前尚不清楚它如何能针对这一特定漏洞提供保护。
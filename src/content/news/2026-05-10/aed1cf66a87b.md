---
title: "Laptops all have built-in security tokens these days"
originalUrl: "https://ahelwer.ca/post/2026-05-08-builtin-u2f/"
date: "2026-05-09T22:19:17.927Z"
---

# Laptops all have built-in security tokens these days
# 如今的笔记本电脑都内置了安全令牌

I’ve been a fan of security tokens for a decade now and have accrued quite a collection. This redundancy isn’t a bad thing, as security tokens are easily misplaced and the only way to recover from a lost token is using a second token that is also registered with the service you’re trying to access.
十年来，我一直是安全令牌的忠实拥趸，并积累了相当多的收藏。这种冗余并非坏事，因为安全令牌很容易丢失，而从丢失中恢复的唯一方法是使用另一个同样在目标服务中注册过的令牌。

I use security tokens whenever I can! SSH authentication, universal two-factor (U2F) authentication, passwordless local login, sudo command elevation, and git commit signing are all things I use security tokens for every day. When I take my laptop traveling, there also travels a yubikey.
只要有机会，我就会使用安全令牌！SSH 身份验证、通用双因素 (U2F) 认证、无密码本地登录、sudo 命令提权以及 Git 提交签名，这些都是我每天使用安全令牌的场景。当我带着笔记本电脑旅行时，Yubikey 也会随身携带。

However, it took me an oddly long time to realize that I’m a relic of a bygone era. Laptops and smartphones all have built-in security tokens these days! I’ve been carrying around yubikeys when an even better one is built right into my macbook. This post is about how I use security tokens, and how I configured my laptop’s secure element to replace my yubikey collection.
然而，我花了出奇长的时间才意识到，自己已经成了旧时代的遗物。如今的笔记本电脑和智能手机都内置了安全令牌！我一直随身带着 Yubikey，却没发现我的 MacBook 里其实内置了更好的方案。这篇文章将介绍我如何使用安全令牌，以及如何配置笔记本电脑的安全芯片（Secure Element）来取代我的 Yubikey 收藏。

### The security token promise
### 安全令牌的承诺

Security tokens like yubikeys (or SoloKeys and Nitrokeys if you want FOSS firmware) have a private/public keypair baked into them. Their promise is that while the public key is easily retrieved, the private key can never leave the device.
像 Yubikey（如果你想要开源固件，也可以选择 SoloKeys 或 Nitrokeys）这样的安全令牌内置了一对公私钥。它们的承诺是：虽然公钥可以轻松获取，但私钥永远不会离开设备。

The only thing you can do is send packets of data to the device to be signed in-place by the private key, and this operation is gated behind some physical user interaction like pressing a touch-sensitive button when it flashes.
你唯一能做的就是将数据包发送到设备，由私钥在本地进行签名。此操作必须通过物理交互来触发，例如在按钮闪烁时按下触摸感应键。

Fancier security tokens add a biometric flourish with a built-in fingerprint reader, but the real value is stopping attackers from making progress with purely remote access. If an attacker remotely accesses your computer, they still can’t get your security token to sign random things without you doing something in the real world! Much better than your full SSH private/public keypair sitting in some files in the ~/.ssh directory.
更高级的安全令牌增加了指纹识别功能，但其真正的价值在于阻止攻击者通过纯远程访问进行破坏。如果攻击者远程访问了你的电脑，在没有你物理参与的情况下，他们无法让你的安全令牌对任意内容进行签名！这比将完整的 SSH 公私钥对存放在 `~/.ssh` 目录下的文件中要安全得多。

There are drawbacks to this. Users can become conditioned to press the security token whenever it flashes, which could easily be a malicious request. If you’re in the middle of repeatedly pressing the security token for a series of signing operations, do you really notice when it flashes an extra time?
当然，这也有缺点。用户可能会养成“只要闪烁就按下”的习惯，而这很容易被恶意请求利用。如果你正在连续进行一系列签名操作，你真的能注意到它是否多闪了一次吗？

So companies like Apple and Microsoft have their own authenticator apps running on your smartphone that attach every access request to a random numeric code that has to be typed in. However, this is a fairly tedious and removes a lot of the usability benefit of security tokens vs. time-based one-time passwords (TOTP) as implemented by the authy or google authenticator apps.
因此，苹果和微软等公司推出了运行在智能手机上的身份验证器应用，将每次访问请求与必须手动输入的随机数字代码绑定。然而，这相当繁琐，且削弱了安全令牌相比于基于时间的一次性密码（TOTP，如 Authy 或 Google Authenticator）在易用性上的优势。

Another drawback of security tokens is that if you lose one, its private key is gone for good. There’s no way to back it up! So when you buy a security token, you really commit to buying at least two security tokens unless you want to risk locking yourself out of your various accounts.
安全令牌的另一个缺点是，一旦丢失，其中的私钥就永远找不回来了。它无法备份！因此，当你购买安全令牌时，除非你想冒着被锁在账户之外的风险，否则你必须至少购买两个。

There is one alternative: maybe the only thing the cryptocurrency industry has contributed to the wider world is a moderately user-friendly method of backing up & restoring private keys by converting them into human-readable word list (see BIP 39) that can be written down.
有一个替代方案：加密货币行业对世界做出的唯一贡献，或许就是提供了一种相对用户友好的私钥备份与恢复方法——将其转换为人类可读的单词列表（参见 BIP 39），并将其抄写下来。

Of course this has produced some very innovative phishing attacks to convince users to write down that list of words in the wrong place, but that’s the game you play if you allow private keys to leave a secure enclave. Still, if you’re really paranoid about losing all of your security tokens you can use BIP 39 word lists as a method of last resort for regaining access to your systems.
当然，这也催生了一些极具创意的钓鱼攻击，诱导用户将这些单词写在不该写的地方。但如果你允许私钥离开安全区域，这就是你必须承担的风险。不过，如果你非常担心丢失所有安全令牌，可以将 BIP 39 单词列表作为恢复系统访问权限的最后手段。

### How I use security tokens
### 我是如何使用安全令牌的

I started off using my security tokens for SSH. If you just run `ssh-keygen`, it’ll output a pair of files - one of which includes your full private key! But it’s possible to have your private key live on a security token.
我最初是将安全令牌用于 SSH。如果你直接运行 `ssh-keygen`，它会输出一对文件，其中一个包含完整的私钥！但其实可以让私钥驻留在安全令牌中。

I accomplished this by following the FIDO/U2F instructions here, which boil down to installing `libfido2` then running `ssh-keygen -t ed25519-sk` while your security token is plugged in. This again generates a pair of files, but this time the “private key” file is only a handle to the private key that actually lives on the security token.
我按照此处的 FIDO/U2F 指南完成了配置，核心步骤是安装 `libfido2`，然后在插入安全令牌的情况下运行 `ssh-keygen -t ed25519-sk`。这同样会生成一对文件，但这次的“私钥”文件仅仅是一个指向实际存储在安全令牌中私钥的句柄。

Thus I feel confident pasting that private key file here for all to see!
因此，我可以放心地把那个私钥文件贴在这里供大家查看！

*(SSH Key block omitted for brevity)*

Running `ssh-keygen -t ed25519-sk` again with the same security token should generate the same private/public key files on any computer you have it plugged in to, so your SSH access capabilities travel with the security token instead being tied to a specific file on a specific computer.
在任何电脑上插入同一个安全令牌并再次运行 `ssh-keygen -t ed25519-sk`，都会生成相同的公私钥文件。这样，你的 SSH 访问权限就随令牌而行，而不是绑定在某台电脑的特定文件上。

Probably 90% of the time I press my security token it’s for git. Every git forge I know of implements SSH authentication for push & pull operations, and you can upload the `id_ed25519_sk.pub` file generated above so it accepts your security token keypair.
我按下安全令牌 90% 的时间都是为了 Git。我所知的每一个 Git 代码托管平台都支持通过 SSH 进行推送和拉取操作，你可以上传上面生成的 `id_ed25519_sk.pub` 文件，从而让平台接受你的安全令牌密钥对。

Git also supports SSH keys for commit signing; you can read how to set this up here and then run `git config --global commit.gpgsign true` to automatically sign every commit. You’ll also need to upload your public key again so your git forge recognizes your commits as being signed by you (this is usually a separate field from the SSH authentication one).
Git 也支持使用 SSH 密钥进行提交签名；你可以在此处阅读设置方法，然后运行 `git config --global commit.gpgsign true` 来自动签署每次提交。你还需要再次上传公钥，以便 Git 平台识别出这些提交是由你签署的（这通常与 SSH 身份验证字段是分开的）。

Note that using security tokens to sign commits can be a bit annoying. While rebasing a long series of commits, you’ll have to re-sign every single one! This is what made me stop using the fingerprint reader yubikey, because the fingerprint read failure rate was just way too high to successfully sign dozens of commits in a row.
请注意，使用安全令牌签署提交可能会有些烦人。在变基（rebase）一长串提交时，你必须为每一个提交重新签名！这就是我停止使用带指纹识别功能的 Yubikey 的原因，因为指纹识别的失败率太高，无法连续成功签署几十个提交。
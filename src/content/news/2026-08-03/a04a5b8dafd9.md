---
title: "GitLab 2FA Lockout: How My Local SSH Key Saved the Day"
originalUrl: "https://dev.to/letstalkoss/gitlab-2fa-lockout-how-my-local-ssh-key-saved-the-day-5g4d"
date: "2026-08-02T22:18:15.865Z"
---

# GitLab 2FA Lockout: How My Local SSH Key Saved the Day
# GitLab 双重身份验证锁定：我的本地 SSH 密钥如何化解危机

I have two-factor authentication (2FA) enabled on most of my accounts using an authenticator app. Recently, while installing the app on another Android device, I tried to change the backup password, but it didn't work. As a result, I lost access, had to disable 2FA, and re-enable it using a different authenticator app.

我在大多数账户上都启用了使用身份验证器应用（Authenticator App）的双重身份验证（2FA）。最近，在另一台安卓设备上安装该应用时，我尝试更改备份密码，但操作失败了。结果我失去了访问权限，不得不禁用 2FA，并改用另一个身份验证器应用重新启用它。

Setting up 2FA again wasn't a problem because I was still logged in to most of my accounts. However, I didn't have my GitLab recovery codes. GitLab offers only two ways to regain access: receiving a six-digit verification code via email or generating new recovery codes using an SSH key associated with the account.

重新设置 2FA 并不困难，因为我当时仍处于大多数账户的登录状态。然而，我没有保存 GitLab 的恢复代码。GitLab 只提供两种恢复访问权限的方式：通过电子邮件接收六位验证码，或者使用与账户关联的 SSH 密钥生成新的恢复代码。

Receiving a verification code via email is the easiest way to recover your account, but having an SSH key can be incredibly useful when receiving an email verification code isn't an option. Whenever I configure GitLab in my local environment, I create an SSH key for authentication and commit signing, as I always sign commits in my repositories. I described this process in a previous article.

通过电子邮件接收验证码是恢复账户最简单的方法，但当无法通过邮件接收验证码时，拥有 SSH 密钥就显得非常有用了。每当我在本地环境配置 GitLab 时，我都会创建一个用于身份验证和提交签名的 SSH 密钥，因为我总是会对仓库中的提交进行签名。我曾在之前的文章中介绍过这个过程。

### Get New Recovery Codes
### 获取新的恢复代码

Check the SSH keys on your machine: `ls -la ~/.ssh`
Look for files named like `id_rsa`, or `id_ed25519`.

检查你机器上的 SSH 密钥：`ls -la ~/.ssh`
查找名为 `id_rsa` 或 `id_ed25519` 之类的文件。

Run the following command to get new recovery codes:
`ssh -i ~/.ssh/id_ed25519 git@gitlab.com 2fa_recovery_codes`
Replace `id_ed25519` with the name of your SSH key file.

运行以下命令以获取新的恢复代码：
`ssh -i ~/.ssh/id_ed25519 git@gitlab.com 2fa_recovery_codes`
请将 `id_ed25519` 替换为你自己的 SSH 密钥文件名。

* Copy one of the recovery codes
* Go to the sign in page
* Enter your username and password
* Provide the recovery code when prompted

* 复制其中一个恢复代码
* 前往登录页面
* 输入你的用户名和密码
* 在提示时输入恢复代码

Now you're signed in! Disable 2FA and re-enable it—and don't forget to save your recovery codes somewhere safe this time.

现在你已经登录了！禁用 2FA 并重新启用它——这次别忘了把恢复代码保存在安全的地方。
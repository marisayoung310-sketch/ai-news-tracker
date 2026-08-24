---
title: "restic / restic"
originalUrl: "https://github.com/restic/restic"
date: "2026-06-11T23:05:38.100Z"
---

# restic / restic

### Introduction
restic is a backup program that is fast, efficient and secure. It supports the three major operating systems (Linux, macOS, Windows) and a few smaller ones (FreeBSD, OpenBSD). For detailed usage and installation instructions check out the documentation. You can ask questions in our Discourse forum.

### 简介
restic 是一款快速、高效且安全的备份程序。它支持三大主流操作系统（Linux、macOS、Windows）以及一些较小的系统（FreeBSD、OpenBSD）。有关详细的使用和安装说明，请查看文档。您可以在我们的 Discourse 论坛中提问。

---

### Quick start
Once you've installed restic, start off with creating a repository for your backups:
$ restic init --repo /tmp/backup
enter password for new backend:
enter password again:
created restic backend 085b3c76b9 at /tmp/backup
Please note that knowledge of your password is required to access the repository. Losing your password means that your data is irrecoverably lost.

### 快速入门
安装 restic 后，首先为您的备份创建一个存储库：
$ restic init --repo /tmp/backup
enter password for new backend:
enter password again:
created restic backend 085b3c76b9 at /tmp/backup
请注意，访问存储库必须使用您的密码。一旦丢失密码，您的数据将无法找回。

---

and add some data:
$ restic --repo /tmp/backup backup ~/work
enter password for repository:
scan [/home/user/work]
scanned 764 directories, 1816 files in 0:00
[0:29] 100.00% 54.732 MiB/s 1.582 GiB / 1.582 GiB 2580 / 2580 items 0 errors
ETA 0:00 duration: 0:29, 54.47MiB/s
snapshot 40dc1520 saved

Next you can either use restic restore to restore files or use restic mount to mount the repository via fuse and browse the files from previous snapshots. For more options check out the online documentation.

添加一些数据：
$ restic --repo /tmp/backup backup ~/work
enter password for repository:
scan [/home/user/work]
scanned 764 directories, 1816 files in 0:00
[0:29] 100.00% 54.732 MiB/s 1.582 GiB / 1.582 GiB 2580 / 2580 items 0 errors
ETA 0:00 duration: 0:29, 54.47MiB/s
snapshot 40dc1520 saved

接下来，您可以使用 `restic restore` 恢复文件，或者使用 `restic mount` 通过 FUSE 挂载存储库，并浏览之前快照中的文件。更多选项请查看在线文档。

---

### Backends
Saving a backup on the same machine is nice but not a real backup strategy. Therefore, restic supports the following backends for storing backups natively:
* Local directory
* sftp server (via SSH)
* HTTP REST server (protocol, rest-server)
* Amazon S3 (either from Amazon or using the Minio server)
* OpenStack Swift
* BackBlaze B2
* Microsoft Azure Blob Storage
* Google Cloud Storage
* And many other services via the rclone Backend

### 后端
将备份保存在同一台机器上虽然不错，但并非真正的备份策略。因此，restic 原生支持以下后端来存储备份：
* 本地目录
* sftp 服务器（通过 SSH）
* HTTP REST 服务器（协议，rest-server）
* Amazon S3（来自 Amazon 或使用 Minio 服务器）
* OpenStack Swift
* BackBlaze B2
* Microsoft Azure Blob Storage
* Google Cloud Storage
* 以及通过 rclone 后端支持的其他许多服务

---

### Design Principles
Restic is a program that does backups right and was designed with the following principles in mind:
* **Easy**: Doing backups should be a frictionless process, otherwise you might be tempted to skip it. Restic should be easy to configure and use, so that, in the event of a data loss, you can just restore it. Likewise, restoring data should not be complicated.
* **Fast**: Backing up your data with restic should only be limited by your network or hard disk bandwidth so that you can backup your files every day. Nobody does backups if it takes too much time. Restoring backups should only transfer data that is needed for the files that are to be restored, so that this process is also fast.
* **Verifiable**: Much more important than backup is restore, so restic enables you to easily verify that all data can be restored.
* **Secure**: Restic uses cryptography to guarantee confidentiality and integrity of your data. The location the backup data is stored is assumed not to be a trusted environment (e.g. a shared space where others like system administrators are able to access your backups). Restic is built to secure your data against such attackers.
* **Efficient**: With the growth of data, additional snapshots should only take the storage of the actual increment. Even more, duplicate data should be de-duplicated before it is actually written to the storage back end to save precious backup space.

### 设计原则
Restic 是一款旨在正确执行备份的程序，其设计遵循以下原则：
* **简单**：备份过程应顺畅无阻，否则您可能会想跳过它。Restic 应易于配置和使用，以便在数据丢失时能够轻松恢复。同样，恢复数据也不应复杂。
* **快速**：使用 restic 备份数据时，速度仅受限于您的网络或硬盘带宽，从而确保您可以每天备份文件。如果备份耗时太长，没人会坚持做。恢复备份时，仅传输恢复所需的文件数据，从而确保该过程同样快速。
* **可验证**：恢复比备份更重要，因此 restic 使您能够轻松验证所有数据是否均可恢复。
* **安全**：Restic 使用加密技术来保证数据的机密性和完整性。备份数据的存储位置被假定为非受信任环境（例如，系统管理员等他人可以访问您备份的共享空间）。Restic 的构建旨在保护您的数据免受此类攻击者的侵害。
* **高效**：随着数据增长，额外的快照仅占用实际增量的存储空间。此外，重复数据在写入存储后端之前会被去重，以节省宝贵的备份空间。

---

### Reproducible Builds
The binaries released with each restic version starting at 0.6.1 are reproducible, which means that you can reproduce a byte identical version from the source code for that release. Instructions on how to do that are contained in the builder repository.

### 可复现构建
从 0.6.1 版本开始，每个 restic 版本发布的二进制文件都是可复现的，这意味着您可以从该版本的源代码中复现出字节完全相同的版本。相关操作说明包含在 builder 存储库中。

---

### News
You can follow the restic project on Mastodon @resticbackup or subscribe to the project blog.

### 新闻
您可以在 Mastodon 上关注 restic 项目 @resticbackup，或订阅项目博客。

---

### License
Restic is licensed under BSD 2-Clause License. You can find the complete text in LICENSE.

### 许可证
Restic 采用 BSD 2-Clause 许可证。您可以在 LICENSE 文件中找到完整文本。

---

### Sponsorship
Backend integration tests for Google Cloud Storage and Microsoft Azure Blob Storage are sponsored by AppsCode!

### 赞助
Google Cloud Storage 和 Microsoft Azure Blob Storage 的后端集成测试由 AppsCode 赞助！
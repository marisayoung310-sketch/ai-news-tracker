---
title: "nvm-sh / nvm"
originalUrl: "https://github.com/nvm-sh/nvm"
date: "2026-08-11T22:19:05.144Z"
---

# nvm-sh / nvm

### Intro
nvm allows you to quickly install and use different versions of node via the command line.
nvm 允许你通过命令行快速安装和使用不同版本的 node。

Example:
示例：
```bash
$ nvm install 24
Now using node v24.14.0 (npm v11.9.0)
$ node -v
v24.14.0
$ nvm use 22
Now using node v22.22.1 (npm v10.9.4)
$ node -v
v22.22.1
$ nvm use 20
Now using node v20.20.1 (npm v10.8.2)
$ node -v
v20.20.1
```
Simple as that!
就是这么简单！

### About
nvm is a version manager for node.js, designed to be installed per-user, and invoked per-shell. nvm works on any POSIX-compliant shell (sh, dash, ksh, zsh, bash), in particular on these platforms: unix, macOS, and Windows WSL.
nvm 是一个 node.js 版本管理器，旨在按用户安装并按 shell 调用。nvm 适用于任何符合 POSIX 标准的 shell（sh、dash、ksh、zsh、bash），特别是在以下平台：unix、macOS 和 Windows WSL。

### Installing and Updating
#### Install & Update Script
To install or update nvm, you should run the install script. To do that, you may either download and run the script manually, or use the following cURL or Wget command:
要安装或更新 nvm，你应该运行安装脚本。为此，你可以手动下载并运行该脚本，或者使用以下 cURL 或 Wget 命令：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.6/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.6/install.sh | bash
```

Running either of the above commands downloads a script and runs it. The script clones the nvm repository to `~/.nvm`, and attempts to add the source lines from the snippet below to the correct profile file (`~/.bashrc`, `~/.bash_profile`, `~/.zshrc`, or `~/.profile`). If you find the install script is updating the wrong profile file, set the `$PROFILE` env var to the profile file’s path, and then rerun the installation script.
运行上述任一命令都会下载并执行脚本。该脚本会将 nvm 仓库克隆到 `~/.nvm`，并尝试将下方代码片段中的 source 行添加到正确的配置文件（`~/.bashrc`、`~/.bash_profile`、`~/.zshrc` 或 `~/.profile`）中。如果你发现安装脚本更新了错误的配置文件，请将 `$PROFILE` 环境变量设置为目标配置文件的路径，然后重新运行安装脚本。

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### Installing in Docker
When invoking bash as a non-interactive shell, like in a Docker container, none of the regular profile files are sourced. In order to use nvm, node, and npm like normal, you can instead specify the special `BASH_ENV` variable, which bash sources when invoked non-interactively.
当以非交互式 shell（例如在 Docker 容器中）调用 bash 时，常规的配置文件都不会被加载。为了像往常一样使用 nvm、node 和 npm，你可以指定特殊的 `BASH_ENV` 环境变量，bash 在非交互式调用时会加载该变量。

```dockerfile
# Use bash for the shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Create a script file sourced by both interactive and non-interactive bash shells
ENV BASH_ENV "${HOME}/.bash_env"
RUN touch "${BASH_ENV}"
RUN echo '. "${BASH_ENV}"' >> ~/.bashrc

# Download and install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.6/install.sh | PROFILE="${BASH_ENV}" bash
RUN echo node > .nvmrc
RUN nvm install
```

### Troubleshooting on Linux
On Linux, after running the install script, if you get `nvm: command not found` or see no feedback from your terminal after you type `command -v nvm`, simply close your current terminal, open a new terminal, and try verifying again.
在 Linux 上，运行安装脚本后，如果你收到 `nvm: command not found` 错误，或者在输入 `command -v nvm` 后终端没有任何反馈，只需关闭当前终端，打开一个新的终端，然后再次尝试验证即可。
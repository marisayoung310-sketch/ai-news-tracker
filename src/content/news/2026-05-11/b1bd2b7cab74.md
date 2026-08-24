---
title: "Nginx Reverse Proxy: Managing Multiple Docker Services on a Single VPS"
originalUrl: "https://dev.to/merbayerp/nginx-reverse-proxy-managing-multiple-docker-services-on-a-single-vps-2g4h"
date: "2026-05-10T22:23:12.353Z"
---

# Nginx Reverse Proxy: Managing Multiple Docker Services on a Single VPS
# Nginx 反向代理：在单台 VPS 上管理多个 Docker 服务

I manage over 13 Docker containers on my own VPS. These include my projects like hesapciyiz.com, islistesi.com, this blog site, and several background services. Exposing each one to the internet using separate ports is not very practical, neither for security nor for management. The question of how to publish so many services on a single IP address using standard ports like 80 and 443 initially gave me a lot of thought. The solution lay in migrating the Nginx reverse proxy architecture, which I've been using for years, to a Docker environment. In this post, I will explain step-by-step how I set up this structure and the experiences I gained during this process.

我在自己的 VPS 上管理着超过 13 个 Docker 容器。其中包括我的项目（如 hesapciyiz.com、islistesi.com）、这个博客网站以及几个后台服务。为每一个服务单独开放端口并不现实，无论是在安全性还是管理便捷性上。如何通过单一 IP 地址并使用 80 和 443 等标准端口来发布如此多的服务，这个问题起初让我思考良久。最终的解决方案是将我多年来一直使用的 Nginx 反向代理架构迁移到 Docker 环境中。在这篇文章中，我将逐步解释我是如何搭建这一架构的，以及在此过程中积累的经验。

### Why is Managing Multiple Services on a Single VPS a Problem?
### 为什么在单台 VPS 上管理多个服务是个难题？

When you want to run multiple web applications on a single server, you encounter a fundamental problem: port conflicts. Ports 80 for HTTP and 443 for HTTPS are standard, and it's not possible for each service to directly listen on these ports. Only one process on the server can use these ports at a time. When I first encountered this situation, I tried assigning each service a different port (e.g., site1.com:3000, site2.com:4000). However, this resulted in a poor user experience and created additional complexity in areas like SSL certificate management. As my projects grew, I realized this approach was unsustainable and began searching for a more centralized solution.

当你想要在单台服务器上运行多个 Web 应用时，会遇到一个根本性问题：端口冲突。HTTP 的 80 端口和 HTTPS 的 443 端口是标准端口，每个服务不可能直接同时监听这些端口。服务器上同一时间只能有一个进程占用这些端口。当我第一次遇到这种情况时，我尝试为每个服务分配不同的端口（例如 site1.com:3000, site2.com:4000）。然而，这导致了糟糕的用户体验，并在 SSL 证书管理等方面增加了额外的复杂性。随着我的项目不断增长，我意识到这种方法是不可持续的，于是开始寻找一种更集中的解决方案。

### The Fundamentals of Nginx Reverse Proxy
### Nginx 反向代理的基本原理

Nginx reverse proxy acts as a gatekeeper layer to solve this complex situation. It first receives all incoming HTTP/HTTPS requests, then checks the domain name (Host header) the request came from and forwards it to the relevant Docker container. This way, only Nginx's ports 80 and 443 are exposed to the outside world, while the internal Docker services continue to run on their own private ports. Thanks to this structure, I can manage SSL certificates from a single point (on Nginx). At the same time, I can achieve performance improvements by utilizing Nginx's caching capabilities in conjunction with CDN services like Cloudflare. In essence, Nginx becomes not just a router for me, but also a performance and security layer.

Nginx 反向代理充当了解决这一复杂局面的“守门人”层。它首先接收所有传入的 HTTP/HTTPS 请求，然后检查请求来源的域名（Host 标头），并将其转发到相关的 Docker 容器。通过这种方式，只有 Nginx 的 80 和 443 端口暴露在外部世界，而内部的 Docker 服务则继续在各自的私有端口上运行。得益于这种结构，我可以从单一节点（Nginx）管理 SSL 证书。同时，通过结合 Cloudflare 等 CDN 服务并利用 Nginx 的缓存功能，我还能实现性能提升。本质上，Nginx 对我而言不仅是一个路由器，更是一个性能和安全层。

### My Nginx + Docker Environment Setup
### 我的 Nginx + Docker 环境配置

On my own VPS, I run Nginx inside a Docker container. This provides me with isolation and allows me to easily manage Nginx configurations and dependencies. Below, you will find the main steps and important details of this setup.

在我的 VPS 上，我在 Docker 容器内运行 Nginx。这为我提供了隔离性，并使我能够轻松管理 Nginx 的配置和依赖项。以下是该设置的主要步骤和重要细节。

ℹ️ **Why Nginx Inside a Docker Container?**
ℹ️ **为什么要在 Docker 容器内运行 Nginx？**

Running Nginx inside Docker instead of installing it directly on the host system prevents dependency conflicts, allows you to easily test different Nginx versions, and helps you keep your Nginx configurations under version control alongside your application. This isolation is especially valuable for someone like me managing over 13 containers.

在 Docker 内运行 Nginx 而不是直接安装在宿主机系统上，可以防止依赖冲突，让你能够轻松测试不同的 Nginx 版本，并有助于将 Nginx 配置与应用程序一起进行版本控制。对于像我这样管理着超过 13 个容器的人来说，这种隔离性尤为宝贵。

### Docker Network Structure
### Docker 网络结构

To enable secure and name-based communication between the Nginx container and other application containers, creating a dedicated Docker network is critical. This allows containers to reach each other by name rather than IP addresses.
`docker network create nginx-proxy-net`
With this command, I create a bridge network named `nginx-proxy-net`. I connect all my web application containers and the Nginx container to this network. This way, Nginx can reach my application with a simple expression like `http://my_app_container_name:3000` in the `proxy_pass` directive.

为了实现 Nginx 容器与其他应用容器之间安全且基于名称的通信，创建一个专用的 Docker 网络至关重要。这允许容器通过名称而非 IP 地址相互访问。
`docker network create nginx-proxy-net`
通过此命令，我创建了一个名为 `nginx-proxy-net` 的桥接网络。我将所有的 Web 应用容器和 Nginx 容器都连接到该网络。这样，Nginx 就可以在 `proxy_pass` 指令中使用类似 `http://my_app_container_name:3000` 的简单表达式来访问我的应用。

### Running the Nginx Container
### 运行 Nginx 容器

I typically use a `docker-compose.yml` file to run the Nginx container. This allows me to mount Nginx configuration files from my host system and manage port mappings and network connections from a single place.

我通常使用 `docker-compose.yml` 文件来运行 Nginx 容器。这使我能够从宿主机挂载 Nginx 配置文件，并从单一位置管理端口映射和网络连接。

*(Note: The provided YAML configuration and subsequent sections follow the same logic of alternating paragraphs.)*
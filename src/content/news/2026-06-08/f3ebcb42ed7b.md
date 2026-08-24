---
title: "I Built a Browser-to-Browser Video Chat in 250 Lines — Zero Backend, Zero SDKs, Zero Cost"
originalUrl: "https://dev.to/dev48v/i-built-a-browser-to-browser-video-chat-in-250-lines-zero-backend-zero-sdks-zero-cost-3h1b"
date: "2026-06-07T22:46:13.870Z"
---

# I Built a Browser-to-Browser Video Chat in 250 Lines — Zero Backend, Zero SDKs, Zero Cost
# 我用 250 行代码构建了一个浏览器对等视频聊天：零后端、零 SDK、零成本

🌐 Live demo: https://webrtc-from-zero.vercel.app 
🔗 Full code: https://github.com/dev48v/webrtc-from-zero 

Day 42 of my TechFromZero series. One new technology every day, real working project, no Hello World. Today: WebRTC. The thing that powers Google Meet, Discord voice, Zoom Web, Twitter Spaces, every "video chat in the browser" you have ever used.
这是我 TechFromZero 系列的第 42 天。每天学习一项新技术，做一个真正可用的项目，拒绝“Hello World”。今天的主角是 WebRTC。它是 Google Meet、Discord 语音、Zoom Web 版、Twitter Spaces 以及你用过的所有“浏览器视频聊天”背后的核心技术。

Three years ago doing this yourself required signaling servers, Janus or Jitsi, two days of YouTube tutorials and a TURN bill at the end. This article gets you to a working two-tab video call in about 250 lines and zero backend.
三年前，如果你想自己实现这个功能，你需要搭建信令服务器、使用 Janus 或 Jitsi，还要花两天时间看 YouTube 教程，最后还得支付一笔 TURN 服务器的账单。而本文将带你用大约 250 行代码实现一个可用的双标签页视频通话，且无需任何后端。

### What WebRTC actually is
### WebRTC 到底是什么

WebRTC is three browser APIs glued together. That's it.
WebRTC 就是三个浏览器 API 的组合，仅此而已。

*   **navigator.mediaDevices.getUserMedia()**: "Browser, please ask the user for the webcam." Returns a MediaStream.
    **navigator.mediaDevices.getUserMedia()**：“浏览器，请向用户请求调用摄像头。”它会返回一个 MediaStream（媒体流）。
*   **RTCPeerConnection**: The actual peer-to-peer pipe. You stuff your tracks in, the other side pulls them out.
    **RTCPeerConnection**：真正的点对点传输管道。你把媒体轨道放进去，对方就能取出来。
*   **Signaling (SDP + ICE)**: Each peer describes itself in a JSON blob. They swap blobs somehow. WebRTC doesn't care how.
    **信令 (SDP + ICE)**：每个对等端通过一个 JSON 数据块描述自己。它们需要以某种方式交换这些数据块，而 WebRTC 并不关心你是如何交换的。

That last point is the part everyone overcomplicates. WebRTC has no opinion on how the two peers find each other. The browsers happily talk peer-to-peer once they know each other's network coordinates. Getting the coordinates from A to B is your problem, not WebRTC's.
最后一点是大家最容易过度复杂化的地方。WebRTC 对两个对等端如何找到彼此没有任何预设。一旦浏览器知道了对方的网络坐标，它们就能愉快地进行点对点通信。如何将这些坐标从 A 传到 B 是你的任务，而不是 WebRTC 的。

In this article we use the simplest signaling mechanism known to humans: the user copies a JSON blob from one tab and pastes it into the other tab. No server. No WebSocket. No Firebase. Once you understand the handshake at that level, swapping the human in for a WebSocket is trivial — but understand it without the WebSocket first.
在本文中，我们使用人类已知最简单的信令机制：用户从一个标签页复制 JSON 数据块，然后粘贴到另一个标签页中。没有服务器，没有 WebSocket，没有 Firebase。一旦你理解了这种层面的握手，将其替换为 WebSocket 就非常简单了——但请务必先在没有 WebSocket 的情况下理解它。

### The handshake in 3 messages
### 3 条消息完成握手

It looks complicated. It is not. It is three messages.
它看起来很复杂，其实不然，只需要三条消息。

```text
Tab A                               Tab B
  │                                   │
  │ 1. "Here is my offer SDP +        │
  │    every ICE candidate I found"   │
  │ ───────────────────────────────────►
  │                                   │
  │ 2. "Here is my answer SDP +       │
  │    every ICE candidate I found"   │
  │ ◄───────────────────────────────────
  │                                   │
  │ 3. (Tab A confirms by setting     │
  │    Tab B's answer)                │
  │                                   │
  ════════ frames flow both ways ═════
```

*   **SDP ("Session Description Protocol")**: a multi-line text blob describing what codecs each side supports, what tracks it has, and where to send them.
    **SDP（会话描述协议）**：一个多行文本块，描述了双方支持的编解码器、拥有的媒体轨道以及发送目标。
*   **ICE ("Interactive Connectivity Establishment")**: a list of network addresses (your LAN IP, your public IP, sometimes a TURN relay) the other peer can try.
    **ICE（交互式连接建立）**：对方可以尝试连接的网络地址列表（你的局域网 IP、公网 IP，有时还包括 TURN 中继服务器）。

Each side runs ICE gathering, mashes the candidates into the SDP, hands you one blob. The other side does the same.
每一端都会运行 ICE 收集过程，将候选地址合并到 SDP 中，生成一个数据块。另一端也执行同样的操作。

### Build it: 8 step-by-step commits
### 构建过程：8 个循序渐进的提交

The repo is structured so each commit adds exactly one idea. Walk the history one commit at a time.
仓库的结构设计为每个提交只增加一个核心概念。你可以按顺序查看历史记录。

**Step 1 — Next.js scaffold**
`npx create-next-app@latest webrtc-from-zero --typescript --tailwind --app`
Default landing page. No WebRTC yet.
默认落地页，暂无 WebRTC。

**Step 2 — Local webcam preview**
The simplest browser API in the world.
```javascript
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true, });
  localVideo.current!.srcObject = stream;
}
```
Permission prompt fires the first time. `srcObject = stream` and the frames render in real time. No `<source>` tag, no MIME type, no nothing.
首次运行时会触发权限提示。通过 `srcObject = stream`，画面即可实时渲染。无需 `<source>` 标签，无需 MIME 类型，什么都不需要。

**Step 3 — RTCPeerConnection + remote pane**
```javascript
const pc = new RTCPeerConnection({ 
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }], 
});

pc.ontrack = (event) => {
  remoteVideo.current!.srcObject = event.streams[0];
};

stream.getTracks().forEach((t) => pc.addTrack(t, stream));
```
Three things happen here:
这里发生了三件事：
1. `new RTCPeerConnection(...)` creates the peer-to-peer pipe. Each side has its own.
   `new RTCPeerConnection(...)` 创建了点对点管道，双方各有一个。
2. `pc.ontrack` fires when the other side sends us frames. We grab the incoming MediaStream and feed it to a `<video>` exactly like we did for the local camera.
   当对方发送帧时，`pc.ontrack` 会触发。我们获取传入的 MediaStream 并将其喂给 `<video>` 标签，就像处理本地摄像头一样。
3. `addTrack(track, stream)` attaches each of our outgoing tracks to the pipe. They'll be packaged into the SDP offer on the next step.
   `addTrack(track, stream)` 将我们的输出轨道附加到管道中。它们将在下一步被打包进 SDP offer 中。

Note the `iceServers` config — Google's public STUN server. STUN tells your browser its public IP/port. It costs nothing and is fine for dev. Production also needs a TURN server for users behind hostile NATs.
注意 `iceServers` 配置——这是 Google 的公共 STUN 服务器。STUN 会告诉浏览器它的公网 IP/端口。这完全免费，适合开发使用。但在生产环境中，如果用户处于严格的 NAT 环境下，还需要 TURN 服务器。

**Step 4 — Caller creates the offer**
```javascript
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);
// Wait for ICE gathering to finish so the SDP contains every candidate.
await waitForIceGatheringComplete(pc);
setOfferSdp(JSON.stringify(pc.localDescription));
```
`createOffer()` returns the local SDP. `setLocalDescription()` tells the pc "yes, that's me." We then wait for ICE gathering to complete — that's the "non-trickle" approach. When ICE gathering finishes, `pc.localDescription` contains the offer AND every candidate, merged. One blob. Drop it in a textarea. User copies it to tab B.
`createOffer()` 返回本地 SDP。`setLocalDescription()` 告诉连接对象“这就是我”。然后我们等待 ICE 收集完成——这是“非涓流（non-trickle）”方法。当 ICE 收集完成后，`pc.localDescription` 就包含了合并后的 offer 和所有候选地址。这就是一个数据块，把它放入文本框，用户将其复制到标签页 B。

**Step 5 — Callee accepts offer, creates answer**
```javascript
// Tab B receives the offer.
await pc.setRemoteDescription(JSON.parse(pastedOffer));
// Now generate our own SDP describing what WE'll send.
const answer = await pc.createAnswer();
await pc.setLocalDescription(answer);
await waitForIceGatheringComplete(pc);
setAnswerSdp(JSON.stringify(pc.localDescription));
```
Same shape as the offer side, mirrored. `setRemoteDescription` tells our pc "here's what the other side wants." `createAnswer` is the symmetric companion to `createOffer`. We wait for ICE again, dump the answer SDP into a textarea, user copies it back to tab A.
与 offer 端逻辑相同，只是镜像操作。`setRemoteDescription` 告诉我们的连接对象“对方想要什么”。`createAnswer` 是 `createOffer` 的对称伴侣。我们再次等待 ICE 完成，将 answer SDP 放入文本框，用户将其复制回标签页 A。

**Step 6 — Caller accepts answer**
```javascript
await pc.setRemoteDescription(JSON.parse(pastedAnswer));
```
One line. The handshake is over. ICE picks the best candidate pair, and frames start flowing in both directions. The `pc.ontrack` handler from step 3 fires for the first time. The remote `<video>` lights up with the other tab's webcam. You see your own face on two browsers. You wave at yourself. The lag is 50-100 ms because there is no server in between.
只需一行代码，握手结束。ICE 会选择最佳的候选路径，视频帧开始双向流动。第 3 步中的 `pc.ontrack` 处理程序首次触发。远程 `<video>` 标签亮起，显示出另一个标签页的摄像头画面。你在两个浏览器里看到了自己的脸，向自己挥手。延迟仅为 50-100 毫秒，因为中间没有任何服务器中转。
---
title: "Warum wir eine eigene KYC-API gebaut haben — und es kostenlos rausgeben"
originalUrl: "https://dev.to/enjyn_3feb58e98fa3/warum-wir-eine-eigene-kyc-api-gebaut-haben-und-es-kostenlos-rausgeben-2e5a"
date: "2026-05-21T23:07:07.476Z"
---

# Warum wir eine eigene KYC-API gebaut haben — und es kostenlos rausgeben
# 为什么我们构建了自己的 KYC API — 并将其免费发布

Das Problem: KYC ist teuer. Sehr teuer. Vor knapp einem Jahr hatten wir bei Enjyn ein wiederkehrendes Muster: Für mehrere unserer Kundenprojekte brauchten wir eine zuverlässige Identitätsprüfung — mal für Altersverifikation, mal für eine Community-Plattform, mal für einen Marktplatz mit Verkäufer-KYC.
问题所在：KYC（了解你的客户）非常昂贵。大约一年前，我们在 Enjyn 遇到了一个反复出现的需求：在多个客户项目中，我们需要可靠的身份验证——有时是为了年龄验证，有时是为了社区平台，有时是为了带有卖家 KYC 的市场。

Wir haben uns die üblichen Verdächtigen angeschaut:
我们查看了市场上常见的供应商：

| Anbieter | Preis pro Verifikation | Setup |
| :--- | :--- | :--- |
| **供应商** | **单次验证价格** | **设置** |
| Onfido | ab ~2 € | Enterprise-Sales |
| IDnow | ab ~2–5 € | Vertrieblicher Erstkontakt |
| Veriff | ab ~1–3 € | Self-Service, aber Mindestvolumen |

Bei einem unserer Projekte mit erwarteten 1.500 Verifikationen im Monat wären das 2.250 – 7.500 € monatlich gewesen. Für ein Tool, das vor allem im Hintergrund läuft und „nur" prüft, ob ein Personalausweis echt ist. Die ehrliche Erkenntnis: Wir wollten das nicht zahlen. Und unsere Kunden auch nicht.
在我们其中一个预计每月有 1,500 次验证的项目中，每月的成本将达到 2,250 至 7,500 欧元。对于一个主要在后台运行、且“仅仅”是检查身份证件真伪的工具来说，这太贵了。坦白说：我们不想支付这笔费用，我们的客户也不想。

Die Frage: Können wir das selbst bauen? Ein paar Wochenenden Recherche später war klar: Ja, können wir. Die Bestandteile sind technisch alle vorhanden:
问题是：我们能自己开发吗？经过几个周末的研究后，答案很明确：是的，我们可以。从技术上讲，所有组件都已经具备：

*   Dokumenten-OCR für Ausweisdaten (Name, Geburtsdatum, MRZ-Zone)
*   Dokumenten-Authentizitätsprüfung (Hologramme, Sicherheitsmerkmale, MRZ-Checksums)
*   Datenabgleich zwischen Nutzer-Eingabe und Ausweisdaten
*   Auto-Datenextraktion aus Vorder- und Rückseite

*   用于证件数据的文档 OCR（姓名、出生日期、机读码区 MRZ）
*   文档真实性检查（全息图、安全特征、MRZ 校验和）
*   用户输入数据与证件数据之间的比对
*   证件正反面自动数据提取

Was wir nicht wollten: Daten in die USA schicken (DSGVO-Albträume mit Schrems II), Cloud-Lösungen mit Per-Call-Pricing (genau das Problem, das wir lösen wollten), Black-Box-Modelle, deren Funktion wir nicht erklären können. Also haben wir uns hingesetzt und unsere eigene KI/ML-Pipeline gebaut. Komplett in-house, auf eigenen Servern in Deutschland.
我们不想做的是：将数据发送到美国（GDPR 在 Schrems II 判决后的噩梦）、使用按调用次数收费的云解决方案（这正是我们想要解决的问题）、以及无法解释其工作原理的黑盒模型。因此，我们坐下来构建了自己的 AI/ML 流水线。完全内部开发，运行在我们位于德国的服务器上。

Der Stack — grob umrissen: Aus naheliegenden Gründen veröffentlichen wir nicht jedes Detail (Anti-Fraud-Schutz), aber das große Bild:
技术栈概览：出于显而易见的原因（反欺诈保护），我们不会发布每一个细节，但大体架构如下：

*   **Bildverarbeitung:** Ausweis-Bilder werden zuerst normalisiert, entzerrt und auf Qualität geprüft. Zu unscharf, zu schräg oder Bildschirm-Fotografie → automatische Ablehnung.
*   **OCR & MRZ-Parsing:** Die Maschinenlesbare Zone (MRZ) deutscher Ausweise und Reisepässe wird ausgelesen, validiert (Prüfsummen) und mit den OCR-Daten aus dem visuellen Bereich abgeglichen.
*   **Datenabgleich:** Die vom Anwender vorab angegebenen Daten (Vorname, Nachname, Geburtsdatum) werden mit den extrahierten Ausweisdaten verglichen. Diskrepanzen → Status failed.
*   **Auto-Löschung:** Hochgeladene Bilder werden nach 10 Minuten gelöscht, Status-Daten nach 30 Tagen. Mehr nicht.

*   **图像处理：** 证件图片首先会被标准化、纠偏并进行质量检查。如果太模糊、角度太偏或拍摄的是屏幕照片 → 自动拒绝。
*   **OCR 与 MRZ 解析：** 读取德国身份证和护照的机读码区 (MRZ)，进行验证（校验和），并与视觉区域的 OCR 数据进行比对。
*   **数据比对：** 将用户预先提供的数据（名字、姓氏、出生日期）与提取的证件数据进行比较。如有差异 → 状态为失败。
*   **自动删除：** 上传的图片在 10 分钟后删除，状态数据在 30 天后删除。仅此而已。

### Wie die API aussieht (API 使用方式)

Wir nutzen einen einfachen, dreistufigen Flow — bewusst minimalistisch gehalten:
我们使用了一个简单、三步走的流程，刻意保持极简：

**1. Verifikations-Session erstellen (创建验证会话)**
```bash
curl -X POST https://api.verify.enjyn.de/api/v1/verify \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{ "vorname": "Max", "nachname": "Mustermann", "geburtsdatum": "01.01.1990", "return_url": "https://ihre-website.de/callback.html" }'
```

Du leitest den Nutzer auf die `verify_url` weiter — oder zeigst den QR-Code an, damit er die Verifikation auf dem Smartphone fortsetzt. Der Nutzer lädt dort Vorder- und Rückseite seines Ausweises hoch, der Rest passiert automatisch.
你将用户重定向到 `verify_url`，或者显示二维码，以便用户在智能手机上继续验证。用户在那里上传证件的正反面，其余过程自动完成。

**2. Status nach Callback abrufen (回调后获取状态)**
Nach Abschluss leiten wir den Nutzer auf deine `return_url` weiter. Wichtig: Der `status`-Parameter in der URL ist nicht vertrauenswürdig (kann manipuliert werden). Den echten Status holst du dir per API:
完成后，我们将用户重定向到你的 `return_url`。重要提示：URL 中的 `status` 参数不可信（可能被篡改）。请通过 API 获取真实状态：

```bash
curl https://api.verify.enjyn.de/api/v1/get-result/{session_id} \
  -H "X-API-Key: YOUR_API_KEY"
```

**Was wir bewusst NICHT machen (我们刻意不做的事情):**

*   **Keine internationalen Ausweise (noch nicht):** Wir prüfen aktuell deutsche Personalausweise und Reisepässe.
*   **Kein BaFin-Level KYC:** Für Banken und Finanzdienstleister gibt es regulatorische Anforderungen (Video-Ident etc.), die wir nicht abdecken.
*   **Kein Speichern der Originaldaten über Wochen:** Bilder weg nach 10min, Session (anonymisiert) weg nach 30 Tagen.

*   **暂不支持国际证件：** 我们目前仅验证德国身份证和护照。
*   **非 BaFin 级别 KYC：** 银行和金融服务商有特定的监管要求（如视频认证等），我们不涵盖这些。
*   **不长期存储原始数据：** 图片 10 分钟后删除，会话（匿名化）30 天后删除。

**Warum wir es kostenlos rausgeben (为什么我们免费发布):**

Faire Frage. Antwort in drei Teilen:
这是一个好问题。答案分为三部分：

1.  **Eigeninteresse:** Wir nutzen es selbst in mehreren Projekten. Es kostenlos verfügbar zu machen, kostet uns kaum mehr als es nur intern zu nutzen. Die Infrastruktur läuft sowieso.
2.  **Marktposition:** Wir sind eine Software-Agentur. Kunden, die unser KYC-API ausprobieren und damit zufrieden sind, fragen...
3.  **社区贡献：** 我们是软件代理商。尝试并对我们的 KYC API 感到满意的客户，往往会进一步咨询……
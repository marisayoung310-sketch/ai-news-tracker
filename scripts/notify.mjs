#!/usr/bin/env node
/**
 * Webhook notification script.
 *
 * Usage: node scripts/notify.mjs <success|failure>
 *
 * Env vars:
 *   WEBHOOK_URL   - Required. The webhook endpoint URL.
 *   WEBHOOK_TYPE  - Optional. One of: wecom (default) | dingtalk | feishu | slack | generic
 *   SITE_URL      - Optional. The site URL to include in the notification.
 *   REPORT_DATE   - Optional. The report date (YYYY-MM-DD).
 *   RUN_URL       - Optional. The GitHub Actions run URL (used on failure).
 */

const [, , status = 'success'] = process.argv;

const webhookUrl = process.env.WEBHOOK_URL;
const webhookType = (process.env.WEBHOOK_TYPE || 'wecom').toLowerCase();
const siteUrl = process.env.SITE_URL || '';
const reportDate = process.env.REPORT_DATE || new Date().toISOString().split('T')[0];
const runUrl = process.env.RUN_URL || '';

if (!webhookUrl) {
  console.log('[notify] WEBHOOK_URL not set, skipping notification.');
  process.exit(0);
}

/** Build request body based on webhook type */
function buildPayload(type, status, weather = '') {
  const isSuccess = status === 'success';
  const isStart = status === 'start';
  let title = '';
  if (isStart) {
    title = `AI News Daily · ${reportDate} 开始生成`;
  } else if (isSuccess) {
    title = `AI News Daily · ${reportDate} 已生成`;
  } else {
    title = `AI News Daily · ${reportDate} 生成失败`;
  }

  const dailyUrl = siteUrl ? `${siteUrl.replace(/\/$/, '')}/daily/${reportDate}` : '';

  let textLines = [];
  let markdownLines = [];

  if (isStart) {
    textLines = [
      `▶️ ${title}`,
      ``,
      `日期: ${reportDate}`,
      weather ? `北京天气: ${weather}` : '',
      runUrl ? `查看日志: ${runUrl}` : '',
    ].filter(Boolean);

    markdownLines = [
      `**▶️ ${title}**`,
      ``,
      `日期: ${reportDate}`,
      weather ? `北京天气: ${weather}` : '',
      runUrl ? `查看日志: [GitHub Actions](${runUrl})` : '',
    ].filter(Boolean);
  } else if (isSuccess) {
    textLines = [
      title,
      ``,
      `日期: ${reportDate}`,
      dailyUrl ? `今日日报: ${dailyUrl}` : '',
    ].filter(Boolean);

    markdownLines = [
      `**${title}**`,
      ``,
      `日期: ${reportDate}`,
      dailyUrl ? `今日日报: [查看日报](${dailyUrl})` : '',
    ].filter(Boolean);
  } else {
    textLines = [
      `❌ ${title}`,
      ``,
      `日期: ${reportDate}`,
      runUrl ? `查看日志: ${runUrl}` : '',
    ].filter(Boolean);

    markdownLines = [
      `**❌ ${title}**`,
      ``,
      `日期: ${reportDate}`,
      runUrl ? `查看日志: [GitHub Actions](${runUrl})` : '',
    ].filter(Boolean);
  }

  const plainText = textLines.join('\n');
  const markdown = markdownLines.join('\n');

  switch (type) {
    case 'wecom':
    case 'wechat':
    case 'qywx':
      // Enterprise WeChat (企业微信) webhook - text type
      return {
        msgtype: 'text',
        text: { content: plainText },
      };

    case 'dingtalk':
    case 'ding':
      // DingTalk (钉钉) webhook
      return {
        msgtype: 'markdown',
        markdown: { title, text: markdown },
      };

    case 'feishu':
    case 'lark':
      // Feishu / Lark (飞书) webhook
      return {
        msg_type: 'interactive',
        card: {
          header: {
            title: { tag: 'plain_text', content: title },
            template: isSuccess ? 'green' : 'red',
          },
          elements: [
            { tag: 'markdown', content: markdown },
          ],
        },
      };

    case 'slack':
      return {
        text: title,
        blocks: [
          {
            type: 'section',
            text: { type: 'mrkdwn', text: markdown },
          },
        ],
      };

    case 'generic':
    default:
      // Generic JSON payload
      return {
        status,
        title,
        date: reportDate,
        siteUrl,
        runUrl,
        text: plainText,
        markdown,
      };
  }
}
async function getWeather() {
  try {
    const res = await fetch('https://wttr.in/Beijing?format=%c+%t&m');
    if (res.ok) {
      return (await res.text()).trim();
    }
  } catch (err) {
    console.error('[notify] Failed to fetch weather:', err);
  }
  return '';
}

async function main() {
  let weather = '';
  if (status === 'start') {
    weather = await getWeather();
  }

  const payload = buildPayload(webhookType, status, weather);

  console.log(`[notify] Sending ${status} notification via ${webhookType} webhook...`);

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error(`[notify] Webhook returned HTTP ${res.status}: ${text}`);
      process.exit(1);
    }

    console.log(`[notify] Sent successfully. Response: ${text.slice(0, 200)}`);
  } catch (err) {
    console.error(`[notify] Failed to send webhook: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }
}

main();

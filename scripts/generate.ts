import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import type { FetchResult, Article } from './fetch/types.js';
import { aiGenerate, buildDailyPrompt } from './ai/index.js';

function getDateString(date?: Date): string {
  const d = date ?? new Date();
  // Use Asia/Shanghai timezone to match the GitHub Actions cron schedule
  return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Shanghai' });
}

function normalizeUrl(raw: string): string {
  try {
    const u = new URL(raw);
    // Strip query/fragment, lowercase host, remove trailing slash
    return `${u.protocol}//${u.host.toLowerCase()}${u.pathname.replace(/\/$/, '')}`;
  } catch {
    return raw.toLowerCase();
  }
}

function groupBySource(results: FetchResult[]): Record<string, Article[]> {
  const seen = new Set<string>();
  const grouped: Record<string, Article[]> = {};
  for (const result of results) {
    const deduped = result.articles.filter(a => {
      const key = normalizeUrl(a.url);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (deduped.length > 0) {
      grouped[result.source] = deduped;
    }
  }
  return grouped;
}

import { crawlAndTranslateArticle } from './fetch/crawler.js';

function buildFrontmatter(date: string): string {
  return `---
title: "AI News Daily - ${date}"
date: "${date}"
---

`;
}

export async function generateDaily(
  results: FetchResult[],
  outputDir: string,
  date?: Date,
): Promise<string> {
  const dateStr = getDateString(date);
  const outputPath = join(outputDir, `${dateStr}.md`);

  if (existsSync(outputPath) && !process.env.FORCE_REGEN) {
    console.log(`[generate] ${outputPath} already exists, skipping. (Set FORCE_REGEN=1 to override)`);
    return outputPath;
  }

  const grouped = groupBySource(results);
  const sourceCount = Object.keys(grouped).length;
  const articleCount = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0);

  if (articleCount === 0) {
    console.warn('[generate] No articles fetched, skipping generation.');
    return '';
  }

  console.log(`[generate] ${articleCount} articles from ${sourceCount} sources`);
  
  console.log('[generate] Crawling and translating full content for articles...');
  for (const source in grouped) {
    for (const article of grouped[source]) {
      const localUrl = await crawlAndTranslateArticle(article.url, article.title, dateStr);
      if (localUrl) {
        article.url = localUrl;
      }
    }
  }

  console.log('[generate] Calling AI to generate daily digest...');

  const prompt = buildDailyPrompt(grouped, dateStr);
  const content = await aiGenerate(prompt);

  const markdown = buildFrontmatter(dateStr) + `> ${dateStr}\n\n` + content;

  writeFileSync(outputPath, markdown, 'utf-8');
  console.log(`[generate] Written to ${outputPath}`);

  return outputPath;
}

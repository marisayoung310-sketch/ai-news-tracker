import * as cheerio from 'cheerio';
import { proxyFetch } from '../proxy.js';
import { aiGenerate } from '../ai/provider.js';
import { writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import * as crypto from 'node:crypto';

const NEWS_DIR = join(process.cwd(), 'src/content/news');
if (!existsSync(NEWS_DIR)) {
  mkdirSync(NEWS_DIR, { recursive: true });
}

export function urlToSlug(url: string): string {
  return crypto.createHash('md5').update(url).digest('hex').substring(0, 12);
}

export async function crawlAndTranslateArticle(url: string, title: string, dateStr?: string): Promise<string | null> {
  const slug = urlToSlug(url);
  const pathPrefix = dateStr ? `${dateStr}/` : '';
  const dirPath = join(NEWS_DIR, dateStr || '');
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }

  const outPath = join(dirPath, `${slug}.md`);
  
  if (existsSync(outPath)) {
    return `/news/${pathPrefix}${slug}`;
  }

  const dirs = readdirSync(NEWS_DIR, { withFileTypes: true });
  for (const dir of dirs) {
    if (dir.isDirectory() && dir.name !== (dateStr || '')) {
      if (existsSync(join(NEWS_DIR, dir.name, `${slug}.md`))) {
        return `/news/${dir.name}/${slug}`;
      }
    }
  }

  console.log(`[crawler] Fetching detail for: ${title} (${url})`);
  let text = '';
  try {
    const res = await proxyFetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      // simple timeout for node-fetch if supported, else relies on default
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Cleanup useless tags
    $('script, style, nav, footer, header, aside, .sidebar, .comments, iframe, svg').remove();
    
    let articleNode = $('article');
    if (articleNode.length === 0) articleNode = $('main');
    if (articleNode.length === 0) articleNode = $('body');
    
    text = articleNode.text().replace(/\s+/g, ' ').trim();
  } catch (err) {
    console.warn(`[crawler] Failed to fetch ${url}: ${(err as Error).message}`);
    return null;
  }

  if (text.length < 300) {
    console.warn(`[crawler] Content too short for ${url} (${text.length} chars)`);
    return null;
  }

  console.log(`[crawler] Translating ${text.length} chars for ${slug}...`);
  try {
    const prompt = `You are a bilingual tech news editor. 
Please format the following English tech news article into an alternating bilingual format (Original English paragraph followed by its Chinese translation).
Keep formatting clean (use markdown). Ignore irrelevant navigational text if any.

Title: ${title}

Content:
${text.substring(0, 6000)}`;

    const translated = await aiGenerate(prompt);
    
    const frontmatter = `---
title: ${JSON.stringify(title)}
originalUrl: ${JSON.stringify(url)}
date: "${new Date().toISOString()}"
---

`;
    writeFileSync(outPath, frontmatter + translated, 'utf-8');
    console.log(`[crawler] Saved translated detail to ${outPath}`);
    return `/news/${pathPrefix}${slug}`;
  } catch (err) {
    console.error(`[crawler] Translation failed for ${url}:`, err);
    return null;
  }
}

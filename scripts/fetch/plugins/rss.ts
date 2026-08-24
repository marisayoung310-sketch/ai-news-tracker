import RSSParser from 'rss-parser';
import * as cheerio from 'cheerio';
import type { SourcePlugin, SourceConfig, Article } from '../types.js';
import { proxyFetch } from '../../proxy.js';

const rssPlugin: SourcePlugin = {
  name: 'rss',
  type: 'rss',

  async fetch(config: SourceConfig): Promise<Article[]> {
    if (!config.url) {
      throw new Error(`RSS plugin requires a "url" in source config for "${config.name}"`);
    }

    // Fetch XML via proxyFetch, then parse the string
    const res = await proxyFetch(config.url);
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${config.url}`);
    const xml = await res.text();

    const parser = new RSSParser();
    let feed;
    try {
      feed = await parser.parseString(xml);
    } catch (err) {
      const preview = xml.slice(0, 200).replace(/\n/g, ' ');
      throw new Error(`Failed to parse RSS for "${config.name}": ${err instanceof Error ? err.message : err} (response starts with: ${preview})`);
    }
    const maxItems = config.maxItems ?? 10;

    const articles: Article[] = feed.items
      .slice(0, maxItems)
      .map(item => {
        let textContent = item.contentSnippet ?? '';
        // rss-parser's contentSnippet often drops the first paragraph in some feeds (like Product Hunt).
        // Try parsing the HTML content directly using cheerio.
        const htmlContent = item.content || item.summary || '';
        if (htmlContent) {
          const $ = cheerio.load(htmlContent);
          $('script, style').remove();
          textContent = $('body').text().replace(/\s+/g, ' ').trim();
        }
        
        const rawAuthor = item.creator ?? item.author;
        const author = typeof rawAuthor === 'string' ? rawAuthor : (rawAuthor && typeof rawAuthor === 'object' ? (rawAuthor as any).name ?? JSON.stringify(rawAuthor) : undefined);
        const rawTags = item.categories ?? [];
        const tags = rawTags.map((t: any) => typeof t === 'string' ? t : (t?._ ?? t?.term ?? String(t)));

        return {
          title: item.title ?? 'Untitled',
          url: item.link ?? '',
          content: textContent,
          date: item.pubDate ? new Date(item.pubDate) : new Date(),
          source: config.name,
          author,
          tags,
        };
      });

    return articles;
  },
};

export default rssPlugin;

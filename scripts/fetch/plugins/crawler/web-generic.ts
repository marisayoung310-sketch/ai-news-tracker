import * as cheerio from 'cheerio';
import type { SourcePlugin, SourceConfig, Article } from '../../types.js';
import { proxyFetch } from '../../../proxy.js';

interface CrawlerOptions {
  /** CSS selector for article links (e.g. "article h2 a") */
  selector?: string;
  /** CSS selector for article title (relative to item) */
  titleSelector?: string;
  /** CSS selector for article content/summary (relative to item) */
  contentSelector?: string;
  /** CSS selector for article date */
  dateSelector?: string;
  /** Custom User-Agent string */
  userAgent?: string;
}

const DEFAULT_UA = 'AI-News-Bot/1.0 (https://github.com/your-repo/ai-news)';

const webGenericPlugin: SourcePlugin = {
  name: 'web-generic',
  type: 'crawler',

  async fetch(config: SourceConfig): Promise<Article[]> {
    if (!config.url) {
      throw new Error(`Crawler plugin requires a "url" in source config for "${config.name}"`);
    }

    const opts = (config.options ?? {}) as CrawlerOptions;
    const selector = opts.selector ?? 'article a, .post a, h2 a, h3 a';
    const maxItems = config.maxItems ?? 10;

    const res = await proxyFetch(config.url, {
      headers: { 'User-Agent': opts.userAgent ?? DEFAULT_UA },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${config.url}`);

    const html = await res.text();
    const $ = cheerio.load(html);
    const baseUrl = new URL(config.url);

    const articles: Article[] = [];
    const seen = new Set<string>();

    $(selector).each((_, el) => {
      if (articles.length >= maxItems) return false;

      const $el = $(el);
      const href = $el.attr('href');
      if (!href) return;

      // Resolve relative URLs
      let fullUrl: string;
      try {
        fullUrl = new URL(href, baseUrl).toString();
      } catch {
        return;
      }

      // Deduplicate
      if (seen.has(fullUrl)) return;
      seen.add(fullUrl);

      // Extract title
      let title: string;
      if (opts.titleSelector) {
        title = $el.find(opts.titleSelector).text().replace(/\s+/g, ' ').trim() || $el.text().replace(/\s+/g, ' ').trim();
      } else {
        title = $el.text().replace(/\s+/g, ' ').trim();
      }

      if (!title || title.length < 3) return;

      // Extract content/summary
      let content = '';
      if (opts.contentSelector) {
        const $parent = $el.closest('article, .post, .item, li, div');
        content = $parent.find(opts.contentSelector).text().replace(/\s+/g, ' ').trim();
      }

      articles.push({
        title,
        url: fullUrl,
        content: content || title,
        date: new Date(),
        source: config.name,
      });
    });

    return articles;
  },
};

export default webGenericPlugin;

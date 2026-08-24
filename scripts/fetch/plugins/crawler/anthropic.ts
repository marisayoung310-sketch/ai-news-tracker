import * as cheerio from 'cheerio';
import type { SourcePlugin, SourceConfig, Article } from '../../types.js';
import { proxyFetch } from '../../../proxy.js';

const NEWS_URL = 'https://www.anthropic.com/news';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const anthropicPlugin: SourcePlugin = {
  name: 'anthropic',
  type: 'crawler',

  async fetch(config: SourceConfig): Promise<Article[]> {
    const maxItems = config.maxItems ?? 10;
    const targetUrl = config.url || NEWS_URL;

    const res = await proxyFetch(targetUrl, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${targetUrl}`);

    const $ = cheerio.load(await res.text());
    const articles: Article[] = [];
    const seen = new Set<string>();

    $('a[href^="/news/"]').each((_, el) => {
      if (articles.length >= maxItems) return false;

      const $el = $(el);
      const href = $el.attr('href');
      if (!href || href === '/news' || href === '/news/') return;

      const url = `https://www.anthropic.com${href}`;
      if (seen.has(url)) return;
      seen.add(url);

      const title = (
        $el.find('h1, h2, h3, h4, h5').first().text() ||
        $el.find('[class*="__title"]').first().text()
      ).replace(/\s+/g, ' ').trim();
      if (!title || title.length < 3) return;

      const category = (
        $el.find('span.caption').first().text() ||
        $el.find('[class*="__subject"]').first().text()
      ).trim();
      const content = $el.find('p').first().text().replace(/\s+/g, ' ').trim() || title;
      const dateText = $el.find('time').first().text().trim();
      const parsed = dateText ? new Date(dateText) : null;
      const date = parsed && !isNaN(parsed.getTime()) ? parsed : new Date();

      const tags = ['anthropic'];
      if (category) tags.push(category.toLowerCase());

      articles.push({ title, url, content, date, source: config.name, tags });
    });

    if (articles.length === 0) {
      console.warn(`[anthropic] Found 0 articles, DOM structure may have changed.`);
    }

    return articles;
  },
};

export default anthropicPlugin;

import * as cheerio from 'cheerio';
import type { SourcePlugin, SourceConfig, Article } from '../../types.js';
import { proxyFetch } from '../../../proxy.js';

const githubTrendingPlugin: SourcePlugin = {
  name: 'github-trending',
  type: 'crawler',

  async fetch(config: SourceConfig): Promise<Article[]> {
    const maxItems = config.maxItems ?? 10;
    // Allow users to specify language logic via config.url if they want to
    const targetUrl = config.url || 'https://github.com/trending';

    // Standard User-Agent is needed to bypass GitHub curl/bot blocking
    const res = await proxyFetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} fetching GitHub Trending`);

    const html = await res.text();
    const $ = cheerio.load(html);

    const articles: Article[] = [];

    // Parse the specifically known GitHub Trending DOM structure
    $('article.Box-row').each((_, el) => {
      if (articles.length >= maxItems) return false;

      const $el = $(el);
      const $title = $el.find('h2.h3.lh-condensed a');
      const href = $title.attr('href');
      if (!href) return;

      const fullUrl = `https://github.com${href}`;
      
      // Clean up whitespace like 'microsoft /\n\n      markitdown'
      const title = $title.text().replace(/\s+/g, ' ').trim();
      const content = $el.find('p.col-9').text().replace(/\s+/g, ' ').trim();

      // Grab some extra context like primary language
      const language = $el.find('span[itemprop="programmingLanguage"]').text().trim();
      const tags = ['github', 'trending'];
      if (language) tags.push(language);

      articles.push({
        title,
        url: fullUrl,
        content: content || title, // fallback to title if repo has no description
        date: new Date(),
        source: config.name,
        tags,
      });
    });

    // If parsing fails completely, throw
    if (articles.length === 0) {
       console.warn(`[github-trending] Found 0 articles, perhaps GitHub changed DOM structure?`);
    }

    return articles;
  },
};

export default githubTrendingPlugin;

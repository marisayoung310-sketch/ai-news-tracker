import type { SourcePlugin, SourceConfig, Article } from '../../types.js';
import { proxyFetch } from '../../../proxy.js';
import * as cheerio from 'cheerio';

interface AlgoliaHit {
  objectID: string;
  title: string;
  url: string | null;
  points: number;
  author: string;
  num_comments: number;
  created_at: string;
  story_text?: string | null;
}

interface AlgoliaResponse {
  hits: AlgoliaHit[];
  nbHits: number;
}

const ALGOLIA_API = 'https://hn.algolia.com/api/v1';

const hackernewsPlugin: SourcePlugin = {
  name: 'hackernews',
  type: 'api',

  async fetch(config: SourceConfig): Promise<Article[]> {
    const maxItems = config.maxItems ?? 15;

    const oneDayAgo = Math.floor(Date.now() / 1000) - 86400;
    const url = `${ALGOLIA_API}/search?tags=story&hitsPerPage=${maxItems}&numericFilters=created_at_i>${oneDayAgo},points>5`;

    const res = await proxyFetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} from Algolia HN API`);

    const text = await res.text();
    const data = JSON.parse(text) as AlgoliaResponse;

    if (!data.hits || data.hits.length === 0) {
      throw new Error(`Algolia returned empty results (nbHits: ${data.nbHits})`);
    }

    // Sort by points descending to get top stories
    const sorted = data.hits
      .filter(hit => hit.title)
      .sort((a, b) => b.points - a.points);

    const articles = sorted.map(hit => ({
      title: hit.title,
      url: hit.url ?? `https://news.ycombinator.com/item?id=${hit.objectID}`,
      content: hit.story_text || `Score: ${hit.points} | Comments: ${hit.num_comments}`,
      date: new Date(hit.created_at),
      source: config.name,
      author: hit.author,
      tags: ['hackernews'],
    }));

    // Concurrently fetch the contents of external websites
    await Promise.all(articles.map(async (article) => {
      if (article.content.startsWith('Score:')) {
        try {
          const res = await proxyFetch(article.url, {
            signal: AbortSignal.timeout(6000),
            headers: { 'User-Agent': 'AI-News-Bot/1.0' },
            retries: 1,
          } as any);
          if (res.ok) {
            const html = await res.text();
            const $ = cheerio.load(html);
            $('script, style, nav, footer, header, iframe, noscript, svg, path, symbol').remove();

            const textContent = $('p').map((_, el) => $(el).text().trim()).get()
              .filter(p => p.length > 20)
              .join('\n\n');

            if (textContent.length > 100) {
              article.content = textContent.slice(0, 13000);
            }
          }
        } catch (err) {
          console.warn(`[hackernews] Could not fetch content for ${article.url}:`, String(err));
        }
      }
    }));

    return articles;
  },
};

export default hackernewsPlugin;

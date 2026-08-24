import type { SourcePlugin, SourceConfig, Article } from '../../types.js';
import { proxyFetch } from '../../../proxy.js';

interface PHNode {
  id: string;
  name: string;
  tagline: string;
  url: string;
  votesCount: number;
  createdAt: string;
  topics?: { edges: { node: { name: string } }[] };
}

const producthuntPlugin: SourcePlugin = {
  name: 'producthunt',
  type: 'api',

  async fetch(config: SourceConfig): Promise<Article[]> {
    const maxItems = config.maxItems ?? 10;
    let apiToken = (config.options?.apiToken as string | undefined) || process.env.PRODUCTHUNT_API_TOKEN;
    const clientId = process.env.PRODUCTHUNT_CLIENT_ID;
    const clientSecret = process.env.PRODUCTHUNT_CLIENT_SECRET;

    if (!apiToken && clientId && clientSecret) {
      try {
        const tokenRes = await proxyFetch('https://api.producthunt.com/v2/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials'
          }),
        });
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json() as { access_token: string };
          apiToken = tokenData.access_token;
        } else {
          console.warn(`Product Hunt: Failed to fetch OAuth token, status ${tokenRes.status}`);
        }
      } catch (err) {
        console.warn(`Product Hunt: OAuth token error - ${String(err)}`);
      }
    }

    // Product Hunt requires API token — if not provided, fall back to RSS
    if (!apiToken) {
      console.warn('Product Hunt: No API token provided, using RSS feed fallback.');
      const { default: rssPlugin } = await import('../rss.js');
      return rssPlugin.fetch({
        ...config,
        url: 'https://www.producthunt.com/feed',
        plugin: 'rss',
      });
    }

    const query = `
      query {
        posts(first: ${maxItems}, order: VOTES) {
          edges {
            node {
              id
              name
              tagline
              url
              votesCount
              createdAt
              topics(first: 3) {
                edges { node { name } }
              }
            }
          }
        }
      }
    `;

    const res = await proxyFetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error(`Product Hunt API error: ${res.status}`);

    const data = await res.json() as { data: { posts: { edges: { node: PHNode }[] } } };
    const posts = data.data.posts.edges.map(e => e.node);

    return posts.map(post => ({
      title: post.name,
      url: post.url,
      content: post.tagline,
      date: new Date(post.createdAt),
      source: config.name,
      tags: post.topics?.edges.map(e => e.node.name) ?? [],
    }));
  },
};

export default producthuntPlugin;

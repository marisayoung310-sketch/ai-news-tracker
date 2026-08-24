import { registry } from './registry.js';
import type { SourceConfig, FetchResult } from './types.js';

// Import and register built-in plugins
import rssPlugin from './plugins/rss.js';
import hackernewsPlugin from './plugins/api/hackernews.js';
import producthuntPlugin from './plugins/api/producthunt.js';
import webGenericPlugin from './plugins/crawler/web-generic.js';
import githubTrendingPlugin from './plugins/crawler/github-trending.js';
import anthropicPlugin from './plugins/crawler/anthropic.js';

registry.register(rssPlugin);
registry.register(hackernewsPlugin);
registry.register(producthuntPlugin);
registry.register(webGenericPlugin);
registry.register(githubTrendingPlugin);
registry.register(anthropicPlugin);

export async function fetchSource(config: SourceConfig): Promise<FetchResult> {
  const plugin = registry.getOrThrow(config.plugin);

  try {
    console.log(`[fetch] ${config.name} (${config.plugin})...`);
    const articles = await plugin.fetch(config);
    console.log(`[fetch] ${config.name}: ${articles.length} articles`);
    return {
      source: config.name,
      articles,
      fetchedAt: new Date(),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[fetch] ${config.name} failed: ${message}`);
    return {
      source: config.name,
      articles: [],
      fetchedAt: new Date(),
      error: message,
    };
  }
}

export async function fetchAll(sources: SourceConfig[]): Promise<FetchResult[]> {
  const enabled = sources.filter(s => s.enabled !== false);
  console.log(`[fetch] Fetching from ${enabled.length} sources...`);

  const results = await Promise.allSettled(
    enabled.map(source => fetchSource(source))
  );

  return results.map((result, i) => {
    if (result.status === 'fulfilled') return result.value;
    return {
      source: enabled[i].name,
      articles: [],
      fetchedAt: new Date(),
      error: result.reason?.message ?? 'Unknown error',
    };
  });
}

export { registry } from './registry.js';
export type { Article, SourcePlugin, SourceConfig, FetchResult, SourcesConfig } from './types.js';

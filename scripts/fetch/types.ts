export interface Article {
  /** Article title in original language */
  title: string;
  /** Article URL */
  url: string;
  /** Article content or summary */
  content: string;
  /** Publish date */
  date: Date;
  /** Source name (e.g. "Hacker News") */
  source: string;
  /** Content language (e.g. "en", "zh") */
  language?: string;
  /** Author name */
  author?: string;
  /** Article tags/categories */
  tags?: string[];
}

export interface SourceConfig {
  /** Display name for this source */
  name: string;
  /** Source type identifier */
  type: 'rss' | 'api' | 'crawler';
  /** Plugin name to use */
  plugin: string;
  /** Source URL (RSS feed URL, API endpoint, or webpage URL) */
  url?: string;
  /** Maximum number of items to fetch */
  maxItems?: number;
  /** Whether this source is enabled */
  enabled?: boolean;
  /** Plugin-specific options */
  options?: Record<string, unknown>;
}

export interface SourcePlugin {
  /** Unique plugin name */
  name: string;
  /** Plugin type */
  type: 'rss' | 'api' | 'crawler';
  /** Fetch articles from this source */
  fetch(config: SourceConfig): Promise<Article[]>;
}

export interface FetchResult {
  /** Source name */
  source: string;
  /** Fetched articles */
  articles: Article[];
  /** Fetch timestamp */
  fetchedAt: Date;
  /** Error message if fetch failed */
  error?: string;
}

export interface SourcesConfig {
  sources: SourceConfig[];
}

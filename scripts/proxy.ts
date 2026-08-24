import { HttpsProxyAgent } from 'https-proxy-agent';

const proxyUrl =
  process.env.HTTPS_PROXY ||
  process.env.HTTP_PROXY ||
  process.env.https_proxy ||
  process.env.http_proxy ||
  process.env.ALL_PROXY ||
  process.env.all_proxy;

let proxyAgent: HttpsProxyAgent<string> | undefined;

if (proxyUrl) {
  console.log(`[proxy] Using proxy: ${proxyUrl}`);
  proxyAgent = new HttpsProxyAgent(proxyUrl);
}

async function fetchOnce(
  url: string | URL | Request,
  init?: RequestInit,
): Promise<Response> {
  if (!proxyAgent) {
    return fetch(url, init);
  }

  try {
    const nodeFetch = (await import('node-fetch')).default;
    const res = await nodeFetch(url.toString(), {
      ...(init as any),
      agent: proxyAgent,
    });
    return res as unknown as Response;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[proxy] node-fetch failed for ${url.toString().slice(0, 60)}..., fallback to native fetch: ${msg}`);
    return fetch(url, init);
  }
}

/**
 * Fetch wrapper with automatic proxy support and retry.
 */
export async function proxyFetch(
  url: string | URL | Request,
  init?: RequestInit & { retries?: number },
): Promise<Response> {
  const maxRetries = init?.retries ?? 2;
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetchOnce(url, init);
      if (res.ok || attempt === maxRetries) return res;
      // Retry on server errors (5xx)
      if (res.status >= 500) {
        lastError = new Error(`HTTP ${res.status}`);
      } else {
        return res; // Don't retry client errors (4xx)
      }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }

    if (attempt < maxRetries) {
      const delay = 1000 * (attempt + 1);
      console.warn(`[proxy] Retry ${attempt + 1}/${maxRetries} for ${url.toString().slice(0, 60)}... (waiting ${delay}ms)`);
      await new Promise(r => setTimeout(r, delay));
    }
  }

  throw lastError ?? new Error(`Failed to fetch ${url}`);
}

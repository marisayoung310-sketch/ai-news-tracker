import 'dotenv/config';
import './proxy.js';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fetchAll } from './fetch/index.js';
import { generateDaily } from './generate.js';
import type { SourcesConfig } from './fetch/types.js';

const ROOT = resolve(import.meta.dirname, '..');

async function main() {
  // Load source configuration
  const configPath = resolve(ROOT, 'config/sources.json');
  const config: SourcesConfig = JSON.parse(readFileSync(configPath, 'utf-8'));

  console.log(`[main] Loaded ${config.sources.length} sources from config`);

  // Fetch all sources
  const results = await fetchAll(config.sources);

  const successCount = results.filter(r => !r.error).length;
  const failCount = results.filter(r => r.error).length;
  console.log(`[main] Fetch complete: ${successCount} succeeded, ${failCount} failed`);

  // Generate daily markdown
  const outputDir = resolve(ROOT, 'src/content/daily');
  const outputPath = await generateDaily(results, outputDir);

  if (outputPath) {
    console.log(`[main] Daily report generated: ${outputPath}`);
  } else {
    console.log('[main] No report generated (no articles or already exists)');
  }
}

main().catch(err => {
  console.error('[main] Fatal error:', err);
  process.exit(1);
});

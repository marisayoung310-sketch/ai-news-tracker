import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const DAILY_DIR = join(ROOT, 'src/content/daily');
const NEWS_DIR = join(ROOT, 'src/content/news');

function main() {
  const dailyFiles = readdirSync(DAILY_DIR).filter(f => f.endsWith('.md'));
  
  let migratedCount = 0;
  let updatedDailyCount = 0;

  for (const dailyFile of dailyFiles) {
    const dateStr = dailyFile.replace('.md', '');
    const dailyPath = join(DAILY_DIR, dailyFile);
    let content = readFileSync(dailyPath, 'utf-8');
    
    let contentChanged = false;

    const linkRegex = /\/news\/([a-z0-9]{12})/g;
    const newContent = content.replace(linkRegex, (fullMatch, slug) => {
      const oldNewsPath = join(NEWS_DIR, `${slug}.md`);
      const dateDir = join(NEWS_DIR, dateStr);
      const newNewsPath = join(dateDir, `${slug}.md`);
      
      if (existsSync(oldNewsPath)) {
        if (!existsSync(dateDir)) {
          mkdirSync(dateDir, { recursive: true });
        }
        renameSync(oldNewsPath, newNewsPath);
        migratedCount++;
        contentChanged = true;
        return `/news/${dateStr}/${slug}`;
      }
      
      if (existsSync(newNewsPath)) {
        if (fullMatch !== `/news/${dateStr}/${slug}`) {
            contentChanged = true;
            return `/news/${dateStr}/${slug}`;
        }
      }
      
      const dirs = readdirSync(NEWS_DIR, { withFileTypes: true });
      for (const dir of dirs) {
        if (dir.isDirectory()) {
          if (existsSync(join(NEWS_DIR, dir.name, `${slug}.md`))) {
            const correctLink = `/news/${dir.name}/${slug}`;
            if (fullMatch !== correctLink) {
              contentChanged = true;
              return correctLink;
            }
            return fullMatch;
          }
        }
      }

      return fullMatch;
    });

    if (contentChanged) {
      writeFileSync(dailyPath, newContent, 'utf-8');
      updatedDailyCount++;
    }
  }

  console.log(`Migrated ${migratedCount} news files.`);
  console.log(`Updated ${updatedDailyCount} daily files.`);
}

main();

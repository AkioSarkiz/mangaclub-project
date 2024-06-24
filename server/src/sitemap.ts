import 'dotenv/config';

import { SitemapItemLoose, SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { client, db } from './db/connection.js';
import { fileURLToPath } from 'url';
import { Mangas } from './db/schema.js';
import { count } from 'drizzle-orm';
import dayjs from 'dayjs';

if (!process.env.APP_URL || !process.env.FRONT_URL) {
  throw Error('APP_URL and FRONT_URL are required');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHUNK_SIZE = 30_000;
const appUrl = new URL(process.env.APP_URL);
const frontUrl = new URL(process.env.FRONT_URL);

async function generateSitemaps() {
  const totalMangas = await db.select({ count: count() }).from(Mangas);
  const numberOfMangasChunks = Math.ceil(totalMangas[0].count / CHUNK_SIZE);
  const sitemapIndexUrls: string[] = [];

  for (let i = 0; i < numberOfMangasChunks; i++) {
    const offset = i * CHUNK_SIZE;
    const mangas = await db.query.Mangas.findMany({ offset: offset, limit: CHUNK_SIZE });
    const sitemapStream = new SitemapStream({ hostname: frontUrl.origin });
    const sitemapPath = path.join(__dirname, '../../public', `sitemap-${i + 1}.xml`);

    if (!existsSync(path.dirname(sitemapPath))) {
      mkdirSync(path.dirname(sitemapPath), { recursive: true });
    }

    const writeStream = createWriteStream(sitemapPath);

    sitemapStream.pipe(writeStream);
    mangas.forEach((manga) => {
      const sitemapItem: SitemapItemLoose = { url: `manga/${manga.id}` };

      if (manga.updatedAt) {
        sitemapItem.lastmod = dayjs(manga.updatedAt).toISOString();
      }

      sitemapStream.write(sitemapItem);
    });

    sitemapStream.end();

    await streamToPromise(sitemapStream);

    sitemapIndexUrls.push(`https://${appUrl.host}/data/sitemap-${i + 1}.xml`);
  }

  // Generate Sitemap Index
  const sitemapIndexStream = new SitemapStream({ hostname: `https://${frontUrl.host}` });
  const sitemapIndexPath = path.join(__dirname, '../../public', 'sitemap-index.xml');
  const indexWriteStream = createWriteStream(sitemapIndexPath);

  sitemapIndexStream.pipe(indexWriteStream);
  sitemapIndexUrls.forEach((sitemapUrl) => sitemapIndexStream.write({ url: sitemapUrl }));
  sitemapIndexStream.end();

  await streamToPromise(sitemapIndexStream);
}

try {
  await generateSitemaps();
  console.log('Sitemaps generated successfully.');
} catch (error) {
  console.error('Error generating sitemaps:', error);
}

await client.end();

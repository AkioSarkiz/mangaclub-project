import './bootstrap.js';

import { getMangaDetails, getTopMangaList } from 'mangaland-scraper';
import { sync } from '../manga-sync.js';
import { logger } from '../logger.js';

for (let i = 0; i < 10; i++) {
  const mangaList = await getTopMangaList(i + 1);

  for (const mangaItem of mangaList) {
    if (!mangaItem.link) {
      console.log(`Skipping manga ${mangaItem.title} because it has no link`);
      continue;
    }

    const mangaId = mangaItem.link.split('/').slice(-2).shift();

    if (!mangaId) {
      console.log(`Skipping manga ${mangaItem.title} because it has no id`);
      continue;
    }

    const detailedManga = await getMangaDetails(mangaId);

    // FIXME: chapters are not being saved
    await sync(detailedManga, logger);

    console.log(`Synced manga ${mangaItem.title} (${mangaId})`);
  }
}

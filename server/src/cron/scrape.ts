import { getMangaDetails, getTopMangaList } from "mangaland-scraper";
import { MangaSyncService } from "../services/manga-sync.service";

for (let i = 0; i < 10; i++) {
  const mangaList = await getTopMangaList();

  for (const mangaItem of mangaList) {
    if (!mangaItem.link) {
      console.log(`Skipping manga ${mangaItem.title} because it has no link`);
      continue;
    }

    const detailedManga = await getMangaDetails(mangaItem.link);

    await MangaSyncService.syncDetailedManga(detailedManga);
  }
}

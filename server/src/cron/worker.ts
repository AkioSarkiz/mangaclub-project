import { getDetailedManga, getFrames } from 'scraper-read-manga';
import { workerData, parentPort } from 'worker_threads';
import { client, db } from '../db/connection.js';
import { and, eq } from 'drizzle-orm';
import { MangaChapterFrames, MangaChapters, MangaGenres, MangaGenresToMangas, Mangas, Sources } from '../db/schema.js';
import { logger } from '../logger.js';

const { manga, sourceName } = workerData;
const detailed = await getDetailedManga(manga.link);

if (!detailed) {
  logger.error('No detailed manga');
  process.exit();
}

if (!detailed.cover) {
  logger.error('No cover');
  process.exit();
}

let source = await db.query.Sources.findFirst({
  where: eq(Sources.name, sourceName),
});

if (!source) {
  const result = await db
    .insert(Sources)
    .values({
      name: sourceName,
    })
    .returning();

  source = result[0];
}

let dbManga = await db.query.Mangas.findFirst({
  where: and(eq(Mangas.sourceId, source.id), eq(Mangas.externalId, manga.link)),
});

if (!dbManga) {
  const result = await db
    .insert(Mangas)
    .values({
      externalId: manga.link,
      sourceId: source.id,
      title: detailed.title,
      description: detailed.description,
      cover: detailed.cover,
      type: detailed.type,
      releaseYear: detailed.releaseYear,
      artist: detailed.artist,
      author: detailed.author.name,
      status: detailed.status,
      url: manga.link,
    })
    .returning();

  dbManga = result[0];
} else {
  await db
    .update(Mangas)
    .set({
      title: detailed.title,
      description: detailed.description,
      cover: detailed.cover,
      type: detailed.type,
      releaseYear: detailed.releaseYear,
      artist: detailed.artist,
      author: detailed.author.name,
      status: detailed.status,
      url: manga.link,
    })
    .where(eq(Mangas.id, dbManga.id));
}

logger.info(`Syncing manga ${manga.title} (${dbManga.id})`);

for (const genre of detailed.genres) {
  let dbGenre = await db.query.MangaGenres.findFirst({
    where: eq(MangaGenres.name, genre),
  });

  if (!dbGenre) {
    const result = await db
      .insert(MangaGenres)
      .values({
        name: genre,
      })
      .returning();

    dbGenre = result[0];
  }

  const dbGenreToManga = await db.query.MangaGenresToMangas.findFirst({
    where: and(eq(MangaGenresToMangas.mangaId, dbManga.id), eq(MangaGenresToMangas.genreId, dbGenre.id)),
  });

  if (!dbGenreToManga) {
    await db.insert(MangaGenresToMangas).values({
      mangaId: dbManga.id,
      genreId: dbGenre.id,
    });
  }

  logger.info(`Syncing genre ${genre} (${dbGenre.id}) for manga ${detailed.title} (${dbManga.id})`);
}

for (const chapter of detailed.chapters) {
  if (!chapter.link) {
    console.log(`Skipping chapter ${chapter.title} because it has no link`);
    continue;
  }

  let dbChapter = await db.query.MangaChapters.findFirst({
    where: and(eq(MangaChapters.mangaId, dbManga.id), eq(MangaChapters.externalId, chapter.link)),
  });

  if (!dbChapter) {
    const result = await db
      .insert(MangaChapters)
      .values({
        date: new Date().toISOString(),
        link: chapter.link,
        title: chapter.title || '',
        sourceId: source.id,
        mangaId: dbManga.id,
        externalId: chapter.link,
      })
      .returning();

    dbChapter = result[0];
  }

  logger.info(`Syncing chapter ${chapter.title} (${dbChapter.id}) for manga ${detailed.title} (${dbManga.id})`);

  try {
    const frames = await getFrames(chapter.link);

    for (const frame of frames) {
      const dbChapterFrame = await db.query.MangaChapterFrames.findFirst({
        where: and(eq(MangaChapterFrames.chapterId, dbChapter.id), eq(MangaChapterFrames.index, frame.index)),
      });

      if (dbChapterFrame) {
        await db
          .update(MangaChapterFrames)
          .set({ image: frame.src })
          .where(eq(MangaChapterFrames.id, dbChapterFrame.id));
        logger.info(
          `Updated frame ${frame.index} for chapter ${chapter.title} (${dbChapter.id}) for manga ${detailed.title} (${dbManga.id})`,
        );
        continue;
      }

      await db.insert(MangaChapterFrames).values({
        index: frame.index,
        image: frame.src,
        chapterId: dbChapter.id,
      });

      logger.info('created frame ' + frame.index + ' for chapter ' + chapter.title + ' (' + dbChapter.id + ')');
    }
  } catch (e) {
    console.error(chapter);
  }
}

await client.end();

parentPort?.postMessage(undefined);

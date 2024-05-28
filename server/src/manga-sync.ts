// -------------------------------------------------------------------------------------------------------------------------------------------------
// Here's the main file for the manga-sync service. This service is responsible for syncing manga data from the source to the database.
// -------------------------------------------------------------------------------------------------------------------------------------------------

import { DetailedManga, getChapterImages } from 'mangaland-scraper';
import {
  InsertedManga,
  MangaChapterFrames,
  MangaChapters,
  MangaGenres,
  MangaGenresToMangas,
  Mangas,
  SelectedManga,
  Sources,
} from './db/schema.js';
import { db } from './db/connection.js';
import _ from 'lodash';
import { and, eq } from 'drizzle-orm';
import { dayjs } from './lib/dayjs.js';
import { parseRelativeDate } from './utils/index.js';
import { Logger } from 'winston';

const syncColumns = ['description', 'title', 'url', 'type', 'author', 'artist', 'cover', 'releaseYear', 'status'];

const getSourceId = async (): Promise<string> => {
  const source = await db.query.Sources.findFirst({
    where: eq(Sources.name, 'MangaRead'),
  });

  if (source) {
    return source.id;
  }

  const inserted = _.head(
    await db
      .insert(Sources)
      .values({
        name: 'MangaRead',
      })
      .returning(),
  );

  if (!inserted) {
    throw Error('Failed to insert source');
  }

  return inserted.id;
};

const syncGenres = async (detailedManga: DetailedManga, mangaId: string, logger?: Logger): Promise<void> => {
  const genresIds: string[] = [];

  for (const genre of detailedManga.genres) {
    const dbGenre = await db.query.MangaGenres.findFirst({
      where: eq(MangaGenres.name, genre),
    });

    if (!dbGenre) {
      logger?.info(`Inserting genre ${genre}`);
      const inserted = _.head(
        await db
          .insert(MangaGenres)
          .values({
            name: genre,
          })
          .returning(),
      );

      if (!inserted) {
        throw Error('Failed to insert genre');
      }

      genresIds.push(inserted.id);
    } else {
      genresIds.push(dbGenre.id);
    }
  }

  for (const genreId of genresIds) {
    try {
      await db.insert(MangaGenresToMangas).values({
        genreId,
        mangaId,
      });
    } catch (e) {
      // @ts-ignore
      if (e.code !== '23505') {
        throw e;
      }
    }
  }
};

const getSyncColumnsData = (manga: DetailedManga): any => {
  const data: any = {};

  for (const column of syncColumns) {
    // @ts-ignore
    data[column] = manga[column];
  }

  return data;
};

const syncChapters = async (manga: DetailedManga, dbMangaId: string, logger?: Logger): Promise<void> => {
  for (const chapter of manga.chapters) {
    if (!chapter.link) {
      throw Error('Chapter link is required');
    }

    let chapterModel = await db.query.MangaChapters.findFirst({
      where: and(eq(MangaChapters.mangaId, dbMangaId), eq(MangaChapters.externalId, chapter.link)),
    });

    let date = undefined;

    try {
      date = dayjs(chapter.date, 'DD.MM.YYYY').toDate().toISOString();
    } catch (e) {
      date = parseRelativeDate(chapter.date).toISOString();
    }

    if (!chapterModel) {
      logger?.info(`Inserting chapter ${chapter.title}`);
      const result = await db
        .insert(MangaChapters)
        .values({
          mangaId: dbMangaId,
          externalId: chapter.link,
          link: chapter.link,
          title: chapter.title,
          date,
          sourceId: await getSourceId(),
        })
        .returning();

      chapterModel = result[0];
    } else {
      logger?.info(`Updating chapter ${chapter.title}`);
      await db
        .update(MangaChapters)
        .set({
          title: chapter.title,
          date,
          link: chapter.link,
        })
        .where(eq(MangaChapters.id, chapterModel.id));
    }

    const frames = await getChapterImages(chapterModel.link);

    for (const frame of frames) {
      if (!frame.src) {
        throw Error('Frame src is required');
      }

      try {
        logger?.info(`Inserting frame ${frame.src}`);
        await db.insert(MangaChapterFrames).values({
          chapterId: chapterModel.id,
          image: frame.src,
          index: frame.index,
        });
      } catch (e) {
        // @ts-ignore
        if (e.code !== '23505') {
          throw e;
        }
      }
    }
  }
};

const sync = async (manga: DetailedManga, logger?: Logger) => {
  const sourceId = await getSourceId();

  let dbManga: InsertedManga | SelectedManga | undefined = await db.query.Mangas.findFirst({
    where: and(eq(Mangas.externalId, manga.url), eq(Mangas.sourceId, sourceId)),
  });

  if (dbManga) {
    logger?.info(`Updating manga ${manga.title}`);
    await db.update(Mangas).set(getSyncColumnsData(manga)).where(eq(Mangas.externalId, manga.url));
  } else {
    logger?.info(`Inserting manga ${manga.title}`);
    const items = await db
      .insert(Mangas)
      .values({
        ...getSyncColumnsData(manga),
        externalId: manga.url,
        sourceId,
      })
      .returning();

    if (items[0]) {
      dbManga = items[0];
    } else {
      throw Error('Failed to insert manga');
    }
  }

  await syncGenres(manga, dbManga.id!, logger);
  await syncChapters(manga, dbManga.id!, logger);
};

export { sync };

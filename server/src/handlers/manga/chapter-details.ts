import { getChapterImages } from 'mangaland-scraper';
import { remember } from '../../cache.js';
import { HonoBase } from 'hono/hono-base';
import { db } from '../../db/connection.js';
import { and, eq } from 'drizzle-orm';
import { MangaChapters } from '../../db/schema.js';

export const registerChapterList = (mangaRouter: HonoBase) => {
  mangaRouter.get('/:externalId/chapters/:title', async (c) => {
    const externalId = c.req.param('externalId');
    const chapterId = c.req.param('title');
    const externalMangaChapterId = `https://www.mangaread.org/manga/${externalId}/${chapterId}/`;

    const chapter = await db.query.MangaChapters.findFirst({
      where: eq(MangaChapters.externalId, externalMangaChapterId),
      with: {
        frames: true,
      },
    });

    if (!chapter) {
      return c.json({ error: 'Chapter not found' }, 404);
    }

    return c.json({ frames: chapter.frames });
  });
};

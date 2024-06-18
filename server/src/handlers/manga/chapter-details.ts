import { HonoBase } from 'hono/hono-base';
import { db } from '../../db/connection.js';
import { and, eq } from 'drizzle-orm';
import { MangaChapters } from '../../db/schema.js';

export const registerChapterList = (mangaRouter: HonoBase) => {
  mangaRouter.get('/:externalMangaId/chapters/:externalChapterId', async (c) => {
    const externalMangaId = c.req.param('externalMangaId');
    const externalChapterId = c.req.param('externalChapterId');

    const chapter = await db.query.MangaChapters.findFirst({
      where: and(eq(MangaChapters.id, externalChapterId), eq(MangaChapters.mangaId, externalMangaId)),
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

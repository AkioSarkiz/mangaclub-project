import { HonoBase } from 'hono/hono-base';
import { db } from '../../db/connection.js';
import { eq } from 'drizzle-orm';
import { Mangas } from '../../db/schema.js';

export const registerShow = (mangaRouter: HonoBase) => {
  mangaRouter.get('/:slug', async (c) => {
    const slug = c.req.param('slug');
    const externalId = `https://www.mangaread.org/manga/${slug}/`;

    const detailedManga = await db.query.Mangas.findFirst({
      where: eq(Mangas.externalId, externalId),
      with: {
        chapters: true,
        genres: {
          columns: {},
          with: {
            genre: { columns: { name: true, id: true } },
          },
        },
      },
    });

    if (detailedManga) {
      return c.json(detailedManga);
    }

    return c.json({ message: 'Manga not found' }, { status: 404 });
  });
};

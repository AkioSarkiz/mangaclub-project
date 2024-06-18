import { HonoBase } from 'hono/hono-base';
import { db } from '../../db/connection.js';
import { eq, or } from 'drizzle-orm';
import { Mangas } from '../../db/schema.js';
import validator from 'validator';

export const registerShow = (mangaRouter: HonoBase) => {
  mangaRouter.get('/:slug', async (c) => {
    const slug = c.req.param('slug');
    const externalId = `https://rmanga.app/${slug}`;

    console.log(externalId);

    const detailedManga = await db.query.Mangas.findFirst({
      where: or(eq(Mangas.externalId, externalId), eq(Mangas.id, slug).if(validator.isUUID(slug))),
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

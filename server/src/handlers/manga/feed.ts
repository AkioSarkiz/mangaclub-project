import { HonoBase } from 'hono/hono-base';
import { db } from '../../db/connection';
import { desc } from 'drizzle-orm';
import { Mangas } from '../../db/schema.js';
import { transform } from '../../transformers/manga-compact.js';

export const registerFeed = (mangaRouter: HonoBase) => {
  mangaRouter.get('/feed', async (c) => {
    let page = 1;

    if (c.req.query('p')) {
      page = Number(c.req.query('p'));
    }

    const mangas = await db.query.Mangas.findMany({
      limit: 40,
      offset: (page - 1) * 40,
      orderBy: [desc(Mangas.createdAt)],
    });

    return c.json(mangas.map((manga) => transform(manga)));
  });
};

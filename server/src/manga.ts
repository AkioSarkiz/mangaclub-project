import { Hono } from "hono";
import {
  getChapterImages,
  getMangaDetails,
  getMangaFeed,
} from "mangaland-scraper";
import { remember } from "./cache";

const mangaRouter = new Hono();

mangaRouter.get("/feed", async (c) => {
  let page = 1;

  if (c.req.query("p")) {
    page = Number(c.req.query("p"));
  }

  const feed = await getMangaFeed(page);

  return c.json(
    feed.map((item) => {
      if (!item.cover) {
        return item;
      }

      const url = new URL(item.cover);

      return {
        ...item,
        cover: new URL(`${url.host}/${url.pathname}`, "https://i2.wp.com").href,
      };
    })
  );
});

mangaRouter.get("/:slug", async (c) => {
  return c.json(
    await remember(`manga:${c.req.param("slug")}`, 3600, async () => {
      const manga = await getMangaDetails(c.req.param("slug"));

      if (manga.cover) {
        const url = new URL(manga.cover);

        manga.cover = new URL(
          `${url.host}/${url.pathname}`,
          "https://i2.wp.com"
        ).href;
      }

      return manga;
    })
  );
});

mangaRouter.get("/:slug/chapters/:chapter-id", async (c) => {
  return c.json(
    await remember(`chapter:${c.req.param("chapter-id")}`, 3600, async () => {
      const chapterId = c.req.param("chapter-id");
      const slug = c.req.param("slug");

      if (!chapterId || !slug) {
        return c.json({ error: "Chapter not found" }, 404);
      }

      const url = `https://www.mangaread.org/manga/${slug}/${chapterId}/`;
      const chapters = await getChapterImages(url);

      return chapters.map((chapter) => {
        const url = new URL(chapter.src!);

        return {
          url: new URL(`${url.host}/${url.pathname}`, "https://i2.wp.com").href,
        };
      });
    })
  );
});

export { mangaRouter };

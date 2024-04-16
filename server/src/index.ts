import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {
  getChapterImages,
  getMangaDetails,
  getMangaFeed,
} from "mangaland-scraper";
import { cors } from "hono/cors";
import _ from "lodash";

const app = new Hono();

app.use("/*", cors());

app.get("/feed", async (c) => {
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

app.get("/manga/:slug", async (c) => {
  const manga = await getMangaDetails(c.req.param("slug"));

  if (manga.cover) {
    const url = new URL(manga.cover);

    manga.cover = new URL(
      `${url.host}/${url.pathname}`,
      "https://i2.wp.com"
    ).href;
  }

  return c.json(manga);
});

app.get("manga/:slug/chapters/:chapter-id", async (c) => {
  const chapterId = c.req.param("chapter-id");
  const slug = c.req.param("slug");

  if (!chapterId || !slug) {
    return c.json({ error: "Chapter not found" }, 404);
  }

  const url = `https://www.mangaread.org/manga/${slug}/${chapterId}/`;
  const chapters = await getChapterImages(url);

  return c.json(
    chapters.map((chapter) => {
      const url = new URL(chapter.src!);

      return {
        url: new URL(`${url.host}/${url.pathname}`, "https://i2.wp.com").href,
      };
    })
  );
});

const port = 8080;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

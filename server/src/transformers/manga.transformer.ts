export class MangaTransformer {
  static async transform(manga: any) {
    if (!manga.cover) {
      return manga;
    }

    if (manga.link) {
      const url = new URL(manga.link);

      manga.link = new URL(url.pathname, process.env.APP_URL).href;
    }

    const url = new URL(manga.cover);

    return {
      ...manga,
      cover: new URL(`${url.host}/${url.pathname}`, "https://i2.wp.com").href,
    };
  }
}

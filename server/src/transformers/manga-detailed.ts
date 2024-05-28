import { InsertedManga, SelectedManga } from '../db/schema';

export class MangaTransformer {
  // TODO: remove any when it will be replaced with SelectedManga or InsertedManga.
  static transform(manga: SelectedManga | InsertedManga | any) {
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
      cover: new URL(`${url.host}/${url.pathname}`, 'https://i2.wp.com').href,
    };
  }

  static transformDetailed(manga: SelectedManga | InsertedManga) {
    return {
      id: manga.id,
      title: manga.title,
      cover: manga.cover,
      description: manga.description,
      artist: manga.artist,
      status: manga.status,
      releaseYear: manga.releaseYear,
      type: manga.type,
      url: manga.url,
    };
  }

  static transformToUndetailed(manga: SelectedManga | InsertedManga) {
    return {
      id: manga.id,
      title: manga.title,
      cover: manga.cover,
      link: manga.url,
    };
  }
}

export const transform = (manga: SelectedManga | InsertedManga) => {
  return {
    id: manga.id,
    title: manga.title,
    cover: manga.cover,
    description: manga.description,
    artist: manga.artist,
    status: manga.status,
    releaseYear: manga.releaseYear,
    type: manga.type,
    url: manga.url,
  };
};

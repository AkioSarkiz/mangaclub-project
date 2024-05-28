import { InsertedManga, SelectedManga } from '../db/schema';

export const transform = (manga: SelectedManga | InsertedManga) => {
  return {
    id: manga.id,
    title: manga.title,
    cover: manga.cover,
    link: manga.url,
  };
};

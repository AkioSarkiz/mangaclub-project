export interface MangaFrame {
  id: number;
  url: string;
}

export interface MangaChapter {
  id: number;
  title: string;
  link: string;
  name?: string;
  index: number;
}

export interface Manga {
  id: number;
  title: string;
  cover: string;
  description: string;
  year: number;
  rating: 1 | 2 | 3 | 4 | 5;
  type: string;
  genres: string[];

  chapters: MangaChapter[];
}
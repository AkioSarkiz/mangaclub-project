export interface MangaFrame {
  id: number;
  image: string;
}

export interface MangaChapter {
  id: string;
  title: string;
  link: string;
  name?: string;
  index: number;
}

export interface Manga {
  id: string;
  title: string;
  cover: string;
  description: string;
  year: number;
  rating: 1 | 2 | 3 | 4 | 5;
  type: string;
  genres: { genre: { name: string; id: string } }[];

  chapters: MangaChapter[];
}

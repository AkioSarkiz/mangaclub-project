export interface DetailedManga {
  id: string;
  url: string;
  title: string;
  genres: string[];
  type: string | null;
  author: string;
  releaseYear: number | null;
  status: string | null;
  artist: string;
  description: string;
  cover: string | null;
  chapters: DetailedChapter[];
}

export interface DetailedChapter {
  title: string;
  link?: string;
  date: string;
}

export interface ScrapedDetailedManga {
  id: string
  url: string
  title: string
  genres: string[]
  type: string | null
  author: {
    name: string
    link: string | null
  }
  releaseYear: number | null
  status: string | null
  artist: string
  description: string
  cover: string | null
  chapters: {
    title: string | null
    link: string | null
  }[]
}

export interface SearchedManga {
  name: string
  link: string
  description: string
}

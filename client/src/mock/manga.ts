import type { Manga, MangaFrame } from "../types/manga";

export const manga: Manga = {
  id: 123,
  cover: "https://avt.mkklcdnv6temp.com/18/f/1-1583464405.jpg",
  description: `One punch-Man imitates the life of an average hero who wins all of his fights with only one punch! This is why he is called Onepunch man Manga. This story takes place in the fictional Z-City. The world is full of mysterious beings, villains and monsters that cause destruction and havoc. An association of heroes has been established to protect the citizens from all harms and enemies. People with superhuman ability can register themselves with the association that protects citizens. There, they will be required to take a series of tests to determine their ability and what class they are. Class S being the highest and class C being the lowest.`,
  title: "One punch man",
  year: 2012,
  type: "manga",
  rating: 4,

  chapters: [
    {
      id: 1221,
      index: 0,
      name: "Intro",
    },
    {
      id: 1222,
      index: 1,
      name: "Start",
    },
    {
      id: 1223,
      index: 2,
    },
    {
      id: 1224,
      index: 3,
      name: "End",
    },
  ],
};

export const mangaFrames: MangaFrame[] = [
  {
    id: 1,
    url: "https://www.mangaread.org/wp-content/uploads/WP-manga/data/manga_62cfe18a052d6/b1fbaf80adf5e0cee6f6ecc4d9c0963b/4.jpeg",
  },
  {
    id: 2,
    url: "https://www.mangaread.org/wp-content/uploads/WP-manga/data/manga_62cfe18a052d6/b1fbaf80adf5e0cee6f6ecc4d9c0963b/5.jpeg",
  },
  {
    id: 3,
    url: "https://www.mangaread.org/wp-content/uploads/WP-manga/data/manga_62cfe18a052d6/b1fbaf80adf5e0cee6f6ecc4d9c0963b/6.jpeg",
  },
];

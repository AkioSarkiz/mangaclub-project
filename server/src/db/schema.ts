import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  text,
  timestamp,
  pgTable,
  integer,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";

// --------------------------------------------

export const Sources = pgTable("sources", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique(),
});

// --------------------------------------------

export const MangaGenres = pgTable("manga_genres", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique(),
});

export const MangaGenresRelations = relations(MangaGenres, ({ many }) => ({
  mangas: many(Mangas),
}));

// --------------------------------------------

export const MangaChapters = pgTable("manga_chapters", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  link: text("link").notNull().unique(),
  date: timestamp("date").notNull(),

  externalId: text("external_id").notNull().unique(),

  sourceId: uuid("source_id")
    .notNull()
    .references(() => Sources.id),

  mangaId: uuid("manga_id")
    .notNull()
    .references(() => Mangas.id),
});

export const MangaChaptersRelations = relations(MangaChapters, ({ one }) => ({
  source: one(Sources, {
    fields: [MangaChapters.externalId],
    references: [Sources.id],
  }),
  manga: one(Mangas, {
    fields: [MangaChapters.mangaId],
    references: [Mangas.id],
  }),
}));

// --------------------------------------------

export const Mangas = pgTable("mangas", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  type: text("type"),
  author: text("author").notNull(),
  releaseYear: integer("release_year"),
  status: text("status"),
  artist: text("artist").notNull(),
  description: text("description").notNull(),
  cover: text("cover"),

  externalId: text("external_id").notNull().unique(),
  sourceId: uuid("source_id")
    .notNull()
    .references(() => Sources.id),
});

export const MangaRelations = relations(Mangas, ({ many }) => ({
  genres: many(MangaGenres),
  chapters: many(MangaChapters),
}));

// --------------------------------------------

export const MangaGenresToMangas = pgTable(
  "manga_genres_to_mangas",
  {
    mangaId: uuid("manga_id")
      .notNull()
      .references(() => Mangas.id),
    genreId: uuid("genre_id")
      .notNull()
      .references(() => MangaGenres.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.mangaId, t.genreId] }),
  })
);

export const MangaGenresToMangasRelations = relations(
  MangaGenresToMangas,
  ({ one }) => ({
    group: one(Mangas, {
      fields: [MangaGenresToMangas.mangaId],
      references: [Mangas.id],
    }),
    user: one(MangaGenres, {
      fields: [MangaGenresToMangas.genreId],
      references: [MangaGenres.id],
    }),
  })
);

// --------------------------------------------
//  Types
// --------------------------------------------

export type SelectedManga = InferSelectModel<typeof Mangas>;
export type InsertedManga = InferInsertModel<typeof Mangas>;

export type SelectedMangaGenres = InferSelectModel<typeof MangaGenres>;
export type InsertedMangaGenres = InferInsertModel<typeof MangaGenres>;

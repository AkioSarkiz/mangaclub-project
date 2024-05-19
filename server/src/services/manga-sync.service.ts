import { DetailedManga } from "mangaland-scraper";
import { db } from "../db/connection";
import {
  InsertedManga,
  MangaGenres,
  MangaGenresToMangas,
  Mangas,
  SelectedManga,
  Sources,
} from "../db/schema";
import { and, eq } from "drizzle-orm";
import _ from "lodash";
export class MangaSyncService {
  private static syncColumns = [
    "description",
    "title",
    "url",
    "type",
    "author",
    "artist",
    "cover",
    "releaseYear",
    "status",
  ];

  private static async getSourceId(): Promise<string> {
    const source = await db.query.Sources.findFirst({
      where: eq(Sources.name, "MangaRead"),
    });

    if (source) {
      return source.id;
    }

    const inserted = _.head(
      await db
        .insert(Sources)
        .values({
          name: "MangaRead",
        })
        .returning()
    );

    if (!inserted) {
      throw Error("Failed to insert source");
    }

    return inserted.id;
  }

  private static getSyncColumnsData(manga: DetailedManga): any {
    const data: any = {};

    for (const column of MangaSyncService.syncColumns) {
      // @ts-ignore
      data[column] = manga[column];
    }

    return data;
  }

  private static async syncGenres(detailedManga: DetailedManga): Promise<void> {
    const genresIds: string[] = [];

    for (const genre of detailedManga.genres) {
      const genreId = await db.query.MangaGenres.findFirst({
        where: eq(MangaGenres.name, genre),
      });

      if (!genreId) {
        const inserted = _.head(
          await db
            .insert(MangaGenres)
            .values({
              name: genre,
            })
            .returning()
        );

        if (!inserted) {
          throw Error("Failed to insert genre");
        }

        genresIds.push(inserted.id);
      } else {
        genresIds.push(genreId.id);
      }
    }

    for (const genreId of genresIds) {
      await db.insert(MangaGenresToMangas).values({
        genreId,
        mangaId: detailedManga.id,
      });
    }
  }

  public static async syncDetailedManga(manga: DetailedManga): Promise<void> {
    const sourceId = await this.getSourceId();
    let dbManga: InsertedManga | SelectedManga | undefined =
      await db.query.Mangas.findFirst({
        where: and(
          eq(Mangas.externalId, manga.url),
          eq(Mangas.sourceId, sourceId)
        ),
      });

    if (dbManga) {
      await db
        .update(Mangas)
        .set(this.getSyncColumnsData(manga))
        .where(eq(Mangas.externalId, manga.url));
    } else {
      const items = await db
        .insert(Mangas)
        .values({
          ...this.getSyncColumnsData(manga),
          externalId: manga.url,
          sourceId: sourceId,
        })
        .returning();

      if (items[0]) {
        dbManga = items[0];
      } else {
        throw Error("Failed to insert manga");
      }
    }

    await this.syncGenres(manga);
  }
}

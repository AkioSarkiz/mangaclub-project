CREATE TABLE IF NOT EXISTS "manga_genres_to_mangas" (
	"manga_id" uuid NOT NULL,
	"genre_id" uuid NOT NULL,
	CONSTRAINT "manga_genres_to_mangas_manga_id_genre_id_pk" PRIMARY KEY("manga_id","genre_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manga_genres_to_mangas" ADD CONSTRAINT "manga_genres_to_mangas_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "mangas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manga_genres_to_mangas" ADD CONSTRAINT "manga_genres_to_mangas_genre_id_manga_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "manga_genres"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

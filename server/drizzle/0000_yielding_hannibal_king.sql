CREATE TABLE IF NOT EXISTS "manga_chapters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"link" text NOT NULL,
	"date" timestamp NOT NULL,
	"external_id" text NOT NULL,
	"source_id" uuid NOT NULL,
	"manga_id" uuid NOT NULL,
	CONSTRAINT "manga_chapters_link_unique" UNIQUE("link"),
	CONSTRAINT "manga_chapters_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manga_genres" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	CONSTRAINT "manga_genres_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mangas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"type" text,
	"author" text NOT NULL,
	"release_year" integer,
	"status" text,
	"artist" text NOT NULL,
	"description" text NOT NULL,
	"cover" text,
	"external_id" text NOT NULL,
	"source_id" uuid NOT NULL,
	CONSTRAINT "mangas_external_id_unique" UNIQUE("external_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sources" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	CONSTRAINT "sources_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manga_chapters" ADD CONSTRAINT "manga_chapters_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manga_chapters" ADD CONSTRAINT "manga_chapters_manga_id_mangas_id_fk" FOREIGN KEY ("manga_id") REFERENCES "mangas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mangas" ADD CONSTRAINT "mangas_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

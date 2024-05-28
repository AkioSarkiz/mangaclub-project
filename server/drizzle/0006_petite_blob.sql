CREATE TABLE IF NOT EXISTS "manga_chapter_frames" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image" text NOT NULL,
	"chapter_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "manga_chapter_frames_image_unique" UNIQUE("image")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manga_chapter_frames" ADD CONSTRAINT "manga_chapter_frames_chapter_id_manga_chapters_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "manga_chapters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TRIGGER manga_chapter_frames_update_modified_time BEFORE UPDATE ON manga_chapter_frames FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

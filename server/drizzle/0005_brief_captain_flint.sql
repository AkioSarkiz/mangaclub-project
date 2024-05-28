ALTER TABLE "manga_chapters" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "manga_chapters" ALTER COLUMN "date" SET DATA TYPE date;
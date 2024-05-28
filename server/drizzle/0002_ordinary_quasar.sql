ALTER TABLE "manga_chapters" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "manga_chapters" ADD COLUMN "updated)at" timestamp;--> statement-breakpoint
ALTER TABLE "manga_genres" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "manga_genres" ADD COLUMN "updated)at" timestamp;--> statement-breakpoint
ALTER TABLE "mangas" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "mangas" ADD COLUMN "updated)at" timestamp;--> statement-breakpoint
ALTER TABLE "sources" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "sources" ADD COLUMN "updated)at" timestamp;
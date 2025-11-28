ALTER TABLE "request" ALTER COLUMN "seed" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "image" ADD COLUMN "seed" bigint;
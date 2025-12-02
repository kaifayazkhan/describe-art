DROP INDEX "idx_image_requestId";--> statement-breakpoint
CREATE INDEX "idx_image_request_id" ON "image" USING btree ("request_id");
CREATE INDEX "idx_image_requestId" ON "image" USING btree ("request_id");--> statement-breakpoint
CREATE INDEX "idx_request_user_created_at" ON "request" USING btree ("user_id","created_at");
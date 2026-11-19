ALTER TABLE "orders" ADD COLUMN "original_amount" integer;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "discount_amount" integer;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "offer_code" text;--> statement-breakpoint
CREATE UNIQUE INDEX "orders_first_order_offer_user_unique" ON "orders" USING btree ("user_id") WHERE "orders"."offer_code" = 'FIRST_ORDER_20_10';
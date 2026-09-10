ALTER TABLE "orders" ADD COLUMN "payment_method" text DEFAULT 'COD' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "payment_status" text DEFAULT 'PENDING' NOT NULL;
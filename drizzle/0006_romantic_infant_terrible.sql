ALTER TABLE "orders"
ADD COLUMN "writer_assignment_status" text
DEFAULT 'UNASSIGNED' NOT NULL;

-- Preserve existing writer assignments.
UPDATE "orders"
SET "writer_assignment_status" = 'PENDING'
WHERE "writer_id" IS NOT NULL;
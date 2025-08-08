CREATE TABLE IF NOT EXISTS "cart" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"product_id" varchar NOT NULL,
	"quantity" integer NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "cart_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collaboration_participant" (
	"id" varchar PRIMARY KEY NOT NULL,
	"collaboration_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"contribution_quantity" integer,
	"joined_at" timestamp,
	CONSTRAINT "collaboration_participant_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "collaboration" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"initiator_id" varchar NOT NULL,
	"product_id" varchar NOT NULL,
	"target_quantity" integer,
	"current_quantity" integer,
	"unit" text,
	"status" text,
	"deadline" timestamp,
	"created_at" timestamp,
	CONSTRAINT "collaboration_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"product_id" varchar NOT NULL,
	"created_at" timestamp,
	CONSTRAINT "favorite_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment" (
	"id" varchar PRIMARY KEY NOT NULL,
	"transaction_id" varchar NOT NULL,
	"method" text,
	"status" text,
	"amount" integer,
	"paid_at" timestamp,
	"created_at" timestamp,
	CONSTRAINT "payment_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"price" integer,
	"image_urls" text[],
	"unit" text,
	"stock" integer,
	"tags" text[],
	"seller_id" varchar NOT NULL,
	"created_at" timestamp,
	CONSTRAINT "product_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "store" (
	"id" varchar PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"store_name" text,
	"business_id" text,
	"business_type" text,
	"business_description" text,
	"tags" text[],
	"description" text,
	"phone_number" text,
	"address" text,
	"city" text,
	"province" text,
	"postal_code" text,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "store_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" varchar PRIMARY KEY NOT NULL,
	"buyer_id" varchar NOT NULL,
	"seller_id" varchar NOT NULL,
	"total_amount" integer,
	"shipping_method" text,
	"shipping_cost" integer,
	"payment_method" text,
	"status" text,
	"address" text,
	"created_at" timestamp,
	CONSTRAINT "transaction_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction_item" (
	"id" varchar PRIMARY KEY NOT NULL,
	"transaction_id" varchar NOT NULL,
	"product_id" varchar NOT NULL,
	"quantity" integer,
	"unit_price" integer,
	"subtotal" integer,
	CONSTRAINT "transaction_item_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wholesale_price" (
	"id" varchar PRIMARY KEY NOT NULL,
	"product_id" varchar NOT NULL,
	"min_quantity" integer,
	"max_quantity" integer,
	"price" integer,
	CONSTRAINT "wholesale_price_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "store_name";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "business_id";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "business_type";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "city";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "province";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "phone_number";
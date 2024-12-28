CREATE TYPE "public"."status" AS ENUM('archived', 'private', 'public');--> statement-breakpoint
CREATE TABLE "document" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" varchar NOT NULL,
	"user_id" varchar NOT NULL,
	"title" varchar(255) NOT NULL,
	"summary" text,
	"theme_color" varchar(255) DEFAULT '#7c3aed' NOT NULL,
	"thumbnail" text,
	"current_position" integer DEFAULT 1 NOT NULL,
	"status" "status" DEFAULT 'private' NOT NULL,
	"author_name" varchar(255) NOT NULL,
	"author_email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "document_document_id_unique" UNIQUE("document_id")
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"university_name" varchar(255),
	"degree" varchar(255),
	"major" varchar(255),
	"description" text,
	"start_date" date,
	"end_date" date
);
--> statement-breakpoint
CREATE TABLE "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer,
	"title" varchar(255),
	"company_name" varchar(255),
	"city" varchar(255),
	"state" varchar(255),
	"currently_working" boolean DEFAULT false NOT NULL,
	"work_summary" text,
	"start_date" date,
	"end_date" date
);
--> statement-breakpoint
CREATE TABLE "personal_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"job_title" varchar(255),
	"address" varchar(500),
	"phone" varchar(50),
	"email" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"document_id" integer NOT NULL,
	"name" varchar(255),
	"rating" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "education" ADD CONSTRAINT "education_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience" ADD CONSTRAINT "experience_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_info" ADD CONSTRAINT "personal_info_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "skills" ADD CONSTRAINT "skills_document_id_document_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."document"("id") ON DELETE cascade ON UPDATE no action;
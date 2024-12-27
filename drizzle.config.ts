import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./data/drizzle/generated",
  schema: "./data/drizzle/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

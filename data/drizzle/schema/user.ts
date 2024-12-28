import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: varchar().primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  // age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

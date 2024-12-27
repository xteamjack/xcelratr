import { Hono } from "hono";
import { handle } from "hono/vercel";
export const dynamic = "force-dynamic";

import { drizzle } from "drizzle-orm/node-postgres";
// import { eq } from "drizzle-orm";
import { documentTable, userTable } from "@/../data/drizzle/schema/index";

const db = drizzle(process.env.DATABASE_URL!);

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono on Vercel!",
  });
});

app.get("/users", async (c) => {
  const users = await db.select().from(userTable);
  console.log("Getting all users from the database: ", users);

  return c.json({
    message: "Hello from Hono on Vercel!",
    data: users,
  });
});

app.get("/docs", async (c) => {
  const docs = await db.select().from(documentTable);
  console.log("Getting all docs from the database: ", docs);

  return c.json({
    message: "Here are the docs",
    data: docs,
  });
});

app.get("/:wild", (c) => {
  const wild = c.req.param("wild");
  return c.json({
    message: `Hello from Hono on Vercel! You're now on /api/${wild}!`,
  });
});

export const GET = handle(app);

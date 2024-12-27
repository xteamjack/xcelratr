import { Hono } from "hono";
import { handle } from "hono/vercel";
export const dynamic = "force-dynamic";

import { drizzle } from "drizzle-orm/node-postgres";
// import { eq } from "drizzle-orm";
import { usersTable } from "@/../data/drizzle/schema/index";

const db = drizzle(process.env.DATABASE_URL!);

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello from Hono on Vercel!",
  });
});

app.get("/users", async (c) => {
  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);

  return c.json({
    message: "Hello from Hono on Vercel!",
    data: users,
  });
});

app.get("/:wild", (c) => {
  const wild = c.req.param("wild");
  return c.json({
    message: `Hello from Hono on Vercel! You're now on /api/${wild}!`,
  });
});

export const GET = handle(app);

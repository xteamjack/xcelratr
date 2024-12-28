import { db } from "@/../data/drizzle/db";
import { userTable } from "@/../data/drizzle/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Successful authentication, update db");
  // check if user exists
  const { getUser, getOrganization } = getKindeServerSession();
  const authUser = await getUser();
  const kindOrg = await getOrganization();
  console.log("Organization", kindOrg);

  if (!authUser || authUser == null || !authUser.id)
    throw new Error("something went wrong with authentication" + authUser);

  const dbUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, authUser.id));

  if (!dbUser || dbUser.length === 0) {
    console.log("User does not exist, creating");
    await db.insert(userTable).values({
      id: authUser.id,
      firstName: authUser.given_name,
      lastName: authUser.family_name,
      email: authUser.email,
    });
  } else {
    console.log(dbUser);
    console.log("User exists, no need to update");
  }

  console.log("Redirecting to dashboard");
  return NextResponse.redirect("http://localhost:3000/dashboard");
}

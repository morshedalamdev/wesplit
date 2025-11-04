import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import { getCollection } from "./db";
import { ObjectId } from "mongodb";

export const verifySession = cache(async () => {
  const cookieStore = (await cookies()).get("user session")?.value;
  const session = await decrypt(cookieStore);

  const user =
    typeof session?.userId === "string"
      ? session.userId
      : String(session?.userId);

    if (!session?.userId) {
      redirect("/login");
    }

  return { isAuth: true, userId: user };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const userCollection = await getCollection("users");
    if (!userCollection) return { error: { email: "Server error!" } };

    const data = await userCollection.findOne({
      _id: new ObjectId(session?.userId),
    });
    if (data) return session.userId;

    return "user not found in the database!";
  } catch (error) {
    console.error("Failed to fetch user");
  }
});

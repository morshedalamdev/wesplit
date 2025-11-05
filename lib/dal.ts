import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";
import { getCollection } from "./db";
import { ObjectId } from "mongodb";

export const verifySession = cache(async () => {
  const cookieStore = (await cookies()).get("user session")?.value;
  const session = await decrypt(cookieStore);

  const user =
    typeof session?.userId === "string"
      ? session.userId
      : String(session?.userId);
      
      if (user == undefined) {
        return { isAuth: false, userId: undefined };
      }
  return { isAuth: true, userId: user };
});

export const getUserId = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  return session.userId;
});

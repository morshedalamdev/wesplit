import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";

type SessionPayload = {
  userId: string;
};

export const verifyJWT = cache(async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  const session = cookieStore.get("user session")?.value;

  if (session) {
    const user = (await decrypt(session)) as SessionPayload;
    return user;
  }

  return null;
});

export const getUserId = async () => {
  const session = await verifyJWT();
  if (!session) return null;

  return session.userId;
};

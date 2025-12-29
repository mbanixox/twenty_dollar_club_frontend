"use server";

import { cookies } from "next/headers";
import { Session } from "@/lib/types";

export const getSession = async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const userData = cookieStore.get("user_data")?.value;

  if (!token || !userData) {
    return null;
  }

  try {
    const user = JSON.parse(userData);
    return { user, token };
  } catch {
    return null;
  }
}

export const requireAuth = async (): Promise<Session> => {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

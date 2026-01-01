"use server";

import { cookies } from "next/headers";
import { Session } from "@/lib/types";
import { redirect } from "next/navigation";

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

export const requireMembership = async (): Promise<Session> => {
  const session = await requireAuth();

  if (!session.user.membership) {
    redirect("/");
  }

  return session;
}

export const requireAdmin = async (): Promise<Session> => {
  const session = await requireAuth();

  if (session.user.membership?.role !== "admin") {
    redirect("/dashboard/members");
  }

  return session;
}

export const isAdmin = async (): Promise<boolean> => {
  const session = await getSession();
  return session?.user.membership?.role === "admin";
}

export const hasMembership = async (): Promise<boolean> => {
  const session = await getSession();
  return !!session?.user.membership;
}

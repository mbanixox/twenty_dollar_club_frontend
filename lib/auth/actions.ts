"use server";

import { cookies } from "next/headers";
import { User } from "@/lib/types";
import { revalidatePath } from "next/cache";

const base_url = process.env.BACKEND_URL;
const isProduction = process.env.NODE_ENV === "production";

export const signInWithCredentials = async (
  email: string,
  hashed_password: string
) => {
  const res = await fetch(`${base_url}/users/sign_in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, hashed_password }),
  });

  if (!res.ok) {
    throw new Error("Failed to sign in");
  }

  const data = await res.json();
  const token = data.token;
  const user = data.data;

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  cookieStore.set("user_data", JSON.stringify(user), {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return data;
};

export const registerUser = async (formData: FormData) => {
  const rawFormData = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    hashed_password: formData.get("password"),
    phone_number: formData.get("phone"),
    gender: formData.get("gender"),
  };

  const res = await fetch(`${base_url}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: rawFormData }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to register user");
  }

  const data = await res.json();
  const token = data.token;
  const user = data.data;

  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  cookieStore.set("user_data", JSON.stringify(user), {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return data;
};

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
};

export const signOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  cookieStore.delete("user_data");
};

export const updateSession = async (token: string, user: User) => {
  try {

    const cookieStore = await cookies();

    cookieStore.delete("auth_token");
    cookieStore.delete("user_data");

    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    cookieStore.set("user_data", JSON.stringify(user), {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    // Revalidate all paths to ensure fresh data
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
};

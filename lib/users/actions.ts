"use server";

import { getAuthToken } from "@/lib/auth/actions";
import { cookies } from "next/headers";
import { User } from "../types";

const base_url = process.env.BACKEND_URL;

export const updateUserProfile = async (
  id: string,
  user: Partial<Omit<User, "id">>
) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/users/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          id,
          ...user,
        },
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update profile: ${res.status} ${errorText}`);
    }

    const data = await res.json();

    // Update user_data cookie with new information
    if (data.data) {
      const cookieStore = await cookies();
      cookieStore.set("user_data", JSON.stringify(data.data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

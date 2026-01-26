"use server";

import { getAuthToken } from "@/lib/auth/actions";

const base_url = process.env.BACKEND_URL;

export const approveUser = async (user_id: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/admin/users/approve/${user_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to approve user: ${res.status} ${errorText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error approving user:", error);
    throw error;
  }
};

export const rejectUser = async (user_id: string) => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/admin/users/reject/${user_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to reject user: ${res.status} ${errorText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error rejecting user:", error);
    throw error;
  }
};

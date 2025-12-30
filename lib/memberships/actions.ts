import { getAuthToken } from "@/lib/auth/actions";

const base_url = process.env.BACKEND_URL;

export const getMemberships = async () => {
  try {
    const token = await getAuthToken();

    const res = await fetch(`${base_url}/memberships`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to fetch memberships: ${res.status} ${errorText}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching memberships:", error);
    throw error;
  }
};

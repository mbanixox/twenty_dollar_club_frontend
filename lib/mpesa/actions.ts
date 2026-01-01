"use server";

import { getAuthToken } from "@/lib/auth/actions";
import { getSession } from "../auth/session";

const base_url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const membershipPaymentRequest = async (formData: FormData) => {
  const session = await getSession();

  if (!session) {
    return {
      status: "error",
      error: "User does not exist",
    };
  }

  const user = session.user;

  const rawFormData = {
    phone: formData.get("phone"),
    amount: formData.get("amount"),
  };

  const auth_token = await getAuthToken();

  try {
    const res = await fetch(`${base_url}/payments/membership`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify({ email: user.email, ...rawFormData }),
      credentials: "include",
    });

    const data = await res.json();

    if (data.status === "success") {
      return { status: "success", message: data.CustomerMessage };
    } else {
      return { status: "error", error: data.error || "Payment request failed" };
    }
  } catch {
    return {
      status: "error",
      error: "Failed to process payment request",
    };
  }
};

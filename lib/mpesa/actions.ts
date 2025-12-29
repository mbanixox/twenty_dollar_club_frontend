"use server";

import { getAuthToken } from "@/lib/auth/actions";

const base_url = process.env.BACKEND_URL;

export const membershipPaymentRequest = async (formData: FormData) => {
  const rawFormData = {
    phone: formData.get("phone"),
    amount: formData.get("amount"),
  };

  const auth_token = await getAuthToken();
  console.log("Auth Token:", auth_token);

  try {
    const res = await fetch(`${base_url}/payments/membership`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth_token}`,
      },
      body: JSON.stringify(rawFormData),
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

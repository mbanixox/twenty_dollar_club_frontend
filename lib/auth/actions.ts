"use server";

const base_url = process.env.BACKEND_URL;

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

  return res.json();
};

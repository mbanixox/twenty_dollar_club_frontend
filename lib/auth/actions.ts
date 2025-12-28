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
        body: JSON.stringify({ user: rawFormData  }),
    });

    if (!res.ok) {
        throw new Error("Failed to register user");
    }
    return res.json();
};

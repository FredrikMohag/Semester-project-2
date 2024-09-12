import { API_BASE_URL } from "../constants.mjs";
// import { login } from "./login.mjs"; // Om du planerar att använda login, se till att använda den

export async function signUp({ name, email, password, avatarUrl }) {
  const payload = {
    name,
    email,
    password,
    avatar: avatarUrl ? { url: avatarUrl, alt: "User avatar" } : undefined,
  };

  console.log("Sign up payload:", payload);

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to sign up");
  }

  // Example usage of login function
  const signUpData = await response.json();
  console.log("Sign up successful:", signUpData);

  // Optionally log in the user right after sign-up
  await login({ email, password });

  return signUpData;
}

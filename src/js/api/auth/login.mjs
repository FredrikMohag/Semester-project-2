import { API_BASE_URL } from "../constants.mjs";
import { getProfile } from "../profile/profileRead.mjs";
import * as storage from "../../storage/index.mjs";

// Kontrollera att alla importer fungerar
console.log("API_BASE_URL:", API_BASE_URL);
console.log("getProfile:", getProfile);
console.log("storage:", storage);

export async function logIn({ email, password }) {
  const payload = {
    email,
    password,
  };

  console.log("Login payload:", payload);

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData.message);
      throw new Error(errorData.message || "Failed to log in");
    }

    const data = await response.json();
    console.log("Login successful:", data);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

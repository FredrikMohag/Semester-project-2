// src/js/api/auth/logOn.mjs

import { authFetch } from "../authFetch.mjs"; // Korrekt import

export async function login(profile) {
  const loginURL = "/auth/login";
  const body = JSON.stringify(profile);

  console.log("Request body:", body);

  try {
    const response = await authFetch(loginURL, {
      method: "POST",
      body,
    });

    console.log("Login successful:", response);
    return response;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw new Error(`Login error: ${error.message}`);
  }
}

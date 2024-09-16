// src/js/api/auth/register.mjs

import { authFetch } from "../authFetch.mjs"; // Korrekt import

export async function registerUser(profile) {
  const registerEndpoint = "/auth/register"; // Endpoint istället för fullständig URL

  const userProfile = {
    name: profile.name,
    email: profile.email,
    password: profile.password,
    avatar: profile.avatar, // Valfritt
  };

  const body = JSON.stringify(userProfile);

  console.log("Request body:", body);

  try {
    const response = await authFetch(registerEndpoint, {
      method: "POST",
      body,
    });

    console.log("Registration successful:", response);
    return response;
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw new Error(`Registration error: ${error.message}`);
  }
}

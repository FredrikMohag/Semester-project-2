// src/js/api/fetch/getAuthHeaders.mjs

import { API_BASE } from "../constants.mjs";
import * as storage from "../../storage/index.mjs"; // Importera storage

// Funktion för att skapa API-nyckel
export async function createApiKey(apiKeyName = "My API Key") {
  const apiKeyURL = `${API_BASE}/auth/create-api-key`;
  const token = storage.load("token"); // Hämta accessToken från storage

  if (!token) {
    console.error("Access token not found. Please log in first.");
    return null;
  }

  try {
    const response = await fetch(apiKeyURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Använd accessToken för autentisering
      },
      body: JSON.stringify({ name: apiKeyName }), // Skicka namn på API-nyckeln
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Key creation error:", data);
      return null;
    }

    const apiKey = data.data.key;
    console.log("API Key created:", apiKey);

    // Spara API-nyckeln i storage
    storage.save("apiKey", apiKey);
    return apiKey;
  } catch (error) {
    console.error("Error during API Key creation:", error);
    throw error;
  }
}

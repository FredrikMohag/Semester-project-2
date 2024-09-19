import { API_BASE } from "../constants.mjs"; // Importera API_BASE
import * as storage from "../../storage/index.mjs"; // Importera storage

// Funktion för att skapa API-nyckel
export async function createApiKey(
  accessToken,
  apiKeyName = "My API Key name"
) {
  const apiKeyURL = `${API_BASE}/auth/create-api-key`;

  console.log("Creating API Key, URL:", apiKeyURL);
  console.log("AccessToken:", accessToken);

  try {
    const body = JSON.stringify({ name: apiKeyName });

    const response = await fetch(apiKeyURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Använd AccessToken för autentisering
      },
      body, // Skicka namn i request body
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Key creation error:", data);
      return null;
    }

    const apiKey = data.data.key;
    console.log("API Key created:", apiKey);

    // Spara API-nyckeln i localStorage
    storage.save("apiKey", apiKey);
    return apiKey;
  } catch (error) {
    console.error("Error during API Key creation:", error);
    throw error;
  }
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Funktion för att hämta API-nyckeln från servern
export async function getAPIKey() {
  const token = storage.load("token"); // Ladda accessToken från localStorage
  if (!token) {
    console.error("Token not found");
    return null;
  }

  const response = await fetch(`${API_BASE}/auth/create-api-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: "Test key", // Specificera namn på API-nyckeln
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const apiKey = data.data.key;

    // Spara API-nyckeln i localStorage
    storage.save("apiKey", apiKey);
    return apiKey;
  } else {
    console.error("Failed to fetch API key");
    return null;
  }
}

// Funktion för att registrera användare
export async function register(name, email, password) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.error("Registration failed");
    return null;
  }
}

// Funktion för att spara data i localStorage
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Funktion för att läsa data från localStorage
export function load(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

// Funktion för att hämta inlägg (posts)
export async function getPosts() {
  const apiKey = storage.load("apiKey"); // Ladda API-nyckel från localStorage
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }

  const response = await fetch(`${API_BASE}/posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`, // Använd API-nyckeln för att autentisera
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.error("Failed to fetch posts");
    return null;
  }
}

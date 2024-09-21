// src/js/api/fetch/getAuthHeaders.mjs

import * as storage from "../../storage/index.mjs"; // Importera storage

// Hämta headers med token och API-nyckel (om tillgänglig)
export async function getAuthHeaders() {
  const token = storage.load("token"); // Hämta access token från storage
  const apiKey = storage.load("apiKey"); // Hämta API-nyckel från storage

  // Kontrollera att token finns
  if (!token) {
    throw new Error("Access token not found.");
  }

  // Bygg headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Lägg till access token
  };

  // Lägg till API-nyckel om den finns
  if (apiKey) {
    headers["X-Noroff-API-Key"] = apiKey;
  }

  return headers;
}

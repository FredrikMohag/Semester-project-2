// src/js/api/fetch/authFetch.mjs

import { API_KEY, API_BASE } from "../constants.mjs"; // Importera API_KEY och API_BASE
import * as storage from "../../storage/index.mjs"; // Importera storage för accessToken

export async function authFetch(url, fetchMethod = "GET", body = null) {
  try {
    // Hämta access token från storage
    const token = storage.load("token");

    // Kontrollera om access token finns
    if (!token) {
      throw new Error("Access token not found. Please log in.");
    }

    // Bygg headers med access token och API_KEY
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Lägg till access token
      "X-Noroff-API-Key": API_KEY, // Lägg till API_KEY från constants.mjs
    };

    // Bygg fetch-alternativen
    const options = {
      method: fetchMethod,
      headers: headers,
      cache: "no-store", // Inaktivera cache
    };

    if (body) {
      options.body = JSON.stringify(body); // Om body skickas, gör det till JSON
    }

    // Utför fetch-anropet
    const response = await fetch(url, options);

    // Hantera icke-OK svar
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Fetch failed: ${response.statusText}. Details: ${errorBody}`
      );
    }

    // Parsar JSON-svaret
    return await response.json();
  } catch (error) {
    console.error(`API Fetch Error: ${error.message}`);
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

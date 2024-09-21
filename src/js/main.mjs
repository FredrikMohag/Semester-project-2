// src/js/main.mjs

import router from "./router.mjs";
import { createApiKey } from "./api/fetch/headers.mjs"; // Använd headers för API-nyckel

document.addEventListener("DOMContentLoaded", () => {
  router(); // Kör router-funktionen när sidan laddas
  initializeApp(); // Starta applikationen
});

async function initializeApp() {
  try {
    // Skapa API-nyckeln (kan också göra detta vid behov senare)
    const apiKey = await createApiKey("Initial API Key");

    if (apiKey) {
      console.log("API Key created successfully:", apiKey);
    } else {
      console.error("Failed to create API key.");
    }
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

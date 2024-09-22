import { load } from "../../storage/index.mjs";
import { API_AUCTIONS, API_BASE } from "../constants.mjs";
import { authFetch } from "../fetch/authFetch.mjs";

const action = "/profiles";

// Funktion för att hämta en användares listningar och vinster
export async function profileListings() {
  // Ladda profilen från localStorage
  const profile = load("profile");

  if (!profile || !profile.name) {
    throw new Error("Profile information or profile name is missing.");
  }

  const name = profile.name; // Hämta användarens namn

  // Bygg URL för API-anrop
  const url = `${API_BASE}${API_AUCTIONS}${action}/${name}?_wins=true&_listings=true`;

  try {
    // Skicka API-begäran med autentisering
    const response = await authFetch(url, "GET");

    // Kontrollera om begäran lyckades
    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile listings: ${response.statusText}`
      );
    }

    // Returnera JSON-data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile listings:", error);
    throw error; // Vidarebefordra felet för att hantera det där funktionen anropas
  }
}

// Lägg till getUserListings-funktionen för att enbart hämta listningar
export async function getUserListings() {
  const profile = load("profile");

  if (!profile || !profile.name) {
    throw new Error("Profile information or profile name is missing.");
  }

  const name = profile.name; // Hämta användarens namn

  // Bygg URL för API-anrop
  const url = `${API_BASE}${API_AUCTIONS}${action}/${name}?_listings=true`;

  try {
    // Skicka API-begäran med autentisering
    const response = await authFetch(url, "GET");

    if (!response.ok) {
      throw new Error(`Failed to fetch user listings: ${response.statusText}`);
    }

    // Returnera JSON-data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user listings:", error);
    throw error; // Vidarebefordra felet för att hantera det där funktionen anropas
  }
}

import { getAuthHeaders } from "./headers.mjs"; // Importera getAuthHeaders

export async function authFetch(url, fetchMethod = "GET", body = null) {
  try {
    // Hämta headers från getAuthHeaders-funktionen
    const resolvedHeaders = getAuthHeaders(); // Om getAuthHeaders är asynkron, lägg till 'await'

    // Bygg fetch-alternativen
    const options = {
      method: fetchMethod, // Använd POST när du skapar resurser
      headers: resolvedHeaders,
      cache: "no-store", // Lägg till detta för att inaktivera cache
    };

    if (body) {
      options.body = JSON.stringify(body);
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
    const json = await response.json();

    // Returnera hela svaret för mer flexibilitet
    return json; // Justera här om du vill returnera hela svaret och inte bara json.data
  } catch (error) {
    console.error(`API Fetch Error: ${error.message}`);
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

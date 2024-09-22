// src/js/api/listings/listingsHome.mjs

import { API_BASE, API_AUCTIONS } from "../constants.mjs";

/**
 * Hämtar alla listningar, med valfri sökfråga
 * @param {string} query - Söksträng som används för att filtrera listningarna
 * @returns {Array} - En lista över matchande listningar
 */
export async function fetchAllListings(query = "") {
  let url = `${API_BASE}${API_AUCTIONS}/listings`;

  // Om en sökfråga finns, lägg till den som en query parameter
  if (query) {
    url += `?q=${encodeURIComponent(query)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
  }
}

// api/listings/listingsHome.mjs

import { API_BASE, API_AUCTIONS } from "../constants.mjs";

/**
 * Hämtar de senaste listningarna (begränsat till 4)
 * @returns {Array} - En lista över senaste listningarna
 */
export async function fetchLatestListings() {
  const url = `${API_BASE}${API_AUCTIONS}/listings?_sort=created&_order=desc&_limit=4`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch latest listings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching latest listings:", error);
    throw error;
  }
}

/**
 * Hämtar de populära listningarna baserat på bud (begränsat till 4)
 * @returns {Array} - En lista över populära listningar
 */
export async function fetchPopularListings() {
  const url = `${API_BASE}${API_AUCTIONS}/listings?_sort=bids&_order=desc&_limit=4`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch popular listings");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular listings:", error);
    throw error;
  }
}

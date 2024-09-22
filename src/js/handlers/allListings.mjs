// src/js/handlers/allListings.mjs

import { fetchAllListings } from "../api/listings/listingsHome.mjs";

/**
 * Söker efter listningar baserat på användarens sökfråga
 * @param {string} query - Söksträngen som användaren angivit
 */
export async function searchListings(query) {
  try {
    // Hämta listningar som matchar sökfrågan
    const listings = await fetchAllListings(query);

    // Visa de filtrerade listningarna (du behöver implementera visningslogiken)
    displayListings(listings);
  } catch (error) {
    console.error("Error fetching or filtering listings:", error);
  }
}

function displayListings(listings) {
  // Här skulle du implementera logiken för att visa listningarna på sidan
  console.log("Filtered Listings:", listings);
  // Exempel: uppdatera DOM med de nya listningarna
  const listingsContainer = document.getElementById("listings-container");
  listingsContainer.innerHTML = ""; // Töm tidigare resultat

  listings.forEach((listing) => {
    const listingElement = document.createElement("div");
    listingElement.innerText = listing.title; // Anpassa detta för din struktur
    listingsContainer.appendChild(listingElement);
  });
}

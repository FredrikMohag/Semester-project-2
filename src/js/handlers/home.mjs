import {
  fetchLatestListings,
  fetchPopularListings,
} from "../api/listings/listingsHome.mjs";

export async function renderLatestListings() {
  const container = document.getElementById("latest-listings-container");
  if (!container) {
    console.error("Latest listings container not found");
    return;
  }

  try {
    const listings = await fetchLatestListings();
    console.log("Latest listings response:", listings);

    const listingArray = listings.data ? listings.data : listings;

    listingArray.slice(0, 4).forEach((listing) => {
      const listingElement = createListingElement(listing);
      container.appendChild(listingElement);
    });
  } catch (error) {
    console.error("Error fetching latest listings:", error);
  }
}

export async function renderPopularListings() {
  const container = document.getElementById("popular-listings-container");
  if (!container) {
    console.error("Popular listings container not found");
    return;
  }

  try {
    const listings = await fetchPopularListings();
    console.log("Popular listings response:", listings);

    const listingArray = listings.data ? listings.data : listings;

    listingArray.slice(0, 4).forEach((listing) => {
      const listingElement = createListingElement(listing);
      container.appendChild(listingElement);
    });
  } catch (error) {
    console.error("Error fetching popular listings:", error);
  }
}

function createListingElement(listing) {
  const div = document.createElement("div");
  div.classList.add("square");

  // Rendera bild och titel
  const imageUrl =
    listing.media && listing.media.length > 0
      ? listing.media[0]
      : "https://via.placeholder.com/150"; // Om ingen bild finns, visa placeholder

  div.innerHTML = `
    <img src="${imageUrl}" alt="${listing.title}" class="listing-image" />
    <h3>${listing.title}</h3>
  `;

  return div;
}

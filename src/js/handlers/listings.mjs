// src/js/handlers/listings.mjs

import { saveListing, getListings } from "../api/listings.mjs";

// Hantera skapandet av en ny listning
export function handleCreateListingForm() {
  const form = document.getElementById("create-listing-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const listing = {
      name: document.getElementById("item-name").value,
      description: document.getElementById("item-description").value,
      imageUrl: document.getElementById("item-image-url").value,
      endDate: document.getElementById("item-end-date").value,
    };

    // Spara listningen
    saveListing(listing);
    alert("Listing created!");

    // Töm formuläret efter att ha sparat
    form.reset();
  });
}

// Visa användarens listningar (t.ex. på startsidan eller profilsidan)
export function renderUserListings() {
  const container = document.getElementById("latest-listings-container");
  if (!container) {
    console.error("Listings container not found");
    return;
  }

  const listings = getListings();

  // Visa bara de senaste 4 listningarna
  listings.slice(0, 4).forEach((listing) => {
    const listingElement = createListingElement(listing);
    container.appendChild(listingElement);
  });
}

// Hjälpfunktion för att skapa HTML-element för listningarna
function createListingElement(listing) {
  const div = document.createElement("div");
  div.classList.add("square");

  const imageUrl = listing.imageUrl || "https://via.placeholder.com/150";
  div.innerHTML = `
    <img src="${imageUrl}" alt="${listing.name}" class="listing-image" />
    <h3>${listing.name}</h3>
  `;
  return div;
}

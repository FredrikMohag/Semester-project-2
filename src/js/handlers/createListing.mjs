import * as storage from "../storage/index.mjs";

// Funktion för att hantera skapande av listningar
export function handleCreateListingForm() {
  const form = document.querySelector("#createListingForm");

  if (!form) {
    console.error("Create listing form not found.");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#item-name").value;
    const description = document.querySelector("#item-description").value;
    const imageUrl = document.querySelector("#item-image-url").value;
    const endDate = document.querySelector("#item-end-date").value;

    const newListing = {
      name,
      description,
      imageUrl,
      endDate,
    };

    // Spara den nya listningen i localStorage eller backend
    let listings = storage.load("userListings") || [];
    listings.push(newListing);
    storage.save("userListings", listings);

    // Rensa formuläret efter inlämning
    form.reset();
    alert("Listing created successfully!");

    // Rendera om listningarna
    renderUserListings();
  });
}

// Funktion för att rendera användarens listningar
export function renderUserListings() {
  const listings = storage.load("userListings") || [];
  const listingsContainer = document.getElementById("profile-listings");

  if (!listingsContainer) {
    console.error("Profile listings container not found.");
    return;
  }

  listingsContainer.innerHTML = ""; // Rensa tidigare innehåll

  listings.forEach((listing) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>${listing.name}</strong>
      <p>${listing.description}</p>
      <img src="${listing.imageUrl}" alt="${listing.name}" style="width: 100px; height: 100px;">
      <p>Ends at: ${listing.endDate}</p>
    `;
    listingsContainer.appendChild(listItem);
  });
}

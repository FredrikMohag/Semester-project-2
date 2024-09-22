import * as storage from "../storage/index.mjs";
import { getUserListings } from "../api/profile/profileListings.mjs"; // Importera rätt funktion

// Funktion för att hantera skapande av listningar
export function handleCreateListingForm() {
  const form = document.querySelector("#createListingForm");

  if (!form) {
    console.error("Create listing form not found.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Hämta token från localStorage

    if (!token) {
      console.error("No auth token found, user might not be logged in.");
      alert("Please log in to create a listing.");
      return;
    }

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

    try {
      // Skicka listningen till backend via ett POST-anrop
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newListing),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      // Spara till localStorage (valfritt)
      let listings = storage.load("userListings") || [];
      listings.push(newListing);
      storage.save("userListings", listings);

      // Rensa formuläret efter inlämning
      form.reset();
      alert("Listing created successfully!");

      // Rendera om listningarna
      renderUserListings(); // Ladda om listningarna efter att ha skapat en ny
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Failed to create listing. Please try again.");
    }
  });
}

// Funktion för att rendera användarens listningar
export async function renderUserListings() {
  const listingsContainer = document.getElementById("profile-listings");

  if (!listingsContainer) {
    console.error("Profile listings container not found.");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No auth token found, user might not be logged in.");
    listingsContainer.innerHTML = "<p>Please log in to view your listings.</p>";
    return;
  }

  try {
    const listings = await getUserListings(); // Hämta användarens listningar

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
  } catch (error) {
    console.error("Error fetching listings:", error);
    listingsContainer.innerHTML =
      "<p>Failed to load listings. Please try again later.</p>";
  }
}

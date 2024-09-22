import { API_BASE, API_AUCTIONS } from "../constants.mjs";
import { authFetch } from "../fetch/authFetch.mjs";

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
    // Du kan även använda en centraliserad funktion för att hämta listningar
    const listings = await authFetch(`${API_BASE}/profiles/listings`, "GET");

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

// Hämta användarprofil
export async function getProfile(profileName) {
  const url = `${API_BASE}${API_AUCTIONS}/profiles/${profileName}?_listings=true&_wins=true`;

  try {
    const data = await authFetch(url, "GET");

    // Sätt krediter till 1000 om de inte redan finns
    if (data && data.credits === undefined) {
      data.credits = 1000;
    }

    return data;
  } catch (error) {
    console.error("Error in getProfile:", error);
    return null;
  }
}

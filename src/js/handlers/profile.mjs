// handlers/profile.mjs

import { getProfile } from "../api/profile/getProfile.mjs";
import * as storage from "../storage/index.mjs";

// Funktion för att generera hälsning beroende på tid på dagen
function getGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Hello";
  } else {
    return "Good evening";
  }
}

export async function renderProfile() {
  const user = storage.load("userProfile"); // Hämta användarens profil från localStorage
  if (!user || !user.name) {
    console.error("No user found in storage.");
    // Omdirigera till inloggningssidan om användaren inte är inloggad
    window.location.href = "/AUCTION/login/index.html";
    return;
  }

  // Dynamiskt uppdatera hälsning med användarnamn baserat på tid
  const greetingElement = document.getElementById("greeting");
  if (greetingElement) {
    const greetingMessage = `${getGreeting()}, ${user.name}`; // Dynamisk hälsning
    greetingElement.textContent = greetingMessage; // Visa hälsningen i h2
  }

  try {
    const profileData = await getProfile(user.name);
    if (profileData) {
      // Visa avatar
      const avatarElement = document.getElementById("profile-avatar");
      if (avatarElement) {
        avatarElement.src =
          profileData.avatar?.url || "../../images/default-avatar.png";
      }

      // Visa e-post
      const emailElement = document.getElementById("profile-email");
      if (emailElement) {
        emailElement.textContent = profileData.email || "No email provided.";
      }

      // Visa krediter
      const creditsElement = document.getElementById("profile-credits");
      if (creditsElement) {
        creditsElement.textContent =
          profileData.credits !== undefined ? profileData.credits : "N/A";
      }

      // Visa användarens listningar
      const listingsElement = document.getElementById("profile-listings");
      if (listingsElement) {
        listingsElement.innerHTML = ""; // Rensa tidigare innehåll
        if (profileData.listings && profileData.listings.length > 0) {
          profileData.listings.forEach((listing) => {
            const listItem = document.createElement("li");
            listItem.textContent = listing.title;
            listingsElement.appendChild(listItem);
          });
        } else {
          listingsElement.innerHTML = "<li>No listings found.</li>";
        }
      }

      // Visa användarens bud (wins)
      const bidsElement = document.getElementById("profile-bids");
      if (bidsElement) {
        bidsElement.innerHTML = ""; // Rensa tidigare innehåll
        if (profileData.wins && profileData.wins.length > 0) {
          profileData.wins.forEach((win) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${win.title} - Winning bid: ${win.amount}`;
            bidsElement.appendChild(listItem);
          });
        } else {
          bidsElement.innerHTML = "<li>No bids found.</li>";
        }
      }
    } else {
      console.error("Failed to fetch profile data.");
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
}

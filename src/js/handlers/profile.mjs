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
  const user = storage.load("userProfile");
  if (!user || !user.name) {
    console.error("No user found in storage.");
    window.location.href = "/AUCTION/login/index.html";
    return;
  }

  const greetingElement = document.getElementById("greeting");
  if (greetingElement) {
    const greetingMessage = `${getGreeting()}, ${user.name}`;
    greetingElement.textContent = greetingMessage;
  }

  try {
    const profileData = await getProfile(user.name);
    if (profileData) {
      const avatarElement = document.getElementById("profile-avatar");
      if (avatarElement) {
        avatarElement.src =
          profileData.avatar?.url || "../../../images/default-avatar.png";
        avatarElement.style.width = "200px";
        avatarElement.style.height = "200px";
        avatarElement.style.objectFit = "cover";
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
        listingsElement.innerHTML = "";
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
        bidsElement.innerHTML = "";
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

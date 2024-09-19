// handlers/logOut.mjs

import { remove } from "../storage/index.mjs";

export function logout() {
  remove("token");
  remove("profile");
  // Omdirigera till login-sidan efter utloggning
  window.location.href = "/AUCTION/login/index.html";
}

export function setLogOutListener() {
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault(); // Förhindra att länken laddar om sidan
      logout(); // Anropa logout-funktionen när knappen klickas
    });
  } else {
    console.error("Logout button not found.");
  }
}

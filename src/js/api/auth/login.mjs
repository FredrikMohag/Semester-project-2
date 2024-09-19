// src / js / api / auth / login.mjs

import { API_BASE, API_AUTH, API_LOGIN } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

function displayErrors(errorContainer, errors) {
  errorContainer.innerHTML = "";
  errors.forEach((error) => {
    const errMsg = document.createElement("p");
    errMsg.textContent = error.message || error;
    errorContainer.classList.remove("hidden");
    errorContainer.appendChild(errMsg);
  });
}

export async function login(profile) {
  const loginURL = `${API_BASE}${API_AUTH}${API_LOGIN}`;
  console.log("loginURL:", loginURL);

  const body = JSON.stringify({
    email: profile.email,
    password: profile.password,
  });

  try {
    // Skicka inloggningsförfrågan med användarens email och lösenord
    const response = await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();
    console.log("Login API response data:", data);

    if (!response.ok) {
      console.error("Login error data:", data);
      const errContainer = document.querySelector("#error-container");
      if (errContainer && data.errors) {
        displayErrors(errContainer, data.errors);
      } else {
        console.error("Unexpected error format:", data);
      }
      return;
    }

    // Kontrollera om accessToken finns i svaret
    if (data && data.data && data.data.accessToken) {
      const { accessToken, ...user } = data.data;
      console.log("AccessToken from login response:", accessToken);

      // Rensa gammal användardata innan vi sparar ny användarinformation
      storage.clear(); // Rensar all gammal data från localStorage

      // Spara AccessToken och användarprofil
      storage.save("token", accessToken);
      storage.save("userProfile", user);

      // Kontrollera att token sparades korrekt
      if (storage.load("token") && storage.load("userProfile")) {
        // Omdirigera till användarens profil
        window.location.href = "/AUCTION/profile/index.html"; // Ändra URL till rätt sökväg
      } else {
        console.error("Failed to save token or user profile.");
      }
    } else {
      console.error("Login response data is not in the expected format:", data);
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(`Login failed: ${error.message}`);
  }
}

// src/js/api/auth/login.mjs

import { API_BASE_URL } from "../constants.mjs";
import { getProfile } from "../profile/profileRead.mjs";
import * as storage from "../../storage/index.mjs";
import {
  listingSubmitLoader,
  listingSubmitLoaderOff,
} from "../../handlers/listingSubmitLoader.mjs";

/**
 * Logs in a user
 * @param {object} profile - User profile
 * @param {string} action - URL to fetch
 * @param {string} method - HTTP method
 */
// src/js/api/auth/login.mjs

export async function login(profile, action = "/auth/login", method = "POST") {
  const loginURL = new URL(action, API_BASE_URL);
  const body = JSON.stringify(profile);

  let response;
  try {
    listingSubmitLoader();

    response = await fetch(loginURL.href, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!response.ok) {
      listingSubmitLoaderOff();
      const errorData = await response.json();
      console.error("Error data:", errorData);

      const errContainer = document.querySelector(`#error-container`);
      if (errContainer) {
        errContainer.innerHTML = "";
        errorData.errors.forEach((error) => {
          const errMsg = document.createElement("p");
          errMsg.textContent = error.message;
          errContainer.classList.remove("hidden");
          errContainer.appendChild(errMsg);
        });
      } else {
        console.error("Error container not found");
      }
      return;
    }

    const data = await response.json();
    const { accessToken, ...user } = data.data;

    storage.save("token", accessToken);
    storage.save("profile", user);

    const profileData = await getProfile(user.name);
    storage.save("credits", profileData.data.credits);

    window.location.href = "/";
  } catch (error) {
    listingSubmitLoaderOff();
    console.error("Error during login:", error.message);
    throw new Error(error);
  }
}

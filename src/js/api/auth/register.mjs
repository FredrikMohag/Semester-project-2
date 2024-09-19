// src/js/api/auth/register.mjs

import { API_BASE, API_AUTH, API_REGISTER } from "../constants.mjs";

/**
 * Hjälpfunktion för att visa felmeddelanden
 */
function displayErrors(errorContainer, errors) {
  errorContainer.innerHTML = "";
  errors.forEach((error) => {
    const errMsg = document.createElement("p");
    errMsg.textContent = error.message || error;
    errorContainer.classList.remove("hidden");
    errorContainer.appendChild(errMsg);
  });
}

/**
 * Registrerar en användare
 */
export async function register(profile) {
  const registrationURL = `${API_BASE}${API_AUTH}${API_REGISTER}`;
  console.log("registrationURL:", registrationURL);

  // Bygg profileData med obligatoriska fält
  const profileData = {
    name: profile.name,
    email: profile.email,
    password: profile.password,
    bio: profile.bio || "",
    venueManager: profile.venueManager || false,
  };

  // Lägg till avatar om användaren har angett en avatar-URL
  if (profile.avatar && profile.avatar.trim() !== "") {
    profileData.avatar = {
      url: profile.avatar,
      alt: profile.avatarAlt || "",
    };
  }

  // Lägg till banner om användaren har angett en banner-URL
  if (profile.banner && profile.banner.trim() !== "") {
    profileData.banner = {
      url: profile.banner,
      alt: profile.bannerAlt || "",
    };
  }

  const body = JSON.stringify(profileData);
  console.log("Profile data being sent:", body);

  try {
    const response = await fetch(registrationURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Registration error data:", data);
      const errContainer = document.querySelector("#error-container");
      if (errContainer && data.errors) {
        displayErrors(errContainer, data.errors);
      } else {
        console.error("Unexpected error format:", data);
      }
      return;
    }

    console.log("Registration successful!");

    // Efter lyckad registrering, omdirigera till inloggningssidan
    window.location.href = "../../../../AUCTION/login/index.html"; // Anpassa sökvägen om det behövs
  } catch (error) {
    console.error("Error during registration:", error);
    const errContainer = document.querySelector("#error-container");
    if (errContainer) {
      displayErrors(errContainer, [error.message]);
    }
  }
}

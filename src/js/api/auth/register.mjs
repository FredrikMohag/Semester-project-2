// src/js/api/auth/register.mjs

import { API_BASE_URL } from "../constants.mjs";

export async function register(
  profile,
  action = "/auth/register",
  method = "POST"
) {
  const registerURL = new URL(action, API_BASE_URL);
  const body = JSON.stringify(profile);

  console.log("Registration URL:", registerURL.href);
  console.log("Request body:", body);

  try {
    listingSubmitLoader();

    const response = await fetch(registerURL.href, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "POST" ? body : undefined,
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
    } else {
      const loginProfile = {
        email: profile.email,
        password: profile.password,
      };
      await login(loginProfile, "/auth/login", "POST");
      window.location.href = "/homepage/login/index.html";
    }
  } catch (error) {
    listingSubmitLoaderOff();
    console.error("Error during registration:", error);
    throw new Error(error);
  }
}

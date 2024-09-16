// src/js/handlers/login.mjs

import { login } from "../api/auth/logOn.mjs"; // Importera login-funktionen från auth-mappen

let isLoginListenerSet = false; // För att hålla koll på om lyssnaren redan är satt

console.log("Login handler module loaded.");

export function setLoginFormListener() {
  if (isLoginListenerSet) return; // Om lyssnaren redan är satt, gör inget

  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const emailElement = document.getElementById("login-email");
      const passwordElement = document.getElementById("login-password");

      if (!emailElement || !passwordElement) {
        console.error("Ett eller flera formulärelement kunde inte hittas.");
        return;
      }

      const profile = {
        email: emailElement.value.trim(),
        password: passwordElement.value.trim(),
      };

      console.log("Profile data for login:", profile);

      try {
        const response = await login(profile);
        console.log("Login successful!");

        const { accessToken, name } = response.data;
        localStorage.setItem("accessToken", accessToken); // Spara accessToken i localStorage
        localStorage.setItem("username", name); // Spara användarnamnet i localStorage

        window.location.href = "/AUCTION/profile/index.html";
      } catch (error) {
        console.error("Login failed", error);
        alert(`Error: ${error.message}`);
      }
    });

    console.log("Login handler loaded, waiting for form submission");
    isLoginListenerSet = true;
  } else {
    console.error("Login form not found");
  }
}

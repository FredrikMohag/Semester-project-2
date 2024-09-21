// handlers/login.mjs

import { login } from "../api/auth/login.mjs";

let isLoginListenerSet = false;

console.log("Login handler module loaded.");

async function handleLoginSubmit(event) {
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
    await login(profile);
    console.log("Login successful!");

    // Visa en enkel alert för att indikera lyckad inloggning
    alert("Inloggning lyckades!");

    // Omdirigera efter att användaren stänger alerten
    window.location.href = `/user/${user.id}`; // Anpassa sökvägen om det behövs
  } catch (error) {
    console.error("Login failed", error);
    alert(`Error: ${error.message}`);
  }
}

export function setLoginFormListener() {
  if (isLoginListenerSet) return;

  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
    console.log("Login handler loaded, waiting for form submission");
    isLoginListenerSet = true;
  } else {
    console.error("Login form not found");
  }
}

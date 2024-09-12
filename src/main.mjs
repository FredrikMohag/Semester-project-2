import initializeRouter from "./router.mjs"; // Importera router-initialisering
import { handleSignup } from "./js/handlers/signup.mjs";
import { handleLogin } from "./js/handlers/login.mjs";

initializeRouter(); // Kör router-initialisering

// Lägg till event listeners efter DOM har laddats
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});

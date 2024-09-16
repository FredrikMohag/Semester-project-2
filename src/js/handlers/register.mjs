// src/js/handlers/register.mjs

import { registerUser } from "../api/auth/register.mjs"; // Importera registreringsfunktionen

/**
 * Registrerar en användare
 */
export function setRegisterFormListener() {
  const registerForm = document.querySelector("#signup-form"); // Hitta formuläret på sidan
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Förhindrar att sidan laddas om vid formulärsubmit

      // Samla in och validera formulärdata
      const usernameElement = document.getElementById("signup-username");
      const emailElement = document.getElementById("signup-email");
      const passwordElement = document.getElementById("signup-password");
      const avatarElement = document.getElementById("signup-avatar");

      // Kontrollera att alla element finns
      if (!usernameElement || !emailElement || !passwordElement) {
        console.error("Ett eller flera formulärelement kunde inte hittas.");
        return;
      }

      // Använd `?.` för att säkert få värdet och trimma om elementet finns
      const profile = {
        name: usernameElement?.value.trim(),
        email: emailElement?.value.trim(),
        password: passwordElement?.value.trim(),
        avatar: {
          url: avatarElement?.value.trim() || "", // Om elementet finns, annars tom sträng
          alt: "User's avatar",
        },
      };

      // Validera formuläret innan du skickar data
      if (!validateRegisterForm(profile)) {
        return; // Avsluta om valideringen misslyckas
      }

      try {
        await registerUser(profile); // Försök registrera användaren
        console.log("Registration successful!");
        alert("Registration successful! You can now log in.");

        // Omdirigera till inloggningssidan efter framgångsrik registrering
        window.location.href = "/AUCTION/login/index.html";
      } catch (error) {
        console.error("Registration failed", error);
        alert(`Registration error: ${error.message}`); // Visar felmeddelande om registreringen misslyckas
      }
    });
  } else {
    console.error("Register form not found");
  }
}

/**
 * Validerar registreringsformuläret
 */
function validateRegisterForm(profile) {
  let isValid = true;

  // Rensa tidigare felmeddelanden
  document
    .querySelectorAll(".error-message")
    .forEach((elem) => (elem.textContent = ""));

  // Validera användarnamn (ej tomt och inga otillåtna tecken)
  if (!/^[a-zA-Z0-9_]+$/.test(profile.name)) {
    document.getElementById("signup-username-error").textContent =
      "Username must not contain punctuation symbols apart from underscore (_).";
    isValid = false;
  }

  // Validera e-post (endast tillåter stud.noroff.no-domänen)
  if (!/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(profile.email)) {
    document.getElementById("signup-email-error").textContent =
      "Email must be a valid stud.noroff.no email address.";
    isValid = false;
  }

  // Validera lösenord (minst 8 tecken)
  if (profile.password.length < 8) {
    document.getElementById("signup-password-error").textContent =
      "Password must be at least 8 characters.";
    isValid = false;
  }

  return isValid;
}

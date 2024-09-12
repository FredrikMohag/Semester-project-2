// src/js/handlers/signup.mjs
import { signUp } from "../api/auth/signup.mjs";

// Logga att signup-handlers laddas korrekt
console.log("Signup handler loaded, waiting for form submission");

export async function handleSignup(event) {
  event.preventDefault();

  // Logga att hanteringen av signup påbörjas
  console.log("HandleSignup function called");

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const avatarUrl = document.getElementById("signup-avatar").value;

  // Logga vad användaren har angett
  console.log("Username entered:", username);
  console.log("Email entered:", email);
  console.log("Password entered:", password);
  console.log("Avatar URL entered:", avatarUrl);

  let valid = true;

  // Clear previous errors
  document
    .querySelectorAll(".error-message")
    .forEach((elem) => (elem.textContent = ""));

  // Validate username
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    console.log("Invalid username:", username);
    document.getElementById("signup-username-error").textContent =
      "Username: letters, numbers, or underscores (_) only.";
    valid = false;
  }

  // Validate email
  if (!/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(email)) {
    console.log("Invalid email:", email);
    document.getElementById("signup-email-error").textContent =
      "Email must be a valid stud.noroff.no email address.";
    valid = false;
  }

  // Validate password
  if (password.length < 8) {
    console.log("Password too short:", password);
    document.getElementById("signup-password-error").textContent =
      "Password must be at least 8 characters.";
    valid = false;
  }

  if (valid) {
    console.log("Form is valid, attempting to sign up...");
    try {
      const response = await signUp({
        name: username,
        email,
        password,
        avatarUrl,
      });
      console.log("Signup response:", response); // Logga serverns svar
      alert("Registration successful!");
      // Hantera efter framgångsrik registrering
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert(`Error: ${error.message}`);
    }
  } else {
    console.log("Form validation failed.");
  }
}

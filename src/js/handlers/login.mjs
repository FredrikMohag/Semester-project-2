// src/js/handlers/login.mjs

import { login } from "../api/auth/login.mjs";

console.log("Login handler loaded, waiting for form submission");

export async function handleLogin(event) {
  event.preventDefault();

  console.log("HandleLogin function called");

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  console.log("Email entered:", email);
  console.log("Password entered:", password);

  let valid = true;

  // Clear previous errors
  document
    .querySelectorAll(".error-message")
    .forEach((elem) => (elem.textContent = ""));

  // Validate email
  if (!/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(email)) {
    document.getElementById("login-email-error").textContent =
      "Email must be a valid stud.noroff.no email address.";
    console.log("Invalid email:", email);
    valid = false;
  }

  // Validate password
  if (password.length < 8) {
    document.getElementById("login-password-error").textContent =
      "Password must be at least 8 characters.";
    console.log("Password too short:", password);
    valid = false;
  }

  if (valid) {
    console.log("Form is valid, attempting to log in...");
    try {
      const response = await login({ email, password }, "/auth/login", "POST");
      console.log("Login response:", response); // Logga serverns respons
      alert("Login successful!");

      const { accessToken } = response.data;
      console.log("AccessToken received:", accessToken);

      localStorage.setItem("accessToken", accessToken);
      // Hantera efter framgångsrik inloggning
    } catch (error) {
      console.error("Error during login:", error.message);
      alert(`Error: ${error.message}`);
    }
  } else {
    console.log("Form validation failed.");
  }
}

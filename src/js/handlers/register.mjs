// handlers/register.mjs

import { register } from "../api/auth/register.mjs";

function handleRegistrationSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  console.log("Form data before sending:", profile);

  // Döljer eventuella tidigare felmeddelanden
  const errContainer = document.querySelector("#error-container");
  if (errContainer) {
    errContainer.classList.add("hidden");
    errContainer.innerHTML = "";
  }

  register(profile);
}

export function setRegistrationFormListener() {
  const form = document.querySelector("#signup-form");

  if (form) {
    form.addEventListener("submit", handleRegistrationSubmit);
    console.log("Registration handler loaded, waiting for form submission");
  } else {
    console.error("Registration form not found");
  }
}

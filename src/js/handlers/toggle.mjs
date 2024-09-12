// src/js/handlers/toggle.mjs
export function toggleForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  // Check if the form is currently visible
  const isCurrentlyVisible = form.style.display === "block";

  // Hide all forms
  document.querySelectorAll(".sign-log-container").forEach((formElement) => {
    formElement.style.display = "none";
  });

  // Show or hide the selected form
  form.style.display = isCurrentlyVisible ? "none" : "block";
}

export function hideForm(formId) {
  const form = document.getElementById(formId);
  if (form) form.style.display = "none";
}

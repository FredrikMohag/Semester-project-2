// src/js/handlers/toggle.mjs

export function toggleForm(formId) {
  const formToShow = document.getElementById(formId);
  const forms = document.querySelectorAll(".sign-log-container");

  // Hide all forms first
  forms.forEach((form) => {
    if (form.id !== formId) {
      form.style.display = "none";
    }
  });

  // Toggle the selected form
  if (formToShow) {
    formToShow.style.display =
      formToShow.style.display === "none" || formToShow.style.display === ""
        ? "block"
        : "none";
  }
}

export function hideForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.style.display = "none";
  }
}

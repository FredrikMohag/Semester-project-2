// src/components/formHandlers.mjs
export function toggleForm(formId) {
  const form = document.getElementById(formId);
  const isCurrentlyVisible = form.style.display === "block";

  // Dölj alla formulär
  document.querySelectorAll(".sign-log-container").forEach((formElement) => {
    formElement.style.display = "none";
  });

  // Visa eller dölja det valda formuläret beroende på dess nuvarande tillstånd
  form.style.display = isCurrentlyVisible ? "none" : "block";
}

export function hideForm(formId) {
  document.getElementById(formId).style.display = "none";
}

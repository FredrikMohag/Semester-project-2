// src/router.mjs
import { toggleForm, hideForm } from "./js/handlers/toggle.mjs";

export default function initializeRouter() {
  console.log("Router function executed");

  // Expose toggleForm and hideForm globally
  window.toggleForm = toggleForm;
  window.hideForm = hideForm;

  // Lägg till router-logik här (som tidigare)
}

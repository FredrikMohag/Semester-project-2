// src/router.mjs
import { toggleForm, hideForm } from "./js/handlers/toggle.mjs";

// Function to initialize the router
function initializeRouter() {
  console.log("Router function executed");

  // Expose toggleForm and hideForm globally
  window.toggleForm = toggleForm;
  window.hideForm = hideForm;

  // Lägg till router-logik här om det behövs
}

// Export default function
export default initializeRouter;

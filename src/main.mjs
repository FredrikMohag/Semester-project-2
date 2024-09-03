// src/main.mjs
import { toggleForm, hideForm } from "./components/formHandlers.mjs";
import { initializeRouter } from "./router.mjs";

// Exponera funktioner globalt för användning i HTML
window.toggleForm = toggleForm;
window.hideForm = hideForm;

// Eventuellt andra initialiseringar
initializeRouter();

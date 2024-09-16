// src/router.mjs
import * as listeners from "./js/handlers/index.mjs";

export default function router() {
  const path = window.location.pathname
    .replace(/\/index\.html$/, "") // Ta bort /index.html om det finns
    .replace(/\/+$/, ""); // Ta bort avslutande snedstreck

  console.log(`Router detected path: ${path}`); // För att indikera vilken sida du är på

  switch (path) {
    case "/AUCTION":
    case "/AUCTION/index":
      console.log("Home page detected. Rendering home page."); // Lägg till konsollogg för debugging
      listeners.renderHomePage(); // Rendera startsidan (du behöver definiera denna funktion i index.mjs)
      break;

    case "/AUCTION/listing":
      console.log("Listings page detected. Rendering listings.");
      listeners.renderListings(); // Rendera listvy
      break;

    case "/AUCTION/listing/all":
    case "/AUCTION/listing/all/index":
      console.log("All listings page detected. Rendering all listings.");
      listeners.renderAllListings(); // Rendera alla listningar
      break;

    case "/AUCTION/listing/single":
    case "/AUCTION/listing/single/index":
      console.log("Single listing page detected. Rendering single listing.");
      listeners.renderSingleListing(); // Rendera enskild listning
      break;

    case "/AUCTION/login":
    case "/AUCTION/login/index":
      console.log("Login page detected. Setting login form listener."); // Logga endast om vi är på inloggningssidan
      listeners.setLoginFormListener(); // Sätt upp login-formulärets hanterare
      break;

    case "/AUCTION/signup":
    case "/AUCTION/signup/index":
      console.log("Signup page detected. Setting signup form listener.");
      listeners.setRegisterFormListener(); // Sätt upp signup-formulärets hanterare
      break;

    case "/AUCTION/profile":
    case "/AUCTION/profile/index":
      console.log("Profile page detected. Setting profile listeners.");
      listeners.renderProfile(); // Rendera profilsidan
      listeners.setLogOutListener(); // Sätt upp logga ut-funktionaliteten
      break;

    default:
      console.warn(`No listener set for the path: ${path}`); // Om ingen rutt matchar
  }
}

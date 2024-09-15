import * as listeners from "./js/handlers/index.mjs";

export default function router() {
  const path = location.pathname
    .replace(/\/index\.html$/, "") // Remove /index.html if present
    .replace(/\/+$/, ""); // Remove trailing slashes

  switch (path) {
    case "/AUCTION":
    case "/AUCTION/index":
      listeners.renderHomePage(); // Render the homepage
      break;

    case "/AUCTION/listing":
      listeners.renderListings(); // Render the listings overview
      break;

    case "/AUCTION/listing/all":
    case "/AUCTION/listing/all/index":
      listeners.renderAllListings(); // Render all listings
      break;

    case "/AUCTION/listing/single":
    case "/AUCTION/listing/single/index":
      listeners.renderSingleListing(); // Render a single listing
      break;

    case "/AUCTION/login":
    case "/AUCTION/login/index":
      listeners.setLoginFormListener(); // Set up login form
      // No need to toggle the form visibility since it's included in the HTML directly
      break;

    case "/AUCTION/signup":
    case "/AUCTION/signup/index":
      listeners.setRegisterFormListener(); // Set up signup form
      // No need to toggle the form visibility since it's included in the HTML directly
      break;

    case "/AUCTION/profile":
    case "/AUCTION/profile/index":
      listeners.renderProfile(); // Render the profile page
      listeners.setLogOutListener(); // Set logout functionality
      break;

    default:
      console.warn(`No listener set for the path: ${path}`);
  }
}

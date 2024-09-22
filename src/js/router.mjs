export default function router() {
  const path = window.location.pathname
    .replace(/\/index\.html$/, "")
    .replace(/\/+$/, "");

  console.log(`Router detected path: ${path}`);

  switch (path) {
    case "": // För rotvägen ("/") som motsvarar index.html på roten
    case "/":
      console.log("Home page detected.");
      // Logik för index.html om nödvändigt
      break;

    case "/AUCTION":
    case "/AUCTION/index":
      console.log("Auction Home page detected.");
      // Logik för AUCTION/index.html om nödvändigt
      break;

    case "/AUCTION/listing":
      console.log("Listings page detected. Rendering listings.");
      import("./handlers/listings.mjs").then(({ renderListings }) => {
        renderListings();
      });
      break;

    case "/AUCTION/listing/all":
    case "/AUCTION/listing/all/index":
      console.log("All listings page detected. Rendering all listings.");
      import("./handlers/allListings.mjs").then(
        ({ renderAllListings, searchListings }) => {
          renderAllListings(); // Rendera alla listningar
          bindSearchForm(searchListings); // Binda sökformuläret till searchListings
        }
      );
      break;

    case "/AUCTION/listing/single":
    case "/AUCTION/listing/single/index":
      console.log("Single listing page detected. Rendering single listing.");
      import("./handlers/listings.mjs").then(({ renderSingleListing }) => {
        renderSingleListing();
      });
      break;

    case "/AUCTION/login":
    case "/AUCTION/login/index":
      console.log("Login page detected. Setting login form listener.");
      import("./handlers/login.mjs").then(({ setLoginFormListener }) => {
        setLoginFormListener();
      });
      break;

    case "/AUCTION/signup":
    case "/AUCTION/signup/index":
      console.log("Signup page detected. Setting signup form listener.");
      import("./handlers/register.mjs").then(
        ({ setRegistrationFormListener }) => {
          setRegistrationFormListener();
        }
      );
      break;

    case "/AUCTION/profile":
    case "/AUCTION/profile/index":
      console.log("Profile page detected. Setting profile listeners.");

      // Hantera skapande av nya listningar och rendering av befintliga
      import("./handlers/createListing.mjs").then(
        ({ handleCreateListingForm, renderUserListings }) => {
          handleCreateListingForm(); // Hantera skapande av nya listningar
          renderUserListings(); // Rendera användarens befintliga listningar
        }
      );

      // Hantera rendering av användarens profil
      import("./handlers/profile.mjs").then(({ renderProfile }) => {
        renderProfile();
      });

      // Dynamiskt ladda editAvatar endast på profilsidan
      import("./api/profile/editAvatar.mjs").then(({ editAvatar }) => {
        bindEditAvatar(editAvatar);
      });
      break;

    default:
      console.warn(`No listener set for the path: ${path}`);
      // Lägg till en fallback här, exempelvis att omdirigera till en giltig sida
      window.location.href = "/";
  }

  // Lägg till lyssnare för utloggning globalt om logout-knappen finns
  const logoutButton = document.getElementById("logout"); // Kontrollera om logout-knappen finns
  if (logoutButton) {
    import("./handlers/logout.mjs")
      .then(({ setLogOutListener }) => {
        setLogOutListener(); // Säkerställ att logout-funktionen endast körs om knappen finns
      })
      .catch((error) => {
        console.error("Failed to load logout.mjs:", error);
      });
  }
}

// Funktion för att binda editAvatar på profilsidan
function bindEditAvatar(editAvatar) {
  const editIcon = document.getElementById("edit-icon");

  if (editIcon) {
    editIcon.addEventListener("click", editAvatar);
  }
}

// Funktion för att binda searchListings till sökformuläret
function bindSearchForm(searchListings) {
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Förhindra att sidan laddas om

      const query = searchInput.value;
      if (query.trim() !== "") {
        searchListings(query); // Kör sökningen med användarens sökfråga
      }
    });
  }
}

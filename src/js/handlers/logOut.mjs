export function setLogOutListener() {
  const logOut = document.querySelector("#logout");
  const logOut2 = document.querySelector("#logout2");

  if (logOut || logOut2) {
    if (logOut) {
      logOut.addEventListener("click", handleLogOut);
    }
    if (logOut2) {
      logOut2.addEventListener("click", handleLogOut);
    }
  }
}

function handleLogOut() {
  if (confirm("Are you sure you want to sign out?")) {
    localStorage.clear();
    window.location.href = "/profile/login/";
  }
}

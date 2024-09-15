let btnText = "";

export function listingSubmitLoader() {
  const btn = document.querySelector('button[type="submit"]');
  btnText = btn.textContent;
  const cancelBtn = document.querySelector("#btn-cancel") || null;

  // Handle the cancel button
  if (cancelBtn) {
    cancelBtn.disabled = true;
    cancelBtn.classList.add("cursor-not-allowed", "opacity-50");
    cancelBtn.classList.remove("hover:bg-opacity-90");
  }

  // Handle the submit button
  btn.disabled = true;
  btn.classList.remove("hover:bg-opacity-90");
  btn.classList.add("h-10", "flex", "justify-center");
  btn.innerHTML = "";

  const loader = document.createElement("span");
  loader.classList.add("loader", "-mt-[2em]", "text-lavender-light");
  btn.appendChild(loader);
}

export function listingSubmitLoaderOff() {
  const btn = document.querySelector('button[type="submit"]');
  const cancelBtn = document.querySelector("#btn-cancel");

  // Handle the cancel button
  if (cancelBtn) {
    cancelBtn.disabled = false;
    cancelBtn.classList.remove("cursor-not-allowed", "opacity-50");
    cancelBtn.classList.add("hover:bg-opacity-90");
  }

  // Handle the submit button
  btn.disabled = false;
  btn.classList.add("hover:bg-opacity-90");
  btn.classList.remove("h-10", "flex", "justify-center");
  btn.textContent = btnText;

  if (btn.id === "btn-save" || btn.id === "btn-save-listing") {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-cloud", "mr-2");
    btn.prepend(icon);
  }
}

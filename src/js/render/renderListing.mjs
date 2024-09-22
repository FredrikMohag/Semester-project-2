import { getListing } from "../api/listings/getListing.mjs";

export async function listingRender() {
  showLoader();

  try {
    const url = new URL(window.location.href);
    let id = url.searchParams.get("id");

    const listingData = await getListing(id);

    if (!listingData) {
      hideLoader();
      return;
    }

    const container = document.getElementById("specific-post");

    const card = listingTemplate(listingData);

    container.append(card);
  } catch (error) {
    console.error(`Error rendering post: ${error.message}`);
  } finally {
    hideLoader();
  }
}

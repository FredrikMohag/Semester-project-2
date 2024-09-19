import { API_AUCTIONS, API_BASE } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";

export async function getProfiles() {
  const url = `${API_BASE}${API_AUCTIONS}${action}`;
  return await authFetch(url, "GET");
}

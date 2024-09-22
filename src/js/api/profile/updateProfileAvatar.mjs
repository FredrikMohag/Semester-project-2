// src/js/api/updateProfileAvatar.mjs

import { API_AUCTIONS, API_BASE } from "../constants.mjs";
import { authFetch } from "../fetch/authFetch.mjs"; // Fix the path to authFetch

const action = "/profiles";

export async function updateProfileAvatar(profileName, avatarData) {
  const url = `${API_BASE}${API_AUCTIONS}${action}/${profileName}/avatar`;

  // Skicka som JSON
  const body = { avatar: avatarData };

  const responseAvatar = await authFetch(url, "PUT", body);

  // Kontrollera om uppdateringen lyckades
  if (!responseAvatar.ok) {
    throw new Error("Failed to update avatar");
  }

  return responseAvatar.json(); // Returnera svaret från servern som JSON
}

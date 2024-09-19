// src/js/api/profile/getProfile.mjs

import { API_BASE, API_AUCTIONS } from "../constants.mjs";
import { authFetch } from "../fetch/authFetch.mjs";

export async function getProfile(profileName) {
  const url = `${API_BASE}${API_AUCTIONS}/profiles/${profileName}?_listings=true&_wins=true`;

  try {
    const response = await authFetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching profile:", errorData);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getProfile:", error);
    return null;
  }
}

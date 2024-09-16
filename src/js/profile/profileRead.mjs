// src/js/profile/profileRead.mjs

import { API_BASE_URL } from "../constants.mjs";

export async function getProfile(username) {
  const profileURL = `${API_BASE_URL}/profile/${username}`;

  try {
    const response = await fetch(profileURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

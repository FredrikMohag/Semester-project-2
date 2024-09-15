import { load } from "../storage/index.mjs";

import { API_KEY } from "./constants.mjs";

export function headers() {
  const token = load("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-key": API_KEY,
  };
}

/**
 * Fetch with authentication
 * @param {string} url - URL to fetch
 * @param {object} options - Options for fetch
 * @returns {Promise} - Promise object represents the response
 */
export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(JSON.stringify(err.errors, null, 2));
        });
      }

      return response;
    })
    .catch((error) => {
      return error;
    });
}

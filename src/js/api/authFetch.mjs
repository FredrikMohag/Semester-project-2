// src/js/api/auth/authFetch.mjs
import { load } from "../storage/index.mjs";
import { API_KEY, API_BASE_URL } from "../constants.mjs"; // Lägg till API_BASE_URL

export function headers() {
  const token = load("token");
  console.log("API Key:", API_KEY);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": API_KEY,
  };
}

export async function authFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`; // Använd fullständig URL med basen och endpointen
  const headersObj = headers();
  console.log("Request Headers:", headersObj);
  console.log("Request URL:", url);

  try {
    const response = await fetch(url, {
      ...options,
      headers: headersObj,
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Response Error Data:", data);
      throw new Error(
        data.errors?.map((e) => e.message).join(", ") || "Unknown error"
      );
    }
    return data;
  } catch (error) {
    console.error("authFetch error:", error);
    throw error;
  }
}

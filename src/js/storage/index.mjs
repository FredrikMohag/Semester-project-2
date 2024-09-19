// src/js/storage/index.mjs

// Spara en nyckel och värde i localStorage
export function save(key, value) {
  console.log(`Saving to localStorage: ${key} =`, value);
  localStorage.setItem(key, JSON.stringify(value));
}

// Ladda ett värde från localStorage med en given nyckel
export function load(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

// Ta bort en specifik nyckel från localStorage
export function remove(key) {
  console.log(`Removing from localStorage: ${key}`);
  localStorage.removeItem(key); // Denna funktion tar bort en post från localStorage
}

// Funktion för att rensa hela localStorage
export function clear() {
  console.log("Clearing all localStorage data.");
  localStorage.clear();
}

// Lägg till andra nödvändiga funktioner för hantering av listningar eller profiler om det behövs

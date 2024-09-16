// handlers/logOut.mjs

import { remove } from "../storage/index.mjs";

export function logout() {
  remove("token");
  remove("profile");
}

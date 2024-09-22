import { updateProfileAvatar } from "../profile/updateProfileAvatar.mjs";

document
  .getElementById("edit-avatar-button")
  .addEventListener("click", editAvatar);

export async function editAvatar() {
  const profileName = "profileName"; // Byt till dynamiskt profilnamn om nödvändigt

  const avatarInput = document.createElement("input");
  avatarInput.type = "file";
  avatarInput.accept = "image/*";

  avatarInput.onchange = async () => {
    const file = avatarInput.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async function (e) {
        const base64String = e.target.result;

        try {
          // Anropa den importerade funktionen
          await updateProfileAvatar(profileName, base64String);

          // Uppdatera avataren i UI
          const avatarElement = document.getElementById("profile-avatar");
          avatarElement.src = base64String;
        } catch (error) {
          console.error("Error updating avatar:", error);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  avatarInput.click();
}

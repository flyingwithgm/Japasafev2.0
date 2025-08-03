import { db, auth } from "../firebase.js";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { fileToBase64, resizeImage } from "../utils/converters.js";
import { showToast } from "../utils/toast.js";

export const updateProfile = async (data) => {
  try {
    const updates = {
      displayName: data.name,
      lastUpdated: new Date()
    };

    if (data.avatar) {
      const resized = await resizeImage(data.avatar, 200, 200);
      updates.photoBase64 = await fileToBase64(resized);
    }

    await updateDoc(doc(db, "users", auth.currentUser.uid), updates);
    showToast("Profile updated!", "success");
  } catch (error) {
    showToast(error.message, "error");
  }
};

export const getProfile = async () => {
  const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
  return docSnap.data();
};

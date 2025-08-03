import { db, auth } from "../firebase.js";
import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { fileToBase64 } from "../utils/converters.js";
import { showToast } from "../utils/toast.js";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

export const uploadDocument = async (file) => {
  try {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("File exceeds 1MB limit");
    }

    const base64 = await fileToBase64(file);
    const docRef = await addDoc(collection(db, "users", auth.currentUser.uid, "documents"), {
      name: file.name,
      type: file.type,
      base64,
      uploadedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    showToast(error.message, "error");
    throw error;
  }
};

export const getUserDocuments = async () => {
  const q = query(collection(db, "users", auth.currentUser.uid, "documents"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    url: `data:${doc.data().type};base64,${doc.data().base64}`
  }));
};

export const deleteDocument = async (docId) => {
  await deleteDoc(doc(db, "users", auth.currentUser.uid, "documents", docId));
};

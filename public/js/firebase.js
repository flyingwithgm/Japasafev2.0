import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbAgVCp5HBNmLNqTLM22Oc6RqBn3ZaHXM",
  authDomain: "japasafe-7ab87.firebaseapp.com",
  projectId: "japasafe-7ab87",
  messagingSenderId: "274560197405",
  appId: "1:274560197405:web:e861e72c4aede567aaf7f4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

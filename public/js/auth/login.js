import { auth } from "../firebase.js";
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";
import { showToast } from "../utils/toast.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // 1. Set persistence FIRST
    await setPersistence(auth, browserLocalPersistence);
    
    // 2. Sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login success! User UID:", userCredential.user.uid);
    
    // 3. Verify auth state before redirect
    if (auth.currentUser) {
      window.location.href = "/dashboard.html"; // Absolute path
    } else {
      throw new Error("Auth state not persisted");
    }
  } catch (error) {
    console.error("Login error:", error.code, error.message);
    
    // User-friendly error messages
    let message = error.message.replace("Firebase: ", "");
    if (error.code === "auth/invalid-credential") {
      message = "Wrong email or password";
    }
    showToast(message, "error");
  }
});

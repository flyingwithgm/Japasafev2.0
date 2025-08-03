import { auth } from "../firebase.js";
import { 
  signInWithEmailAndPassword, 
  setPersistence, 
  browserSessionPersistence  // Changed from local to session
} from "firebase/auth";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // 1. Set persistence FIRST
    await setPersistence(auth, browserSessionPersistence); // Ensures auth survives redirect
    
    // 2. Sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // 3. Verify auth state
    if (auth.currentUser) {
      window.location.href = "/dashboard"; // No .html extension (Vercel-friendly)
    }
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message.replace("Firebase: ", ""));
  }
});

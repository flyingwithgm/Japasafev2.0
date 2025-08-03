import { auth } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { showToast } from "../utils/toast.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "/dashboard.html";
  } catch (error) {
    showToast(error.message, "error");
  }
});

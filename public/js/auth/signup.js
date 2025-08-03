import { auth } from "../firebase.js";
import { 
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await setPersistence(auth, browserSessionPersistence);
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "/dashboard"; // Same as login
  } catch (error) {
    alert(error.message.replace("Firebase: ", ""));
  }
});

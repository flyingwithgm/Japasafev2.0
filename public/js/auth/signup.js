import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { showToast } from "../utils/toast.js";

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    
    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      displayName: name,
      createdAt: new Date()
    });
    
    window.location.href = "/dashboard.html";
  } catch (error) {
    showToast(error.message, "error");
  }
});

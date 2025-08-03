import { auth } from "../firebase.js";
import { showToast } from "../utils/toast.js";

export const initAuthStateListener = () => {
  auth.onAuthStateChanged((user) => {
    const publicPages = ["/login.html", "/signup.html", "/index.html"];
    const currentPage = window.location.pathname;
    
    if (user && publicPages.includes(currentPage)) {
      window.location.href = "/dashboard.html";
    } else if (!user && !publicPages.includes(currentPage)) {
      window.location.href = "/login.html";
    }
  });
};

export const logout = async () => {
  try {
    await auth.signOut();
    window.location.href = "/login.html";
  } catch (error) {
    showToast(error.message, "error");
  }
};

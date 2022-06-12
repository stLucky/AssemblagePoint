import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { writeUserData } from "@/helpers/base";

export const useAuthStore = defineStore("authStore", () => {
  const isLoading = ref(false);

  const isAuthorized = ref(false);
  const setAuthorized = (value) => {
    isAuthorized.value = value;
  };

  const register = async ({ email, password, name }) => {
    isLoading.value = true;
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const uid = auth.currentUser?.uid;

      writeUserData(uid, email, name);
    } finally {
      isLoading.value = false;
    }
  };

  const login = async ({ email, password }) => {
    isLoading.value = true;
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    await signOut(getAuth());
  };

  return {
    isLoading,

    isAuthorized,
    setAuthorized,

    register,
    login,
    logout,
  };
});

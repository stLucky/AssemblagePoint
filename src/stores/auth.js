import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useUserStore } from "@/stores/user";

export const useAuthStore = defineStore("authStore", () => {
  const userStore = useUserStore();
  const isLoading = ref(false);

  const isAuthorized = ref(false);
  const setAuthorized = (value) => {
    isAuthorized.value = value;
  };

  const register = async ({ email, password, name }) => {
    isLoading.value = true;

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      userStore.setName(name);
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

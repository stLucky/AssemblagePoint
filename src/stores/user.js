import { defineStore } from "pinia";
import { reactive } from "vue";
import { getAuth } from "firebase/auth";
import { getUserData } from "@/helpers/base";

export const useUserStore = defineStore("userStore", () => {
  const user = reactive({});

  const fetchUser = async () => {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    try {
      const response = await getUserData(uid);
      Object.assign(user, response);
    } catch (err) {
      console.error(err);
    }
  };

  const clearUser = () => {
    Object.keys(user).forEach((key) => {
      user[key] = "";
    });
  };

  return {
    user,
    fetchUser,
    clearUser,
  };
});

import { defineStore } from "pinia";
import { reactive } from "vue";
import { writeUserRole } from "@/helpers/firebase";

export const useUserStore = defineStore("userStore", () => {
  const user = reactive({
    displayName: "",
    email: "",
    uid: "",
    role: "",
  });

  const setUser = (value) => {
    Object.keys(user).forEach((key) => {
      if (!value[key]) return;
      user[key] = value[key];
    });
  };

  const setName = (name) => {
    user.displayName = name;
  };

  const setRole = async (role) => {
    await writeUserRole(user.uid, role);
    user.role = role;
  };

  const clearUser = () => {
    Object.keys(user).forEach((key) => {
      user[key] = "";
    });
  };

  return {
    user,
    setUser,
    setName,
    setRole,
    clearUser,
  };
});

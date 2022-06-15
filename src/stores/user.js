import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getUserFromDatabase } from "@/helpers/firebase";

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

  const setRole = (role) => {
    user.role = role;
  };

  const getRole = async () => {
    const { role } = await getUserFromDatabase(user.uid);
    setRole(role);
  };

  const clearUser = () => {
    Object.keys(user).forEach((key) => {
      user[key] = "";
    });
  };

  const lastMessage = ref(null);
  const updateLastMessage = (message) => {
    lastMessage.value = message;
  };

  return {
    user,
    setUser,
    setName,
    setRole,
    getRole,
    clearUser,

    lastMessage,
    updateLastMessage,
  };
});

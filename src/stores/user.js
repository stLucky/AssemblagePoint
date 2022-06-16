import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getUserFromDatabase, writeUserToDatabase } from "@/helpers/firebase";
import { useToast } from "vue-toastification";
import { Errors } from "@/const";

export const useUserStore = defineStore("userStore", () => {
  const toast = useToast();

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

  const writeUser = async () => {
    try {
      await writeUserToDatabase(user, "common");
      setRole("common");
    } catch (err) {
      toast.error(Errors.USER);
    }
  };

  const getRoleFromDatabase = async () => {
    try {
      const { role } = await getUserFromDatabase(user.uid);
      setRole(role);

      return role;
    } catch (err) {
      toast.error(Errors.ROLE);
    }
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
    getRoleFromDatabase,
    clearUser,
    writeUser,

    lastMessage,
    updateLastMessage,
  };
});

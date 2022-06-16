import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getUserFromDatabase, writeUserToDatabase } from "@/helpers/firebase";
import { useToast } from "vue-toastification";
import { Errors } from "@/const";
import { writeLastMessageToDataBase } from "@/helpers/firebase";

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
      const role =
        user.email === "assemblage4point@gmail.com" ? "admin" : "common";
      await writeUserToDatabase(user, role);
      setRole(role);
    } catch (err) {
      toast.error(Errors.USER);
    }
  };

  const setUserFromDatabase = async () => {
    try {
      const { role, lastMessage } = await getUserFromDatabase(user.uid);
      setRole(role);
      if (lastMessage) {
        updateLastMessage(lastMessage);
      }

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
  const writeLastMessageToUser = async (roomId, message) => {
    try {
      await writeLastMessageToDataBase(roomId, message);

      updateLastMessage(message);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    user,
    setUser,
    setName,
    setRole,
    setUserFromDatabase,
    clearUser,
    writeUser,

    lastMessage,
    writeLastMessageToUser,
  };
});

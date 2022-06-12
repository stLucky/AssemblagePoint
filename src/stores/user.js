import { defineStore } from "pinia";
import { reactive } from "vue";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";

export const useUserStore = defineStore("userStore", () => {
  const user = reactive({});

  const fetchUser = async () => {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    const dbRef = ref(getDatabase());

    try {
      const snapshot = await get(child(dbRef, `users/${uid}`));
      if (snapshot.exists()) {
        Object.assign(user, snapshot.val());
      } else {
        console.log("No data available");
      }
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

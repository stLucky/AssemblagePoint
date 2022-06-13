<template>
  <div
    class="w-screen h-screen flex flex-col p-8 bg-gradient-to-r from-green-900 to-teal-900 text-white"
  >
    <THeader />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";

import THeader from "./components/THeader.vue";

const authStore = useAuthStore();
const userStore = useUserStore();

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    authStore.setAuthorized(true);
    console.log("onAuthStateChanged", user);
    userStore.setUser(user);
  } else {
    authStore.setAuthorized(false);
    userStore.clearUser();
  }
});
</script>

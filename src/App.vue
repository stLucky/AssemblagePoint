<template>
  <div
    class="min-h-screen flex flex-col p-8 bg-gradient-to-r from-green-900 to-teal-900 text-white"
    :class="appCl"
  >
    <THeader class="mb-10" />
    <RouterView />
    <TFooter />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";

import THeader from "./components/THeader.vue";
import TFooter from "./components/TFooter.vue";

const route = useRoute();

const authStore = useAuthStore();
const userStore = useUserStore();

const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    userStore.setUser(user);
    authStore.setAuthorized(true);

    if (!userStore.user.role) {
      const { role, displayName } = await userStore.setUserFromDatabase();
      if (!role || !displayName) {
        userStore.writeUser();
      }
    }
  } else {
    authStore.setAuthorized(false);
    userStore.clearUser();
  }
});

const isRoomPage = computed(() => route.name === "room");
const appCl = computed(() => ({
  "w-screen": isRoomPage.value,
  "h-screen": isRoomPage.value,
}));
</script>

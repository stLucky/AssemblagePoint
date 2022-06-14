<template>
  <div class="min-w-full border rounded lg:grid lg:grid-cols-3 h-full bg-white">
    <ChatRooms :rooms="users" v-model:activeRoom="activeRoom" />
    <ChatMessages :activeRoom="activeRoom">
      <ChatControls />
    </ChatMessages>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

import ChatRooms from "./ChatRooms.vue";
import ChatMessages from "./ChatMessages.vue";
import ChatControls from "./ChatControls.vue";

import { getUsers } from "@/helpers/firebase";

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

// логика комнат
const users = ref([]);

const setRooms = async (val) => {
  if (!val) return;
  users.value = await getUsers(val === "admin" ? "common" : "admin");
  activeRoom.value = users.value[users.value.length - 1];
};

const activeRoom = ref({});

watch(
  () => userStore.user.role,
  (val) => {
    setRooms(val);
  }
);
</script>

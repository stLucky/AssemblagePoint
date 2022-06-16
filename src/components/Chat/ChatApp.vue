<template>
  <div
    class="min-w-full border rounded lg:grid lg:grid-cols-3 h-full bg-white"
    v-if="!isLoading && !isError"
  >
    <ChatRooms
      :rooms="users"
      v-model:activeRoom="activeRoom"
      v-show="isVisibleRooms"
    />
    <ChatMessages
      v-model:activeRoom="activeRoom"
      v-show="isVisibleMessages"
      :isVisible="isVisibleMessages"
    >
      <ChatControls :activeRoom="activeRoom" />
    </ChatMessages>
  </div>
  <div
    class="bg-white border rounded h-full w-full flex items-center justify-center"
    v-else
  >
    <TLoader size="3" v-if="isLoading" />
    <p class="text-gray-600 font-bold" v-if="isError">Приложение не доступно</p>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

import ChatRooms from "./ChatRooms.vue";
import ChatMessages from "./ChatMessages.vue";
import ChatControls from "./ChatControls.vue";
import TLoader from "../TLoader.vue";

import { getUsers } from "@/helpers/firebase";
import { useUserStore } from "@/stores/user";
import { useMediaQuery } from "@/hooks/media-query";
import { computed } from "@vue/reactivity";

const userStore = useUserStore();

const { isBoundary: isDesktop } = useMediaQuery("(min-width: 1024px)");

const isLoading = ref(true);
const isError = ref(false);

// логика комнат
const users = ref([]);

const setUsers = async (val) => {
  if (!val) return;
  if (isError.value) isError.value = false;

  try {
    users.value = await getUsers(val === "admin" ? "common" : "admin");
  } catch (err) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const activeRoom = ref({});
const hasActiveRoom = computed(() => Object.keys(activeRoom.value).length);
const isVisibleRooms = computed(
  () => (!hasActiveRoom.value && !isDesktop.value) || isDesktop.value
);
const isVisibleMessages = computed(
  () => (hasActiveRoom.value && !isDesktop.value) || isDesktop.value
);

watch(
  () => userStore.user.role,
  (val) => {
    setUsers(val);
  }
);
</script>

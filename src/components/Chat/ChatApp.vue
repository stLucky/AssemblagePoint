<template>
  <div
    class="min-w-full border rounded lg:grid lg:grid-cols-3 h-full bg-white"
    v-if="!isLoading"
  >
    <ChatRooms
      :rooms="users"
      v-model:activeRoom="activeRoom"
      v-show="isVisibleRooms"
    />
    <ChatMessages v-model:activeRoom="activeRoom" v-show="isVisibleMessages">
      <ChatControls />
    </ChatMessages>
  </div>
  <div
    class="bg-white border rounded h-full w-full flex items-center justify-center"
    v-else
  >
    <TLoader size="12" />
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

// логика комнат
const users = ref([]);

const setUsers = async (val) => {
  if (!val) return;
  users.value = await getUsers(val === "admin" ? "common" : "admin");
  isLoading.value = false;
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

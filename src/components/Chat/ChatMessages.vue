<template>
  <div class="hidden lg:col-span-2 lg:block">
    <div class="w-full h-full flex flex-col">
      <div class="relative flex items-center p-3 border-b border-gray-300">
        <span class="block ml-2 font-bold text-gray-600">
          {{ activeRoom.displayName }}
        </span>
      </div>
      <div
        class="relative w-full p-6 overflow-y-auto grow"
        style="max-height: calc(100vh - 260px)"
      >
        <ul class="space-y-2">
          <li
            class="flex"
            :class="itemCl(message.uid)"
            v-for="message in messages"
            :key="message.id"
          >
            <p
              class="relative max-w-xl px-4 py-2 text-gray-600 rounded shadow"
              :class="itemInnerCl(message.uid)"
            >
              {{ message.text }}
            </p>
          </li>
        </ul>
      </div>
      <slot />
    </div>
  </div>
</template>
<script setup>
import { computed, onUnmounted, ref } from "vue";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const props = defineProps({
  activeRoom: {
    type: Object,
    required: true,
  },
});

const roomId = computed(() =>
  userStore.user.role === "admin" ? props.activeRoom.uid : userStore.user.uid
);

const messages = ref([]);

const db = getFirestore();
const q = query(
  collection(db, `users/${roomId.value}/messages`),
  orderBy("createdAt")
);

const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
  console.log("querySnapshot.docs", querySnapshot.docs);
  messages.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
});
onUnmounted(() => {
  unsubscribeMessages();
});

const isCurrentUser = (uid) => {
  return uid === userStore.user.uid;
};

const itemCl = computed(
  () => (uid) => isCurrentUser(uid) ? "justify-end" : "justify-start"
);

const itemInnerCl = computed(() => (uid) => ({
  "bg-gray-100": isCurrentUser(uid),
}));
</script>

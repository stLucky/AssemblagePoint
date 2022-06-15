<template>
  <div class="lg:col-span-2 h-full">
    <div
      class="w-full h-full flex flex-col"
      v-if="Object.keys(activeRoom).length"
    >
      <div
        class="relative flex items-center p-3 border-b border-gray-300 text-gray-600"
      >
        <button
          type="button"
          class="hover:text-black transition-all"
          v-if="!isDesktop"
          @click="handleBackClick"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 class="block ml-2 font-bold">
          {{ activeRoom.displayName }}
        </h2>
      </div>
      <div
        class="relative w-full p-6 overflow-y-auto grow scrollbar"
        style="max-height: calc(100vh - 260px)"
      >
        <ul class="space-y-2" v-if="messages.length">
          <li
            class="flex"
            :class="itemCl(message.uid)"
            v-for="message in messages"
            :key="message.id"
            :ref="(el) => messagesEl.push(el)"
          >
            <p
              class="relative max-w-xl px-4 py-2 text-gray-600 rounded shadow"
              :class="itemInnerCl(message.uid)"
            >
              {{ message.text }}
            </p>
          </li>
        </ul>
        <p
          class="w-full h-full text-gray-600 flex items-center justify-center"
          v-else
        >
          Нет сообщений
        </p>
      </div>
      <slot />
    </div>
    <div
      class="flex items-center justify-center text-gray-600 w-full h-full"
      v-else
    >
      Выберите чат
    </div>
  </div>
</template>
<script setup>
import { computed, onUnmounted, ref, watch } from "vue";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { useUserStore } from "@/stores/user";
import { useMediaQuery } from "@/hooks/media-query";

const userStore = useUserStore();

const { isBoundary: isDesktop } = useMediaQuery("(min-width: 1024px)");

const props = defineProps({
  activeRoom: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:activeRoom"]);

// определяет id комнаты для получения сообщений в зависимости от роли пользователя
const roomId = computed(() =>
  userStore.user.role === "admin" ? props.activeRoom.uid : userStore.user.uid
);

const messages = ref([]);

// подскролл к последнему сообщению
const messagesEl = ref([]);
watch(
  messagesEl,
  () => {
    const el = messagesEl.value.slice(-1)[0];
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  },
  { deep: true }
);

// получаем все сообщения
const db = getFirestore();
const q = query(
  collection(db, `users/${roomId.value}/messages`),
  orderBy("createdAt")
);

const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
  messages.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
});
onUnmounted(() => {
  unsubscribeMessages();
});

// задаем стили для своих сообщений
const isCurrentUser = (uid) => {
  return uid === userStore.user.uid;
};
const itemCl = computed(
  () => (uid) => isCurrentUser(uid) ? "justify-end" : "justify-start"
);
const itemInnerCl = computed(() => (uid) => ({
  "bg-gray-100": isCurrentUser(uid),
}));

const handleBackClick = () => {
  emit("update:activeRoom", {});
};
</script>
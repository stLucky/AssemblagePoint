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
          {{ activeRoom.displayName || activeRoom.email }}
        </h2>
      </div>
      <div
        class="relative w-full p-6 overflow-y-auto grow scrollbar text-center"
        style="max-height: calc(100vh - 260px)"
        ref="scrollableBoxEl"
      >
        <div
          class="w-full h-full flex items-center justify-center"
          v-if="isLoading"
        >
          <TLoader size="2" />
        </div>
        <p
          class="w-full h-full text-gray-600 flex items-center justify-center"
          v-else-if="isError"
        >
          Ошибка
        </p>
        <template v-else-if="messages.length">
          <template v-for="(group, key) in groupedMessages" :key="key">
            <time
              :datetime="new Date(+key).toISOString()"
              class="font-bold text-gray-600"
            >
              {{ getLocaleDate(+key) }}
            </time>
            <ul>
              <li
                class="flex mb-2 last:mb-0"
                :class="itemCl(message.uid)"
                v-for="message in group"
                :key="message.id"
                :ref="(el) => el && messagesEl.push(el)"
              >
                <p
                  class="relative max-w-xl px-4 py-2 text-gray-600 rounded shadow"
                  :class="itemInnerCl(message.uid)"
                >
                  {{ message.text }}
                </p>
              </li>
            </ul>
          </template>
        </template>
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
import { computed, onBeforeUpdate, ref, watch } from "vue";
import TLoader from "../TLoader.vue";
import { getTimestampDay, getLocaleDate } from "@/helpers/utils";
import { subscribeMessages, getMessages } from "@/helpers/firebase";

import { useMediaQuery } from "@/hooks/media-query";
import { useChat } from "@/hooks/chat";

const { isBoundary: isDesktop } = useMediaQuery("(min-width: 1024px)");

const props = defineProps({
  activeRoom: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:activeRoom"]);

const { userStore, roomId } = useChat(props);

const messages = ref([]);
const isLoading = ref(false);
const isError = ref(false);

const groupedMessages = computed(() =>
  messages.value.reduce((result, item) => {
    const date = getTimestampDay(item.createdAt);
    if (!result[date]) result[date] = [];
    result[date].push(item);

    return result;
  }, {})
);

// получаем все сообщения
const setMessages = async () => {
  isLoading.value = true;
  if (isError.value) isError.value = false;

  try {
    messages.value = await getMessages(roomId.value);
  } catch (err) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

// подскролл к последнему сообщению
const messagesEl = ref([]);
onBeforeUpdate(() => {
  messagesEl.value = [];
});
const lastEl = computed(() =>
  messagesEl.value.find(
    (item) =>
      messages.value[messages.value.length - 1].text === item.textContent
  )
);
const scrollableBoxEl = ref(null);
const scrollToLastEl = () => {
  if (lastEl.value && scrollableBoxEl.value) {
    lastEl.value.scrollIntoView({
      behavior: "smooth",
    });
  }
};

watch([lastEl, scrollableBoxEl], () => {
  scrollToLastEl();
});

// основная логика по отображению сообщений
let unsubscribeMessages;
watch(
  () => props.activeRoom && props.activeRoom.uid,
  (val) => {
    if (val) {
      setMessages();

      unsubscribeMessages = subscribeMessages(roomId.value, (querySnapshot) => {
        messages.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const lastMessage = messages.value[messages.value.length - 1];
        if (!lastMessage) return;
        userStore.writeLastMessageToUser(roomId.value, lastMessage);
      });
    } else {
      if (unsubscribeMessages) {
        unsubscribeMessages();
      }
      messages.value = [];
      messagesEl.value = [];
    }
  }
);

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

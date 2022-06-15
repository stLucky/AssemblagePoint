<template>
  <form
    class="flex items-center justify-between w-full p-3 border-t border-gray-300"
    @submit.prevent="handleMessageSend"
  >
    <input
      type="text"
      placeholder="Сообщение"
      class="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none text-gray-600 placeholder-gray-400"
      name="message"
      v-model="message"
    />
    <button
      type="submit"
      class="transition-all text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:pointer-events-none"
      :disabled="isDisabled"
    >
      <svg
        class="w-5 h-5 origin-center transform rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
        />
      </svg>
    </button>
  </form>
</template>
<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { sendMessage, writeLastMessageToUser } from "@/helpers/firebase";

const userStore = useUserStore();

const message = ref("");
const handleMessageSend = async () => {
  const options = {
    uid: userStore.user.uid,
    displayName: userStore.user.displayName,
    text: message.value,
  };

  await sendMessage(options);

  message.value = "";

  await writeLastMessageToUser(options);
};

const isDisabled = computed(() => !message.value.length);
</script>

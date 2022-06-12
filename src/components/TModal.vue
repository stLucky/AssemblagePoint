<template>
  <teleport to="body">
    <template v-if="isVisible">
      <div
        class="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center"
      >
        <div
          class="relative z-20 py-3 sm:max-w-xl sm:mx-auto transition-all w-full"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
          ></div>
          <div
            class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
          >
            <slot />

            <button
              class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              @click="handleClose"
              aria-label="close modal"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        class="py-12 bg-gray-700/70 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="modal"
        @click="handleClose"
      />
    </template>
  </teleport>
</template>
<script setup>
import { defineEmits, defineProps } from "vue";

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["loginModal"]);

const handleClose = () => {
  emit("update:isVisible", false);
};
</script>

<template>
  <template v-if="!authStore.isAuthorized">
    <button
      type="button"
      class="border-2 border-white mr-2 hover:border-gray-400 transition-all px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
      id="user-menu-button"
      aria-expanded="false"
      aria-haspopup="true"
      @click="showRegisterModal"
    >
      <span class="hidden sm:block"> Регистрация </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 sm:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        />
      </svg>
    </button>
    <button
      type="button"
      class="border-2 border-white hover:border-gray-400 transition-all px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
      id="user-menu-button"
      aria-expanded="false"
      aria-haspopup="true"
      @click="showLoginModal"
    >
      <span class="hidden sm:block"> Войти </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 sm:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
    </button>
  </template>
  <div class="flex items-center" v-else>
    <span class="font-bold text-lg">
      {{ user.displayName || user.email }}
    </span>
    <div class="relative group ml-4">
      <div class="pb-2 cursor-pointer">
        <button
          class="h-12 w-12 rounded-full overflow-hidden focus:outline-none border-2 border-white hover:border-gray-400 flex items-center justify-center transition-all"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        class="absolute z-10 right-3/4 sm:right-1/2 w-40 py-2 bg-white border rounded shadow-xl hidden group-hover:block translate-x-2/4"
      >
        <button
          type="button"
          class="transition-colors duration-200 block px-4 py-2 text-normal text-gray-900 rounded hover:bg-teal-800 hover:text-white w-full"
          @click="handleLogoutClick"
        >
          Выйти
        </button>
      </div>
    </div>
  </div>
  <TModal v-model:isVisible="isVisibleRegister">
    <RegisterForm @close="hideRegisterModal" />
  </TModal>
  <TModal v-model:isVisible="isVisibleLogin">
    <LoginForm @close="hideLoginModal" />
  </TModal>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";
import TModal from "./TModal.vue";
import RegisterForm from "./RegisterForm.vue";
import LoginForm from "./LoginForm.vue";
import { Errors } from "@/const";

const router = useRouter();
const authStore = useAuthStore();
const { user } = useUserStore();
const toast = useToast();

const isVisibleRegister = ref(false);
const showRegisterModal = () => {
  isVisibleRegister.value = true;
};
const hideRegisterModal = () => {
  isVisibleRegister.value = false;
};

const isVisibleLogin = ref(false);
const showLoginModal = () => {
  isVisibleLogin.value = true;
};
const hideLoginModal = () => {
  isVisibleLogin.value = false;
};

const handleLogoutClick = async () => {
  try {
    await authStore.logout();
    router.push({ name: "home" });
  } catch (err) {
    toast.error(Errors.COMMON);
  }
};
</script>

<template>
  <div class="max-w-md mx-auto">
    <div>
      <h1 class="text-2xl font-semibold text-gray-700">Авторизация</h1>
    </div>
    <div class="divide-y divide-gray-200">
      <form
        class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
      >
        <div class="relative">
          <input
            autocomplete="off"
            id="email"
            name="email"
            type="email"
            class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            placeholder="Почта"
            v-model="form.email"
          />
          <label
            for="email"
            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >Почта</label
          >
        </div>
        <div class="relative">
          <input
            autocomplete="off"
            id="password"
            name="password"
            type="password"
            class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            placeholder="Пароль не менее 6 символов"
            v-model="form.password"
          />
          <label
            for="password"
            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >Пароль</label
          >
        </div>
        <div class="relative">
          <button
            class="inline-flex items-center bg-green-600 hover:bg-green-700 transition-all text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isDisabled"
            @click.prevent="handleSignInClick"
          >
            <TLoader v-if="authStore.isLoading" />
            Войти
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive, defineEmits } from "vue";
import { useToast } from "vue-toastification";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { ErrorsInterpreter } from "@/const";
import TLoader from "./TLoader.vue";

const emit = defineEmits(["close"]);

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const form = reactive({
  email: "",
  password: "",
});

const isDisabled = computed(() => !form.email.length || !form.password.length);

const handleSignInClick = async () => {
  if (isDisabled.value) return;

  try {
    await authStore.login({ email: form.email, password: form.password });
    emit("close");
    router.push({ name: "room" });
  } catch (err) {
    const message = ErrorsInterpreter[err.code] || err.message;
    toast.error(message);
  }
};
</script>

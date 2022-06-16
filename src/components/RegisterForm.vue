<template>
  <div class="max-w-md mx-auto">
    <div>
      <h1 class="text-2xl font-semibold text-gray-700">Регистрация</h1>
    </div>
    <div class="divide-y divide-gray-200">
      <form
        class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
      >
        <div class="relative">
          <input
            autocomplete="off"
            id="name"
            name="name"
            type="text"
            class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            placeholder="Имя"
            v-model="form.name.value"
          />
          <label
            for="email"
            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >Имя</label
          >
        </div>
        <div class="relative">
          <input
            autocomplete="off"
            id="email"
            name="email"
            type="email"
            class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            placeholder="Почта"
            @input="handleChange"
            v-model="form.email.value"
          />
          <label
            for="email"
            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >Почта</label
          >
          <p v-if="form.email.error" class="text-red-700 text-sm font-semibold">
            {{ form.email.errorText }}
          </p>
        </div>
        <div class="relative">
          <input
            autocomplete="off"
            id="password"
            name="password"
            type="password"
            class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
            placeholder="Пароль не менее 6 символов"
            @input="handleChange"
            v-model="form.password.value"
          />
          <label
            for="password"
            class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >Пароль</label
          >
          <p
            v-if="form.password.error"
            class="text-red-700 text-sm font-semibold"
          >
            {{ form.password.errorText }}
          </p>
        </div>
        <div class="relative">
          <button
            class="inline-flex items-center bg-green-600 hover:bg-green-700 transition-all text-white rounded-md px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isDisabled"
            @click.prevent="handleRegisterClick"
          >
            <TLoader v-if="authStore.isLoading" />
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive, defineEmits } from "vue";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/auth";
import { ErrorsInterpreter } from "@/const";
import TLoader from "./TLoader.vue";

const emit = defineEmits(["close"]);

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const form = reactive({
  name: {
    value: "",
  },
  email: {
    value: "",
    error: false,
    regex: /\S+@\S+\.\S+/,
    errorText:
      "Пожалуйста, введите правильный адрес почты. Например, example@gmail.com",
  },
  password: {
    value: "",
    error: false,
    regex: /\S{6,}/,
    errorText: "Пароль должен состоять минимум из 6 символов",
  },
});

const isDisabled = computed(
  () =>
    !form.name.value ||
    !form.email.value.length ||
    !form.password.value.length ||
    form.email.error ||
    form.password.error
);

const handleChange = ({ target }) => {
  const { name, value } = target;
  const rule = form[name].regex;
  const isValidField = rule.test(value);
  form[name].error = !isValidField;
};

const handleRegisterClick = async () => {
  if (isDisabled.value) return;

  try {
    await authStore.register({
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    });

    emit("close");
    router.push({ name: "room" });
    toast.success(`${form.name.value} зарегистрирован в системе`);
  } catch (err) {
    const message = ErrorsInterpreter[err.code] || err.message;
    toast.error(message);
  }
};
</script>

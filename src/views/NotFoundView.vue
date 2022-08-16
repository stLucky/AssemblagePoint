<template>
  <main class="grow flex flex-col justify-center items-center">
    <h2 class="text-5xl font-bold mb-10">Ошибка 404</h2>
    <p class="text-3xl text-center mb-10">
      Страница не найдена, проверьте адрес страницы и повторите попытку.
    </p>
    <router-link
      to="/"
      class="border-2 border-white mr-2 hover:border-gray-400 transition-all px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
    >
      Вернуться на главную страницу
    </router-link>
  </main>
</template>

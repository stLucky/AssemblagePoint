<template>
  <header>
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex items-center sm:items-stretch">
          <div class="flex-shrink-0 flex items-center">
            <img
              src="@/assets/img/logo.svg"
              alt="Логотип"
              width="50"
              height="50"
              class="shrink-0 sm:mr-4"
            />
            <h1 class="text-3xl font-bold hidden sm:block">Точка сборки</h1>
          </div>
        </div>
        <div class="flex items-center pr-2 sm:ml-6 sm:pr-0">
          <UserMenu />
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import UserMenu from "./UserMenu.vue";
</script>

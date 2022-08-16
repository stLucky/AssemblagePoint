<template>
  <main class="grow pt-4 w-full overflow-hidden">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-full">
      <ChatApp class="overflow-auto scrollbar" />
    </div>
  </main>
</template>
<script setup>
import ChatApp from "@/components/Chat/ChatApp.vue";
</script>

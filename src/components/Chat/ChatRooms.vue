<template>
  <div class="border-r border-gray-300 lg:col-span-1">
    <ul class="overflow-auto">
      <h2 class="my-3 mb-2 ml-2 text-lg text-gray-600">Чаты</h2>
      <li v-for="room in rooms" :key="room.uid">
        <a
          class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
          @click="handleRoomClick(room)"
          :class="roomCl(room.uid)"
          style="min-height: 65px"
        >
          <div class="w-full pb-2">
            <div class="flex justify-between">
              <span class="block ml-2 font-semibold text-gray-600">{{
                room.displayName
              }}</span>
              <span class="block ml-2 text-sm text-gray-600" v-if="lastMessage">
                {{ getLocaleDate(lastMessage.createdAt) }}
              </span>
            </div>
            <span class="block ml-2 text-sm text-gray-600" v-if="lastMessage">
              {{ lastMessage.text }}
            </span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { defineProps, defineEmits } from "vue";
import { useUserStore } from "@/stores/user";
import { getLocaleDate } from "@/helpers/utils";
import { storeToRefs } from "pinia";

const props = defineProps({
  rooms: {
    type: Array,
    required: true,
  },
  activeRoom: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:activeRoom"]);

const { lastMessage } = storeToRefs(useUserStore());

const roomCl = computed(() => (uid) => ({
  "bg-gray-100": props.activeRoom.uid === uid,
}));

const handleRoomClick = (room) => {
  emit("update:activeRoom", room);
};
</script>

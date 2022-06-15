import { computed } from "vue";
import { useUserStore } from "@/stores/user";

export const useChat = () => {
  const userStore = useUserStore();

  const roomId = computed(() =>
    userStore.user.role === "admin" ? props.activeRoom.uid : userStore.user.uid
  );

  return {
    roomId,
  };
};

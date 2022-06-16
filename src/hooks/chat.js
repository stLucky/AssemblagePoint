import { computed } from "vue";
import { useUserStore } from "@/stores/user";

export const useChat = (props) => {
  const userStore = useUserStore();

  // определяет id комнаты для получения и отправки сообщений в зависимости от роли пользователя
  const roomId = computed(() =>
    userStore.user.role === "admin" ? props.activeRoom.uid : userStore.user.uid
  );

  return {
    userStore,
    roomId,
  };
};

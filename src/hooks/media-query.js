import { ref, onBeforeUnmount } from "vue";

export const useMediaQuery = (query) => {
  const isBoundary = ref(false);

  const setBoundary = () => {
    const listener = (e) => (isBoundary.value = e.matches);

    const mediaQuery = window.matchMedia(query);

    isBoundary.value = mediaQuery.matches;

    mediaQuery.addEventListener("change", listener);

    onBeforeUnmount(() => {
      mediaQuery.removeEventListener("change", listener);
    });
  };

  const init = () => {
    setBoundary();
  };
  init();

  return {
    isBoundary,
  };
};

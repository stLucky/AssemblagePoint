import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RoomView from "@/views/RoomView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/room",
      name: "room",
      component: RoomView,
      meta: {
        isRequiersAuth: true,
      },
    },
    { path: "/:pathMatch(.*)*", component: NotFoundView },
  ],
});

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener();
//       },
//       reject
//     );
//   });
// };

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isRequiersAuth = to.matched.some(
    (record) => record.meta.isRequiersAuth
  );

  if (isRequiersAuth && !authStore.isAuthorized) {
    next({ name: "home" });
  } else if (!isRequiersAuth && authStore.isAuthorized) {
    next({ name: "room" });
  } else {
    next();
  }
});

// if (isRequiersAuth) {
//   if (await getCurrentUser()) {
//     next();
//   } else {
//     next({ name: "home" });
//   }
// } else {
//   next();
// }
// });

export default router;

import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";

import App from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQa7UUDJIJY_mB2HywDFwF5SCdCsWTdeI",
  authDomain: "assemblagepoint-a84a4.firebaseapp.com",
  databaseURL: "https://assemblagepoint-a84a4-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "assemblagepoint-a84a4",
  storageBucket: "assemblagepoint-a84a4.appspot.com",
  messagingSenderId: "82310205781",
  appId: "1:82310205781:web:4ec9031e102a3533659fdc",
};

initializeApp(firebaseConfig);

const auth = getAuth();

let app;
onAuthStateChanged(auth, () => {
  if (app) return;

  app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(Toast);

  app.mount("#app");
});

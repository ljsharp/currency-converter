import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { createRouter, createWebHistory } from "vue-router";
import CurrencyConverter from "./components/CurrencyConverter.vue";
import UpdateRates from "./components/UpdateRates.vue";

const routes = [
  { path: "/", component: CurrencyConverter },
  { path: "/update-rates", component: UpdateRates },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");

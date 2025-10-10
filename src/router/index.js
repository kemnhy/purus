import { createRouter, createWebHistory } from "vue-router";
import Estimate from "@/views/Estimate.vue";

import Reser_check from "@/views/Reser_check.vue";
import Review from "@/views/Review.vue";
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/estimate", component: Estimate },
  { path: "/reser_check", component: Reser_check },
  { path: "/review", component: Review },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

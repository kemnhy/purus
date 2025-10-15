import { createRouter, createWebHistory } from "vue-router";
import Estimate from "@/views/Estimate.vue";

import Reser_check from "@/views/Reser_check.vue";
import Estimate_02 from "@/views/Estimate_02.vue";
import Estimate_03 from "@/views/Estimate_03.vue";
import Review from "@/views/Review.vue";
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/estimate", component: Estimate },
  { path: "/estimate02", component: Estimate_02 },
  { path: "/estimate03", component: Estimate_03 },
  { path: "/reser_check", component: Reser_check },
  { path: "/review", component: Review },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

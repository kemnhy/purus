import { createRouter, createWebHistory } from "vue-router";
import Estimate from "@/views/Estimate.vue";

import Reser_check from "@/views/Reser_check.vue";
import Estimate_02 from "@/views/Estimate_02.vue";
import Estimate_03 from "@/views/Estimate_03.vue";
import Review from "@/views/Review.vue";
import Home from "@/views/Home.vue";
import Side_menu from "@/components/Side_menu.vue";
import Review2 from "@/views/Review2.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/side_menu", component: Side_menu, name: Side_menu },
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

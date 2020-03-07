import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Dashboard from "../views/dashboard.vue";

Vue.use(VueRouter);

export const routeNames = {
  home: "home",
  dashboard: "dashboard"
} as const;

const routes = [
  {
    path: "/",
    name: routeNames.home,
    component: Home
  },
  {
    path: "/dashboard/:id",
    name: routeNames.dashboard,
    component: Dashboard
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

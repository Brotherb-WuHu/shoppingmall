import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const HomeView = () => import("../views/home/HomeView.vue");
const ProfileView = () => import("../views/profile/ProfileView.vue");
const CategoryView = () => import("../views/category/CategoryView.vue");
const CartView = () => import("../views/cart/CartView.vue");
const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: HomeView,
  },
  {
    path: "/profile",
    component: ProfileView,
  },
  {
    path: "/cart",
    component: CartView,
  },
  {
    path: "/category",
    component: CategoryView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

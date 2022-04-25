import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const HomeView = () => import("@/views/home/HomeView.vue");
const ProfileView = () => import("@/views/profile/ProfileView.vue");
const CategoryView = () => import("@/views/category/CategoryView.vue");
const CartView = () => import("@/views/cart/CartView.vue");
const Detail = () => import("@/views/detail/Detail.vue");
const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: HomeView,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/profile",
    component: ProfileView,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/cart",
    component: CartView,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/category",
    component: CategoryView,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/detail/:iid",
    component: Detail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

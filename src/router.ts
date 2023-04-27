import { createRouter, createWebHistory } from 'vue-router';
import Cookies from "js-cookie";

import logger from "@/logger";

import DashboardLayout from "@/pages/user/Layout/DashboardLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/user/Dashboard.vue";
import Login from "@/pages/user/Login.vue";
import Dashboard from "@/pages/user/Dashboard.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    components: { default: Login },
  },
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home",
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    component: Dashboard,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "nav-item active",
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     const token = Cookies.get("authToken");
//     if (token != null && token.length > 0) {
//       logger.log("Token is saved in the cookie:", token);
//       next();
//     } else {
//       logger.log("Token is not saved in the cookie:");
//       const urlParams = new URLSearchParams(window.location.search);
//       const new_token = urlParams.get("token");
//       if (new_token) {
//         Cookies.set("authToken", new_token, { expires: 1 });
//         next();
//       } else {
//         next({ name: "Login" });
//       }
//     }
//   } else {
//     next();
//   }
// });

export default router;

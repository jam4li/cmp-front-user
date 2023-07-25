import Vue from "vue";
import Cookies from "js-cookie";
import Router from "vue-router";

import logger from "@/logger.js";

// Layouts
import DashboardLayout from "@/pages/user/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/user/Layout/AuthLayout.vue";

// Pages
import Dashboard from "@/pages/user/Dashboard.vue";
import User from "@/pages/user/UserProfile.vue";
import Roadmap from "@/pages/user/Roadmap.vue";
import Login from "@/pages/user/Login.vue";
import Register from "@/pages/user/Register.vue";
import Package from "@/pages/user/Package.vue";
import PageNotFound from "@/pages/user/PageNotFound.vue";
import Invest from "@/pages/user/Invest.vue";
import Support from "@/pages/user/Support.vue";
import Authentication from "@/pages/user/Authentication.vue";
import Network from "@/pages/user/Network.vue";
import Wallet from "@/pages/user/Wallet.vue";
import Direct from "@/pages/user/Direct.vue";
import Binary from "@/pages/user/Binary.vue";
import TicketForm from "@/pages/user/Ticket/TicketForm.vue";
import TicketDetail from "@/pages/user/Ticket/TicketDetail.vue";
import Purchase from "@/pages/user/Purchase/Purchase.vue";
import Withdraw from "@/pages/user/Withdraw.vue";
import Transaction from "@/pages/user/Transaction.vue";

Vue.use(Router);

let pagesMenu = {
  path: "/pages",
  component: DashboardLayout,
  name: "Pages",
  redirect: "/pages/user",
  children: [
    {
      path: "user",
      name: "User Page",
      components: { default: User },
    },
    {
      path: "roadmap",
      name: "Roadmap",
      components: { default: Roadmap },
    },
  ],
};

let support = {
  path: "/support",
  name: "Support",
  component: DashboardLayout,
  redirect: "/support/list",
  children: [
    {
      path: "create",
      name: "Ticket Form",
      components: { default: TicketForm },
    },
    {
      path: "list",
      name: "Ticket List",
      components: { default: Support },
    },
    {
      path: "detail/:id",
      name: "Ticket Detail",
      components: { default: TicketDetail },
    },
  ],
};

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: ":referrer_code/:side",
      name: "Register",
      component: Register,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home",
    meta: { requiresAuth: true },
  },
  pagesMenu,
  support,
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        components: { default: Dashboard },
        meta: { requiresAuth: true },
      },
      {
        path: "authentication",
        name: "authentication",
        components: { default: Authentication },
        meta: { requiresAuth: true },
      },
      {
        path: "invest",
        name: "Invest",
        components: { default: Invest },
      },
      {
        path: "network",
        name: "Network",
        components: { default: Network },
      },
      {
        path: "withdraw",
        name: "Withdraw",
        components: { default: Withdraw },
      },
      {
        path: "transaction",
        name: "Transaction",
        components: { default: Transaction },
      },
      {
        path: "wallet",
        name: "Wallet",
        components: { default: Wallet },
      },
      {
        path: "direct",
        name: "Direct",
        components: { default: Direct },
      },
      {
        path: "binary",
        name: "Binary",
        components: { default: Binary },
      },
      {
        path: "package",
        name: "Package",
        components: { default: Package },
        meta: { requiresAuth: true },
      },
      {
        path: "purchase/:packageId",
        name: "Purchase",
        components: { default: Purchase },
        meta: { requiresAuth: true },
      },
      {
        path: "/logout",
        name: "Logout",
        beforeEnter: async (to, from, next) => {
          Cookies.remove("authToken");

          next("/login");
        },
      },
    ],
  },
  authPages,
  {
    path: "*",
    components: { default: PageNotFound },
    meta: { requiresAuth: true },
  },
];

const router = new Router({
  mode: "history",
  routes,
  linkExactActiveClass: "nav-item active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = Cookies.get("authToken");
    if (token != null && token.length > 0) {
      logger.log("Token is saved in the cookie:", token);
      next();
    } else {
      logger.log("Token is not saved in the cookie:");
      const urlParams = new URLSearchParams(window.location.search);
      const new_token = urlParams.get("token");
      if (new_token) {
        Cookies.set("authToken", new_token, { expires: 1 });
        next();
      } else {
        next({ name: "Login" });
      }
    }
  } else {
    next();
  }
});

export default router;

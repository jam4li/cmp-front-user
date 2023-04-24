import Vue from "vue";
import Cookies from "js-cookie";
import Router from "vue-router";

import logger from "@/logger.js";

import DashboardLayout from "@/pages/user/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/user/Pages/AuthLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/user/Dashboard.vue";

// Pages
import User from "@/pages/user/Pages/UserProfile.vue";
import Roadmap from "@/pages/user/Pages/Roadmap.vue";
import Login from "@/pages/user/Pages/Login.vue";
import Package from "@/pages/user/Pages/Package.vue";
import PageNotFound from "@/pages/user/Pages/PageNotFound.vue";

// Components pages
import Buttons from "@/pages/user/Components/Buttons.vue";
import GridSystem from "@/pages/user/Components/GridSystem.vue";
import Panels from "@/pages/user/Components/Panels.vue";
import SweetAlert from "@/pages/user/Components/SweetAlert.vue";
import Notifications from "@/pages/user/Components/Notifications.vue";
import Icons from "@/pages/user/Components/Icons.vue";
import Typography from "@/pages/user/Components/Typography.vue";

// Forms pages
import RegularForms from "@/pages/user/Forms/RegularForms.vue";
import ExtendedForms from "@/pages/user/Forms/ExtendedForms.vue";
import ValidationForms from "@/pages/user/Forms/ValidationForms.vue";
import TicketForm from "@/pages/user/Forms/TicketForm.vue";
import Wizard from "@/pages/user/Forms/Wizard.vue";

// TableList pages
import RegularTables from "@/pages/user/Tables/RegularTables.vue";
import ExtendedTables from "@/pages/user/Tables/ExtendedTables.vue";
import PaginatedTables from "@/pages/user/Tables/PaginatedTables.vue";
import Withdraw from "@/pages/user/Withdraw.vue";
import TicketDetail from "@/pages/user/TicketDetail.vue";
import Transaction from "@/pages/user/Transaction.vue";

// Maps pages
import GoogleMaps from "@/pages/user/Maps/GoogleMaps.vue";
import FullScreenMap from "@/pages/user/Maps/FullScreenMap.vue";
import VectorMaps from "@/pages/user/Maps/VectorMaps.vue";

// Calendar
import Calendar from "@/pages/user/Calendar.vue";
// Charts
import Charts from "@/pages/user/Charts.vue";
import Widgets from "@/pages/user/Widgets.vue";

import Invest from "@/pages/user/Invest.vue";
import Support from "@/pages/user/Support.vue";
import Authentication from "@/pages/user/Authentication.vue";
import Network from "@/pages/user/Network.vue";
import Wallet from "@/pages/user/Wallet.vue";
import Direct from "@/pages/user/Direct.vue";
import Binary from "@/pages/user/Binary.vue";

Vue.use(Router);

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      components: { default: Buttons },
    },
    {
      path: "grid-system",
      name: "Grid System",
      components: { default: GridSystem },
    },
    {
      path: "panels",
      name: "Panels",
      components: { default: Panels },
    },
    {
      path: "sweet-alert",
      name: "Sweet Alert",
      components: { default: SweetAlert },
    },
    {
      path: "notifications",
      name: "Notifications",
      components: { default: Notifications },
    },
    {
      path: "icons",
      name: "Icons",
      components: { default: Icons },
    },
    {
      path: "typography",
      name: "Typography",
      components: { default: Typography },
    },
  ],
};
let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/regular",
  name: "Forms",
  children: [
    {
      path: "regular",
      name: "Regular Forms",
      components: { default: RegularForms },
    },
    {
      path: "extended",
      name: "Extended Forms",
      components: { default: ExtendedForms },
    },
    {
      path: "validation",
      name: "Validation Forms",
      components: { default: ValidationForms },
    },
    {
      path: "wizard",
      name: "Wizard",
      components: { default: Wizard },
    },
  ],
};

let tablesMenu = {
  path: "/table-list",
  component: DashboardLayout,
  redirect: "/table-list/regular",
  name: "Tables",
  children: [
    {
      path: "regular",
      name: "Regular Tables",
      components: { default: RegularTables },
    },
    {
      path: "extended",
      name: "Extended Tables",
      components: { default: ExtendedTables },
    },
    {
      path: "paginated",
      name: "Pagianted Tables",
      components: { default: PaginatedTables },
    },
  ],
};

let mapsMenu = {
  path: "/maps",
  component: DashboardLayout,
  name: "Maps",
  redirect: "/maps/google",
  children: [
    {
      path: "google",
      name: "Google Maps",
      components: { default: GoogleMaps },
    },
    {
      path: "full-screen",
      name: "Full Screen Map",
      meta: {
        hideContent: true,
        hideFooter: true,
        navbarAbsolute: true,
      },
      components: { default: FullScreenMap },
    },
    {
      path: "vector-map",
      name: "Vector Map",
      components: { default: VectorMaps },
    },
  ],
};

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

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "Login",
      component: Login,
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
      path: "detail",
      name: "Ticket Detail",
      components: { default: TicketDetail },
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
  formsMenu,
  componentsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  authPages,
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
        path: "calendar",
        name: "Calendar",
        components: { default: Calendar },
      },
      {
        path: "charts",
        name: "Charts",
        components: { default: Charts },
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
        path: "widgets",
        name: "Widgets",
        components: { default: Widgets },
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
        path: "/logout",
        name: "Logout",
        beforeEnter: async (to, from, next) => {
          Cookies.remove("authToken");

          next("/login");
        },
      },
    ],
  },
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

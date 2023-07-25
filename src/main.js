import Vue from "vue";
import VueRouter from "vue-router";
import DashboardPlugin from "./material-dashboard";

import i18n from "./i18n";

// Plugins
import App from "./App.vue";
import Chartist from "chartist";

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";

// router setup
import router from "./routes";

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);
Vue.use(VueAwesomeSwiper);

// global library setup
Vue.prototype.$Chartist = Chartist;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  i18n,
  render: (h) => h(App),
  router,
});

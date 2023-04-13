<template>
  <div class="wrapper" :class="[{ 'nav-open': $sidebar.showSidebar }]">
    <notifications></notifications>
    <side-bar
      :active-color="sidebarBackground"
      :background-image="sidebarBackgroundImage"
      :data-background-color="sidebarBackgroundColor"
    >
      <user-menu></user-menu>
      <mobile-menu></mobile-menu>
      <template slot="links">
        <sidebar-item
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'dashboard',
            path: '/dashboard',
          }"
        >
        </sidebar-item>
        <sidebar-item :link="{ name: $t('sidebar.network'), icon: 'schema' }">
          <sidebar-item
            :link="{ name: $t('sidebar.myNetwork'), path: '/network' }"
          ></sidebar-item>
          <sidebar-item
            :link="{
              name: $t('sidebar.networkAccounting'),
              path: '/pages/rtl',
            }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item :link="{ name: $t('sidebar.accounting'), icon: 'paid' }">
          <sidebar-item
            :link="{ name: $t('sidebar.invest'), path: '/invest' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('sidebar.withdraw'), path: '/withdraw' }"
          ></sidebar-item>
          <sidebar-item
            :link="{ name: $t('sidebar.transaction'), path: '/transaction' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{ name: $t('sidebar.company'), icon: 'apartment' }"
        >
          <sidebar-item
            :link="{ name: $t('sidebar.roadmap'), path: '/pages/roadmap' }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.wallet'),
            icon: 'account_balance_wallet',
            path: '/wallet',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.package'),
            icon: 'redeem',
            path: '/package',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.authentication'),
            icon: 'verified',
            path: '/authentication',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.support'),
            icon: 'contact_support',
            path: '/support',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: $t('sidebar.logout'),
            icon: 'logout',
            path: '/logout',
          }"
        ></sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
    document.getElementsByClassName(className)[0].scrollTop = 0;
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

function reinitScrollbar() {
  let docClasses = document.body.classList;
  let isWindows = navigator.platform.startsWith("Win");
  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    initScrollbar("sidebar");
    initScrollbar("sidebar-wrapper");
    initScrollbar("main-panel");

    docClasses.add("perfect-scrollbar-on");
  } else {
    docClasses.add("perfect-scrollbar-off");
  }
}

import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import MobileMenu from "./Extra/MobileMenu.vue";
import UserMenu from "./Extra/UserMenu.vue";
import { ZoomCenterTransition } from "vue2-transitions";

export default {
  components: {
    TopNavbar,
    ContentFooter,
    MobileMenu,
    UserMenu,
    ZoomCenterTransition,
  },
  data() {
    return {
      sidebarBackgroundColor: "black",
      sidebarBackground: "green",
      sidebarBackgroundImage: "./img/sidebar-2.jpg",
      sidebarMini: true,
      sidebarImg: true,
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
  },
  updated() {
    reinitScrollbar();
  },
  mounted() {
    reinitScrollbar();
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar();
    },
  },
};
</script>
<style lang="scss">
$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}
.main-panel .zoomIn {
  animation-name: zoomIn95;
}
@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}
.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>

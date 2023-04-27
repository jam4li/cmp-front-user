<template>
  <v-card theme="dark">
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="Hossein Jamali"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            value="home"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-lan"
            title="Network"
            value="network"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Accounting"
            value="accounting"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Company"
            value="company"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Wallet"
            value="wallet"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Package"
            value="package"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            value="logout"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
import api from "@/api";
import logger from "@/logger";
import Swal from "sweetalert2";

import { StatsCard, AnimatedNumber, AnnouncementCard } from "@/components";

export default {
  components: {
    StatsCard,
    AnimatedNumber,
    AnnouncementCard,
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      rail: true,
      userInfo: null,
      announcements: [],
      swiperOptions: {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  created() {
    this.fetchAnnouncements();
    this.fetchUserInfo();
    this.showSwial();
  },
  methods: {
    async fetchAnnouncements() {
      try {
        const response = await api.get("/api/v1/announcement/user/list/");
        if (response.data.success) {
          this.announcements = response.data.data;
        } else {
          this.notifyVue(response.data.error, "danger", "error_outline");
        }
      } catch (error) {
        this.notifyVue(
          "An error occurred while fetching data",
          "danger",
          "error_outline"
        );
      }
    },
    async fetchUserInfo() {
      try {
        const response = await api.get("/api/v1/user/user/dashboard/");
        if (response.data.success) {
          this.userInfo = response.data.data;
        } else {
          this.notifyVue(response.data.error, "danger", "error_outline");
        }
      } catch (error) {
        this.notifyVue(
          "An error occurred while fetching data",
          "danger",
          "error_outline"
        );
      }
    },
    async showSwial() {
      Swal.fire({
        title: "Exciting News - Completely Revamped Investor Panel",
        buttonsStyling: false,
        confirmButtonClass: "md-button md-success",
        html: `<div style="text-align: left;">
          Dear valued investors,</br>
          We are thrilled to announce that our team has been working tirelessly to redesign and enhance the investor panel on our platform.</br>
          During this time, access to your investor panel may be limited or unavailable. We apologize for any inconvenience this may cause and appreciate your understanding.</br></br>
        <strong>Please rest assured that your funds are safe and secure throughout this process. We understand the importance of protecting your investments,
        and we have taken all necessary precautions to safeguard them.</strong>
        </div>`,
      });
    },
  },
};
</script>

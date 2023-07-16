<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="blue">
        <template slot="header">
          <div class="card-icon">
            <md-icon>shopping_cart</md-icon>
          </div>
          <p class="category">{{ $t("dashboard.activePackages") }}</p>
          <h3 class="title">
            <animated-number
              :value="userInfo.active_packages"
            ></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>info</md-icon>
            <a href="invest/">{{ $t("dashboard.moreInfo") }}</a>
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="rose">
        <template slot="header">
          <div class="card-icon">
            <md-icon>account_balance_wallet</md-icon>
          </div>
          <p class="category">{{ $t("dashboard.balance") }}</p>
          <h3 class="title">
            $ <animated-number :value="userInfo.balance"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>local_offer</md-icon>
            <a href="wallet/">{{ $t("dashboard.allWallets") }}</a>
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="green">
        <template slot="header">
          <div class="card-icon">
            <md-icon>person_add</md-icon>
          </div>
          <p class="category">{{ $t("dashboard.directInvited") }}</p>
          <h3 class="title">
            <animated-number :value="userInfo.direct_invited"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>add_circle</md-icon>
            <a href="direct/">{{ $t("dashboard.addDirectInvites") }}</a>
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="warning">
        <template slot="header">
          <div class="card-icon">
            <md-icon>groups</md-icon>
          </div>
          <p class="category">{{ $t("dashboard.yourTeam") }}</p>
          <h3 class="title">
            <animated-number :value="userInfo.team"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>info</md-icon>
            <a href="binary/">{{ $t("dashboard.moreInfo") }}</a>
          </div>
        </template>
      </stats-card>
    </div>
    <div class="md-layout-item md-size-100">
      <announcement-card header-color="green">
        <template slot="header">
          <div class="card-icon">
            <md-icon>campaign</md-icon>
          </div>
          <h4 class="title">{{ $t("dashboard.announcements") }}</h4>
        </template>

        <template slot="content">
          <div class="md-layout">
            <div class="md-layout-item md-size-100">
              <div class="swiper-container">
                <swiper :options="swiperOptions">
                  <!-- Slides -->
                  <swiper-slide
                    v-for="announcement in announcements"
                    :key="announcement.id"
                  >
                    <div class="slide-content">
                      <img v-bind:src="announcement.image" alt="Image 1" />
                      <div class="slide-text">{{ announcement.title }}</div>
                    </div>
                  </swiper-slide>

                  <!-- Add Pagination -->
                  <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
              </div>
            </div>
          </div>
        </template>
      </announcement-card>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import logger from "@/logger.js";
import Swal from "sweetalert2";
import notifyMixin from "@/mixins/notifyMixin";

import { StatsCard, AnimatedNumber, AnnouncementCard } from "@/components";

export default {
  mixins: [notifyMixin],
  components: {
    StatsCard,
    AnimatedNumber,
    AnnouncementCard,
  },
  data() {
    return {
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
  },
  methods: {
    async fetchAnnouncements() {
      try {
        const response = await api.get("/api/v1/banner/user/list/");
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
  },
};
</script>

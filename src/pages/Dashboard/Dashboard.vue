<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="blue">
        <template slot="header">
          <div class="card-icon">
            <md-icon>shopping_cart</md-icon>
          </div>
          <p class="category">Active Packages</p>
          <h3 class="title">
            <animated-number
              :value="userInfo.active_packages"
            ></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>info</md-icon>
            <a href="#">More Info</a>
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
          <p class="category">Balance</p>
          <h3 class="title">
            $ <animated-number :value="userInfo.balance"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>local_offer</md-icon>
            <a href="#">All Wallets</a>
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
          <p class="category">Direct Invited</p>
          <h3 class="title">
            <animated-number :value="userInfo.direct_invited"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>add_circle</md-icon>
            <a href="#">Add Direct Invites</a>
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
          <p class="category">Your Team</p>
          <h3 class="title">
            <animated-number :value="userInfo.team"></animated-number>
          </h3>
        </template>

        <template slot="footer">
          <div class="stats">
            <md-icon>info</md-icon>
            <a href="#">More Info</a>
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
          <h4 class="title">Announcements</h4>
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

import { StatsCard, AnimatedNumber, AnnouncementCard } from "@/components";

export default {
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
        const response = await api.get("/110c2c28-811b-4899-8e2d-be095e1537ca"); // Replace with your API endpoint
        this.announcements = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async fetchUserInfo() {
      try {
        const response = await api.get("/863244aa-c287-4008-aa83-1bf71da71b08"); // Replace with your API endpoint
        this.userInfo = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
  },
};
</script>

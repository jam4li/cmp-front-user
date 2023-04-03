<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25">
      <stats-card header-color="blue">
        <template slot="header">
          <div class="card-icon">
            <md-icon>shopping_cart</md-icon>
          </div>
          <p class="category">Active Packages</p>
          <h3 class="title"><animated-number :value="3"></animated-number></h3>
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
            $ <animated-number :value="34"></animated-number>,<animated-number
              :value="245"
            ></animated-number>
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
            <animated-number :value="2"></animated-number>
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
            <animated-number :value="17"></animated-number>
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
            <div class="md-layout-item md-size-20">
              <announcement-table></announcement-table>
            </div>
            <div class="md-layout-item md-size-80">
              <div class="swiper-container">
                <swiper :options="swiperOptions">
                  <!-- Slides -->
                  <swiper-slide>
                    <img src="/img/card-1.jpg" alt="Image 1" />
                  </swiper-slide>
                  <swiper-slide>
                    <img src="/img/card-2.jpg" alt="Image 1" />
                  </swiper-slide>
                  <swiper-slide>
                    <img src="/img/card-3.jpg" alt="Image 1" />
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
import {
  StatsCard,
  AnimatedNumber,
  AnnouncementCard,
  AnnouncementTable,
} from "@/components";

export default {
  components: {
    StatsCard,
    AnimatedNumber,
    AnnouncementCard,
    AnnouncementTable,
  },
  data() {
    return {
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
};
</script>

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
              <async-world-map class="map" :data="mapData"></async-world-map>
            </div>
          </div>
        </template>
      </announcement-card>
    </div>
  </div>
</template>

<script>
import AsyncWorldMap from "@/components/WorldMap/AsyncWorldMap.vue";
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
    AsyncWorldMap,
  },
  data() {
    return {
      product1: "./img/card-2.jpg",
      product2: "./img/card-3.jpg",
      product3: "./img/card-1.jpg",
      seq2: 0,
      mapData: {
        AU: 760,
        BR: 550,
        CA: 120,
        DE: 1300,
        FR: 540,
        GB: 690,
        GE: 200,
        IN: 200,
        RO: 600,
        RU: 300,
        US: 2920,
      },
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },

        options: {
          lineSmooth: this.$Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
    };
  },
};
</script>

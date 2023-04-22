<template>
  <div>
    <div class="header text-center">
      <h3 class="title">{{ $t("invest.title") }}</h3>
      <p>
        {{ $t("invest.subtitle") }}
      </p>
    </div>

    <div class="md-layout">
      <div
        v-for="invest in invests"
        :key="invest.id"
        class="md-layout-item md-size-25 md-small-size-100"
      >
        <invest-card
          header-animation="false"
          :chart-data="pieChartData(invest)"
          :chart-options="pieChart.options"
          chart-type="Pie"
          header-icon
          chart-inside-content
          background-color="green"
        >
          <template slot="chartInsideHeader">
            <h4 class="title">{{ invest.package.name }}</h4>
          </template>
          <template slot="footer">
            <div class="md-layout">
              <div class="md-layout-item md-size-100">
                <md-icon>paid</md-icon> Invest: {{ invest.invest }}$
              </div>
              <div class="md-layout-item md-size-100">
                <md-icon>payments</md-icon> Profit: {{ invest.profit }}$
              </div>
              <div class="md-layout-item md-size-100">
                <md-icon>savings</md-icon> Staking: Calculating
              </div>
            </div>
          </template>
        </invest-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import { InvestCard } from "@/components";

export default {
  components: {
    InvestCard,
  },
  data() {
    return {
      invests: [],
      pieChart: {
        options: {
          height: "190px",
          donut: true,
          donutWidth: 40,
          startAngle: 270,
          showLabel: true,
          total: 200,
        },
      },
    };
  },
  created() {
    this.fetchInvests();
  },
  methods: {
    async fetchInvests() {
      try {
        const response = await api.get("/api/v1/invest/user/list/");
        if (response.data.success) {
          this.invests = response.data.data;
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
    pieChartData(invest) {
      const total = invest.invest * 2;
      return {
        labels: [`${invest.profit}`],
        series: [invest.profit],
        options: {
          total: total,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
.category {
  margin: 0;
}

.md-card-actions .md-layout-item {
  padding: 0;
}
</style>
